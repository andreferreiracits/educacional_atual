//$(function(){
	//$('.simuladorDOM').each(function(){
		// $(this).load('contentSim.asp', {'url' : $(this).html()})
	//})
//})

function writeSimulador(parms) {
    var simulador = $("<div>")
        .attr("id", "simulador" + parms.id)
        .html('<iframe src="' + parms.url + '" frameborder="no" height="' + parms.y + '" width="' + parms.x + '">');

    simulador.appendTo($("#tagSimulador" + parms.id));
}
