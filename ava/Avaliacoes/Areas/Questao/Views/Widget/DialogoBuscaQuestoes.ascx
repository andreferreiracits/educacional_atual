<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div class="avl_dlg avl_dlg_srch_questao" data-render="avl_dlg_questao_prova" 
data-listener-open="onAddQuestao"
data-listener-close="closeAddQuestao">

    <div class="avl_dlg_modal"></div>

    <section>
        
            <header>
                <h1>Pesquisar questões</h1>
                <button type="button" data-avl_dlg-btn_close="true">fechar</button>
            </header>

            <article class="avl_dlg_content">

                <section>
                    <a data-render="avl_refator_old" 
                        target="_self"
                        href="<%=Url.Content("~/Questoes/PesquisaQuestaoRefactor/")%>"
                        data-avl_refator_old-img_load="<%=Url.Content("~/refactor-content/avl_img/widget_geral/load.gif")%>"
                        data-chain-get-data="addQuestoesOld"
                        data-listener-render="onAddQuestao">Pesquisar questões</a>
                </section>

            </article>

            <footer>
                <section>
                    <button type="button" data-avl_dlg-btn_close="true">Cancelar</button>
                </section>
                <section>
                    <button type="button" 
                    data-action="avl_refator_old_com" 
                    data-chainfire-get-data="addQuestoesOld" 
                    data-chainfire-send_data="sendQuestao"
                    data-event-end_com="closeAddQuestao">Adicionar</button>
                </section>
            </footer>

        
    </section>

</div>
