<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Mural.Models.MensagemRapidaEducacionalItemPersonlizado>>" %>
<div id="compartilhado_com" class="seletor_pessoas_pagina">
<div class="ava_lightheader">
	<h1 class="">Compartilhado com:</h1>	
</div>						
<div class="lista_compartilhado engloba_compartilhar" id="listaCarteirinhaSeletorSelecionado">
    <% if(Model != null) foreach(var carteirinha in Model) { %>
    <div class="carteirinha_seletor carteirinha_selected grupo">
		<div class="in_cT"> 
			<span class="ava_clips_seletor"></span>
			<a href="javascript:void(0);"><span class="nomeUsuarioCarteirinha"><strong><%=carteirinha.primeiroTexto%></strong><%=(!String.IsNullOrEmpty(carteirinha.segundoTexto) ? " - " + carteirinha.segundoTexto : "")%></span>
				<p><%=carteirinha.terceiroTexto%></p> 
			</a>
		</div>
	</div>
    <% } %>
</div>	
<div class="clearfix"></div>
<div class="footer_seletor">
	<div class="botoes right">
		<a class="btn_cinza" href="javascript:void(0);">Fechar</a>
	</div>
</div>
</div>

