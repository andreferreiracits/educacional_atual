function Instrucao(sId) {
    var instrucao = this;

    this.id = '#' + sId;
    this.nome = sId;

    this.init = function () {
        textarea = $(this.id);

        this.formatarTinyMCE(textarea);
    }

    /**
    * Formata o campo textarea como TinyMCE
    * @param HTMLTextareaElement Campo de texto HTML
    */
    this.formatarTinyMCE = function (campo) {
        campo.tinymce(formatInstrucaoAplicacao)
    }
    this.init();
}


function fileBrowserCallBack(field, url, type, win) {
    if (carregarPopupImagem != undefined)
        carregarPopupImagem(field, url, type, win);
}
