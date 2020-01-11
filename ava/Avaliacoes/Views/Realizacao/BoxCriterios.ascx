<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Question.CriterioCorrecao>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%
    var redacao = new Redacao { CriteriosCorrecao = Model };
    var total = 0;
%>
<div class="nao-corrigidos">
    <div class="areaDicas">
        <div class="areaDica">
            <div class="boxDica">
                <%= Html.ActionLink("(Exibir|Ocultar) critérios de correção", "", "", new { @class = "btnDica criterioCorrecao", @title = "Critérios de correção" })%>
			    <div class="indBoxDica hide"></div>
            </div>
            <div class="boxComentario">
                <%= Html.ActionLink("(Exibir|Ocultar) critérios de eliminação", "", "", new { @class = "btnDica", @title = "Critérios de eliminação" })%>
			    <div class="indBoxComentario hide"></div>
		    </div>
        </div>
        <div class="areaConteudoDica">
            <div class="conteudoDica hide">
                <div class="textoDica">
                    <div class="clear"></div>
                    <div class="correcao">
                        <div class="header">
                            <div class="cell-left">
                                <strong>Competência</strong>
                            </div>
                            <div class="cell-right">
                                <strong>Peso</strong>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="body">
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
                        </div>
                        <div class="footer">
                            <div class="cell-left">
                                <strong>TOTAL</strong>
                            </div>
                            <div class="cell-right">
                                <strong><%= total %></strong>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="conteudoComentario hide">
                <div class="textoDica">
                    <div class="clear"></div>
                    <%
                        if (redacao.CriteriosEliminacao.Count() > 0)
                        {
                            %>
                                <div class="eliminacao">
                                    <div class="header">
                                        <strong>Critérios de Eliminação</strong>
                                    </div>
                                    <%
                                        foreach (var criterio in redacao.CriteriosEliminacao)
                                        {
                                            %>
                                                <div class="row"><%= criterio.Criterio.Nome %></div>
                                            <%
                                        }
                                    %>
                                </div>
                            <%
                        }
                        else
                        {
                            %>
                                <div>Esta questão não possui critérios de eliminação.</div>
                            <%
                        }
                    %>
                </div>
            </div>
        </div>
    </div>
</div>
