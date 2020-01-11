<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RecursoEtapaLink>>" %>

<%
if (Model.Count > 0)
{
    %>
    <%
    foreach (var link in Model)
    {
        %>
			<div id="previewLinkTarefas" class="anexo_preview anx_link">
				<a id="idTarefaLink" target="_blank" href="<%=link.strLink%>" class="anx_dado"><%=link.strTitulo%></a>
				<a id="<%=link.idLink%>" href="javascript:void(0);" class="btn_acao opcao_excluir" onclick="removerLinkApoio(<%=link.idLink%>)"></a>  
			</div>
        <%
    }
}
%>