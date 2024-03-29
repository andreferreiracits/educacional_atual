﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaPaginada<ProvaColegiada.Models.Classificacao.AbstractClassificacao>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <tbody>
<%
    if (Model != null && Model.Linhas.Count > 0)
    {
        foreach (Assunto assunto in Model.Linhas)
        {
%>
        <tr>
            <td width="50%">
                <a class="lnk"><%= assunto.Area.Nome%></a>
                <div class="botoes">
                    <%= Html.ActionLink("Excluir", "ExcluirTipoClassificacao", new { @id = assunto.Id }, new { @class = "btnExcluir" })%>
                </div>
            </td>
            <td width="50%"><%= assunto.Nome%></td>
        </tr>
<%
        }
    }else{
        %>
         <tr class="vazio">
            <td colspan="2">Nenhum assunto selecionado.</td>
        </tr>
        <%
    }
    
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>



