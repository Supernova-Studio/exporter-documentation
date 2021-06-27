

/*-----------------------------
    Search - Interface
------------------------------- */

$('.search').on('click', function(e) {
    // Toggle the search view when clicking the search icon
    $('.SNSearch').toggleClass("active"); 
    if ($('.SNSearch').is('.active')) {
        $('.SNSearch-input').focus();
    }
    e.preventDefault();
});

$(document).keyup(function(e) {
    // Hide the search view with escape key
    if (e.which == 27) $('.SNSearch').removeClass("active");
});


/*-----------------------------
    Search - Engine
------------------------------- */

  let result = lunrIndex.search("typography")
  console.log(result)

  let result2 = lunrIndex.search("Accessibility text")
  console.log(result2)

  let result3 = lunrIndex.search("perspiciatis unde omnis iste natus error ")
  console.log(result3)