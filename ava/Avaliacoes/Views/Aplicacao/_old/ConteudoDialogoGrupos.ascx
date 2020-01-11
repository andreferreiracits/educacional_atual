<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>

<% foreach (AbstractTipoRealizadores g in Model.Realizadores(EnumTipoRealizadores.RealizadorGrupo))
    {%>
    <input type="hidden" name="chkRealizador" value="<%=g.Id %>" />
<%} %>

