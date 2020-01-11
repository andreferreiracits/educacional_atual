<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Grupo.Models.MensagemRapidaGrupoComentario>>" %>

<%
int totalComentarios = Convert.ToInt32(ViewData["totalComentarios"]);
int idMensagemRapida = Convert.ToInt32(ViewData["idMensagemRapida"]);
bool ehMediador = Convert.ToBoolean(ViewData["ehMediador"]);  
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
int idEstado = Convert.ToInt32(ViewData["idEstado"]);

bool vemDoAdminAVA = false;

if (ViewData["adminAVA"] != null)
{
    vemDoAdminAVA = Convert.ToBoolean(ViewData["adminAVA"]);
}

if (totalComentarios > 3)
{   
    %>
    <a href="javascript:void(0);" class="carregarComentarios" ide="<%=Model.First().idMensagemRapida%>" idMensagem="<%=Model.First().idMensagemRapida%>"><span class="icone_comentario_resumo"></span>Exibir todos os <strong><%=totalComentarios%> comentários </strong><span class="FontAwesome angle_down"></span></a>
    <%        
}

bool postExcluido = false;

if (ViewData["postExcluido"] != null)
{
    postExcluido = Convert.ToBoolean(ViewData["postExcluido"]);
}

foreach (var comentario in Model)
{   
    string strClassAtivoCurtiu = "";
    if (comentario.bolCurtiu)
        strClassAtivoCurtiu = "ativo";    
    
    %>
    <div id="coment_<%=comentario.idComentario%>" <%if(comentario.bolExcluido){%>class="comentario_excluido_adm"<%} %>>
	    
        <% 
        if (comentario.bolExcluido)
        {
            %>
            <p><span></span>Comentário excluído.</p>
            <%
        }    
        %>
        
        <a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><img src="<%=comentario.strMiniFoto%>" height="33" width="33"></a>
	    
        <div class="textComentario">		    
            <% 
            if (!comentario.bolExcluido && !postExcluido)
            {
                // Alteração Renan: Grupos com idEstado 3 (congelado) não devem permitir excluir comentários.
                if (!idEstado.Equals(3))
                {
                    if (ehMediador || (comentario.idUsuario == idUsuarioLogado) || vemDoAdminAVA)
                    {
                    %>
                    <a href="/AVA/Grupo/Home/ListaExclusaoMensagem/<%=comentario.idComentario%>" class="FontAwesome coment_excluir confirma_excluir fancybox.ajax excluir_comentario_grupo" idComentario="<%=comentario.idComentario%>"><span></span></a>
                    <%        
                    }
                }
            }    
                
            if (vemDoAdminAVA)
            {
                %>
                <h4><a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><%=comentario.strNomeReal%> <%if(comentario.strApelido.Length > 0){%><span class="nome_apelido">(<%=comentario.strApelido%>)</span><%} %></a></h4>
                <%
            }
            else
            {
                %>
                <h4><a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><%=comentario.strNome%></a></h4>
                <%
            }            
            %>

            <span class="grupoTime"><%=comentario.strTempoPublicacao%></span>
            <%
            if (!comentario.bolExcluido && !postExcluido)
            {
                // Alteração Renan: Grupos com idEstado 3 (congelado) não devem permitir curtir comentários.
                if (!idEstado.Equals(3)) 
                {
                    %>
		            <a class="botaoCurtirComentario <%=strClassAtivoCurtiu%>" href="javascript:void(0);" idComentario="<%=comentario.idComentario%>"></a>            
                    <%
                } 
            }
            %>
            <div class="feedTotalGostaram" id="boxCurticoesComentario_<%=comentario.idComentario%>">
                <%
                Html.RenderPartial("Partials/ListaCurticoesComentario", comentario);
                %>
            </div>                
		    <p class="ctn_msg"><%=comentario.strComentario%></p>
	    </div>
	    <div class="clearfix"></div>
    </div>
    <% 
}    
%>

