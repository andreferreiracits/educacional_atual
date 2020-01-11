<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Perfil.Models.MainPerfilPrivado>" %>

<%
    string uAgent = Request.UserAgent.ToLower();
    bool bolMobile = false;
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
    
%>

<input type="hidden" id="strNomeLogado" value="<%:Model.strNome%>" />
<input type="hidden" id="strMiniFotoLogado" value="<%:Model.strMiniFoto%>" />
<input type="hidden" id="strLoginLogado" value="<%:Model.strLogin%>" />
<input type="hidden" id="strEmailLogado" value="<%:Model.strEmail%>" />
<input type="hidden" id="strURLCorrente" value="<%:HttpContext.Current.Request.Url.AbsoluteUri%>" />

<script type="text/javascript">
$(function () {

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

    $('.icon_compartilhado_com').booleTip(booleTipOptions);
});
</script>

<%
bool bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
bool bolIpad = HttpContext.Current.Request.UserAgent.ToLower().Contains("ipad");

bool bolUsuarioSemTurma = Convert.ToBoolean(Session["bolUsuarioSemTurma"]);

if (Model.TimeLinePrivado.mensagens.Count > 0)
{
    bool bolAcessoEscreverBloqueado = false;

    if (Model.segmentacaoBloqueio != null)
    {
        bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
    }
    
    bool bolPodeComentar = ((Model.intComunicacaoPermissao == 1 || Model.intComunicacaoPermissao == 2) && !bolAcessoEscreverBloqueado);
    
    foreach (var item in Model.TimeLinePrivado.mensagens)
    {

        int idUsuarioMsg = item.IdUsuario;
        int idMensagemRapida = item.IdMensagemrapida;
        int idUsuarioLogado = Model.idVisitante > 0 ? Model.idVisitante : Model.idUsuario;

        var linkCompartilhamento = "";
        if (item.idFerramentaTipo != 32 && item.idFerramentaTipo != 33 && item.idFerramentaTipo != 34 && item.idFerramentaTipo != 39)
            linkCompartilhamento = "<span class=\"icon_compartilhado_com\" iditem=" + item.IdMensagemrapida + "></span>";
    
        %>
        <article class="clearfix <%if(item.bolEducador){%>  highlight <%} %>" id="avaMsg_<%=idMensagemRapida %>" ide="<%=idMensagemRapida%>">
                  

            

            <ul class="combo_denunciar_excluir">
                <li>
                    <a href="javascript:void(0);" class="icone"></a>
                    <ul>
                        <%
                        if (idUsuarioLogado == idUsuarioMsg || bolAdmin)
                        { 
                            %>
                            <li><a class="excluir_mensagem mostra_caixa confirma_excluir" href="javascript: void(0)" ident="<%:idMensagemRapida%>"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                            <%
                        } 
                        %>
                        <li><a class="denunciar_mensagem denunciar_comentario" href="javascript: void(0);"><span class="denunciar_comentario_combo FontAwesome"></span>Denunciar</a></li>
                    </ul>                            
                </li>
            </ul>      
            
            <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" title="" alt=""  class=""><img class="avatar_tl" src="<%=item.strMiniFoto %>" width="55" height="55"></a>
                     
            <div class="e-wrap">
                <h1>
                    <a href="/AVA/Perfil/Home/Index/<%=item.strLogin%>" class=""><%=item.strNome%></a>
                    <%
                    if (item.IdUsuarioDestino > 0)
                    {
                        %>    
                        <span class="mural_context">»</span> <a href="/AVA/Perfil/Home/Index/<%:item.strLoginUsuarioDestino%>" class=""><%:item.strNomeUsuarioDestino%></a>
                        <%
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
      
                    %>
                    <div class="embrulho">
                        <%if (strLink != "")
                        {%><a href="<%=strLinkFinal%>"><%} %><img alt="" src="<%:item.strImagemPATH%>"><%if (strLink != "")
                                                                                                                                                                                            {%></a><%} %>
                    <strong>
                        <%if (strLink != "")
                        {%><a href="<%=strLinkFinal%>"><%} %><%:item.strTipo%><%if (strLink != "")
                        {%></a><%} %>
                    </strong>
                        
                    <p class="ctn_msg">
                        <%=item.StrMensagem%>
                    </p>
                </div> 
                <%
                }
                else
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

                        <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="450" height="315" src="//<%=strLinkPrev%>" frameborder="0" allowfullscreen></iframe>
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
                }
                %>
                
                

                

                <div class="acoes_mural">

                
                    <%                     
                    if ((Model.bolAcessoEscrever && !Model.bolSuspenso) || Model.bolVisitantePai)
                    {                        
                        %>
                        <a href="javascript:void(0);" class="botaoCurtirGrupos <%if(item.bolCurtiu){%> ativo <%} %>" idMensagemRapida="<%=item.IdMensagemrapida%>"></a>
                                                                
                        <div class="feedCurtir" idMensagem="<%=item.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=item.IdMensagemrapida%>">
                            <%
                            Html.RenderPartial("Partials/ListaCurticoesMensagem", item, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado } });
                            %>
                        </div>
                        <%
                        if (bolPodeComentar && !bolUsuarioSemTurma)
                        {
                            if (!Model.bolVisitantePai || Model.bolVisitanteEducador || Model.bolVisitanteAluno)
                            {
                                %>
                                <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=item.IdMensagemrapida%>"><span class="FontAwesome"></span></a>
                                <% 
                            }
                        }              
                        %>
                        <div class="clearfix"></div>
                        <div class="comentariosMural" id="boxComentarios_<%=item.IdMensagemrapida%>">
                            <%
                        Html.RenderPartial("Partials/ListaComentarios", item.comentarios, new ViewDataDictionary { { "totalComentarios", item.totalComentarios }, { "idMensagemRapida", item.IdMensagemrapida }, { "idUsuarioLogado", idUsuarioLogado }, { "admRede", bolAdmin } });
                            %>
                        </div>

                        <% 
                        if (bolPodeComentar && !bolUsuarioSemTurma)
                        {    
                            if (!Model.bolVisitantePai || Model.bolVisitanteEducador || Model.bolVisitanteAluno)
                            {
                                %>
                                <form class="campo_comentar" id="campoComentar_<%=item.IdMensagemrapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				                    <a href="/AVA/Perfil/Home/Index/<%= Model.strLogin%>"><img src="<%=Model.strMiniFotoVisitante%>" height="25" width="25"></a>
				                    <input placeholder="Escreva um comentário..." idMensagemRapida="<%=item.IdMensagemrapida%>" class="inputComentario" name="strComentario" autocomplete="off" ident="<%=item.IdMensagemrapida%>" type="text" />
			                    </form>
                                <%        
                            }
                        }
                        
                    } 
                    %>
                </div>            
            

            </div>
        </article>
        <%    
    }//foreach 

    //Se tiver menos de 10 esconde o veja mais
    if (Model.TimeLinePrivado.mensagens.Count < 10)
    {
        %>
        <input type="hidden" value="poucasMsgsRapidas" />
        <%
    }
}
else
{
    if (Model.idUsuario == Model.idVisitante || Model.idVisitante == 0)
    {
        %>
        <article class="clearfix highlight ">Você ainda não tem posts em seu mural.</article>
        <%
    }
    else
    {
        %>
        <article class="clearfix highlight ">Não há mensagens a serem exibidas.</article>    
        <%    
    }
    %>
    <input type="hidden" value="semMsgsRapidas" />
<%
}
%>

<%
if(Model.TimeLinePrivado.mensagens.Count == 10) { 
%>
<footer id="ava_footervejamais" class="blokletters">   
    <a href="#" title="Veja mais" alt="Veja mais" class="vejaMais_MR">Veja mais</a>
    <input type="hidden" id="id" value="<%=Model.idUsuario %>" />
</footer>
<%
} 
%>
