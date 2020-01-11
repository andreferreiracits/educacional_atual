//adição dos métodos da redação
TipoResposta.prototype.initRedacao = function () {

    var tiporesposta = this;
    var $btnTipoCriterio = null;
    var unchecked = false;
    var tipoCriterio = "";

    this.cxaAdicionarAlternativaRedacao = function () {
        $("#btnCriteriosEnem, #btnCriteriosSugeridos").click(function () {
            $btnTipoCriterio = $(this);
            if ($btnTipoCriterio.hasClass("ativo")) {
                return;
            }
            tiporesposta.trocarTipoCriterio();
        });
        tiporesposta.initBoxCriteriosObr();
    };

    this.trocarTipoCriterio = function () {
        var html = "";
        html += "<div  title='Avaliações' id='confirm' class='alerta confirm'>";
        html += "Você irá perder os dados sobre os critérios a serem utilizados. Deseja continuar?"
        html += "<a href='javascript:;' class='btnConfirmSim'>Sim</a>";
        html += "<a href='javascript:;' class='btnConfirmNao'>Não</a>";
        html += "</div>";
        new Confirm("alerta").exibir($(html), tiporesposta.confirmaTrocarTipoCriterio);
    };

    this.confirmaTrocarTipoCriterio = function () {
        carregando.mostrar();
        $.ajax({
            url: caminhoBase + '/Questoes/TrocarTipoCriterio/' + $("#idQuestaoSalvar").val(),
            type: "GET",
            success: function (dados, status, xhttp) {
                carregando.esconder();
                if (!retornoErro(dados)) {
                    tiporesposta.setBtnAtivo();
                    $("#boxCriteriosObr").html(dados);
                    tiporesposta.initBoxCriteriosObr();
                }
            }
        });
    };

    this.setBtnAtivo = function () {
        $("ul.criteriosOpcoes a").removeClass("ativo");
        $btnTipoCriterio.addClass("ativo");
    };

    this.initBoxCriteriosObr = function () {
        tipoCriterio = $("#tipoCriterio").val();
        $("#boxCriteriosObr > table > tbody > tr").hover(function () {
            $("div.botoes", this).show();
        }, function () {
            $("div.botoes", this).hide();
        });
        $("#boxCriteriosObr input[type='checkbox']").click(function () {
            if ($(this).prop("checked")) {
                if (unchecked) {
                    return (unchecked = false);
                }
                $(this).closest("tr").find("input[type='hidden']").prop("disabled", false);
                $(this).closest("tr").find("input[name='pesoCriterioObr']").prop("disabled", false).focus();
            } else {
                unchecked = false;
                $(this).closest("tr").find("input[type='hidden']").prop("disabled", true);
                $(this).closest("tr").find("input[name='pesoCriterioObr']").prop("disabled", true).val("0");
                tiporesposta.updateTotalPeso();
            }
        });
        dataMode.decimal("#boxCriteriosObr input[name='pesoCriterioObr']", 1, "oldValue", "focusvalue");
        $("#boxCriteriosObr input[name='pesoCriterioObr']").setMask({
            mask: '999', autoTab: 'false'
        }).keydown(function (event) {
            if (event.which == 13) {
                $(this).blur();
            }
        }).keyup(function () {
            if (parseInt(this.value) > 100.0) {
                this.value = 100;
                $(this).attr("oldvalue", 0);
                $(this).blur();
            }
        }).blur(function () {
            if (parseInt(this.value) < 0) {
                this.value = "0";
                $(this).attr("oldvalue", 0);
            }
            if (this.value != $(this).attr("focusvalue")) {
                tiporesposta.updateTotalPeso();
            }
            if (this.value == "0") {
                unchecked = true;
                $(this).closest("tr").find("input[type='checkbox']").prop("checked", false);
                if (tipoCriterio == "sugerido") {
                    $(this).closest("tr").find("input[type='hidden']").prop("disabled", true);
                    $(this).prop("disabled", true);
                }
            }
        });
        $("#btnNovoCriterio").click(function () {
            $("#boxNovoCriterio").hide();
            $("#boxSalvarCriterio").show();
            $("#txtNomeCriterio").focus();
        });
        $("#btnCancelar").click(function () {
            $("#ckbNovoCriterio").prop("checked", true);
            $("#txtNomeCriterio").val("");
            $("#txtPesoCriterio").val("20");
            $("#txtPesoCriterio").prop("disabled", false);
            $("#boxSalvarCriterio").hide();
            $("#boxNovoCriterio").show();
        });
        $("#btnSalvarCriterio").off("click");
        $("#btnSalvarCriterio").click(function () {
            var self = this;
            var nome = $("#txtNomeCriterio").val().trim();
            if (validarNomeCriterio(nome)) {
                tiporesposta.salvarCriterioUsuario({
                    idQuestao: $("#idQuestaoSalvar").val(),
                    idCriterio: 0,
                    nome: nome,
                    peso: $("#txtPesoCriterio").val()
                }, function (dados) {
                    $(dados).insertBefore("#boxNovoCriterio");
                    $("#btnCancelar").click();
                    tiporesposta.initBoxCriteriosObr();
                });
            }
        });
        $("#boxCriteriosObr a.edit").click(function () {
            var $tr = $(this).parent().parent().parent();
            var html = $tr.html();
            var idCriterio = $(this).attr("data-criterio-id");
            var nomeCriterio = $(this).parent().parent().find("label").text();
            var pesoCriterio = $(this).parent().parent().parent().find("input[name='pesoCriterioObr']").val();
            var disabled = pesoCriterio == "0";
            var checked = !disabled;
            var $checkbox = $("<input>", { type: "checkbox", checked: checked });
            var $txtNomeCriterio = $("<input>", { type: "text", class: "txt", style: "width: 82%", value: nomeCriterio });
            var $btnSalvar = $('<a href="javascript:void(0)" class="btn">salvar</a>');
            var $btnCancelar = $('<a href="javascript:void(0)" class="btnExcluir">cancelar</a>');
            var $hidPesoCriterio = $("<input>", { type: "hidden", name: "idCriterioObr", value: idCriterio, disabled: disabled });
            var $txtPesoCriterio = $("<input>", { type: "text", name: "pesoCriterioObr", size: "3", class: "txt centro", value: pesoCriterio, disabled: disabled });
            var $td1 = $("<td></td>").append($checkbox);
            var $td2 = $("<td></td>").append($txtNomeCriterio, $btnSalvar, $btnCancelar);
            var $td3 = $("<td></td>").append($hidPesoCriterio, $txtPesoCriterio);
            $tr.html("").append($td1, $td2, $td3);
            tiporesposta.initBoxCriteriosObr();
            $txtNomeCriterio.focus();
            $btnSalvar.click(function () {
                var nome = $txtNomeCriterio.val().trim();
                if (validarNomeCriterio(nome)) {
                    tiporesposta.salvarCriterioUsuario({
                        idQuestao: $("#idQuestaoSalvar").val(),
                        idCriterio: idCriterio,
                        nome: nome,
                        peso: $txtPesoCriterio.val()
                    }, function (dados) {
                        $(dados).insertBefore($tr);
                        $($tr).remove();
                        tiporesposta.initBoxCriteriosObr();
                    });
                }
            });
            $btnCancelar.click(function () {
                $tr.html(html);
                tiporesposta.initBoxCriteriosObr();
            });
        });
        $("#boxCriteriosObr a.remove").click(function () {
            var $tr = $(this).parent().parent().parent();
            var idCriterio = $(this).attr("data-criterio-id");
            var html = "";
            html += "<div  title='Avaliações' id='confirm' class='alerta confirm'>";
            html += "Deseja excluir o critério?"
            html += "<a href='javascript:;' class='btnConfirmSim'>Sim</a>";
            html += "<a href='javascript:;' class='btnConfirmNao'>Não</a>";
            html += "</div>";
            var confirm = new Confirm("alerta");
            confirm.exibir($(html), function () {
                tiporesposta.excluirCriterioUsuario(idCriterio, function (dados) {
                    $($tr).remove();
                    tiporesposta.initBoxCriteriosObr();
                });
            });
        });
        tiporesposta.updateTotalPeso();
    };

    this.salvarCriterioUsuario = function (data, callback) {
        carregando.mostrar();
        $.ajax({
            type: "POST",
            url: caminhoBase + "/Questoes/SalvarCriterioUsuario/",
            contentType: "application/x-www-form-urlencoded",
            data: "idQuestao=" + data.idQuestao + "&idCriterio=" + data.idCriterio + "&nome=" + encodeURIComponent(data.nome) + "&peso=" + data.peso,
            success: function (dados, status, xhttp) {
                carregando.esconder();
                if (!retornoErro(dados)) {
                    if (callback) {
                        callback(dados);
                    }
                }
            }
        });
    };

    this.excluirCriterioUsuario = function (idCriterio, callback) {
        var idQuestao = $("#idQuestaoSalvar").val();
        carregando.mostrar();
        $.ajax({
            type: "POST",
            url: caminhoBase + "/Questoes/ExcluirCriterioUsuario/",
            contentType: "application/x-www-form-urlencoded",
            data: "idQuestao=" + idQuestao + "&idCriterio=" + idCriterio,
            success: function (dados, status, xhttp) {
                carregando.esconder();
                if (!retornoErro(dados)) {
                    if (callback) {
                        callback(dados);
                    }
                }
            }
        });
    };

    this.updateTotalPeso = function () {
        var t = 0;
        $("#boxCriteriosObr input[name='pesoCriterioObr']").each(function (index, element) {
            var value = parseInt($(element).val());
            if (isNaN(value)) {
                value = 0;
            }
            t += value;
        });
        $("#lblTotal").text(t);
    };

    function validarNomeCriterio(nome) {
        if (nome.length < 2) {
            var m = new Mensagem("alerta");
            var texto = nome.length == 0 ? RecursosJS["msg030"] : RecursosJS["msg031"];
            var template = mensagem.htmlTemplate("Avaliações", "erro", texto, "alerta");
            mensagem.exibir($(template));
            return false;
        }
        return true;
    }
};
