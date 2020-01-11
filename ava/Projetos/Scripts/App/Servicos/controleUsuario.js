angular.module('userService').factory('perfilUsuario',
    ['$http', 'usuario', function ($http, usuario) {
        var promise; // = $http.get('/AVA/Projetos/Servico/getPerfilUsuario');
        factory = {};

        factory.estaLogado = function () { return true; },
        factory.estaInscrito = function () { return false },
        factory.estaParticipando = function (idGrupo) {
            // implementa uma maneira de ir apenas uma vez no servidor pegar esse valor depois so atulizar no reload.
            // 1 por grupo.
            return $http.get('/AVA/Projetos/Servico/verificaGrupoParticipante/?idGrupo=' + idGrupo);
        };
        factory.usuario = function () {
            if (!promise) {
                promise = $http.get('/AVA/Projetos/Servico/getPerfilUsuario')/*.success(function (data) {
                    return data.usuario;
                }); */
            }
            return promise;
        }
        factory.possuiCargo = function (perfil) {
            var semPerfil = false;
            if (perfil != null) {
                var perfis = perfil.split(',');
                angular.forEach(perfis, function (nome) {
                    var teste = $filter('filter')(usuario.Cargo, nome, true)
                    if (teste.length == 0) {
                        semPerfil = true;
                    }
                });
                if (semPerfil) {
                    return false;
                }
            }
            else {
                return true;
            }
            return true;
        }
        return factory;
    } ]
);