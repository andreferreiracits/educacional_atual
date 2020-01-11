<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div class="cancelada">
    <div id="AR_conteudo">
        <div class="barraPrincipal">
	        <div class="fundo">
		        <div class="areaTexto">
			        <div class="logoAvaliacoes"></div><div class="campoTexto semBorda" title="<%= Html.Encode(Model.Nome) %>"><%=Html.Encode(Model.Nome) %></div>
		        </div>
	        </div>
        </div>

        <div class="clear"></div>

        <div id="areaConteudo" class="areaConteudo areaConteudoIntro">
            <div  class="cancelado"><label>Este agendamento foi cancelado.</label></div>
        </div>
    </div>

</div>