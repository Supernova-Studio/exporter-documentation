# Creating New Blocks
As of this document's creation
## Editing exporter.json
To get started writing a custom block, add in the block declaration to `"blocks"` in	`exporter.json` . It contains all the data shown to the user and used in the Pulsar code:

```jsx       
"blocks": [{
                "key": "io.rdc.documentation-main.loom-embed",
                "category": "Media Blocks",
                "title": "Loom",
                "description": "Embed a Loom video",
                "icon": "icons/loom-color.png",
                "mode": "block",
                "properties": [...] // See properties section
            }],
```

Block decelerations require:
- `key` - Unique key used in code. Use the format  `io.rdc.documentation-main.{block name}` to identify the block as ours
- `category` - Category name shown in Supernova's editor. Stick to the existing categories unless they don't make sense for your block
- `title` - Name of block shown in editor
- `description` - Short description of block shown in editor. Keep this as short as possible
- `icon` - Icon used for block
- `mode` - keep this as `"block"`
- `properties` - see next section

Once the block deceleration is added, it will be visible to anyone in the Supernova editor once you pull in the changes. It's important that you mark work in progress blocks with `[WIP]` in the title so designers known not to use them in their documentation. 

**Note:** Like components, changing block keys and/or properties results in a **breaking** change for the documentation. Do not remove the `[WIP]` prefix until you are absolutely sure those values will not change, or else every instance of the block used in the documentation will need to be updated as well. 

### Properties
This property is an array of inputs that are used in a given block. Like the name suggestions, these can be thought of as "props" for the "component" you are containing. In Supernova's studio, they are rendered as a list of fields.

```jsx
"properties": [{
                    "key": "url",
                    "default": "https://",
                    "type": "string",
                    "label": "Video url"
                },
                {
                    "key": "caption",
                    "default": "",
                    "type": "string",
                    "label": "Caption"
                },
				{
	                "key": "enum",
	                "default": "first",
	                "values": ["first", "second", "third"],
	                "type": "enum",
	                "label": "enum"
	            },]
```

Each property requires:
- `key` - Unique field key used in code only.
- `default` - Default value that is also shown as placeholder
- `type` - The field type. Supported types are: `string`, `number`, `boolean`, `enum` (array of strings), and `image`
![](https://media.github.move.com/user/2276/files/050a7d80-9f01-11ec-87ae-04124f453841)
- `label` - Label for field

## HTML generation using Pulsar
To start generating your declared blocks, there's a handful of setup steps needed or the file will not generate properly. 

### Export blocks from block file
First, your block needs to be exported from the block file you will set up in the next step. Inside of `src/page_body/structure/page_body_structure_block_custom.pr` is as follows:
```pulsar
{[ const block = context /]}

{* Generate each block depending on this custom block identifier *}
{[ switch block.key ]}
{[ case "io.supernova.documentation-main.markdown" ]}
    {[ inject "page_block_custom_markdown" context block /]}
{[ case "io.rdc.documentation-main.contact" ]}
    {[ inject "page_block_contact" context block /]}
{[ case "io.rdc.documentation-main.loom-embed" ]}
    {[ inject "page_block_loom_embed" context block /]}
{[ case "{BLOCK KEY}" ]}
    {[ inject "{BLOCK FILENAME}" context block /]}
{[/]}
```

`{BLOCK KEY}` is the key set in `exporter.json`. The keys match exactly, and if you change it in either place you will need to change it in the other. 

`{BLOCK FILENAME}` is the file set up in the next section. The format should follow the existing patterns: `page_block_{BLOCK NAME}`. For example, if you are setting up a `card` block, then `{BLOCK FILENAME}` should be `page_block_card`. Note that the file extension is not needed.

### Add block file
Once `page_body_structure_block_custom.pr` is set up to handle your new block, you can add a new file in `src/page_body/structure/blocks_custom/`. It should be named the same as `{BLOCK FILENAME}`  in the previous section, but with the `pr` extension. 

The file will contain the Pulsar code that generates HTML. To start off, add `{[ const block = context /]}` to the file to import the block context. 

### Create block in Supernova editor
Finally, to develop your custom block, go into the Supernova editor and add your block to the "Custom Blocks" documentation page and add in the WIP label. Fill out every property with test values and hit "publish" in the top right.

### Generating HTML using block properties
Now that all the initial setup has been completed, you can now start developing the block. Open up `page_block_{BLOCK NAME}.pr`  which should only have the imported block context:
```pulsar
`{[ const block = context /]}` 
```

As an example, the contact block has the three properties with the keys: photo, name, and email. The values for those properties can be accessed using `{{ block.properties.{KEY} }}`, and they can be modified using Pulsar functions or simply be formatted into HTML:

```pulsar
{[ const block = context /]}

{* Generate html using block properties *}
<div class="contact-block">
    <img class="contact-photo" src="{{ block.properties.photo }}"  />
    <span class="contact-info">
        <p>{{ block.properties.name }}</p>
        <a href="mailto:{{block.properties.email}}">{{block.properties.email}}</a>
    </span>
</div>
```

The Pulsar language documentation isn't fully complete, but what exists should be the majority of what is needed to develop most custom blocks: https://developers.supernova.io/pulsar-language/language-features

## Handling CSS
Since almost all the exporter styles are located in `assets/css/stylesheet.css`, it's imperative that the stylesheet is kept as clean and organized as possible. First, add your block to the table of contents at the beginning of the stylesheet under "11. Custom Blocks":
```css
/*
=================================================
  Table of Contents
=================================================

	1. Basic
	2. Helpers Classes
	3. Layouts
		3.1 Side Navigation
		3.2 Docs Content
		3.3 Section Divider
	4. Header
		4.1 Main Navigation
	5 Elements
		5.1 List Style
		5.2 Changelog
		5.3 Accordion & Toggle
		5.4 Nav
		5.5 Tabs
		5.6 Popup Img
		5.7 Featured Box
	6 Footer
		6.1 Social Icons
		6.2 Back to Top
    7 Blocks
	8 Extra
    9. Token previews
    10. Responsive
    11. Custom Blocks
        11.1 Contact 
        11.2 Component Health 
		11.3 YOUR NEW BLOCK

=======================================================*/
```

From there, you can find the blocks section in the document and add the separator:
`/*=== 11.3 YOUR NEW BLOCK ===*/`

As all of the styles use classes, they should be prefixed with the block title (provided they do not conflict with existing classes). For example, if your new block is called card and you have a wrapper that needs a class, name it `card-wrapper`. 