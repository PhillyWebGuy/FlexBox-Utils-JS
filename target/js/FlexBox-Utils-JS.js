Array.max = function(array){
    var narray = [];
    for (var i = 0; i < array.length; i++) {
        if ( array[i] !== null ) {
            narray.push( array[i] );
        }
    }
    return Math.max.apply( Math, narray );
};

var FlexBoxUtilsJS = {

    init : function () {
        this.browser = this.browserDetect.browser();
        this.browserVersion = this.browserDetect.version();
    },

    responsiveBoxes : {

        set : function(options) {

            var height = options.maxHeight,
                parent = options.parent,
                children = options.children,
                $results = $(parent).find(children);

            if($(window).width() > parseInt(600, 10)) {
                $results.css("height", height);
            } else {
                $results.css("height", "initial");
            }
        },
        boxSizeAry : function (items) {
            return this.getResultsHeights({
                items: $(items)
            });
        },

        maxResultHeight : function (items) {
            return Array.max(this.boxSizeAry(items));
        },

        getResultsHeights : function(options) {
            var ary = [],
                items = options.items;

            $(items).each(function(index, value){
                $(value).height('auto');
                ary.push($(value).outerHeight());
            });
            return ary;
        }
    },

    responsiveColumns : {
        set : function(options) {

            var parent = options.parent,
                children = options.children;

            var $height =  $(parent).height();

            $(children).each(function() {
                $(this).css({
                    height: $height
                });
            });
        }
    },

    responsiveRow : {

        set : function(options) {

            var parent = options.parent,
                children = options.children;

            var containerWidth = $(parent).width();
            var elementWidth = containerWidth  / ($(parent).find(children).length);

            $(parent).find(children).css("width", (elementWidth - options.offset));
        }
    },

    browserDetect : {

        searchString : function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },

        searchVersion : function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser : [
            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
        ],

        browser : function() {
            return this.searchString(this.dataBrowser) || "Other";
        },

        version : function() {
            return this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        }
    }
};





