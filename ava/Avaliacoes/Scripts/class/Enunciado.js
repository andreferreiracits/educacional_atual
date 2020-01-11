function Enunciado(sId, sTipo, formatacaoTine) {
    var enunciado = this;

    this.id = '#' + sId;
    this.nome = sId;
    this.tipo = sTipo;
    this.comentario = undefined;
    this.formatacaoTine = formatacaoTine;

    /**
     * 
     */
    this.init = function () {
        this.tipoHTML = ($(this.id + ' input[name=hidTemHtmlEnunciado]').val() == '1');
        this.botoes();
        this.comentario = new Comentario(this.nome, formatEnunciadoQuestao);
    }
    
    /**
     * 
     */
    this.botoes = function () {
        var funcao = "javascript:void(0);";
        var textarea = $(this.id + ' textarea.txtareaEnunciado');

        // Trata os tipos Texto e HTML
        if (this.tipoHTML) {
            this.formatarTinyMCE(textarea);

            $(this.id + ' ul li.editorTxt').show();
            $(this.id + ' ul li.editorHtml').hide();
        } else {
            this.contaChar();
            $(this.id + ' ul li.editorTxt').hide();
            $(this.id + ' ul li.editorHtml').show();
        }

        $(this.id + ' ul li.editorTxt a').attr('href', funcao).click(function () { enunciado.abrirTxt(); });
        $(this.id + ' ul li.editorHtml a').attr('href', funcao).click(function () { enunciado.abrirHtml(); });
    }

    /**
     * Abrir o modo HTML do enunciado
     */
    this.abrirHtml = function () {
        var textarea = $(this.id + ' textarea.txtareaEnunciado');
        var li = $(this.id + ' ul li.editorTxt a')

        $(this.id + ' input[name=hidTemHtmlEnunciado]').val(1);

        textarea.removeClass('plano').addClass('html');
        if (textarea.tinymce != undefined) {
            this.formatarTinyMCE(textarea);
        } else {
            textarea.tinymce().show();
        }

        $(this.id + ' ul li.editorTxt').show();
        $(this.id + ' ul li.editorHtml').hide();

        this.hideContaChar();
    }

    /**
     * Abrir o modo Texto do enunciado
     */
    this.abrirTxt = function () {
        var textarea = $(this.id + ' textarea.txtareaEnunciado');

        $(this.id + ' input[name=hidTemHtmlEnunciado]').val(0);

        textarea.removeClass('html').addClass('plano');

        $(this.id + ' ul li.editorTxt').hide();
        $(this.id + ' ul li.editorHtml').show();

        var texto = strip(textarea.val());

        textarea.tinymce().remove();

        if (texto != undefined)
            textarea.get(0).value = texto;

        this.showContaChar();
    }

    /**
     * 
     */
    this.abrirComentarioObrigatorio = function() {
        this.comentario.abrirComentario('Prof');
    }

    this.contaChar = function () {
        var textarea = $(this.id + ' textarea.txtareaEnunciado');
        var optionsT = {
            'maxCharacterSize': parseInt(textarea.attr('maxchar')),
            'originalStyle': 'originalTextareaInfo',
            'warningStyle': 'warningTextareaInfo',
            'warningNumber': 40,
            'displayFormat': '#left caracteres restantes'
        };

        textarea.textareaCount(optionsT);

    }
    this.hideContaChar = function () {
        var textarea = $(this.id + ' textarea.txtareaEnunciado');
        textarea.textareaCount('wait', true);
    }
    this.showContaChar = function () {
        var textarea = $(this.id + ' textarea.txtareaEnunciado');
        if (textarea.textareaCount('exists')) {
            textarea.textareaCount('wait', false);
        } else {
            this.contaChar();
        }
    }

    /**
    * Formata o campo textarea como TinyMCE
    * @param HTMLTextareaElement Campo de texto HTML
    */
    this.formatarTinyMCE = function (campo) {

        campo.tinymce($.extend({},formatacaoTine, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));
        /*
        campo.tinymce({
            // Language
            language: 'pt',

            // General options
            theme: "advanced",
            plugins: "equacao,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount, combo, input",
            //entity_encoding: "raw",

            // Skin options
            skin: "o2k7",
            skin_variant: "silver",

            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,forecolor,backcolor,|,styleselect,formatselect,cut,copy,paste,pastetext,pasteword",
            theme_advanced_buttons2: "outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,|,tablecontrols,|,hr,|,sub,sup,|,charmap,|,equacao,image",
            theme_advanced_buttons3: "input, combo",
            theme_advanced_buttons4: "",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: false,

            file_browser_callback: "fileBrowserCallBack",

            // Example content CSS (should be your site CSS)
            //content_css: "css/content.css",
            content_css: "",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "lists/template_list.js",
            external_link_list_url: "lists/link_list.js",
            external_image_list_url: "lists/image_list.js",
            media_external_list_url: "lists/media_list.js",

            //Valores dos inputs
            valores_mce_input: this.valorInputs,

            // Style formats
            style_formats: [
                    { title: 'Negrito', inline: 'b' },
                    { title: 'Texto em vermelho', inline: 'span', styles: { color: '#ff0000'} },
                    { title: 'Cabeçalho em vermelho', block: 'h1', styles: { color: '#ff0000'} },
                    { title: 'Exemplo 1', inline: 'span', classes: 'example1' },
                    { title: 'Exemplo 2', inline: 'span', classes: 'example2' },
                    { title: 'Estilos de tabela' },
                    { title: 'Linha 1', selector: 'tr', classes: 'tablerow1' }
            ],

            formats: {
                alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
                aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
                alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
                alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
                bold: { inline: 'span', 'classes': 'bold' },
                italic: { inline: 'span', 'classes': 'italic' },
                underline: { inline: 'span', 'classes': 'underline', exact: true },
                strikethrough: { inline: 'del' },
                customformat: { inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format'} }
            },

            htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined)

        });*/
    }
    this.init();
}

/*function fileBrowserCallBackAlternativa(field, url, type, win) {
    if (carregarPopupImagem != undefined)
        carregarPopupImagem(field, url, type, win);
}*/
