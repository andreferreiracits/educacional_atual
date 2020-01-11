<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaComentario>" %>
<%
int idUsuarioCmt = Model.IdUsuario;

var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
var souComunicadorPost = (ViewData["souComunicadorPost"] != null) ? (bool)ViewData["souComunicadorPost"] : false;

bool bolAdmin = false;
if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
{
    bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
}

bool vemDoAdminAVA = false;

if (ViewData["adminAVA"] != null)
{
    vemDoAdminAVA = Convert.ToBoolean(ViewData["adminAVA"]);
}
    
string strClassAtivoCurtiu = "";
if (Model.bolCurtiu)
{
    strClassAtivoCurtiu = "ativo";
}

bool postExcluido = false;

if (ViewData["postExcluido"] != null)
{
    postExcluido = Convert.ToBoolean(ViewData["postExcluido"]);
}

%>

<div id="coment_<%=Model.IdComentario%>">
    
     <%if (Model.idPagina > 0)
       { %>
        <a href="/AVA/Pagina/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="33" width="33"></a>
     <%}else{ %>
        <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="33" width="33"></a>
     <%} %>

	
	<div class="textComentario">

        <% 
        if ((int)ViewData["idUsuarioLogado"] == idUsuarioCmt || (bolAdmin && (!postExcluido && !Model.bolExcluido) && idFerramentaTipo != 39) || (idFerramentaTipo == 39 && souComunicadorPost))
        {    
            %>
            <a href="javascript: void(0);" class="FontAwesome coment_excluir confirma_excluir fancybox.ajax fecha_X" ident="<%=Model.IdComentario%>" data-idcomentario="<%=Model.IdComentario%>"><span></span></a>
		    <% 
        }
        
        if (vemDoAdminAVA)
        {
            %>
            <h4><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNomeReal%> <%if(Model.strApelido.Length > 0){%><span class="nome_apelido">(<%=Model.strApelido%>)</span><%} %></a></h4>
            <%
        }
        else
        {
             if (Model.idPagina > 0)
               { %>
                <h4><a href="/AVA/Pagina/<%=Model.strLogin%>"><%=Model.strNome%></a></h4>
             <%}else{ %>
                <h4><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a></h4>
             <%}
        }
        
        %>
        <span class="grupoTime"><%=Model.strTempoPublicacao%></span>

        <% 
        if (!Model.bolExcluido && !postExcluido)
        {
            %>
            <a class="botaoCurtirComentario <%=strClassAtivoCurtiu%>" href="javascript:void(0);" idComentario="<%=Model.IdComentario%>"></a>    
            <%        
        }    
        %>
		
        <div class="feedTotalGostaram" id="boxCurticoesComentario_<%=Model.IdComentario%>">
            <%
            Html.RenderPartial("Partials/ListaCurticoesComentario", Model);
            %>
        </div>
		<p class="ctn_msg"><%=Model.txtComentario%></p>
	</div>
	<div class="clearfix"></div>
</div>
