var SqlFault_Generic=1;var SqlFault_Read=2;var SqlFault_Write=3;function enableApiDebug(){StageWebViewBridge.call("SetDebug",null,true);}
function trace(msg){StageWebViewBridge.call("Trace",null,msg);}
function getConnStatus(callback){StageWebViewBridge.call("GetConnStatus",callback);} 
function getSessionToken(callback){StageWebViewBridge.call("GetSessionToken",callback);}
function getUserId(callback){StageWebViewBridge.call("GetUserId",callback);}
function getDataPath(callback){StageWebViewBridge.call("GetDataPath",callback);}
function downloadData(url,progressCallback,okCallback,faultCallback){__ziCallback=okCallback;__zfCallback=faultCallback;__zpCallback=progressCallback;var keepProgressReports=(progressCallback!=null);StageWebViewBridge.call("DownloadData",null,url,keepProgressReports);}
function dbGet(){if(arguments.length==0)
return;var operation=arguments[0];var obj=null;var okCallback;var faultCallback;switch(operation){case"q":if(arguments.length!=4)
return;obj=new Object();obj.operation=operation;obj.idQuestao=arguments[1];okCallback=arguments[2];faultCallback=arguments[3];break;case"a":if(arguments.length!=4)
return;obj=new Object();obj.operation=operation;obj.idAgendamento=arguments[1];okCallback=arguments[2];faultCallback=arguments[3];break;case"r":if(arguments.length!=5)
return;obj=new Object();obj.operation=operation;obj.idUsuario=arguments[1];obj.idAgendamento=arguments[2];okCallback=arguments[3];faultCallback=arguments[4];break;case"qr":if(arguments.length!=5)
return;obj=new Object();obj.operation=operation;obj.idQuestao=arguments[1];obj.idRealizada=arguments[2];okCallback=arguments[3];faultCallback=arguments[4];break;}
if(obj!=null){var cbHash=_mapCallbacks_dbGet(operation,okCallback,faultCallback);var json=JSON.stringify(obj);StageWebViewBridge.call("DBGet",_callback_dbGet,json,cbHash);}else
faultCallback("Bad DB operation.");}
function dbSet(){if(arguments.length==0)
return;var operation=arguments[0];var obj=null;var okCallback;var faultCallback;switch(operation){case"q":if(arguments.length!=5)
return;obj=new Object();obj.operation=operation;obj.idQuestao=arguments[1];obj.config=JSON.stringify(arguments[2]);okCallback=arguments[3];faultCallback=arguments[4];break;case"a":if(arguments.length!=5)
return;obj=new Object();obj.operation=operation;obj.idAgendamento=arguments[1];obj.config=JSON.stringify(arguments[2]);okCallback=arguments[3];faultCallback=arguments[4];break;case"r":if(arguments.length!=6)
return;obj=new Object();obj.operation=operation;obj.idUsuario=arguments[1];obj.idAgendamento=arguments[2];obj.situacao=arguments[3];okCallback=arguments[4];faultCallback=arguments[5];break;case"qr":if(arguments.length!=6)
return;obj=new Object();obj.operation=operation;obj.idQuestao=arguments[1];obj.idRealizada=arguments[2];obj.situacao=arguments[3];okCallback=arguments[4];faultCallback=arguments[5];break;}
if(obj!=null){var cbHash=_mapCallbacks_dbSet(operation,okCallback,faultCallback);var json=JSON.stringify(obj);StageWebViewBridge.call("DBSet",_callback_dbSet,utf8_to_b64(json),cbHash);}}
var __fnMapIV=0;var __fnMapDbGet=new Array();var __fnMapDbSet=new Array();function _hashCallbacks(op,fn){return"__fnMap"+fn+"_"+(__fnMapIV++)+"_"+op;}
function _mapCallbacks_dbGet(op,fnOkCallback,fnFaultCallback){var hashKey=_hashCallbacks(op,"dbGet");__fnMapDbGet[hashKey]={okCallback:fnOkCallback,faultCallback:fnFaultCallback};return hashKey;}
function _mapCallbacks_dbSet(op,fnOkCallback,fnFaultCallback){var hashKey=_hashCallbacks(op,"dbSet");__fnMapDbSet[hashKey]={okCallback:fnOkCallback,faultCallback:fnFaultCallback};return hashKey;}
function _callback_dbGet(retValue){var json=JSON.parse(b64_to_utf8(retValue));if(__fnMapDbGet[json.hashKey]==undefined)
return;var callbacks=__fnMapDbGet[json.hashKey];switch(json.result){case"ok":callbacks.okCallback(json.data);break;case"fault":callbacks.faultCallback(json.data);break;}
delete __fnMapDbGet[json.hashKey];}
function _callback_dbSet(retValue){var json=JSON.parse(b64_to_utf8(retValue));if(__fnMapDbSet[json.hashKey]==undefined)
return;var callbacks=__fnMapDbSet[json.hashKey];switch(json.result){case"ok":callbacks.okCallback(json.data);break;case"fault":callbacks.faultCallback(json.data);break;}
delete __fnMapDbSet[json.hashKey];}
var __ziCallback;var __zfCallback;var __zpCallback;function __zipInstallComplete(url){if(__ziCallback!=undefined)
__ziCallback(url);}
function __zipInstallFault(url){if(__zfCallback!=undefined)
__zfCallback(url);}
function __zipInstallProgress(bytes){if(__zpCallback!=undefined)
__zpCallback(bytes);}
function utf8_to_b64(str){return window.btoa(unescape(encodeURIComponent(str)));}
function b64_to_utf8(str){return decodeURIComponent(escape(window.atob(str)));}