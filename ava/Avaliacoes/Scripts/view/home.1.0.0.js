var mensagem, confirm, dataMode, ajuda;

function inicializar() {
    var caminhoGerenciadorGrupos = '/Recursos/GerenciadorGrupos';
    mensagem = new Mensagem("alerta", "#prevAviso");
    confirm = new Confirm("alerta", "#prevAviso");

    $("#dlgAvaliacaoRapida").dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 900, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false,
        open: function () {
            window.setTimeout(function () { $(document).unbind('mousedown.dialog-overlay') .unbind('mouseup.dialog-overlay'); }, 100);
        }
    });


    $("#sec025btnAbrirAvRapida").click(function () {
        $("#dlgAvaliacaoRapida").dialog("open");
        $("#sec025AvRapida").avaliacaorapida({ 'removerTitulo': true, 'caminhoBase': caminhoBase, 'CodigoOrigem': 'SEC02511', 'fClose': function () { $("#dlgAvaliacaoRapida").dialog("close"); $("#sec025AvRapida").empty(); }, 'caminhoGerenciadorGrupos': caminhoGerenciadorGrupos });
    }).attr('href', 'javascript:void(0);');

    inicializaElementos($('body'));
}

function loadGet(link, callBack) {
    $.ajax({
        url: link,
        type: "GET",
        cache: false,
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                callBack(false)
            } else {
                callBack(true, dados)
            }
        },
        error: function () {
            callBack(false)
        }
    });
}

function inicializaElementos(elemento) {
    elemento.find("div[data-acao='load']").each(function () {
        var $this = $(this);
        var link = $this.find('a').attr('href');
        $this.find('a').remove();
        loadGet(link, function (sucess, dados) {
            $this.html('');
            if (sucess) {
                $this.html(dados);
                inicializaElementos($this)
            }
        })
    });

    elemento.find('table[data-tabela="mais"]').each(function () {
        var $this = $(this);
        var $carregando = $this.attr('data-tabela-carrendo');
        var link = $this.find('tfoot a').attr('href');
        $this.find($carregando).hide();
        $this.find('tfoot a').click(function () {
            $(this).hide()
            $this.find($carregando).show();
            loadGet(link, function (sucess, dados) {
                if (sucess) {
                    $this.find('tfoot a').remove();
                    $this.find('tbody').append($(dados).find('tbody').html());
                    $this.find('tfoot td').html('');
                    $this.find('tfoot td').append($(dados).find('tfoot td').html());
                    inicializaElementos(elemento);
                } else {
                    $this.find($carregando).hide();
                    $this.find('tfoot a').show();
                }
            })

        }).attr('href', 'javascript:void(0);');


    });
}


