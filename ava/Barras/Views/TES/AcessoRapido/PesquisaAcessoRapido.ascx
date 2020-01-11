<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Barras.Models.Lista>"%>
<% 
    bool bolPesquisaProjetos = ViewData["bolPesquisaProjetos"] == null ? false : (bool)ViewData["bolPesquisaProjetos"];
     %>
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
            if (itens.StrLink.Equals("/AVA/Pagina/Projetos"))
            {
            %>
                <li class="sem_resultado"><a href="<%= itens.StrLink %>" <%= noResult %>><%= itens.StrTitulo%></a></li>
            <%
            } else {
            %>
                <li><a href="<%= itens.StrLink %>" <%= noResult %>><%= itens.StrTitulo%></a></li>
            <%
            }
        }
        i++;
    }
    if(Model.itensCategoria.Count > 5)
    {
        if (bolPesquisaProjetos)
        {
        %>
            <li id="pesquisaProjetos" class="fim_resultados"><a href="/AVA/Pagina/Projetos" >Descubra mais na página inicial do Educacional Projetos!</a></li>
        <%}
        else
        {
        %>
            <li class="fim_resultados"><a href="#" onclick="return false;">Veja os demais resultados para a sua busca</a></li>
        <%
        }
    }
 %>
</ul>