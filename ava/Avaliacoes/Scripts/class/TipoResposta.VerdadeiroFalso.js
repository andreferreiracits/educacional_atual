//adicicao dos metodos da verdadeiro falso
TipoResposta.prototype.initVerdadeiroFalso = function(){
    var tiporesposta = this;
};

Alternativa.prototype.initVerdadeiroFalso = function(){
    var alternativa = this;

    this.botoesVerdadeiroFalso = function () {
        $(this.id + ' ul li.altResposta > input:radio').click(function () { alternativa.callTipo("selecionarCorreta", this); });
    };

    this.selecionarCorretaVerdadeiroFalso = function (objeto) {
        var tmpId = $(objeto).attr('id').split('_');
        var idAlt = tmpId[2];
        var tmpIdHidden = "#" + tmpId[0] + '_' + tmpId[2];

        if ($(objeto).val().toUpperCase() == "V") {
            $(tmpIdHidden).val(' ' + idAlt + ' ');
        } else {
            $(tmpIdHidden).val(' ');
        }
        $(objeto).parent().parent().find('.Correta').removeClass('Correta');
        $(objeto).parent().addClass('Correta');
        

    };

};
