var PosiLog = new function () {
    this.logDebug = function (msg) {
        try { console.debug(msg); } catch (e) { }
    };
    this.logWarn = function (msg) {
        try { console.warn(msg); } catch (e) { }
    };
    this.logError = function (msg) {
        try { console.error(msg); } catch (e) { }
    };
}