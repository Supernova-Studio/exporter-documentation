/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/abab/index.js":
/*!************************************!*\
  !*** ./node_modules/abab/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const atob = __webpack_require__(/*! ./lib/atob */ "./node_modules/abab/lib/atob.js");
const btoa = __webpack_require__(/*! ./lib/btoa */ "./node_modules/abab/lib/btoa.js");

module.exports = {
  atob,
  btoa
};


/***/ }),

/***/ "./node_modules/abab/lib/atob.js":
/*!***************************************!*\
  !*** ./node_modules/abab/lib/atob.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Implementation of atob() according to the HTML and Infra specs, except that
 * instead of throwing INVALID_CHARACTER_ERR we return null.
 */
function atob(data) {
  // Web IDL requires DOMStrings to just be converted using ECMAScript
  // ToString, which in our case amounts to using a template literal.
  data = `${data}`;
  // "Remove all ASCII whitespace from data."
  data = data.replace(/[ \t\n\f\r]/g, "");
  // "If data's length divides by 4 leaving no remainder, then: if data ends
  // with one or two U+003D (=) code points, then remove them from data."
  if (data.length % 4 === 0) {
    data = data.replace(/==?$/, "");
  }
  // "If data's length divides by 4 leaving a remainder of 1, then return
  // failure."
  //
  // "If data contains a code point that is not one of
  //
  // U+002B (+)
  // U+002F (/)
  // ASCII alphanumeric
  //
  // then return failure."
  if (data.length % 4 === 1 || /[^+/0-9A-Za-z]/.test(data)) {
    return null;
  }
  // "Let output be an empty byte sequence."
  let output = "";
  // "Let buffer be an empty buffer that can have bits appended to it."
  //
  // We append bits via left-shift and or.  accumulatedBits is used to track
  // when we've gotten to 24 bits.
  let buffer = 0;
  let accumulatedBits = 0;
  // "Let position be a position variable for data, initially pointing at the
  // start of data."
  //
  // "While position does not point past the end of data:"
  for (let i = 0; i < data.length; i++) {
    // "Find the code point pointed to by position in the second column of
    // Table 1: The Base 64 Alphabet of RFC 4648. Let n be the number given in
    // the first cell of the same row.
    //
    // "Append to buffer the six bits corresponding to n, most significant bit
    // first."
    //
    // atobLookup() implements the table from RFC 4648.
    buffer <<= 6;
    buffer |= atobLookup(data[i]);
    accumulatedBits += 6;
    // "If buffer has accumulated 24 bits, interpret them as three 8-bit
    // big-endian numbers. Append three bytes with values equal to those
    // numbers to output, in the same order, and then empty buffer."
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 0xff0000) >> 16);
      output += String.fromCharCode((buffer & 0xff00) >> 8);
      output += String.fromCharCode(buffer & 0xff);
      buffer = accumulatedBits = 0;
    }
    // "Advance position by 1."
  }
  // "If buffer is not empty, it contains either 12 or 18 bits. If it contains
  // 12 bits, then discard the last four and interpret the remaining eight as
  // an 8-bit big-endian number. If it contains 18 bits, then discard the last
  // two and interpret the remaining 16 as two 8-bit big-endian numbers. Append
  // the one or two bytes with values equal to those one or two numbers to
  // output, in the same order."
  if (accumulatedBits === 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits === 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 0xff00) >> 8);
    output += String.fromCharCode(buffer & 0xff);
  }
  // "Return output."
  return output;
}
/**
 * A lookup table for atob(), which converts an ASCII character to the
 * corresponding six-bit number.
 */

const keystr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function atobLookup(chr) {
  const index = keystr.indexOf(chr);
  // Throw exception if character is not in the lookup string; should not be hit in tests
  return index < 0 ? undefined : index;
}

module.exports = atob;


/***/ }),

/***/ "./node_modules/abab/lib/btoa.js":
/*!***************************************!*\
  !*** ./node_modules/abab/lib/btoa.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * btoa() as defined by the HTML and Infra specs, which mostly just references
 * RFC 4648.
 */
function btoa(s) {
  let i;
  // String conversion as required by Web IDL.
  s = `${s}`;
  // "The btoa() method must throw an "InvalidCharacterError" DOMException if
  // data contains any character whose code point is greater than U+00FF."
  for (i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 255) {
      return null;
    }
  }
  let out = "";
  for (i = 0; i < s.length; i += 3) {
    const groupsOfSix = [undefined, undefined, undefined, undefined];
    groupsOfSix[0] = s.charCodeAt(i) >> 2;
    groupsOfSix[1] = (s.charCodeAt(i) & 0x03) << 4;
    if (s.length > i + 1) {
      groupsOfSix[1] |= s.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (s.charCodeAt(i + 1) & 0x0f) << 2;
    }
    if (s.length > i + 2) {
      groupsOfSix[2] |= s.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = s.charCodeAt(i + 2) & 0x3f;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += btoaLookup(groupsOfSix[j]);
      }
    }
  }
  return out;
}

/**
 * Lookup table for btoa(), which converts a six-bit number into the
 * corresponding ASCII character.
 */
const keystr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function btoaLookup(index) {
  if (index >= 0 && index < 64) {
    return keystr[index];
  }

  // Throw INVALID_CHARACTER_ERR exception here -- won't be hit in the tests.
  return undefined;
}

