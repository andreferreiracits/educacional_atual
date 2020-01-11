<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Grupo.Models.Assunto>>" %>

<li assu="0">
	<input type="radio" id="rbFiltroAssunto_0" name="cbFiltroAssuntoTimeLine" value="0" checked="checked"/>
	<label for="rbFiltroAssunto_0"><span class="FontAwesome"></span> Todos os assuntos</label>
</li>
<%
//int cont = 1;
foreach (var assunto in Model)
{
    %>
    <li assu="<%=assunto.id%>">
		<input type="radio" id="rbFiltroAssunto_<%=assunto.id%>" name="cbFiltroAssuntoTimeLine" value="<%=assunto.id%>"/>
		<label for="rbFiltroAssunto_<%=assunto.id%>" id="textoFiltroAssunto_<%=assunto.id%>"><span class="FontAwesome"></span> <%=assunto.strAssunto%></label>
	</li>
    <%
    //cont++;        
}   
%>
