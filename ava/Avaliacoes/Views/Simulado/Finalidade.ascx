<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<div class="linhaImpar">
    <div class="SEC02511_texto alinhamento">Banco:</div>
    <div class="dadosCriacao">
        <%
        IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["Bancos"];
           %>
        <%= Html.DropDownList("rdoFinalidade", bancos, new { @class = "slc banco slcBanco" })%>

    </div>
</div>