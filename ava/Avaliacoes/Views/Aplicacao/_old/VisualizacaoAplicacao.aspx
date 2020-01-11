<%@ Page Language="C#" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="head" runat="server">
    <title>Avaliação</title>
    <base id="baseAvaliacao" href="<%= UtilView.UrlCompleta(Request) %>" />
    <base id="baseGerenciadoGrupos" href="<%= UtilView.PathGerenciadorGrupos("") %>" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/mceView.css") %>" /> 
    <!--link href="< %= UtilView.Url("/Content/css/questao.css") %>" rel="stylesheet" type="text/css" /-->
    <link href="<%= UtilView.Url("/Content/css/carregando.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/realizacao.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/timePicker.css") %>" rel="stylesheet" type="text/css" />

    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/jquery-ui-1.8.4.custom.css") %>" />
    
    <!--link href="< %= UtilView.Url("/Content/css/principal.css") %>" rel="stylesheet" type="text/css" /-->
    <link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/gerenciadorgrupos-1.0.1.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/aplicacao_Quick.css") %>" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.tmpl.min.js") %>"></script>

    <script src="<%= UtilView.Url("/Scripts/util/jquery.timePicker.min.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>

    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Msg.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Confirmacao.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Carregando3.0.0.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Realizacao.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/view/GerenciadorGrupos1.0.1.js")%>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/avaliacoes.quickaplicacao-1.0.1.js") %>"></script>
    <script type="text/javascript" language="javascript">
        
        var bolGerenciador = true;
        function editarAplicacao(id){
            var opcoesEditar = {
                'idAplicacao': id,
                'modo' : 'editar',
                'bolGerenciador' : bolGerenciador,
                'caminhoBaseGerenciador' : '<%= UtilView.PathGerenciadorGrupos("") %>'
            };
            $("#caixaLiberarAvaliacoes").avaliacoesQuickAplicacao(opcoesEditar)
        }
        function editarAplicacaoParalela(id, idConfig){
            var opcoesEditar = {
                'idAplicacao': id,
                'idConfig':idConfig,
                'modo' : 'editarparalela',
                'bolGerenciador' : bolGerenciador,
                'caminhoBaseGerenciador' : '<%= UtilView.PathGerenciadorGrupos("") %>'
            };
            $("#caixaLiberarAvaliacoes").avaliacoesQuickAplicacao(opcoesEditar)
        }


        function retornoMensagem(str){
            alert(str);
        }

        function abriuLista(){
            var $this = $("#caixaListarAvaliacoes");

            $this.find(".tabela .btnEditar").each(function () {
                var id = $(this).attr('href');
                $(this).attr('href', FUNCAO_VAZIA).click(function () {
                    var tmpIds = id.split('/');
                    if (tmpIds.length == 1) {
                        editarAplicacao(parseInt(tmpIds[0], 10));
                    } else {
                        editarAplicacaoParalela(parseInt(tmpIds[0], 10), parseInt(tmpIds[1], 10));
                    }
                        
                });
            });
        }
        var opcoesView = {
                'idProva': <%=ViewData["idProva"]%>,
                'showMensagem' : false,
                'retornoMensagem' : retornoMensagem,
                'modo' : 'view'
            };

        var opcoesViewSemCorreta = {
                'idProva': <%=ViewData["idProva"]%>,
                'showMensagem' : false,
                'retornoMensagem' : retornoMensagem,
                'modo' : 'view',
                'viewCorreta' : false
            };


        var opcoesCriar = {
                'idProva': <%=ViewData["idProva"]%>,
                //'idAplicacao': <%=ViewData["idAplicacao"]%>,
                'modo' : 'criar',
                'bolGerenciador' : bolGerenciador,
                'caminhoBaseGerenciador' : '<%= UtilView.PathGerenciadorGrupos("") %>'
            };

        var opcoesCriarParalela = {
                'idAplicacao': <%=ViewData["idAplicacao"]%>,
                'modo' : 'criarparalela',
                'bolGerenciador' : bolGerenciador,
                'caminhoBaseGerenciador' : '<%= UtilView.PathGerenciadorGrupos("") %>'
            };
        

        var opcoesListar = {
                'idProva': <%=ViewData["idProva"]%>,
                'modo' : 'listar',
                'editarAplicacao' : editarAplicacao
            };

        var opcoesListarParalelas = {
                'idAplicacao': <%=ViewData["idAplicacao"]%>,
                'modo' : 'listar',
                'editarAplicacaoParalela' : editarAplicacaoParalela
            };

        $(document).ready(function () {
            $("#btnView").click(function(){
                $("#caixaConteudoAvaliacoes").avaliacoesQuickAplicacao(opcoesView);
            })
            $("#btnViewSemResposta").click(function(){
                $("#caixaConteudoAvaliacoes").avaliacoesQuickAplicacao(opcoesViewSemCorreta);
            })
            $("#btnLiberar").click(function(){
                $("#caixaLiberarAvaliacoes").avaliacoesQuickAplicacao(opcoesCriar)
            })
            $("#btnListar").click(function(){
                $("#caixaListarAvaliacoes").avaliacoesQuickAplicacao(opcoesListar);
            })

            $("#btnLiberarParalela").click(function(){
                $("#caixaLiberarAvaliacoes").avaliacoesQuickAplicacao(opcoesCriarParalela)
            })

            $("#btnListarParalela").click(function(){
                $("#caixaListarAvaliacoes").avaliacoesQuickAplicacao(opcoesListarParalelas);
            })

        });

        

    </script>
</head>
<body>
    <a href="javascript:;" id="btnView">Visualizar</a> - 
    <a href="javascript:;" id="btnViewSemResposta">Visualizar Sem Resposta</a> -
    <a href="javascript:;" id="btnLiberar">Liberar</a> - 
    <a href="javascript:;" id="btnListar">Listar</a> - 
    <a href="javascript:;" id="btnLiberarParalela">Liberar Paralela</a> - 
    <a href="javascript:;" id="btnListarParalela">Listar Paralela</a>
    <div id="caixaLiberarAvaliacoes">
    </div>
    <div id="caixaListarAvaliacoes">
    </div>
    <div id="conteudo">
        <div class="titulo">Visualizacao Prova</div>
        <div id="caixaConteudoAvaliacoes">
        </div>
    </div>
</body>
</html>
