<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<div id="itemProva_<%= Model.Id %>" class="itemProva">
    <%= Html.Hidden("txtIdProvaSelecionada", Model.Id) %>
    <div class="destaqueAzul">

        <label>Avaliação selecionada:</label>
        <strong><%= Html.Encode(Model.Prova.Nome)%></strong>

    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Autor:</span>
        <label><%= Model.Prova.Autor%></label>
    </div>
    <div class="linhaPar">
        <span class="SEC02511_texto">Data da última modificação:</span>
	    <label><%= Model.Prova.Modificado%></label>
    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Questões:</span>
        <label><%= Model.TextoNrQuestao%></label>
        
    </div>
    
    <% Html.RenderPartial(Model.BoxBtnViewQuestoes, Model); %>

</div>