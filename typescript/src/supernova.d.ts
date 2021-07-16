// Type definitions for Supernova Pulsar  1.0
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// TypeScript Version: 4.2
// Supernova Pulsar  Version: 1
// Note: Only temporary now, before we publish it on defotyped || private package

declare global {
  //
  // Main functions and access points
  //
  interface PulsarInterface {
    registerFunction(name: string, fn: (...args) => any)
    registerTransformer(
      name: string,
      fn: (transformedValue: any, ...args) => any
    )
    registerPayload(
      name: string,
      payload: string | number | object | Array<any> | Object
    )
  }

  const Pulsar: PulsarInterface

  //
  // Enums
  //
  type TokenType = 'Color' | 'Typography' | 'Radius' | 'Font' | 'Measure' | 'Shadow' | 'Border' | 'Gradient' | 'Text'

  type TokenPropertyType = 'Number' | 'Boolean' | 'String' | 'Generic'
  
  type SourceType = 'Supernova' | 'Figma'

  type TextCase = 'Original' | 'Upper' | 'Lower' | 'Camel'

  type TextDecoration = 'None' | 'Underline' | 'Strikethrough'

  type Unit = 'Pixels' | 'Points' | 'Percent' | 'Ems'

  type BorderPosition = 'Inside' | 'Center' | 'Outside'

  type GradientType = 'Linear' | 'Radial' | 'Angular'

  type DocumentationItemType = 'Page' | 'Group'

  type DocumentationPageBlockType = 'Text' | 'Heading' | 'Code' | 'UnorderedList' | 'OrderedList' | 'Quote' | 'Callout' | 'Divider' | 'Image' | 'Link' | 'Token' | 'TokenList' | 'TokenGroup'

  type RichTextSpanAttributeType = 'Bold' | 'Italic' | 'Link' | 'Strikethrough' | 'Code'

  type CalloutType = 'Info' | 'Success' | 'Warning' | 'Error'

  type HeadingType = '1' | '2' | '3'

  type ImageAlignment = 'Left' | 'Center' | 'Stretch'

  //
  // Data Types
  // Subcategory: Design Token Shells
  //
  type Token = TokenValue & {}

  type ColorToken = Token & {
    value: ColorTokenValue
  }

  type TypographyToken = Token & {
    value: TypographyTokenValue
  }

  type RadiusToken = Token & {
    value: RadiusTokenValue
  }

  type ShadowToken = Token & {
    value: ShadowTokenValue
  }

  type MeasureToken = Token & {
    value: MeasureTokenValue
  }

  type BorderToken = Token & {
    value: BorderTokenValue
  }

  type GradientToken = Token & {
    value: GradientTokenValue
  }

  type TextToken = Token & {
    value: TextTokenValue
  }

  type FontToken = Token & {
    value: FontTokenValue
  }

  //
  // Data Types
  // Subcategory: Design Token Values
  //

  type TokenValue = {
    id: string
    name: string
    description: string
    tokenType: TokenType
    origin: SourceOrigin | null
    properties: Array<TokenProperty>
  }

  type TokenProperty = {
    name: string
    codeName: string
    type: TokenPropertyType
    value: string | number | boolean
  }

  type ColorTokenValue = {
    hex: string
    r: number
    g: number
    b: number
    a: number
    referencedToken: ColorToken | null
  }

  type TypographyTokenValue = {
    font: FontTokenValue
    fontSize: MeasureTokenValue
    textDecoration: TextDecoration
    textCase: TextCase
    letterSpacing: MeasureTokenValue
    lineHeight: MeasureTokenValue | null
    paragraphIndent: MeasureTokenValue
    referencedToken: TypographyToken | null
  }

  type RadiusTokenValue = {
    radius: MeasureTokenValue
    topLeft: MeasureTokenValue | null
    topRight: MeasureTokenValue | null
    bottomLeft: MeasureTokenValue | null
    bottomRight: MeasureTokenValue | null
    referencedToken: RadiusToken | null
  }

  type ShadowTokenValue = {
    color: ColorTokenValue
    x: MeasureTokenValue
    y: MeasureTokenValue
    radius: MeasureTokenValue
    spread: MeasureTokenValue
    opacity: number
    referencedToken: ShadowToken | null
  }

  type MeasureTokenValue = {
    unit: Unit
    measure: number
    referencedToken: MeasureToken | null
  }

  type FontTokenValue = {
    family: string
    subfamily: string
    referencedToken: FontToken | null
  }

  type BorderTokenValue = {
    color: ColorTokenValue
    width: MeasureTokenValue
    position: BorderPosition
    referencedToken: BorderToken | null
  }

  type GradientTokenValue = {
    to: {
      x: number
      y: number
    }
    from: {
      x: number
      y: number
    }
    type: GradientType
    aspectRatio: number
    stops: Array<GradientStopValue>
    referencedToken: GradientToken | null
  }

  type GradientStopValue = {
    position: number
    color: ColorTokenValue
  }

  type TextTokenValue = {
    text: string
    referencedToken: TextToken
  }

  //
  // Data Types
  // Subcategory: Groups
  //
  type TokenGroup = {
    id: string
    name: string
    description: string
    path: Array<string>
    subgroups: Array<TokenGroup>
    tokenType: TokenType
    isRoot: boolean
    childrenIds: Array<string>
    tokenIds: Array<string>
    parent: TokenGroup | null
  }

  //
  // Data Types
  // Subcategory: System
  //

  type Workspace = {
    id: string
    handle: string
    name: string
    color: string
  }

  type DesignSystem = {
    id: string
    workspaceId: string
    name: string
    description: string
    isPublic: boolean
  }

  type DesignSystemVersion = {
    id: string
    designSystemId: string
    name: string
    description: string
    version: string
    changeLog: string | null
    isReadOnly: boolean
  }

  //
  // Data Types
  // Subcategory: Documentation Base

  type DocumentationItem = {
    id: string
    persistentId: string
    title: string
    type: DocumentationItemType
  }

  type DocumentationGroup = DocumentationItem & {
    isRoot: boolean
    childrenIds: Array<string>
    children: Array<DocumentationItem>
    parent: DocumentationGroup | null
  }

  type DocumentationPage = DocumentationItem & {
    slug: string
    userSlug: string | null
    blocks: Array<DocumentationPageBlock>
    parent: DocumentationGroup
  }

  type DocumentationConfiguration = {
    domain: string
  }

  //
  // Data Types
  // Subcategory: Documentation Text

  type DocumentationRichText = {
    spans: Array<DocumentationRichTextSpan>
  }

  type DocumentationRichTextSpan = {
    text: string
    attributes: Array<DocumentationRichTextSpanAttribute>
  }

  type DocumentationRichTextSpanAttribute = {
    type: RichTextSpanAttributeType
    link: string | null
  }

  //
  // Data Types
  // Subcategory: Documentation Blocks

  type DocumentationPageBlock = {
    id: string
    children: Array<DocumentationPageBlock>
    type: DocumentationPageBlockType
  }

  type DocumentationPageBlockCallout = DocumentationPageBlockText & {
    calloutType: CalloutType
  }

  type DocumentationPageBlockCode = DocumentationPageBlockText & {
    codeLanguage: string | null
    caption: string | null
  }

  type DocumentationPageBlockDivider = DocumentationPageBlock & {
    // No extra attributes
  }

  type DocumentationPageBlockHeading = DocumentationPageBlockText & {
    headingType: HeadingType
  }

  type DocumentationPageBlockImage = DocumentationPageBlock & {
    url: string | null
    caption: string | null
    alignment: ImageAlignment
  }

  type DocumentationPageBlockLink = DocumentationPageBlock & {
    url: string | null
  }

  type DocumentationPageBlockOrderedList = DocumentationPageBlockText & {
    // No extra attributes
  }

  type DocumentationPageBlockQuote = DocumentationPageBlockText & {
    // No extra attributes
  }

  type DocumentationPageBlockText = DocumentationPageBlock & {
    text: DocumentationRichText
  }

  type DocumentationPageBlockToken = DocumentationPageBlock & {
    tokenId: string
  }

  type DocumentationPageBlockTokenGroup = DocumentationPageBlock & {
    groupId: string
  }

  type DocumentationPageBlockTokenList = DocumentationPageBlock & {
    tokenIds: Array<string>
  }

  type DocumentationPageBlockUnorderedList = DocumentationPageBlockText & {
    // No extra attributes
  }


  
  //
  // Data Types
  // Subcategory: Support
  //

  type SourceOrigin = {
    source: SourceType
    id: string | null
    name: string | null
  }
} // declare global

export {}
