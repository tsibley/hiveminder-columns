var dueHandler = {
    getCellText: function(row, col) {
        //get the message's header so that we can extract the reply to field
        var key = gDBView.getKeyAt(row);
        var hdr = gDBView.db.GetMsgHdrForKey(key);
      
        return hdr.getStringProperty("x-hiveminder-due");
    },
    getSortStringForRow: function(hdr) {
        return hdr.getStringProperty("x-hiveminder-due");
    },
    isString:            function() { return true },

    getCellProperties:   function(row, col, props){},
    getRowProperties:    function(row, props){},
    getImageSrc:         function(row, col) {return null;},
    getSortLongForRow:   function(hdr) {return 0;}
}

function onLoad() {
    var ObserverService = Components.classes["@mozilla.org/observer-service;1"]
                                    .getService(Components.interfaces.nsIObserverService);

    var CreateDbObserver = {
        // Components.interfaces.nsIObserver
        observe: function(aMsgFolder, aTopic, aData) {  
            gDBView.addColumnHandler("colHiveminderDue", dueHandler);
        }
    };

    ObserverService.addObserver(CreateDbObserver, "MsgCreateDBView", false);
}

window.addEventListener("load", onLoad, false);
