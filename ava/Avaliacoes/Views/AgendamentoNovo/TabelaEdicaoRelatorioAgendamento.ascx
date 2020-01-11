<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>


    <% using ( Html.BeginRouteForm("Default", new { action = "TabelaEdicaoRelatorioAgendamentoConteudo", controller = "AgendamentoNovo" }, FormMethod.Post, new { @class = "tbl novaTabela", @id="tblFormRelatorioEdicao"  })) { %>
<%--    <% Html.RenderPartial("NovoFiltroCadastro"); %>--%>
    <div class="clear"></div>
<%--    <div class="ferramentas hide">
        <div class="funcao">
			<div id="acao" class="slc">
				<a class="nome">Ações</a>
                <div class="opcoes acao" style="display: none;">
                    <%= Html.ActionLink("Excluir", "Excluir", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
                </div>
			</div>
		</div>
        <div class="filtros"></div>
		<div class="paginacao"></div>
	</div>--%>
	<div class="clear"></div> 
	<table class="tabela" id="tblTableRelatorioEdicao">
		<thead>
			<tr>
                <td class="selecionar" style="width: 20px;">
                    <%--<input type="checkbox" id="chkRelatorioAgendamentoEdicao" name="chkRelatorioAgendamentoEdicao" />--%>
                </td>
				<td style="width: 400px;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "2" })%></td>
				<td style="width: 255px;"><%= Html.ActionLink("Período", "Ordenar", new { @ordem = "1" }, new { @class = "decrescente" })%></td>
			</tr>
		</thead>
		<tbody>
            <tr class="vazio">
                <td colspan="5">Nenhum agendamento selecionado.</td>
            </tr>
        </tbody>
	</table>
	<div class="ferramentas">
		<div class="resultado"></div>
		<div class="paginacao"></div>
	</div>
<% } %>