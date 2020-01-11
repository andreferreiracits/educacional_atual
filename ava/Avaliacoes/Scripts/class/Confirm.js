function Confirm(sId, sIdPrevRodape) {
    var conf = this;
    this.version = "0.1";
    
    this.id = '#' + sId;
    this.nome = sId;
    this.nomeExtra = this.nome + "Rodape";
    this.idExtra = this.id + "Rodape";
    this.idPrevExtra = sIdPrevRodape;

    this.open = false;

    this.init = function () {
        $(this.id).hide();
        if ($(this.idExtra).length > 0) {
            $(this.idExtra).hide();
        }
        
    }

    this.exibir = function (dados, acaoConfirm, acaoNao) {
        $(this.id).mensagem({ type: dados.attr('class'), onClose: function () {
            if (acaoNao) {
                acaoNao();
            }
            conf.close();
        },
            text: dados.html()
        });

        if (this.idPrevExtra) {
            if ($(this.idExtra).length <= 0) {
                $('<div id="' + this.nomeExtra + '" class="mensagem comBotao"></div>').insertBefore($(this.idPrevExtra));

            }
        }
        if ($(this.idExtra).length > 0) {
            $(this.idExtra).mensagem({ type: dados.attr('class'), onClose: function () {
                if (acaoNao) {
                    acaoNao();
                }
                conf.close();
            }, text: dados.html()
            });
            $(this.idExtra).find('input').remove();
        }
        $(".btnConfirmNao").click(function () {
            if (acaoNao) {
                acaoNao();
            }
            conf.close();
        });
        $(".btnConfirmSim").click(function () {
            acaoConfirm();
            conf.close();
        });

        this.open = true;
    }

    this.close = function () {
        //TODO: -Resolve temporariamente, descobrir porque perde a instância - BUG 170 
        mensagem = new Mensagem("alerta", ".navegacaoBotoes");
        if (!this.open) {
            return;
        }
        this.open = false;
        try {
            $(this.id).mensagem('destroy');
        } catch (e) { }
        if ($(this.idExtra).length > 0) {
            try {
                $(this.idExtra).mensagem('destroy');
            } catch (e) { }
        }
    }


    this.focus = function () {
        $(document).scrollTop(0);
    }

    this.toString = function() {
        return "Confirm - " + this.nome;
    }

    this.init();
}