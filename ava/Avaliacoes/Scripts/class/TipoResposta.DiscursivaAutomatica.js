//adicicao dos metodos da DiscursivaManual escolha
TipoResposta.prototype.initDiscursivaAutomatica = function () {
    var tiporesposta = this;
};

Alternativa.prototype.initDiscursivaAutomatica = function () {
    var alternativa = this;

    $(this.id + ' input').keypress(function (e) {
        if (e.which == 13) {
            return false
        };
    });

};