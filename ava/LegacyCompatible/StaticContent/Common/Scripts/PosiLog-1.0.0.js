var PosiLog = new function () {
    this.logDebug = function (msg) {
        try { console.log(msg); } catch (e) { }
    };
    this.logWarn = function (msg) {
        try { console.log(msg); } catch (e) { }
    };
    this.logError = function (msg) {
        try { console.log(msg); } catch (e) { }
    };
}