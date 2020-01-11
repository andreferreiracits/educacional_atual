function Filtro(objeto) {
    
    if (objeto != undefined) {
        this.campo = objeto.campo;
        this.nome = objeto.nome;
        this.valor = objeto.valor;
    }
    
    this.toString = function() {
        return "{ campo: '" + this.campo + "', nome: '" + this.nome + "', valor: '" + this.valor + "' }";
    }
}