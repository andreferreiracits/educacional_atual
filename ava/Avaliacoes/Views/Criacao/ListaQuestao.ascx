<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>"  width="100%">
    <% Html.RenderPartial("NovoFiltro", Model.Filtros); %>
    <tbody>
<%

    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr>
            <td style="width:30px;" class="selecionar">
                <%= Html.Hidden("chkQuestaoBusca.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkQuestaoBusca.Checked", Model.ControleCheck.IsCheck(linha.Id.ToString()))%>
            </td>
            <td>
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Id)) %>" rel="<%= Url.Action("CarregarTooltip","Questoes", new { @id = linha.Id.ToString() })%>"></a>
            </td>
            <td style="width:500px;">
                <a class="lnk tooltipextra">
                    <%= Html.Encode(linha.Enunciado) %>
                </a>
            </td>
            <td style="width:180px;"><%= Html.Encode(linha.Identificador)%></td>
            <td style="width:130px;"><%= Html.Encode(linha.Tipo.ToString()) %></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="4">Nenhuma questão encontrada.</td>
        </tr>
<%
    }
%>

    <% foreach(string campo in Model.ControleCheck.HtmlChecados()){
       Response.Write(campo);
    }%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>