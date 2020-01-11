<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.Avaliacoes.Models.IAvaliacaoView>" %>
<%@ Import Namespace="Avaliacoes.Servicos.Avaliacao.Shared" %>

<section id="avl_stps_confirm"  class="avl_stps">
    <article class="avl_resumo">
        <h3>
            <strong>Configurações</strong> Edite informações complementares a avaliação.
            <a href="#avl_stps_config" data-action="avl_stps" data-element-menu="#avl_stps_menu"  class="avl_stps_btn_edit">editar</a>
        </h3>

        <p>
            <span>Forma de seleção das questões:</span>
            <span data-avl_formmodel-view="Avaliacao[Tipo]"></span>
        </p>

        <p>
            <span>Título:</span>
            <span data-avl_formmodel-view="Avaliacao[Titulo]"></span>
        </p>

        <p>
            <span>Identificador:</span>
            <span data-avl_formmodel-view="Avaliacao[Identificador]"></span>
        </p>

        <p>
            <span>Finalidade:</span>
            <span data-avl_formmodel-view="Avaliacao[IdBanco]"></span>
        </p>

        <p>
            <span>Compartilhamento:</span>
            <span data-avl_formmodel-view="Avaliacao[Compartilhada]"></span>
        </p>
    </article>

    <article class="avl_resumo">
        <h3>
            <strong>Texto introdutório</strong> Será exibido quando o respondente abrir a avaliação.
            <a href="#avl_stps_config" data-action="avl_stps" data-element-menu="#avl_stps_menu"  class="avl_stps_btn_edit">editar</a>
        </h3>
        <textarea data-avl_formmodel-input="Avaliacao[Introducao][Conteudo]"  data-render="avl_view_html" data-avl_view_html-css="<%=Html.BundleFile("refactor-content/avl_css/reset_html_view-{0.0.0}.css")%>" data-render-listener="stpConfirm"></textarea>
    </article>

    <article class="avl_resumo">
        <h3>
            <strong>Opções para prova impressa</strong>
            <a href="#avl_stps_config" data-action="avl_stps" data-element-menu="#avl_stps_menu"  class="avl_stps_btn_edit">editar</a>
        </h3>

        <p>Cabeçalho:</p>
        <textarea data-avl_formmodel-input="Avaliacao[Cabecalho][Conteudo]" data-render="avl_view_html" data-avl_view_html-css="<%=Html.BundleFile("refactor-content/avl_css/reset_html_view-{0.0.0}.css")%>" data-render-listener="stpConfirm"></textarea>
        
        <p>Rodapé:</p>
        <textarea data-avl_formmodel-input="Avaliacao[Rodape][Conteudo]" data-render="avl_view_html" data-avl_view_html-css="<%=Html.BundleFile("refactor-content/avl_css/reset_html_view-{0.0.0}.css")%>" data-render-listener="stpConfirm"></textarea>

    </article>

    <% Html.RenderAction("ResumoQuestoes", Model.Controller, new { area = "Avaliacoes" }); %>

    <article class="avl_resumo">
        <h3>
            <strong>Estado da avaliação</strong> Verifique o status de sua prova.
        </h3>
    </article>

    <footer>
    
    
        <form action="<%=Url.Content("~/Servico/Avaliacao/Salvar") %>" 
        method="post" id="avl_boxsave" class="avl_stps" 
        data-render="avl_formjson" data-avl_formjson-entidade="Avaliacao" 
        data-element-auxiliar="#avl_form_save"
        data-event-start="avl_load-show" data-event-end="avl_load-hide"
        data-event-end_submit="voltarLista">
            <input type="hidden" data-avl_formmodel-input="Avaliacao[Tipo]" name="Avaliacao[Tipo]" value="" />
            <input type="hidden" data-avl_formmodel-input="Avaliacao[IdBanco]" name="Avaliacao[IdBanco]" value="" />
            <fieldset><legend>Escolha o estado da avaliação: <br /> (Somente poderá ser agendada <br /> após ser publicada)</legend>
                <label><input <%=Html.Checked(EnumEstado.EmElaboracao, Model.Estado) %> name="Avaliacao[Estado]" type="radio" value="<%=(int)EnumEstado.EmElaboracao%>">Em Elaboração</label>
                <label><input <%=Html.Checked(EnumEstado.Publicada, Model.Estado) %> name="Avaliacao[Estado]" type="radio" value="<%=(int)EnumEstado.Publicada%>">Publicada</label>
            </fieldset>
            <a href="#avl_stps_quest" data-action="avl_stps"  data-element-menu="#avl_stps_menu" class="avl_stps_btn avl_stps_btn_prev">Voltar</a>
            <button type="submit" class="avl_stps_btn">Salvar Avaliação</button>
        </form>
    </footer>

</section>
