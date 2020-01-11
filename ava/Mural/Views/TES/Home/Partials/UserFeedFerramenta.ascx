<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaUsuario>" %>

<% 
int idMensagemRapida = Model.IdMensagemrapida;

var linkCompartilhamento = "";
if (Model.idFerramentaTipo != 32 && Model.idFerramentaTipo != 33 && Model.idFerramentaTipo != 34 && Model.idFerramentaTipo != 39)
    linkCompartilhamento = "<span class=\"icon_compartilhado_com\" iditem=" + idMensagemRapida + "></span>";

%>

<article class="clearfix <%if(Model.bolEducador){%>  highlight <%} %>" id="avaMsg_<%=idMensagemRapida %>" ide="<%=idMensagemRapida%>" >
                    
    <ul class="combo_denunciar_excluir">
        <li>
            <a href="javascript:void(0);" class="icone"></a>
            <ul>                
                <li><a class="excluir_mensagem mostra_caixa confirma_excluir" href="javascript: void(0);" ident="<%:idMensagemRapida%>"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
            </ul>                            
        </li>
    </ul>                    

    <a href="/AVA/Perfil/MeuPerfil"><img height="55" width="55" src="<%:Model.strMiniFoto%>" class="avatar_tl"></a>
    
    <div class="e-wrap">
        <h1>
            <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a>
        </h1>
        <div class="mural_time"><%=linkCompartilhamento%><%=Model.strTempoPublicacao%></div>              
        <% 
        var strLink = "";
        if (Model.strLink != null)
        {
            strLink = Model.strLink;
        }

        string strLinkFinal = strLink.Replace("#id#", "" + Model.IdFerramenta.ToString() + "");

        if (Model.idFerramentaTipo == 17 || Model.idFerramentaTipo == 18)
        {
            strLinkFinal = strLink.Replace("#idAgendamento#", "" + Model.IdFerramenta + "").Replace("#idEtapa#", "" + Model.IdAuxiliar1 + "");                                  
        }
                                                            
        %>
        <div class="embrulho">
            <%
            if (strLink != ""){
                %>
                <a href="<%:strLinkFinal%>">
                <%
            }
            %>
            <img src="<%:Model.strImagemPATH%>">
            <%
            if (strLink != ""){
                %>
                </a>
                <%
            } 
            %>
            <strong>
                <%if (strLink != ""){%>
                    <a href="<%:strLinkFinal%>">
                <%}%>
                <%:Model.strTipo%>
                <%if (strLink != ""){%>
                    </a>
                <%}%>
            </strong>
            <p class="ctn_msg">
                <%=Model.StrMensagem%>
            </p>
        </div>  
        
        <div class="acoes_mural">
            
            <a href="javascript:void(0);" class="botaoCurtirGrupos <%if(Model.bolCurtiu){%> ativo <%} %>" idMensagemRapida="<%=idMensagemRapida%>"></a>
                                                                
            <div class="feedCurtir" idMensagem="<%=idMensagemRapida%>" id="boxCurticoesMensagem_<%=idMensagemRapida%>">
                    
            </div>
                
            <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=idMensagemRapida%>"><span class="FontAwesome"></span></a>
                                    
            <div class="comentariosMural" id="boxComentarios_<%=idMensagemRapida%>">
                        
            </div>

            <form class="campo_comentar" id="campoComentar_<%=idMensagemRapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				<a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="25" width="25"></a>
				<input placeholder="Escreva um comentário..." idMensagemRapida="<%=idMensagemRapida%>" class="inputComentario" name="strComentario" autocomplete="off" ident="<%=idMensagemRapida%>" type="text" />
			</form>
              
        </div>
                
    </div>
</article>