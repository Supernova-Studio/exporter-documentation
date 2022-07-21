/*------------------------
   Content menu tracking
-------------------------- */

$(window).on("load", function() {
    let sections = []

    // Store and restore menu scroll offset
    const scroll = localStorage.getItem("menu.scroll.position.top")
    if (scroll) {
        $(".bg-sidebar").scrollTop(scroll)
    }

    document.querySelectorAll(".bg-sidebar").forEach((section) => {
        section.addEventListener(
            "scroll",
            function() {
                localStorage.setItem("menu.scroll.position.top", section.scrollTop)
            },
            false
        )
    })

    // Create intersection observer for all sections
    const observer = new IntersectionObserver((_entries) => {

        let isSelected = false
        for (let section of sections) {
            let id = section.getAttribute("id")
            console.log(id)
            if (isElementInViewport(section) && !isSelected) {
                document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add("active")
                    // isSelected = true
            } else {
                document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove("active")
            }
        }

    })

    // Track all headers that have an `id` applied
    document.querySelectorAll("h1[id]").forEach((section) => {
        observer.observe(section)
        sections.push(section)
    })
    document.querySelectorAll("h2[id]").forEach((section) => {
        observer.observe(section)
        sections.push(section)
    })
    document.querySelectorAll("h3[id]").forEach((section) => {
        observer.observe(section)
        sections.push(section)
    })
})

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

/*------------------------
   Content quick copy links
-------------------------- */

/*-----------------------------
    Search - Interface manipulation
------------------------------- */

$(".search").on("click", function(e) {
    showSearch()
    e.preventDefault()
})

$(".SNSearch").on("click", function(e) {
    hideIfShownSearch()
})

$(".SNSearch-box").on("click", function(e) {
    e.stopPropagation()
})

function showSearch() {
    // Show the search view by running fade-in of the view
    $(".SNSearch").toggleClass("active")
    if ($(".SNSearch").is(".active")) {
        // Remove all results
        $(".SNSearch-input").val("")
        $(".SNSearch-input").focus()
        $(".SNSearch-results").html(`<p class="section-title empty">Start your search by typing your phrase</p>`)
    }
}

function hideOrClearSearch() {
    // Hide the search view by running fade-out of the view or clear input if not empty
    if ($(".SNSearch-input").val().length > 0) {
        $(".SNSearch-input").val("")
    } else {
        $(".SNSearch").removeClass("active")
    }
}

function hideIfShownSearch() {
    if ($(".SNSearch").is(".active")) {
        $(".SNSearch").removeClass("active")
    }
}

document.addEventListener('animationstart', function(e) {
    if (e.animationName === 'fade-in') {
        e.target.classList.add('did-fade-in')
    }
})

document.addEventListener('animationend', function(e) {
    if (e.animationName === 'fade-out') {
        e.target.classList.remove('did-fade-in')
    }
})

/*-----------------------------
    Search - Results and processing
------------------------------- */

let activeSearchResults = []
let activeSearchIndex = 0

$(".SNSearch-input").on("input", function(e) {
    let searchString = $(this).val()
    let resultObject = $(".SNSearch-results")

    // Don't search for small strings
    if (searchString.length < 2) {
        resultObject.html(`<p class="section-title empty">Start your search by typing your phrase</p>`)
            // No results
        return
    }

    // Configure search. Note that this can be changed so the search returns fuzzy results
    // by changing the trashold, distance (see example > https://fusejs.io/demo.html)
    var options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        ignoreLocation: true,
        keys: ["text"],
    }

    // Note: FuseSearchData is index created by the exporter, loaded from si.js
    const fuse = new Fuse(FuseSearchData, options)
    let searchResult = fuse.search(searchString)

    if (searchResult.length === 0) {
        // No result found
        resultObject.html(`<p class="section-title empty">No results found, change your search phrase</p>`)
        return
    }

    // Reset search
    resultObject.html("")

    // Prepare data
    let contentResults = []
    let sectionResults = []
    let pageResults = []

    for (let result of searchResult) {
        let item = result.item
        item.startIndex = item.text.toLowerCase().indexOf(searchString.toLowerCase())
        item.endIndex = item.startIndex + searchString.length

        if (item.type === "contentBlock") {
            contentResults.push(item)
        } else if (item.type === "sectionHeader") {
            sectionResults.push(item)
        } else {
            pageResults.push(item)
        }
    }

    // Add pages
    if (pageResults.length > 0) {
        let results = pageResults
        resultObject.append(`<p class="section-title">Pages (${results.length})</p>`)
        let count = 0
        for (let result of results) {
            resultObject.append(`
		  <a href="${result.url}" class="sn-search-result-link">
		  <div class="result">
			<p class="section-result-header">${highlightRanges(result.text, result.startIndex, result.endIndex)}</p>
			<p class="section-result-text">${result.category}</p>
		  </div>
		  </a>`)
                // Allow up to 5 results to be shown
            if (++count > 5) {
                break
            }
        }
    }

    // Add results matching titles first, then text block results
    if (sectionResults.length > 0) {
        resultObject.append(`<p class="section-title">Page sections (${sectionResults.length})</p>`)
        let count = 0
        for (let result of sectionResults) {
            resultObject.append(`
		  <a href="${result.url}" class="sn-search-result-link">
		  <div class="result">
			<p class="section-result-header">${highlightRanges(result.text, result.startIndex, result.endIndex)}</p>
			<p class="section-result-text">On page ${result.category}</p>
		  </div>
		  </a>`)
                // Allow up to 5 results to be shown
            if (++count > 5) {
                break
            }
        }
    }

    // Add text block results
    if (contentResults.length > 0) {
        resultObject.append(`<p class="section-title">Text (${contentResults.length})</p>`)
        let count = 0
        for (let result of contentResults) {
            resultObject.append(`
		  <a href="${result.url}" class="sn-search-result-link">
		  <div class="result">
			<p class="section-result-header">${highlightRanges(result.text, result.startIndex, result.endIndex)}</p>
			<p class="section-result-text">On page ${result.category}</p>
		  </div>
		  </a>`)
                // Allow up to 20 results to be shown
            if (++count > 20) {
                break
            }
        }
    }

    $(".sn-search-result-link").on("click", function(e) {
        hideIfShownSearch()
    })

    resetActiveSearchIndex()
    updateActiveSearchIndex()
})

