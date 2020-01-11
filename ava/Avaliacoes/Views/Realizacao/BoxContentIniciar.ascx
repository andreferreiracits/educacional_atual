<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div class="barraPrincipal">
	<div class="fundo">
		<div class="areaTexto">
			<div class="logoAvaliacoes"></div><div class="campoTexto semBorda" title="<%= Html.Encode(Model.Nome) %>"><%=Html.Encode(Model.Nome) %></div>
		</div>
	</div>
</div>

<div class="clear"></div>

<div id="msgAlerta" class="msgAlerta hide"></div>

<div id="areaConteudo" class="areaConteudo areaConteudoIntro">
	<%= Html.Hidden("txtIdAvaliacao", Model.Id)%>

    <% if (Model.DataEncerrada)
       {  %>
    <div class="encerradoiniciar"><label>O prazo deste agendamento já encerrou.</label></div>
    <% } %>

    <% Html.RenderPartial("Instrucao/BoxConteudo", Model); %>  

<div class="NavegacaoIntro">
    <p>* Horário de Brasília</p>
    <% if (!Model.DataEncerrada)
       {  %>
    <a id="btnIniciar" data-habilitado="<%=Model.HabilitarInicio %>" class="btnNovo btnCinza btnIniciar"><div class="texto">Iniciar</div></a>
     <% } %>
</div>
