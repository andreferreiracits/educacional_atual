<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<% using (Html.BeginForm("CarregarListaEncerrar", "Realizacao", new { @id=Model.IdAplicacao }, FormMethod.Post, new { @id = "frmCarregarListaEncerrar" }))
{ 
       
%>

<div id="boxEncerrar" class="xxboxEncerrar">

		

</div>
<%  } %>