module.exports = btoa;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports  
Object.defineProperty(exports, "__esModule", { value: true });
const abab_1 = __webpack_require__(/*! abab */ "./node_modules/abab/index.js");
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions
Pulsar.registerFunction("pageUrl", pageUrl);
Pulsar.registerFunction("rootUrl", rootUrl);
Pulsar.registerFunction("assetUrl", assetUrl);
Pulsar.registerFunction("highlightSafeString", highlightSafeString);
Pulsar.registerFunction("isExperimentalBlock", isExperimentalBlock);
Pulsar.registerFunction("parseExperimentalBlock", parseExperimentalBlock);
Pulsar.registerFunction("formattedTokenGroupHeader", formattedTokenGroupHeader);
Pulsar.registerFunction("fullTokenGroupName", fullTokenGroupName);
Pulsar.registerFunction("gradientDescription", gradientDescription);
Pulsar.registerFunction("gradientTokenValue", gradientTokenValue);
Pulsar.registerFunction("shadowDescription", shadowDescription);
Pulsar.registerFunction("shadowTokenValue", shadowTokenValue);
Pulsar.registerFunction("measureTypeIntoReadableUnit", measureTypeIntoReadableUnit);
Pulsar.registerFunction("typographyDescription", typographyDescription);
Pulsar.registerFunction("firstSubgroupOfPage", firstSubgroupOfPage);
Pulsar.registerFunction("pageOrGroupActiveInContext", pageOrGroupActiveInContext);
Pulsar.registerFunction("slugifyHeading", slugifyHeading);
Pulsar.registerFunction("headingPlainText", headingPlainText);
Pulsar.registerFunction("firstPageFromTop", firstPageFromTop);
Pulsar.registerFunction("buildSearchIndexJSON", buildSearchIndexJSON);
Pulsar.registerFunction("isSandboxDefinition", isSandboxDefinition);
Pulsar.registerFunction("encodeSandboxdata", encodeSandboxData);
Pulsar.registerFunction("getFrontendSandboxData", getFrontendSandboxData);
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - URLs
/** Generate page slug for the generated page */
function pageUrl(object, prefix) {
    var _a;
    if (object.type === "Group") {
        let group = object;
        let pages = group.children.filter(c => c.type === "Page");
        if (pages.length > 0) {
            return pageUrl(pages[0], prefix);
        }
        else {
            // This is not handled, group must contain page otherwise it should be hidden from generation
            return "";
        }
    }
    let page = object;
    let pageSlug = (_a = page.userSlug) !== null && _a !== void 0 ? _a : page.slug;
    let subpaths = [];
    // Construct group path segments
    let parent = page.parent;
    while (parent) {
        subpaths.push(slugify(parent.title));
        parent = parent.parent;
    }
    // Remove last segment added, because we don't care about root group
    subpaths.pop();
    // Retrieve url-safe path constructed as [host][group-slugs][path-slug][.html]
    let path = [prefix, ...subpaths.reverse(), pageSlug].join("/") + ".html";
    return path;
}
/** Create proper url that changes with the folder-depth of the documentation */
function rootUrl(asset, prefix) {
    let fragments = [prefix, asset];
    // Retrieve url-safe path constructed as [host][asset-slug]
    let path = fragments.join("/");
    return path;
}
/** Create proper url that changes with the folder-depth of the documentation */
function assetUrl(asset, prefix) {
    let assetFolder = "assets";
    let fragments = [prefix, assetFolder, asset];
    // Retrieve url-safe path constructed as [host][asset-folder][asset-slug]
    let path = fragments.join("/");
    return path;
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Experimental features
/** Parse out experimental block, if exists */
function isExperimentalBlock(block) {
    return block.text.spans.length === 1 && block.text.spans[0].text.startsWith("[block:");
}
/** Parse experimental information from the text block, so we can convert it to experimental block  */
function parseExperimentalBlock(block) {
    // This is stupid dumb parsing, but it really is just for that one usecase and will be removed :)
    let text = block.text.spans[0].text;
    text = text.substr(1); // Remove first [
    let blocks = text.split("]"); // Split by ] so we get block:X  and   payload (maybe URL)
    // Parse output
    let payload = blocks[1].trim();
    let blockType = blocks[0].split(":")[1];
    // Extra for tabs, if detected
    let tabs = payload.split("|").map(p => p.trim());
    let headers = new Array();
    let content = new Array();
    tabs.forEach((value, index) => {
        if (index % 2 === 0) {
            headers.push(value);
        }
        else {
            content.push(value);
        }
    });
    // Fallback to some sensible information if user didn't format it too much, or the block is not tab
    // and normalize
    headers = headers.length > 0 ? headers : ["Header"];
    content = content.length > 0 ? content : [payload];
    if (headers.length !== content.length) {
        headers = ["Incorrect tab structure"];
        content = ["Imbalanced number of tab structures, must be pairs of header / content"];
    }
    return {
        blockType: blockType,
        payload: payload,
        tabs: {
            headers: headers,
            content: content
        }
    };
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - String manipulation
/** Escape special characters in the given string of text. Encoding part taken from https://github.com/component/escape-html */
function highlightSafeString(block) {
    // Retrieve raw text, ignore all attributes for now
    let string = block.text.spans.map((s) => s.text).join("");
    // Make sure it is properly safe for HTML rendering
    return escapeHtml(string);
}
function escapeHtml(string) {
    var matchHtmlRegExp = /["'&<>]/;
    var str = "" + string;
    var match = matchHtmlRegExp.exec(str);
    if (!match) {
        return str;
    }
    var escape;
    var html = "";
    var index = 0;
    var lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
                escape = "&quot;";
                break;
            case 38: // &
                escape = "&amp;";
                break;
            case 39: // '
                escape = "&#39;";
                break;
            case 60: // <
                escape = "&lt;";
                break;
            case 62: // >
                escape = "&gt;";
                break;
            default:
                continue;
        }
        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Tokens
/**  Convert group into properly formatted header */
function fullTokenGroupName(tokenGroup) {
    // Retrieve token group path
    return [...tokenGroup.path, tokenGroup.name].join("/");
}
/**  Convert group into properly formatted header */
function formattedTokenGroupHeader(tokenGroup, showSubpath) {
    // Retrieve token group either including or not including the path to the group
    if (tokenGroup.path.length > 0 && showSubpath) {
        let light = tokenGroup.path.join(" / ");
        let dark = tokenGroup.name;
        return `<span class="light">${light} / </span>${dark}`;
    }
    else {
        return tokenGroup.name;
    }
}
/** Describe complex gradient token */
function gradientDescription(gradientToken) {
    // Describe gradient as (type) (stop1, stop2 ...)
    let type = `${gradientToken.value.type} Gradient`;
    let stops = gradientToken.value.stops.map(stop => {
        return `#${stop.color.hex.toUpperCase()}, ${stop.position * 100}%`;
    }).join(", ");
    return `${type}, ${stops}`;
}
/** Describe complex gradient value as token */
function gradientTokenValue(gradientToken) {
    let gradientType = "";
    switch (gradientToken.value.type) {
        case "Linear":
            gradientType = "linear-gradient(0deg, ";
            break;
        case "Radial":
            gradientType = "radial-gradient(circle, ";
            break;
        case "Angular":
            gradientType = "conic-gradient(";
            break;
    }
    // Describe gradient as (type) (stop1, stop2 ...)
    // Example: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
    let stops = gradientToken.value.stops.map(stop => {
        return `#${stop.color.hex.toUpperCase()} ${stop.position * 100}%`;
    }).join(", ");
    return `${gradientType}${stops})`;
}
/** Describe complex shadow token */
function shadowDescription(shadowToken) {
    return shadowTokenValue(shadowToken);
}
/** Describe complex shadow token */
function typographyDescription(typographyToken) {
    let value = typographyToken.value;
    let fontName = `${value.font.family} ${value.font.subfamily}`;
    let fontValue = `${value.fontSize.measure}${measureTypeIntoReadableUnit(value.fontSize.unit)}`;
    let textDecoration = "";
    let textCase = "";
    if (value.textDecoration !== 'None') {
        textDecoration = `, ${value.textDecoration.toLowerCase()}`;
    }
    if (value.textCase !== 'Original') {
        textCase = `, ${value.textCase.toLowerCase()}`;
    }
    return `${fontName} ${fontValue}${textDecoration}${textCase}`;
}
/** Describe complex shadow value as token */
function shadowTokenValue(shadowToken) {
    return `${shadowToken.value.x.measure}px ${shadowToken.value.y.measure}px ${shadowToken.value.radius.measure}px ${shadowToken.value.spread.measure}px #${shadowToken.value.color.hex}`;
}
/** Describe complex gradient value as token */
function measureTypeIntoReadableUnit(type) {
    switch (type) {
        case 'Points': return 'pt';
        case 'Pixels': return 'px';
        case 'Percent': return '%';
        case 'Ems': return 'em';
    }
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Support
/** Retrieve first subgroup below root group */
function firstSubgroupOfPage(page) {
    let parent = page.parent;
    while (true) {
        if (!parent || parent.isRoot) {
            return undefined;
        }
        if (parent.parent && parent.parent.isRoot) {
            return parent;
        }
        parent = parent.parent;
    }
}
function pageOrGroupActiveInContext(pageOrGroup, context) {
    if (context.type === "Page") {
        // If we are checking against plain page, then we can only compare
        let contextPage = context;
        return contextPage.id === pageOrGroup.id;
    }
    else {
        // If we are checking against group, check everything upwards the tree. If group contains the page, return that information
        let contextGroup = context;
        if (contextGroup.childrenIds.indexOf(pageOrGroup.persistentId) !== -1) {
            return true;
        }
        else if (pageOrGroup.parent) {
            return pageOrGroupActiveInContext(pageOrGroup.parent, contextGroup);
        }
        else {
            // Reached root and didn't find anything, abandon ship
            return false;
        }
    }
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Headings
function headingPlainText(header) {
    return header.text.spans.map(s => s.text).join("");
}
function slugifyHeading(header) {
    let fullText = headingPlainText(header);
    return slugify(fullText);
}
function slugify(str) {
    // Thanks to https://gist.github.com/codeguy/6684588
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    // remove accents, swap ñ for n, etc
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    return str;
}
function firstPageFromTop(documentationRoot) {
    for (let child of documentationRoot.children) {
        if (child.type === "Page") {
            return child;
        }
        else {
            let possiblePage = firstPageFromTop(child);
            if (possiblePage) {
                return possiblePage;
            }
        }
    }
    return null;
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Search index processing
function buildSearchIndexJSON(pages, domain) {
    // Very naive search index implementation. The performance of this will be absolutely abysmal. 
    // This will get optimized when the core search works over time. Probably moved to elastic search or something like that
    let id = 0;
    let data = [];
    // Process every page for data
    for (let page of pages) {
        // Basic information
        let name = page.title;
        // Path and url creation
        let subpaths = [name];
        let parent = page.parent;
        while (parent) {
            if (parent === null || parent === void 0 ? void 0 : parent.isRoot) {
                break;
            }
            subpaths.splice(0, 0, parent.title);
            parent = parent.parent;
        }
        let path = subpaths.join(" / ");
        let url = pageUrl(page, domain);
        // Header and text parsing
        let allBlocks = flattenedBlocksOfPage(page);
        var texts = [];
        var headers = [];
        for (let block of allBlocks) {
            if (block.type === "Text" || block.type === "Callout" || block.type === "OrderedList" || block.type === "UnorderedList" || block.type === "Quote") {
                let text = textOfBlock(block);
                if (text.length > 0) {
                    texts.push(text);
                }
            }
            else if (block.type === "Heading") {
                let text = textOfBlock(block);
                if (text.length > 0) {
                    headers.push(text);
                }
            }
        }
        // Construct pieces from text information
        for (let text of texts) {
            data.push({
                id: id++,
                name: name,
                path: path,
                url: url,
                text: text,
                type: "body"
            });
        }
        // Construct pieces from headers
        for (let header of headers) {
            data.push({
                id: id++,
                name: name,
                path: path,
                url: url,
                text: header,
                type: "header"
            });
        }
    }
    // Construct data and make index readable for easier debugging for now
    // return JSON.stringify(data, null, 2)
    // Experimental: Create index. WIP: Pregenerate loaded index
    let si = `
  const lunrData = ${JSON.stringify(data, null, 2)};
  const lunrIndexedData = {}
  const lunrIndex = lunr(function () {
    this.field('text')
    this.ref('id')
    this.metadataWhitelist = ['position']
  
    // Note index has been loaded into the page with page request
    lunrData.forEach(function (doc) {
      this.add(doc)
      lunrIndexedData[doc.id] = doc
    }, this)
  });
  `;
    return si;
}
function flattenedBlocksOfPage(page) {
    let blocks = page.blocks;
    for (let block of page.blocks) {
        blocks = blocks.concat(flattenedBlocksOfBlock(block));
    }
    return blocks;
}
function flattenedBlocksOfBlock(block) {
    let subblocks = block.children;
    for (let subblock of block.children) {
        subblocks = subblocks.concat(flattenedBlocksOfBlock(subblock));
    }
    return subblocks;
}
function textOfBlock(block) {
    return block.text.spans.map(s => s.text).join("");
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Live sandbox support
function isSandboxDefinition(block) {
    let string = block.text.spans.map(s => s.text).join("");
    return string.startsWith("Mode:SANDBOX");
}
function encodeSandboxData(block) {
    // Encode object
    let sandboxData = parseSandboxBlockData(block);
    return abab_1.btoa(JSON.stringify(sandboxData));
}
function getFrontendSandboxData(block) {
    var _a;
    let sandboxData = parseSandboxBlockData(block);
    let visualPayload = sandboxData.visual;
    // Basic HTML encoding
    let encodedHTMLString = sandboxData.code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return {
        code: encodedHTMLString,
        showCodeByDefault: visualPayload === null || visualPayload === void 0 ? void 0 : visualPayload.showCodeByDefault,
        height: (visualPayload === null || visualPayload === void 0 ? void 0 : visualPayload.forcedHeight) ? `${visualPayload === null || visualPayload === void 0 ? void 0 : visualPayload.forcedHeight}px` : `auto`,
        editable: (_a = visualPayload === null || visualPayload === void 0 ? void 0 : visualPayload.editable) !== null && _a !== void 0 ? _a : false,
    };
}
function parseSandboxBlockData(block) {
    let definitionParts = block.text.spans.map(s => s.text).join("").split("---");
    // Parse configuration
    let modeString = definitionParts[0];
    let configurations = {};
    for (let configurationLine of modeString.split("\n")) {
        let parts = configurationLine.split(":");
        if (parts.length === 2) {
            let configKey = cleanupString(parts[0]);
            let configValue = cleanupString(parts[1]);
            configurations[configKey] = configValue;
        }
        {
            // Ignore because configuration always has to be setup
        }
    }
    // Parse dependencies
    let dependencyString = definitionParts[1];
    let dependencies = {};
    for (let dependencyLine of dependencyString.split("\n")) {
        let parts = dependencyLine.split(":");
        if (parts.length === 2) {
            // Cleanup and remove quotes, if any
            let depName = cleanupString(parts[0]);
            if (depName.length > 0) {
                let depVersion = cleanupString(parts[1]);
                dependencies[depName] = depVersion;
            }
            else {
                // Ignore as it is empty and therefore corrupted
            }
        }
        else if (parts.length === 1) {
            let depName = cleanupString(dependencyLine);
            if (depName.length > 0) {
                let depVersion = "latest";
                dependencies[depName] = depVersion;
            }
            else {
                // Ignore as it is empty and therefore corrupted
            }
        }
        else {
            // Ignore as it is unknown or corrupted
        }
    }
    // Parse script
    let codeString = definitionParts[2];
    // Parse visual configuration object
    const visualConfiguration = {};
    if (configurations["Horizontal"]) {
        visualConfiguration["horizontalAlignment"] = configurations["Horizontal"];
    }
    if (configurations["Vertical"]) {
        visualConfiguration["verticalAlignment"] = configurations["Vertical"];
    }
    if (configurations["Background"]) {
        visualConfiguration["backgroundHex"] = configurations["Background"];
    }
    if (configurations["Sandbox"]) {
        visualConfiguration["showSandbox"] = true; // whatever is configured will result to true
    }
    if (configurations["Height"]) {
        visualConfiguration["forcedHeight"] = configurations["Height"]; // whatever is configured will result to true
    }
    if (configurations["Code"]) {
        visualConfiguration["showCodeByDefault"] = true;
    }
    if (configurations["Editable"]) {
        visualConfiguration["editable"] = true;
    }
    // Create object and encode it
    const sandboxPayload = {
        type: "react",
        code: codeString,
        dependencies: dependencies,
        visual: visualConfiguration
    };
    return sandboxPayload;
}
function cleanupString(string) {
    return string.trim().replace(/^"(.*)"$/, '$1');
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FiYWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FiYWIvbGliL2F0b2IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FiYWIvbGliL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLG1EQUFZO0FBQ2pDLGFBQWEsbUJBQU8sQ0FBQyxtREFBWTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNSYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksS0FBSztBQUNqQjtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSx1RUFBdUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianNfaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGF0b2IgPSByZXF1aXJlKFwiLi9saWIvYXRvYlwiKTtcbmNvbnN0IGJ0b2EgPSByZXF1aXJlKFwiLi9saWIvYnRvYVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF0b2IsXG4gIGJ0b2Fcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBhdG9iKCkgYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGFuZCBJbmZyYSBzcGVjcywgZXhjZXB0IHRoYXRcbiAqIGluc3RlYWQgb2YgdGhyb3dpbmcgSU5WQUxJRF9DSEFSQUNURVJfRVJSIHdlIHJldHVybiBudWxsLlxuICovXG5mdW5jdGlvbiBhdG9iKGRhdGEpIHtcbiAgLy8gV2ViIElETCByZXF1aXJlcyBET01TdHJpbmdzIHRvIGp1c3QgYmUgY29udmVydGVkIHVzaW5nIEVDTUFTY3JpcHRcbiAgLy8gVG9TdHJpbmcsIHdoaWNoIGluIG91ciBjYXNlIGFtb3VudHMgdG8gdXNpbmcgYSB0ZW1wbGF0ZSBsaXRlcmFsLlxuICBkYXRhID0gYCR7ZGF0YX1gO1xuICAvLyBcIlJlbW92ZSBhbGwgQVNDSUkgd2hpdGVzcGFjZSBmcm9tIGRhdGEuXCJcbiAgZGF0YSA9IGRhdGEucmVwbGFjZSgvWyBcXHRcXG5cXGZcXHJdL2csIFwiXCIpO1xuICAvLyBcIklmIGRhdGEncyBsZW5ndGggZGl2aWRlcyBieSA0IGxlYXZpbmcgbm8gcmVtYWluZGVyLCB0aGVuOiBpZiBkYXRhIGVuZHNcbiAgLy8gd2l0aCBvbmUgb3IgdHdvIFUrMDAzRCAoPSkgY29kZSBwb2ludHMsIHRoZW4gcmVtb3ZlIHRoZW0gZnJvbSBkYXRhLlwiXG4gIGlmIChkYXRhLmxlbmd0aCAlIDQgPT09IDApIHtcbiAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC89PT8kLywgXCJcIik7XG4gIH1cbiAgLy8gXCJJZiBkYXRhJ3MgbGVuZ3RoIGRpdmlkZXMgYnkgNCBsZWF2aW5nIGEgcmVtYWluZGVyIG9mIDEsIHRoZW4gcmV0dXJuXG4gIC8vIGZhaWx1cmUuXCJcbiAgLy9cbiAgLy8gXCJJZiBkYXRhIGNvbnRhaW5zIGEgY29kZSBwb2ludCB0aGF0IGlzIG5vdCBvbmUgb2ZcbiAgLy9cbiAgLy8gVSswMDJCICgrKVxuICAvLyBVKzAwMkYgKC8pXG4gIC8vIEFTQ0lJIGFscGhhbnVtZXJpY1xuICAvL1xuICAvLyB0aGVuIHJldHVybiBmYWlsdXJlLlwiXG4gIGlmIChkYXRhLmxlbmd0aCAlIDQgPT09IDEgfHwgL1teKy8wLTlBLVphLXpdLy50ZXN0KGRhdGEpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gXCJMZXQgb3V0cHV0IGJlIGFuIGVtcHR5IGJ5dGUgc2VxdWVuY2UuXCJcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIC8vIFwiTGV0IGJ1ZmZlciBiZSBhbiBlbXB0eSBidWZmZXIgdGhhdCBjYW4gaGF2ZSBiaXRzIGFwcGVuZGVkIHRvIGl0LlwiXG4gIC8vXG4gIC8vIFdlIGFwcGVuZCBiaXRzIHZpYSBsZWZ0LXNoaWZ0IGFuZCBvci4gIGFjY3VtdWxhdGVkQml0cyBpcyB1c2VkIHRvIHRyYWNrXG4gIC8vIHdoZW4gd2UndmUgZ290dGVuIHRvIDI0IGJpdHMuXG4gIGxldCBidWZmZXIgPSAwO1xuICBsZXQgYWNjdW11bGF0ZWRCaXRzID0gMDtcbiAgLy8gXCJMZXQgcG9zaXRpb24gYmUgYSBwb3NpdGlvbiB2YXJpYWJsZSBmb3IgZGF0YSwgaW5pdGlhbGx5IHBvaW50aW5nIGF0IHRoZVxuICAvLyBzdGFydCBvZiBkYXRhLlwiXG4gIC8vXG4gIC8vIFwiV2hpbGUgcG9zaXRpb24gZG9lcyBub3QgcG9pbnQgcGFzdCB0aGUgZW5kIG9mIGRhdGE6XCJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gXCJGaW5kIHRoZSBjb2RlIHBvaW50IHBvaW50ZWQgdG8gYnkgcG9zaXRpb24gaW4gdGhlIHNlY29uZCBjb2x1bW4gb2ZcbiAgICAvLyBUYWJsZSAxOiBUaGUgQmFzZSA2NCBBbHBoYWJldCBvZiBSRkMgNDY0OC4gTGV0IG4gYmUgdGhlIG51bWJlciBnaXZlbiBpblxuICAgIC8vIHRoZSBmaXJzdCBjZWxsIG9mIHRoZSBzYW1lIHJvdy5cbiAgICAvL1xuICAgIC8vIFwiQXBwZW5kIHRvIGJ1ZmZlciB0aGUgc2l4IGJpdHMgY29ycmVzcG9uZGluZyB0byBuLCBtb3N0IHNpZ25pZmljYW50IGJpdFxuICAgIC8vIGZpcnN0LlwiXG4gICAgLy9cbiAgICAvLyBhdG9iTG9va3VwKCkgaW1wbGVtZW50cyB0aGUgdGFibGUgZnJvbSBSRkMgNDY0OC5cbiAgICBidWZmZXIgPDw9IDY7XG4gICAgYnVmZmVyIHw9IGF0b2JMb29rdXAoZGF0YVtpXSk7XG4gICAgYWNjdW11bGF0ZWRCaXRzICs9IDY7XG4gICAgLy8gXCJJZiBidWZmZXIgaGFzIGFjY3VtdWxhdGVkIDI0IGJpdHMsIGludGVycHJldCB0aGVtIGFzIHRocmVlIDgtYml0XG4gICAgLy8gYmlnLWVuZGlhbiBudW1iZXJzLiBBcHBlbmQgdGhyZWUgYnl0ZXMgd2l0aCB2YWx1ZXMgZXF1YWwgdG8gdGhvc2VcbiAgICAvLyBudW1iZXJzIHRvIG91dHB1dCwgaW4gdGhlIHNhbWUgb3JkZXIsIGFuZCB0aGVuIGVtcHR5IGJ1ZmZlci5cIlxuICAgIGlmIChhY2N1bXVsYXRlZEJpdHMgPT09IDI0KSB7XG4gICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYnVmZmVyICYgMHhmZjAwMDApID4+IDE2KTtcbiAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChidWZmZXIgJiAweGZmMDApID4+IDgpO1xuICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmZmVyICYgMHhmZik7XG4gICAgICBidWZmZXIgPSBhY2N1bXVsYXRlZEJpdHMgPSAwO1xuICAgIH1cbiAgICAvLyBcIkFkdmFuY2UgcG9zaXRpb24gYnkgMS5cIlxuICB9XG4gIC8vIFwiSWYgYnVmZmVyIGlzIG5vdCBlbXB0eSwgaXQgY29udGFpbnMgZWl0aGVyIDEyIG9yIDE4IGJpdHMuIElmIGl0IGNvbnRhaW5zXG4gIC8vIDEyIGJpdHMsIHRoZW4gZGlzY2FyZCB0aGUgbGFzdCBmb3VyIGFuZCBpbnRlcnByZXQgdGhlIHJlbWFpbmluZyBlaWdodCBhc1xuICAvLyBhbiA4LWJpdCBiaWctZW5kaWFuIG51bWJlci4gSWYgaXQgY29udGFpbnMgMTggYml0cywgdGhlbiBkaXNjYXJkIHRoZSBsYXN0XG4gIC8vIHR3byBhbmQgaW50ZXJwcmV0IHRoZSByZW1haW5pbmcgMTYgYXMgdHdvIDgtYml0IGJpZy1lbmRpYW4gbnVtYmVycy4gQXBwZW5kXG4gIC8vIHRoZSBvbmUgb3IgdHdvIGJ5dGVzIHdpdGggdmFsdWVzIGVxdWFsIHRvIHRob3NlIG9uZSBvciB0d28gbnVtYmVycyB0b1xuICAvLyBvdXRwdXQsIGluIHRoZSBzYW1lIG9yZGVyLlwiXG4gIGlmIChhY2N1bXVsYXRlZEJpdHMgPT09IDEyKSB7XG4gICAgYnVmZmVyID4+PSA0O1xuICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZmZlcik7XG4gIH0gZWxzZSBpZiAoYWNjdW11bGF0ZWRCaXRzID09PSAxOCkge1xuICAgIGJ1ZmZlciA+Pj0gMjtcbiAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYnVmZmVyICYgMHhmZjAwKSA+PiA4KTtcbiAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZmZXIgJiAweGZmKTtcbiAgfVxuICAvLyBcIlJldHVybiBvdXRwdXQuXCJcbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQSBsb29rdXAgdGFibGUgZm9yIGF0b2IoKSwgd2hpY2ggY29udmVydHMgYW4gQVNDSUkgY2hhcmFjdGVyIHRvIHRoZVxuICogY29ycmVzcG9uZGluZyBzaXgtYml0IG51bWJlci5cbiAqL1xuXG5jb25zdCBrZXlzdHIgPVxuICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcblxuZnVuY3Rpb24gYXRvYkxvb2t1cChjaHIpIHtcbiAgY29uc3QgaW5kZXggPSBrZXlzdHIuaW5kZXhPZihjaHIpO1xuICAvLyBUaHJvdyBleGNlcHRpb24gaWYgY2hhcmFjdGVyIGlzIG5vdCBpbiB0aGUgbG9va3VwIHN0cmluZzsgc2hvdWxkIG5vdCBiZSBoaXQgaW4gdGVzdHNcbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGluZGV4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGF0b2I7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBidG9hKCkgYXMgZGVmaW5lZCBieSB0aGUgSFRNTCBhbmQgSW5mcmEgc3BlY3MsIHdoaWNoIG1vc3RseSBqdXN0IHJlZmVyZW5jZXNcbiAqIFJGQyA0NjQ4LlxuICovXG5mdW5jdGlvbiBidG9hKHMpIHtcbiAgbGV0IGk7XG4gIC8vIFN0cmluZyBjb252ZXJzaW9uIGFzIHJlcXVpcmVkIGJ5IFdlYiBJREwuXG4gIHMgPSBgJHtzfWA7XG4gIC8vIFwiVGhlIGJ0b2EoKSBtZXRob2QgbXVzdCB0aHJvdyBhbiBcIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiIERPTUV4Y2VwdGlvbiBpZlxuICAvLyBkYXRhIGNvbnRhaW5zIGFueSBjaGFyYWN0ZXIgd2hvc2UgY29kZSBwb2ludCBpcyBncmVhdGVyIHRoYW4gVSswMEZGLlwiXG4gIGZvciAoaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHMuY2hhckNvZGVBdChpKSA+IDI1NSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIGxldCBvdXQgPSBcIlwiO1xuICBmb3IgKGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkgKz0gMykge1xuICAgIGNvbnN0IGdyb3Vwc09mU2l4ID0gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF07XG4gICAgZ3JvdXBzT2ZTaXhbMF0gPSBzLmNoYXJDb2RlQXQoaSkgPj4gMjtcbiAgICBncm91cHNPZlNpeFsxXSA9IChzLmNoYXJDb2RlQXQoaSkgJiAweDAzKSA8PCA0O1xuICAgIGlmIChzLmxlbmd0aCA+IGkgKyAxKSB7XG4gICAgICBncm91cHNPZlNpeFsxXSB8PSBzLmNoYXJDb2RlQXQoaSArIDEpID4+IDQ7XG4gICAgICBncm91cHNPZlNpeFsyXSA9IChzLmNoYXJDb2RlQXQoaSArIDEpICYgMHgwZikgPDwgMjtcbiAgICB9XG4gICAgaWYgKHMubGVuZ3RoID4gaSArIDIpIHtcbiAgICAgIGdyb3Vwc09mU2l4WzJdIHw9IHMuY2hhckNvZGVBdChpICsgMikgPj4gNjtcbiAgICAgIGdyb3Vwc09mU2l4WzNdID0gcy5jaGFyQ29kZUF0KGkgKyAyKSAmIDB4M2Y7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3JvdXBzT2ZTaXgubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmICh0eXBlb2YgZ3JvdXBzT2ZTaXhbal0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgb3V0ICs9IFwiPVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0ICs9IGJ0b2FMb29rdXAoZ3JvdXBzT2ZTaXhbal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIExvb2t1cCB0YWJsZSBmb3IgYnRvYSgpLCB3aGljaCBjb252ZXJ0cyBhIHNpeC1iaXQgbnVtYmVyIGludG8gdGhlXG4gKiBjb3JyZXNwb25kaW5nIEFTQ0lJIGNoYXJhY3Rlci5cbiAqL1xuY29uc3Qga2V5c3RyID1cbiAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG5cbmZ1bmN0aW9uIGJ0b2FMb29rdXAoaW5kZXgpIHtcbiAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCA2NCkge1xuICAgIHJldHVybiBrZXlzdHJbaW5kZXhdO1xuICB9XG5cbiAgLy8gVGhyb3cgSU5WQUxJRF9DSEFSQUNURVJfRVJSIGV4Y2VwdGlvbiBoZXJlIC0tIHdvbid0IGJlIGhpdCBpbiB0aGUgdGVzdHMuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBJbXBvcnRzICBcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFiYWJfMSA9IHJlcXVpcmUoXCJhYmFiXCIpO1xuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBCbHVlcHJpbnQgZnVuY3Rpb25zXG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInBhZ2VVcmxcIiwgcGFnZVVybCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInJvb3RVcmxcIiwgcm9vdFVybCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImFzc2V0VXJsXCIsIGFzc2V0VXJsKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiaGlnaGxpZ2h0U2FmZVN0cmluZ1wiLCBoaWdobGlnaHRTYWZlU3RyaW5nKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiaXNFeHBlcmltZW50YWxCbG9ja1wiLCBpc0V4cGVyaW1lbnRhbEJsb2NrKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicGFyc2VFeHBlcmltZW50YWxCbG9ja1wiLCBwYXJzZUV4cGVyaW1lbnRhbEJsb2NrKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZm9ybWF0dGVkVG9rZW5Hcm91cEhlYWRlclwiLCBmb3JtYXR0ZWRUb2tlbkdyb3VwSGVhZGVyKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZnVsbFRva2VuR3JvdXBOYW1lXCIsIGZ1bGxUb2tlbkdyb3VwTmFtZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImdyYWRpZW50RGVzY3JpcHRpb25cIiwgZ3JhZGllbnREZXNjcmlwdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImdyYWRpZW50VG9rZW5WYWx1ZVwiLCBncmFkaWVudFRva2VuVmFsdWUpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzaGFkb3dEZXNjcmlwdGlvblwiLCBzaGFkb3dEZXNjcmlwdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInNoYWRvd1Rva2VuVmFsdWVcIiwgc2hhZG93VG9rZW5WYWx1ZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcIm1lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdFwiLCBtZWFzdXJlVHlwZUludG9SZWFkYWJsZVVuaXQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJ0eXBvZ3JhcGh5RGVzY3JpcHRpb25cIiwgdHlwb2dyYXBoeURlc2NyaXB0aW9uKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZmlyc3RTdWJncm91cE9mUGFnZVwiLCBmaXJzdFN1Ymdyb3VwT2ZQYWdlKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHRcIiwgcGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzbHVnaWZ5SGVhZGluZ1wiLCBzbHVnaWZ5SGVhZGluZyk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImhlYWRpbmdQbGFpblRleHRcIiwgaGVhZGluZ1BsYWluVGV4dCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImZpcnN0UGFnZUZyb21Ub3BcIiwgZmlyc3RQYWdlRnJvbVRvcCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImJ1aWxkU2VhcmNoSW5kZXhKU09OXCIsIGJ1aWxkU2VhcmNoSW5kZXhKU09OKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiaXNTYW5kYm94RGVmaW5pdGlvblwiLCBpc1NhbmRib3hEZWZpbml0aW9uKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZW5jb2RlU2FuZGJveGRhdGFcIiwgZW5jb2RlU2FuZGJveERhdGEpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJnZXRGcm9udGVuZFNhbmRib3hEYXRhXCIsIGdldEZyb250ZW5kU2FuZGJveERhdGEpO1xuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBVUkxzXG4vKiogR2VuZXJhdGUgcGFnZSBzbHVnIGZvciB0aGUgZ2VuZXJhdGVkIHBhZ2UgKi9cbmZ1bmN0aW9uIHBhZ2VVcmwob2JqZWN0LCBwcmVmaXgpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKG9iamVjdC50eXBlID09PSBcIkdyb3VwXCIpIHtcbiAgICAgICAgbGV0IGdyb3VwID0gb2JqZWN0O1xuICAgICAgICBsZXQgcGFnZXMgPSBncm91cC5jaGlsZHJlbi5maWx0ZXIoYyA9PiBjLnR5cGUgPT09IFwiUGFnZVwiKTtcbiAgICAgICAgaWYgKHBhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBwYWdlVXJsKHBhZ2VzWzBdLCBwcmVmaXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBub3QgaGFuZGxlZCwgZ3JvdXAgbXVzdCBjb250YWluIHBhZ2Ugb3RoZXJ3aXNlIGl0IHNob3VsZCBiZSBoaWRkZW4gZnJvbSBnZW5lcmF0aW9uXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcGFnZSA9IG9iamVjdDtcbiAgICBsZXQgcGFnZVNsdWcgPSAoX2EgPSBwYWdlLnVzZXJTbHVnKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBwYWdlLnNsdWc7XG4gICAgbGV0IHN1YnBhdGhzID0gW107XG4gICAgLy8gQ29uc3RydWN0IGdyb3VwIHBhdGggc2VnbWVudHNcbiAgICBsZXQgcGFyZW50ID0gcGFnZS5wYXJlbnQ7XG4gICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICBzdWJwYXRocy5wdXNoKHNsdWdpZnkocGFyZW50LnRpdGxlKSk7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBsYXN0IHNlZ21lbnQgYWRkZWQsIGJlY2F1c2Ugd2UgZG9uJ3QgY2FyZSBhYm91dCByb290IGdyb3VwXG4gICAgc3VicGF0aHMucG9wKCk7XG4gICAgLy8gUmV0cmlldmUgdXJsLXNhZmUgcGF0aCBjb25zdHJ1Y3RlZCBhcyBbaG9zdF1bZ3JvdXAtc2x1Z3NdW3BhdGgtc2x1Z11bLmh0bWxdXG4gICAgbGV0IHBhdGggPSBbcHJlZml4LCAuLi5zdWJwYXRocy5yZXZlcnNlKCksIHBhZ2VTbHVnXS5qb2luKFwiL1wiKSArIFwiLmh0bWxcIjtcbiAgICByZXR1cm4gcGF0aDtcbn1cbi8qKiBDcmVhdGUgcHJvcGVyIHVybCB0aGF0IGNoYW5nZXMgd2l0aCB0aGUgZm9sZGVyLWRlcHRoIG9mIHRoZSBkb2N1bWVudGF0aW9uICovXG5mdW5jdGlvbiByb290VXJsKGFzc2V0LCBwcmVmaXgpIHtcbiAgICBsZXQgZnJhZ21lbnRzID0gW3ByZWZpeCwgYXNzZXRdO1xuICAgIC8vIFJldHJpZXZlIHVybC1zYWZlIHBhdGggY29uc3RydWN0ZWQgYXMgW2hvc3RdW2Fzc2V0LXNsdWddXG4gICAgbGV0IHBhdGggPSBmcmFnbWVudHMuam9pbihcIi9cIik7XG4gICAgcmV0dXJuIHBhdGg7XG59XG4vKiogQ3JlYXRlIHByb3BlciB1cmwgdGhhdCBjaGFuZ2VzIHdpdGggdGhlIGZvbGRlci1kZXB0aCBvZiB0aGUgZG9jdW1lbnRhdGlvbiAqL1xuZnVuY3Rpb24gYXNzZXRVcmwoYXNzZXQsIHByZWZpeCkge1xuICAgIGxldCBhc3NldEZvbGRlciA9IFwiYXNzZXRzXCI7XG4gICAgbGV0IGZyYWdtZW50cyA9IFtwcmVmaXgsIGFzc2V0Rm9sZGVyLCBhc3NldF07XG4gICAgLy8gUmV0cmlldmUgdXJsLXNhZmUgcGF0aCBjb25zdHJ1Y3RlZCBhcyBbaG9zdF1bYXNzZXQtZm9sZGVyXVthc3NldC1zbHVnXVxuICAgIGxldCBwYXRoID0gZnJhZ21lbnRzLmpvaW4oXCIvXCIpO1xuICAgIHJldHVybiBwYXRoO1xufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBFeHBlcmltZW50YWwgZmVhdHVyZXNcbi8qKiBQYXJzZSBvdXQgZXhwZXJpbWVudGFsIGJsb2NrLCBpZiBleGlzdHMgKi9cbmZ1bmN0aW9uIGlzRXhwZXJpbWVudGFsQmxvY2soYmxvY2spIHtcbiAgICByZXR1cm4gYmxvY2sudGV4dC5zcGFucy5sZW5ndGggPT09IDEgJiYgYmxvY2sudGV4dC5zcGFuc1swXS50ZXh0LnN0YXJ0c1dpdGgoXCJbYmxvY2s6XCIpO1xufVxuLyoqIFBhcnNlIGV4cGVyaW1lbnRhbCBpbmZvcm1hdGlvbiBmcm9tIHRoZSB0ZXh0IGJsb2NrLCBzbyB3ZSBjYW4gY29udmVydCBpdCB0byBleHBlcmltZW50YWwgYmxvY2sgICovXG5mdW5jdGlvbiBwYXJzZUV4cGVyaW1lbnRhbEJsb2NrKGJsb2NrKSB7XG4gICAgLy8gVGhpcyBpcyBzdHVwaWQgZHVtYiBwYXJzaW5nLCBidXQgaXQgcmVhbGx5IGlzIGp1c3QgZm9yIHRoYXQgb25lIHVzZWNhc2UgYW5kIHdpbGwgYmUgcmVtb3ZlZCA6KVxuICAgIGxldCB0ZXh0ID0gYmxvY2sudGV4dC5zcGFuc1swXS50ZXh0O1xuICAgIHRleHQgPSB0ZXh0LnN1YnN0cigxKTsgLy8gUmVtb3ZlIGZpcnN0IFtcbiAgICBsZXQgYmxvY2tzID0gdGV4dC5zcGxpdChcIl1cIik7IC8vIFNwbGl0IGJ5IF0gc28gd2UgZ2V0IGJsb2NrOlggIGFuZCAgIHBheWxvYWQgKG1heWJlIFVSTClcbiAgICAvLyBQYXJzZSBvdXRwdXRcbiAgICBsZXQgcGF5bG9hZCA9IGJsb2Nrc1sxXS50cmltKCk7XG4gICAgbGV0IGJsb2NrVHlwZSA9IGJsb2Nrc1swXS5zcGxpdChcIjpcIilbMV07XG4gICAgLy8gRXh0cmEgZm9yIHRhYnMsIGlmIGRldGVjdGVkXG4gICAgbGV0IHRhYnMgPSBwYXlsb2FkLnNwbGl0KFwifFwiKS5tYXAocCA9PiBwLnRyaW0oKSk7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgY29udGVudCA9IG5ldyBBcnJheSgpO1xuICAgIHRhYnMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIGhlYWRlcnMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gRmFsbGJhY2sgdG8gc29tZSBzZW5zaWJsZSBpbmZvcm1hdGlvbiBpZiB1c2VyIGRpZG4ndCBmb3JtYXQgaXQgdG9vIG11Y2gsIG9yIHRoZSBibG9jayBpcyBub3QgdGFiXG4gICAgLy8gYW5kIG5vcm1hbGl6ZVxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLmxlbmd0aCA+IDAgPyBoZWFkZXJzIDogW1wiSGVhZGVyXCJdO1xuICAgIGNvbnRlbnQgPSBjb250ZW50Lmxlbmd0aCA+IDAgPyBjb250ZW50IDogW3BheWxvYWRdO1xuICAgIGlmIChoZWFkZXJzLmxlbmd0aCAhPT0gY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgaGVhZGVycyA9IFtcIkluY29ycmVjdCB0YWIgc3RydWN0dXJlXCJdO1xuICAgICAgICBjb250ZW50ID0gW1wiSW1iYWxhbmNlZCBudW1iZXIgb2YgdGFiIHN0cnVjdHVyZXMsIG11c3QgYmUgcGFpcnMgb2YgaGVhZGVyIC8gY29udGVudFwiXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYmxvY2tUeXBlOiBibG9ja1R5cGUsXG4gICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XG4gICAgICAgIH1cbiAgICB9O1xufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBTdHJpbmcgbWFuaXB1bGF0aW9uXG4vKiogRXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiB0aGUgZ2l2ZW4gc3RyaW5nIG9mIHRleHQuIEVuY29kaW5nIHBhcnQgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vY29tcG9uZW50L2VzY2FwZS1odG1sICovXG5mdW5jdGlvbiBoaWdobGlnaHRTYWZlU3RyaW5nKGJsb2NrKSB7XG4gICAgLy8gUmV0cmlldmUgcmF3IHRleHQsIGlnbm9yZSBhbGwgYXR0cmlidXRlcyBmb3Igbm93XG4gICAgbGV0IHN0cmluZyA9IGJsb2NrLnRleHQuc3BhbnMubWFwKChzKSA9PiBzLnRleHQpLmpvaW4oXCJcIik7XG4gICAgLy8gTWFrZSBzdXJlIGl0IGlzIHByb3Blcmx5IHNhZmUgZm9yIEhUTUwgcmVuZGVyaW5nXG4gICAgcmV0dXJuIGVzY2FwZUh0bWwoc3RyaW5nKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgdmFyIG1hdGNoSHRtbFJlZ0V4cCA9IC9bXCInJjw+XS87XG4gICAgdmFyIHN0ciA9IFwiXCIgKyBzdHJpbmc7XG4gICAgdmFyIG1hdGNoID0gbWF0Y2hIdG1sUmVnRXhwLmV4ZWMoc3RyKTtcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHZhciBlc2NhcGU7XG4gICAgdmFyIGh0bWwgPSBcIlwiO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGxhc3RJbmRleCA9IDA7XG4gICAgZm9yIChpbmRleCA9IG1hdGNoLmluZGV4OyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgc3dpdGNoIChzdHIuY2hhckNvZGVBdChpbmRleCkpIHtcbiAgICAgICAgICAgIGNhc2UgMzQ6IC8vIFwiXG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImcXVvdDtcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6IC8vICZcbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiZhbXA7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OiAvLyAnXG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImIzM5O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2MDogLy8gPFxuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJmx0O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2MjogLy8gPlxuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJmd0O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgaHRtbCArPSBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgaHRtbCArPSBlc2NhcGU7XG4gICAgfVxuICAgIHJldHVybiBsYXN0SW5kZXggIT09IGluZGV4ID8gaHRtbCArIHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCkgOiBodG1sO1xufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBUb2tlbnNcbi8qKiAgQ29udmVydCBncm91cCBpbnRvIHByb3Blcmx5IGZvcm1hdHRlZCBoZWFkZXIgKi9cbmZ1bmN0aW9uIGZ1bGxUb2tlbkdyb3VwTmFtZSh0b2tlbkdyb3VwKSB7XG4gICAgLy8gUmV0cmlldmUgdG9rZW4gZ3JvdXAgcGF0aFxuICAgIHJldHVybiBbLi4udG9rZW5Hcm91cC5wYXRoLCB0b2tlbkdyb3VwLm5hbWVdLmpvaW4oXCIvXCIpO1xufVxuLyoqICBDb252ZXJ0IGdyb3VwIGludG8gcHJvcGVybHkgZm9ybWF0dGVkIGhlYWRlciAqL1xuZnVuY3Rpb24gZm9ybWF0dGVkVG9rZW5Hcm91cEhlYWRlcih0b2tlbkdyb3VwLCBzaG93U3VicGF0aCkge1xuICAgIC8vIFJldHJpZXZlIHRva2VuIGdyb3VwIGVpdGhlciBpbmNsdWRpbmcgb3Igbm90IGluY2x1ZGluZyB0aGUgcGF0aCB0byB0aGUgZ3JvdXBcbiAgICBpZiAodG9rZW5Hcm91cC5wYXRoLmxlbmd0aCA+IDAgJiYgc2hvd1N1YnBhdGgpIHtcbiAgICAgICAgbGV0IGxpZ2h0ID0gdG9rZW5Hcm91cC5wYXRoLmpvaW4oXCIgLyBcIik7XG4gICAgICAgIGxldCBkYXJrID0gdG9rZW5Hcm91cC5uYW1lO1xuICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwibGlnaHRcIj4ke2xpZ2h0fSAvIDwvc3Bhbj4ke2Rhcmt9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0b2tlbkdyb3VwLm5hbWU7XG4gICAgfVxufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggZ3JhZGllbnQgdG9rZW4gKi9cbmZ1bmN0aW9uIGdyYWRpZW50RGVzY3JpcHRpb24oZ3JhZGllbnRUb2tlbikge1xuICAgIC8vIERlc2NyaWJlIGdyYWRpZW50IGFzICh0eXBlKSAoc3RvcDEsIHN0b3AyIC4uLilcbiAgICBsZXQgdHlwZSA9IGAke2dyYWRpZW50VG9rZW4udmFsdWUudHlwZX0gR3JhZGllbnRgO1xuICAgIGxldCBzdG9wcyA9IGdyYWRpZW50VG9rZW4udmFsdWUuc3RvcHMubWFwKHN0b3AgPT4ge1xuICAgICAgICByZXR1cm4gYCMke3N0b3AuY29sb3IuaGV4LnRvVXBwZXJDYXNlKCl9LCAke3N0b3AucG9zaXRpb24gKiAxMDB9JWA7XG4gICAgfSkuam9pbihcIiwgXCIpO1xuICAgIHJldHVybiBgJHt0eXBlfSwgJHtzdG9wc31gO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggZ3JhZGllbnQgdmFsdWUgYXMgdG9rZW4gKi9cbmZ1bmN0aW9uIGdyYWRpZW50VG9rZW5WYWx1ZShncmFkaWVudFRva2VuKSB7XG4gICAgbGV0IGdyYWRpZW50VHlwZSA9IFwiXCI7XG4gICAgc3dpdGNoIChncmFkaWVudFRva2VuLnZhbHVlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIkxpbmVhclwiOlxuICAgICAgICAgICAgZ3JhZGllbnRUeXBlID0gXCJsaW5lYXItZ3JhZGllbnQoMGRlZywgXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlJhZGlhbFwiOlxuICAgICAgICAgICAgZ3JhZGllbnRUeXBlID0gXCJyYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCBcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQW5ndWxhclwiOlxuICAgICAgICAgICAgZ3JhZGllbnRUeXBlID0gXCJjb25pYy1ncmFkaWVudChcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBEZXNjcmliZSBncmFkaWVudCBhcyAodHlwZSkgKHN0b3AxLCBzdG9wMiAuLi4pXG4gICAgLy8gRXhhbXBsZTogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSg2Myw5NCwyNTEsMSkgMCUsIHJnYmEoMjUyLDcwLDEwNywxKSAxMDAlKTtcbiAgICBsZXQgc3RvcHMgPSBncmFkaWVudFRva2VuLnZhbHVlLnN0b3BzLm1hcChzdG9wID0+IHtcbiAgICAgICAgcmV0dXJuIGAjJHtzdG9wLmNvbG9yLmhleC50b1VwcGVyQ2FzZSgpfSAke3N0b3AucG9zaXRpb24gKiAxMDB9JWA7XG4gICAgfSkuam9pbihcIiwgXCIpO1xuICAgIHJldHVybiBgJHtncmFkaWVudFR5cGV9JHtzdG9wc30pYDtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IHNoYWRvdyB0b2tlbiAqL1xuZnVuY3Rpb24gc2hhZG93RGVzY3JpcHRpb24oc2hhZG93VG9rZW4pIHtcbiAgICByZXR1cm4gc2hhZG93VG9rZW5WYWx1ZShzaGFkb3dUb2tlbik7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBzaGFkb3cgdG9rZW4gKi9cbmZ1bmN0aW9uIHR5cG9ncmFwaHlEZXNjcmlwdGlvbih0eXBvZ3JhcGh5VG9rZW4pIHtcbiAgICBsZXQgdmFsdWUgPSB0eXBvZ3JhcGh5VG9rZW4udmFsdWU7XG4gICAgbGV0IGZvbnROYW1lID0gYCR7dmFsdWUuZm9udC5mYW1pbHl9ICR7dmFsdWUuZm9udC5zdWJmYW1pbHl9YDtcbiAgICBsZXQgZm9udFZhbHVlID0gYCR7dmFsdWUuZm9udFNpemUubWVhc3VyZX0ke21lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdCh2YWx1ZS5mb250U2l6ZS51bml0KX1gO1xuICAgIGxldCB0ZXh0RGVjb3JhdGlvbiA9IFwiXCI7XG4gICAgbGV0IHRleHRDYXNlID0gXCJcIjtcbiAgICBpZiAodmFsdWUudGV4dERlY29yYXRpb24gIT09ICdOb25lJykge1xuICAgICAgICB0ZXh0RGVjb3JhdGlvbiA9IGAsICR7dmFsdWUudGV4dERlY29yYXRpb24udG9Mb3dlckNhc2UoKX1gO1xuICAgIH1cbiAgICBpZiAodmFsdWUudGV4dENhc2UgIT09ICdPcmlnaW5hbCcpIHtcbiAgICAgICAgdGV4dENhc2UgPSBgLCAke3ZhbHVlLnRleHRDYXNlLnRvTG93ZXJDYXNlKCl9YDtcbiAgICB9XG4gICAgcmV0dXJuIGAke2ZvbnROYW1lfSAke2ZvbnRWYWx1ZX0ke3RleHREZWNvcmF0aW9ufSR7dGV4dENhc2V9YDtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IHNoYWRvdyB2YWx1ZSBhcyB0b2tlbiAqL1xuZnVuY3Rpb24gc2hhZG93VG9rZW5WYWx1ZShzaGFkb3dUb2tlbikge1xuICAgIHJldHVybiBgJHtzaGFkb3dUb2tlbi52YWx1ZS54Lm1lYXN1cmV9cHggJHtzaGFkb3dUb2tlbi52YWx1ZS55Lm1lYXN1cmV9cHggJHtzaGFkb3dUb2tlbi52YWx1ZS5yYWRpdXMubWVhc3VyZX1weCAke3NoYWRvd1Rva2VuLnZhbHVlLnNwcmVhZC5tZWFzdXJlfXB4ICMke3NoYWRvd1Rva2VuLnZhbHVlLmNvbG9yLmhleH1gO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggZ3JhZGllbnQgdmFsdWUgYXMgdG9rZW4gKi9cbmZ1bmN0aW9uIG1lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdCh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ1BvaW50cyc6IHJldHVybiAncHQnO1xuICAgICAgICBjYXNlICdQaXhlbHMnOiByZXR1cm4gJ3B4JztcbiAgICAgICAgY2FzZSAnUGVyY2VudCc6IHJldHVybiAnJSc7XG4gICAgICAgIGNhc2UgJ0Vtcyc6IHJldHVybiAnZW0nO1xuICAgIH1cbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gU3VwcG9ydFxuLyoqIFJldHJpZXZlIGZpcnN0IHN1Ymdyb3VwIGJlbG93IHJvb3QgZ3JvdXAgKi9cbmZ1bmN0aW9uIGZpcnN0U3ViZ3JvdXBPZlBhZ2UocGFnZSkge1xuICAgIGxldCBwYXJlbnQgPSBwYWdlLnBhcmVudDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAoIXBhcmVudCB8fCBwYXJlbnQuaXNSb290KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQucGFyZW50ICYmIHBhcmVudC5wYXJlbnQuaXNSb290KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHQocGFnZU9yR3JvdXAsIGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dC50eXBlID09PSBcIlBhZ2VcIikge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgY2hlY2tpbmcgYWdhaW5zdCBwbGFpbiBwYWdlLCB0aGVuIHdlIGNhbiBvbmx5IGNvbXBhcmVcbiAgICAgICAgbGV0IGNvbnRleHRQYWdlID0gY29udGV4dDtcbiAgICAgICAgcmV0dXJuIGNvbnRleHRQYWdlLmlkID09PSBwYWdlT3JHcm91cC5pZDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBjaGVja2luZyBhZ2FpbnN0IGdyb3VwLCBjaGVjayBldmVyeXRoaW5nIHVwd2FyZHMgdGhlIHRyZWUuIElmIGdyb3VwIGNvbnRhaW5zIHRoZSBwYWdlLCByZXR1cm4gdGhhdCBpbmZvcm1hdGlvblxuICAgICAgICBsZXQgY29udGV4dEdyb3VwID0gY29udGV4dDtcbiAgICAgICAgaWYgKGNvbnRleHRHcm91cC5jaGlsZHJlbklkcy5pbmRleE9mKHBhZ2VPckdyb3VwLnBlcnNpc3RlbnRJZCkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYWdlT3JHcm91cC5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYWdlT3JHcm91cEFjdGl2ZUluQ29udGV4dChwYWdlT3JHcm91cC5wYXJlbnQsIGNvbnRleHRHcm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZWFjaGVkIHJvb3QgYW5kIGRpZG4ndCBmaW5kIGFueXRoaW5nLCBhYmFuZG9uIHNoaXBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gSGVhZGluZ3NcbmZ1bmN0aW9uIGhlYWRpbmdQbGFpblRleHQoaGVhZGVyKSB7XG4gICAgcmV0dXJuIGhlYWRlci50ZXh0LnNwYW5zLm1hcChzID0+IHMudGV4dCkuam9pbihcIlwiKTtcbn1cbmZ1bmN0aW9uIHNsdWdpZnlIZWFkaW5nKGhlYWRlcikge1xuICAgIGxldCBmdWxsVGV4dCA9IGhlYWRpbmdQbGFpblRleHQoaGVhZGVyKTtcbiAgICByZXR1cm4gc2x1Z2lmeShmdWxsVGV4dCk7XG59XG5mdW5jdGlvbiBzbHVnaWZ5KHN0cikge1xuICAgIC8vIFRoYW5rcyB0byBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9jb2RlZ3V5LzY2ODQ1ODhcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIHJlbW92ZSBhY2NlbnRzLCBzd2FwIMOxIGZvciBuLCBldGNcbiAgICB2YXIgZnJvbSA9IFwiw6DDocOjw6TDosOow6nDq8Oqw6zDrcOvw67DssOzw7bDtMO5w7rDvMO7w7HDp8K3L18sOjtcIjtcbiAgICB2YXIgdG8gPSBcImFhYWFhZWVlZWlpaWlvb29vdXV1dW5jLS0tLS0tXCI7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGZyb20uY2hhckF0KGkpLCAnZycpLCB0by5jaGFyQXQoaSkpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvW15hLXowLTkgLV0vZywgJycpIC8vIHJlbW92ZSBpbnZhbGlkIGNoYXJzXG4gICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICctJykgLy8gY29sbGFwc2Ugd2hpdGVzcGFjZSBhbmQgcmVwbGFjZSBieSAtXG4gICAgICAgIC5yZXBsYWNlKC8tKy9nLCAnLScpOyAvLyBjb2xsYXBzZSBkYXNoZXNcbiAgICByZXR1cm4gc3RyO1xufVxuZnVuY3Rpb24gZmlyc3RQYWdlRnJvbVRvcChkb2N1bWVudGF0aW9uUm9vdCkge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIGRvY3VtZW50YXRpb25Sb290LmNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSBcIlBhZ2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBvc3NpYmxlUGFnZSA9IGZpcnN0UGFnZUZyb21Ub3AoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKHBvc3NpYmxlUGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NzaWJsZVBhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFNlYXJjaCBpbmRleCBwcm9jZXNzaW5nXG5mdW5jdGlvbiBidWlsZFNlYXJjaEluZGV4SlNPTihwYWdlcywgZG9tYWluKSB7XG4gICAgLy8gVmVyeSBuYWl2ZSBzZWFyY2ggaW5kZXggaW1wbGVtZW50YXRpb24uIFRoZSBwZXJmb3JtYW5jZSBvZiB0aGlzIHdpbGwgYmUgYWJzb2x1dGVseSBhYnlzbWFsLiBcbiAgICAvLyBUaGlzIHdpbGwgZ2V0IG9wdGltaXplZCB3aGVuIHRoZSBjb3JlIHNlYXJjaCB3b3JrcyBvdmVyIHRpbWUuIFByb2JhYmx5IG1vdmVkIHRvIGVsYXN0aWMgc2VhcmNoIG9yIHNvbWV0aGluZyBsaWtlIHRoYXRcbiAgICBsZXQgaWQgPSAwO1xuICAgIGxldCBkYXRhID0gW107XG4gICAgLy8gUHJvY2VzcyBldmVyeSBwYWdlIGZvciBkYXRhXG4gICAgZm9yIChsZXQgcGFnZSBvZiBwYWdlcykge1xuICAgICAgICAvLyBCYXNpYyBpbmZvcm1hdGlvblxuICAgICAgICBsZXQgbmFtZSA9IHBhZ2UudGl0bGU7XG4gICAgICAgIC8vIFBhdGggYW5kIHVybCBjcmVhdGlvblxuICAgICAgICBsZXQgc3VicGF0aHMgPSBbbmFtZV07XG4gICAgICAgIGxldCBwYXJlbnQgPSBwYWdlLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbCB8fCBwYXJlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudC5pc1Jvb3QpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnBhdGhzLnNwbGljZSgwLCAwLCBwYXJlbnQudGl0bGUpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGF0aCA9IHN1YnBhdGhzLmpvaW4oXCIgLyBcIik7XG4gICAgICAgIGxldCB1cmwgPSBwYWdlVXJsKHBhZ2UsIGRvbWFpbik7XG4gICAgICAgIC8vIEhlYWRlciBhbmQgdGV4dCBwYXJzaW5nXG4gICAgICAgIGxldCBhbGxCbG9ja3MgPSBmbGF0dGVuZWRCbG9ja3NPZlBhZ2UocGFnZSk7XG4gICAgICAgIHZhciB0ZXh0cyA9IFtdO1xuICAgICAgICB2YXIgaGVhZGVycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBibG9jayBvZiBhbGxCbG9ja3MpIHtcbiAgICAgICAgICAgIGlmIChibG9jay50eXBlID09PSBcIlRleHRcIiB8fCBibG9jay50eXBlID09PSBcIkNhbGxvdXRcIiB8fCBibG9jay50eXBlID09PSBcIk9yZGVyZWRMaXN0XCIgfHwgYmxvY2sudHlwZSA9PT0gXCJVbm9yZGVyZWRMaXN0XCIgfHwgYmxvY2sudHlwZSA9PT0gXCJRdW90ZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0ZXh0T2ZCbG9jayhibG9jayk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0cy5wdXNoKHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrLnR5cGUgPT09IFwiSGVhZGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0ZXh0T2ZCbG9jayhibG9jayk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2godGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENvbnN0cnVjdCBwaWVjZXMgZnJvbSB0ZXh0IGluZm9ybWF0aW9uXG4gICAgICAgIGZvciAobGV0IHRleHQgb2YgdGV4dHMpIHtcbiAgICAgICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGlkKyssXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJib2R5XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbnN0cnVjdCBwaWVjZXMgZnJvbSBoZWFkZXJzXG4gICAgICAgIGZvciAobGV0IGhlYWRlciBvZiBoZWFkZXJzKSB7XG4gICAgICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBpZCsrLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBoZWFkZXIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IGRhdGEgYW5kIG1ha2UgaW5kZXggcmVhZGFibGUgZm9yIGVhc2llciBkZWJ1Z2dpbmcgZm9yIG5vd1xuICAgIC8vIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKVxuICAgIC8vIEV4cGVyaW1lbnRhbDogQ3JlYXRlIGluZGV4LiBXSVA6IFByZWdlbmVyYXRlIGxvYWRlZCBpbmRleFxuICAgIGxldCBzaSA9IGBcbiAgY29uc3QgbHVuckRhdGEgPSAke0pTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpfTtcbiAgY29uc3QgbHVuckluZGV4ZWREYXRhID0ge31cbiAgY29uc3QgbHVuckluZGV4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5maWVsZCgndGV4dCcpXG4gICAgdGhpcy5yZWYoJ2lkJylcbiAgICB0aGlzLm1ldGFkYXRhV2hpdGVsaXN0ID0gWydwb3NpdGlvbiddXG4gIFxuICAgIC8vIE5vdGUgaW5kZXggaGFzIGJlZW4gbG9hZGVkIGludG8gdGhlIHBhZ2Ugd2l0aCBwYWdlIHJlcXVlc3RcbiAgICBsdW5yRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkb2MpIHtcbiAgICAgIHRoaXMuYWRkKGRvYylcbiAgICAgIGx1bnJJbmRleGVkRGF0YVtkb2MuaWRdID0gZG9jXG4gICAgfSwgdGhpcylcbiAgfSk7XG4gIGA7XG4gICAgcmV0dXJuIHNpO1xufVxuZnVuY3Rpb24gZmxhdHRlbmVkQmxvY2tzT2ZQYWdlKHBhZ2UpIHtcbiAgICBsZXQgYmxvY2tzID0gcGFnZS5ibG9ja3M7XG4gICAgZm9yIChsZXQgYmxvY2sgb2YgcGFnZS5ibG9ja3MpIHtcbiAgICAgICAgYmxvY2tzID0gYmxvY2tzLmNvbmNhdChmbGF0dGVuZWRCbG9ja3NPZkJsb2NrKGJsb2NrKSk7XG4gICAgfVxuICAgIHJldHVybiBibG9ja3M7XG59XG5mdW5jdGlvbiBmbGF0dGVuZWRCbG9ja3NPZkJsb2NrKGJsb2NrKSB7XG4gICAgbGV0IHN1YmJsb2NrcyA9IGJsb2NrLmNoaWxkcmVuO1xuICAgIGZvciAobGV0IHN1YmJsb2NrIG9mIGJsb2NrLmNoaWxkcmVuKSB7XG4gICAgICAgIHN1YmJsb2NrcyA9IHN1YmJsb2Nrcy5jb25jYXQoZmxhdHRlbmVkQmxvY2tzT2ZCbG9jayhzdWJibG9jaykpO1xuICAgIH1cbiAgICByZXR1cm4gc3ViYmxvY2tzO1xufVxuZnVuY3Rpb24gdGV4dE9mQmxvY2soYmxvY2spIHtcbiAgICByZXR1cm4gYmxvY2sudGV4dC5zcGFucy5tYXAocyA9PiBzLnRleHQpLmpvaW4oXCJcIik7XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIExpdmUgc2FuZGJveCBzdXBwb3J0XG5mdW5jdGlvbiBpc1NhbmRib3hEZWZpbml0aW9uKGJsb2NrKSB7XG4gICAgbGV0IHN0cmluZyA9IGJsb2NrLnRleHQuc3BhbnMubWFwKHMgPT4gcy50ZXh0KS5qb2luKFwiXCIpO1xuICAgIHJldHVybiBzdHJpbmcuc3RhcnRzV2l0aChcIk1vZGU6U0FOREJPWFwiKTtcbn1cbmZ1bmN0aW9uIGVuY29kZVNhbmRib3hEYXRhKGJsb2NrKSB7XG4gICAgLy8gRW5jb2RlIG9iamVjdFxuICAgIGxldCBzYW5kYm94RGF0YSA9IHBhcnNlU2FuZGJveEJsb2NrRGF0YShibG9jayk7XG4gICAgcmV0dXJuIGFiYWJfMS5idG9hKEpTT04uc3RyaW5naWZ5KHNhbmRib3hEYXRhKSk7XG59XG5mdW5jdGlvbiBnZXRGcm9udGVuZFNhbmRib3hEYXRhKGJsb2NrKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBzYW5kYm94RGF0YSA9IHBhcnNlU2FuZGJveEJsb2NrRGF0YShibG9jayk7XG4gICAgbGV0IHZpc3VhbFBheWxvYWQgPSBzYW5kYm94RGF0YS52aXN1YWw7XG4gICAgLy8gQmFzaWMgSFRNTCBlbmNvZGluZ1xuICAgIGxldCBlbmNvZGVkSFRNTFN0cmluZyA9IHNhbmRib3hEYXRhLmNvZGUucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IGVuY29kZWRIVE1MU3RyaW5nLFxuICAgICAgICBzaG93Q29kZUJ5RGVmYXVsdDogdmlzdWFsUGF5bG9hZCA9PT0gbnVsbCB8fCB2aXN1YWxQYXlsb2FkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXN1YWxQYXlsb2FkLnNob3dDb2RlQnlEZWZhdWx0LFxuICAgICAgICBoZWlnaHQ6ICh2aXN1YWxQYXlsb2FkID09PSBudWxsIHx8IHZpc3VhbFBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc3VhbFBheWxvYWQuZm9yY2VkSGVpZ2h0KSA/IGAke3Zpc3VhbFBheWxvYWQgPT09IG51bGwgfHwgdmlzdWFsUGF5bG9hZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzdWFsUGF5bG9hZC5mb3JjZWRIZWlnaHR9cHhgIDogYGF1dG9gLFxuICAgICAgICBlZGl0YWJsZTogKF9hID0gdmlzdWFsUGF5bG9hZCA9PT0gbnVsbCB8fCB2aXN1YWxQYXlsb2FkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXN1YWxQYXlsb2FkLmVkaXRhYmxlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZSxcbiAgICB9O1xufVxuZnVuY3Rpb24gcGFyc2VTYW5kYm94QmxvY2tEYXRhKGJsb2NrKSB7XG4gICAgbGV0IGRlZmluaXRpb25QYXJ0cyA9IGJsb2NrLnRleHQuc3BhbnMubWFwKHMgPT4gcy50ZXh0KS5qb2luKFwiXCIpLnNwbGl0KFwiLS0tXCIpO1xuICAgIC8vIFBhcnNlIGNvbmZpZ3VyYXRpb25cbiAgICBsZXQgbW9kZVN0cmluZyA9IGRlZmluaXRpb25QYXJ0c1swXTtcbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7fTtcbiAgICBmb3IgKGxldCBjb25maWd1cmF0aW9uTGluZSBvZiBtb2RlU3RyaW5nLnNwbGl0KFwiXFxuXCIpKSB7XG4gICAgICAgIGxldCBwYXJ0cyA9IGNvbmZpZ3VyYXRpb25MaW5lLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgbGV0IGNvbmZpZ0tleSA9IGNsZWFudXBTdHJpbmcocGFydHNbMF0pO1xuICAgICAgICAgICAgbGV0IGNvbmZpZ1ZhbHVlID0gY2xlYW51cFN0cmluZyhwYXJ0c1sxXSk7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uc1tjb25maWdLZXldID0gY29uZmlnVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgICAgLy8gSWdub3JlIGJlY2F1c2UgY29uZmlndXJhdGlvbiBhbHdheXMgaGFzIHRvIGJlIHNldHVwXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUGFyc2UgZGVwZW5kZW5jaWVzXG4gICAgbGV0IGRlcGVuZGVuY3lTdHJpbmcgPSBkZWZpbml0aW9uUGFydHNbMV07XG4gICAgbGV0IGRlcGVuZGVuY2llcyA9IHt9O1xuICAgIGZvciAobGV0IGRlcGVuZGVuY3lMaW5lIG9mIGRlcGVuZGVuY3lTdHJpbmcuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgbGV0IHBhcnRzID0gZGVwZW5kZW5jeUxpbmUuc3BsaXQoXCI6XCIpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAvLyBDbGVhbnVwIGFuZCByZW1vdmUgcXVvdGVzLCBpZiBhbnlcbiAgICAgICAgICAgIGxldCBkZXBOYW1lID0gY2xlYW51cFN0cmluZyhwYXJ0c1swXSk7XG4gICAgICAgICAgICBpZiAoZGVwTmFtZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlcFZlcnNpb24gPSBjbGVhbnVwU3RyaW5nKHBhcnRzWzFdKTtcbiAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXNbZGVwTmFtZV0gPSBkZXBWZXJzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGFzIGl0IGlzIGVtcHR5IGFuZCB0aGVyZWZvcmUgY29ycnVwdGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgZGVwTmFtZSA9IGNsZWFudXBTdHJpbmcoZGVwZW5kZW5jeUxpbmUpO1xuICAgICAgICAgICAgaWYgKGRlcE5hbWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBkZXBWZXJzaW9uID0gXCJsYXRlc3RcIjtcbiAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXNbZGVwTmFtZV0gPSBkZXBWZXJzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGFzIGl0IGlzIGVtcHR5IGFuZCB0aGVyZWZvcmUgY29ycnVwdGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgYXMgaXQgaXMgdW5rbm93biBvciBjb3JydXB0ZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBQYXJzZSBzY3JpcHRcbiAgICBsZXQgY29kZVN0cmluZyA9IGRlZmluaXRpb25QYXJ0c1syXTtcbiAgICAvLyBQYXJzZSB2aXN1YWwgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICBjb25zdCB2aXN1YWxDb25maWd1cmF0aW9uID0ge307XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25zW1wiSG9yaXpvbnRhbFwiXSkge1xuICAgICAgICB2aXN1YWxDb25maWd1cmF0aW9uW1wiaG9yaXpvbnRhbEFsaWdubWVudFwiXSA9IGNvbmZpZ3VyYXRpb25zW1wiSG9yaXpvbnRhbFwiXTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25zW1wiVmVydGljYWxcIl0pIHtcbiAgICAgICAgdmlzdWFsQ29uZmlndXJhdGlvbltcInZlcnRpY2FsQWxpZ25tZW50XCJdID0gY29uZmlndXJhdGlvbnNbXCJWZXJ0aWNhbFwiXTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25zW1wiQmFja2dyb3VuZFwiXSkge1xuICAgICAgICB2aXN1YWxDb25maWd1cmF0aW9uW1wiYmFja2dyb3VuZEhleFwiXSA9IGNvbmZpZ3VyYXRpb25zW1wiQmFja2dyb3VuZFwiXTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25zW1wiU2FuZGJveFwiXSkge1xuICAgICAgICB2aXN1YWxDb25maWd1cmF0aW9uW1wic2hvd1NhbmRib3hcIl0gPSB0cnVlOyAvLyB3aGF0ZXZlciBpcyBjb25maWd1cmVkIHdpbGwgcmVzdWx0IHRvIHRydWVcbiAgICB9XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25zW1wiSGVpZ2h0XCJdKSB7XG4gICAgICAgIHZpc3VhbENvbmZpZ3VyYXRpb25bXCJmb3JjZWRIZWlnaHRcIl0gPSBjb25maWd1cmF0aW9uc1tcIkhlaWdodFwiXTsgLy8gd2hhdGV2ZXIgaXMgY29uZmlndXJlZCB3aWxsIHJlc3VsdCB0byB0cnVlXG4gICAgfVxuICAgIGlmIChjb25maWd1cmF0aW9uc1tcIkNvZGVcIl0pIHtcbiAgICAgICAgdmlzdWFsQ29uZmlndXJhdGlvbltcInNob3dDb2RlQnlEZWZhdWx0XCJdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25zW1wiRWRpdGFibGVcIl0pIHtcbiAgICAgICAgdmlzdWFsQ29uZmlndXJhdGlvbltcImVkaXRhYmxlXCJdID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIG9iamVjdCBhbmQgZW5jb2RlIGl0XG4gICAgY29uc3Qgc2FuZGJveFBheWxvYWQgPSB7XG4gICAgICAgIHR5cGU6IFwicmVhY3RcIixcbiAgICAgICAgY29kZTogY29kZVN0cmluZyxcbiAgICAgICAgZGVwZW5kZW5jaWVzOiBkZXBlbmRlbmNpZXMsXG4gICAgICAgIHZpc3VhbDogdmlzdWFsQ29uZmlndXJhdGlvblxuICAgIH07XG4gICAgcmV0dXJuIHNhbmRib3hQYXlsb2FkO1xufVxuZnVuY3Rpb24gY2xlYW51cFN0cmluZyhzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRyaW0oKS5yZXBsYWNlKC9eXCIoLiopXCIkLywgJyQxJyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9