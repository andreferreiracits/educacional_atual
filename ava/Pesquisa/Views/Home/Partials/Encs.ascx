<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>

<%

if (Model != null && Model.Count > 0)
    {
 %>
<h4 class="din">Enciclopédia</h4>
<div class="titulo_p_stats enc">
                    

                </div>
               
                
 <%
    foreach (var item in Model)
    {
        %>               
                <div class="verbete">
               		<h5> <a target="_new" href="/enciclopedia/renciclopedia.asp?idpag=1&id=<%:item.idPublicacao%>&strtitulo=<%:item.strTitulo%>"><%:item.strTitulo%></a></h5>
					<p><%=item.strTexto%></p>
				</div>
        <%
    }     
%>
<hr>
<%} %>