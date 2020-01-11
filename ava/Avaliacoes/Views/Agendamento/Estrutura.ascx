<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div class="areaProva">
    <div class="areaConfiguracoesAplicacao">
        

<% using (Html.BeginForm("SalvarAplicacao", "Agendamento", FormMethod.Post, new { @id = "frmEstruturaAplicacao" }))
    { %>
    <input type="hidden" id="strPathFiles" value="<%=Model.CaminhoUpload %>" />

    <a id="helEstruturaAgendamento" class="btn sec_menuNavegacao" href="javascript:void(0)">?</a>

    <div class="divisaoQuestao">
            <div class="tituloDivisao">Avaliação</div>
            <div class="textoDivisao"> Selecione a avaliação associada a este agendamento. </div>
        </div>
        <div id="caixaAdicionar" class="destaqueAzul">
            <label>Selecione uma avaliação:</label>
            <a id="btnAdicionarProva" class="btnAdicione"><span class="icoAdicionar"></span>procurar avaliação</a>
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
            <%= Html.ActionLink("Cancelar", "Index", "Agendamento", new { @id = "btnCancelar", @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnAvancarProva" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>

    <div id="dlgSelecionarProva" title="Pesquise por uma avaliação" class="popup SEC02511">
<%      using (Html.BeginForm("CarregarBuscaProva", "Agendamento", FormMethod.Post, new { @id = "frmTabelaBusca" }))
        { %>
        <%= Html.Hidden("txtIdAplicacaoBuscaProva", Model.Id)%>
        
        <div class="popupConteudo">
            <div class="areaBuscaProvas">
                <div class="linhaPar">
                    <label for="txtNomeBusca" class="SEC02511_texto">Nome da avaliação:</label>
                    <input type="text" id="txtNomeBusca" name="txtNomeBusca" class="txt" />
                </div>
                <div class="linhaImpar">
                    <label for="txtIdentificadorBusca" class="SEC02511_texto">Identificador:</label>
                    <input type="text" id="txtIdentificadorBusca" name="txtIdentificadorBusca" class="txt" />
                </div>
                <div class="linhaPar">
                    <label for="chkOrigem1" class="SEC02511_texto">Origem:</label>
                    <div class="boxOrigem">
                        <label><input type="checkbox" name="chkOrigemBusca" id="chkOrigemBuscaMinha"  value="<%= (int)Compartilhada.Privada %>" /> Minhas</label>
                        <label><input type="checkbox" name="chkOrigemBusca" id="chkOrigemBuscaEscola" value="<%= (int)Compartilhada.Escola %>" /> Da minha escola</label>
                        <label><input type="checkbox" name="chkOrigemBusca" id="chkOrigemBuscaPortal" value="<%= (int)Compartilhada.Portal %>" /> Do <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%></label>
                    </div>
                </div>
                <div class="linhaImpar">
                <label for="chkFinalidade" class="SEC02511_texto">Finalidade:</label>
                <div class="boxFinalidade">
                    <%
                        IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["Bancos"];
                        foreach (SelectListItem banco in bancos)
                        {
                            %>
                            <label><input type="checkbox" name="rdoFinalidade" id="<%="rdoFinalidade_" + banco.Value%>"  value="<%= banco.Value %>" /><%=banco.Text%></label>
                            <%
                        }
                        %>
                </div>
            </div>
                <div class="linhaPar">
                    
                    <span class="SEC02511_texto">Data de modificação:</span>
                    
					<%= Html.TextBox("txtModificadoBuscaInicial", "", new { @id = "txtModificadoBuscaInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
					<div class="txtMenor">até</div>
					<%= Html.TextBox("txtModificadoBuscaFinal", "", new { @id = "txtModificadoBuscaFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>

                    <div class="btnBuscar">
                         <a id="btnBuscarProvas" href="javascript:void(0)" class="btnM"><span class="lupa"></span>Pesquisar</a>
                    </div>
                </div>
        
                <div class="clear"></div>
        
                
                
            </div>    
            
            <table id="tblBusca" class="tabela scroll scrollBuscarProva" cellpadding="0" cellspacing="0" border="0" width="860">
                <thead>
                    <tr>
                        <td style="width:30px;" class="selecionar"></td>
                        <td style="width:300px;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "nome" })%></td>
                        <td style="width:100px;"><%= Html.ActionLink("Identificador", "Ordenar", new { @ordem = "identificador" })%></td>
                        <td style="width:200px;"><%= Html.ActionLink("Modificado", "Ordenar", new { @ordem = "modificado" }, new { @class = "crescente" })%></td>
                        <td style="width:100px;"><%= Html.ActionLink("Seleção", "Ordenar", new { @ordem = "selecao" })%></td>
                        <td style="width:140px;"><%= Html.ActionLink("N° Questões", "Ordenar", new { @ordem = "nquetoes" })%></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="vazio"><td colspan="5"></td></tr>
                </tbody>
            </table>
            <div class="ferramentas">
				<div class="resultado"></div>
				<div class="paginacao"></div>
			</div>
        </div>
        <div class="clear"></div>
        <div class="popupBotoes">
            <div class="btnEspacamento">
                <a id="btnCancelarProvaBusca" class="btnNav">Cancelar</a>
            </div>
            <div class="btnEspacamento direita">
                <%= Html.ActionLink("Selecionar", "AdicionarProvaBusca", "Agendamento", new { @id = "btnAdicionarProvaBusca", @class = "btnNav" })%>
            </div>
        </div>
    <% } %>
    </div>
</div>

<div id="dlgVisualizarQuestoes" title="Listagem das Questões" class="popup SEC02511">
<%  using (Html.BeginForm("CarregarVisualizarQuestoesProva", "Agendamento", FormMethod.Post, new { @id = "frmTabelaQuestoes", @class = "tbl" }))
    { %>
    <input type="hidden" name="" id="" value="" />
        <div class="popupConteudo">
        <table id="tblQuestoes" class="tabela scroll scrollAnular" cellpadding="0" cellspacing="0" border="0" width="860">
            <thead>
                <tr>
                    <td style="width: 5px; " class="bordaGrupo"></td>
                    <td colspan="3" style="width:590px; padding-left:10px;">Enunciado</td>
                    <td style="width:114px;">Valor</td>
                    <td style="width:145px;">Identificador</td>
                </tr>
            </thead>
            <tbody>
                <tr class="vazio"><td colspan="5"></td></tr>
            </tbody>
        </table>
        </div>
        <div class="popupBotoes">
            <div class="btnEspacamento direita">
                <a id="btnOcultarQuestoes" class="btnNav">Visualizar</a>
                <a id="btnFecharVisualizar" class="btnNav">Fechar</a>
            </div>
        </div>
    <% } %>
</div>


