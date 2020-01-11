<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Refactor/Avaliacao.Master" Inherits="Avaliacoes.Framework.Web.Master.AvaliacaoViewPage<Object>" %>

<asp:Content ID="Css" ContentPlaceHolderID="AvlCss" runat="server">
	<style>
	
	#abrir_questao input
	{
	    width: 100px !important;
	}
	#abrir_questao button
	{
	    float: none !important;
	}
	
	#abrir_questao
	{
	    border-bottom: 1px solid gray;
	    margin-bottom: 20px;
	}
	
	
	#editar fieldset
	{
	    margin-top: 20px;
	}
	a[data-action="avl_popup"]
	{
	    float: none !important;
	    margin-bottom: 50px !important;
	    
	}
	
	ul.alternativas
	{
	    list-style: none;
	}
	ul.alternativas li
	{
	    margin-bottom: 10px;
	}
	ul.alternativas li label
	{
	    padding-top: 20px;
	}
	</style>
</asp:Content>

<asp:Content ID="Titulo" ContentPlaceHolderID="AvlTitulo" runat="server">
	- Editando Questão
</asp:Content>

<asp:Content ID="Conteudo" ContentPlaceHolderID="AvlContent" runat="server">
	

	<section id="avl_cad">
		
        <form action="<%=Url.Content("~/Questao/Restrito/Editar") %>" id="abrir_questao" method="get" data-render="avl_abrir_questao">
            <fieldset><legend><strong>Abrir Questao</strong></legend>
                <label>Id Questão:<input type="text" name="Id" value="<%=Model %>"/></label>
                <button type="submit" class="avl_stps_btn_edit">Abrir</button>
            </fieldset>
        </form>

        <%Html.RenderAction("Abrir", "Restrito", new { area = "Questao", @id = Model }); %>

	</section>
</asp:Content>

<asp:Content ID="JsRodape" ContentPlaceHolderID="AvlScriptBottom" runat="server">
	<% Html.RenderPartial("Refactor/Scripts/Gerais"); %>
	<% Html.RenderPartial("Refactor/Scripts/TinyOld"); %>
	
    <script type="text/javascript">
    
    </script>


    <script type="text/avl_tiny_old_format" id="formatTyne">
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

</asp:Content>
