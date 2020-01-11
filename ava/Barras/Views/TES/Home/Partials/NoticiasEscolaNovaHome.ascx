<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Barras.Models.NoticiasEscola>>" %>

<script>
    function visualizar(idPublicacao, iLayout, idEscola) {
        // iLayout = 13 no caso de Galeria de Fotos.
        if (iLayout == 13) {
            window.location = "/escolas/administra/publicacao/novo/GaleriaVisualiza.asp?id=" + idPublicacao
            //ptJanelaVisualizar = window.open( "/escolas/administra/publicacao/novo/GaleriaVisualiza.asp?id=" + idPublicacao, "", "");
        } else if (iLayout == 15) {
            window.open('/escolas/mural/lenoticia.asp?id=' + idPublicacao + '&EscolaId=' + idEscola, '_blank');
        } else {
            //		if (gVersao < 5 && iLayout > 5 ){
            //			var desktop = window.open( 'lenoticiaNE.asp?id=' + idPublicacao, 'Mural');	
            //		}else{
            document.location.href = '/escolas/mural/lenoticia.asp?id=' + idPublicacao + '&EscolaId=' + idEscola;
            //		}
        }
    }
</script>

<header>
	<h4>Notícias da Escola</h4>
</header>
<div class="bloco_conteudo noticias">
    <ul>
<% 
   if (Model.Count > 0)
   {
       %>
            
       <%
       int countAux = 0;
       foreach (var item in Model)
       {
%>          
            <li class="<%=(item.strImagem.Length > 0) ? "modo-img" : "" %>">
                <a href="javascript:void(0);" onclick="visualizar(<%=item.IdPublicacao %>, <%=item.IdLayout %>, <%=item.IdEscola %>);">
                <% if (item.strImagem.Length > 0)
                   {%>
                    <img src="<%=item.strImagem %>" width="55" height="55" />
                <% } %>
                   <p><%=Server.UrlDecode(Server.UrlEncode(item.strTitulo))%></p> 
                </a>
            </li>
            
<%
           countAux++;
           if (countAux == 3)
           {
               break;
           }
           
       }
       %>
            <nav class="nav_footer" style = "display:block !important;">
				<a href="/escolas/mural/muralRedirect.asp" alt="veja mais" title="veja mais" class="opcao_vertodos">Veja mais</a>
			</nav>            
       <%
   }
   else
   {
       %>
        Nenhuma notícia encontrada.
       <%
   }
%>