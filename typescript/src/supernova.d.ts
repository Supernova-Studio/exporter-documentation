// Type definitions for Supernova Pulsar 1.3.10
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// TypeScript Version: 4.2
// Supernova Pulsar Version: 1.3.10
// Note: Only temporary now, before we publish it on defotyped || private package

declare global {
  //
  // Main functions and access points
  //
  interface PulsarInterface {
    registerFunction(name: string, fn: (...args) => any)
    registerTransformer(name: string, fn: (transformedValue: any, ...args) => any)
    registerPayload(name: string, payload: string | number | object | Array<any> | Object)
    systemData(): object
    blueprintData(): object | null
  }

  const Pulsar: PulsarInterface

  //
  // Enums
  //
  type TokenType =
    | "Color"
    | "Typography" 
    | "BorderRadius"
    | "Font"
    | "Space"
    | "Shadow"
    | "Border"
    | "Gradient"
    | "Dimension"
    | "Duration"
    | "Size"
    | "Opacity"
    | "FontSize"
    | "LineHeight"
    | "LetterSpacing"
    | "ParagraphSpacing"
    | "BorderWidth"
    | "ZIndex"
    | "Image"
    | "String"
    | "ProductCopy"
    | "FontFamily"
    | "FontWeight"
    | "TextDecoration"
    | "TextCase"
    | "Visibility"
    | "Blur"

  type TokenPropertyType = "Number" | "Boolean" | "String" | "Generic"

  type SourceType = "Supernova" | "Figma"

  type TextCase = "Original" | "Upper" | "Lower" | "Camel"

  type TextDecoration = "None" | "Underline" | "Strikethrough"

  type BorderStyle = "Solid" | "Dashed" | "Dotted" | "Groove"

  type Unit = "Pixels" | "Points" | "Percent" | "Ems" | "Rem" | "Ms" | "Raw"

  type BorderPosition = "Inside" | "Center" | "Outside"

  type GradientType = "Linear" | "Radial" | "Angular"

  type DocumentationItemType = "Page" | "Group"

  type DocumentationGroupBehavior = "Tabs" | "Group"

  type DocumentationPageBlockType =
    | "Text"
    | "Heading"
    | "Code"
    | "UnorderedList"
    | "OrderedList"
    | "Quote"
    | "Callout"
    | "Divider"
    | "Image"
    | "Link"
    | "Token"
    | "TokenList"
    | "TokenGroup"
    | "Shortcuts"
    | "FigmaEmbed"
    | "YoutubeEmbed"
    | "Embed"
    | "FigmaFrames"

  type RichTextSpanAttributeType = "Bold" | "Italic" | "Link" | "Strikethrough" | "Code"

  type CalloutType = "Info" | "Success" | "Warning" | "Error"

  type HeadingType = "1" | "2" | "3"

  type ContentAlignment = "Left" | "Center" | "Stretch"

  type HeaderAlignment = "Default" | "Center"

  type FrameAlignment = "FrameHeight" | "Center"

  type FrameLayout = "C8" | "C7" | "C5" | "C4" | "C3" | "C2" | "C1" | "C1_75"

  type ShortcutType = "Internal" | "External"

  type ShadowType = "Drop" | "Inner"

  //
  // Data Types
  // Subcategory: Design Token Shells
  //
  type Token = TokenValue & {}

  type ColorToken = Token & {
    value: ColorTokenValue
  }

  type TextDecorationToken = Token & {
    value: TextDecorationValue
  }

  type TypographyToken = Token & {
    value: TypographyTokenValue
  }

  type RadiusToken = Token & {
    value: RadiusTokenValue
  }

  type ShadowToken = Token & {
    value: Array<ShadowTokenValue>
    isVirtual: boolean
  }

  type MeasureToken = Token & {
    value: MeasureTokenValue
  }

  type BorderToken = Token & {
    value: BorderTokenValue
  }

  type GradientToken = Token & {
    value: Array<GradientTokenValue>
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
    color: {
      r: number,
      g: number,
      b: number
      referencedTokenId: string | null
      referencedToken?: ColorToken
    },
    opacity: {
      unit: string,
      measure: number
      referencedTokenId: string | null
      referencedToken?: MeasureToken
    }
    referencedTokenId: string | null
    referencedToken?: ColorToken
  }

  type TextDecorationValue = {
    value: TextDecoration
    referencedTokenId: string | null
    referencedToken?: TextDecorationToken
  }

  type TextCaseValue = {
    value: TextCase
    referencedTokenId: string | null
    referencedToken?: TextCaseToken
  }

  type TypographyTokenValue = {
    fontFamily: TextTokenValue
    fontWeight: TextTokenValue
    fontSize: MeasureTokenValue
    textDecoration: TextDecorationValue
    textCase: TextCaseValue
    letterSpacing: MeasureTokenValue
    lineHeight: MeasureTokenValue | null
    paragraphIndent: MeasureTokenValue
    paragraphSpacing: MeasureTokenValue
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
    x: number
    y: number
    radius: number
    spread: number
    opacity: MeasureTokenValue
    type: ShadowType
    referencedTokenId: string | null
    referencedToken?: ShadowToken
  }

  type MeasureTokenValue = {
    unit: Unit
    measure: number
    referencedTokenId: string | null
    referencedToken?: MeasureToken
  }

  type FontFamilyValue = {
    text: string
    referencedTokenId: string | null
    referencedToken?: TextToken
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
    referencedTokenId: string | null
    referencedToken?: GradientToken
  }

  type GradientStopValue = {
    position: number
    color: ColorTokenValue
    referencedTokenId: string | null
    referencedToken?: GradientStopToken
  }

  type TextTokenValue = {
    text: string
    referencedTokenId: string | null
    referencedToken?: TextToken
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
    slug: string
    userSlug: string | null
    configuration: {
      isHidden: boolean
      isPrivate: boolean
    }
  }

  type DocumentationGroup = DocumentationItem & {
    type: "Group"
    isRoot: boolean
    childrenIds: Array<string>
    children: Array<DocumentationGroup | DocumentationPage>
    parent: DocumentationGroup | null
    groupBehavior: DocumentationGroupBehavior
  }

  type DocumentationPage = DocumentationItem & {
    type: "Page"
    blocks: Array<DocumentationPageBlock>
    parent: DocumentationGroup
    relativeUrl: string
  }

  type DocumentationPageStyle = {
    title: string
    textAlignment: HeaderAlignment
    description: string | null
    backgroundColor: string | null
    backgroundImage: string | null
    headerHeight: number | null
    hideSidebar: boolean
    invertHeader: boolean
  }

  type Documentation = {
    domain: string
    settings: DocumentationConfiguration
  }

  type DocumentationConfiguration = {
    tabbedNavigation: boolean
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

  enum DocumentationPageBlockCodeLiveSandboxType {
    react = "react"
  }

  type DocumentationPageBlockCodeLive = DocumentationPageBlock & {
    alignment: ContentAlignment
    backgroundColor: string | null
    showCode: boolean
    showControls: boolean
    code: string
    sandboxData: string
    sandboxType: DocumentationPageBlockCodeLiveSandboxType
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
    imageAlt: string | null
    alignment: ContentAlignment
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

  type DocumentationPageBlockEmbedFigma = DocumentationPageBlock & {
    url: string | null
  }

  type DocumentationPageBlockEmbedUrl = DocumentationPageBlock & {
    url: string | null
    title: string | null
    description: string | null
    thumbnailUrl: string | null
  }

  type DocumentationPageBlockEmbedYoutube = DocumentationPageBlock & {
    url: string | null
  }

  type DocumentationPageBlockFrames = DocumentationPageBlock & {
    frames: Array<DocumentationPageBlockFrame>
    properties: {
      alignment: FrameAlignment,
      layout: FrameLayout,
      backgroundColor: string | null
    }
  }

  type DocumentationPageBlockFrame = {
    sourceFileId: string
    sourceFrameId: string
    sourceFileName: string

    title: string
    description: string | null
    previewUrl: string | null
    backgroundColor: string | null
  }

  type DocumentationPageBlockShortcuts = DocumentationPageBlock & {
    shortcuts: Array<DocumentationPageBlockShortcut>
  }

  type DocumentationPageBlockShortcut = {
    
    // Visual data
    title: string | null
    description: string | null
    previewUrl: string | null

    // Linking data
    externalUrl: string | null
    internalId: string | null

    // Block type
    type: ShortcutType
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

  //
  // Data Types
  // Subcategory: Components
  //

  type DesignComponentProperty = {
    id: string;
    type: "Boolean";
    name: string;
    defaultValue: boolean;
} | {
    id: string;
    type: "InstanceSwap";
    name: string;
    defaultValue: string;
} | {
    id: string;
    type: "Text";
    name: string;
    defaultValue: string;
} | {
    id: string;
    options: string[];
    type: "Variant";
    name: string;
    defaultValue: string;
}
  
  type DesignComponent = {
    id: string | null
    brandId: string | null
    name: string | null
    description: string | null
    origin: DesignComponentOrigin
    createdAt: string | null
    updatedAt: string | null
    variantPropertyValues: Record<string, string>
    componentPropertyDefinitions: Record<string, DesignComponentProperty>
    subcomponents: Array<DesignComponent>
  }

  type DesignComponentOrigin = {
    sourceId: string
    id: string
    nodeId: string
    name: string
    fileId: string
    fileName: string
    sourceType: "string"
  }

} // declare global

export {}
