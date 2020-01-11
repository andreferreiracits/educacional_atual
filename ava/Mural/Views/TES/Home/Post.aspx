<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Site.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Mural.Models.MensagemRapidaUsuario>" %>


<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">
    
    <script src="/AVA/StaticContent/Common/Scripts/timeline_3.2.0.js<%=Url.TimeStampLink() %>" type="text/javascript"></script>       
    <script type="text/javascript">
        $(function () {
            $(".imagens_mural").GaleriaAva();
            $('.icon_compartilhado_com').booleTip(booleTipOptions);
        });
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server"> 

<%
bool bolAdmin = false;
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

bool bolAcessoEscreverBloqueado = Convert.ToBoolean(ViewData["bolSegmentacaoBloqueadaAVA"]);
bool bolAluno = false;
bolAluno = Convert.ToBoolean(ViewData["bolAluno"]);
bool bolPossuoAvaliacao = false;
bolPossuoAvaliacao = Convert.ToBoolean(ViewData["possuoAvaliacao"]);
bool bolPai = false;
bolPai = Convert.ToBoolean(ViewData["bolPai"]);
var linkCompartilhamento = "";
if (Model.idFerramentaTipo != 32 && Model.idFerramentaTipo != 33 && Model.idFerramentaTipo != 34 && Model.idFerramentaTipo != 39)
    linkCompartilhamento = "<span class=\"icon_compartilhado_com\" iditem=" + Model.IdMensagemrapida + "></span>";

