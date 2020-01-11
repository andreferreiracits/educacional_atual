<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.VisualizacaoProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div id="pagina" revisao="<%= Model.AtualRevisao ? "1" : "0" %>" atual="<%= Model.PaginaAtual %>" final="<%= Model.PaginaFinal %>" tipo="<%=Model.Questao.TipoResposta.Id%>">
    <div id="paginacao">
        <% Html.RenderPartial("../Realizacao/Paginacao", Model.Paginacao); %>
    </div>
    <div id="conteudo">
    
            <% if (Model.Questao.EnunciadoPai != null)
               {%>
            <div class="areaEnunciado mceView">
                <%= Model.Questao.EnunciadoPai.EPlano ? Html.Encode(Model.Questao.EnunciadoPai.Texto.Texto) : Model.Questao.EnunciadoPai.Texto.Texto%>	    
            </div>
            <%} %>
            <div class="areaEnunciado mceView">
                <%= (Model.Questao.Enunciado.Texto.TemHtml) ? Model.Questao.Enunciado.Texto.Html : Model.Questao.Enunciado.Texto.Plano%>
            </div>
            
            <div class="resposta">

<%
    Html.RenderPartial("../Questoes/" + Model.Questao.TipoRespostaView.ViewAlternativaRO, Model.Questao.Alternativas);
                //Html.RenderPartial(Model.Questao.ViewTipoRealizada, Model.Questao.TipoRealizada);

%>


            </div>
    </div>
</div>