function resetActiveSearchIndex() {
    activeSearchIndex = 0
}

function updateActiveSearchIndex() {
    $(".sn-search-result-link").removeClass("selected")
    const activeResult = $(`.sn-search-result-link:eq(${activeSearchIndex})`)
    if (activeResult) {
        activeResult.addClass("selected")
        scrollIntoViewIfNeeded(activeResult[0], activeResult.parent()[0])
    }
}

function previousSearchResult(event) {
    if (!$(".SNSearch").is(".active")) {
        return
    }
    event.preventDefault()
    if (activeSearchIndex > 0) {
        activeSearchIndex--
    }
    updateActiveSearchIndex()
}

function nextSearchResult(event) {
    if (!$(".SNSearch").is(".active")) {
        return
    }
    event.preventDefault()
    if (activeSearchIndex < $(".sn-search-result-link").length - 1) {
        activeSearchIndex++
    }
    updateActiveSearchIndex()
}

function activateCurrentSearchResult(event) {
    if (!$(".SNSearch").is(".active")) {
        return
    }
    event.preventDefault()
    const link = $(`.sn-search-result-link:eq(${activeSearchIndex})`)
    if (link) {
        const href = link.attr('href')
        if (href) {
            window.location.href = href
            hideIfShownSearch()
        }
    }
}

function highlightRanges(s, startIndex, endIndex) {
    if (startIndex === -1) {
        return s
    }

    let beginning = s.substring(0, startIndex)
    let searchResult = s.substring(startIndex, endIndex)
    let end = s.substring(endIndex)

    return `${beginning}<span>${searchResult}</span>${end}`
}

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end)
}

function scrollIntoViewIfNeeded(target, parent) {
    let rectElem = target.getBoundingClientRect(),
        rectContainer = parent.getBoundingClientRect()
    if (rectElem.bottom > rectContainer.bottom) target.scrollIntoView(false)
    if (rectElem.top < rectContainer.top) target.scrollIntoView()
}

hotkeys.filter = function(event) {
    return true
}

/*-----------------------------
    Hotkeys
------------------------------- */

hotkeys("cmd+k,ctrl+k,esc, up, down, enter, return", function(event, handler) {
    switch (handler.key) {
        case "esc":
            hideOrClearSearch()
            break
        case "cmd+k":
        case "ctrl+k":
            showSearch()
            break
        case "up":
            previousSearchResult(event)
            break
        case "down":
            nextSearchResult(event)
            break
        case "enter":
        case "return":
            activateCurrentSearchResult(event)
    }
})

/*-----------------------------
    Versions
------------------------------- */

function loadVersions(url) {
    // Disable versions before they are loaded
    let button = $("#version-container button")
    button.css("pointer-events", "none")

    // Download JSON with version definitions for this particular design system (there is always one version file per design system at domain/version.json)
    $.getJSON(url, function(data) {
        // Get versions
        let versions = data.versions

        // Load versions into the container and set active version
        let menu = $("#version-container .dropdown-menu")

        menu.html("")
        for (let v of versions) {
            // Make the version that fits the current deploy target URL to be the selected one
            let currentVersion = window.location.href.indexOf(v.url) !== -1
            menu.append(`<a class="dropdown-item ${currentVersion ? "checked" : ""}" href="https:${v.url}">${v.name}</a>`)
            if (currentVersion) {
                button.html(`${v.name}`)
            }
        }

        // Enable interaction with the menu
        button.css("pointer-events", "")
    }).fail(function() {
        // If we for some reason fail to download the versions or if the versions don't exist yet, just hide the button, so it doesn't confuse users
        button.hidden = true
    })
}

/*-----------------------------
    Live sandbox manipulation
------------------------------- */

