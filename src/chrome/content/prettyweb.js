(function() {

	var parser = new stmd.DocParser();
	var renderer = new stmd.HtmlRenderer();
	let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;
    
    function handleText(tag)
    {
        tag.innerHTML = renderer.render(parser.parse(tag.firstChild.nodeValue));
    }

    function windowLoadHandler()
    {
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
			if(!PrettyEnableButton.state) {return;}
			var elements =  [].slice.call(e.originalTarget.body.getElementsByTagName("pre"));
			for(var i=0; i<elements.length; i++) {
				var tag = elements[i];
				if(tag.parentNode == e.originalTarget.body) {
					handleText(tag);
				}
			}
        });
    }

    window.addEventListener('load', windowLoadHandler);

}());
