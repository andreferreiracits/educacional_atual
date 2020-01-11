"use strict"

function FormularioResposta(Config, idEdicao) {
    var model = {
        Id: 0,
        IdProjetoEdicao: idEdicao,
        BolValidado: false,
        BolAutoControle: false,
        Formulario: {
            Id: Config.Id
        },
        Situacao: {
            Id: 0,
            Descricao: "Rascunho"
        },
        Usuario: {
            Id: 0
        },
        Ordem: 0,
        DataDestaque: "",
        DataCriacao: "",
        DataAtualizacao: "",
        Campos: new Array()
    }
    var indice = 0;
    for (var Grupo in Config.Grupos) {
        for (var Campo in Config.Grupos[Grupo].Campos) {
            var campo = {
                Id: 0,
                Indice: indice,
                Ordem: Config.Grupos[Grupo].Campos[Campo].Ordem,
                IdArquivo: 0,
                Valor: Config.Grupos[Grupo].Campos[Campo].Valor,
                Legenda: "",
                BolConteudoEnquete: false,
                Opcoes: new Array(),
                Itens: new Array(),
                ItensListaComplexa: new Array(),
                FormularioCampo: {
                    Id: Config.Grupos[Grupo].Campos[Campo].Id,
                    Indice: indice,
                    Titulo: Config.Grupos[Grupo].Campos[Campo].Titulo,
                    Ordem: Config.Grupos[Grupo].Campos[Campo].Ordem,
                    TamanhoMinimo: Config.Grupos[Grupo].Campos[Campo].TamanhoMinimo,
                    TamanhoMaximo: Config.Grupos[Grupo].Campos[Campo].TamanhoMaximo,
                    BolDestaque: Config.Grupos[Grupo].Campos[Campo].BolDestaque,
                    BolObrigatorio: Config.Grupos[Grupo].Campos[Campo].BolObrigatorio,
                    BolCorretor: Config.Grupos[Grupo].Campos[Campo].BolCorretor,
                    Dica: Config.Grupos[Grupo].Campos[Campo].Dica,
                    Alerta: Config.Grupos[Grupo].Campos[Campo].Alerta,
                    Class: Config.Grupos[Grupo].Campos[Campo].Class,
                    Opcoes: new Array(),
                    Itens: new Array(),
                    ItensListaComplexa: new Array(),
                    FormularioCampoTipo: {
                        Id: Config.Grupos[Grupo].Campos[Campo].FormularioCampoTipo.Id
                    }
                }
            }
            if (Config.Grupos[Grupo].Campos[Campo].Opcoes instanceof Array && Config.Grupos[Grupo].Campos[Campo].Opcoes.length > 0)
                for (var Opcao in Config.Grupos[Grupo].Campos[Campo].Opcoes) {
                    campo.FormularioCampo.Opcoes.push({
                        Id: 0,
                        Opcao: {
                            Id: Config.Grupos[Grupo].Campos[Campo].Opcoes[Opcao].Id,
                            Opcao: Config.Grupos[Grupo].Campos[Campo].Opcoes[Opcao].Opcao,
                            Ordem: Config.Grupos[Grupo].Campos[Campo].Opcoes[Opcao].Ordem
                        },
                        Ordem: Config.Grupos[Grupo].Campos[Campo].Opcoes[Opcao].Ordem
                    });
                }

            if (Config.Grupos[Grupo].Campos[Campo].Itens instanceof Array && Config.Grupos[Grupo].Campos[Campo].Itens.length > 0)
                for (var Item in Config.Grupos[Grupo].Campos[Campo].Itens) {
                    campo.FormularioCampo.Itens.push({
                        Id: 0,
                        Valor: Config.Grupos[Grupo].Campos[Campo].Itens[Item].Valor,
                        Legenda: Config.Grupos[Grupo].Campos[Campo].Itens[Item].Legenda,
                        Ordem: Config.Grupos[Grupo].Campos[Campo].Itens[Item].Ordem
                    });
                }

            model.Campos.push(campo);
            indice++;
        }
        indice = 0;
    }
    return model;
}

function CallBackUpload(oJson) {
    //console.log(oJson);
}

angular.module('formulario').directive("diNull", function () {
    return {
        restrict: "E",
        replace: false,
        template: ""
    };
});

angular.module('formulario').directive('regexValidate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            var flags = attr.regexValidateFlags || '';
            var regexExpr;
            var strRegexExpr;
            var required = false;
            if (attr.regex_requerido) if (attr.regex_requerido == true) {
                required = true;
            }
            if (attr.regexValidate != "") {
                //get the regex flags from the regex-validate-flags="" attribute (optional)
                strRegexExpr = attr.regexValidate;
                if (strRegexExpr.substr(0, 1) == "/") {
                    strRegexExpr = strRegexExpr.substr(1);
                }
                if (strRegexExpr.substr(strRegexExpr.length - 1) == "i") {
                    strRegexExpr = strRegexExpr.substr(0, (strRegexExpr.length - 1));
                    flags = "i";
                }
                if (strRegexExpr.substr(strRegexExpr.length - 1) == "/") {
                    strRegexExpr = strRegexExpr.substr(0, (strRegexExpr.length - 1));
                }
                regexExpr = new RegExp(eval("/" + strRegexExpr + "/" + flags));
            }

            ctrl.$parsers.unshift(function (value) {
                if (value == null || value == undefined) {
                    value = '';
                }
                if (attr.regexValidate != "") {
                    //get the regex flags from the regex-validate-flags="" attribute (optional)
                    strRegexExpr = attr.regexValidate;

                    //console.log('strRegexExpr: ' + strRegexExpr);
                    if (strRegexExpr.substr(0, 1) == "/") {
                        strRegexExpr = strRegexExpr.substr(1);
                    }
                    if (strRegexExpr.substr(strRegexExpr.length - 1) == "i") {
                        strRegexExpr = strRegexExpr.substr(0, (strRegexExpr.length - 1));
                        flags = "i";
                    }
                    if (strRegexExpr.substr(strRegexExpr.length - 1) == "/") {
                        strRegexExpr = strRegexExpr.substr(0, (strRegexExpr.length - 1));
                    }
                    regexExpr = new RegExp(eval("/" + strRegexExpr + "/" + flags));
                }

                if (regexExpr instanceof RegExp) {
                    var valid = regexExpr.test(value);
                    if (!required) {
                        ctrl.$setValidity('regexValidate', true);
                        if (value == "") {
                            ctrl.$viewValue = undefined;
                            ctrl.$modelValue = undefined;
                            return "";
                        }
                    }
                    else if (required || value != "")
                        ctrl.$setValidity('regexValidate', valid);
                    return valid ? value : undefined;
                }
                else {
                    return value;
                }
            });

            ctrl.$formatters.unshift(function (value) {

                if (value == null || value == undefined) {
                    value = '';
                }

                if (attr.regexValidate != "") {
                    //get the regex flags from the regex-validate-flags="" attribute (optional)
                    strRegexExpr = attr.regexValidate;

                    //console.log('strRegexExpr: ' + strRegexExpr);
                    if (strRegexExpr.substr(0, 1) == "/") {
                        strRegexExpr = strRegexExpr.substr(1);
                    }
                    if (strRegexExpr.substr(strRegexExpr.length - 1) == "i") {
                        strRegexExpr = strRegexExpr.substr(0, (strRegexExpr.length - 1));
                        flags = "i";
                    }
                    if (strRegexExpr.substr(strRegexExpr.length - 1) == "/") {
                        strRegexExpr = strRegexExpr.substr(0, (strRegexExpr.length - 1));
                    }
                    regexExpr = new RegExp(eval("/" + strRegexExpr + "/" + flags));
                }

                if (regexExpr instanceof RegExp) {
                    if (!required) {
                        ctrl.$setValidity('regexValidate', true);
                    }
                    else if (required || value != "")
                        ctrl.$setValidity('regexValidate', regexExpr.test(value));
                    return value;
                }
                else {
                    return value;
                }
            });


            //Adicionado para checar alterações na expressão regular de acordo com o novo bolObrigatoriedadeCampo
            scope.$watch(function (scope) { return attr.regexValidate },
                function (newValue, oldValue) {

                    if (newValue != "") {
                        var strViewValue = '';
                        var strRegexExpr2 = newValue;
                        var regexExpr2;

                        if (ctrl.$viewValue) {
                            strViewValue = ctrl.$viewValue;
                        }
                        if (strViewValue == null || strViewValue == undefined) {
                            strViewValue = '';
                        }
                        if (strRegexExpr2.substr(0, 1) == "/") {
                            strRegexExpr2 = strRegexExpr2.substr(1);
                        }
                        if (strRegexExpr2.substr(strRegexExpr2.length - 1) == "i") {
                            strRegexExpr2 = strRegexExpr2.substr(0, (strRegexExpr2.length - 1));
                            flags = "i";
                        }
                        if (strRegexExpr2.substr(strRegexExpr2.length - 1) == "/") {
                            strRegexExpr2 = strRegexExpr2.substr(0, (strRegexExpr2.length - 1));
                        }

                        regexExpr2 = new RegExp(eval("/" + strRegexExpr2 + "/" + flags));

                        if (regexExpr2 instanceof RegExp) {
                            var valid2 = regexExpr2.test(strViewValue);
                            if (!required) {
                                ctrl.$setValidity('regexValidate', true);
                            }
                            else if (required || strViewValue != "")
                                ctrl.$setValidity('regexValidate', valid2);
                        }

                    }
                }
            );


        }
    };
});

