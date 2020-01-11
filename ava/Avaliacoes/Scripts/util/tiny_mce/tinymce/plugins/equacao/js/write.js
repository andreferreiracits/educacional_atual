//$(function(){
	//$('.simuladorDOM').each(function(){
		// $(this).load('contentSim.asp', {'url' : $(this).html()})
	//})
//})
function writeSimulador(parms) {
	var h = '', n;
	
	h += '<div id="simulador'+parms.id+'"></div>'

	document.write(h);
	
	id = '#simulador'+parms.id
	
		$(function(){
			 $(id).load('contentSim.asp', {'url' : parms.url, 'x' : parms.x, 'y' : parms.y})
		})
}
