<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.CorrecaoView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.Models.Exam" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div id="SEC02511_PlugCorrecao">
    

        <div class="caixaConteudoCorrecao">
	        <div class="clear"></div>
	        <div id="infoCorrecao">
		        <% Html.RenderPartial("InterfaceExterna/BoxTituloAplicacao", Model); %>
		        <div class="boxQuestao">
			        <div class="infoQuestao">
				        <label>Aluno:</label> <%=Model.NomeAluno %>
			        </div>
		        </div>					
		        <% Html.RenderPartial("InterfaceExterna/BoxMenuCorrecao", Model); %>	
                <%using (Html.BeginForm("CarregarRespostaAluno", "Correcao", FormMethod.Post, new { @id = "frmRespostaExt", @class = "tbl" })) { %>
			        <input type="hidden" id="txtIdProvaRealizada" name="txtIdProvaRealizada" value="<%= Model.IdProvaRealizada %>" />
                    <input type="hidden" id="intPagina" name="intPagina" value="1" />
                    <input type="hidden" id="intAcao" name="intAcao" value="0" />
                    <input type="hidden" id="intQtdPorPagina" name="intQtdPorPagina" value="1" />
                <%}%>
                <div class="boxCorrecao">
		            <div class="ferramentas hide">
			            <div class="paginacao"></div>
		            </div>
		            <div id="lstRespostas"></div>
		            <div class="ferramentas">
			            <div class="resultado"></div>
			            <div class="paginacao"></div>
		            </div>
                </div>
	        </div>
        </div>

    
</div>