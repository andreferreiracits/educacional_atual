<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<int>" %>


    <% using ( Html.BeginRouteForm("Default", new { action = "TabelaBuscaRelatorioAgendamentoConteudo", controller = "AgendamentoNovo" }, FormMethod.Post, new { @class = "tbl novaTabela", @id="tblFormRelatorio"  })) { %>
        <input type="hidden" name="idBanco" value="<%=Model %>" />
        <div class="areaBuscaProvas">
            <div class="linhaPar">
                <label for="txtNomeBusca" class="SEC02511_texto">Titulo do agendamento:</label>
                <input type="text" id="txtNomeBusca" name="txtNomeBusca" class="txt" />
            </div>
            <%--<div class="linhaImpar">
                <label for="txtIdentificadorBusca" class="SEC02511_texto">Identificador:</label>
                <input type="text" id="txtIdentificadorBusca" name="txtIdentificadorBusca" class="txt" />
            </div>--%>
            <div class="linhaPar">
                <span class="SEC02511_texto">Data da realização:</span>
                    
				<%= Html.TextBox("txtModificadoBuscaInicial", "", new { @id = "txtModificadoBuscaInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
				<div class="txtMenor">até</div>
				<%= Html.TextBox("txtModificadoBuscaFinal", "", new { @id = "txtModificadoBuscaFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>

                <div class="btnBuscar">
                        <a id="btnBuscarAgendamento" href="javascript:void(0)" class="btnM"><span class="lupa"></span>Pesquisar</a>
                </div>
            </div>
        </div>
	<div class="ferramentas hide">
		<%--<div class="funcao">
			<div id="acao" class="slc">
				<a class="nome">Ações</a>
				<div class="opcoes acao">
					<%--<%= Html.ActionLink("Excluir", "ExcluirAplicacao", "Agendamento", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%> -- %>
				</div>
			</div>
		</div>--%>
		<div class="filtros"></div>
		<div class="paginacao"></div>
	</div>
	<div class="clear"></div> 
	<table class="tabela scroll" id="tblTableRelatorio">
		<thead>
			<tr>
				<td style="width: 400px;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "2" })%></td>
				<td style="width: 255px;"><%= Html.ActionLink("Período", "Ordenar", new { @ordem = "1" }, new { @class = "decrescente" })%></td>
			</tr>
		</thead>
		<tbody>
            <tr class="vazio">
                <td colspan="5">Selecione uma ou mais opções acima para buscar por agendamentos.</td>
            </tr>
        </tbody>
	</table>
	<div class="ferramentas">
		<div class="resultado"></div>
		<div class="paginacao"></div>
	</div>
<% } %>