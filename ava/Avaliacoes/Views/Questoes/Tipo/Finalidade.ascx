<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer "%>
<div class="linhaImpar">
    <label class="questao ajustefinalidade" for="rdoFinalidadeAvaliacao">Finalidade:</label>
    <span class="SEC02511_texto">
        <%
            IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["Bancos"];
            foreach (SelectListItem banco in bancos)
            {
                %>
                <%=Html.RadioButton("rdoFinalidade", banco.Value, banco.Selected, new { @id = "rdoFinalidade_" + banco.Value })%>
                <label for="rdoFinalidade_<%=banco.Value%>"><%=banco.Text%></label>
                <%
            }
            %>
    </span>
    <a id="helpFinQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
</div>
