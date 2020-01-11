"use strict";

angular.module('resultado').directive('conversaRapida', function () {
    return {
        restrict: 'E',
        scope: {
            edicao: "=edicao",
            config: "=config",
            usuario: "=usuario",
            idMensagemRapida: "=idMensagemRapida"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Mural/conversa-rapida.html',
        link: function (scope, elm, attrs) {
        }
    };
});


angular.module("resultado")
.controller('conversaCtrl',
["$http", "$scope", "$timeout", "$filter", function ($http, $scope, $timeout, $filter) {
    $scope.bolPostCarregado = false;
    $scope.post = {};
    $scope.objMensagemRapida = {};

    if($scope.idMensagemRapida) {
       $http({
           url: "/AVA/Projetos/Post/GetConversaByIdMensagem",
           method: "POST",
           params: { 
                idMensagemRapida : $scope.idMensagemRapida
           }
       }).success(function (data) {
          if(data){
            if(data.post){
                $scope.post = data.post;
            }
            if(data.mensagemrapida){
                $scope.objMensagemRapida = data.mensagemrapida;
            }
          }
       }).error(function (err) {
           console.log("Não foi possível buscar materiais da etapa");
       }).finally(function(){
           $scope.bolPostCarregado = true;      
       });
    }

} ]);