formatDefault = {
    mode: "none",

    // Language
        language: 'pt',
        // General options
        theme: "advanced",
        plugins:"pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",

        // Skin options
        skin: "o2k7",
        skin_variant: "silver",

        //remove a mensagem de alerta para acessibilidade
        accessibility_warnings: false,

        //ajusta o caminho do upload da imagem
        relative_urls: false,

        // Theme options
        theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,forecolor,backcolor,|,styleselect,formatselect,cut,copy,paste,pastetext,pasteword",
        theme_advanced_buttons2: "outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,|,tablecontrols,|,hr,|,sub,sup,|,charmap,|,equacao,image,|,banco_imagens,|,media",//,simuladoravaliacoesnova, media
        theme_advanced_buttons3: "fontselect, fontsizeselect",
        theme_advanced_buttons4: "",
        theme_advanced_toolbar_location: "top",
        theme_advanced_toolbar_align: "left",
        theme_advanced_statusbar_location: "bottom",
        theme_advanced_resizing: false,
        //theme_advanced_fonts: "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",      
        theme_advanced_fonts: "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",      
        theme_advanced_font_sizes : "8pt,10pt,12pt,14pt,18pt,24pt,36pt",

        file_browser_callback: "fileBrowserCallBack",

        content_css: caminhoBase +"/"+ "Content/css/tinyFormat.css",

        // Drop lists for link/image/media/template dialogs
        /*template_external_list_url: "/ava/avaliacoes/scripts/util/tiny_mce/tinymce/lists/template_list.js",
        external_link_list_url: "/ava/avaliacoes/scripts/util/tiny_mce/tinymce/lists/link_list.js",
        external_image_list_url: "/ava/avaliacoes/scripts/util/tiny_mce/tinymce/lists/image_list.js",
        media_external_list_url: "/ava/avaliacoes/scripts/util/tiny_mce/tinymce/lists/media_list.js",
        */
        // Style formats
//        style_formats: [
//                    { title: 'Negrito', inline: 'b' },
//                    { title: 'Texto em vermelho', inline: 'span', styles: { color: '#ff0000'} },
//                    { title: 'Cabeçalho em vermelho', block: 'h1', styles: { color: '#ff0000'} },
//                    { title: 'Exemplo 1', inline: 'span', classes: 'example1' },
//                    { title: 'Exemplo 2', inline: 'span', classes: 'example2' },
//                    { title: 'Estilos de tabela' },
//                    { title: 'Linha 1', selector: 'tr', classes: 'tablerow1' }
//            ],

//        formats: {
//            alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
//            aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
//            alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
//            alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
//            bold: { inline: 'span', 'classes': 'bold' },
//            italic: { inline: 'span', 'classes': 'italic' },
//            underline: { inline: 'span', 'classes': 'underline', exact: true },
//            strikethrough: { inline: 'del' },
//            customformat: { inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format'} }
//        }
}
formatCapaProva = $.extend({},formatDefault,
{
    plugins: "simuladoravaliacoesnova,banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
    file_browser_callback: "carregarPopupImagemTiny",
    extended_valid_elements: "iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder]"
});
formatIntroducaoProva = $.extend({}, formatDefault,
{
    plugins: "banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
    file_browser_callback: "carregarPopupImagemTiny"
});
formatInstrucaoAplicacao = $.extend({}, formatDefault, {
    plugins: "banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
    file_browser_callback: "carregarPopupImagemTiny"
});

formatAlternativaQuestao = $.extend({},formatDefault,
{
    encoding: "html",
    plugins: "simuladoravaliacoesnova, banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
    file_browser_callback: "carregarPopupImagemTiny",
    extended_valid_elements: "iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder]"
});
formatEnunciadoQuestao = $.extend({},formatDefault,
{
    plugins: "simuladoravaliacoesnova,banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
    file_browser_callback: "carregarPopupImagemTiny",
    extended_valid_elements: "iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder]"
});


formatRealizacao = {
    mode: "none",
    // Language
    language: 'pt',
    // General options
    theme: "advanced",
    plugins: "advimage,inlinepopups,htmlcharcount",

    height: 300,

    // Skin options
    skin: "o2k7",
    skin_variant: "silver",

    // Theme options
    theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,image",
    theme_advanced_buttons2: "",
    theme_advanced_buttons3: "",
    theme_advanced_buttons4: "",
    theme_advanced_toolbar_location: "top",
    theme_advanced_toolbar_align: "left",
    theme_advanced_statusbar_location: "bottom",
    theme_advanced_resizing: false,

    file_browser_callback: "carregarPopupImagemTiny",

    content_css: caminhoBase +"/"+ "Content/css/tinyFormat.css",

    //remove a mensagem de alerta para acessibilidade
    accessibility_warnings: false,

    //ajusta o caminho do upload da imagem
    relative_urls: false,

}

var popupImagemTiny;

function fileBrowserCallBack(field, url, type, win) {
    throw 'call back de imagem indefinido';
}

function AtualizaImagem() {
    popupImagemTiny.win.document.forms[0].elements[popupImagemTiny.field].value = document.getElementById('strImagemEditor').value;
}

function carregarPopupImagemTiny(field, url, type, win) {
    popupImagemTiny = { 'field': field, 'win': win };

    var DirDestino = $("#strPathFiles").val()
    var NomeCampo = "strImagemEditor";
    if ($("#strImagemEditor").length == 0) {
        $("#strPathFiles").after('<input type="hidden" id="strImagemEditor" />')
    }
    var NomeForm = $("#strPathFiles").parents("form").attr('id');
    var TiposArquivos = "jpeg,png,jpg,gif,avi,flv,swf,wmv,wma,mp3"
    var NomeDestino = new Date().getTime()
    var NomeFuncao = "";

    var wMaxImageResize = 500;
    var hMaxImageResize = 800;
    var wMaxImageResize = 0;
    var hMaxImageResize = 0;
    var wenv;

    wenv = window.open("/Recursos/EdHtmlNovo/enviar_tiny.asp?NomeCampo=" + NomeCampo + "&NomeForm=" + NomeForm + "&DirDestino=" + DirDestino + "&NomeDestino=" + NomeDestino + "&TiposArquivos=" + TiposArquivos + "&NomeFuncao=" + NomeFuncao + "&wMaxImageResize=" + wMaxImageResize + "&hMaxImageResize=" + hMaxImageResize, "wndEnviar", "height=130,width=330");
    wenv.focus();

}


