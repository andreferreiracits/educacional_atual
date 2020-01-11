<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

    
<% using ( Html.BeginRouteForm("Default", new { action = "TabelaBuscaRelatorioConteudo", controller = "RelatorioNovo" }, FormMethod.Post, new { @class = "tbl novaTabela", @id="tblFormBuscaRelatorio"  })) { %>
    <div class="novofiltro novofiltroAv">
        <input type="hidden" name="novofiltro" value="1" />
        <p>Selecione uma ou mais opções abaixo para buscar por relatórios:</p>
        <div class="filtrosSimples">
            <input id="txtPalavraChave" class="txt txtPalavraChave" type="text" value="Palavra(s)-chave" title="Palavra(s)-chave" name="txtPalavraChave" maxlength="60" />
            <a id="btnBuscarRelatorio" href="javascript:void(0)"  class="filtroBuscar">Buscar</a>
        </div>
     </div>
    <div class="clear"></div>
    <div class="novofiltroTags"></div>
    <div class="clear"></div>
    <div class="ferramentas" style="display: block;" >
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
	</div>
    <div class="clear"></div>
    <table class="tabela" id="tblTabelaBuscaRelatorio">
	    <thead>
		    <tr>
			    <td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkRelatorio" name="chkRelatorio" /></td>
			    <td style="width: 40%;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "2" })%></td>
                <td style="width: 20%;"><%= Html.ActionLink("Identificador", "Ordenar", new { @ordem = "5" })%></td>
                <td style="width: 14%;"><%= Html.ActionLink("Autor", "Ordenar", new { @ordem = "4" })%></td>
			    <td style="width: 13%;"><%= Html.ActionLink("Data", "Ordenar", new { @ordem = "1" }, new { @class = "decrescente" })%></td>
                <td style="width: 15%;"><%= Html.ActionLink("Estado", "Ordenar", new { @ordem = "3" })%></td>
		    </tr>
	    </thead>
		<tbody>
            <tr class="vazio">
                <td colspan="6">Selecione uma ou mais opções acima para buscar por relatórios.</td>
            </tr>
        </tbody>
    </table>
    <div class="ferramentas">
		<div class="resultado"></div>
		<div class="paginacao"></div>
	</div>
<% } %>