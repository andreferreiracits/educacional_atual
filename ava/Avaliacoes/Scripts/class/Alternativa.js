function Alternativa(sLetra, sId, sTipo, oPai) {
    var alternativa = this;

    this.letra = sLetra;
    this.id = '#' + sId;
    this.nome = sId;
    this.tipo = sTipo;
    this.comentario = undefined;

    this.pai = oPai;

    
    this.tipoAtual = oPai.tipoAtual;
    this.lstTipos = oPai.lstTipos;
    /**
     * 
     */
    this.init = function () {
        this.callTipo("init");

        /*this.tipoHTML = ($(this.id + ' input:hidden[name=hidTemHtml]').val() == '1')*/

        this.botoes();

        this.callTipo("aplicarComentario");
    }

    this.initDefault = function () {
    }

    this.callTipo = function (func) {
        var funcDefault = func + this.lstTipos[0];
        func = func + this.lstTipos[this.tipoAtual];
        var args = []; // empty array
        // copy all other arguments we want to "pass through"
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        if (this[func]) {
            return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return this[funcDefault].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
    this.aplicarComentarioDefault = function () {

        this.comentario = new Comentario(this.nome, alternativa.formatacaoTineAlternativa() );
    }
    this.aplicarComentarioDiscursivaAutomatica = function () {

    }
    /* 
    
    KE: Deixei comentado pois estava dando erro

    this.trocarLetraDefault = function (sLetra) {
    this.letra = sLetra;
    $(this.id + ' div.opcaoLetra').html("(" + this.letra + ")");
    }

    this.trocarLetra = function (sLetra) {
    this.callTipo("trocarLetra");
    }
    */
    this.trocarLetra = function (sLetra) {
        this.letra = sLetra;
        $(this.id + ' div.opcaoLetra').html("(" + this.letra + ")");
    }
    /**
     * 
     */

    this.tinyAlternativaDefault = function () {

        var tipoHTML = ($(this.id + ' input:hidden[name=hidTemHtml]').val() == '1')
        alternativa._tinyEstilo(tipoHTML);

    }
    this.tinyAlternativaAssociativa = function () {
        //Se existir esse campo
        if ( $(this.id + ' input:hidden[name=hidTemHtmlD]').attr("name") ) {

            var tipoHTML = ( $(this.id + ' input:hidden[name=hidTemHtmlD]').val() == '1' )
            alternativa._tinyEstilo(tipoHTML);

        } else {
            alternativa.tinyAlternativaDefault();
        }
    }


    this._tinyEstilo = function (temHTML) {
        var textarea = $(this.id + ' textarea.txtareaResposta');

        if (temHTML) {
            this.formatarTinyMCE(textarea);
            $(this.id + ' ul li.editorTxt').show();
            $(this.id + ' ul li.editorHtml').hide();
        } else {
            $(this.id + ' ul li.editorTxt').hide();
            $(this.id + ' ul li.editorHtml').show();
            this.contaChar()
        }
    }

    this.botoes = function () {
        var funcao = "javascript:void(0);";
//        var textarea = $(this.id + ' textarea.txtareaResposta');
//        Trata os tipos Texto e HTML
        
//        if (this.tipoHTML) {
//            this.formatarTinyMCE(textarea);

//            $(this.id + ' ul li.editorTxt').show();
//            $(this.id + ' ul li.editorHtml').hide();
//        } else {
//            $(this.id + ' ul li.editorTxt').hide();
//            $(this.id + ' ul li.editorHtml').show();
//            this.contaChar()
//        }

        this.callTipo("tinyAlternativa");
        this.callTipo("botoes");
        this.callTipo("botoesRemover");

        $(this.id + ' ul li.localBtnRemover a.btnAdicione').hide();

        $(this.id + ' ul li.editorTxt a').attr('href', funcao).click(function () { alternativa.abrirTxt(); });
        $(this.id + ' ul li.editorHtml a').attr('href', funcao).click(function () { alternativa.abrirHtml(); });
    }

    this.botoesDefault = function () { }

    this.botoesRemoverDefault = function () 
    {
        var funcao = "javascript:void(0);";
        
        $(this.id + ' ul li.localBtnRemover a.btnRemover').attr('href', funcao).click(function () { alternativa.executarRemover(); });
    }

    this.executarRemover = function() {
        this.pai.removerAlternativa(this.letra);
        //$(this.id).remove();
    }
    this.remover = function () {
        $(this.id).remove();
    }
    this.selecionarCorretaDefault = function (objeto) {
        var li = $(objeto).parent().parent().parent().parent();
        $("li.Alternativa").removeClass('Correta');
        $("li.Alternativa:has(input:checked)").addClass('Correta');
    }


   
    /**
    * Abrir o modo HTML da alternativa
    */
    this.abrirHtml = function () {
        var textarea = $(this.id + ' textarea.txtareaResposta');
        var li = $(this.id + ' ul li.editorTxt a')

        // Grava que o campo tem HTML
        $(this.id + ' input:hidden[name=hidTemHtml]').val(1);
        $(this.id + ' input:hidden[name=hidTemHtmlD]').val(1);

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
    * Abrir o modo Texto da alternativa
    */
    this.abrirTxt = function () {
        var textarea = $(this.id + ' textarea.txtareaResposta');

        // Grava que o campo não tem HTML
        $(this.id + ' input:hidden[name=hidTemHtml]').val(0);
        $(this.id + ' input:hidden[name=hidTemHtmlD]').val(0);

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
    * Formata o campo textarea como TinyMCE
    * @param HTMLTextareaElement Campo de texto HTML
    */
    this.formatarTinyMCE = function (campo) {
        campo.tinymce($.extend({}, this.formatacaoTineAlternativa(), { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));
    }
    this.formatacaoTineAlternativa = function () {
        return this.callTipo("formatacaoTineAlternativa")
    }
    this.formatacaoTineAlternativaDefault = function () {
        return formatAlternativaQuestao;
    }


    this.exibirAdicionar = function(bUltimo) {
        if (bUltimo)
            $(this.id + ' ul li.localBtnRemover a.btnAdicione').show();
        else
            $(this.id + ' ul li.localBtnRemover a.btnAdicione').hide();
    }

    this.toString = function() { return "Alternativa"; }

    this.contaChar = function () {
        var textarea = $(this.id + ' textarea.txtareaResposta');
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
        var textarea = $(this.id + ' textarea.txtareaResposta');
        textarea.textareaCount('wait', true);
    }
    this.showContaChar = function () {
        var textarea = $(this.id + ' textarea.txtareaResposta');
        if (textarea.textareaCount('exists')) {
            textarea.textareaCount('wait', false);
        } else {
            this.contaChar();
        }
    }

    this.init();
}


/*function fileBrowserCallBack(field, url, type, win) {
    if (carregarPopupImagem != undefined)
        carregarPopupImagem(field, url, type, win);
}*/

/*function atualizarImagem() {
    _win.document.forms[0].elements[_field_name].value = document.getElementById('strImgEditorEnunciado').value;
}*/
