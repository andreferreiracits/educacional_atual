<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Turma.Models.MensagemRapidaComentario>" %>
<%
    var bolModerador = (bool)ViewData["bolModerador"];
    var bolAdmRedeSocial = (bool)ViewData["bolAdmRedeSocial"];  
    int idUsuarioLogado = ViewData["idUsuarioLogado"] == null ? 0 : Convert.ToInt32(ViewData["idUsuarioLogado"]);
    if (idUsuarioLogado == 0 && ViewData["objUsuario"] != null)
    {
        idUsuarioLogado = ((UsuarioAVA.Models.Usuario)ViewData["objUsuario"]).id;
    }
    var bolPodeCurtir = (bool)ViewData["bolPodeCurtir"];    
%>
<div id="coment_<%=Model.IdComentario%>" <%=(Model.bolExcluido) ? "class=\"comentario_excluido_adm\"" : ""%>>
    <% if (Model.bolExcluido) { %>
        <p><span></span>Comentário excluído.</p>
    <% } %>
    <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="33" width="33" /></a>
	<div class="textComentario">
            
        <% if (!Model.bolExcluido && (bolModerador || bolAdmRedeSocial || idUsuarioLogado == Model.IdUsuario)) { %>
            <a href="javascript: void(0);" class="FontAwesome coment_excluir confirma_excluir fecha_X" ident="<%=Model.IdComentario%>" data-idcomentario="<%=Model.IdComentario%>"><span></span></a>
        <% } %>
            <h4><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a></h4>                    
            <span class="grupoTime"><%=Model.strTempoPublicacao%></span>

        <% if (!Model.bolExcluido && bolPodeCurtir) { %>
            <a class="botaoCurtirComentario <%=(Model.bolCurtiu) ? "ativo" : ""%>" href="javascript:void(0);" idComentario="<%=Model.IdComentario%>"></a>            
        <% } %>
		    
        <div class="feedTotalGostaram" id="boxCurticoesComentario_<%=Model.IdComentario%>">
            <%
                Html.RenderPartial("Partials/ListaCurtidasComentario", Model.curticoes, new ViewDataDictionary { { "intCurtidas", Model.intCurtidas }, { "IdMensagemRapida", Model.IdMensagemRapida }, { "IdComentario", Model.IdComentario }, { "bolCurtiu", Model.bolCurtiu }, { "idUsuarioLogado", idUsuarioLogado } });         
            %>
        </div>                
		<p class="ctn_msg"><%=Model.txtComentario%></p>
	</div>
	<div class="clearfix"></div>
</div>

