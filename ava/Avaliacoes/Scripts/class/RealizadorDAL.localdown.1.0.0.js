//teste persistencia, dados
var agendamentoMock = undefined;

//var realizacaoMock = undefined; //caso resolvest q já está embarcado o agendamento
var realizacaoMock = undefined;

//var respostasMock = {}
var respostasMock = undefined;

var onlineMock = true;

function RealizadorDAL (sCaminhoBase){

    var rdal = this;

    this.caminhoBase = sCaminhoBase;
    this.listenerOnline = function (bol) { };


    this.init = function (fRetorno) {
        fRetorno();
    }

    this.Online = function (fRetorno) {
        //TODO: definir o funcionamento, terá que ter um callback
        fRetorno(onlineMock);
    }

    /*
    Chamada quando fecha a avaliação
    */
    this.Close = function (idAplicacao, idConfig) {
        alert("ação para quando fechar");
    };

    /*
    Inciar a realização
    */
    this.Realizar = function (idAplicacao, idConfig, fRetorno) {

        if (!realizacaoMock) {
            //crio o objeto passando as questões
            realizacaoMock = {};
            realizacaoMock.encerrada = false;
            realizacaoMock.questoes = agendamentoMock.questoes;

        }

        if (realizacaoMock.encerrada) {
            this.Resumo(idAplicacao, idConfig, fRetorno);
            return
        }


        var url = rdal.caminhoBase + '/Aplicador/uteis/realizar.htm';

        $.ajax({
            url: url,
            type: "GET",
            success: function (dados, status, xhttp) {

                var retorno = $(dados);

                //aplicar dados da avaliação
                retorno.find('.tituloAvaliacao').attr('title', agendamentoMock.title).html(agendamentoMock.title);
                retorno.find('#btnResumo').remove();
                fRetorno(retorno, realizacaoMock.questoes);
            }
        });
    };

    /*
    Tela do resumo
    */
    this.Resumo = function (idAplicacao, idConfig, fRetorno) {

        var url = rdal.caminhoBase + '/Aplicador/uteis/resumo.htm';

        $.ajax({
            url: url,
            type: "GET",
            success: function (dados, status, xhttp) {

                var retorno = $(dados);

                //apresentar dados da realização
                retorno.find('.tableProtoloco .nomeUsuario').html(realizacaoMock.user);
                retorno.find('.tableProtoloco .tituloAvaliacao').html(agendamentoMock.title);
                retorno.find('.tableProtoloco .dataTermino').html(realizacaoMock.dataTermino);
                retorno.find('.tableProtoloco .horaTermino').html(realizacaoMock.horaTermino);

                if(realizacaoMock.correcao)
                    retorno.find('.areaConteudoResumo .msgSemCorrecao').remove();
                else
                    retorno.find('.areaConteudoResumo .navegaPaginacao').remove();

                if(realizacaoMock.tipoTentativa == 0 || realizacaoMock.tipoTentativa == 2){
                    retorno.find('#btnRefazer.btnRefazer').remove();
                    retorno.find('.msgRefazer1').remove();
                }

                if(realizacaoMock.tipoTentativa == 0 || realizacaoMock.tipoTentativa == 1){
                    retorno.find('#btnAutoEstudo.btnRefazer').remove();
                    retorno.find('.msgRefazer2').remove();
                }

                if(realizacaoMock.tipoTentativa == 0){
                    retorno.find('#boxRefazer').remove();
                }

                fRetorno(retorno, realizacaoMock.questoes);
            }
        });
    }

    /*
    Visualizar
    */
    this.Visualizar = function (idAplicacao, idConfig, fRetorno) {

        var url = rdal.caminhoBase + '/Aplicador/uteis/realizar.htm';

        $.ajax({
            url: url,
            type: "GET",
            success: function (dados, status, xhttp) {
                var retorno = $(dados);

                //aplicar dados da avaliação
                retorno.find('.tituloAvaliacao').attr('title', agendamentoMock.title).html(agendamentoMock.title);
                retorno.find('#btnEncerrar').remove();
                retorno.find('#btnSinc').remove

                fRetorno(retorno, realizacaoMock.questoes);
            }
        });
    }

    /*
    Refazer a realização
    */
    this.Refazer = function (idAplicacao, idConfig, fRetorno) {

        realizacaoMock = undefined;
        respostasMock = {};

        this.Realizar(idAplicacao, idConfig, fRetorno);
    };

    /*
    Carregar a lista para encerrar
    */
    this.ListaEncerrar = function (fRetorno) {

        var url = rdal.caminhoBase + '/Aplicador/uteis/encerrar.htm';

        $.ajax({
            url: url,
            type: "GET",
            success: function (dados, status, xhttp) {
                //aplicar a lista
                fRetorno(dados);
            }
        });
    };

    /*
    Encerrar
    */
    this.Encerrar = function(idAplicacao, idConfig, fRetorno){
        var url = rdal.caminhoBase + '/AplicadorOffline/Encerrar';
        this._Sincronizar(url, idAplicacao, idConfig, fRetorno);
    }

    /*
    Sincronizar a avaliação
    */
    this.Sincronizar = function (idAplicacao, idConfig, fRetorno) {

        this.Online(function (status) {
            if (status) {
                var url = rdal.caminhoBase + '/AplicadorOffline/Sincronizar';
                rdal._Sincronizar(url, idAplicacao, idConfig, fRetorno);
            } else {
                fRetorno(false);
            }
        });

    }

    /*
    Sincronização comum
    */
    this._Sincronizar = function (url, idAplicacao, idConfig, fRetorno) {

        var form = $('<form></form>');
        var aplica = $('<input name="idAplicacao" type="hidden" />')
        aplica.val(idAplicacao)
        var config = $('<input name="idConfig" type="hidden" />')
        config.val(idConfig)
        var user = $('<input name="IdUsuario" type="hidden" />')
        user.val(30154567)
        form.append(aplica).append(config).append(user);
        var down = $('<input name="bolDown" type="hidden" />')
        //tem a realização
        if (realizacaoMock) {

            down.val(0);

            for (var i = 0; i < realizacaoMock.questoes.length; i++) {
                //respostasMock
                var id = realizacaoMock.questoes[i].id;
                var pos = realizacaoMock.questoes[i].i;
                var rv = realizacaoMock.questoes[i].rv;

                if (respostasMock["q" + id]) {
                    var questaoJson = {
                        resposta: respostasMock["q" + id].resposta,
                        pos: pos,
                        revisar: rv,
                        data: respostasMock["q" + id].data,
                        hora: respostasMock["q" + id].hora

                    };
                    var questao = $('<input type="hidden" name="resposta" value=""/>');
                    questao.val(JSON.stringify(questaoJson));
                    form.append(questao)
                }
            }
        } else {
            //requisição normal
            down.val(1);
        }
        form.append(down);
        alert(form.html());
        alert(form.serialize());
        $.ajax({
            url: url,
            data: form.serialize(),
            type: "POST",
            success: function (dados, status, xhttp) {
                //aplicar a lista
                realizacaoMock = dados.realizacao;
                respostasMock = dados.questoes;
                if (dados.download && $.trim(dados.download) != "") {
                    alert(dados.download);
                }
                fRetorno(true);
            }
        });

    }

    /*
    Carregar a questão
    */
    this.QuestaoCarregar = function (pos, fRetorno) {

        var id = realizacaoMock.questoes[pos].id; ;
        var resposta = this._GetQuestaoResolvida(pos);

        $.ajax({
            url: rdal.caminhoBase + "/Aplicador/data/q/" + id + ".htm",
            type: "GET",
            success: function (dados, status, xhttp) {
                //apresentar o valor da questao
                var conteudo = $(dados);
                conteudo.find("span.valorQuestao > span").html(realizacaoMock.questoes[pos].v);

                //aplicar dicas e comentarios
                if (resposta && resposta.comentarios) {
                    //aplicar os comentários na ordem
                    var lstTipos = ["Comentario", "Dica", "Sugestao", "Correcao"];
                    var area = conteudo.find(".areaDica");
                    var areaContent = conteudo.find(" .areaConteudoDica");

                    for (var i = 0; i < resposta.comentarios.length; i++) {
                        var showBox = false;
                        for (var j = 0; j < lstTipos.length; j++) {
                            var btn = $(area.get(i)).find(".box" + lstTipos[j]).find("a.hide")
                            var box = $(areaContent.get(i)).find(".conteudo" + lstTipos[j]).find(".textoDica");

                            if (resposta.comentarios[i][lstTipos[j]] && $.trim(resposta.comentarios[i][lstTipos[j]]) != "") {
                                btn.removeClass("hide").addClass("btnDica");
                                box.html(resposta.comentarios[i][lstTipos[j]]);
                                showBox = true;
                            }

                        }

                        if (showBox) {
                            $(area.get(i)).removeClass("hide");
                            $(areaContent.get(i)).removeClass("hide");
                        }

                    }
                }

                if (realizacaoMock.encerrada)
                    conteudo.find('.btnCentral').html('').hide();

                fRetorno(conteudo, pos, resposta);
            }
        });
    };

    /*
    Responder questão
    */
    this.QuestaoResponder = function (resposta, questaoAtual, fRetorno) {

        var id = realizacaoMock.questoes[questaoAtual].id;

        var objResposta = this._GetQuestaoResolvida(questaoAtual);

        if (!objResposta)
            objResposta = {};

        var date = new Date();
        objResposta.resposta = resposta;
        objResposta.data = $.datepicker.formatDate('dd/mm/yy', date);
        objResposta.hora = this._formatHora(date);

        respostasMock["q" + id] = objResposta

        var questao = realizacaoMock.questoes[questaoAtual]

        questao.r = true;

        fRetorno(questao, questaoAtual, objResposta);

    };

    /*
    Limpar resposta
    */
    this.QuestaoLimpar = function (questaoAtual, fRetorno) {

        var id = realizacaoMock.questoes[questaoAtual].id;

        var objResposta = this._GetQuestaoResolvida(questaoAtual);

        if (!objResposta)
            objResposta = {};

        var date = new Date();
        objResposta.resposta = "";
        objResposta.data = $.datepicker.formatDate('dd/mm/yy', date);
        objResposta.hora = this._formatHora(date);

        respostasMock["q" + id] = objResposta

        var questao = realizacaoMock.questoes[questaoAtual]

        questao.r = false;

        fRetorno(questao, questaoAtual, objResposta);
    };

    /*
    Revisar depois
    */
    this.QuestaoRevisar = function (questaoAtual, fRetorno) {
        var questao = realizacaoMock.questoes[questaoAtual]

        questao.rv = !questao.rv;
        if (questao.rv)
            questao.s = "listaQuestoesEmRevisao";
        else
            questao.s = "";

        var date = new Date();
        questao.data = $.datepicker.formatDate('dd/mm/yy', date);
        questao.hora = this._formatHora(date);

        fRetorno(questao, questaoAtual);
    };



    /* metodos auxiliares */
    this._GetQuestaoResolvida = function (pos) {
        var id = realizacaoMock.questoes[pos].id;
        var resposta = undefined;
        if (respostasMock["q" + id]) {
            resposta = respostasMock["q" + id];
        }

        return resposta;
    }

    this._formatHora = function (date) {

        return (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    }
};