<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.AplicacaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.Models.Exam" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr class="alturaLinhaAplicacao">
            <td class="selecionar" width="5%">
                <%= Html.Hidden("chkAplicacao.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkAplicacao.Checked", false)%>
            </td>
            <td width="32%">
                <a class="lnk">
                    <%= (linha.TamanhoTitulo == 0) ? ("<em class=\"semEnunciado\">" + linha.Titulo + "</em>") : Html.Encode(linha.Titulo)%>
                </a>
                <div class="botoes">
<%                  if (linha.EstadoAplicacao == EstadoAplicacao.EmElaboracao)
                    { %>
                        <%= Html.ActionLink("Editar", "Nova", new { @id = linha.Id.ToString() }, new { @class = "btn normal" })%>
                        <%= Html.ActionLink("Excluir", "ExcluirAplicacao", new { @id = linha.Id.ToString() }, new { @class = "btnExcluir" })%>
<%                  } %>

<%                  if (linha.EstadoAplicacaoSimples == EstadoAplicacao.Publicada && linha.TipoAplicacao == TipoAplicacao.Impressa)
                    { %>
                        <a href="<%= linha.Impressao %>" class="btn normal">Download</a>
                        <%= Html.ActionLink("Regerar", "RegerarAplicacao", new { @id = linha.Id.ToString() }, new { @class = "btn" })%>
<%                  } %>

<%                  if (linha.EstadoAplicacao == EstadoAplicacao.Agendada)
                    { %>
                        <%= Html.ActionLink("Cancelar", "CancelarAplicacao", new { @id = linha.Id.ToString() }, new { @class = "btnExcluir" })%>
<%                  } %>

                <!--
                    <%= Html.ActionLink("Visualizar", "VisualizarProva", new { @id = linha.Id.ToString() }, new { @class = "btn" })%>
                    <%= Html.ActionLink("Participantes", "ParticipantesProva", new { @id = linha.Id.ToString() }, new { @class = "btn" })%>
                    <%= Html.ActionLink("Gabarito", "GabaritoProva", new { @id = linha.Id.ToString() }, new { @class = "btn" })%>
                    <%= Html.ActionLink("Resultados", "ResultadosProva", new { @id = linha.Id.ToString() }, new { @class = "btn" })%>
                -->
                </div>
            </td>
            <!--td class="strong" width="25%">< %= Html.Encode(linha.Instituicao)%></td-->
            <td width="15%"><%= Html.Encode(linha.Realizacao)%></td>
            <td width="13%"><span class="<%= linha.CssEstado %>"><%= Html.Encode(linha.Estado) %></span></td>
            <td width="10%"><%= Html.Encode(linha.Tipo)%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="6">Nenhuma prova encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>