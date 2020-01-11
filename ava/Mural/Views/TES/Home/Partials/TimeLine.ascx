<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MainPerfilPrivado>" %>
<input type="hidden" id="strNomeLogado" value="<%:Model.strNome%>" />
<input type="hidden" id="strMiniFotoLogado" value="<%:Model.strMiniFoto%>" />
<input type="hidden" id="strLoginLogado" value="<%:Model.strLogin%>" />
<input type="hidden" id="strEmailLogado" value="<%:Model.strEmail%>" />
<input type="hidden" id="strURLCorrente" value="<%:HttpContext.Current.Request.Url.AbsoluteUri%>" />
<script type="text/javascript">
    $(function () {
        var tpClick = "click"; // web
        if (Modernizr.touch) {
            tpClick = "touchstart"; //mobile
        }

        $("article .ctn_msg").expander({
            slicePoint: 500,
            window: 2,
            expandText: ' leia mais',
            expandPrefix: '...',
            userCollapseText: 'menos',
            preserveWords: true,
            expandEffect: 'fadeIn',
            collapseEffect: 'fadeOut'
        });

        $("article .iframeVideoVimeo").on('load', function () {
            var playerVimeo = $f(this);
            var playerVimeoStarted = false;
            playerVimeo.api('pause');
            playerVimeo.addEvent('ready', function () {
                playerVimeo.addEvent('play', function () {
                    if (!playerVimeoStarted) {
                        playerVimeoStarted = true;
                        playerVimeo.api('pause');
                    }
                });
            });
        });        
    });

    $('body').on('click', '.todos_comentarios', function (event) {
        if (!$(this).hasClass('carregando')) {
            $(this).addClass('carregando');

            var _this = $(this);
            var _id = _this.closest('article').attr('ide');

            var comentarios50 = $(this).hasClass('pagina') ? true : false;
            var postData = { 'id': _id }

            if (comentarios50) {
                postData = {
                    'id': _id,
                    'maximo': 50,
                    'dataPrimeiroLoad': $('#dtmPriUpd_' + _id).val(),
                    'idsCarregados': $('#idsPriUpd_' + _id).val()
                };
            }
            var postUrl = comentarios50 ? ('/ava/Mural/Home/TodosComentariosAvinha/') : ('/ava/Mural/Home/TodosComentariosAvinha/');

            var divLoading = '<div style="text-align: center;" class="divLoading_' + _id + '"><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" style="float:none;"></div>';
            $(this).before(divLoading);
            $.post(postUrl, postData, function (data) {
                $('.divLoading_' + _id).remove();

                if (comentarios50) {

                    $(_this).before(data);

                    ///$('#idsPriUpd_' + _id).val($('#idsUltUpd_' + _id).val());

                    var idsAtuais = '';
                    if ($.trim($('#idsPriUpd_' + _id).val()) != '') {
                        idsAtuais += (atob($('#idsPriUpd_' + _id).val()).split(','));
                    }
                    if ($.trim($('#idsUltUpd_' + _id).val()) != '') {
                        if (idsAtuais != '')
                            idsAtuais += ',';
                        idsAtuais += (atob($('#idsUltUpd_' + _id).val()).split(','));
                    }

                    $('#idsPriUpd_' + _id).val(btoa(idsAtuais));

                    var totalComentarios = parseInt(atob($('#totCom_' + _id).val()));
                    var totalCarregados = atob($('#idsPriUpd_' + _id).val()).split(',').length;
                    var possuiVerMais = $('#bolVerMais50_' + _id).val() == '1';

                    if (possuiVerMais) {
                        $(_this).removeClass('carregando');
                        $('.todos_comentarios[ide=' + _id + '] .quantidade_coment').text(totalCarregados + ' de ' + totalComentarios);
                    } else {
                        $('.todos_comentarios[ide=' + _id + ']').slideUp().remove(); //.html('<span class="quantidade_coment">' + totalCarregados + ' de ' + totalComentarios + '</span>');
                    }

                    $('#idsUltUpd_' + _id).remove();
                    $('#bolVerMais50_' + _id).remove();
                    $('#totComUpd_' + _id).remove();

                } else {
                    $('#listaComentarios_' + _id).html(data);
                    $(this).removeClass('carregando');
                }

                $('.ctn_msg', '#listaComentarios_' + _id).expander({
                    slicePoint: 500,
                    window: 2,
                    expandText: ' leia mais',
                    expandPrefix: '...',
                    userCollapseText: 'menos',
                    preserveWords: true,
                    expandEffect: 'fadeIn',
                    collapseEffect: 'fadeOut'
                });

                $(".iframeVideoVimeo", '#listaComentarios_' + _id).on('load', function () {
                    var playerVimeo = $f(this);
                    var playerVimeoStarted = false;
                    playerVimeo.api('pause');
                    playerVimeo.addEvent('ready', function () {
                        playerVimeo.addEvent('play', function () {
                            if (!playerVimeoStarted) {
                                playerVimeoStarted = true;
                                playerVimeo.api('pause');
                            }
                        });
                    });
                });
            });
        }
    });

