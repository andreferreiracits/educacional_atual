<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.BancoQuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.TabelaViews"%>
<%@ Import Namespace="ProvaColegiada.Models" %>

<div class="divisaoQuestao">
    <div class="tituloDivisao">Usuários Questão</div>
    <div class="textoDivisao">Usuários que terão acesso ao banco</div>
    <a class="btn direita btnConfirmacaoEditarUsuario" >Editar</a>
</div>

<table id="tblPermissaoQuestao" class="tabela" cellpadding="0" cellspacing="0" border="0">
	<thead>
		<tr>
			<td>Nome</td>
			<td class="selecionarCabecalho">Cadastrador</td>
			<td class="selecionarCabecalho">Revisor</td>
			<td class="selecionarCabecalho">Editor</td>
		</tr>
	</thead>
	<tbody>
    <% foreach (UsuariosPermissaoVOView usuario in Model.UsuariosQuestao)
        {  %>
        <tr>
			<td><%=usuario.Nome %></td>
			<td class="<%=usuario.ResumoCadastrarQuestao%>"></td>
			<td class="<%=usuario.ResumoRevisarQuestao%>"></td>
			<td class="<%=usuario.ResumoPublicarQuestao%>"></td>
		</tr>
    <% } %>
    </tbody>
</table>

<div class="divisaoQuestao">
    <div class="tituloDivisao">Usuários Prova</div>
    <div class="textoDivisao">Usuários que terão acesso ao banco</div>
    <a class="btn direita btnConfirmacaoEditarUsuario" >Editar</a>
</div>

<table id="tblPermissaoProva" class="tabela" cellpadding="0" cellspacing="0" border="0">
	<thead>
		<tr>
			<td>Nome</td>
			<td class="selecionarCabecalho">Cadastrador</td>
			<td class="selecionarCabecalho">Revisor</td>
			<td class="selecionarCabecalho">Editor</td>
		</tr>
	</thead>
	<tbody>
    <% foreach (UsuariosPermissaoVOView usuario in Model.UsuariosProva)
        {  %>
        <tr>
			<td><%=usuario.Nome %></td>
			<td class="<%=usuario.ResumoCadastrarProva%>"></td>
			<td class="<%=usuario.ResumoRevisarProva%>"></td>
			<td class="<%=usuario.ResumoPublicarProva%>"></td>
		</tr>
    <% } %>
    </tbody>
</table>

<div class="divisaoQuestao">
    <div class="tituloDivisao">Usuários Aplicação</div>
    <div class="textoDivisao">Usuários que terão acesso ao banco</div>
    <a class="btn direita btnConfirmacaoEditarUsuario" >Editar</a>
</div>

<table id="tblPermissaoAplicacao" class="tabela" cellpadding="0" cellspacing="0" border="0">
	<thead>
		<tr>
			<td>Nome</td>
			<td class="selecionarCabecalho">Cadastrador</td>
			<td class="selecionarCabecalho">Editor</td>
		</tr>
	</thead>
	<tbody>
    <% foreach (UsuariosPermissaoVOView usuario in Model.UsuariosAplicacao)
        {  %>
        <tr>
			<td><%=usuario.Nome %></td>
			<td class="<%=usuario.ResumoCadastrarAplicacao%>"></td>
			<td class="<%=usuario.ResumoPublicarAplicacao%>"></td>
		</tr>
    <% } %>
    </tbody>
</table>