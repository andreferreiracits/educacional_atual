<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.Avaliacoes.Models.IAvaliacaoView>" %>

<form action="<%=Url.Content("~/Servico/Avaliacao/Salvar") %>" 
    method="post" id="avl_stps_quest" class="avl_stps" 
    data-render="avl_formjson" data-avl_formjson-entidade="Avaliacao" 
    data-element-auxiliar="#avl_form_save" data-chain-submit="stpQuestoes"
    data-event-start="avl_load-show" data-event-end="avl_load-hide"
    data-listener-reloadform="openQuestoes">

        <input type="hidden" data-avl_formmodel-input="Avaliacao[Tipo]" name="Avaliacao[Tipo]" value="" />
        <input type="hidden" data-avl_formmodel-input="Avaliacao[IdBanco]" name="Avaliacao[IdBanco]" value="" />
    
    <% Html.RenderAction("CadastroQuestoes", Model.Controller, new { area = "Avaliacoes", avaliacao=Model }); %>

    <footer>
        <a href="#avl_stps_config" data-action="avl_stps" data-element-menu="#avl_stps_menu" class="avl_stps_btn avl_stps_btn_prev">Voltar</a>
        <a href="#avl_stps_confirm" data-action="avl_stps" data-element-menu="#avl_stps_menu" class="avl_stps_btn avl_stps_btn_next">Avançar</a>
    </footer>

</form>
