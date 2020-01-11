<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MainPerfilPrivado>" %>
<input type="hidden" id="strNomeLogado" value="<%:Model.strNome%>" />
<input type="hidden" id="strMiniFotoLogado" value="<%:Model.strMiniFoto%>" />
<input type="hidden" id="strLoginLogado" value="<%:Model.strLogin%>" />
<input type="hidden" id="strEmailLogado" value="<%:Model.strEmail%>" />
<input type="hidden" id="strURLCorrente" value="<%:HttpContext.Current.Request.Url.AbsoluteUri%>" />
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/muralTimelineNew_3.2.0.js") %><%=Url.TimeStampLink() %>"></script>

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
                linkCompartilhamento = "<span class=\"compartilhado\" iditem=" + idMensagemRapida + "></span>";
            
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

                                
                                if( Model.bolEducador  ){
                                    strLinkFinal = "/AVA/Caminhos";
                                }
                                else{
                                    //strLinkFinal = strLink.Replace("#idAgendamento#", "" + item.IdFerramenta + "").Replace("#idEtapa#", "" + item.IdAuxiliar1 + "");
                                    strLinkFinal = strLink.Replace("#idAgendamento#", "" + item.IdFerramenta + "").Replace("#idEtapa#", "" + item.IdAuxiliar1 + "");
                                }

                                
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
							  else if (item.idFerramentaTipo == 19)
							  { %>
								<a>
								<img alt="" src="<%:item.strImagemPATH%>"></a>
								<h4><%:item.strTipo%></h4>
								<p class="post_texto">
									<%=item.StrMensagem%>
								</p>
								<%
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
                                 if (qtd > qtdMax){
                                 %>
                                    <span class="leia_mais" style="display: ;">
								    ...
									    <a href="javascript:void(0);" class="btn_mais" onclick="mostraMaisImagens(this);"><%=qtd%> imagens - Ver todas</a>
								    </span>
								    <span class="continua_post" style="display: none;">
									    <a href="javascript:void(0);" class="btn_menos" onclick="mostraMenosImagens(this);">Ver menos</a>
								    </span>
                                    <%
                                 }
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
                <article class="postagem <%=(dadosMensagemEducacional != null) ? "entidade" : ""%>" id="avaMsg_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>">



                    <%if(item.conquista.pontos > 0 && item.idFerramentaTipo == 1 && item.conquista.trofeu != null ){%>

                        <div class="bloco post apr bl_1">

                    <%}%>

                        <%else{%>

                        <div class="bloco post bl_1">

                        <%}%>

                        <!-- Cabeçalho (perfil, nome, data de postagem, opções) -->
						<header class="header_post">
                            <% 
                            if (dadosMensagemEducacional == null)
                            {

                                if (item.idPagina > 0)
                                { 
                                %>         
                                    <a href="/AVA/Pagina//<%=item.strLogin%>" class="post_perfil"><img class="" src="<%=item.strMiniFoto %>"/></a>
                                <%}
                                else
                                { 
                                %>

                                    <%if(item.conquista.pontos > 0 && item.idFerramentaTipo == 1 && item.conquista.trofeu != null ){%>
                                        <a href="/AVA/Perfil/Home/Index/<%=item.conquista.strLoginAprimora%>" class="post_perfil"><img class="" src="<%=item.conquista.strFotoAprimora %>"/></a>

                                    
                                    <%}else{%>
                                        <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" class="post_perfil"><img class="" src="<%=item.strMiniFoto %>"/></a>
                                    <%}%>
                                <%
                                } 
                                %>      

                                    <%if(item.conquista.pontos > 0 ){%>

        							    <h3 class="post_nome_usuario">
        								    <a href="/AVA/Perfil/Home/Index/<%=item.conquista.strLoginAprimora%>" class=""><%=item.conquista.strNomeAprimora%></a>
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


                                    <%}else{%>

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

                                    <%}%>




							    <div class="post_horario">
                                    <%=linkCompartilhamento%>
								    <%
                                    var dataPost = item.strTempoPublicacao;
                                    Response.Write(dataPost);

                                    var strDisciplina = " Todas as disciplinas";
                                    if (item.strDisciplina != null && item.strDisciplina != "" ){
                                        strDisciplina = " " + item.strDisciplina;
                                    }
                                    Response.Write(strDisciplina);
                                    %>                                    
		                            
							    </div>

							    <div class="post_opcoes" onclick="exibirOpcoesPostagem(this); return false;">
								    <a href="javascript:void(0);"></a>
								    <ul style="display: none;">
									    <%
                                        if (idUsuarioLogado == idUsuarioMsg || bolAdmin)
                                        { 
                                        %>
                                        <li>
                                            <a class="opcao_editar" href="javascript:void(0);" onclick="editarPostagem(this); return false;" ident="<%:idMensagemRapida%>">Editar</a>
                                        </li>
                                        <li>
                                            <a class="opcao_excluir" href="javascript:void(0);" onclick="excluirPostagem(this); return false;" ident="<%:idMensagemRapida%>">Excluir</a>
									    </li>
                                        <%
                                        }
                                        if (idUsuarioLogado != idUsuarioMsg)
                                        { 
                                        %>
									    <li>
                                            <a class="opcao_denunciar" href="javascript:void(0);" onclick="denunciarPostagem(this); return false;">Denunciar</a>
									    </li>
                                        <%
                                        }
                                        %>
								    </ul>
							    </div>
                            <%
                            }
                            else //é pagina do portal
                            {                                
                            %>

                               <%if(item.conquista.pontos > 0  ){%>


                                    <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class="post_perfil"><img class="avatar_tl" alt="<%=dadosMensagemEducacional.strTitulo%>" src="<%=item.conquista.strFotoAprimora%>"/></a>						
    							    
                                    <h3 class="post_nome_usuario">
    								    <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class=""><%=item.conquista.strNomeAprimora%></a>                                    
    							    </h3>


                                <%}%>


                                <% else  {%>


                                    <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class="post_perfil"><img class="avatar_tl" alt="<%=dadosMensagemEducacional.strTitulo%>" src="<%=dadosMensagemEducacional.strLogo%>"/></a>                      
                                    
                                    <h3 class="post_nome_usuario">
                                        <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class=""><%=dadosMensagemEducacional.strTitulo%></a>                                    
                                    </h3>


                                <%}%>


							    <div class="post_horario">
								    <span class="compartilhado" iditem="<%:idMensagemRapida%>" data-hasqtip="0"></span>
								     <%=dadosMensagemEducacional.strAgendamento%>
                                    <span>&bull;</span>
                                    <%=dadosMensagemEducacional.strAssunto%>
							    </div>
							    <%
                                if (bolSouComunicador)
                                { 
                                %>
                                <div class="post_opcoes" onclick="exibirOpcoesPostagem(this); return false;">
                                    <a href="javascript:void(0);"></a>
                                    <ul style="display: none;">
                                        <li>
                                            <a class="opcao_editar" href="javascript:void(0);" onclick="editarPostagem(this); return false;" ident="<%:idMensagemRapida%>">Editar</a>
                                        </li>
                                        <li>
                                            <a class="opcao_excluir" href="javascript:void(0);" onclick="excluirPostagem(this); return false;" ident="<%:idMensagemRapida%>">Excluir</a>
        							    </li>
                                    </ul>                                    
                                </div>
                                <%
                                } 
                                %>									    
                            <%
                            }
                            %>
						</header>
                        
                        <div class="conteudo_post conteudo<%=item.IdMensagemrapida%>" id="conteudo<%=item.IdMensagemrapida%>">

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

                                if( Model.bolEducador || Model.bolPai  ){
                                    strLinkFinal = "/AVA/Caminhos";
                                }
                                else{
                                    strLinkFinal = strLink.Replace("#idAgendamento#", "" + item.IdFerramenta + "").Replace("#idEtapa#", "" + item.IdAuxiliar1 + "");
                                }
                            }

                            if (item.idFerramentaTipo == 34)//convite
                            {
                                %>
                                <p class="post_texto"><%=item.StrMensagem %></p>
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
                                <p class="post_texto"><%=item.StrMensagem %></p>
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
                                <div class="conteudo_atividades">
                                    
                                    <%if (item.idFerramentaTipo == 25)
                                      { %>
                                          <%if (strLink != "" && Model.bolAluno || (Model.bolPai || Model.bolEducador) && bolPossuoAvaliacao && item.IdUsuarioDestino == idUsuarioLogado)
                                            {%>
                                                <a href="javascript:void(0);" onclick="ViewRealizacaoProva(<%=item.IdFerramenta %>);return false;" >
                                                <img alt="" src="<%:item.strImagemPATH%>"/></a>
                                                <h4><a href="javascript:void(0);" onclick="ViewRealizacaoProva(<%=item.IdFerramenta %>);return false;">
                                                <%:item.strTipo%></a></h4>
                                                <p class="post_texto"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
                                                    <%=item.StrMensagem%>
                                                </p>
                                                <%
                                            }
                                            else 
                                            {  %>
                                               <%if (strLink != "")
                                                 {%><a href="<%=strLinkFinal%>"><%}
                                                 else
                                                 {%> <a><%} %> <img alt="" src="<%:item.strImagemPATH%>"></a>
                                                 <h4>
                                                    <%if (strLink != "")
                                                    {%><a href="<%=strLinkFinal%>"><%} %><%:item.strTipo%><%if (strLink != "")
                                                    {%></a><%} %>
                                                </h4>
                                                <p class="post_texto"><%=item.StrMensagem%></p>
                                          <%}
                                      }
									  else if (item.idFerramentaTipo == 19)
                                      { %>
                                        <a>
                                        <img alt="" src="<%:item.strImagemPATH%>"></a>
                                        <h4><%:item.strTipo%></h4>
                                        <p class="post_texto">
                                            <%=item.StrMensagem%>
                                        </p>
                                        <%
                                      }
                                      else
                                      {
                                        if (!string.IsNullOrEmpty(strLink))
                                        {%> <a href="<%:strLinkFinal%>"> <%} 
                                        else
                                        {%> <a> <% } %>
                                            <img alt="" src="<%:item.strImagemPATH%>"> 
                                        </a>
                                        <h4>
                                            <%if (strLink != "") {%>
                                            
                                                <a href="<%:strLinkFinal%>"><%
                                            } %>  <a href="<%:strLinkFinal%>">  <%:item.strTipo%></a> <%
                                                if (strLink != "") {%></a>


                                                <%-- <a href="<%:strLinkFinal%>"><%} %><%:item.strTipo%> <%if (strLink != "") {%></a> --%>

                                            
                                            <%} %>
                                            
                                        </h4>
                                        <p class="post_texto"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
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
                                <p ><%=strMensagemPadrao%></p>
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
                                        <div class="post_imagem imagens_mural <%=(qtd >= qtdMax ? "galeria" : (qtd == 2 ? "two-img" : "one-img"))%> 111">
                                        <%
                                            string imgPath = null;
                                            for (int i = 0; i < qtd; i++)
                                            {
                                                imgPath = item.imagens[i].arquivo.strDiretorio + "/" + item.imagens[i].arquivo.strArquivo + item.imagens[i].arquivo.strExtensao;
                                                %>
                                                <a id="<%=(i == 0 ? "imagem_" + item.IdMensagemrapida : "")%>"
                                                    data-width="<%=item.imagens[i].arquivo.largura %>"
                                                    data-height="<%=item.imagens[i].arquivo.altura %>"
                                                    data-idarquivo="<%=item.imagens[i].idArquivo %>"
                                                    class="img_post"
                                                    rel="galeria_mural_<%=item.IdMensagemrapida %>"
                                                    href="<%=imgPath%>"
                                                    data-nomearquivo="<%=item.imagens[i].arquivo.strNome %>"
                                                    title="<%=item.imagens[i].arquivo.strNome == null || item.imagens[i].arquivo.strNome == "" ? "Insira um título" : item.imagens[i].arquivo.strNome %>"
                                                    data-posicao="<%=item.imagens[i].intOrdem %>"
                                                    data-descricao="<%=item.imagens[i].arquivo.strDescricao %>"
                                                    <%=(qtd > 1 ? "style=\" background-image: url(" + imgPath + ");" + (i > 2 ? " display: none;" : "") + "\"" : "")%>>
                            
                                                        <%=(qtd == 1 ? "<img src=" + imgPath + ">" : "")%>    
                                                </a>
                                                <%
                                            }
                                        %>
                                        </div>
                                        <%
                                          if (qtd > qtdMax){
                                         %>
                                            <span class="leia_mais" style="display: ;">
									            <a href="javascript:void(0);" class="btn_mais" onclick="$('#imagem_<%=item.IdMensagemrapida %>').click();"><%=qtd%> imagens - Ver todas</a>
								            </span>

                                            <%
                                         }
                                    }

                                    if (item.strLinkVideo.Length > 0 && bolMostrarMultimidia)
                                    {
                                        string strLinkPrev = item.strLinkPreviewVideo;
                                        if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
                                                                    
                                        %>
                                        <a class="post_link" href="<%=item.strLinkVideo%>" target="_blank"><%=item.strLinkVideo%></a>

                                        <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="100%" height="360" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
                                        <%  
                                    }

                                    if (item.arquivos != null && item.arquivos.Count > 0 && bolMostrarMultimidia)
                                    {
                                        int qtd = item.arquivos.Count;
                                        for (int i = 0; i < (qtd > 3 ? 3 : qtd); i++)
                                        {
                                            %>
                                            <div class="prev_documento">
                                                <div class="bloco_arq">
                                                    <div class="tipo_arquivo">
                                                        <span><%=item.arquivos[i].arquivo.strExtensao %></span>
                                                    </div>    
                                                    <p class="nome_arquivo"><%=item.arquivos[i].arquivo.strNome %></p>
                                                </div>
                                            <%
                                            if (bolMobile)
                                            {
                                                    %>
                                                    <a target="_blank" href="<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
                                                        <%
                                                }
                                                else
                                                {
                                                    %>
                                                    <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
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
                                                        <div class="bloco_arq">
                                                            <div class="tipo_arquivo">
                                                                <span><%=item.arquivos[i].arquivo.strExtensao %></span>
                                                            </div>    
                                                            <p class="nome_arquivo"><%=item.arquivos[i].arquivo.strNome %></p>
                                                        </div>
                                                    <%
                                                    if (bolMobile)
                                                    {
                                                            %>
                                                            <a target="_blank" href="<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
                                                            <%
                                                        }
                                                        else
                                                        {
                                                            %>
                                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=item.arquivos[i].arquivo.strDiretorio + "/" + item.arquivos[i].arquivo.strArquivo + item.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
                                                            <%
                                                        }
                                                        %>
                                                    </div>
                                                    <%
                                                }    
                                                %>                                    
                                            </div>
                                    
                                        <span class="leia_mais" style="display: ;">

                                            <a href="javascript:void(0);" class="btn_mais" onclick="verMaisDoc(this); return false;">Ver mais</a>
								        </span>
                                        <%
                                        }
                                    }
                                } %>

                             
                                <%if(item.conquista.pontos > 0  ){%>


                            
                                <div class="cardscore-aprimora" id="cardscore-aprimora">


                                    <%if( item.conquista.corProeficiencia   == 2  ||  item.conquista.corProeficiencia   == 3  || item.conquista.corProeficiencia   == 4   )  {%>
                                        <div class="cardscore-body proficiencia_amarelo" >
                                    <%}%>
                                    <%if( item.conquista.corProeficiencia   == 1  && ( item.conquista.estrelas == 2 || item.conquista.estrelas == 3   ) && item.conquista.trofeu == false   )  {%>
                                        <div class="cardscore-body proficiencia_verde" >
                                    <%}%>
                                    <%if( item.conquista.corProeficiencia   == 1  && item.conquista.estrelas == 3 && item.conquista.trofeu == true  )  {%>
                                        <div class="cardscore-body proficiencia_roxo">
                                    <%}%>

                                            <div class="colun">
                                                <div class="badge">

                                                   


                                                     <%if( int.Parse( item.conquista.strSerie  ) <= 5)  {%>
                                                         <img src="/AVA/StaticContent/Common/img/card-aprimora/emoticons/passaro.png" alt="stars" height="" width="">
                                                         <!-- bird -->
                                                    <%}%>
                                                    <%else if(  (int.Parse( item.conquista.strSerie  ) > 5) && (item.conquista.corProeficiencia   == 2  ||  item.conquista.corProeficiencia   == 3  || item.conquista.corProeficiencia   == 4)) {%>
                                                    <!-- mega smile -->
                                                         <img src="/AVA/StaticContent/Common/img/card-aprimora/emoticons/card_amarelo.png" alt="stars" height="" width="">
                                                    <%}%>
                                                    <%else if(  (int.Parse( item.conquista.strSerie  ) > 5) && ( item.conquista.estrelas == 2 || item.conquista.estrelas == 3   ) && item.conquista.trofeu == false ) {%>
                                                    <!-- smile -->
                                                         <img src="/AVA/StaticContent/Common/img/card-aprimora/emoticons/card_verde.png" alt="stars" height="" width="">
                                                    <%}%>
                                                    <%else if(  (int.Parse( item.conquista.strSerie  ) > 5) && item.conquista.corProeficiencia   == 1  && item.conquista.estrelas == 3 && item.conquista.trofeu == true ) {%>
                                                    <!-- smile -->
                                                         <img src="/AVA/StaticContent/Common/img/card-aprimora/emoticons/card_roxo.png" alt="stars" height="" width="">
                                                    <%}%>


                                                </div>
                                                <div class="level">
                                                    <h3>Nível</h3>

                                                    <% if (item.conquista.corProeficiencia   == 2  ||  item.conquista.corProeficiencia   == 3  || item.conquista.corProeficiencia   == 4  ) { %>
                                                        <h1>Básico</h1>
                                                    <%}%>
                                                    <% else if ( item.conquista.corProeficiencia   == 1 && ( item.conquista.estrelas == 2 || item.conquista.estrelas == 3   ) && item.conquista.trofeu == false ) { %>
                                                        <h1>Proficiente</h1>
                                                    <%}%>
                                                    <% else if (item.conquista.corProeficiencia   == 1  && item.conquista.estrelas == 3 && item.conquista.trofeu == true) { %>
                                                        <h1>Avançado</h1>
                                                    <%}%>
                                                

                                                </div>
                                            </div>

                                            <div class="colun-center">
                                                <div class="stars bounceIn">



                                                    <%if(item.conquista.estrelas == 3 ){%>
                                                        <img src="/AVA/StaticContent/Common/img/card-aprimora/star_3.png" alt="stars" height="auto" width="220">
                                                    <%}%>


                                                    <%else if(item.conquista.estrelas < 3){%>
                                                        <img src="/AVA/StaticContent/Common/img/card-aprimora/star_2.png" alt="stars" height="auto" width="220">
                                                    <%}%>



                                                </div>
                                                <div class="avatar">

                                                    <%     

                                                        string s = item.strMiniFoto;
        
                                                        string strFoto = s.Replace("/minithumb"  , "");

                                                    %>

                                                    <div class="photo"><img src="<%=strFoto%>" alt="trophy" height="" width=""></div>

                                                    <!-- <div class="photo"><img src="/AVA/StaticContent/Common/img/card-aprimora/ei_crianca_05.jpg" alt="trophy" height="" width=""></div> -->

                                                    

                                                    <div class="element animate"><img src="/AVA/StaticContent/Common/img/card-aprimora/light.png" alt="light" height="" width=""></div>


                                                    <div class="nome_aluno_apr"><h1> <%=item.strNome%> </h1></div>
                                                </div>
                                            </div>
                                
                                            <div class="colun">
                                                <div class="trophy bounceIn">
                                                    
                                                    <%if(item.conquista.trofeu == true  && (int.Parse( item.conquista.strSerie  ) <= 5)  ){%>
                                                        <img src="/AVA/StaticContent/Common/img/card-aprimora/trofeus/trofeu_ens1.png" alt="trophy" height=120"" width="auto">
                                                        <!-- proeficiencia 3 e ensino fund 1-->
                                                    <%}%>
                                                    <%else if(item.conquista.trofeu != true  && int.Parse( item.conquista.strSerie  ) <= 5) {%>
                                                        <img src="/AVA/StaticContent/Common/img/card-aprimora/trofeus/sombra_trofeu_ens1.png" alt="trophy" height=120"" width="auto">
                                                        <!-- proeficiencia 1 ou 2 e ensino fund 1 -->
                                                    <%}%>
                                                    <%else if(item.conquista.trofeu == true  && int.Parse( item.conquista.strSerie  ) > 5  ){%>
                                                        <img src="/AVA/StaticContent/Common/img/card-aprimora/trofeus/trofeu_ens2.png" alt="trophy" height=120"" width="auto">
                                                        <!-- proficienca 3 e ensino fund 2 -->
                                                    <%}%>
                                                    <%else if(item.conquista.trofeu != true  && int.Parse( item.conquista.strSerie  ) > 5) {%>
                                                        <img src="/AVA/StaticContent/Common/img/card-aprimora/trofeus/sombra_trofeu_ens2.png" alt="trophy" height=120"" width="auto">
                                                        <!-- proficienca 1 e 2, e ensino fund 2 -->

                                                    <%}%>



                                                </div>
                                                <div class="score">
                                                    <p>Conquistou +</p>
                                                    <h1><%=item.conquista.pontos%></h1>
                                                    <h3>Pontos</h3>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="cardscore-footer">
                                            <div class="discipline">
                                                <p>Disciplina</p>
                                                <h4><%=item.conquista.strDisciplina%></h4>
                                            </div>
                                            <div class="module">
                                                <p>Módulo</p>
                                                <h4>N<%=item.conquista.nivel%> - <%=item.conquista.strModulo%></h4>
                                            </div>
                                            <div class="conclusion">
                                                <p>Concluiu em</p>
                                                <h4> <%=  item.conquista.dtmConclusao   %>  </h4>
                                            </div>
                                        </div>

                                </div>


                                <%}%>

                            </div>
                
                            <section class="modulos_extras_edit" id="modulos_extras<%=item.IdMensagemrapida %>" style="display: none">
                                                            
                                <!-- Ações de finalização de nova postagem -->
                                <div class="dialogo_acoes" id="dialogo_acoes" style="">
                                    <div class="btn_acoes right">
                                        <input type="button" name="cancelar" id="btnCancelarEdit<%=item.IdMensagemrapida %>" value="Cancelar" class="" style="display: inline-block;"> 
                                        <input type="button" name="compartilhar" id="EditPost<%=item.IdMensagemrapida %>" value="Compartilhar" class="compartilhar" style="display: inline-block;">
                                        <input type="button" name="agendar" id="agendar" value="Agendar" class="agendar" style="display:none;">
                                        
                                    </div>

                                    <!-- Feedback -->
                                    <p style="display:none;" id="feed_erro" class="feed_erro">Você precisa adicionar participantes</p>

                                </div>
                                    
                            </section>


                                <div class="post_acoes">

                                <% 
                                if (Model.bolAcessoEscrever  || Model.bolPai || bolSouComunicador)
                                {                               
                                    %>
                                    <div class="acao_curtir">
                                        <a href="javascript:void(0);" onclick="curtirPostagem(this); return false;" class="btn <%=item.bolCurtiu ? " ativo" : "" %>" idMensagemRapida="<%=item.IdMensagemrapida%>"></a>
                                        <div class="feed" idMensagem="<%=item.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=item.IdMensagemrapida%>">
                                            <%
                                        Html.RenderPartial("Partials/ListaCurticoesMensagemNovaHome", item, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado }, { "idFerramentaTipo", item.idFerramentaTipo } });
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
                                                <a id="verMensagens_<%=item.IdMensagemrapida%>" href="javascript:void(0);" onclick="exibeComentarios(this); return false;" class="btn" idMensagemRapida="<%=item.IdMensagemrapida%>">
                                                    <span class="FontAwesome" />
                                                </a>
                                            </div>
                                            <% 
                                        } 
                                    }             
                                    %>

                                </div>
                           </div>
                                <%  
                                var verComentarios = true;
                                if (dadosMensagemEducacional != null)
                                    verComentarios = dadosMensagemEducacional.bolComentar;

                                if (verComentarios)
                                {
                                    %>
                                    <div class="bloco comentarios bl_1" id="boxComentarios_<%=item.IdMensagemrapida%>" 
                                    <% 
                                    if(!(item.totalComentarios> 0)) {
                                        Response.Write("style='display: none;'");
                                    }
                                    %>

                                    >
                                
                                    <%
                                    if (dadosMensagemEducacional == null)
                                    {    
                                        %>
                                        <div class="clearfix"></div>
                                        <div class="comentariosMural">
                                            <%
                                        Html.RenderPartial("Partials/ListaComentariosNovaHome", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin }, { "idFerramentaTipo", item.idFerramentaTipo }, { "souComunicadorPost", bolSouComunicador }, { "bolPodeComentarPost", bolPodeComentarPost }, { "bolUsuarioSemTurma", bolUsuarioSemTurma }, { "bolAcessoEscreverBloqueado", bolAcessoEscreverBloqueado }, { "bolPai", Model.bolPai }, { "bolSuspenso", Model.bolSuspenso }, { "bolEducador", Model.bolEducador }, { "bolPostEducacional", dadosMensagemEducacional != null } });
                                            %>
                                        </div> 
                                        <%  
                                            
                                        if (bolPodeComentarPost && !bolUsuarioSemTurma && !Model.bolSuspenso)
                                        {
                                            if ((!Model.bolPai || Model.bolEducador || Model.bolAluno || bolSouComunicador) && !bolAcessoEscreverBloqueado)
                                            {
                                            %>
                                            <form class="post_form" id="campoComentar_<%=item.IdMensagemrapida%>" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;" 
                                                <% 
                                                if(item.totalComentarios> 0) {
                                                    Response.Write("style='width: 100%; margin-top: 10px;'");
                                                }
                                                else {
                                                    Response.Write("style='display: none; width: 100%; margin-top: 10px;'");
                                                }
                                                %>
                                                >
				                                <input placeholder="Escreva um comentário..." idMensagemRapida="<%=item.IdMensagemrapida%>" name="strComentario" autocomplete="off" ident="<%=item.IdMensagemrapida%>" type="text" onblur="comentarioInputBlur(this); return false;"
                                                onkeypress="submeteComentario(this, event)" />
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
                                            <form class="post_form" id="campoComentar_<%=item.IdMensagemrapida%>" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				                                <input placeholder="Escreva um comentário..." idMensagemRapida="<%=item.IdMensagemrapida%>" name="strComentario" autocomplete="off" ident="<%=item.IdMensagemrapida%>" type="text" onblur="comentarioInputBlur(this); return false;" onkeypress="submeteComentario(this, event)" />
			                                </form>
                                            <%        
                                            }
                                        }
                                        
                                        var bolPossuiComentarios50 = false;
                                        if (item.comentarios != null)
                                            bolPossuiComentarios50 = item.comentarios.Count > 0;
                                        
                                        /*Comentarios 50 em 50 para post educacional*/ %>
                                        <div class="clearfix"></div>
                                        <div class="comentariosMural" id="comentarios_<%=item.IdMensagemrapida%>" <%=bolPossuiComentarios50 ? "" : "style=\"display:none;\"" %>>
                                        <%
                                        Html.RenderPartial("Partials/ListaComentariosNovaHome", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin }, { "idFerramentaTipo", item.idFerramentaTipo }, { "souComunicadorPost", bolSouComunicador }, { "bolPodeComentarPost", bolPodeComentarPost }, { "bolUsuarioSemTurma", bolUsuarioSemTurma }, { "bolAcessoEscreverBloqueado", bolAcessoEscreverBloqueado }, { "bolPai", Model.bolPai }, { "bolSuspenso", Model.bolSuspenso }, { "bolEducador", Model.bolEducador }, { "bolPostEducacional", dadosMensagemEducacional != null } });
                                        %>
                                        </div>        
                                <%  }
                                %>
                                </div>
                                <%
                                }%>   

                                <% 
                            } 
                            %>
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
            <article class="postagem">
                <div class="bloco feedback-filtro">
				    <p>Não há resultados para o filtro aplicado.</p>
				</div>
            </article>
            <% 
        }
        else
        { //Antiga Nenhuma mensagem por enquanto. 
            %>
            <article class="postagem">
                <div class="bloco feedback-filtro">
				    <p>Você ainda não tem posts em seu mural.</p>
				</div>
            </article>
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
                <footer id="mural_footer" class="mural_footer">
					<a href="javascript: void(0);" onClick="vejaMais(this, <%=Model.idUsuario %>); return false;" title="Veja mais" alt="Veja mais" class="bloco veja_mais bl_1">Veja mais</a>
				</footer>                
                <%
            }
        }
    } 
%>
<script>
    $("#ava_fluxoarticles article .post_texto").each(function () {
        $(this).expander({
            slicePoint: 500,
            window: 2,
            expandText: 'Leia mais',
            expandPrefix: '...',
            userCollapseText: 'Mostrar menos',
            preserveWords: true,
            expandEffect: 'fadeIn',
            collapseEffect: 'fadeOut',
            moreClass: 'leia_mais',
            lessClass: 'continua_post'
        });
    });




    

</script>