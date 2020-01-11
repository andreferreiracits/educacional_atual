<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Perfil.Models.MensagemRapidaComentario>>" %>

<%
int totalComentarios = Convert.ToInt32(ViewData["totalComentarios"]);
int idMensagemRapida = Convert.ToInt32(ViewData["idMensagemRapida"]);
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);

bool bolAdmin = false;
if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
{
    bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
} 

if (totalComentarios > 3)
{
    int totalComentariosAnteriores = totalComentarios - 3;
    if (totalComentariosAnteriores > 1)
    {
        %>
        <a href="javascript:void(0);" class="carregarComentarios" ide="<%=idMensagemRapida%>"><span class="icone_comentario_resumo"></span>Exibir todos os <strong><%=totalComentariosAnteriores%> comentários </strong>anteriores <span class="FontAwesome angle_down"></span></a>
        <% 
    }
    else
    {
        %>
        <a href="javascript:void(0);" class="carregarComentarios" ide="<%=idMensagemRapida%>"><span class="icone_comentario_resumo"></span>Exibir <strong><%=totalComentariosAnteriores%> comentário </strong>anterior <span class="FontAwesome angle_down"></span></a>
        <%     
    }
           
}   

foreach (var comentario in Model)
{
    string strClassAtivoCurtiu = "";
    if (comentario.bolCurtiu)
        strClassAtivoCurtiu = "ativo";    
    
    %>
    <div id="coment_<%=comentario.IdComentario%>">
	    <a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><img src="<%=comentario.strMiniFoto%>" height="33" width="33"></a>
	    <div class="textComentario">		    
            <%
            if (idUsuarioLogado == comentario.IdUsuario || bolAdmin)
            {
                %>
                <a href="javascript: void(0);" class="FontAwesome coment_excluir confirma_excluir fecha_X" ident="<%=comentario.IdComentario%>" data-idcomentario="<%=comentario.IdComentario%>"><span></span></a>
                <%        
            }
            %>
            <h4><a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><%=comentario.strNome%></a></h4>
		    <span class="grupoTime"><%=comentario.strTempoPublicacao%></span>
		    <a class="botaoCurtirComentario <%=strClassAtivoCurtiu%>" href="javascript:void(0);" idComentario="<%=comentario.IdComentario%>"></a>            
            <div class="feedTotalGostaram" id="boxCurticoesComentario_<%=comentario.IdComentario%>">
                <%
                Html.RenderPartial("Partials/ListaCurticoesComentario", comentario);
                %>
            </div>                
		    <p class="ctn_msg"><%=comentario.txtComentario%></p>
	    </div>
	    <div class="clearfix"></div>
    </div>
    <% 
}    
%>

