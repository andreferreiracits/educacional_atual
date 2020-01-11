"use strict";

angular.module("resultado").controller('ComoFuncionaAlmanaque2015Ctrl', ["$stateParams", "$http", "$scope", "$timeout", "$filter", "$location", "$state", function ($stateParams, $http, $scope, $timeout, $filter, $location, $state) {
    var self = this;
    var mgr;

    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    };
    
    this.initDefaultObjects = function (teste) {

    };

    self.initDefaultObjects();
} ]);