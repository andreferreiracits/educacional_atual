<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div id="caixaQuestoes">
    <table class="cnfg_aplicador_tblResumo tabela">
        <thead>
            <tr>
                <td colspan="3">Questão</td>
            </tr>
        </thead>
        <tbody>
        <%
        if (Model != null &&  Model.Prova.Questoes.Count > 0)
        {
            foreach (var questao in Model.Prova.Questoes)
            {
        %>
            <tr class="trLinhaQuestao">
                <td style="width:50px"><input type="checkbox" name="chkHidQuestao" value="<%=questao.Id %>" <%=Model.CheckQuestaoOculta(questao.Id) %> /></td>
                <td>
                    <div class="boxEnunciadoQuestao <%=Model.QuestaoOcultaDesabilitado(questao.Id)%>"><%= (questao.Enunciado.Plano.Length < 40) ? Html.Encode(questao.Enunciado.Plano) : Html.Encode(questao.Enunciado.Plano.Substring(0, 40) + "...")%></div>
                    <div class="boxConteudoQuestao"></div>
                </td>
                <td style="width:50px"><div class="setaFechado"></div></td>
            </tr>
        <%
            }
        }
        else
        {
        %>
            <tr class="vazio">
                <td colspan="3">Nenhuma questão encontrada.</td>
            </tr>
        <%
        }
        %>
        </tbody>
    </table>
</div>



