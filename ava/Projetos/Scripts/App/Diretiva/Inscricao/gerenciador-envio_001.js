"use strict"
//Controllers comuns aos módulos de Gerenciador de Equipe/Envio/Inscrição
angular.module('Inscricao.mista')
.controller('criarEquipeCtrl', ['$scope', '$filter', '$log', '$modalInstance', '$http', '$timeout','upload', 'gruposcategorias', 'listaTurmas', 'edicaoConfig', 'objTipoInscricao', 'listaEquipes', 'objEquipe', 'objEtapa', 'edicao','alunosAdicionados','alunosMonitores','form','criarEquipe','gerenciarEquipe', function ($scope, $filter, $log, $modalInstance, $http, $timeout, upload, gruposcategorias, listaTurmas, edicaoConfig, objTipoInscricao, listaEquipes, objEquipe, objEtapa, edicao,alunosAdicionados,alunosMonitores,form,criarEquipe,gerenciarEquipe) {
    var self = this;
    self.config = {};

    var idEdicaoPrincipal = 0; //ID principal, pois projetos utiliza edicao.Id, e clubes utiliza objEtapa.Edicao.Id (desafio = edicao)

    
    objTipoInscricao = angular.copy(objTipoInscricao);

    $scope.edicao = edicao;
    $scope.edicaoConfig = edicaoConfig;
    $scope.gruposcategorias = gruposcategorias;
    $scope.TipoInscricao = objTipoInscricao;
    $scope.objEquipe = objEquipe;
    $scope.objEtapa = objEtapa;
    $scope.listaTurmas = listaTurmas;
    $scope.listaEquipes = listaEquipes;
    $scope.form = form;
    $scope.alunosAdicionados = alunosAdicionados;
    $scope.alunosMonitores = alunosMonitores;
    
    $scope.listaTurmasFinal = [{Id:0,Nome:"Turmas de toda a escola",desabilitada:true}].concat(clone_obj($scope.listaTurmas));

    $scope.bolNovaEquipe = true;
    $scope.turmaDesabilidada = false;
    $scope.buscaDesabilitada = false;
    $scope.inicioPagina = 1;
    $scope.fimPagina = 3;
    $scope.termobusca = "";
    $scope.resultadoBusca = new Array();
    //$scope.alunosAdicionados = new Array();
    $scope.alunoSelecionado = {};
    $scope.objConfig = {};
    $scope.objCategoriaEquipe = null;
    $scope.isSerieCategoriaInvalido = false;


    var idEquipe = 0;
    var idArquivo = 0;
    var idSituacao = 4;
    var Foto = "";
    var Nome = "";
    var Apresentacao = "";
    var alunos = new Array();

    var listSeriesCategoria = [];
        
    if($scope.edicao && $scope.edicao.Projeto && $scope.edicao.Projeto.Tipo){
        if($scope.edicao.Projeto.Tipo.Id == 1){
            idEdicaoPrincipal = $scope.edicao.Id;
        }else if($scope.objEtapa){
            idEdicaoPrincipal = $scope.objEtapa.Edicao.Id;
        }
    }

    if(idEdicaoPrincipal == 0 && $scope.objEtapa){
        idEdicaoPrincpial = $scope.objEtapa.Edicao.Id;
    }
        
    $scope.abrirNovaEquipe = function () {
        $modalInstance.dismiss('cancel');
        criarEquipe();
    };

    $scope.gerenciarEquipesCriadas = function () {
        $modalInstance.dismiss('cancel');
        gerenciarEquipe();
    };

    if($scope.objEquipe){
        if($scope.objEquipe.Id) if(!isNaN($scope.objEquipe.Id)){
            idEquipe = parseInt($scope.objEquipe.Id);
        }
        if($scope.objEquipe.Arquivo) if($scope.objEquipe.Arquivo.idArquivo) if(!isNaN($scope.objEquipe.Arquivo.idArquivo)){
            idArquivo = parseInt($scope.objEquipe.Arquivo.idArquivo);
        }
        if($scope.objEquipe.Situacao) if($scope.objEquipe.Situacao.Id) if(!isNaN($scope.objEquipe.Situacao.Id)){
            idSituacao = parseInt($scope.objEquipe.Situacao.Id);
        }
        if($scope.objEquipe.Foto){
            Foto = $scope.objEquipe.Foto;
        }
        if($scope.objEquipe.Nome){
            Nome = $scope.objEquipe.Nome;
        }
        if($scope.objEquipe.TxtApresentacao){
            Apresentacao = $scope.objEquipe.TxtApresentacao;
        }
        if($scope.objEquipe.Alunos) if($scope.objEquipe.Alunos instanceof Array){
            alunos = $scope.objEquipe.Alunos;   
        }
    }

    var bolEquipeValida=false;
    if($scope.objEquipe) if($scope.objEquipe.Id) if($scope.objEquipe.Id>0){
        $scope.form = {
            Edicao : { 
                Id : idEdicaoPrincipal 
            },
            TipoInscricao: { 
                Id: $scope.TipoInscricao[0].Id
            },
            Categorias: $scope.objEquipe.Inscricao.Categorias,
            Equipe:clone_obj($scope.objEquipe)
        };
        bolEquipeValida=true;
    }

    $scope.bolNovaEquipe = !bolEquipeValida;
    if(!bolEquipeValida) {
        $scope.form = {
            Edicao : { 
                Id : idEdicaoPrincipal 
            },
            TipoInscricao: { 
                Id: $scope.TipoInscricao[0].Id
            },
            Categorias: [],
            Equipe:{
                Id: 0,
                Foto: "",
                Nome: "",
                TxtApresentacao: "",
                Arquivo: {
                    idArquivo: 0    
                },
                Alunos : [],
                Inscricao: {
                    Id:0,
                    Categoria : [],
                    Turma: {
                        Id:0
                    }
                }
            }
        };
    }
        
        
    if (objTipoInscricao && objTipoInscricao.length > 0) {
        $scope.objConfig = objTipoInscricao[0];
        self.config.MaxIntegrantesPadrao = objTipoInscricao[0].MaxIntegrantesPadrao;
        $scope.objTipoInscricao = objTipoInscricao[0];
    }

    /* controle do gerenciador */
    if ($scope.gruposcategorias) {
        //Filtra para seleção de categoria na criação de equipe
        var objCategoriaFiltered = $filter('filter')($scope.gruposcategorias, { CategoriaLocal: { Id: 2 } }, true);
        if (objCategoriaFiltered.length > 0) {
            $scope.objCategoriaEquipe = objCategoriaFiltered;
        }
    }

    if ($scope.objCategoriaEquipe) { // existe categoria na edição, iniciar em 0;
        $scope.inicioPagina = 0;
    }

    $scope.currentPage = $scope.inicioPagina;

    $scope.prevPage = function () {
        $scope.currentPage--;
    };

    $scope.nextPage = function () {
        $scope.currentPage++;
        if($scope.currentPage==2){
            $scope.refreshComboTurmas();
        }

        if($scope.currentPage==$scope.fimPagina){
            $scope.salvarEquipe();
        }
    };
    /* fim controle gerenciador */
    

    //Caso selecione uma categoria e esta seja apenas para algumas Séries, atualiza o filtro de turmas
    this.populaFiltroTurmaPorCategoria = function(cat){
        if(cat && cat.Series){
            if(cat.Series instanceof Array && cat.Series.length > 0){
                for(var i = 0; i < cat.Series.length; i++){
                    listSeriesCategoria.push(cat.Series[i].Id);
                }
            }
        }
    };

    $scope.selectCategoria = function (cat) {
        listSeriesCategoria = [];

        self.populaFiltroTurmaPorCategoria(cat);

        if (cat.MaxIntegranteCategoria > 0) {
            $scope.objConfig.MaxIntegrantesPadrao = cat.MaxIntegranteCategoria;
        } else {
            $scope.objConfig.MaxIntegrantesPadrao = self.config.MaxIntegrantesPadrao;
        }

        $scope.refreshComboTurmas();
    };



    $scope.salvarEquipe = function () {
        if ($scope.form_criarequipe.$valid && $scope.validarFormEquipe()) {
            
            //verifica se deve obter o idTurma para passar adiante
            var possuiTipoEquipesHomogeneas = false;
            for (var tipo in $scope.edicao.InscricoesTipos) {
                if ($scope.edicao.InscricoesTipos[tipo].Id == 2)
                    possuiTipoEquipesHomogeneas = true;
            }
            if(possuiTipoEquipesHomogeneas){
                if($scope.listaTurmasFinal.length==1){
                    $scope.form.Equipe.Inscricao.Turma.Id = $scope.listaTurmasFinal[0].Id;
                }
                else{
                    //caso hajam mais de uma turma listada no filtro de turmas
                    //nao implementado pois não é garantido que a turma selecionada seja a adequada para o salvamento
                }
            }

            $scope.loadingCriarEquipe = true;
            $http.post('/AVA/Projetos/Servico/SalvarEquipe', angular.toJson($scope.form))
            .success(function (data) {
                    
                var bolError=true;

                if (data) if (data.Status) if (!isNaN(data.Status)) if (parseInt(data.Status) > 0) {
                    //Salvo com sucesso
                    var indice=-1;
                    if(parseInt($scope.form.Equipe.Id)>0){
                        //edicao de equipe já existente
                        for (var equipe in $scope.listaEquipes) {
                            if(data.Equipe.Id==$scope.form.Equipe.Id && $scope.form.Equipe.Id==$scope.listaEquipes[equipe].Id){
                                indice = $scope.listaEquipes.indexOf($scope.listaEquipes[equipe]);
                            }
                        }
                    }
                    else{
                        //criação de nova equipe
                        //adiciona no vetor um novo modelo geral as informações da nova equipe
                        if(indice<0){
                            $scope.listaEquipes.push(data.Equipe);
                            indice = $scope.listaEquipes.length-1;
                        }
                    }
                    if(data.Equipe) if(data.Equipe.Id) if(!isNaN(data.Equipe.Id)) if(parseInt(data.Equipe.Id)>0){
                        if(indice>=0) if($scope.listaEquipes[indice]) if($scope.listaEquipes[indice] instanceof Object){
                            /*
                            atualiza as variáveis do escopo:
                            - dados(id, foto,nome, descrição)
                            - alunos integrantes
                            - alterações de monitores
                            - categorias
                            */
                            bolError=false;
                            $scope.form.Equipe.Id = data.Equipe.Id;
                            $scope.form.Equipe.Nome = data.Equipe.Nome;

                            if(data.Equipe.Inscricao.Categorias) if(data.Equipe.Inscricao.Categorias instanceof Array && data.Equipe.Inscricao.Categorias.length > 0){
                                $scope.listaEquipes[indice].Inscricao.Categorias = data.Equipe.Inscricao.Categorias;
                            }

                            $scope.listaEquipes[indice].Id=data.Equipe.Id;
                            $scope.listaEquipes[indice].Foto=data.Equipe.Foto;
                            $scope.listaEquipes[indice].Arquivo.Id=data.Equipe.Arquivo.Id;
                            $scope.listaEquipes[indice].Nome=data.Equipe.Nome;
                            $scope.listaEquipes[indice].TxtApresentacao=data.Equipe.TxtApresentacao;
                            $scope.listaEquipes[indice].Alunos = new Array();
                            $scope.listaEquipes[indice].Alunos = clone_obj($scope.alunosAdicionados);
                        }
                    }
                    if(bolError){
                        alert("erro ao localizar a equipe:"+angular.toJson($scope.listaEquipes)+"\n      "+angular.toJson($scope.form.Equipe)+"     \n"+angular.toJson(data));
                    }
                }
                if(bolError){
                    //ocorreu um erro
                    alert("erro no salvamento");
                }
                else{
                    //$modalInstance.close(data.Equipe);
                    $scope.currentPage = $scope.fimPagina;
                }
            }).error(function(erro){
		    //alert("Ocorreu um erro ao tentar esta operação. Tente novamente!");
		    console.log(erro);
		    $scope.currentPage = $scope.fimPagina;
		    
            }).finally(function(){
                $scope.loadingCriarEquipe = false;
            });
        } else {
            var msg = "Há campos que não foram preenchidos, verifique por favor!\n\n";


            if ($scope.objCategoriaEquipe && $scope.form.Categorias.length == 0) {
                msg += "- Selecione a categoria \n";
            }

            if($scope.form.Equipe.Foto == "" || $scope.form.Equipe.Arquivo.idArquivo == 0){
                msg += "- Foto da equipe \n";
            }

            if($scope.form.Equipe.Nome == ""){
                msg += "- Nome da equipe \n";
            }

            if($scope.form.Equipe.TxtApresentacao == ""){
                msg += "- Texto de apresentação \n";
            }

            if($scope.form.Equipe.Alunos.length == 0){
                msg += "- Informe os logins dos alunos da equipe \n";
            }
            alert(msg);
        }
    };

    $scope.remoteUrlRequestFn = function (str) {
        var idEdicao = $scope.edicaoConfig.EdicaoID;
        var idTurma = 0;
        var selecao_atual=parseInt(angular.element("#turmaBuscarAluno").val());
        if(selecao_atual>0)
            idTurma = selecao_atual;
        //if ($scope.form_criarequipe.turma instanceof Object) if ($scope.form_criarequipe.turma.Id) if (!isNaN($scope.form_criarequipe.turma.Id))
        //idTurma = $scope.form_criarequipe.turma.Id;
        var termo = angular.element('#buscarAluno_value').val();
        var arrAdicionados = new Array();
        for(var user in $scope.alunosAdicionados){
            arrAdicionados.push($scope.alunosAdicionados[user].Id.toString());
        }
            
        return {
            idProjetoEdicao: idEdicao,
            idProjetoEquipe: 0,
            idTurma: idTurma,
            busca: str,
            adicionados: arrAdicionados.join(":"),
            seriesCategoria : listSeriesCategoria
        };
    };

    $scope.processadorRetorno=function(valores){
        //aqui pode-se realizar uma filtragem antes de devolver os dados para o componente angucomplete-alt
        return valores;
    }

    //em caso de edição configurada com equipes formadas exclusivamente por integrantes de uma mesma turma,
    //trava a combo habilitando somente a(s) respectiva(s) turma(s) relacionada(s) com o(s) aluno(s) incluído(s)
    $scope.refreshComboTurmas=function(force_exit){
        
        var possuiTipoEquipesHomogeneas = false;
        for(var tipo in $scope.edicao.InscricoesTipos){
            if($scope.edicao.InscricoesTipos[tipo].Id==2)
                possuiTipoEquipesHomogeneas=true;
        }
            
        $scope.listaTurmasFinal = [{Id:0,Nome:"Turmas de toda a escola",desabilitada:true}].concat(clone_obj($scope.listaTurmas));
        for(var turma in $scope.listaTurmasFinal){
            if($scope.listaTurmasFinal[turma].Id!=0)
                $scope.listaTurmasFinal[turma].desabilitada=false;
        }

        //localiza e remove as turmas da combo não relacionadas com os alunos adicionados
        if($scope.alunosAdicionados.length>0) if(possuiTipoEquipesHomogeneas) if($scope.listaTurmasFinal) if($scope.listaTurmasFinal instanceof Array){
            if (parseInt($scope.objConfig.MaxIntegrantesPadrao)<=30 && $scope.alunosAdicionados.length >= parseInt($scope.objConfig.MaxIntegrantesPadrao)) {
                $scope.buscaDesabilitada = true;
            }
            for(var turma in $scope.listaTurmasFinal){
                $scope.listaTurmasFinal[turma].desabilitada=true;
            }
            var turmasLocalizadas = false;
            for(var aluno in $scope.alunosAdicionados){
                if(!turmasLocalizadas){
                    //primeira iteração habilita todas turmas
                    for(var turma in $scope.alunosAdicionados[aluno].Turmas){
                        for(var lturma in $scope.listaTurmasFinal){
                            if($scope.listaTurmasFinal[lturma].Id==$scope.alunosAdicionados[aluno].Turmas[turma].Id){
                                turmasLocalizadas=true;
                                $scope.listaTurmasFinal[lturma].desabilitada=false;
                            }
                        }
                    }
                }
                else{
                    //segunda iteração adiante, manterá somente as repetidas
                    for(var lturma in $scope.listaTurmasFinal){
                        var encontrada=false;
                        for(var turma in $scope.alunosAdicionados[aluno].Turmas){    
                            if(!$scope.listaTurmasFinal[lturma].desabilitada && parseInt($scope.alunosAdicionados[aluno].Turmas[turma].Id)==parseInt($scope.listaTurmasFinal[lturma].Id)){
                                encontrada=true;
                            }
                        }
                        if(!encontrada){
                            $scope.listaTurmasFinal[lturma].desabilitada=true;
                        }
                    }
                }
            }
            //sinaliza em um vetor à parte quais turmas da combo não relacionadas com os alunos adicionados serão removidas
            var arrRemover = new Array();
            var novo_indice_selecionado = -1;
            //verifica se ja existia seleção e se a selecionada permanecerá / caso positivo, manterá a mesma selecionada
            var selecao_anterior=angular.element("#turmaBuscarAluno").val();
            var bolPresente=false;
            for(var turma in $scope.listaTurmasFinal){
                var indice = $scope.listaTurmasFinal.indexOf($scope.listaTurmasFinal[turma]);
                if(selecao_anterior>0 && $scope.listaTurmasFinal[turma].Id==selecao_anterior && !$scope.listaTurmasFinal[turma].desabilitada){
                    bolPresente=true;
                    novo_indice_selecionado = indice;
                }
                if(typeof($scope.listaTurmasFinal[turma])!="object"){
                    arrRemover.push(indice);
                }
                if($scope.listaTurmasFinal[turma].desabilitada){
                    arrRemover.push(indice);
                }
                else{
                    if(novo_indice_selecionado==-1 && $scope.listaTurmasFinal[turma].Id>0){
                        if(!bolPresente)
                            novo_indice_selecionado = indice;
                    }
                }
            }
                

            //atualiza a seleção atual/correção de BUG aonde surge uma opção vazia nas opções
            if(novo_indice_selecionado>-1){
                $scope.form_criarequipe.turma = $scope.listaTurmasFinal[novo_indice_selecionado];
            }

            //remove efetivamente da listagem no modelo
            for(var i=(arrRemover.length-1);i>=0;i--){
                $scope.listaTurmasFinal.splice(arrRemover[i],1);
            }
        }

        if(!$scope.possuiTipoEquipesHomogeneas){
            var _bloqueado = false;
            if (parseInt($scope.objConfig.MaxIntegrantesPadrao)<=30 && $scope.alunosAdicionados.length >= parseInt($scope.objConfig.MaxIntegrantesPadrao)) {
                _bloqueado = true;
            }

            if (_bloqueado) {
                $scope.buscaDesabilitada = true;
            }else{
                $scope.buscaDesabilitada = false;
            }
        }

            
        /* remove turmas caso a categoria seja restrito à algumas séries */
        if(listSeriesCategoria && listSeriesCategoria.length > 0){  
            var arrRemoverByCategoria = [];
            angular.forEach($scope.listaTurmasFinal, function(obj, idx){
                if(obj && obj.IdSerie){
                    var idx = listSeriesCategoria.indexOf(obj.IdSerie);
                    if(idx === -1){
                        var indice = $scope.listaTurmasFinal.indexOf(obj);
                        obj.desabilitada = true;
                        arrRemoverByCategoria.push(indice);
                    }
                }    
            });

            //remove efetivamente da listagem no modelo
            for(var i=(arrRemoverByCategoria.length-1);i>=0;i--){
                $scope.listaTurmasFinal.splice(arrRemoverByCategoria[i],1);
            }
        }
    };

    $scope.selecionadoAluno = function (aluno) {
        var found = false;
        if (aluno) if (aluno.description) if (aluno.description instanceof Object) {
            $scope.alunoSelecionado = aluno.description;
            found = true;
        }
        if (!found) if (aluno) if (aluno instanceof Object)
            $scope.alunoSelecionado = aluno;
    };

    $scope.alterarTurma=function(){
        $scope.turmaDesabilidada=true;
    }

    $scope.adicionarAluno = function () {
        var bloqueado = false, repetido = false;
        if ($scope.alunoSelecionado) if ($scope.alunoSelecionado instanceof Object) if ($scope.alunoSelecionado.Id) if (!isNaN($scope.alunoSelecionado.Id)) if (parseInt($scope.alunoSelecionado.Id) > 0) {
            if (parseInt($scope.objConfig.MaxIntegrantesPadrao)<=30 && $scope.alunosAdicionados.length >= parseInt($scope.objConfig.MaxIntegrantesPadrao)) {
                bloqueado = true;
            }
            if (!bloqueado) {
                var contador = 0;
                for (var aluno in $scope.alunosAdicionados) {
                    if ($scope.alunosAdicionados[aluno].Id == $scope.alunoSelecionado.Id) {
                        repetido = true;
                    }
                    else{
                        if($scope.alunosAdicionados.length==0 && $scope.alunosMonitores.length==0)
                            $scope.alunosMonitores=new Array($scope.alunosAdicionados[aluno]);
                    }
                }
                if (!repetido) {
                    $scope.alunosAdicionados.push(clone_obj($scope.alunoSelecionado));
                    $scope.form.Equipe.Alunos.push(clone_obj($scope.alunoSelecionado));
                }
                    
                if (parseInt($scope.objConfig.MaxIntegrantesPadrao)<=30 && $scope.alunosAdicionados.length >= parseInt($scope.objConfig.MaxIntegrantesPadrao)) {
                    bloqueado = true;
                }

                //desabilita as turmas não relacionadas com o aluno adicionado
                $scope.refreshComboTurmas();
                $scope.alunoSelecionado = {};
                $scope.$broadcast('angucomplete-alt:clearInput');
            }
        }
        if (bloqueado) {
            $scope.buscaDesabilitada = true;
        }
    };

    $scope.clearTurmasWatcher = $scope.$watch('form_criarequipe.turma', function () {
        $scope.$broadcast('angucomplete-alt:clearInput');
    });

    $scope.testaChecked = function (required, valores, min, max) {
        var requerido = required;
        if (requerido) if (valores) if (valores instanceof Array) {
            var total = 0;
            for(var valor in valores){
                if(valor.bolMonitor)
                    total++;
            }
            if ((min > 0) || (max > 0)) {
                if (((min > 0) && (total >= min)) && ((max > 0) && (total <= max))) {
                    requerido = false;
                }
            }
            else if (total > 0) {
                requerido = false;
            }
        }
        return requerido;
    };

    $scope.atualizaMonitor=function(indice,aluno,single){
        if(single){
            for(var tmpAluno in $scope.alunosAdicionados){
                if(parseInt($scope.alunosAdicionados[tmpAluno].Id)==parseInt(aluno.Id)){
                    $scope.alunosAdicionados[tmpAluno].bolMonitor=true;
                    //o proprio componente se encarrega de atualizar esse modelo
                    //$scope.alunosMonitores[indice]=$scope.alunosAdicionados[tmpAluno];
                }
                else{
                    $scope.alunosAdicionados[tmpAluno].bolMonitor=false;
                }
            }
            for(var tmAluno in $scope.form.Equipe.Alunos){
                if(parseInt($scope.form.Equipe.Alunos[tmAluno].Id)==parseInt(aluno.Id)){
                    $scope.form.Equipe.Alunos[tmAluno].bolMonitor=true;
                }
                else{
                    $scope.form.Equipe.Alunos[tmAluno].bolMonitor=false;
                }
            }
        }
        return true;

    };

    $scope.validarFormEquipe = function(){
        var retorno = ($scope.validaMonitores() && $scope.validaIntegrantes() && $scope.validaCategorias() && $scope.validarPerfilEquipe());
        return retorno;
    };

    $scope.validaCategorias=function(){
        var retorno = true;
        var invalidSerie = false;

        if ($scope.objCategoriaEquipe && $scope.form.Categorias.length == 0) {
            retorno = false;
        }
        
        //Caso exista algum Aluno que não deveria estar nesta Categoria (séries especificas)
        if(listSeriesCategoria && listSeriesCategoria instanceof Array && listSeriesCategoria.length > 0){
            if($scope.alunosAdicionados && $scope.alunosAdicionados instanceof Array){
                angular.forEach($scope.alunosAdicionados, function(obj, idx){
                    if(obj.Turmas){
                        angular.forEach(obj.Turmas, function(objTurma, indice){
                            var idx = listSeriesCategoria.indexOf(objTurma.IdSerie);

                            //se a turma deste aluno não estiver nas séries permitidas, bloqueia o salvar
                            if(idx === -1){
                                retorno = false;
                                invalidSerie = true;
                                obj.invalido = true;
                            }else{
                                obj.invalido = false;
                            }
                        });
                    }
                });
            }
        }
        
        if(invalidSerie){
            $scope.isSerieCategoriaInvalido = true;
        }else{
            $scope.isSerieCategoriaInvalido = false;
        }

        return retorno;
    };

    $scope.validarPerfilEquipe=function(){
        var retorno = true;
        var idArquivo = 0;

        if($scope.form.Equipe) if($scope.form.Equipe.Arquivo) if($scope.form.Equipe.Arquivo.idArquivo) if(parseInt($scope.form.Equipe.Arquivo.idArquivo)>0){
            idArquivo=parseInt($scope.form.Equipe.Arquivo.idArquivo);
        }

        if (typeof $scope.form.Equipe.Nome != 'undefined' && typeof $scope.form.Equipe.TxtApresentacao != 'undefined') {
            if ($scope.form.Equipe.Foto.toString().replace(/\s/g, "") == "" || idArquivo == 0 || $scope.form.Equipe.Nome.toString().replace(/\s/g, "") == "" || $scope.form.Equipe.TxtApresentacao.toString().replace(/\s/g, "") == "") {
                retorno = false;
            }
        }
        else {
            retorno = false;
        }
        return retorno;
    };

    $scope.validaMonitores = function () {
        var retorno=false;
        var element = "radio";
        if($scope.objConfig.MaxMonitoresPadrao>1)
            element = "check";
        var monitores = $filter('filter')($scope.alunosAdicionados, { bolMonitor: true}, true);
        if ((monitores.length >= parseInt($scope.objConfig.MinMonitoresPadrao)) && (monitores.length <= parseInt($scope.objConfig.MaxMonitoresPadrao))) {
            retorno=true;
        }
        return retorno;
    };

    $scope.validaIntegrantes = function () {
        var retorno=false;
        if (($scope.alunosAdicionados.length >= parseInt($scope.objConfig.MinIntegrantesPadrao)) && (parseInt($scope.objConfig.MaxIntegrantesPadrao)>30 || (parseInt($scope.objConfig.MaxIntegrantesPadrao)<=30 && $scope.alunosAdicionados.length <= parseInt($scope.objConfig.MaxIntegrantesPadrao)))) {
            if (($scope.form.Equipe.Alunos.length >= parseInt($scope.objConfig.MinIntegrantesPadrao)) && (parseInt($scope.objConfig.MaxIntegrantesPadrao)>30 || (parseInt($scope.objConfig.MaxIntegrantesPadrao)<=30 && $scope.form.Equipe.Alunos.length <= parseInt($scope.objConfig.MaxIntegrantesPadrao)))){
                retorno=true;
            }
        }
        return retorno;            
    };

    $scope.removerAluno = function (aluno) {
        var index = -1;
        for(var tempAluno in $scope.alunosAdicionados){
            if($scope.alunosAdicionados[tempAluno].Id==aluno.Id){
                index = tempAluno;
            }
        }
        if(index!=-1){
            $scope.alunosAdicionados.splice(index,1);
            $scope.form.Equipe.Alunos.splice(index,1);
            $scope.buscaDesabilitada = false;
        }
        $scope.refreshComboTurmas();
        if($scope.alunosAdicionados.length==0)
            $scope.form_criarequipe.turma={Id:0,Nome:"Turmas de toda a escola",desabilitada:false};
        else{
            var selecao_anterior=angular.element("#turmaBuscarAluno").val();
            if(selecao_anterior>0){
                for(var turma in $scope.listaTurmasFinal){
                    var indice = $scope.listaTurmasFinal.indexOf($scope.listaTurmasFinal[turma]);
                    if($scope.listaTurmasFinal[turma].Id==selecao_anterior && !$scope.listaTurmasFinal[turma].desabilitada){
                        $scope.form_criarequipe.turma = $scope.listaTurmasFinal[indice];
                        break;
                    }
                }
            }
            else{
                $scope.form_criarequipe.turma = $scope.listaTurmasFinal[0];
            }
        }
    };

    $scope.ok = function () {
        //var teste = { Id: 29, Nome: "Equiope debuGBUBDUEBUGB" };
        //$modalInstance.close(teste);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        if($scope.form_criarequipe.$dirty){
            if(confirm("Ao fechar o gerenciador, suas informações não serão salvas. Deseja continuar?")){
                $modalInstance.dismiss('cancel');
            }
        }
        else{
            $modalInstance.dismiss('cancel');
        }
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
        
    $scope.abreUploadEquipe = function () {
        //Chamando upload, passando parametro (idFerramentaTipo, idGrupoMural)
        upload.abreUpload(44,$scope.edicao.IdGrupoMural).then(function (retorno) {
            $scope.form.Equipe.Foto = '';
            $timeout(function(){
                $scope.form.Equipe.Foto = retorno.Foto;
                $scope.form.Equipe.Arquivo.idArquivo = retorno.IdArquivo;
            },200);
        }, function (retorno) {
            $log.error(retorno);
        }).finally(function() {
            // Default
        });
    };

    $scope.removerFotoEquipe = function(){
        $scope.form.Equipe.Foto = "";
        $scope.form.Equipe.IdArquivo = 0;
    };
    

    
    if($scope.objCategoriaEquipe && $scope.objEquipe && $scope.objEquipe.Inscricao && $scope.objEquipe.Inscricao.Categorias){
        if($scope.objEquipe.Inscricao.Categorias instanceof Array){
            var categoriaSelecionada = $filter("filter")($scope.objCategoriaEquipe[0].Categorias, { Id : parseInt($scope.objEquipe.Inscricao.Categorias[0].Id) }, true);
            if(categoriaSelecionada && categoriaSelecionada.length > 0){
                $scope.selectCategoria(categoriaSelecionada[0]);
            }
        }
    }
    


}]);

