//adicicao dos metodos da somatoria
TipoResposta.prototype.initLacunas = function () {

    var tiporesposta = this;
    this.separador = "&<|>&";

    this.valorInputs = "";

    this.tinyInputs = function () {
        var respostas = "";
        $("ul.itensResposta textarea[name=txtAlternativa]").each(function () {
            respostas += $(this).text() + tiporesposta.separador;
        });

        this.valorInputs = respostas.substring(0, respostas.length - tiporesposta.separador.length);
    }

    this.formatacaoTineEnunciadoLacunas = function () {
        this.tinyInputs();
        this.valorInputs = this.valorInputs.split(tiporesposta.separador);

        return $.extend({}, formatEnunciadoQuestao,
            {
                plugins: formatEnunciadoQuestao.plugins + ", novoCombo, novoInput",
                theme_advanced_buttons3: formatEnunciadoQuestao.theme_advanced_buttons3 + ",|, input, combo",
                valores_mce_input: this.valorInputs
            });
    }

    //To save
    this.tratarEnunciadoLacunas = function () {
        var lacunas_str;
        // Precisa do id certo da caixa de titulo
        var idEnunciado = $("textarea[name=txtEnunciado]").attr('id');
        lacunas_str = "";

        tinyMCE.execCommand('mceFocus', false, idEnunciado);
        var content = tinyMCE.activeEditor.getContent({ format: 'raw' });

        var lista = $(content).find(".mceInput, .mceCombo");

        lista.each(function (i, v) {

            var vals = $(v).attr("the_vals");

            if (lacunas_str == '') {
                lacunas_str = vals;
            } else {
                lacunas_str += tiporesposta.separador + vals;
            }

        });

        $('#lacunas').val(lacunas_str);

        if (lista.length > 25) {
            //alert('São permitidas no máximo 25 caixas por questão.');
            throw RecursosJS["msg005"];
        }
    };

};


Alternativa.prototype.initLacunas = function(){
    var alternativa = this;
};
