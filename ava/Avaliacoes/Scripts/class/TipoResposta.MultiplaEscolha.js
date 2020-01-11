//adicicao dos metodos da Multipla escolha
TipoResposta.prototype.initMultiplaEscolha = function () {
    var tiporesposta = this;
};

Alternativa.prototype.initMultiplaEscolha = function () {
    var alternativa = this;

    this.botoesMultiplaEscolha = function(){
        $(this.id + ' ul li.altResposta > input:checkbox').click(function () { alternativa.callTipo("selecionarCorreta",this); });
    };
};