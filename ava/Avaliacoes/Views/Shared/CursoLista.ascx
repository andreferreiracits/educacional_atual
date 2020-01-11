<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Lista<ProvaColegiada.Models.Curso>>" %>

<div>
    <ul id="lista" title="<%=Model.Itens.Count %>">
<%
    if (Model.Itens.Count > 0)
    {
        foreach (ProvaColegiada.Models.Curso item in Model.Itens)
        {
%>
        <li>
            <input type="checkbox" id="chkLista_<%= item.Id%>" name="chkLista" value="<%= item.Id%>" />
            <label for="chkLista_<%= item.Id%>"><%= item.Nome%> - <span class="fonteNormal"><%= item.Codigo%></span></label>
        </li>
<%
        }
    }
    else
    {
%>
        <li><%= Model.Mensagem %></li>
<%
    }
%>
    </ul>
    <div id="resultado"><%= Model.Mensagem %></div>
</div>