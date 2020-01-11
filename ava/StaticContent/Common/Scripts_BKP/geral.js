jQuery(function ($) {

	
     $(document).ajaxComplete(function (ev, xhr, s) {
        //alert('event type: ' + ev.type);
        //alert('status: ' + xhr.status);
        //alert('url: ' + s.url);
		//var url = s.url;
        var url = xhr.responseText;

		//alert('aaa ' + xhr.responseText);
        //if ((url.indexOf('LoginMaster.js', 1) > 0) || (xhr.status == 500)) {
		if (url.indexOf('LoginMaster.js', 1) > 0) {
			
            window.top.location = '/AVA/Login/Home/Restrito';
        }

    });
	
		
    var url = location.href.toLowerCase();
    if (url.indexOf("/perfil/home/index/") != -1) {
        $("#lista_atividades").hide();
    }
});
function lightBoxAVA(t,o) {
    if (o == null) {
        t.fancybox();
    } else {
        t.fancybox(o);
    }
}
