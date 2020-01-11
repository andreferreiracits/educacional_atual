<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Exam.Fluxo.AplicacaoHistoricoEstado>>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Exam.Fluxo" %>

<div class="divisaoQuestao">
	<h2 class="tituloDivisao">Hist�rico de altera��es</h2>
	<span class="textoDivisao">Ser� exibido as 10 �ltimas modifica��es realizadas na avalia��o em ordem cronol�gica.</span>
    <a href="javascript:;" class="btn direita" id="btnOcultarHistorico"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
</div>

<div class="areaBoxHistoricoFluxo" id="contentHistorico">

<% 
    bool corsim = false;
    foreach (AplicacaoHistoricoEstado historico in Model)
   {
        %>
    <div class="<%=corsim ? "linhaImpar":"linhaPar" %>">

        <div class="ComentFluxo"><%= historico.Usuario.Nome%>, alterou em <%= historico.Data.ToString("dd/MM/yyyy")%> �s <%= historico.Data.ToString("HH:mm")%>h</div>
        <% if (!String.IsNullOrWhiteSpace(historico.Comentario))
           {
        %>
               <p><b>Coment�rio:</b><%= Html.Encode(historico.Comentario)%></p> 
        <%
           } %>
        
    </div>
<%
    corsim = corsim ? false : true;
    } %>

</div>

                               
