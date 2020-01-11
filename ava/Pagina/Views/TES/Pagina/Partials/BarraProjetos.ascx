<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pagina.Models.PaginaEducacional>" %>
<% 
    bool bolPostUnico = ViewData["bolPostUnico"] == null ? false : (bool)ViewData["bolPostUnico"];
    var linkMural = bolPostUnico ? "href=\"/AVA/Pagina/" + Model.strLink + "\"" : "";
    bool bolMenuGerenciadorCP = (bool)ViewData["bolMenuGerenciadorCP"];
%>
<div class="barra_topo_itens barra_pg_projetos_mural">
	<h1>
		<a class="ep-barra-logo" href="/ava/pagina/projetos"><%=Model.strTitulo%></a>
	</h1>
	<p class="texto-complementar">A cada ano, centenas de turmas participam de experiências que abrem novos horizontes geográficos e culturais.</p>
     <% if (bolMenuGerenciadorCP)
    {%>
        <ul class="info-complementar">
		    <!-- <li><a href="/cp/faleConosco.asp">Fale conosco</a></li> -->
	    </ul>
    <%} %>	
	<ul class="ep-menu">
		<li class="mural <%=bolPostUnico ? "" : " ativo"%>"><a <%=linkMural %>>Mural de Projetos</a></li>
        <li class="projetos"><a href="/cp/eixos">Eixos</a></li>
        <% if (bolMenuGerenciadorCP)
        {%>
           <li class="oficinas"><a href="/cp/gerenciador">Inscrições e Gerenciamento</a></li>
        <%} %>
        <li class="clubes"><a href="/cp/tiposdeprojeto">Tipos de Projeto</a></li>
        <%--<li class="clubes"><a href="/cp/clube/default.asp">Tipos de Projeto</a></li>		--%>
		<li class="mostras"><a href="/cp/certificados">Certificados</a></li>
		<li class="concursos"><a href="/cp/anosanteriores">Anos Anteriores</a></li>
        <li class="concursos"><a href="/cp/ajuda">Ajuda</a></li>
		
	</ul>
</div>



