---
title: Organizing Documents with Some AI, ML, and Elbow Grease
publish_date: '2019-09-03'
excerpt: 'Organizing my loose documents with some machine learning, cognitive services, and elbow grease.'
tags:
  - ml
  - linux
  - azure
image: IGa3Md8wP6g
profile: bketelsen
---

In this first post of (likely) a multi-part series I'm going to discuss how I am using machine learning, AI, and good old-fashioned elbow grease to make sense of the 3000 files in my `~/Documents/Unfiled` directory.

### The Problem Statement

There are several contributing factors to the problem. Let's start with the obvious ones:

- I'm a digital packrat
- I'm a single parent of ~3~ 4 (and therefore busy)
- I can be lazy sometimes
- I have ADHD, and get easily sidetracked from things I intended to do

When my dad passed away last year, it got even worse. Suddenly I was getting all of his mail, bills, correspondence, too. I didn't want to lose it; but I sure wasn't ready to read it all. So I scanned it and dropped it in the `Unfiled` folder.

So now we're here. Where `here` is a place where I can't find anything I need and my `Documents` directory is the definition of `hot-mess`.

### The Goal

I'd like to take that folder of 3000 random unclassified documents and sort them into something more clear. I think sorting them by originating source (Supplier, Vendor, Biller, Organization) is a good first step. Eventually I'd like to sort them by date group too. Probably by Year, then Month.

For a bonus, I'd love to do a [projected filesystem](https://docs.microsoft.com/en-us/windows/win32/projfs/projected-file-system?WT.mc_id=none-twitter-brketels) sort of thing in Windows and a [Plan9](https://9p.io/wiki/plan9/Installing_a_Plan_9_File_Server/index.html) type server on Mac/Linux using FUSE. It'd be really convenient to be able to get at documents from a Filesystem interface by using different facets like keywords, dates, categories, etc. That might fit more cleanly with the way I think, too. But, again, that's a stretch goal, because we'll need all that metadata first.

If you're old enough to remember [BeOS Filesystem](https://arstechnica.com/information-technology/2018/07/the-beos-filesystem/), it would have solved nearly all of this. Someday we'll get back to the database/filesystem mashup that truly needs to exist.

### The Solution(s)

First, there isn't really a one-step solution to this. It's going to take some work, and I can likely automate MOST of that. But there will still be a good portion of things I can't sort automatically.

#### Step One

