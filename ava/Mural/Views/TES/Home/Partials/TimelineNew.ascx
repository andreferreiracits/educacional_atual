<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MainPerfilPrivado>" %>
<input type="hidden" id="strNomeLogado" value="<%:Model.strNome%>" />
<input type="hidden" id="strMiniFotoLogado" value="<%:Model.strMiniFoto%>" />
<input type="hidden" id="strLoginLogado" value="<%:Model.strLogin%>" />
<input type="hidden" id="strEmailLogado" value="<%:Model.strEmail%>" />
<input type="hidden" id="strURLCorrente" value="<%:HttpContext.Current.Request.Url.AbsoluteUri%>" />
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/muralTimelineNew_3.0.0.js") %><%=Url.TimeStampLink() %>"></script>

<%
    int qtdRegistro;
    
    bool bolAdmin = false;
    bool bolAvinha = false;

    string uAgent = Request.UserAgent.ToLower();
    bool bolMobile = uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android");

    var auxTextoMensagem = "";

    bool bolPossuiPostEducacional = ViewData["possuiPostEducacional"] != null ? (bool)ViewData["possuiPostEducacional"] : false;
    var dadosEducacional = ViewData["postEducacionalDados"] != null ? (Dictionary<int, Mural.Models.MensagemRapidaEducacional>)ViewData["postEducacionalDados"] : new Dictionary<int, Mural.Models.MensagemRapidaEducacional>();
    bool bolPossuoAvaliacao = Convert.ToBoolean(ViewData["possuoAvaliacao"]);
    
    if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
    {
        bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
    }
   
    if (ViewData["bolAvinha"] != null)
    {
        bolAvinha = (bool)ViewData["bolAvinha"];
    }
    if (bolAvinha)
    {
        qtdRegistro = 5;
    }
    else
    {
        qtdRegistro = 10;
    }

    bool bolAcessoEscreverBloqueado = false;

    if (Model.segmentacaoBloqueio != null)
    {
        bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
    }

    bool bolPodeComentar = (!bolAcessoEscreverBloqueado && (Model.intComunicacaoPermissao == 1 || Model.intComunicacaoPermissao == 2));

    bool bolIpad = HttpContext.Current.Request.UserAgent.ToLower().Contains("ipad");

    bool bolUsuarioSemTurma = Convert.ToBoolean(Session["bolUsuarioSemTurma"]);
    int intInicio = Convert.ToInt32(ViewData["intInicio"]);
        
    if (Model.TimeLinePrivado.mensagens.Count > 0)
    {
        foreach (var item in Model.TimeLinePrivado.mensagens)
        {
            int idUsuarioMsg = item.IdUsuario;
            int idMensagemRapida = item.IdMensagemrapida;
            int idUsuarioLogado = Model.idVisitante > 0 ? Model.idVisitante : Model.idUsuario;

            Mural.Models.MensagemRapidaEducacional dadosMensagemEducacional = null;
            if(bolPossuiPostEducacional)
                if (dadosEducacional.ContainsKey(idMensagemRapida))
                    dadosMensagemEducacional = dadosEducacional[idMensagemRapida];

            var bolSouComunicador = false;
            var bolPodeComentarPost = bolPodeComentar;
            if (dadosMensagemEducacional != null)
            {
                bolSouComunicador = dadosMensagemEducacional.bolComunicador;
                if (bolPodeComentar)
                    bolPodeComentarPost = dadosMensagemEducacional.bolComentar;
            }
            
            var linkCompartilhamento = "";
            if (item.idFerramentaTipo != 32 && item.idFerramentaTipo != 33 && item.idFerramentaTipo != 34 && item.idFerramentaTipo != 39)
                linkCompartilhamento = "<span class=\"icon_compartilhado_com\" iditem="+idMensagemRapida+"></span>";
            
            if (bolAvinha)
            {
                %>              
                <!-- NOVO -->
                <article class="clearfix article_ei <%=dadosMensagemEducacional != null ? " cinza pgedu" : "" %>" ide="<%:idMensagemRapida%>">
                    <% 
                    if(dadosMensagemEducacional == null) 
                    { 
                        %>
						<div class="info_post_ei">
							<a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" title="<%=item.strNome%>">
                                <img class="avatar_tl" src="<%: item.strMiniFoto %>" width="80" height="80" alt="avatar"/> 
                            </a>
							<span class="seta_ei"></span>
							<div>
								<h2 class="din nome_tia"><a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>"><%= item.strNome %></a></h2>
								<p class="ei_p"><%=linkCompartilhamento%><%=item.strTempoPublicacao %></p>
								<div class="feedCurtir lista_curtidas_<%:idMensagemRapida%>">
                                    <%Html.RenderPartial("Partials/ListaCurticoesMensagem", item, new ViewDataDictionary { { "idUsuario", Model.idVisitante }, { "idUsuarioLogado", idUsuarioLogado } });%>
								</div>	
							</div>
						</div>	
                        <% 
                    } 
                    else 
                    { 
                        %>
                        <div class="info_post_ei">
							<a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" title="<%=dadosMensagemEducacional.strTitulo%>">
                                <img class="avatar_tl" src="<%=dadosMensagemEducacional.strLogo%>" width="80" height="80" alt="avatar"/> 
                            </a>
							<span class="seta_ei"></span>
							<div>
								<h2 class="din nome_tia"><a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>"><%=dadosMensagemEducacional.strTitulo%></a></h2>
								<p class="ei_p">
                                    <%=dadosMensagemEducacional.strAgendamento%>
                                    <span>&bull;</span>
                                    <%=dadosMensagemEducacional.strAssunto%>
                                </p>
								<div class="feedCurtir lista_curtidas_<%:idMensagemRapida%>">
                                    <%Html.RenderPartial("Partials/ListaCurticoesMensagem", item, new ViewDataDictionary { { "idUsuario", Model.idVisitante }, { "idUsuarioLogado", idUsuarioLogado }, { "idFerramentaTipo" , item.idFerramentaTipo } });%>
								</div>	
							</div>
						</div>	
                        <% 
                    } 
                    %>
					<div class="ei_speech_bubble <%=dadosMensagemEducacional != null ? " post_espc_ei" : "" %>">
                        <%                               
                        if (item.idFerramentaTipo > 1 && item.idFerramentaTipo != 33 && item.idFerramentaTipo != 34 && item.idFerramentaTipo != 39)
                        {
                            var strLink = "";
                            if (item.strLink != null)
                            {
                                strLink = item.strLink;
                            }

                            string strLinkFinal = strLink.Replace("#id#", "" + item.IdFerramenta.ToString() + "");

                            if (item.idFerramentaTipo == 17 || item.idFerramentaTipo == 18 || item.idFerramentaTipo == 14 || item.idFerramentaTipo == 15)
                            {
                                strLinkFinal = strLink.Replace("#idAgendamento#", "" + item.IdFerramenta + "").Replace("#idEtapa#", "" + item.IdAuxiliar1 + "");
                            }
                            %>
                            <span class="blokletters speech_ei" style="color: Black;">
                            <%if (item.idFerramentaTipo == 25)
                              { %>
                                <%if (strLink != "")
                                  { %>
                                    <a href="javascript:void(0);" onclick="ViewRealizacaoProva(<%=item.IdFerramenta %>);return false;">
                                    <%:item.strTipo%></a>
                                <%}
                              }
                              else
                              {
                                  if (strLink != "")
                                  {%><a href="<%:strLinkFinal%>"><%} %> <%:item.strTipo%> <%if (strLink != "") {%></a><%}
                              }%>
                            </span>
                            <br />
                            <%
                        }
                        else if (item.idFerramentaTipo == 34)//convite
                        {
                            auxTextoMensagem = RedeSocialAVA.FuncoesTexto.ReverterAspas(item.StrMensagem).ToUpper();
                            auxTextoMensagem = RedeSocialAVA.FuncoesTexto.ArrumaAspas(auxTextoMensagem);
                            
                            %>
                            <span class="blokletters speech_ei ctn_msg"><%=auxTextoMensagem%></span>
                            <div class="previ_convite_mural">
                                <img class="fundo_convite" src="<%=item.strFotoGrupo%>" height="800" width="800" />
                                <img class="img_convite" src="<%=item.strFotoGrupo%>" width="67" height="67"/>
                                    <div>
                                        <p class="inscricao_grupo">Convite para um grupo</p>
                                        <a href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>" class="nome_grupo_mural"><%=item.strNomeGrupo%></a>
                                        <div id="btnAceitarRecusar_<%=item.IdGrupo%>_<%=item.IdMensagemrapida%>">
                                            <% 
                                            if (item.bolConviteExcluidoGrupo)
                                            {
                                                %>
                                                <p class="convite_cancelado">Convite cancelado.</p>    
                                                <% 
                                            }
                                            else if (item.bolRecusouConviteGrupo)
                                            {
                                                %>
                                                <p class="convite_cancelado">Você recusou o convite para esse grupo.</p>    
                                                <%  
                                            }
                                            else if (item.bolAceitouConviteGrupo)
                                            {
                                                %>
                                                <a class="btn_cinza" href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>">Visualizar</a>    
                                                <%
                                            }
                                            else
                                            {
                                                %>
                                                <a class="btn_cinza" href="javascript:void(0);" onclick="aceitarConviteGrupo(<%=item.IdGrupo%>, <%=item.IdAuxiliar1%>, <%=item.IdMensagemrapida%>)">Participar</a>
                                                <a class="btn_cinza" href="javascript:void(0);" onclick="recusarConviteGrupo(<%=item.IdGrupo%>, <%=item.IdAuxiliar1%>, <%=item.IdMensagemrapida%>)">Não, obrigado(a)</a>
                                                <%  
                                            }
                                            %>
                                        </div>
                                    </div>  
                                </div>  
                            <%
                            }
                            else if (item.idFerramentaTipo == 33)//inscrição obrigatória
                            {
                                auxTextoMensagem = RedeSocialAVA.FuncoesTexto.ReverterAspas(item.StrMensagem).ToUpper();
                                auxTextoMensagem = RedeSocialAVA.FuncoesTexto.ArrumaAspas(auxTextoMensagem);
                                %>
                                <span class="blokletters speech_ei ctn_msg"><%=auxTextoMensagem%></span>
                                <div class="previ_convite_mural">
                                    <img class="fundo_convite" src="<%=item.strFotoGrupo%>" height="800" width="800" />
                                    <img class="img_convite" src="<%=item.strFotoGrupo%>" width="67" height="67"/>
                                    <div>
                                        <p class="inscricao_grupo">Inscrição no grupo</p>
                                        <a href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>" class="nome_grupo_mural"><%=item.strNomeGrupo%></a>
                                        <div id="btnAceitarRecusar_<%=item.IdGrupo%>">
                                            <a class="btn_cinza" href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>">Visualizar</a>
                                        </div>
                                    </div>  
                                </div> 
                                <%
                            }

                            if (item.idFerramentaTipo != 33 && item.idFerramentaTipo != 34)
                            {
                                auxTextoMensagem = RedeSocialAVA.FuncoesTexto.ReverterAspas(item.StrMensagem).ToUpper();
                                auxTextoMensagem = RedeSocialAVA.FuncoesTexto.ArrumaAspas(auxTextoMensagem);
                                var bolMostrarMultimidia = true;

                                if (dadosMensagemEducacional != null)
                                {
                                    if (dadosMensagemEducacional.bolBanner)
                                    {
                                        bolMostrarMultimidia = false;
                                        auxTextoMensagem = "<a href=\"" + item.strLinkVideo + "\" target=\"_blank\">" + auxTextoMensagem + "</a>";
                                    } 
                                    
                                    if (dadosMensagemEducacional.banner != null)
                                    { 
                                        %>
                                        <div class="banner_mural">
                                            <a href="<%=item.strLinkVideo%>" target="_blank">
                                            <img src="<%=dadosMensagemEducacional.banner.strDiretorio + "/" + dadosMensagemEducacional.banner.strArquivo + dadosMensagemEducacional.banner.strExtensao %>" alt="" />
                                            </a>
                                        </div>
                                    <% }                                       
                                }
                                
                            %>                            
                            <span class="blokletters speech_ei ctn_msg"><%=auxTextoMensagem%></span>                            
                            <%  if (dadosMensagemEducacional != null)
                                {
                                    if (dadosMensagemEducacional.bolBanner)
                                    {
                                        string textoLinkBanner = item.strLinkVideo.ToUpper();
                                        if (textoLinkBanner.IndexOf("://") >= 0)
                                            textoLinkBanner = textoLinkBanner.Substring(textoLinkBanner.IndexOf("://") + 3);
                                        textoLinkBanner = textoLinkBanner.Replace("WWW.", "");
                                        if (textoLinkBanner.IndexOf("/") >= 0)
                                            textoLinkBanner = textoLinkBanner.Substring(0, textoLinkBanner.IndexOf("/"));
                                    %>
                                        <p class="referencia_post"><a href="<%=item.strLinkVideo%>" target="_blank"><%=textoLinkBanner%></a></p><div class="clearfix"></div>
                                    <% 
                                    }
                                }          
                                 
                                if (item.imagens != null && item.imagens.Count > 0 && bolMostrarMultimidia)
                                {
                                    int qtd = item.imagens.Count;
                                    int qtdMax = 3;
                                %>
                                <div class="imagens_mural">
                                    <a data-width="<%=item.imagens[0].arquivo.largura %>" data-height="<%=item.imagens[0].arquivo.altura %>" data-idarquivo="<%=item.imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[0].arquivo.strDiretorio + "/" + item.imagens[0].arquivo.strArquivo + item.imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=item.imagens[0].arquivo.strNome %>" title="<%=item.imagens[0].arquivo.strNome == null || item.imagens[0].arquivo.strNome == "" ? "Insira um título" : item.imagens[0].arquivo.strNome %>" data-posicao="<%=item.imagens[0].intOrdem %>" data-descricao="<%=item.imagens[0].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=item.imagens[0].arquivo.strDiretorio + "/" + item.imagens[0].arquivo.strArquivo + item.imagens[0].arquivo.strExtensao %>"></a>
                                <%
                                if (qtd > 2)
                                {
                                        %>
                                        <div class="thumbs_mural" style="height: 122px;">
                                        <%
                                        if (qtd > qtdMax)
                                        {

                                            for (int i = 1; i < qtdMax; i++)
                                            {
                                                //Response.Write("> " + item.imagens[i].arquivo.strDescricao + " - " + item.imagens[i].arquivo.idArquivo);
                                                %>
                                                <a data-nomearquivo="<%=item.imagens[i].arquivo.strNome %>" data-width="<%=item.imagens[i].arquivo.largura %>" data-height="<%=item.imagens[i].arquivo.altura %>" data-idarquivo="<%=item.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.strArquivo + item.imagens[i].arquivo.strExtensao %>" title="<%=item.imagens[i].arquivo.strNome == null || item.imagens[i].arquivo.strNome == "" ? "Insira um título" : item.imagens[i].arquivo.strNome %>" data-posicao="<%=item.imagens[i].intOrdem %>" data-descricao="<%=item.imagens[i].arquivo.strDescricao %>"><img src="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.thumbnail + item.imagens[i].arquivo.strExtensao %>"></a>
                                                <%
                                            }

                                            for (int i = qtdMax; i < qtd; i++)
                                            {
                                                %>
                                                <a data-nomearquivo="<%=item.imagens[i].arquivo.strNome %>" data-width="<%=item.imagens[i].arquivo.largura %>" data-height="<%=item.imagens[i].arquivo.altura %>" data-idarquivo="<%=item.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" style="display: none;" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.strArquivo + item.imagens[i].arquivo.strExtensao %>" title="<%=item.imagens[i].arquivo.strNome == null || item.imagens[i].arquivo.strNome == "" ? "Insira um título" : item.imagens[i].arquivo.strNome %>" data-posicao="<%=item.imagens[i].intOrdem %>" data-descricao="<%=item.imagens[i].arquivo.strDescricao %>"><img src="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.thumbnail + item.imagens[i].arquivo.strExtensao %>"></a>
                                                <%
                                            }
                                        }
                                        else
                                        {
                                            for (int i = 1; i < qtd; i++)
                                            {
                                                //Response.Write("> " + item.imagens[i].arquivo.strDescricao + " - " + item.imagens[i].arquivo.idArquivo);
                                                %>
                                                <a data-nomearquivo="<%=item.imagens[i].arquivo.strNome %>" data-width="<%=item.imagens[i].arquivo.largura %>" data-height="<%=item.imagens[i].arquivo.altura %>" data-idarquivo="<%=item.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.strArquivo + item.imagens[i].arquivo.strExtensao %>" title="<%=item.imagens[i].arquivo.strNome == null || item.imagens[i].arquivo.strNome == "" ? "Insira um título" : item.imagens[i].arquivo.strNome %>" data-posicao="<%=item.imagens[i].intOrdem %>" data-descricao="<%=item.imagens[i].arquivo.strDescricao %>"><img src="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.thumbnail + item.imagens[i].arquivo.strExtensao %>"></a>
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
                                        <a data-width="<%=item.imagens[1].arquivo.largura %>" data-height="<%=item.imagens[1].arquivo.altura %>" data-idarquivo="<%=item.imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[1].arquivo.strDiretorio + "/" + item.imagens[1].arquivo.strArquivo + item.imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=item.imagens[1].arquivo.strNome %>" title="<%=item.imagens[1].arquivo.strNome == null || item.imagens[1].arquivo.strNome == "" ? "Insira um título" : item.imagens[1].arquivo.strNome %>" data-posicao="<%=item.imagens[1].intOrdem %>" data-descricao="<%=item.imagens[1].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=item.imagens[1].arquivo.strDiretorio + "/" + item.imagens[1].arquivo.strArquivo + item.imagens[1].arquivo.strExtensao %>"></a>
                                        <%
                                    }
                                %>
                                
                                </div>
                                
                                <%
                            }

                            if (item.strLinkVideo.Length > 0 && bolMostrarMultimidia)
                            {
                                string strLinkPrev = item.strLinkPreviewVideo;
                                if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
                                    
                                %>
                                <a class="linkvideo" href="<%=item.strLinkVideo%>" target="_blank"><%=item.strLinkVideo%></a>

                                <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="<%=(bolAvinha ? "400" : "450")%>" height="315" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
                                <%  
                            }

                            if (item.arquivos != null && item.arquivos.Count > 0 && bolMostrarMultimidia)
                            {
                                int qtd = item.arquivos.Count;
                                for (int i = 0; i < (qtd > 3 ? 3 : qtd); i++)
                                {
                                    %>
                                    <div class="prev_documento">
                                        <div class="tipo_arquivo">
                                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                                            <span><%=item.arquivos[i].arquivo.strExtensao %></span>
                                        </div>    
                                        <p><%=item.arquivos[i].arquivo.strNome %></p>
                                        <%
                                    if (bolMobile)
                                    {
                                            %>
                                            <a target="_blank" href="<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        %>
                                            
                                    </div>
                                    <%
                                }

                                if (item.arquivos.Count > 3)
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
                                            <span><%=item.arquivos[i].arquivo.strExtensao %></span>
                                        </div>    
                                        <p><%=item.arquivos[i].arquivo.strNome %></p>
                                        <%
                                    if (bolMobile)
                                    {
                                            %>
                                            <a target="_blank" href="<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
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
                            
						<span class="sombra_ei"></span>
					</div>
                            
                    <%
                    if (item.totalComentarios > 0)
                    {
                        %>
                        <div class="coment_ei">
						    <%  
                            //Coloquei 50 nas variaveis porque os comentarios da pagina carregam de 50 em 50, diferente do padrão
                            if (dadosMensagemEducacional != null)
                            {
                                var bolPossuiComentarios50 = false;
                                if (item.comentarios != null)
                                {
                                    bolPossuiComentarios50 = item.comentarios.Count > 0;
                                }

                                var totalComentarios50 = bolPossuiComentarios50 ? Convert.ToBase64String(Encoding.UTF8.GetBytes(item.totalComentarios.ToString())) : "";
                                var idsComentarios50 = bolPossuiComentarios50 ? Convert.ToBase64String(Encoding.UTF8.GetBytes(String.Join(",", item.comentarios.Select(x => x.IdComentario)))) : ""; 
                                    
                                %>
                                    <input type="hidden" id="idsPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=idsComentarios50%>" />
                                    <input type="hidden" id="dtmPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")))%>" />
                                    <input type="hidden" id="totCom_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=totalComentarios50%>" />
                                    <div id="listaComentarios_<%:idMensagemRapida%>">
                                <%
                                        
                                foreach (var item_c in item.comentarios)
                                {
                                    Html.RenderPartial("Partials/BuscaComentariosAvinha", item_c, new ViewDataDictionary { { "bolPai", Model.bolPai }, { "idUsuarioLogado", idUsuarioLogado }, { "idVisitante", Model.idVisitante }, { "bolAcessoEscrever", Model.bolAcessoEscrever }, { "idOwner", item.IdUsuario }, { "admRede", ViewData["admRede"] }, { "idFerramentaTipo", item.idFerramentaTipo } });
                                }
                                    
                                if (item.totalComentarios > 3)
                                {
                                    %>
                                        <a href="javascript:void(0);" class="comment_das todos_comentarios pagina" ide="<%=idMensagemRapida%>"><span>»</span> Ver mais comentários&nbsp;<span class="quantidade_coment"><%="3 de " + item.totalComentarios%></span></a>                                            
                                    <%
                                }
                                %> </div> <%                                    
                            }
                            else
                            {                                                                                
                                //Exibe todos os comentários                                                
                                //Busca os comentários recebidos desta mensagem.
                                %>
                                <div id="listaComentarios_<%:idMensagemRapida%>">
                                    <%
                                    foreach (var item_c in item.comentarios)
                                    {
                                        Html.RenderPartial("Partials/BuscaComentariosAvinha", item_c, new ViewDataDictionary { { "bolPai", Model.bolPai }, { "idUsuarioLogado", idUsuarioLogado }, { "idVisitante", Model.idVisitante }, { "bolAcessoEscrever", Model.bolAcessoEscrever }, { "idOwner", item.IdUsuario }, { "admRede", ViewData["admRede"] }, { "idFerramentaTipo", item.idFerramentaTipo } });
                                    }
                                    if (item.totalComentarios > 3)
                                    { 
                                            %>
                                                <a href="javascript:void(0);" class="comment_das todos_comentarios"><span>»</span> Exibir todos os comentários <span class="quantidade_coment">+ <%:item.totalComentarios - 3%></span></a>
                                            <%
                                    }
                                    %>
                                </div>
                            <% 
                            } 
                            %>
                        </div>
                        <%
                    }                
                    %>                                    
			    </article>

                <hr>
                <!-- NOVO -->
            <%
            }
            else //não é avinha
            {
            %>
                <article class="postagem <%=(dadosMensagemEducacional != null) ? "entidade" : (item.bolEducador ? "paginas pagina_mural pgedu" : "")%>" id="avaMsg_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>">
                    
                    <div class="bloco post bl_1 clearfix highlight">

                        <!-- Cabeçalho (perfil, nome, data de postagem, opções) -->
						<header class="header_post">
                            <% 
                            if (dadosMensagemEducacional == null)
                            {

                                if (item.idPagina > 0)
                                { 
                                %>         
                                    <a href="/AVA/Pagina//<%=item.strLogin%>" class="post_perfil"><img class="" src="<%=item.strMiniFoto %>" width="55" height="55" /></a>                          
                                <%}
                                else
                                { 
                                %>
                                    <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" class="post_perfil"><img class="" src="<%=item.strMiniFoto %>" width="55" height="55" /></a>             
                                <%
                                } 
                                %>       							
							    <h3 class="post_nome_usuario">
								    <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" class=""><%=item.strNome%></a>
                                    <%
                                    if (item.IdUsuarioDestino > 0)
                                    {
                                        if (item.usuariosDestino.Count > 0)
                                        {
                                            foreach (var item_u in item.usuariosDestino)
                                            {
                                                %>    
                                                <span class="mural_context">»</span> <a href="/AVA/Perfil/Home/Index/<%=item_u.strLogin%>" class=""><%=item_u.strNome%></a>
                                                <%
                                            }
                                        }
                                    }
                                    %>
							    </h3>
							    <div class="post_horario">
								    <span class="compartilhado" iditem="" data-hasqtip="0"></span>
								    <%=linkCompartilhamento%><%=item.strTempoPublicacao%>
							    </div>

							    <div class="post_opcoes combo_denunciar_excluir">
								    <a href="javascript:void(0);"></a>
								    <ul style="display: none;">
									    <%
                                        if (idUsuarioLogado == idUsuarioMsg || bolAdmin)
                                        { 
                                        %>
                                        <li>
                                            <a class="opcao_excluir excluir_mensagem mostra_caixa confirma_excluir" href="javascript: void(0);" ident="<%:idMensagemRapida%>">Excluir</a>										
									    </li>
                                        <%
                                        } 
                                        %>
									    <li>
                                            <a class="opcao_denunciar denunciar_mensagem denunciar_comentario" href="javascript: void(0);"><span class="denunciar_comentario_combo FontAwesome"></span>Denunciar</a>										
									    </li>
								    </ul>                            
							    </div>
                            <%
                            }
                            else //é pagina do portal
                            {                                
                            %>
                                <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class=""><img class="avatar_tl" alt="<%=dadosMensagemEducacional.strTitulo%>" src="<%=dadosMensagemEducacional.strLogo%>" width="55" height="55" /></a>						
							    
                                <h3 class="post_nome_usuario">
								    <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class=""><%=dadosMensagemEducacional.strTitulo%></a>                                    
							    </h3>
							    <div class="post_horario">
								    <span class="compartilhado" iditem="" data-hasqtip="0"></span>
								     <%=dadosMensagemEducacional.strAgendamento%>
                                    <span>&bull;</span>
                                    <%=dadosMensagemEducacional.strAssunto%>
							    </div>

							    <div class="post_opcoes combo_denunciar_excluir">
								    <a href="javascript:void(0);"></a>
								    <ul style="display: none;">
									    <%
                                        if (bolSouComunicador)
                                        { 
                                        %>
                                        <li>
                                            <a class="opcao_excluir excluir_mensagem mostra_caixa confirma_excluir" href="javascript: void(0);" ident="<%:idMensagemRapida%>">Excluir</a>										
									    </li>
                                        <%
                                        } 
                                        %>									    
								    </ul>                            
							    </div>
                            <%
                            }
                            %>
						</header>
                    <%
                    if (item.idFerramentaTipo > 1 && item.idFerramentaTipo != 39)
                    {
                        var strLink = "";
                        if (item.strLink != null)
                        {
                            strLink = item.strLink;
                        }

                        string strLinkFinal = strLink.Replace("#id#", "" + item.IdFerramenta.ToString() + "");

                        if (item.idFerramentaTipo == 17 || item.idFerramentaTipo == 18 || item.idFerramentaTipo == 14 || item.idFerramentaTipo == 15)
                        {
                            strLinkFinal = strLink.Replace("#idAgendamento#", "" + item.IdFerramenta + "").Replace("#idEtapa#", "" + item.IdAuxiliar1 + "");
                        }

                        if (item.idFerramentaTipo == 34)//convite
                        {
                            %>
                            <p class="ctn_msg"><%=item.StrMensagem %></p>
                            <div class="previ_convite_mural">
                                <img class="fundo_convite" src="<%=item.strFotoGrupo%>" height="800" width="800" />
                                <img class="img_convite" src="<%=item.strFotoGrupo%>" width="67" height="67"/>
                                <div>
                                    <p class="inscricao_grupo">Convite para um grupo</p>
                                    <a href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>" class="nome_grupo_mural"><%=item.strNomeGrupo%></a>
                                    <div id="btnAceitarRecusar_<%=item.IdGrupo%>_<%=item.IdMensagemrapida%>">
                                        <% 
                                        if (item.bolConviteExcluidoGrupo)
                                        {
                                            %>
                                            <p class="convite_cancelado">Convite cancelado.</p>    
                                            <% 
                                        }
                                        else if (item.bolRecusouConviteGrupo)
                                        {
                                            %>
                                            <p class="convite_cancelado">Você recusou o convite para esse grupo.</p>    
                                            <%  
                                        }
                                        else if (item.bolAceitouConviteGrupo)
                                        {
                                            %>
                                            <a class="btn_cinza" href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>">Visualizar</a>    
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            <a class="btn_cinza" href="javascript:void(0);" onclick="aceitarConviteGrupo(<%=item.IdGrupo%>, <%=item.IdAuxiliar1%>, <%=item.IdMensagemrapida%>)">Participar</a>
                                            <a class="btn_cinza" href="javascript:void(0);" onclick="recusarConviteGrupo(<%=item.IdGrupo%>, <%=item.IdAuxiliar1%>, <%=item.IdMensagemrapida%>)">Não, obrigado(a)</a>
                                            <%  
                                        }
                                        %>
                                    </div>
                                </div>  
                            </div>  
                        <%
                        }
                        else if (item.idFerramentaTipo == 33)//inscrição obrigatória
                        {
                            %>
                            <p class="ctn_msg"><%=item.StrMensagem %></p>
                            <div class="previ_convite_mural">
                                <img class="fundo_convite" src="<%=item.strFotoGrupo%>" height="800" width="800" />
                                <img class="img_convite" src="<%=item.strFotoGrupo%>" width="67" height="67"/>
                                <div>
                                    <p class="inscricao_grupo">Inscrição no grupo</p>
                                    <a href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>" class="nome_grupo_mural"><%=item.strNomeGrupo%></a>
                                    <div id="btnAceitarRecusar_<%=item.IdGrupo%>">
                                        <a class="btn_cinza" href="/AVA/Grupo/Home/PerfilGrupo/<%=item.strLinkGrupo%>">Visualizar</a>
                                    </div>
                                </div>  
                            </div> 
                            <%
                        }
                        else
                        {
                            %>
                            <div class="embrulho">
                                <%if (item.idFerramentaTipo == 25)
                                  { %>
                                    <%if (strLink != "" && Model.bolAluno ||  (Model.bolPai || Model.bolEducador) && bolPossuoAvaliacao && item.IdUsuarioDestino == idUsuarioLogado)
                                      {%>
                                        <a href="javascript:void(0);" onclick="ViewRealizacaoProva(<%=item.IdFerramenta %>);return false;" >
                                        <img alt="" src="<%:item.strImagemPATH%>"></a>
                                        <strong><a href="javascript:void(0);" onclick="ViewRealizacaoProva(<%=item.IdFerramenta %>);return false;">
                                        <%:item.strTipo%></a></strong>
                                        <p class="ctn_msg"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
                                            <%=item.StrMensagem%>
                                        </p>
                                    <%}
                                      else
                                      { %>
                                        <img alt="" src="<%:item.strImagemPATH%>" />
                                        <strong><%:item.strTipo%></strong>
                                         <p class="ctn_msg"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
                                            <%=item.StrMensagem%>
                                        </p>
                                   <% }
                                  }
                                  else
                                  {
                                    if (strLink != "") {%><a href="<%:strLinkFinal%>"><%} %><img alt="" src="<%:item.strImagemPATH%>"> <%if (strLink != "") {%></a><%} %>
                                    <strong><%if (strLink != "") {%><a href="<%:strLinkFinal%>"><%} %><%:item.strTipo%> <%if (strLink != "") {%></a><%} %></strong>
                                    <p class="ctn_msg"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
                                        <%=item.StrMensagem%>
                                    </p>
                                <%} %>
                            </div>
                            <%
                        }
                    }
                    else //é mensagem padrão ou pagina educacional
                    {
                        var strMensagemPadrao = item.StrMensagem;
                        var bolMostrarMultimidia = true;
                        
                        if (dadosMensagemEducacional != null)
                        {
                            if (dadosMensagemEducacional.bolBanner)
                            {
                                bolMostrarMultimidia = false;                                
                                strMensagemPadrao = "<a href=\"" + item.strLinkVideo + "\" target=\"_blank\">" + strMensagemPadrao + "</a>";
                                
                                if (dadosMensagemEducacional.banner != null)
                                { 
                                    %>
                                    <div class="banner_mural">
                                        <a href="<%=item.strLinkVideo%>" target="_blank">
                                        <img src="<%=dadosMensagemEducacional.banner.strDiretorio + "/" + dadosMensagemEducacional.banner.strArquivo + dadosMensagemEducacional.banner.strExtensao %>" alt="" />
                                        </a>
                                    </div>
                                <% }
                            }
                        } %>
                        <% if(!String.IsNullOrEmpty(strMensagemPadrao)){ %>
                        <p class="ctn_msg"><%=strMensagemPadrao%></p>
                        <% } %>
                        <%  if (dadosMensagemEducacional != null)
                            {
                                if (dadosMensagemEducacional.bolBanner)
                                {
                                    string textoLinkBanner = item.strLinkVideo.ToUpper();
                                    if (textoLinkBanner.IndexOf("://") >= 0)
                                        textoLinkBanner = textoLinkBanner.Substring(textoLinkBanner.IndexOf("://") + 3);
                                    textoLinkBanner = textoLinkBanner.Replace("WWW.", "");
                                    if (textoLinkBanner.IndexOf("/") >= 0)
                                        textoLinkBanner = textoLinkBanner.Substring(0, textoLinkBanner.IndexOf("/"));
                                %>
                                    <p class="referencia_post"><a href="<%=item.strLinkVideo%>" target="_blank"><%=textoLinkBanner%></a></p><div class="clearfix"></div>
                                <% 
                                }
                            } 
                            
                            if (item.imagens != null && item.imagens.Count > 0 && bolMostrarMultimidia)
                            {
                                int qtd = item.imagens.Count;
                                int qtdMax = 3;
                                %>
                                <div class="imagens_mural">
                                    <a data-width="<%=item.imagens[0].arquivo.largura %>" data-height="<%=item.imagens[0].arquivo.altura %>" data-idarquivo="<%=item.imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[0].arquivo.strDiretorio + "/" + item.imagens[0].arquivo.strArquivo + item.imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=item.imagens[0].arquivo.strNome %>" title="<%=item.imagens[0].arquivo.strNome == null || item.imagens[0].arquivo.strNome == "" ? "Insira um título" : item.imagens[0].arquivo.strNome %>" data-posicao="<%=item.imagens[0].intOrdem %>" data-descricao="<%=item.imagens[0].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=item.imagens[0].arquivo.strDiretorio + "/" + item.imagens[0].arquivo.strArquivo + item.imagens[0].arquivo.strExtensao %>"></a>
                                    <%
                                    if (qtd > 2)
                                    {
                                        %>
                                        <div class="thumbs_mural" style="height: 122px;">
                                        <%
                                        if (qtd > qtdMax)
                                        {

                                            for (int i = 1; i < qtdMax; i++)
                                            {
                                                %>
                                                <a data-nomearquivo="<%=item.imagens[i].arquivo.strNome %>" data-width="<%=item.imagens[i].arquivo.largura %>" data-height="<%=item.imagens[i].arquivo.altura %>" data-idarquivo="<%=item.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.strArquivo + item.imagens[i].arquivo.strExtensao %>" title="<%=item.imagens[i].arquivo.strNome == null || item.imagens[i].arquivo.strNome == "" ? "Insira um título" : item.imagens[i].arquivo.strNome %>" data-posicao="<%=item.imagens[i].intOrdem %>" data-descricao="<%=item.imagens[i].arquivo.strDescricao %>"><img src="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.thumbnail + item.imagens[i].arquivo.strExtensao %>"></a>
                                                <%
                                            }

                                            for (int i = qtdMax; i < qtd; i++)
                                            {
                                                %>
                                                <a data-nomearquivo="<%=item.imagens[i].arquivo.strNome %>" data-width="<%=item.imagens[i].arquivo.largura %>" data-height="<%=item.imagens[i].arquivo.altura %>" data-idarquivo="<%=item.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" style="display: none;" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.strArquivo + item.imagens[i].arquivo.strExtensao %>" title="<%=item.imagens[i].arquivo.strNome == null || item.imagens[i].arquivo.strNome == "" ? "Insira um título" : item.imagens[i].arquivo.strNome %>" data-posicao="<%=item.imagens[i].intOrdem %>" data-descricao="<%=item.imagens[i].arquivo.strDescricao %>"><img src="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.thumbnail + item.imagens[i].arquivo.strExtensao %>"></a>
                                                <%
                                            }
                                        }
                                        else
                                        {
                                            for (int i = 1; i < qtd; i++)
                                            {
                                                //Response.Write("> " + item.imagens[i].arquivo.strDescricao + " - " + item.imagens[i].arquivo.idArquivo);
                                                %>
                                                <a data-nomearquivo="<%=item.imagens[i].arquivo.strNome %>" data-width="<%=item.imagens[i].arquivo.largura %>" data-height="<%=item.imagens[i].arquivo.altura %>" data-idarquivo="<%=item.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.strArquivo + item.imagens[i].arquivo.strExtensao %>" title="<%=item.imagens[i].arquivo.strNome == null || item.imagens[i].arquivo.strNome == "" ? "Insira um título" : item.imagens[i].arquivo.strNome %>" data-posicao="<%=item.imagens[i].intOrdem %>" data-descricao="<%=item.imagens[i].arquivo.strDescricao %>"><img src="<%=item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.thumbnail + item.imagens[i].arquivo.strExtensao %>"></a>
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
                                        <a data-width="<%=item.imagens[1].arquivo.largura %>" data-height="<%=item.imagens[1].arquivo.altura %>" data-idarquivo="<%=item.imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=item.IdMensagemrapida %>" href="<%=item.imagens[1].arquivo.strDiretorio + "/" + item.imagens[1].arquivo.strArquivo + item.imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=item.imagens[1].arquivo.strNome %>" title="<%=item.imagens[1].arquivo.strNome == null || item.imagens[1].arquivo.strNome == "" ? "Insira um título" : item.imagens[1].arquivo.strNome %>" data-posicao="<%=item.imagens[1].intOrdem %>" data-descricao="<%=item.imagens[1].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=item.imagens[1].arquivo.strDiretorio + "/" + item.imagens[1].arquivo.strArquivo + item.imagens[1].arquivo.strExtensao %>"></a>
                                        <%
                                    }
                                    %>
                                
                                </div>                                
                                <%
                            }

                            if (item.strLinkVideo.Length > 0 && bolMostrarMultimidia)
                            {
                                string strLinkPrev = item.strLinkPreviewVideo;
                                if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
                                                                
                                %>
                                <a class="linkvideo" href="<%=item.strLinkVideo%>" target="_blank"><%=item.strLinkVideo%></a>

                                <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> <%=dadosMensagemEducacional == null ? "width=\"450\" height=\"315\"" : "width=\"100%\" height=\"360\""%> src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
                                <%  
                            }

                            if (item.arquivos != null && item.arquivos.Count > 0 && bolMostrarMultimidia)
                            {
                                int qtd = item.arquivos.Count;
                                for (int i = 0; i < (qtd > 3 ? 3 : qtd); i++)
                                {
                                    %>
                                    <div class="prev_documento">
                                        <div class="tipo_arquivo">
                                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                                            <span><%=item.arquivos[i].arquivo.strExtensao %></span>
                                        </div>    
                                        <p><%=item.arquivos[i].arquivo.strNome %></p>
                                        <%
                                    if (bolMobile)
                                    {
                                            %>
                                            <a target="_blank" href="<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
                                                <%
                                        }
                                        else
                                        {
                                            %>
                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        %>
                                        
                                    </div>
                                    <%
                                }

                                if (item.arquivos.Count > 3)
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
                                                    <span><%=item.arquivos[i].arquivo.strExtensao %></span>
                                                </div>    
                                                <p><%=item.arquivos[i].arquivo.strNome %></p>
                                                <%
                                            if (bolMobile)
                                            {
                                                    %>
                                                    <a target="_blank" href="<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
                                                    <%
                                                }
                                                else
                                                {
                                                    %>
                                                    <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>">Download</a>
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
                            } %>
                        <div class="clearfix"></div>
                        <% } %>

                        <div class="post_acoes">
                            <% 
                            if (Model.bolAcessoEscrever  || Model.bolPai || bolSouComunicador)
                            {                               
                                %>
                                <div class="acao_curtir">
                                    <a href="javascript:void(0);" class="btn <%=item.bolCurtiu ? " ativo" : "" %>" idMensagemRapida="<%=item.IdMensagemrapida%>"></a>
                                                                                                       
                                    <div class="feed" idMensagem="<%=item.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=item.IdMensagemrapida%>">
                                        <%
                                    Html.RenderPartial("Partials/ListaCurticoesMensagemNew", item, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado }, { "idFerramentaTipo", item.idFerramentaTipo } });
                                        %>
                                    </div>
                                </div>
                                <%
                                if (bolPodeComentarPost && !bolUsuarioSemTurma && !Model.bolSuspenso)
                                {
                                    if (!bolAcessoEscreverBloqueado && (Model.bolEducador || Model.bolAluno || bolSouComunicador))
                                    {
                                        %>
                                        <div class="acao_comentar">
                                            <a id="verMensagens_<%=item.IdMensagemrapida%>" href="" onclick="exibeComentarios(this); return false;" class="btn botaoComentar" idMensagemRapida="<%=item.IdMensagemrapida%>">
                                                <span class="FontAwesome" />
                                            </a>
                                        </div>
                                        <% 
                                    } 
                                }             
                                %>

                                <%  
                                var verComentarios = true;
                                if (dadosMensagemEducacional != null)
                                    verComentarios = dadosMensagemEducacional.bolComentar;

                                if (verComentarios)
                                {
                                    if (dadosMensagemEducacional == null)
                                    {    
                                        %>
                                        <div class="clearfix"></div>
                                        <div class="comentariosMural" id="boxComentarios_<%=item.IdMensagemrapida%>" style="display: none;">
                                            <%
                                        Html.RenderPartial("Partials/ListaComentariosNew", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin }, { "idFerramentaTipo", item.idFerramentaTipo }, { "souComunicadorPost", bolSouComunicador }, { "bolPodeComentarPost", bolPodeComentarPost }, { "bolUsuarioSemTurma", bolUsuarioSemTurma }, { "bolAcessoEscreverBloqueado", bolAcessoEscreverBloqueado }, { "bolPai", Model.bolPai }, { "bolSuspenso", Model.bolSuspenso }, { "bolEducador", Model.bolEducador } });
                                            %>
                                        </div> 
                                        <%  
                                            
                                        if (bolPodeComentarPost && !bolUsuarioSemTurma && !Model.bolSuspenso)
                                        {
                                            if ((!Model.bolPai || Model.bolEducador || Model.bolAluno || bolSouComunicador) && !bolAcessoEscreverBloqueado)
                                            {
                                            %>
                                            <form class="campo_comentar" id="campoComentar_<%=item.IdMensagemrapida%>" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;" style="display: none;">
				                                <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="25" width="25"></a>
				                                <input placeholder="Escreva um comentário..." idMensagemRapida="<%=item.IdMensagemrapida%>" class="inputComentario" name="strComentario" autocomplete="off" ident="<%=item.IdMensagemrapida%>" type="text" />
			                                </form>
                                            <%        
                                            }
                                        }
                                    
                                    }
                                    else
                                    {
                                        if (bolPodeComentarPost && !bolUsuarioSemTurma && !Model.bolSuspenso)
                                        {
                                            if (!bolAcessoEscreverBloqueado && (Model.bolEducador || Model.bolAluno || bolSouComunicador))
                                            {
                                            %>
                                            <div class="clearfix"></div>
                                            <form class="campo_comentar" id="campoComentar_<%=item.IdMensagemrapida%>" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				                                <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="25" width="25"></a>
				                                <input placeholder="Escreva um comentário..." idMensagemRapida="<%=item.IdMensagemrapida%>" class="inputComentario" name="strComentario" autocomplete="off" ident="<%=item.IdMensagemrapida%>" type="text" />
			                                </form>
                                            <%        
                                            }
                                        }
                                        
                                        var bolPossuiComentarios50 = false;
                                        if (item.comentarios != null)
                                            bolPossuiComentarios50 = item.comentarios.Count > 0;
                                        
                                        /*Comentarios 50 em 50 para post educacional*/ %>
                                        <div class="clearfix"></div>
                                        <div class="comentariosMural" id="boxComentarios_<%=item.IdMensagemrapida%>" <%=bolPossuiComentarios50 ? "" : "style=\"display:none;\"" %>>
                                        <%
                                        Html.RenderPartial("Partials/ListaComentariosNew", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin }, { "idFerramentaTipo", item.idFerramentaTipo }, { "souComunicadorPost", bolSouComunicador }, { "bolPodeComentarPost", bolPodeComentarPost }, { "bolUsuarioSemTurma", bolUsuarioSemTurma }, { "bolAcessoEscreverBloqueado", bolAcessoEscreverBloqueado }, { "bolPai", Model.bolPai }, { "bolSuspenso", Model.bolSuspenso }, { "bolEducador", Model.bolEducador } });
                                        %>
                                        </div>        
                                <%  }
                                }%>   

                                <% 
                            } 
                            %>
                        </div>
                </article>
<%    
            }//avinha                

        }//foreach de mensagens

        //Se tiver menos de 10 esconde o veja mais
        if (Model.TimeLinePrivado.mensagens.Count < qtdRegistro)
        {
            %>
            <input type="hidden" value="poucasMsgsRapidas" />
            <%
        }        

    }
    else //não tem mensagens
    {
        var semMensagemNoFiltroAtual = false;
        try
        {
            semMensagemNoFiltroAtual = (bool)ViewData["SemMensagemNoFiltroAtual"];
        }
        catch
        {
            semMensagemNoFiltroAtual = true;
        }
        
        if (semMensagemNoFiltroAtual)
        { 
            %>
            <article class="clearfix highlight">Não há resultados para o filtro aplicado.</article>
            <% 
        }
        else
        { //Antiga Nenhuma mensagem por enquanto. 
            %>
            <article class="clearfix highlight">Você ainda não tem posts em seu mural.</article>
            <%
        } 
        %>

        <input type="hidden" value="semMsgsRapidas" />
    <%
    }

    if (Model.TimeLinePrivado.mensagens.Count == qtdRegistro)
    {
        var possuiVerMais = true; //True por que não sei todos que usam TimeLine.ascx
        if (ViewData.ContainsKey("possuiVerMais"))
        {
            possuiVerMais = (bool)ViewData["possuiVerMais"];
        }

        if (possuiVerMais)
        {
            if (bolAvinha) // Se for avinha muda o botão veja mais (Renan Daré - 05/04/13)
            {
                %>
                <footer id="ava_footervejamais" class="blokletters veja_mais_ei_mural">
				    <a href="javascript: void(0);" class="vejaMais_MR"></a>
                    <input type="hidden" id="id" value="<%=Model.idUsuario %>" />
			    </footer>
                <%
            }
            else // Se não, continua com o botão padrão.
            {
                %>
                <footer class="mural_footer">
					<a href="javascript: void(0);" title="Veja mais" alt="Veja mais" class="bloco veja_mais bl_1 vejaMais_MR">Veja mais</a>
					<input type="hidden" id="id" value="<%=Model.idUsuario %>">
				</footer>                
                <%
            }
        }
    } 
%>
