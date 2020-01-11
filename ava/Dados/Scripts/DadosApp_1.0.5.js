var app = angular.module('DadosApp', ['ui.bootstrap']);
var cpfbackup = "";
var emailbackup = "";

app.controller('DadosController', ['$scope', '$rootScope', '$http', 'funcoes', '$modal', '$log', function ($scope, $rootScope, $http, funcs, $modal, $log) {
    $rootScope.alteralogin = false;
    $rootScope.alteraSenha = false;
    $rootScope.exibirAlterarLogin1 = false;
    $rootScope.exibirAlterarLogin2 = false;
    $rootScope.exibirAlterarLoginExterno = false;
    $rootScope.idEscola = 0;
    $rootScope.idUsuario = 0;
    $rootScope.idAVAEscola = 0;
    $rootScope.configLogin = {};
    $rootScope.dadosUsuario = {};

    $scope.func = funcs;

    $scope.name = '';
    $scope.dadosCadastrais = {};
    $scope.informativo = '';
    $scope.erroInfo = 0;
    $scope.radioNao = false;
    $scope.dadosAcesso = {};
    $scope.papelUsuario = {};
    $scope.dadosComplem = 0;
    // tipo portal: 8 = SPE, 16 = PP Parcial
    $scope.tipoPortal = '';
    $scope.isWebmail = 0;
    $scope.listDisciplina = [];
    $scope.listSerie = [];
    $scope.listSerieBkp = [];
    $scope.mensagemDadosCompl = 'Essas informações poderão ser usadas para montar grupos de interesse no Educacional.';
    $scope.bolWebmailEscola = false;

    $scope.$watch('informativo', function (newValue, oldValue) {
        var bool = '';
        if (oldValue !== '') {
            if (newValue === 1) {
                if ($scope.dadosAcesso !== {}) {
                    if ($scope.dadosAcesso.webmail === "" && $scope.dadosAcesso.emailAlternativo === "") {
                        showAndDismissAlert('info', 'Você deve ter pelo menos um e-mail pra receber o Informativo Educacional.');
                        $scope.informativo = 0;
                        $scope.erroInfo = 1;
                        $scope.radioNao = false;
                    } else {
                        bool = true;
                        $scope.radioNao = false;
                        $http
                        .post('/ava/dados/home/salvarInformativo', { bolInformativo: bool })
                        .then(function (data) {
                            showAndDismissAlert('success', 'Alterações salvas com sucesso.');
                        }, function () {
                            showAndDismissAlert('info', 'Ocorreu um erro ao salvar as alterações.');
                        });
                    }
                }
            } else {
                if ($scope.erroInfo === 0) {
                    bool = false;
                    $http
                        .post('/ava/dados/home/salvarInformativo', { bolInformativo: bool })
                        .then(function (data) {
                            showAndDismissAlert('success', 'Alterações salvas com sucesso.');
                        }, function () {
                            showAndDismissAlert('info', 'Ocorreu um erro ao salvar as alterações.');
                        });
                } else {
                    $scope.erroInfo === 0;
                    $scope.informativo = 0;
                    $scope.radioNao = true;
                }
            }
        }
    } .bind(this));

    $http({
        method: 'GET',
        url: '/ava/dados/home/getTipoPortal',
        cache: false
    }).then(function (data) {
        $scope.tipoPortal = data;
        if ($scope.tipoPortal.data === 8)
            $scope.mensagemDadosCompl = 'Essas informações serão usadas para configurar a exibição do Livro Digital.';
    }, function () {
        $scope.tipoPortal = '';
    });

    $http({
        method: 'GET',
        url: '/ava/dados/home/verificaWebmailEscola',
        cache: false
    }).then(function (data) {
        if (data.data === true) {
            $("#divWebmail").show();
        }
    }, function () {
    });

    $http({
        method: 'GET',
        url: '/ava/dados/home/getDadosAcesso',
        cache: false
    }).then(function (data) {
        $scope.dadosAcesso = data.data;
        $rootScope.idEscola = data.data.idEscola;
        $rootScope.idUsuario = data.data.idUsuario;
        $rootScope.dadosUsuario = data.data;
        emailbackup = $scope.dadosAcesso.emailAlternativo;
        cpfbackup = $scope.dadosAcesso.cpf;

        if ($scope.dadosAcesso.webmail === '') {
            $("#labelwebmail").show();
        }
    }, function () {
        $scope.dadosAcesso = {};
    });

    $http({
        method: 'GET',
        url: '/ava/dados/home/getDadosPapelUsuario',
        cache: false
    }).then(function (data) {
        $scope.papelUsuario = data.data;
        if ($scope.papelUsuario.bolEducador === true) {
            $scope.dadosComplem = 1;

            if ($scope.tipoPortal.data === 8) {
                $("#divcpf").show();
            }

            //$("#divDados").show();
            //
            //// obtem lista de disciplinas
            //$http({
            //    method: 'GET',
            //    url: '/ava/dados/home/getDisciplinas',
            //    cache: false
            //}).then(function (data) {
            //    var lista = [];
            //    var disciplinasUsuario = [];
            //
            //    // obtem disciplinas do usuario
            //    $http({
            //        method: 'GET',
            //        url: '/ava/dados/home/getDadosComplementaresDisciplinas',
            //        cache: false
            //    }).then(function (dataUsr) {
            //        disciplinasUsuario = dataUsr.data;
            //        angular.forEach(data.data, function (value, key) {
            //            var checkDisciplina = false;
            //            angular.forEach(disciplinasUsuario, function (valueDiscUsr, keyDiscUsr) {
            //                if (value.idMateria === valueDiscUsr.idMateria) {
            //                    checkDisciplina = true;
            //                }
            //            });
            //
            //            lista.push({ check: checkDisciplina, id: value.idMateria, descricao: value.strMateria });
            //        });
            //
            //        $scope.listDisciplina = lista;
            //    });
            //}, function () {
            //    $scope.listDisciplina = [];
            //});
            //
            //// obtem lista de series
            //$http({
            //    method: 'GET',
            //    url: '/ava/dados/home/getSeries',
            //    cache: false
            //}).then(function (data) {
            //    var lista = [];
            //    var seriesUsuario = [];
            //
            //    // obtem series do usuario
            //    $http({
            //        method: 'GET',
            //        url: '/ava/dados/home/getDadosComplementaresSeries',
            //        cache: false
            //    }).then(function (dataUsr) {
            //        seriesUsuario = dataUsr.data;
            //        angular.forEach(data.data, function (value, key) {
            //            var checkSerie = false;
            //            angular.forEach(seriesUsuario, function (valueSerieUsr, keySerieUsr) {
            //                if (value.idSerie === valueSerieUsr.idSerie) {
            //                    checkSerie = true;
            //                }
            //            });
            //
            //            lista.push({ check: checkSerie, id: value.idSerie, descricao: value.strSerie });
            //        });
            //
            //        $scope.listSerie = lista;
            //    });
            //}, function () {
            //    $scope.listSerie = [];
            //});
        }

        // Configuração para exibir login ou senha para usuarios.
        $http
        .post('/ava/dados/home/getIdAvaEscola', { 'idEscola': $scope.idEscola })
        .then(function (data) {
            $rootScope.idAVAEscola = data.data.idEscola;
            if ($rootScope.idAVAEscola != "" && $rootScope.idAVAEscola != "0") {
                $http
                .post('/ava/dados/home/getConfigEscolaAlteracaoLoginSenha', { 'idEscola': $rootScope.idAVAEscola })
                .then(function (data) {

                    $rootScope.configLogin = data.data;
                    var exibirLoginSenha = false;

                    if ($scope.papelUsuario.bolAluno === true) {
                        if ($rootScope.configLogin.bolAlterarLoginAlunos) {
                            exibirLoginSenha = $rootScope.alteralogin = true;
                        }
                        if ($rootScope.configLogin.bolAlterarSenhaAlunos) {
                            exibirLoginSenha = $rootScope.alteraSenha = true;
                        }
                    } else {
                        if ($rootScope.configLogin.bolAlterarLoginOutros) {
                            exibirLoginSenha = $rootScope.alteralogin = true;
                        }
                        if ($rootScope.configLogin.bolAlterarSenhaOutros) {
                            exibirLoginSenha = $rootScope.alteraSenha = true;
                        }
                    }

                    if ($rootScope.dadosUsuario.login.trim().toLowerCase() == "master" + $rootScope.idEscola) {
                        $rootScope.alteralogin = false;
                    }

                    if (exibirLoginSenha) {
                        $rootScope.exibirAlterarLogin1 = true;
                        $rootScope.exibirAlterarLogin2 = false;
                    }
                    else {
                        $rootScope.exibirAlterarLogin1 = false;
                        $rootScope.exibirAlterarLogin2 = true;
                    }

                    
                }, function () {
                    showAndDismissAlert('info', 'Ocorreu um erro inesperado.');
                });
            }
            else {
                $rootScope.alteralogin = true;
                $rootScope.alteraSenha = true;
                $rootScope.exibirAlterarLogin1 = true;
                $rootScope.exibirAlterarLogin2 = false;
            }
            //verificar se eh login externo
            $http({
                method: 'GET',
                url: '/ava/login/home/CheckIsLoginExterno',
                cache: false
            }).then(function (result) {
                if (result.data.loginExterno == '1') {
                    $rootScope.exibirAlterarLoginExterno = true;
                    $rootScope.exibirAlterarLogin1 = false;
                    $rootScope.exibirAlterarLogin2 = false;
                } else {
                    $rootScope.exibirAlterarLoginExterno = false;
                }
            }, function () {
                showAndDismissAlert('info', 'Ocorreu um erro inesperado.');
            });

        }, function () {
            showAndDismissAlert('info', 'Ocorreu um erro inesperado.');
        });
    }, function () {
        $scope.papelUsuario = {};
    });

    $http({
        method: 'GET',
        url: '/ava/dados/home/getDadosCadastrais',
        cache: false
    }).then(function (data) {
        $scope.dadosCadastrais = data.data;
        if ($scope.dadosCadastrais.dataNascimento !== undefined) {
            if ($scope.dadosCadastrais.dataNascimento !== null && $scope.dadosCadastrais.dataNascimento !== "") {
                if ($scope.dadosCadastrais.dataNascimento.length > 0) {
                    $scope.dadosCadastrais.dataNascimento = $scope.dadosCadastrais.dataNascimento.substring(0, 10);
                }
            }
        }

        if ($scope.dadosCadastrais.cidadeUf !== undefined) {
            if ($scope.dadosCadastrais.cidadeUf !== null && $scope.dadosCadastrais.cidadeUf !== "") {
                var sizeCidadeUf = $scope.dadosCadastrais.cidadeUf.length;
                var cidade = $scope.dadosCadastrais.cidadeUf.substring(0, (sizeCidadeUf - 2));
                var uf = $scope.dadosCadastrais.cidadeUf.substring((sizeCidadeUf - 2), sizeCidadeUf);
                $scope.dadosCadastrais.cidadeUf = cidade + " (" + uf + ")";
            }
        }

        $scope.informativo = $scope.dadosCadastrais.bolInformativo === true ? 1 : 0;
        $scope.radioNao = !$scope.dadosCadastrais.bolInformativo;
    }, function (data) {
        $scope.dadosCadastrais = '';
    });

    /** alteração wendell
    22/09/2015
    modal de editar
    **/

    $scope.abreModal = function (size) {
        //desabilitar scroll da tela
        var $nonScrollable = $("body");

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'Dados/Home/ModalEditLogin/',
            controller: 'AlteraLoginCtrl',
            size: size,
            resolve: {
                loginAtual: function () {
                    return $scope.dadosAcesso;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $log.info(selectedItem);
        }, function () {
            $("html").css('overflow', 'visible');
            $nonScrollable.disablescroll("undo");
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
} ]);

app.factory('funcoes', ['$http', '$location', function (http, location) {
    var funcs = {};

    funcs.salvarDadosComplementares = function (listDisciplina, listSeries, id, tipo) {
        var disciplinas = "";
        var series = "";
        var ident = id;

        angular.forEach(listDisciplina, function (value, key) {
            if (tipo === 'D' && value.id === ident) {
                if (value.check === false) {
                    disciplinas = disciplinas + value.id + ",";
                }
            } else {
                if (value.check === true) {
                    disciplinas = disciplinas + value.id + ",";
                }
            }
        });

        angular.forEach(listSeries, function (value, key) {
            if (tipo === 'S' && value.id === ident) {
                if (value.check === false) {
                    series = series + value.id + ",";
                }
            } else {
                if (value.check === true) {
                    series = series + value.id + ",";
                }
            }
        });

        if (disciplinas.length > 0) {
            disciplinas = disciplinas.substring(0, (disciplinas.length - 1));
        }
        if (series.length > 0) {
            series = series.substring(0, (series.length - 1));
        }

        http
                .post('/ava/dados/home/salvarDadosComplementares', { strDisciplinas: disciplinas + "", strSeries: series + "" })
                .then(function (data) {
                    if (data.data === "OK") {
                        showAndDismissAlert('success', 'Alterações salvas com sucesso.');
                    } else {
                        showAndDismissAlert('info', data.data);
                        return null;
                    }
                });
    };

    funcs.salvarCpf = function (cpf, educador) {
        if ((cpfbackup === "" && cpf === "") || (cpfbackup === cpf)) {
            cpfbackup = cpf;
            return null;
        }
        else {
            cpfbackup = cpf;
        }

        if (educador && cpf !== "") {
            var msg = funcs.validarCpf(cpf);
            if (msg !== "") {
                showAndDismissAlert('info', msg);
                return null;
            }
        }

        http
                .post('/ava/dados/home/salvarCpf', { strCPF: cpf })
                .then(function (data) {
                    showAndDismissAlert('success', 'Alterações salvas com sucesso.');
                }, function () {
                    showAndDismissAlert('info', 'Ocorreu um erro ao salvar as alterações.');
                });
    };

    funcs.salvarEmailAlternativo = function (emailAlternativo) {
        if ((emailbackup === "" && emailAlternativo === "") || (emailbackup === emailAlternativo)) {
            emailbackup = emailAlternativo;
            return null;
        }
        else {
            emailbackup = emailAlternativo;
        }

        if (emailAlternativo !== "") {
            var msg = funcs.validarEmail(emailAlternativo);
            if (msg !== "") {
                showAndDismissAlert('info', msg);
                return null;
            }
        }

        http
                .post('/ava/dados/home/salvarEmailAlternativo', { strEmail: emailAlternativo })
                .then(function (data) {
                    showAndDismissAlert('success', 'Alterações salvas com sucesso.');
                }, function () {
                    showAndDismissAlert('info', 'Ocorreu um erro ao salvar as alterações.');
                });
    };

    // funcao para validar e-mail
    funcs.validarEmail = function (email) {
        // mensagem de retorno
        var msg = "";

        // regex para validar email
        //var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        // regex para validar usuario do email
        var regexUsuario = /^([\w-]+(?:\.[\w-]+)*)$/i;

        // regex para validar dominio do email
        var regexDominio = /^((?:[a-zA-Z0-9]+\.)*[a-zA-Z0-9]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (email.indexOf("@") >= 0) {
            // obtem usuario do email
            var usuario = email.substring(0, email.indexOf("@"));

            // obtem dominio do email
            var dominio = email.substring(email.indexOf("@") + 1, email.length);

            if (regexUsuario.test(usuario)) {
                if (regexDominio.test(dominio)) {
                    if (dominio.substring(0, dominio.indexOf(".")) === "educacional") {
                        msg = "O e-mail do Educacional não pode ser usado como e-mail alternativo.";
                    }
                } else {
                    msg = "O domínio do e-mail alternativo informado não é válido."
                }
            } else {
                msg = "O e-mail alternativo contém caracteres inválidos.";
            }
        } else {
            msg = "O e-mail alternativo contém caracteres inválidos.";
        }

        return msg;
    };

    // funcao para validar cpf
    funcs.validarCpf = function (cpf) {
        var msg = "";
        // retira caracteres nao numericos do cpf
        cpf = cpf.replace(/[^\d]+/g, '');

        // valida tamanho do cpf
        if (cpf.length != 11) {
            return "O CPF deve conter onze dígitos.";
        }

        // elimina CPFs invalidos conhecidos
        if (cpf == "00000000000" || cpf == "11111111111" ||
                cpf == "22222222222" || cpf == "33333333333" ||
                cpf == "44444444444" || cpf == "55555555555" ||
                cpf == "66666666666" || cpf == "77777777777" ||
                cpf == "88888888888" || cpf == "99999999999") {
            return "O CPF informado é inválido.";
        }

        // Valida 1o digito
        add = 0;

        for (i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }

        rev = 11 - (add % 11);

        if (rev == 10 || rev == 11) {
            rev = 0;
        }

        if (rev != parseInt(cpf.charAt(9))) {
            return "O CPF informado é inválido.";
        }

        // Valida 2o digito
        add = 0;

        for (i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }

        rev = 11 - (add % 11);

        if (rev == 10 || rev == 11) {
            rev = 0;
        }

        if (rev != parseInt(cpf.charAt(10))) {
            return "O CPF informado é inválido.";
        }

        return "";
    }

    funcs.cancelar = function () {
        window.location.assign("Perfil/MeuPerfil");
    }

    return funcs;
} ]);

// diretiva para componente input aceitar somente numeros
app.directive('nksOnlyNumber', function () {
    return {
        require: 'ngModel',
        scope: ngModel = "",
        link: function (scope, element, attrs, modelCtrl) {
            var backSpace = false;

            element.bind("keydown keypress contextmenu", function (event) {
                var m = scope.$eval(attrs.ngModel);

                if (event.keyCode == 32) {
                    event.preventDefault();
                }

                if (event.which == 8) {
                    backSpace = true;
                } else {
                    backSpace = false;
                }
            });

            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';

                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                var auxInput = '';

                if (backSpace === false) {
                    for (var i = 0; i < transformedInput.length; i++) {
                        auxInput = auxInput + transformedInput[i];
                        if (i === 2) auxInput = auxInput + '.';
                        if (i === 5) auxInput = auxInput + '.';
                        if (i === 8) auxInput = auxInput + '-';
                    }
                } else {
                    auxInput = inputValue;
                }

                if (auxInput != inputValue) {
                    modelCtrl.$setViewValue(auxInput);
                    modelCtrl.$render();
                }

                return auxInput;
            });
        }
    };
});