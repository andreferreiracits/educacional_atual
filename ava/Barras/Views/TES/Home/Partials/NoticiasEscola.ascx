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

<% 
   if (Model.Count > 0)
   {
       %>
            
       <%
       int countAux = 0;
       foreach (var item in Model)
       {
%>          
            <li class="clearfix">
                <a href="javascript:void(0);" onclick="visualizar(<%=item.IdPublicacao %>, <%=item.IdLayout %>, <%=item.IdEscola %>);">
                <% if (item.strImagem.Length > 0)
                   {%>
                    <img src="<%=item.strImagem %>" width="54" height="54" />
                <% } %>

                <%
           if (item.dtmReal.Length > 0)
           {

               DateTime dataConvert = Convert.ToDateTime(item.dtmReal);
	           string format = "dd/MM/yyyy";
               
                     %>
                        <p class="discreto"><%=dataConvert.ToString(format)%></p>
                  <%}%>
                    <h3><%=Server.UrlDecode(Server.UrlEncode(item.strTitulo))%></h3> 
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
            <footer><a alt="veja mais" title="veja mais" class="bt_normal action_noticias_escola" href="/escolas/mural/muralRedirect.asp">veja mais</a></footer>
       <%
   }
   else
   {
       %>
        Nenhuma notícia encontrada.
       <%
   }
%>