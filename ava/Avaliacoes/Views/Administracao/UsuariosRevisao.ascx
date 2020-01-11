<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.BancoQuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.Models" %>

<div class="areaConfiguracao">
<%  
    using (Html.BeginForm("UsuariosBanco", "Administracao", FormMethod.Post, new { @id = "frmUsuariosBanco" }))
    {
%>
<%  } %>

<%  
    using (Html.BeginForm("CarregarUsuariosQuestao", "Administracao", FormMethod.Post, new { @id = "frmUsuariosQuestao" }))
    {
%>
   <div class="areaConfiguracoesAdministracao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Adicionar usuários questão</div>
            <div class="textoDivisao">Realize uma busca para encontrar os usuários que terão acesso a este banco.</div>
        </div>

        <% Html.RenderPartial(Model.viewSearchUsuarioQuestao); %>

    </div>
    <div class="ferramentas">
		<div class="funcao">
			<div class="slc acaotabela">
				<a class="nome">Ações</a>
				<div class="opcoes acao">
					<%= Html.ActionLink("Excluir", "ExcluirPermissao", "Administracao", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
				</div>
			</div>
		</div>
	</div>
	<table id="tblUsuariosQuestao" class="tabela" width="100%">
		<thead>
			<tr>
				<td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkUsuariosQuestao" name="chkUsuariosQuestao" /></td>
				<td>Nome</td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkQuestaoCadastro" name="chkQuestaoCadastro" /> Cadastrador</td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkQuestaoRevisor" name="chkQuestaoRevisor" /> Revisor</td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkQuestaoPublicar" name="chkQuestaoPublicar" /> Editor</td>
			</tr>
		</thead>
		<tbody></tbody>
	</table>

<% } %>
<%  
    using (Html.BeginForm("CarregarUsuariosProva", "Administracao", FormMethod.Post, new { @id = "frmUsuariosProva" }))
    {
%>
    <div class="areaConfiguracoesAdministracao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Adicionar usuários prova</div>
            <div class="textoDivisao">Realize uma busca para encontrar os usuários que terão acesso a este banco.</div>
        </div>

        <% Html.RenderPartial(Model.viewSearchUsuarioProva); %>

    </div>

    <div class="ferramentas">
		<div class="funcao">
			<div class="slc acaotabela">
				<a class="nome">Ações</a>
				<div class="opcoes acao">
					<%= Html.ActionLink("Excluir", "ExcluirPermissao", "Administracao", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
				</div>
			</div>
		</div>
	</div>
	<table id="tblUsuariosProva" class="tabela" width="100%">
		<thead>
			<tr>
				<td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkUsuariosProva" name="chkUsuariosProva" /></td>
				<td>Nome</td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkProvaCadastro" name="chkProvaCadastro" /> <label>Cadastrador</label></td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkProvaRevisor" name="chkProvaRevisor" /> <label>Revisor</label></td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkProvaPublicar" name="chkProvaPublicar" /> <label>Editor</label></td>
			</tr>
		</thead>
		<tbody></tbody>
	</table>

<% } %>
<%  
    using (Html.BeginForm("CarregarUsuariosAplicacao", "Administracao", FormMethod.Post, new { @id = "frmUsuariosAplicacao" }))
    {
%>
    <div class="areaConfiguracoesAdministracao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Adicionar usuários aplicação</div>
            <div class="textoDivisao">Realize uma busca para encontrar os usuários que terão acesso a este banco.</div>
        </div>

        <% Html.RenderPartial(Model.viewSearchUsuarioAplicacao); %>

    </div>

    <div class="ferramentas">
		<div class="funcao">
			<div class="slc acaotabela">
				<a class="nome">Ações</a>
				<div class="opcoes acao">
					<%= Html.ActionLink("Excluir", "ExcluirPermissao", "Administracao", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
				</div>
			</div>
		</div>
	</div>
	<table id="tblUsuariosAplicacao" class="tabela" width="100%">
		<thead>
			<tr>
				<td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkUsuariosAplicacao" name="chkUsuariosAplicacao" /></td>
				<td>Nome</td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkAplicacaoCadastro" name="chkAplicacaoCadastro" /> <label>Cadastrador</label></td>
				<td class="selecionarCabecalho"><input type="checkbox" id="chkAplicacaoPublicar" name="chkAplicacaoPublicar" /> <label>Editor</label></td>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
<% } %>

    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Administracao", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarUsuario" class="btnNav">&laquo; Voltar</a>
            <a id="btnAvancarUsuario" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>
</div>
