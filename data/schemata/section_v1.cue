{
	_schema: {
		name:      "Section"
		namespace: "schemas.cueblox.com"
	}

	#Section: {
		_dataset: {
			plural: "sections"
			supportedExtensions: ["yaml", "yml", "md", "mdx"]
		}

		name:        string @template("Name")
		description: string @template("Small description")
		body?:       string @template("All about this section")
    image_id?: string
		weight?:     int | *0
	}

}