%>

    <section class="hs1">
		
        <section class="timeline">
            <header>
                <h1 class="komika"><span class="icon_li mural"></span>MURAL</h1>
            </header>        
            <div id="ava_fluxoarticles">
                
                <%
                int idMensagemRapida = Model.IdMensagemrapida;
                int idUsuarioMsg = Model.IdUsuario;
                bool bolExcluido = Model.BolExcluido;
                int idUsuario = Convert.ToInt32(ViewData["idUsuario"]);
                int idVisitante = Convert.ToInt32(ViewData["idVisitante"]);
                int idUsuarioLogado = idVisitante > 0 ? idVisitante : idUsuario;
                var strFotoVisitante = ViewData["strMiniFoto"];
                %>  
                <article class="clearfix <%if(Model.bolEducador){%>  highlight <%} %>" id="avaMsg_<%=idMensagemRapida %>" ide="<%=idMensagemRapida%>" >
                    <% 
                    if (bolExcluido)
                    {
                        Response.Write("Esta mensagem foi excluída.");
                    }
                    else
                    {
                        %>
                        <ul class="combo_denunciar_excluir">
                            <li>
                                <a href="javascript:void(0);" class="icone"></a>
                                <ul>
                                    <li><a class="denunciar_mensagem denunciar_comentario" href="javascript: void(0);"><span class="denunciar_comentario_combo FontAwesome"></span>Denunciar</a></li>
                                    <% if (bolAdmin || (idUsuarioLogado == Model.IdUsuario)) { %>
                                        <li><a class="excluir_mensagem mostra_caixa confirma_excluir" href="javascript: void(0);" ident="<%:idMensagemRapida%>"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                                    <% } %>
                                </ul>                            
                            </li>
                        </ul>

                        <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" class=""><img class="avatar_tl" src="<%=Model.strMiniFoto %>" width="55" height="55"></a>

                        <div class="e-wrap">
                            <h1>
                                <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" class=""><%=Model.strNome%></a>
                                <%
                                if (Model.IdUsuarioDestino > 0)
                                {
                                    if (Model.usuariosDestino.Count > 0)
                                    {
                                        foreach (var Model_u in Model.usuariosDestino)
                                        {
                                            %>    
                                            <span class="mural_context">»</span> <a href="/AVA/Perfil/Home/Index/<%=Model_u.strLogin%>" class=""><%=Model_u.strNome%></a>
                                            <%
                                        }
                                    }
                                }
                                %>
                            </h1>
                            <div class="mural_time"><%=linkCompartilhamento%><%=Model.strTempoPublicacao%></div>
                            <%
                            if (Model.idFerramentaTipo > 1)
                            {
                                var strLink = "";
                                if (Model.strLink != null)
                                {
                                    strLink = Model.strLink;
                                }

                                string strLinkFinal = strLink.Replace("#id#", "" + Model.IdFerramenta.ToString() + "");

                                if (Model.idFerramentaTipo == 17 || Model.idFerramentaTipo == 18 || Model.idFerramentaTipo == 14 || Model.idFerramentaTipo == 15)
                                {   
                                    strLinkFinal = strLink.Replace("#idAgendamento#", "" + Model.IdFerramenta + "").Replace("#idEtapa#", "" + Model.IdAuxiliar1 + "");                                  
                                }

                                if (Model.idFerramentaTipo == 34)//convite
                                {
                                    %>
                                    <p class="ctn_msg"><%=Model.StrMensagem %></p>
                                    <div class="previ_convite_mural">
                                        <img class="fundo_convite" src="<%=Model.strFotoGrupo%>" height="800" width="800" />
                                        <img class="img_convite" src="<%=Model.strFotoGrupo%>" width="67" height="67"/>
                                        <div>
                                            <p class="inscricao_grupo">Convite para um grupo</p>
                                            <a href="/AVA/Grupo/Home/PerfilGrupo/<%=Model.strLinkGrupo%>" class="nome_grupo_mural"><%=Model.strNomeGrupo%></a>
                                            <div id="btnAceitarRecusar_<%=Model.IdGrupo%>_<%=Model.IdMensagemrapida%>">
                                                <% 
                                                if (Model.bolConviteExcluidoGrupo)
                                                    {
                                                        %>
                                                        <p class="convite_cancelado">Convite cancelado.</p>    
                                                        <% 
                                                    }
                                                else if (Model.bolRecusouConviteGrupo)
                                                {
                                                    %>
                                                    <p class="convite_cancelado">Você recusou o convite para esse grupo.</p>    
                                                    <%  
                                                }
                                                else if (Model.bolAceitouConviteGrupo)
                                                {
                                                    %>
                                                    <a class="btn_cinza" href="/AVA/Grupo/Home/PerfilGrupo/<%=Model.strLinkGrupo%>">Visualizar</a>    
                                                    <%
                                                }
                                                else
                                                {
                                                    %>
                                                    <a class="btn_cinza" href="javascript:void(0);" onclick="aceitarConviteGrupo(<%=Model.IdGrupo%>, <%=Model.IdAuxiliar1%>, <%=Model.IdMensagemrapida%>)">Participar</a>
                                                    <a class="btn_cinza" href="javascript:void(0);" onclick="recusarConviteGrupo(<%=Model.IdGrupo%>, <%=Model.IdAuxiliar1%>, <%=Model.IdMensagemrapida%>)">Não, obrigado(a)</a>
                                                    <%  
                                                }
                                                %>
                                            </div>
                                        </div>  
                                    </div>  
                                    <%
                                }
                                else if (Model.idFerramentaTipo == 33)//inscrição obrigatória
                                {
                                    %>
                                    <p class="ctn_msg"><%=Model.StrMensagem %></p>
                                    <div class="previ_convite_mural">
                                        <img class="fundo_convite" src="<%=Model.strFotoGrupo%>" height="800" width="800" />
                                        <img class="img_convite" src="<%=Model.strFotoGrupo%>" width="67" height="67"/>
                                        <div>
                                            <p class="inscricao_grupo">Inscrição no grupo</p>
                                            <a href="/AVA/Grupo/Home/PerfilGrupo/<%=Model.strLinkGrupo%>" class="nome_grupo_mural"><%=Model.strNomeGrupo%></a>
                                            <div id="btnAceitarRecusar_<%=Model.IdGrupo%>">
                                                <a class="btn_cinza" href="/AVA/Grupo/Home/PerfilGrupo/<%=Model.strLinkGrupo%>">Visualizar</a>
                                            </div>
                                        </div>  
                                    </div> 
                                    <%
                                }
                                else
                                {
                                %>
                                <div class="embrulho">
                                <%if (Model.idFerramentaTipo == 25)
                                  { %>
                                    <%if (strLink != "" && bolAluno || (bolPai || Model.bolEducador) && bolPossuoAvaliacao && Model.IdUsuarioDestino == idUsuarioLogado)
                                      {%>
                                        <a href="javascript:void(0);" onclick="ViewRealizacaoProva(<%=Model.IdFerramenta %>);return false;" >
                                        <img alt="" src="<%:Model.strImagemPATH%>"></a>
                                        <strong><a href="javascript:void(0);" onclick="ViewRealizacaoProva(<%=Model.IdFerramenta %>);return false;">
                                        <%:Model.strTipo%></a></strong>
                                        <p class="ctn_msg"><!--a href="<%:Model.strLink%>"><%:Model.strTextoPadrao%></a-->
                                            <%=Model.StrMensagem%>
                                        </p>
                                    <%}
                                      else
                                      { %>
                                        <img alt="" src="<%:Model.strImagemPATH%>" />
                                        <strong><%:Model.strTipo%></strong>
                                        <p class="ctn_msg"><!--a href="<%:Model.strLink%>"><%:Model.strTextoPadrao%></a-->
                                            <%=Model.StrMensagem%>
                                        </p>
                                      <%}
                                  }
                                  else
                                  {
                                    if (strLink != "") {%><a href="<%:strLinkFinal%>"><%} %><img alt="" src="<%:Model.strImagemPATH%>"> <%if (strLink != "") {%></a><%} %>
                                    <strong><%if (strLink != "") {%><a href="<%:strLinkFinal%>"><%} %><%:Model.strTipo%> <%if (strLink != "") {%></a><%} %></strong>
                                    <p class="ctn_msg"><!--a href="<%:Model.strLink%>"><%:Model.strTextoPadrao%></a-->
                                        <%=Model.StrMensagem%>
                                    </p>
                                <%} %>
                                </div>
                            <%
                                }
                            }
                            else //é mensagem padrão
                            {
                            %>
                                <p class="ctn_msg"><%=Model.StrMensagem%></p>

                                <%
                                if (Model.imagens != null && Model.imagens.Count > 0)
                                {
                                    int qtd = Model.imagens.Count;
                                    int qtdMax = 3;
                                    
                                %>

                                <div class="imagens_mural">
                                    <a data-width="<%=Model.imagens[0].arquivo.largura %>" data-height="<%=Model.imagens[0].arquivo.altura %>" data-idarquivo="<%=Model.imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemrapida %>" href="<%=Model.imagens[0].arquivo.strDiretorio + "/" + Model.imagens[0].arquivo.strArquivo + Model.imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=Model.imagens[0].arquivo.strNome %>" title="<%=Model.imagens[0].arquivo.strNome == null || Model.imagens[0].arquivo.strNome == "" ? "Insira um título" : Model.imagens[0].arquivo.strNome %>" data-posicao="<%=Model.imagens[0].intOrdem %>" data-descricao="<%=Model.imagens[0].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=Model.imagens[0].arquivo.strDiretorio + "/" + Model.imagens[0].arquivo.strArquivo + Model.imagens[0].arquivo.strExtensao %>"></a>
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
                                                    //Response.Write("> " + Model.imagens[i].arquivo.strDescricao + " - " + Model.imagens[i].arquivo.idArquivo);
                                                    %>
                                                    <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemrapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                                    <%
                                            }

                                            for (int i = qtdMax; i < qtd; i++)
                                            {
                                                    %>
                                                    <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" style="display: none;" rel="galeria_mural_<%=Model.IdMensagemrapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                                    <%
                                            }
                                        }
                                        else
                                        {
                                            for (int i = 1; i < qtd; i++)
                                            {
                                                    //Response.Write("> " + Model.imagens[i].arquivo.strDescricao + " - " + Model.imagens[i].arquivo.idArquivo);
                                                    %>
                                                    <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemrapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
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
                                            <a data-width="<%=Model.imagens[1].arquivo.largura %>" data-height="<%=Model.imagens[1].arquivo.altura %>" data-idarquivo="<%=Model.imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemrapida %>" href="<%=Model.imagens[1].arquivo.strDiretorio + "/" + Model.imagens[1].arquivo.strArquivo + Model.imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=Model.imagens[1].arquivo.strNome %>" title="<%=Model.imagens[1].arquivo.strNome == null || Model.imagens[1].arquivo.strNome == "" ? "Insira um título" : Model.imagens[1].arquivo.strNome %>" data-posicao="<%=Model.imagens[1].intOrdem %>" data-descricao="<%=Model.imagens[1].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=Model.imagens[1].arquivo.strDiretorio + "/" + Model.imagens[1].arquivo.strArquivo + Model.imagens[1].arquivo.strExtensao %>"></a>
                                            <%
                                    }
                                    %>
                                
                                    </div>
                            <%
                                }//fecha if imagens
                                 if (Model.strLinkVideo.Length > 0)
                                {
                                    string strLinkPrev = Model.strLinkPreviewVideo;
                                    if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
                                     
                                    %>
                                    <a class="linkvideo" href="<%=Model.strLinkVideo%>" target="_blank"><%=Model.strLinkVideo%></a>

                                    <iframe <%=strLinkPrev.Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="450" height="315" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
                                    <%  
                                }
                                if (Model.arquivos != null && Model.arquivos.Count > 0)
                                {
                                    int qtd = Model.arquivos.Count;
                                    for (int i = 0; i < (qtd > 3 ? 3 : qtd); i++)
                                    {
                                        %>
                                        <div class="prev_documento">
                                            <div class="tipo_arquivo">
                                                <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                                                <span><%=Model.arquivos[i].arquivo.strExtensao %></span>
                                            </div>    
                                            <p><%=Model.arquivos[i].arquivo.strNome %></p>
                                            <%
                                        if (bolMobile)
                                        {
                                            %>
                                            <a target="_blank" href="<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                            %>
                                            
                                        </div>
                                        <%
                                    }
                                
                                    if (Model.arquivos.Count > 3)
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
                                                <span><%=Model.arquivos[i].arquivo.strExtensao %></span>
                                            </div>    
                                            <p><%=Model.arquivos[i].arquivo.strNome %></p>
                                            <%
                                        if (bolMobile)
                                        {
                                            %>
                                            <a target="_blank" href="<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
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
                      
                            } 
                            %>
                        
                            <div class="acoes_mural">
                                <% 
                                if (Convert.ToBoolean(ViewData["bolAcessoEscrever"])  || bolPai )
                                {                               
                                    %>
                                    <a href="javascript:void(0);" class="botaoCurtirGrupos <%if(Model.bolCurtiu){%> ativo <%} %>" idMensagemRapida="<%=Model.IdMensagemrapida%>"></a>
                                                                
                                    <div class="feedCurtir" idMensagem="<%=Model.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=Model.IdMensagemrapida%>">
                                        <%
                                        Html.RenderPartial("Partials/ListaCurticoesMensagem", Model, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado } });
                                        %>
                                    </div>                                    
                                    <%
                                    if ((Convert.ToBoolean(ViewData["bolAcessoEscrever"]) && !Convert.ToBoolean(ViewData["bolSuspensao"])))
                                    {

                                        if ((Convert.ToInt32(ViewData["intComunicacaoPermissao"]) == 1 || Convert.ToInt32(ViewData["intComunicacaoPermissao"]) == 2) && !bolAcessoEscreverBloqueado)
                                        {
                                        %>
                                        <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=Model.IdMensagemrapida%>"><span class="FontAwesome"></span></a>
                                    <% } %>
                                    <div class="clearfix"></div>
                                    <div class="comentariosMural" id="boxComentarios_<%=Model.IdMensagemrapida%>">
                                        <%
                                        Html.RenderPartial("Partials/ListaComentarios", Model.comentarios, new ViewDataDictionary { { "totalComentarios", Model.totalComentarios }, { "idMensagemRapida", Model.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin } });
                                        %>
                                    </div>
                                     <% if ((Convert.ToInt32(ViewData["intComunicacaoPermissao"]) == 1 || Convert.ToInt32(ViewData["intComunicacaoPermissao"]) == 2) && !bolAcessoEscreverBloqueado)
                                        { %>   
                                        <form class="campo_comentar" id="campoComentar_<%=Model.IdMensagemrapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				                            <a href="/AVA/Perfil/Home/Index/<%=idVisitante%>"><img src="<%=strFotoVisitante%>" height="25" width="25"></a>
				                            <input idmensagemrapida="<%=Model.IdMensagemrapida%>" class="inputComentario" placeholder="Escreva um comentário..." id="strComentario" name="strComentario" autocomplete="off" ident="<%=Model.IdMensagemrapida%>" type="text" />
			                            </form>
                                        <% 
                                        
                                        }
                                    }
                                } 
                                %>
                            </div>
                        
                        </div><!--e-wrap-->                
                    <%
                    } 
                    %> 
                </article>

            </div>
        </section>
   
	</section>
</asp:Content>
