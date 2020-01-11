<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.Avaliacoes.Models.IAvaliacaoView>" %>

<%@ Import Namespace="Avaliacoes.Framework.Bancos" %>
<%@ Import Namespace="Avaliacoes.Framework.Bancos.Interfaces" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>
<%@ Import Namespace="ProvaColegiada.Refactor.Model.Interfaces" %>
<%@ Import Namespace="Avaliacoes.Servicos.Avaliacao.Imp.Entidades.Avaliacao "%>

<form action="<%=Url.Content("~/Servico/Avaliacao/Salvar") %>" 
    method="post" id="avl_stps_config" class="avl_stps" 
    data-render="avl_formmodel avl_formjson" data-avl_formjson-entidade="Avaliacao" 
    data-element-auxiliar="#avl_form_save" data-chain-submit="stpConfig"
    data-event-start="avl_load-show" data-event-end="avl_load-hide">
	<fieldset>
		<legend><strong>Configurações</strong> Informe os dados básicos da avaliação.</legend>
		<p>
			<span>Finalidade da avaliação:</span>
            <% 
                //TODO: interessante estar em uma controller ou em outro local de acesso comum
                //inclui na controller comum mas não está utilizando por enquanto
                //resolver o problema de se passar mais parametros para a tag
                IList<IBanco> bancos = Html.Bancos(EnumAcessoBanco.Escrita);
                %>
                <label><input name="Avaliacao[IdBanco]" type="radio" value="<%:bancos[0].Id %>" <%=Html.Checked(bancos[0].Id, Model.IdBanco) %> /><%:bancos[0].Nome %></label>
                <label><input name="Avaliacao[IdBanco]" type="radio" value="<%:bancos[1].Id %>" <%=Html.Checked(bancos[1].Id, Model.IdBanco) %> data-action="avl_convert_old" data-ajaxlink-href="<%=Url.Content(String.Format("~/Criacao/OldTrocaBanco/{0}/{1}", Model.Id, bancos[1].Id)) %>" data-event-start="avl_load-show" data-event-end="avl_load-hide" data-chain-confirm="chain_confirm" /><%:bancos[1].Nome %></label>
		</p>
        
		<p aria-required="true">
			<span>Título:</span>
			<input type="text" name="Avaliacao[Titulo]" maxlength="80" value="<%:Model.Titulo %>" data-noparse="true">
		</p>

		<p>
			<span>Identificador:</span>
			<input type="text" name="Avaliacao[Identificador]" maxlength="500" value="<%:Model.Identificador %>" data-noparse="true">
		</p>
        
		<p>
        <%
            //TODO: idem ao problema da finalidade (bancos)
        %>
			<span>Compartilhamento:</span>
            <label><input name="Avaliacao[Compartilhada]" type="radio" value="<%=EnumCompartilhamento.Privada %>" <%=Html.Checked(EnumCompartilhamento.Privada, Model.Compartilhada)%>>Privada</label>
            <label><input name="Avaliacao[Compartilhada]" type="radio" value="<%=EnumCompartilhamento.Escola %>" <%=Html.Checked(EnumCompartilhamento.Escola, Model.Compartilhada)%>>Compartilhada com professores da minha escola</label>
		</p>

		<p>
        <%
            //TODO: idem ao problema da finalidade (bancos)
        %>

			<span>Forma de seleção das questões:</span>
			<label><input name="Avaliacao[Tipo]" type="radio" value="<%=TipoAvaliacao.AvaliacaoQuestao.Id %>" <%=Html.Checked(TipoAvaliacao.AvaliacaoQuestao.Id, Model.Tipo.Id)%> data-action="avl_convert_old" data-ajaxlink-href="<%=Url.Content(String.Format("~/Criacao/OldTrocaTipo/{0}/{1}", Model.Id, TipoAvaliacao.AvaliacaoQuestao.Id)) %>" data-event-start="avl_load-show" data-event-end="avl_load-hide" data-chain-confirm="chain_confirm">Seleção Manual</label>
			<label><input name="Avaliacao[Tipo]" type="radio" value="<%=TipoAvaliacao.AvaliacaoGrupoAutomatico.Id %>" <%=Html.Checked(TipoAvaliacao.AvaliacaoGrupoAutomatico.Id, Model.Tipo.Id)%> >Seleção Automática</label>
		</p>

	</fieldset>

	<fieldset>
		<legend><strong>Texto introdutório</strong> Será exibido quando o respondente abrir a avaliação.</legend>
		<textarea cols="106" maxlength="5000" name="Avaliacao[Introducao][Conteudo]" rows="12" data-render="avl_tiny" data-element-format="#formatTyneIntro" data-avl_tiny-upload="debug" data-avl_tiny-upload_debug_path="<%=Url.Content(String.Format("~/Criacao/AnexarImagem/{0}", Model.Id)) %>" ><%=Model.Introducao.Conteudo %></textarea>
		<input type="hidden" value="true" name="Avaliacao[Introducao][EhHtml]" />
	</fieldset>

	<fieldset>
		<legend>
			<strong>Opções para prova impressa</strong> No caso de sua aplicação for impressa, preencha os campos abaixo.
			<button type="button" class="avl_btn_toggle" aria-expanded="false" data-render="avl_toggle" data-avl_toggle-text="Ocultar" data-target="#avl_stps_config fieldset:eq(2) > section" data-event-show="onImpressa">Expandir</button>
		</legend>
        
        <section><label>Cabeçalho:</label>
            <textarea cols="106" maxlength="4000" name="Avaliacao[Cabecalho][Conteudo]" rows="12" data-render="avl_tiny" data-element-format="#formatTyneIntro" data-avl_tiny-upload="debug" data-avl_tiny-upload_debug_path="<%=Url.Content(String.Format("~/Criacao/AnexarImagem/{0}", Model.Id)) %>" data-render-listener="onImpressa"><%=Model.Cabecalho.Conteudo %></textarea>
            <input type="hidden" value="true" name="Avaliacao[Cabecalho][EhHtml]" />
        </section>
        
		
		<section><label>Rodapé:</label>
		    <textarea cols="106" maxlength="4000" name="Avaliacao[Rodape][Conteudo]" rows="12" data-render="avl_tiny" data-element-format="#formatTyneIntro" data-avl_tiny-upload="debug" data-avl_tiny-upload_debug_path="<%=Url.Content(String.Format("~/Criacao/AnexarImagem/{0}", Model.Id)) %>" data-render-listener="onImpressa"><%=Model.Rodape.Conteudo %></textarea>
		    <input type="hidden" value="true" name="Avaliacao[Rodape][EhHtml]" />
        </section>

	</fieldset>

	<footer>
		<a href="#avl_stps_quest" data-action="avl_stps" data-element-menu="#avl_stps_menu"  class="avl_stps_btn avl_stps_btn_next">Avançar</a>
	</footer>

</form>

<script type="text/avl_tiny_old_format" id="formatTyneIntro">
    {
        "mode": "none",
        "language": "pt",

        "theme": "advanced",
        "plugins": "banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",

        "skin": "o2k7",
        "skin_variant": "silver",

        "accessibility_warnings": false,
        "relative_urls": false,

        "theme_advanced_buttons1": "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,forecolor,backcolor,|,styleselect,formatselect,cut,copy,paste,pastetext,pasteword",
        "theme_advanced_buttons2": "outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,|,tablecontrols,|,hr,|,sub,sup,|,charmap,|,image,|,banco_imagens,simuladoravaliacoesnova, media",
        "theme_advanced_buttons3": "fontselect, fontsizeselect",
        "theme_advanced_buttons4": "",
        "theme_advanced_toolbar_location": "top",
        "theme_advanced_toolbar_align": "left",
        "theme_advanced_statusbar_location": "bottom",
        "theme_advanced_resizing": false,
        "theme_advanced_fonts": "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",      
        "theme_advanced_font_sizes" : "8pt,10pt,12pt,14pt,18pt,24pt,36pt",

        "content_css": "<%=Html.BundleFile("Content/css/tinyFormat.css") %>"


    }
</script>
