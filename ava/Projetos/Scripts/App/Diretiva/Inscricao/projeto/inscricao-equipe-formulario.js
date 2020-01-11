"use strict"
angular.module('Inscricao.mista').directive('inscricaoEquipeFormulario', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/projeto/inscricao-equipe-formulario.html',
        scope: { 
            usuario: "=usuario",
            edicao: "=edicao",
            edicaoConfig: "=edicaoConfig",
            objEquipe: "=objEquipe", 
            Turmas : "=turmas",
            parceirosEnvioSelected: "=parceirosEnvioSelected"
        },
        controller: ['$http', '$scope','$timeout', '$filter', inscricaoEquipeFormulario],
        controllerAs: "inscFormularioEquipeCtrl"
    };
});

function inscricaoEquipeFormulario($http, $scope,$timeout, $filter) {
    var self = this;
    
    // Procura objeto para seleção de categoria no formulário de inscrição 
    var objCategoriaFiltered = $filter('filter')($scope.edicaoConfig.GruposCategorias, { CategoriaLocal: { Id: 1 }, CategoriaAtribuicao:{Id: 1} }, true);
    if (angular.isArray(objCategoriaFiltered) && objCategoriaFiltered.length > 0) {
        self.confg = objCategoriaFiltered;
    }

    // reseta os dado 2-way-data-bind para a nova turma selecionada.
    this.resetTurma = function () {
        $scope.formulario = {
            Inscricao: {
                Id: $scope.objEquipe.Inscricao.Id,
                Edicao: {Id : $scope.edicao.Id },
                Equipe: {Id: $scope.objEquipe.Id, Nome: $scope.objEquipe.Nome},
                Categorias: [],
                Parceiros: [],
                EmailInscricao : ""
            },
            enviado: false,
            aceitoTermos: false,
            salvando: false,
            ckEmail: ''
        };
    };  
            
    // Executa o salvamento da inscrição via "WS"
    this.salvar = function () {
        if (self.isValid(true))
        {
            $scope.formulario.salvando = true;
            $http.post('/AVA/Projetos/Inscricao/salvarInscricaoPorEquipe', angular.toJson($scope.formulario))
            .success(function (data) {
                if (data && data.Status && !isNaN(data.Status) && parseInt(data.Status) > 0 && data.Inscricao) {
                    $scope.objEquipe.Inscricao = data.Inscricao;
                    $scope.objEquipe.Inscricao.Situacao.Id = 2;
                    $scope.objEquipe.Situacao.Id = 2;
                    $scope.objEquipe.Situacao.Descricao = "Equipe já inscrita (confirmação pendente)";
                }else {
                    alert("Erro na inscrição da equipe, tente novamente mais tarde.");
                }
            })
            .error(errorPadrao)
            .finally(function (){
               $scope.formulario.salvando = false;
            });
        }
        else{
            $scope.formulario.salvando = false;
        }
    }

    // Registra no json de Turmas a inscricao
    this.inscricaoPronta = function (ObjInscricao) {
        var result = $filter('filter')($scope.Turmas, {Id :$scope.Turma.Id});
        result[0].Inscricao = ObjInscricao;
        $scope.Turma.Inscricao = ObjInscricao;
        $scope.formulario.enviado = true;
    };

    // Valida o formulário.
    this.isValid = function (bolFeedback) {
        var valido = true;
        $scope.formulario.Inscricao.EmailInscricao =  self.buscaEmail();
        if($scope.formulario.Inscricao.EmailInscricao == undefined || $scope.formulario.Inscricao.EmailInscricao == "")
        {
            valido = false;
        }
        if($scope.formulario.Inscricao.Responsavel == undefined )
        {
            valido = false;
        }
        if($scope.formulario.Inscricao.Equipe.Id <= 0 )
        {
            valido = false;
        }
        if($scope.formulario.Inscricao.Categorias.length  == 0  && self.confg != null)
        {
            valido = false;
        }
        if(!$scope.formulario.aceitoTermos)
        {
            if(bolFeedback)
            {
                alert("Para enviar sua solicitação de inscrição, leia e aceite o termo do projeto");
            }
            valido = false;
        }
        else if(!valido && bolFeedback)
        {
             alert("Para finalizar sua inscrição informa os campos obrigatórios");
        }
        return  valido;
    };

    //Define e-mail a ser utilizado pelo Responsavel.
    this.buscaEmail = function () {
        var email = null;
        
        if($scope.formulario.Inscricao.Responsavel != null){
            if ($scope.formulario.ckEmail == "pessoal" ) {
                email = $scope.formulario.Inscricao.Responsavel.EmailPessoal;
            }
            else if ($scope.formulario.ckEmail == "educacional") {
                email = $scope.formulario.Inscricao.Responsavel.EmailEducacional;
            }
        }
        return email;
    }
    
    // Busca Professores responsaveis que podem ser parceiros da turma
    this.getProfessores = function () {
        // Possivel Otimização
        /*
            Criar um cache com o promisse dos professores.
            assim se o usuario ficar mudando de uma turma para outra não refaz o HHTP Request
        */
        $http.get('/AVA/Projetos/Servico/GetResponsaveisEdicaoTurmaLogin/?idEdicao=' + $scope.edicao.Id + '&idTurma=0&strLogin=')
        .success(function (data) {
            angular.forEach(data.Responsaveis, function (value, index) {
                value.eParceiro = false;
            });
            $scope.Responsaveis = data.Responsaveis;
            jQuery("#professorResponsavel_value").focus();

        })
        .error(errorPadrao);
    };

    // Configura e-mail do Professor Responsavel (as demais partes são feitas via 2-way data bind)
    this.adicionarResponsavel = function() {
        if($scope.formulario.Inscricao.Responsavel == undefined ){
            $timeout(self.adicionarResponsavel, 500);
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
        
        if(self.professorParceiro == undefined)
        {
            $timeout(self.adicionarParceiro, 500);
        }
        else{
            // inserindo mesmo cara 2 vezes
            var result = $filter('filter')($scope.formulario.Inscricao.Parceiros, {Id : self.professorParceiro.Id});
            if( result.length == 0 )
            {
                $scope.formulario.Inscricao.Parceiros.push({ "Id": "" + self.professorParceiro.Id + "", "Nome": "" + self.professorParceiro.Nome + "" });
            }
            $timeout(function () {
                jQuery("#professorParceiro_value").val("");
                jQuery("#professorParceiro_value").focus();
                self.professorParceiro = undefined;
            }, 100);
        } 
    };

    // Remove Professor Parceiro
    this.removerParceiro = function (index) {
        $scope.formulario.Inscricao.Parceiros.splice(index,1);
    };
        
    // Aguarda a mudança de turma
    $scope.$watch("objEquipe", function () {
        self.resetTurma();
        self.getProfessores();
    });
}