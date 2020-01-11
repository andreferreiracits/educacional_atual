function PaginacaoRealizacao(idFormPaginacao) {
    this.version = 0.1;

    this.id = idFormPaginacao;
    this.form = "form#" + this.id;

    this.init = function () {
        this.montarLinks();
    }

    this.montarLinks = function () {

    }


    this.init();
}