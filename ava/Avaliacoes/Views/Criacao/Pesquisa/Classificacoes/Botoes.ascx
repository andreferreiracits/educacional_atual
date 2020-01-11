<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>

        <li class="avancadaPasso1">
            <a id="btnBuscaAvancadaPasso1" class="btnPassos"><div>1 - Filtros Gerais</div></a>
            <div class="passoEstado"></div>
        </li>

    <% int count = 2; %>
    <% foreach ( var c in Model.Classificacoes ){ %>
        <li id="<%=c.Key %>" class="avancadaPasso<%=count %>">
            <a id="btnBuscaAvancadaPasso<%=count %>" class="btnPassos"><div> <%=count %> - <%=c.Value %></div></a>
            <div class="passoEstado"></div>
        </li>
    <%   count++;
        } %>