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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
        if (!contextGroup.isRoot && contextGroup.childrenIds.indexOf(pageOrGroup.persistentId) !== -1) {
            return true;
        }
        else if (contextGroup.parent) {
            return pageOrGroupActiveInContext(pageOrGroup, contextGroup.parent);
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
        for (let text of headers) {
            data.push({
                id: id++,
                name: name,
                path: path,
                url: url,
                text: text,
                type: "header"
            });
        }
    }
    // Construct data and make index readable for easier debugging for now
    // return JSON.stringify(data, null, 2)
    // Experimental: Create index. WIP: Pregenerate loaded index
    let si = `
  const lunrData = ${JSON.stringify(data, null, 2)};
  const lunrIndex = lunr(function () {
    this.field('text')
    this.ref('id')
    this.metadataWhitelist = ['position']
  
    // Note index has been loaded into the page with page request
    lunrData.forEach(function (doc) {
      this.add(doc)
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianNfaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBCbHVlcHJpbnQgZnVuY3Rpb25zXG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInBhZ2VVcmxcIiwgcGFnZVVybCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInJvb3RVcmxcIiwgcm9vdFVybCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImFzc2V0VXJsXCIsIGFzc2V0VXJsKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiaGlnaGxpZ2h0U2FmZVN0cmluZ1wiLCBoaWdobGlnaHRTYWZlU3RyaW5nKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiaXNFeHBlcmltZW50YWxCbG9ja1wiLCBpc0V4cGVyaW1lbnRhbEJsb2NrKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicGFyc2VFeHBlcmltZW50YWxCbG9ja1wiLCBwYXJzZUV4cGVyaW1lbnRhbEJsb2NrKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZm9ybWF0dGVkVG9rZW5Hcm91cEhlYWRlclwiLCBmb3JtYXR0ZWRUb2tlbkdyb3VwSGVhZGVyKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZnVsbFRva2VuR3JvdXBOYW1lXCIsIGZ1bGxUb2tlbkdyb3VwTmFtZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImdyYWRpZW50RGVzY3JpcHRpb25cIiwgZ3JhZGllbnREZXNjcmlwdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImdyYWRpZW50VG9rZW5WYWx1ZVwiLCBncmFkaWVudFRva2VuVmFsdWUpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzaGFkb3dEZXNjcmlwdGlvblwiLCBzaGFkb3dEZXNjcmlwdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInNoYWRvd1Rva2VuVmFsdWVcIiwgc2hhZG93VG9rZW5WYWx1ZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcIm1lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdFwiLCBtZWFzdXJlVHlwZUludG9SZWFkYWJsZVVuaXQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJ0eXBvZ3JhcGh5RGVzY3JpcHRpb25cIiwgdHlwb2dyYXBoeURlc2NyaXB0aW9uKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZmlyc3RTdWJncm91cE9mUGFnZVwiLCBmaXJzdFN1Ymdyb3VwT2ZQYWdlKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHRcIiwgcGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzbHVnaWZ5SGVhZGluZ1wiLCBzbHVnaWZ5SGVhZGluZyk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImhlYWRpbmdQbGFpblRleHRcIiwgaGVhZGluZ1BsYWluVGV4dCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImZpcnN0UGFnZUZyb21Ub3BcIiwgZmlyc3RQYWdlRnJvbVRvcCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImJ1aWxkU2VhcmNoSW5kZXhKU09OXCIsIGJ1aWxkU2VhcmNoSW5kZXhKU09OKTtcbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gVVJMc1xuLyoqIEdlbmVyYXRlIHBhZ2Ugc2x1ZyBmb3IgdGhlIGdlbmVyYXRlZCBwYWdlICovXG5mdW5jdGlvbiBwYWdlVXJsKG9iamVjdCwgcHJlZml4KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChvYmplY3QudHlwZSA9PT0gXCJHcm91cFwiKSB7XG4gICAgICAgIGxldCBncm91cCA9IG9iamVjdDtcbiAgICAgICAgbGV0IHBhZ2VzID0gZ3JvdXAuY2hpbGRyZW4uZmlsdGVyKGMgPT4gYy50eXBlID09PSBcIlBhZ2VcIik7XG4gICAgICAgIGlmIChwYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFnZVVybChwYWdlc1swXSwgcHJlZml4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbm90IGhhbmRsZWQsIGdyb3VwIG11c3QgY29udGFpbiBwYWdlIG90aGVyd2lzZSBpdCBzaG91bGQgYmUgaGlkZGVuIGZyb20gZ2VuZXJhdGlvblxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHBhZ2UgPSBvYmplY3Q7XG4gICAgbGV0IHBhZ2VTbHVnID0gKF9hID0gcGFnZS51c2VyU2x1ZykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogcGFnZS5zbHVnO1xuICAgIGxldCBzdWJwYXRocyA9IFtdO1xuICAgIC8vIENvbnN0cnVjdCBncm91cCBwYXRoIHNlZ21lbnRzXG4gICAgbGV0IHBhcmVudCA9IHBhZ2UucGFyZW50O1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgc3VicGF0aHMucHVzaChzbHVnaWZ5KHBhcmVudC50aXRsZSkpO1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgIH1cbiAgICAvLyBSZW1vdmUgbGFzdCBzZWdtZW50IGFkZGVkLCBiZWNhdXNlIHdlIGRvbid0IGNhcmUgYWJvdXQgcm9vdCBncm91cFxuICAgIHN1YnBhdGhzLnBvcCgpO1xuICAgIC8vIFJldHJpZXZlIHVybC1zYWZlIHBhdGggY29uc3RydWN0ZWQgYXMgW2hvc3RdW2dyb3VwLXNsdWdzXVtwYXRoLXNsdWddWy5odG1sXVxuICAgIGxldCBwYXRoID0gW3ByZWZpeCwgLi4uc3VicGF0aHMucmV2ZXJzZSgpLCBwYWdlU2x1Z10uam9pbihcIi9cIikgKyBcIi5odG1sXCI7XG4gICAgcmV0dXJuIHBhdGg7XG59XG4vKiogQ3JlYXRlIHByb3BlciB1cmwgdGhhdCBjaGFuZ2VzIHdpdGggdGhlIGZvbGRlci1kZXB0aCBvZiB0aGUgZG9jdW1lbnRhdGlvbiAqL1xuZnVuY3Rpb24gcm9vdFVybChhc3NldCwgcHJlZml4KSB7XG4gICAgbGV0IGZyYWdtZW50cyA9IFtwcmVmaXgsIGFzc2V0XTtcbiAgICAvLyBSZXRyaWV2ZSB1cmwtc2FmZSBwYXRoIGNvbnN0cnVjdGVkIGFzIFtob3N0XVthc3NldC1zbHVnXVxuICAgIGxldCBwYXRoID0gZnJhZ21lbnRzLmpvaW4oXCIvXCIpO1xuICAgIHJldHVybiBwYXRoO1xufVxuLyoqIENyZWF0ZSBwcm9wZXIgdXJsIHRoYXQgY2hhbmdlcyB3aXRoIHRoZSBmb2xkZXItZGVwdGggb2YgdGhlIGRvY3VtZW50YXRpb24gKi9cbmZ1bmN0aW9uIGFzc2V0VXJsKGFzc2V0LCBwcmVmaXgpIHtcbiAgICBsZXQgYXNzZXRGb2xkZXIgPSBcImFzc2V0c1wiO1xuICAgIGxldCBmcmFnbWVudHMgPSBbcHJlZml4LCBhc3NldEZvbGRlciwgYXNzZXRdO1xuICAgIC8vIFJldHJpZXZlIHVybC1zYWZlIHBhdGggY29uc3RydWN0ZWQgYXMgW2hvc3RdW2Fzc2V0LWZvbGRlcl1bYXNzZXQtc2x1Z11cbiAgICBsZXQgcGF0aCA9IGZyYWdtZW50cy5qb2luKFwiL1wiKTtcbiAgICByZXR1cm4gcGF0aDtcbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gRXhwZXJpbWVudGFsIGZlYXR1cmVzXG4vKiogUGFyc2Ugb3V0IGV4cGVyaW1lbnRhbCBibG9jaywgaWYgZXhpc3RzICovXG5mdW5jdGlvbiBpc0V4cGVyaW1lbnRhbEJsb2NrKGJsb2NrKSB7XG4gICAgcmV0dXJuIGJsb2NrLnRleHQuc3BhbnMubGVuZ3RoID09PSAxICYmIGJsb2NrLnRleHQuc3BhbnNbMF0udGV4dC5zdGFydHNXaXRoKFwiW2Jsb2NrOlwiKTtcbn1cbi8qKiBQYXJzZSBleHBlcmltZW50YWwgaW5mb3JtYXRpb24gZnJvbSB0aGUgdGV4dCBibG9jaywgc28gd2UgY2FuIGNvbnZlcnQgaXQgdG8gZXhwZXJpbWVudGFsIGJsb2NrICAqL1xuZnVuY3Rpb24gcGFyc2VFeHBlcmltZW50YWxCbG9jayhibG9jaykge1xuICAgIC8vIFRoaXMgaXMgc3R1cGlkIGR1bWIgcGFyc2luZywgYnV0IGl0IHJlYWxseSBpcyBqdXN0IGZvciB0aGF0IG9uZSB1c2VjYXNlIGFuZCB3aWxsIGJlIHJlbW92ZWQgOilcbiAgICBsZXQgdGV4dCA9IGJsb2NrLnRleHQuc3BhbnNbMF0udGV4dDtcbiAgICB0ZXh0ID0gdGV4dC5zdWJzdHIoMSk7IC8vIFJlbW92ZSBmaXJzdCBbXG4gICAgbGV0IGJsb2NrcyA9IHRleHQuc3BsaXQoXCJdXCIpOyAvLyBTcGxpdCBieSBdIHNvIHdlIGdldCBibG9jazpYICBhbmQgICBwYXlsb2FkIChtYXliZSBVUkwpXG4gICAgLy8gUGFyc2Ugb3V0cHV0XG4gICAgbGV0IHBheWxvYWQgPSBibG9ja3NbMV0udHJpbSgpO1xuICAgIGxldCBibG9ja1R5cGUgPSBibG9ja3NbMF0uc3BsaXQoXCI6XCIpWzFdO1xuICAgIC8vIEV4dHJhIGZvciB0YWJzLCBpZiBkZXRlY3RlZFxuICAgIGxldCB0YWJzID0gcGF5bG9hZC5zcGxpdChcInxcIikubWFwKHAgPT4gcC50cmltKCkpO1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgQXJyYXkoKTtcbiAgICB0YWJzLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgICAgICBoZWFkZXJzLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGVudC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEZhbGxiYWNrIHRvIHNvbWUgc2Vuc2libGUgaW5mb3JtYXRpb24gaWYgdXNlciBkaWRuJ3QgZm9ybWF0IGl0IHRvbyBtdWNoLCBvciB0aGUgYmxvY2sgaXMgbm90IHRhYlxuICAgIC8vIGFuZCBub3JtYWxpemVcbiAgICBoZWFkZXJzID0gaGVhZGVycy5sZW5ndGggPiAwID8gaGVhZGVycyA6IFtcIkhlYWRlclwiXTtcbiAgICBjb250ZW50ID0gY29udGVudC5sZW5ndGggPiAwID8gY29udGVudCA6IFtwYXlsb2FkXTtcbiAgICBpZiAoaGVhZGVycy5sZW5ndGggIT09IGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgIGhlYWRlcnMgPSBbXCJJbmNvcnJlY3QgdGFiIHN0cnVjdHVyZVwiXTtcbiAgICAgICAgY29udGVudCA9IFtcIkltYmFsYW5jZWQgbnVtYmVyIG9mIHRhYiBzdHJ1Y3R1cmVzLCBtdXN0IGJlIHBhaXJzIG9mIGhlYWRlciAvIGNvbnRlbnRcIl07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGJsb2NrVHlwZTogYmxvY2tUeXBlLFxuICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICB0YWJzOiB7XG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudFxuICAgICAgICB9XG4gICAgfTtcbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gU3RyaW5nIG1hbmlwdWxhdGlvblxuLyoqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gdGhlIGdpdmVuIHN0cmluZyBvZiB0ZXh0LiBFbmNvZGluZyBwYXJ0IHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC9lc2NhcGUtaHRtbCAqL1xuZnVuY3Rpb24gaGlnaGxpZ2h0U2FmZVN0cmluZyhibG9jaykge1xuICAgIC8vIFJldHJpZXZlIHJhdyB0ZXh0LCBpZ25vcmUgYWxsIGF0dHJpYnV0ZXMgZm9yIG5vd1xuICAgIGxldCBzdHJpbmcgPSBibG9jay50ZXh0LnNwYW5zLm1hcCgocykgPT4gcy50ZXh0KS5qb2luKFwiXCIpO1xuICAgIC8vIE1ha2Ugc3VyZSBpdCBpcyBwcm9wZXJseSBzYWZlIGZvciBIVE1MIHJlbmRlcmluZ1xuICAgIHJldHVybiBlc2NhcGVIdG1sKHN0cmluZyk7XG59XG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICAgIHZhciBtYXRjaEh0bWxSZWdFeHAgPSAvW1wiJyY8Pl0vO1xuICAgIHZhciBzdHIgPSBcIlwiICsgc3RyaW5nO1xuICAgIHZhciBtYXRjaCA9IG1hdGNoSHRtbFJlZ0V4cC5leGVjKHN0cik7XG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICB2YXIgZXNjYXBlO1xuICAgIHZhciBodG1sID0gXCJcIjtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBsYXN0SW5kZXggPSAwO1xuICAgIGZvciAoaW5kZXggPSBtYXRjaC5pbmRleDsgaW5kZXggPCBzdHIubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHN3aXRjaCAoc3RyLmNoYXJDb2RlQXQoaW5kZXgpKSB7XG4gICAgICAgICAgICBjYXNlIDM0OiAvLyBcIlxuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJnF1b3Q7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OiAvLyAmXG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImYW1wO1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTogLy8gJ1xuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJiMzOTtcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjA6IC8vIDxcbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiZsdDtcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjI6IC8vID5cbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiZndDtcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0SW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIGh0bWwgKz0gZXNjYXBlO1xuICAgIH1cbiAgICByZXR1cm4gbGFzdEluZGV4ICE9PSBpbmRleCA/IGh0bWwgKyBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpIDogaHRtbDtcbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gVG9rZW5zXG4vKiogIENvbnZlcnQgZ3JvdXAgaW50byBwcm9wZXJseSBmb3JtYXR0ZWQgaGVhZGVyICovXG5mdW5jdGlvbiBmdWxsVG9rZW5Hcm91cE5hbWUodG9rZW5Hcm91cCkge1xuICAgIC8vIFJldHJpZXZlIHRva2VuIGdyb3VwIHBhdGhcbiAgICByZXR1cm4gWy4uLnRva2VuR3JvdXAucGF0aCwgdG9rZW5Hcm91cC5uYW1lXS5qb2luKFwiL1wiKTtcbn1cbi8qKiAgQ29udmVydCBncm91cCBpbnRvIHByb3Blcmx5IGZvcm1hdHRlZCBoZWFkZXIgKi9cbmZ1bmN0aW9uIGZvcm1hdHRlZFRva2VuR3JvdXBIZWFkZXIodG9rZW5Hcm91cCwgc2hvd1N1YnBhdGgpIHtcbiAgICAvLyBSZXRyaWV2ZSB0b2tlbiBncm91cCBlaXRoZXIgaW5jbHVkaW5nIG9yIG5vdCBpbmNsdWRpbmcgdGhlIHBhdGggdG8gdGhlIGdyb3VwXG4gICAgaWYgKHRva2VuR3JvdXAucGF0aC5sZW5ndGggPiAwICYmIHNob3dTdWJwYXRoKSB7XG4gICAgICAgIGxldCBsaWdodCA9IHRva2VuR3JvdXAucGF0aC5qb2luKFwiIC8gXCIpO1xuICAgICAgICBsZXQgZGFyayA9IHRva2VuR3JvdXAubmFtZTtcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cImxpZ2h0XCI+JHtsaWdodH0gLyA8L3NwYW4+JHtkYXJrfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdG9rZW5Hcm91cC5uYW1lO1xuICAgIH1cbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IGdyYWRpZW50IHRva2VuICovXG5mdW5jdGlvbiBncmFkaWVudERlc2NyaXB0aW9uKGdyYWRpZW50VG9rZW4pIHtcbiAgICAvLyBEZXNjcmliZSBncmFkaWVudCBhcyAodHlwZSkgKHN0b3AxLCBzdG9wMiAuLi4pXG4gICAgbGV0IHR5cGUgPSBgJHtncmFkaWVudFRva2VuLnZhbHVlLnR5cGV9IEdyYWRpZW50YDtcbiAgICBsZXQgc3RvcHMgPSBncmFkaWVudFRva2VuLnZhbHVlLnN0b3BzLm1hcChzdG9wID0+IHtcbiAgICAgICAgcmV0dXJuIGAjJHtzdG9wLmNvbG9yLmhleC50b1VwcGVyQ2FzZSgpfSwgJHtzdG9wLnBvc2l0aW9uICogMTAwfSVgO1xuICAgIH0pLmpvaW4oXCIsIFwiKTtcbiAgICByZXR1cm4gYCR7dHlwZX0sICR7c3RvcHN9YDtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IGdyYWRpZW50IHZhbHVlIGFzIHRva2VuICovXG5mdW5jdGlvbiBncmFkaWVudFRva2VuVmFsdWUoZ3JhZGllbnRUb2tlbikge1xuICAgIGxldCBncmFkaWVudFR5cGUgPSBcIlwiO1xuICAgIHN3aXRjaCAoZ3JhZGllbnRUb2tlbi52YWx1ZS50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJMaW5lYXJcIjpcbiAgICAgICAgICAgIGdyYWRpZW50VHlwZSA9IFwibGluZWFyLWdyYWRpZW50KDBkZWcsIFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJSYWRpYWxcIjpcbiAgICAgICAgICAgIGdyYWRpZW50VHlwZSA9IFwicmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFuZ3VsYXJcIjpcbiAgICAgICAgICAgIGdyYWRpZW50VHlwZSA9IFwiY29uaWMtZ3JhZGllbnQoXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gRGVzY3JpYmUgZ3JhZGllbnQgYXMgKHR5cGUpIChzdG9wMSwgc3RvcDIgLi4uKVxuICAgIC8vIEV4YW1wbGU6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUsIHJnYmEoNjMsOTQsMjUxLDEpIDAlLCByZ2JhKDI1Miw3MCwxMDcsMSkgMTAwJSk7XG4gICAgbGV0IHN0b3BzID0gZ3JhZGllbnRUb2tlbi52YWx1ZS5zdG9wcy5tYXAoc3RvcCA9PiB7XG4gICAgICAgIHJldHVybiBgIyR7c3RvcC5jb2xvci5oZXgudG9VcHBlckNhc2UoKX0gJHtzdG9wLnBvc2l0aW9uICogMTAwfSVgO1xuICAgIH0pLmpvaW4oXCIsIFwiKTtcbiAgICByZXR1cm4gYCR7Z3JhZGllbnRUeXBlfSR7c3RvcHN9KWA7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBzaGFkb3cgdG9rZW4gKi9cbmZ1bmN0aW9uIHNoYWRvd0Rlc2NyaXB0aW9uKHNoYWRvd1Rva2VuKSB7XG4gICAgcmV0dXJuIHNoYWRvd1Rva2VuVmFsdWUoc2hhZG93VG9rZW4pO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggc2hhZG93IHRva2VuICovXG5mdW5jdGlvbiB0eXBvZ3JhcGh5RGVzY3JpcHRpb24odHlwb2dyYXBoeVRva2VuKSB7XG4gICAgbGV0IHZhbHVlID0gdHlwb2dyYXBoeVRva2VuLnZhbHVlO1xuICAgIGxldCBmb250TmFtZSA9IGAke3ZhbHVlLmZvbnQuZmFtaWx5fSAke3ZhbHVlLmZvbnQuc3ViZmFtaWx5fWA7XG4gICAgbGV0IGZvbnRWYWx1ZSA9IGAke3ZhbHVlLmZvbnRTaXplLm1lYXN1cmV9JHttZWFzdXJlVHlwZUludG9SZWFkYWJsZVVuaXQodmFsdWUuZm9udFNpemUudW5pdCl9YDtcbiAgICBsZXQgdGV4dERlY29yYXRpb24gPSBcIlwiO1xuICAgIGxldCB0ZXh0Q2FzZSA9IFwiXCI7XG4gICAgaWYgKHZhbHVlLnRleHREZWNvcmF0aW9uICE9PSAnTm9uZScpIHtcbiAgICAgICAgdGV4dERlY29yYXRpb24gPSBgLCAke3ZhbHVlLnRleHREZWNvcmF0aW9uLnRvTG93ZXJDYXNlKCl9YDtcbiAgICB9XG4gICAgaWYgKHZhbHVlLnRleHRDYXNlICE9PSAnT3JpZ2luYWwnKSB7XG4gICAgICAgIHRleHRDYXNlID0gYCwgJHt2YWx1ZS50ZXh0Q2FzZS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgfVxuICAgIHJldHVybiBgJHtmb250TmFtZX0gJHtmb250VmFsdWV9JHt0ZXh0RGVjb3JhdGlvbn0ke3RleHRDYXNlfWA7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBzaGFkb3cgdmFsdWUgYXMgdG9rZW4gKi9cbmZ1bmN0aW9uIHNoYWRvd1Rva2VuVmFsdWUoc2hhZG93VG9rZW4pIHtcbiAgICByZXR1cm4gYCR7c2hhZG93VG9rZW4udmFsdWUueC5tZWFzdXJlfXB4ICR7c2hhZG93VG9rZW4udmFsdWUueS5tZWFzdXJlfXB4ICR7c2hhZG93VG9rZW4udmFsdWUucmFkaXVzLm1lYXN1cmV9cHggJHtzaGFkb3dUb2tlbi52YWx1ZS5zcHJlYWQubWVhc3VyZX1weCAjJHtzaGFkb3dUb2tlbi52YWx1ZS5jb2xvci5oZXh9YDtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IGdyYWRpZW50IHZhbHVlIGFzIHRva2VuICovXG5mdW5jdGlvbiBtZWFzdXJlVHlwZUludG9SZWFkYWJsZVVuaXQodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdQb2ludHMnOiByZXR1cm4gJ3B0JztcbiAgICAgICAgY2FzZSAnUGl4ZWxzJzogcmV0dXJuICdweCc7XG4gICAgICAgIGNhc2UgJ1BlcmNlbnQnOiByZXR1cm4gJyUnO1xuICAgICAgICBjYXNlICdFbXMnOiByZXR1cm4gJ2VtJztcbiAgICB9XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFN1cHBvcnRcbi8qKiBSZXRyaWV2ZSBmaXJzdCBzdWJncm91cCBiZWxvdyByb290IGdyb3VwICovXG5mdW5jdGlvbiBmaXJzdFN1Ymdyb3VwT2ZQYWdlKHBhZ2UpIHtcbiAgICBsZXQgcGFyZW50ID0gcGFnZS5wYXJlbnQ7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgcGFyZW50LmlzUm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50LnBhcmVudCAmJiBwYXJlbnQucGFyZW50LmlzUm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhZ2VPckdyb3VwQWN0aXZlSW5Db250ZXh0KHBhZ2VPckdyb3VwLCBjb250ZXh0KSB7XG4gICAgaWYgKGNvbnRleHQudHlwZSA9PT0gXCJQYWdlXCIpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGNoZWNraW5nIGFnYWluc3QgcGxhaW4gcGFnZSwgdGhlbiB3ZSBjYW4gb25seSBjb21wYXJlXG4gICAgICAgIGxldCBjb250ZXh0UGFnZSA9IGNvbnRleHQ7XG4gICAgICAgIHJldHVybiBjb250ZXh0UGFnZS5pZCA9PT0gcGFnZU9yR3JvdXAuaWQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgY2hlY2tpbmcgYWdhaW5zdCBncm91cCwgY2hlY2sgZXZlcnl0aGluZyB1cHdhcmRzIHRoZSB0cmVlLiBJZiBncm91cCBjb250YWlucyB0aGUgcGFnZSwgcmV0dXJuIHRoYXQgaW5mb3JtYXRpb25cbiAgICAgICAgbGV0IGNvbnRleHRHcm91cCA9IGNvbnRleHQ7XG4gICAgICAgIGlmICghY29udGV4dEdyb3VwLmlzUm9vdCAmJiBjb250ZXh0R3JvdXAuY2hpbGRyZW5JZHMuaW5kZXhPZihwYWdlT3JHcm91cC5wZXJzaXN0ZW50SWQpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29udGV4dEdyb3VwLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2VPckdyb3VwQWN0aXZlSW5Db250ZXh0KHBhZ2VPckdyb3VwLCBjb250ZXh0R3JvdXAucGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlYWNoZWQgcm9vdCBhbmQgZGlkbid0IGZpbmQgYW55dGhpbmcsIGFiYW5kb24gc2hpcFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBIZWFkaW5nc1xuZnVuY3Rpb24gaGVhZGluZ1BsYWluVGV4dChoZWFkZXIpIHtcbiAgICByZXR1cm4gaGVhZGVyLnRleHQuc3BhbnMubWFwKHMgPT4gcy50ZXh0KS5qb2luKFwiXCIpO1xufVxuZnVuY3Rpb24gc2x1Z2lmeUhlYWRpbmcoaGVhZGVyKSB7XG4gICAgbGV0IGZ1bGxUZXh0ID0gaGVhZGluZ1BsYWluVGV4dChoZWFkZXIpO1xuICAgIHJldHVybiBzbHVnaWZ5KGZ1bGxUZXh0KTtcbn1cbmZ1bmN0aW9uIHNsdWdpZnkoc3RyKSB7XG4gICAgLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2NvZGVndXkvNjY4NDU4OFxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gcmVtb3ZlIGFjY2VudHMsIHN3YXAgw7EgZm9yIG4sIGV0Y1xuICAgIHZhciBmcm9tID0gXCLDoMOhw6PDpMOiw6jDqcOrw6rDrMOtw6/DrsOyw7PDtsO0w7nDusO8w7vDscOnwrcvXyw6O1wiO1xuICAgIHZhciB0byA9IFwiYWFhYWFlZWVlaWlpaW9vb291dXV1bmMtLS0tLS1cIjtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZnJvbS5jaGFyQXQoaSksICdnJyksIHRvLmNoYXJBdChpKSk7XG4gICAgfVxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9bXmEtejAtOSAtXS9nLCAnJykgLy8gcmVtb3ZlIGludmFsaWQgY2hhcnNcbiAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKSAvLyBjb2xsYXBzZSB3aGl0ZXNwYWNlIGFuZCByZXBsYWNlIGJ5IC1cbiAgICAgICAgLnJlcGxhY2UoLy0rL2csICctJyk7IC8vIGNvbGxhcHNlIGRhc2hlc1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBmaXJzdFBhZ2VGcm9tVG9wKGRvY3VtZW50YXRpb25Sb290KSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgZG9jdW1lbnRhdGlvblJvb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFwiUGFnZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcG9zc2libGVQYWdlID0gZmlyc3RQYWdlRnJvbVRvcChjaGlsZCk7XG4gICAgICAgICAgICBpZiAocG9zc2libGVQYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlUGFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gU2VhcmNoIGluZGV4IHByb2Nlc3NpbmdcbmZ1bmN0aW9uIGJ1aWxkU2VhcmNoSW5kZXhKU09OKHBhZ2VzLCBkb21haW4pIHtcbiAgICAvLyBWZXJ5IG5haXZlIHNlYXJjaCBpbmRleCBpbXBsZW1lbnRhdGlvbi4gVGhlIHBlcmZvcm1hbmNlIG9mIHRoaXMgd2lsbCBiZSBhYnNvbHV0ZWx5IGFieXNtYWwuIFxuICAgIC8vIFRoaXMgd2lsbCBnZXQgb3B0aW1pemVkIHdoZW4gdGhlIGNvcmUgc2VhcmNoIHdvcmtzIG92ZXIgdGltZS4gUHJvYmFibHkgbW92ZWQgdG8gZWxhc3RpYyBzZWFyY2ggb3Igc29tZXRoaW5nIGxpa2UgdGhhdFxuICAgIGxldCBpZCA9IDA7XG4gICAgbGV0IGRhdGEgPSBbXTtcbiAgICAvLyBQcm9jZXNzIGV2ZXJ5IHBhZ2UgZm9yIGRhdGFcbiAgICBmb3IgKGxldCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICAgIC8vIEJhc2ljIGluZm9ybWF0aW9uXG4gICAgICAgIGxldCBuYW1lID0gcGFnZS50aXRsZTtcbiAgICAgICAgLy8gUGF0aCBhbmQgdXJsIGNyZWF0aW9uXG4gICAgICAgIGxldCBzdWJwYXRocyA9IFtuYW1lXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IHBhZ2UucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsIHx8IHBhcmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50LmlzUm9vdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VicGF0aHMuc3BsaWNlKDAsIDAsIHBhcmVudC50aXRsZSk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXRoID0gc3VicGF0aHMuam9pbihcIiAvIFwiKTtcbiAgICAgICAgbGV0IHVybCA9IHBhZ2VVcmwocGFnZSwgZG9tYWluKTtcbiAgICAgICAgLy8gSGVhZGVyIGFuZCB0ZXh0IHBhcnNpbmdcbiAgICAgICAgbGV0IGFsbEJsb2NrcyA9IGZsYXR0ZW5lZEJsb2Nrc09mUGFnZShwYWdlKTtcbiAgICAgICAgdmFyIHRleHRzID0gW107XG4gICAgICAgIHZhciBoZWFkZXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGJsb2NrIG9mIGFsbEJsb2Nrcykge1xuICAgICAgICAgICAgaWYgKGJsb2NrLnR5cGUgPT09IFwiVGV4dFwiIHx8IGJsb2NrLnR5cGUgPT09IFwiQ2FsbG91dFwiIHx8IGJsb2NrLnR5cGUgPT09IFwiT3JkZXJlZExpc3RcIiB8fCBibG9jay50eXBlID09PSBcIlVub3JkZXJlZExpc3RcIiB8fCBibG9jay50eXBlID09PSBcIlF1b3RlXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRleHRPZkJsb2NrKGJsb2NrKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRzLnB1c2godGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2sudHlwZSA9PT0gXCJIZWFkaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRleHRPZkJsb2NrKGJsb2NrKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0IHBpZWNlcyBmcm9tIHRleHQgaW5mb3JtYXRpb25cbiAgICAgICAgZm9yIChsZXQgdGV4dCBvZiB0ZXh0cykge1xuICAgICAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogaWQrKyxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJvZHlcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0IHBpZWNlcyBmcm9tIGhlYWRlcnNcbiAgICAgICAgZm9yIChsZXQgdGV4dCBvZiBoZWFkZXJzKSB7XG4gICAgICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBpZCsrLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCBkYXRhIGFuZCBtYWtlIGluZGV4IHJlYWRhYmxlIGZvciBlYXNpZXIgZGVidWdnaW5nIGZvciBub3dcbiAgICAvLyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMilcbiAgICAvLyBFeHBlcmltZW50YWw6IENyZWF0ZSBpbmRleC4gV0lQOiBQcmVnZW5lcmF0ZSBsb2FkZWQgaW5kZXhcbiAgICBsZXQgc2kgPSBgXG4gIGNvbnN0IGx1bnJEYXRhID0gJHtKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKX07XG4gIGNvbnN0IGx1bnJJbmRleCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZmllbGQoJ3RleHQnKVxuICAgIHRoaXMucmVmKCdpZCcpXG4gICAgdGhpcy5tZXRhZGF0YVdoaXRlbGlzdCA9IFsncG9zaXRpb24nXVxuICBcbiAgICAvLyBOb3RlIGluZGV4IGhhcyBiZWVuIGxvYWRlZCBpbnRvIHRoZSBwYWdlIHdpdGggcGFnZSByZXF1ZXN0XG4gICAgbHVuckRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZG9jKSB7XG4gICAgICB0aGlzLmFkZChkb2MpXG4gICAgfSwgdGhpcylcbiAgfSk7XG4gIGA7XG4gICAgcmV0dXJuIHNpO1xufVxuZnVuY3Rpb24gZmxhdHRlbmVkQmxvY2tzT2ZQYWdlKHBhZ2UpIHtcbiAgICBsZXQgYmxvY2tzID0gcGFnZS5ibG9ja3M7XG4gICAgZm9yIChsZXQgYmxvY2sgb2YgcGFnZS5ibG9ja3MpIHtcbiAgICAgICAgYmxvY2tzID0gYmxvY2tzLmNvbmNhdChmbGF0dGVuZWRCbG9ja3NPZkJsb2NrKGJsb2NrKSk7XG4gICAgfVxuICAgIHJldHVybiBibG9ja3M7XG59XG5mdW5jdGlvbiBmbGF0dGVuZWRCbG9ja3NPZkJsb2NrKGJsb2NrKSB7XG4gICAgbGV0IHN1YmJsb2NrcyA9IGJsb2NrLmNoaWxkcmVuO1xuICAgIGZvciAobGV0IHN1YmJsb2NrIG9mIGJsb2NrLmNoaWxkcmVuKSB7XG4gICAgICAgIHN1YmJsb2NrcyA9IHN1YmJsb2Nrcy5jb25jYXQoZmxhdHRlbmVkQmxvY2tzT2ZCbG9jayhzdWJibG9jaykpO1xuICAgIH1cbiAgICByZXR1cm4gc3ViYmxvY2tzO1xufVxuZnVuY3Rpb24gdGV4dE9mQmxvY2soYmxvY2spIHtcbiAgICByZXR1cm4gYmxvY2sudGV4dC5zcGFucy5tYXAocyA9PiBzLnRleHQpLmpvaW4oXCJcIik7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9