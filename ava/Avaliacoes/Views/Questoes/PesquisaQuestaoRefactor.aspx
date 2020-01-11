<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Pesquisa questão</title>

    <base id="baseSite" href="<%= UtilView.UrlCompleta(Request) %>" />

    <%=Html.BundleCss(
        "Content/css/principal.css",
        "Content/css/tabela.css",
        "Content/css/form.css",
        "Content/css/arvore.css",
        "Content/css/popup.css",
        "Content/css/mceView.css",
        "Content/css/questaoresumo.css",
        "Content/css/jquery-ui-1.8.4.custom.css"
    )%>

    <style>
        html
        {
            margin: 0;
            padding: 0;
        }
        body
        {
            margin: 0;
        }
        #MainAvaliacoes
        {
            padding: 0;
            display: none;
        }
        .novofiltro
        {
            margin: 0;
        }
        .avl_preload
        {
            text-align: center;
        }
        div.popupConteudo .tituloArvoreQuestao {
            margin: 5px 0;
        }
        div.popupConteudo .tituloArvoreQuestao label {
            background-color: #E6F0F6;
            padding: 8px 6px;
            font-size: 14px;
            font-weight: bold;
            color: #0B6EA8;
        }
      
        select#slcTipo.slc{
            float: left;
            margin-right: 25px;
        }
        
        
        .novofiltro #selectAreaAssunto .arvoreSelectClassificacao {
            margin: 0px 0 0 -132px !important;
        }
        .novofiltro #selectNivelEnsino .arvoreSelectClassificacao {
            margin: 0px 0 0 2px;
        }
        
        
        
        .novofiltro{
            height:auto;
        }
        div.novofiltroTags {
            min-height:60px;
            max-height:60px;
        }
        table.scroll > tbody > tr > td > div {
            height: 400px;
        }
        .novofiltroTags,
        #tblBuscaBox{
            padding:0px 15px;
        }
        table.scroll {
            height: 450px;
        }
        
    </style>


