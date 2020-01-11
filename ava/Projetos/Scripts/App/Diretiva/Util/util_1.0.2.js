/* Youtube Utils */
angular.module('util').filter('GetYouTubeThumb', function () {
    return function (url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {

            return "http://img.youtube.com/vi/" + match[7] + "/0.jpg";
        } else {
            /*
            if (url.toLowerCase().indexOf('vimeo.com') != -1) {
                //fazer ajax para    
                return "http://vimeo.com/api/v2/video/" + id + ".json";
            }
            else {
            */
                return "";
            //}
        }
    }
});

angular.module('util').filter('GetYouTubeID', function () {
    return function (url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
            return match[7];
        } else {
            return "";
        }
    }
});
/* Fim Youtube Utils*/


angular.module('util')
.filter('makeSlugBasic', function () {
    return function (val) {
          if(val != null && val !== undefined){
              var replaceBy = "";

              var mapaAcentosHex  = { // by @marioluan and @lelotnk
  	            a : /[\xE0-\xE6]/g,
  	            A : /[\xC0-\xC6]/g,
  	            e : /[\xE8-\xEB]/g, // if you're gonna echo this
  	            E : /[\xC8-\xCB]/g, // JS code through PHP, do
  	            i : /[\xEC-\xEF]/g, // not forget to escape these
  	            I : /[\xCC-\xCF]/g, // backslashes (\), by repeating
  	            o : /[\xF2-\xF6]/g, // them (\\)
  	            O : /[\xD2-\xD6]/g,
  	            u : /[\xF9-\xFC]/g,
  	            U : /[\xD9-\xDC]/g,
  	            c : /\xE7/g,
  	            C : /\xC7/g,
  	            n : /\xF1/g,
  	            N : /\xD1/g,
              };
           
              for ( var letra in mapaAcentosHex ) {
  	            var expressaoRegular = mapaAcentosHex[letra];
  	            val = val.replace( expressaoRegular, letra );
              }
  
              val = val.toLowerCase();
              val = val.replace(/[^a-z0-9\-]/g, " ");
  
              do {
  	            val = val.replace('  ', ' ');
              } while (val.indexOf('  ')>-1);
    
              val = val.trim();    
              val = val.replace(/\s/g, replaceBy);
              return val;
          }
    }
});


//angular.module("util")
//.factory("loadDiretivaDinamica", ["$http", "$q", "$log", "$window", function ($http, $q, $log, $window) {
//    var deferred = $q.defer();
//    var script = document.createElement('script');
//
//    try {
//        script.src = "/AVA/Resultados/Scripts/Diretiva/2015/teste/teste.js";
//        document.getElementsByTagName('head')[0].appendChild(script);
//        script.onload = function () 
//        {
//            alert("Script loaded and ready");
//            deferred.resolve();
//        };
//    } catch (err) {
//        deferred.reject();
//    };
//
//} ]);


if(extendFunctions) if (typeof(extendFunctions)=="function") if (angular) if (typeof(angular.ArrayIntersect)!="function"){
    extendFunctions(angular);
    angular.extend(angular, {
        'extendFunctions': extendFunctions
    });
}

