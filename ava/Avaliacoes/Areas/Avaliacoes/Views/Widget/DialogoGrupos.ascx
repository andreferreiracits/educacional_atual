<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="avl_dlg avl_dlg_grupo" data-render="avl_dlg" data-listener-open="onGrupo" data-listener-close="closeGrupo">

    <div class="avl_dlg_modal"></div>

    <section>
        
            <header>
                <h1>Criar agrupamento</h1>
                <button type="button" data-avl_dlg-btn_close="true">fechar</button>
            </header>

            <form class="avl_dlg_content" id="editGrupo"
            data-render="avl_formjson avl_formtmpl"
            data-avl_formjson-type="dto" data-event-end_submit="closeGrupo" data-chainfire-submit="sendGrupo"
            data-listener-applytmpl="applyTmpl" data-event-endapplytmpl="reloadForm" data-listener-reloadform="reloadForm"
            data-avl_formjson-entidade="Grupo">

                <input type="hidden" name="Grupo[Id]" value="${Id}">
                
                <fieldset>

                    <legend>Informações sobre o agrupamento</legend>

                    <p><label>Nome:<input type="text" name="Grupo[Titulo]" maxlength="80" value="${Titulo}" /></label></p>
                    <p><label>Escolha uma cor:
                        <select name="Grupo[Cor]" data-tmpl-selected="#${Cor}" data-render="{{if true}}avl_slc_cor{{/if}}">
                            <option selected hidden value='#'>escolha uma cor</option>
                            <option value="#000000">#000000</option>
                            <option value="#7f7f7f">#7f7f7f</option>
                            <option value="#d8d8d8">#d8d8d8</option>
                            <option value="#fee3c8">#fee3c8</option>
                            <option value="#ab0200">#ab0200</option>
                            <option value="#fb2024">#fb2024</option>
                            <option value="#ff00df">#ff00df</option>
                            <option value="#ff7e85">#ff7e85</option>
                            <option value="#62500e">#62500e</option>
                            <option value="#fecb00">#fecb00</option>
                            <option value="#c6b85f">#c6b85f</option>
                            <option value="#f4f100">#f4f100</option>
                            <option value="#00830c">#00830c</option>
                            <option value="#00f616">#00f616</option>
                            <option value="#87da8c">#87da8c</option>
                            <option value="#41bfb3">#41bfb3</option>
                            <option value="#08006f">#08006f</option>
                            <option value="#1201ff">#1201ff</option>
                            <option value="#9894cf">#9894cf</option>
                            <option value="#00dfff">#00dfff</option>
                        </select></label>
                    </p>
                    <p>
			            <span>Seu agrupamento terá uma capa?</span>
                        <label><input type="radio" name="Grupo[Capa]" data-tmpl-checked="${Capa}" value="true" />Sim</label>
                        <label><input type="radio" name="Grupo[Capa]" data-tmpl-checked="${Capa}" value="false" />Não</label>
		            </p>

                </fieldset>

                <fieldset data-render="avl_capa_grupo" data-element-capa="input[name='Grupo[Capa]']" data-event-show="onShowTyne" data-render-delay="200">

                    <legend>Capa</legend>
                    <p><label>Sigla:<input type="text" name="Grupo[Sigla]" maxlength="2" value="${Sigla}"/></label><small>* até 2 caracteres</small></p>
                    <textarea cols="100" maxlength="50000" name="Grupo[Conteudo]" rows="12" data-render="avl_tiny" data-element-format="#formatTyneIntro" data-avl_tiny-upload="debug" data-avl_tiny-upload_debug_path="<%=Url.Content("~/Criacao/AnexarImagem/") %>" data-render-listener="onShowTyne" data-render-delay="100">${Conteudo}</textarea>
                </fieldset>
            </form>
        

            <footer>
                <section>
                    <button type="button" data-avl_dlg-btn_close="true">Cancelar</button>
                </section>
                <section>
                    <button type="submit" form="editGrupo">Salvar</button>
                </section>
            </footer>

        
    </section>

</div>