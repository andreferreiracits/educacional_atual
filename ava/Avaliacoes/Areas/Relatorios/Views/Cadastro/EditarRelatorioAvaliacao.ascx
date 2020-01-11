<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.RelatorioAgendamentoAvaliacaoView>" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>


<div class="areaRelatorio">
    <div class="areaConfiguracoesRelatorio">
        <form id="frmAuxiliarRelatorio">
            <input type="hidden" name="AgendamentosConfig" value="<%: String.Join(",", Model.AgendamentosConfig) %>" />
            <input type="hidden" name="AgendamentosId" />
        </form>


        <% using (Html.BeginForm("Salvar", "Cadastro", FormMethod.Post, new { @id = "frmEstruturaRelatorio" })) { %>

        <input type="hidden" name="Id" value="<%: Model.Id %>"/>
                
        <input type="hidden" name="CodigoOrigem" value="<%: Model.CodigoOrigem %>"/>

        <!--input type="hidden" name="Tipo" value="1"/-->
        <input type="hidden" name="IdBanco" value="<%: Model.IdBanco %>""/>
        <input type="hidden" name="Estado" value="2" /> 
        
        <%foreach ( var item in Model.AgendamentosConfig ) { %>
            <input type="hidden" name="AgendamentosConfig" value="<%:item%>" />
        <%} %>

        <div class="divisaoTopicos">
            <div class="tituloDivisao">Configurações</div>
            <div class="textoDivisao"> Informe os dados básicos do relatório. </div>
        </div>

        <div class="linhaImpar">
            <div class="SEC02511_texto alinhamento">Finalidade do relatorio:</div>
            <div class="dadosCriacao">
                
                    <label><input name="Tipo" type="radio" value="<%=Avaliacoes.Servicos.Relatorios.Imp.TipoRelatorio.AgendamentoAvaliacao.Id%>" checked="checked" /> Avaliação</label>
                    <label><input name="Tipo" type="radio" value="<%=Avaliacoes.Servicos.Relatorios.Imp.TipoRelatorio.AgendamentoPesquisaOpiniao.Id%>" <%= Model.JaCadastrado ? "disabled=\"disabled\"" : "" %> />Pesquisa de Opinião</label>
            </div>
        </div>

        <div class="linhaImpar">
            <span class="SEC02511_texto">Título: <span class="obrigatorio">*</span></span>
            <label><input type="text" id="txtTituloRelatorio" name="Titulo" class="txt" maxlength="80" value="<%: Model.Titulo %>" /></label>
        </div>
        <div class="linhaPar">
            <span class="SEC02511_texto">Identificador:</span>
            <label><input type="text" id="txtIdentificadorRelatorio" name="Identificador" class="txt" maxlength="80" value="<%: Model.Identificador %>" /></label>
        </div>
        <div class="linhaImpar">
            <span class="SEC02511_texto">Compartilhamento:</span>
            <label>
                <%= Html.RadioButton("Compartilhamento", (int)EnumCompartilhamento.Privada, Model.IsChecked(EnumCompartilhamento.Privada), new { id="rdoCompartilhamentoNao" }) %>
                Privada
            </label>
            <label>
                <%= Html.RadioButton("Compartilhamento", (int)EnumCompartilhamento.Escola, Model.IsChecked(EnumCompartilhamento.Escola), new { id = "rdoCompartilhamentoNao" })%>
                Compartilhada com professores da minha escola
            </label>
        </div>
        <div class="divisaoTopicos">
            <div class="tituloDivisao">Agendamento(s)</div>
            <div class="textoDivisao"> Selecione o(s) agendamento(s) que deseja gerar o relatório. </div>
        </div>
        <div id="caixaAdicionar" class="destaqueAzul">
            <label>Selecione um agendamento:</label>
            <a class="btnAdicione" id="btnAddAgendamentoRelatorio"> <span class="btnCriar"></span> procurar agendamentos </a>
        </div>
        <%} %>
        <div class="clear"></div>
        <% Html.RenderPartial("../AgendamentoNovo/TabelaEdicaoRelatorioAgendamento"); %>
    </div>
</div>


<div id="dlgSelecionarAgendamento" title="Pesquise por agendamentos" class="popup SEC02511">
    <div class="popupConteudo">
        <% Html.RenderPartial("../AgendamentoNovo/TabelaBuscaRelatorioAgendamento", Model.IdBanco); %>
        <div class="clear"></div>
        <div class="popupBotoes">
            <div class="btnEspacamento">
                <a id="btnCancelarRelatorioBusca" href="javascript:void(0);" class="btnNav">Cancelar</a>
            </div>
            <div class="btnEspacamento direita">
                <a id="btnAdicionarRelatorioBusca" href="javascript:void(0);" class="btnNav">Selecionar</a>
            </div>
        </div>
    </div>
</div>