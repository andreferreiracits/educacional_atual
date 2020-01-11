<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>


<div id="realizar" tipos="<%=Model.ArrayStringTipoResposta%>">
	
	<div class="barraPrincipal">
		<div id="boxTitulo" class="fundo">
			<div class="areaTexto">
				<div class="campoTexto" title="<%= Html.Encode(Model.Nome) %>"><%= Html.Encode(Model.Nome) %></div>
                <% Html.RenderPartial(Model.BoxPeriodo, Model);%>
				<div class="bordaEsq">&nbsp;</div>
			</div>
            <% Html.RenderPartial(Model.BoxAreaIcones);%>
		</div>



                    <div class="boxFinalizarTitulo">
                        Encerrar
                        <div class="texto">
						<p>Você ainda não concluiu o simulado Algumas questões ainda encontram-se em revisão e serão confirmadas</p>
                        </div>
					</div>


        <div class="btnPaginacaoInferior">
            <div id="paginacao">
                <ul>
               <% /*foreach (ItemRealizacao pagina in Model.Itens) { %>
                        <li>
                            <a href="?in=<%// pagina.Indice %>" class="btnPaginacao listaQuestoesCorreta"><%= pagina.Nome%></a>
                        </li>
               <% } */%>
                </ul>
            </div>
            
        </div>
        <div class="legenda">Legenda: 
            <div class="listaQuestoesNaoRespondida">Não Respondidas</div>
            <div class="listaQuestoesEmRevisao">Em revisão  | </div>
            <div class="listaQuestoesAberta">Abertas | </div>
            <div class="listaQuestoesIncorreta">Incorretas | </div>
            <div class="listaQuestoesCorreta">Corretas | </div>
        </div>

	</div>



					<div class="boxFinalizar">
						<p>Tem certeza que deseja Encerrar?</p>
						<div class="botao">
							<a class="btnPadrao" id="" href="javascript:;">Sim</a>
							<a class="btnFechar" id="" href="javascript:;">Não</a>
						</div>
                        <p>OBS: Apos encerrar este simulado, nao sera possivel altera-lo</p>
					</div>




</div>