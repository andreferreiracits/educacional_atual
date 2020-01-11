<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<%
    using (Html.BeginForm("SalvarQuestao", "Questoes", FormMethod.Post, new { @id = "frmSalvarEstrutura" }))
    {
        %>
        <input type="hidden" id="strPathFiles" value="<%=Model.CaminhoUpload %>" />
        <div class="areaConfiguracoesQuestao esp_passo1">
            <%= Html.Hidden("intTipoQuestao", Model.TipoResposta.Id)%>
		</div>
		<div class="areaEnunciado">
			<div id="areaEnunciadoBase">
				<% Html.RenderPartial(Model.BoxEnunciadoBase, Model); %>
                <%
                    if (!Model.IncluirQuestaoPai)
                    {
                        %>
                        <p class="avisoBaseFluxo">Para revisar ou editar o enunciado base, busque-o na sua lista de questões e clique na opção que deseja.</p>
                        <%
                    }
                %>
			</div>
			<div class="divisaoQuestao">
				<h2 class="tituloDivisao">Enunciado <span class="obrigatorio">*</span></h2>
				<span class="textoDivisao">Digite o enunciado da questão no campo abaixo.</span>
                <a id="helpCadEnunQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
                <%
                    if (Model.IncluirQuestaoPai)
                    {
                        %>
                        <%=Html.ActionLink("Enunciado Base", "AdicionarQuestaoPai", "Questoes", new { @id = "btnQuestaoPai", @class = "btn direita btnQuestaoPai" })%>
                        <%
                    }
                %>
			</div>
			<div id="areaEnunciado"><% Html.RenderPartial(Model.EnunciadoView, Model.Enunciado); %></div>
		</div>
		<!-- Área com as respostas após selecionar -->
		<div id="areaRespostas" class="areaRespostas">
		<%
			if (Model.Alternativas != null)
			{
				Html.RenderPartial(Model.TipoRespostaView.ViewEstrutura, Model);
			}
			else
			{
				Html.RenderPartial(Model.TipoRespostaView.ViewEstrutura);
			}
		%>
		</div>
		<div class="navegacaoBotoes">
			<div class="btnEspacamento">
				<%= Html.ActionLink("Cancelar", "Index", "Admin", new { @id = "btnCancelar", @class = "btnCancelar" })%>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnVoltar" class="btnNav">&laquo; Voltar</a>
				<a id="btnAvancar" class="btnNav">Avançar &raquo;</a>
			</div>
		</div>
        <%
    }
%>

<div id="dlgQuestaoPai" title="Associar enunciado base" class="popup SEC02511">
    <div class="popupConteudo">
        <p>Selecione uma questão base:</p>
        <%
            using (Html.BeginForm("CarregarQuestaoPai", "Questoes", FormMethod.Post, new { @id = "frmTabelaQuestaoPai", @class = "tbl" }))
            {
                %>                
                <% Html.RenderPartial("../Questoes/Estrutura/NovoFiltro"); %>
                <div class="ferramentas hide">
					<div class="funcao">
						<!--% Html.RenderPartial("../Questoes/Estrutura/oldFiltro"); %-->
                    </div>
					<div class="filtros"></div>
					<div class="paginacao"></div>
				</div>
				<div class="clear"></div>
			    <table id="tblQuestoesPai" class="tabela scroll scrollVisualizarEnunciadoBase">
				    <thead>
					    <tr> 
						    <td style="width: 473px; padding-left:10px;" colspan="2"><%= Html.ActionLink("Enunciado", "Ordenar", new { @ordem = "enunciado" }, new { @class = "crescente" })%></td>
						    <td style="width: 114px;"><%= Html.ActionLink("Autor", "Ordenar", new { @ordem = "autor" })%></td>
						    <td style="width: 161px;"><%= Html.ActionLink("Modificado", "Ordenar", new { @ordem = "modificado" })%></td>
						    <td style="width: 107px;"><%= Html.ActionLink("Identificador", "Ordenar", new { @ordem = "identificador" })%></td>
					    </tr>
				    </thead>
				    <tbody></tbody>
			    </table>
			    <div class="ferramentas">
				    <div class="resultado"></div>
				    <div class="paginacao"></div>
			    </div>
                <%
            }
        %>
    </div>
	<div class="popupBotoes">
		<div class="btnEspacamento">
			<a id="btnCancelarQuestaoPai" class="btnNav">Cancelar</a>
		</div>
		<div class="btnEspacamento direita">
			<a id="btnNovaQuestaoPai" class="btnNav">Novo</a>
		</div>
	</div>
</div>

<div id="dlgCriarQuestaoPai" title="Enunciado base" class="popup SEC02511">
<%
    using (Html.BeginForm("CarregarQuestaoPai", "Questoes", FormMethod.Post, new { @id = "frmCriarQuestaoPai" }))
	{
        %>
		<div id="alertaQuestaoPai" class="mensagem comBotao"></div>
		<div class="popupConteudo">
			<p>Crie o enunciado base:</p>
			<div id="areaCriarQuestaoPai">
			</div>
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarCriarQuestaoPai" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnSalvarCriarQuestaoPai" class="btnNav">Salvar</a>
			</div>
		</div>
        <%
    }
%>
</div>

