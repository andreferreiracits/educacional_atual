<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

    
<%  using (Html.BeginForm("CarregarQuestoesProva", "Criacao", FormMethod.Post, new { @id = "frmTabelaQuestoes", @class = "tbl" }))
    { %>

    <%= Html.Hidden("txtIdProvaQuestoes", Model.Id) %>
    <div class="areaTabelaQuestoes areaTabelaQuestoesCabecalho">
        <div class="btnEsq">
	        <a id="btnIncluirBusca" class="btnM">Adicionar questões</a>
        </div>
        <div class="btnDir">
	        <label for="slcQuestoesPagina">Questões por página:
            <select id="slcQuestoesPagina" name="slcQuestoesPagina" class="slcQuestoesPag">
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="1000">Todas</option>
            </select>
            </label>
            <%= Html.ActionLink("atualizar posicionamento", "AtualizarPosicionamento", "Criacao", new { @id = "btnPosicionamento", @class = "btnM" })%>
        </div>
    </div>
    <div class="clear"></div>
    
    <div class="ferramentas areaTabelaQuestoesFerramentas">
        <div class="funcao">
            <div id="acao" class="slc">
                <a class="nome">Ações</a>
                <div class="opcoes acao">
                    <%= Html.ActionLink("Excluir", "ExcluirQuestaoProva", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
                </div>
            </div>
            
        </div>

	    <div class="paginacao"></div>
    </div>
    <div class="clear"></div>
    <table id="tblQuestoes" class="tabela" width="100%">
        <thead>
            <tr>
                <td class="selecionar" style="width: 20px; "><input type="checkbox" id="chkQuestao" name="chkQuestao" /></td>
                <td style="width:567px" colspan="2"><%= Html.ActionLink("Enunciado", "Ordenar")%></td>
                <td style="width:110px"><%= Html.ActionLink("Identificador", "Ordenar", new { @ordem = "identificador" })%></td>
                <td style="width:120px"><%= Html.ActionLink("Tipo", "Ordenar", new { @ordem = "tipo" })%></td>
                <td style="width:40px" colspan="2"><%= Html.ActionLink("Posição", "Ordenar", new { @ordem = "posicao" }, new { @class = "crescente" })%></td>
            </tr>
        </thead>
        <tbody></tbody>
        <tfoot class="substituir">
            <tr>
                <td colspan="3">resultado</td>
                <td>total</td>
                <td colspan="3">paginacao</td>
            </tr>
        </tfoot>
    </table>
<%  } %>
