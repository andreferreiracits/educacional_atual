<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews"%>

<div class="areaAvaliacoesSimulado">
    <div class="areaConfiguracao">
<%  
    using (Html.BeginForm("AvaliacoesSimulado", "Simulado", FormMethod.Post, new { @id = "frmAvaliacoesSimulado" }))
    {
%>
    <%= Html.Hidden("txtIdSimuladoAvaliacoes", Model.Id, new { @id = "txtIdSimuladoAvaliacoes" })%>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Avaliação</div>
        <div class="textoDivisao">Selecione a(s) avaliação(ões) associada(s) a este simulado.</div>
    </div>
    <div id="listaAgendamentos">
    <% foreach (AgendamentoView agendamento in Model.Aplicacoes)
       {
           Html.RenderPartial("ItemAgendamento", agendamento);
       } %>
    </div>
    

    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxProcurarProva); %>
<%  } %>
    </div>
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Simulado", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarAvaliacoes" class="btnNav">&laquo; Voltar</a>
            <a id="btnAvancarAvaliacoes" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>
</div>
<div id="dlgSelecionarProva" title="Pesquise por uma avaliação" class="popup SEC02511">
<%      using (Html.BeginForm("CarregarBuscaProva", "Simulado", FormMethod.Post, new { @id = "frmTabelaBusca" }))
        { %>
        <%= Html.Hidden("txtIdSimuladoBuscaProva", Model.Id)%>
        
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
                <label for="chkFinalidade" class="SEC02511_texto">Origem:</label>
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
                <div class="linhaImpar">
                    
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
                <%= Html.ActionLink("Selecionar", "AdicionarProvaBusca", "Simulado", new { @id = "btnAdicionarProvaBusca", @class = "btnNav" })%>
            </div>
        </div>
    <% } %>
    </div>
</div>

<div id="dlgVisualizarQuestoes" title="Listagem das Questões" class="popup SEC02511">
<%  using (Html.BeginForm("CarregarVisualizarQuestoesProva", "Simulado", FormMethod.Post, new { @id = "frmTabelaQuestoesResumo", @class = "tbl" }))
    { %>
    <input type="hidden" value="" name="idAplicacaoSalvar" />
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
                <tr class="vazio"><td colspan="6"></td></tr>
            </tbody>
        </table>
        </div>
        <div class="popupBotoes">
            <div class="btnEspacamento direita">
                <a id="btnFecharVisualizar" class="btnNav">Fechar</a>
            </div>
        </div>
    <% } %>
</div>