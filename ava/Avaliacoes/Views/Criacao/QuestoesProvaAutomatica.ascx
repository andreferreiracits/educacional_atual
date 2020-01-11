<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

<div class="areaTabelaQuestoes" id="QuestoesProvaAutomatica">
<%  using (Html.BeginForm("CarregarCriteriosProva", "Criacao", FormMethod.Post, new { @id = "frmTabelaCriterios", @class = "tbl" }))
	{ %>

	<%= Html.Hidden("txtIdProvaCriterio", Model.Id)%>
	<div class="areaTabelaQuestoes">
		<div class="btnEsq">
			<a id="btnIncluirCriterio" class="btnM">critérios de busca</a>
		</div>
	</div>
	
	<div class="clear"></div>
	
	<div class="ferramentas">
		<div class="funcao">
			<div id="acao" class="slc">
				<a class="nome">Ações</a>
				<div class="opcoes acao">
					<%= Html.ActionLink("Excluir", "ExcluirCriterioProva", new { acao = "apagar" }, new { @id = "apagarcriterio", @class = "opcao" })%>
				</div>
			</div>
            <div class="slc ferragrupamento">
                <a class="nome">Agrupamento</a>
                <div class="opcoes agrupamento">
                    <table id="tblAgrupamentoCriterio" class="tabela tblAgrupamentoCriterio" width="100%"  cellspacing="0" border="0" cellpadding="0">
                    <tbody></tbody>
                    </table>
                    <%= Html.ActionLink("Criar um novo agrupamento", "NovoGrupo", new { acao = "novogrupo" }, new { @class = "opcao novogrupo" })%>

                </div>
            </div>
		</div>
		<!--div class="paginacao"></div-->
        <a id="helpLisQuestaoAvaliacao" class="btn sec_ferramenta" href="javascript:void(0)">?</a>
	</div>
	<div class="clear"></div>
	<table id="tblCriterios" class="tabela" width="100%">
		<thead>
			<tr>
                <td style="width: 5px; " class="bordaGrupo"></td>
				<td class="selecionar" style="width: 20px; "><input type="checkbox" id="chkCriterio" name="chkCriterio" /></td>
				<td style="width:190px"><%= Html.ActionLink("Critério", "Ordenar")%></td>
				<td style="width:170px"><%= Html.ActionLink("Questões Encontradas", "Ordenar", new { @ordem = "encontradas" })%></td>
				<td style="width:175px"><%= Html.ActionLink("Quantidade Selecionada", "Ordenar", new { @ordem = "selecionada" })%></td>
				<td style="width:160px" class="centro"><%= Html.ActionLink("Valor", "Ordenar", new { @ordem = "valor" })%></td>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
<%  } %>
    <div class="areaTabelaQuestoes <%=Model.HideQuestoesProvaAutomatica %>" id="QuestoesProvaManual">


        <div class="divisaoQuestao">
            <div class="tituloDivisao">Forma de sorteio das questões</div>
            <div class="textoDivisao">As questões serão sorteadas já ou quando os alunos acessarem a prova?</div>
        </div>
        <%-- 
            if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal == EnumTipoPortal.Positivo)
            {
                Html.RenderPartial("OpcaoGerarProvaAutomaticaPP");
            }
            else
            { --%>
                <%  Html.RenderPartial("OpcaoGerarProvaAutomatica"); %>
        <%--    }
        --%>
        <div class="clear"></div>
        <div id="BoxQuestoesProvaAutomatica">
        <% Html.RenderPartial("QuestoesProvaSelecionadas", Model); %>
        </div>
    </div>

	<div class="navegacaoBotoes">
		<div class="btnEspacamento">
			<%= Html.ActionLink("Cancelar", "Index", "Criacao", new { @id = "btnCancelar", @class = "btnCancelar" })%>
		</div>
		<div class="btnEspacamento direita">
			<a id="btnVoltarQuestoes" class="btnNav">&laquo; Voltar</a>
			<a id="btnAvancarQuestoes" class="btnNav">Avançar &raquo;</a>
		</div>
	</div>
    
	
	<div id="dlgCriterioBusca" title="Pesquise por um critério" class="popup SEC02511">
		<div class="popupConteudo">
			<div class="popTitulo">Selecione os critérios de classificação para compor a avaliação.</div>

            <% foreach (string formstr in Model.ContentBuscaCriterio)
            {
                Html.RenderPartial(formstr);
            }%>
			<div class="clear"></div>
			<div class="popupBotoes pBtnCriacao">
				<div class="btnEspacamento">
					<a id="btnCancelarCriterioBusca" href="javascript:void(0)"class="btnNav">Cancelar</a>
				</div>
				<div class="btnEspacamento direita">
					<%= Html.ActionLink("Adicionar", "AdicionarCriterioBusca", "Admin", new { @id = "btnAdicionarBuscaCriterio", @class = "btnNav" })%>
				</div>
			</div>
		</div>

	</div>

    <% Html.RenderPartial("Grupo/DlgNovoGrupo"); %>
	
</div>
