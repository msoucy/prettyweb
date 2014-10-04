(function() {

	alert("FOOBAR!");
	var stmd = require('stmd');
	var parser = new stmd.DocParser();
	var renderer = new stmd.HtmlRenderer();
    
    function handleText(textNode)
    {
        var v = textNode.nodeValue;
        textNode.nodeValue = renderer.render(parser.parse(v));
    }

    function windowLoadHandler()
    {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
			document.log("Made it this far!"+e)
			for(var tag in e.getElementsByTagName("pre")) {
				alert(tag);
				if(tag.childNodes.length == 1 && tag.childNodes[0].nodeType == 3) {
					handle_text(tag);
				}
			}
        });
    }

    window.addEventListener('load', windowLoadHandler);

}());
