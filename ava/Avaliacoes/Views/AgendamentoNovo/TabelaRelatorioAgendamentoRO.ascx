<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>


    <% using ( Html.BeginRouteForm("Default", new { action = "TabelaRelatorioAgendamentoROConteudo", controller = "AgendamentoNovo" }, FormMethod.Post, new { @class = "tbl novaTabela", @id="tblFormRelatorioRO"  })) { %>
<%--    <% Html.RenderPartial("NovoFiltroCadastro"); %>--%>
        <input type="hidden" name="AgendamentosConfig" value="<%:ViewData["AgendamentosConfig"] %>" />
<%--	<div class="ferramentas hide">
		<div class="funcao">
			<div id="acao" class="slc">
				<a class="nome">Ações</a>
				<div class="opcoes acao">
					<%--<%= Html.ActionLink("Excluir", "ExcluirAplicacao", "Agendamento", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%> -- %>
				</div>
			</div>
		</div>
		<div class="filtros"></div>
		<div class="paginacao"></div>
	</div>--%>
	<div class="clear"></div> 
	<table class="tabela" id="tblTableRelatorioRO">
		<thead>
			<tr>
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