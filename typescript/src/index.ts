

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import { experimental_defaultPageStyle, experimental_forcedPageStyle } from "./doc_functionality/experimental"
import { firstPageFromTop, firstSubgroupOfPage, pageOrGroupActiveInContext } from "./doc_functionality/lookup"
import { encodeSandboxData, getFrontendSandboxData, isSandboxDefinition } from "./doc_functionality/sandbox"
import { buildSearchIndexJSON } from "./doc_functionality/search"
import { highlightSafeString } from "./doc_functionality/string_utils"
import { formattedTokenGroupHeader, fullTokenGroupName, gradientDescription, gradientTokenValue, measureTypeIntoReadableUnit, shadowDescription, shadowTokenValue, typographyDescription } from "./doc_functionality/tokens"
import { assetUrl, headingPlainText, pageUrl, rootUrl, slugifyHeading } from "./doc_functionality/urls"

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
Pulsar.registerFunction("headingPlainText", headingPlainText)

/* Sandbox features */
Pulsar.registerFunction("isSandboxDefinition", isSandboxDefinition);
Pulsar.registerFunction("encodeSandboxdata", encodeSandboxData);
Pulsar.registerFunction("getFrontendSandboxData", getFrontendSandboxData);

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
Pulsar.registerFunction("experimentalDefaultPageStyle", experimental_defaultPageStyle);
Pulsar.registerFunction("experimentalForcedPageStyle", experimental_forcedPageStyle);