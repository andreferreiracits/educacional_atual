<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVAEventoTipo>>" %>




	<h3>Tipos de eventos cadastrados</h3>
    <%
        if (Model.Count > 0)
        {    
    %>
	<ul>
    <%
            foreach (var item in Model)
            {
        %>
		<li>
			<span class="bullet_cor" style="background-color:#<%=item.strRGB%>;"></span>
			<span><%=item.strTipo%></span>
			<a href="javascript:void(0);" title="editar" class="editar_evento_agenda" onclick="selecionaTipoEvento(<%=item.idTipo%>, <%=item.idCor%>)">&nbsp;</a>
            <input type="hidden" id="strTipoHidden<%=item.idTipo%>" value="<%=item.strTipo%>" />
			<a href="javascript:void(0);" title="excluir" class="excluir_evento_agenda" onclick="excluirTipoEvento(<%=item.idTipo%>)">&nbsp;</a>
		</li>
        <%  } %>

	</ul>
    <%
        }
        else
        {
    %>
        Nenhum tipo de evento criado.
    <%} %>