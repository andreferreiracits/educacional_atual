function mudaImagem(elemento) {
    var mais = false;
    if (elemento.getAttribute("src").substring(elemento.getAttribute("src").lastIndexOf("/")) == "/ic_mais.png") {
        mais = true;
    }
    $(".notificacoes_icexpande").attr("src", elemento.getAttribute("src").substring(0, elemento.getAttribute("src").lastIndexOf("/")) + "/ic_mais.png");
    if (mais) {
        elemento.setAttribute("src", elemento.getAttribute("src").substring(0, elemento.getAttribute("src").lastIndexOf("/")) + "/ic_menos.png");
    }
}

function responderAvaliacao(IdAplicacao,IdAvaliacaoRealizada,flagNovaJanela,intMaxTentativas,intTentativas,idAvaliacao) {
    document.frm2.action = "/academico/servicos/unvAvaliacao/respondeAval.asp";
    document.frm2.IdAplicacao.value = IdAplicacao;
    document.frm2.IdAvaliacaoRealizada.value = IdAvaliacaoRealizada;
    document.frm2.submit();
}

function exibirLayerSenha(IdAplicacao, idAvaliacaoRealizada, flagNovaJanela, intMaxTentativas, intTentativas, idAvaliacao) {
    var link;
    $("#btnSenhaAcesso").click(function(e){
        e.preventDefault();
        confirmarSenhaAcesso(IdAplicacao, idAvaliacaoRealizada, flagNovaJanela, intMaxTentativas, intTentativas, idAvaliacao);
    });
    $("#strSenhaAux").val("");
    link = $("<a></a>");
    link.attr("href", "#divSenha");
    link.fancybox();
    link.click();
    $("#strSenhaAux").focus();
}

function confirmarSenhaAcesso(idAplicacao, idAvaliacaoRealizada, flagNovaJanela, intMaxTentativas, intTentativas, idAvaliacao) {
    var objStrSenha
    objStrSenha = $("#strSenhaAux");

    //Validar senha ---------------------------------
    if (objStrSenha.val() == "")
    {
        alert("Digite a senha corretamente")
        objStrSenha.select();
        return(false);
    }
    //-----------------------------------------------

    document.frm2.strSenhaDigitada.value = objStrSenha.val();

    responderAvaliacao(idAplicacao,idAvaliacaoRealizada,flagNovaJanela,intMaxTentativas,intTentativas,idAvaliacao);

    $.fancybox.close();
}

function StartChat(id)
{
    //Validar se usuário está usando IE, caso contrário não deverá exibir a ferramenta -------------------------------------
    if (navigator.appName.indexOf('Microsoft') == -1) {
        alert("Ferramenta não disponível para a sua versão de browser.\nDisponível apenas para browser Internet Explorer.");
    }
    else {
        window.open('/academico/servicos/unvSalaVirtual/pop_sala/startchat.asp?t=0&ChannelOID=' + id,'StartChat','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=50,height=50,top=5000,left=5000');
    }
    return(false);
}

function abre_janela(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
    toolbar_str = toolbar ? 'yes' : 'no';
    menubar_str = menubar ? 'yes' : 'no';
    statusbar_str = statusbar ? 'yes' : 'no';
    scrollbar_str = scrollbar ? 'yes' : 'no';
    resizable_str = resizable ? 'yes' : 'no';
    window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

(function ($) {

    $.fn.notificacoes = function (options) {
        PosiLog.logDebug(options);
        this.opts = jQuery.extend($.notificacoesdefaultOptions, options || {});
        PosiLog.logDebug("getNotificacoes(" + this.opts.GETParamDefault.toString() + "," + $(this).attr("id") + "," + this.opts.toString() + ")");
        getNotificacoes(this.opts.GETParamDefault, $(this), this.opts);
    }

    function getNotificacoes(intTipo, target, opts) {
        var targetBt = ".bt-tudo";
        var templateUrl = opts.templateRootUrl + '/template.html';


        PosiLog.logDebug("[$.ajax] Notificacoes >>>>>>>>> Inciando chamada Ajax [" + templateUrl + "] ....");

        $.ajax({
            url: templateUrl,
            cache: false,
            success: function (htmlTemplate) {
                PosiLog.logDebug("[$.ajax] Notificacoes >>>>>>>>> Inciando chamada Ajax [" + opts.dataSourceUrl + '?enumTipoDado=' + intTipo + "] ....");

                $.ajax({
                    url: opts.dataSourceUrl + '?enumTipoDado=' + intTipo,
                    cache: false,
                    dataType: "json",
                    success: function (jSonDS, textStatus, XMLHttpRequest) {
                        htmlTemplate = htmlTemplate.replace(/<<staticContent>>/g, opts.staticContentUrl);
                        PosiLog.logDebug("[$.ajax.success] Notificacoes >>>>>>>>> Inserindo resultado na pagina. \ntextStatus: [" + textStatus + "]\ndata: [" + jSonDS + "]");

                        var template = jsontemplate.Template(htmlTemplate, { more_formatters: JSON.stringify });
                        var html = template.expand(jSonDS);
                        target.html(html);
                        
                        // Adiciona estilo "selecionado" ao botao que foi clicado.
                        target.find(targetBt).addClass('selected');
                        target.find(targetBt).append($('<span class=\'abadown\'><img src=\'' + opts.imgRootUrl + '/seta.png\' /></span>'));

                        $('#notificacoes_accordion').accordion({
                            fillSpace: true,
                            collapsible: true,
                            active: false
                        });

                        //Atualiza contador de notificações, se existente
                        if ($("#link-notificacoes").size() != 0)
                        {
                            var totalnotificacoes = 0;
                            $(".notificacoes_quant").each(function(index, para){
                                totalnotificacoes += parseInt($(para).text());
                            });
                            $("#link-notificacoes").text($("#link-notificacoes").text() + " (" + totalnotificacoes + ")");
                        }

                        if (target.is(":visible"))
                        {
                            target.show(0);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        PosiLog.logError("[$.ajax.error] Notificacoes >>>>>>>>> Erro ao tentar carregar .... \n" + textStatus + "\n\n" + XMLHttpRequest.toString())
                    }
                });
            }
        });
    }



    $.notificacoesdefaultOptions =
{
    dataSourceUrl: '',
    templateRootUrl: '',
    imgRootUrl: '',
    staticContentUrl: '',
    GETParamDefault: 0,
    GETParamTodos: 1,
    GETParamAviso: 1,
    GETParamColega: 2
}

})(jQuery);