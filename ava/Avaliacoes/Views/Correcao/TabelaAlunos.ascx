<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<!-- #region Formulário da Tabela das questões -->
<% using (Html.BeginForm("CarregarAlunosCorrecao", "Correcao", FormMethod.Post, new { @id = "frmTabelaAlunos", @class = "tbl" }))
{ %>
<div class="ferramentas">
	<div class="funcao">
		<div id="filtro" class="slc">
			<a class="nome">Filtros</a>
			<div class="opcoes filtro">
				<a class="fechar right" href="#fechar">X</a>
				<div class="frm">

					<label for="txtNomeAluno">Aluno:</label>
					<%= Html.TextBox("txtNomeAluno", "", new { maxlength = 60, @class = "txt" })%>

					<div class="clear"></div>

					<label for="txtNomeGrupo">Grupo:</label>
					<%= Html.TextBox("txtNomeGrupo", "", new { maxlength = 60, @class = "txt" })%>
									
					<div class="clear"></div>
									
									
				</div>
				<div class="botoes">
					<input type="button" id="btnCancelar" class="btn fechar left" value="Cancelar" />
					<input type="button" id="btnFiltrar" class="btn executar right" value="Filtrar" />
				</div>
			</div>
		</div>
	</div>
	<div class="filtros"></div>
	<div class="paginacao"></div>
</div>
<div class="clear"></div>
<table id="tblAlunos" class="tabela">
	<thead>
		<tr>
			<td style="width:290px;"><%= Html.ActionLink("Aluno", "Ordenar", new { @ordem = "aluno" })%></td>
			<td style="width:110px;"><%= Html.ActionLink("Grupo", "Ordenar", new { @ordem = "grupo" })%></td>
            <td style="width:110px;"><%= Html.ActionLink("Questoes Pendentes", "Ordenar")%></td>
		</tr>
	</thead>
	<tbody></tbody>
</table>
<div class="ferramentas">
	<div class="resultado"></div>
	<div class="paginacao"></div>
</div>
<% } %>
<!-- #end region Formulário da Tabela de Aplicacao -->

