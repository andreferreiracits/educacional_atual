"use strict"
angular.module('Inscricao').directive('inscricaoTurmaFormulario', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/inscricao-turma-formulario.html',
        scope: { Turma: "=turma", edicao: "=edicao", idEdicao: "=idEdicao", idUsuario: "=idUsuario", Turmas : "=turmas" },
        controller: ['$http', '$scope','$timeout', '$filter', inscricaoTurmaFormulario],
        controllerAs: "inscFormulario"
    };
});

function inscricaoTurmaFormulario($http, $scope,$timeout, $filter) {
    var inscricaoTurmaFormulario = this;
    // reseta os dado 2-way-data-bind para a nova turma selecionada.
    this.resetTurma = function () {
        $scope.formulario = {
            Inscricao: {
                Edicao: {Id : $scope.idEdicao},
                Turma: {Id: $scope.Turma.Id, Nome: $scope.Turma.Nome},
                Categorias: [],
                Parceiros: [],
                EmailInscricao : ""
            },
            enviado: false,
            aceitoTermos: false,
            salvando: false,
            ckEmail: ""
        };
    };    
     
    // Execulta o salvamento da inscrição via "WS"
    this.salvar = function() {
        $scope.formulario.salvando = true;
        if (inscricaoTurmaFormulario.isValid(true)) {
            $http.post('/AVA/Projetos/Inscricao/salvarInscricaoPorTurma', JSON.stringify($scope.formulario))
            .success(function (data) {
                if (data.Id == 0) {
                    alert("Erro na inscrição da turma, tente novamente mais tarde.");
                }
                else {
                    inscricaoTurmaFormulario.inscricaoPronta(data);
                }
            })
            .error(errorPadrao)
            .finally(function() {
                $scope.formulario.salvando = false;
            });
        }
        else{
            $scope.formulario.salvando = false;
        }
    }

    // Registra no json de Turmas a inscricao
    this.inscricaoPronta = function (ObjInscricao) {
        var result = $filter('filter')($scope.Turmas, {Id: $scope.Turma.Id});
        result[0].Inscricao = ObjInscricao;
        $scope.Turma.Inscricao = ObjInscricao;
        $scope.formulario.enviado = true;
    };

    this.filtrar = function (dados, filtro) {
        return $filter('filter')(dados, filtro, false);
    };

    // Valida o formulário.
    this.isValid = function (bolFeedback) {
        var valido = true;
        $scope.formulario.Inscricao.EmailInscricao = inscricaoTurmaFormulario.buscaEmail();
        if ($scope.formulario.Inscricao.EmailInscricao == undefined || $scope.formulario.Inscricao.EmailInscricao == "") {
            valido = false;
        }
        if ($scope.formulario.Inscricao.Responsavel == undefined) {
            valido = false;
        }
        if ($scope.formulario.Inscricao.Turma.Id <= 0) {
            valido = false;
        }
        var gruposParaSelecaoNaInscricao = inscricaoTurmaFormulario.filtrar(inscricaoTurmaFormulario.confg.GruposCategorias, { CategoriaLocal: { Id: 1 }, CategoriaAtribuicao:{Id: 1} });
        //console.log(gruposParaSelecaoNaInscricao);
        if(angular.isArray(gruposParaSelecaoNaInscricao)) if(angular.isArray($scope.formulario.Inscricao.Categorias)) if ($scope.formulario.Inscricao.Categorias.length  == 0  && gruposParaSelecaoNaInscricao.length > 0) {
            valido = false;
        }
        if (!$scope.formulario.aceitoTermos) {
            if (bolFeedback) {
                alert("Para enviar sua solicitação de inscrição, leia e aceite o termo do projeto");
            }
            valido = false;
        }
        else if (!valido && bolFeedback) {
            alert("Para finalizar sua inscrição informe os campos obrigatórios");
            $("html, body").animate({
                scrollTop: $(".ng-invalid:not(form)").offset().top - 100
            }, "slow");
        }
        return  valido;
    };

    // define e-mail a ser utilizado pelo Responsavel.
    this.buscaEmail = function() {
        var email = null;
        
        if ($scope.formulario.Inscricao.Responsavel != null) {
            if ($scope.formulario.ckEmail == "pessoal" ) {
                email = $scope.formulario.Inscricao.Responsavel.EmailPessoal;
            }
            else if ($scope.formulario.ckEmail == "educacional") {
                email = $scope.formulario.Inscricao.Responsavel.EmailEducacional;
            }
        }

        return email;
    }

    this.getConfig = function () {
        // busca configuração da edição não precisa de cache so é executado 1 vez 
        $http.get('/AVA/ProjetoApi/v1/Edicao/GetEdicaoConfiguracaoById/?idEdicao=' + $scope.idEdicao).success(function (data) {
            inscricaoTurmaFormulario.confg = data;
        }).error(errorPadrao);
    }
    
    // Busca Professores responsaveis que podem ser parceiros da turma
    this.getProfessores = function () {
        // Possivel Otimização
        /*
            Criar um cache com o promisse dos professores.
            assim se o usuario ficar mudando de uma turma para outra não refaz o HHTP Request
        */
        //console.log("entrou");
        if(angular.isObject($scope.Turma) && $scope.Turma.Id > 0){
            $http.get('/AVA/Projetos/Servico/GetResponsaveisEdicaoTurmaLogin/?idEdicao=' + $scope.idEdicao + '&idTurma=' + $scope.Turma.Id + '&strLogin=')
            .success(function (data) {
                angular.forEach(data.Responsaveis, function (value, index) {
                    value.eParceiro = false;
                });
                $scope.Responsaveis = data.Responsaveis;
                jQuery("#professorResponsavel_value").focus();

            })
            .error(errorPadrao);
        }
    };

    // Configura e-mail do Professor Responsavel (as demais partes são feitas via 2-way data bind)
    this.adicionarResponsavel = function() {
        if($scope.formulario.Inscricao.Responsavel == undefined ){
            $timeout(inscricaoTurmaFormulario.adicionarResponsavel, 500);
        }
        else{
            if($scope.formulario.Inscricao.Responsavel.EmailEducacional == undefined){
                $scope.formulario.ckEmail = 'pessoal';
            }
            else{
                $scope.formulario.ckEmail = 'educacional';
            }
        }
    };

    // Adiciona Professor Parceiro
    this.adicionarParceiro = function () {
        
        if(inscricaoTurmaFormulario.professorParceiro == undefined)
        {
            $timeout(inscricaoTurmaFormulario.adicionarParceiro, 500);
        }
        else{
            // inserindo mesmo cara 2 vezes
            var result = $filter('filter')($scope.formulario.Inscricao.Parceiros, {Id : inscricaoTurmaFormulario.professorParceiro.Id});
            if( result.length == 0 )
            {
                $scope.formulario.Inscricao.Parceiros.push({ "Id": "" + inscricaoTurmaFormulario.professorParceiro.Id + "", "Nome": "" + inscricaoTurmaFormulario.professorParceiro.Nome + "" });
            }
            $timeout(function () {
                jQuery("#professorParceiro_value").val("");
                jQuery("#professorParceiro_value").focus();
                inscricaoTurmaFormulario.professorParceiro = undefined;
            }, 100);
        }

         
    };

    // Remove Professor Parceiro
    this.removerParceiro = function (index) {
        $scope.formulario.Inscricao.Parceiros.splice(index,1);
    };

    // Pega configuração da Edição
    this.getConfig();
    
    // Aguarda a mudança de turma
    $scope.$watch("Turma", function () {
        inscricaoTurmaFormulario.resetTurma();
        inscricaoTurmaFormulario.getProfessores();
    });
}