angular.module("util").factory("projetoTools", ["$http", "$q", "$log", "$filter", function ($http, $q, $log, $filter) {
    factory = {};
    
    var filtrar = function(dados, filtro) {
	    return $filter('filter')(dados, filtro, false);
    };

    var verificaPerfil = function(usuario, perfil) {
	    var retorno = false;
	    if (perfil != null && perfil != '') {
		    var perfis = perfil.split(',');
		    if (usuario) if (usuario.Cargos) if (usuario.Cargos instanceof Array) if (usuario.Cargos.length > 0) {
			    angular.forEach(usuario.Cargos, function(cargo) {
				    var teste = [];
                    if(cargo){
                        if(typeof(cargo)=="string"){
                            teste = $filter('filter')(perfis, cargo);
                        }
                        if(cargo instanceof Object) if(cargo.Nome) if(typeof(cargo.Nome)=="string") if(cargo.Nome!=""){
                            teste = $filter('filter')(perfis, cargo.Nome);
                        }
				        if (teste) if (teste instanceof Array) if (teste.length > 0) {
					        retorno = true;
				        }
                    }
			    });
		    }
	    }
	    return retorno;
    };

    angular.extend(factory, {
        'ArrayIntersect':angular.ArrayIntersect,
        'Coalesce':angular.Coalesce,
        'DataCompleta':angular.DataCompleta,
        'DataCompletaZeros':angular.DataCompletaZeros,
        'DataCompletaZerosFormatada':angular.DataCompletaZerosFormatada,
        'DataSomenteZeros':angular.DataSomenteZeros,
        'DiaMesComZeros':angular.DiaMesComZeros,
        'IniciaisMaiusculas':angular.IniciaisMaiusculas,
        'IniciaisMaiusculas':angular.IniciaisMaiusculas,
        'Left':angular.Left,
        'QueryParams':angular.QueryParams,
        'QueryString':angular.QueryString,
        'Right':angular.Right,
        'allMonths':angular.allMonths,
        'allWeeks':angular.allWeeks,
        'arrIndexOfId':angular.arrIndexOfId,
        'bindMobileClick':angular.bindMobileClick,
        'cb':angular.cb,
        'checkAll':angular.checkAll,
        'clone_obj':angular.clone_obj,
        'cssCalcSupported':angular.cssCalcSupported,
        'currentTime':angular.currentTime,
        'debugOnTitle':angular.debugOnTitle,
        'decodeTags':angular.decodeTags,
        'encodeTags':angular.encodeTags,
        'extendFunctions': angular.extendFunctions,
        'extendNativeFunctions': angular.extendNativeFunctions,
        'filtrar':filtrar,
        'filtrarEventos':angular.filtrarEventos,
        'getAno':angular.getAno,
        'getAudioRecordFeatures':angular.getAudioRecordFeatures,
        'getAudioType':angular.getAudioType,
        'getBool':angular.getBool,
        'getDia':angular.getDia,
        'getEstadoByUf':angular.getEstadoByUf,
        'getEtapaCorrente':angular.getEtapaCorrente,
        'getEtapaFinal':angular.getEtapaFinal,
        'getInt':angular.getInt,
        'getIntDiaDaSemana':angular.getIntDiaDaSemana,
        'getMes':angular.getMes,
        'getObject': angular.getObject,
        'getObjDiasDaSemana':angular.getObjDiasDaSemana,
        'getPrepByUf':angular.getPrepByUf,
        'getRegex':angular.getRegex,
        'getRelativePath':angular.getRelativePath,
        'getSemanaAnual':angular.getSemanaAnual,
        'getStr':angular.getStr,
        'getStrDiaDaSemana':angular.getStrDiaDaSemana,
        'getStrDiaDaSemanaSimples':angular.getStrDiaDaSemanaSimples,
        'getStrDiasDaSemana':angular.getStrDiasDaSemana,
        'getStrDiasDaSemanaSimples':angular.getStrDiasDaSemanaSimples,
        'hasArrayElems':angular.hasArrayElems,
        'hasAudioApi':angular.hasAudioApi,
        'hasClass':angular.hasClass,
        'hasFlash':angular.hasFlash,
        'hasObjectArrayIntersectById': angular.hasObjectArrayIntersectById,
        'hasUniqueOwnerArrayElems':angular.hasUniqueOwnerArrayElems,
        'hostPath':angular.hostPath,
        'html5AudioSupported':angular.html5AudioSupported,
        'html5VideoSupported':angular.html5VideoSupported,
        'indexOfId':angular.indexOfId,
        'indexOfName':angular.indexOfName,
        'isAndroid':angular.isAndroid,
        'isChrome':angular.isChrome,
        'isClickCompatible':angular.isClickCompatible,
        'isDesktop':angular.isDesktop,
        'isElementVisible':angular.isElementVisible,
        'isHibrid':angular.isHibrid,
        'isIE':angular.isIE,
        'isIpad':angular.isIpad,
        'isIphone':angular.isIphone,
        'isMobile':angular.isMobile,
        'isNativeAndroidBrowser':angular.isNativeAndroidBrowser,
        'isPlayingAudio':angular.isPlayingAudio,
        'isTouchCompatible':angular.isTouchCompatible,
        'isYpy':angular.isYpy,
        'loadDiretivaDinamica':angular.loadDiretivaDinamica,
        'mediaQueriesSupported':angular.mediaQueriesSupported,
        'newRand':angular.newRand,
        'playAudio':angular.playAudio,
        'publish':angular.publish,
        'removeLastSlash':angular.removeLastSlash,
        'removeTags':angular.removeTags,
        'retira_acentos':angular.retira_acentos,
        'safeApply':angular.safeApply,
        'situacaoEtapa':angular.situacaoEtapa,
        'stopAudio':angular.stopAudio,
        'toSource':angular.toSource,
        'utf8encode':angular.utf8encode,
        'verificaPerfil':verificaPerfil,
        'waitWhile':angular.waitWhile,
        'extendFunctions':angular.extendFunctions
    });

    return factory;
}]);

angular.module('util').directive('showonhoverparent',
function () {
    return {
        link: function (scope, element, attrs) {
            element.parent().bind('mouseenter', function () {
                element.show();
            });
            element.parent().bind('mouseleave', function () {
                element.hide();
            });
        }
    };
});

angular.module('util').directive('onError', function () {
    return {
        link: function (scope, element, attributes) {
            element.bind('error', function () {
                element.attr('src', attributes.error);
            });
        }
    }
});

