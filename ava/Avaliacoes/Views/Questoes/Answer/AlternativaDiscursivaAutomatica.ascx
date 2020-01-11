<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<%

if (Model.Alternativas.Count > 0)
{
	foreach (AlternativaView alternativa in Model.Alternativas)
	{
		
 %>
	<li id="alternativa_<%= alternativa.Id %>" class="Alternativa <%= alternativa.Css %>">
		
		<div class="opcaoCampo opcaoCampoDiscursivaAutomatica">
			<input type="hidden" id="hidTemHtml_<%= alternativa.Id %>" name="hidTemHtml" value="<%= (alternativa.Texto.TemHtml) ? "1" : "0" %>" />
			<%= Html.TextBox("txtAlternativa", alternativa.Texto.Texto, new { @id = "txtAlternativa" + alternativa.Id, @class = "txtareaResposta txttextResposta ", @maxlength=alternativa.Limite })%> 
			<ul class="opcoesAdicionais">                
				<li class="altResposta">        	    
					<input type="hidden" id="rdoCorreta_<%= alternativa.Id %>" name="rdoCorreta" value="<%= alternativa.Id %>" <%= alternativa.Checked %>/>
				</li>
				
				<li class="localBtnRemover">
					<a class="btnRemover  <%=Model.PermissaoAlterarEstruturaHide %>">
						<span class="icoRemover"></span> Remover resposta
					</a>
				</li>
			</ul>
		</div>
		<div class="clear"></div>
	</li>

<%
	}
}
%>
