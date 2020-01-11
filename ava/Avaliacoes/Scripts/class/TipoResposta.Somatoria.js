//adicicao dos metodos da somatoria
TipoResposta.prototype.initSomatoria = function(){

    var tiporesposta = this;

    this.selecionarSomatoria = function () {
        var letraCodigo = 'a'.charCodeAt(0);
        var iniContador = 1;
        var alternativa;
        alternativas = [];

        $(this.lista + ' > li').each(function () {
            alternativa = new Alternativa(String.fromCharCode(letraCodigo++), $(this).attr('id'), "alternativa", tiporesposta);

            $(this).find('label.Somatoria').html('Valor ' + (iniContador))
            iniContador *= 2;
            tiporesposta.alternativas.push(alternativa);
        });

        $(this.id).show();
    };

    this.atualizarAlternativasSomatoria = function () {
        var i = 0;
        var letraCodigo = 'a'.charCodeAt(0);
        var iniContador = 1;
        for (i = 0; i < this.alternativas.length; i++) {
            this.alternativas[i].trocarLetra(String.fromCharCode(letraCodigo++));
            $(this.alternativas[i].id + ' label.Somatoria').html('Valor ' + (iniContador));
            iniContador *= 2;
        }
    };

};

Alternativa.prototype.initSomatoria = function(){
    var alternativa = this;

    this.botoesSomatoria = function () {
        $(this.id + ' ul li.altResposta > input:checkbox').click(function () { alternativa.callTipo("selecionarCorreta", this); });
    };
};