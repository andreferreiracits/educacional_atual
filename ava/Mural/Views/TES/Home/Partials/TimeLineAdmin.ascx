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

        $(".e-wrap .ctn_msg").expander({
            slicePoint: 500,
            window: 2,
            expandText: ' leia mais',
            expandPrefix: '...',
            userCollapseText: 'menos',
            preserveWords: true,
            expandEffect: 'fadeIn',
            collapseEffect: 'fadeOut'
        });

        $(".e-wrap .iframeVideoVimeo").on('load', function () {
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
        var _this = $(this);
        var _id = _this.closest('article').attr('ide');
        $.post('/ava/Mural/Home/TodosComentariosAvinha/' + _id, {}, function (data) {
            $('#listaComentarios_' + _id).html(data);

        });
    });    
</script>

<% 
    string strEscolaAux = ViewData["strEscolaAux"].ToString();
    bool bolMobile = false;
    string uAgent = Request.UserAgent.ToLower();
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
    bool bolIpad = HttpContext.Current.Request.UserAgent.ToLower().Contains("ipad");
    if (Model.TimeLinePrivado.mensagens.Count > 0)
    {        
        %>
        <div id="paging_container1" class="container">
            
            <div class="content" style="list-style:none">
        <%
        
        foreach (var item in Model.TimeLinePrivado.mensagens)
        {
            
            int idUsuarioMsg = item.IdUsuario;
            int idMensagemRapida = item.IdMensagemrapida;
            int idUsuarioLogado = Model.idVisitante > 0 ? Model.idVisitante : Model.idUsuario;

            var linkCompartilhamento = "";
            if (item.idFerramentaTipo != 32 && item.idFerramentaTipo != 33 && item.idFerramentaTipo != 34 && item.idFerramentaTipo != 39)
                linkCompartilhamento = "<span class=\"icon_compartilhado_com\" iditem=" + item.IdMensagemrapida + "></span>";

            string strUnidadesUsuario = "";
            if (item.bolEducador)
            {
                if (item.usuarioMensagem != null)
                {
                    if (item.usuarioMensagem.strUnidade != null)
                    {
                        strUnidadesUsuario = " - " + item.usuarioMensagem.strUnidade;
                    }
                    %>
                    <div class="info_mensagens_adm" id="info_mensagens_adm_<%=idMensagemRapida%>">
                        <p><%=item.usuarioMensagem.strEscola%> <%=strUnidadesUsuario%></p>
                    </div>    
                    <%
                }
                else
                {
                    %>
                    <div class="info_mensagens_adm" id="info_mensagens_adm_<%=idMensagemRapida%>">
                        <p><%=strEscolaAux%> </p>
                    </div>    
                    <%
                }
            }
            else
            {
                if (item.usuarioMensagem != null)
                {
                    if (item.usuarioMensagem.strUnidade != null)
                    {
                        strUnidadesUsuario = item.usuarioMensagem.strUnidade + " - ";
                    }
                
                    %>
                    <div class="info_mensagens_adm">
                        <p><%=item.usuarioMensagem.strEscola%> - <%=item.usuarioMensagem.strEnsino%> - <%=strUnidadesUsuario%> <%=item.usuarioMensagem.strTurma%> - <%=item.usuarioMensagem.strSerie%></p>
                    </div>    
                    <%
                }
                else
                {
                    %>
                    <div class="info_mensagens_adm">
                        <p><%=strEscolaAux%> </p>
                    </div>    
                    <%
                }
            }    
            %>                

                <article class="clearfix <%if(item.bolEducador){%>  highlight <%} %> <%if(item.BolExcluido){%>post_excluido_adm<%} %>" id="avaMsg_<%=idMensagemRapida %>" ide="<%=idMensagemRapida%>" >
                    
                    <% 
                    if (item.BolExcluido)
                    {
                        %>
                        <p class="post_mensagem"><span></span>Post excluído.</p>
                        <%
                    }

                    if (!item.BolExcluido)
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
                    
                    <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" class=""><img class="avatar_tl" src="<%=item.strMiniFoto %>" width="55" height="55"></a>
                     
                    <div class="e-wrap">
                        <h1>
                            <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" class=""><%=item.strNome%> <%if(item.strApelido.Length > 0){%><span class="nome_apelido">(<%=item.strApelido%>)</span><%} %></a>
                            <%
                            if (item.IdUsuarioDestino > 0)
                            {
                                if (item.usuariosDestino.Count > 0)
                                {
                                    foreach (var item_u in item.usuariosDestino)
                                    {
                                        %>    
                                        <span class="mural_context">»</span> <a href="/AVA/Perfil/Home/Index/<%=item_u.strLogin%>" class=""><%=item_u.strNome%> <%if(item.strApelidoUsuarioDestino.Length > 0){%><span class="nome_apelido">(<%=item.strApelidoUsuarioDestino%>)</span><%} %></a>
                                        <%
                                    }
                                }
                            }
                            %>
                        </h1>
                        <div class="mural_time"><%=linkCompartilhamento%><%=item.strTempoPublicacao%></div>
                        <%
                        if (item.idFerramentaTipo > 1)
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
                                <p><%=item.StrMensagem %></p>
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
                                <p><%=item.StrMensagem %></p>
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
                                    <%if (strLink != "") {%>
                                        <img alt="" src="<%:item.strImagemPATH%>" />
                                        <strong><%:item.strTipo%></strong>
                                        <p class="ctn_msg"><!--a href="<%:item.strLink%>"><%:item.strTextoPadrao%></a-->
                                            <%=item.StrMensagem%>
                                        </p>
                                    <%}
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
                        else //é mensagem padrão
                        {
                            
                        %>
                            <p class="ctn_msg"><%=item.StrMensagem%></p>

                            <% 
                            
                            if(item.imagens != null && item.imagens.Count > 0){
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
                                            
                                            for (int i = 1; i < qtdMax; i++ )
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
                                            for (int i = 1; i < qtd; i++ )
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
                            
                            if (item.strLinkVideo.Length > 0)
                            {
                                string strLinkPrev = item.strLinkPreviewVideo;
                                if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
                                
                                %>
                                <a class="linkvideo" href="<%=item.strLinkVideo%>" target="_blank"><%=item.strLinkVideo%></a>

                                <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="450" height="315" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
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
                            }                          
                            %>
                            

                        <%
                        } 
                        %>
                        
                        <div class="acoes_mural">
                            
                            <% 
                            if (!item.BolExcluido)
                            {
                                %>
                                <a href="javascript:void(0);" class="botaoCurtirGrupos <%if(item.bolCurtiu){%> ativo <%} %>" idMensagemRapida="<%=item.IdMensagemrapida%>"></a>
                                <%                
                            }    
                            %>
                                    
                            <div class="feedCurtir" idMensagem="<%=item.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=item.IdMensagemrapida%>">
                                <%
                                Html.RenderPartial("Partials/ListaCurticoesMensagem", item, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado } });
                                %>
                            </div>
                            
                            <% 
                            if (!item.BolExcluido)
                            {
                                %>
                                <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=item.IdMensagemrapida%>"><span class="FontAwesome"></span></a>
                                <%                
                            }    
                            %>    
                                        
                            <div class="clearfix"></div>
                            <div class="comentariosMural" id="boxComentarios_<%=item.IdMensagemrapida%>">
                                <%
                                Html.RenderPartial("Partials/ListaComentarios", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", true }, {"adminAVA", true}, {"postExcluido", item.BolExcluido} });
                                %>
                            </div>
                            
                            <% 
                            if (!item.BolExcluido)
                            {
                                %>
                                <form class="campo_comentar" id="campoComentar_<%=item.IdMensagemrapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				                    <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="25" width="25"></a>
				                    <input placeholder="Escreva um comentário..." idMensagemRapida="<%=item.IdMensagemrapida%>" class="inputComentario" name="strComentario" autocomplete="off" ident="<%=item.IdMensagemrapida%>" type="text" />
			                    </form>
                                <%                
                            }    
                            %>      
                        </div>
                        
                    </div><!--e-wrap-->
                </article>
            <%                
    
        }//foreach de mensagens
        %>
        </div>
               
        </div>  
        <%
    }
    else //não tem mensagens
    {
        %>
        <article class="clearfix highlight ">Nenhuma mensagem por enquanto.</article>
        <%
    }
    %>
   
    
