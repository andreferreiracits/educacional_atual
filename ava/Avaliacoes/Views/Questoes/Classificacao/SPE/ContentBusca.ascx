<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("AdicionarSPE", "Questoes", FormMethod.Post, new { @id = "frmAdicionarSPE", @class = "tbl" }))
{ %>
    <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.SPE.Id, new { @id = "intTipoSPE" })%>
    <% Html.RenderPartial("../Questoes/Classificacao/SPE/SPE"); %> 
<% } %>
</div>
