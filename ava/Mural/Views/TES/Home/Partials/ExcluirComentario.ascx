<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<int>" %>

<div id="confirma_excluir">
	<p>Deseja realmente excluir?</p>
	<div class="botoes">
		<a href="javascript:void(0);" class="cancelar left" id="btnCancelarExclusaoComentario">Cancelar</a>
		<a href="javascript:void(0);" class="btn_cor right" id="btnExcluirComentario" data-idcomentario="<%=Model%>">Excluir</a>
	</div>	
</div>