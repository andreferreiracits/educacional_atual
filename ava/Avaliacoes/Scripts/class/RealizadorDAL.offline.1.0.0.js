function RealizadorDAL (sCaminhoBase){

    var rdal = this;

    this.LOG_ERRO = 1;
    this.LOG_WARN = 2;
    this.LOG_DEBUG = 3;

    this.caminhoBase = sCaminhoBase;
    this.webService = "http://www.educacional.com.br/spe20/portalconnectivity/portalconnectivity.asmx";

    this.idUsuario = undefined;
    this.token = undefined;
    this.pathData = "";

    this.realizacao = undefined;
    this.idRealizada = undefined;

    this.alertDebug = 0;
    this.printTrace = 0;

    this.statusSucesso = {sucess:true};
    this.isRealizador = true;

    this.init = function (fRetorno) {

        getSessionToken(function (token) {
            rdal.token = token;

            getUserId(function (userId) {
                rdal.idUsuario = userId;

                getDataPath(function (path) {
                    rdal.pathData = path;
                    getUserRole(function (intRole) {
                        rdal.isRealizador = (intRole == 1);
                        fRetorno();
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
    this.Realizar = function (idAplicacao, fRetorno) {
        rdal._novoDebugAlert("this.Realizar", idAplicacao, rdal.LOG_DEBUG);
        this._LoadRealizacao(idAplicacao, function (sucess) {


            if (sucess || rdal.realizacao != null) {

                if (rdal.realizacao.encerrada) {
                    rdal.Resumo(idAplicacao, fRetorno);
                    return
                }

                var url = 'uteis/realizar.htm';

                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "text",
                    success: function (dados, status, xhttp) {
                        var retorno = $(dados);
                        //aplicar dados da avaliação
                        retorno.find('.tituloAvaliacao').attr('title', (rdal.realizacao.title ? rdal.realizacao.title : '')).html((rdal.realizacao.title ? rdal.realizacao.title : ''));
                        retorno.find('#btnResumo').remove();

                        if (!rdal.isRealizador) {

                            retorno.find('#btnEncerrar').remove();
                            retorno.find('#btnSinc').remove();
                        }
                        fRetorno(rdal.statusSucesso, retorno, rdal.realizacao.questoes);
                    },
                    error: function (err1, err2, err3) {
                        fRetorno(rdal._erroJson());
                    }
                });
            } else {
                rdal._createRealizacao(idAplicacao, function (status) {
                    if (status.sucess) {
                        rdal.Realizar(idAplicacao, fRetorno);
                    } else {
                        fRetorno(status);
                    }
                });
            }
        });

    };

    
    /*
    Tela do resumo
    */
    this.Resumo = function (idAplicacao, fRetorno) {
        rdal._novoDebugAlert("this.Resumo", idAplicacao, rdal.LOG_DEBUG);

        var url = 'uteis/resumo.htm';

        this._LoadRealizacao(idAplicacao, function (sucess) {
            if (sucess) {

                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "text",
                    error: function (err1, err2, err3) {
                        fRetorno(rdal._erroJson());
                    },
                    success: function (dados, status, xhttp) {

                        var retorno = $(dados);

                        //apresentar dados da realização
                        retorno.find('.tableProtoloco .nomeUsuario').html(rdal.realizacao.user);
                        retorno.find('.tableProtoloco .tituloAvaliacao').html(rdal.realizacao.title);
                        retorno.find('.tableProtoloco .dataTermino').html(rdal.realizacao.dataTermino);
                        retorno.find('.tableProtoloco .horaTermino').html(rdal.realizacao.horaTermino);

                        if (rdal.realizacao.correcao)
                            retorno.find('.areaConteudoResumo .msgSemCorrecao').remove();
                        else
                            retorno.find('.areaConteudoResumo .navegaPaginacao').remove();

                        if (rdal.realizacao.tipoTentativa == 0 || rdal.realizacao.tipoTentativa == 2) {
                            retorno.find('#btnRefazer.btnRefazer').remove();
                            retorno.find('.msgRefazer1').remove();
                        }

                        if (rdal.realizacao.tipoTentativa == 0 || rdal.realizacao.tipoTentativa == 1) {
                            retorno.find('#btnAutoEstudo.btnRefazer').remove();
                            retorno.find('.msgRefazer2').remove();
                        }

                        if (rdal.realizacao.tipoTentativa == 0) {
                            retorno.find('#boxRefazer').remove();
                        }


                        fRetorno(rdal.statusSucesso, retorno, rdal.realizacao.questoes);
                    }
                });
            } else {
                fRetorno(rdal._erroJson(3));
            }
        });
    }

    /*
    Visualizar
    */
    this.Visualizar = function (idAplicacao, fRetorno) {
        rdal._novoDebugAlert("Visualizar", idAplicacao, rdal.LOG_DEBUG);
        var url = 'uteis/realizar.htm';

        this._LoadRealizacao(idAplicacao, function (sucess) {
            if (sucess) {
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "text",
                    error: function (err1, err2, err3) {
                        fRetorno(rdal._erroJson());
                    },
                    success: function (dados, status, xhttp) {

                        var retorno = $(dados);
                        
                        //aplicar dados da avaliação
                        retorno.find('.tituloAvaliacao').attr('title', rdal.realizacao.title).html(rdal.realizacao.title);
                        retorno.find('#btnEncerrar').remove();
                        retorno.find('#btnSinc').remove()

                        fRetorno(rdal.statusSucesso, retorno, rdal.realizacao.questoes);
                    }
                });
            } else {
                fRetorno(rdal._erroJson(3));
            }
        });

    }

    /*
    Refazer a realização
    */
    this.Refazer = function (idAplicacao, fRetorno) {

        this._LoadRealizacao(idAplicacao, function (sucess) {
            if (sucess) {
                rdal.realizacao.tentativa = rdal.realizacao.tentativa + 1;
                rdal.realizacao.encerrada = false;
                var dados = {};
                dados.realizacao = rdal.realizacao;
                dados.questoes = {};
                for (var i = 0; i < dados.realizacao.questoes.length; i++) {
                    var id = dados.realizacao.questoes[i].id;
                    dados.realizacao.questoes[i].rv = false;
                    dados.realizacao.questoes[i].r = false;
                    dados.realizacao.questoes[i].s = "";
                    dados.realizacao.questoes[i].e = dados.realizacao.questoes[i].e.replace("respondida", "")
                    dados.questoes["q" + id] = { resposta: "" };
                }

                rdal._SincronizarDados(idAplicacao, dados, function (sucess) {
                    if (sucess) {
                        rdal.Realizar(idAplicacao, fRetorno);
                    } else {
                        fRetorno(rdal._erroJson(11));
                    }
                });

            } else {
                fRetorno(rdal._erroJson(3));
            }
        });


    };

    /*
    Carregar a lista para encerrar
    */
    this.ListaEncerrar = function (fRetorno) {

        var url = 'uteis/encerrar.htm';

        $.ajax({
            url: url,
            type: "GET",
            dataType: "text",
            error: function (err1, err2, err3) {
                fRetorno(rdal._erroJson());
            },
            success: function (dados, status, xhttp) {
                //aplicar a lista
                fRetorno(rdal.statusSucesso, dados);
            }
        });
    };
    /*
    Carrega a lista de agendamentos para uma prova
    */
    this.ListaAgendamentoProva = function (idProva, bolOnline, fRetorno) {

        if (bolOnline) {
            rdal.Online(function (status) {
                if (!status) {
                    fRetorno(rdal._erroJson(17));
                    return;
                }
                var form = $('<form></form>');
                var prova = $('<input name="idProva" type="hidden" />')
                prova.val(idProva)
                form.append(prova);
                var url = rdal.caminhoBase + '/AplicadorOffline/ListaAplicacoesProva';
                var dadosSend = '{ "token" : "' + rdal.token + '", "url" : "' + url + '", "postData" : "' + form.serialize() + '"}';
               
                $.ajax({

                    url: rdal.webService + "/GetEducacionalContentWithPost",
                    data: dadosSend,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",

                    error: function (err1, err2, err3) {
                        rdal._novoDebugAlert("ListaAgendamentoProva", {err1:err1, err2:err2, err3:err3}, rdal.LOG_ERRO);
                        fRetorno(rdal._erroJson(15));
                    },
                    success: function (dados, status, xhttp) {
                        rdal._novoDebugAlert("ListaAgendamentoProva", dados, rdal.LOG_DEBUG);
                        dados = $.parseJSON(dados.d);
                        if (dados.length > 0) {
                            rdal._SaveProvaAgendada(idProva, dados, function (sucess) {
                                if (sucess) {
                                    fRetorno(rdal.statusSucesso, dados);
                                } else {
                                    fRetorno(rdal._erroJson(16));
                                }
                            });
                        } else {
                            fRetorno(rdal.statusSucesso, dados);
                        }
                    }
                });
            });
        } else {
            //carrega offline
            rdal._LoadListaProvaAgendada(idProva, function (data) {
                if (data) {
                    rdal._novoDebugAlert("_LoadListaProvaAgendada local", data, rdal.LOG_DEBUG);
                    fRetorno(rdal.statusSucesso, data);
                } else {
                    fRetorno(rdal.statusSucesso, []);
                }
            });
        }

    }
    /*
    Situacao
    */
    this.Situacao = function (idAplicacao, fRetorno) {
        //verifica se já tem um agendamento realizado
        this._LoadRealizacao(idAplicacao, function (sucess) {
            if (sucess) {
                fRetorno(rdal.statusSucesso, rdal.realizacao.questoes);
            } else {
                //retornar a lista do agendamento
                rdal._LoadAplicacao(idAplicacao, function (data) {
                    if (data) {
                        fRetorno(rdal.statusSucesso, data.config.questoes);
                    } else {
                        fRetorno(rdal._erroJson(2));
                    }
                })
            }
        });

    };

    this.SituacaoProva = function (idProva, fRetorno) {

        this._LoadProvaAgendada(idProva, function (data) {
            if (data) {
                var idAplicacao = data.config.idAgendamento;
                rdal.Situacao(idAplicacao, fRetorno);
            } else {
                fRetorno(rdal._erroJson(2000));
            }
        });
    };


    /*
    Encerrar
    */
    this.Encerrar = function (idAplicacao, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/Encerrar';
        this._SincronizarAplicacao(url, idAplicacao, fRetorno);
    }

    
    /*
    Sincronizar a avaliação
    */
    this.Sincronizar = function (idAplicacao, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/Sincronizar';
        this._SincronizarAplicacao(url, idAplicacao, fRetorno);
    }
    this._SincronizarAplicacao = function (url, idAplicacao, fRetorno) {
        //

        function montarFormulario() {
            var form = $('<form></form>');
            var aplica = $('<input name="idAplicacao" type="hidden" />');
            aplica.val(idAplicacao);
            var down = $('<input name="bolDown" type="hidden" value="0" />');
            var tentativa = $('<input name="intTentativa" type="hidden" />');
            if (rdal.realizacao && rdal.realizacao.tentativa)
                tentativa.val(rdal.realizacao.tentativa);
            else
                tentativa.val(0);
            form.append(down).append(aplica).append(tentativa);

            initSinck(form);
        }
        function initSinck(form) {

            rdal._LoadRealizacao(idAplicacao, function (sucess) {

                if (!sucess) {
                    rdal._createRealizacao(idAplicacao, function (status) {
                        if (status.sucess) {
                            rdal._SincronizarAplicacao(url, idAplicacao, fRetorno);
                        } else {
                            fRetorno(status);
                        }
                    });
                    return;
                }
                rdal._MontRespostaSinc(0, form, function (form1) {

                    rdal._SincronizarBaixar(url, form1, function (retorno) {

                        if (retorno.download && $.trim(retorno.download) != "") {

                            rdal._novoDebugAlert("sinck - Download", retorno.download, rdal.LOG_DEBUG);

                            downloadData(retorno.download,
                                function (bytes) { /*fDownload(bytes);*/ },
                                function (url) {
                                    sincronizar(retorno);
                                },
                                function (url) { fRetorno(rdal._erroJson(10)); }
                            );

                        } else {
                            if (retorno.erro) {
                                retorno["sucess"] = false
                                fRetorno(retorno);
                                return
                            }
                            sincronizar(retorno);
                        }
                    });
                });
            });
        }

        function sincronizar(retorno) {

            rdal._SincronizarDados(idAplicacao, retorno,
                function (sucess) {
                    if (sucess) {
                        fRetorno(rdal.statusSucesso);
                    } else {
                        fRetorno(rdal._erroJson(11));
                    }
                });
        };

        rdal.Online(function (status) {
            if (status) {
                montarFormulario();
            } else {
                fRetorno(rdal._erroJson(8));
            }
        });
    }

    this.Download = function (idAplicacao, fDownload, fRetorno) {
        var url = rdal.caminhoBase + '/AplicadorOffline/Sincronizar';
        
        function montarFormulario() {

             var form = $('<form></form>');
            var aplica = $('<input name="idAplicacao" type="hidden" />');
            aplica.val(idAplicacao);
            var down = $('<input name="bolDown" type="hidden" />')
            down.val(1);
            var tentativa = $('<input name="intTentativa" type="hidden" />');
            if (rdal.realizacao && rdal.realizacao.tentativa)
                tentativa.val(rdal.realizacao.tentativa);
            else
                tentativa.val(0);

            form.append(down).append(aplica).append(tentativa);

            initSinck(form);
        }

        function initSinck(form) {

            rdal._LoadRealizacao(idAplicacao, function (sucess) {

                rdal._MontRespostaSinc(0, form, function (form1) {

                    rdal._SincronizarBaixar(url, form1, function (retorno) {
                        
                        if (retorno.download && $.trim(retorno.download) != "") {

                            rdal._novoDebugAlert("sinck - Download = ", retorno.download, rdal.LOG_DEBUG);

                            downloadData(retorno.download,
                                function (bytes) { fDownload(bytes); },
                                function (url) { rdal._SincronizarDados(idAplicacao,retorno,
                                    function(sucess){
                                        if(sucess){
                                            fRetorno(rdal.statusSucesso);
                                        }else{
                                            fRetorno(rdal._erroJson(11));
                                        }
                                    })
                                },
                                function (url) { fRetorno(rdal._erroJson(10)); }
                            );

                        } else {
                            if (retorno.erro) {
                                retorno["sucess"] = false
                                fRetorno(retorno);
                                return
                            }
                            fRetorno(rdal._erroJson(10));
                        }
                    });
                });
            });
        }

        rdal.Online(function (status) {
            if (status) {
                montarFormulario();
            } else {
                fRetorno(rdal._erroJson(8));
            }
        });

    }


    this._MontRespostaSinc = function (count, form, fEnd) {
        if (!rdal.realizacao || !rdal.realizacao.questoes || rdal.realizacao.questoes.length <= 0) {
            fEnd(form);
            return;
        }
        rdal._novoDebugAlert("_MontRespostaSinc", { count: count, total: rdal.realizacao.questoes.length }, rdal.LOG_DEBUG);
        if (count < rdal.realizacao.questoes.length) {

            rdal._GetQuestaoResolvida(count, function (id, objResposta) {
                var pos = rdal.realizacao.questoes[count].i;
                var rv = rdal.realizacao.questoes[count].rv;
                var id = rdal.realizacao.questoes[count].id;
                if (objResposta) {
                    var questaoJson = {
                        resposta: objResposta.resposta,
                        pos: pos,
                        revisar: rv,
                        data: objResposta.data,
                        hora: objResposta.hora,
                        id: id
                    };
                    var questao = $('<input type="hidden" name="resposta" value=""/>');
                    questao.val(JSON.stringify(questaoJson));
                    rdal._novoDebugAlert("_MontRespostaSinc questao",questaoJson,rdal.LOG_DEBUG);
                    form.append(questao);
                } else {
                    rdal._novoDebugAlert("_MontRespostaSinc questao não encontrou objeto resposta", id, rdal.LOG_WARN);
                }
                rdal._MontRespostaSinc(count + 1, form, fEnd);
            });
        } else {
            fEnd(form);
        }
    };

    this._SincronizarBaixar = function (url, form, fRetorno) {
        var dadosSend = '{ "token" : "' + rdal.token + '", "url" : "' + url + '", "postData" : "' + form.serialize() + '"}';
       

        $.ajax({

            url: rdal.webService + "/GetEducacionalContentWithPost",
            data: dadosSend,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            error: function (err1, err2, err3) {
                rdal._novoDebugAlert("erro no sinck", { url: url, err1: err1, err2: err2, err3: err3 }, rdal.LOG_ERRO);
                fRetorno(rdal._erroJson(9));
            },
            success: function (dados, status, xhttp) {
                rdal._novoDebugAlert("_SincronizarBaixar", dados, rdal.LOG_DEBUG);
                dados = $.parseJSON(dados.d);
                fRetorno(dados);
            }
        });


    };

    this._SincronizarDados = function (idAplicacao, dados, fRetorno) {
        rdal._novoDebugAlert("_SincronizarDados", dados, rdal.LOG_DEBUG);
        rdal.realizacao = dados.realizacao;

        rdal._SaveRealizacao(idAplicacao, function (sucess) {
            if (sucess) {
                SincQuestoes(0)
            } else {
                fRetorno(false);
            }
        });

        function SincQuestoes(count) {
            rdal._novoDebugAlert("SincQuestoes = ", { count: count, total: rdal.realizacao.questoes.length }, rdal.LOG_DEBUG);

            if (count < rdal.realizacao.questoes.length) {
                var id = rdal.realizacao.questoes[count].id;
                var objResposta = dados.questoes['q' + id];
                rdal._novoDebugAlert('q' + id, objResposta, rdal.LOG_DEBUG);

                rdal._SalvarQuestaoResolvida(id, objResposta, function (sucess) {
                    if (sucess) {

                    } else {
                        rdal._novoDebugAlert("erro ao salvar a resposta", {}, rdal.LOG_WARN);
                        //fRetorno(false);
                    }
                    SincQuestoes(count + 1)
                });
            } else {
                fRetorno(true);
            }
        }

    };
    /*
    Carregar a questão
    */
    this.QuestaoCarregar = function (pos, fRetorno) {
        var realizacao = rdal.realizacao;
        var idRealizada = rdal.idRealizada;

        //carregar a lista de questões
        rdal._GetQuestaoResolvida(pos, function (id, resposta) {
            $.ajax({
                url: rdal.pathData + "q/" + id + ".htm",
                dataType: "text",
                type: "GET",
                error: function (err1, err2, err3) {
                    rdal._novoDebugAlert("Erro ao carregar questao", id, rdal.LOG_ERRO);
                    fRetorno(rdal._erroJson());
                },
                success: function (dados, status, xhttp) {
                    //apresentar o valor da questao
                    var conteudo = $(dados);

                    /*valor questão...*/
                    //conteudo.find("span.valorQuestao > span").html(realizacao.questoes[pos].v);
                    conteudo.find("span.valorQuestao").remove();

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

                    if (realizacao.encerrada)
                        conteudo.find('.btnCentral').html('').hide();

                    //ajusta o caminho das imagens;
                    conteudo.find("img").each(function () {
                        var newPath = $(this).attr('src').replace("data\\q\\", rdal.pathData + "q\\");
                        rdal._novoDebugAlert("novoPathImg", newPath, rdal.LOG_DEBUG);
                        $(this).attr('src', newPath);
                    });

                    fRetorno(rdal.statusSucesso, conteudo, pos, resposta);
                }
            });
        });

    };

    /*
    Responder questão
    */
    this.QuestaoResponder = function (resposta, questaoAtual, fRetorno) {
        rdal._GetQuestaoResolvida(questaoAtual, function (id, objResposta) {

            if (!objResposta) {
                objResposta = {};
            }
            objResposta.resposta = resposta;

            var idAplicacao = rdal.realizacao.idAgendamento;

            rdal.realizacao.questoes[questaoAtual].c = "não respondeu";
            rdal.realizacao.questoes[questaoAtual].r = true;
            rdal.realizacao.questoes[questaoAtual].s = rdal.realizacao.questoes[questaoAtual].s.replace("listaQuestoesCorreta", "");
            rdal.realizacao.questoes[questaoAtual].s = rdal.realizacao.questoes[questaoAtual].s.replace("listaQuestoesIncorreta", "");
            if(rdal.realizacao.questoes[questaoAtual].rv)
                rdal.realizacao.questoes[questaoAtual].e = "Revisão"
            else
                rdal.realizacao.questoes[questaoAtual].e = "Respondida"


            objResposta.correcao = undefined;

            var questao = rdal.realizacao.questoes[questaoAtual];


            rdal._SaveRealizacao(idAplicacao, function (sucess) {
                if (sucess) {
                    objResposta = rdal._UpdateDate(objResposta);
                    rdal._SalvarQuestaoResolvida(id, objResposta, function (sucess) {
                        if (sucess) {
                            fRetorno(rdal.statusSucesso, questao, questaoAtual, objResposta);
                        } else {
                            fRetorno(rdal._erroJson(5));
                        }
                    });
                } else {
                    fRetorno(rdal._erroJson(1));
                }
            });

        });

    };

    /*
    Limpar resposta
    */
    this.QuestaoLimpar = function (questaoAtual, fRetorno) {
        rdal._GetQuestaoResolvida(questaoAtual, function (id, objResposta) {

            if (!objResposta) {
                objResposta = {};
            }
            objResposta.resposta = "";
            objResposta.correcao = undefined;

            var idAplicacao = rdal.realizacao.idAgendamento;

            rdal.realizacao.questoes[questaoAtual].r = false;
            rdal.realizacao.questoes[questaoAtual].c = "não respondeu";
            rdal.realizacao.questoes[questaoAtual].s = rdal.realizacao.questoes[questaoAtual].s.replace("listaQuestoesCorreta", "");
            rdal.realizacao.questoes[questaoAtual].s = rdal.realizacao.questoes[questaoAtual].s.replace("listaQuestoesIncorreta", "");
            if (rdal.realizacao.questoes[questaoAtual].rv)
                rdal.realizacao.questoes[questaoAtual].e = "Revisão"
            else
                rdal.realizacao.questoes[questaoAtual].e = "Não Respondida"

            var questao = rdal.realizacao.questoes[questaoAtual];

            rdal._SaveRealizacao(idAplicacao, function (sucess) {
                if (sucess) {
                    objResposta = rdal._UpdateDate(objResposta);
                    rdal._SalvarQuestaoResolvida(id, objResposta, function (sucess) {
                        if (sucess) {
                            fRetorno(rdal.statusSucesso, questao, questaoAtual, objResposta);
                        } else {
                            fRetorno(rdal._erroJson(6));
                        }
                    });
                } else {
                    fRetorno(rdal._erroJson(1));
                }
            });

            
        });
    };

    /*
    Revisar depois
    */
    this.QuestaoRevisar = function (questaoAtual, fRetorno) {
        rdal._GetQuestaoResolvida(questaoAtual, function (id, objResposta) {

            if (!objResposta) {
                objResposta = {};
            }
            var idAplicacao = rdal.realizacao.idAgendamento;
            objResposta.correcao = undefined;


            if (rdal.realizacao.questoes[questaoAtual].r) {
                rdal.realizacao.questoes[questaoAtual].e = "Respondida";
            } else {
                rdal.realizacao.questoes[questaoAtual].e = "Não Respondida";
            }
            rdal.realizacao.questoes[questaoAtual].c = "não respondeu";
            rdal.realizacao.questoes[questaoAtual].rv = !rdal.realizacao.questoes[questaoAtual].rv;
            if (rdal.realizacao.questoes[questaoAtual].rv) {
                rdal.realizacao.questoes[questaoAtual].s = "listaQuestoesEmRevisao";
                rdal.realizacao.questoes[questaoAtual].e = "Revisão"
            } else {
                rdal.realizacao.questoes[questaoAtual].s = "";
            }



            var questao = rdal.realizacao.questoes[questaoAtual];
            rdal._SaveRealizacao(idAplicacao, function (sucess) {
                if (sucess) {
                    objResposta = rdal._UpdateDate(objResposta);
                    rdal._SalvarQuestaoResolvida(id, objResposta, function (sucess) {
                        if (sucess) {
                            fRetorno(rdal.statusSucesso, questao, questaoAtual, objResposta);
                        } else {
                            fRetorno(rdal._erroJson(7));
                        }
                    });
                } else {
                    fRetorno(rdal._erroJson(1));
                }
            });


        });
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

    this._LoadProvaAgendada = function (idProva, fRetorno) {
        this._LoadListaProvaAgendada(idProva, function (retorno) {
            if (retorno) {
                for (var i = 0; i < retorno.length; i++) {
                    if (retorno[i].valida) {
                        fRetorno(retorno[i]);
                        return;
                    }
                }
                fRetorno(retorno[0]);
                return;
            }
            fRetorno(undefined);

        });
    };

    this._SaveProvaAgendada = function (idProva, objConfig, fRetorno) {

        //dbSet("pa", rdal.idUsuario, idProva, objConfig, function (data) { fRetorno(true); }, function (data) { fRetorno(false); });
        dbSetList("pa", rdal.idUsuario, idProva, objConfig, function (data) {
            fRetorno(true);
        }, function (data) {
            rdal._novoDebugAlert("_SaveProvaAgendada erro", data, rdal.LOG_ERRO);
            fRetorno(false);
        });
    };

    this._LoadListaProvaAgendada = function (idProva, fRetorno) {

        dbGetList("pa", rdal.idUsuario, idProva, function (data) {
            rdal._novoDebugAlert("LoadListaProvaAgendada", data, rdal.LOG_DEBUG);
            fRetorno(data.config);
        }, function (data) {
            rdal._novoDebugAlert("LoadListaProvaAgendada - erro", data, rdal.LOG_WARN);
            fRetorno(undefined);    
        });
    };



    this._LoadRealizacao = function (idAplicacao, fRetorno) {
        
        dbGet("r", rdal.idUsuario, idAplicacao, function (data) {
            rdal._novoDebugAlert("LoadRealizacao", data, rdal.LOG_DEBUG);
            rdal.realizacao  = data.situacao;
            rdal.idRealizada = data.idRealizada;
            fRetorno(true);

        }, function (data) {
            rdal._novoDebugAlert("LoadRealizacao erro = ", data, rdal.LOG_ERRO);
            rdal.realizacao = undefined;
            rdal.idRealizada = undefined;
            fRetorno(false);
        });
    };


    this._SaveRealizacao = function (idAplicacao, fRetorno) {
        rdal._novoDebugAlert("_SaveRealizacao - " + rdal.idUsuario + "," + idAplicacao, rdal.realizacao, rdal.LOG_DEBUG);
        dbSet("r", rdal.idUsuario, idAplicacao, rdal.realizacao,
            function (data) {
                rdal.idRealizada = data.idRealizada;
                fRetorno(true);
            }, function (data) {
                rdal._novoDebugAlert("_SaveRealizacao", data, rdal.LOG_ERRO);
                fRetorno(false);
            }
        );
    };

    this._createRealizacao = function (idAplicacao, fRetorno) {
        rdal.realizacao = {};
        rdal.realizacao.encerrada = false;
        rdal.realizacao.tentativa = 0;
        //carregar de um agendamento precadastrado
        rdal._LoadAplicacao(idAplicacao, function (data) {
            if (data) {

                rdal.realizacao.questoes = data.config.questoes;
                rdal.realizacao.title = data.config.title;
                rdal.realizacao.idAgendamento = idAplicacao;
                rdal._SaveRealizacao(idAplicacao, function (sucess) {
                    if (sucess) {
                        //rdal.Realizar(idAplicacao, fRetorno);
                        fRetorno(rdal.statusSucesso);
                    } else {
                        fRetorno(rdal._erroJson(1));
                    }
                });
            } else {
                fRetorno(rdal._erroJson(2));
            }
        });
    };

    this._GetQuestaoResolvida = function (pos, fRetorno) {

        var realizacao = rdal.realizacao;
        var idRealizada = rdal.idRealizada;

        //carregar a lista de questões
        var id = realizacao.questoes[pos].id;

        dbGet("qr", id, idRealizada, function (data) {
            fRetorno(id, data.situacao);
        }, function () {
            fRetorno(id, undefined);
        });
    };

    this._UpdateDate = function (objResposta) {
        try {
            var date = new Date();
            objResposta.data = $.datepicker.formatDate('dd/mm/yy', date);
            objResposta.hora = rdal._formatHora(date);
        } catch (e) { }

        return objResposta;
    }
    this._SalvarQuestaoResolvida = function (id, objResposta, fRetorno) {

        dbSet("qr", id, rdal.idRealizada, objResposta, function (data) {
            fRetorno(true);
        }, function (data) {
            rdal._SaveRealizacao("_SalvarQuestaoResolvida", data, rdal.LOG_ERRO);
            fRetorno(false);
        });
    };

    this._formatHora = function (date) {
        return (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
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
