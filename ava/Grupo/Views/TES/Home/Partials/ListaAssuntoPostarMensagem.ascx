<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Grupo.Models.Assunto>>" %>

<%
bool bolMediador = Convert.ToBoolean(ViewData["bolMediador"]);
int cont = 0;
foreach (var assunto in Model)
{                            
    %>
    <li>
		<input type="radio" id="rbAssuntoMensagem_<%=cont%>" name="rbAssuntoMensagem" value="<%=assunto.id%>"/>
		<label for="rbAssuntoMensagem_<%=cont%>"><span class="FontAwesome"></span> <%=assunto.strAssunto%></label>
	</li>
    <%
    cont++;        
} 

if(bolMediador) {  
%>
<li class="li_criar_editar_assunto">
    <a class="criar_editar_assunto fancy" href="javascript:void(0);"><span class="fontello"></span> Criar e Editar</a>
</li>
<% } %>   
