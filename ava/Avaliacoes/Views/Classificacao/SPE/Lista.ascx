<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaPaginada<ProvaColegiada.Models.Classificacao.AbstractClassificacao>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">    
    <tbody>
<%
    if (Model != null && Model.Linhas.Count > 0)
    {
        foreach (SPE _class in Model.Linhas)
        {
%>
        <tr>
            <td style='width:18%;'>
                <%= _class.colecao.colecao %>
                <div class="botoes">
                    <a href="classSPE.EditarClassificacaoQuestao(<%= _class.Id %>);" class= "btn funcao">Editar</a>                    
                    <%= Html.ActionLink("Excluir", "ExcluirTipoClassificacao", new { @id = _class.Id }, new { @class = "btnExcluir" }) %>
                </div>
            </td>
            <td  style='width:8%;'><%= _class.edicao.edicao %></td>
            <td  style='width:14%;'><%= _class.disciplina.disciplina %></td>
            <td  style='width:12%;'><%= _class.ano.ano %></td>
            <td  style='width:12%;'><%= _class.volume.volume %></td>
            <td  style='width:12%;'><%= _class.unidade.unidade %></td>
            <td  style='width:8%;'><%= _class.tipo.tipo %></td>
            <td  style='width:7%;'><%= _class.ordem.ordem %></td>
            <td  style='width:7%;'><%= _class.grupo.grupo %></td>
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
