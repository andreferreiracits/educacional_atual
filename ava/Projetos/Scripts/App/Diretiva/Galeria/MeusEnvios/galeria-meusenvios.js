"use strict"
angular.module('galeria').directive('galeriaMeusenvios', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Galeria/MeusEnvios/galeria-meusenvios.html',
        scope: {
            listaAnos: "=listaAnos",
            objEtapa: "=objEtapa",
            objEdicao: "=objEdicao",
            objTurmas: "=objTurmas",
            objEscola: "=objEscola",
            objPerfil: "=objPerfil",
            idUsuario: "@idUsuario",
            defaultConfig: "=defaultConfig",
            maxRegistroPagina: "@maxRegistroPagina",
            simplesmenteDestaques: "@simplesmenteDestaques"
        },
        link: function (scope, el, attr) { },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', function ($http, $scope, $timeout, $filter, $location) {
            var self = this;

            self.str2slug = function (str) {
                var rep = '_';

                var from = "ãàáäâèéëêìíïîòóöôùúüûñç";
                var to = "aaaaaeeeeiiiioooouuuunc";
                for (var i = 0, l = from.length; i < l; i++) {
                    str = str.replace(
                            new RegExp(from.charAt(i), 'g'),
                            to.charAt(i)
                        );
                }

                return str;
            };

            //console.log($scope.objEdicao.BolEncerrado);
            //console.log(JSON.stringify($scope.objTurmas));

            //console.log(JSON.stringify($scope.objEtapa));
            //console.log('datainicio: ' + $scope.objEtapa[0].DataInicio.replace(/\D+/g, ""));
            //console.log('datainicio: ' + new Date(parseInt($scope.objEtapa[0].DataInicio.replace(/\D+/g, ""))));
            //var intDiferenca = new Date()-new Date(arrayData[0]);

            //angular.forEach($scope.objEtapa, function (valor, chave) {
            //$scope.objEnviosInscricao.Envios.push(valor);       
            //console.log(chave);
            //console.log('datainicio: ' + valor.DataInicio.replace(/\D+/g, ""));         
            //console.log('diferenca: '+ new Date(parseInt(valor.DataInicio.replace(/\D+/g, ""))) + '  ' + (new Date()-new Date(parseInt(valor.DataInicio.replace(/\D+/g, "")))) );

            //$scope.objEtapa[chave].DataInicio = parseInt(valor.DataInicio.replace(/\D+/g, ""));
            //});

            //angular.forEach($scope.objEtapa, function (valor, chave) {                                
            //  console.log('teste: ' + valor.DataInicio);                         
            //});

            //====Variáveis========================
            $scope.nuncaExistiramMateriais = true;
            $scope.filtrostatus = 0;
            $scope.filtroetapa = 0;
            $scope.filtroturma = 0;
            $scope.filtroano = 0;

            $scope.detalheturma = {
                id: 0,
                Nome: "",
                Apelido: "",
                Foto: "",
                Thumb: "",
                Link: "",
                Serie: "",
                Cidade: 'Curitiba',
                Estado: 'PR',
                linkMapa: "https://maps.google.com/maps?q=Curitiba,PR,Brasil&ie=UTF8&hq=&hnear=Curitiba&t=m&z=9&iwloc=A&output=embed"
            };

            $scope.detalheturma.Cidade = self.str2slug($scope.objEscola.Cidade);
            $scope.detalheturma.Estado = $scope.objEscola.Estado;
            $scope.detalheturma.linkMapa = "https://maps.google.com/maps?q=" + $scope.detalheturma.Cidade + "," + $scope.detalheturma.Estado + ",Brasil&ie=UTF8&hq=&hnear=" + $scope.detalheturma.Cidade + "&t=m&z=9&iwloc=A&output=embed";

            $scope.intPaginaAtual = 1;

            $scope.alunos = [];
            $scope.objEnviosInscricao = { TotalEnvios: 0, Envios: [] };

            $scope.paramsMateriais = {
                idProjeto: $scope.objEdicao.Projeto.Id,
                idProjetoEdicaoEtapa: 0,
                idUsuario: parseInt($scope.idUsuario),
                idEscola: $scope.objEscola.Id,
                idTurma: 0,
                idSituacao: 0,
                intPagina: 1,
                intRegPorPagina: parseInt($scope.maxRegistroPagina),
                simplesmenteDestaques: parseInt($scope.simplesmenteDestaques),
                total: 0
            };

            $scope.loadingBuscarGeral = false;
            $scope.bolFimMateriais = false;
            //============================================================

            $scope.getLinkEtapa = function (Edicao, Envio) {
                var retorno = "";

                //console.log(Envio);

                if (Edicao) if (Edicao.TipoProjeto) if (!isNaN(Edicao.TipoProjeto)) if (parseInt(Edicao.TipoProjeto) > 0) if (Edicao.Id) if (!isNaN(Edicao.Id)) if (parseInt(Edicao.TipoProjeto) > 0 && parseInt(Edicao.Id) > 0) {

                    retorno = "/AVA/Projetos/Clube/" + Edicao.Projeto.Link + "/Desafios/" + Envio.Etapa.Link + "/";

                    if (Envio.SituacaoEnvio.Id == 3 || Envio.SituacaoEnvio.Id == 4) {
                        retorno += 'Formulario';
                    }
                    else {
                        if (Envio.SituacaoEnvio.Id == 2) {
                            retorno = '';
                        }
                        else {
                            if (Envio.MensagemRapida) if (Envio.MensagemRapida.StrEncryptIdMensagem) if (Envio.MensagemRapida.StrEncryptIdMensagem != "") if (Envio.SituacaoEnvio.Id == 1) {
                                retorno += Envio.MensagemRapida.StrEncryptIdMensagem;
                            }
                        }
                    }

                }
                return retorno;
            };

            self.etapaAberta = function (et) {
                var bolEtapaAberta = true;
                var datInicio = et.DataInicio;
                //console.log('datainicio: ' + new Date(parseInt($scope.objEtapa[0].DataInicio.replace(/\D+/g, ""))));
                //var intDiferenca = new Date()-new Date(arrayData[0]);
                try {
                    var intDiferenca = new Date() - new Date(parseInt(datInicio.replace(/\D+/g, "")));

                    if (intDiferenca < 0) {
                        bolEtapaAberta = false;
                    }

                }
                catch (err) { };
                //alert(et.Nome + ' - ' + bolEtapaAberta);
                return bolEtapaAberta;
            };

            self.filtraStatus = function (idStatus) {
                if ($scope.filtrostatus != idStatus && !$scope.loadingBuscarGeral) {
                    $scope.intPaginaAtual = 1;
                    $scope.filtrostatus = idStatus;

                    self.aplicarFiltros();
                }
            };

            self.filtraComboBox = function (intComboBox) {

                $scope.intPaginaAtual = 1;

                if (intComboBox == 2) {
                    angular.forEach($scope.objTurmas, function (valor, chave) {
                        if (valor.Id == $scope.filtroturma) {
                            $scope.detalheturma.id = valor.Id;
                            $scope.detalheturma.Nome = valor.Nome;
                            $scope.detalheturma.Apelido = valor.Apelido;
                            $scope.detalheturma.Foto = valor.Foto;
                            $scope.detalheturma.Thumb = valor.Thumb;
                            $scope.detalheturma.Link = valor.Link;
                            $scope.detalheturma.Serie = valor.Serie.Nome;
                        }
                    });

                    if ($scope.filtroturma > 0) {

                        $http({
                            url: "/AVA/Projetos/Servico/BuscarTurmaAlunosById/",
                            method: "POST",
                            params: { idTurma: $scope.filtroturma }
                        }).success(function (data) {
                            $scope.alunos = new Array();
                            $scope.alunos = data.alunos;

                            //console.log($scope.alunos);
                        }).error(function (err) {
                            console.log("Não foi possível buscar alunos da turma");
                        }).finally(function () { });

                    }

                }
                else {
                    $scope.filtroturma = 0;
                }

                self.aplicarFiltros();
            };

            self.aplicarFiltros = function () {
                $scope.paramsMateriais.idProjetoEdicaoEtapa = $scope.filtroetapa;
                $scope.paramsMateriais.idTurma = $scope.filtroturma;

                //$scope.paramsMateriais.idSituacao = $scope.filtrostatus;      
                if ($scope.listaAnos) {
                    //console.log($scope.objEdicao.Ano);
                    //console.log('aqui 1');
                    if ($scope.listaAnos.length > 1) {
                        if ($scope.filtroano < $scope.objEdicao.Ano || $scope.objEdicao.BolEncerrado) {
                            $scope.filtrostatus = 1;
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                        }
                        else {
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                        }
                    }
                    else {
                        if (self.verificaEnvioFechado()) {
                            $scope.filtrostatus = 1;
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                        }
                        else {
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                        }
                    }
                }
                else {
                    //console.log('aqui 2');
                    if (self.verificaEnvioFechado()) {
                        $scope.filtrostatus = 1;
                        $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                    }
                    else {
                        $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                    }
                }

                $scope.paramsMateriais.intPagina = $scope.intPaginaAtual;


                $scope.objEnviosInscricao.Envios = [];
                $scope.objEnviosInscricao.TotalEnvios = 0;

                self.getResultadoFiltro(true);
            };

            self.carregarMais = function () {
                if (!$scope.loadingBuscarGeral) {
                    $scope.intPaginaAtual = $scope.intPaginaAtual + 1;

                    $scope.paramsMateriais.idProjetoEdicaoEtapa = $scope.filtroetapa;
                    $scope.paramsMateriais.idTurma = $scope.filtroturma;
                    $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                    $scope.paramsMateriais.intPagina = $scope.intPaginaAtual;

                    self.getResultadoFiltro(false);
                }
            };

            self.getResultadoFiltro = function (bolLimpa) {

                $scope.loadingBuscarGeral = true;
                //var path = "/AVA/Projetos/Servico/GetMeusEnviosPaginado/";
                var path = '/AVA/Projetos/Servico/GetMeusEnviosPaginadoAndPreAprov/';

                //                var parametros = {
                //                    idProjeto: $scope.paramsMateriais.idProjeto,
                //                    idProjetoEdicao: 0,
                //                    idProjetoEdicaoEtapa: $scope.paramsMateriais.idProjetoEdicaoEtapa,
                //                    idSituacao: (self.verificaEnvioFechado() ? 1 : $scope.paramsMateriais.idSituacao),
                //                    idTurma : $scope.paramsMateriais.idTurma,
                //                    tipoOrdenacao : 2,
                //                    intPagina: $scope.paramsMateriais.intPagina,
                //                    intRegPorPagina:$scope.paramsMateriais.intRegPorPagina,
                //                    intAno : $scope.filtroano
                //                };
                var intAnoAux = 0;
                if ($scope.filtroano != null) {
                    if ($scope.filtroano == 0) {
                        if ($scope.listaAnos) {
                            if ($scope.listaAnos instanceof Array) {
                                if ($scope.listaAnos.length == 1) {
                                    intAnoAux = $scope.listaAnos[0];
                                }
                            }
                        }
                    }
                    else {
                        intAnoAux = $scope.filtroano;
                    }
                }
                else {
                    if ($scope.listaAnos) {
                        if ($scope.listaAnos instanceof Array) {
                            if ($scope.listaAnos.length == 1) {
                                intAnoAux = $scope.listaAnos[0];
                            }
                        }
                    }
                }

                var parametros = {
                    idProjeto: $scope.paramsMateriais.idProjeto,
                    idProjetoEdicao: 0,
                    idProjetoEdicaoEtapa: $scope.paramsMateriais.idProjetoEdicaoEtapa,
                    idSituacao: $scope.paramsMateriais.idSituacao,
                    idTurma: $scope.paramsMateriais.idTurma,
                    tipoOrdenacao: 2,
                    intPagina: $scope.paramsMateriais.intPagina,
                    intRegPorPagina: $scope.paramsMateriais.intRegPorPagina,
                    intAno: intAnoAux
                };
                //console.log(parametros);

                if (bolLimpa) {
                    $scope.objEnviosInscricao.TotalEnvios = 0;
                    $scope.objEnviosInscricao.Envios = new Array();
                }

                $http({
                    url: path,
                    method: "POST",
                    params: parametros
                }).success(function (data) {

                    if (data) if (data instanceof Object) {

                        if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                            $scope.objEnviosInscricao.TotalEnvios = parseInt(data.TotalEnvios);
                            //console.log(data.TotalEnvios);                            
                        }

                        if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                            if ($scope.objEnviosInscricao.Envios.length == 0) {
                                $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                            }
                            else {
                                angular.forEach(data.listParticipanteEnvio, function (valor, chave) {
                                    $scope.objEnviosInscricao.Envios.push(valor);
                                });
                            }

                            for (var i = 0; i < $scope.objEnviosInscricao.Envios.length; i++){
                                if ($scope.objEnviosInscricao.Envios[i].SituacaoEnvio.Descricao.toLowerCase() === 'pré-aprovado' || $scope.objEnviosInscricao.Envios[i].SituacaoEnvio.Descricao.toLowerCase() === 'aguardando publicação') {
                                    $scope.objEnviosInscricao.Envios[i].SituacaoEnvio.Descricao = 'Em Moderação';
                                }
                            }

                            if (data.listParticipanteEnvio.length < $scope.maxRegistroPagina) {
                                $scope.bolFimMateriais = true;
                            }
                            else {
                                $scope.bolFimMateriais = false;
                            }
                        }
                        else {
                            $scope.bolFimMateriais = true;
                        }
                    }
                }).error(function (err) {
                    console.log("Não foi possível buscar materiais da etapa");
                }).finally(function () {
                    $scope.loadingBuscarGeral = false;
                });
            };

            this.verificaEnvioFechado = function () {
                var retorno = false;

                //console.log($scope.listaAnos);
                if ($scope.listaAnos) {
                    if ($scope.listaAnos instanceof Array) {
                        if ($scope.listaAnos.length > 1 && $scope.filtroano) {
                            if (parseInt($scope.filtroano) != parseInt($scope.listaAnos[$scope.listaAnos.length - 1])) {
                                retorno = true;
                            }
                        } else if ($scope.listaAnos.length == 1) {
                            var anoAtual = new Date().getFullYear();
                            if (anoAtual > $scope.listaAnos[0]) {
                                return true;
                            }
                        } else if ($scope.listaAnos.length == 0) {
                            return true;
                        }

                    }
                    else {
                        //console.log('entrou no ultimo else');
                        return true;
                    }
                }
                else {
                    //console.log('entrou no ultimo else');
                    return true;
                }

                return retorno;
            };

            if ($scope.listaAnos) {
                if ($scope.listaAnos.length > 1) {
                    if ($scope.listaAnos[$scope.listaAnos.length - 1] > 0) {
                        $scope.filtroano = parseInt($scope.listaAnos[$scope.listaAnos.length - 1]);
                    }
                }
            }

            if ($scope.objEdicao.BolEncerrado) {
                //console.log('bolencerrado');
                self.filtraStatus(1);
            } else {
                //console.log('aplicar filtros');
                self.aplicarFiltros();
            }

        }],
        controllerAs: 'galeriaMeusEnviosCtrl'
    };
});