angular.module('util').directive('backImg',['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attributes) {
            var _img_url = element.attr('back-img') || element.attr('back_img') || element.attr('backImg');

            //quando imagem for atualizada 
            try{
                scope.$watch(function() {
                    return element.attr('back-img') || element.attr('back_img') || element.attr('backImg'); 
                }, function(newValue){
                    var found = false;
                    if(newValue) if(newValue!="") if(newValue.indexOf("{")==-1 && newValue.indexOf("%7B")==-1){
                        //console.log(newValue);
                        found = true;
                        $timeout(function(){
                            element.css({
                                'background-image': 'url(' + newValue +')'
                            });
                        },100);
                    }
                    if(!found){
                        element.css({'background-image': ''});
                    }
                });
            }catch(err){};
            var _found = false;
            if(_img_url) if(_img_url!="") if(_img_url.indexOf("{")==-1 && newValue.indexOf("%7B")==-1){
                _found = true;
                //console.log(_img_url);
                $timeout(function(){
                    element.css({
                        'background-image': 'url(' + _img_url +')'
                    });
                },100);
            }
            if(!_found){
                element.css({'background-image': ''});
            }
        }
    }
}]);

angular.module("util")
.factory("upload", ["$http", "$q", "$log", "$window", function ($http, $q, $log, $window) {

    function abreUpload(idFerramentaTipo, idGrupoMural) {
        var deferred = $q.defer();
        var self = this;
        var flagContinua = true;
        var idFerramenta = 1;

        self.retorno = {
            IdArquivo: 0,
            Foto: ""
        };

        //redefine a função de callback do uploadAVA
        //redefine a função para incorporar o próprio modelo na chamada de callback para atualizar o objeto alvo no retorno
        window.CallbackUpload = function (oJson) {
            var file = oJson.arrayArquivo[0];
            try {
                //$scope.FormularioResposta.Campos[idx].Valor = "http://" + document.location.hostname + file.strDiretorio + '/' + file.strArquivo + file.strExtensao;
                self.retorno.Foto = file.strDiretorio + '/' + file.strArquivo + file.strExtensao;
                self.retorno.IdArquivo = file.id;
            }
            catch (ex) {

            }
            //aplica as alterações no scopo
            //$scope.$apply();
            deferred.resolve(self.retorno);
        }

        //Verifica idFerramenta 
        $.fancybox.showLoading();

        $.ajax({
            url: "/ava/projetos/clube/home/getIdAlbum",
            cache: false,
            dataType: "json",
            data: {
                idGrupo: idGrupoMural
            },
            type: "GET",
            async: false,
            success: function (data) {
                idFerramenta = parseInt(data);
                abreJanelaUpload(idFerramenta, idFerramentaTipo);
                $.fancybox.hideLoading();
            },
            error: function (data) {
                deferred.reject(self.retorno);
                $.fancybox.hideLoading();
            }
        });

           //$http.get("/ava/projetos/clube/home/getIdAlbum", {
           //    idGrupo: idGrupoMural
           //}).success(function (data) {
           //    var idFerramenta = parseInt(data);
           //    console.log(idFerramenta);
           //    abreJanelaUpload(idFerramenta, idFerramentaTipo);
           //}).error(function (data) {
           //    deferred.reject(self.retorno);
           //}).finally(function(){
           //    $.fancybox.hideLoading();
           //});

     


        return deferred.promise;
    };


    function abreJanelaUpload(idFerramenta, idFerramentaTipo) {
        var param = {
            "idFerramenta": idFerramenta,
            "idFerramentaTipo": idFerramentaTipo
        };
        var mForm;

        try {
            mForm = document.createElement("<form name='upload'>");
        } catch (ex) {
            mForm = document.createElement("form");
            mForm.name = "upload";
        }

        for (var i in param) {
            if (param.hasOwnProperty(i)) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = i;
                input.value = param[i];
                mForm.appendChild(input);
            }
        }

        mForm.target = "Upload";
        mForm.method = "POST";
        mForm.action = "/AVA/Upload";

        document.body.appendChild(mForm);

        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        if (Modernizr.touch) {
            parametros = null;
        }
        var a = window.open("", "Upload", parametros);
        if (a) {
            mForm.submit();
        }
    };

    return {
        abreUpload: abreUpload
    }

} ]);


/**
* Função simulando confirm do javascript
* Parâmetros:
*   ng-confirm-click="A frase que aparecerá para confirmar?"
*   confirmed-click="funcaoCallback()"
*/
angular.module('util').directive('ngConfirmClick', [
function () {
    return {
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Você deseja continuar?";
            var clickAction = attr.confirmedClick;
            element.bind('click', function (event) {
                if (window.confirm(msg)) {
                    scope.$eval(clickAction)
                }
            });
        }
    };
} ])


angular.module('util').directive('loading', function () {
     return {
         restrict: 'E',
         replace: true,
         template: '<div class="loading-spiner" style="width:50px; float:left;" loading><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"></div>',
         link: function (scope, element, attr) {
             scope.$watch('loading', function (val) {
                 if (val)
                     $(element).show();
                 else
                     $(element).hide();
             });
         }
     }
 })

angular.module('util').directive('loadingHttp', ['$http', function ($http) {
      return {
          restrict: 'A',
          link: function (scope, elm, attrs) {
              scope.isLoading = function () {
                  return $http.pendingRequests.length > 0;
              };

              scope.$watch(scope.isLoading, function (v) {
                  if (v) {
                      elm.show();
                  } else {
                      elm.hide();
                  }
              });
          } 
      };
  } ]);

angular.module("util").directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keypress", function (event) {
            if(event.which === 13) {

                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
