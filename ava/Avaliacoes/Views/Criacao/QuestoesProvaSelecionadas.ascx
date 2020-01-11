<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

    
<%  using (Html.BeginForm("CarregarQuestoesProva", "Criacao", FormMethod.Post, new { @id = "frmTabelaQuestoes", @class = "tbl" }))
    { %>

    <%= Html.Hidden("txtIdProvaQuestoes", Model.Id) %>
    <div class="clear"></div>
    <div class="areaTabelaQuestoes areaTabelaQuestoesCabecalho">
        <div id="caixaAdicionar" class="destaqueAzul <%=Model.PermissaoAlterarEstruturaHide %>">
	        <label>Selecione questões:</label>
            <a id="btnIncluirBusca" class="btnM"><span class="icoAdicionar"></span>Adicionar questões</a>
        </div> 
    </div>
    <div class="clear"></div>
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
    <div class="ferramentas areaTabelaQuestoesFerramentas <%=Model.PermissaoAlterarEstruturaHide %>">
        <div class="funcao">
            <div id="acao" class="slc">
                <a class="nome">Ações</a>
                <div class="opcoes acao">
                    <%= Html.ActionLink("Excluir", "ExcluirQuestaoProva", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
                </div>
            </div>
            <div class="slc ferragrupamento">
                <a class="nome">Agrupamento</a>
                <div class="opcoes agrupamento">
                    <table id="tblAgrupamentoQuestao" class="tabela tblAgrupamentoQuestao" width="100%" cellspacing="0" border="0" cellpadding="0">
                    <tbody></tbody>
                    </table>
                    <%= Html.ActionLink("Criar um novo agrupamento", "NovoGrupo", new { acao = "novogrupo" }, new { @class = "opcao novogrupo" })%>

                </div>
            </div>
        </div>
	    <div class="paginacao"></div>
        <a id="helpLisQuestaoAvaliacao" class="btn sec_ferramenta" href="javascript:void(0)">?</a>
    </div>
    <div class="clear"></div>
    <table id="tblQuestoes" class="tabela" width="100%">
        <thead>
            <tr>
                <td style="width: 5px; " class="bordaGrupo"></td>
                <td class="selecionar" style="width: 20px; "><input type="checkbox" id="chkQuestao" name="chkQuestao" <%=Model.PermissaoAlterarEstruturaDisabled %> /></td>
                <td style="width:492px" colspan="2"><%= Html.ActionLink("Enunciado", "Ordenar")%></td>
                <td class="centro" style="width:70px"><%= Html.ActionLink("Valor", "Ordenar", new { @ordem = "valor" })%></td>
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
                <td colspan="4">paginacao</td>
            </tr>
        </tfoot>
    </table>

<%  } %>