angular.module('Inscricao.mista')
.controller('gerenciarEquipeCtrl', ['$scope', '$modalInstance', '$http', '$filter', 'criarEquipe', 'listaTurmas', 'edicaoConfig', 'objTipoInscricao', 'objEquipe', 'objEtapa', 'edicao', 'listaEquipes', function ($scope, $modalInstance, $http, $filter, criarEquipe, listaTurmas, edicaoConfig, objTipoInscricao, objEquipe, objEtapa, edicao, listaEquipes) {
    $scope.edicao = edicao;
    $scope.objEquipe = objEquipe;
    $scope.objEtapa = objEtapa;
    $scope.edicaoConfig = edicaoConfig;
    $scope.listaTurmas = listaTurmas;
    $scope.listaEquipes = listaEquipes;
    $scope.openCriarEquipe = criarEquipe;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.abrirNovaEquipe = function () {
        $modalInstance.dismiss('cancel');
        criarEquipe();
    };

    $scope.abrirEdicaoEquipe = function (paramEquipe) {
        $modalInstance.dismiss('cancel');
        if(paramEquipe) if(paramEquipe.Id) if(!isNaN(paramEquipe.Id)) if(parseInt(paramEquipe.Id)>0){
            $scope.openCriarEquipe(paramEquipe);
        }
    };

    $scope.confirmarExclusaoEquipe = function (paramEquipe) {
        if(confirm("ATENÇÃO:\nVocê realmente deseja excluir essa equipe?\nEssa operação não poderá ser desfeita.")){
            $http.post('/AVA/Projetos/Servico/ExcluirEquipe', angular.toJson(paramEquipe))
            .success(function (data) {
                if (data) if (data.Status) if (!isNaN(data.Status)) if (parseInt(data.Status) > 0) {
                    //Excluida com sucesso
                    //remove da lista de equipes
                    var indice = $scope.listaEquipes.indexOf(paramEquipe);
                    $scope.listaEquipes.splice(indice,1);
                    //$modalInstance.close(data.Equipe);
                }
                else {
                    //ocorreu um erro
                    console.log("Ocorreu um erro no servidor na exclusão");
                }
            }).error(function(erro){
                console.log("Ocorreu um erro ao tentar esta operação. Tente novamente!");
            }).finally(function(){

            });              
        };
    };

    $scope.alternaColapsoElemento = function (idElemento) {
        var elemento = angular.element('#'+idElemento).eq(0);
        if(elemento.hasClass('open')){
            elemento.removeClass('open');
            elemento.find('ol').eq(0).slideUp();
        }
        else{
            elemento.addClass('open');
            elemento.find('ol').eq(0).slideDown();
        }
    };
} ]);
