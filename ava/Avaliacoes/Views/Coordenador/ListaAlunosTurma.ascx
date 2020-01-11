<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<GerenciadorGrupos.Business.Model.AbstractTipoAgrupador>>" %>
<%@ Import namespace="GerenciadorGrupos.Business.Model" %>
<ul id="popAlunosTurma">
<%
    string borda = "";
    int count = 0;
%>

<%foreach(AbstractTipoAgrupador elemento in Model){
    borda = "";
    if (count > 2) { borda = "superior"; }
    if ( (count >= 1 ) && ( (count % 3) != 0 ) ) { borda += " esquerda"; }
%>
    <li class="<%=borda %>">
        <input type="radio" name="aluno" value="<%=elemento.Id %>" />
        <img class="foto" src="<%=elemento.icone %>" />
        <div><%=elemento.nome %></div>
    </li>
<%count++; } %>
</ul>