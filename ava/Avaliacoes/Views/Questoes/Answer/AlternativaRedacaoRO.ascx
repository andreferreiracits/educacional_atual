<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%
    var redacao = (Redacao) Model.Questao.Resposta;
    var total = 0;
%>
<div class="container-criterios-correcao">
    <div class="header">
        <div class="cell-left"><strong>Critérios de correção</strong></div>
        <div class="cell-right"><strong>Peso</strong></div>
        <div class="clear"></div>
    </div>
    <%
        foreach (var criterio in redacao.CriteriosObrigatorios)
        {
            if (criterio.Peso > 0)
            {
                total += criterio.Peso;
                %>
                    <div class="row">
                        <div class="cell-left"><%= criterio.Criterio.Nome %></div>
                        <div class="cell-right"><%= criterio.Peso %></div>
                        <div class="clear"></div>
                    </div>
                <%
            }
        }
        foreach (var criterio in redacao.CriteriosUsuario)
        {
            if (criterio.Peso > 0)
            {
                total += criterio.Peso;
                %>
                    <div class="row">
                        <div class="cell-left"><%= criterio.Criterio.Nome %></div>
                        <div class="cell-right"><%= criterio.Peso %></div>
                        <div class="clear"></div>
                    </div>
                <%
            }
        }
    %>
    <div class="footer">
        <div class="cell-left"><strong>TOTAL</strong></div>
        <div class="cell-right"><strong><%= total %></strong></div>
        <div class="clear"></div>
    </div>
</div>
<%
    if (redacao.CriteriosEliminacao.Count() > 0)
    {
        %>
            <br />
            <div class="container-criterios-eliminacao">
                <div class="header">
                    <div><strong>Critérios de eliminação</strong></div>
                </div>
                <%
                    foreach (var criterio in redacao.CriteriosEliminacao)
                    {
                        %>
                            <div class="row">
                                <div><%= criterio.Criterio.Nome %></div>
                            </div>
                        <%
                    }
                %>
            </div>
        <%
    }
%>
