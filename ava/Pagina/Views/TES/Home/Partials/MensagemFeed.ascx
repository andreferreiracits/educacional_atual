<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pagina.Models.MensagemRapida>" %>
<%
if(Model == null)
{
    Response.Write("0");
}    
else
{
    Pagina.Models.PaginaEducacional objPagina = ViewData["objPagina"] == null ? null : (Pagina.Models.PaginaEducacional)ViewData["objPagina"];
    
    var bolMobile = false;
    string uAgent = Request.UserAgent.ToLower();
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }

    var bolSegmentoBloqueado = (bool)ViewData["bolSegmentoBloqueado"];
    var segBloqueio = bolSegmentoBloqueado ? (UsuarioAVA.Models.SegmentacaoBloqueio)ViewData["objSegmentoBloqueado"] : null;

    var bolPodeComentar = (bool)ViewData["bolPodeComentar"];
    
    var objUsuario = (UsuarioAVA.Models.Usuario)ViewData["objUsuario"];
    
    //Adicionar bloqueio de segmentação e suspenso
    if (bolPodeComentar && !Model.BolComentar)
        bolPodeComentar = false;

    var bolPossuiComentarios = false;
    if (Model.Comentarios != null)
        bolPossuiComentarios = Model.Comentarios.Count > 0;

    bool bolAdministra = false;

    if (Model.IdPagina == 2)
    {
        bolAdministra = Model.BolTutorProjetos;
    }
    else
    {
        bolAdministra = Model.BolComunicador;        
    }

    var StrMensagem = Model.StrMensagem;
    if (Model.BolBanner && !Model.BolPreview)
    {
        StrMensagem = "<a href=\"" + Model.StrLinkVideo + "\" target=\"_blank\">" + StrMensagem + "</a>";
    }                     
