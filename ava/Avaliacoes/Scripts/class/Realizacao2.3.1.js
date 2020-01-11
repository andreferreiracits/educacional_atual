var FUNCAO_VAZIA = "javascript:void(0)";



function Realizacao(containerPrincipal, idFormRealizacao, idLimpar, idRevisar, idConferir, idVoltar, idAvancar, lstTipos, idAtual, fCarregar, fErro) {
    var rlz = this;
    this.$this = containerPrincipal;
    this.version = "0.1.0";
    this.id = idFormRealizacao;
    this.formulario = 'form#' + this.id;
    this.caminho = this.$this.find(this.id).attr('action');
    this.btnLimpar = "a#" + idLimpar;
    this.btnRevisar = "a#" + idRevisar;
    this.btnConferir = "a#" + idConferir;
    this.btnVoltar = "a#" + idVoltar;
    this.btnAvancar = "a#" + idAvancar;
    this.boxCarregador = "carregandoGeral";
    this.carregador = new Carregando(this.boxCarregador);
    this.bolMostrarCarregador = false;

    this.questaoAtual = idAtual;
    this.ultimaAtual = 0;

    this.lstTipos = lstTipos;
    this.tipoAtual = 0;

    this.retornoCarregar = fCarregar;
    this.retornoErro = fErro;

    this.viewCorreta = true;

    this.limiteChar = 2000;
    this.limiteCharAutomatica = 100;


    this.init = function () {
        this.caminho = this.$this.find(this.formulario).attr("action");
        this.criarElementos();
        this.criarNavegacao();
        this.iniLista()
        this.$this.find(this.formulario).submit(function (e) {

            rlz.carregando(true);
            $.ajax({
                url: rlz.caminho,
                data: $(this).serialize(),
                type: "POST",
                success: function (dados, status, xhttp) {
                    rlz.carregar($(dados));
                    //rlz.carregador.esconder();
                    rlz.carregando(false);
                }
            });

            e.preventDefault();
        });

        this.enviar();
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

    this.carregar = function (dados) {
        rlz.carregando(true);

        if ($(dados).hasClass('erro') || $(dados).hasClass('aviso')) {
            this.retornoErro(dados);
            return;
        }

        this.questaoAtual = dados.attr('atual');
        this.ultimaAtual = dados.attr('final');
        this.tipoAtual = dados.attr('tipo');
        //this.montarPaginacao($('div#paginacao', dados));
        this.montarNavegacao();
        //this.montarLista($('input#hidListaAtualizada', dados));

        //atualizar a lista
        this.$this.find("#hidLista").val($(dados).find("#hidListaAtualizada").val());

        this.montarConteudo($('div#conteudo', dados));


        //rlz.desabilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado");
        this.$this.find(this.btnLimpar).removeAttr('href').click(function () {
            if ($(this).attr("class").indexOf("_desabilitado") == -1) {
                rlz.limparQuestao();
            }
        });

        this.$this.find(this.btnRevisar).removeAttr('href').click(function () {
            if ($(this).attr("class").indexOf("_desabilitado") == -1) {
                rlz.revisarQuestao();
            }
        });
        this.$this.find(this.btnConferir).removeAttr('href').click(function () {
            if ($(this).attr("class").indexOf("_desabilitado") == -1) {
                rlz.conferirQuestao();
            }
        });

        this.atualizarListaQuestao(dados);

        var boxQuestaoPai = this.$this.find("#boxQuestaoPai");

        this.$this.find("#btnQuestaoPai").click(function () {
            $(this).find("#imgBtnQuestaoPai").toggleClass("imagemMais");

            if (boxQuestaoPai.hasClass("hide")) {
                boxQuestaoPai.toggleClass("hide");
            } else {
                boxQuestaoPai.addClass("hide");
            }
        });

        //dados.find(".areaNavInferior div.btnCentral").remove();



        rlz.aplicarDuvidasQuestao();

        if (this.retornoCarregar) {
            this.retornoCarregar(dados);
            rlz.efeitoBtn("btnCinza");
            rlz.efeitoBtn("btnAzul");
            rlz.efeitoBtn("btnVerde");
            rlz.efeitoBtn("btnDourado");
        }
        rlz.carregando(false);

        var tmpLst = eval(rlz.$this.find("#hidLista").val());

        try {
            this.carregaDragDrop();
        } catch (e) {
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

    this.atualizarListaQuestao = function (dados) {

        var lista = dados.find("#hidListaAtualizada").val();
        rlz.$this.find("#hidLista").val(lista);
        rlz.$this.find("#listaQuestoes").html("");
        rlz.$this.find("#tmplListaQuestoes").template();

        rlz.$this.find("#tmplListaQuestoes")
                    .tmpl(eval(lista))
                    .appendTo("#listaQuestoes");

        rlz.$this.find('ul#listaQuestoes > li').each(function () {
            var a = $(this).find("a");
            var link;
            if (a.attr('href') != undefined) {
                link = a.attr('href').split('in=');
                a.click(function () {
                    //rlz.trocarQuestao(link[1]);
                    rlz.trocarQuestao(link[1]);
                }).attr('href', 'javascript:void(' + link[1] + ')');
            }
        });
    }
    /**
    * Cria os elementos de ação e troca de questão
    */
    this.criarElementos = function () {
        var questao = document.createElement("input");
        var acao = document.createElement("input");
        var viewstate = document.createElement("input");

        // Página
        questao.type = "hidden";
        questao.id = questao.name = "txtQuestao";
        questao.value = this.questaoAtual;

        // Última Ação
        acao.type = "hidden";
        acao.id = acao.name = "txtAcao";
        acao.value = "1";

        // Viewstate
        viewstate.type = "hidden";
        viewstate.id = viewstate.name = "viewState";

        this.$this.find(this.formulario).prepend($(questao));
        this.$this.find(this.formulario).prepend($(acao));
        this.$this.find(this.formulario).append($(viewstate));
    }

    /**
    * Cria os links para navegação
    */
    this.criarNavegacao = function () {
        this.$this.find(this.btnVoltar).removeAttr('href').click(function () { rlz.voltarQuestao(); });
        this.$this.find(this.btnAvancar).removeAttr('href').click(function () { rlz.avancarQuestao(); });
    }

    /* Area Paginacao */
    this.montarPaginacao = function (dados) {


        $('div#areaPaginacao #paginacao ul > li').each(function () {
            var a = $('> a', $(this));
            var link;
            if (a.attr('href') != undefined) {
                link = a.attr('href').split('in=');
                a.click(function () {
                    rlz.trocarQuestao(link[1]);
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

        if (this.questaoAtual == this.ultimaAtual) {
            this.$this.find('a#btnAvancar').hide();
            this.$this.find('a#btnAvancarInativo').show();
        } else {
            this.$this.find('a#btnAvancar').show();
            this.$this.find('a#btnAvancarInativo').hide();
        }

        this.$this.find("#txtQuestao").val(this.questaoAtual);
        var tmpLst = eval(rlz.$this.find("#hidLista").val());
        var nome = tmpLst[this.questaoAtual].nome;
        //this.$this.find("#currentQuestao").text(parseInt(this.questaoAtual, 10) + 1);
        this.$this.find("#currentQuestao").text(nome);

    }

    /* Area Conteudo */
    this.montarConteudo = function (dados) {

        if (!this.viewCorreta) {
            dados.find(".marcadoCorreta").removeClass("marcadoCorreta");
            dados.find(".sugestaoResposta").removeClass("sugestaoResposta").addClass("hide");
            dados.find('[for="txtTextoResposta"]').remove();
            dados.find(".areaAlternativas .txtAreaDissertativa").html("");
            dados.find("input[name=txtLacunaResposta]").val("|");
            dados.find("input[name=txtLacunaCss]").val("");
            dados.find(".colunaAssoD .alternativa").text("");
            dados.find(".boxGabaritoAlternativa").remove();
        }

        var btnsHide = dados.find(".areaNavInferior .btnCentral a.hide").length;
        var btnsTota = dados.find(".areaNavInferior .btnCentral a").length;
        dados.find(".areaNavInferior .btnCentral").css({ "width": (btnsTota - btnsHide) * 140 });

        this.$this.find('div#areaQuestao').html(dados.html());

        this.$this.find(this.btnConferir).show();

        this.callTipo("aplicarBotoes");

        //aplicar acao das dicas
        new DicaRealizacao(rlz.$this.find('div#areaQuestao .areaDicas:first'), rlz.$this.find(this.formulario + ' #idProvaRealizacao').val(), rlz.$this.find(this.formulario + ' #txtQuestao').val());

    }

    this.caixaAlternativaClick = function ($target) {
        if (!$target.is("label") && !$target.is("input") && !$target.parents("div").hasClass("areaDicas") && $target.closest("label").length == 0) {
            return true;
        }
        return false;
    }

    this.aplicarBotoesDefault = function () {

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
        //aplica as dicas
        this.$this.find('div#areaQuestao #alternativas li').each(function () {
            new DicaRealizacao($(this).find('.areaDicas'), rlz.$this.find(rlz.formulario + ' #idProvaRealizacao').val(), rlz.$this.find(rlz.formulario + ' #txtQuestao').val(), $(this).find('input[type=radio]').val());
        });


    }
    this.aplicarBotoesSimplesEscolhaOpniao = function () {
        this.aplicarBotoesDefault();
    }
    this.aplicarBotoesDiscursivaManualOpniao = function () {
        this.aplicarBotoesDiscursivaManual();
    }

    this.aplicarBotoesDiscursivaManual = function () {
        //this.$this.find(this.btnConferir).hide();

        rlz.desabilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);


        $("#realizadortoolTip .corpo").text("Essa questão será corrigida manualmente. Aguarde a correção para saber se respondeu corretamente.");
        $(".btnVerde_desabilitado").mouseover(function () {
            $("#realizadortoolTip").removeClass("hide");
        }).mouseout(function () {
            $("#realizadortoolTip").addClass("hide");
        });

        this.$this.find("#txtTextoResposta").keyup(function () {
            if ($(this).val().length > 0) {
                rlz.habilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            } else {
                rlz.desabilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            }
        });

        var campo = this.$this.find('div#areaQuestao textarea');
        var abriuImagem = false;
        try {
            //aplicar o tiny

            var formatTine = $.extend(
                                     {},
                                     formatRealizacao,
                                     {
                                         plugins: "advimage,inlinepopups,htmlcharcount",
                                         theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,image",
                                         htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined)
                                     }
                                 )

            this.$this.find('div#areaQuestao textarea').tinymce(formatTine);


            var $btnSalvar = $('<a></a>');
            $btnSalvar.addClass("btnSalvarResposta btnNovo btnCinza");
            var $cont = $('<div></div>');
            $cont.addClass("texto");
            $cont.text('Salvar');
            $btnSalvar.append($cont);
            this.$this.find('.areaNavInferior .btnCentral').prepend($btnSalvar);

            $btnSalvar = $('<a></a>');
            $btnSalvar.addClass("btnSalvarResposta btnNovo btnCinza btnSalvarAlinhar");
            var $cont = $('<div></div>');
            $cont.addClass("texto");
            $cont.text('Salvar');
            $btnSalvar.append($cont);
            this.$this.find('.areaAlternativas').prepend($btnSalvar);

            this.$this.find('.btnSalvarResposta').click(function () {
                rlz.salvarResposta();
            });

        } catch (e) {
            campo.blur(function () {
                rlz.salvarResposta();
            });

            this.contaChar(campo, campo.attr('maxchar'));
        }




    }
    this.aplicarBotoesDiscursivaAutomatica = function () {
        this.$this.find("#txtResposta").keyup(function () {
            if ($(this).val().length > 0) {
                rlz.habilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
                rlz.habilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            } else {
                rlz.desabilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
                rlz.desabilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            }
        });
        this.$this.find('div#areaQuestao #txtResposta').each(function () {
            $(this).blur(function () {
                rlz.salvarResposta();
            });
        });

        var campo = this.$this.find('div#areaQuestao #txtResposta');

        this.contaChar(this.$this.find("#txtResposta"), campo.attr('maxchar'));
    }
    this.aplicarBotoesAssociativa = function () {
        /*this.$this.find('div#areaQuestao input[name=txtResposta]').each(function () {
        $(this).blur(function () {
        rlz.salvarResposta();
        });
        });*/

    }
    this.aplicarBotoesSomatoria = function () {
        this.$this.find('div#areaQuestao #txtResposta').each(function () {
            $(this).blur(function () {
                rlz.salvarResposta();
            });
        });

        //var totalAlternativas = $("div#areaQuestao input[type=hidden]").length;
        this.$this.find("div#areaQuestao #txtResposta").keydown(function (e) {

            if (e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
                return false;
            }

            if ($(this).val().length > 0) {
                rlz.habilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
                rlz.habilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            } else {
                rlz.desabilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
                rlz.desabilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            }
        });
        this.$this.find("div#areaQuestao #txtResposta").keyup(function (e) {

            var vlDg = parseInt($(this).val());
            var vlMx = parseInt(rlz.$this.find("div#areaQuestao #valorMaximoSomatoria").val());

            if (vlDg <= 0 || vlDg > vlMx) {
                $(this).val('');
            };

            if ($(this).val().length > 0) {
                rlz.habilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
                rlz.habilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            } else {
                rlz.desabilitarBtn($(rlz.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
                rlz.desabilitarBtn($(rlz.btnLimpar), "btnCinza_desabilitado", rlz.limparQuestao);
            }
        });

        //aplica as dicas
        $('div#areaQuestao #alternativas li').each(function () {
            new DicaRealizacao($(this).find('.areaDicas'), rlz.$this.find(rlz.formulario + ' #idProvaRealizacao').val(), rlz.$this.find(rlz.formulario + ' #txtQuestao').val(), $(this).find('input[type=hidden]').val());

        });
    }

    this.aplicarBotoesMultiplaEscolhaOpiniao = function () {
        this.aplicarBotoesMultiplaEscolha();
    }

    this.aplicarBotoesMultiplaEscolha = function () {

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
        $('div#areaQuestao #alternativas li').each(function () {

            new DicaRealizacao($(this).find('.areaDicas'), rlz.$this.find(rlz.formulario + ' #idProvaRealizacao').val(), rlz.$this.find(rlz.formulario + ' #txtQuestao').val(), $(this).find('input[type=checkbox]').val());

        });
    }
    this.aplicarBotoesVerdadeiroFalso = function () {
        $('div#areaQuestao input[type=radio]').each(function () {
            $(this).change(function () {

                var tmpId = $(this).attr('id').split('_');
                var idAlt = tmpId[2];

                if ($(this).val().toUpperCase() == "V") {
                    rlz.$this.find('#rdoVerdadeira_' + tmpId[2]).val(' ' + idAlt + ' ');
                    rlz.$this.find('#rdoFalsa_' + tmpId[2]).val('');
                } else {
                    rlz.$this.find('#rdoFalsa_' + tmpId[2]).val(' ' + idAlt + ' ');
                    rlz.$this.find('#rdoVerdadeira_' + tmpId[2]).val('');
                }

                rlz.salvarResposta();
            });
        });

        //aplica as dicas
        $('div#areaQuestao #alternativas li').each(function () {

            new DicaRealizacao($(this).find('.areaDicas'), rlz.$this.find(rlz.formulario + ' #idProvaRealizacao').val(), rlz.$this.find(rlz.formulario + ' #txtQuestao').val(), $(this).find('input[name=idAlternativa]').val());

        });
    }
    this.aplicarBotoesLacunas = function () {
        addOptionVazio();
        inputToLacunas();
        rlz.$this.find(".mceInput").focusout(function () {
            respostas();
            rlz.salvarResposta();
        });
        rlz.$this.find(".mceCombo").change(function () {
            respostas();
            rlz.salvarResposta();
        });
        function respostas() {
            rlz.$this.find(".mceInput").each(function () {
                textToInput($(this), "input");
            });
            rlz.$this.find(".mceCombo").each(function () {
                textToInput($(this), "combo");
            });
        }
        function inputToLacunas() {
            var resp, pos, css, dis; ;

            $("ul#alternativas li.alt").each(function () {
                resp = $(this).find("input[name=txtLacunaResposta]").val().split('|');
                css = $(this).find("input[name=txtLacunaCss]").val();
                pos = $(this).find("input[name=txtLacunaPos]").val().charCodeAt(0) - 64;
                dis = $(this).find("input[name=txtDesabilitado]").val();

                switch (resp[0]) {
                    case "input":
                        $("input[id=lacuna_input_" + pos + "]").val(resp[1]);
                        break;
                    case "combo":
                        $("#lacuna_input_" + pos + " > option").removeAttr("selected");
                        //$("#lacuna_input_" + pos + " option[value='" + resp[1] + "']").attr("selected", "selected");
                        var respComp = resp[1]; //.replace('"', '&quot;')

                        $("#lacuna_input_" + pos + " option").each(function () {
                            if (this.value == respComp) {
                                $(this).attr("selected", "selected");
                            }
                        });
                        break;
                }
                //Tratamento propriedades...
                $("#lacuna_input_" + pos + "").addClass(css);
                if (dis == "disabled=") {
                    $("#lacuna_input_" + pos + "").prop("disabled", "disabled");
                }

            });
        }
        function textToInput(obj, tipo) {
            var id = obj.attr("id");
            var pos = id.substring(id.lastIndexOf('_') + 1, id.length) - 1;
            //if ($.trim(obj.val()).length > 0) {
            $("ul#alternativas li:eq(" + pos + ") input[name=txtLacunaResposta]").val(tipo + "|" + obj.val());
            //}
        }
        function addOptionVazio() {
            rlz.$this.find(".mceCombo").each(function () {
                $(this).find("option").each(function () { if ($(this).val() == "") { $(this).remove(); } });
                $(this).append($("<option>").attr("selected", "selected").val(""));
            });
        }
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
        this.bolMostrarCarregador = true;
        this.$this.find("#txtAcao").val("trocaQuestao");
        this.$this.find("#txtQuestao").val(questao);
        this.enviar();
    }

    this.voltarQuestao = function () {
        //alert("show Carregando");
        this.carregando(true);
        var questao = parseInt(this.$this.find("#txtQuestao").val(), 10) - 1;
        if (questao < 0) {
            return;
        }
        this.$this.find("#txtQuestao").val(questao);

        this.bolMostrarCarregador = true;
        this.enviar("trocaQuestao");
    }

    this.avancarQuestao = function () {
        //alert("show Carregando");
        this.carregando(true);
        var questao = parseInt(this.$this.find("#txtQuestao").val(), 10) + 1;
        if (questao > this.ultimaAtual) {
            return;
        }
        this.bolMostrarCarregador = true;
        this.$this.find("#txtQuestao").val(questao);
        this.enviar("trocaQuestao");
    }

    /* Salvar resposta */
    this.salvarResposta = function () {
        rlz.bolMostrarCarregador = false;
        rlz.enviar("salvarResposta");
    }

    /* Manipular a questão */
    this.limparQuestao = function () {
        rlz.bolMostrarCarregador = true;
        rlz.enviar("limparQuestao");
    }

    this.revisarQuestao = function () {
        rlz.bolMostrarCarregador = true;
        rlz.enviar("revisarQuestao");
    }
    this.conferirQuestao = function () {
        rlz.bolMostrarCarregador = true;
        rlz.carregando(true);
        rlz.desabilitarBtn($(this.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
        rlz.enviar("conferirQuestao");
        rlz.habilitarBtn($(this.btnConferir), "btnVerde_desabilitado", rlz.conferirQuestao);
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


    /* Enviar */
    this.enviar = function (acao) {
        this.$this.find("#txtAcao").val(acao);
        //this.carregando(true);
        //this.carregador.mostrar();

        this.$this.find(this.formulario).submit();
    }


    /* Exibir carregando */
    this.carregando = function (exibir) {
        if (exibir) {
            if (rlz.bolMostrarCarregador) {
                rlz.carregador.mostrar();
            }
            this.$this.find(this.formulario).addClass('carregando');
        } else {
            if (rlz.bolMostrarCarregador) {
                rlz.carregador.esconder();
            }
            this.$this.find(this.formulario).removeClass('carregando');
        }

    }
    this.carregaInputLetraAssociar = function () {

        $("input[name=txtLetraAsso]").keyup(
            function (e) {
                var codigoLetra = e.which;
                if (codigoLetra == 0 && this.value.length > 0) {
                    var letraEscolhida = this.value.substr(0, 1).toUpperCase();
                    codigoLetra = letraEscolhida.charCodeAt(0)
                }
                if (codigoLetra != 8 && (codigoLetra < 65 || codigoLetra > 122)) {
                    return false;
                } else {

                    $(this).parents(".boxRecebeAssociado").find("input[name=txtResposta]").val("0");
                    rlz.salvarResposta();
                }
            }
        ).keypress(function (e) {

            if (e.which != 8 && (e.which < 65 || e.which > 122)) {
                return false;
            }
        });
    }

    this.carregaDragDrop = function () {

        this.carregaInputLetraAssociar();

        $(".opcaoLetra").draggable({ revert: true });
        $(".boxRecebeAssociado").droppable({
            accept: ".opcaoLetra",
            activeClass: "ui-state-hover",
            hoverClass: "ui-state-active",
            drop: function (event, ui) {
                $(this)
                    .find("input[name=txtResposta]")
                        .val(ui.draggable.attr("id"));
                $(this)
                    .find("input[name=txtLetraAsso]")
                        .val($.trim(ui.draggable.text()));

                if (getInternetExplorerVersion() != 8) {
                    ui.draggable.remove();
                }

                rlz.salvarResposta();
            }
        });
    };
    this.aplicarDuvidasQuestao = function () {
        this.$this.find("a#btnDuvida").removeAttr('href').click(function () {
            if ($(this).is(":visible")) {
                $(this).hide();
                rlz.$this.find("#boxCaixaDuvida").show();
            } else {
                $(this).show();
                rlz.$this.find("#boxCaixaDuvida").hide();
            }
            //this).toogle();
        });

        var pathSaveDuvida = this.$this.find("a#btnSendDuvida").attr('href');
        this.$this.find("a#btnSendDuvida").removeAttr('href').click(function () {
            rlz.$this.find("a#btnSendDuvida").hide();
            if ($.trim(rlz.$this.find("#txtTextoDuvida").val()).length <= 0) {
                return;
            }
            rlz.carregando(true);
            var idQuestao = rlz.$this.find("#txtQuestao").val();

            //questao real
            var listJson = eval(rlz.$this.find("#hidLista").val());
            var intPaginaReal = idQuestao;
            var listaSemCapa = [];
            for (var i = 0; i < listJson.length; i++) {
                if (listJson[i].capa != 'True') {
                    listaSemCapa.push(i);
                }
            }
            for (var i = 0; i < listJson.length; i++) {
                if (listaSemCapa[i] == idQuestao) {
                    intPaginaReal = i;
                }
            }

            rlz.$this.find("#txtQuestao").val(intPaginaReal);
            $.ajax({
                url: pathSaveDuvida,
                data: $(rlz.formulario).serialize(),
                type: "POST",
                success: function (dados, status, xhttp) {
                    rlz.$this.find("#txtQuestao").val(idQuestao);
                    if ($(dados).hasClass('erro') || $(dados).hasClass('aviso')) {
                        rlz.$this.find("a#btnSendDuvida").show();
                        rlz.retornoErro(dados);
                        return;
                    }

                    rlz.$this.find("#boxListaDuvidas").html(dados);
                    rlz.carregando(false);
                    rlz.$this.find("#txtTextoDuvida").val('');
                    if ($(dados).find("input[name='limitDuvidas']").val() == 0) {
                        rlz.$this.find("#boxCaixaDuvida").remove();
                        rlz.$this.find("#btnDuvida").remove();
                    } else {
                        rlz.$this.find("#boxCaixaDuvida").hide();
                        rlz.$this.find("#btnDuvida").show();
                    }
                }
            });


        });
    }
    this.init();
}

function DicaRealizacao(container, idProva, posQuestao, idAlternativa) {
    var dica = this;

    this.container = container;

    this.prova = idProva;
    this.questao = posQuestao;
    this.alternativa = idAlternativa;

    this.btns = {};
    this.caminhos = {};

    this.textosComentario = {};

    this.tipos = ["Dica", "Comentario", "Professor", "Sugestao", "Correcao"];

    this.init = function () {

        for (var i = 0; i < this.tipos.length; i++) {
            var nomeTipo = this.tipos[i];
            var btn = $(this.container).find('.box' + nomeTipo);
            btn.find(' a.btnDica').attr('title', nomeTipo);

            if (btn.find(' a.btnDica').length <= 0)
                continue;

            this.caminhos[nomeTipo] = btn.find(' a.btnDica').attr('href');

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
            tst = $.ajax({
                url: this.caminhos[tipo],
                data: "idProvaRealizacao=" + this.prova + "&posQuestao=" + this.questao + "&tipo=" + tipo + "&alternativa=" + (this.alternativa ? this.alternativa : ""),
                type: "POST",
                success: function (dados, status, xhttp) { dica.retornoCarregar(conta.find("div.textoDica"), dados, btn); }
            });
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


