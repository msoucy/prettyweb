(function() {

	var parser = new stmd.DocParser();
	var renderer = new stmd.HtmlRenderer();
	let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;
    
    function handleText(tag)
    {
        var v = tag.firstChild.nodeValue;
        tag.innerHTML = renderer.render(parser.parse(v));
    }

    function windowLoadHandler()
    {
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
			var elements = e.originalTarget.getElementsByTagName("pre")
			console.log("Array: ", elements);
			for(var i=0; i<elements.length; i++) {
				var tag = elements[i];
				console.log("Tag: ", tag);
				if(tag.childNodes.length == 1 && tag.firstChild.nodeType == 3) {
					handleText(tag);
				}
			}
        });
    }

    window.addEventListener('load', windowLoadHandler);

}());
