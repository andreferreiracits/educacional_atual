<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer "%>
<div class="linhaImpar">
    <label class="questao ajustefinalidade" for="rdoFinalidadeAvaliacao">Banco:</label>
    <span class="SEC02511_texto">
    <%
        IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["Bancos"];
        if (Model.PermissaoAlterarEstrutura)
        { 
    %>
        <%= Html.DropDownList("rdoFinalidade", bancos, new { @class = "slc banco slcBanco" })%>
        <%
}
        else
        {

            %>
<%= Html.DropDownList("rdoFinalidade", bancos, new { @class = "slc banco slcBanco", @disabled = "disabled" })%>
            <%
        }
         %>
    </span>
    <a id="helpFinQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
</div>
