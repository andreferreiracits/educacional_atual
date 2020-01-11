<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Turma.Models.MensagemRapida>" %>
<%

try{

    Model.strDisciplina = Model.strDisciplina ;

}
catch(  Exception e){
    Model.strDisciplina = "";
}

if(Model == null)
{
    Response.Write("0");
}
else
{ 
    //Informacoes do usuario logado
    var bolMobile = false;
    string uAgent = Request.UserAgent.ToLower();
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }

    var bolSuspenso = (bool)ViewData["bolSuspenso"];
    var objSuspensao = bolSuspenso ? (AVASuspensaoDenuncia.Models.Suspensao)ViewData["objSuspensao"] : null;

    var bolSegmentoBloqueado = (bool)ViewData["bolSegmentoBloqueado"];
    var segBloqueio = bolSegmentoBloqueado ? (UsuarioAVA.Models.SegmentacaoBloqueio)ViewData["objSegmentoBloqueado"] : null;

    var bolPodeComentar = (bool)ViewData["bolPodeComentar"];
    var bolPodeCurtir = (bool)ViewData["bolPodeCurtir"];
    
    var objUsuario = (UsuarioAVA.Models.Usuario)ViewData["objUsuario"];
    
    var bolPossuiComentarios = false;
    if (Model.Comentarios != null)
        bolPossuiComentarios = Model.Comentarios.Count > 0;
    
    var bolModerador = (bool)ViewData["bolModerador"];
    var bolAdmRedeSocial = (bool)ViewData["bolAdmRedeSocial"];
    //Fim informacoes usuario logado

    //var isEducador = (bool) ViewData["papel"];

    var bolMostraBotaoExcluir = (!Model.BolExcluido && (Model.IdUsuario == objUsuario.id || bolModerador || bolAdmRedeSocial));
    var bolMostraBotaoDenuncia = !Model.BolExcluido && Model.IdUsuario != objUsuario.id;
    
