<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ImpressaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<table class="cabecalho">
    <tr>
        <td>
            <h1 class="cabecalhoH1"><%=Model.NomeEscola %></h1>
            <p class="cabecalhoP"><span class="cabecalhoPSpan">Avaliação:</span> <%=Model.Nome%></p>
            
            <p class="cabecalhoP"><span class="cabecalhoPSpan"> <%= Model.AutorPortal ? "Autor:" : "Professor(a):"%></span> <%=Model.NomeProfessor%></p>
            
        </td>
        <td>
            <img src="<%=Model.Logo%>" />
        </td>
    </tr>
    
</table>

<% Html.RenderPartial(Model.ViewCabecalhoNota, Model); %>






