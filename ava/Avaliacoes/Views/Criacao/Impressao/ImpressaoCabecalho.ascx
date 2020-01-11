<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Impressao>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<table class="cabecalho">
    <tr>
        <td>
            <h1 class="cabecalhoH1"><%=Model.NomeEscola %></h1>
            <p class="cabecalhoP"><span class="cabecalhoPSpan">Avaliação:</span> <%=Model.Nome%></p>
            <p class="cabecalhoP"><span class="cabecalhoPSpan">Professor(a):</span> <%=Model.NomeUsuario%></p>
        </td>
        <td>
            <!--img src="< %=Model.Logo%>" /-->
        </td>
    </tr>
    
</table>

<br />
<%=UtilView.ResolvePathImgPrint(Model.Cabecalho)%>







