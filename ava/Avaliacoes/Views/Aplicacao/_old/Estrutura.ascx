<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div class="areaProva">
    <div class="areaConfiguracoesAplicacao">
        

<% using (Html.BeginForm("SalvarAplicacao", "Aplicacao", FormMethod.Post, new { @id = "frmEstruturaAplicacao" }))
    { %>
    

    <div class="divisaoQuestao">
            <div class="tituloDivisao">Prova</div>
            <div class="textoDivisao">Selecione abaixo uma prova para associar a esta aplicação. </div>
        </div>
        <div id="caixaAdicionar" class="destaqueAzul">
            <label>Selecione uma prova:</label>
            <a id="btnAdicionarProva" class="btnAdicione"><span class="icoAdicionar"></span>procurar prova</a>
        </div>
        <div id="listaProvas">
<%      if (Model.Prova != null) {
            Html.RenderPartial("ItemProva", Model);
        } %>
        </div>

        
                

<%} %>

    </div>
    
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Aplicacao", new { @id = "btnCancelar", @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnAvancarProva" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>

    <div id="dlgSelecionarProva" title="Pesquise por uma prova" class="popup SEC02511">
<%      using (Html.BeginForm("CarregarBuscaProva", "Aplicacao", FormMethod.Post, new { @id = "frmTabelaBusca" })) { %>
        <%= Html.Hidden("txtIdAplicacaoBuscaProva", Model.Id)%>
        <div class="popupConteudo">
            <div class="areaBuscaProvas">
                <p>
                    <label for="txtNomeBusca" class="texto">Nome da prova:</label>
                    <input type="text" id="txtNomeBusca" name="txtNomeBusca" class="txt" />
                </p>
                <p>
                    <label for="slcCategoriaBusca" class="texto">Categoria da prova:</label>
                     <%= Html.DropDownList("slcCategoriaBusca", (IEnumerable<SelectListItem>)ViewData["Categoria"], new { @class = "slc" })%>
                </p>
                <p>
                    <label for="txtAutorBusca" class="texto">Autor:</label>
                    <input type="text" id="txtAutorBusca" name="txtAutorBusca" class="txt" />
                </p>
                <p>
                    
                    <span class="texto">Data de modificação:</span>
                    
					<%= Html.TextBox("txtModificadoBuscaInicial", "", new { @id = "txtModificadoBuscaInicial", @size = 14, @maxlength = 20, @readonly = "readonly", @class = "txt txtData" })%>
					<div class="txtMenor">até</div>
					<%= Html.TextBox("txtModificadoBuscaFinal", "", new { @id = "txtModificadoBuscaFinal", @size = 14, @maxlength = 20, @readonly = "readonly", @class = "txt txtData" })%>
                </p>
        
                <div class="clear"></div>
        
                <div class="btnBuscar">
                    <input type="submit" class="btnM" id="btnBuscarProvas" name="btnBuscarProvas" value="buscar" />
                </div>
                
            </div>    
            
            <table id="tblBusca" class="tabela scroll scrollBuscarProva" cellpadding="0" cellspacing="0" border="0" width="860">
                <thead>
                    <tr>
                        <td style="width:3%;" class="selecionar"></td>
                        <td style="width:45%;">Prova</td>
                        <td style="width:20%;">Autor</td>
                        <td style="width:12%;">Modificado</td>
                        <!--<td style="width:50px;">Questoes</td>-->
                        <td style="width:20%;">Tipo</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="vazio"><td colspan="5"></td></tr>
                </tbody>
            </table>
        </div>
        <div class="clear"></div>
        <div class="popupBotoes">
            <div class="btnEspacamento">
                <a id="btnCancelarProvaBusca" class="btnNav">Cancelar</a>
            </div>
            <div class="btnEspacamento direita">
                <%= Html.ActionLink("Selecionar", "AdicionarProvaBusca", "Aplicacao", new { @id = "btnAdicionarProvaBusca", @class = "btnNav" })%>
            </div>
        </div>
    <% } %>
    </div>
</div>

<div id="dlgVisualizarQuestoes" title="Listagem das Questões" class="popup SEC02511">
<%  using (Html.BeginForm("CarregarVisualizarQuestoesProva", "Aplicacao", FormMethod.Post, new { @id = "frmTabelaQuestoes", @class = "tbl" }))
    { %>
        <div class="popupConteudo">
            
                
        </div>
        <div class="popupBotoes">
            <div class="btnEspacamento direita">
                <a id="btnOcultarQuestoes" class="btnNav">Visualiar</a>
                <a id="btnFecharVisualizar" class="btnNav">Fechar</a>
            </div>
        </div>
    <% } %>
</div>
