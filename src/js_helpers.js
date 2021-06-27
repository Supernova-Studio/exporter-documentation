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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzX2hlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gQmx1ZXByaW50IGZ1bmN0aW9uc1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJwYWdlVXJsXCIsIHBhZ2VVcmwpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJyb290VXJsXCIsIHJvb3RVcmwpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJhc3NldFVybFwiLCBhc3NldFVybCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImhpZ2hsaWdodFNhZmVTdHJpbmdcIiwgaGlnaGxpZ2h0U2FmZVN0cmluZyk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImlzRXhwZXJpbWVudGFsQmxvY2tcIiwgaXNFeHBlcmltZW50YWxCbG9jayk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInBhcnNlRXhwZXJpbWVudGFsQmxvY2tcIiwgcGFyc2VFeHBlcmltZW50YWxCbG9jayk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImZvcm1hdHRlZFRva2VuR3JvdXBIZWFkZXJcIiwgZm9ybWF0dGVkVG9rZW5Hcm91cEhlYWRlcik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImZ1bGxUb2tlbkdyb3VwTmFtZVwiLCBmdWxsVG9rZW5Hcm91cE5hbWUpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJncmFkaWVudERlc2NyaXB0aW9uXCIsIGdyYWRpZW50RGVzY3JpcHRpb24pO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJncmFkaWVudFRva2VuVmFsdWVcIiwgZ3JhZGllbnRUb2tlblZhbHVlKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwic2hhZG93RGVzY3JpcHRpb25cIiwgc2hhZG93RGVzY3JpcHRpb24pO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzaGFkb3dUb2tlblZhbHVlXCIsIHNoYWRvd1Rva2VuVmFsdWUpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJtZWFzdXJlVHlwZUludG9SZWFkYWJsZVVuaXRcIiwgbWVhc3VyZVR5cGVJbnRvUmVhZGFibGVVbml0KTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwidHlwb2dyYXBoeURlc2NyaXB0aW9uXCIsIHR5cG9ncmFwaHlEZXNjcmlwdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImZpcnN0U3ViZ3JvdXBPZlBhZ2VcIiwgZmlyc3RTdWJncm91cE9mUGFnZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInBhZ2VPckdyb3VwQWN0aXZlSW5Db250ZXh0XCIsIHBhZ2VPckdyb3VwQWN0aXZlSW5Db250ZXh0KTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwic2x1Z2lmeUhlYWRpbmdcIiwgc2x1Z2lmeUhlYWRpbmcpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJoZWFkaW5nUGxhaW5UZXh0XCIsIGhlYWRpbmdQbGFpblRleHQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJmaXJzdFBhZ2VGcm9tVG9wXCIsIGZpcnN0UGFnZUZyb21Ub3ApO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJidWlsZFNlYXJjaEluZGV4SlNPTlwiLCBidWlsZFNlYXJjaEluZGV4SlNPTik7XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFVSTHNcbi8qKiBHZW5lcmF0ZSBwYWdlIHNsdWcgZm9yIHRoZSBnZW5lcmF0ZWQgcGFnZSAqL1xuZnVuY3Rpb24gcGFnZVVybChvYmplY3QsIHByZWZpeCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAob2JqZWN0LnR5cGUgPT09IFwiR3JvdXBcIikge1xuICAgICAgICBsZXQgZ3JvdXAgPSBvYmplY3Q7XG4gICAgICAgIGxldCBwYWdlcyA9IGdyb3VwLmNoaWxkcmVuLmZpbHRlcihjID0+IGMudHlwZSA9PT0gXCJQYWdlXCIpO1xuICAgICAgICBpZiAocGFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2VVcmwocGFnZXNbMF0sIHByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIG5vdCBoYW5kbGVkLCBncm91cCBtdXN0IGNvbnRhaW4gcGFnZSBvdGhlcndpc2UgaXQgc2hvdWxkIGJlIGhpZGRlbiBmcm9tIGdlbmVyYXRpb25cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBwYWdlID0gb2JqZWN0O1xuICAgIGxldCBwYWdlU2x1ZyA9IChfYSA9IHBhZ2UudXNlclNsdWcpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHBhZ2Uuc2x1ZztcbiAgICBsZXQgc3VicGF0aHMgPSBbXTtcbiAgICAvLyBDb25zdHJ1Y3QgZ3JvdXAgcGF0aCBzZWdtZW50c1xuICAgIGxldCBwYXJlbnQgPSBwYWdlLnBhcmVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgIHN1YnBhdGhzLnB1c2goc2x1Z2lmeShwYXJlbnQudGl0bGUpKTtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIGxhc3Qgc2VnbWVudCBhZGRlZCwgYmVjYXVzZSB3ZSBkb24ndCBjYXJlIGFib3V0IHJvb3QgZ3JvdXBcbiAgICBzdWJwYXRocy5wb3AoKTtcbiAgICAvLyBSZXRyaWV2ZSB1cmwtc2FmZSBwYXRoIGNvbnN0cnVjdGVkIGFzIFtob3N0XVtncm91cC1zbHVnc11bcGF0aC1zbHVnXVsuaHRtbF1cbiAgICBsZXQgcGF0aCA9IFtwcmVmaXgsIC4uLnN1YnBhdGhzLnJldmVyc2UoKSwgcGFnZVNsdWddLmpvaW4oXCIvXCIpICsgXCIuaHRtbFwiO1xuICAgIHJldHVybiBwYXRoO1xufVxuLyoqIENyZWF0ZSBwcm9wZXIgdXJsIHRoYXQgY2hhbmdlcyB3aXRoIHRoZSBmb2xkZXItZGVwdGggb2YgdGhlIGRvY3VtZW50YXRpb24gKi9cbmZ1bmN0aW9uIHJvb3RVcmwoYXNzZXQsIHByZWZpeCkge1xuICAgIGxldCBmcmFnbWVudHMgPSBbcHJlZml4LCBhc3NldF07XG4gICAgLy8gUmV0cmlldmUgdXJsLXNhZmUgcGF0aCBjb25zdHJ1Y3RlZCBhcyBbaG9zdF1bYXNzZXQtc2x1Z11cbiAgICBsZXQgcGF0aCA9IGZyYWdtZW50cy5qb2luKFwiL1wiKTtcbiAgICByZXR1cm4gcGF0aDtcbn1cbi8qKiBDcmVhdGUgcHJvcGVyIHVybCB0aGF0IGNoYW5nZXMgd2l0aCB0aGUgZm9sZGVyLWRlcHRoIG9mIHRoZSBkb2N1bWVudGF0aW9uICovXG5mdW5jdGlvbiBhc3NldFVybChhc3NldCwgcHJlZml4KSB7XG4gICAgbGV0IGFzc2V0Rm9sZGVyID0gXCJhc3NldHNcIjtcbiAgICBsZXQgZnJhZ21lbnRzID0gW3ByZWZpeCwgYXNzZXRGb2xkZXIsIGFzc2V0XTtcbiAgICAvLyBSZXRyaWV2ZSB1cmwtc2FmZSBwYXRoIGNvbnN0cnVjdGVkIGFzIFtob3N0XVthc3NldC1mb2xkZXJdW2Fzc2V0LXNsdWddXG4gICAgbGV0IHBhdGggPSBmcmFnbWVudHMuam9pbihcIi9cIik7XG4gICAgcmV0dXJuIHBhdGg7XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIEV4cGVyaW1lbnRhbCBmZWF0dXJlc1xuLyoqIFBhcnNlIG91dCBleHBlcmltZW50YWwgYmxvY2ssIGlmIGV4aXN0cyAqL1xuZnVuY3Rpb24gaXNFeHBlcmltZW50YWxCbG9jayhibG9jaykge1xuICAgIHJldHVybiBibG9jay50ZXh0LnNwYW5zLmxlbmd0aCA9PT0gMSAmJiBibG9jay50ZXh0LnNwYW5zWzBdLnRleHQuc3RhcnRzV2l0aChcIltibG9jazpcIik7XG59XG4vKiogUGFyc2UgZXhwZXJpbWVudGFsIGluZm9ybWF0aW9uIGZyb20gdGhlIHRleHQgYmxvY2ssIHNvIHdlIGNhbiBjb252ZXJ0IGl0IHRvIGV4cGVyaW1lbnRhbCBibG9jayAgKi9cbmZ1bmN0aW9uIHBhcnNlRXhwZXJpbWVudGFsQmxvY2soYmxvY2spIHtcbiAgICAvLyBUaGlzIGlzIHN0dXBpZCBkdW1iIHBhcnNpbmcsIGJ1dCBpdCByZWFsbHkgaXMganVzdCBmb3IgdGhhdCBvbmUgdXNlY2FzZSBhbmQgd2lsbCBiZSByZW1vdmVkIDopXG4gICAgbGV0IHRleHQgPSBibG9jay50ZXh0LnNwYW5zWzBdLnRleHQ7XG4gICAgdGV4dCA9IHRleHQuc3Vic3RyKDEpOyAvLyBSZW1vdmUgZmlyc3QgW1xuICAgIGxldCBibG9ja3MgPSB0ZXh0LnNwbGl0KFwiXVwiKTsgLy8gU3BsaXQgYnkgXSBzbyB3ZSBnZXQgYmxvY2s6WCAgYW5kICAgcGF5bG9hZCAobWF5YmUgVVJMKVxuICAgIC8vIFBhcnNlIG91dHB1dFxuICAgIGxldCBwYXlsb2FkID0gYmxvY2tzWzFdLnRyaW0oKTtcbiAgICBsZXQgYmxvY2tUeXBlID0gYmxvY2tzWzBdLnNwbGl0KFwiOlwiKVsxXTtcbiAgICAvLyBFeHRyYSBmb3IgdGFicywgaWYgZGV0ZWN0ZWRcbiAgICBsZXQgdGFicyA9IHBheWxvYWQuc3BsaXQoXCJ8XCIpLm1hcChwID0+IHAudHJpbSgpKTtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBBcnJheSgpO1xuICAgIGxldCBjb250ZW50ID0gbmV3IEFycmF5KCk7XG4gICAgdGFicy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgaGVhZGVycy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBGYWxsYmFjayB0byBzb21lIHNlbnNpYmxlIGluZm9ybWF0aW9uIGlmIHVzZXIgZGlkbid0IGZvcm1hdCBpdCB0b28gbXVjaCwgb3IgdGhlIGJsb2NrIGlzIG5vdCB0YWJcbiAgICAvLyBhbmQgbm9ybWFsaXplXG4gICAgaGVhZGVycyA9IGhlYWRlcnMubGVuZ3RoID4gMCA/IGhlYWRlcnMgOiBbXCJIZWFkZXJcIl07XG4gICAgY29udGVudCA9IGNvbnRlbnQubGVuZ3RoID4gMCA/IGNvbnRlbnQgOiBbcGF5bG9hZF07XG4gICAgaWYgKGhlYWRlcnMubGVuZ3RoICE9PSBjb250ZW50Lmxlbmd0aCkge1xuICAgICAgICBoZWFkZXJzID0gW1wiSW5jb3JyZWN0IHRhYiBzdHJ1Y3R1cmVcIl07XG4gICAgICAgIGNvbnRlbnQgPSBbXCJJbWJhbGFuY2VkIG51bWJlciBvZiB0YWIgc3RydWN0dXJlcywgbXVzdCBiZSBwYWlycyBvZiBoZWFkZXIgLyBjb250ZW50XCJdO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBibG9ja1R5cGU6IGJsb2NrVHlwZSxcbiAgICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgICAgICAgfVxuICAgIH07XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFN0cmluZyBtYW5pcHVsYXRpb25cbi8qKiBFc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIHRoZSBnaXZlbiBzdHJpbmcgb2YgdGV4dC4gRW5jb2RpbmcgcGFydCB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9jb21wb25lbnQvZXNjYXBlLWh0bWwgKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodFNhZmVTdHJpbmcoYmxvY2spIHtcbiAgICAvLyBSZXRyaWV2ZSByYXcgdGV4dCwgaWdub3JlIGFsbCBhdHRyaWJ1dGVzIGZvciBub3dcbiAgICBsZXQgc3RyaW5nID0gYmxvY2sudGV4dC5zcGFucy5tYXAoKHMpID0+IHMudGV4dCkuam9pbihcIlwiKTtcbiAgICAvLyBNYWtlIHN1cmUgaXQgaXMgcHJvcGVybHkgc2FmZSBmb3IgSFRNTCByZW5kZXJpbmdcbiAgICByZXR1cm4gZXNjYXBlSHRtbChzdHJpbmcpO1xufVxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICB2YXIgbWF0Y2hIdG1sUmVnRXhwID0gL1tcIicmPD5dLztcbiAgICB2YXIgc3RyID0gXCJcIiArIHN0cmluZztcbiAgICB2YXIgbWF0Y2ggPSBtYXRjaEh0bWxSZWdFeHAuZXhlYyhzdHIpO1xuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgdmFyIGVzY2FwZTtcbiAgICB2YXIgaHRtbCA9IFwiXCI7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgbGFzdEluZGV4ID0gMDtcbiAgICBmb3IgKGluZGV4ID0gbWF0Y2guaW5kZXg7IGluZGV4IDwgc3RyLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBzd2l0Y2ggKHN0ci5jaGFyQ29kZUF0KGluZGV4KSkge1xuICAgICAgICAgICAgY2FzZSAzNDogLy8gXCJcbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiZxdW90O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODogLy8gJlxuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJmFtcDtcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6IC8vICdcbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiYjMzk7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDYwOiAvLyA8XG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImbHQ7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDYyOiAvLyA+XG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImZ3Q7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0SW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICBodG1sICs9IHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICBodG1sICs9IGVzY2FwZTtcbiAgICB9XG4gICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gaW5kZXggPyBodG1sICsgc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KSA6IGh0bWw7XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFRva2Vuc1xuLyoqICBDb252ZXJ0IGdyb3VwIGludG8gcHJvcGVybHkgZm9ybWF0dGVkIGhlYWRlciAqL1xuZnVuY3Rpb24gZnVsbFRva2VuR3JvdXBOYW1lKHRva2VuR3JvdXApIHtcbiAgICAvLyBSZXRyaWV2ZSB0b2tlbiBncm91cCBwYXRoXG4gICAgcmV0dXJuIFsuLi50b2tlbkdyb3VwLnBhdGgsIHRva2VuR3JvdXAubmFtZV0uam9pbihcIi9cIik7XG59XG4vKiogIENvbnZlcnQgZ3JvdXAgaW50byBwcm9wZXJseSBmb3JtYXR0ZWQgaGVhZGVyICovXG5mdW5jdGlvbiBmb3JtYXR0ZWRUb2tlbkdyb3VwSGVhZGVyKHRva2VuR3JvdXAsIHNob3dTdWJwYXRoKSB7XG4gICAgLy8gUmV0cmlldmUgdG9rZW4gZ3JvdXAgZWl0aGVyIGluY2x1ZGluZyBvciBub3QgaW5jbHVkaW5nIHRoZSBwYXRoIHRvIHRoZSBncm91cFxuICAgIGlmICh0b2tlbkdyb3VwLnBhdGgubGVuZ3RoID4gMCAmJiBzaG93U3VicGF0aCkge1xuICAgICAgICBsZXQgbGlnaHQgPSB0b2tlbkdyb3VwLnBhdGguam9pbihcIiAvIFwiKTtcbiAgICAgICAgbGV0IGRhcmsgPSB0b2tlbkdyb3VwLm5hbWU7XG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJsaWdodFwiPiR7bGlnaHR9IC8gPC9zcGFuPiR7ZGFya31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRva2VuR3JvdXAubmFtZTtcbiAgICB9XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBncmFkaWVudCB0b2tlbiAqL1xuZnVuY3Rpb24gZ3JhZGllbnREZXNjcmlwdGlvbihncmFkaWVudFRva2VuKSB7XG4gICAgLy8gRGVzY3JpYmUgZ3JhZGllbnQgYXMgKHR5cGUpIChzdG9wMSwgc3RvcDIgLi4uKVxuICAgIGxldCB0eXBlID0gYCR7Z3JhZGllbnRUb2tlbi52YWx1ZS50eXBlfSBHcmFkaWVudGA7XG4gICAgbGV0IHN0b3BzID0gZ3JhZGllbnRUb2tlbi52YWx1ZS5zdG9wcy5tYXAoc3RvcCA9PiB7XG4gICAgICAgIHJldHVybiBgIyR7c3RvcC5jb2xvci5oZXgudG9VcHBlckNhc2UoKX0sICR7c3RvcC5wb3NpdGlvbiAqIDEwMH0lYDtcbiAgICB9KS5qb2luKFwiLCBcIik7XG4gICAgcmV0dXJuIGAke3R5cGV9LCAke3N0b3BzfWA7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBncmFkaWVudCB2YWx1ZSBhcyB0b2tlbiAqL1xuZnVuY3Rpb24gZ3JhZGllbnRUb2tlblZhbHVlKGdyYWRpZW50VG9rZW4pIHtcbiAgICBsZXQgZ3JhZGllbnRUeXBlID0gXCJcIjtcbiAgICBzd2l0Y2ggKGdyYWRpZW50VG9rZW4udmFsdWUudHlwZSkge1xuICAgICAgICBjYXNlIFwiTGluZWFyXCI6XG4gICAgICAgICAgICBncmFkaWVudFR5cGUgPSBcImxpbmVhci1ncmFkaWVudCgwZGVnLCBcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUmFkaWFsXCI6XG4gICAgICAgICAgICBncmFkaWVudFR5cGUgPSBcInJhZGlhbC1ncmFkaWVudChjaXJjbGUsIFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBbmd1bGFyXCI6XG4gICAgICAgICAgICBncmFkaWVudFR5cGUgPSBcImNvbmljLWdyYWRpZW50KFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIERlc2NyaWJlIGdyYWRpZW50IGFzICh0eXBlKSAoc3RvcDEsIHN0b3AyIC4uLilcbiAgICAvLyBFeGFtcGxlOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZ2JhKDYzLDk0LDI1MSwxKSAwJSwgcmdiYSgyNTIsNzAsMTA3LDEpIDEwMCUpO1xuICAgIGxldCBzdG9wcyA9IGdyYWRpZW50VG9rZW4udmFsdWUuc3RvcHMubWFwKHN0b3AgPT4ge1xuICAgICAgICByZXR1cm4gYCMke3N0b3AuY29sb3IuaGV4LnRvVXBwZXJDYXNlKCl9ICR7c3RvcC5wb3NpdGlvbiAqIDEwMH0lYDtcbiAgICB9KS5qb2luKFwiLCBcIik7XG4gICAgcmV0dXJuIGAke2dyYWRpZW50VHlwZX0ke3N0b3BzfSlgO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggc2hhZG93IHRva2VuICovXG5mdW5jdGlvbiBzaGFkb3dEZXNjcmlwdGlvbihzaGFkb3dUb2tlbikge1xuICAgIHJldHVybiBzaGFkb3dUb2tlblZhbHVlKHNoYWRvd1Rva2VuKTtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IHNoYWRvdyB0b2tlbiAqL1xuZnVuY3Rpb24gdHlwb2dyYXBoeURlc2NyaXB0aW9uKHR5cG9ncmFwaHlUb2tlbikge1xuICAgIGxldCB2YWx1ZSA9IHR5cG9ncmFwaHlUb2tlbi52YWx1ZTtcbiAgICBsZXQgZm9udE5hbWUgPSBgJHt2YWx1ZS5mb250LmZhbWlseX0gJHt2YWx1ZS5mb250LnN1YmZhbWlseX1gO1xuICAgIGxldCBmb250VmFsdWUgPSBgJHt2YWx1ZS5mb250U2l6ZS5tZWFzdXJlfSR7bWVhc3VyZVR5cGVJbnRvUmVhZGFibGVVbml0KHZhbHVlLmZvbnRTaXplLnVuaXQpfWA7XG4gICAgbGV0IHRleHREZWNvcmF0aW9uID0gXCJcIjtcbiAgICBsZXQgdGV4dENhc2UgPSBcIlwiO1xuICAgIGlmICh2YWx1ZS50ZXh0RGVjb3JhdGlvbiAhPT0gJ05vbmUnKSB7XG4gICAgICAgIHRleHREZWNvcmF0aW9uID0gYCwgJHt2YWx1ZS50ZXh0RGVjb3JhdGlvbi50b0xvd2VyQ2FzZSgpfWA7XG4gICAgfVxuICAgIGlmICh2YWx1ZS50ZXh0Q2FzZSAhPT0gJ09yaWdpbmFsJykge1xuICAgICAgICB0ZXh0Q2FzZSA9IGAsICR7dmFsdWUudGV4dENhc2UudG9Mb3dlckNhc2UoKX1gO1xuICAgIH1cbiAgICByZXR1cm4gYCR7Zm9udE5hbWV9ICR7Zm9udFZhbHVlfSR7dGV4dERlY29yYXRpb259JHt0ZXh0Q2FzZX1gO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggc2hhZG93IHZhbHVlIGFzIHRva2VuICovXG5mdW5jdGlvbiBzaGFkb3dUb2tlblZhbHVlKHNoYWRvd1Rva2VuKSB7XG4gICAgcmV0dXJuIGAke3NoYWRvd1Rva2VuLnZhbHVlLngubWVhc3VyZX1weCAke3NoYWRvd1Rva2VuLnZhbHVlLnkubWVhc3VyZX1weCAke3NoYWRvd1Rva2VuLnZhbHVlLnJhZGl1cy5tZWFzdXJlfXB4ICR7c2hhZG93VG9rZW4udmFsdWUuc3ByZWFkLm1lYXN1cmV9cHggIyR7c2hhZG93VG9rZW4udmFsdWUuY29sb3IuaGV4fWA7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBncmFkaWVudCB2YWx1ZSBhcyB0b2tlbiAqL1xuZnVuY3Rpb24gbWVhc3VyZVR5cGVJbnRvUmVhZGFibGVVbml0KHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnUG9pbnRzJzogcmV0dXJuICdwdCc7XG4gICAgICAgIGNhc2UgJ1BpeGVscyc6IHJldHVybiAncHgnO1xuICAgICAgICBjYXNlICdQZXJjZW50JzogcmV0dXJuICclJztcbiAgICAgICAgY2FzZSAnRW1zJzogcmV0dXJuICdlbSc7XG4gICAgfVxufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBTdXBwb3J0XG4vKiogUmV0cmlldmUgZmlyc3Qgc3ViZ3JvdXAgYmVsb3cgcm9vdCBncm91cCAqL1xuZnVuY3Rpb24gZmlyc3RTdWJncm91cE9mUGFnZShwYWdlKSB7XG4gICAgbGV0IHBhcmVudCA9IHBhZ2UucGFyZW50O1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmICghcGFyZW50IHx8IHBhcmVudC5pc1Jvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5wYXJlbnQgJiYgcGFyZW50LnBhcmVudC5pc1Jvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG59XG5mdW5jdGlvbiBwYWdlT3JHcm91cEFjdGl2ZUluQ29udGV4dChwYWdlT3JHcm91cCwgY29udGV4dCkge1xuICAgIGlmIChjb250ZXh0LnR5cGUgPT09IFwiUGFnZVwiKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBjaGVja2luZyBhZ2FpbnN0IHBsYWluIHBhZ2UsIHRoZW4gd2UgY2FuIG9ubHkgY29tcGFyZVxuICAgICAgICBsZXQgY29udGV4dFBhZ2UgPSBjb250ZXh0O1xuICAgICAgICByZXR1cm4gY29udGV4dFBhZ2UuaWQgPT09IHBhZ2VPckdyb3VwLmlkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGNoZWNraW5nIGFnYWluc3QgZ3JvdXAsIGNoZWNrIGV2ZXJ5dGhpbmcgdXB3YXJkcyB0aGUgdHJlZS4gSWYgZ3JvdXAgY29udGFpbnMgdGhlIHBhZ2UsIHJldHVybiB0aGF0IGluZm9ybWF0aW9uXG4gICAgICAgIGxldCBjb250ZXh0R3JvdXAgPSBjb250ZXh0O1xuICAgICAgICBpZiAoIWNvbnRleHRHcm91cC5pc1Jvb3QgJiYgY29udGV4dEdyb3VwLmNoaWxkcmVuSWRzLmluZGV4T2YocGFnZU9yR3JvdXAucGVyc2lzdGVudElkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnRleHRHcm91cC5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYWdlT3JHcm91cEFjdGl2ZUluQ29udGV4dChwYWdlT3JHcm91cCwgY29udGV4dEdyb3VwLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZWFjaGVkIHJvb3QgYW5kIGRpZG4ndCBmaW5kIGFueXRoaW5nLCBhYmFuZG9uIHNoaXBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gSGVhZGluZ3NcbmZ1bmN0aW9uIGhlYWRpbmdQbGFpblRleHQoaGVhZGVyKSB7XG4gICAgcmV0dXJuIGhlYWRlci50ZXh0LnNwYW5zLm1hcChzID0+IHMudGV4dCkuam9pbihcIlwiKTtcbn1cbmZ1bmN0aW9uIHNsdWdpZnlIZWFkaW5nKGhlYWRlcikge1xuICAgIGxldCBmdWxsVGV4dCA9IGhlYWRpbmdQbGFpblRleHQoaGVhZGVyKTtcbiAgICByZXR1cm4gc2x1Z2lmeShmdWxsVGV4dCk7XG59XG5mdW5jdGlvbiBzbHVnaWZ5KHN0cikge1xuICAgIC8vIFRoYW5rcyB0byBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9jb2RlZ3V5LzY2ODQ1ODhcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIHJlbW92ZSBhY2NlbnRzLCBzd2FwIMOxIGZvciBuLCBldGNcbiAgICB2YXIgZnJvbSA9IFwiw6DDocOjw6TDosOow6nDq8Oqw6zDrcOvw67DssOzw7bDtMO5w7rDvMO7w7HDp8K3L18sOjtcIjtcbiAgICB2YXIgdG8gPSBcImFhYWFhZWVlZWlpaWlvb29vdXV1dW5jLS0tLS0tXCI7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGZyb20uY2hhckF0KGkpLCAnZycpLCB0by5jaGFyQXQoaSkpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvW15hLXowLTkgLV0vZywgJycpIC8vIHJlbW92ZSBpbnZhbGlkIGNoYXJzXG4gICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICctJykgLy8gY29sbGFwc2Ugd2hpdGVzcGFjZSBhbmQgcmVwbGFjZSBieSAtXG4gICAgICAgIC5yZXBsYWNlKC8tKy9nLCAnLScpOyAvLyBjb2xsYXBzZSBkYXNoZXNcbiAgICByZXR1cm4gc3RyO1xufVxuZnVuY3Rpb24gZmlyc3RQYWdlRnJvbVRvcChkb2N1bWVudGF0aW9uUm9vdCkge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIGRvY3VtZW50YXRpb25Sb290LmNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSBcIlBhZ2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBvc3NpYmxlUGFnZSA9IGZpcnN0UGFnZUZyb21Ub3AoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKHBvc3NpYmxlUGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NzaWJsZVBhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFNlYXJjaCBpbmRleCBwcm9jZXNzaW5nXG5mdW5jdGlvbiBidWlsZFNlYXJjaEluZGV4SlNPTihwYWdlcywgZG9tYWluKSB7XG4gICAgLy8gVmVyeSBuYWl2ZSBzZWFyY2ggaW5kZXggaW1wbGVtZW50YXRpb24uIFRoZSBwZXJmb3JtYW5jZSBvZiB0aGlzIHdpbGwgYmUgYWJzb2x1dGVseSBhYnlzbWFsLiBcbiAgICAvLyBUaGlzIHdpbGwgZ2V0IG9wdGltaXplZCB3aGVuIHRoZSBjb3JlIHNlYXJjaCB3b3JrcyBvdmVyIHRpbWUuIFByb2JhYmx5IG1vdmVkIHRvIGVsYXN0aWMgc2VhcmNoIG9yIHNvbWV0aGluZyBsaWtlIHRoYXRcbiAgICBsZXQgaWQgPSAwO1xuICAgIGxldCBkYXRhID0gW107XG4gICAgLy8gUHJvY2VzcyBldmVyeSBwYWdlIGZvciBkYXRhXG4gICAgZm9yIChsZXQgcGFnZSBvZiBwYWdlcykge1xuICAgICAgICAvLyBCYXNpYyBpbmZvcm1hdGlvblxuICAgICAgICBsZXQgbmFtZSA9IHBhZ2UudGl0bGU7XG4gICAgICAgIC8vIFBhdGggYW5kIHVybCBjcmVhdGlvblxuICAgICAgICBsZXQgc3VicGF0aHMgPSBbbmFtZV07XG4gICAgICAgIGxldCBwYXJlbnQgPSBwYWdlLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbCB8fCBwYXJlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudC5pc1Jvb3QpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnBhdGhzLnNwbGljZSgwLCAwLCBwYXJlbnQudGl0bGUpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGF0aCA9IHN1YnBhdGhzLmpvaW4oXCIgLyBcIik7XG4gICAgICAgIGxldCB1cmwgPSBwYWdlVXJsKHBhZ2UsIGRvbWFpbik7XG4gICAgICAgIC8vIEhlYWRlciBhbmQgdGV4dCBwYXJzaW5nXG4gICAgICAgIGxldCBhbGxCbG9ja3MgPSBmbGF0dGVuZWRCbG9ja3NPZlBhZ2UocGFnZSk7XG4gICAgICAgIHZhciB0ZXh0cyA9IFtdO1xuICAgICAgICB2YXIgaGVhZGVycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBibG9jayBvZiBhbGxCbG9ja3MpIHtcbiAgICAgICAgICAgIGlmIChibG9jay50eXBlID09PSBcIlRleHRcIiB8fCBibG9jay50eXBlID09PSBcIkNhbGxvdXRcIiB8fCBibG9jay50eXBlID09PSBcIk9yZGVyZWRMaXN0XCIgfHwgYmxvY2sudHlwZSA9PT0gXCJVbm9yZGVyZWRMaXN0XCIgfHwgYmxvY2sudHlwZSA9PT0gXCJRdW90ZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0ZXh0T2ZCbG9jayhibG9jayk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0cy5wdXNoKHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrLnR5cGUgPT09IFwiSGVhZGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0ZXh0T2ZCbG9jayhibG9jayk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2godGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENvbnN0cnVjdCBwaWVjZXMgZnJvbSB0ZXh0IGluZm9ybWF0aW9uXG4gICAgICAgIGZvciAobGV0IHRleHQgb2YgdGV4dHMpIHtcbiAgICAgICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGlkKyssXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJib2R5XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbnN0cnVjdCBwaWVjZXMgZnJvbSBoZWFkZXJzXG4gICAgICAgIGZvciAobGV0IGhlYWRlciBvZiBoZWFkZXJzKSB7XG4gICAgICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBpZCsrLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBoZWFkZXIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IGRhdGEgYW5kIG1ha2UgaW5kZXggcmVhZGFibGUgZm9yIGVhc2llciBkZWJ1Z2dpbmcgZm9yIG5vd1xuICAgIC8vIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKVxuICAgIC8vIEV4cGVyaW1lbnRhbDogQ3JlYXRlIGluZGV4LiBXSVA6IFByZWdlbmVyYXRlIGxvYWRlZCBpbmRleFxuICAgIGxldCBzaSA9IGBcbiAgY29uc3QgbHVuckRhdGEgPSAke0pTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpfTtcbiAgY29uc3QgbHVuckluZGV4ZWREYXRhID0ge31cbiAgY29uc3QgbHVuckluZGV4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5maWVsZCgndGV4dCcpXG4gICAgdGhpcy5yZWYoJ2lkJylcbiAgICB0aGlzLm1ldGFkYXRhV2hpdGVsaXN0ID0gWydwb3NpdGlvbiddXG4gIFxuICAgIC8vIE5vdGUgaW5kZXggaGFzIGJlZW4gbG9hZGVkIGludG8gdGhlIHBhZ2Ugd2l0aCBwYWdlIHJlcXVlc3RcbiAgICBsdW5yRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkb2MpIHtcbiAgICAgIHRoaXMuYWRkKGRvYylcbiAgICAgIGx1bnJJbmRleGVkRGF0YVtkb2MuaWRdID0gZG9jXG4gICAgfSwgdGhpcylcbiAgfSk7XG4gIGA7XG4gICAgcmV0dXJuIHNpO1xufVxuZnVuY3Rpb24gZmxhdHRlbmVkQmxvY2tzT2ZQYWdlKHBhZ2UpIHtcbiAgICBsZXQgYmxvY2tzID0gcGFnZS5ibG9ja3M7XG4gICAgZm9yIChsZXQgYmxvY2sgb2YgcGFnZS5ibG9ja3MpIHtcbiAgICAgICAgYmxvY2tzID0gYmxvY2tzLmNvbmNhdChmbGF0dGVuZWRCbG9ja3NPZkJsb2NrKGJsb2NrKSk7XG4gICAgfVxuICAgIHJldHVybiBibG9ja3M7XG59XG5mdW5jdGlvbiBmbGF0dGVuZWRCbG9ja3NPZkJsb2NrKGJsb2NrKSB7XG4gICAgbGV0IHN1YmJsb2NrcyA9IGJsb2NrLmNoaWxkcmVuO1xuICAgIGZvciAobGV0IHN1YmJsb2NrIG9mIGJsb2NrLmNoaWxkcmVuKSB7XG4gICAgICAgIHN1YmJsb2NrcyA9IHN1YmJsb2Nrcy5jb25jYXQoZmxhdHRlbmVkQmxvY2tzT2ZCbG9jayhzdWJibG9jaykpO1xuICAgIH1cbiAgICByZXR1cm4gc3ViYmxvY2tzO1xufVxuZnVuY3Rpb24gdGV4dE9mQmxvY2soYmxvY2spIHtcbiAgICByZXR1cm4gYmxvY2sudGV4dC5zcGFucy5tYXAocyA9PiBzLnRleHQpLmpvaW4oXCJcIik7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9