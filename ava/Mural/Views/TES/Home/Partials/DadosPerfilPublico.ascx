<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MainPerfilPublico>" %>

<%
    string strFoto = Model.strFoto;
    string strNome = Model.strNome;
%>
    <nav class="aes1">
        <header>
            <img src="http://www.educacional.com.br<%=strFoto %>" width="170" height="170" alt="Foto do <%=strNome %>">
            <h1><%=strNome %></h1>
            <h2></h2>
        </header>
        <ul>
            <li class="current"><a href="#"><div class="icon_li mural"></div> Mural</a></li>
            <li><a href="#"><div class="icon_li info_"></div> Informa&ccedil;&otilde;es</a></li>
            <li><a href="#"><div class="icon_li mensa"></div> Mensagens</a></li>
            <li><a href="#"><div class="icon_li port_"></div> Portfolio</a></li>
            <li><a href="#"><div class="icon_li blog_"></div> Blog</a></li>
            <li><a href="#"><div class="icon_li conqu"></div>Conquistas</a></li>
            <li><a href="#"><div class="icon_li secre"></div>Secretaria</a></li>

        </ul>
    </nav>

