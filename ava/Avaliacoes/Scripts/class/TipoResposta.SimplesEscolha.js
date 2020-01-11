//adicicao dos metodos da simples escolha
TipoResposta.prototype.initSimplesEscolha = function () {
    var tiporesposta = this;
};

Alternativa.prototype.initSimplesEscolha = function(){
    var alternativa = this;

    this.botoesSimplesEscolha = function(){
        $(this.id + ' ul li.altResposta > input:radio').click(function () { alternativa.callTipo("selecionarCorreta",this); });
    };

};