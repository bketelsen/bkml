{
	_schema: {
		name:      "Feed"
		namespace: "schemas.cueblox.com"
	}

	#Feed: {
		_dataset: {
			plural: "feeds"
			supportedExtensions: ["yaml", "yml"]
		}

		title:             string @template("Bytes")
		link:              string @template("https://www.brian.dev")
		description:       string @template("I found this interesting thing...")
		draft:             bool | *false
		image?:            string
		category_id?: string
		profile_id?:  string
	}

}
