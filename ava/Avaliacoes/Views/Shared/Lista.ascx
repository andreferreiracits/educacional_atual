<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Lista<ProvaColegiada.Models.DisciplinaCurso>>" %>

<div>
    <ul id="lista" title="<%=Model.Itens.Count %>">
<%
    if (Model.Itens.Count > 0)
    {
        foreach (ProvaColegiada.Models.DisciplinaCurso item in Model.Itens)
        {
%>
        <li>
            <input type="checkbox" id="chkLista_<%= item.Disciplina.Id%>" name="chkLista" value="<%= item.Disciplina.Id%>" />
            <label for="chkLista_<%= item.Disciplina.Id%>">
            	<%= item.Disciplina.Nome%> - <span class="fonteNormal"><%= item.Disciplina.Codigo%></span>
            </label> 
        </li>
<%
        }
    }
%>
    </ul>
    <div id="resultado"><%= Model.Mensagem %></div>
</div>