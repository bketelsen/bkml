package handlers

import (
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"

	"github.com/bketelsen/bkml/handlers/og"
	"github.com/cueblox/blox/content"
)

var repo *content.Service
var hf http.HandlerFunc
var h http.Handler

var static bool
var staticDir string
var assets og.Assets

func init() {
	userConfig, err := ioutil.ReadFile("blox.cue")
	if err != nil {
		log.Fatal(err)
	}

	repo, err = content.NewService(string(userConfig), true)
	if err != nil {
		log.Fatal(err)
	}

	hf, err = repo.GQLHandlerFunc()
	if err != nil {
		log.Fatal(err)
	}

	h, err = repo.GQLPlaygroundHandler()
	if err != nil {
		log.Fatal(err)
	}

	staticDir, err = repo.Cfg.GetString("static_dir")
	if err != nil {
		log.Println("No static_dir in config, not serving static files.")
	} else {
		log.Printf("Serving static files from %s\n", staticDir)
		static = true
	}

	assets = og.Assets{
		BgImgPath: "assets/og-standard.png",
		FontPath:  "assets/FiraSans-Light.ttf",
		FontSize:  60,
	}

}

// NewServerMux creates a new HTTP server route multiplexer.
func NewServerMux() http.Handler {
	mux := http.NewServeMux()

	// Static Files
	if static {
		mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(filepath.Join(".", staticDir)))))
	}

	// Graphql server
	mux.Handle("/graphql/ui", h)
	mux.HandleFunc("/graphql", hf)

	// OG Image Server
	mux.HandleFunc("/og", assets.Serve)

	return mux
}
