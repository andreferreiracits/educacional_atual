<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Barras.Models.Lista>" %>

<ul>
<%  
    int i = 1;
    foreach (var itens in Model.itensCategoria)
    {
        if (i <= 5)
        {
            string noResult;
            if (itens.StrLink == "semresultado")
            {
                noResult = "onclick='return false;'";
            }
            else
            {
                noResult = " ";
            }
            %>
            <li><a href="<%= itens.StrLink %>" <%= noResult %>><%= itens.StrTitulo %></a></li>
            <%
        }
        i++;
    }
    if(Model.itensCategoria.Count > 5)
    {
        %>
        <li class="fim_resultados"><a href="#" onclick="return false;">Veja os demais resultados para a sua busca</a></li>
        <%
    }
 %>
</ul>