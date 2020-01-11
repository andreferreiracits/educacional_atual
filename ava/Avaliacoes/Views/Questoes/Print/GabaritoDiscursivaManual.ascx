<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<br />
<% if (Model.Alternativas.Count > 0 && !String.IsNullOrWhiteSpace(Model.Alternativas[0].Texto.TextoView))
   {  %>
    <span class="gabaritoLetra">Resposta modelo:</span>
    <div><%=UtilView.ResolvePathImgPrint(Model.Alternativas[0].Texto.TextoView)%></div>
<% } else { %>
    <span class="gabaritoLetra">Não existe resposta modelo cadastrada para essa questão.</span>
<% } %>