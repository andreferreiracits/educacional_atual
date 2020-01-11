<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaUsuario>" %>

<% 
int idMensagemRapida = Model.IdMensagemrapida;
bool bolIpad = HttpContext.Current.Request.UserAgent.ToLower().Contains("ipad");
bool bolMobile = false;
string uAgent = Request.UserAgent.ToLower();
if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
{
    bolMobile = true;
}

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
                    
    <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" class=""><img class="avatar_tl" src="<%=Model.strMiniFoto %>" width="55" height="55"></a>
                     
    <div class="e-wrap">
        <!---->
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
        <p class="ctn_msg"><%=Model.StrMensagem%></p>

        <%
        
        if(Model.imagens != null && Model.imagens.Count > 0){
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
                                            
                        for (int i = 1; i < qtdMax; i++ )
                        {
                            //Response.Write("> " + item.imagens[i].arquivo.strDescricao + " - " + item.imagens[i].arquivo.idArquivo);
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
                        for (int i = 1; i < qtd; i++ )
                        {
                            //Response.Write("> " + item.imagens[i].arquivo.strDescricao + " - " + item.imagens[i].arquivo.idArquivo);
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
        }
             
        if (Model.strLinkVideo.Length > 0)
        {
            string strLinkPrev = Model.strLinkPreviewVideo;
            if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
            
            %>
            <a class="linkvideo" href="<%=Model.strLinkVideo%>" target="_blank"><%=Model.strLinkVideo%></a>

            <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="450" height="315" src="//<%=strLinkPrev%>" frameborder="0" allowfullscreen></iframe>
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
        %>
                   
        <div class="acoes_mural">
            
            <a href="javascript:void(0);" class="botaoCurtirGrupos <%if(Model.bolCurtiu){%> ativo <%} %>" idMensagemRapida="<%=Model.IdMensagemrapida%>"></a>
                                                                
            <div class="feedCurtir" idMensagem="<%=Model.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=Model.IdMensagemrapida%>">
                    
            </div>
                
            <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=Model.IdMensagemrapida%>"><span class="FontAwesome"></span></a>
                                    
            <div class="comentariosMural" id="boxComentarios_<%=Model.IdMensagemrapida%>">
                        
            </div>

            <form class="campo_comentar" id="campoComentar_<%=Model.IdMensagemrapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				<a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="25" width="25"></a>
				<input placeholder="Escreva um comentário..." idMensagemRapida="<%=Model.IdMensagemrapida%>" class="inputComentario" name="strComentario" autocomplete="off" ident="<%=Model.IdMensagemrapida%>" type="text" />
            </form>
              
        </div>
                        
    </div><!--e-wrap-->
</article>
