<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>

<div class="areaTabelaQuestoes" id="QuestoesProvaManual">
<% Html.RenderPartial(Model.ViewQuestoesProvaSelecionadas, Model); %>

    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Criacao", new { @id = "btnCancelar", @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarQuestoes" class="btnNav">&laquo; Voltar</a>
            <a id="btnAvancarQuestoes" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>

    
    <div id="dlgAdicionarBusca" title="Pesquisar questões" class="popup SEC02511">
        <div class="popupConteudo">
            
                <% using (Html.BeginForm("CarregarQuestoesBuscaProva", "Criacao", FormMethod.Post, new { @id = "frmTabelaBusca" }))
               { %>
               <div class="novofiltro">
                    <input type="hidden" name="novofiltro" value="1" />
                    <p>Selecione uma ou mais opções abaixo para buscar por questões:</p>
                    <a id="helpBoxQuestaoAvaliacao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
                    <div class="filtrosSimples">
                        <%= Html.TextBox("txtPalavraChave", "Palavra(s)-chave", new { maxlength = 60, @class = "txt txtPalavraChave txtChaveAddquestoes", @title = "Palavra(s)-chave" })%>
                        <% 
                       if (Model.Classificacoes.Keys.Contains(EnumTipoClassificacao.NivelEnsino.Id))
                       {
                           Html.RenderAction("FiltroSelect", "NivelEnsino");
                       }
                       if (Model.Classificacoes.Keys.Contains(EnumTipoClassificacao.Assunto.Id))
                       {
                           Html.RenderAction("FiltroSelect", "AreaAssunto");
                       }%>
                        <a class="filtroBuscar">Buscar</a>
                    </div>
                    <div class="clear"></div>
                    <div class="origemBusca">
                        <% if (!((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal && !((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
                           { %>
                        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Privada %>" checked="checked" /><span>Minhas questões</span></label>
                        <%-- if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != EnumTipoPortal.Positivo)
                           { --%>
                        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Escola %>" /><span>Questões da escola</span></label>
                        <%-- } --%>
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
                     <%= Html.DropDownList("slcTipo", (IEnumerable<SelectListItem>)ViewData["Tipo"], new { @class = "slc" })%>
                    <div class="classificacaoCriterios">Classificação:
                    <%
                   foreach (int idTipo in Model.Classificacoes.Keys)
                   {
                       EnumClassificacaoView tipov = EnumClassificacaoView.ValueOf(idTipo);
                       //TODO: trazer somente as classificações que pertencem a este banco
                       Html.RenderAction(tipov.TipoView.ActionBtnFiltro, tipov.TipoView.Controller);

                   }
                    %>
                    </div>
                   
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

            
            <div class="clear"></div>
            <div class="popupBotoes pBtnCriacao">
                <div class="btnEspacamento">
                    <a id="btnCancelarBuscaQuestoes" href="javascript:void(0)" class="btnNav">Cancelar</a>
                </div>
                <div class="btnEspacamento direita">
                    <%= Html.ActionLink("Adicionar", "AdicionarQuestoesBusca", "Admin", new { @id = "btnAdicionarBuscaQuestoes", @class = "btnNav" })%>
                </div>
            </div>
        </div>

    </div>

    
    <% Html.RenderPartial("Grupo/DlgNovoGrupo"); %>



</div>

<%

    foreach (int idTipo in Model.Classificacoes.Keys)
{
    EnumClassificacaoView tipov = EnumClassificacaoView.ValueOf(idTipo);
  //TODO: trazer somente as classificações que pertencem a este banco
    Html.RenderAction(tipov.TipoView.ActionDialogoFiltro,tipov.TipoView.Controller);
    Html.RenderAction(tipov.TipoView.ActionDialogoAdicionar, tipov.TipoView.Controller);
                                
} %>
