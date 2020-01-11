<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.CorrecaoView>" %>

<ul id="menuSubConteudoInterno" class="abaSubConteudo">
	<li id="listaQuestaoCorrigir" class="selecionado">
		<a href="javascript:void(0);" class="umaLinha"><%= Model.Text(true) %> a corrigir (<span id="qtdeNaoCorrigida"><%= Model.NaoCorrigidas %></span>)</a>
	</li>
	<li id="listaQuestaoCorrigida">
		<a href="javascript:void(0);" class="umaLinha"><%= Model.Text(true) %> corrigidas (<span id="qtdeCorrigida"><%= Model.Corrigidas %></span>)</a>
	</li>
	<li id="listaQuestaoTodas">
		<a href="javascript:void(0);" class="umaLinha">Todas as <%= Model.Text(false) %> (<span id="qtdeTotal"><%= Model.Total %></span>)</a>
	</li>
</ul>