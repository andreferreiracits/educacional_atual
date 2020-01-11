<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<header>
    <h1>Links Rápidos</h1>
</header>

<% 
    if (Convert.ToBoolean(ViewData["bolAluno"]))
    {
%>
        <ul class="clearfix">
            <li><a href="/aurelinho/"><div class="icon_li"></div><span>Aurelinho</span></a></li>
            <li><a href="/blog/wp/novaHome.asp"><div class="icon_li"></div><span>Blog</span></a></li>
            <li><a href="/multimidia/"><div class="icon_li"></div><span>Conteúdo multimídia</span></a></li>
            <li><a href="/desafio/"><div class="icon_li"></div><span>Desafios de lógica</span></a></li>
            <li><a href="/ed_infantil_new/"><div class="icon_li"></div><span>Educação infantil</span></a></li>
            <li><a href="/enem/"><div class="icon_li"></div><span>Enem</span></a></li>
            <li><a href="/cp/projetos/"><div class="icon_li"></div><span>Projetos colaborativos</span></a></li>
            <li><a href="/vestibular/"><div class="icon_li"></div><span>Vestibular</span></a></li>
        </ul>
<%
    }   

    if (Convert.ToBoolean(ViewData["bolPai"]))
    {
%>
        <ul class="clearfix">
            <li><a href="/avaliacoesonline/"><div class="icon_li"></div><span>Avaliações</span></a></li>
            
            <li><a href="/colunistas/"><div class="icon_li"></div><span>Colunistas</span></a></li>
            <li><a href="/dicionarioaurelio/"><div class="icon_li"></div><span>Dicionário aurélio</span></a></li>
            <li><a href="/enciclopedia/"><div class="icon_li"></div><span>Enciclopédia</span></a></li>
            <li><a href="/pesquisa/"><div class="icon_li"></div><span>Pesquisa escolar</span></a></li>
        </ul>
<%      
    }   

    if (Convert.ToBoolean(ViewData["bolEducador"]))
    {
%>
        <ul class="clearfix">
            <li><a href="/avaliacoesonline/"><div class="icon_li"></div><span>Avaliações</span></a></li>
            <li><a href="/blog/wp/novaHome.asp"><div class="icon_li"></div><span>Blog</span></a></li>
            <li><a href="/AVA/caminhos"><div class="icon_li"></div><span>Caminhos de aprendizagem</span></a></li> 
            <li><a href="/multimidia/"><div class="icon_li"></div><span>Conteúdo multimídia</span></a></li>
            <li><a href="/formacaocontinuada/"><div class="icon_li"></div><span>Formação continuada</span></a></a></li>
            <li><a href="/cp/projetos/"><div class="icon_li"></div><span>Projetos colaborativos</span></a></li>
            <li><a href="/roteiros/"><div class="icon_li"></div><span>Roteiros de aula</span></a></a></li>
        </ul>
<%
    }   
%>