// Add listeners for actions
window.sandboxEngine.listener = function(message) {
    // Remove sandbox loaders when loaded correctly
    if (message.status === "done" || message.status === "error") {
        $(`.sandbox-loader-container[data-target="${message.sandboxId}"]`).remove()
    }
}

// Build all sandboxes at the load of the page
$(document).ready(function() {
    // Build all sandboxes
    window.sandboxEngine.buildSandboxStartingWith("sandbox")
})

/*-----------------------------
    Tooltips
------------------------------- */

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

/*-----------------------------
    Copy code
------------------------------- */

$(function() {
    $('[data-toggle="copy-from-sandbox"]').click(function(event) {
        // Get code of the sandbox
        event.preventDefault()
        const sandboxId = $(this).attr("data-target")
        const code = window.sandboxEngine.getCodeForSandboxId(sandboxId)
        const cb = navigator.clipboard
        cb.writeText(code)
    })
})

/*-----------------------------
    Edit code
------------------------------- */

$(function() {
    $('[data-toggle="edit-sandbox"]').click(function(event) {
        // Get code of the sandbox
        event.preventDefault()
        const sandboxId = $(this).attr("data-target")
        makeLive(sandboxId)
    })
})

function makeLive(sandboxId) {
    // Set textarea code
    const code = window.sandboxEngine.getCodeForSandboxId(sandboxId)
    $("#codepreview-editable-" + sandboxId).val(code)

    // Change code preview to textarea
    $("#codepreview-static-" + sandboxId).css({ display: "none" })
    $("#codepreview-editable-" + sandboxId).css({ display: "inherit" })

    // Toggle code view, if it wasn't shown already, and focus
    $("#codepreview-" + sandboxId).addClass("show")
    $("#codepreview-editable-" + sandboxId).focus()
    $("#codepreview-editable-message-" + sandboxId).css({ display: "inherit" })

    // Set observer to notify sandbox engine about changes to the code
    $("#codepreview-editable-" + sandboxId).off("input")
    $("#codepreview-editable-" + sandboxId).on("input", function(e) {
        let code = $(this).val()
        window.sandboxEngine.updateSandboxCode(sandboxId, code)
    })
}

/*-----------------------------
    Open in sandbox
------------------------------- */

$(function() {
    $('[data-toggle="open-in-sandbox"]').click(async function(event) {
        // Get code of the sandbox
        event.preventDefault()
        const sandboxId = $(this).attr("data-target")
        await window.sandboxEngine.openInSandbox(sandboxId)
    })
})

/*-----------------------------
    Theme switching & mode preservation
------------------------------- */

$(".switch-theme").on("click", function(e) {
    // Toggle the dark / light mode when clicking the mode selector
    $("body").toggleClass("dark")
    e.preventDefault()

    // Store selection
    if ($("body").is(".dark")) {
        localStorage.setItem("sn.default.theme", "dark")
    } else {
        localStorage.setItem("sn.default.theme", "light")
    }
})

/*-----------------------------
    Theme switching & mode preservation
------------------------------- */

$(".switch-theme").on("click", function(e) {
    // Toggle the dark / light mode when clicking the mode selector
    $("body").toggleClass("dark")
    e.preventDefault()

    // Store selection
    if ($("body").is(".dark")) {
        localStorage.setItem("sn.default.theme", "dark")
    } else {
        localStorage.setItem("sn.default.theme", "light")
    }
})

/*-----------------------------
    Storybook handling
------------------------------- */

$(document).ready(function() {
    // Ping storybook for each frame embedding it and check if it is reachable, if so, show the content,
    // otherwise show formatted error message
    document.querySelectorAll("iframe.storybook").forEach((iframe) => {
        let src = iframe.getAttribute("src")
        fetch(src, {
                method: "GET",
                cache: "no-cache",
                mode: "no-cors",
            })
            .then((_) => {
                // Do nothing for the correct response, as we can't detect whether
                // the page was truly reachable and contains storybook due to CORS protection
            })
            .catch((_) => {
                // Show error for the specific frame
                // [iframe] > storybook-container > storybook-state-wrapper > storybook-error.visible
                iframe.parentElement.parentElement.lastElementChild.style.visibility = "visible"
                iframe.parentElement.parentElement.firstElementChild.style.visibility = "hidden"
            })
    })
})

/*-----------------------------
    Sidebar menu for mobile
------------------------------- */

$("#sidebarCollapse").on("click", function(e) {
    // Toggle the dark / light mode when clicking the mode selector
    $(".docs-navigation").toggleClass("d-inline")
    e.preventDefault()
})

/*------------------------
   Health status overlay
-------------------------- */

$(document).ready(function() {
    $(".component-health-row").on("click", function(e) {
        // Toggle the overlay
        $(".health-overlay").toggleClass("d-none")
        e.preventDefault()
    })

    $(".health-overlay").on("click", function(e) {
        // Toggle the overlay
        $(".health-overlay").toggleClass("d-none")
        e.preventDefault()
    })
})