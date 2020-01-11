<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Question.Fluxo.QuestaoHistoricoEstado>>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Fluxo" %>

<div class="divisaoQuestao" id="historicoAlteracao">
	<h2 class="tituloDivisao">Histórico de alterações</h2>
	<span class="textoDivisao">Será exibido as 10 últimas modificações realizadas na questão em ordem cronológica.</span>
    <a href="javascript:;" class="btn direita" id="btnOcultarHistorico"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
</div>

<div class="areaBoxHistoricoFluxo" id="contentHistorico">

<% 
    bool corsim = false;
    foreach (QuestaoHistoricoEstado historico in Model)
   {
        %>
    <div class="<%=corsim ? "linhaImpar":"linhaPar" %>">

        <div class="ComentFluxo"><%= historico.Usuario.Nome%>, alterou em <%= historico.Data.ToString("dd/MM/yyyy")%> às <%= historico.Data.ToString("HH:mm")%>h</div>
        <% if (!String.IsNullOrWhiteSpace(historico.Comentario))
           {
        %>
               <p><b>Comentário:</b><%= Html.Encode(historico.Comentario)%></p> 
        <%
           } %>
        
    </div>
<%
    corsim = corsim ? false : true;
    } %>

</div>

                               
