<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Grupo.Models.Grupos>>" %>

<%
if (Model.Count > 0)
{
    %>
    <ul>
        <%
        foreach (var grupo in Model)
        {            
            %>
            <li class="lGrupo_<%=grupo.id%>">
                <img src="<%=grupo.strFoto%>" height="35" width="35" />
                <a id="<%=grupo.id%>" foto="<%=grupo.strFoto%>" href="javascript: void(0);"><%=grupo.strNome%></a>
            </li>
            <%   
        }
        %>
    </ul>
    <%
}
else
{
    %>
    <p>Nenhum grupo foi encontrado com os termos buscados</p>
    <%
}      
%>
