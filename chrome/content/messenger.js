function makeDateHandler(header) {
    return {
        getCellText: function(row, col) {
            //get the message's header so that we can extract the reply to field
            var key = gDBView.getKeyAt(row);
            var hdr = gDBView.db.GetMsgHdrForKey(key);

            return hdr.getStringProperty(header);
        },
        getSortLongForRow: function(hdr) {
            var value = hdr.getStringProperty(header);
            if (value) {
                var date = new Date(value);
                return date.getTime();
            } else {
                return 0;
            }
        },
        getSortStringForRow: function(hdr) { return null },
        isString:            function() { return false },

        getCellProperties:   function(row, col, props){},
        getRowProperties:    function(row, props){},
        getImageSrc:         function(row, col) {return null;}
    }
}

function makeColumnHandler(header) {
    return {
        getCellText: function(row, col) {
            //get the message's header so that we can extract the reply to field
            var key = gDBView.getKeyAt(row);
            var hdr = gDBView.db.GetMsgHdrForKey(key);

            return hdr.getStringProperty(header);
        },
        getSortStringForRow: function(hdr) {
            return hdr.getStringProperty(header) || '';
        },
        isString:            function() { return true },

        getCellProperties:   function(row, col, props){},
        getRowProperties:    function(row, props){},
        getImageSrc:         function(row, col) {return null;},
        getSortLongForRow:   function(hdr) {return 0;}
    }
}

function registerHandlers() {
    var ObserverService = Components.classes["@mozilla.org/observer-service;1"]
                                    .getService(Components.interfaces.nsIObserverService);

    var CreateDbObserver = {
        // Components.interfaces.nsIObserver
        observe: function(aMsgFolder, aTopic, aData) {
            gDBView.addColumnHandler("colHiveminderDue", makeDateHandler("x-hiveminder-due"));
            gDBView.addColumnHandler("colHiveminderTags", makeColumnHandler("x-hiveminder-tags"));
            gDBView.addColumnHandler("colHiveminderGroup", makeColumnHandler("x-hiveminder-group"));
            gDBView.addColumnHandler("colHiveminderLocator", makeColumnHandler("x-hiveminder-recordlocator"));
        }
    };

    ObserverService.addObserver(CreateDbObserver, "MsgCreateDBView", false);
}

// the load event sometimes gets triggered too late with enigmail enabled
//window.addEventListener("load", onLoad, false);
registerHandlers();
