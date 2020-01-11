"use strict"
angular.module('Participantes').directive('galeriaParticipantesEquipe', function () {
    return {
        restrict: 'E',
        scope: {
            objEdicao : "=objEdicao",
            idProjeto: "=idProjeto",
            idEdicao: "=idEdicao",
            idGrupo: "=idGrupo",
            ItensPorPagina: "=itensPagina",
            //Participantes: "=listaParticipantes",
            //Escolas: "=escolasParticipantes",
            TipoProjeto: "=tipoProjeto",
            Marcador: "=iconeMarcador",
            //TotalParticipantes: "=totalParticipantes",
            defaultConfig: "=defaultConfig"
        },
        templateUrl: "/AVA/Projetos/Scripts/App/Diretiva/Participantes/galeria-participantes-equipe.html"
    };
});

angular.module('Participantes').controller('controleParticipantesEquipe', ["$http", "$scope", "$element", "$attrs", "$compile", "$timeout", "$filter", "projetoMapa", function ($http, $scope, $element, $attrs, $compile, $timeout, $filter, projetoMapa) {
    $scope.pagina = 1;
    $scope.hasMoreElements = true;
    $scope.loadInProgress = false;
    $scope.loadMoreInProgress = false;
    $scope.Estados = [];

    $scope.CacheEscolas = undefined;
    $scope.CidadeSelecionada = undefined;
    $scope.EstadoSelecionado = undefined;
    $scope.EscolaSelecionada = undefined;
    $scope.TurmaSelecionada = undefined;
    if (!$scope.TotalParticipantes) {
        $scope.TotalParticipantes = 0;
    }

    $scope.searchString = "";
    $scope.coordenadas = new Array();
    $scope.Participantes = new Array();

    var map;
    $scope.dynMarkers = [];
    $scope.$on('mapInitialized', function (event, evtMap) {
        map = evtMap;
        $scope.initLocations();
    });


    $scope.aplicarFiltros = function (level) {

        //concatena no model os novos dados obtidos
        var idEstado = '';
        var idEscola = 0;
        var idTurma = 0;
        var strUF = '';
        var strTermo = '';

        if ($scope.EscolaSelecionada) if ($scope.EscolaSelecionada.Id) if (!isNaN($scope.EscolaSelecionada.Id)) {
            idEscola = parseInt($scope.EscolaSelecionada.Id);
        }
        if ($scope.EstadoSelecionado) if ($scope.EstadoSelecionado.Sigla) if ($scope.EstadoSelecionado.Sigla != "") {
            idEstado = $scope.EstadoSelecionado.Sigla;
        }
        if ($scope.searchString) if ($scope.searchString.length > 0) if ($scope.searchString != "") {
            strTermo = $scope.searchString;
        }

        //reseta/recarrega todos os elementos
        //if (((level == 3) && (strTermo.length > 2)) || (level != 3)) {
        $scope.Participantes = new Array();
        $scope.pagina = 1;
        $scope.hasMoreElements = false;
        //}

        //aplica filtragens nas combos após a seleção
        switch (level) {
            case 0:
                $scope.EscolaSelecionada = undefined;
                $scope.TurmaSelecionada = undefined;

                if (idEstado.length == 2) {
                    //filtra as escolas conforme o estado selecionado
                    var escolas = $filter('filter')($scope.CacheEscolas, { Estado: idEstado }, true);
                    $scope.Escolas = escolas;

                    //if ($scope.TipoProjeto == 1) {
                    //    //filtra as turmas participantes conforme o estado selecionado
                    //    var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Estado: idEstado} }, true);
                    //    $scope.Participantes = turmas;
                    //}
                    //else {
                    //    //filtra as turmas da combo conforme o estado selecionado
                    //    var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Estado: idEstado} }, true);
                    //    $scope.Turmas = turmas;
                    //}
                }
                //else {
                //    $scope.Escolas = $scope.CacheEscolas;
                //    if ($scope.TipoProjeto == 1) {
                //        $scope.Participantes = $scope.CacheTurmas;
                //    }
                //    else {
                //        $scope.Turmas = $scope.CacheTurmas;
                //    }
                //
                //}
                //break;
            case 1:
                $scope.TurmaSelecionada = undefined;
                if (idEscola > 0) {
                    if ($scope.TipoProjeto == 1) {
                        //filtra as turmas participantes conforme a escola selecionada
                        var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Id: idEscola} }, true);
                        $scope.Participantes = turmas;
                    }
                    else {
                        //filtra as turmas da combo conforme a escola selecionada
                        var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Id: idEscola} }, true);
                        $scope.Turmas = turmas;
                    }
                }
                else {
                    //if ($scope.TipoProjeto == 1) {
                    //    $scope.Participantes = $scope.CacheTurmas;
                    //}
                    //else {
                    //    $scope.Turmas = $scope.CacheTurmas;
                    //}
                }
                break;
        }


        var idEscola = 0;
        var idTurma = 0;
        if ($scope.EscolaSelecionada) if ($scope.EscolaSelecionada.Id) if (!isNaN($scope.EscolaSelecionada.Id)) {
            idEscola = parseInt($scope.EscolaSelecionada.Id);
        }
        if ($scope.TurmaSelecionada) if ($scope.TurmaSelecionada.Id) if (!isNaN($scope.TurmaSelecionada.Id)) {
            idTurma = parseInt($scope.TurmaSelecionada.Id);
        }


        if (((level == 3) && ((strTermo.length > 2) || (strTermo.length == 0))) || (level != 3)) {
            $scope.loadInProgress = true;

            var path = "/AVA/Projetos/Servico/GetEquipesParticipantesEdicao/";
            var parametros = {
                idProjetoEdicao: $scope.idEdicao,
                intPagina: $scope.pagina,
                intRegPorPagina: $scope.ItensPorPagina,
                idEscola: idEscola,
                strUF: idEstado,
                termo: strTermo
            };


            if (parametros.intPagina == 1) {
                $scope.Participantes = new Array();
            }


            $http({
                url: path,
                method: "GET",
                params: parametros
            }).success(function (data) {


                if (data) if (data instanceof Object) {
                    if (data.Total) if (!isNaN(data.Total)) if (parseInt(data.Total) >= 0) {
                        $scope.TotalParticipantes = parseInt(data.Total);
                    }
                    if (data.EquipesParticipantes) {
                        var contador = 0;
                        for (var participante in data.EquipesParticipantes) {
                            $scope.Participantes.push(data.EquipesParticipantes[participante]);
                            contador++;
                        }
                        $scope.hasMoreElements = false;
                        if (data.EquipesParticipantes) if (data.EquipesParticipantes instanceof Array) {
                            if ($scope.TotalParticipantes > $scope.Participantes.length) {
                                $scope.hasMoreElements = true;
                            } else {
                                $scope.hasMoreElements = false;
                            }
                        }
                    }
                }

                $scope.loadInProgress = false;
            });

        }
    };

    $scope.carregaProximaPagina = function () {
        //concatena no model os novos dados obtidos
        $scope.loadMoreInProgress = true;
        var idEscola = 0;
        var idEstado = '';
        var idTurma = 0;
        var strUF = '';
        var strTermo = '';
        if ($scope.EscolaSelecionada) if ($scope.EscolaSelecionada.Id) if (!isNaN($scope.EscolaSelecionada.Id)) {
            idEscola = $scope.EscolaSelecionada.Id;
        }
        if ($scope.EstadoSelecionado) if ($scope.EstadoSelecionado.Sigla) if ($scope.EstadoSelecionado.Sigla != "") {
            idEstado = $scope.EstadoSelecionado.Sigla;
        }
        if ($scope.TurmaSelecionada) if ($scope.TurmaSelecionada.Id) if (!isNaN($scope.TurmaSelecionada.Id)) {
            idTurma = $scope.TurmaSelecionada.Id;
        }
        if ($scope.searchString != "") {
            strTermo = $scope.searchString;
        }
        var path = "/AVA/Projetos/Servico/GetParticipantesProjeto/";

        var parametros = {
            idProjeto: $scope.idProjeto,
            idGrupo: $scope.idGrupo,
            intPagina: ($scope.pagina + 1),
            intRegPorPagina: $scope.ItensPorPagina,
            idEscola: idEscola,
            idTurma: idTurma,
            strUF: idEstado,
            termo: strTermo
        };


        path = "/AVA/Projetos/Servico/GetEquipesParticipantesEdicao/";
        parametros = {
            idProjetoEdicao: $scope.idEdicao,
            intPagina: ($scope.pagina + 1),
            intRegPorPagina: $scope.ItensPorPagina,
            idEscola: idEscola,
            strUF: idEstado,
            termo: strTermo
        };

        $http({
            url: path,
            method: "GET",
            params: parametros
        }).success(function (data) {
            $scope.pagina++;
            if (data) if (data instanceof Object) {
                if (data.Total) if (!isNaN(data.Total)) if (parseInt(data.Total) >= 0) {
                    $scope.TotalParticipantes = parseInt(data.Total);
                }
                if (data.EquipesParticipantes) {
                    var contador = 0;
                    for (var participante in data.EquipesParticipantes) {
                        $scope.Participantes.push(data.EquipesParticipantes[participante]);
                        contador++;
                    }
                    $scope.hasMoreElements = false;
                    if (data.EquipesParticipantes) if (data.EquipesParticipantes instanceof Array) {
                        if ($scope.TotalParticipantes > $scope.Participantes.length) {
                            $scope.hasMoreElements = true;
                        }
                        else {
                            $scope.TotalParticipantes = data.Total;
                        }
                    }
                }

            }
            $scope.loadMoreInProgress = false;
        }
        );
    };

    $scope.getPrepByUf = function (strUF) {
        var arrNomes = ['do', 'do', 'do', 'do', 'da', 'do', 'do', 'do', 'de', 'do', 'do', 'do', 'de', 'do', 'da', 'do', 'de', 'do', 'do', 'do', 'do', 'de', 'de', 'de', 'de', 'de', 'de'];
        var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
        return arrNomes[arrSiglas.indexOf(strUF)];
    };

    $scope.getEstadoByUf = function (strUF) {
        var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
        var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
        return arrNomes[arrSiglas.indexOf(strUF)];
    };


    $scope.initController = function () {
        
        var path = "/AVA/Projetos/Servico/GetEquipesEscolasParticipantesEdicao/";
        var parametros = {
            idProjetoEdicao: $scope.idEdicao,
            intRegPorPagina: $scope.ItensPorPagina
        };
        
        if (parametros.intPagina == 1)
            $scope.Participantes = new Array();


        $scope.loadInProgress = true;
        $http({
            url: path,
            method: "POST",
            params: parametros
        }).success(function (data) {

            if (data) if (data instanceof Object) {

                if (data.Total) if (!isNaN(data.Total)) if (parseInt(data.Total) >= 0) {
                    $scope.TotalParticipantes = parseInt(data.Total);
                }

                if (data.Escolas) {
                    $scope.Escolas = data.Escolas;
                }

                if (data.EquipesParticipantes) {
                    var contador = 0;
                    for (var participante in data.EquipesParticipantes) {
                        $scope.Participantes.push(data.EquipesParticipantes[participante]);
                        contador++;
                    }

                    if ($scope.TotalParticipantes > $scope.Participantes.length) {
                        $scope.hasMoreElements = true;
                    } else {
                        $scope.hasMoreElements = false;
                    }
                }
            }


            if ($scope.Participantes) if ($scope.Participantes instanceof Array) if ($scope.Participantes.length > 0) if ($scope.TotalParticipantes == 0) {
                $scope.TotalParticipantes = $scope.Participantes.length;
            }

            if ($scope.Escolas) if ($scope.Escolas.length > 0) {
                var temp = ",";
                for (var escola in $scope.Escolas) {
                    if (temp.indexOf("," + $scope.Escolas[escola].Estado + ",") == -1) {
                        temp += $scope.Escolas[escola].Estado + ",";
                        $scope.Estados.push({
                            Estado: $scope.getEstadoByUf($scope.Escolas[escola].Estado),
                            Sigla: $scope.Escolas[escola].Estado
                        });
                    }
                }
                
                if ($scope.Estados.length > 0) {
                    $scope.Estados.sort();
                }

                $scope.CacheEscolas = $scope.Escolas;
            }

            $scope.initLocations();

            $scope.loadInProgress = false;
        }, function (erro) {
            $scope.loadInProgress = false;
        });
    };

    $scope.initLocations = function () {

        //processa as cidades com materiais e pontua no mapa
        for (var escola in $scope.Escolas) {
            var locationData = $scope.getCoordenadas($scope.Escolas[escola].Estado, $scope.Escolas[escola].Cidade);
            if (locationData != null) {
                if (!locationData.adicionada) {
                    var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);

                    var tempMarker = new google.maps.Marker({
                        position: latLng,
                        title: $scope.Escolas[escola].Cidade + "/" + $scope.Escolas[escola].Estado,
                        icon: $scope.Marcador,
                        cursor: 'pointer'
                    })
                    google.maps.event.addListener(tempMarker, 'click', function () {
                        map.setCenter(this.getPosition());
                        if (this.getTitle().indexOf("/") != -1) {
                            $scope.CidadeSelecionada = this.getTitle().split("/")[0];
                            $scope.EstadoSelecionado = { Estado: $scope.getEstadoByUf(this.getTitle().split("/")[1]), Sigla: this.getTitle().split("/")[1] };

                            $scope.aplicarFiltros(0);
                        }
                    });
                    $scope.dynMarkers.push(tempMarker);
                    locationData.adicionada = true;
                }
            }
        }
        if ($scope.dynMarkers.length > 0) {
            $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {
                'gridSize': 40,
                'averageCenter': true
            });
        }
    };

    $scope.getCoordenadas = function (uf, cidade) {
        return projetoMapa.getCoordenadasByUfCidade(uf, cidade);
    }

    $timeout(function () { $scope.initController() });
} ]);