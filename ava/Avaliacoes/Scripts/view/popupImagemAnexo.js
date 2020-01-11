var FUNCAO_VAZIA = 'javascript:void(0)';
var arquivo, imagem, mensagemAnexo;
var carregando;

$(document).ready(function () {
    var link = $('#frmSalvarImagem').attr('action');
    arquivo = new Arquivo("SalvarImagemAnexo", "frmSalvarImagem", "ifrSalvarAnexo", link, carregarImagem, 'txtIdObjeto');
    mensagemAnexo = new Mensagem("alertaAnexo");
    carregando = new Carregando("carregandoAnexo");

    $('#addImagemAnexo').attr('href', FUNCAO_VAZIA).click(salvarImagem);
});

function salvarImagem() {
	carregando.mostrar();
	arquivo.executar();
}

function carregarImagem(dados) {
	
	if (dados != "" && dados != undefined) {
	    if ($(dados).attr('class') && $(dados).attr('class').indexOf("erro") >= 0) {
	        mensagemAnexo.exibir($(dados));
	        carregando.esconder();
            return
	    }

		$('div#anexos').html($(dados)).show();
	
		window.opener.carregarCaminhoImagem($('#txtCaminhoArquivo', dados).val());

		window.close();

	} else {
		$('div#anexos').hide();
		$('div#anexar').show();
	}
	carregando.esconder();
}

