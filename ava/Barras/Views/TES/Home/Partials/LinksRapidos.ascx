<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>



<% 
    string strURL = ViewData["URL"].ToString();
    string strURLEscola = ViewData["URLEscola"].ToString();
    int serie = 0;

    if (ViewData["serie"].ToString() != "")
    {
        serie = Convert.ToInt32(ViewData["serie"]);
    }

    if (serie == 90 || serie == 91 || serie == 92 || serie == 93 || serie == 94 || serie == 1 || serie == 10 || serie == 9)
    {
%>

        

<%
    }
    else
    {
        %>
        <header>
            <h1>Links Rápidos</h1>
        </header>
        <%
    }
    
    if (Convert.ToBoolean(ViewData["bolAluno"]))
    {
        //Ed.Infantil
        /*
        if (serie == 90 || serie == 91 || serie == 92 || serie == 93 || serie == 94 || serie == 1 || serie == 10 || serie == 9)
        {
%>          <!--
            <ul class="clearfix">
                <li><a href="/animais/"><div class="icon_li"></div><span>Animais</span></a></li>
                <li><a href="/alunos14/MaosObra/default.asp"><div class="icon_li"></div><span>Atividade mirim</span></a></li>
                <li><a href="/aurelinho/"><div class="icon_li"></div><span>Aurelinho</span></a></li>
                <li><a href="/bichosdafloresta/indiceRedirect.asp"><div class="icon_li"></div><span>Bichos da floresta</span></a></li>
                <li><a href="/ed_infantil/colorir/colorir.asp"><div class="icon_li"></div><span>Imprimir e brincar</span></a></li>
                <li><a href="/alunos14/atividades.asp"><div class="icon_li"></div><span>Jogos mirins</span></a></li>
                <li><a href="/ed_infantil_new/Principal/Principal.asp" target="_blank"><div class="icon_li"></div><span>Meu Quartinho</span></a></li>
                <li><a href="/alunos14/minhahistoria/"><div class="icon_li"></div><span>Minha escola</span></a></li>
                <li><a href="/mdcEducacional/"><div class="icon_li"></div><span>Mundo da criança</span></a></li>
                <li><a href="/ed_infantil_new/Admin/"><div class="icon_li"></div><span>Para educadores</span></a></li>
            </ul>
            -->
<%      }*/
        //EF1
        if (serie == 2 || serie == 3 || serie == 4)
        {
            %>
            <ul class="clearfix">
                <li><a href="/animais/"><div class="icon_li"></div><span>Animais</span></a></li>
                <li><a href="/atlas/"><div class="icon_li"></div><span>Atlas geográfico</span></a></li>
                <li><a href="/aurelinho/"><div class="icon_li"></div><span>Aurelinho</span></a></li>
                <li><a href="/bichosdafloresta/indiceRedirect.asp"><div class="icon_li"></div><span>Bichos da floresta</span></a></li>
                <li><a href="/central2002/"><div class="icon_li"></div><span>Central de jogos</span></a></li>
                <li><a href="/multimidia/"><div class="icon_li"></div><span>Conteúdo multimídia</span></a></li>
                <li><a href="/alunos14/desafio/"><div class="icon_li"></div><span>Desafios mirins</span></a></li>
                <li><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp" target="_blank"><div class="icon_li"></div><span>Home da escola</span></a></li>
                <li><a href="/alunos14/atividades.asp"><div class="icon_li"></div><span>Jogos mirins</span></a></li>
                <li><a href="/alunos14/labtexto.asp"><div class="icon_li"></div><span>Laboratório de texto mirim</span></a></li>
                <li><a href="/ed_infantil_new/Principal/Principal.asp" target="_blank"><div class="icon_li"></div><span>Meu Quartinho</span></a></li>
                <li><a href="/alunos14/minhahistoria/" target="_blank"><div class="icon_li"></div><span>Minha história</span></a></li>
                <li><a href="/mdcEducacional/"><div class="icon_li"></div><span>Mundo da criança</span></a></li>
            </ul>
            <%
        }
        //EF2
        else if (serie == 5 || serie == 6 || serie == 7 || serie == 8)
        {
            %>
            <ul class="clearfix">
                <li><a href="/atlas/"><div class="icon_li"></div><span>Atlas geográfico</span></a></li>
                <li><a href="/avaliacoesonline/"><div class="icon_li"></div><span>Avaliações</span></a></li>
                <li><a href="/especiais/campanhas.asp"><div class="icon_li"></div><span>Campanhas</span></a></li>
                <li><a href="/central2002/"><div class="icon_li"></div><span>Central de jogos</span></a></li>
                <li><a href="/multimidia/"><div class="icon_li"></div><span>Conteúdo multimídia</span></a></li>
                <li><a href="/desafio/"><div class="icon_li"></div><span>Desafios de lógica</span></a></li>
                <li><a href="/dicionarioaurelio/"><div class="icon_li"></div><span>Dicionário Aurélio</span></a></li>
                <li><a href="/enciclopedia/"><div class="icon_li"></div><span>Enciclopédia</span></a></li>
                <li><a href="/especiais/grandestemas.asp"><div class="icon_li"></div><span>Grandes temas</span></a></li>
                <li><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp" target="_blank"><div class="icon_li"></div><span>Home da escola</span></a></li>
                <li><a href="/linhadotempo/"><div class="icon_li"></div><span>Linha do tempo</span></a></li>
                <li><a href="/recursos/conteudomultimidia/artes/art001/"><div class="icon_li"></div><span>Museu virtual</span></a></li>
                <% if (ViewData["bolModular"].ToString() != "1") { %>
                <li><a href="/cp/oficinas/"><div class="icon_li"></div><span>Oficina do texto</span></a></li>
                <li><a href="/cp/projetos/"><div class="icon_li"></div><span>Projetos colaborativos</span></a></li>
                <% } %>
            </ul>
            <%
        }
        //EM
        else if (serie == 11 || serie == 12 || serie == 13 || serie == 14)
        {
            %>
            <ul class="clearfix">
                <li><a href="/atlas/"><div class="icon_li"></div><span>Atlas geográfico</span></a></li>
                <li><a href="/avaliacoesonline/"><div class="icon_li"></div><span>Avaliações</span></a></li>
                <li><a href="/caminhos"><div class="icon_li"></div><span>Caminhos de aprendizagem</span></a></li>
                <li><a href="/especiais/campanhas.asp"><div class="icon_li"></div><span>Campanhas</span></a></li>
                <% if (ViewData["bolModular"].ToString() != "1")
                   { %>
                <li><a href="/cp/olimpiadas/"><div class="icon_li"></div><span>Concursos</span></a></li>
                <% } %>
                <li><a href="/multimidia/"><div class="icon_li"></div><span>Conteúdo multimídia</span></a></li>
                <li><a href="/dicionarioaurelio/"><div class="icon_li"></div><span>Dicionário Aurélio</span></a></li>
                <li><a href="/enem/"><div class="icon_li"></div><span>Enem</span></a></li>
                <li><a href="/filosofia/"><div class="icon_li"></div><span>Filosofia</span></a></li>
                <li><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp" target="_blank"><div class="icon_li"></div><span>Home da escola</span></a></li>
                <li><a href="/linguaestrangeira/"><div class="icon_li"></div><span>Língua estrangeira</span></a></li>
                <li><a href="/literatura/"><div class="icon_li"></div><span>Literatura</span></a></li>
                <% if (ViewData["bolModular"].ToString() != "1")
                   { %>
                <li><a href="/cp/mostra/"><div class="icon_li"></div><span>Mostras virtuais</span></a></li>               
                <li><a href="/cp/oficinas/"><div class="icon_li"></div><span>Oficina do texto</span></a></li>
                 <% } %>
                <li><a href="http://blog.educacional.com.br/opo/"><div class="icon_li"></div><span>Orientação profissional</span></a></li>
                <% if (ViewData["bolModular"].ToString() != "1")
                   { %>
                <li><a href="/cp/projetos/"><div class="icon_li"></div><span>Projetos colaborativos</span></a></li>
                <% } %>
                <li><a href="/simuladores_new/"><div class="icon_li"></div><span>Simuladores</span></a></li>
                <li><a href="/sociologia/"><div class="icon_li"></div><span>Sociologia</span></a></li>
                <li><a href="/vestibular/"><div class="icon_li"></div><span>Vestibular</span></a></li>  
            </ul>
            <%
        }%>

<%
    }

    if (Convert.ToBoolean(ViewData["bolPai"]) && !Convert.ToBoolean(ViewData["bolEducador"]))
    {
%>
        <ul class="clearfix">
            <li><a href="/atlasch/"><div class="icon_li"></div><span>Atlas do corpo humano</span></a></li>
            <li><a href="/atlas/"><div class="icon_li"></div><span>Atlas geográfico</span></a></li>
            <li><a href="/avaliacoesonline/"><div class="icon_li"></div><span>Avaliações</span></a></li>
            <li><a href="/especiais/campanhas.asp"><div class="icon_li"></div><span>Campanhas</span></a></li>
            <li><a href="/central2002/"><div class="icon_li"></div><span>Central de jogos</span></a></li>
            <li><a href="/colunistas/"><div class="icon_li"></div><span>Colunistas</span></a></li>
            <li><a href="/multimidia/"><div class="icon_li"></div><span>Conteúdo multimídia</span></a></li>
            <li><a href="/dicionarioaurelio/"><div class="icon_li"></div><span>Dicionário Aurélio</span></a></li>
            <li><a href="/enciclopedia/"><div class="icon_li"></div><span>Enciclopédia</span></a></li>
            <li><a href="/especiais/grandestemas.asp"><div class="icon_li"></div><span>Grandes temas</span></a></li>
            <li><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp" target="_blank"><div class="icon_li"></div><span>Home da escola</span></a></li>
            <li><a href="/literatura/"><div class="icon_li"></div><span>Literatura</span></a></li>
            <li><a href="/recursos/conteudomultimidia/artes/art001/"><div class="icon_li"></div><span>Museu virtual</span></a></li>
            <li><a href="/pesquisa/"><div class="icon_li"></div><span>Pesquisa escolar</span></a></li>
        </ul>
<%      
    }   

    if (Convert.ToBoolean(ViewData["bolEducador"]))
    {
%>
        <ul class="clearfix">
            <li><a href="/avaliacoesonline/"><div class="icon_li"></div><span>Avaliações</span></a></li>
            <!-- <li><a href="/blog/wp/novaHome.asp"><div class="icon_li"></div><span>Blog</span></a></li> -->
            <li><a href="/AVA/caminhos"><div class="icon_li"></div><span>Caminhos de aprendizagem</span></a></li> 
            <li><a href="/especiais/campanhas.asp"><div class="icon_li"></div><span>Campanhas</span></a></li>
            <li><a href="/colunistas/"><div class="icon_li"></div><span>Colunistas</span></a></li>
            <% if (ViewData["bolModular"].ToString() != "1")
               { %>
            <li><a href="/cp/olimpiadas/"><div class="icon_li"></div><span>Concursos</span></a></li>
            <% } %>
            <li><a href="/multimidia/"><div class="icon_li"></div><span>Conteúdo multimídia</span></a></li>
            <% if (ViewData["bolModular"].ToString() != "1")
               { %>
            <li><a href="/cp/olimpiadas/"><div class="icon_li"></div><span>Criador de olimpíadas</span></a></li>
            <% } %>
            <li><a href="/dicionarioaurelio/"><div class="icon_li"></div><span>Dicionário Aurélio</span></a></li>
            <% if (ViewData["bolModular"].ToString() != "1")
               { %>
            <li><a href="/labtexto_new/"><div class="icon_li"></div><span>Fábrica de textos</span></a></li>
            <%} %>
            <li><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp" target="_blank"><div class="icon_li"></div><span>Home da escola</span></a></li>
            <li><a href="/linhadotempo/"><div class="icon_li"></div><span>Linha do tempo</span></a></li>
            <% if (ViewData["bolModular"].ToString() != "1")
               { %>
            <li><a href="/cp/mostra/"><div class="icon_li"></div><span>Mostras virtuais</span></a></li>
            <li><a href="/cp/oficinas/"><div class="icon_li"></div><span>Oficina do texto</span></a></li>
            <li><a href="/cp/projetos/"><div class="icon_li"></div><span>Projetos colaborativos</span></a></li>
            <% } %>
            <li><a href="/roteiros/"><div class="icon_li"></div><span>Roteiros de aula</span></a></a></li>
        </ul>
<%
    }   
%>