%>
<article class="clearfix <%=Model.BolPreview ? "paginas_visualizar" : ""%> <%=Model.BolPreview && Model.BolDestaque ? "left" : "" %>" ide="<%=Model.IdMensagemRapida%>">
    <% 
    if (bolAdministra && !Model.BolPreview)
    { //somente o comunicador da pagina pode excluir %>
	<ul class="combo_denunciar_excluir">
		<li>
		    <a class="icone" href="javascript:void(0);"></a>
		    <ul>
                <span class="seta_cima"></span>
		        <li><a class="mostra_caixa confirma_excluir" href="#confirma_excluir"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                <% if(Model.BolAgendado) { %>
                    <li><a class="mostra_caixa editarMensagemRapida" href="javascript:void(0);"><span class="editar_comentario_combo fontello"></span>Editar</a></li>
                <% } %>
                <% if (Model.IdPagina > 2 && !String.IsNullOrEmpty(Model.StrMensagem) || Model.IdPagina == 1 )
                   {
                       if(Model.BolDestaque) { %>
                        <li><a class="mostra_caixa removerDestaqueMensagemRapida" href="javascript:void(0);"><span class="desfixar_comentario_combo fontello"></span>Remover destaque</a></li>
                    <% } else { %>
                        <li><a class="mostra_caixa adicionarDestaqueMensagemRapida" href="javascript:void(0);"><span class="fixar_comentario_combo fontello"></span>Destacar</a></li>
                    <% } 
                }%>
		    </ul>
		    <span class="excluir_conf">
		        <span class="seta_top"></span>
		        <p>Deseja realmente excluir?</p>
		        <a class="cancelar left" href="javascript:void(0);">Cancelar</a>
		        <a class="btn_cor excluir right" href="javascript:void(0);">Excluir</a>
		    </span>
		</li>
	</ul>
    <% } %>
    <% if(Model.BolDestaque && !Model.BolPreview) { %>
        <span class="post_fixo fontello" title="Post destacado"></span>
    <% } %>
	<a href="<%=objPagina != null ? "/AVA/Pagina/"+objPagina.strLink : "javascript:void(0);" %>"><img width="55" height="55" alt="avatar" src="<%=Model.StrLogo%>" class="avatar_tl" /></a>
		                         
	<div class="e-wrap">
		<h1>
		    <a class="" title="<%=Model.StrTitulo%>" href="<%=objPagina != null ? "/AVA/Pagina/"+objPagina.strLink : "javascript:void(0);" %>"><%=Model.StrTitulo%></a>
		</h1>
		<div class="mural_time">
            <% 
            if(!Model.BolPreview) 
            {
                if (bolAdministra)
                {
                    if (Model.SelecaoAdmCoord == "Todos" && Model.SelecaoAlunos == "Todos" && Model.SelecaoProfessores == "Todos" && Model.SelecaoResponsaveis == "Todos") 
                    {
                        Response.Write("<span>Todos</span>");
                    } 
                    else 
                    { 
                        %>
                        <a class="seletor_compartilhado" href="javascript:void(0);"><span>Personalizado</span></a>
                        <% 
                    }    
                }                
            } 
            
            if(Model.BolAgendado) 
            { 
                %>
			    <span class="fontello agendado tooltip_title" title="Post agendado"></span>
                <% 
            } 
            else if(!Model.BolPreview) 
            { 
                if (bolAdministra)
                {
                    %>
                    <span>&bull;</span>
                    <% 
                }
            } 
            %>
		    <span><%=Model.StrAgendamento%></span>
		    <span class="postar_assunto fontello"></span> 
		    <span><%=Model.StrAssunto.ToUpper()%></span> 
		</div>                  
	</div>
	<div class="post_espec <%=Model.BolPreview ? " preview_post_pagina" : ""%><%=(Model.BolBanner) ? " banner" : "" %>" <%=Model.BolBanner ? " urlBanner=\"" + Model.StrLinkVideo + "\"": "" %>>
        <% if(Model.BolBanner && Model.Banner != null) { %>
            <div class="banner_mural">
                <% if(Model.BolPreview) { %>
                <img src="<%=Model.Banner.strDiretorio + "/" + Model.Banner.strArquivo + Model.Banner.strExtensao %>" alt="" />
                <% } else { %>
                <a href="<%=Model.StrLinkVideo%>" target="_blank">
                <img src="<%=Model.Banner.strDiretorio + "/" + Model.Banner.strArquivo + Model.Banner.strExtensao %>" alt="" />
                </a>
                <% } %>                
            </div>
        <% } %>
        <% if(!String.IsNullOrEmpty(StrMensagem)) { %>
            <p class="ctn_msg"><%=StrMensagem%></p>
        <% } %>
        <% if(Model.BolBanner) {
            string textoLinkBanner = Model.StrLinkVideo.ToUpper();
            if (textoLinkBanner.IndexOf("://") >= 0)
                textoLinkBanner = textoLinkBanner.Substring(textoLinkBanner.IndexOf("://") + 3);            
            textoLinkBanner = textoLinkBanner.Replace("WWW.", "");
            if(textoLinkBanner.IndexOf("/") >= 0)
                textoLinkBanner = textoLinkBanner.Substring(0, textoLinkBanner.IndexOf("/"));  
        %>
        <p class="referencia_post">
            <% if(Model.BolPreview) { %>
            <%=textoLinkBanner%>
            <% } else { %>
            <a href="<%=Model.StrLinkVideo%>" target="_blank"><%=textoLinkBanner%></a>
            <% } %>
        </p><div class="clearfix"></div>
        <% } %>
        <% if(Model.Imagens != null && !Model.BolBanner) { %>
		<div class="imagens_mural GaleriaAva">
            <a <%=Model.BolPreview ? "style=\"cursor:default;\"" : "" %> data-width="<%=Model.Imagens[0].arquivo.largura %>" data-height="<%=Model.Imagens[0].arquivo.altura %>" data-idarquivo="<%=Model.Imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemRapida%>" href="<%=Model.BolPreview ? "javascript:void(0);" : Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=Model.Imagens[0].arquivo.strNome %>" title="<%=Model.Imagens[0].arquivo.strNome%>" data-posicao="<%=Model.Imagens[0].intOrdem %>" data-descricao="<%=Model.Imagens[0].arquivo.strDescricao %>">
                <img  src="<%=Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>">
            </a>
            
            <% if (Model.Imagens.Count == 2) { %>
                <a <%=Model.BolPreview ? "style=\"cursor:default;\"" : "" %> data-width="<%=Model.Imagens[1].arquivo.largura %>" data-height="<%=Model.Imagens[1].arquivo.altura %>" data-idarquivo="<%=Model.Imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemRapida%>" href="<%=Model.BolPreview ? "javascript:void(0);" : Model.Imagens[1].arquivo.strDiretorio + "/" + Model.Imagens[1].arquivo.strArquivo + Model.Imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=Model.Imagens[1].arquivo.strNome %>" title="<%=Model.Imagens[1].arquivo.strNome%>" data-posicao="<%=Model.Imagens[1].intOrdem %>" data-descricao="<%=Model.Imagens[1].arquivo.strDescricao %>">
                    <img  src="<%=Model.Imagens[1].arquivo.strDiretorio + "/" + Model.Imagens[1].arquivo.strArquivo + Model.Imagens[1].arquivo.strExtensao %>">
                </a>
            <% } else if (Model.Imagens.Count > 2) { %>                        
            <div style="height: 142px;<%=Model.BolPreview ? " width: 560px;" : "" %>" class="thumbs_mural">
                <% for(var i = 1; i < Model.Imagens.Count; i++) { %>
                    <a <%=Model.BolPreview ? "style=\"cursor:default;\"" : "" %> data-width="<%=Model.Imagens[i].arquivo.largura %>" data-height="<%=Model.Imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.Imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemRapida%>" href="<%=Model.BolPreview ? "javascript:void(0);" : Model.Imagens[i].arquivo.strDiretorio + "/" + Model.Imagens[i].arquivo.strArquivo + Model.Imagens[i].arquivo.strExtensao %>" data-nomearquivo="<%=Model.Imagens[i].arquivo.strNome %>" title="<%=Model.Imagens[i].arquivo.strNome%>" data-posicao="<%=Model.Imagens[i].intOrdem %>" data-descricao="<%=Model.Imagens[i].arquivo.strDescricao %>">
                        <img <%=(i > 2) ? "style=\"display:none;\"" : "" %> src="<%=Model.Imagens[i].arquivo.strDiretorio + "/" + Model.Imagens[i].arquivo.strArquivo + Model.Imagens[i].arquivo.strExtensao %>">
                    </a>
                <% } %>
            </div>
            <% } %>                                          
        </div>
        <% } %>
        
        <% if(Model.Arquivos != null && !Model.BolBanner) {
               var qtdArquivos = Model.Arquivos.Count;
               var auxArquivos = qtdArquivos > 3 ? 3 : qtdArquivos;
               for (var i = 0; i < auxArquivos; i++) { %>
                    <div class="prev_documento">
                        <div class="tipo_arquivo">
                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                            <span><%=Model.Arquivos[i].arquivo.strExtensao %></span>
                        </div>    
                        <p><%=Model.Arquivos[i].arquivo.strNome %></p>
                        <% if (bolMobile) { %>
                            <a target="_blank" href="<%=Model.Arquivos[i].arquivo.strDiretorio + "/" + Model.Arquivos[i].arquivo.strArquivo + Model.Arquivos[i].arquivo.strExtensao %>">Download</a>
                        <% } else { %>
                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.Arquivos[i].arquivo.strDiretorio + "/" + Model.Arquivos[i].arquivo.strArquivo + Model.Arquivos[i].arquivo.strExtensao %>">Download</a>
                        <% } %>
                    </div>
            <% } if(auxArquivos != qtdArquivos) { %>
            <div class="engloba_doc" <%=(Model.BolPreview) ? "style=\"display:block;\"" : "" %>>
            <% for(var i = auxArquivos; i < qtdArquivos; i++) { %>
                    <div class="prev_documento">
                        <div class="tipo_arquivo">
                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                            <span><%=Model.Arquivos[i].arquivo.strExtensao %></span>
                        </div>    
                        <p><%=Model.Arquivos[i].arquivo.strNome %></p>
                        <% if (bolMobile) { %>
                            <a target="_blank" href="<%=Model.Arquivos[i].arquivo.strDiretorio + "/" + Model.Arquivos[i].arquivo.strArquivo + Model.Arquivos[i].arquivo.strExtensao %>">Download</a>
                        <% } else { %>
                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.Arquivos[i].arquivo.strDiretorio + "/" + Model.Arquivos[i].arquivo.strArquivo + Model.Arquivos[i].arquivo.strExtensao %>">Download</a>
                        <% } %>
                    </div>       
            <% } %> 
            </div>
            <% if(!Model.BolPreview) { %>
            <a href="javascript:void(0);" class="ver_mais_doc">Ver mais</a>
            <% } %>
        <% } %>
        <div class="clearfix"></div>
        <% } %>


        <% if (Model.StrLinkVideo.Length > 0 && !Model.BolBanner) { //Link do video salva o endereço do banner
            string strLinkPrev = Model.StrLinkPreviewVideo;
            if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = ""; %>
            <a class="linkvideo" href="<%=Model.StrLinkVideo%>" target="_blank"><%=Model.StrLinkVideo%></a>

            <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="100%" height="360" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
        <% } %>        
	</div>
    <% if(!Model.BolPreview) { %>
	<div class="acoes_mural">
	    <a class="botaoCurtirGrupos <%=(Model.BolCurtiu) ? "ativo": "" %>" href="javascript:void(0);"></a>
        <div id="boxCurticoesMensagem_<%=Model.IdMensagemRapida%>" idmensagem="<%=Model.IdMensagemRapida%>" class="feedCurtir">
        <%  
           Html.RenderPartial("Partials/ListaCurtidasMensagem", Model.Curticoes, new ViewDataDictionary { { "IntCurtidas", Model.IntCurtidas }, { "IdMensagemRapida", Model.IdMensagemRapida }, { "BolComunicador", Model.BolComunicador }, { "BolTutorProjetos", Model.BolTutorProjetos }, { "BolCurtiu", Model.BolCurtiu } });
        %>
        </div>        
        <!-- Validar comentarios -->
        <% if(bolPodeComentar) { %>
	        <a class="botaoComentar" href="javascript:void(0);"><span class="FontAwesome"></span></a>
        <% } %>

        <% if(bolPodeComentar || Model.Comentarios.Count > 0) { %>
        <div class="clearfix"></div>
        <% if(bolPodeComentar) { %>
	    <form class="campo_comentar" onsubmit="return false;" method="post" ident="<%=Model.IdMensagemRapida%>" name="frmMensagemRapidaComentario">
	        <a href="javascript:void(0);"><img width="25" height="25" src="<%=objUsuario.strMiniFoto %>" /></a>
	        <input type="text" name="strComentario" ident="<%=Model.IdMensagemRapida%>" placeholder="Escreva um comentário...">
	    </form>
        <% } %>
        <div class="clearfix"></div>
        <div class="comentariosMural" id="boxComentarios_<%=Model.IdMensagemRapida%>" <%=bolPossuiComentarios ? "" : "style=\"display:none;\"" %>>
            <%                
               Html.RenderPartial("Partials/ListaComentarios", Model.Comentarios, new ViewDataDictionary { { "totalComentarios", Model.TotalComentarios }, { "idMensagemRapida", Model.IdMensagemRapida }, { "idUsuarioLogado", objUsuario.id }, { "idFerramentaTipo", Model.IdFerramentaTipo }, { "souComunicadorPost", bolAdministra }, { "postExcluido", Model.BolExcluido }, { "bolPodeComentar", bolPodeComentar }, { "idPagina", Model.IdPagina } });
            %>
        </div>
        <% } %>        
	</div>
    <% } %>     
</article>
<% if(Model.BolPreview) { %>
    <% if(Model.BolDestaque) { %>
    <section class="bloco_destaque educacional bloco ajx bl_2 preview">
	    <header>
		    <h4><%=Model.IdPagina == 1 ? "Destaques Educacional" : "Destaques da Escola"%></h4>
	    </header>
        <% Html.RenderPartial("Partials/BoxMensagemDestaque", Model, ViewData); %>
    </section>
    <% } %>
    <div class="acoes_mural preview_mensagem" ide="<%=Model.IdMensagemRapida%>">
        <a href="javascript:void(0);" class="btn_cinza left">Cancelar</a>
        <a href="javascript:void(0);" class="btn_cor right"><%=Model.BolAgendado ? "Agendar" : "Compartilhar" %></a>                                 
    </div>
    <% } %>
<% } %>
