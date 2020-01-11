<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div id="iniciar">
<div id="AR_conteudo">
<%  using (Html.BeginForm("ValidarAplicacaoSimulada", "Realizacao", FormMethod.Post, new { @id = "frmValidarAplicacao" }))
	{

        Html.RenderPartial("BoxContentIniciar", Model);
    
    } %>
			</div>
            
	</div>
</div>