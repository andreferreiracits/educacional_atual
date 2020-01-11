<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<article class="avl_resumo">
    <h3>
        <strong>Questões</strong> Confira as questões incluídas nesta prova e o controle.
        <a href="#avl_stps_quest" data-action="avl_stps" data-element-menu="#avl_stps_menu"  class="avl_stps_btn_edit">editar</a>
    </h3>
    <p>
        <span>Nota da avaliação:</span>
        <span data-render="avl_total"  data-avl_total-select="tr[data-avl_tbl-indice] input[type='number'][name$='[Valor]']"  data-avl_total-type="sum"  data-listener-refresh="updateTable"></span>
    </p>
</article>
