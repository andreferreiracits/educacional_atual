//$(function(){
	//$('.simuladorDOM').each(function(){
		// $(this).load('contentSim.asp', {'url' : $(this).html()})
	//})
//})

function simuladores() {
    $("div.testeSimulador").each(function () {
        var parametros = $(this).find("input[type=hidden]").val();
        var array = parametros.substring(parametros.indexOf('{') + 1, parametros.length - 1);
        var parms = $.parseJSON('{' + replaceAll(array, '\'', '"') + '}');

        var simulador = $("<div>")
        .attr("id", "simulador" + parms.id)
        .html('<iframe src="' + parms.url + '" frameborder="no" height="' + parms.y + '" width="' + parms.x + '">');

        simulador.insertBefore($(this));
    });
}
function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}
