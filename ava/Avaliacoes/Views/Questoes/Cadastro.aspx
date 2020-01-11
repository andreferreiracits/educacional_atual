<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>"  %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/NovaClassificacao.js") %>"></script>
    <% 
        foreach (string jsClassificacao in EnumClassificacaoView.JSTipoClassificacao)
        {
            %>
            <script type="text/javascript" src="<%= UtilView.Url(jsClassificacao) %>"></script>
            <%
        }
    %>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/SimpleTipLoad.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Tags.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.textareaCounter.plugin.js") %>"></script>
    <%= Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/questoesCadastro.1.{0.0}.js") %>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/classificacaoQuestao.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.hoverIntent.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.cluetip.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.timePicker.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/NovaArvore.js") %>"></script> 
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Lista.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>
</asp:Content>
<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/arvore.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/questao.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/aplicacao.rapida.1.0.0.css") %>" />
</asp:Content>
<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
	<div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
                <% Html.RenderPartial(ViewData["ViewBotaoCriar"].ToString()); %>
				<div id="alerta" class="mensagem comBotao"></div>
			    <!-- #region Formulário da Tabela de Questao -->
				<% 
					using (Html.BeginForm("CarregarQuestaoCadastro", "Questoes", FormMethod.Post, new { @id = "frmTabelaQuestao", @class = "tbl" }))
				{ %>

                <% Html.RenderPartial("NovoFiltroCadastro"); %>
               
				<div class="ferramentas hide">
					<div class="funcao">
						<div id="acao" class="slc">
							<a class="nome">Ações</a>
                            <div class="opcoes acao">
                                <% if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal || ((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra) { %>
                                    <a class="opcao imprimirResumoQuestoes">Imprimir</a>
                                    <a class="opcao criarProvaRapida">Gerar Avaliação Rapida</a>
                                <%} %>
                                    <a class="opcao criarProva">Gerar Avaliação</a>
                                <% foreach (SelectListItem item in (IEnumerable<SelectListItem>)ViewData["UpdateStatus"])
                                   {
                                       if (Convert.ToInt32(item.Value) < 0)
                                           continue;
                                %>
                                    <a class="opcao statusMassa"><%=String.Format("Alterar estado para {0}", item.Text)%><input type="radio" value="<%=item.Value %>" name="hidStatus" /></a>
                                <% } %>
                                <hr />
                                <% if (!((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal && !((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
                                   {
                                %><%--       if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != EnumTipoPortal.Positivo)
                                       { --%>
                                <a class="opcao compartilharMassa"><%=String.Format("Alterar compartilhamento para {0}", "Privado")%><input type="radio" value="0" name="hidCompartilhar" /></a>
                                <a class="opcao compartilharMassa"><%=String.Format("Alterar compartilhamento para {0}", "Escola")%><input type="radio" value="1" name="hidCompartilhar" /></a>
                                <%--  } --%>
                                <% } %>
                                <hr />
                                <label>Alterar ano: <input type="text" class="txt" size="4" name="txtAnoMassa" id="txtAnoMassa" maxlength="4" /></label><a class="btn anoMassa">Ok</a>
								<%= Html.ActionLink("Excluir", "ExcluirQuestao", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
							</div>
						</div>
                        <div class="slc totalpagina">
                             <input name="intTamanhoPagina" id="intTamanhoPagina" value="10" type="hidden" />
                            <a class="nome"><span>10</span> questões por página</a>
                            <div class="opcoes">
                                <a class="opcao">10</a>
                                <a class="opcao">15</a>
                                <a class="opcao">20</a>
                                <a class="opcao">25</a>
                                <a class="opcao">30</a>
                            </div>
                        </div>
						<!--% Html.RenderPartial("oldFiltrosCadastro"); %-->
					</div>
					<div class="filtros"></div>
					<div class="paginacao"></div>
				</div>
					<div class="clear"></div>
					
				<table id="tblQuestoes" class="tabela">
					<thead>
						<tr>
							<td class="selecionar" style="width: 20px; "><input type="checkbox" id="chkQuestao" name="chkQuestao" /></td>
							<td style="width: 340px;" colspan="2">Enunciado</td>
							<td style="width: 100px;"><%= Html.ActionLink("Autor", "Ordenar", new { @ordem = "autor" })%></td>
							<td style="width: 100px;"><%= Html.ActionLink("Modificado", "Ordenar", new { @ordem = "modificado" }, new { @class = "crescente" })%></td>
							<td style="width: 100px;"><%= Html.ActionLink("Identificador", "Ordenar", new { @ordem = "identificador" })%></td>
							<td style="width: 70px;"><%= Html.ActionLink("Estado", "Ordenar", new { @ordem = "status" })%></td>
							<td style="width: 100px;"><%= Html.ActionLink("Tipo", "Ordenar", new { @ordem = "tipo" })%></td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
				<div class="ferramentas">
					<div class="resultado"></div>
					<div class="paginacao"></div>
				</div>
				<% } %>
			<!-- #end region Formulário da Tabela de Questao -->
			
			<div id="prevAviso"></div>

			</div>
		</div>
	</div>
	
<%
foreach (EnumTipoClassificacao tipo in (IList<EnumTipoClassificacao>)ViewData["Classificacoes"])
{
    EnumClassificacaoView tipov = EnumClassificacaoView.ValueOf(tipo);
  //TODO: trazer somente as classificações que pertencem a este banco
    Html.RenderAction(tipov.TipoView.ActionDialogoFiltro,tipov.TipoView.Controller);
    Html.RenderAction(tipov.TipoView.ActionDialogoAdicionar, tipov.TipoView.Controller);
                                
} %>

<% if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal || ((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra) { %>
    	<div id="dlgAvaliacaoRapida" title="Gerar avaliação rapida" class="hide popup SEC02511">
        <%--using (Html.BeginForm("SelecionarBanco", "Questoes", FormMethod.Post, new { @id = "frmSelecionarBanco", @class = "tbl" })) { --%>
		<div class="popupConteudo">
            <div id="caixaConteudoRapida" class="caixaConteudo">
                <div id="cxaProva"></div>
                <div id="cxaAgendamento"></div>
            </div>
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarAvaliacaoRapida" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnConcluirAvaliacaoRapida" class="btnNav">Concluir</a>
			</div>
		</div>
    <%--  } --%>
    </div>




<%} %>




	<div id="dlgTipoBanco" title="Selecionar banco de questões" class="popup SEC02511">
<%      using (Html.BeginForm("SelecionarBanco", "Questoes", FormMethod.Post, new { @id = "frmSelecionarBanco", @class = "tbl" }))
		{ %>
		<div class="popupConteudo">
			<p>Selecione:</p>

			<div id="treeBanco" class="boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarBanco" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnConcluirBanco" class="btnNav">Concluir</a>
			</div>
		</div>
<%  } %>


	</div>
</asp:Content>
