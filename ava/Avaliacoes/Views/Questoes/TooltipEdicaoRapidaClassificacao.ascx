<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.TabelaViews.Classificacao" %>
<div id="edicaorapida" class="slc SEC02511">
<%  using (Html.BeginForm("SalvarEdicaoRapida", "Questoes", FormMethod.Post, new { @id = "frmEdicaoRapida" }))
	{ %>
	<%= Html.Hidden("idQuestaoSalvar", Model.Id)%>
		<div class="opcoes filtro opFiltroQuestao">
			<a class="fechar right" href="#fechar">X</a>
			<div class="frm">
				<% if (Model.btnsAdicionarClassificacao.Length > 0)
				   { %>
				<label class="topico" >Classificação:</label>
				<div class="classificacaoCriterios">
                <% foreach (string v in Model.btnsAdicionarClassificacao)
	   {
		   Html.RenderPartial(v);
	   }
				   }
				%></div>
			

			</div>
			<div class="clear"></div>
			<br />
								
		</div>
	</div>
	<%} %>

