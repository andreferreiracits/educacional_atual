//Modulo de destaques
angular.module('Destaques', ['filtros', 'ngSanitize']);

//Modulo de turmas
angular.module('Turma', ['filtros']);

angular.module("Equipe", ['filtros']);

//Modulo de usuários
angular.module('Usuario', ['filtros']);

//Modulo inscrição
angular.module('Inscricao', ['filtros', 'Turma', 'angucomplete']);

angular.module('Inscricao.mista', ['filtros', 'ngTouch', 'ui.bootstrap.modal', 'angucomplete', 'angucomplete-alt', 'util']);

//Modulo etapa
angular.module('Etapa', ['filtros', 'Turma']);

//Modulo Participe
angular.module('Participe', ['filtros']);

//Modulo formulario
angular.module('formulario', ['filtros', 'ngSanitize', 'ngTouch', 'ui.bootstrap.modal']);

//Modulo Menu
angular.module('Menu', []);

//Modulo Mural
angular.module('Mural', []);

//Modulo Topo
angular.module('Topo', ['ipCookie']);

//Modulo Participantes
angular.module('Participantes', ['filtros']);

angular.module('Mural', []);

// userService
angular.module('userService', [])

angular.module('util', []);

angular.module('galeria', []);

angular.module('resultado', ['angular.filter','ui.router','util']);



//plugin para player de videos
angular.module('fluidvids', ['ngSanitize']);
angular.module('fluidvids').config(["$sceDelegateProvider" ,function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', '**']);
} ]);

//Apps
var appProjetos = angular.module('projetos', ['Usuario', 'Turma', 'Equipe', 'userService', 'Inscricao', 'angucomplete', 'angucomplete-alt', 'Etapa', 'formulario', 'Menu', 'fluidvids', 'Topo', 'Participe', 'util', 'Participantes', 'ngMap', 'Destaques', 'Mural', 'Inscricao.mista', 'resultado', 'galeria', 'angular.filter'])


appProjetos.config(['$httpProvider', '$compileProvider', function ($httpProvider,$compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    /*
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    */
}]);

// teste para centralizar erros.
function errorPadrao(erro, status, callback, retorno) {
    console.log("Erro no Request:")
    console.log("Mensagem : " + erro.Message);
    console.log("Status : " + status);
    console.log("Url : " + retorno.url)
}

