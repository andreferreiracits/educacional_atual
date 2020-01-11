<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Barras.Models.LinkRapidoCategoria>>" %>
<%
    //List<Barras.Models.LinkRapidoCategoria> listaLinksRapido = (List<Barras.Models.LinkRapidoCategoria>)ViewData["links"];
%>
    <%
    if (Model != null)
    {
        foreach (var lrc in Model)// mostra os links diretos
        {
            if (lrc.bolPadrao) // Não padrão, possui link dentro
            {
                if (lrc.listaLinkRapido != null && lrc.listaLinkRapido.Count > 0)
                {
                    foreach (Barras.Models.LinkRapido lr in lrc.listaLinkRapido)
                    {
                        %>
                        <li class="link_item"><a href="<%=lr.strLink %>" target="_blank"><%=lr.strTitulo%></a></li>
                        <%
                    }
                }
            }
        }
        foreach (var lrc in Model) //mostra os com categoria depois
        {
            if (!lrc.bolPadrao) // Não padrão, possui link dentro
            {
                if (lrc.listaLinkRapido != null && lrc.listaLinkRapido.Count > 0)
                {
                %>
                    <li>
                    <h4><%=lrc.strCategoria%></h4>
                    <ul>
                    <%
                    if (lrc.listaLinkRapido != null && lrc.listaLinkRapido.Count > 0)
                    {
                        foreach (Barras.Models.LinkRapido lr in lrc.listaLinkRapido)
                        {
                        %>
                        <li class="link_item"><a href="<%=lr.strLink %>" target="_blank"><%=lr.strTitulo%></a></li>
                        <%
                        }
                    }
                    %>
                    </ul></li>
                    <%
                }
            }
        }
    }
        %>


