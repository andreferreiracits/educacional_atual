//$(function(){
	//$('.simuladorDOM').each(function(){
		// $(this).load('contentSim.asp', {'url' : $(this).html()})
	//})
//})


function writeFlashBI(p) {
	writeAnimacaoBI(
		'D27CDB6E-AE6D-11cf-96B8-444553540000',
		'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0',
		'application/x-shockwave-flash',
		p
	);
}


function writeAnimacaoBI(cls, cb, mt, p) {
	
	
	
	var h = '', n;
	h += '<object classid="clsid:' + cls + '" codebase="' + cb + '"';
	h += typeof(p.width) != "undefined" ? 'width="' + p.width + '"' : '';
	h += typeof(p.height) != "undefined" ? 'height="' + p.height + '"' : '';

	
	h += '>';

	for (n in p)
		h += '<param name="' + n + '" value="' + p[n] + '">';

	h += '<embed type="' + mt + '"';

	for (n in p)
		h += n + '="' + p[n] + '" ';

	h += '></embed></object>';
	

	document.write(h);
	
}
