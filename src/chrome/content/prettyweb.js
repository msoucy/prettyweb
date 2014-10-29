(function() {

	// Load the CommonMark classes
	var parser = new commonmark.DocParser();
	var renderer = new commonmark.HtmlRenderer();
	// Debugging console
	let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;

	// Reformat a tag from CommonMark to HTML
	function handleText(doc, tag)
	{
		var newnode = doc.createElement("div");
		var rendered = renderer.render(parser.parse(tag.firstChild.nodeValue));
		//console.log(rendered);
		var elem = (new DOMParser()).parseFromString(rendered, "text/html").firstChild;
		var children = elem.lastChild.childNodes;
		for(var i=0; i<children.length; i++) {
			newnode.appendChild(children[i]);
		}
		tag.parentNode.replaceChild(newnode, tag);
	}

	// Run this when the page loads
	function windowLoadHandler()
	{
		window.removeEventListener('load', windowLoadHandler);

		document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
			if(!PrettyEnableButton.state) {return;}
			[].slice.call(e.originalTarget.body.getElementsByTagName("pre")
				).filter(function(tag) {return tag.parentNode == e.originalTarget.body;}
				).forEach(function(tag) {handleText(e.originalTarget, tag);}
				);
		});
	}

	window.addEventListener('load', windowLoadHandler);

}());
