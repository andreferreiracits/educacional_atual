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
    linkCompartilhamento = "<span class=\"compartilhado\" iditem=" + idMensagemRapida + "></span>";

%>

<script>



</script>

<article class="postagem <%=(Model.bolEducador ? "entidade" : "")%>" id="avaMsg_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>">
    <div class="bloco post bl_1">

        <header class="header_post">
            <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" class="post_perfil"><img class="" src="<%=Model.strMiniFoto %>" /></a>

            <h3 class="post_nome_usuario">
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
            </h3>
            <div class="post_horario">
                <%=linkCompartilhamento%>
                <%
                    var dataPost = Model.strTempoPublicacao;
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
                %>
            </div>

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
        </header>
        <div class="conteudo_post conteudo<%=Model.IdMensagemrapida%>" id="conteudo<%=Model.IdMensagemrapida%>">
            <p class="post_texto"><%=Model.StrMensagem%></p>
            <%
            if(Model.imagens != null && Model.imagens.Count > 0) {
                int qtd = Model.imagens.Count;
                int qtdMax = 3;
                %>
                <div class="post_imagem imagens_mural <%=(qtd >= qtdMax ? "galeria" : (qtd == 2 ? "two-img" : "one-img"))%>">
                <%
                    string imgPath = null;
                    for (int i = 0; i < qtd; i++)
                    {
                        imgPath = Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao;
                        %>
                        <a id="<%=(i == 0 ? "imagem_" + Model.IdMensagemrapida : "")%>" data-width="<%=Model.imagens[i].arquivo.largura %>"
                            data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="img_post"
                            rel="galeria_mural_<%=Model.IdMensagemrapida %>" href="<%=imgPath%>" data-nomearquivo="<%=Model.imagens[0].arquivo.strNome %>"
                            title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>"
                            data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"
                            <%=(qtd > 1 ? "style=\" background-image: url(" + imgPath + ");" + (i > 2 ? " display: none;" : "") + "\"" : "")%>>
                            
                                <%=(qtd == 1 ? "<img src=" + imgPath + ">" : "")%>
                        </a>
                        <%
                    }
                %>
                </div>
                <%
                if (qtd > qtdMax)
                {
                %>
                <span class="leia_mais">
					<a href="javascript:void(0);" class="btn_mais" onclick="$('#imagem_<%=Model.IdMensagemrapida %>').click();"><%=qtd%> imagens - Ver todas</a>
				</span>
                <%
                }
            }
             
            if (Model.strLinkVideo.Length > 0)
            {
                string strLinkPrev = Model.strLinkPreviewVideo;
                if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
            
                %>
                <a class="post_link" href="<%=Model.strLinkVideo%>" target="_blank"><%=Model.strLinkVideo%></a>

                <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="100%" height="360" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
                <%  
            }
        
            if (Model.arquivos != null && Model.arquivos.Count > 0)
            {
                int qtd = Model.arquivos.Count;
                for (int i = 0; i < (qtd > 3 ? 3 : qtd); i++)
                {
                    %>
                    <div class="prev_documento">
                        <div class="bloco_arq">
                            <div class="tipo_arquivo">
                                <span><%=Model.arquivos[i].arquivo.strExtensao %></span>
                            </div>    
                            <p class="nome_arquivo"><%=Model.arquivos[i].arquivo.strNome %></p>
                        </div>
                        <%
                        if (bolMobile)
                        {
                            %>
                            <a target="_blank" href="<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
                            <%
                        }
                        else
                        {
                            %>
                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
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
                        <div class="bloco_arq">
                            <div class="tipo_arquivo">
                                <span><%=Model.arquivos[i].arquivo.strExtensao %></span>
                            </div>    
                            <p class="nome_arquivo"><%=Model.arquivos[i].arquivo.strNome %></p>
                        </div>
                        <%
                        if (bolMobile)
                        {
                            %>
                            <a target="_blank" href="<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
                            <%
                        }
                        else
                        {
                            %>
                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>" class="btn_acao opcao_download">Download</a>
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
            %>
            </div>

            <section class="modulos_extras_edit" id="modulos_extras<%=Model.IdMensagemrapida %>" style="display: none">
                                                            
                <!-- Ações de finalização de nova postagem -->
                <div class="dialogo_acoes" id="dialogo_acoes" style="">
                    <div class="btn_acoes right">
                        <input type="button" name="cancelar" id="btnCancelarEdit<%=Model.IdMensagemrapida %>" value="Cancelar" class="" style="display: inline-block;"> 
                        <input type="button" name="compartilhar" id="EditPost<%=Model.IdMensagemrapida %>" value="Compartilhar" class="compartilhar" style="display: inline-block;">
                        <input type="button" name="agendar" id="agendar" value="Agendar" class="agendar" style="display:none;">
                        
                    </div>

                    <!-- Feedback -->
                    <p style="display:none;" id="feed_erro" class="feed_erro">Você precisa adicionar participantes</p>

                </div>
                    
            </section>
            
            <div class="post_acoes">
                <div class="acao_curtir">
                    <a href="javascript:void(0);" onclick="curtirPostagem(this); return false;" class="btn <%=Model.bolCurtiu ? " ativo" : "" %>" idMensagemRapida="<%=Model.IdMensagemrapida%>"></a>
                    <div class="feed" idMensagem="<%=Model.IdMensagemrapida%>" id="boxCurticoesMensagem_<%=Model.IdMensagemrapida%>">
                        <%
                    Html.RenderPartial("Partials/ListaCurticoesMensagemNovaHome", Model, new ViewDataDictionary { { "idUsuarioLogado", Model.IdUsuario }, { "idFerramentaTipo", Model.idFerramentaTipo } });
                        %>
                    </div>
                </div>
                <div class="acao_comentar">
                    <a id="verMensagens_<%=Model.IdMensagemrapida%>" href="" onclick="exibeComentarios(this); return false;" class="btn botaoComentar" idMensagemRapida="<%=Model.IdMensagemrapida%>">
                        <span class="FontAwesome" />
                    </a>
                </div>

            </div>
    </div>
    <div class="bloco comentarios bl_1" id="boxComentarios_<%=Model.IdMensagemrapida%>" style="display: none;">
        <div class="clearfix"></div>
        <form class="post_form" id="campoComentar_<%=Model.IdMensagemrapida%>" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;" style="display: none;" 
            <% 
            if(Model.totalComentarios> 0) {
                Response.Write("style='width: 100%; margin-top: 10px;'");
            }
            else {
                Response.Write("style='display: none; width: 100%; margin-top: 10px;'");
            }
            %>
            >
            <input placeholder="Escreva um comentário..." idMensagemRapida="<%=Model.IdMensagemrapida%>" name="strComentario" autocomplete="off" ident="<%=Model.IdMensagemrapida%>" type="text" onblur="comentarioInputBlur(this); return false;" onkeypress="submeteComentario(this, event)" />
        </form>
    </div>
</article>
