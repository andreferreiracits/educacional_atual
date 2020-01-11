<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<!-- #region Formulário da Tabela das questões -->
<% using (Html.BeginForm("CarregarQuestoesCorrecao", "Correcao", FormMethod.Post, new { @id = "frmTabelaQuestoes", @class = "tbl" }))
{ %>
<div class="ferramentas">
	<div class="funcao">
		<div id="filtro" class="slc">
			<a class="nome">Filtros</a>
			<div class="opcoes filtro">
				<a class="fechar right" href="#fechar">X</a>
				<div class="frm">

					<label for="txtEnunciado">Enunciado:</label>
					<%= Html.TextBox("txtEnunciado", "", new { maxlength = 60, @class = "txt" })%>

					<div class="clear"></div>

					<label for="txtNomeAutor">Autor:</label>
					<%= Html.TextBox("txtNomeAutor", "", new { maxlength = 60, @class = "txt" })%>
									
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
<table id="tblQuestoes" class="tabela">
	<thead>
		<tr>
			<td style="width:400px;"><%= Html.ActionLink("Enunciado", "Ordenar")%></td>
			<td style="width:110px;"><%= Html.ActionLink("Autor", "Ordenar", new { @ordem = "autor" }, new { @class = "crescente" })%></td>
            <td style="width:110px;"><%= Html.ActionLink("Respostas Pendentes", "Ordenar")%></td>
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

