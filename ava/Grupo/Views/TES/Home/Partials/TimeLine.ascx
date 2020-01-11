<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.MainPerfilPrivado>" %>

<input type="hidden" id="strNomeLogado" value="<%=Model.strNome%>" />
<input type="hidden" id="strMiniFotoLogado" value="<%=Model.strMiniFoto%>" />
<input type="hidden" id="strLoginLogado" value="<%=Model.strLogin%>" />
<input type="hidden" id="strEmailLogado" value="<%=Model.strEmail%>" />
<input type="hidden" id="strURLCorrente" value="<%=HttpContext.Current.Request.Url.AbsoluteUri%>" />

<% 
bool bolPossuiVerMais = ViewData["bolPossuiVerMais"] != null ? ((bool)ViewData["bolPossuiVerMais"]) : false;
int qtdRegistroPorPagina = Convert.ToInt32(ViewData["qtdRegistroPorPagina"]);
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
bool ehMediador = Convert.ToBoolean(ViewData["ehMediador"]);
bool bolAdmin = Convert.ToBoolean(ViewData["bolAdm"]);
int idEstado = Convert.ToInt32(ViewData["idEstado"]);
bool bolProfessor = Convert.ToBoolean(ViewData["bolProfessor"]);
bool bolAluno = Convert.ToBoolean(ViewData["bolAluno"]);
bool bolIpad = HttpContext.Current.Request.UserAgent.ToLower().Contains("ipad");
bool bolMobile = false;
string uAgent = Request.UserAgent.ToLower();
if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
{
    bolMobile = true;
}
if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
{
    bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
}
if (Model.TimeLinePrivado.mensagens.Count > 0)
{

    bool bolAcessoEscreverBloqueado = false;

    if (Model.segmentacaoBloqueio != null)
    {
        bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
    }
    
    foreach (var mensagem in Model.TimeLinePrivado.mensagens)
    {
        string strClassAtivoCurtiu = "";
        if (mensagem.bolCurtiu)
        {
            strClassAtivoCurtiu = "ativo";    
        }
        
        %>
        <div class="itemComentario <%=mensagem.bolEducador ? "highlight" : "" %>" id="msg_<%=mensagem.idMensagemRapida%>">

            <ul class="combo_denunciar_excluir">
                <li>
                    <a href="javascript:void(0);" class="icone"></a>
                    <ul>
                        <%
                        // Alteração Renan: Grupos com idEstado 3 (congelado) não devem permitir excluir mensagens.
                        if (!idEstado.Equals(3))
                        {
                            if (bolAdmin || ehMediador || (idUsuarioLogado == mensagem.idUsuario))
                            { 
                                %>
                                <li><a class="excluir_mensagem_grupo mostra_caixa confirma_excluir" href="javascript:void()" ident="<%:mensagem.idMensagemRapida%>"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                                <%
                            }
                        } 
                        %>
                        <li><a class="denunciar_mensagem denunciar_comentario" href="javascript: void(0);" ide="<%:mensagem.idMensagemRapida%>"><span class="denunciar_comentario_combo FontAwesome"></span>Denunciar</a></li>
                    </ul>                            
                </li>
            </ul>

	        <a href="/AVA/Perfil/Home/Index/<%=mensagem.strLogin%>"><img src="<%=mensagem.strMiniFoto%>" height="55" width="55"></a>
	        <div>
		        <div class="comentConteudo"> 
                    
                    <h3>
                        <a href="/AVA/Perfil/Home/Index/<%=mensagem.strLogin%>"><%=mensagem.strNome%></a>
                        <% 
                        if (mensagem.idFerramentaTipo == 17)
                        {
                            %>
                            <span class="mural_context">»</span> <a>Alunos</a>        
                            <%
                        }
                        %>
                    </h3>
		            <span class="grupoTime"><%=mensagem.strTempoPublicacao%></span> 
                    
                    <% 
                    if (mensagem.idFerramentaTipo > 1)
                    {
                        var strLink = "";
                        if (mensagem.strLinkFerramenta != null)
                        {
                            strLink = mensagem.strLinkFerramenta;
                        }

                        string strLinkFinal = strLink.Replace("#id#", "" + mensagem.idFerramenta.ToString() + "");

                        if (mensagem.idFerramentaTipo == 17)
                        {
                            if (bolProfessor)
                            {
                                strLinkFinal = "/ava/caminhos/home/agendamento/" + mensagem.idFerramenta.ToString();
                            }
                            else
                            {
                                strLinkFinal = strLink.Replace("#idAgendamento#", "" + mensagem.idFerramenta + "").Replace("#idEtapa#", "" + mensagem.IdAuxiliar1 + "");                                  
                            }
                            
                        }
                                                
                        %>
                        <div class="embrulho">
                            
                            <% 
                            if (bolAluno || bolProfessor)
                            {
                                %>
                                <a href="<%=strLinkFinal%>">                                
                                    <img alt="" src="<%=mensagem.strImagemPathFerramenta%>">
                                </a>
                                <strong><a href="<%=strLinkFinal%>"><%=mensagem.strTipo%></a></strong>
                                <%
                            }
                            else
                            {
                                %>
                                <a>                                
                                    <img src="<%=mensagem.strImagemPathFerramenta%>">
                                </a>
                                <strong><a><%=mensagem.strTipo%></a></strong>    
                                <%
                            }    
                                
                            %>      
                                                   
                            
                            <p class="ctn_msg"><%=mensagem.strMensagem%></p>
                        </div>
                        <%
                    }
                    else
                    {
                        %>
                         <span class="postar_assunto fontello"></span>
                        <span class="categoria_mural">
                            <%=mensagem.assunto.strAssunto.ToUpper()%> 
                        </span> 
		                <p class="ctn_msg"><%=mensagem.strMensagem%></p>

                        <%
 
                        if(mensagem.imagens != null && mensagem.imagens.Count > 0){
                            int qtd = mensagem.imagens.Count;
                            int qtdMax = 3;
                            %>
                            <div class="imagens_mural">
                                <a data-width="<%=mensagem.imagens[0].arquivo.largura %>" data-height="<%=mensagem.imagens[0].arquivo.altura %>" data-idarquivo="<%=mensagem.imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=mensagem.idMensagemRapida %>" href="<%=mensagem.imagens[0].arquivo.strDiretorio + "/" + mensagem.imagens[0].arquivo.strArquivo + mensagem.imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=mensagem.imagens[0].arquivo.strNome %>" title="<%=mensagem.imagens[0].arquivo.strNome == null || mensagem.imagens[0].arquivo.strNome == "" ? "Insira um título" : mensagem.imagens[0].arquivo.strNome %>" data-posicao="<%=mensagem.imagens[0].intOrdem %>" data-descricao="<%=mensagem.imagens[0].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=mensagem.imagens[0].arquivo.strDiretorio + "/" + mensagem.imagens[0].arquivo.strArquivo + mensagem.imagens[0].arquivo.strExtensao %>"></a>
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
                                            //Response.Write("> " + mensagem.imagens[i].arquivo.strDescricao + " - " + mensagem.imagens[i].arquivo.idArquivo);
                                            %>
                                            <a data-nomearquivo="<%=mensagem.imagens[i].arquivo.strNome %>" data-width="<%=mensagem.imagens[i].arquivo.largura %>" data-height="<%=mensagem.imagens[i].arquivo.altura %>" data-idarquivo="<%=mensagem.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=mensagem.idMensagemRapida %>" href="<%=mensagem.imagens[i].arquivo.strDiretorio + "/" + mensagem.imagens[i].arquivo.strArquivo + mensagem.imagens[i].arquivo.strExtensao %>" title="<%=mensagem.imagens[i].arquivo.strNome == null || mensagem.imagens[i].arquivo.strNome == "" ? "Insira um título" : mensagem.imagens[i].arquivo.strNome %>" data-posicao="<%=mensagem.imagens[i].intOrdem %>" data-descricao="<%=mensagem.imagens[i].arquivo.strDescricao %>"><img src="<%=mensagem.imagens[i].arquivo.strDiretorio + "/" + mensagem.imagens[i].arquivo.thumbnail + mensagem.imagens[i].arquivo.strExtensao %>"></a>
                                            <%
                                        }
                                            
                                        for (int i = qtdMax; i < qtd; i++)
                                        {
                                            %>
                                            <a data-nomearquivo="<%=mensagem.imagens[i].arquivo.strNome %>" data-width="<%=mensagem.imagens[i].arquivo.largura %>" data-height="<%=mensagem.imagens[i].arquivo.altura %>" data-idarquivo="<%=mensagem.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" style="display: none;" rel="galeria_mural_<%=mensagem.idMensagemRapida %>" href="<%=mensagem.imagens[i].arquivo.strDiretorio + "/" + mensagem.imagens[i].arquivo.strArquivo + mensagem.imagens[i].arquivo.strExtensao %>" title="<%=mensagem.imagens[i].arquivo.strNome == null || mensagem.imagens[i].arquivo.strNome == "" ? "Insira um título" : mensagem.imagens[i].arquivo.strNome %>" data-posicao="<%=mensagem.imagens[i].intOrdem %>" data-descricao="<%=mensagem.imagens[i].arquivo.strDescricao %>"><img src="<%=mensagem.imagens[i].arquivo.strDiretorio + "/" + mensagem.imagens[i].arquivo.thumbnail + mensagem.imagens[i].arquivo.strExtensao %>"></a>
                                            <%
                                        }
                                    }
                                    else
                                    {
                                        for (int i = 1; i < qtd; i++ )
                                        {
                                            //Response.Write("> " + mensagem.imagens[i].arquivo.strDescricao + " - " + mensagem.imagens[i].arquivo.idArquivo);
                                            %>
                                            <a data-nomearquivo="<%=mensagem.imagens[i].arquivo.strNome %>" data-width="<%=mensagem.imagens[i].arquivo.largura %>" data-height="<%=mensagem.imagens[i].arquivo.altura %>" data-idarquivo="<%=mensagem.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=mensagem.idMensagemRapida %>" href="<%=mensagem.imagens[i].arquivo.strDiretorio + "/" + mensagem.imagens[i].arquivo.strArquivo + mensagem.imagens[i].arquivo.strExtensao %>" title="<%=mensagem.imagens[i].arquivo.strNome == null || mensagem.imagens[i].arquivo.strNome == "" ? "Insira um título" : mensagem.imagens[i].arquivo.strNome %>" data-posicao="<%=mensagem.imagens[i].intOrdem %>" data-descricao="<%=mensagem.imagens[i].arquivo.strDescricao %>"><img src="<%=mensagem.imagens[i].arquivo.strDiretorio + "/" + mensagem.imagens[i].arquivo.thumbnail + mensagem.imagens[i].arquivo.strExtensao %>"></a>
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
                                    <a data-width="<%=mensagem.imagens[1].arquivo.largura %>" data-height="<%=mensagem.imagens[1].arquivo.altura %>" data-idarquivo="<%=mensagem.imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=mensagem.idMensagemRapida %>" href="<%=mensagem.imagens[1].arquivo.strDiretorio + "/" + mensagem.imagens[1].arquivo.strArquivo + mensagem.imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=mensagem.imagens[1].arquivo.strNome %>" title="<%=mensagem.imagens[1].arquivo.strNome == null || mensagem.imagens[1].arquivo.strNome == "" ? "Insira um título" : mensagem.imagens[1].arquivo.strNome %>" data-posicao="<%=mensagem.imagens[1].intOrdem %>" data-descricao="<%=mensagem.imagens[1].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=mensagem.imagens[1].arquivo.strDiretorio + "/" + mensagem.imagens[1].arquivo.strArquivo + mensagem.imagens[1].arquivo.strExtensao %>"></a>
                                    <%
                                }
                            %>
                                
                            </div>
                                
                            <%
                        }
                        if (mensagem.strLinkVideo.Length > 0)
                        {
                            string strLinkPrev = mensagem.strLinkPreviewVideo;
                            if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
                            
                            %>
                            <a class="linkvideo" href="<%=mensagem.strLinkVideo%>" target="_blank"><%=mensagem.strLinkVideo%></a>

                            <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="450" height="315" src="//<%=strLinkPrev%>" frameborder="0" allowfullscreen></iframe>
                            <%
                        }
                        if (mensagem.arquivos != null && mensagem.arquivos.Count > 0)
                        {
                            int qtd = mensagem.arquivos.Count;
                            for (int i = 0; i < (qtd > 3 ? 3 : qtd); i++)
                            {
                                %>
                                <div class="prev_documento">
                                    <div class="tipo_arquivo">
                                        <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                                        <span><%=mensagem.arquivos[i].arquivo.strExtensao%></span>
                                    </div>    
                                    <p><%=mensagem.arquivos[i].arquivo.strNome%></p>
                                    <%
                                    if (bolMobile)
                                    {
                                        %>
                                        <a target="_blank" href="<%=mensagem.arquivos[i].arquivo.strDiretorio + "/" + mensagem.arquivos[i].arquivo.strArquivo + mensagem.arquivos[i].arquivo.strExtensao %>">Download</a>
                                        <%
                                    }
                                    else
                                    {
                                        %>
                                        <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=mensagem.arquivos[i].arquivo.strDiretorio + "/" + mensagem.arquivos[i].arquivo.strArquivo + mensagem.arquivos[i].arquivo.strExtensao %>">Download</a>
                                        <%
                                    }
                                    %>
                                    
                                </div>
                                <%
                            }

                            if (mensagem.arquivos.Count > 3)
                            {
                            %>
                                <div class="engloba_doc">
                                <%                                
                                for (int i = 3; i < qtd; i++)
                                {
                                    %>
                                    <div class="prev_documento">
                                        <div class="tipo_arquivo">
                                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                                            <span><%=mensagem.arquivos[i].arquivo.strExtensao%></span>
                                        </div>    
                                        <p><%=mensagem.arquivos[i].arquivo.strNome%></p>
                                        <%
                                    if (bolMobile)
                                    {
                                        %>
                                        <a target="_blank" href="<%=mensagem.arquivos[i].arquivo.strDiretorio + "/" + mensagem.arquivos[i].arquivo.strArquivo + mensagem.arquivos[i].arquivo.strExtensao %>">Download</a>
                                        <%
                                    }
                                    else
                                    {
                                        %>
                                        <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=mensagem.arquivos[i].arquivo.strDiretorio + "/" + mensagem.arquivos[i].arquivo.strArquivo + mensagem.arquivos[i].arquivo.strExtensao %>">Download</a>
                                        <%
                                    }
                                    %>
                                    </div>
                                    <%
                                }    
                                %>                                    
                                </div>
                                
                            <a href="javascript:void(0);" class="ver_mais_doc">Ver mais</a>
                            <%
                            }
                            %>
                            <div class="clearfix"></div>
                            <%
                        } 
                    }
                    %>
                    
                </div>
		        <div class="acoes_mural_grupo">

                    <%
                        // Alteração Renan: Grupos com idEstado 3 (congelado) não devem permitir curtidas.
                        
                        
                        if (!idEstado.Equals(3) && !Model.bolSuspenso) 
                        {
                        %>
			                <a href="javascript:void(0);" class="botaoCurtirGrupos <%=strClassAtivoCurtiu%>" idMensagemRapida="<%=mensagem.idMensagemRapida%>"></a>
                        <%
                        }
                    %>      
			           <div class="feedCurtir" idMensagem="<%=mensagem.idMensagemRapida%>" id="boxCurticoesMensagem_<%=mensagem.idMensagemRapida%>">
                       <%
                        Html.RenderPartial("Partials/ListaCurticoesMensagem", mensagem, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado } });
                        %>
			        </div>
                    <% 
                        // Alteração Renan: Grupos com idEstado 3 (congelado) não devem permitir comentários.
                        if (!idEstado.Equals(3) && !Model.bolSuspenso) 
                        {
                            if (Model.bolAcessoEscrever && !bolAcessoEscreverBloqueado)
                            {
                                %>
                                <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=mensagem.idMensagemRapida%>"><span class="FontAwesome"></span></a>
                                <% 
                            }
                        }    
                    %>
                    <div class="clearfix"></div>
                    <div class="comentariosMuralGrupo" id="boxComentariosGrupo_<%=mensagem.idMensagemRapida%>">
						<%
                            Html.RenderPartial("Partials/ListaComentarios", mensagem.comentarios, new ViewDataDictionary { { "totalComentarios", mensagem.totalComentarios }, { "idMensagemRapida", mensagem.idMensagemRapida }, { "ehMediador", ehMediador }, { "idUsuarioLogado", idUsuarioLogado }, { "idEstado", idEstado } });
                        %>
					</div>
                    <% 
                        // Alteração Renan: Grupos com idEstado 3 (congelado) não devem permitir comentários.
                        if (!idEstado.Equals(3) && !Model.bolSuspenso)
                        {
                            if (Model.bolAcessoEscrever && !bolAcessoEscreverBloqueado)
                            {
                                %>
                                <form class="campo_comentar" id="campoComentar_<%=mensagem.idMensagemRapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				                    <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="25" width="25"></a>
				                    <input placeholder="Escreva um comentário..." id="strComentarioGrupo" name="strComentarioGrupo" autocomplete="off" idMensagemRapida="<%=mensagem.idMensagemRapida%>" type="text" />
			                    </form>    
                                <%      
                            }
                        }
                    %>			        
		        </div>
	        </div>	
        </div>
        <%
    }

    if (bolPossuiVerMais)
    {
        %>
        <footer id="ava_footervejamais" class="blokletters">                
            <a href="javascript:void(0);" title="Veja mais" alt="Veja mais" id="btCarregaMensagensGrupos">Veja mais</a>
        </footer>
        <%
    }

    if (Model.TimeLinePrivado.mensagens.Count < qtdRegistroPorPagina)
    {
        %>
        <input type="hidden" value="poucaMensagem" />
        <%
    }
}
else
{
    
    %>
    <article class="clearfix highlight ">Nenhuma mensagem enviada.</article>
    <input type="hidden" value="semMensagens" />
    <%
}   
%>

					
