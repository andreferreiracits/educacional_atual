function Project(terreno, planta, maquete) {
    this.terreno = terreno;
    this.planta = planta;
    this.maquete = maquete;
}

Project.prototype.setFamilia = function (familia) {
    this.familia = familia;
};

Project.prototype.setIsVencedor = function (isVencedor) {
    this.isVencedor = isVencedor;
};

Project.prototype.setMarker = function (marker) {
    this.marker = marker;
};