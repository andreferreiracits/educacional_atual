﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<a href="javascript:ViewProva(<%=Model.Id.ToString() %>);" class="btn funcao">Visualizar</a>