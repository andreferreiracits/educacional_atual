var FUNCAO_VAZIA = "javascript:void(0)";



function Realizacao(containerPrincipal, lstTipos, questaoAtual, lstQuestoes, etapaAtual) {
    var rlz = this;

    this.$this = containerPrincipal;
    this.version = "0.1.0";

    this.etapaAtual = etapaAtual;

    this.btnLimpar = "a#btnLimpar";
    this.btnRevisar = "a#btnRevisar.btnRevisar";

    this.carregador = this.$this.data('settings').carregando;

    this.lista = lstQuestoes;
    this.questaoAtual = questaoAtual; //posição dentro da lista de questoes

    this.lstTipos = lstTipos;
    this.tipoAtual = 0;

    this.retornoCarregar = function () { };
    this.retornoErro = function () { };

    this.limiteChar = 2000;
    this.limiteCharAutomatica = 100;

    this.separadorLacunas = "§s§";

    this.init = function () {

        this.criarNavegacao();
        this.iniLista()

        this.trocarQuestao(this.questaoAtual);
    }


    this.ListaAberta = function () {
        var listaAberta = [];
        for (var i = 0; i < rlz.lista.length; i++) {
            if (!rlz.lista[i].r || rlz.lista[i].rv) {
                listaAberta.push(rlz.lista[i]);
            }
        }
        return listaAberta;
    }

    this.callTipo = function (func) {
        var funcDefault = func + this.lstTipos[0];
        func = func + this.lstTipos[this.tipoAtual];
        var args = []; // empty array
        // copy all other arguments we want to "pass through"
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        if (this[func]) {
            return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return this[funcDefault].apply(this, Array.prototype.slice.call(arguments, 1));
        }

    }

    this.retorno = function (status) {
        if (status.sucess)
            return true;

        this.retornoErro(status);

        return false;
    }

    /*this.retornoJson = function (dados) {

        if (dados.erro) {
            this.retornoErroJson(dados.erro);
            return false;
        }

        return true;
    }*/

    this.carregar = function (dados, resposta) {

        this.tipoAtual = dados.attr('tipo');

        this.montarNavegacao();

        this.montarConteudo($('div#conteudo', dados));
        this.$this.find(this.btnLimpar).removeAttr('href');

        this.$this.find(this.btnRevisar).removeAttr('href').click(function () {
            rlz.revisarQuestao($(this));
        });

        this.atualizarListaQuestao();

        var boxQuestaoPai = this.$this.find("#boxQuestaoPai");

        this.$this.find("#btnQuestaoPai").click(function () {
            $(this).find("#imgBtnQuestaoPai").toggleClass("imagemMais");

            if (boxQuestaoPai.hasClass("hide")) {
                boxQuestaoPai.toggleClass("hide");
            } else {
                boxQuestaoPai.addClass("hide");
            }
        });

        if (this.retornoCarregar) {
            this.retornoCarregar({ sucess: true }, dados);
            rlz.efeitoBtn("btnCinza");
            rlz.efeitoBtn("btnAzul");
            rlz.efeitoBtn("btnVerde");
            rlz.efeitoBtn("btnDourado");
        }


    }

    this.efeitoBtn = function (classCorBtn) {

        this.$this.find("." + classCorBtn).mouseover(function () {
            $(this).toggleClass(classCorBtn + "_over");
        }).mouseout(function () {
            $(this).toggleClass(classCorBtn + "_over");
            if ($(this).hasClass(classCorBtn + "_down")) {
                $(this).toggleClass(classCorBtn + "_down");
            }
        }).mousedown(function () {
            $(this).toggleClass(classCorBtn + "_down");
        }).mouseup(function () {
            $(this).toggleClass(classCorBtn + "_down");
        });
    };

    this.iniLista = function () {
        this.$this.find("#boxListaQuestoes").hide();

        this.$this.find("#btnListaQuestao").removeAttr('href').click(this.exibirListaQuestao);
    }

    this.exibirListaQuestao = function () {

        rlz.$this.find("#boxListaQuestoes").toggle();

        rlz.$this.find("#btnListaQuestao").toggleClass("controleNavegacaoDown");
        rlz.$this.find("#btnListaQuestao").toggleClass("controleNavegacaoUp");
        rlz.$this.find(".barraSombraNavegacao").toggleClass("hide");
        rlz.$this.find(".barraPrincipalSombra").toggleClass("hide");
        
    }

    this.atualizarListaQuestao = function () {

        rlz.$this.find("#listaQuestoes").html("");
        rlz.$this.find("#tmplListaQuestoes").template();

        rlz.$this.find("#tmplListaQuestoes")
                    .tmpl(rlz.lista)
                    .appendTo("#listaQuestoes");

        rlz.$this.find('ul#listaQuestoes > li .paginacaoBtn').removeClass("questaoAtual").removeClass("respondida");
        rlz.$this.find('ul#listaQuestoes > li').each(function () {
            var a = $(this).find("a");
            var link;
            if (a.attr('href') != undefined) {
                link = a.attr('href').split('in=');
                var pos = parseInt(link[1], 10);
                
                if (pos == rlz.questaoAtual) {
                    $(this).find(".paginacaoBtn").addClass("questaoAtual");
                } else if (rlz.lista[pos].r) {
                    $(this).find(".paginacaoBtn").addClass("respondida");
                }
                a.click(function () {
                    rlz.trocarQuestao(pos);
                }).attr('href', 'javascript:void(' + link[1] + ')');
            }
        });
    }
    
    /**
    * Cria os links para navegação
    */
    this.criarNavegacao = function () {
        this.$this.find("a#btnVoltar").removeAttr('href').click(function () { rlz.voltarQuestao(); });
        this.$this.find("a#btnAvancar").removeAttr('href').click(function () { rlz.avancarQuestao(); });
    }

    /* Area Paginacao */
    this.montarPaginacao = function (dados) {

        $('div#areaPaginacao #paginacao ul > li').each(function () {
            var a = $('> a', $(this));
            var link;
            if (a.attr('href') != undefined) {
                link = a.attr('href').split('in=');
                a.click(function () {
                    rlz.trocarQuestao(parseInt(link[1], 10));
                }).attr('href', 'javascript:void(' + link[1] + ')');
            }
        });
    }

    this.montarNavegacao = function () {

        if (this.questaoAtual == 0) {
            this.$this.find('a#btnVoltar').hide();
            this.$this.find('a#btnVoltarInativo').show();
        } else {
            this.$this.find('a#btnVoltar').show();
            this.$this.find('a#btnVoltarInativo').hide();
        }

        if (this.questaoAtual >= (this.lista.length - 1)) {
            this.$this.find('a#btnAvancar').hide();
            this.$this.find('a#btnAvancarInativo').show();
        } else {
            this.$this.find('a#btnAvancar').show();
            this.$this.find('a#btnAvancarInativo').hide();
        }

        var nome = this.lista[this.questaoAtual].n;

        this.$this.find("#currentQuestao").text(nome);

    }

    /* Area Conteudo */
    this.montarConteudo = function (dados) {

        var btnsHide = dados.find(".areaNavInferior .btnCentral a.hide").length;
        var btnsTota = dados.find(".areaNavInferior .btnCentral a").length;
        dados.find(".areaNavInferior .btnCentral").css({ "width": (btnsTota - btnsHide) * 140 });

        this.$this.find('div#areaQuestao').html(dados.html());

        //this.callTipo("aplicarBotoes");

        //aplicar acao das dicas
        new DicaRealizacao(rlz.$this.find('div#areaQuestao .areaDicas:first'), 0, 0);

    }

    this.caixaAlternativaClick = function ($target) {
        if (!$target.is("label") && !$target.is("input") && !$target.parents("div").hasClass("areaDicas") && $target.closest("label").length == 0) {
            return true;
        }
        return false;
    }

    this.aplicarResposta = function (resposta) {
        this.callTipo("aplicarResposta", resposta);
    }
    this.extrairResposta = function () {
        return this.callTipo('extrairResposta')
    }

    this.aplicarBotoesDefault = function () {
        if (this.etapaAtual == "Realizar") {
            this.$this.find("ul#alternativas li").click(function (event) {
                var $target = $(event.target);
                if (rlz.caixaAlternativaClick($target)) {
                    var id = $(this).find("label").attr("for");
                    $("#" + id).attr('checked', 'checked');
                    $("#" + id).trigger("change");
                }
            });
            this.$this.find('div#areaQuestao input[type=radio]').each(function () {
                $(this).change(function () {
                    rlz.salvarResposta();
                });
            });
        } else {
            this.$this.find('div#areaQuestao input[type=radio]').attr('disabled', 'disabled');
            this.$this.find('div#areaQuestao input[type=radio]').hide();
        }
        //aplica as dicas
        this.$this.find('div#areaQuestao #alternativas li').each(function () {
            new DicaRealizacao($(this).find('.areaDicas'), 0, 0, $(this).find('input[type=radio]').val());
        });
    }
    this.aplicarRespostaDefault = function (resposta) {
        var habLimpar = false;
        this.$this.find('ul#alternativas > li.Alternativa').removeClass('marcado');

        if (resposta && resposta.resposta && $.trim(resposta.resposta) != "") {
            var lstRespostas = resposta.resposta.split('&');
            for (var i = 0; i < lstRespostas.length; i++) {
                var objResposta = lstRespostas[i].split('=');
                this.$this.find("input[name='" + objResposta[0] + "'][value='" + objResposta[1] + "']").attr('checked', 'checked');
                this.$this.find("input[name='" + objResposta[0] + "'][value='" + objResposta[1] + "']").parents("li.Alternativa").addClass('marcado')
            }
            habLimpar = true;
        } else {
            this.$this.find("input[name='rdoAlternativa']").removeAttr('checked');
        }

        //remove as marcaçoes primeiro
        this.$this.find(".areaAlternativas > ul > li.Alternativa > div.listaQuestoesIncorreta").removeClass("listaQuestoesIncorreta");
        this.$this.find(".areaAlternativas > ul > li.Alternativa > div.listaQuestoesCorreta").removeClass("listaQuestoesCorreta");

        if (resposta && resposta.correcao && resposta.correcao.length > 0) {
            for (var i = 0; i < resposta.correcao.length; i++) {
                this.$this.find(".areaAlternativas > ul > li.Alternativa:eq(" + i + ") > div.naomarcouAlternativa").removeClass("naomarcouAlternativa").addClass(resposta.correcao[i]);
            }
        }

        rlz.atualizarLimpar(habLimpar);

        //caso esteja visualizando
        if (this.etapaAtual == "Visualizar") {

            if (resposta && resposta.corretas && resposta.corretas.length > 0) {
                for (var i = 0; i < resposta.corretas.length; i++) {
                    this.$this.find("input[value='" + resposta.corretas[i] + "']").parents("li.Alternativa").addClass('marcadoCorreta')
                }
            }
        }

    }
    this.extrairRespostaDefault = function () {
        return this.$this.find('.inputAlternativa').serialize();
    }

    //a principio só para o offline
    this.aplicarBotoesSimplesEscolhaOpniao = function () {
        this.aplicarBotoesDefault();
    }

    this.aplicarBotoesDiscursivaManualOpniao = function () {
        this.aplicarBotoesDiscursivaManual();
    }
    this.aplicarRespostaDiscursivaManualOpniao = function (resposta) { alert('aplicarRespostaDiscursivaManualOpniao') }
    this.extrairRespostaDiscursivaManualOpniao = function () { alert('extrairRespostaDiscursivaManualOpniao') }

    this.aplicarBotoesDiscursivaManual = function () {
        //this.$this.find(this.btnConferir).hide();

        $("#realizadortoolTip .corpo").text("Essa questão será corrigida manualmente. Aguarde a correção para saber se respondeu corretamente.");
        $(".btnVerde_desabilitado").mouseover(function () {
            $("#realizadortoolTip").removeClass("hide");
        }).mouseout(function () {
            $("#realizadortoolTip").addClass("hide");
        });

        this.aplicarBotoesDiscursivaAutomatica();
    }

    this.aplicarRespostaDiscursivaManual = function (resposta) {
        this.aplicarRespostaDiscursivaAutomatica(resposta);
    }
    this.extrairRespostaDiscursivaManual = function () {
        return this.extrairRespostaDiscursivaAutomatica();
    }

    this.aplicarBotoesDiscursivaAutomatica = function () {
        var campo = this.$this.find('div#areaQuestao textarea');

        if (this.etapaAtual == "Realizar") {
            campo.blur(function () {
                rlz.salvarResposta();
            }).keyup(function () {
                rlz.atualizarLimpar( $(this).val().length > 0);
            });

            this.contaChar(campo, campo.attr('maxchar'));
        } else {
            campo.attr('disabled', 'disabled');
        }

    }
    this.aplicarRespostaDiscursivaAutomatica = function (resposta) {
        var campo = this.$this.find('div#areaQuestao textarea');
        var habLimpar = false;
        if (resposta && resposta.resposta && $.trim(resposta.resposta) != "") {
            var posicao = resposta.resposta.indexOf('=');
            var objResposta = "";
            if (posicao != -1)
                objResposta = resposta.resposta.substring(posicao + 1);

            habLimpar = objResposta != "";

            campo.val(objResposta);
        } else {
            campo.val("");
        }

        //remove as marcaçoes primeiro
        this.$this.find(".areaAlternativas > div.listaQuestoesIncorreta").removeClass("listaQuestoesIncorreta");
        this.$this.find(".areaAlternativas > div.listaQuestoesCorreta").removeClass("listaQuestoesCorreta");

        if (resposta && resposta.correcao && resposta.correcao.length > 0) {
            this.$this.find(".areaAlternativas > div.naomarcouAlternativa").removeClass("naomarcouAlternativa").addClass(resposta.correcao[0]);
        }

        rlz.atualizarLimpar(habLimpar);
        //caso esteja visualizando
        if (this.etapaAtual == "Visualizar") {

        }
    }
    this.extrairRespostaDiscursivaAutomatica = function () {
        var value = this.$this.find('.inputAlternativa').val();
        var name  = this.$this.find('.inputAlternativa').attr("name");
        return name + "=" + value;
    }

    this.aplicarBotoesAssociativa = function () {
        if (this.etapaAtual == "Realizar") {
            rlz.carregaInputLetraAssociar();
            this.$this.find(".boxGabaritoAlternativa").remove();
        } else {
            this.$this.find("input[name=txtLetraAsso]").attr("disabled", "disabled");
        }
        //aplica as dicas
        $('div#areaQuestao #alternativas li').each(function () {
            new DicaRealizacao($(this).find('.areaDicas'), 0, 0, $(this).find('input[type=hidden]').val());
        });
    }
    this.aplicarRespostaAssociativa = function (resposta) {

        var habLimpar = false;
        var contB = 0;

        if (resposta && resposta.resposta && $.trim(resposta.resposta) != "") {
            var lstResposta = resposta.resposta.split('&');
            var count = 0, a = 0;
            for (var i = 0; i < lstResposta.length; i++) {
                var current = lstResposta[i].split('=');

                if (current[0] == "txtLetraAsso" && $.trim(current[1]) == "")
                    contB++;

                if (current[0] != "txtLetraOpcoes") {
                    this.$this.find(".colunaAssoD li.Alternativa:eq(" + count + ") input[name=" + current[0] + "]").val(current[1]);

                    if (((a + 1) % 3) == 0)
                        count++;

                    a++;
                }
            }
            //Quatro variaveis para cada resposta
            habLimpar = (contB * 4) != lstResposta.length;
        } else {
            this.$this.find("input[name=txtLetraAsso]").val("");
        }

        this.$this.find(" .colunaAssoD ul > li.Alternativa > div.listaQuestoesIncorreta").removeClass("listaQuestoesIncorreta");
        this.$this.find(" .colunaAssoD ul > li.Alternativa > div.listaQuestoesCorreta").removeClass("listaQuestoesCorreta");

        if (resposta && resposta.correcao && resposta.correcao.length > 0) {
            for (var i = 0; i < resposta.correcao.length; i++) {
                this.$this.find(" .colunaAssoD ul > li.Alternativa:eq(" + i + ") > div.naomarcouAlternativa").removeClass("naomarcouAlternativa").addClass(resposta.correcao[i]);
            }
        }
        rlz.atualizarLimpar(habLimpar);
        //caso esteja visualizando
        if (this.etapaAtual == "Visualizar") {

            if (resposta && resposta.gabarito && resposta.gabarito != "") {
                this.$this.find(".boxGabaritoAlternativa span").text(resposta.gabarito);
            } else {
                this.$this.find(".boxGabaritoAlternativa").remove();
            }
        }
    }
    this.extrairRespostaAssociativa = function () {
        return this.extrairRespostaDefault();
    }

    this.aplicarBotoesSomatoria = function () {
        var campo = this.$this.find('div#areaQuestao #txtResposta');
        
        if (this.etapaAtual == "Realizar") {
            //var totalAlternativas = $("div#areaQuestao input[type=hidden]").length;
            campo.blur(function () {
                rlz.salvarResposta();
            }).keydown(function (e) {
                if (e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
                    return false;
                }
            }).keyup(function (e) {
                var vlDg = parseInt($(this).val());
                var vlMx = parseInt(rlz.$this.find("div#areaQuestao #valorMaximoSomatoria").val());

                rlz.atualizarLimpar($(this).val().length > 0);

                if (vlDg <= 0 || vlDg > vlMx) {
                    $(this).val('');
                };
            });
        } else {
            campo.attr('disabled', 'disabled');
            //this.$this.find('div#areaQuestao #txtResposta').hide();
        }


        //aplica as dicas
        $('div#areaQuestao #alternativas li').each(function () {
            new DicaRealizacao($(this).find('.areaDicas'), 0, 0, $(this).find('input[type=hidden]').val());
        });
    }
    this.aplicarRespostaSomatoria = function (resposta) {
        var campo = this.$this.find('div#areaQuestao #txtResposta');

        var habLimpar = false;

        this.$this.find('ul#alternativas > li.Alternativa').removeClass('marcado')

        if (resposta && resposta.resposta && $.trim(resposta.resposta) != "") {
            var objResposta = resposta.resposta.split('=');

            if ($.trim(objResposta[1]).length > 0) {

                var valor = parseInt($.trim(objResposta[1]));

                campo.val(valor);

                var cont = 1;
                $('li.Alternativa input[name=rdoAlternativa]').each(function () {
                    if ((valor & cont) == cont) {
                        $(this).parents("li.Alternativa").addClass('marcado');
                    }
                    cont *= 2;
                });

                habLimpar = true;
            }
        } else {
            campo.val("");
        }

        this.$this.find(".areaAlternativas > ul > li.Alternativa > div.listaQuestoesIncorreta").removeClass("listaQuestoesIncorreta");
        this.$this.find(".areaAlternativas > ul > li.Alternativa > div.listaQuestoesCorreta").removeClass("listaQuestoesCorreta");

        if (resposta && resposta.correcao && resposta.correcao.length > 0) {
            for (var i = 0; i < resposta.correcao.length; i++) {
                this.$this.find(".areaAlternativas > ul > li.Alternativa:eq(" + i + ") > div.naomarcouAlternativa").removeClass("naomarcouAlternativa").addClass(resposta.correcao[i]);
            }
        }
        rlz.atualizarLimpar(habLimpar);
        //caso esteja visualizando
        if (this.etapaAtual == "Visualizar") {

            if (resposta && resposta.corretas && resposta.corretas.length > 0) {
                for (var i = 0; i < resposta.corretas.length; i++) {
                    this.$this.find("input[value='" + resposta.corretas[i] + "']").parents("li.Alternativa").addClass('marcadoCorreta')
                }
            }
        }
    }
    this.extrairRespostaSomatoria = function () { return this.extrairRespostaDefault(); }

    this.aplicarBotoesMultiplaEscolhaOpiniao = function () { this.aplicarBotoesMultiplaEscolha(); }
    this.aplicarRespostaMultiplaEscolhaOpiniao = function (resposta) { alert('aplicarRespostaMultiplaEscolhaOpiniao') }
    this.extrairRespostaMultiplaEscolhaOpiniao = function () { alert('extrairRespostaMultiplaEscolhaOpiniao') }

    this.aplicarBotoesMultiplaEscolha = function () {
        if (this.etapaAtual == "Realizar") {
            this.$this.find("ul#alternativas li").click(function (event) {
                var $target = $(event.target);
                if (rlz.caixaAlternativaClick($target)) {
                    var id = $(this).find("label").attr("for");
                    if (!$("#" + id).attr('checked')) {
                        $("#" + id).attr('checked', 'checked');
                    } else {
                        $("#" + id).removeAttr('checked');
                    }

                    $("#" + id).trigger("change");
                }
            });
            $('div#areaQuestao input[type=checkbox]').each(function () {
                $(this).change(function () {
                    rlz.salvarResposta();
                });
            });
        } else {
            this.$this.find('div#areaQuestao input[type=checkbox]').attr('disabled', 'disabled');
            this.$this.find('div#areaQuestao input[type=checkbox]').hide();
        }
        $('div#areaQuestao #alternativas li').each(function () {
            new DicaRealizacao($(this).find('.areaDicas'), 0, 0, $(this).find('input[type=checkbox]').val());
        });
    }
    this.aplicarRespostaMultiplaEscolha = function (resposta) {
        this.aplicarRespostaDefault(resposta);
    }
    this.extrairRespostaMultiplaEscolha = function () {
        return this.extrairRespostaDefault();
    }
    this.aplicarBotoesVerdadeiroFalso = function () {
        if (this.etapaAtual == "Realizar") {
            $('div#areaQuestao input[type=radio]').each(function () {
                $(this).change(function () {

                    var tmpId = $(this).attr('id').split('_');
                    var idAlt = tmpId[2];

                    if ($(this).val().toUpperCase() == "V") {
                        rlz.$this.find('#rdoVerdadeira_' + tmpId[2]).val(idAlt);
                        rlz.$this.find('#rdoFalsa_' + tmpId[2]).val("");
                    } else {
                        rlz.$this.find('#rdoFalsa_' + tmpId[2]).val(idAlt);
                        rlz.$this.find('#rdoVerdadeira_' + tmpId[2]).val("");
                    }

                    rlz.salvarResposta();
                });
            });
        } else {
            this.$this.find('div#areaQuestao input[type=radio]').attr('disabled', 'disabled');
            this.$this.find('div#areaQuestao input[type=radio]').hide();           
        }

        //aplica as dicas
        $('div#areaQuestao #alternativas li').each(function () {
            new DicaRealizacao($(this).find('.areaDicas'), 0, 0, $(this).find('input[name=idAlternativa]').val());
        });
    }
    this.aplicarRespostaVerdadeiroFalso = function (resposta) {

        this.$this.find('ul#alternativas > li.Alternativa .inputVF').removeClass('marcado');
        this.$this.find("input[type=hidden]").removeAttr("checked");

        var habLimpar = false;

        if (resposta && resposta.resposta && $.trim(resposta.resposta) != "") {
            var lstRespostas = resposta.resposta.split('&');
            for (var i = 0; i < lstRespostas.length; i++) {
                var objResposta = lstRespostas[i].split('=');
                //rdoAlternativa_15418=F&rdoFalsa=15418
                //rdoAlternativa_15418=V&rdoVerdadeira=15418
                if (objResposta[1] != "")
                    this.$this.find("input[name='" + objResposta[0] + "'][value='" + objResposta[1] + "']").attr('checked', 'checked');

                var obj = this.$this.find("input[name='" + objResposta[0] + "'][value='" + objResposta[1] + "']").parents("li.Alternativa .inputVF");
                obj.addClass('marcado');
                var idFor = obj.find("label").attr("for");
                if (idFor) {
                    this.$this.find("#" + idFor).val(idFor.split("_")[1]);
                }
            }
            habLimpar = true;
        } else {
            this.$this.find("input[type=hidden]").val("");
            this.$this.find("input[type=hidden]").removeAttr("checked");
            this.$this.find("input[type=radio]").removeAttr("checked");
        }

        this.$this.find(".areaAlternativas > ul > li.Alternativa > div.listaQuestoesIncorreta").removeClass("listaQuestoesIncorreta");
        this.$this.find(".areaAlternativas > ul > li.Alternativa > div.listaQuestoesCorreta").removeClass("listaQuestoesCorreta");

        if (resposta && resposta.correcao && resposta.correcao.length > 0) {
            for (var i = 0; i < resposta.correcao.length; i++) {
                //correcao: ["listaQuestoesCorreta", "listaQuestoesIncorreta", "naomarcouAlternativa"],
                this.$this.find(".areaAlternativas > ul > li.Alternativa:eq(" + i + ") > div.naomarcouAlternativa").removeClass("naomarcouAlternativa").addClass(resposta.correcao[i]);
            }
        }

        rlz.atualizarLimpar(habLimpar);
        //caso esteja visualizando
        if (this.etapaAtual == "Visualizar") {

            if (resposta && resposta.corretas && resposta.corretas.length > 0) {

                $('div#areaQuestao input[type=radio]').each(function () {
                    var tmpId = $(this).attr('id').split('_');
                    var idAlt = tmpId[2];
                    if ($.inArray(parseInt(idAlt), resposta.corretas) != -1) {
                        $("#rdoAlternativa_V_" + idAlt).parents("li.Alternativa .inputVF").addClass('marcadoCorreta')
                    } else {
                        $("#rdoAlternativa_F_" + idAlt).parents("li.Alternativa .inputVF").addClass('marcadoCorreta')
                    }
                });
            }
        }

    }
    this.extrairRespostaVerdadeiroFalso = function () {
        return this.extrairRespostaDefault();
    }

    this.aplicarBotoesLacunas = function () {
        if (this.etapaAtual == "Realizar") {

            rlz.$this.find(".mceInput").focusout(function () {
                rlz.salvarResposta();
            }).keyup(function () {
                rlz.atualizarLimpar($(this).val().length > 0);
            });
            rlz.$this.find(".mceCombo").change(function () {
                rlz.salvarResposta();
            });

            this.$this.find(".boxGabaritoAlternativa").remove();
        } else {
            this.$this.find('div#areaQuestao .mceCombo').attr('disabled', 'disabled');
            this.$this.find('div#areaQuestao .mceInput').attr('disabled', 'disabled');
        }
    }
    this.aplicarRespostaLacunas = function (resposta) {
        var habLimpar = false;

        this.$this.find(".mceCombo").addClass("LacunaNormal");
        this.$this.find(".mceCombo").removeClass("LacunaAcerto");
        this.$this.find(".mceCombo").removeClass("LacunaErrada");

        this.$this.find(".mceInput").addClass("LacunaNormal");
        this.$this.find(".mceInput").removeClass("LacunaAcerto");
        this.$this.find(".mceInput").removeClass("LacunaErrada");

        this.$this.find(".mceCombo").each(function () {
            $(this).find("option").each(function () {
                if ($(this).val() == "")
                    $(this).remove();
            });
            $(this).append(
                $("<option>").attr("selected", "selected").val("")
            );
        });
        if (resposta && resposta.resposta && $.trim(resposta.resposta) != "") {

            var lstRespostas = resposta.resposta.split(rlz.separadorLacunas);

            var contB = 0;

            for (var i = 0; i < lstRespostas.length; i++) {
                var objResposta = lstRespostas[i].split('=');
                i++;
                var objResposta2 = lstRespostas[i].split('=');

                var id = objResposta[1];
                var tipo = objResposta2[1].split('|')[0];
                var respostaT = objResposta2[1].split('|')[1];

                var pos = this.$this.find("input[name=idLacunaResposta][value=" + id + "]").parents("li.alt").find("input[name=txtLacunaPos]").val().charCodeAt(0) - 64;

                if ($.trim(respostaT) == "")
                    contB++;

                switch (tipo) {
                    case "input":
                        $("input[id=lacuna_input_" + pos + "]").val(respostaT);
                        break;
                    case "combo":
                        $("#lacuna_input_" + pos + " > option").removeAttr("selected");
                        $("#lacuna_input_" + pos + " option").each(function () {

                            if (this.value == respostaT) {
                                $(this).attr("selected", "selected");
                            }
                        });
                        break;
                }
            }

            //Duas variaveis para cada resposta
            habLimpar = (contB * 2) != lstRespostas.length;
        } else {
            this.$this.find(".mceInput").each(function () {
                $(this).val("");
            });
        }
        if (resposta && resposta.correcao && resposta.correcao.length > 0) {
            for (var i = 0; i < resposta.correcao.length; i++) {
                this.$this.find("#lacuna_input_" + (i + 1) + "").removeClass("LacunaNormal").addClass(resposta.correcao[i]);
            }
        }
        rlz.atualizarLimpar(habLimpar);
        //caso esteja visualizando
        if (this.etapaAtual == "Visualizar") {

            if (resposta && resposta.gabarito && resposta.gabarito != "") {
                this.$this.find(".boxGabaritoAlternativa span").text(resposta.gabarito);
            } else {
                this.$this.find(".boxGabaritoAlternativa").remove();
            }

        }
    }
    this.extrairRespostaLacunas = function () {
        var final = "";
        this.$this.find("ul#alternativas li.alt").each(function () {
            var pos = $(this).find("input[name=txtLacunaPos]").val().charCodeAt(0) - 64;
            var id = $(this).find("input[name=idLacunaResposta]").val();
            var resposta = $("#lacuna_input_" + pos + "").val();
            var lacInput = $("#lacuna_input_" + pos + "").hasClass("mceInput");


            if (lacInput) {
                final += "idLacunaResposta=" + id + rlz.separadorLacunas + "txtLacunaResposta" + "=input|" + resposta;
            } else {
                final += "idLacunaResposta=" + id + rlz.separadorLacunas + "txtLacunaResposta" + "=combo|" + resposta;
            }

            final += rlz.separadorLacunas;
        });
        return final.substring(0, final.length - rlz.separadorLacunas.length);
    }

    /* conta char */
    this.contaChar = function (container, limite) {
        var optionsT = {
            'maxCharacterSize': limite,
            'originalStyle': 'originalTextareaInfo',
            'warningStyle': 'warningTextareaInfo',
            'warningNumber': 40,
            'displayFormat': '#left caracteres restantes'
        };
        try {
            container.textareaCount(optionsT);
        } catch (e) { };
    }
    /* Navegar na Questao */
    this.trocarQuestao = function (questao) {

        rlz.carregador.mostrar();

        realizadorDAL.QuestaoCarregar(questao, function (status, dados, questao, resposta) {

            if (!rlz.retorno(status)) {
                rlz.carregador.esconder();
                return;
            }
            rlz.questaoAtual = questao;

            rlz.carregar($(dados));

            rlz.aplicarResposta(resposta);

            rlz.callTipo("aplicarBotoes");

            rlz.atualizarRevisao();
            rlz.carregador.esconder();
        });
    }

    this.voltarQuestao = function () {
        var questao = this.questaoAtual - 1;
        if (questao < 0) {
            return;
        }
        this.trocarQuestao(questao);
    }

    this.avancarQuestao = function () {
        var questao = this.questaoAtual + 1;
        if (questao > this.lista.length -1) {
            return;
        }
        this.trocarQuestao(questao);
    }

    /* Salvar resposta */
    this.salvarResposta = function () {
        realizadorDAL.QuestaoResponder(rlz.extrairResposta(), rlz.questaoAtual, function (status, questao, pos, resposta) {

            if (!rlz.retorno(status)) {
                rlz.carregador.esconder();
                return;
            }

            rlz.lista[pos] = questao;

            rlz.atualizarListaQuestao();

            if (rlz.questaoAtual != pos)
                return;

            rlz.aplicarResposta(resposta);

            rlz.carregador.esconder();
        });
    }

    /* Limpar a resposta */
    this.limparQuestao = function () {
        rlz.carregador.mostrar();

        realizadorDAL.QuestaoLimpar(rlz.questaoAtual, function (status, questao, pos, resposta) {

            rlz.carregador.esconder();

            if (!rlz.retorno(status))
                return;

            rlz.lista[pos] = questao;

            rlz.atualizarListaQuestao();

            rlz.aplicarResposta(resposta);
        });
    }

    /* revisar depois */
    this.revisarQuestao = function (btn) {
        rlz.carregador.mostrar();

        realizadorDAL.QuestaoRevisar(rlz.questaoAtual, function (status, questao, pos, resposta) {

            rlz.carregador.esconder();

            if (!rlz.retorno(status))
                return;

            rlz.lista[pos] = questao;

            rlz.atualizarListaQuestao();

            rlz.atualizarRevisao();

            rlz.aplicarResposta(resposta);
        });
    }
    
    this.atualizarLimpar = function (habilitado) {
        if (habilitado) {
            rlz.habilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
        } else {
            rlz.desabilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
        }
    }
    this.atualizarRevisao = function () {
        var questao = rlz.lista[rlz.questaoAtual];

        if (questao.rv) {
            rlz.$this.find(rlz.btnRevisar).find("div.texto").text($(rlz.btnRevisar).attr("data-textoativo"))
        } else {
            rlz.$this.find(rlz.btnRevisar).find("div.texto").text($(rlz.btnRevisar).attr("data-textonormal"))
        }
    }
    this.habilitarBtn = function (btn, btnClass, btnAcao) {
        rlz.desabilitarBtn(btn, btnClass, btnAcao);
        btn.bind('click', btnAcao);
        if (btn.hasClass(btnClass)) {
            btn.removeClass(btnClass);
        }
    }
    this.desabilitarBtn = function (btn, btnClass, btnAcao) {
        btn.unbind('click', btnAcao);
        if (!btn.hasClass(btnClass)) {
            btn.toggleClass(btnClass);
        }
    }
//    this.urlDecode = function(texto) {
//        texto = unescape(texto);
//        while (texto.search("\\+") != -1) {
//            texto = texto.replace('+', ' ');
//        }
//        return texto;
//    }




    this.carregaInputLetraAssociar = function () {
        rlz.$this.find("input[name=txtResposta]").val("0")

        $("input[name=txtLetraAsso]").keyup(function (e) {
            rlz.atualizarLimpar($(this).val().length > 0);
            if (e.which != 8 && (e.which < 65 || e.which > 122)) {
                return false;
            } else {
                $(this).parents(".boxRecebeAssociado").find("input[name=txtResposta]").val("0");
            }
        }).keypress(function (e) {
            if (e.which != 8 && (e.which < 65 || e.which > 122)) {
                return false;
            }
        }).blur(function () {
            rlz.salvarResposta();
        });
    }


    this.init();
}

