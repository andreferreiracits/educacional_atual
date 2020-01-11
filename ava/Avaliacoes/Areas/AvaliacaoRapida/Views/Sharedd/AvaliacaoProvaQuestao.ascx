<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="areaTabelaQuestoes" id="QuestoesProvaManual">
<% using ( Html.BeginRouteForm("Default", new { controller = "Criacao", action = "CarregarQuestoesNovaAvaliacao" }, FormMethod.Post, new { id="frmTabelaQuestoes", @class="tbl" }) ) { %>
    <div class="clear"></div>
<%--    <div class="btnDir">
	        <label for="slcQuestoesPagina">Questões por página:
            <select id="slcQuestoesPagina" name="slcQuestoesPagina" class="slcQuestoesPag">
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="1000">Todas</option>
            </select>
            </label>
            <a class="btnM" href="javascript:void(0)" id="btnPosicionamento" style="display: none;">atualizar posicionamento</a>
    </div>--%>
    <div class="ferramentas areaTabelaQuestoesFerramentas ">
        <div class="funcao">
            <div id="acao" class="slc">
                <a class="nome">Ações</a>
                <div class="opcoes acao" style="display: none;">
                    <a class="opcao" href="javascript:void(0)" id="avRapidaApagarQuestoes">Excluir</a>
                </div>
            </div>
        </div>
	    <div class="paginacao"></div>
        <%--<a id="helpLisQuestaoAvaliacao" class="btn sec_ferramenta" href="javascript:void(0)">?</a><div id="helpLisQuestaoAvaliacaoCaixa" class="SEC02511_CaixaAjuda hideI"><div class="SEC02511_AjudaConteudo">Dê um valor para as questões. Se quiser, mude a ordem das questões trocando os números de ordem ou arrastando as questões para cima ou para baixo.</div><div class="SEC02511_AjudaSeta"></div></div>--%>
    </div>
    <div class="clear"></div>
    <table id="tblQuestoes" class="tabela offOrdenacao" width="100%" cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <td style="width: 5px; " class="bordaGrupo"></td>
                <td class="selecionar" style="width: 20px; "><input type="checkbox" id="chkQuestao" name="chkQuestao"></td>
                <td style="width:492px" colspan="2"><a href="javascript:void(0)">Enunciado</a></td>
                <td class="centro" style="width:70px"><a href="javascript:void(0)">Valor</a></td>
                <td style="width:110px"><a href="javascript:void(0)">Identificador</a></td>
                <td style="width:120px"><a href="javascript:void(0)">Tipo</a></td>
                <td style="width:40px" colspan="2"><a class="crescente" href="javascript:void(0)">Posição</a></td>
            </tr>
        </thead>
        <tbody class="ui-sortable">
        </tbody>
        <tfoot class="substituir">
        <tr>
            <td class="boxTituloTotalValor" colspan="4">
                    <p>Total da Avaliação:</p>
            </td>
            <td class="boxInputTotalValor">
                    <input type="text" id="txtValorTotal" name="ValorTotal" class="txt centro" size="5" value="0,00">
            </td>
        </tr>
    </tfoot>
    </table>

    <input type="hidden" name="txtTabelaOrigem" value="frmTabelaQuestoes"><input type="hidden" name="viewState_frmTabelaQuestoes" id="viewState_frmTabelaQuestoes">
    <%} %>
</div>