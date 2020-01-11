<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RecursoEtapaLink>>" %>

<%
if (Model.Count > 0)
{
    %>
    <h5>Links de apoio</h5>    
    <%
    foreach (var link in Model)
    {
        %>
        <div class="the_insertedLink">
            <a target="_blank" href="<%=link.strLink%>" class="umlink"><span></span><%=link.strTitulo%></a>
            <a href="javascript:void(0);" class="bt_normal " onclick="removerLinkApoio(<%=link.idLink%>)"><strong>x</strong></a> 
        </div>
        <%
    }
}
%>
