<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>

<div id="itemProva_<%= Model.Id %>" class="itemProva">
    <%= Html.Hidden("txtIdProvaSelecionada", Model.Id) %>
    <div class="destaqueAzul">

        <label>Prova selecionada:</label>
        <strong><%= Model.Prova.Nome%></strong>

    </div>
    <div class="linhaImpar">
        <span class="texto">Autor:</span>
        <label><%= Model.Prova.Autor%></label>
    </div>
    <div class="linhaPar">
        <span class="texto">Data da última modificação:</span>
	    <label><%= Model.Prova.Modificado%></label>
    </div>
    <div class="linhaImpar">
        <span class="texto">Questões:</span>
        <label><%= Model.Prova.TextoNrQuestao%></label>
        
    </div>
    
    <% Html.RenderPartial(Model.BoxBtnViewQuestoes, Model); %>

</div>