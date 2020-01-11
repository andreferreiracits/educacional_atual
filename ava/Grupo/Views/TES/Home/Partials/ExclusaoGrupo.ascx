<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id="confirma_excluir">
	<p>Deseja realmente excluir?</p>
	<div class="botoes">
		<a href="javascript:void(0);" class="cancelar left" onclick="$.fancybox.close();">Cancelar</a>
		<a href="javascript:void(0);" class="btn_cor right" id="btnExclusaoGrupo" idGrupo="<%=ViewData["idGrupo"]%>">Excluir</a>
	</div>	
</div>
