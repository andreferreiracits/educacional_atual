<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Novos.TabelaView<ProvaColegiada.TabelaViews.Novos.Relatorio.Interface.IRelatorioItemListaView>>" %>

<table atual="<%= Model.Paginacao.Atual %>" width="100%">
    <tbody>
<%
    if (Model != null &&  Model.Itens.Count > 0)
    {
        foreach (var linha in Model.Itens)
        {
%>
        <tr>
            <td class="selecionar" style="width: 20px;">
                <%= Html.Hidden("chkRelatorio.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkRelatorio.Checked", Model.ControleCheck.IsCheck(linha.Id.ToString() ) ) %>
            </td>
		    <td style="width: 400px;"><%: linha.Titulo %>
                <div class="botoes">               
                    <%if( linha.Visualizar ) { %>
                        <a data-tipo="linkpopup" href="javascript:void(0);" data-link="<%= Url.RouteUrl("Default", new { controller = "Relatorio", action = "Visualiza", id=linha.Id }) %>"
                        title="Visualizar"
                        data-width="1100"
                        data-height="680"
                        data-scroll="true"
                        data-resizable="true"
                         class="btn normal btnVisualizar">Visualizar</a>
                    <%} %>
                    <%if( linha.Editar ) { %>
                        <a href="<%= Url.RouteUrl("Default", new { controller = "Relatorio", action = "Edicao", id=linha.Id }) %>" class="btn normal">Editar</a>
                    <%} %>
                    <%if( linha.Excluir ) { %>
                        <%= Html.ActionLink("Excluir", "Excluir", new { controller="RelatorioNovo", @id = linha.Id.ToString() }, new { @class = "btnExcluir" })%>
                    <%} %>
                </div>
            </td>
		    <td style="width: 110px;"><%: linha.Identificador %></td>
		    <td style="width: 140px;"><%: linha.Autor %></td>
		    <td style="width: 160px;"><%: linha.DataModificacao %></td>
            <td style="width: 160px;">
                <span class="<%: linha.EstadoClasse %>"><%: linha.EstadoTexto %></span>
            </td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="6">Nenhum relatório encontrado.</td>
        </tr>
<%
    }
%>
    <% foreach(string campo in Model.ControleCheck.HtmlChecados()){
       Response.Write(campo);
    }%>

    </tbody>
    <% Html.RenderPartial(Model.ViewPaginacao, Model.Paginacao); %>
</table>