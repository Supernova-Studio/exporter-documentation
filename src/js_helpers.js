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
    // Very naive search index implementation. The performance of this will be absolutely abysmal. This will get optimized when the core search works
    let data = [];
    // Process every page for data
    for (let page of pages) {
        // Basic information
        let name = page.title;
        let id = page.persistentId;
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
        // Construct piece
        let piece = {
            name: name,
            id: id,
            readablePath: path,
            url: url,
            texts: texts,
            headers: headers
        };
        data.push(piece);
    }
    // Construct data and make index readable for easier debugging for now
    return JSON.stringify(data, null, 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianNfaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBCbHVlcHJpbnQgZnVuY3Rpb25zXG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInBhZ2VVcmxcIiwgcGFnZVVybCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImFzc2V0VXJsXCIsIGFzc2V0VXJsKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiaGlnaGxpZ2h0U2FmZVN0cmluZ1wiLCBoaWdobGlnaHRTYWZlU3RyaW5nKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiaXNFeHBlcmltZW50YWxCbG9ja1wiLCBpc0V4cGVyaW1lbnRhbEJsb2NrKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicGFyc2VFeHBlcmltZW50YWxCbG9ja1wiLCBwYXJzZUV4cGVyaW1lbnRhbEJsb2NrKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZm9ybWF0dGVkVG9rZW5Hcm91cEhlYWRlclwiLCBmb3JtYXR0ZWRUb2tlbkdyb3VwSGVhZGVyKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZnVsbFRva2VuR3JvdXBOYW1lXCIsIGZ1bGxUb2tlbkdyb3VwTmFtZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImdyYWRpZW50RGVzY3JpcHRpb25cIiwgZ3JhZGllbnREZXNjcmlwdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImdyYWRpZW50VG9rZW5WYWx1ZVwiLCBncmFkaWVudFRva2VuVmFsdWUpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzaGFkb3dEZXNjcmlwdGlvblwiLCBzaGFkb3dEZXNjcmlwdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInNoYWRvd1Rva2VuVmFsdWVcIiwgc2hhZG93VG9rZW5WYWx1ZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcIm1lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdFwiLCBtZWFzdXJlVHlwZUludG9SZWFkYWJsZVVuaXQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJ0eXBvZ3JhcGh5RGVzY3JpcHRpb25cIiwgdHlwb2dyYXBoeURlc2NyaXB0aW9uKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZmlyc3RTdWJncm91cE9mUGFnZVwiLCBmaXJzdFN1Ymdyb3VwT2ZQYWdlKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHRcIiwgcGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzbHVnaWZ5SGVhZGluZ1wiLCBzbHVnaWZ5SGVhZGluZyk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImhlYWRpbmdQbGFpblRleHRcIiwgaGVhZGluZ1BsYWluVGV4dCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImZpcnN0UGFnZUZyb21Ub3BcIiwgZmlyc3RQYWdlRnJvbVRvcCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImJ1aWxkU2VhcmNoSW5kZXhKU09OXCIsIGJ1aWxkU2VhcmNoSW5kZXhKU09OKTtcbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gVVJMc1xuLyoqIEdlbmVyYXRlIHBhZ2Ugc2x1ZyBmb3IgdGhlIGdlbmVyYXRlZCBwYWdlICovXG5mdW5jdGlvbiBwYWdlVXJsKG9iamVjdCwgcHJlZml4KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChvYmplY3QudHlwZSA9PT0gXCJHcm91cFwiKSB7XG4gICAgICAgIGxldCBncm91cCA9IG9iamVjdDtcbiAgICAgICAgbGV0IHBhZ2VzID0gZ3JvdXAuY2hpbGRyZW4uZmlsdGVyKGMgPT4gYy50eXBlID09PSBcIlBhZ2VcIik7XG4gICAgICAgIGlmIChwYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFnZVVybChwYWdlc1swXSwgcHJlZml4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbm90IGhhbmRsZWQsIGdyb3VwIG11c3QgY29udGFpbiBwYWdlIG90aGVyd2lzZSBpdCBzaG91bGQgYmUgaGlkZGVuIGZyb20gZ2VuZXJhdGlvblxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHBhZ2UgPSBvYmplY3Q7XG4gICAgbGV0IHBhZ2VTbHVnID0gKF9hID0gcGFnZS51c2VyU2x1ZykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogcGFnZS5zbHVnO1xuICAgIGxldCBzdWJwYXRocyA9IFtdO1xuICAgIC8vIENvbnN0cnVjdCBncm91cCBwYXRoIHNlZ21lbnRzXG4gICAgbGV0IHBhcmVudCA9IHBhZ2UucGFyZW50O1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgc3VicGF0aHMucHVzaChzbHVnaWZ5KHBhcmVudC50aXRsZSkpO1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgIH1cbiAgICAvLyBSZW1vdmUgbGFzdCBzZWdtZW50IGFkZGVkLCBiZWNhdXNlIHdlIGRvbid0IGNhcmUgYWJvdXQgcm9vdCBncm91cFxuICAgIHN1YnBhdGhzLnBvcCgpO1xuICAgIC8vIFJldHJpZXZlIHVybC1zYWZlIHBhdGggY29uc3RydWN0ZWQgYXMgW2hvc3RdW2dyb3VwLXNsdWdzXVtwYXRoLXNsdWddWy5odG1sXVxuICAgIGxldCBwYXRoID0gW3ByZWZpeCwgLi4uc3VicGF0aHMucmV2ZXJzZSgpLCBwYWdlU2x1Z10uam9pbihcIi9cIikgKyBcIi5odG1sXCI7XG4gICAgcmV0dXJuIHBhdGg7XG59XG4vKiogQ3JlYXRlIHByb3BlciB1cmwgdGhhdCBjaGFuZ2VzIHdpdGggdGhlIGZvbGRlci1kZXB0aCBvZiB0aGUgZG9jdW1lbnRhdGlvbiAqL1xuZnVuY3Rpb24gYXNzZXRVcmwoYXNzZXQsIHByZWZpeCkge1xuICAgIGxldCBhc3NldEZvbGRlciA9IFwiYXNzZXRzXCI7XG4gICAgbGV0IGZyYWdtZW50cyA9IFtwcmVmaXgsIGFzc2V0Rm9sZGVyLCBhc3NldF07XG4gICAgLy8gUmV0cmlldmUgdXJsLXNhZmUgcGF0aCBjb25zdHJ1Y3RlZCBhcyBbaG9zdF1bYXNzZXQtZm9sZGVyXVthc3NldC1zbHVnXVxuICAgIGxldCBwYXRoID0gZnJhZ21lbnRzLmpvaW4oXCIvXCIpO1xuICAgIHJldHVybiBwYXRoO1xufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBFeHBlcmltZW50YWwgZmVhdHVyZXNcbi8qKiBQYXJzZSBvdXQgZXhwZXJpbWVudGFsIGJsb2NrLCBpZiBleGlzdHMgKi9cbmZ1bmN0aW9uIGlzRXhwZXJpbWVudGFsQmxvY2soYmxvY2spIHtcbiAgICByZXR1cm4gYmxvY2sudGV4dC5zcGFucy5sZW5ndGggPT09IDEgJiYgYmxvY2sudGV4dC5zcGFuc1swXS50ZXh0LnN0YXJ0c1dpdGgoXCJbYmxvY2s6XCIpO1xufVxuLyoqIFBhcnNlIGV4cGVyaW1lbnRhbCBpbmZvcm1hdGlvbiBmcm9tIHRoZSB0ZXh0IGJsb2NrLCBzbyB3ZSBjYW4gY29udmVydCBpdCB0byBleHBlcmltZW50YWwgYmxvY2sgICovXG5mdW5jdGlvbiBwYXJzZUV4cGVyaW1lbnRhbEJsb2NrKGJsb2NrKSB7XG4gICAgLy8gVGhpcyBpcyBzdHVwaWQgZHVtYiBwYXJzaW5nLCBidXQgaXQgcmVhbGx5IGlzIGp1c3QgZm9yIHRoYXQgb25lIHVzZWNhc2UgYW5kIHdpbGwgYmUgcmVtb3ZlZCA6KVxuICAgIGxldCB0ZXh0ID0gYmxvY2sudGV4dC5zcGFuc1swXS50ZXh0O1xuICAgIHRleHQgPSB0ZXh0LnN1YnN0cigxKTsgLy8gUmVtb3ZlIGZpcnN0IFtcbiAgICBsZXQgYmxvY2tzID0gdGV4dC5zcGxpdChcIl1cIik7IC8vIFNwbGl0IGJ5IF0gc28gd2UgZ2V0IGJsb2NrOlggIGFuZCAgIHBheWxvYWQgKG1heWJlIFVSTClcbiAgICAvLyBQYXJzZSBvdXRwdXRcbiAgICBsZXQgcGF5bG9hZCA9IGJsb2Nrc1sxXS50cmltKCk7XG4gICAgbGV0IGJsb2NrVHlwZSA9IGJsb2Nrc1swXS5zcGxpdChcIjpcIilbMV07XG4gICAgLy8gRXh0cmEgZm9yIHRhYnMsIGlmIGRldGVjdGVkXG4gICAgbGV0IHRhYnMgPSBwYXlsb2FkLnNwbGl0KFwifFwiKS5tYXAocCA9PiBwLnRyaW0oKSk7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgY29udGVudCA9IG5ldyBBcnJheSgpO1xuICAgIHRhYnMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIGhlYWRlcnMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gRmFsbGJhY2sgdG8gc29tZSBzZW5zaWJsZSBpbmZvcm1hdGlvbiBpZiB1c2VyIGRpZG4ndCBmb3JtYXQgaXQgdG9vIG11Y2gsIG9yIHRoZSBibG9jayBpcyBub3QgdGFiXG4gICAgLy8gYW5kIG5vcm1hbGl6ZVxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLmxlbmd0aCA+IDAgPyBoZWFkZXJzIDogW1wiSGVhZGVyXCJdO1xuICAgIGNvbnRlbnQgPSBjb250ZW50Lmxlbmd0aCA+IDAgPyBjb250ZW50IDogW3BheWxvYWRdO1xuICAgIGlmIChoZWFkZXJzLmxlbmd0aCAhPT0gY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgaGVhZGVycyA9IFtcIkluY29ycmVjdCB0YWIgc3RydWN0dXJlXCJdO1xuICAgICAgICBjb250ZW50ID0gW1wiSW1iYWxhbmNlZCBudW1iZXIgb2YgdGFiIHN0cnVjdHVyZXMsIG11c3QgYmUgcGFpcnMgb2YgaGVhZGVyIC8gY29udGVudFwiXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYmxvY2tUeXBlOiBibG9ja1R5cGUsXG4gICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XG4gICAgICAgIH1cbiAgICB9O1xufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBTdHJpbmcgbWFuaXB1bGF0aW9uXG4vKiogRXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiB0aGUgZ2l2ZW4gc3RyaW5nIG9mIHRleHQuIEVuY29kaW5nIHBhcnQgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vY29tcG9uZW50L2VzY2FwZS1odG1sICovXG5mdW5jdGlvbiBoaWdobGlnaHRTYWZlU3RyaW5nKGJsb2NrKSB7XG4gICAgLy8gUmV0cmlldmUgcmF3IHRleHQsIGlnbm9yZSBhbGwgYXR0cmlidXRlcyBmb3Igbm93XG4gICAgbGV0IHN0cmluZyA9IGJsb2NrLnRleHQuc3BhbnMubWFwKChzKSA9PiBzLnRleHQpLmpvaW4oXCJcIik7XG4gICAgLy8gTWFrZSBzdXJlIGl0IGlzIHByb3Blcmx5IHNhZmUgZm9yIEhUTUwgcmVuZGVyaW5nXG4gICAgcmV0dXJuIGVzY2FwZUh0bWwoc3RyaW5nKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgdmFyIG1hdGNoSHRtbFJlZ0V4cCA9IC9bXCInJjw+XS87XG4gICAgdmFyIHN0ciA9IFwiXCIgKyBzdHJpbmc7XG4gICAgdmFyIG1hdGNoID0gbWF0Y2hIdG1sUmVnRXhwLmV4ZWMoc3RyKTtcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHZhciBlc2NhcGU7XG4gICAgdmFyIGh0bWwgPSBcIlwiO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGxhc3RJbmRleCA9IDA7XG4gICAgZm9yIChpbmRleCA9IG1hdGNoLmluZGV4OyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgc3dpdGNoIChzdHIuY2hhckNvZGVBdChpbmRleCkpIHtcbiAgICAgICAgICAgIGNhc2UgMzQ6IC8vIFwiXG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImcXVvdDtcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6IC8vICZcbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiZhbXA7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OiAvLyAnXG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImIzM5O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2MDogLy8gPFxuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJmx0O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2MjogLy8gPlxuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJmd0O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgaHRtbCArPSBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgaHRtbCArPSBlc2NhcGU7XG4gICAgfVxuICAgIHJldHVybiBsYXN0SW5kZXggIT09IGluZGV4ID8gaHRtbCArIHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCkgOiBodG1sO1xufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBUb2tlbnNcbi8qKiAgQ29udmVydCBncm91cCBpbnRvIHByb3Blcmx5IGZvcm1hdHRlZCBoZWFkZXIgKi9cbmZ1bmN0aW9uIGZ1bGxUb2tlbkdyb3VwTmFtZSh0b2tlbkdyb3VwKSB7XG4gICAgLy8gUmV0cmlldmUgdG9rZW4gZ3JvdXAgcGF0aFxuICAgIHJldHVybiBbLi4udG9rZW5Hcm91cC5wYXRoLCB0b2tlbkdyb3VwLm5hbWVdLmpvaW4oXCIvXCIpO1xufVxuLyoqICBDb252ZXJ0IGdyb3VwIGludG8gcHJvcGVybHkgZm9ybWF0dGVkIGhlYWRlciAqL1xuZnVuY3Rpb24gZm9ybWF0dGVkVG9rZW5Hcm91cEhlYWRlcih0b2tlbkdyb3VwLCBzaG93U3VicGF0aCkge1xuICAgIC8vIFJldHJpZXZlIHRva2VuIGdyb3VwIGVpdGhlciBpbmNsdWRpbmcgb3Igbm90IGluY2x1ZGluZyB0aGUgcGF0aCB0byB0aGUgZ3JvdXBcbiAgICBpZiAodG9rZW5Hcm91cC5wYXRoLmxlbmd0aCA+IDAgJiYgc2hvd1N1YnBhdGgpIHtcbiAgICAgICAgbGV0IGxpZ2h0ID0gdG9rZW5Hcm91cC5wYXRoLmpvaW4oXCIgLyBcIik7XG4gICAgICAgIGxldCBkYXJrID0gdG9rZW5Hcm91cC5uYW1lO1xuICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwibGlnaHRcIj4ke2xpZ2h0fSAvIDwvc3Bhbj4ke2Rhcmt9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0b2tlbkdyb3VwLm5hbWU7XG4gICAgfVxufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggZ3JhZGllbnQgdG9rZW4gKi9cbmZ1bmN0aW9uIGdyYWRpZW50RGVzY3JpcHRpb24oZ3JhZGllbnRUb2tlbikge1xuICAgIC8vIERlc2NyaWJlIGdyYWRpZW50IGFzICh0eXBlKSAoc3RvcDEsIHN0b3AyIC4uLilcbiAgICBsZXQgdHlwZSA9IGAke2dyYWRpZW50VG9rZW4udmFsdWUudHlwZX0gR3JhZGllbnRgO1xuICAgIGxldCBzdG9wcyA9IGdyYWRpZW50VG9rZW4udmFsdWUuc3RvcHMubWFwKHN0b3AgPT4ge1xuICAgICAgICByZXR1cm4gYCMke3N0b3AuY29sb3IuaGV4LnRvVXBwZXJDYXNlKCl9LCAke3N0b3AucG9zaXRpb24gKiAxMDB9JWA7XG4gICAgfSkuam9pbihcIiwgXCIpO1xuICAgIHJldHVybiBgJHt0eXBlfSwgJHtzdG9wc31gO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggZ3JhZGllbnQgdmFsdWUgYXMgdG9rZW4gKi9cbmZ1bmN0aW9uIGdyYWRpZW50VG9rZW5WYWx1ZShncmFkaWVudFRva2VuKSB7XG4gICAgbGV0IGdyYWRpZW50VHlwZSA9IFwiXCI7XG4gICAgc3dpdGNoIChncmFkaWVudFRva2VuLnZhbHVlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIkxpbmVhclwiOlxuICAgICAgICAgICAgZ3JhZGllbnRUeXBlID0gXCJsaW5lYXItZ3JhZGllbnQoMGRlZywgXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlJhZGlhbFwiOlxuICAgICAgICAgICAgZ3JhZGllbnRUeXBlID0gXCJyYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCBcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQW5ndWxhclwiOlxuICAgICAgICAgICAgZ3JhZGllbnRUeXBlID0gXCJjb25pYy1ncmFkaWVudChcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBEZXNjcmliZSBncmFkaWVudCBhcyAodHlwZSkgKHN0b3AxLCBzdG9wMiAuLi4pXG4gICAgLy8gRXhhbXBsZTogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSg2Myw5NCwyNTEsMSkgMCUsIHJnYmEoMjUyLDcwLDEwNywxKSAxMDAlKTtcbiAgICBsZXQgc3RvcHMgPSBncmFkaWVudFRva2VuLnZhbHVlLnN0b3BzLm1hcChzdG9wID0+IHtcbiAgICAgICAgcmV0dXJuIGAjJHtzdG9wLmNvbG9yLmhleC50b1VwcGVyQ2FzZSgpfSAke3N0b3AucG9zaXRpb24gKiAxMDB9JWA7XG4gICAgfSkuam9pbihcIiwgXCIpO1xuICAgIHJldHVybiBgJHtncmFkaWVudFR5cGV9JHtzdG9wc30pYDtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IHNoYWRvdyB0b2tlbiAqL1xuZnVuY3Rpb24gc2hhZG93RGVzY3JpcHRpb24oc2hhZG93VG9rZW4pIHtcbiAgICByZXR1cm4gc2hhZG93VG9rZW5WYWx1ZShzaGFkb3dUb2tlbik7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBzaGFkb3cgdG9rZW4gKi9cbmZ1bmN0aW9uIHR5cG9ncmFwaHlEZXNjcmlwdGlvbih0eXBvZ3JhcGh5VG9rZW4pIHtcbiAgICBsZXQgdmFsdWUgPSB0eXBvZ3JhcGh5VG9rZW4udmFsdWU7XG4gICAgbGV0IGZvbnROYW1lID0gYCR7dmFsdWUuZm9udC5mYW1pbHl9ICR7dmFsdWUuZm9udC5zdWJmYW1pbHl9YDtcbiAgICBsZXQgZm9udFZhbHVlID0gYCR7dmFsdWUuZm9udFNpemUubWVhc3VyZX0ke21lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdCh2YWx1ZS5mb250U2l6ZS51bml0KX1gO1xuICAgIGxldCB0ZXh0RGVjb3JhdGlvbiA9IFwiXCI7XG4gICAgbGV0IHRleHRDYXNlID0gXCJcIjtcbiAgICBpZiAodmFsdWUudGV4dERlY29yYXRpb24gIT09ICdOb25lJykge1xuICAgICAgICB0ZXh0RGVjb3JhdGlvbiA9IGAsICR7dmFsdWUudGV4dERlY29yYXRpb24udG9Mb3dlckNhc2UoKX1gO1xuICAgIH1cbiAgICBpZiAodmFsdWUudGV4dENhc2UgIT09ICdPcmlnaW5hbCcpIHtcbiAgICAgICAgdGV4dENhc2UgPSBgLCAke3ZhbHVlLnRleHRDYXNlLnRvTG93ZXJDYXNlKCl9YDtcbiAgICB9XG4gICAgcmV0dXJuIGAke2ZvbnROYW1lfSAke2ZvbnRWYWx1ZX0ke3RleHREZWNvcmF0aW9ufSR7dGV4dENhc2V9YDtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IHNoYWRvdyB2YWx1ZSBhcyB0b2tlbiAqL1xuZnVuY3Rpb24gc2hhZG93VG9rZW5WYWx1ZShzaGFkb3dUb2tlbikge1xuICAgIHJldHVybiBgJHtzaGFkb3dUb2tlbi52YWx1ZS54Lm1lYXN1cmV9cHggJHtzaGFkb3dUb2tlbi52YWx1ZS55Lm1lYXN1cmV9cHggJHtzaGFkb3dUb2tlbi52YWx1ZS5yYWRpdXMubWVhc3VyZX1weCAke3NoYWRvd1Rva2VuLnZhbHVlLnNwcmVhZC5tZWFzdXJlfXB4ICMke3NoYWRvd1Rva2VuLnZhbHVlLmNvbG9yLmhleH1gO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggZ3JhZGllbnQgdmFsdWUgYXMgdG9rZW4gKi9cbmZ1bmN0aW9uIG1lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdCh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ1BvaW50cyc6IHJldHVybiAncHQnO1xuICAgICAgICBjYXNlICdQaXhlbHMnOiByZXR1cm4gJ3B4JztcbiAgICAgICAgY2FzZSAnUGVyY2VudCc6IHJldHVybiAnJSc7XG4gICAgICAgIGNhc2UgJ0Vtcyc6IHJldHVybiAnZW0nO1xuICAgIH1cbn1cbi8vIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS1cbi8vIE1BUks6IC0gU3VwcG9ydFxuLyoqIFJldHJpZXZlIGZpcnN0IHN1Ymdyb3VwIGJlbG93IHJvb3QgZ3JvdXAgKi9cbmZ1bmN0aW9uIGZpcnN0U3ViZ3JvdXBPZlBhZ2UocGFnZSkge1xuICAgIGxldCBwYXJlbnQgPSBwYWdlLnBhcmVudDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAoIXBhcmVudCB8fCBwYXJlbnQuaXNSb290KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQucGFyZW50ICYmIHBhcmVudC5wYXJlbnQuaXNSb290KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHQocGFnZU9yR3JvdXAsIGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dC50eXBlID09PSBcIlBhZ2VcIikge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgY2hlY2tpbmcgYWdhaW5zdCBwbGFpbiBwYWdlLCB0aGVuIHdlIGNhbiBvbmx5IGNvbXBhcmVcbiAgICAgICAgbGV0IGNvbnRleHRQYWdlID0gY29udGV4dDtcbiAgICAgICAgcmV0dXJuIGNvbnRleHRQYWdlLmlkID09PSBwYWdlT3JHcm91cC5pZDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBjaGVja2luZyBhZ2FpbnN0IGdyb3VwLCBjaGVjayBldmVyeXRoaW5nIHVwd2FyZHMgdGhlIHRyZWUuIElmIGdyb3VwIGNvbnRhaW5zIHRoZSBwYWdlLCByZXR1cm4gdGhhdCBpbmZvcm1hdGlvblxuICAgICAgICBsZXQgY29udGV4dEdyb3VwID0gY29udGV4dDtcbiAgICAgICAgaWYgKCFjb250ZXh0R3JvdXAuaXNSb290ICYmIGNvbnRleHRHcm91cC5jaGlsZHJlbklkcy5pbmRleE9mKHBhZ2VPckdyb3VwLnBlcnNpc3RlbnRJZCkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb250ZXh0R3JvdXAucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFnZU9yR3JvdXBBY3RpdmVJbkNvbnRleHQocGFnZU9yR3JvdXAsIGNvbnRleHRHcm91cC5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVhY2hlZCByb290IGFuZCBkaWRuJ3QgZmluZCBhbnl0aGluZywgYWJhbmRvbiBzaGlwXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIEhlYWRpbmdzXG5mdW5jdGlvbiBoZWFkaW5nUGxhaW5UZXh0KGhlYWRlcikge1xuICAgIHJldHVybiBoZWFkZXIudGV4dC5zcGFucy5tYXAocyA9PiBzLnRleHQpLmpvaW4oXCJcIik7XG59XG5mdW5jdGlvbiBzbHVnaWZ5SGVhZGluZyhoZWFkZXIpIHtcbiAgICBsZXQgZnVsbFRleHQgPSBoZWFkaW5nUGxhaW5UZXh0KGhlYWRlcik7XG4gICAgcmV0dXJuIHNsdWdpZnkoZnVsbFRleHQpO1xufVxuZnVuY3Rpb24gc2x1Z2lmeShzdHIpIHtcbiAgICAvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY29kZWd1eS82Njg0NTg4XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcbiAgICAvLyByZW1vdmUgYWNjZW50cywgc3dhcCDDsSBmb3IgbiwgZXRjXG4gICAgdmFyIGZyb20gPSBcIsOgw6HDo8Okw6LDqMOpw6vDqsOsw63Dr8Ouw7LDs8O2w7TDucO6w7zDu8Oxw6fCty9fLDo7XCI7XG4gICAgdmFyIHRvID0gXCJhYWFhYWVlZWVpaWlpb29vb3V1dXVuYy0tLS0tLVwiO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChmcm9tLmNoYXJBdChpKSwgJ2cnKSwgdG8uY2hhckF0KGkpKTtcbiAgICB9XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1teYS16MC05IC1dL2csICcnKSAvLyByZW1vdmUgaW52YWxpZCBjaGFyc1xuICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnLScpIC8vIGNvbGxhcHNlIHdoaXRlc3BhY2UgYW5kIHJlcGxhY2UgYnkgLVxuICAgICAgICAucmVwbGFjZSgvLSsvZywgJy0nKTsgLy8gY29sbGFwc2UgZGFzaGVzXG4gICAgcmV0dXJuIHN0cjtcbn1cbmZ1bmN0aW9uIGZpcnN0UGFnZUZyb21Ub3AoZG9jdW1lbnRhdGlvblJvb3QpIHtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBkb2N1bWVudGF0aW9uUm9vdC5jaGlsZHJlbikge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gXCJQYWdlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwb3NzaWJsZVBhZ2UgPSBmaXJzdFBhZ2VGcm9tVG9wKGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChwb3NzaWJsZVBhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zc2libGVQYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBTZWFyY2ggaW5kZXggcHJvY2Vzc2luZ1xuZnVuY3Rpb24gYnVpbGRTZWFyY2hJbmRleEpTT04ocGFnZXMsIGRvbWFpbikge1xuICAgIC8vIFZlcnkgbmFpdmUgc2VhcmNoIGluZGV4IGltcGxlbWVudGF0aW9uLiBUaGUgcGVyZm9ybWFuY2Ugb2YgdGhpcyB3aWxsIGJlIGFic29sdXRlbHkgYWJ5c21hbC4gVGhpcyB3aWxsIGdldCBvcHRpbWl6ZWQgd2hlbiB0aGUgY29yZSBzZWFyY2ggd29ya3NcbiAgICBsZXQgZGF0YSA9IFtdO1xuICAgIC8vIFByb2Nlc3MgZXZlcnkgcGFnZSBmb3IgZGF0YVxuICAgIGZvciAobGV0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgICAgLy8gQmFzaWMgaW5mb3JtYXRpb25cbiAgICAgICAgbGV0IG5hbWUgPSBwYWdlLnRpdGxlO1xuICAgICAgICBsZXQgaWQgPSBwYWdlLnBlcnNpc3RlbnRJZDtcbiAgICAgICAgLy8gUGF0aCBhbmQgdXJsIGNyZWF0aW9uXG4gICAgICAgIGxldCBzdWJwYXRocyA9IFtuYW1lXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IHBhZ2UucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsIHx8IHBhcmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50LmlzUm9vdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VicGF0aHMuc3BsaWNlKDAsIDAsIHBhcmVudC50aXRsZSk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXRoID0gc3VicGF0aHMuam9pbihcIiAvIFwiKTtcbiAgICAgICAgbGV0IHVybCA9IHBhZ2VVcmwocGFnZSwgZG9tYWluKTtcbiAgICAgICAgLy8gSGVhZGVyIGFuZCB0ZXh0IHBhcnNpbmdcbiAgICAgICAgbGV0IGFsbEJsb2NrcyA9IGZsYXR0ZW5lZEJsb2Nrc09mUGFnZShwYWdlKTtcbiAgICAgICAgdmFyIHRleHRzID0gW107XG4gICAgICAgIHZhciBoZWFkZXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGJsb2NrIG9mIGFsbEJsb2Nrcykge1xuICAgICAgICAgICAgaWYgKGJsb2NrLnR5cGUgPT09IFwiVGV4dFwiIHx8IGJsb2NrLnR5cGUgPT09IFwiQ2FsbG91dFwiIHx8IGJsb2NrLnR5cGUgPT09IFwiT3JkZXJlZExpc3RcIiB8fCBibG9jay50eXBlID09PSBcIlVub3JkZXJlZExpc3RcIiB8fCBibG9jay50eXBlID09PSBcIlF1b3RlXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRleHRPZkJsb2NrKGJsb2NrKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRzLnB1c2godGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2sudHlwZSA9PT0gXCJIZWFkaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRleHRPZkJsb2NrKGJsb2NrKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0IHBpZWNlXG4gICAgICAgIGxldCBwaWVjZSA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICByZWFkYWJsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHRleHRzOiB0ZXh0cyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfTtcbiAgICAgICAgZGF0YS5wdXNoKHBpZWNlKTtcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IGRhdGEgYW5kIG1ha2UgaW5kZXggcmVhZGFibGUgZm9yIGVhc2llciBkZWJ1Z2dpbmcgZm9yIG5vd1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbn1cbmZ1bmN0aW9uIGZsYXR0ZW5lZEJsb2Nrc09mUGFnZShwYWdlKSB7XG4gICAgbGV0IGJsb2NrcyA9IHBhZ2UuYmxvY2tzO1xuICAgIGZvciAobGV0IGJsb2NrIG9mIHBhZ2UuYmxvY2tzKSB7XG4gICAgICAgIGJsb2NrcyA9IGJsb2Nrcy5jb25jYXQoZmxhdHRlbmVkQmxvY2tzT2ZCbG9jayhibG9jaykpO1xuICAgIH1cbiAgICByZXR1cm4gYmxvY2tzO1xufVxuZnVuY3Rpb24gZmxhdHRlbmVkQmxvY2tzT2ZCbG9jayhibG9jaykge1xuICAgIGxldCBzdWJibG9ja3MgPSBibG9jay5jaGlsZHJlbjtcbiAgICBmb3IgKGxldCBzdWJibG9jayBvZiBibG9jay5jaGlsZHJlbikge1xuICAgICAgICBzdWJibG9ja3MgPSBzdWJibG9ja3MuY29uY2F0KGZsYXR0ZW5lZEJsb2Nrc09mQmxvY2soc3ViYmxvY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YmJsb2Nrcztcbn1cbmZ1bmN0aW9uIHRleHRPZkJsb2NrKGJsb2NrKSB7XG4gICAgcmV0dXJuIGJsb2NrLnRleHQuc3BhbnMubWFwKHMgPT4gcy50ZXh0KS5qb2luKFwiXCIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==