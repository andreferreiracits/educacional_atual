function Ordenacao(sTipo, bAscendente) {
    this.tipo = (sTipo != undefined) ? sTipo : "";
    this.ascendente = (bAscendente != undefined) ? bAscendente : false;
}
Ordenacao.CRESCENTE = "crescente";
Ordenacao.DECRESCENTE = "decrescente";