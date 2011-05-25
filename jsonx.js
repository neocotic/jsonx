var JSONX;
if (!JSONX) {
    JSONX = {};
}
(function (window, undefined) {
    var document = window.document;
    if (typeof JSONX.parse !== 'function') {
        JSONX.parse = function (value) {
            var j;
            // Handles undefined
            if (!value) {
                return;
            }
            // Handles DOMElement
            if (value.nodeType) {
                // TODO: Create JSON from DOMElement
                return j;
            }
            // Handles string
            if (typeof value === 'string') {
                // Handles XML string
                if (value.charAt(0) === '<' && value.charAt(value.length - 1) === '>' && value.length >= 3) {
                    // TODO: Create JSON from XML string
                    return j;
                }
                // Handles JSON string
                return JSON.parse(value);
            }
            // Handles JSON
            if (typeof value === 'object') {
                // TODO: Create DOMElement from JSON
                return j;
            }
            throw new Error('JSONX.parse');
        };
    }
    if (typeof JSONX.stringify !== 'function') {
        JSONX.stringify = function (value) {
            var s;
            // Handles undefined
            if (!value) {
                return;
            }
            // Handles DOMElement
            if (value.nodeType) {
                value = JSONX.parse(value);
            }
            // Handles JSON
            if (typeof value === 'object') {
                // TODO: Create string from JSON
            }
            throw new Error('JSONX.stringify');
        };
    }
}(window));