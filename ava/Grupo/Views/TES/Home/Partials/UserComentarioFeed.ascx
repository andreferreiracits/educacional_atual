<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.MensagemRapidaGrupoComentario>" %>

<% 
string strClassAtivoCurtiu = "";
if (Model.bolCurtiu)
{
    strClassAtivoCurtiu = "ativo";
}    
%>

<div id="coment_<%=Model.idComentario%>">
	<a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="33" width="33"></a>
	<div class="textComentario">
		<a href="/AVA/Grupo/Home/ListaExclusaoMensagem/<%=Model.idComentario%>" class="FontAwesome coment_excluir confirma_excluir fancybox.ajax excluir_comentario_grupo" idComentario="<%=Model.idComentario%>"><span></span></a>
		<h4><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a></h4>
		<span class="grupoTime"><%=Model.strTempoPublicacao%></span>
		<a class="botaoCurtirComentario <%=strClassAtivoCurtiu%>" href="javascript:void(0);" idComentario="<%=Model.idComentario%>"></a>
        <div class="feedTotalGostaram" id="boxCurticoesComentario_<%=Model.idComentario%>">

        </div>
		<p class="ctn_msg"><%=Model.strComentario%></p>
	</div>
	<div class="clearfix"></div>
</div>