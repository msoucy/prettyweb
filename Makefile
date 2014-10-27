XPI=prettyweb.xpi

$(XPI): commonmark
	cd src && \
	zip -r ../$(XPI) chrome chrome.manifest install.rdf && \
	cd ..

commonmark:
	$(MAKE) -C commonmark js/commonmark.js

clean:
	rm -rf $(XPI)
	$(MAKE) -C commonmark clean

.PHONY: commonmark clean
