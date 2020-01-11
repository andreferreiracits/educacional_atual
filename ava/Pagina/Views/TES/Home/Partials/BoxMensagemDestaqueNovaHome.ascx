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

    bool arquivoTipoAudio = false;
    
    int tipoMultimidia = 0;
    if (Model.Imagens != null)
        tipoMultimidia = 1;
    else if (!String.IsNullOrEmpty(Model.StrLinkVideo) && !Model.BolBanner)
        tipoMultimidia = 2;
    else if (Model.Arquivos != null)
    {
        tipoMultimidia = 3;
        arquivoTipoAudio = (Model.Arquivos[0].arquivo.strExtensao == ".mp3" || 
                            Model.Arquivos[0].arquivo.strExtensao == ".wav" || 
                            Model.Arquivos[0].arquivo.strExtensao == ".wma");
    }
    else if (!String.IsNullOrEmpty(Model.StrLinkVideo) && Model.BolBanner)
        tipoMultimidia = 4;

    string linkPostUnico = PositivoFramework.Security.Cryptography.RC4Engine.Encrypt("2512", Model.IdMensagemRapida.ToString(), PositivoFramework.Security.Cryptography.RC4EngineEncoding.Hex);
    string linkBanner = Model.StrLinkVideo;
    string linkAssunto = "/AVA/Pagina/" + Model.StrLinkPagina + "#" + HttpUtility.UrlEncode(Model.StrAssunto.ToLower()).ToLower(); // + RedeSocialAVA.FuncoesTexto.RemoverAcentuacao(Model.StrAssunto, true).ToLower();
    
    
    if (Model.BolPreview)
    {
        linkPostUnico = linkBanner = linkAssunto = "javascript:void(0);";
    }
    else
    {
        linkPostUnico = "/AVA/Pagina/Post/" + linkPostUnico;
    }

    var bolSemMultimidia = Model.Imagens == null && Model.Arquivos == null && Model.Banner == null;
    if (!Model.BolBanner && bolSemMultimidia)
        bolSemMultimidia = String.IsNullOrEmpty(Model.StrLinkVideo);

    var order = (ViewData["order"] != null) ? ViewData["order"] : 0;

    var newTab = "target=\"_newtab\"";
%>

<li <%if(tipoMultimidia == 0){ %> class="sem-img" <%} %> order="<%=order%>" id="<%=order%>">
    <a href="<%=Model.BolBanner ? linkBanner : linkPostUnico %>" <%=Model.BolBanner ? newTab : "" %>>
		<h5><%=Model.StrAssunto%></h5>
	</a>
	<a href="<%=Model.BolBanner ? linkBanner : linkPostUnico %>" <%=Model.BolBanner ? newTab : "" %>>		
            <%  
            switch (tipoMultimidia)
            {
                case 1:
                    %>
                    <div class="img_destaque" style="background-image: url(<%=Model.Imagens[0].arquivo.strDiretorio + "/" + Model.Imagens[0].arquivo.strArquivo + Model.Imagens[0].arquivo.strExtensao %>);"></div>                    
                    <%
                    break;
                case 2:
                    %>
                    <div class="img_destaque" style="<%=RedeSocialAVA.FuncoesVideo.IsYouTubeUrl(Model.StrLinkVideo) ? "background-image:url(http://img.youtube.com/vi/" + RedeSocialAVA.FuncoesVideo.GetYouTubeVideo(Model.StrLinkVideo) + "/0.jpg);" : "background:url(/AVA/StaticContent/Common/img/perfil/carregando.gif) no-repeat center center;"%>"></div>                    
                    <%
                    break;
                case 3:
                    %>

                    <div class="img_destaque" style="background-image: url(<%=arquivoTipoAudio ? "/AVA/StaticContent/Common/img/geral/icone_audio_destaque.png" : "/AVA/StaticContent/Common/img/geral/icone_doc_destaque.png" %>);"></div>                    
                    <%
                    break;
                case 4:
                    if (Model.Banner != null)
                    {                    
                        %>
                        <div class="img_destaque" style="background-image: url(<%=Model.Banner.strDiretorio + "/" + Model.Banner.strArquivo + Model.Banner.strExtensao %>);"></div>                        
                        <%                    
                    }
                    break;
                default:break; 
        }       
        %> 		
		<p><%=RedeSocialAVA.FuncoesTexto.RemoveLinks(Model.StrMensagem)%></p>
	</a>
</li>
            
<% } %>
