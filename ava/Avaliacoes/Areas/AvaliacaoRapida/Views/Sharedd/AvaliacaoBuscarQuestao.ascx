<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<%--<div id="dlgAdicionarBusca" title="Pesquisar questões" class="popup SEC02511">
        <%--<div class="popupConteudo">--%>

    <% using ( Html.BeginRouteForm("Default", new { action = "CarregarQuestoesNovaBuscaProva", controller = "Criacao" }, FormMethod.Post, new { @id = "frmTabelaBusca" }) ) { %>
            <div class="novofiltro">
                <input type="hidden" name="novofiltro" value="1" />
                <p>Selecione uma ou mais opções abaixo para buscar por questões:</p>
                <div class="filtrosSimples">
                    <%= Html.TextBox("txtPalavraChave", "Palavra(s)-chave", new { maxlength = 60, @class = "txt txtPalavraChave txtChaveAddquestoes", @title = "Palavra(s)-chave" })%>
                            
                    <%--if (Model.Classificacoes.Keys.Contains(EnumTipoClassificacao.NivelEnsino.Id))
                    { 
                        <% Html.RenderAction("FiltroSelect", "NivelEnsino"); %>
                     }
                    if (Model.Classificacoes.Keys.Contains(EnumTipoClassificacao.Assunto.Id))
                    { 
                        <% Html.RenderAction("FiltroSelect", "AreaAssunto"); %>
                     }%>--%>

                    <% Html.RenderPartial("../Classificacao/NivelEnsino/FiltroSelect"); %>
                    <% Html.RenderPartial("../Classificacao/Assunto/FiltroSelect"); %>
                    <a class="filtroBuscar">Buscar</a>
                </div>
                <div class="clear"></div>
                <div class="origemBusca">      
                    <label><input type="checkbox" name="chkOrigemBusca" value="0" checked="checked"><span>Minhas questões</span></label>
                        
                    <label><input type="checkbox" name="chkOrigemBusca" value="1" checked="checked"><span>Questões da escola</span></label>
                        
                    <label><input type="checkbox" name="chkOrigemBusca" value="2" checked="checked"><span>Questões do portal</span></label>
<%--                    <div class="dataModificaBusca">
                        <label class="topico" for="txtModificado">Data de modificação:</label>
	                    <input class="txt txtData" id="txtModificadoInicial" name="txtModificadoInicial" size="14" type="text" value="">
	                    <span>a</span>
	                    <input class="txt txtData" id="txtModificadoFinal" name="txtModificadoFinal" size="14" type="text" value="">
                    </div>--%>
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
                    <tr class="vazio">
                        <td colspan="5"> Selecione uma ou mais opções acima para buscar por questões </td>
                    </tr>
                </tbody>
                </table>
                <div class="ferramentas">
                    <div class="resultado"></div>
	                <div class="paginacao"></div>
                </div>
            </div>
        <% }%>
        <div class="clear"></div>
<%--    </div>--%>

<%-- </div>--%>