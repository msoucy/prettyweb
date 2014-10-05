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
			[].slice.call(e.originalTarget.body.getElementsByTagName("pre")
				).filter(function(tag) {return tag.parentNode == e.originalTarget.body;}
				).forEach(function(tag) {handleText(tag);}
				);
        });
    }

    window.addEventListener('load', windowLoadHandler);

}());
