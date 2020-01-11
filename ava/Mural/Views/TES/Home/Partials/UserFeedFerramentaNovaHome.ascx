<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaUsuario>" %>
<%
    int idMensagemRapida = Model.IdMensagemrapida;

    var strTempoPublicacao = Model.strTempoPublicacao;


    var linkCompartilhamento = "";
    if (Model.idFerramentaTipo != 32 && Model.idFerramentaTipo != 33 && Model.idFerramentaTipo != 34 && Model.idFerramentaTipo != 39)
        linkCompartilhamento = "<span class=\"compartilhado\" iditem=" + idMensagemRapida + "></span>";

%>
<article class="postagem" id="avaMsg_<%=idMensagemRapida %>" ide="<%=idMensagemRapida%>">

	<div class="bloco post bl_1">

		<header class="header_post">

			<a href="/AVA/Perfil/MeuPerfil"><img src="<%:Model.strMiniFoto%>" class="post_perfil"></a>

			<h3 class="post_nome_usuario">
				<a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a>
			</h3>

			<div class="post_horario">
				<%=linkCompartilhamento%><%
                                             var dataPost = strTempoPublicacao;
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

											 var disciplina = Model.strDisciplina;
											 Response.Write(" - "+disciplina);
                                    %>
			</div>

			<div class="post_opcoes" onclick="exibirOpcoesPostagem(this); return false;">
				<a href="javascript:void(0);"></a>
				<ul style="display: none;">
					<li>
						<a class="opcao_excluir" href="javascript: void(0);" onclick="excluirPostagem(this); return false;" ident="<%:idMensagemRapida%>">Excluir</a>
					</li>
				</ul>
			</div>
			
		</header>
	    <div class="conteudo_post">
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
		    <div class="conteudo_atividades teste">
                <a href="/AVA/Caminhos">
			        <img src="<%:Model.strImagemPATH%>">
				</a>

			    <h4>
                    <a href="/AVA/Caminhos">
				        <%:Model.strTipo%>
                    </a>
			    </h4>
			    <p class="post_texto">
				    <%=Model.StrMensagem.Trim()%>
			    </p>
		    </div>

	    </div>
	        <div class="post_acoes">

		        <div class="acao_curtir">
                    <a href="javascript:void(0);" onclick="curtirPostagem(this); return false;" class="btn <%=Model.bolCurtiu ? " ativo" : "" %>" idMensagemRapida="<%=idMensagemRapida%>"></a>
			        <div class="feed" idMensagem="<%=idMensagemRapida%>" id="boxCurticoesMensagem_<%=idMensagemRapida%>">
				        <a class="botao_curtir" idMensagemRapida="<%=idMensagemRapida%>" href="javascript:void(0);">
				        <span></span>
				        </a>
			        </div>
		        </div>

		        <div class="acao_comentar">
			        <a id="verMensagens_<%=idMensagemRapida%>" idMensagemRapida="<%=idMensagemRapida%>" href="" onclick="exibeComentarios(this); return false;" class="btn botaoComentar">
				        <span class="FontAwesome"></span>
			        </a>
		        </div>
	        </div>
    </div>
	<div class="bloco comentarios bl_1" id="boxComentarios_<%=idMensagemRapida%>" style="display:none;">
		<div class="clearfix"></div>
		<div class="comentariosMural"></div>
		<form class="post_form" id="campoComentar_<%=idMensagemRapida%>" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;" style="width: 100%; margin-top: 10px;">
			<input placeholder="Escreva um comentário..." idMensagemRapida="<%=Model.IdMensagemrapida%>" name="strComentario" autocomplete="off" ident="<%=Model.IdMensagemrapida%>" type="text" onblur="comentarioInputBlur(this); return false;" onkeypress="submeteComentario(this, event)" />
		</form>
	</div>
</article>