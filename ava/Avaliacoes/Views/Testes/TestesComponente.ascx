<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
teste recursos
<h3>Javascript</h3>
<p>
<b>Caminho padrão:</b>
<%=Html.ConteudoPath("Scripts/jquery-1.7.min.js") %>
<script src="<%=Html.ConteudoPath("Scripts/jquery-1.7.min.js") %>" type="text/javascript"></script>
</p>
<p>
<b>Caminho plugin:</b>
<%=Html.ConteudoPath("TesteComp", "Scripts/teste.js")%>
 <script src="<%=Html.ConteudoPath("TesteComp", "Scripts/teste.js") %>" type="text/javascript"></script>
</p>

<h3>CSS</h3>
<p>
<b>Caminho padrão:</b>
<%=Html.ConteudoPath("Content/css/principal.css")%>
<link href="<%=Html.ConteudoPath("Content/css/principal.css") %>" rel="stylesheet" type="text/css" />
</p>
<p>
<b>Caminho plugin:</b>
<%=Html.ConteudoPath("TesteComp", "Content/css/teste.css")%>
<link href="<%=Html.ConteudoPath("TesteComp", "Content/css/teste.css") %>" rel="stylesheet" type="text/css" />
</p>



<h3>Imagem</h3>
<p>
<b>Caminho padrão:</b>
<%=Html.ConteudoPath("Content/imgcss/balaoSugestao.png")%>
<img src="<%=Html.ConteudoPath("Content/imgcss/balaoSugestao.png")%>" />
</p>
<p>
<b>Caminho plugin:</b>
<%=Html.ConteudoPath("TesteComp", "Content/teste/calendar.gif")%>
<img src="<%=Html.ConteudoPath("TesteComp","Content/teste/calendar.gif")%>" />
</p>