</script>
<% 
    bool bolAdmin = false;
    bool bolAvinha = false;
    bool bolMobile = false;

    var auxTextoMensagem = "";

    bool bolPossuiPostEducacional = ViewData["possuiPostEducacional"] != null ? (bool)ViewData["possuiPostEducacional"] : false;
    var dadosEducacional = ViewData["postEducacionalDados"] != null ? (Dictionary<int, Mural.Models.MensagemRapidaEducacional>)ViewData["postEducacionalDados"] : new Dictionary<int, Mural.Models.MensagemRapidaEducacional>();
    bool bolPossuoAvaliacao = false;
    bolPossuoAvaliacao = Convert.ToBoolean(ViewData["possuoAvaliacao"]);
    string uAgent = Request.UserAgent.ToLower();
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
    if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
    {
        bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
    }
   
    int qtdRegistro;
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

    bool bolPodeComentar = ((Model.intComunicacaoPermissao == 1 || Model.intComunicacaoPermissao == 2) && !bolAcessoEscreverBloqueado);

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

                        <% if( item.conquista.pontos == 0 ) {%>

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

                        <%}%>
                        <% else {%>


                            <div class="info_post_ei apr-avinha">
                            <a href="/AVA/Perfil/Home/Index/<%=item.conquista.strLoginAprimora%>" title="<%=item.conquista.strNomeAprimora%>">
                                <img class="avatar_tl" src="<%: item.conquista.strFotoAprimora %>" width="80" height="80" alt="avatar"/> 
                            </a>
                            <!-- <span class="seta_ei"></span> -->
                            <div>
                                <h2 class="din nome_tia"><a href="/AVA/Perfil/Home/Index/<%=item.conquista.strLoginAprimora%>"><%= item.conquista.strNomeAprimora %></a></h2>
                                <p class="ei_p"><%=linkCompartilhamento%><%=item.strTempoPublicacao %></p>
                                <div class="feedCurtir lista_curtidas_<%:idMensagemRapida%>">
                                    <%Html.RenderPartial("Partials/ListaCurticoesMensagem", item, new ViewDataDictionary { { "idUsuario", Model.idVisitante }, { "idUsuarioLogado", idUsuarioLogado } });%>
                                </div>  
                            </div>
                        </div>
                        
                        <%}%>


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

                    <%
                        if(item.idFerramentaTipo != 1)
                        {%>

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
                            <span class="blokletters speech_ei ctn_msg josiasMobile"><%=auxTextoMensagem%></span>
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
                                <span class="blokletters speech_ei ctn_msg aMobile"><%=auxTextoMensagem%></span>
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

                            if (item.idFerramentaTipo != 33 && item.idFerramentaTipo != 34 && item.idFerramentaTipo != 1 )
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
                            <!-- <span class="blokletters speech_ei ctn_msg bmobile"><%=auxTextoMensagem%></span>                             -->
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
                                <div class="conteudo_post">                        
                                    <p class="post_texto"><%=item.StrMensagem%></p>                                           
                                </div>

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

                            if (item.arquivos != null && item.arquivos.Count > 0)
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


                    <%}%>

                        <%
                        if(item.idFerramentaTipo == 1)
                        {%>

                            <div class="conteudo_post">                        
                                <p class="post_texto"><%=item.StrMensagem%></p>                                           
                            </div>

                            <%if(  item.conquista.pontos >  0) 
                            {%>
                        
                                    <div class="cardscore-aprimora" id="cardscore-aprimora">


                                        <%if( item.conquista.corProeficiencia   == 2  ||  item.conquista.corProeficiencia   == 3  || item.conquista.corProeficiencia   == 4  )  {%>
                                            <div class="cardscore-body proficiencia_amarelo" >
                                        <%}%>
                                        <%if(   item.conquista.corProeficiencia   == 1  && ( item.conquista.estrelas == 2 || item.conquista.estrelas == 3   ) && item.conquista.trofeu == false   )  {%>
                                            <div class="cardscore-body proficiencia_verde" >
                                        <%}%>
                                        <%if(  item.conquista.corProeficiencia   == 1  && item.conquista.estrelas == 3 && item.conquista.trofeu == true )  {%>
                                            <div class="cardscore-body proficiencia_roxo">
                                        <%}%>

                                                <div class="colun">
                                                    <div class="badge">
                                                        <%if( int.Parse( item.conquista.strSerie  ) <= 5)  {%>
                                                             <img src="/AVA/StaticContent/Common/img/card-aprimora/emoticons/passaro.png" alt="stars" height="" width="">
                                                             <!-- bird -->
                                                        <%}%>
                                                        <%else if(  (int.Parse( item.conquista.strSerie  ) > 5) && item.conquista.corProeficiencia   == 2  ||  item.conquista.corProeficiencia   == 3  || item.conquista.corProeficiencia   == 4 ) {%>
                                                        <!-- mega smile -->
                                                             <img src="/AVA/StaticContent/Common/img/card-aprimora/emoticons/card_amarelo.png" alt="stars" height="" width="">
                                                        <%}%>
                                                        <%else if(  (int.Parse( item.conquista.strSerie  ) > 5) && item.conquista.corProeficiencia   == 1  && ( item.conquista.estrelas == 2 || item.conquista.estrelas == 3   ) && item.conquista.trofeu == false ) {%>
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

                                                        <% if (  item.conquista.corProeficiencia   == 2  ||  item.conquista.corProeficiencia   == 3  || item.conquista.corProeficiencia   == 4  ) { %>
                                                            <h1>Básico</h1>
                                                        <%}%>
                                                        <% else if (  item.conquista.corProeficiencia   == 1 && ( item.conquista.estrelas == 2 || item.conquista.estrelas == 3   ) && item.conquista.trofeu == false  ) { %>
                                                            <h1>Proficiente</h1>
                                                        <%}%>
                                                        <% else if (  item.conquista.corProeficiencia   == 1  && item.conquista.estrelas == 3 && item.conquista.trofeu == true  ) { %>
                                                            <h1>Avançado</h1>
                                                        <%}%>
                                                    

                                                    </div>
                                                </div>

                                                <div class="colun-center">
                                                    <div class="stars bounceIn">



                                                        <%if(item.conquista.estrelas == 3  ){%>
                                                            <img src="http://dev.educacional.net/AVA/StaticContent/Common/img/card-aprimora/star_3.png" alt="stars" height="auto" width="220">
                                                        <%}%>


                                                        <%else if(  item.conquista.estrelas < 3  ) {%>
                                                            <img src="http://dev.educacional.net/AVA/StaticContent/Common/img/card-aprimora/star_2.png" alt="stars" height="auto" width="220">
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
                                                        
                                                        <%if( item.conquista.trofeu == true  && (int.Parse( item.conquista.strSerie  ) <= 5)  ){%>
                                                            <img src="/AVA/StaticContent/Common/img/card-aprimora/trofeus/trofeu_ens1.png" alt="trophy" height=120"" width="auto">
                                                            <!-- proeficiencia 3 e ensino fund 1-->
                                                        <%}%>
                                                        <%else if( item.conquista.trofeu != true  && int.Parse( item.conquista.strSerie  ) <= 5) {%>
                                                            <img src="/AVA/StaticContent/Common/img/card-aprimora/trofeus/sombra_trofeu_ens1.png" alt="trophy" height=120"" width="auto">
                                                            <!-- proeficiencia 1 ou 2 e ensino fund 1 -->
                                                        <%}%>
                                                        <%else if( item.conquista.trofeu == true  && int.Parse( item.conquista.strSerie  ) > 5  ){%>
                                                            <img src="/AVA/StaticContent/Common/img/card-aprimora/trofeus/trofeu_ens2.png" alt="trophy" height=120"" width="auto">
                                                            <!-- proficienca 3 e ensino fund 2 -->
                                                        <%}%>
                                                        <%else if( item.conquista.trofeu != true  && int.Parse( item.conquista.strSerie  ) > 5) {%>
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

                            <%} else if (item.imagens != null && item.imagens.Count > 0) 
                                { 
                                    int qtd = item.imagens.Count;
                                    int qtdMax = 3;
                                    %>
                                       
                                        
                                        <div class="imagens_mural">
                                            <a data-width="<%=item.imagens[0].arquivo.largura %>" data-height="<%=item.imagens[0].arquivo.altura %>" 
                                                data-idarquivo="<%=item.imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" 
                                                rel="galeria_mural_<%=item.IdMensagemrapida %>" 
                                                href="<%=item.imagens[0].arquivo.strDiretorio + "/" + item.imagens[0].arquivo.strArquivo + item.imagens[0].arquivo.strExtensao %>" 
                                                data-nomearquivo="<%=item.imagens[0].arquivo.strNome %>" title="<%=item.imagens[0].arquivo.strNome == null || item.imagens[0].arquivo.strNome == "" ? "Insira um título" : item.imagens[0].arquivo.strNome %>" 
                                                data-posicao="<%=item.imagens[0].intOrdem %>" data-descricao="<%=item.imagens[0].arquivo.strDescricao %>">
                                                    <img style="width: 100%;" src="<%=item.imagens[0].arquivo.strDiretorio + "/" + item.imagens[0].arquivo.strArquivo + item.imagens[0].arquivo.strExtensao %>"></a>

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
                        
                                <%} %>
                            <%}%>
                        
                            <%if (item.arquivos != null && item.arquivos.Count > 0)
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
                            }%>

                            
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
                <article class="clearfix <%=(dadosMensagemEducacional != null) ? "paginas pagina_mural pgedu" : (item.bolEducador ? "highlight" : "")%>" id="avaMsg_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>">
                    
                    <% 
                    if (dadosMensagemEducacional == null) 
                    { 
                        %>
                        <ul class="combo_denunciar_excluir">
                            <li>
                                <a href="javascript:void(0);" class="icone"></a>
                                <ul>
                                    <%
                                    if (idUsuarioLogado == idUsuarioMsg || bolAdmin)
                                    { 
                                        %>
                                        <li><a class="excluir_mensagem mostra_caixa confirma_excluir" href="javascript: void(0);" ident="<%:idMensagemRapida%>"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                                        <%
                                    } 
                                    %>
                                    <li><a class="denunciar_mensagem denunciar_comentario" href="javascript: void(0);"><span class="denunciar_comentario_combo FontAwesome"></span>Denunciar</a></li>
                                </ul>                            
                            </li>
                        </ul>
                        <%
                        if (item.idPagina > 0){ 
                         %>         
                            <a href="/AVA/Pagina//<%=item.strLogin%>" class=""><img class="avatar_tl" src="<%=item.strMiniFoto %>" width="55" height="55" /></a>                          
                        <%}else{ %>
                            <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" class=""><img class="avatar_tl" src="<%=item.strMiniFoto %>" width="55" height="55" /></a>             
                        <%} 
                        %>                      
                     
                        <div class="e-wrap">
                            <h1>
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
                            </h1>
                            <div class="mural_time"><%=linkCompartilhamento%><%=item.strTempoPublicacao%></div>

                        <% 
                    } 
                   else 
                    {
                        //Post educacional
                        if (bolSouComunicador) 
                        { 
                            %>
                            <ul class="combo_denunciar_excluir">
                                <li>
                                    <a href="javascript:void(0);" class="icone"></a>
                                    <ul>
                                        <li><a class="excluir_mensagem mostra_caixa confirma_excluir" href="javascript: void(0);" ident="<%:idMensagemRapida%>"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                                    </ul>                            
                                </li>
                            </ul>
                            <% 
                        } 
                        %>

                        <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class=""><img class="avatar_tl" alt="<%=dadosMensagemEducacional.strTitulo%>" src="<%=dadosMensagemEducacional.strLogo%>" width="55" height="55" /></a>
                     
                        <div class="e-wrap">
                            <h1>
                                <a href="/AVA/Pagina/<%=dadosMensagemEducacional.strLink%>" class=""><%=dadosMensagemEducacional.strTitulo%></a>
                            </h1>
                            <div class="mural_time">
                                <%=dadosMensagemEducacional.strAgendamento%>
                                <span>&bull;</span>
                                <%=dadosMensagemEducacional.strAssunto%>
                            </div>
                        </div>
                        <div class="post_espec <%=(dadosMensagemEducacional.bolBanner) ? " banner" : "" %>" <%=dadosMensagemEducacional.bolBanner ? " urlBanner=\"" + item.strLinkVideo + "\"": "" %>>
                        <% 
                    } 
                       
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
                            <p class="ctn_msg andersonMobile"><%=item.StrMensagem %></p>
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
                            <p class="ctn_msg andMobile"><%=item.StrMensagem %></p>
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
                                        <p class="ctn_msg madmobile"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
                                            <%=item.StrMensagem%>
                                        </p>
                                    <%}
                                      else
                                      { %>
                                        <img alt="" src="<%:item.strImagemPATH%>" />
                                        <strong><%:item.strTipo%></strong>
                                         <p class="ctn_msg jmobile"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
                                            <%=item.StrMensagem%>
                                        </p>
                                   <% }
                                  }
                                  else
                                  {
                                    if (strLink != "") {%><a href="<%:strLinkFinal%>"><%} %><img alt="" src="<%:item.strImagemPATH%>"> <%if (strLink != "") {%></a><%} %>
                                    <strong><%if (strLink != "") {%><a href="<%:strLinkFinal%>"><%} %><%:item.strTipo%> <%if (strLink != "") {%></a><%} %></strong>
                                    <p class="ctn_msg hardmob"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
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
                        <p class="ctn_msg tmobile"><%=strMensagemPadrao%></p>
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
                                <div class="conteudo_post">                        
                                    <p class="post_texto"><%=item.StrMensagem%></p>                                           
                                </div>
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
                        <% } 

                        //conteudo do post educacional fica dentro do post_espec
                        if(dadosMensagemEducacional != null) 
                        {  
                            %>
                            </div> 
                            <% 
                        } 
                        %>

                        <div class="acoes_mural">
                            <% 
                            if (Model.bolAcessoEscrever  || Model.bolPai || bolSouComunicador)
                            {                               
                                %>
                                <a href="javascript:void(0);" class="botaoCurtirGrupos <%=item.bolCurtiu ? " ativo" : "" %>" idMensagemRapida="<%=item.IdMensagemrapida%>"></a>
                                                                                                   
                                <div class="feedCurtir" idMensagem="<%=item.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=item.IdMensagemrapida%>">
                                    <%
                                Html.RenderPartial("Partials/ListaCurticoesMensagem", item, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado }, { "idFerramentaTipo", item.idFerramentaTipo } });
                                    %>
                                </div>
                                <%
                                if (bolPodeComentarPost && !bolUsuarioSemTurma && !Model.bolSuspenso)
                                {
                                    if (!bolAcessoEscreverBloqueado && (Model.bolEducador || Model.bolAluno || bolSouComunicador))
                                    {
                                        %>
                                        <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=item.IdMensagemrapida%>"><span class="FontAwesome"></span></a>
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
                                        <div class="comentariosMural" id="boxComentarios_<%=item.IdMensagemrapida%>">
                                            <%
                                        Html.RenderPartial("Partials/ListaComentarios", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin }, { "idFerramentaTipo", item.idFerramentaTipo }, { "souComunicadorPost", bolSouComunicador }, { "bolPodeComentarPost", bolPodeComentarPost }, { "bolUsuarioSemTurma", bolUsuarioSemTurma }, { "bolAcessoEscreverBloqueado", bolAcessoEscreverBloqueado }, { "bolPai", Model.bolPai }, { "bolSuspenso", Model.bolSuspenso }, { "bolEducador", Model.bolEducador } });
                                            %>
                                        </div> 
                                        <%  
                                            
                                        if (bolPodeComentarPost && !bolUsuarioSemTurma && !Model.bolSuspenso)
                                        {
                                            if ((!Model.bolPai || Model.bolEducador || Model.bolAluno || bolSouComunicador) && !bolAcessoEscreverBloqueado)
                                            {
                                            %>
                                            <form class="campo_comentar" id="campoComentar_<%=item.IdMensagemrapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
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
                                            <form class="campo_comentar" id="campoComentar_<%=item.IdMensagemrapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
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
                                        Html.RenderPartial("Partials/ListaComentarios", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin }, { "idFerramentaTipo", item.idFerramentaTipo }, { "souComunicadorPost", bolSouComunicador }, { "bolPodeComentarPost", bolPodeComentarPost }, { "bolUsuarioSemTurma", bolUsuarioSemTurma }, { "bolAcessoEscreverBloqueado", bolAcessoEscreverBloqueado }, { "bolPai", Model.bolPai }, { "bolSuspenso", Model.bolSuspenso }, { "bolEducador", Model.bolEducador } });
                                        %>
                                        </div>        
                                <%  }
                                }%>   

                                <% 
                            } 
                            %>
                        </div>
                    <% if(dadosMensagemEducacional == null) { //A estrutura do post educacional é diferente, o e-wrap é fechado depois de mural time %>    
                    </div><!--e-wrap-->
                    <% } %>
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
            <article class="clearfix highlight ">Não há resultados para o filtro aplicado.</article>
            <% 
        }
        else
        { //Antiga Nenhuma mensagem por enquanto. 
            %>
            <article class="clearfix highlight ">Você ainda não tem posts em seu mural.</article>
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
                <footer id="ava_footervejamais" class="blokletters">
                    <a href="javascript: void(0);" title="Veja mais" alt="Veja mais" class="vejaMais_MR">Veja mais</a>
                    <input type="hidden" id="id" value="<%=Model.idUsuario %>" />
                </footer>
                <%
            }
        }
    } 
%>
