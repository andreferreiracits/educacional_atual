<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Interfaces.IDadosConsultaView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Interfaces" %>
<% Html.RenderPartial("../Visualiza/" + Model.PathView, Model); %>
