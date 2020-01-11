<!--
Mandatory in IE 6, 7, 8 and 9.
-->
<!--[if IE]>
<script type="text/javascript" src="//stuk.github.io/jszip-utils/dist/jszip-utils-ie.js"></script>
<![endif]-->

<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Turma.Models.MensagemRapida>" %>
<%
if (Model == null)
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

    var intTipoMidia = (int)ViewData["intTipoMidia"];

    var bolPodeComentar = (bool)ViewData["bolPodeComentar"];
    var bolPodeCurtir = (bool)ViewData["bolPodeCurtir"];
    //var visualizarBtnCurtir = (bool)ViewData["visualizarBtnCurtir"];

    var objUsuario = (UsuarioAVA.Models.Usuario)ViewData["objUsuario"];

    var bolPossuiComentarios = false;
    if (Model.Comentarios != null)
        bolPossuiComentarios = Model.Comentarios.Count > 0;

        var bolModerador = false;

    try{
        bolModerador = (bool)ViewData["bolModerador"];
    }
    catch(Exception e){
        bolModerador = false;
    }
    var bolAdmRedeSocial = false;

    var bolPodeAlterarNome = true;
    //var bolAdmRedeSocial = (bool)ViewData["bolAdmRedeSocial"];
    
    //Fim informacoes usuario logado    
    %>

    <div class="item_galeria" id="itemGaleriea_<%=Model.IdMensagemRapida%>" intTipoMidia="<%=intTipoMidia%>">
        
            <% 
            if(Model.Imagens != null && (intTipoMidia == 0 || intTipoMidia == 1)) 
            {
            %>
                <div 
                    data-idPost="<%=Model.IdMensagemRapida%>" 
                    class="idArq_<%=Model.Imagens[0].idArquivo %> item_imagem_galeria <%=Model.Imagens.Count > 1 ? " varias_galeria" : ""%> imagens_mural GaleriaAva" 
                    style="background-image:url('<%=Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>');">
                    
                    <a  id="abrir_fancybox" 
                        data-width="<%=Model.Imagens[0].arquivo.largura %>" 
                        data-height="<%=Model.Imagens[0].arquivo.altura %>" 
                        data-idarquivo="<%=Model.Imagens[0].idArquivo %>" class="galeria_mural galeriaava fancybox-thumb fake_galeria" 
                        rel="galeria_mural_<%=Model.IdMensagemRapida%>" 
                        data-nomearquivo="<%=Model.Imagens[0].arquivo.strNome %>"
                        data-strExtensao="<%=Model.Imagens[0].arquivo.strExtensao %>"
                        title="<%=Model.Imagens[0].arquivo.strNome%>" data-posicao="<%=Model.Imagens[0].intOrdem %>" 
                        data-descricao="<%=Model.Imagens[0].arquivo.strDescricao %>"
                        data-path="<%=Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>">
                        <!-- <img alt="auxiliar" style="display:none;" src="<%=Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>"> -->
                    </a>

                    <%  if(Model.Imagens.Count > 1) 
                        {
                            for (var i = 1; i < Model.Imagens.Count; i++)
                            { %>
                                <a 
                                    data-path="<%=Model.Imagens[i].arquivo.strDiretorio + "/" + Model.Imagens[i].arquivo.strArquivo + Model.Imagens[i].arquivo.strExtensao %>" 
                                    style="display:none;" 
                                    data-width="<%=Model.Imagens[i].arquivo.largura %>" 
                                    data-height="<%=Model.Imagens[i].arquivo.altura %>" 
                                    data-idarquivo="<%=Model.Imagens[i].idArquivo %>" 
                                    class="galeria_mural fancybox-thumb" 
                                    rel="galeria_mural_<%=Model.IdMensagemRapida%>" 
                                    href="#" 
                                    data-nomearquivo="<%=Model.Imagens[i].arquivo.strNome %>" 
                                    data-strExtensao="<%=Model.Imagens[i].arquivo.strExtensao %>"
                                    title="<%=Model.Imagens[i].arquivo.strNome%>" 
                                    data-posicao="<%=Model.Imagens[i].intOrdem %>" 
                                    data-descricao="<%=Model.Imagens[i].arquivo.strDescricao %>">
                                    <!-- <img alt="<%=Model.Imagens[i].arquivo.strArquivo %>" src="<%=Model.Imagens[i].arquivo.strDiretorio + "/" + Model.Imagens[i].arquivo.strArquivo + Model.Imagens[i].arquivo.strExtensao %>"> -->
                                </a>    
                    <% 
                            }
                        }
                    %>

                    <%  
                    if(intTipoMidia == 0 && Model.Arquivos != null) 
                    {
                    for (var i = 0; i < 1; i++) 
                    { 
                    %>
                        
                            <a 
                                class="galeria_mural fancybox-thumb" 
                                style="display:none;"
                                data-idarquivo="<%=Model.Arquivos[i].idArquivo %>"
                                data-strExtensao="<%=Model.Arquivos[i].arquivo.strExtensao %>"
                                data-nomearquivo="<%=Model.Arquivos[0].arquivo.strNome%>"
                                data-path="<%=Model.Arquivos[i].arquivo.strDiretorio + "/" + Model.Arquivos[i].arquivo.strArquivo + Model.Arquivos[i].arquivo.strExtensao %>"></a>
                    <%  
                    }
                    }
                    %>
                </div>
            <% 
            } 
            else if(Model.Arquivos != null) 
            { %>
                <div data-idPost="<%=Model.IdMensagemRapida%>" class="item_imagem_galeria item_galeria_arquivos imagens_mural">
                <%     var qtdArquivos = Model.Arquivos.Count;
                var auxArquivos = qtdArquivos > 3 ? 3 : qtdArquivos;
                for (var i = 0; i < 1; i++) { %>
                        <div class=" tipo_arquivo">
                            <a class="fake_galeria" style="display:none;"                                
                                data-strExtensao="<%=Model.Arquivos[i].arquivo.strExtensao %>"
                                data-nomearquivo="<%=Model.Arquivos[0].arquivo.strNome%>" 
                                data-idarquivo="<%=Model.Arquivos[i].idArquivo %>" 
                                data-path="<%=Model.Arquivos[i].arquivo.strDiretorio + "/" + Model.Arquivos[i].arquivo.strArquivo + Model.Arquivos[i].arquivo.strExtensao %>"></a>
                            <span><%=Model.Arquivos[i].arquivo.strExtensao %></span>
                        </div>
                <% } if(auxArquivos != qtdArquivos) { %>
                    <div class="engloba_doc">
                    <% for(var i = auxArquivos; i < qtdArquivos; i++) { %>
                            <div class="prev_documento">
                                <div class="tipo_arquivo"></div>
                                <span><%=Model.Arquivos[i].arquivo.strExtensao %></span>
                            </div>       
                    <% } %> 
                    </div>
                    <div class="prev_documento">            
                        <p>
                            <a href="javascript:void(0);" class="ver_mais" textInit="<%="+" + (qtdArquivos - auxArquivos) + ((qtdArquivos - auxArquivos) == 1 ? " arquivo" : " arquivos")%>">
                                <%="+" + (qtdArquivos - auxArquivos) + ((qtdArquivos - auxArquivos) == 1 ? " arquivo" : " arquivos")%>
                            </a>
                        </p>
                    </div>            
                <% } %>
                </div>   
            <% 
            } 
            else if(!String.IsNullOrEmpty(Model.StrLinkVideo)) 
            { 
                bolPodeAlterarNome = false;
                string strLinkPrev = Model.StrLinkPreviewVideo;
                if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = ""; %>
                <div class="item_imagem_galeria video_galeria" data-idPost="<%=Model.IdMensagemRapida%>">
                    <iframe style="" <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="310" height="200" src="//<%=strLinkPrev%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
                </div>
                <% } %>
                <div class="info_aluno">
                    <a href="/AVA/Perfil/Home/Index/<%=Model.StrLogin%>">
                        <img src="<%=Model.StrMiniFoto%>" width="33" height="33"/>
                    </a>
                    <h1><%=(Model.BolModerador) ? "<i class=\"fontello icon_mediador\"></i>&nbsp;" : ""%>
                    <a href="/AVA/Perfil/Home/Index/<%=Model.StrLogin%>" class="nome" title="<%=Model.StrNome%>"><%=Model.StrNome%></a>
                    </h1>            
                    <a href="<%=Model.StrLinkPostUnico%>" class="time"><%=Model.StrCriacao%></a>
                    <span>&bull;</span>
                    <span><%=Model.StrAssunto%></span>
                </div>
        
                <div class="acoes_mural" ide="<%=Model.IdMensagemRapida%>">

                    <% 
                    if(bolPodeAlterarNome) { %>
                        <a class="btnGava" style="position: absolute; float: right; margin-top: 10px; top: -45px; right: 8px;"><button>Visualizar</button></a>
                    <% } %>
                    <% if(bolPodeCurtir) { %>
                    <a id="btnCurtir" class="botaoCurtirGrupos <%=(Model.BolCurtiu) ? "ativo": "" %>" href="javascript:void(0);"></a>
                    <% } %>
                    <% if(bolModerador){%> 
                    <div id="boxCurticoesMensagemGaleria_<%=Model.IdMensagemRapida%>" idmensagem="<%=Model.IdMensagemRapida%>" class="feedCurtir meus_documentos" <%=(Model.Curticoes.Count == 0) ? "style=\"display:none\"" : "" %>>
                    <%  
                        Html.RenderPartial("Partials/ListaCurtidasMensagem", Model.Curticoes, new ViewDataDictionary { { "IntCurtidas", Model.IntCurtidas }, { "IdMensagemRapida", Model.IdMensagemRapida } });
                    %>
                    </div> 
                    <% } %>
                    <% if(bolPodeComentar) { %>
                    <a class="botaoComentar botaoComentarGaleria" id="botaoComentar" href="<%=Model.StrLinkPostUnico %>"><span class="FontAwesome"></span></a>
                    <% if(Model.TotalComentarios >= 1 ) { %>
                        <a href="<%=Model.StrLinkPostUnico %>" class="feedCurtirIcone blokletters">+<%=Model.TotalComentarios %></a>

                    <% } 
            } %>    
                    
                </div>
    </div>
<%
 } 
%>



<script>

    $( document ).ready(function() {
        var typearquivos = document.getElementById('hGaleriaMidiaTipo').getAttribute('value');

        var url  = document.URL;

        if( url.indexOf('AVA/Perfil/') > 0   ){
        component = $('ul').children('li');

            component.each(function(i){
            teste = $(this).attr("midiatipo");
            if(teste == 2){
                $(this).css("display","none");
            }
            i++;
        });

        if(typearquivos == 3){
        $('.item_galeria').each(function(k){
            var c = $(this).find("a");
            var srcId = c.attr('id');
            if(srcId === 'abrir_fancybox'){
                $(this).hide();                                
                }
        k++;

});} 
        
        }

    });

</script>
