<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.MensagemRapidaGrupo>" %>

<div class="itemComentario <%=Model.bolEducador ? "highlight" : "" %>" id="msg_<%=Model.idMensagemRapida%>">
	<a href="javascript:void(0);"><img title="<%=Model.strNome%>" src="<%=Model.strMiniFoto%>" height="55" width="55"></a>
	<div>
        <div class="comentConteudo">
            
            <a href="/AVA/Grupo/Home/ListaExclusaoMensagem/<%=Model.idMensagemRapida%>" class="FontAwesome coment_excluir confirma_excluir fancybox.ajax excluir_mensagem_grupo" idMensagem="<%=Model.idMensagemRapida%>"><span></span></a>
                               
            <h3><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a></h3>
		    <span class="grupoTime"><%=Model.strTempoPublicacao%></span>
            <span class="postar_assunto fontello"></span>
            <span class="categoria_mural">
                 <%=Model.assunto.strAssunto.ToUpper()%> 
            </span>
		    <p class="ctn_msg"><%=Model.strMensagem%></p>

            <% 
            if(Model.imagens != null && Model.imagens.Count > 0){
                int qtd = Model.imagens.Count;
                int qtdMax = 3;
                %>
                <div class="imagens_mural">
                    <a data-width="<%=Model.imagens[0].arquivo.largura %>" data-height="<%=Model.imagens[0].arquivo.altura %>" data-idarquivo="<%=Model.imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[0].arquivo.strDiretorio + "/" + Model.imagens[0].arquivo.strArquivo + Model.imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=Model.imagens[0].arquivo.strNome %>" title="<%=Model.imagens[0].arquivo.strNome == null || Model.imagens[0].arquivo.strNome == "" ? "Insira um título" : Model.imagens[0].arquivo.strNome %>" data-posicao="<%=Model.imagens[0].intOrdem %>" data-descricao="<%=Model.imagens[0].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=Model.imagens[0].arquivo.strDiretorio + "/" + Model.imagens[0].arquivo.strArquivo + Model.imagens[0].arquivo.strExtensao %>"></a>
                <%
                    if (qtd > 2)
                    {
                        %>
                        <div class="thumbs_mural" style="height: 122px;">
                        <%
                        if (qtd > qtdMax)
                        {
                                            
                            for (int i = 1; i < qtdMax; i++ )
                            {
                                //Response.Write("> " + item.imagens[i].arquivo.strDescricao + " - " + item.imagens[i].arquivo.idArquivo);
                                %>
                                <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                <%
                            }
                                            
                            for (int i = qtdMax; i < qtd; i++)
                            {
                                %>
                                <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" style="display: none;" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                <%
                            }
                        }
                        else
                        {
                            for (int i = 1; i < qtd; i++ )
                            {
                                //Response.Write("> " + item.imagens[i].arquivo.strDescricao + " - " + item.imagens[i].arquivo.idArquivo);
                                %>
                                <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                <%
                            }
                        }
                        %>
                        </div>
                        <%
                    }
                    else if (qtd == 2)
                    {
                        %>
                        <a data-width="<%=Model.imagens[1].arquivo.largura %>" data-height="<%=Model.imagens[1].arquivo.altura %>" data-idarquivo="<%=Model.imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[1].arquivo.strDiretorio + "/" + Model.imagens[1].arquivo.strArquivo + Model.imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=Model.imagens[1].arquivo.strNome %>" title="<%=Model.imagens[1].arquivo.strNome == null || Model.imagens[1].arquivo.strNome == "" ? "Insira um título" : Model.imagens[1].arquivo.strNome %>" data-posicao="<%=Model.imagens[1].intOrdem %>" data-descricao="<%=Model.imagens[1].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=Model.imagens[1].arquivo.strDiretorio + "/" + Model.imagens[1].arquivo.strArquivo + Model.imagens[1].arquivo.strExtensao %>"></a>
                        <%
                    }
                %>
                                
                </div>
                                
                <%
            }
            if (Model.strLinkVideo.Length > 0)
            {
                %>
                <iframe width="450" height="315" src="//<%=Model.strLinkVideo%>" frameborder="0" allowfullscreen></iframe>
                <%  
            }                            
            %>
        </div>

		<div class="acoes_mural_grupo">
			<a href="javascript:void(0);" class="botaoCurtirGrupos" idMensagemRapida="<%=Model.idMensagemRapida%>"></a>
			<div class="feedCurtir" idMensagem="<%=Model.idMensagemRapida%>" id="boxCurticoesMensagem_<%=Model.idMensagemRapida%>">
				
			</div>
            <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=Model.idMensagemRapida%>"><span class="FontAwesome"></span></a>
            <div class="clearfix"></div>
            <div class="comentariosMuralGrupo" id="boxComentariosGrupo_<%=Model.idMensagemRapida%>">
		        
			</div>
			<form class="campo_comentar" id="campoComentar_<%=Model.idMensagemRapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				<a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="25" width="25"></a>
				<input placeholder="Escreva um comentário..." id="strComentarioGrupo" name="strComentarioGrupo" autocomplete="off" idMensagemRapida="<%=Model.idMensagemRapida%>" type="text" />
			</form>
		</div>
	</div>	
</div>