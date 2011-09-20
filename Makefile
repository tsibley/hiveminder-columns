DEPS:= chrome/ \
		chrome.manifest \
		chrome/content/ \
		chrome/content/messenger.js \
		chrome/content/messenger.xul \
		install.rdf \
		README

hiveminder-columns.xpi: ${DEPS}
	zip $@ ${DEPS}
