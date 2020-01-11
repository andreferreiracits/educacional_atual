<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ItensRealizacaoPendente>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<div class="boxFinalizarTitulo"><p>Encerrar</p></div>
		<div class="areaQuestoes">
			<div id="listaQuestoesEncerrar" >

<%  if (Model.Itens.Count > 0) {
        if (Model.QuestaoNaoRespondida == true || Model.QuestaoRevisao == true){ %>
    <div class="boxFinalizarSubTitulo">
        <p>As seguintes questões estão com status aberto ou a revisar.</p>
    </div>
    <div class="btnPaginacaoInferior">
    <div class="navegaPaginacao">
	    <ul>
            <%
            foreach (ItemRealizacao item in Model.Itens){
                %>
            <li>
                <div class="imgPaginacao">
                    <div class="paginacaoBtn <%=item.Estilo %> <%=item.EstiloBotao %>">
                        <a class="btnPaginacao" href="<%=item.Indice %>"><div><%=item.Nome%></div></a>
                    </div>
                    <div class="estadoQuestao <%=item.Estilo %>"></div>
                </div>
            </li>
            <% } %>
	    </ul>
        </div>
	</div>
     <% }
     } %>
    </div>
</div>

<div class="clear"></div>

<div class="boxFinalizar">
    <div class="boxConfirmacao">
    <%  if (Model.Itens.Count > 0)
        { %><p>Deseja encerrar mesmo assim?</p><%}else{%><p>Deseja encerrar essa atividade?</p><%}%>

						<div class="botao">
                        <%--= Html.ActionLink("Sim", "Finalizar", "Realizacao", new { @id = Model.IdAplicacao } , new { @id = "btnEncerrarSim", @class = "btnPadrao btnAzul" })--%>
                        <a id="btnEncerrarSim"      class="btnNovo btnCinza"><div class="texto">Sim</div></a>
                        <a id="btnEncerrarNao"      class="btnNovo btnCinza"><div class="texto">Não</div></a>
						</div>
					</div>
                    <p>Obs.: Após o encerramento, não será possível alterar as respostas.</p>
 </div>