%>
<article class="clearfix <%=(Model.BolProfessor) ? " highlight" : "" %>" ide="<%=Model.IdMensagemRapida%>">


    <% if(bolMostraBotaoDenuncia || bolMostraBotaoExcluir) { %>   
	
    <ul class="combo_denunciar_excluir">
		<li>
		    <a class="icone" href="javascript:void(0);"></a>
		    <ul>
                <% if (bolMostraBotaoExcluir) { %>

                
		            <li><a class="mostra_caixa confirma_excluir" href="#confirma_excluir"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                

                <% } if(bolMostraBotaoDenuncia) { %>
                <li><a class="denunciar_mensagem denunciar_comentario" href="javascript: void(0);"><span class="denunciar_comentario_combo FontAwesome"></span>Denunciar</a></li>
                <% } %>                
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
    <a href="/AVA/Perfil/Home/Index/<%=Model.StrLogin%>" class=""><img class="avatar_tl" src="<%=Model.StrMiniFoto%>" width="35" height="35" alt="avatar" /></a>
    <div class="e-wrap">
		<h1>
            <%=(Model.BolModerador) ? "<i class=\"fontello icon_mediador\"></i>&nbsp;" : ""%>
		    <a href="/AVA/Perfil/Home/Index/<%=Model.StrLogin%>" title="<%=Model.StrNome%>" class=""><%=Model.StrNome%></a>
		</h1>
        <% if(Model.StrAssunto != null){ %>
		<div class="mural_time">
		    <span><%=Model.StrCriacao%></span>
		    <span class="postar_assunto fontello"></span>
		    <span class="assunto_mural"><%=Model.StrAssunto.ToUpper()%></span>
		    <span class="disciplina_mural"> - <%= Model.strDisciplina %></span>
		</div>
        <% } 
        else{ 
        %>
        <div class="mural_time">
		    <span><%=Model.StrCriacao%></span>
		    <span class="postar_assunto fontello"></span>
		    <span class="assunto_mural">-</span>
		    <span class="disciplina_mural"> - <%= Model.strDisciplina %></span>
		</div>
        <% } %>
        <p class="ctn_msg"><%=Model.StrMensagem%></p>
        <% if(Model.Imagens != null) { %>
		<div class="imagens_mural GaleriaAva">
            <a data-width="<%=Model.Imagens[0].arquivo.largura %>" data-height="<%=Model.Imagens[0].arquivo.altura %>" data-idarquivo="<%=Model.Imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemRapida%>" href="<%=Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=Model.Imagens[0].arquivo.strNome %>" title="<%=Model.Imagens[0].arquivo.strNome%>" data-posicao="<%=Model.Imagens[0].intOrdem %>" data-descricao="<%=Model.Imagens[0].arquivo.strDescricao %>">
                <img style="width: 100%;" src="<%=Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>">
            </a>
            
            <% if (Model.Imagens.Count == 2) { %>
                <a data-width="<%=Model.Imagens[1].arquivo.largura %>" data-height="<%=Model.Imagens[1].arquivo.altura %>" data-idarquivo="<%=Model.Imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemRapida%>" href="<%=Model.Imagens[1].arquivo.strDiretorio + "/" + Model.Imagens[1].arquivo.strArquivo + Model.Imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=Model.Imagens[1].arquivo.strNome %>" title="<%=Model.Imagens[1].arquivo.strNome%>" data-posicao="<%=Model.Imagens[1].intOrdem %>" data-descricao="<%=Model.Imagens[1].arquivo.strDescricao %>">
                    <img style="width: 100%;" src="<%=Model.Imagens[1].arquivo.strDiretorio + "/" + Model.Imagens[1].arquivo.strArquivo + Model.Imagens[1].arquivo.strExtensao %>">
                </a>
            <% } else if (Model.Imagens.Count > 2) { %>                        
            <div style="height: 142px;" class="thumbs_mural">
                <% for(var i = 1; i < Model.Imagens.Count; i++) { %>
                    <a data-width="<%=Model.Imagens[i].arquivo.largura %>" data-height="<%=Model.Imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.Imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.IdMensagemRapida%>" href="<%=Model.Imagens[i].arquivo.strDiretorio + "/" + Model.Imagens[i].arquivo.strArquivo + Model.Imagens[i].arquivo.strExtensao %>" data-nomearquivo="<%=Model.Imagens[i].arquivo.strNome %>" title="<%=Model.Imagens[i].arquivo.strNome%>" data-posicao="<%=Model.Imagens[i].intOrdem %>" data-descricao="<%=Model.Imagens[i].arquivo.strDescricao %>">
                        <img <%=(i > 2) ? "style=\"display:none;\"" : "" %> src="<%=Model.Imagens[i].arquivo.strDiretorio + "/" + Model.Imagens[i].arquivo.strArquivo + Model.Imagens[i].arquivo.strExtensao %>">
                    </a>
                <% } %>
            </div>
            <% } %>                                          
        </div>
        <% } %>
        
        <% if(Model.Arquivos != null) {
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
            <div class="engloba_doc">
            <% for(var i = auxArquivos; i < qtdArquivos; i++) { %>
                    <div class="prev_documento">
                        <div class="tipo_arquivo">
                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32" />
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
            <a href="javascript:void(0);" class="ver_mais_doc">Ver mais</a>            
        <% } } %>
        <% if (Model.StrLinkVideo.Length > 0) {
            string strLinkPrev = Model.StrLinkPreviewVideo;
            if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = ""; %>
            <a class="linkvideo" href="<%=Model.StrLinkVideo%>" target="_blank"><%=Model.StrLinkVideo%></a>
            <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="100%" height="315" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
        <% } %>
        <% if(!bolSuspenso) { %>
	    <div class="acoes_mural" ide="<%=Model.IdMensagemRapida%>">
            <% if(bolPodeCurtir) { %>
	        <a class="botaoCurtirGrupos <%=(Model.BolCurtiu) ? "ativo": "" %>" href="javascript:void(0);"></a>
            <% } %>
            <div id="boxCurticoesMensagem_<%=Model.IdMensagemRapida%>" idmensagem="<%=Model.IdMensagemRapida%>" class="feedCurtir" <%=(Model.Curticoes.Count == 0) ? "style=\"display:none\"" : "" %>>
            <%  
                Html.RenderPartial("Partials/ListaCurtidasMensagem", Model.Curticoes, new ViewDataDictionary { { "IntCurtidas", Model.IntCurtidas }, { "IdMensagemRapida", Model.IdMensagemRapida } });
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
                   Html.RenderPartial("Partials/ListaComentarios", Model.Comentarios, new ViewDataDictionary { { "totalComentarios", Model.TotalComentarios }, { "idMensagemRapida", Model.IdMensagemRapida }, { "idUsuarioLogado", objUsuario.id }, { "bolAdmRedeSocial", bolAdmRedeSocial }, { "bolModerador", bolModerador }, { "bolPodeCurtir", bolPodeCurtir } });
                %>
            </div>
            <% } %>        
	    </div>
        <% } %>
	</div>    
</article>
<% } %>