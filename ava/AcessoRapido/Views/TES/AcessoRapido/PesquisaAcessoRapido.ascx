<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<AcessoRapido.Models.Lista>" %>

<%
    int tipoOrdem = 0;
    if (ViewData["tipoOrdem"] != null)
    {
        tipoOrdem = Convert.ToInt32(ViewData["tipoOrdem"]);
    }
string catAtual = "";
string catAntiga = "";
bool abriu = false;
if (tipoOrdem == 2)
{
    foreach (var menus in Model.itensCategoria)
    {
        catAtual = menus.StrTitulo.Substring(0, 1).ToLower();
        if (catAtual != catAntiga)
        {
            if (abriu)
            {
                %>
                </ul>
                <%
                abriu = false;
            }
            %>
            <ul class="alfabetica" style="width: 100%;"> 
            <li style="float: left; width: 100%;"><%= catAtual%></li>
            <%
            abriu = true;
            
            /*Response.Write("<br><b>" + menus.StrTitulo.Substring(0, 1).ToUpper() + "</b>");
            Response.Write("<br><br>");
            Response.Write("<a href=\"" + menus.StrLink + "\" style=\"padding: 5px;\">" + menus.StrTitulo + "</a><br>");*/
        }
        %>
        <li style="float: left; width: 200px; margin-right: 5px;"><a href="<%= menus.StrLink %>" target="_blank"><%= menus.StrTitulo%></a></li>
        <%
        /*else
        {
            Response.Write("<a href=\"" + menus.StrLink + "\" style=\"padding: 5px;\">" + menus.StrTitulo + "</a>");
            Response.Write("<br>");
        }*/
        catAntiga = catAtual;
    }
    %>
    </ul>
        <%
}
else
{
    foreach (var menus in Model.itensCategoria)
    {
        catAtual = menus.StrCategoria;

        if (catAtual != catAntiga)
        {
            if (abriu)
            {
                %>
                </ul>
                <%
                abriu = false;
            }
            %>
            <ul class="ava_box_masonry">
            <li><%= menus.StrCategoria%></li><%
            abriu = true;
        }

        if (menus.StrLink.IndexOf("http://blog") != -1)
        {
            %>
            <li><a href="<%= menus.StrLink %>" target="_blank"><%= menus.StrTitulo%></a></li>
            <%
        }
        else
        {
            %>
            <li><a href="<%= menus.StrLink %>"><%= menus.StrTitulo%></a></li>
            <%
        }

        catAntiga = catAtual;

    }

 %>
 </ul>
 <%
}
%>