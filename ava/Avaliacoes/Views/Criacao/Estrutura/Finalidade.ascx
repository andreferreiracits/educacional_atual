<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<div class="linhaImpar">
    <div class="SEC02511_texto alinhamento">Finalidade da avaliação:</div>
    <div class="dadosCriacao">
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
    </div>
</div>