angular.module('formulario').directive('mascara', ['$timeout', function ($templateCache, $compile) {
    return {
        require: '?ngModel',
        link: function ($scope, element, attrs, controller) {
            if (attrs.mascara) if (attrs.mascara != '') {
                if (attrs.mascara.indexOf("#") != -1 && (attrs.mascara.indexOf(",") != -1 || attrs.mascara.indexOf(".") != -1)) {
                    //Teste de correção de campos com decimais usando o plugin priceFormat
                    var temp = attrs.mascara.replace(/\*/g, '').replace(/\#/g, '').replace(/\./g, '');
                    var aux = [];
                    var cents_len = 0;
                    var total_len = 0;
                    var cents_sep = '';
                    var reference = 0;
                    if (attrs.mascara.indexOf("*") != -1) {
                        total_len = 15;
                        if (temp.indexOf(",") != -1) {
                            cents_sep = ',';
                            aux = temp.split(',');
                            cents_len = aux[1].length;
                        }
                    }
                    else {
                        if (temp.indexOf(",") != -1) {
                            cents_sep = ',';
                            aux = temp.split(',');
                            cents_len = aux[1].length;
                            total_len = aux[0].length + cents_len;
                        }
                        else {
                            total_len = temp.length;
                        }
                    }
                    if (attrs.ng_maxlength) if (!isNaN(attrs.ng_maxlength)) if (parseInt(attrs.ng_maxlength) > total_len) {
                        total_len = parseInt(attrs.ng_maxlength);
                        if (temp.indexOf(",") != -1) {
                            if (total_len <= 6) {
                                total_len = total_len + 1;
                            }
                            else {
                                //adiciona 25% por causa da pontuação, sem considerar as casas após a virgula
                                total_len = ((total_len - (cents_len + 1)) + Math.round((total_len - (cents_len + 1)) * 0.25)) + (cents_len + 1);
                            }
                        }
                        else {
                            if (total_len > 3) {
                                //adiciona 25% por causa da pontuação
                                total_len = total_len + Math.round(total_len * 0.25);
                            }
                        }
                    }
                    var min = 0;

                    element.maskMoney({
                        prefix: '',
                        suffix: '',
                        affixesStay: false,
                        decimal: ',',
                        thousands: '.',
                        allowNegative: false,
                        allowZero: true,
                        precision: cents_len
                    });
                }
                else {
                    element.mask(attrs.mascara, {
                        completed: function () {
                            controller.$setViewValue(this.val());
                            $scope.$apply();
                        }
                    });
                }
            }

        }
    };
}]);

angular.module('formulario').directive('markupFormulario', ['$timeout', function ($templateCache, $compile) {
    return {
        restrict: 'AEC',
        replace: false,
        scope: {
            idFormulario: "=idFormulario",
            idFormularioResposta: "=idFormularioResposta",
            bolClicado: "=bolClicado",
            readOnly: "=readOnly",
            autoControle: "=autoControle",
            showSaveButton: "=showSaveButton",
            idInscricao: "=idInscricao",
            idEdicao: "=idEdicao",
            etapaConfig: "=etapaConfig",
            showNavButton: "=showNavButton",
            defaultConfig: "=defaultConfig",
            mensagemRapida: "=mensagemRapida"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Formulario/formulario-index.html',
        link: function (scope, elem, attr, ctrl) {
            scope.loadInProgress = true;
            scope.startLoading = function () {
                scope.loadInProgress = true;
            };
            scope.stopLoading = function () {
                scope.loadInProgress = false;
                scope.safeApply();
                //console.log("diret");
                //console.log(scope);
            };
            scope.verificaLoading = function () {
                return scope.loadInProgress;
            };
            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };
        }
    };
}]);

angular.module('formulario').controller('controleFormulario', ['$http', '$scope', '$element', '$attrs', '$compile', '$timeout', '$modal', '$filter', 'constantes', 'projetoTools', function ($http, $scope, $element, $attrs, $compile, $timeout, $modal, $filter, constantes, projetoTools) {
    var formController = null;
    var that = this;
    this.initApi = true;
    $scope.alterado = false;
    $scope.submitted = false;
    $scope.saveInProgress = false;
    $scope.constantes = constantes;
    $scope.Inscricao = undefined;
    $scope.idInscricaoCtrl = $scope.idInscricao;
    //$scope.loadInProgress = true;  
    $scope.startLoading();

    $scope.getIds = function (arr) {
        if (arr instanceof Array) if (arr.length > 0) {
            return arr.map(function () { return arguments[0].Id });
        }
        return [];
    };

    $scope.getInscricao = function (idInscricao) {
        if (angular.isObject(constantes.Usuario)) if (angular.isArray(constantes.Usuario.TurmasInscritas)) {
            var tmp = $filter('filter')(constantes.Usuario.TurmasInscritas, { Inscricao: { Id: idInscricao } }, false);
            if (angular.isArray(tmp)) if (tmp.length == 1) if (angular.isObject(tmp[0])) if (angular.isObject(tmp[0].Inscricao)) {
                return tmp[0].Inscricao;
            }
        }
        if (angular.isObject(constantes.Usuario)) if (angular.isArray(constantes.Usuario.EquipesInscritas)) {
            var tmp = $filter('filter')(constantes.Usuario.EquipesInscritas, { Inscricao: { Id: idInscricao } }, false);
            if (angular.isArray(tmp)) if (tmp.length == 1) if (angular.isObject(tmp[0])) if (angular.isObject(tmp[0].Inscricao)) {
                return tmp[0].Inscricao;
            }
        }
        if ($scope.mensagemRapida) if (angular.isDefined($scope.mensagemRapida.EtapaInscricaoEnvio)) if (projetoTools.getInt($scope.mensagemRapida.EtapaInscricaoEnvio.Inscricao.Id) == idInscricao) {
            return angular.copy($scope.mensagemRapida.EtapaInscricaoEnvio.Inscricao);
        }
        return undefined;
    };
    $scope.loadInscricao = function () {
        if (($scope.idInscricao == undefined || $scope.idInscricao == 0) && angular.isObject($scope.mensagemRapida) && angular.isObject($scope.mensagemRapida.EtapaInscricaoEnvio) && angular.isObject($scope.mensagemRapida.EtapaInscricaoEnvio.Inscricao) && projetoTools.getInt($scope.mensagemRapida.EtapaInscricaoEnvio.Inscricao.Id) > 0) {
            $scope.idInscricao = projetoTools.getInt($scope.mensagemRapida.EtapaInscricaoEnvio.Inscricao.Id);
        }
        if (!$scope.Inscricao && $scope.idInscricao > 0) {
            $scope.Inscricao = $scope.getInscricao($scope.idInscricao);
        }
    };

    $scope.init = function () {
        //remapeia as funções para essa controller e para o escopo atual
        if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
            self.initApi = false;
        }
        if (self.initApi) {
            projetoTools.extendFunctions(self);
            projetoTools.extendFunctions($scope);
        }

        $scope.loadInscricao();
    };

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.$on("salvarFormularioRascunho", function (event, callback) {
        if (callback) {
            if (typeof (callback) == "function") {
                $scope.submitForm(callback);
            }
        }
    });

    $scope.$on("getFormStatus", function (event, callback) {
        if (angular.isObject($scope.FormularioResposta) && angular.isObject($scope.formularioEnvio)) {
            try {
                var objActual = {
                    idfr: $scope.FormularioResposta.Id,
                    pristine: $scope.formularioEnvio.$pristine,
                    dirty: $scope.formularioEnvio.$dirty,
                    valid: $scope.formularioEnvio.$valid
                };

                if (callback) {
                    if (typeof (callback) == 'object') {
                        //   alert('é um OBJETO');
                    }

                    if (typeof (callback) == "function") {
                        $scope.$eval(callback(objActual));
                    }
                }
            }
            catch (ex) {
                console.log("2. Não foi possível obter o status do formulário. Tente novamente.");
                //console.log("Erro:"+ex);
            }
        }
        else {
            console.log("1. Não foi possível obter o status do formulário. Tente novamente.");
        }
    });

    $scope.proximoPasso = function () {
        $scope.$emit("fnPassoProximo");
        return true;
    };

    $scope.anteriorPasso = function () {
        $scope.$emit("fnPassoAnterior");
        return true;
    };

    $scope.$watch("bolClicado", function (newVal, oldVal) {
        $scope.Config = null;
        $scope.FormularioResposta = null;
        //setTimeout(function () { $scope.atualizaForm(); }, 300);
        $timeout(function () {
            that.atualizaForm();
        }, 150);
    }, true);

    this.atualizaForm = function () {
        $scope.alterado = false;
        $scope.submitted = false;
        $scope.saveInProgress = false;
        $scope.listaComplexaCampos = [];
        $scope.headerListaComplexaCampos = [];
        $scope.startLoading();

        //INICIALIZAÇÃO
        //tenta inicializar com os dados passados via atributo 'data' na diretiva

        if ($scope.data) {
            if ($scope.data.Config)
                $scope.Config = $scope.data.Config;
            if ($scope.data.FormularioResposta) {
                $scope.FormularioResposta = $scope.data.FormularioResposta;
                $scope.FormularioResposta.IdProjetoEdicao = $scope.idEdicao;
            }
        }
        if (!$scope.Config || !$scope.FormularioResposta) {
            var path = "";

            var idInscricao = $scope.idInscricao;
            if (idInscricao == undefined && $scope.mensagemRapida) {
                idInscricao = $scope.mensagemRapida.EtapaInscricaoEnvio.Inscricao.Id;
            }

            if ($scope.idFormulario > 0 && $scope.idFormularioResposta > 0) {
                path = "/AVA/ProjetoApi/v1/Formulario/GetAll/";
            }
            else {
                if ($scope.idFormulario > 0) {
                    path = "/AVA/ProjetoApi/v1/Formulario/GetConfig/";
                }
            }

            //se controlado==false, a diretiva irá considerar que outro assumirá o controle
            if ($scope.autoControle === true || $scope.autoControle == undefined) {
                $scope.autoControle = true;
            }
            else {
                $scope.autoControle = false;
            }

            $http({
                url: path,
                method: "GET",
                cache: false,
                params: {
                    idFormulario: $scope.idFormulario,
                    idInscricao: idInscricao,
                    idFormularioResposta: $scope.idFormularioResposta,
                    intOrdem: $scope.intOrdem,
                    '_': new Date().getTime()
                }
            }).success(function (data) {
                if (data) if (data instanceof Object) {
                    if (data.Config) {

                        $scope.Config = data.Config;
                        $scope.listaComplexaCampos = [];

                        for (var indexGrupo = 0; indexGrupo < $scope.Config.Grupos.length; indexGrupo++) {
                            for (var indexCampo = 0; indexCampo < $scope.Config.Grupos[indexGrupo].Campos.length; indexCampo++) {
                                var campo = $scope.Config.Grupos[indexGrupo].Campos[indexCampo];
                                if (campo.FormularioCampoTipo.Id == 21) {
                                    $scope.listaComplexaCampos.push(campo);
                                }
                            }
                        }

                        $scope.headerListaComplexaCampos = []

                        for (var indexHeader = 0; indexHeader < $scope.listaComplexaCampos.length; indexHeader++) {
                            var item = $scope.listaComplexaCampos[indexHeader].Campos;
                            for (var i = 0; i < item.length; i++) {
                                var value = item[i];
                                var properties = {}
                                properties['Id'] = value.Id;
                                properties['IdCampoPai'] = value.IdCampoPai;
                                properties['Label'] = value.TituloVisualizacao;
                                $scope.headerListaComplexaCampos.push(properties);
                            }
                        }

                        //adequa a obrigatoriedade do campo, caso existam condições de obrigatoriedade conforme a categoria da inscrição
                        if ($scope.Inscricao) if (idInscricao > 0)
                            if (projetoTools.getInt($scope.Inscricao.Id) == idInscricao)
                                if (projetoTools.hasArrayElems($scope.Inscricao.Categorias)) {
                                    var possuiObrigatoriedadePorCategoria = false;
                                    if (projetoTools.hasArrayElems($scope.Config.Grupos)) {
                                        for (var grupo in $scope.Config.Grupos) {
                                            if (projetoTools.hasArrayElems($scope.Config.Grupos[grupo].Campos)) {
                                                for (var campo in $scope.Config.Grupos[grupo].Campos) {
                                                    if (!$scope.Config.Grupos[grupo].Campos[campo].BolObrigatorio && projetoTools.hasArrayElems($scope.Config.Grupos[grupo].Campos[campo].CategoriasObrigatorio)) {
                                                        if (projetoTools.ArrayIntersect($scope.Config.Grupos[grupo].Campos[campo].CategoriasObrigatorio.map(function () { return arguments[0].Id }), $scope.Inscricao.Categorias.map(function () { return arguments[0].Id })).length > 0) {
                                                            //se detectado que o campo é obrigatório para determinada categoria 
                                                            //e "bater" as categorias definidas para o campo com as categorias da inscricao
                                                            //então seta o campo como obrigatório
                                                            $scope.Config.Grupos[grupo].Campos[campo].BolObrigatorio = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                        if (!$scope.FormularioResposta) {
                            var temp = FormularioResposta($scope.Config, $scope.idEdicao);
                            $scope.FormularioResposta = temp;
                            var bolGerado = false;
                            if (temp) if (!isNaN(temp.Formulario.Id)) {
                                bolGerado = true;
                            }
                            if (!bolGerado)
                                throw new Error("ERRO: Não foi possível obter o modelo dos dados para o formulário");
                        }
                    }
                    if (data.FormularioResposta) if (data.FormularioResposta.Formulario) if (data.FormularioResposta.Formulario.Id) if (!isNaN(data.FormularioResposta.Formulario.Id)) {
                        $scope.FormularioResposta = data.FormularioResposta;

                        //correções dos bugs para o funcionamento correto do Angular
                        for (var campo in $scope.FormularioResposta.Campos) {

                            //correções nos campos que possuem opções
                            if ($scope.FormularioResposta.Campos[campo].Opcoes instanceof Array) {
                                for (var opcao in $scope.FormularioResposta.Campos[campo].Opcoes) {
                                    //correção para o BUG nos campos que possuem opções (checkbox,select e radio), resetando os idFRCO para 0 para casar o modelo com as opçoes     
                                    $scope.FormularioResposta.Campos[campo].Opcoes[opcao].Id = 0;
                                }

                                //correção para o BUG do Radio(tipos 11 e 12), corrige as referências das respostas carregadas para campos do tipo radio
                                if ($scope.Config) if ($scope.FormularioResposta.Campos[campo]) if ($scope.FormularioResposta.Campos[campo].FormularioCampo) if ($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo) if ($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id) if (Array(11, 12).indexOf($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id) != -1) if ($scope.FormularioResposta.Campos[campo].Opcoes) if ($scope.FormularioResposta.Campos[campo].Opcoes instanceof Array) if ($scope.FormularioResposta.Campos[campo].Opcoes.length > 0) {
                                    for (var ConfigGrupo in $scope.Config.Grupos) {
                                        for (var ConfigCampo in $scope.Config.Grupos[ConfigGrupo].Campos) {
                                            if ($scope.Config.Grupos[ConfigGrupo].Campos[ConfigCampo].Id == $scope.FormularioResposta.Campos[campo].FormularioCampo.Id) {
                                                for (var OpcaoConfig in $scope.Config.Grupos[ConfigGrupo].Campos[ConfigCampo].Opcoes) {
                                                    if ($scope.Config.Grupos[ConfigGrupo].Campos[ConfigCampo].Opcoes[OpcaoConfig].Id == $scope.FormularioResposta.Campos[campo].Opcoes[0].Opcao.Id) {
                                                        $scope.FormularioResposta.Campos[campo].Opcoes[0].Opcao = $scope.Config.Grupos[ConfigGrupo].Campos[ConfigCampo].Opcoes[OpcaoConfig];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            //tratamento para a correta formatação dos itens relacionados no campo do tipo 17 - vínculo de materiais em etapas anteriores
                            if ($scope.FormularioResposta.Campos[campo].Itens instanceof Array) {
                                if ($scope.FormularioResposta.Campos[campo]) if ($scope.FormularioResposta.Campos[campo].FormularioCampo) if ($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo) if ($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id) if (parseInt($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id) == 17) if ($scope.FormularioResposta.Campos[campo].Itens) if ($scope.FormularioResposta.Campos[campo].Itens instanceof Array) if ($scope.FormularioResposta.Campos[campo].Itens.length >= 0) {
                                    for (var Item in $scope.FormularioResposta.Campos[campo].Itens) {
                                        if (typeof ($scope.FormularioResposta.Campos[campo].Itens[Item].Legenda) == "string") {
                                            try {
                                                var newObj = JSON.parse($scope.FormularioResposta.Campos[campo].Itens[Item].Legenda);
                                                $scope.FormularioResposta.Campos[campo].Itens[Item].Legenda = newObj;
                                            }
                                            catch (ex) {
                                                //console.log("ocorreu um erro na conversão dos dados do item");
                                            }
                                        }
                                    }
                                }
                            }

                            $scope.Ordem = 0;

                            if ($scope.FormularioResposta.Campos[campo].ItensListaComplexa instanceof Array && $scope.FormularioResposta.Campos[campo].ItensListaComplexa.length > 0) {
                                var sorted = {};
                                var count = 0, qtdeColuna = 0;
                                var arrayOfArrays = new Array();
                                var itensArray = $scope.FormularioResposta.Campos[campo].ItensListaComplexa;

                                $scope.FormularioResposta.Campos[campo].ItensListaComplexa = new Array();
                                for (var i = 0, max = itensArray.length; i < max; i++) {
                                    if (sorted[itensArray[i].Ordem] == undefined) {
                                        sorted[itensArray[i].Ordem] = [];
                                    }
                                    sorted[itensArray[i].Ordem].push(itensArray[i]);
                                }

                                var firstItem = itensArray[0];
                                var ordem = firstItem.Ordem;
                                for (var i = 0, max = itensArray.length; i < max; i++) {
                                    if (itensArray[i].Ordem === ordem) {
                                        qtdeColuna++;
                                    } else {
                                        break;
                                    }
                                }

                                var endColuna = qtdeColuna;
                                while (count < itensArray.length) {
                                    var miniArray = itensArray.slice(count, endColuna);
                                    arrayOfArrays.push(miniArray);
                                    count = count + qtdeColuna;
                                    endColuna = endColuna + qtdeColuna;
                                }

                                for (var key in arrayOfArrays) {
                                    var valor = arrayOfArrays[key]
                                    var newItem = [];
                                    for (var i in valor) {
                                        var value = valor[i];
                                        var properties = {}
                                        properties['Id'] = value.Id;
                                        properties['IdFormularioCampo'] = value.FormularioCampo.Id;
                                        properties['Property'] = value.Property;
                                        properties['Ordem'] = value.Ordem;
                                        properties['Coluna'] = value.Coluna;
                                        newItem.push(properties);
                                    }
                                    $scope.FormularioResposta.Campos[campo].ItensListaComplexa.push(newItem);
                                }
                            }
                        }
                    }
                }
                if (!$scope.Config) {
                    throw new Error("ERRO: Não foi possível obter os dados de configuração do formulário");
                }

                if ($scope.formularioEnvio) {
                    $scope.formularioEnvio.$setPristine();
                }

                $scope.safeApply();

            }).error(function (data, status, headers, config) {
                console.log("Ocorreu um erro ao tentar carregar os dados dos formularios. [Formulario.js]");
            }).then(function (res) {
                //console.log("then ajax");
            }).finally(function (res) {
                //console.log("finally ajax");
                $scope.stopLoading();
            });
        }
    }

    $scope.applyScope = function () {
        $scope.$apply();
    };

    this.scopeApply = function () {
        $scope.$apply();
    };

    $scope.getRegex = function (expressao) {
        var reg = new RegExp(eval(expressao));
        return reg;
    };

    //MÉTODOS DO CONTROLE
    //upload geral
    $scope.abreUpload = function (idFerramentaTipo, idFerramenta, ObjetoAlvo, idx) {
        //redefine a função de callback do uploadAVA
        //redefine a função para incorporar o próprio modelo na chamada de callback para atualizar o objeto alvo no retorno
        window.CallbackUpload = function (oJson) {
            var file = oJson.arrayArquivo[0];
            ObjetoAlvo.IdArquivo = file.id;
            //ObjetoAlvo.Valor = "http://" + document.location.hostname + file.strDiretorio + '/' + file.strArquivo + file.strExtensao;
            ObjetoAlvo.Valor = file.strDiretorio + '/' + file.strArquivo + file.strExtensao;
            try {
                //$scope.FormularioResposta.Campos[idx].Valor = "http://" + document.location.hostname + file.strDiretorio + '/' + file.strArquivo + file.strExtensao;
                $scope.FormularioResposta.Campos[idx].Valor = file.strDiretorio + '/' + file.strArquivo + file.strExtensao;
                $scope.FormularioResposta.Campos[idx].IdArquivo = file.id;
                $scope.formularioEnvio.$setDirty();
            }
            catch (ex) {
                //console.log(ex.toString());
            }
            //aplica as alterações no scopo
            $scope.$apply();
        }

        var flagContinua = true;
        $.fancybox.showLoading();
        if (flagContinua) {
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
            $.fancybox.hideLoading();
        }
    };

    //uploads específicos
    $scope.abreUploadArquivo = function (ObjetoAlvo, idx) {
        $scope.abreUpload(42, 1, ObjetoAlvo, idx);
    };
    $scope.abreUploadAudio = function (ObjetoAlvo, idx) {
        $scope.abreUpload(40, 1, ObjetoAlvo, idx);
    };
    $scope.abreUploadImagem = function (ObjetoAlvo, idx) {
        $scope.abreUpload(41, 1, ObjetoAlvo, idx);
    };

    $scope.removerArquivo = function (ObjetoAlvo, Campo, idx) {
        var old_valor = ObjetoAlvo.Valor;

        ObjetoAlvo.IdArquivo = 0;
        ObjetoAlvo.Valor = "";

        $scope.FormularioResposta.Campos[Campo.Indice].IdArquivo = 0;
        $scope.FormularioResposta.Campos[Campo.Indice].Valor = "";

        //se for do tipo audio, para e remove o player
        if (Array(1, 2).indexOf(Campo.FormularioCampoTipo.Id) != -1) {
            if (old_valor.toLowerCase().indexOf(".wma") != -1 || old_valor.toLowerCase().indexOf(".wav") != -1) {
                jQuery("#classic_audio" + idx).remove();
            }
            else {
                if (jQuery("#audio" + idx).size() > 0) {
                    if (jQuery("#audio" + idx)[0].paused == false) {
                        jQuery("#audio" + idx).get(0).pause();
                    }
                    jQuery("#audio" + idx).remove();
                }
            }
        }
        $scope.formularioEnvio.$setDirty();
        $timeout(function () { $scope.$apply() });
    };

    $scope.alterarVideo = function (ObjetoAlvo, idx) {
        $scope.$apply();
    };

    $scope.getFileName = function (fullfilepath) {
        var retorno = "";
        if (fullfilepath.indexOf("/") != -1) {
            retorno = fullfilepath.substr(fullfilepath.lastIndexOf("/") + 1);
        }
        else {
            retorno = fullfilepath;
        }
        return retorno;
    };

    $scope.playAudio = function (elm, ObjetoAlvo, id) {
        var bolClassic = false;
        if (ObjetoAlvo.Valor.toLowerCase().indexOf(".wma") != -1) {
            bolClassic = true;
            jQuery('body > .audioPlayer').remove();
            jQuery('body > .audioPlayerClassic').remove();
            if (jQuery("#caller" + id).hasClass("play")) {
                if (jQuery("#classic_audio" + id).size() == 0) {
                    jQuery('body').append("<embed id='classic_audio" + id + "' name='classic_audio" + id + "' class='audioPlayerClassic' style='display:block;' src='" + ObjetoAlvo.Valor + "' type='video/x-ms-asf-plugin' pluginspage='http://www.microsoft.com/netshow/download/player.htm' autostart=true transparentatstart=true width='0' height='0'  ShowStatusBar=false animationatstart=true  showcontrols=0 showpositioncontrols=0></embed>");
                }
                jQuery(".audioPlayerCall").removeClass("stop").addClass("play");
                jQuery("#caller" + id).removeClass("play").addClass("stop");
            }
            else {
                if (navigator.userAgent.indexOf("MSIE")) {
                    var intervalo = setTimeout(function () {
                        jQuery(".audioPlayerCall").removeClass("stop").addClass("play");
                    }, 500);
                }
                else {
                    jQuery(".audioPlayerCall").removeClass("stop").addClass("play");
                }
            }
        }
        else {
            jQuery('body > .audioPlayerClassic').remove();
            if (jQuery("#audio" + id).size() == 0) {
                var type = "";
                switch (ObjetoAlvo.Valor.toLowerCase().substr(ObjetoAlvo.Valor.lastIndexOf('.') + 1)) {
                    case 'mp3':
                        type = 'audio/mpeg';
                        break;
                    default:
                        type = '';
                        break;
                }
                jQuery('body').append("<audio id='audio" + id + "' class='audioPlayer' style='display:none' controls><source src='" + ObjetoAlvo.Valor + "' " + type + "></audio>");
            }
            var volume = 0.7;
            try {
                jQuery("#audio" + id)[0].currentTime = 0;
            } catch (e) { }
            jQuery(".audioPlayerCall").removeClass("stop").addClass("play");
            if (jQuery("#audio" + id)[0].paused == false) {
                jQuery(".audioPlayer").each(function () {
                    var idaux = jQuery(this).get(0).id.replace("audio", "");
                    jQuery(this).get(0).pause();
                });
            }
            else {
                jQuery(".audioPlayer").each(function () {
                    var idaux = jQuery(this).get(0).id.replace("audio", "");
                    jQuery(this).get(0).pause();

                });
                jQuery("#audio" + id)[0].play();
                jQuery("#caller" + id).removeClass("play").addClass("stop");
            }
        }
        var rndTemp = "rnd" + Math.round(Math.random() * 100000000);
    };

    $scope.openArquivo = function (path, w, h) {
        var winl = (screen.width - w) / 2;
        var wint = (screen.height - h) / 2;
        var myname = "rnd" + Math.round(Math.random() * 100000000);
        var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=yes,resizable=yes,toolbar=yes,location=yes,status=yes,menubar=yes'
        var lista = window.open(path, myname, winprop)
        if (parseInt(navigator.appVersion) >= 4) {
            lista.window.focus();
        }
    };

    $scope.prevGaleriaResultado = function (id) {
        var galeria = angular.element("#galeria-" + id);
        var elmAtivo = galeria.find("li:not(.ng-hide)");

        if (elmAtivo.prev().length > 0) {
            elmAtivo.addClass("ng-hide");
            elmAtivo.prev().removeClass("ng-hide");
        } else {
            galeria.find("li").addClass("ng-hide");
            galeria.find("li").last().removeClass("ng-hide");
        }
    };

    $scope.nextGaleriaResultado = function (id) {
        var galeria = angular.element("#galeria-" + id);
        var elmAtivo = galeria.find("li:not(.ng-hide)");

        if (elmAtivo.next().length > 0) {
            elmAtivo.addClass("ng-hide");
            elmAtivo.next().removeClass("ng-hide");
        } else {
            galeria.find("li").addClass("ng-hide");
            galeria.find("li").first().removeClass("ng-hide");
        }
    };

    $scope.verificaTotalGrupoResposta = function (objCampos, IdGrupoCampo) {
        var totalResposta = 0;
        angular.forEach(objCampos, function (valor, chave) {
            if ($scope.FormularioResposta.Campos[valor.Indice].Valor != null && $scope.FormularioResposta.Campos[valor.Indice].Valor != '') {
                totalResposta++;
            }
        });

        if (totalResposta > 1) {
            angular.element(".prev-" + IdGrupoCampo).removeClass("ng-hide");
            angular.element(".next-" + IdGrupoCampo).removeClass("ng-hide");
        }

        if (totalResposta > 0) {
            //angular.element("#galeria-" + IdGrupoCampo).find("li:first").removeClass("ng-hide");
        }

        return totalResposta;
    };

    $scope.showFirstImgGaleria = function () {
        if (angular.element(".galeria-slide").length > 0) {
            $timeout(function () {
                angular.element(".galeria-slide").find("ul li:first").removeClass("ng-hide");
            }, 100);
        }
    };

    $scope.openFancy = function (path, width, height) {
        jQuery.fancybox({
            'transitionIn': 'none',
            'transitionOut': 'none',
            'titlePosition': 'inside',
            'titleShow': true,
            'showNavArrows': false,
            'autoScale': false,
            'autoDimensions': true,
            'showCloseButton': true,
            'width': width,
            'height': height,
            'overlayColor': '#FFFFFF',
            'scrolling': 'no',
            'href': path
        });
    };

    $scope.adicionarItemLista = function (CampoAlvo, idxCampo, classe) {
        if (jQuery('#' + classe).eq(0).val() != '') {

            CampoAlvo.Itens.push({
                "Ordem": CampoAlvo.Opcoes.length + 1,
                "Opcao": jQuery('#' + classe).eq(0).val(),
                "Valor": jQuery('#' + classe).eq(0).val(),
                "Legenda": jQuery('#' + classe + "_legenda").eq(0).val()
            });

            jQuery('#' + classe).eq(0).val("")
            jQuery('#' + classe + "_legenda").eq(0).val("")

            setTimeout(function () { $scope.$apply(); }, 500);
        }
        else {
            //erro
        }
    };

    $scope.adicionarItemListaComplexa = function (idCampo, classe) {

        var CampoAlvo = $scope.FormularioResposta.Campos.find(function (obj) {
            return obj.FormularioCampo.Id == idCampo;
        })

        var campoListaComplexa = $scope.listaComplexaCampos.find(function (obj) {
            return obj.Id == idCampo;
        })

        var length = Object.keys($scope.FormularioResposta.CamposLista).length;
        if (length === campoListaComplexa.Campos.length && CampoAlvo.ItensListaComplexa.length < CampoAlvo.FormularioCampo.TamanhoMaximo) {

            var idFilhos = new Array();

            for (var index = 0; index < campoListaComplexa.Campos.length; index++) {
                idFilhos.push(campoListaComplexa.Campos[index].Id);
            }

            var ordemValues = new Array();
            for (var index = 0; index < CampoAlvo.ItensListaComplexa.length; index++) {
                var item = CampoAlvo.ItensListaComplexa[index];
                for (var i = 0; i < item.length; i++) {
                    ordemValues.push(item[i].Ordem);
                }
            }

            var newItem = [];
            var ordem = 0;
            if (ordemValues.length > 0) {
                ordem = Math.max.apply(Math, ordemValues);
                ordem++;
            }

            var count = 0;
            for (var key in $scope.FormularioResposta.CamposLista) {
                var value = $scope.FormularioResposta.CamposLista[key];
                var properties = {}
                properties['Id'] = 0;
                properties['IdFormularioCampo'] = idFilhos[count];
                properties['Property'] = value.Valor;
                properties['Ordem'] = ordem;
                properties['Coluna'] = count;
                newItem.push(properties);
                count++;
            }

            CampoAlvo.ItensListaComplexa.push(newItem);

            $scope.FormularioResposta.CamposLista = new Array();

            setTimeout(function () { $scope.$apply(); }, 500);
        }
    };

    $scope.formularioRespostaListaComplexa = function (idCampo) {
        var CampoAlvo = $scope.FormularioResposta.Campos.find(function (obj) {
            return obj.FormularioCampo.Id == idCampo;
        })
        return CampoAlvo.ItensListaComplexa;
    };

    $scope.GetFormularioResposta = function (idCampo) {
        var CampoAlvo = $scope.FormularioResposta.Campos.find(function (obj) {
            return obj.FormularioCampo.Id == idCampo;
        })
        return CampoAlvo;
    };

    $scope.associacoesAtualizadas = true;

    $scope.removerItemLista = function (lista, idxCampo, item_index, classe) {
        lista.splice(item_index, 1);
        $scope.formularioEnvio.$setDirty();
        $scope.associacoesAtualizadas = false;
        $timeout(function () {
            $scope.associacoesAtualizadas = true;
        });
    };

    $scope.getCaracteresRestantes = function (id, min, max) {
        if (jQuery(id).size() > 0) {
            if ((max - jQuery(id).val().length) < 0 && jQuery(id).val().toString().length > 0) {
                jQuery(id).removeClass('ng-invalid')
            }

            return max - jQuery(id).val().length;
        }
        return undefined;
    }

    $scope.testaValorPorRegex = function (required, valor, regex, min, max, tipo) {
        if (valor == null || valor == undefined) {
            valor = "";
        }
        if (regex != "") {
            var flags;
            var regexExpr;
            var strRegexExpr = regex;
            var bolPadrao = true;
            if (strRegexExpr) {
                if (strRegexExpr instanceof RegExp) {
                    bolPadrao = false;
                    if (!required && valor == "") {
                        return true;
                    }
                    return strRegexExpr.test(valor);
                }
                else if (strRegexExpr.length > 0) {
                    try {
                        regexExpr = new RegExp(eval(strRegexExpr));
                        bolPadrao = false;
                    }
                    catch (ex) {
                        console.log("expressao regular inválida:" + ex.toString());
                        regexExpr = null;
                    }
                }
                if (regexExpr instanceof RegExp) {
                    bolPadrao = false;
                    if (valor === "") {
                        return false;
                    }

                    return regexExpr.test(valor);
                }
            }
            if (!bolPadrao) {
                return $scope.testaValor(valor, min, max, tipo);
            }
        }
        else {
            return $scope.testaValor(valor, min, max, tipo);
        }
    };

    $scope.testaValor = function (valor, min, max, tipo) {
        var retorno = false;
        if (valor) if (valor != '') {
            retorno = true;
        }
        if (retorno) if (tipo) if (!isNaN(tipo)) {
            switch (parseInt(tipo)) {
                case 1:
                    //audio
                    if (valor.indexOf('mp3') == -1)
                        retorno = false;
                    break;
                default:
                    //padrão min-max
                    if (retorno) if (min) if (!isNaN(min)) if (parseInt(min) > 0) {
                        if (valor.length < parseInt(min)) {
                            retorno = false;
                        }
                    }
                    break;
            }
        }
        if (retorno) if (min) if (!isNaN(min)) if (parseInt(min) > 0) {
            if (valor.length < parseInt(min)) {
                retorno = false;
            }
        }
        return retorno;
    };

    $scope.testaChecked = function (required, valores, min, max) {
        var requerido = required;
        if (requerido && valores && valores instanceof Array) {
            if ((min > 0) || (max > 0)) {
                if (((min > 0) && (valores.length >= min)) && ((max > 0) && (valores.length <= max))) {
                    requerido = false;
                }
            }
            else if (valores.length > 0) {
                requerido = false;
            }
        }
        return requerido;
    };

    $scope.testaSelect = function (required, valores) {
        var requerido = required;

        if (requerido)
            if (valores)
                if (valores instanceof Array)
                    if (valores.length > 0)
                        if (valores[0])
                            if (valores[0].Opcao)
                                if (valores[0].Opcao instanceof Object)
                                    if (valores[0].Opcao.Id)
                                        if (!isNaN(valores[0].Opcao.Id)) {
                                            requerido = false;
                                        }
        return requerido;
    };

    $scope.testaListaComplexa = function (required, valores) {
        var requerido = required;

        if (requerido)
            if (valores)
                if (valores instanceof Array)
                    if (valores.length > 0)
                        if (!isNaN(valores[0])) {
                            requerido = false;
                        }
        return requerido;
    };

    $scope.testaSelectValor = function (required, valores) {
        var retorno = false;
        if (required)
            if (valores)
                if (valores instanceof Array)
                    if (valores.length > 0)
                        if (valores[0])
                            if (valores[0].Opcao)
                                if (valores[0].Opcao instanceof Object)
                                    if (valores[0].Opcao.Id)
                                        if (!isNaN(valores[0].Opcao.Id)) {
                                            retorno = true;
                                        }
        return retorno;
    };

    $scope.opcoesOptGroup = function (oOpcoes) {
        var aOpcoesRetorno = [];
        var aCategoria = [];

        //aCategoria = $filter('filter')(oOpcoes, { Ordem: 0 }, true);
        angular.forEach(oOpcoes, function (valor, chave) {
            var valAux = valor;

            //console.log(valAux);
            if (valAux.Ordem == 0) {
                aCategoria.push(valAux);
            }
            else {
                valAux["strGrupo"] = "";
                aOpcoesRetorno.push(valAux);
            }
        });

        for (var i = 0; i < aOpcoesRetorno.length; i++) {
            for (var j = 0; j < aCategoria.length; j++) {
                if (aOpcoesRetorno[i].Ordem == aCategoria[j].Id) {
                    aOpcoesRetorno[i].strGrupo = aCategoria[j].Opcao;
                }
            }
        }
        //console.log(aCategoria);

        return aOpcoesRetorno;
    };

    $scope.getOrdemOpcaoOptGroup = function (campo, idOpcao, bolGrupoOpcao) {

        var aOpcoes = [];
        var aCategoria = [];

        var strClassGrupo = '';
        var strClassOpcao = '';

        angular.forEach(campo.Opcoes, function (valor, chave) {
            var valAux = valor;

            if (valAux.Ordem == 0) {
                valAux["intOrdemCategoria"] = '0';
                aCategoria.push(valAux);
            }
            else {
                valAux["intOrdemOpcao"] = '0';
                aOpcoes.push(valAux);
            }
        });


        aOpcoes = $filter('orderBy')(aOpcoes, ['Opcao', 'Id'], false);
        aCategoria = $filter('orderBy')(aCategoria, ['Opcao', 'Id'], false);

        //aOpcoes = $filter('orderBy')(aOpcoes, ['Id'], false);
        //aCategoria = $filter('orderBy')(aCategoria, ['Id'], false);

        for (var i = 0; i < aCategoria.length; i++) { aCategoria[i].intOrdemCategoria = '' + (i + 1); }
        for (var j = 0; j < aOpcoes.length; j++) {

            aOpcoes[j].intOrdemOpcao = '' + (j + 1);
            if (aOpcoes[j].Id == idOpcao) {
                for (var k = 0; k < aCategoria.length; k++) {
                    if (aCategoria[k].Id == aOpcoes[j].Ordem) {
                        strClassGrupo = 'optgroup-' + aCategoria[k].intOrdemCategoria;
                    }
                }
                strClassOpcao = 'opt-' + aOpcoes[j].intOrdemOpcao;
            }
        }

        //console.log('===aOpcoes');
        //console.log(aOpcoes);

        //console.log('===aCategoria');
        //console.log(aCategoria);    

        if (bolGrupoOpcao) {
            return strClassGrupo;
        }
        else {
            return strClassOpcao;
        }

    };

    $scope.updateScope = function () {
        $timeout(function () { $scope.$apply() }, 1000);
    }
    $scope.compareModelId = function (Opcao, Model) {
        if (Opcao) if (Model) {
            if (Opcao.Id == Model.Opcao.Id)
                return true;
        }
        return false;
    };

    $scope.atualizaRadio = function (indice, obj) {
        $timeout(function () {
            $scope.FormularioResposta.Campos[indice].Opcoes[0] = obj;
            $scope.$apply();
        });
    };

    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    }
    $scope.compareObj = function (Obj1, Obj2) {
        var equal = false;
        try {
            if (JSON.stringify(JSON.parse(JSON.stringify(Obj1))) === JSON.stringify(JSON.parse(JSON.stringify(Obj2)))) {
                equal = true;
            }
        } catch (ex) {

        }

        return equal;
    };
    $scope.compareId = function (IdOpcao, IdModel) {
        if (IdOpcao) if (IdModel) if (!isNaN(IdOpcao)) if (!isNaN(IdModel)) {
            if (IdOpcao == IdModel)
                return true;
        }
        return false;
    };
    $scope.getRadioObj = function (Opcao) {
        var obj = {
            Id: 0,
            formularioRespostaCampo: null,
            Opcao: {
                Id: Opcao.Id,
                FormularioCampo: null,
                Opcao: Opcao.Opcao,
                Imagem: Opcao.Imagem,
                Ordem: Opcao.Ordem
            },
            Ordem: 1
        }
        return obj;
    };


    $scope.setOpcaoParaRadio = function (opcao, indice) {
        $scope.formularioEnvio.$setDirty();
        if (opcao) if (!isNaN(opcao.Ordem)) {
            $scope.FormularioResposta.Campos[indice].Opcoes = new Array({
                Id: 0,
                Opcao: opcao,
                Ordem: opcao.Ordem
            });
        }
    };

    $scope.$watch('formularioEnvio.$pristine', function (newValue, oldValue) {
        if (newValue == false)
            $scope.alterado = true;
    });

    $scope.totalValidosNoGrupoDeMidias = function (idGrupo) {
        var soma = 0;
        var indiceGrupoAtual = projetoTools.indexOfId($scope.Config.Grupos, idGrupo);
        if (indiceGrupoAtual != -1) {
            for (var Campo in $scope.Config.Grupos[indiceGrupoAtual].Campos) {
                var FormRespCampo = null;
                for (var RespCampo in $scope.FormularioResposta.Campos) {
                    if ($scope.FormularioResposta.Campos[RespCampo].FormularioCampo.Id == $scope.Config.Grupos[indiceGrupoAtual].Campos[Campo].Id) {
                        FormRespCampo = RespCampo
                        break;
                    }
                }
                if (FormRespCampo != null) {
                    //conforme o tipo de campo, seleciona o método adequado para o teste
                    switch ($scope.Config.Grupos[indiceGrupoAtual].Campos[Campo].FormularioCampoTipo.Id) {
                        case 20:
                        case 10:
                            //select                        
                            if ($scope.testaSelect(true, $scope.FormularioResposta.Campos[FormRespCampo].Opcoes)) {
                                soma++;
                            }
                            break;
                        case 9:
                        case 11:
                        case 12:
                            //radio
                            if (!$scope.testaChecked(true, $scope.FormularioResposta.Campos[FormRespCampo].Opcoes, $scope.Config.Grupos[indiceGrupoAtual].Campos[Campo].TamanhoMinimo, $scope.Config.Grupos[indiceGrupoAtual].Campos[Campo].TamanhoMaximo)) {
                                soma++;
                            }
                            break;
                        default:
                            if ($scope.testaValor($scope.FormularioResposta.Campos[FormRespCampo].Valor)) {
                                soma++;
                            }
                            break;
                    }
                }
            }
        }
        return soma;
    }

    $scope.getRequeridoPorRequisitoDoGrupoDeMidias = function (ValorCampo, idGrupo, BolObrigatorio) {
        var bolRequerido = true;
        var indiceGrupoAtual = projetoTools.indexOfId($scope.Config.Grupos, idGrupo);
        if (indiceGrupoAtual != -1) {
            var ItensMinimo = projetoTools.getInt($scope.Config.Grupos[indiceGrupoAtual].ItensMinimo);
            var bolConsiderarTotalizacaoDoGrupo = false;
            if (ItensMinimo > 0)
                bolConsiderarTotalizacaoDoGrupo = true;
            if (!bolConsiderarTotalizacaoDoGrupo) {
                bolRequerido = BolObrigatorio;
                if (BolObrigatorio && $scope.testaValor(ValorCampo)) {
                    bolRequerido = false;
                }
            }
            if (bolConsiderarTotalizacaoDoGrupo && ($scope.totalValidosNoGrupoDeMidias(idGrupo) >= ItensMinimo)) {
                bolRequerido = false;
            }
        }
        return bolRequerido;
    }

    $scope.validaCampoPossuiValor = function (FormularioResposta, Campo, GrupoDeCampos) {
        //rotina para validar se o campo pode ser exibido no modo de visualização
        var retorno = false;
        var iindice = Campo.Indice;
        var id = Campo.Id;
        if (iindice != -1) {
            var ValorCampo = FormularioResposta.Campos[iindice].Valor;
            var TipoCampo = Campo.FormularioCampoTipo.Id;
            var bolGrupoDeValidacao = false;
            if (GrupoDeCampos.ItensMaximo == 0 || !GrupoDeCampos.ItensMaximo || GrupoDeCampos.ItensMaximo == '') {
                bolGrupoDeValidacao = true;
            }
            if (bolGrupoDeValidacao) {
                //confere se pelo menos um elemento do grupo de validação foi preenchido
                if ($scope.totalValidosNoGrupoDeMidias(GrupoDeCampos.Id) > 0) {
                    retorno = true;
                }
            }
            else {
                switch (TipoCampo) {
                    case 8:
                        //listagem dinâmica cadastrada pelo utilizador
                        retorno = !$scope.testaChecked(true, FormularioResposta.Campos[iindice].Itens, 1, 999);
                        break;
                    case 9:
                        //CHECKBOX GROUP
                        retorno = !$scope.testaChecked(true, FormularioResposta.Campos[iindice].Opcoes, 1, 999);
                        break;
                    case 20:
                    case 10:
                        //CAIXA DE SELEÇÃO DO TIPO COMBOBOX
                        retorno = !$scope.testaSelect(true, FormularioResposta.Campos[iindice].Opcoes);
                        break;
                    case 11:
                        //RADIO GROUP
                        retorno = !$scope.testaChecked(true, FormularioResposta.Campos[iindice].Opcoes, 1, 999);
                        break;
                    case 12:
                        //RADIO GROUP COM IMAGEM
                        retorno = !$scope.testaChecked(true, FormularioResposta.Campos[iindice].Opcoes, 1, 999);
                        break;
                    case 17:
                        //listagem dinâmica cadastrada pelo utilizador
                        retorno = !$scope.testaChecked(true, FormularioResposta.Campos[iindice].Itens, 1, 999);
                        break;
                    case 21:
                        //lista complexa
                        retorno = $scope.testaListaComplexa(true, FormularioResposta.Campos[iindice].ItensListaComplexa);
                        break;
                    default:
                        var idFormResposta = FormularioResposta.Campos[iindice].FormularioCampo.Id;
                        var idCampo = Campo.Id;
                        if (idFormResposta === idCampo) {
                            retorno = $scope.testaValor(FormularioResposta.Campos[iindice].Valor);
                        } else {
                            var CampoAlvo = $scope.FormularioResposta.Campos.find(function (obj) {
                                return obj.FormularioCampo.Id == idCampo;
                            })
                            retorno = $scope.testaValor(CampoAlvo.Valor);
                        }
                        break;
                }
            }
        }
        return retorno;
    };

    $scope.getModoExibirLabelParaCampo = function (idGrupo, idCampo) {
        /*
        Exibe o label nos seguintes casos:
            - Todos os campos em grupos mistos
            - somente o 1º campo em grupos de campos homogêneos
        */
        var retorno = 'default';
        var indiceGrupoAtual = undefined;
        var indiceCampoAtual = undefined;
        if (idGrupo > 0 && angular.isArray($scope.Config.Grupos)) if ($scope.Config.Grupos.length > 0)
            indiceGrupoAtual = projetoTools.indexOfId($scope.Config.Grupos, idGrupo);
        if (indiceGrupoAtual && idCampo > 0 && angular.isArray($scope.Config.Grupos[indiceGrupoAtual].Campos) && $scope.Config.Grupos[indiceGrupoAtual].Campos.length > 0) {
            indiceCampoAtual = projetoTools.indexOfId($scope.Config.Grupos[indiceGrupoAtual].Campos, idCampo);
            retorno = 'none';
            var counter = 0;
            var bolGrupoMisto = false;
            var temp = ",";
            if (angular.isArray($scope.Config.Grupos[indiceGrupoAtual].Campos)) if ($scope.Config.Grupos[indiceGrupoAtual].Campos.length > 1) for (var AuxCampo in $scope.Config.Grupos[indiceGrupoAtual].Campos) {

                if (temp.indexOf("," + $scope.Config.Grupos[indiceGrupoAtual].Campos[AuxCampo].FormularioCampoTipo.Id + ",") == -1) {
                    if (temp != ",") {
                        bolGrupoMisto = true;
                        retorno = 'default';
                    }
                    temp += $scope.Config.Grupos[indiceGrupoAtual].Campos[AuxCampo].FormularioCampoTipo.Id + ",";
                }
            }
            if (!bolGrupoMisto && indiceCampoAtual == 0) {
                retorno = 'full';
            }
        }
        return retorno;
    }
    /*
    $scope.getStyleLabelParaCampo=function(indiceGrupoAtual,idCampo){
        var retorno=true;
        var style={};
        var ItensMinimo=$scope.Config.Grupos[indiceGrupoAtual].ItensMinimo;
        if(ItensMinimo>0){
            retorno=false;
            var counter=0;
            for(var AuxCampo in $scope.Config.Grupos[indiceGrupoAtual].Campos){
                if(($scope.Config.Grupos[indiceGrupoAtual].Campos[AuxCampo].Id==idCampo) && (counter==0)){
                    retorno=true;
                    break;
                }
                counter++;
            }
            if(!retorno){
               style={'visibility':'hidden'};
            }
            else{
               style={'width':'500%'};
            }
        }
        return style;
    }
    */

    $scope.parse = function (valores) {
        var retorno = {};
        try {
            retorno = JSON.parse(valores);
        }
        catch (ex) {
        }
        return retorno;
    };

    this.getHabilitadoModoEdicaoEnquete = function () {
        if (angular.isObject($scope.etapaConfig)) if (angular.isObject($scope.etapaConfig.Etapa)) if ($scope.etapaConfig.Etapa.TipoEtapaEleicao == 2) if (document.location.href.toLowerCase().indexOf("/ava/projetos/envio/editar") != -1 && document.location.href.toLowerCase().indexOf("/ava/projetos/2") == -1) {
            return true;
        }
        return false;
    };

    this.getEditandoViaMediacao = function () {
        if (angular.isObject($scope.etapaConfig)) if (angular.isObject($scope.etapaConfig.Etapa)) if (document.location.href.toLowerCase().indexOf("/ava/projetos/envio/editar") != -1 && document.location.href.toLowerCase().indexOf("/ava/projetos/2") == -1) {
            return true;
        }
        return false;
    };

    $scope.bolEditandoViaMediacao = that.getEditandoViaMediacao();
    $scope.bolHabilitadoModoEdicaoEnquete = that.getHabilitadoModoEdicaoEnquete();
    $scope.loadingConteudoEnquete = false;
    $scope.atualizarConteudoEnquete = function (objFRC) {
        if (!$scope.loadingConteudoEnquete) {
            if ($scope.bolHabilitadoModoEdicaoEnquete) if ($scope.etapaConfig.Etapa.TipoEtapaEleicao == 2) if (objFRC) if (objFRC instanceof Object) if (objFRC.Id) if (objFRC.Id > 0) {
                $scope.loadingConteudoEnquete = true;
                $http.post("/AVA/Projetos/Etapa/AtualizarConteudoEnquete",
                    {
                        idEtapa: $scope.etapaConfig.Etapa.Id,
                        idFormularioRespostaCampo: objFRC.Id,
                        bolConteudoEnquete: objFRC.BolConteudoEnquete
                    }).success(function (data) {
                        //sucesso
                    }).error(function (data) {
                        objFRC.BolConteudoEnquete = !objFRC.BolConteudoEnquete;
                        alert("Ocorreu um erro ao tentar esta operação. Tente novamente atualizando a página!");
                    }).then(function (data) {
                        $scope.loadingConteudoEnquete = false;
                    });
            }
        }
    };

    $scope.submitForm = function (callback) {
        var form = $scope.formularioEnvio;
        var original_request_data = angular.copy($scope.FormularioResposta);
        $scope.submitted = true;
        $scope.formularioEnvio.$setDirty();
        var retorno = {
            status: 0,
            saved: false,
            submitted: false,
            validado: false,
            mensagem: "",
            retorno: {},
            objeto: null
        };
        //qndo outro controle assumir o controle do fomrulario, força o salvamento da situação como rascunho(id:4)
        if (!isNaN(callback) && $scope.autoControle && Array(2, 4).indexOf(callback) != -1)
            $scope.FormularioResposta.Situacao.Id = parseInt(callback);
        else
            $scope.FormularioResposta.Situacao.Id = 4;

        if ((!$scope.autoControle || form.$valid || $scope.FormularioResposta.Situacao.Id == 4) && !$scope.saveInProgress) {
            form.$valid = form.$valid && $scope.checkValuesForListaComplexa($scope.FormularioResposta);
            $scope.FormularioResposta.BolValidado = form.$valid
            $scope.FormularioResposta.BolAutoControle = $scope.autoControle;
            $scope.FormularioResposta.idInscricao = $scope.idInscricao;
            if ($scope.FormularioResposta.idInscricao == undefined && $scope.mensagemRapida) {
                $scope.FormularioResposta.idInscricao = $scope.mensagemRapida.EtapaInscricaoEnvio.Inscricao.Id;
            }
            $scope.FormularioResposta.IdProjetoEdicao = $scope.idEdicao;

            //realiza normalizações nos objetos especiais - por exemplo: tipo 17: materiais relacionados
            for (var campo in $scope.FormularioResposta.Campos) {
                if ($scope.FormularioResposta.Campos[campo].Itens instanceof Array) {
                    if ($scope.FormularioResposta.Campos[campo]) if ($scope.FormularioResposta.Campos[campo].FormularioCampo) if ($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo) if ($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id) if (parseInt($scope.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id) == 17) if ($scope.FormularioResposta.Campos[campo].Itens) if ($scope.FormularioResposta.Campos[campo].Itens instanceof Array) if ($scope.FormularioResposta.Campos[campo].Itens.length >= 0) {
                        for (var Item in $scope.FormularioResposta.Campos[campo].Itens) {
                            if (typeof ($scope.FormularioResposta.Campos[campo].Itens[Item].Legenda) == "string") {
                                try {
                                    var newObj = JSON.parse($scope.FormularioResposta.Campos[campo].Itens[Item].Legenda);
                                    $scope.FormularioResposta.Campos[campo].Itens[Item].Legenda = newObj;
                                }
                                catch (ex) {
                                    //console.log("ocorreu um erro na conversão dos dados do item");
                                }
                            }
                        }
                    }
                }
            }

            $scope.saveInProgress = true;
            original_request_data = angular.copy($scope.FormularioResposta);
            $http({
                url: "/AVA/Projetos/Formulario/salvarFormularioResposta/?_=" + new Date().getTime(),
                method: "POST",
                cache: false,
                data: angular.toJson($scope.FormularioResposta)
            })
                .success(function (data) {
                    var idFR = 0;
                    if (data) if (data.Objeto) if (data.Objeto.Id) {
                        if (!isNaN(data.Objeto.Id)) if (parseInt(data.Objeto.Id) > 0) {
                            idFR = parseInt(data.Objeto.Id);
                        }
                        if (!isNaN(data.idFormularioResposta)) if (parseInt(data.idFormularioResposta) > 0) {
                            idFR = parseInt(data.idFormularioResposta);
                        }
                    }
                    if (idFR > 0) {
                        $scope.FormularioResposta.Id = idFR;
                        $scope.FormularioResposta.Usuario.Id = parseInt(data.Objeto.Usuario.Id);
                        for (var returnCampos in data.Objeto.Campos) {
                            for (var modelCampos in $scope.FormularioResposta.Campos) {
                                if (data.Objeto.Campos[returnCampos].FormularioCampo.Id == $scope.FormularioResposta.Campos[modelCampos].FormularioCampo.Id) {
                                    $scope.FormularioResposta.Campos[modelCampos].Id = data.Objeto.Campos[returnCampos].Id;
                                }
                            }
                        }
                        retorno.status = 1;
                        retorno.saved = true;
                        retorno.submitted = true;
                        retorno.validado = true;
                        retorno.mensagem = "Salvo com sucesso.";
                        retorno.retorno = data;
                        retorno.objeto = $scope.FormularioResposta;
                        retorno.request = original_request_data;
                        $scope.formularioEnvio.$setPristine();
                        if (callback) {
                            if (typeof (callback) == "function") {
                                try {
                                    $scope.$eval(callback(retorno));
                                }
                                catch (e) {
                                    callback(retorno);
                                }
                            }
                            else {
                                eval(callback);
                            }
                        }
                        else {
                            //console.log(retorno.mensagem);
                        }
                    }
                    else {
                        retorno.status = -1;
                        retorno.saved = false;
                        retorno.submitted = true;
                        retorno.validado = true;
                        retorno.mensagem = "Erro no salvamento dos dados do formulario, tente novamente mais tarde.";
                        retorno.retorno = data,
                            retorno.objeto = $scope.FormularioResposta;
                        retorno.request = original_request_data;
                        if (callback) {
                            if (typeof (callback) == "function") {
                                try {
                                    $scope.$eval(callback(retorno));
                                }
                                catch (e) {
                                    callback(retorno);
                                }
                            }
                            else {
                                eval(callback);
                            }
                        }
                        else {
                            alert(retorno.mensagem);
                        }
                    }
                    $scope.saveInProgress = false;
                }).error(
                function () {
                    retorno.status = -1;
                    retorno.saved = false;
                    retorno.submitted = false;
                    retorno.validado = true;
                    retorno.mensagem = "Erro antes da solicitação de salvamento dos dados do formulario, tente novamente mais tarde.";
                    retorno.objeto = $scope.FormularioResposta;
                    retorno.request = original_request_data;
                    $scope.saveInProgress = false;
                    if (callback) {
                        if (typeof (callback) == "function") {
                            try {
                                $scope.$eval(callback(retorno));
                            }
                            catch (e) {
                                callback(retorno);
                            }
                        }
                        else {
                            eval(callback);
                        }
                    }
                    else {
                        alert(retorno.mensagem);
                    }
                }
                );
        }
        else {
            retorno.status = -1;
            retorno.saved = false;
            retorno.submitted = false;
            retorno.validado = false;
            retorno.mensagem = "Formulário não foi preenchido corretamente.";
            retorno.objeto = $scope.FormularioResposta;
            retorno.request = original_request_data;
            $scope.saveInProgress = false;
            if (callback) {
                if (typeof (callback) == "function") {
                    try {
                        $scope.$eval(callback(retorno));
                    }
                    catch (e) {
                        callback(retorno);
                    }
                }
                else {
                    eval(callback);
                }
            }
            else {
                alert(retorno.mensagem);
            }
        }
    };

    $scope.checkValuesForListaComplexa = function (FormularioResposta) {
        var campos = FormularioResposta.Campos;
        for (var i = 0, max = campos.length; i < max; i++) {
            if (campos[i].FormularioCampo.FormularioCampoTipo.Id === 21 && campos[i].FormularioCampo.BolObrigatorio) {
                var length = campos[i].ItensListaComplexa.length;
                if (length >= campos[i].FormularioCampo.TamanhoMinimo && length <= campos[i].FormularioCampo.TamanhoMaximo) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return true;
    };

    $scope.openSeletorMaterialRelacionado = function (CampoAlvo, idxCampo, classe) {
        var cacheItens = angular.copy($scope.FormularioResposta.Campos[idxCampo].Itens);
        var modalInstance = $modal.open({
            templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Formulario/modal/seletor-materiais-relacionados.html',
            controller: 'seletorMaterialRelacionadoCtrl',
            size: 0,
            resolve: {
                minimoItens: function () {
                    if (CampoAlvo.TamanhoMinimo) if (!isNaN(CampoAlvo.TamanhoMinimo)) if (parseInt(CampoAlvo.TamanhoMinimo) > 0) {
                        return parseInt(CampoAlvo.TamanhoMinimo);
                    }
                    return 0;
                },
                maximoItens: function () {
                    if (CampoAlvo.TamanhoMaximo) if (!isNaN(CampoAlvo.TamanhoMaximo)) if (parseInt(CampoAlvo.TamanhoMaximo) > 0) {
                        return parseInt(CampoAlvo.TamanhoMaximo);
                    }
                    return 0;
                },
                materiaisSelecionados: function () {
                    if ($scope.FormularioResposta) if ($scope.FormularioResposta.Campos) if ($scope.FormularioResposta.Campos[idxCampo]) if ($scope.FormularioResposta.Campos[idxCampo].Itens) {
                        return $scope.FormularioResposta.Campos[idxCampo].Itens;
                    }
                    return [];
                },
                edicao: function () {
                    return $scope.idEdicao;
                },
                etapa: function () {
                    return CampoAlvo.Opcoes;
                },
                etapaConfig: function () {
                    return $scope.etapaConfig;
                },
                defaultConfig: function () {
                    return $scope.defaultConfig;
                },
                formularioEnvio: function () {
                    return $scope.formularioEnvio;
                }
            }
        });

        modalInstance.result.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
            //console.log('Modal result dismissed at: ' + new Date());
            //console.log(parametro);
        }, function () {
            //reverte as alterações em caso de fechamento sem ok, p.exe: clicar fora do modal
            $scope.FormularioResposta.Campos[idxCampo].Itens = angular.copy(cacheItens);
        });
        modalInstance.opened.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
        }, function () {
            //$log.info('Modale opened dismissed at: ' + new Date());
        });
    };
    $timeout(function () {
        $scope.init();
    }, 10);
}]);

angular.module('formulario').controller('seletorMaterialRelacionadoCtrl', ['$scope', '$modalInstance', '$http', '$filter', '$timeout', 'edicao', 'etapaConfig', 'materiaisSelecionados', 'minimoItens', 'maximoItens', 'defaultConfig', 'etapa', 'formularioEnvio', function ($scope, $modalInstance, $http, $filter, $timeout, edicao, etapaConfig, materiaisSelecionados, minimoItens, maximoItens, defaultConfig, etapa, formularioEnvio) {
    var _self = this;
    this.lastScrollPosition = 0;
    this.controlDynamicImgLoad = undefined;
    $scope.nuncaExistiramMateriais = true;
    $scope.TotalEnvios = 0;

    $scope.Escolas = [];
    $scope.Estados = [];
    $scope.Turmas = [];
    $scope.CacheEscolas = [];
    $scope.CacheEstados = [];
    $scope.CacheTurmas = [];
    $scope.CacheEscolasFinal = [];
    $scope.CacheEstadosFinal = [];
    $scope.CacheTurmasFinal = [];
    $scope.Categorias = [];

    $scope.formularioEnvio = formularioEnvio;
    $scope.edicao = edicao;
    $scope.defaultConfig = defaultConfig;
    $scope.minimoItens = parseInt(minimoItens);
    $scope.maximoItens = parseInt(maximoItens);
    $scope.etapaConfig = etapaConfig;
    $scope.materiaisSelecionados = materiaisSelecionados;
    $scope.materiaisSelecionadosCache = [];
    for (var material_selecionado in $scope.materiaisSelecionados) {
        $scope.materiaisSelecionadosCache.push({
            Id: $scope.materiaisSelecionados[material_selecionado].Id,
            Valor: $scope.materiaisSelecionados[material_selecionado].Valor,
            Legenda: $scope.materiaisSelecionados[material_selecionado].Legenda,
            Ordem: $scope.materiaisSelecionados[material_selecionado].Ordem
        });
    }

    $scope.selecionados = $scope.materiaisSelecionados.length;

    $scope.idProjeto = etapaConfig.Etapa.Edicao.Projeto.Id;
    $scope.idEdicao = 0;
    if (!isNaN(edicao))
        $scope.idEdicao = parseInt(edicao);
    if ($scope.idEdicao == 0) if (etapaConfig) if (etapaConfig.Etapa) if (etapaConfig.Etapa.Edicao) if (etapaConfig.Etapa.Edicao.Id) if (!isNaN(etapaConfig.Etapa.Edicao.Id))
        $scope.idEdicao = parseInt(etapaConfig.Etapa.Edicao.Id);

    $scope.idEtapa = etapaConfig.Etapa.Id;

    $scope.idEtapaRequest = "";
    if (etapa instanceof Array) if (etapa.length > 0) {
        $scope.idEtapaRequest = etapa[0].Opcao;
    }

    $scope.TipoProjeto = etapaConfig.Etapa.Edicao.TipoProjeto;

    $scope.intPagina = 1;
    $scope.intRegPorPagina = 1400;

    $scope.listaMateriais = [];
    $scope.cacheListaMateriais = [];
    $scope.loadInProgress = true;
    $scope.associacoesAtualizadas = true;
    $scope.alterouSelecao = false;
    $scope.EstadoSelecionado = undefined;
    $scope.EscolaSelecionada = undefined;
    $scope.TurmaSelecionada = undefined;
    $scope.CategoriaSelecionada = undefined;

    $scope.termoBusca = "";

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.getEstadoByUf = function (strUF) {
        var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
        var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
        return arrNomes[arrSiglas.indexOf(strUF)];
    };

    $scope.ok = function () {
        //retorna os elementos selecionados(lista de idProjetoEdicaoEtapaInscricaoEnvio)
        //para salva-los juntamente com o material
        var contador = $scope.materiaisSelecionados.length;
        if ($scope.materiaisSelecionadosCache.length != contador || $scope.alterouSelecao) {
            $scope.formularioEnvio.$setDirty();
        }
        var bolClose = true;
        if ($scope.minimoItens > 0) {
            if (contador < $scope.minimoItens) {
                bolClose = false;
                alert("Você não selecionou o mínimo de materiais necessários para preencher esse campo.");
            }
        }
        if ($scope.maximoItens > 0) {
            if (contador > $scope.maximoItens) {
                bolClose = false;
                alert("Você selecionou materiais além do máximo permitido e necessários para preencher esse campo.");
            }
        }
        if (bolClose) {
            $modalInstance.close();
        }
    };

    $scope.cancel = function () {
        var total = $scope.materiaisSelecionados.length;
        for (var i = 0; i < total; i++) {
            $scope.materiaisSelecionados.pop();
        }
        for (var material_selecionado in $scope.materiaisSelecionadosCache) {
            $scope.materiaisSelecionados.push({
                Id: $scope.materiaisSelecionadosCache[material_selecionado].Id,
                Valor: $scope.materiaisSelecionadosCache[material_selecionado].Valor,
                Legenda: $scope.materiaisSelecionadosCache[material_selecionado].Legenda,
                Ordem: $scope.materiaisSelecionadosCache[material_selecionado].Ordem
            });
        }
        $modalInstance.dismiss('cancel');
    };

    $scope.selecionarItem = function (idEnvio) {
        $scope.alterouSelecao = true;
        var bolProssegue = true;
        for (var material in $scope.listaMateriais) {
            if ($scope.listaMateriais[material].IdProjetoInscricaoEnvio == idEnvio) {
                if ($scope.listaMateriais[material].selecionado) {
                    //remove um já selecionado
                    if ($scope.materiaisSelecionados.length > 0) {
                        for (var selecionado in $scope.materiaisSelecionados) {
                            if ($scope.materiaisSelecionados[selecionado].Valor == idEnvio) {
                                $scope.materiaisSelecionados.splice(selecionado, 1);
                            }
                        }
                    }
                    if ($scope.materiaisSelecionados.length >= $scope.minimoItens) {
                        angular.element(".acoes > .btn_associar").removeClass("ativo").addClass("ativo");
                        angular.element(".acoes > .btn_associar").removeAttr("disabled");
                    }
                    else {
                        angular.element(".acoes > .btn_associar").removeClass("ativo");
                        angular.element(".acoes > .btn_associar").attr("disabled", "disabled");
                    }
                }
                else {
                    //adiciona na lista de selecionados
                    if ($scope.maximoItens > 0) {
                        if ($scope.materiaisSelecionados.length == $scope.maximoItens) {
                            bolProssegue = false;
                            alert("Você selecionou materiais além do máximo permitido e necessários para preencher esse campo.");
                        }
                    }
                    if (bolProssegue) {
                        //adiciona a classe ativo para o botão associar
                        angular.element(".acoes > .btn_associar").removeClass("ativo").addClass("ativo");
                        angular.element(".acoes > .btn_associar").removeAttr("disabled");

                        //console.log($scope.formataObjeto($scope.listaMateriais[material]));
                        $scope.materiaisSelecionados.push({
                            Id: 0,
                            Valor: $scope.listaMateriais[material].IdProjetoInscricaoEnvio,
                            Legenda: $scope.formataObjeto($scope.listaMateriais[material]),
                            //Legenda: $scope.listaMateriais[material],
                            Ordem: 0
                        });
                    }
                }
                if (bolProssegue) {
                    $scope.listaMateriais[material].selecionado = !$scope.listaMateriais[material].selecionado;
                }
            }
        }
        $scope.selecionados = $scope.materiaisSelecionados.length;
        $scope.associacoesAtualizadas = false;
        $timeout(function () {
            $scope.associacoesAtualizadas = true;
        });

    };

    $scope.formataObjeto = function (objeto) {
        var novo = {
            IdProjetoInscricaoEnvio: objeto.IdProjetoInscricaoEnvio,
            Titulo: objeto.Titulo,
            Descricao: objeto.Descricao,
            Imagem: objeto.Imagem,
            Video: objeto.Video,
            Etapa: {
                Id: objeto.Etapa.Id,
                Link: objeto.Etapa.Link,
                Edicao: {
                    Id: objeto.Etapa.Edicao.Id,
                    Link: objeto.Etapa.Edicao.Link,
                    Ano: objeto.Etapa.Edicao.Ano,
                    TipoProjeto: objeto.Etapa.Edicao.TipoProjeto
                }
            },
            EdicaoConfig: {
                Id: objeto.EdicaoConfig.Id,
                Link: objeto.EdicaoConfig.Link,
                Ano: objeto.EdicaoConfig.Ano,
                TipoProjeto: objeto.EdicaoConfig.TipoProjeto
            },
            Inscricao: {
                Id: objeto.Inscricao.Id,
                Responsavel: {
                    Id: objeto.Inscricao.Responsavel.Id,
                    Nome: objeto.Inscricao.Responsavel.Nome,
                    Login: objeto.Inscricao.Responsavel.Login,
                    idTipoParticipante: objeto.Inscricao.Responsavel.idTipoParticipante,
                    Escola: {
                        Id: objeto.Inscricao.Responsavel.Escola.Id,
                        Nome: objeto.Inscricao.Responsavel.Escola.Nome,
                        Estado: objeto.Inscricao.Responsavel.Escola.Estado,
                        Cidade: objeto.Inscricao.Responsavel.Escola.Cidade
                    },
                    Perfil: {
                        Foto: objeto.Inscricao.Responsavel.Perfil.Foto,
                        Thumb: objeto.Inscricao.Responsavel.Perfil.Thumb,
                        Apelido: objeto.Inscricao.Responsavel.Perfil.Apelido,
                        Link: objeto.Inscricao.Responsavel.Perfil.Link
                    }
                },
                Turma: {},
                Equipe: {},
                InscricaoTipo: {
                    Id: objeto.Inscricao.InscricaoTipo.Id
                }
            },
            MensagemRapida: {
                Id: objeto.MensagemRapida.Id,
                StrEncryptIdMensagem: objeto.MensagemRapida.StrEncryptIdMensagem
            },
            selecionado: objeto.selecionado
        };

        if (objeto.Inscricao.Turma) if (objeto.Inscricao.Turma.Id) {
            novo.Inscricao.Turma = {
                Id: objeto.Inscricao.Turma.Id,
                Nome: objeto.Inscricao.Turma.Nome,
                Apelido: objeto.Inscricao.Turma.Apelido,
                Foto: objeto.Inscricao.Turma.Foto,
                Thumb: objeto.Inscricao.Turma.Thumb,
                Link: objeto.Inscricao.Turma.Link
            }
        }

        if (objeto.Inscricao.Equipe) if (objeto.Inscricao.Equipe.Id) {
            novo.Inscricao.Equipe = {
                Id: objeto.Inscricao.Equipe.Id,
                Nome: objeto.Inscricao.Equipe.Nome,
                Apelido: objeto.Inscricao.Equipe.Apelido,
                Foto: objeto.Inscricao.Equipe.Foto,
                Thumb: objeto.Inscricao.Equipe.Thumb,
                Link: objeto.Inscricao.Equipe.Link,
                Alunos: objeto.Inscricao.Equipe.Alunos
            }
        }
        return novo;
    };

    $scope.formataObjetoSerializado = function (objeto) {
        return JSON.stringify($scope.formataObjeto(objeto));
    }

    $scope.controleRajada = undefined;
    $scope.aplicarFiltrosSelecaoControlado = function (level) {
        $scope.loadInProgress = true;
        clearTimeout($scope.controleRajada);
        $scope.controleRajada = setTimeout(function () {
            $scope.aplicarFiltrosSelecao(level);
        }, 2000);
    };

    $scope.reestabeleceLazyLoad = function () {
        var parentSeletor = ".lazyLoadHandler";
        var contador = 0;
        var stopOn = 30;
        angular.element(parentSeletor).unbind("scroll");
        $timeout(function () {
            angular.element(parentSeletor).bind("scroll", function (evt) {
                var el = evt.target;
                var currentScrollPosition = (el.offsetHeight + el.scrollTop);
                if (_self.lastScrollPosition != currentScrollPosition) {
                    $scope.associacoesAtualizadas = false;
                    _self.lastScrollPosition = (el.offsetHeight + el.scrollTop);
                    clearTimeout(_self.controlDynamicImgLoad);
                    _self.controlDynamicImgLoad = setTimeout(function () {
                        clearTimeout(_self.controlDynamicImgLoad);
                        contador = 0;
                        angular.element(parentSeletor + ' [lazy_back_img]').each(function () {
                            if (isElementVisible(angular.element(this).get(0)) > 0) {
                                if (angular.element(this).get(0).getAttribute("lazy_back_img") != "") {
                                    contador++;
                                    if ((stopOn > 0 && contador <= stopOn) || stopOn == 0) {
                                        angular.element(this).css({
                                            'background-image': 'url(' + angular.element(this).get(0).getAttribute("lazy_back_img") + ')'
                                        });

                                    }
                                }
                            }
                            else {
                                angular.element(this).css({
                                    'background-image': 'none'
                                });
                            }
                        });
                        $scope.associacoesAtualizadas = true;
                    }, 1000);
                }
            });

            //mostra de início as imagens que já estão visíveis, independnete do disparo do scroll
            contador = 0;
            angular.element(parentSeletor + ' [lazy_back_img]').each(function () {
                if (isElementVisible(angular.element(this).get(0)) > 0) {
                    if (angular.element(this).get(0).getAttribute("lazy_back_img") != "") {
                        contador++;
                        if ((stopOn > 0 && contador <= stopOn) || stopOn == 0) {
                            angular.element(this).css({
                                'background-image': 'url(' + angular.element(this).get(0).getAttribute("lazy_back_img") + ')'
                            });

                        }
                    }
                }
                else {
                    angular.element(this).css({
                        'background-image': 'none'
                    });
                }
            });
            //correção de bug no admin
            if (angular.element(parentSeletor + ' [lazy_back_img]').size() > 0 && document.location.href.toLowerCase().indexOf("envio") != -1) {
                angular.element(parentSeletor + ' [lazy_back_img]').get(0).scrollTo(0, 1);
            }
        });
    };

    $scope.aplicarFiltrosSelecao = function (level, Objeto) {
        $timeout(function () {
            var idEstado = '';
            var idEscola = 0;
            var idTurma = 0;
            var idCategoria = 0;
            var strUF = '';
            var strTermo = $scope.termoBusca;
            //console.log($scope.termoBusca);
            if ($scope.EstadoSelecionado) if ($scope.EstadoSelecionado.Sigla) if ($scope.EstadoSelecionado.Sigla != "") {
                idEstado = $scope.EstadoSelecionado.Sigla;
            }
            if ($scope.EscolaSelecionada) if ($scope.EscolaSelecionada.Id) if (!isNaN($scope.EscolaSelecionada.Id)) if (parseInt($scope.EscolaSelecionada.Id) > 0) {
                idEscola = parseInt($scope.EscolaSelecionada.Id);
            }
            if ($scope.TurmaSelecionada) if ($scope.TurmaSelecionada.Id) if (!isNaN($scope.TurmaSelecionada.Id)) if (parseInt($scope.TurmaSelecionada.Id) > 0) {
                idTurma = parseInt($scope.TurmaSelecionada.Id);
            }
            if ($scope.CategoriaSelecionada) if ($scope.CategoriaSelecionada.Id) if (!isNaN($scope.CategoriaSelecionada.Id)) if (parseInt($scope.CategoriaSelecionada.Id) > 0) {
                idCategoria = parseInt($scope.CategoriaSelecionada.Id);
            }

            //aplica filtragens nas combos após a seleção
            switch (level) {
                case -1:
                    //mostra somente os selecionados
                    break;
                case 0:
                    //filtra as Escolas conforme o Estado selecionado
                    $scope.EscolaSelecionada = undefined;
                    $scope.TurmaSelecionada = undefined;
                    $scope.Turmas = [];

                    if (idEstado.length == 2) {
                        //filtra as escolas conforme o estado selecionado
                        var escolas = $filter('filter')($scope.CacheEscolas, { Estado: idEstado }, true);
                        $scope.Escolas = angular.copy(escolas);
                    }
                    else {
                        $scope.Escolas = angular.copy($scope.CacheEscolas);
                    }
                    break;
                case 1:
                    //filtra as turmas conforme a escola selecionada
                    $scope.TurmaSelecionada = undefined;
                    if (idEscola > 0) {
                        //filtra as escolas conforme o estado selecionado
                        var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Id: idEscola } }, true);
                        $scope.Turmas = angular.copy(turmas);
                    }
                    else {
                        $scope.Turmas = [];
                    }
                    break;
                case 3:
                    //filtra pela categoria selecionada
                    //utiliza os mesmos demais parametros, nenhum tratamento especial
                    break;
            }
            var idEscola = 0;
            var idTurma = 0;
            if ($scope.EscolaSelecionada) if ($scope.EscolaSelecionada.Id) if (!isNaN($scope.EscolaSelecionada.Id)) if (parseInt($scope.EscolaSelecionada.Id) > 0) {
                idEscola = parseInt($scope.EscolaSelecionada.Id);
            }
            if ($scope.TurmaSelecionada) if ($scope.TurmaSelecionada.Id) if (!isNaN($scope.TurmaSelecionada.Id)) if (parseInt($scope.TurmaSelecionada.Id) > 0) {
                idTurma = parseInt($scope.TurmaSelecionada.Id);
            }
            $scope.bolFiltrandoSelecionados = false;
            $scope.bolTentandoFiltrarSelecionados = false;
            $scope.bolFiltrandoSelecionadosAnterior = true;
            if (level == -1) {
                $scope.bolFiltrandoSelecionadosAnterior = false;
                if (angular.element(".submenu-abas a").eq(0).hasClass("ativo")) {
                    $scope.bolFiltrandoSelecionadosAnterior = true;
                    angular.element(".submenu-abas a").eq(0).removeClass("ativo");
                    $scope.associacoesAtualizadas = false;
                }
                else {
                    $scope.bolTentandoFiltrarSelecionados = true;
                    if ($scope.materiaisSelecionados.length > 0) {
                        angular.element(".submenu-abas a").eq(0).addClass("ativo");
                        $scope.bolFiltrandoSelecionados = true;
                        $scope.associacoesAtualizadas = false;
                    }
                }
            }
            else {
                $scope.associacoesAtualizadas = false;
                $scope.bolFiltrandoSelecionadosAnterior = false;
            }
            if ($scope.bolTentandoFiltrarSelecionados) {
                //somente mostra os selecionado a partir do cache, desabilitando os filtros para esse caso
                if ($scope.materiaisSelecionados.length > 0) {
                    $scope.cacheListaMateriais = angular.copy($scope.listaMateriais);
                    $scope.listaMateriais = [];
                    for (var selecionado in $scope.materiaisSelecionados) {
                        var temp = $scope.normalizeObj($scope.normalizeObj($scope.materiaisSelecionados[selecionado]).Legenda);
                        temp.selecionado = true;
                        $scope.listaMateriais.push(temp);
                    }

                    if ($scope.materiaisSelecionados.length >= $scope.minimoItens) {
                        angular.element(".acoes > .btn_associar").removeClass("ativo").addClass("ativo");
                        angular.element(".acoes > .btn_associar").removeAttr("disabled");
                    }
                    else {
                        angular.element(".acoes > .btn_associar").removeClass("ativo");
                        angular.element(".acoes > .btn_associar").attr("disabled", "disabled");
                    }
                    $scope.reestabeleceLazyLoad();
                    $scope.bolFiltrandoSelecionados = true;
                    $scope.associacoesAtualizadas = true;
                }
            }
            else {
                if ($scope.bolFiltrandoSelecionadosAnterior && $scope.cacheListaMateriais.length > 0) {
                    $scope.listaMateriais = angular.copy($scope.cacheListaMateriais);
                    $scope.reestabeleceLazyLoad();
                    $scope.associacoesAtualizadas = true;
                }
                else {
                    //reseta/recarrega todos os elementos
                    $scope.CacheEscolasFinal = angular.copy($scope.CacheEscolas),
                        $scope.TotalEnvios = 0;
                    $scope.listaMateriais = [];
                    $scope.intPagina = 1;
                    $scope.loadInProgress = true;
                    var path = "/AVA/Projetos/Servico/GetEnviosFiltradoOrdenadoPaginado/?_=" + new Date().getTime();
                    var parametros = {
                        idProjeto: $scope.idProjeto,
                        idEdicao: $scope.idEdicao,
                        idEtapa: $scope.idEtapaRequest,
                        idSituacao: 1,
                        idEscola: idEscola,
                        strUF: idEstado,
                        idTurma: 0,
                        idInscricao: 0,
                        idUsuario: 0,
                        tipoProjeto: $scope.TipoProjeto,
                        tipoOrdenacao: 1,
                        intPagina: $scope.intPagina,
                        intRegPorPagina: $scope.intRegPorPagina,
                        intDestaque: 0,
                        intEtapaRelativa: 0,
                        idCategoria: idCategoria,
                        termoBusca: strTermo
                    };
                    //console.log(parametros);
                    if (parametros.intPagina == 1) {
                        $scope.TotalEnvios = 0;
                        $scope.listaMateriais = [];
                    }
                    $http({
                        url: path,
                        method: "POST",
                        params: parametros
                    }).success(function (data) {
                        if (data) if (data instanceof Object) {
                            //lista de escolas/estados para os filtros
                            if (data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0) {

                                if (!$scope.CacheEscolas || $scope.CacheEscolas.length == 0 || $scope.CacheEscolas === undefined) {
                                    $scope.CacheEscolas = data.listaEscolas;
                                    $scope.Escolas = angular.copy($scope.CacheEscolas);

                                    var temp = ",";
                                    $scope.Estados = [];
                                    for (var escola in $scope.CacheEscolas) {
                                        if (temp.indexOf("," + $scope.CacheEscolas[escola].Estado + ",") == -1) {
                                            temp += $scope.CacheEscolas[escola].Estado + ",";
                                            $scope.Estados.push({
                                                Estado: $scope.getEstadoByUf($scope.CacheEscolas[escola].Estado),
                                                Sigla: $scope.CacheEscolas[escola].Estado
                                            });
                                        }
                                    }
                                    if ($scope.Estados.length > 0) {
                                        $scope.Estados.sort();
                                        $scope.CacheEstados = angular.copy($scope.Estados);
                                    }

                                }
                            }

                            //lista de turmas para os filtros
                            if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {
                                $scope.CacheTurmas = data.listaTurmas;
                                $scope.Turmas = angular.copy($scope.CacheTurmas);
                            }
                            if (data.listaCategorias) if (data.listaCategorias instanceof Array) if (data.listaCategorias.length > 0) {
                                $scope.Categorias = data.listaCategorias;
                            }
                            if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                                $scope.TotalEnvios = parseInt(data.TotalEnvios);
                            }
                            if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                                var listaFinal = data.listParticipanteEnvio;
                                $scope.listaMateriais = [];
                                if ($scope.materiaisSelecionados.length > 0 && listaFinal.length > 0) {
                                    for (var material in listaFinal) {
                                        listaFinal[material].selecionado = false;
                                        for (var selecionado in $scope.materiaisSelecionados) {
                                            if (listaFinal[material].IdProjetoInscricaoEnvio == $scope.materiaisSelecionados[selecionado].Valor) {
                                                listaFinal[material].selecionado = true;
                                                if ($scope.bolFiltrandoSelecionados)
                                                    $scope.listaMateriais.push(listaFinal[material]);
                                            }
                                        }
                                    }
                                }
                                if (!$scope.bolFiltrandoSelecionados)
                                    $scope.listaMateriais = listaFinal;
                            }
                        }
                        if ($scope.materiaisSelecionados.length >= $scope.minimoItens) {
                            angular.element(".acoes > .btn_associar").removeClass("ativo").addClass("ativo");
                            angular.element(".acoes > .btn_associar").removeAttr("disabled");
                        }
                        else {
                            angular.element(".acoes > .btn_associar").removeClass("ativo");
                            angular.element(".acoes > .btn_associar").attr("disabled", "disabled");
                        }
                        $scope.loadInProgress = false;

                        if (document.location.href.toLowerCase().indexOf("envio") != -1) {
                            window.scrollTo(0, 0);
                        }

                        //prepara o lazyLoad no scroll
                        $scope.reestabeleceLazyLoad();

                        $scope.associacoesAtualizadas = true;
                    }).error(function (err) {
                        console.log("Não foi possível buscar materiais da etapa");
                    }).finally(function () {
                        $scope.loadInProgress = false;
                    });
                }
            }
        }, 150);
    };

    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    }
    //carrega a primeira página
    $scope.aplicarFiltrosSelecao(0);
}]);
