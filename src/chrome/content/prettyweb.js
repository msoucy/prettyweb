(function() {

	// Load the CommonMark classes
	var parser = new commonmark.DocParser();
	var renderer = new commonmark.HtmlRenderer();
	// Debugging console
	let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;
    
	// Reformat a tag from CommonMark to HTML
    function handleText(tag)
    {
        tag.innerHTML = renderer.render(parser.parse(tag.firstChild.nodeValue));
    }

	// Run this when the page loads
    function windowLoadHandler()
    {
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
			if(!PrettyEnableButton.state) {return;}
			[].slice.call(e.originalTarget.body.getElementsByTagName("pre")
				).filter(function(tag) {return tag.parentNode == e.originalTarget.body;}
				).forEach(function(tag) {handleText(tag);}
				);
        });
    }

    window.addEventListener('load', windowLoadHandler);

}());
