<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<%                  
        using (Html.BeginForm("SalvarQuestao", "Questoes", FormMethod.Post, new { @id = "frmSalvarEstrutura" }))
        { %>
        <input type="hidden" id="strPathFiles" value="<%=Model.CaminhoUpload %>" />

                        <div class="areaConfiguracoesQuestao esp_passo1">

                            <%= Html.Hidden("intTipoQuestao", Model.TipoResposta.Id)%>
                        </div>
                        
                        <div class="areaEnunciado">
            	            <div class="divisaoQuestao">
                	            <h2 class="tituloDivisao">Enunciado <span class="obrigatorio">*</span></h2>
                                <span class="textoDivisao">Digite o enunciado da questão no campo abaixo.</span>
                            </div>
                            <div id="areaEnunciado"><% Html.RenderPartial(Model.EnunciadoView, Model.Enunciado); %></div>
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
<%                  }
                    %>

