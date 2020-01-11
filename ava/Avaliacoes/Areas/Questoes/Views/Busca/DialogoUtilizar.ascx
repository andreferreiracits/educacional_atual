<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div class="avl_dlg" data-render="avl_dlg" 
data-listener-open="onAddQuestao"
data-listener-close="closeAddQuestao">

    <div class="avl_dlg_modal"></div>

    <section>
        
            <header>
                <h1>Pesquisar questões</h1>
                <button type="button" data-avl_dlg-btn_close="true">fechar</button>
            </header>
            <article class="avl_dlg_content">
                <form id="filtroBuscaQuestoes">

                </form>

                <form id="utilizarQuestoes"
                    data-render="avl_formjson"
                    data-avl_formjson-type="dto"
                    data-event-end_submit="closeAddQuestao"
                    data-chainfire-submit="sendQuestao"
                    data-listener-reloadform="onAddQuestao"
                    data-avl_formjson-entidade="Questao">
                    <label><input type="checkbox" value="541" name="Questao[]"/>541</label>
                    <label><input type="checkbox" value="454" name="Questao[]"/>454</label>
                    <label><input type="checkbox" value="329" name="Questao[]"/>329</label>
                </form>
            </article>

            <footer>
                <section>
                    <button type="button" data-avl_dlg-btn_close="true">Cancelar</button>
                </section>
                <section>
                    <button type="submit" form="utilizarQuestoes">Adicionar</button>
                </section>
            </footer>

        
    </section>

</div>
