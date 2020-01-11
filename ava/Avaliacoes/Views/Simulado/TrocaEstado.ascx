<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.Models.Exam.Fluxo.SimuladoHistoricoEstado>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="areaBoxFluxo">
    <div class="boxSugestaoFluxo">
        <div class="ComentFluxo"><%= Model.Usuario.Nome %>, alterou em <%= Model.Data.ToString("dd/MM/yyyy")%> às <%= Model.Data.ToString("HH:mm")%>h</div>
        <p><%= Model.Comentario %></p> 
    </div>
</div>

                               
