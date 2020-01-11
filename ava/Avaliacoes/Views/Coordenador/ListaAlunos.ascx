<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>



    <div class="pesquisaAlunoProfessor">
        <label>
            Digite o nome do aluno:
            <input type="text" class="txtC" name="txtNomeProcurado" id="txtNomeProcuradoAluno"/>
        </label>
        <label>
            ou busque uma turma:  <a id="btnSelecionarProcurado" class="btnM">selecionar</a>
        </label>
    </div>



<div id="alunoCoordenador" class="hide">

    <div class="clear"></div>
        <div class="boxAlertaMensagemAzul">
            <div class="alertaMensagemAzul">
                <span class="SEC02511_texto">Você está filtrando os dados de: <b></b></span>
                <a href="" id="btnClearFiltro" class="btnM direita">limpar filtro</a>
            </div>
        </div>
    <div class="clear"></div>

<!-- #region Formulário da Tabela de Questao -->
<% using (Html.BeginForm("CarregarRealizacoesAlunos", "Coordenador", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" }))
{ %>
<input type="hidden" name="intIdProcurado" />
<div class="ferramentas">
	<div class="funcao">
						
		<div id="filtro" class="slc">
			<a class="nome">Filtros</a>
			<div class="opcoes filtro">
				<a class="fechar right" href="#fechar">X</a>
				<div class="frm">
					<label for="txtNome">Título:</label>
					<%= Html.TextBox("txtTitulo", "", new { maxlength = 60, @class = "txt" })%>
					<div class="clear"></div>
                    								 								 
					<label for="slcTipo">Tipo:</label>
					<%= Html.DropDownList("slcTipo", (IEnumerable<SelectListItem>)ViewData["Tipo"], new { @class = "slc" })%>
                    
					<label for="txtModificado" class="labelData">Modificado:</label>
					<%= Html.TextBox("txtRealizacaoInicial", "", new { @id = "txtRealizacaoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
					<span>a</span>
					<%= Html.TextBox("txtRealizacaoFinal", "", new { @id = "txtRealizacaoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>					                

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
<table id="tblRealizacoes" class="tabela" width="100%">
	<thead>
		<tr>
			<td class="selecionar" style="width: 20px;"></td>
			<td style="width: 310px;"><%= Html.ActionLink("Título da avaliação", "Ordenar", new { @ordem = "nome" })%></td>
			<td style="width: 180px;"><%= Html.ActionLink("Agendado Por", "Ordenar", new { @ordem = "agendadopor" })%></td>
			<td style="width: 160px;"><%= Html.ActionLink("Começa", "Ordenar", new { @ordem = "comeca" }, new { @class = "crescente" })%></td>
			<td style="width: 160px;"><%= Html.ActionLink("Termina", "Ordenar", new { @ordem = "selecao" })%></td>
			<td style="width: 100px;"><%= Html.ActionLink("Estado", "Ordenar", new { @ordem = "status" })%></td>
		</tr>
	</thead>
	<tbody></tbody>
</table>
<div class="ferramentas">
	<div class="resultado"></div>
	<div class="paginacao"></div>
</div>
<% } %>
<!-- #end region Formulário da Tabela de Questao -->
</div>












<div id="dlgAlunos" title="Procure um aluno em sua turma" class="popup SEC02511">

    <div class="clear"></div>
    <div class="boxAlertaMensagemAzul">
        <div class="alertaMensagemAzul">

            <span class="textoTurma">Nivel de ensino:<b></b>
            <%= Html.DropDownList("slcEnsinoProcurado", (IEnumerable<SelectListItem>)ViewData["NvEnsino"], new { @class = "slcTurma", @id = "slcEnsinoProcurado" })%>            
            </span>
            <span class="textoTurma">Turmas:<b></b>
                    <select id="slcTurmaProcurada" name="slcTurmaProcurada" class="slcTurma">
                        <option value="0">Sem Turmas</option>
                    </select>          
            </span>


            <!--a href="" id="btnAlterarTurma" class="btnM">alterar</a-->
        </div>
    </div>
    <div class="clear"></div>

    <div id="selcionarAluno" class="selcionarAluno">
    </div>


    <div class="clear"></div>

    <div class="popupBotoes">
        <div class="btnEspacamento">
            <a href="" id="btnCancelarAlunos" class="btnNav">Cancelar</a>
        </div>
        <div class="btnEspacamento direita">
            <a href="" id="btnSelecionarAlunos" class="btnNav">Selecionar</a>
        </div>
    </div>
</div>