As a first step, I wrote a small Go program that calls [Azure Cognitive Services](https://cda.ms/126) Vision API to do Optical Character Recognition on all the files that are compatible (PDF and image files). Nearly everything I have is in pdf format, but there are a few TIFF files in there too. This program is in flux right now, so I'm not going to release it as Open Source until it's settled a bit. If I forget - ping me on twitter @bketelsen or email mail@bjk.fyi - and remind me! Related: the code samples in this post are probably garbage, and won't likely match the end result that I publish. I'm sure I'm swallowing errors, and haven't done the slightest bit of refactor/cleanup on this code yet.

> WARNING: _Don't cut/paste this code yet, please._

I created a domain type appropriately called `Document` that stores metadata about files on disk:

```go
type Document struct {
	Hash         string
	Path         string
	PreviousPath string
	Operation    *CognitiveOperation
	Results      *CognitiveReadResponse
}
```

I'll discuss the fields as they come up, but `Path` and `PreviousPath` should be obvious. Current and previous location on disk, so that I can account for file moves with at least a little bit of history.

The pricing for the OCR is really attractive - as of September, 2019 it is:

> 0-1M transactions — $1.50 per 1,000 transactions

I know that I'll be fine tuning the processes that run, and likely running them repeatedly. I wanted to find a way to store the results from the OCR for each document, but I am also aware that I can't use the document name and path as the canonical key to find the document later, because the goal of this app is to move them and rename them appropriately! So I decided to use a hash of the file contents as a key. `SHA256` seems to be the right algorithm for file contents, low cost computation, low collision chance. So I created a hash function that calculates the `SHA256` hash of the document after it is read:

```go
func (d *Document) GetHash() {

	f, err := os.Open(d.Path)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	h := sha256.New()
	if _, err := io.Copy(h, f); err != nil {
		log.Fatal(err)
	}
	d.Hash = fmt.Sprintf("%x", h.Sum(nil))
}
```

After getting the results of the OCR operation, I set them in the `Document` type, then persist the metadata to disk in a hidden directory. Currently that's `~/.classifier/` but, as with all of this, it might change in the future.

The file is stored using the `SHA256` hash of the contents as the file name, and the `Document` type is serialized to disk using Go's efficient and lightweight `encoding/gob` format. While I'm debugging and playing with this code, I decided to also persist the data in `json` format so it's easier to read. Here's the method on `Document` that saves/serializes to disk:

```go
func (d *Document) SaveMetadata() error {
  fmt.Println(d.Hash)
  //TODO use new XDG config dir location
  // https://tip.golang.org/pkg/os/#UserConfigDir
	filePath := "/home/bjk/.classifier/" + d.Hash // TODO FILEPATH.JOIN
	fmt.Println(filePath)
	file, err := os.OpenFile(filePath, os.O_TRUNC|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer file.Close()
	enc := gob.NewEncoder(file)
	err = enc.Encode(d)
	if err != nil {
		return err
	}
	jfilePath := "/home/bjk/.classifier/" + d.Hash + ".json" // TODO FILEPATH.JOIN
	fmt.Println(jfilePath)
	jfile, err := os.OpenFile(jfilePath, os.O_TRUNC|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer jfile.Close()
	jenc := json.NewEncoder(jfile)
	return jenc.Encode(d)
}
```

Lots of bad things happening in there, see above caveats about copying/pasting this code. The important part is the encoding in `gob` format of the contents of the `Document` metadata, which is then saved to disk using the `SHA256` hash as the filename. This is a nice future-proof solution, and provides several benefits.

- If there is already a file with the same name, it's been processed once.
- If the `.Path` is different from the document I'm inspecting, I might have an exact duplicate, which is a candidate for (soft) deleting
- It doesn't matter where the files get moved, as long as the `SHA256` hash matches, I've got the metadata saved already.

This is a very low-tech metadata database, of sorts. It's definitely not optimized for real-time use, but instead for batch operations.

Keeping all the metadata in this format means I can write any number of other tools to read and modify the metadata without worrying too much.

### Step Two

At this point, I have a directory full of unprocessed files and a way to process them once and save the results so I don't have to re-process them later. It's time to fire off the processing app. I used [cobra](https://github.com/spf13/cobra) to build the command-line utility, so I made the root/naked command do the actual calls to Azure Cognitive Services:

```bash
go build
./classifier
```

This iterates over every file in the `~/Documents/Unfiled` directory, calling Cognitive Services OCR for the file types that are supported. There is no current mechanism to retrieve metadata from other document types (Word documents, text files, etc). That's a future addition.

After receiving the results, the responses are serialized using the above mentioned `gob` serialization into `~/.classifier/HASH`

### Classification

Based on the results there are some simple `bag of words` matches that can be done. Some of the documents I have contain very unique text that is indicative of a particular document type. For example, Bank of America always includes my account number and their address in `Wilmington`. No other document in my corpus has those two distinct things together, so I can write a simple classifier for all Bank of America documents. I decided to use simple TOML for a configuration file here:

```
[[entity]]
name = "Bank of America"
directory = "BOA"
keywords = ["Bank of America","12345677889","Wilmington"]
```

Here, I added a sub-command in `cobra` so I can classify files without re-posting them to Cognitive Services. So I added the `classifier process` command:

```bash
./classifier process
```

It currently goes through all the files in `Unfiled` and checks their metadata for matches against the TOML file. This worked perfectly for several of my external correspondents. It took all the documents from `Unfiled` and placed them in `Filed/{directory}`.

### What About The Rest?

There are many documents that aren't easily processed this way though. My next inspiration came in the shower (of course). If you squint enough, or are far enough away, all documents from the same entity of the same type look the same. So all my mortgage statements look the same, but the numbers are different.

I installed ImageMagick, and wrote a script to make a low-resolution thumbnail of each PDF. I made the resolution low enough that the text isn't readable even if you magnify the image.

Then I searched for ways to compare images and came across [duplo](https://github.com/rivo/duplo), which appears to do what I need. It does a hash of the image and allows you to compare other documents to that hash to find a similarity score. Using this type of process my next goal is to group similar documents together by searching for ones with matching or close-to-matching image hashes.

But that'll be probably next weekend. It's been really fun doing this much, and I'm looking forward to seeing how much more I can learn as I go!

Intermediate results:

Before:

```bash
2846 Files
```

After:

```bash
Unfiled\
  2710 Files
Filed\
  136 Files in 2 Directories
```
