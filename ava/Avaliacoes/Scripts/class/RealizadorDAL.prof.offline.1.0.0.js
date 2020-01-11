function RealizadorDAL (sCaminhoBase){

    var rdal = this;
    this.bolInit = false;

    this.LOG_ERRO = 1;
    this.LOG_WARN = 2;
    this.LOG_DEBUG = 3;

    this.caminhoBase = sCaminhoBase;
    //this.webService = "http://www.educacional.com.br/spe20/portalconnectivity/portalconnectivity.asmx";
    this.webService = "http://www.educacional.com.br/spe20/pcx/cdnt/pc";

    this.idUsuario = undefined;
    this.token = undefined;
    this.pathData = "";

    this.realizacao = undefined;
    this.idRealizada = undefined;

    this.alertDebug = 0;
    this.printTrace = 0;

    this.statusSucesso = {sucess:true};

    this.init = function (fRetorno) {
        if (rdal.bolInit) {
            fRetorno();
            return;
        }
        getSessionToken(function (token) {
            rdal.token = token;

            getUserId(function (userId) {
                rdal.idUsuario = userId;

                getDataPath(function (path) {
                    rdal.pathData = path;
                    getUserRole(function (intRole) {
                        if (intRole == 2) {
                            rdal.bolInit = true;
                            fRetorno();
                        } else {
                            throw "Não tem permissão de acesso";
                        }
                    });


                });
            });
        });
    }


    this.Online = function (fRetorno) {
        getConnStatus(function (status) {
            fRetorno(status == 'online' && $.trim(rdal.token) != '');
        });
    }

    /*
    Chamada quando fecha a avaliação
    */
    this.Close = function (idAplicacao) {
    };

    /*
    Inciar a realização
    */
    this.Realizar = function (idAplicacao, idProva, fRetorno) {
        rdal._novoDebugAlert("this.Realizar aplicacao", idAplicacao, rdal.LOG_DEBUG);
        rdal._novoDebugAlert("this.Realizar prova", idProva, rdal.LOG_DEBUG);

        rdal._loadSequenciaProva(idAplicacao, idProva, function (status) {

            if (status.sucess) {


                var url = 'uteis/visualizar.htm';

                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "text",
                    success: function (dados, status, xhttp) {
                        var retorno = $(dados);
                        //aplicar dados da avaliação
                        retorno.find('.tituloAvaliacao').attr('title', (rdal.realizacao.title ? rdal.realizacao.title : '')).html((rdal.realizacao.title ? rdal.realizacao.title : ''));
                        //retorno.find('#btnResumo').remove();
                        fRetorno(rdal.statusSucesso, retorno, rdal.realizacao.questoes);
                    },
                    error: function (err1, err2, err3) {
                        fRetorno(rdal._erroJson());
                    }
                });
            } else {
                fRetorno(status);
            }
        });

    };

    
    /*
    Tela do resumo
    */
    this.Resumo = function (idAplicacao, fRetorno) {
    }

    /*
    Visualizar
    */
    this.Visualizar = function (idAplicacao, idProva, fRetorno) {
        rdal._novoDebugAlert("this.Visualizar aplicacao", idAplicacao, rdal.LOG_DEBUG);
        rdal._novoDebugAlert("this.Visualizar prova", idProva, rdal.LOG_DEBUG);

        rdal.Realizar(idAplicacao, idProva, fRetorno);
    }

    /*
    Refazer a realização
    */
    this.Refazer = function (idAplicacao, fRetorno) {
    };

    /*
    Carregar a lista para encerrar
    */
    this.ListaEncerrar = function (fRetorno) {
    };
    /*
    Carrega a lista de agendamentos para uma prova
    */
    this.ListaAgendamentoProva = function (idProva, bolOnline, fRetorno) {
    }
    /*
    Situacao
    */
    this.Situacao = function (idAplicacao, fRetorno) {
        rdal._LoadAplicacao(idAplicacao, function (data) {
            if (data) {
                fRetorno(rdal.statusSucesso, data.config.questoes);
            } else {
                fRetorno(rdal._erroJson(2));
            }
        })
    };

    this.SituacaoProva = function (idProva, fRetorno) {
        rdal._LoadProva(idProva, function (data) {
            if (data) {
                fRetorno(rdal.statusSucesso, data.config.questoes);
            } else {
                fRetorno(rdal._erroJson(18));
            }
        })
    };


    /*
    Encerrar
    */
    this.Encerrar = function (idAplicacao, fRetorno) {
    }

    
    /*
    Sincronizar a avaliação
    */
    this.Sincronizar = function (idAplicacao, fRetorno) {
    }
    

    this.Download = function (idAplicacao, fDownload, fRetorno) {
    }

    this.DownloadProva = function (idProva, fDownload, fRetorno) {
        var url = rdal.caminhoBase + '/Aplicacao/PacoteProva/' + idProva;

        
        function _downloadProva() {

            //var dadosSend = '{ "token" : "' + rdal.token + '", "url" : "' + url + '","postData":""}';
            var dadosSend = '{ "token" : "' + rdal.token + '", "url" : "' + url + '", "postData" : ""}';
            $.ajax({
                //url: rdal.webService + "/GetEducacionalContentWithPost",
                url: rdal.webService + "/P_GetEducacionalContentWithPost",
                data: dadosSend,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                error: function (err1, err2, err3) {
                    rdal._novoDebugAlert("dados sinck ", { dados: dadosSend }, rdal.LOG_DEBUG)
                    rdal._novoDebugAlert("erro no sinck", { url: url, err1: err1, err2: err2, err3: err3 }, rdal.LOG_ERRO);
                    fRetorno(rdal._erroJson(9));
                },
                success: function (dados, status, xhttp) {
                    rdal._novoDebugAlert("DownloadProva", dados, rdal.LOG_DEBUG);
                    retorno = $.parseJSON(dados.d);

                    if (retorno.download && $.trim(retorno.download) != "") {

                        rdal._novoDebugAlert("sinck - Download = ", retorno.download, rdal.LOG_DEBUG);

                        downloadData(retorno.download,
                                function (bytes) { fDownload(bytes); },
                                function (url) {
                                    rdal._SalvarProva(idProva, retorno,
                                    function (sucess) {
                                        if (sucess) {
                                            fRetorno(rdal.statusSucesso);
                                        } else {
                                            fRetorno(rdal._erroJson(11));
                                        }
                                    })
                                },
                                function (url) { fRetorno(rdal._erroJson(10)); }
                            );

                    } else {
                        if (retorno.erro) {
                            rdal._novoDebugAlert("dados sinck ", { dados: dadosSend }, rdal.LOG_DEBUG)
                            retorno["sucess"] = false
                            fRetorno(retorno);
                            return
                        }
                        fRetorno(rdal._erroJson(10));
                    }

                }
            });

        }

        rdal.Online(function (status) {
            if (status) {
                _downloadProva();
            } else {
                fRetorno(rdal._erroJson(8));
            }
        });
    }


    /*
    Carregar a questão
    */
    this.QuestaoCarregar = function (pos, fRetorno) {

        rdal._novoDebugAlert("this.QuestaoCarregar", pos, rdal.LOG_DEBUG);
        /*var realizacao = rdal.realizacao;
        var idRealizada = rdal.idRealizada;*/

        //carregar a lista de questões
        rdal._GetQuestaoResolvida(pos, function (id, resposta) {
            rdal._novoDebugAlert("this.QuestaoCarregar", rdal.pathData + "q/" + id + ".htm", rdal.LOG_DEBUG);
            $.ajax({
                url: rdal.pathData + "q/" + id + ".htm",
                dataType: "text",
                type: "GET",
                error: function (err1, err2, err3) {
                    rdal._novoDebugAlert("Erro ao carregar questao", { id: id, path: rdal.pathData + "q/" + id + ".htm" }, rdal.LOG_ERRO);
                    rdal._novoDebugAlert("Erro ao carregar questao", { err1: err1, err2: err2, err3: err3 }, rdal.LOG_DEBUG);
                    fRetorno(rdal._erroJson());
                },
                success: function (dados, status, xhttp) {
                    //apresentar o valor da questao
                    var conteudo = $(dados);

                    /*valor questão...*/
                    //conteudo.find("span.valorQuestao > span").html(realizacao.questoes[pos].v);
                    conteudo.find("span.valorQuestao").remove();

                    conteudo.find('.btnCentral').remove();

                    //ajusta o caminho das imagens;
                    conteudo.find("img").each(function () {
                        var newPath = $(this).attr('src').replace("data\\q\\", rdal.pathData + "q\\");
                        rdal._novoDebugAlert("novoPathImg", newPath, rdal.LOG_DEBUG);
                        $(this).attr('src', newPath);
                    });


                    //desabilita todos os campos
                   /* conteudo.find("input").attr('disabled', 'disabled');
                    conteudo.find("input").attr('readonly', 'readonly');
                    conteudo.find("textarea").attr('disabled', 'disabled');*/

                    fRetorno(rdal.statusSucesso, conteudo, pos, resposta);

                    

                    //conteudo.find("ul#alternativas li").click(function () { })
                }
            });
        });

    };

    /*
    Responder questão
    */
    this.QuestaoResponder = function (resposta, questaoAtual, fRetorno) {
        return;

    };

    /*
    Limpar resposta
    */
    this.QuestaoLimpar = function (questaoAtual, fRetorno) {
        return;
    };

    /*
    Revisar depois
    */
    this.QuestaoRevisar = function (questaoAtual, fRetorno) {
        
    };

    /* metodos auxiliares */
    this._LoadAplicacao = function (idAplicacao, fRetorno) {

        dbGet("a", idAplicacao, function (data) {
            rdal._novoDebugAlert("this._LoadAplicacao", data, rdal.LOG_DEBUG);
            fRetorno(data);
        }, function (data) {
            fRetorno(false);
        });
    };
    this._LoadProva = function (idProva, fRetorno) {

        dbGet("p", idProva, function (data) {
            rdal._novoDebugAlert("this._LoadProva", data, rdal.LOG_DEBUG);
            fRetorno(data);
        }, function (data) {
            fRetorno(false);
        });
    };

    this._SalvarProva = function (idProva, dados, fRetorno) {
        rdal._novoDebugAlert("_SalvarProva", dados, rdal.LOG_DEBUG);

        dbSet("p", idProva, dados, function (data) {
            rdal._novoDebugAlert("this._LoadProva", data, rdal.LOG_DEBUG);
            fRetorno(data);
        }, function (data) {
            fRetorno(false);
        });


    };

    this._loadSequenciaProva = function (idAplicacao, idProva, fRetorno) {
        rdal.realizacao = {};
        rdal.realizacao.encerrada = false;
        rdal.realizacao.tentativa = 0;
        //carregar incialmente a prova, depois a avaliação ou qual deles tiver o id;

        if (idAplicacao != 0) {
            rdal.realizacao.idAgendamento = idAplicacao;
            rdal._LoadAplicacao(idAplicacao, function (data) {
                rdal._montarSequenciaProva(data, fRetorno);
            });
            return;
        }
        if (idProva != 0) {
            rdal.realizacao.idAgendamento = 0;
            rdal._LoadProva(idProva, function (data) {
                rdal._montarSequenciaProva(data, fRetorno);
            });
            return;
        }
        throw "Defina o id da prova ou do agendamento";
    };

    this._montarSequenciaProva = function (data, fRetorno) {
        if (data) {
            rdal.realizacao.questoes = data.config.questoes;
            rdal.realizacao.title = data.config.title;
            fRetorno(rdal.statusSucesso);
        } else {
            fRetorno(rdal._erroJson(2));
        }
        
    }
    this._GetQuestaoResolvida = function (pos, fRetorno) {

        var realizacao = rdal.realizacao;
        var idRealizada = rdal.idRealizada;

        //carregar a lista de questões
        var id = realizacao.questoes[pos].id;

        fRetorno(id, undefined);
    };

    this._alertDebug = function (msg) {
        if (this.alertDebug)
            alert(msg);
    }
    this._novoDebugAlert = function (local, obj, tipo) {
        if (rdal.alertDebug >= tipo)
            alert(local + " - " + JSON.stringify(obj));

        if (rdal.printTrace >= tipo)
            trace(local + " - " + JSON.stringify(obj));

        if(tipo == rdal.LOG_ERRO)
            log(logError, local + " - " + JSON.stringify(obj));

        if (tipo == rdal.LOG_WARN)
            log(logWarn, local + " - " + JSON.stringify(obj));
        
    }
    this._erroJson = function (id) {
        var erro = {};
        if (id == 2000) {
            erro.id = id;
        } else {
            erro.id = id + 2000;
        }
        switch (id) {
            case 1:
                erro.msg = "erro ao criar a realização.";
                break;
            case 2:
                erro.msg = "erro ao carregar o agendamento.";
                break;
            case 3:
                erro.msg = "erro ao carregar a realização.";
                break;
            case 4:
                erro.msg = "erro ao refazer a realização.";
                break;
            case 5:
                erro.msg = "erro salvar resposta.";
                break;
            case 6:
                erro.msg = "erro limpar respostas.";
                break;
            case 7:
                erro.msg = "erro ao revisar";
                break;
            case 8:
                erro.msg = "off line, não pode sincronizar";
                break;
            case 9:
                erro.msg = "não foi possivel realizar a sincronização";
                break;
            case 10:
                erro.msg = "erro no download";
                break;
            case 11:
                erro.msg = "erro na sincronização";
                break;
            case 12:
                erro.msg = "erro na sincronização da prova";
                break;
            case 13:
                erro.msg = "erro salvar prova agendada";
                break;
            case 14:
                erro.msg = "erro ao buscar agendamento";
                break;
            case 15:
                erro.msg = "erro ao carregar agendamentos da prova";
                break;
            case 16:
                erro.msg = "erro ao salvar agendamentos da prova";
                break;
            case 17:
                erro.msg = "erro geral offline";
                break;
            case 18:
                erro.msg = "erro ao carregar a prova";
                break;
            case 2000:
                erro.msg = "prova sem agendamento salvo";
                break;
            default:
                erro.msg = "erro inesperado";
        }

        var objErro = { erro: erro, sucess: false };

        rdal._novoDebugAlert("erro", objErro, rdal.LOG_ERRO);

        return objErro;
    }
    //this.init();
};
