﻿//teste persistencia, dados
var agendamentoMock =
{
    id: 1913,
    title: 'prova do resolvest',
    questoes: [
        {
            id:1,
            n: "1", //label da questão
            i: 0, //indice da questão
            e: "paginacaoBtn bordaAgrupamento-None", //estilo do botao
            v:"0,78"
        },
        {
            id: 2,
            n: "2", //label da questão
            i: 1, //indice da questão
            e: "paginacaoBtn bordaAgrupamento-None", //estilo do botao
            v: "1,10"
        }
    ]
    };

//var realizacaoMock = undefined; //caso resolvest q já está embarcado o agendamento

var realizacaoMock = 
{
    questoes: 
    [
                {
                    id: 1,
                    n: "1", //label da questão
                    i: 0, //indice da questão
                    e: "paginacaoBtn bordaAgrupamento-None", //estilo do botao
                    s: "", //situacao da questão
                    r: true, //se foi respondida
                    rv: false, //se irá revisar
                },
                {
                    id: 2,
                    n: "2",
                    i: 1,
                    e: "paginacaoBtn bordaAgrupamento-None",
                    s: "listaQuestoesIncorreta",
                    r: true,
                    rv: false

                }
    ],
    encerrada : false,
    inicio: '10/12/2012 às 16:00',
    fim: '10/12/2012 às 16:00',
    user: 'Teste offline',
    correcao : false,
    tentativa : 1 //0-não, 1-tentativa normal, 2-auto estudo, 
};


//var respostasMock = {}
var respostasMock = {
    "q1": {
            resposta: "rdoAlternativa=3028",
            correcao: ["listaQuestoesIncorreta","listaQuestoesCorreta","naomarcouAlternativa"],
            gabarito: [3021],
            comentarios: [{Comentario:"comentario enunciado",Correcao:"",Dica:"dica"},
                          {Comentario:"",Correcao:"teste correcao"},
                          {Comentario:"alternativa b",Correcao:""},
                          {Comentario:"alternativa c",Correcao:"correcao c"}]
            
          },
    "q2": {
            resposta: "rdoAlternativa=3018",
            correcao: ["naomarcouAlternativa","listaQuestoesIncorreta","listaQuestoesCorreta"],
            gabarito: [3020]
          }
};

var onlineMock = true;

function RealizadorDAL(sCaminhoBase) {

    var rdal = this;

    this.caminhoBase = sCaminhoBase;
    this.listenerOnline = function (bol) { };

    this.statusSucesso = { sucess: true };

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
    this.Close = function (idAplicacao) {
        alert("ação para quando fechar");
    };

    /*
    Inciar a realização
    */
    this.Realizar = function (idAplicacao, fRetorno) {

        if (!realizacaoMock) {
            //crio o objeto passando as questões
            realizacaoMock = {};
            realizacaoMock.encerrada = false;
            realizacaoMock.questoes = agendamentoMock.questoes;

        }

        if (realizacaoMock.encerrada) {
            this.Resumo(idAplicacao, fRetorno);
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
                fRetorno(rdal.statusSucesso, retorno, realizacaoMock.questoes);
            }
        });
    };

    /*
    Tela do resumo
    */
    this.Resumo = function (idAplicacao, fRetorno) {

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

                if (realizacaoMock.correcao)
                    retorno.find('.areaConteudoResumo .msgSemCorrecao').remove();
                else
                    retorno.find('.areaConteudoResumo .navegaPaginacao').remove();

                if (realizacaoMock.tipoTentativa == 0 || realizacaoMock.tipoTentativa == 2) {
                    retorno.find('#btnRefazer.btnRefazer').remove();
                    retorno.find('.msgRefazer1').remove();
                }

                if (realizacaoMock.tipoTentativa == 0 || realizacaoMock.tipoTentativa == 1) {
                    retorno.find('#btnAutoEstudo.btnRefazer').remove();
                    retorno.find('.msgRefazer2').remove();
                }

                if (realizacaoMock.tipoTentativa == 0) {
                    retorno.find('#boxRefazer').remove();
                }

                fRetorno(rdal.statusSucesso, retorno, realizacaoMock.questoes);
            }
        });
    }

    /*
    Visualizar
    */
    this.Visualizar = function (idAplicacao, fRetorno) {

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

                fRetorno(rdal.statusSucesso, retorno, realizacaoMock.questoes);
            }
        });
    }

    /*
    Refazer a realização
    */
    this.Refazer = function (idAplicacao, fRetorno) {

        realizacaoMock = undefined;
        respostasMock = {};

        this.Realizar(idAplicacao, fRetorno);
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
                fRetorno(rdal.statusSucesso, dados);
            }
        });
    };


    /*
    Situacao
    */
    this.Situacao = function (idAplicacao, fRetorno) {
        if (agendamentoMock.id == idAplicacao) {
            fRetorno(this.statusSucesso, realizacaoMock.questoes);
        } else {
            fRetorno(this.statusSucesso, agendamentoMock.questoes);
        }
    }
    this.SituacaoProva = function(idProva, fRetorno){
        //teste com prova criada
        if(idProva == 0){
            fRetorno(this.statusSucesso, realizacaoMock.questoes);
        }else{
            //quando não tem
            fRetorno({erro:{id:2000, msg:"sem agendamento"}});
        }
    }

    /*
    Encerrar
    */
    this.Encerrar = function (idAplicacao, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/Encerrar';
        this._Sincronizar(url, this._FormSincronizar(idAplicacao, false), fRetorno);
    }

    /*
    Sincronizar a avaliação
    */
    this.Sincronizar = function (idAplicacao, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/Sincronizar';
        this._Sincronizar(url, this._FormSincronizar(idAplicacao, false), fRetorno);
    }
    this.SincronizarProva = function (idProva, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/Sincronizar';
        this._Sincronizar(url, this._FormSincronizar(agendamentoMock.id, false), fRetorno);
    }
    
    /* download */
    this.Download = function (idAplicacao, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/Sincronizar';
        this._Sincronizar(url, this._FormSincronizar(idAplicacao, true),  fRetorno);
    }
    this.DownloadProva = function (idProva, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/DownloadProva/' + idProva;
        var form = $('<form></form>');
        var prova = $('<input name="idProva" type="hidden" />')
        prova.val(idProva)
        form.append(prova);
        this._Sincronizar(url, form,  fRetorno);
    }
    /*
    Sincronização comum
    */
    this._FormSincronizar = function(idAplicacao, bolDownload){
        var form = $('<form></form>');
        var aplica = $('<input name="idAplicacao" type="hidden" />')
        aplica.val(idAplicacao)
        form.append(aplica);

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
        return form;
    }

    this._Sincronizar = function (url, form, fRetorno) {

        $.ajax({
            url: url,
            data: form.serialize(),
            type: "POST",
            success: function (dados, status, xhttp) {
                //aplicar a lista
                rdal._RetornoSincronizar(dados, fRetorno);
            }
        });

    };


    this._RetornoSincronizar = function(dados, fRetorno){
        realizacaoMock = dados.realizacao;
        respostasMock = dados.questoes;
        fRetorno(dados);
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

                fRetorno(rdal.statusSucesso, conteudo, pos, resposta);
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

        fRetorno(rdal.statusSucesso, questao, questaoAtual, objResposta);

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

        fRetorno(rdal.statusSucesso, questao, questaoAtual, objResposta);
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

        fRetorno(rdal.statusSucesso, questao, questaoAtual);
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
