var FUNCAO_VAZIA = 'javascript:void(0)';
var caminhoBase = $('base').attr('href') == undefined ? "./" : $('base').attr('href');
var carregando;
var lstFilesJs = [];
var lstScripts = [];
var tour;

$(document).ready(function () {

    carregando = new Carregando("carregandoGeral");

    var tipoMaster = undefined;

    if ($("input[name='typepgmaster']").length > 0) {

        tipoMaster = $("input[name='typepgmaster']").val();

        $("body").addClass('bodyAvaliacoes' + tipoMaster)
    }
    var caminhoBarra = undefined;
    try {
        caminhoBarra = baseBarraSuperior;
    } catch (e) { }

    caminhoBarra = "";

    if (caminhoBarra && caminhoBarra != "") {

        $.ajax({
            url: baseBarraSuperior,
            type: "GET",
            cache: true,
            success: function (dados, status, xhttp) {
                //carregar todos os arquivos e scripts da página

                $(dados + ', script').each(function () {

                    if (this.nodeName.toLowerCase() == "script") {

                        if ($(this).attr('src')) {

                            lstFilesJs.push($(this).attr('src'));
                        }

                        if ($.trim(this.text).length > 0) {

                            //retira o comando para abrir o aurelio
                            if (!$(this).attr('for') && !$(this).attr('event')) {
                                lstScripts.push(this.text);
                            }
                        }
                    }

                });


                $('#educ_cabecalho').html($(dados).find("#superior").html());
                $('#coluna1024').html($(dados).find("#inc1024").html());
                $('#educ_bgcorpo').append($(dados).find("#rodape").html());

                loadScript();

                callIni()
            }
        });
    } else {
        callIni();
    }

    atualizarSessao();

    //acompanhaRefactor();
    //carregar rodape e cabecalho do portal

});

function loadScript() {
    if (lstFilesJs.length <= 0) {
        executeScript();
        return;
    }
    var script = lstFilesJs.shift();
    $.getScript(script).done(function () {
        loadScript();
    });
}

function executeScript() {
    for (var i = 0; i < lstScripts.length; i++ ) {
        var script = lstScripts[i].replace('<!--', '');
        eval(script + ";")
    }
    
}

function callIni() {


    tour = new Tour("#MainAvaliacoes #conteudo", caminhoBase + '/Home/RoteiroTour', caminhoBase + '/Home/VisualizouRoteiro', $('#tourVisualizou').val() != 1, onInitTour, '#tourAbrir');
    tour.onPreLoad = function () {
        carregando.mostrar();
    }
    tour.onLoad = function (dados) {
        carregando.esconder();
        return !retornoErro(dados);
    }

    tour.onSaveView = function (dados) {
        retornoErro(dados);
    }

    tour.onStep = function (roteiro, passo) {
        $('.menuTour .tourselect option').each(function () {
            if ($(this).val() == roteiro) {
                $(this).attr('selected', 'selected');
            }
        });
    }

}
function onInitTour() {

    if (inicializar != undefined)
        inicializar();
}

function exibirMensagem(dados, nome) {
    var idMensagem = (nome == undefined) ? '#alerta' : '#' + nome;
    
    $(idMensagem).mensagem({ type: "alerta", timeout: 5000, onClose: function() { }, text: dados });
}

function retornoErro(dados) {
    if (Mensagem.TemErro(dados)) {
        mensagem.exibir($(dados));
        return true;
    }
    /*if ($(dados).hasClass('erro')) {
        mensagem.exibir($(dados));
        return true;
    }*/
    return false;
}

function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}

String.prototype.trim = function() {
    var str = this.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

//disparar a chamada para atualizar a sessao

function atualizarSessao() {
    var onClick = false;
    $('body').mousedown(function () {
        onClick = true;
    });

    function wakeupSessao() {
        if (onClick) {
            onClick = false;
            var link = caminhoBase + "/Portal/WakeUp.asp";
            $.ajax({
                url: link,
                type: "GET",
                cache: false,
                success: function (dados, status, xhttp) {

                }
            });
        }
    }

    setInterval(wakeupSessao, 10 * (60 * 1000));
}



function acompanhaRefactor() {

//    function chamarLog1() {
//        var link = caminhoBase + "/TesteFramework/Log";
//        $.ajax({
//            url: link,
//            type: "GET",
//            cache: false,
//            success: function (dados, status, xhttp) {
//                chamarLog2();
//            }
//        });
//    }
//    function chamarLog2() {
//        var link = caminhoBase + "/TesteComp/TesteComponente/Log";
//        $.ajax({
//            url: link,
//            type: "GET",
//            cache: false,
//            success: function (dados, status, xhttp) {

//            }
//        });
//    }
//    chamarLog1();

}
