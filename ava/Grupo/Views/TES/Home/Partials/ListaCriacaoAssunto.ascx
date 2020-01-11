<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div>
	<h3><span class="ico FontAwesome"></span> Criar assunto</h3>
    <form action="javascript: void(null);">
	    <input type="text" placeholder="Nome do assunto" idAssunto="0" id="txtAssunto" value="" maxlength="30"/>
	    <a href="javascript:void(0);" class="cancelar right" id="btCancelarCriarAssunto">cancelar</a>
    </form>
</div>
