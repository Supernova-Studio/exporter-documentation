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
        subpaths.push(slugName(parent.title));
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
/** Retrieve safe slag name made out of any string */
function slugName(name) {
    return name.replace(/\W+/g, "-").toLowerCase();
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvQkFBb0I7QUFDakQ7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE1BQU0sWUFBWSxLQUFLO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IseUJBQXlCO0FBQzNDO0FBQ0EsbUJBQW1CLDZCQUE2QixJQUFJLG9CQUFvQjtBQUN4RSxLQUFLO0FBQ0wsY0FBYyxLQUFLLElBQUksTUFBTTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsNkJBQTZCLEdBQUcsb0JBQW9CO0FBQ3ZFLEtBQUs7QUFDTCxjQUFjLGFBQWEsRUFBRSxNQUFNO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0JBQWtCLEdBQUcscUJBQXFCO0FBQ2hFLHVCQUF1Qix1QkFBdUIsRUFBRSxpREFBaUQ7QUFDakc7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1DQUFtQztBQUNqRTtBQUNBO0FBQ0Esd0JBQXdCLDZCQUE2QjtBQUNyRDtBQUNBLGNBQWMsU0FBUyxHQUFHLFVBQVUsRUFBRSxlQUFlLEVBQUUsU0FBUztBQUNoRTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRCQUE0QixLQUFLLDRCQUE0QixLQUFLLGlDQUFpQyxLQUFLLGlDQUFpQyxNQUFNLDRCQUE0QjtBQUN6TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqc19oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIEJsdWVwcmludCBmdW5jdGlvbnNcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicGFnZVVybFwiLCBwYWdlVXJsKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiYXNzZXRVcmxcIiwgYXNzZXRVcmwpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJoaWdobGlnaHRTYWZlU3RyaW5nXCIsIGhpZ2hsaWdodFNhZmVTdHJpbmcpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJpc0V4cGVyaW1lbnRhbEJsb2NrXCIsIGlzRXhwZXJpbWVudGFsQmxvY2spO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJwYXJzZUV4cGVyaW1lbnRhbEJsb2NrXCIsIHBhcnNlRXhwZXJpbWVudGFsQmxvY2spO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJmb3JtYXR0ZWRUb2tlbkdyb3VwSGVhZGVyXCIsIGZvcm1hdHRlZFRva2VuR3JvdXBIZWFkZXIpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJmdWxsVG9rZW5Hcm91cE5hbWVcIiwgZnVsbFRva2VuR3JvdXBOYW1lKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZ3JhZGllbnREZXNjcmlwdGlvblwiLCBncmFkaWVudERlc2NyaXB0aW9uKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZ3JhZGllbnRUb2tlblZhbHVlXCIsIGdyYWRpZW50VG9rZW5WYWx1ZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInNoYWRvd0Rlc2NyaXB0aW9uXCIsIHNoYWRvd0Rlc2NyaXB0aW9uKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwic2hhZG93VG9rZW5WYWx1ZVwiLCBzaGFkb3dUb2tlblZhbHVlKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwibWVhc3VyZVR5cGVJbnRvUmVhZGFibGVVbml0XCIsIG1lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInR5cG9ncmFwaHlEZXNjcmlwdGlvblwiLCB0eXBvZ3JhcGh5RGVzY3JpcHRpb24pO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJmaXJzdFN1Ymdyb3VwT2ZQYWdlXCIsIGZpcnN0U3ViZ3JvdXBPZlBhZ2UpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJwYWdlT3JHcm91cEFjdGl2ZUluQ29udGV4dFwiLCBwYWdlT3JHcm91cEFjdGl2ZUluQ29udGV4dCk7XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFVSTHNcbi8qKiBHZW5lcmF0ZSBwYWdlIHNsdWcgZm9yIHRoZSBnZW5lcmF0ZWQgcGFnZSAqL1xuZnVuY3Rpb24gcGFnZVVybChvYmplY3QsIHByZWZpeCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAob2JqZWN0LnR5cGUgPT09IFwiR3JvdXBcIikge1xuICAgICAgICBsZXQgZ3JvdXAgPSBvYmplY3Q7XG4gICAgICAgIGxldCBwYWdlcyA9IGdyb3VwLmNoaWxkcmVuLmZpbHRlcihjID0+IGMudHlwZSA9PT0gXCJQYWdlXCIpO1xuICAgICAgICBpZiAocGFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2VVcmwocGFnZXNbMF0sIHByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIG5vdCBoYW5kbGVkLCBncm91cCBtdXN0IGNvbnRhaW4gcGFnZSBvdGhlcndpc2UgaXQgc2hvdWxkIGJlIGhpZGRlbiBmcm9tIGdlbmVyYXRpb25cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBwYWdlID0gb2JqZWN0O1xuICAgIGxldCBwYWdlU2x1ZyA9IChfYSA9IHBhZ2UudXNlclNsdWcpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHBhZ2Uuc2x1ZztcbiAgICBsZXQgc3VicGF0aHMgPSBbXTtcbiAgICAvLyBDb25zdHJ1Y3QgZ3JvdXAgcGF0aCBzZWdtZW50c1xuICAgIGxldCBwYXJlbnQgPSBwYWdlLnBhcmVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgIHN1YnBhdGhzLnB1c2goc2x1Z05hbWUocGFyZW50LnRpdGxlKSk7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBsYXN0IHNlZ21lbnQgYWRkZWQsIGJlY2F1c2Ugd2UgZG9uJ3QgY2FyZSBhYm91dCByb290IGdyb3VwXG4gICAgc3VicGF0aHMucG9wKCk7XG4gICAgLy8gUmV0cmlldmUgdXJsLXNhZmUgcGF0aCBjb25zdHJ1Y3RlZCBhcyBbaG9zdF1bZ3JvdXAtc2x1Z3NdW3BhdGgtc2x1Z11bLmh0bWxdXG4gICAgbGV0IHBhdGggPSBbcHJlZml4LCAuLi5zdWJwYXRocy5yZXZlcnNlKCksIHBhZ2VTbHVnXS5qb2luKFwiL1wiKSArIFwiLmh0bWxcIjtcbiAgICByZXR1cm4gcGF0aDtcbn1cbi8qKiBDcmVhdGUgcHJvcGVyIHVybCB0aGF0IGNoYW5nZXMgd2l0aCB0aGUgZm9sZGVyLWRlcHRoIG9mIHRoZSBkb2N1bWVudGF0aW9uICovXG5mdW5jdGlvbiBhc3NldFVybChhc3NldCwgcHJlZml4KSB7XG4gICAgbGV0IGFzc2V0Rm9sZGVyID0gXCJhc3NldHNcIjtcbiAgICBsZXQgZnJhZ21lbnRzID0gW3ByZWZpeCwgYXNzZXRGb2xkZXIsIGFzc2V0XTtcbiAgICAvLyBSZXRyaWV2ZSB1cmwtc2FmZSBwYXRoIGNvbnN0cnVjdGVkIGFzIFtob3N0XVthc3NldC1mb2xkZXJdW2Fzc2V0LXNsdWddXG4gICAgbGV0IHBhdGggPSBmcmFnbWVudHMuam9pbihcIi9cIik7XG4gICAgcmV0dXJuIHBhdGg7XG59XG4vKiogUmV0cmlldmUgc2FmZSBzbGFnIG5hbWUgbWFkZSBvdXQgb2YgYW55IHN0cmluZyAqL1xuZnVuY3Rpb24gc2x1Z05hbWUobmFtZSkge1xuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1xcVysvZywgXCItXCIpLnRvTG93ZXJDYXNlKCk7XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIEV4cGVyaW1lbnRhbCBmZWF0dXJlc1xuLyoqIFBhcnNlIG91dCBleHBlcmltZW50YWwgYmxvY2ssIGlmIGV4aXN0cyAqL1xuZnVuY3Rpb24gaXNFeHBlcmltZW50YWxCbG9jayhibG9jaykge1xuICAgIHJldHVybiBibG9jay50ZXh0LnNwYW5zLmxlbmd0aCA9PT0gMSAmJiBibG9jay50ZXh0LnNwYW5zWzBdLnRleHQuc3RhcnRzV2l0aChcIltibG9jazpcIik7XG59XG4vKiogUGFyc2UgZXhwZXJpbWVudGFsIGluZm9ybWF0aW9uIGZyb20gdGhlIHRleHQgYmxvY2ssIHNvIHdlIGNhbiBjb252ZXJ0IGl0IHRvIGV4cGVyaW1lbnRhbCBibG9jayAgKi9cbmZ1bmN0aW9uIHBhcnNlRXhwZXJpbWVudGFsQmxvY2soYmxvY2spIHtcbiAgICAvLyBUaGlzIGlzIHN0dXBpZCBkdW1iIHBhcnNpbmcsIGJ1dCBpdCByZWFsbHkgaXMganVzdCBmb3IgdGhhdCBvbmUgdXNlY2FzZSBhbmQgd2lsbCBiZSByZW1vdmVkIDopXG4gICAgbGV0IHRleHQgPSBibG9jay50ZXh0LnNwYW5zWzBdLnRleHQ7XG4gICAgdGV4dCA9IHRleHQuc3Vic3RyKDEpOyAvLyBSZW1vdmUgZmlyc3QgW1xuICAgIGxldCBibG9ja3MgPSB0ZXh0LnNwbGl0KFwiXVwiKTsgLy8gU3BsaXQgYnkgXSBzbyB3ZSBnZXQgYmxvY2s6WCAgYW5kICAgcGF5bG9hZCAobWF5YmUgVVJMKVxuICAgIC8vIFBhcnNlIG91dHB1dFxuICAgIGxldCBwYXlsb2FkID0gYmxvY2tzWzFdLnRyaW0oKTtcbiAgICBsZXQgYmxvY2tUeXBlID0gYmxvY2tzWzBdLnNwbGl0KFwiOlwiKVsxXTtcbiAgICAvLyBFeHRyYSBmb3IgdGFicywgaWYgZGV0ZWN0ZWRcbiAgICBsZXQgdGFicyA9IHBheWxvYWQuc3BsaXQoXCJ8XCIpLm1hcChwID0+IHAudHJpbSgpKTtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBBcnJheSgpO1xuICAgIGxldCBjb250ZW50ID0gbmV3IEFycmF5KCk7XG4gICAgdGFicy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgaGVhZGVycy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBGYWxsYmFjayB0byBzb21lIHNlbnNpYmxlIGluZm9ybWF0aW9uIGlmIHVzZXIgZGlkbid0IGZvcm1hdCBpdCB0b28gbXVjaCwgb3IgdGhlIGJsb2NrIGlzIG5vdCB0YWJcbiAgICAvLyBhbmQgbm9ybWFsaXplXG4gICAgaGVhZGVycyA9IGhlYWRlcnMubGVuZ3RoID4gMCA/IGhlYWRlcnMgOiBbXCJIZWFkZXJcIl07XG4gICAgY29udGVudCA9IGNvbnRlbnQubGVuZ3RoID4gMCA/IGNvbnRlbnQgOiBbcGF5bG9hZF07XG4gICAgaWYgKGhlYWRlcnMubGVuZ3RoICE9PSBjb250ZW50Lmxlbmd0aCkge1xuICAgICAgICBoZWFkZXJzID0gW1wiSW5jb3JyZWN0IHRhYiBzdHJ1Y3R1cmVcIl07XG4gICAgICAgIGNvbnRlbnQgPSBbXCJJbWJhbGFuY2VkIG51bWJlciBvZiB0YWIgc3RydWN0dXJlcywgbXVzdCBiZSBwYWlycyBvZiBoZWFkZXIgLyBjb250ZW50XCJdO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBibG9ja1R5cGU6IGJsb2NrVHlwZSxcbiAgICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgICAgICAgfVxuICAgIH07XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFN0cmluZyBtYW5pcHVsYXRpb25cbi8qKiBFc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIHRoZSBnaXZlbiBzdHJpbmcgb2YgdGV4dC4gRW5jb2RpbmcgcGFydCB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9jb21wb25lbnQvZXNjYXBlLWh0bWwgKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodFNhZmVTdHJpbmcoYmxvY2spIHtcbiAgICAvLyBSZXRyaWV2ZSByYXcgdGV4dCwgaWdub3JlIGFsbCBhdHRyaWJ1dGVzIGZvciBub3dcbiAgICBsZXQgc3RyaW5nID0gYmxvY2sudGV4dC5zcGFucy5tYXAoKHMpID0+IHMudGV4dCkuam9pbihcIlwiKTtcbiAgICAvLyBNYWtlIHN1cmUgaXQgaXMgcHJvcGVybHkgc2FmZSBmb3IgSFRNTCByZW5kZXJpbmdcbiAgICByZXR1cm4gZXNjYXBlSHRtbChzdHJpbmcpO1xufVxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICB2YXIgbWF0Y2hIdG1sUmVnRXhwID0gL1tcIicmPD5dLztcbiAgICB2YXIgc3RyID0gXCJcIiArIHN0cmluZztcbiAgICB2YXIgbWF0Y2ggPSBtYXRjaEh0bWxSZWdFeHAuZXhlYyhzdHIpO1xuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgdmFyIGVzY2FwZTtcbiAgICB2YXIgaHRtbCA9IFwiXCI7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgbGFzdEluZGV4ID0gMDtcbiAgICBmb3IgKGluZGV4ID0gbWF0Y2guaW5kZXg7IGluZGV4IDwgc3RyLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBzd2l0Y2ggKHN0ci5jaGFyQ29kZUF0KGluZGV4KSkge1xuICAgICAgICAgICAgY2FzZSAzNDogLy8gXCJcbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiZxdW90O1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODogLy8gJlxuICAgICAgICAgICAgICAgIGVzY2FwZSA9IFwiJmFtcDtcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6IC8vICdcbiAgICAgICAgICAgICAgICBlc2NhcGUgPSBcIiYjMzk7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDYwOiAvLyA8XG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImbHQ7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDYyOiAvLyA+XG4gICAgICAgICAgICAgICAgZXNjYXBlID0gXCImZ3Q7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0SW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICBodG1sICs9IHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICBodG1sICs9IGVzY2FwZTtcbiAgICB9XG4gICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gaW5kZXggPyBodG1sICsgc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KSA6IGh0bWw7XG59XG4vLyAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tXG4vLyBNQVJLOiAtIFRva2Vuc1xuLyoqICBDb252ZXJ0IGdyb3VwIGludG8gcHJvcGVybHkgZm9ybWF0dGVkIGhlYWRlciAqL1xuZnVuY3Rpb24gZnVsbFRva2VuR3JvdXBOYW1lKHRva2VuR3JvdXApIHtcbiAgICAvLyBSZXRyaWV2ZSB0b2tlbiBncm91cCBwYXRoXG4gICAgcmV0dXJuIFsuLi50b2tlbkdyb3VwLnBhdGgsIHRva2VuR3JvdXAubmFtZV0uam9pbihcIi9cIik7XG59XG4vKiogIENvbnZlcnQgZ3JvdXAgaW50byBwcm9wZXJseSBmb3JtYXR0ZWQgaGVhZGVyICovXG5mdW5jdGlvbiBmb3JtYXR0ZWRUb2tlbkdyb3VwSGVhZGVyKHRva2VuR3JvdXAsIHNob3dTdWJwYXRoKSB7XG4gICAgLy8gUmV0cmlldmUgdG9rZW4gZ3JvdXAgZWl0aGVyIGluY2x1ZGluZyBvciBub3QgaW5jbHVkaW5nIHRoZSBwYXRoIHRvIHRoZSBncm91cFxuICAgIGlmICh0b2tlbkdyb3VwLnBhdGgubGVuZ3RoID4gMCAmJiBzaG93U3VicGF0aCkge1xuICAgICAgICBsZXQgbGlnaHQgPSB0b2tlbkdyb3VwLnBhdGguam9pbihcIiAvIFwiKTtcbiAgICAgICAgbGV0IGRhcmsgPSB0b2tlbkdyb3VwLm5hbWU7XG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJsaWdodFwiPiR7bGlnaHR9IC8gPC9zcGFuPiR7ZGFya31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRva2VuR3JvdXAubmFtZTtcbiAgICB9XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBncmFkaWVudCB0b2tlbiAqL1xuZnVuY3Rpb24gZ3JhZGllbnREZXNjcmlwdGlvbihncmFkaWVudFRva2VuKSB7XG4gICAgLy8gRGVzY3JpYmUgZ3JhZGllbnQgYXMgKHR5cGUpIChzdG9wMSwgc3RvcDIgLi4uKVxuICAgIGxldCB0eXBlID0gYCR7Z3JhZGllbnRUb2tlbi52YWx1ZS50eXBlfSBHcmFkaWVudGA7XG4gICAgbGV0IHN0b3BzID0gZ3JhZGllbnRUb2tlbi52YWx1ZS5zdG9wcy5tYXAoc3RvcCA9PiB7XG4gICAgICAgIHJldHVybiBgIyR7c3RvcC5jb2xvci5oZXgudG9VcHBlckNhc2UoKX0sICR7c3RvcC5wb3NpdGlvbiAqIDEwMH0lYDtcbiAgICB9KS5qb2luKFwiLCBcIik7XG4gICAgcmV0dXJuIGAke3R5cGV9LCAke3N0b3BzfWA7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBncmFkaWVudCB2YWx1ZSBhcyB0b2tlbiAqL1xuZnVuY3Rpb24gZ3JhZGllbnRUb2tlblZhbHVlKGdyYWRpZW50VG9rZW4pIHtcbiAgICBsZXQgZ3JhZGllbnRUeXBlID0gXCJcIjtcbiAgICBzd2l0Y2ggKGdyYWRpZW50VG9rZW4udmFsdWUudHlwZSkge1xuICAgICAgICBjYXNlIFwiTGluZWFyXCI6XG4gICAgICAgICAgICBncmFkaWVudFR5cGUgPSBcImxpbmVhci1ncmFkaWVudCgwZGVnLCBcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUmFkaWFsXCI6XG4gICAgICAgICAgICBncmFkaWVudFR5cGUgPSBcInJhZGlhbC1ncmFkaWVudChjaXJjbGUsIFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBbmd1bGFyXCI6XG4gICAgICAgICAgICBncmFkaWVudFR5cGUgPSBcImNvbmljLWdyYWRpZW50KFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIERlc2NyaWJlIGdyYWRpZW50IGFzICh0eXBlKSAoc3RvcDEsIHN0b3AyIC4uLilcbiAgICAvLyBFeGFtcGxlOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZ2JhKDYzLDk0LDI1MSwxKSAwJSwgcmdiYSgyNTIsNzAsMTA3LDEpIDEwMCUpO1xuICAgIGxldCBzdG9wcyA9IGdyYWRpZW50VG9rZW4udmFsdWUuc3RvcHMubWFwKHN0b3AgPT4ge1xuICAgICAgICByZXR1cm4gYCMke3N0b3AuY29sb3IuaGV4LnRvVXBwZXJDYXNlKCl9ICR7c3RvcC5wb3NpdGlvbiAqIDEwMH0lYDtcbiAgICB9KS5qb2luKFwiLCBcIik7XG4gICAgcmV0dXJuIGAke2dyYWRpZW50VHlwZX0ke3N0b3BzfSlgO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggc2hhZG93IHRva2VuICovXG5mdW5jdGlvbiBzaGFkb3dEZXNjcmlwdGlvbihzaGFkb3dUb2tlbikge1xuICAgIHJldHVybiBzaGFkb3dUb2tlblZhbHVlKHNoYWRvd1Rva2VuKTtcbn1cbi8qKiBEZXNjcmliZSBjb21wbGV4IHNoYWRvdyB0b2tlbiAqL1xuZnVuY3Rpb24gdHlwb2dyYXBoeURlc2NyaXB0aW9uKHR5cG9ncmFwaHlUb2tlbikge1xuICAgIGxldCB2YWx1ZSA9IHR5cG9ncmFwaHlUb2tlbi52YWx1ZTtcbiAgICBsZXQgZm9udE5hbWUgPSBgJHt2YWx1ZS5mb250LmZhbWlseX0gJHt2YWx1ZS5mb250LnN1YmZhbWlseX1gO1xuICAgIGxldCBmb250VmFsdWUgPSBgJHt2YWx1ZS5mb250U2l6ZS5tZWFzdXJlfSR7bWVhc3VyZVR5cGVJbnRvUmVhZGFibGVVbml0KHZhbHVlLmZvbnRTaXplLnVuaXQpfWA7XG4gICAgbGV0IHRleHREZWNvcmF0aW9uID0gXCJcIjtcbiAgICBsZXQgdGV4dENhc2UgPSBcIlwiO1xuICAgIGlmICh2YWx1ZS50ZXh0RGVjb3JhdGlvbiAhPT0gJ05vbmUnKSB7XG4gICAgICAgIHRleHREZWNvcmF0aW9uID0gYCwgJHt2YWx1ZS50ZXh0RGVjb3JhdGlvbi50b0xvd2VyQ2FzZSgpfWA7XG4gICAgfVxuICAgIGlmICh2YWx1ZS50ZXh0Q2FzZSAhPT0gJ09yaWdpbmFsJykge1xuICAgICAgICB0ZXh0Q2FzZSA9IGAsICR7dmFsdWUudGV4dENhc2UudG9Mb3dlckNhc2UoKX1gO1xuICAgIH1cbiAgICByZXR1cm4gYCR7Zm9udE5hbWV9ICR7Zm9udFZhbHVlfSR7dGV4dERlY29yYXRpb259JHt0ZXh0Q2FzZX1gO1xufVxuLyoqIERlc2NyaWJlIGNvbXBsZXggc2hhZG93IHZhbHVlIGFzIHRva2VuICovXG5mdW5jdGlvbiBzaGFkb3dUb2tlblZhbHVlKHNoYWRvd1Rva2VuKSB7XG4gICAgcmV0dXJuIGAke3NoYWRvd1Rva2VuLnZhbHVlLngubWVhc3VyZX1weCAke3NoYWRvd1Rva2VuLnZhbHVlLnkubWVhc3VyZX1weCAke3NoYWRvd1Rva2VuLnZhbHVlLnJhZGl1cy5tZWFzdXJlfXB4ICR7c2hhZG93VG9rZW4udmFsdWUuc3ByZWFkLm1lYXN1cmV9cHggIyR7c2hhZG93VG9rZW4udmFsdWUuY29sb3IuaGV4fWA7XG59XG4vKiogRGVzY3JpYmUgY29tcGxleCBncmFkaWVudCB2YWx1ZSBhcyB0b2tlbiAqL1xuZnVuY3Rpb24gbWVhc3VyZVR5cGVJbnRvUmVhZGFibGVVbml0KHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnUG9pbnRzJzogcmV0dXJuICdwdCc7XG4gICAgICAgIGNhc2UgJ1BpeGVscyc6IHJldHVybiAncHgnO1xuICAgICAgICBjYXNlICdQZXJjZW50JzogcmV0dXJuICclJztcbiAgICAgICAgY2FzZSAnRW1zJzogcmV0dXJuICdlbSc7XG4gICAgfVxufVxuLy8gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLSAtLS0gLS0tIC0tLVxuLy8gTUFSSzogLSBTdXBwb3J0XG4vKiogUmV0cmlldmUgZmlyc3Qgc3ViZ3JvdXAgYmVsb3cgcm9vdCBncm91cCAqL1xuZnVuY3Rpb24gZmlyc3RTdWJncm91cE9mUGFnZShwYWdlKSB7XG4gICAgbGV0IHBhcmVudCA9IHBhZ2UucGFyZW50O1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmICghcGFyZW50IHx8IHBhcmVudC5pc1Jvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5wYXJlbnQgJiYgcGFyZW50LnBhcmVudC5pc1Jvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG59XG5mdW5jdGlvbiBwYWdlT3JHcm91cEFjdGl2ZUluQ29udGV4dChwYWdlT3JHcm91cCwgY29udGV4dCkge1xuICAgIGlmIChjb250ZXh0LnR5cGUgPT09IFwiUGFnZVwiKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBjaGVja2luZyBhZ2FpbnN0IHBsYWluIHBhZ2UsIHRoZW4gd2UgY2FuIG9ubHkgY29tcGFyZVxuICAgICAgICBsZXQgY29udGV4dFBhZ2UgPSBjb250ZXh0O1xuICAgICAgICByZXR1cm4gY29udGV4dFBhZ2UuaWQgPT09IHBhZ2VPckdyb3VwLmlkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGNoZWNraW5nIGFnYWluc3QgZ3JvdXAsIGNoZWNrIGV2ZXJ5dGhpbmcgdXB3YXJkcyB0aGUgdHJlZS4gSWYgZ3JvdXAgY29udGFpbnMgdGhlIHBhZ2UsIHJldHVybiB0aGF0IGluZm9ybWF0aW9uXG4gICAgICAgIGxldCBjb250ZXh0R3JvdXAgPSBjb250ZXh0O1xuICAgICAgICBpZiAoIWNvbnRleHRHcm91cC5pc1Jvb3QgJiYgY29udGV4dEdyb3VwLmNoaWxkcmVuSWRzLmluZGV4T2YocGFnZU9yR3JvdXAucGVyc2lzdGVudElkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnRleHRHcm91cC5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYWdlT3JHcm91cEFjdGl2ZUluQ29udGV4dChwYWdlT3JHcm91cCwgY29udGV4dEdyb3VwLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZWFjaGVkIHJvb3QgYW5kIGRpZG4ndCBmaW5kIGFueXRoaW5nLCBhYmFuZG9uIHNoaXBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=