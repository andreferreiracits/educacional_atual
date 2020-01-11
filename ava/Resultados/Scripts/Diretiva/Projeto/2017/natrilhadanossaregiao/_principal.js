"use strict";

angular.module("resultado").controller('NaTrilhaDaNossaRegiaoPrincipal2017Ctrl', ["$stateParams", "$http", "$scope", "$timeout", "$filter", "$location", "$state", '$modal', function ($stateParams, $http, $scope, $timeout, $filter, $location, $state, $modal) {
    var self = this;
    var mgr;

    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    };

    self.openGame = function () {
        
        //console.log('Abriu');
        var jLargura = parseInt(window.screen.availWidth) - 20;	
        var jAltura = parseInt(window.screen.availHeight) - 50;
		
        var mAltura = 0;
        var mLargura = 0;
        var j;
		
        j = window.open('/AVA/Projetos/2017/natrilhadanossaregiao/ResultadoNacional/?overlay=true#jogo', "jogotrilha", "top=" + mAltura + ",left=" + mLargura + ",width="+jLargura+",height="+jAltura+",toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        j.focus();

    };
        
    this.initDefaultObjects = function () {};   
    
} ]);