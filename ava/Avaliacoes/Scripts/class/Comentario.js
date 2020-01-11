function Comentario(sId, formatacaoTine) {
    var comentario = this;

    this.id      = '#' + sId;
    this.nome    = sId;
    this.caminho = "";
    this.estados = { INSERIR: 1, EXIBIR: 2, OCULTAR: 3 };

    this.caixaProf  = this.id + ' div.comentProf';
    this.caixaAluno = this.id + ' div.comentAluno';
    this.caixaDica = this.id + ' div.comentDica';
    
    this.linkAluno  = this.id + ' ul li.comentAluno a';
    this.linkProf = this.id + ' ul li.comentProf a';
    this.linkDica = this.id + ' ul li.comentDica a';

    this.textoAluno = this.id + ' div.comentAluno textarea';
    this.textoProf = this.id + ' div.comentProf textarea';
    this.textoDica = this.id + ' div.comentDica textarea'
    
    this.botaoAluno = this.id + ' div.comentAluno input';
    this.botaoProf = this.id + ' div.comentProf input';
    this.botaoDica = this.id + ' div.comentDica input';

    this.formatacaoTine = formatacaoTine;
    

    this.textosComentario = [];

    /**
     *
     */
    this.init = function () {
        if ($(this.caixaProf).length > 0) {
            $(this.caixaProf).hide();
        }
        if ($(this.caixaAluno).length > 0) {
            $(this.caixaAluno).hide();
        }
        if ($(this.caixaDica).length > 0) {
            $(this.caixaDica).hide();
        }

        this.botoes();
        this.funcionalidades();

        if ($(this.caixaProf).length > 0) {
            this.verificar('Prof');
        }
        if ($(this.caixaAluno).length > 0) {
            this.verificar('Aluno');
        }
        if ($(this.caixaDica).length > 0) {
            this.verificar('Dica');
        }
    }

    /**
     * Habilita as funcionalidades dos botões 
     */
    this.funcionalidades = function () {

        var funcao = "javascript:void(0);";

        if ($(this.caixaProf).length > 0) {
            $(this.id + ' div.comentProf ul li.comentEditorTxt a').attr('href', funcao).click(function () { comentario.abrirTxt('comentProf'); });
            $(this.id + ' div.comentProf ul li.comentEditorHtml a').attr('href', funcao).click(function () { comentario.abrirHtml('comentProf'); });
        }
        if ($(this.caixaAluno).length > 0) {
            $(this.id + ' div.comentAluno ul li.comentEditorTxt a').attr('href', funcao).click(function () { comentario.abrirTxt('comentAluno'); });
            $(this.id + ' div.comentAluno ul li.comentEditorHtml a').attr('href', funcao).click(function () { comentario.abrirHtml('comentAluno'); });
        }
        if ($(this.caixaDica).length > 0) {
            $(this.id + ' div.comentDica ul li.comentEditorTxt a').attr('href', funcao).click(function () { comentario.abrirTxt('comentDica'); });
            $(this.id + ' div.comentDica ul li.comentEditorHtml a').attr('href', funcao).click(function () { comentario.abrirHtml('comentDica'); });
        }


    }
    this.abrirTxt = function (strComent) {

        var textarea = $(this.id + ' div.' + strComent + ' textarea');
        var idTextArea = textarea.attr('id');

        $(this.id + ' input[name=hidTemHtml_' + strComent + ']').val(0);
        textarea.removeClass('html').addClass('plano');

        $(this.id + ' div.' + strComent + ' ul li.comentEditorTxt').hide();
        $(this.id + ' div.' + strComent + ' ul li.comentEditorHtml').show();

        var texto = strip(textarea.val());

        textarea.tinymce().remove();

        if (texto != undefined) {
            textarea.get(0).value = texto;
        }

        this.showContaChar(strComent);


    }
    this.abrirHtml = function (strComent) {

        var textarea = $(this.id + ' div.' + strComent + ' textarea');
        $(this.id + ' input[name=hidTemHtml_' + strComent + ']').val(1);

        textarea.removeClass('plano').addClass('html');

        if (!textarea.tinymce()) {
            this.formatarTinyMCE(textarea);
        }

        this.hideContaChar(strComent)

        $(this.id + ' div.' + strComent + ' ul li.comentEditorTxt').show();
        $(this.id + ' div.' + strComent + ' ul li.comentEditorHtml').hide();
    }
    /**
     * 
     */
    this.botoes = function () {
        var funcao = "javascript:void(0);";
        var estadoAluno, estadoProf, estadoDica;

        if ($(this.caixaAluno).length > 0) {
            this.textosComentario["Aluno"] = this.tratarNome($(this.linkAluno).html());
            $(this.linkAluno).attr('href', funcao).click(function () { comentario.abrirComentario('Aluno'); });
            estadoAluno = ($(this.textoAluno).val() != "") ? 2 : 1;
            this.trocarNome("Aluno", estadoAluno);
        }

        if ($(this.caixaProf).length > 0) {
            this.textosComentario["Prof"] = this.tratarNome($(this.linkProf).html());
            $(this.linkProf).attr('href', funcao).click(function () { comentario.abrirComentario('Prof'); });
            estadoProf = ($(this.textoProf).val() != "") ? 2 : 1;
            this.trocarNome("Prof", estadoProf);
        }

        if ($(this.caixaDica).length > 0) {
            this.textosComentario["Dica"] = this.tratarNome($(this.linkDica).html());
            $(this.linkDica).attr('href', funcao).click(function () { comentario.abrirComentario('Dica'); });
            estadoDica = ($(this.textoDica).val() != "") ? 2 : 2;
            this.trocarNome("Dica", estadoDica);
        }
    }

    /**
     * 
     */
    this.tratarNome = function (texto) {
        var padrao = new RegExp("\\((.*)\\)(.*)");
        var resultado = padrao.exec(texto);

        texto = resultado[1];
        texto = texto.split('|');
        texto.push(resultado[2]);

        return texto;
    }

    /**
     * Troca os nomes do comentarios
     */
    this.trocarNome = function (tipo, numero) {
        if (numero == 1 || numero == 2) {
            var campo = this.id + ' div.coment' + tipo;
            var textarea = $(campo + ' textarea');
            var texto = strip(textarea.val());
            numero = (texto != "" && texto != undefined) ? 2 : 1;
        }
        var texto = this.textosComentario[tipo][numero - 1] + " " + this.textosComentario[tipo][3]

        $(this.id + ' ul li.coment' + tipo + ' a').html(texto);

    }

    /**
     * 
     */
    this.abrirComentario = function (tipo) {
        var campoAtual, campoOutro, campoOutro2, valorAtual, valorOutro, valorOutro2, tipoOutro, tipoOutro2;

        if (tipo == 'Aluno') {
            campoAtual = this.caixaAluno;
            campoOutro = this.caixaProf;
            campoOutro2 = this.caixaDica;
            tipoOutro = 'Prof';
            tipoOutro2 = 'Dica';
        } else if (tipo == 'Prof') {
            campoAtual = this.caixaProf;
            campoOutro = this.caixaAluno;
            campoOutro2 = this.caixaDica;
            tipoOutro = 'Aluno';
            tipoOutro2 = 'Dica';
        } else if (tipo == 'Dica') {
            campoAtual = this.caixaDica;
            campoOutro = this.caixaAluno;
            campoOutro2 = this.caixaProf;
            tipoOutro = 'Aluno';
            tipoOutro2 = 'Prof';
        }

        $(campoAtual).toggle();
        $(campoOutro).hide();
        $(campoOutro2).hide();

        valorAtual = ($(campoAtual).css('display') == 'none') ? 2 : 3;
        valorOutro = ($(campoOutro).css('display') == 'none') ? 2 : 3;
        valorOutro2 = ($(campoOutro2).css('display') == 'none') ? 2 : 3;

        var textarea = $(campoAtual + ' textarea');
        var tmpHTML = ($(campoAtual + ' input[name=hidTemHtml_coment' + tipo + ']').val() == '1');

        if (tmpHTML) {
            textarea.removeClass('plano').addClass('html');
            if (!textarea.tinymce()) {
                this.formatarTinyMCE(textarea);
            }

        }

        this.trocarNome(tipo, valorAtual);
        this.trocarNome(tipoOutro, valorOutro);
        this.trocarNome(tipoOutro2, valorOutro2);

    }

    /**
     *
     */
    this.verificar = function (tipo) {

        var tmpHTML = ($(this.id + ' input[name=hidTemHtml_coment' + tipo + ']').val() == '1');

        if (tmpHTML) {

            $(this.id + ' div.coment' + tipo + ' ul li.comentEditorTxt').show();
            $(this.id + ' div.coment' + tipo + ' ul li.comentEditorHtml').hide();
        } else {
            this.contaChar('coment' + tipo);
            $(this.id + ' div.coment' + tipo + ' ul li.comentEditorTxt').hide();
            $(this.id + ' div.coment' + tipo + ' ul li.comentEditorHtml').show();
        }

    }

    this.contaChar = function (strComent) {
        var textarea = $(this.id + ' div.' + strComent + ' textarea');
        var optionsT = {
            'maxCharacterSize': parseInt(textarea.attr('maxchar')),
            'originalStyle': 'originalTextareaInfo',
            'warningStyle': 'warningTextareaInfo',
            'warningNumber': 40,
            'displayFormat': '#left caracteres restantes'
        };

        textarea.textareaCount(optionsT);

    }
    this.hideContaChar = function (strComent) {
        var textarea = $(this.id + ' div.' + strComent + ' textarea');
        textarea.textareaCount('wait', true);
    }
    this.showContaChar = function (strComent) {
        var textarea = $(this.id + ' div.' + strComent + ' textarea');
        if (textarea.textareaCount('exists')) {
            textarea.textareaCount('wait', false);
        } else {
            this.contaChar(strComent);
        }
    }

    /**
    * Formata o campo textarea como TinyMCE
    * @param HTMLTextareaElement Campo de texto HTML
    */
    this.formatarTinyMCE = function (campo) {

        campo.tinymce($.extend({}, comentario.formatacaoTine, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));

//        campo.tinymce({
//            // Language
//            language: 'pt',
//            encoding: "html",

//            // General options
//            theme: "advanced",
//            plugins: "equacao,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",

//            // Skin options
//            skin: "o2k7",
//            skin_variant: "silver",

//            // Theme options
//            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,forecolor,backcolor,|,styleselect,formatselect,cut,copy,paste,pastetext,pasteword",
//            theme_advanced_buttons2: "outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,|,tablecontrols,|,hr,|,sub,sup,|,charmap,|,equacao,image",
//            theme_advanced_buttons3: "",
//            theme_advanced_buttons4: "",
//            theme_advanced_toolbar_location: "top",
//            theme_advanced_toolbar_align: "left",
//            theme_advanced_statusbar_location: "bottom",
//            theme_advanced_resizing: false,

//            file_browser_callback: "fileBrowserCallBack",

//            // Example content CSS (should be your site CSS)
//            //content_css: "css/content.css",
//            content_css: "",

//            // Drop lists for link/image/media/template dialogs
//            template_external_list_url: "lists/template_list.js",
//            external_link_list_url: "lists/link_list.js",
//            external_image_list_url: "lists/image_list.js",
//            media_external_list_url: "lists/media_list.js",

//            // Style formats
//            style_formats: [
//                    { title: 'Negrito', inline: 'b' },
//                    { title: 'Texto em vermelho', inline: 'span', styles: { color: '#ff0000'} },
//                    { title: 'Cabeçalho em vermelho', block: 'h1', styles: { color: '#ff0000'} },
//                    { title: 'Exemplo 1', inline: 'span', classes: 'example1' },
//                    { title: 'Exemplo 2', inline: 'span', classes: 'example2' },
//                    { title: 'Estilos de tabela' },
//                    { title: 'Linha 1', selector: 'tr', classes: 'tablerow1' }
//            ],

//            formats: {
//                alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
//                aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
//                alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
//                alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
//                bold: { inline: 'span', 'classes': 'bold' },
//                italic: { inline: 'span', 'classes': 'italic' },
//                underline: { inline: 'span', 'classes': 'underline', exact: true },
//                strikethrough: { inline: 'del' },
//                customformat: { inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format'} }
//            },

//            htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined)


//        });
    }

    this.init();
}

/*function fileBrowserCallBackAlternativa(field, url, type, win) {
    if (carregarPopupImagem != undefined)
        carregarPopupImagem(field, url, type, win);
}

function atualizarImagem() {
    _win.document.forms[0].elements[_field_name].value = document.getElementById('strImgEditorEnunciado').value;
}*/

