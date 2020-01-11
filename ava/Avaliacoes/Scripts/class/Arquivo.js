/**
 * Faz upload de arquivo de forma oculta utilizando iframes
 * @param sId Identificador do componente de arquivo anexo
 * @param sForm Identificador do formulário com o campo do tipo file
 */
function Arquivo(sId, sForm, sIframe, sCaminho, fRetorno, sCampos) {
	var arquivo = this;
	this.version = '0.2';

	this.id      = sId;
	this.origem  = sForm;
	this.caminho = sCaminho;
	this.retorno = fRetorno;

	this.form   = undefined;
	this.iframe = sIframe;
	this.campos = [];

	if (sCampos != undefined && sCampos != "") {
		if (sCampos.indexOf(',') > -1)
			this.campos = sCampos.split(',');
		else
			this.campos[0] = sCampos;
	}

	this.init = function () {
	    var novoFrame, novoForm;
	    var idForm = 'frm' + sId;

	    if (this.form == undefined) {
	        this.form = idForm;

	        novoForm = $('<form></form>', {
	            "id": idForm,
	            "name": idForm,
	            "method": "post",
	            "enctype": "multipart/form-data",
	            "target": this.iframe,
	            "action": this.caminho
	        });

	        novoFrame = $('iframe#' + this.iframe);
	        novoFrame.hide().load(function () {
	            arquivo.retorno($(this).contents().find('body').html());
	        });

	        $('form#' + this.origem).parent().append(novoForm);
	    }
	}

	this.executar = function () {
	    var formulario = $('form#' + this.form);
	    var frame = $('iframe#' + this.iframe);

	    var real = $('form#' + this.origem + ' input:file');
	    var clone = real.clone(true);

	    $(':not(iframe)', formulario).remove();

	    real.hide();
	    clone.insertAfter(real);

	    this.adicionarCampos(formulario);
	    real.appendTo(formulario);

	    frame.name = this.iframe;

	    formulario.attr('encoding', 'multipart/form-data');
	    formulario.attr('target', this.iframe);

	    if (formulario.get(0) != undefined)
	        formulario.get(0).target = this.iframe;

	    
	    formulario.submit();
	}

	this.adicionarCampos = function (formulario) {
	    var i = 0;
	    var campo, id;
	    for (i = 0; i < this.campos.length; i++) {

	        campo = $('#' + this.campos[i]).clone();
	        id = campo.attr('id') + "Anexo";

	        campo.attr('id', id);
	        campo.attr('name', id);

	        formulario.append(campo);
	    }
	}
	
	this.init();
}