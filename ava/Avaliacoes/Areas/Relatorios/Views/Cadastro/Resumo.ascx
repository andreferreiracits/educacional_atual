<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Interfaces.IRelatorioView>" %>
<div class="areaRelatorio">
    <% Html.RenderPartial(Model.ResumoView); %>
</div>