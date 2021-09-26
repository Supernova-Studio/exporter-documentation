

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import { experimentalDefaultPageStyle, experimentalForcedPageStyle } from "./doc_functionality/experimental"
import { constructDynamicHealthBlock, constructDynamicHealthList, constructGoogleSheetCSVUrl } from "./doc_functionality/health"
import { firstPageFromTop, firstSubgroupOfPage, pageOrGroupActiveInContext } from "./doc_functionality/lookup"
import { markdownToHTML } from "./doc_functionality/markdown"
import { htmlSafeString } from "./doc_functionality/sandbox"
import { buildSearchIndexJSON } from "./doc_functionality/search"
import { highlightSafeString } from "./doc_functionality/string_utils"
import { formattedTokenGroupHeader, fullTokenGroupName, gradientDescription, gradientTokenValue, measureTypeIntoReadableUnit, shadowDescription, shadowTokenValue, typographyDescription } from "./doc_functionality/tokens"
import { assetUrl, textBlockPlainText, pageUrl, rootUrl, slugifyHeading } from "./doc_functionality/urls"

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

/* Local lookup */
Pulsar.registerFunction("firstSubgroupOfPage", firstSubgroupOfPage)
Pulsar.registerFunction("pageOrGroupActiveInContext", pageOrGroupActiveInContext)
Pulsar.registerFunction("firstPageFromTop", firstPageFromTop)

/* String utilities */
Pulsar.registerFunction("highlightSafeString", highlightSafeString)

/* Front-end search support */
Pulsar.registerFunction("buildSearchIndexJSON", buildSearchIndexJSON)

/* URL manipulation and support */
Pulsar.registerFunction("pageUrl", pageUrl)
Pulsar.registerFunction("rootUrl", rootUrl)
Pulsar.registerFunction("assetUrl", assetUrl)
Pulsar.registerFunction("slugifyHeading", slugifyHeading)
Pulsar.registerFunction("textBlockPlainText", textBlockPlainText)

/* Token manipulation and formatting */
Pulsar.registerFunction("formattedTokenGroupHeader", formattedTokenGroupHeader)
Pulsar.registerFunction("fullTokenGroupName", fullTokenGroupName)
Pulsar.registerFunction("gradientDescription", gradientDescription)
Pulsar.registerFunction("gradientTokenValue", gradientTokenValue)
Pulsar.registerFunction("shadowDescription", shadowDescription)
Pulsar.registerFunction("shadowTokenValue", shadowTokenValue)
Pulsar.registerFunction("measureTypeIntoReadableUnit", measureTypeIntoReadableUnit)
Pulsar.registerFunction("typographyDescription", typographyDescription)

/* Experimental area for upcoming editor features */
Pulsar.registerFunction("experimentalDefaultPageStyle", experimentalDefaultPageStyle)
Pulsar.registerFunction("experimentalForcedPageStyle", experimentalForcedPageStyle)

/* Markdown */
Pulsar.registerFunction("markdownToHTML", markdownToHTML)

/* Component Health */
Pulsar.registerFunction("constructDynamicHealthBlock", constructDynamicHealthBlock)
Pulsar.registerFunction("constructDynamicHealthList", constructDynamicHealthList)
Pulsar.registerFunction("constructGoogleSheetCSVUrl", constructGoogleSheetCSVUrl)

/* Sandbox */
Pulsar.registerFunction("htmlSafeString", htmlSafeString)