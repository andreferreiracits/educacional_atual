<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.Avaliacoes.Models.AvaliacaoGrupoAutomaticoView>" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<header>
    <button type="button" class="avl_btn_add" 
    data-action="avl_action" data-event-click="onGrupo,applyTmpl" 
    data-avl_action-data="{'Titulo':'','Capa':false,'Sigla':'','Cor':'','Conteudo':'','Valor':0.00,'Sorteio':0,'Id':0,'Questoes':[],'_indice':-1}">
        Adicionar grupo de questões
    </button>
</header>

<table class="avl_tbl avl_tbl_view avl_tbl_grupos" id="avl_tbl_grupos"
data-render="avl_tbl_grupo avl_tbl_preview avl_tbl_grupo_cor" 
data-chain-edit="sendGrupo"
data-listener-remove="removeGrupo"
data-event-update="updateTable"
data-avl_tbl-href="<%=Url.Action("Grupos", "AvaliacaoGrupoAutomatico", new { area = "Avaliacoes", id = Model.Id }) %>"
data-render-listener="stpQuestoes"
data-event-render="openQuestoes"
data-avl_tbl-field="Itens"
data-listener-refresh="refreshTable"
data-listener-tblquestoes="onListQuestoes"
data-avl_tbl_grupo-msg_valida_cor="<%=Html.Recurso("ServicoAvaliacao.Erros.SERV_AVAL_030")%>"
data-listener-update_valores="updateValorTabela"
data-listener-apply_cor="updateTable"
data-listener-edit_group="editGroup"
>

    <thead>
        <tr>
            <th class="avl_tbl_titulo">Nome do Grupo</th>
            <th>questões selecionadas</th>
            <th>questões aplicadas</th>
            <th>valor</th>
        </tr>
    </thead>

    <% Html.RenderPartial("Refactor/Tbl/Loader", 4); %>

    <tbody class="avl_tbl_empty" data-avl_tbl-body="empty">
        <tr><td colspan="4"><input type="hidden" name="Avaliacao[Grupos]" value="[]" /><p>Não existe grupos de questões</p></td></tr>
    </tbody>
    <tbody class="avl_tbl_data">
        <tr><td><textarea data-avl_tbl-body="data">
        </textarea>
        </td></tr>
    </tbody>

    <script type="text/x-jquery-tmpl" data-tmpl-field="Itens" data-tmpl-target="#avl_tbl_grupos > tbody.avl_tbl_content">
        <tr data-avl_tbl-indice="${_indice}">
            <td class="avl_tbl_titulo">
                <section>

                    <input type="hidden" name="Avaliacao[Grupos][${_indice}][Id]" value="${Id}" />
                    <input type="hidden" name="Avaliacao[Grupos][${_indice}][Sigla]" value="${Sigla}" />
                    <input type="hidden" name="Avaliacao[Grupos][${_indice}][Cor]" data-noparse="true" value="${Cor}" />
                    <input type="hidden" name="Avaliacao[Grupos][${_indice}][Conteudo]" value="${Conteudo}" />
                    <input type="hidden" name="Avaliacao[Grupos][${_indice}][Capa]" value="${Capa}" />

                    <p><a data-action="avl_tbl_grupo_preview" 
                    target=".avl_tbl_grupos > tbody > tr[data-avl_tbl-auxiliar='${_indice}'] > td > section"
                    data-avl_tbl_preview-lista="grupos"
                    href="<%=Url.Action("Simples", "Listagem", new { area = "Questao" }) %>"><input type="text" name="Avaliacao[Grupos][${_indice}][Titulo]" value="${Titulo}" readonly="readonly" /></a></p>

                    <footer class="avl_tbl_acoes">

                        <button type="button" class="avl_tbl_btn_del"
                        data-action="avl_action_confirm" data-event-click="removeGrupo"
                        data-avl_action-data="${_indice}" data-avl_action_confirm-msg="<%=Html.Recurso("Avaliacoes.Textos.ConfirmRemoveGrupo") %>" data-chain-confirm="chain_confirm">remover</button>

                        <button type="button" class="avl_tbl_btn_edit"
                        data-action="avl_action" data-event-click="editGroup" 
                        data-avl_action-data="${_indice}">
                            editar
                        </button>

                    </footer>

                </section>
            </td>
            <td><p data-render="avl_total" data-avl_total-select=".avl_tbl_contentview[data-avl_tbl-auxiliar='${_indice}'] input[name='Avaliacao[Grupos][${_indice}][Questoes][]']" data-avl_total-type="count"></p>
            <a href="#" class="avl_btn_add" class="avl_btn_add" 
            data-action="avl_questao_grupo" 
            data-chain-add_questao="sendQuestao"
            data-event-click="onAddQuestao"
            data-event-refresh_table="refreshTable">Adicionar questões</a></td>
            <td><input type="number" min="1" max="100" value="${Sorteio}" size="3" name="Avaliacao[Grupos][${_indice}][Sorteio]" pattern="^[0-9]{1,3}$" data-render="avl_pattern avl_input_grupo_data" data-avl_pattern-type="number" placeholder="0" data-event-update_input="updateValorTabela" /></td>
            <td><input type="number" step="0.1" min="0.1" max="100.0" value="${Valor}" size="5" name="Avaliacao[Grupos][${_indice}][Valor]" pattern="^[0-9]{1,3}(.[0-9]{1})?$" data-render="avl_pattern avl_input_grupo_data" data-avl_pattern-type="decimal" placeholder="0.0" data-event-update_input="updateValorTabela" /></td>
        </tr>
        <tr class="avl_tbl_contentview" aria-expanded="false" data-avl_tbl-auxiliar="${_indice}">
            <td colspan="4">
                <header>
                {{each Questoes}}
                    <input type="hidden" value="${$value}" name="Avaliacao[Grupos][${_indice}][Questoes][]" />
                {{/each}}
                    <section data-render="avl_dropdown" class="avl_dropdown">
                        <button type="button">Ações</button>
                        <ul>
                            <li data-avl_dropdown-close="true"><button type="button" data-action="avl_remove_questao_grupo" data-event-refresh_table="refreshTable">Remover</button></li>
                        </ul>
                    </section>
                </header>
                <section>
                </section>
            </td>
        </tr>
    </script>
    
    <tbody class="avl_tbl_content" data-avl_tbl-body="content">
    </tbody>
    <tfoot>
        <tr> 
            <td colspan="2"><span data-render="avl_total" data-avl_total-select=".avl_tbl_grupos .avl_tbl_content > tr:not(.avl_tbl_contentview)" data-avl_total-type="count" data-listener-refresh="updateTable"></span> grupos adicionados</td>
            <td>Total: <span data-render="avl_total"  data-avl_total-select="tr[data-avl_tbl-indice] input[type='number'][name$='[Sorteio]']"  data-avl_total-type="sum"  data-listener-refresh="updateTable"></span></td>
            <td>Total: <span data-render="avl_total"  data-avl_total-select="tr[data-avl_tbl-indice] input[type='number'][name$='[Valor]']"  data-avl_total-type="sum"  data-listener-refresh="updateTable"></span></td>
        </tr>
    </tfoot>
</table>