</head>
<body>
    <p class="avl_preload"><img src="<%=Url.Content("~/refactor-content/avl_img/widget_geral/load.gif")%>" /></p>
    <div id="MainAvaliacoes" class="SEC02511">

        <div class="popupConteudo">
            
                <% using (Html.BeginForm("CarregarQuestoesNovaBuscaProva", "Criacao", FormMethod.Post, new { @id = "frmTabelaBusca" }))
               { %>
               <div class="novofiltro">
                    <input type="hidden" name="listagemId" value="" />
                    <input type="hidden" name="IdBanco" value="" />
                    <input type="hidden" name="novofiltro" value="1" />
                    <p>Selecione uma ou mais opções abaixo para buscar por questões:</p>
                    <%--<a id="helpBoxQuestaoAvaliacao" class="btn sec_ajuda" href="javascript:void(0)">?</a>--%>
                    <div class="filtrosSimples">
                        <%= Html.TextBox("txtPalavraChave", "Palavra(s)-chave", new { maxlength = 60, @class = "txt txtPalavraChave txtChaveAddquestoes", @title = "Palavra(s)-chave" })%>
                        <% 
                        Html.RenderAction("FiltroSelect", "NivelEnsino");
                        Html.RenderAction("FiltroSelect", "AreaAssunto");
                       %>
                        <a class="filtroBuscar">Buscar</a>
                    </div>
                    <div class="clear"></div>
                    <div class="origemBusca">
                        <% if (!((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal && !((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
                           { %>
                        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Privada %>" checked="checked" /><span>Minhas questões</span></label>
                        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Escola %>" /><span>Questões da escola</span></label>
                        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Portal %>" /><span>Questões do <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%></span></label>
                        <div class="dataModificaBusca">
                            <label class="topico" for="txtModificado">Data de modificação:</label>
	                        <%= Html.TextBox("txtModificadoInicial", "", new { @id = "txtModificadoInicial", @size = 8, @maxlength = 20, @class = "txt txtData" })%>
	                        <span>a</span>
	                        <%= Html.TextBox("txtModificadoFinal", ViewData["Modificado"], new { @id = "txtModificadoFinal", @size = 8, @maxlength = 20, @class = "txt txtData" })%>
                        </div>
                        <% }
                           else
                           { %>
                           <label><span>Banco:</span></label>
                            <% 
        
                            IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["Bancos"];
                            foreach (SelectListItem banco in bancos)
                            {
                                %>
                            <label><input type="checkbox" name="chkFinalidade" value="<%= banco.Value %>" checked="checked" /><span><%=banco.Text%></span></label>
                            <% } %>
                           <%} %>
                    </div>
                    <div class="clear"></div>
                    <select class="slc" id="slcTipo" name="slcTipo"><option selected="selected" value="0">Selecione</option>
                        <option value="1">Simples Escolha</option>
                        <option value="2">Múltipla Escolha</option>
                        <option value="4">Discursiva Automática</option>
                        <option value="3">Discursiva Manual</option>
                        <option value="6">Verdadeiro ou Falso</option>
                        <option value="5">Somatória</option>
                        <option value="11">Associar Colunas</option>
                        <option value="12">Preencher Lacunas</option>
                    </select>
                    <div class="classificacaoCriterios">Classificação:                   
                        <span class="cad_classificacao">
                            <a class="btn" href="javascript:void(0);" id="btnFiltroHabilidade">competências e habilidades</a>
                            <input type="hidden" class="notsend" name="bancoPertence" value="2">
                        </span>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
                <div class="novofiltroTags"></div>
                <div class="clear"></div>
                <div id="tblBuscaBox">
                    <div class="clear"></div>
                    <table id="tblBusca" class="tabela scroll scrollQuestao" cellpadding="0" cellspacing="0" border="0" width="860">
                    <thead>
                        <tr>
                            <td style="width:30px;" class="selecionar"><input type="checkbox" id="chkQuestaoBusca" name="chkQuestaoBusca" /></td>
                            <td style="width:500px;" colspan="2">Questão</td>
                            <td style="width:180px;">Identificador</td>
                            <td style="width:150px;">Tipo</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="vazio"><td colspan="5"><br /><br /></td></tr>
                    </tbody>
                    </table>
                    <div class="ferramentas">
                        <div class="resultado"></div>
	                    <div class="paginacao"></div>
                    </div>
                </div>
            <% }%>
            
        </div>

    </div>
    

        <%Html.RenderAction("DialogoFiltro","HabilidadeCompetencia");%>
        <%Html.RenderAction("DialogoAdicionar", "HabilidadeCompetencia");%>


















    <%=Html.BundleScript(
        "Scripts/jquery-1.7.min.js",
        "Scripts/util/jquery-ui-1.8.5.custom.min.js",
        "Scripts/jquery.ui.widget.js",
        "Scripts/util/jquery.ui.datepicker-pt-BR.js"
    )%>

<%--    <%=Html.BundleScript(
                "Scripts/util/jquery.ui.mensagem.js",
                "Scripts/util/jquery.ui.combo.js",
                "Scripts/util/jquery.ui.selecionar.js",
                "Scripts/util/css_browser_selector.js",
                "/Scripts/util/jquery.meio.mask.js",
                "Scripts/util/jquery.ui.selectcombo.1.0.0.js"
    )%>--%>

    <%=Html.BundleScript(
                "Scripts/util/jquery.meio.mask.js",
                "Scripts/util/jquery.ui.combo.js",
                "Scripts/util/jquery.ui.selectcombo.1.0.0.js"
    )%>

    <%=Html.BundleScript(
        "Scripts/class/QuestaoResumo.js",
        "Scripts/class/NovaArvore2.0.0.js",
        "Scripts/class/NovaClassificacao.js",
        "Scripts/class/tabela.js",
        "Scripts/class/Ordenacao.js",
        "Scripts/class/DataMode1.0.0.js",
        "Scripts/view/recursosJs.js"
    )%>
   <% if (this.Usuario().TipoPortal == EnumTipoPortal.Educacional ||
       this.Usuario().TipoPortal == EnumTipoPortal.EducacionalPositivo ||
       this.Usuario().TipoPortal == EnumTipoPortal.PPParcial ||
       this.Usuario().TipoPortal == EnumTipoPortal.PortalAvaliacoes) { 
       %>
       <%=Html.BundleScript("Scripts/view/recursosJsEducacional.js")%>
       <%
   } %>
        
    <script type="text/javascript">

        var AVclassBuscaAssunto, AVclassBuscaNivel, classBuscaHabilidade;
        var FUNCAO_VAZIA = "javascript:void(0);"
        var caminhoBase = $("#baseSite").attr("href");
        var tblAdicionar;
        var baseAnoMax = "<%=UtilView.AnoMaximo %>";
        var baseAnoMin = "<%=UtilView.AnoMinimo %>";
        var dataMode = new DataMode();

        function initBuscaQuestao() {
            AVclassBuscaNivel    = new NovaClassificacao("NivelEnsino").montarSelectFiltro("#selectNivelEnsino");
            AVclassBuscaAssunto  = new NovaClassificacao("AreaAssunto").montarSelectFiltro("#selectAreaAssunto");
            classBuscaHabilidade = new NovaClassificacao("HabilidadeCompetencia").dialogoFiltroListaQuestoes("#dlgHabilidadesFiltro", "#btnFiltroHabilidade");
            classBuscaHabilidade.cancelarFiltroHabilidadeCompetencia = function(){
                classBuscaHabilidade.cancelarFiltroDefault();
                FechouSubPopup();
            };

            classBuscaHabilidade.executarFiltroHabilidadeCompetencia = function(){
               classBuscaHabilidade.executarFiltroDefault();
                FechouSubPopup();
            };
        }

        $(document).ready(function () {
            $('#MainAvaliacoes').show();
            $('.avl_preload').remove();

            $("input#txtModificadoInicial, input#txtModificadoFinal").datepicker({
                showOn: "button",
                buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
                buttonImageOnly: true
            });
            dataMode.data("input#txtModificadoInicial, input#txtModificadoFinal");

            function retornoTabelaBusca(acao, dados) {
                tblAdicionar.limpar();
            }

            tblAdicionar = new Tabela('frmTabelaBusca', 'tblBusca', false, new Ordenacao("nome", true), retornoTabelaBusca, '.dlgFiltroClassificacao > form');
            tblAdicionar.atualizarSelecionados = true;
            tblAdicionar.checkBoxName = "chkQuestaoBusca";
            tblAdicionar.retornoCarregarTabela = function (dados) {
                if (window.avl_refator_temErro(dados))
                    return;

                new QuestaoResumo("#tblBusca", "a.tooltip", function (retorno) {
                    window.avl_refator_temErro(retorno);
                }).aplicarBotaoExtra("a.tooltipextra");
            }
            initBuscaQuestao();

            $("#btnFiltroHabilidade").click(function(){
                AbriuSubPopup();
            });
           <%--
            //var json = { Prova: { IdBanco: 2, QuestoesSelecionadas: [13388, 13387]} };
            //window.avl_refator_old_set_data(json);
            --%>
        });


        window.avl_refator_old_get_data = function () {
            var obj = {Questao:[]},
                selecionadas = tblAdicionar.getSelecionados();
            for(var i=0, j=selecionadas.length; i<j; i++){
                obj.Questao.push(parseFloat(selecionadas[i]));
            }
            return obj;
        }
        window.avl_refator_old_refresh = function () {
            tblAdicionar.executarNovoFiltro();
        }

        window.avl_refator_old_set_data = function (json) {
            $("input[name=IdBanco]").val(json.Prova.IdBanco);
            $("input[name=listagemId]").val(json.Prova.QuestoesSelecionadas.join());
        }

        window.avl_refator_temErro = function (dados) {
            if ( $(dados).hasClass('erro') ) {
                window.avl_refator_erro(dados);
                return true;
            }

            return false;
        }

        var AbriuSubPopup = function(){
            window.avl_refator_acao("AbriuSubPopup");
        };
        var FechouSubPopup = function(){
            window.avl_refator_acao("FechouSubPopup");
        };
    </script>

</body>
</html>
