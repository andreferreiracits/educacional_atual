<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<div id="confirma_excluir">
	<p style="text-align:center">A exclusão dos itens selecionados pode</p> 
	<p style="text-align:center" >ocasionar na exclusão de uma postagem.</p> 
	<p style="text-align:center">Deseja Excluir?</p>

	<div class="botoes" style="padding-left: 58px; padding-top: 10px;">
		<a href="javascript:void(0);" class="cancelar left" id="btnCancelarExclusaoMensagem">Cancelar</a>
		<a href="javascript:void(0);" class="btn_cor right" id="btnExcluidMensagem" data-idmensagem="<%=Model%>">Excluir</a>
	</div>	
</div>