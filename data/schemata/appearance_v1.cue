{
	_schema: {
		name:      "Appearance"
		namespace: "schemas.cueblox.com"
	}

	#Appearance: {
		_dataset: {
			plural: "appearances"
			supportedExtensions: ["yaml", "yml", "md", "mdx"]
		}

		title:             string @template("Gophercon 2021")
		excerpt:           string @template("Short description of the appearance.")
		featured:          bool | *false
		appearance_date:   string @template("2020-01-01")
		image?:            string @relationship(Image)
    event_url?:        string @template("https://www.gophercon.com")
    video_url?:        string @template("https://www.youtube.com/yourmom")
    slides_url?:       string @template("https://www.brian.com/talks/yourmom")
		body?:             string @template("free-form text about the appearance, if desired")
	}

}
