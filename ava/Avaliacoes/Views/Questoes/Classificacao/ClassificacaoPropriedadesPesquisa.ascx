<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>

<%            
		using (Html.BeginForm("SalvarQuestao", "Questoes", FormMethod.Post, new { @id = "frmSalvarClassificacao" }))
		{ %>
						<div class="areaConfiguracoesClassificacao">


							<% Html.RenderPartial(Model.CompartilhamentoView, Model); %>

							<div class="linhaImpar">
								<label class="questao" for="txtAno">Ano:</label>
								<span class="SEC02511_texto">
									<input type="text" maxAno="<%=DateTime.Now.Year %>" name="txtAno" id="txtAno" class="txt" value="<%=Model.Ano%>" maxlength="4" />
								</span>
							</div>
											  
							<div class="linhaPar">
								<label class="questao" for="txtIdentificador">Identificador:</label>
								<span class="SEC02511_texto">
									<input type="text" name="txtIdentificador" id="txtIdentificador" class="txt" value="<%=Model.Identificador %>" maxlength="500" />
								</span>
                                <a id="helpClasIdenQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
							</div>
						</div>
						<div class="areaTags">
							<div class="linhaPar">
								<label class="questao" for="txtTags">Palavras-chave:</label>
                                <div id="questaoClassificacao" class="boxTag">
                                
                                    <div class="tagInptBox">
                                        <input type="text" name="txtEditavel" id="txtEditavel" maxlength="25" class="txt txtTag" value="" />
                                        <a id="helpClasChavQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
                                    </div>
                                </div>

                                <input type="hidden" name="txtTags" id="txtTags" class="txt" value="<%=Model.Tags %>" />
                                
								<div class="exeTags infoComplementar" style="margin-left:115px;">Digite as palavras-chave separadas com vírgulas. Ex.: cálculo, teorama, gráfico</div>
							</div>
						</div>
						<div class="navegacaoBotoes">
							<div class="btnEspacamento">
								<%= Html.ActionLink("Cancelar", "Index", "Admin", new { @id = "btnCancelar", @class = "btnCancelar" })%>
							</div>

							<div class="btnEspacamento direita">
								<a id="btnVoltarClassificacao" class="btnNav">&laquo; Voltar</a>
								<a id="btnAvancarClassificacao" class="btnNav">Avançar &raquo;</a>
							</div>
						</div>
	 <%}%>