function DicaRealizacao(container, posQuestao, idAlternativa) {
    var dica = this;

    this.container = container;

    this.btns = {};

    this.textosComentario = {};

    this.tipos = ["Dica", "Comentario", "Professor", "Sugestao", "Correcao"];

    this.init = function () {

        for (var i = 0; i < this.tipos.length; i++) {
            var nomeTipo = this.tipos[i];
            var btn = $(this.container).find('.box' + nomeTipo);

            btn.find(' a.btnDica').attr('title', nomeTipo);

            if (btn.find(' a.btnDica').length <= 0)
                continue;


            btn.click(function (ev) { dica.showDica($(this).find(' a.btnDica')); ev.stopPropagation(); });

            btn.find(' a.btnDica').removeAttr('href');

            this.textosComentario[nomeTipo] = this.tratarNome($(btn.find(' a.btnDica')).html());

            this.trocarNome(nomeTipo, btn.parents(".areaDicas"), ".box" + nomeTipo + " a.btnDica", ".conteudo" + nomeTipo, 1);

            this.btns[nomeTipo] = btn.find(' a.btnDica');

            var conta = btn.parents(".areaDicas").find(".areaConteudoDica .conteudo" + nomeTipo);

            if ($.trim(conta.find("div.textoDica").html()).length > 0) {
                //adicionar o botão fechar
                conta.find("div.textoDica").prepend("<div class=\"fechar\"></div>");
            }
        }


    }

    function exibeOculta(btn, a, b) {
        if (!btn.parents(".areaDicas").find(".areaConteudoDica " + a).hasClass("hide")) {
            btn.parents(".areaDicas").find(".areaConteudoDica  " + a).toggleClass("hide");
            btn.parents(".areaDicas").find("" + b).toggleClass("hide");
        }
    }


    this.showDica = function (btn) {

        var tipo = btn.attr('title');
        var conta = btn.parents(".areaDicas").find(".areaConteudoDica .conteudo" + tipo);

        conta.find("div.fechar").unbind('click');

        for (var i = 0; i < this.tipos.length; i++) {
            if (this.tipos[i] != tipo) {
                this.trocarNome(this.tipos[i], btn.parents(".areaDicas"), ".box" + this.tipos[i] + " a.btnDica", ".conteudo" + this.tipos[i], 1);
                exibeOculta(btn, ".conteudo" + this.tipos[i], ".box" + this.tipos[i] + " .indBox" + this.tipos[i]);
            }
        }

        this.trocarNome(tipo, btn.parents(".areaDicas"), ".box" + tipo + " a.btnDica", ".conteudo" + tipo, 0);

        if ($.trim(conta.find("div.textoDica").html()).length <= 26) {
            throw "impelmentar o carregamento da dica";
        } else {
            conta.find("div.fechar").click(function () {
                btn.trigger("click");
            });
        }

        btn.parents(".areaDicas").find(".box" + tipo + " .indBox" + tipo).toggleClass("hide");
        conta.toggleClass("hide");

    }

    this.retornoCarregar = function (conta, dados, btn) {
        dados = "<div class=\"fechar\"></div>" + dados;
        conta.html(dados);
        conta.find("div.fechar").click(function () {
            btn.trigger("click");
        });
    }

    this.trocarNome = function (tipo, btn, localAlteraTitu, divHide, numero) {

        if (numero != 1) {
            numero = !$(this.container).find(divHide).is(":visible") ? 2 : 1;
        }
        if (this.textosComentario[tipo]) {
            var texto = this.textosComentario[tipo][numero - 1] + " " + this.textosComentario[tipo][2];
            $(btn.find(localAlteraTitu)).html(texto);
        }

    }
    /*  */
    this.tratarNome = function (texto) {
        if (texto != null) {
            var padrao = new RegExp("\\((.*)\\)(.*)");
            var resultado = padrao.exec(texto);

            texto = resultado[1];
            texto = texto.split('|');
            texto.push(resultado[2]);
        } else {
            texto = "";
        }

        return texto;
    }
    

    this.init();
}
function getInternetExplorerVersion() {

    var rv = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer') {

        var ua = navigator.userAgent;

        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

        if (re.exec(ua) != null)

            rv = parseFloat(RegExp.$1);

    }

    return rv;

}
