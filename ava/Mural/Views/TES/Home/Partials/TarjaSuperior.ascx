<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Usuario>" %>
<% 
    string strLogo = "";
    var idEscola = Model.idEscola;

    if (idEscola > 0 )
    {
        strLogo = "/esc_include/AVA/" + idEscola + "/logo.png";       
    }
    else
    {
        strLogo = "/AVA/StaticContent/Content/TES/cssimg/logo_colegioPositivo.png";   
    }
%>
<hgroup>
    <h1><a href="/ava/mural"><img src="<%=strLogo %>" border="0"></a></h1>
    <div class="versao "> <span class="">beta</span></div>
    
    <div class="pesquisa_escolar">
        <header>
        <form target="_top" method="post" action="/pesquisa/respostapalavra.asp?pg=1&amp;tp=nova" name="fBusca">  
               	<input type="text" class="campo ph" placeholder="PESQUISA ESCOLAR" id="strpc_topo" name="strpc_topo">
               	<div class="bt_geral"><input type="submit" class="okP" value="Buscar" id="Submit1" name="go_button"></div>             
                <p><a href="/pesquisa/">+ opções</a></p>
                
					<input type="hidden" value="1" name="IdAssunto">
					<input type="hidden" value="" name="IdPapel">
					<input type="hidden" value="" name="IdSerie">
					<input type="hidden" value="1" name="intRadTipo">
					<input type="hidden" value="30" name="sintTop">
					<input type="hidden" value="x" name="bEncEnciclopedia">
					<input type="hidden" value="x" name="bArtigo">
					<input type="hidden" value="x" name="bEntrevista">
					<input type="hidden" value="x" name="bReportagem">
					<input type="hidden" value="x" name="bForum">
					<input type="hidden" value="x" name="bClassico">
					<input type="hidden" value="x" name="bClassicoAutor">
					<input type="hidden" value="x" name="bClassicoGeral">
					<input type="hidden" value="x" name="bEducacionalRecomenda">
					<input type="hidden" value="x" name="bAtlas">
					<input type="hidden" value="x" name="bConteudoMultimidia">		
					<input type="hidden" value="x" name="bBancoImagem">
					<input type="hidden" value="x" name="bEncBancoImagens">
					<input type="hidden" value="x" name="bEncaminhamento">
					<input type="hidden" value="x" name="bEncVerbos">
					<input type="hidden" value="x" name="bEncMunicipios">
					<input type="hidden" value="x" name="bEncBancoVoz">
					<input type="hidden" value="x" name="bLegislacao">
					<input type="hidden" value="x" name="bSaibaMais">
					<input type="hidden" value="x" name="bSite">
					<input type="hidden" value="x" name="bSiteGeral">
					<input type="hidden" value="x" name="bPEServicos">
					<input type="hidden" value="x" name="bEnciclopedia">
					<input type="hidden" value="x" name="bMundoDaCrianca">
					<input type="hidden" value="x" name="bLinhaDoTempo">
					<input type="hidden" value="x" name="bDicAurelio">
					<input type="hidden" value="x" name="bMuseuVirtual">
					<input type="hidden" value="x" name="bLinguaEstrangeira">
					<input type="hidden" value="x" name="bBlog">
					<input type="hidden" value="x" name="bInterpretando">
                    <input type="hidden" value="x" name="bMicroscopia">
                    <input type="hidden" value="x" name="bTodos">

        </form>
        </header>
    </div>
</hgroup>