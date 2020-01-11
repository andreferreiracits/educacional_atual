<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.Models.Question.Fluxo.QuestaoHistoricoEstado>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="areaBoxFluxo">
    <div class="boxSugestaoFluxo">
        <div class="ComentFluxo"><%= Model.Usuario.Nome %>, alterou em <%= Model.Data.ToString("dd/MM/yyyy")%> às <%= Model.Data.ToString("HH:mm")%>h</div>
        <p><%= Html.Encode(Model.Comentario) %></p> 
    </div>
</div>

                               
