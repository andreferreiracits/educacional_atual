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
    
    <!-- Davisom Correa 
    Esta sessao do codigo foi removida temporariamente por conta da SAC 547928
    Quando mais de 3 comentarios são registrados em um post, os mesmos são agrupados através de um link, ao desagrupar os
    comentarios, este codigo era executado, resultando em um layout quebrado para o usuario.
    Supondo que este comportamento era resultante de uma implementação incompleta de uma feture de ramificação de comentarios
    (comentarios de comentarios) este codigo foi subistituido para exibição dos elementos na estrutura pré-agrupamento.
    Sessão do código incluida e não comentada originaria do arquivo "UserComentarioFeed.ascx"
	
    <ul class="post_comentarios">
        <li>
            <%if (Model.idPagina > 0)
               { %>
                <a href="/AVA/Pagina/<%=Model.strLogin%>" class="comentario_perfil"><img src="<%=Model.strMiniFoto%>"></a>
             <%}else{ %>
                <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" class="comentario_perfil"><img src="<%=Model.strMiniFoto%>"></a>
             <%} %>

            <div class="comentario_conteudo">
                <% 
                if ((int)ViewData["idUsuarioLogado"] == idUsuarioCmt || (bolAdmin && (!postExcluido && !Model.bolExcluido) && idFerramentaTipo != 39) || (idFerramentaTipo == 39 && souComunicadorPost))
                {    
                    %>
                    <a href="javascript: void(0);" class="opcao_excluir" onClick="excluirMensagemComentario(this); return false;" idcomentario="<%=Model.IdComentario%>"> </a>
                    <% 
                } %>
                <header class="comentario_header">
                    <h4 class="comentario_nome_usuario">
                        <%
                        if (vemDoAdminAVA)
                        {
                            %>
                            <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNomeReal%> <%if(Model.strApelido.Length > 0){%><span class="nome_apelido">(<%=Model.strApelido%>)</span><%} %></a>
                            <%
                        }
                        else
                        {
                             if (Model.idPagina > 0)
                               { %>
                                <a href="/AVA/Pagina/<%=Model.strLogin%>"><%=Model.strNome%></a>
                             <%}else{ %>
                                <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a>
                             <%}
                        }
                        
                        %>
                    </h4>
                    <span class="comentario_horario">
                    <%
                        var dataPost = Model.strTempoPublicacao;
                        /*if (dataPost.IndexOf("/") > 0)
                        {
                            dataPost = dataPost.Remove(10);
                        }
                        else if (dataPost.IndexOf("Ontem") >= 0)
                        {
                            dataPost = dataPost.Remove(5);
                        }
                        else
                        {
                            dataPost = dataPost.Replace("Hoje às", "");
                        }*/
                        Response.Write(dataPost);
                    %>
                    </span>

                    <% 
                    if (!Model.bolExcluido && !postExcluido)
                    {
                        %>
                        <a class="comentario_acao_curtir <%=strClassAtivoCurtiu%>" href="javascript:void(0);" onClick="curtirMensagem(this); return false;" idComentario="<%=Model.IdComentario%>"></a>    
                        <%        
                    }    
                    %>
            		
                    <div class="comentario_acao_feed" id="boxCurticoesComentario_<%=Model.IdComentario%>">
                        <%
                        Html.RenderPartial("Partials/ListaCurticoesComentarioNovaHome", Model);
                        %>
                    </div>
                </header>
        		<p class="comentario_texto"><%=Model.txtComentario%></p>
            </div>
        </li>
	</ul>
    -->

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
