<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<%
    if (Model.Questao.TemQuestaoBase)
    {
        %>
            <div id="btnQuestaoPai" class="btnQuestaoPai">
                <div id="imgBtnQuestaoPai" class="imagemMenos"></div>
            </div>
            <div id="boxQuestaoPai" class="boxQuestaoPai">
                <%
                    foreach (var e in Model.Questao.EnunciadoBase)
                    {
                        %>
                            <div class="separadorQuestaoBase"></div>
                            <div class="areaEnunciado mceView"><%= e.Texto.TextoView %></div>
                        <%
                    }
                %>
            </div>
        <%
    }
%>
<div class="clear"></div>
<div class="areaEnunciado mceView">
    <%= Model.InstiuicaoEnunciado %>
    <%= Model.Questao.Enunciado.Texto.TextoView %>
</div>
<% Html.RenderPartial(Model.ViewBoxAreaComentarios, ((QuestaoRealizadaView) Model.Questao).ComentarioRealizada); %>
<div class="resposta">
    <% ViewData["ShowNota"] = Model.ShowNota; %>
    <% Html.RenderPartial(Model.ViewTipoRealizada, Model.TipoRealizada); %>
</div>
<div id="areaDuvidaQuestao">
    <% Html.RenderPartial(Model.BoxAreaDuvidas, Model); %>
</div>
<% Html.RenderPartial(Model.BoxInfoQuestao, Model); %>
<div class="areaNavInferior">
    <div class="btnCentral">
        <% Html.RenderPartial(Model.BoxBtnCentral, Model);%>
    </div>
</div>
