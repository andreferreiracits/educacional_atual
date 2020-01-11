<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Tuple<Avaliacoes.Framework.Utils.Entidades.Lista.IParametrosFiltroLista>>" %>

<table class="avl_tbl avl_tbl_view"
id="avl_tbl_questoes_simples"
data-render="avl_tbl avl_tbl_preview"
data-avl_tbl-data_post="{'Filtros':<%= Html.Serialize(Model.Item1, true) %>}"
data-avl_tbl-href="<%=Url.Action("Listar", "Questao", new { area = "Servico" }) %>"
data-event-update="onListQuestoes">
    <thead>
        <tr>
            <th class="avl_tbl_check"><input type="checkbox" data-render="avl_checked_all" data-element-checkbox="#avl_tbl_questoes_simples [name='Questao[]']" /></th>
            <th class="avl_tbl_titulo">Questão</th>
            <th>Identificador</th>
            <th>Tipo</th>
        </tr>
    </thead>

    <tbody class="avl_tbl_form" data-avl_tbl-body="form">
        <tr>
            <td colspan="4">
                <input name="Paginacao[Atual]" value="1" type="text" />
                <input name="Paginacao[Limite]" value="3" type="text" />
                <input name="Paginacao[Itens]" value="10" type="text" />
            </td>
        </tr>
    </tbody>

    <% Html.RenderPartial("Refactor/Tbl/Loader", 4); %>

    <tbody class="avl_tbl_empty" data-avl_tbl-body="empty">
        <tr><td colspan="4"><p>Nenhuma questão foi incluída.</p></td></tr>
    </tbody>

    <tbody class="avl_tbl_data">
        <tr><td><textarea data-avl_tbl-body="data">
        </textarea>
        </td></tr>
    </tbody>
    
    
    <script type="text/x-jquery-tmpl" data-tmpl-field="Itens" data-tmpl-target="#avl_tbl_questoes_simples > tbody.avl_tbl_content">
        <tr data-avl_tbl-indice="${_indice}">
            <td class="avl_tbl_check"><input type="checkbox" value="${Id}" name="Questao[]" /></td>
            <td class="avl_tbl_titulo">
                <p><a data-action="avl_tbl_view avl_refator_old" 
                    target="#avl_tbl_questoes_simples > tbody > tr[data-avl_tbl-auxiliar='${_indice}'] > td > section"
                    href="<%=Url.Content("~/Questoes/ViewQuestao/")%>${Id}"
                    data-avl_refator_old-scrolling="auto"
                    data-avl_refator_old-img_load="<%=Url.Content("~/refactor-content/avl_img/widget_geral/load.gif")%>">${Enunciado}</a></p>

            </td>
            <td>${Identificador}</td>
            <td>${TipoResposta}</td>
        </tr>
        <tr class="avl_tbl_contentview" data-avl_tbl-auxiliar="${_indice}">
            <td colspan="4">
                <section>
                </section>
            </td>
        </tr>
    </script>

    <tbody class="avl_tbl_content" data-avl_tbl-body="content">
    </tbody>

    <tfoot>
        <tr> 
            <td colspan="4" class="avl_tbl_paginador">
                
            </td>
        </tr>
    </tfoot>
    <script type="text/x-jquery-tmpl" data-tmpl-target="#avl_tbl_questoes_simples > tfoot .avl_tbl_paginador">
        
        <h1>Encontramos ${Total} resultados.</h1>
        <section>
            <header>
                <p>Página ${Paginador.Atual} de ${Paginador.Total}</p>
            </header>
            <ul data-avl_tbl-pag_atual="[name='Paginacao[Atual]']">
                <li><a href="1">Primeira</a></li>
                {{each Paginador.Paginas}}
                    <li {{if Paginador.Atual == $value}}aria-selected="true"{{/if}}><a href="${$value}">${$value}</a></li>
                {{/each}}
                <li><a href="${Paginador.Total}">Última</a></li>
            </ul>
        </section>

    </script>
</table>
