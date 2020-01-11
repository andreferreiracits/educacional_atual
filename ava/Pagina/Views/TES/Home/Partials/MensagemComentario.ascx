<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pagina.Models.MensagemRapidaComentario>" %>
<%
    var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 39;
    var souComunicadorPost = (ViewData["souComunicadorPost"] != null) ? (bool)ViewData["souComunicadorPost"] : false;
    var postExcluido = (ViewData["postExcluido"] != null) ? (bool)ViewData["postExcluido"] : false;
    int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);   
    
%>
<div id="coment_<%=Model.IdComentario%>" <%=(Model.bolExcluido) ? "class=\"comentario_excluido_adm\"" : ""%>>
    <% if (Model.bolExcluido) { %>
        <p><span></span>Comentário excluído.</p>
    <% } %>

    <% if(Model.idPagina > 0) { %>
        <a href="/AVA/pagina/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="33" width="33" alt="" /></a>
    <% } else { %>
        <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="33" width="33" alt="" /></a>
    <% } %>
    
    <div class="textComentario">
            
        <% if (!Model.bolExcluido && !postExcluido && (souComunicadorPost || idUsuarioLogado == Model.IdUsuario)) { %>
            <a href="javascript: void(0);" class="FontAwesome coment_excluir confirma_excluir fecha_X" ident="<%=Model.IdComentario%>" data-idcomentario="<%=Model.IdComentario%>"><span></span></a>
        <% } %>

       <%if (Model.idPagina > 0){ %>         
            <h4><a href="/AVA/pagina/<%=Model.strLogin%>"><%=Model.strNome%></a></h4>
       <%}else{ %>
            <h4><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a></h4>               
       <%} %>
                 
            <span class="grupoTime"><%=Model.strTempoPublicacao%></span>

        <% if (!Model.bolExcluido && !postExcluido) { %>
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

