<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.Assunto>" %>

<div>
	<h3><span class="ico FontAwesome"></span> Editar assunto</h3>
    <form action="javascript: void(null);">
	    <input type="text" placeholder="Nome do assunto" idAssunto="<%=Model.id%>" id="txtAssunto" value="<%=Model.strAssunto%>" maxlength="30"/>
	    <a href="javascript:void(0);" class="cancelar left" id="btCancelarCriarAssunto">cancelar</a>
	    <a href="javascript:void(0);" class="btn_cor excluir right" onClick="excluirAssuntoGrupo(<%=Model.id%>);">excluir</a>
    </form>
</div>
