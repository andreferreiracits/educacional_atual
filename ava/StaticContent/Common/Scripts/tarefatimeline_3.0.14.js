
var idPublicacao = 0;
var idRecurso = 0;
var idPublicacao = 0;
var idAvaliacao = 0;
var intValorRecurso = 0;
var ID_FERRAMENTA_TIPO_TAREFA = 17;

var dadosTarefa = {
    recurso : {
        idPublicacao : 0,
        idAvaliacao : 0,
        idRecurso : 0,
        nome : "",
        descricao: "",
        pOrdem : 0,
        sOrdem : 0,
        intValor : 0
    },
    midia : {
        idMidia : "",
        strLinkVideo: "",
        idTipoMidia : 0
    },
    links : [],
    tags : [],
    titulo : "",
    descricao : "",
    complemento : "",
    intNota : 0,
    idGrupo : 0,
    solicitarEntrega: 0,
    privadoCompartilhado : 2,
    turmasGrupos : [],
    alunos : [],
    dataInicial : "",
    dataFinal : "",
    horaInicio : "",
    horaFim : "",
    idUsuario : 0,
    material : {
        idFerramentaTipo: 0,
        idFerramenta: 0,
        arquivos: []
    }
};

function validaDataAgendamento(a, o, e, i) {

    console.log("dtmAtualServidor == " + $("#dtmAtualServidor").val().split(" "));
    var t = "ok";
    if ("" == a) $("#dataInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == o) $("#dataFim").addClass("ava_field_alert"), t = "erro";
    else if ("" == e) $("#horaInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == i) $("#horaFim").addClass("ava_field_alert"), t = "erro";
    else {
        var r = a.split("/"),
            n = r[2] + r[1] + r[0],
            s = o.split("/"),
            l = s[2] + s[1] + s[0],
            e = e.split(":"),
            c = e[0] + e[1],
            i = i.split(":"),
            d = i[0] + i[1],
            u = $("#dtmAtualServidor").val().split(" "),// validaDataAgendamento
            p = u[0].split("/"),
            m = u[1].split(":"),
            v = p[2] + p[1] + p[0],
            f = m[0] + m[1];
        
        // n > l ? t = "Data inicial tem que ser menor que Data final." : n == v ? (f >= c && (t = "Hora inicial tem que ser maior que a hora atual."),
        // n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final.")) : v > n ? t = "Data inicial tem que ser maior que a Data atual." : n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final.")
        var new_dataInicial = new Date(parseInt(r[2]),parseInt(r[1])-1, parseInt(r[0]), parseInt(e[0]), parseInt(e[1]), 0);
        var new_dataFinal = new Date(parseInt(s[2]),parseInt(s[1])-1, parseInt(s[0]), parseInt(i[0]), parseInt(i[1]), 0);
        var new_datahoraServidor = new Date(parseInt(p[2]),parseInt(p[1])-1, parseInt(p[0]), parseInt(m[0]), parseInt(m[1]), 0);

        var new_dataatual = new Date();
        // dataInicio > dataFim 
        // ? t = "Data inicial tem que ser menor que Data final." 
        // : dataInicio == dataAtual  
        // ? (  (horaServidor)>= horaInicio && (t = "Hora inicial tem que ser maior que a hora atual."), 
        // dataInicio == dataFim && horaInicio > horaFinal && (t = "Hora inicial tem que ser menor que Hora final."))
        // : dataAtual  > dataInicio ? t = "Data inicial tem que ser maior que a Data atual." 
        // : dataInicio == dataFim && horaInicio >= horaFinal && (t = "Hora inicial tem que ser menor que Hora final.")
        if (new_dataInicial.getTime() > new_dataFinal.getTime()) {
            t = "Data inicial tem que ser menor que Data final.";
        }
        else if(new_dataInicial.getTime() < new_dataatual.getTime()){
            t = "Data/Hora inicial tem que ser maior que a data/hora atual.";
        }
    }
    return t
}

function getDataHoraCorrente(){
        var data = new Date();
        var dia = data.getDate();
        var mes     = data.getMonth();
        var ano4    = data.getFullYear(); 
        var hora    = data.getHours();
        var min     = data.getMinutes();
        var str_data = dia + '/' + (mes+1) + '/' + ano4 + ' ' + hora + ':' + min;
        console.log(str_data);
        
        return str_data;
}

function validaDataAgendamentoOld(a, o, e, i) {
    console.log("dtmAtualServidor == " + $("#dtmAtualServidor").val().split(" "));
    var t = "ok";
    if ("" == a) $("#dataInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == o) $("#dataFim").addClass("ava_field_alert"), t = "erro";
    else if ("" == e) $("#horaInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == i) $("#horaFim").addClass("ava_field_alert"), t = "erro";
    else {
        var r = a.split("/"),
            n = r[2] + r[1] + r[0],
            s = o.split("/"),
            l = s[2] + s[1] + s[0],
            e = e.split(":"),
            c = e[0] + e[1],
            i = i.split("/"),
            d = i[0] + i[1],
            u = $("#dtmAtualServidor").val().split(" "),
            p = u[0].split("/"),
            m = u[1].split(":"),
            v = p[2] + p[1] + p[0],
            f = m[0] + m[1];
        console.log("dataInicio = " + n);
        console.log("dataFim = " + l);
        console.log("horaServidor = " + f);
        console.log("horaInicio = " + c);
        console.log("v = " + v);

        if(n > l ){
            t = "Data inicial tem que ser menor que Data final.";
        }else if(n == v){
            if ( f >= c ){
                t = "Hora inicial tem que ser maior que a hora atual."
            }else if(n == l && c >= d){
                t = "Hora inicial tem que ser menor que Hora final."
            }

        }
        n > l ? t = "Data inicial tem que ser menor que Data final." : 
        
        n == v ? (f >= c && (t = "Hora inicial tem que ser maior que a hora atual."),
            n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final."))
            
            : v > n ? t = "Data inicial tem que ser maior que a Data atual." : n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final.")
    }
    return t
}

function FazAgendar_OLD() {
    console.log("entrou no FazAgendar()  tarefatimeline.js ****** ");

    ShowBtnAgendar(false);
    var dataInicio = $("#dataInicio").val(),
        dataFim = $("#dataFim").val(),
        horaInicio = $("#horaInicio").val(),
        horaFim = $("#horaFim").val();

    var t = horaInicio.split(":");

    var tt = parseInt(t[1]); 

    horaInicio = t[0] + ":" + ( tt + 1 );

    var retorno = validaDataAgendamento(dataInicio, dataFim, horaInicio, horaFim);
    if (retorno == "ok") {

        var strTitulo = $("#strTituloTarefa").val(), strDescricao = $("#txtDescricaoTarefa").val();

        if ("" == strTitulo || "T&iacute;tulo da Tarefa" == strTitulo) {
            if ($("#strTituloTarefa").addClass("ava_field_alert"), $("#frmMensagemRapida").length) try {
                $("html, body").animate({
                    scrollTop: $("#frmMensagemRapida").offset().top - 60
                }, 1e3)
            } catch (e) {
                console.log("Erro ao mover")
            }
            ShowBtnAgendar(true);
            return !1
        }
        var i = 0;

        if ($("#valeNota").attr("checked") && (i = $("#intValorTarefa").val(), "" == i || "Valor" == i)) {
            try {
                $("html, body").animate({
                    scrollTop: $("#intValorTarefa").offset().top
                }, 1e3)
            } catch (e) {
                console.log("Erro ao mover")
            }
            ShowBtnAgendar(true);
            return $("#intValorTarefa").addClass("ava_field_alert"), !1
        }
        var idCaminho = $("#idCaminho").val();

        "" != idCaminho && void 0 != idCaminho || (idCaminho = 0);

        var r = 2;
        $("input:radio[name=rTipo]").each(function () {
            $(this).is(":checked") && (r = parseInt($(this).val()))
        });

        var n = new Array,
            s = arrayArquivosUpload;
        if (void 0 == s || "" == s || null == s) {
            s = "";
            var l = null
        } else {
            for (var c = 0; c < s.arrayArquivo.length; c++) n.push(s.arrayArquivo[c].id);
            var l = {
                idFerramentaTipo: s.idFerramentaTipo,
                idFerramenta: s.idFerramenta,
                arquivos: n
            }
        }

        var larquivos = pegarDadosArquivos(s.arrayArquivo);


        SalvarCaminhoCriarTarefa({
            idCaminho : $("#idCaminho").val() == "" ? 0 : $("#idCaminho").val(),
            idEtapa : $("#idEtapa").val() == "" ? 0 : $("#idEtapa").val(),
            strTarefa : $("#strTituloTarefa").val(),
            strDescricao : $("#txtDescricaoTarefa").val(),
            intNota : c
        }, function(data){   
            var idGrupo = $("#idGrupo").val(); 
            SalvarCaminhoTurma(data.idCaminho, strTitulo, strDescricao, data.idUsuario, dataInicio, dataFim, horaInicio, horaFim, idGrupo, larquivos);
            
            ShowToast({
                type: "success", 
                title : "Seus alunos j&aacute; podem visualizar esta tarefa.", 
                desc : "Tarefa publicada com sucesso na(s) turma(s)!", 
                callback: function(){
                    carregaTimeLineGrupo(0);
                    $('.actions[pos=1]').click();
                    $.ajax({
                        url: "/AVA/Barras/Home/ListaAtividadesGrupo",
                        data: {
                            strLinkGrupo: idUsuarioPublico
                        },
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (a) {
        
                        },
                        error: function () {
                            $("#lista_agendamento").html("erro ao listar atividades do professor.")
                        }
                    });
                    ShowBtnAgendar(true);
                }
            });

        });

        /*
        //OLD
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminho/",
            data: {
                idRota: idCaminho,
                idUsuario: 0,
                strTitulo: strTitulo,
                strDescricao: strDescricao,
                intStatus: r,
                strTags: "",
                intTipo: 2,
                json: JSON.stringify(l),
                userturma: 0
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (a) {
                
                if (a != 0) {
                    idCaminho = a;
                }

                var o = $("#idEtapa").val();
                "" != o && void 0 != o || (o = 0);
                var e = !1;
                $("#entrega_tarefa").attr("checked") && (e = !0),
                $.ajax({
                    url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                    data: {
                        idCaminho: idCaminho,
                        idEtapa: o,
                        intValor: i,
                        solicitaEntrega: e
                    },
                    type: "POST",
                    success: function (etapa) {
                        var idEtapa = etapa;
                        $.ajax({
                            url: "/AVA/Caminhos/Home/ConcluirAgendamentoRapidoTurma",
                            data: {
                                idCaminho: idCaminho,
                                dataInicio: dataInicio,
                                horaInicio: horaInicio,
                                dataFim: dataFim,
                                horaFim: horaFim,
                                bolTarefaGrupo: !0
                            },
                            type: "POST",
                            success: function (a) {
                                var idGrupo = $("#idGrupo").val();
                                concluirAgendamentoTarefa(dataInicio, dataFim, horaInicio, horaFim,idCaminho, strDescricao, strTitulo, idGrupo, idEtapa, larquivos);
                            },
                            error: function (a) {
                                0 != a.status && console.debug("erro ao salvar tarefa r&aacute;pida!")
                            }
                        });
                    },
                    error: function (a) {
                        0 != a.status && console.debug("erro ao salvar tarefa r&aacute;pida!")
                    };
                });
            },
            error: function (a) {
                0 != a.status && console.debug("erro ao salvar caminho r&aacute;pido!")
            }
        });
        */

    } else {
        ShowBtnAgendar(true);
        if (retorno == "erro") {
            return false
        } else {
            alert(retorno)
        }
    }
}

function FazAgendar(){
    ShowBtnAgendar(false);
    SalvarCaminhoCriarTarefaGlobal();
}

function ShowToast(params) {

    var time = 9000;
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "900",
        "hideDuration": ""+time,
        "timeOut": ""+time,
        "extendedTimeOut": ""+time,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    if (params.callback) {
        toastr.options.onHidden = params.callback;
        toastr.options.onclick = params.callback;
    }

    Command: toastr[params.type](params.title, params.desc);
}

function ShowBtnAgendar(show) {
    if (show) {
        $("#agendar").show()
        $("#btn-agendando").hide();
    }
    else{
        $("#agendar").hide()
        $("#btn-agendando").show();
    }
}

function SalvarCaminhoTurma(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, idGrupo, larquivos) {
    
    var idCaminhoTurma = idCaminho;
    var idEtapaTurma = 0;

    var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;
    var solicitacaoArquivo = false;

    var intNota = 0;
    if ($("#valeNota").hasClass("ativo"))
        intNota = $("#intValorTarefa").val().replace(".", ",");

    if (($("#idEtapa").val() != "" || $("#idEtapa").val() != "0")) {
        idEtapaTurma = $("#idEtapa").val();
    }
    
    if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
        solicitacaoArquivo = true;
    }

    var i = $("#intValorTarefa").val();
    
    $.ajax({
        url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
        async: false,
        data: {
            idCaminho: idCaminhoTurma,
            idEtapa: idEtapaTurma,
            intValor: intNota,
            solicitaEntrega: solicitacaoArquivo
        },
        type: "POST",
        success: function (idEtapaTurma) {
            console.log("Entrou no inserir arquivo na turma");
            if (typeof disciplinaSelecionada === 'undefined') {
                disciplinaSelecionada = 0;
            }
            var idEtapaTurma = idEtapaTurma;

            if (idRecurso > 0) {
                inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, idRecurso, idPublicacao, $("#idAvaliacao").val(), strTitulo, strDescricao, intValorRecurso);
            }

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
                async: false,
                data: {
                    idRotaAgendamento: 0,
                    idCaminho: idCaminhoTurma,
                    idGrupo: idGrupo,
                    dataInicio: dataInicio,
                    horaInicio: horaInicio,
                    dataFim: dataFim,
                    horaFim: horaFim,
                    strComplemento: strComplemento ,
                    strTitulo: strTitulo,
                    strDescricao: strDescricao,
                    idMateria: disciplinaSelecionada
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (response) {
                    var retorno = response.split("|");
                    
                    var arquivos = larquivos;
                    $.ajax({

                        type: "POST",
                        url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
                        async: false,
                        data: {
                            strUsuarios: retorno[1],
                            idGrupo: idGrupo,
                            idFerramentaTipo: ID_FERRAMENTA_TIPO_TAREFA,
                            idFerramenta: retorno[0],
                            idEtapa: idEtapaTurma,
                            strMensagem: strComplemento,
                            idMateria: disciplinaSelecionada, 
                            arquivos: JSON.stringify(arquivos),
                            idRota: idCaminhoTurma
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function () {
                            disciplinaSelecionada = 0;
                            $('#idMateria button.btnDisciplina_turmas').html("Selecione a disciplina");
                            $('#idMateria button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');

                            $("#strTituloTarefa").val("");
                            $("#txtDescricaoTarefa").val("");

                            $("#idCaminho").val("0");
                            $("#idEtapa").val("0");

                            EscondeOsObjects();
                            $("#loader").hide();
                            zeraValoresRecurso();
                        },
                        error: function (a) {
                            0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
                            ShowBtnAgendar(true);
                        }
                    });

                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao inserir agendamento!")
                    ShowBtnAgendar(true);
                }
            })

        },
        error: function (n) {
            if (n.status != 0) {
                console.debug("erro ao salvar tarefa rápida!")
            }
            ShowBtnAgendar(true);
        }
    });
}

function SalvarCaminhoCriarTarefa(params, funcReturn){
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminhoCriarTarefa/",
        data: {
            idCaminho: params.idCaminho,
            idEtapa: params.idEtapa,
            strTarefa: params.strTarefa,
            strDescricao: params.strDescricao,
            intNota: params.intNota
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $("#idEtapa").val(data.idEtapa);
            $("#idCaminho").val(data.idCaminho);
            funcReturn(data);
        },
        error: function (i) {
            if (i.status != 0) {
                console.debug("erro ao salvar caminho rápido!")
            }
            funcReturn(i);
        }
    });
}

function inserirRecursoRapidoTurma(idCaminho, idEtapa, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValor) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
        async: false,
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            idRecurso: idRecurso,
            idPublicacao: idPublicacao,
            idAvaliacao: idAvaliacao,
            strTitulo: strTitulo,
            strDescricao: strDescricao,
            intValor: intValor
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (o) {
            var p = o.split("_");
            var n = p[0];
        },
        error: function (n) {
            if (n.status != 0) {
                console.debug("erro ao salvar recurso")
            }
        }
    });
}

function zeraValoresRecurso() {
    idRecurso = 0;
    idPublicacao = 0;
    idAvaliacao = 0;
}

function pegarDadosArquivos(arrayArquivosUpload){
    var f = arrayArquivosUpload;
    if (f == undefined || f == "" || f == null) {
        f = "";
        var k = null
    }
    var temp = [];
    
        for (var i = 0; i < f.length; i++ ){
            var objeto = {
                "idArquivo": f[i].id,
                "strArquivo": f[i].strArquivo,
                "nome": f[i].strNome,
                "descricao":f[i].strDescricao,
                "diretorio": f[i].strDiretorio,
                "extensao": f[i].strExtensao
            }
            temp.push(objeto);
        }        
    
    
    return temp;
}

function validaAgendamento(a, o, e, i) {
    console.log("validaAgendamento tarefatimeline.js");
    var t = "ok";
    if ("" == a) $("#dataInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == o) $("#dataFim").addClass("ava_field_alert"), t = "erro";
    else if ("" == e) $("#horaInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == i) $("#horaFim").addClass("ava_field_alert"), t = "erro";
    else {
        var r = a.split("/"),
            n = r[2] + r[1] + r[0],
            s = o.split("/"),
            l = s[2] + s[1] + s[0],
            e = e.split(":"),
            c = e[0] + e[1],
            i = i.split("/"),
            d = i[0] + i[1],
            u = $("#dtmAtualServidor").val().split(" "),
            p = u[0].split("/"),
            m = u[1].split(":"),
            v = p[2] + p[1] + p[0],
            f = m[0] + m[1];
        n > l ? t = "Data inicial tem que ser menor que Data final." : n == v ? (f >= c && (t = "Hora inicial tem que ser maior que a hora atual."), n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final.")) : v > n ? t = "Data inicial tem que ser maior que a Data atual." : n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final.")
    }
    return t
}

function concluirAgendamentoTarefa(dataInicio, dataFim, horaInicio, horaFim,
    idCaminho, txtDisponivel, txtTitulo, idGrupo, idEtapa, lArquivos) {
    console.log("entrou no concluirAgendamentoTarefaRapidaMural tarefatimeline.js ");
    //:::

    // var t = horaInicio.split(":");

    // var tt = parseInt(t[1]); 

    // horaInicio = t[0] + ":" + ( tt + 1 );


    var mensagem = txtTitulo + ". " + "Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;
    console.log("disciplinaSelecionada " + disciplinaSelecionada);
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
        data: {
            idRotaAgendamento: 0,
            idCaminho: idCaminho,
            idGrupo: idGrupo,
            dataInicio: dataInicio,
            horaInicio: horaInicio,
            dataFim: dataFim,
            horaFim: horaFim,
            strComplemento: mensagem,
            strTitulo: txtTitulo,
            strDescricao: txtDisponivel,
            idMateria: disciplinaSelecionada
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (a) {
            //disciplinaSelecionada=0;
            var o = a.split("|");
            console.log("======** o[1] " + o[1]);
            console.log("====== o[0] " + o[0]);
            salvarMensagemRapida(o[1], idGrupo, 17, o[0], idEtapa, mensagem,idCaminho,lArquivos);

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "900",
                "hideDuration": "1000",
                "timeOut": "9000",
                "extendedTimeOut": "9000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            Command: toastr["success"]("Seus alunos j&aacute; podem visualizar esta tarefa.", "Tarefa publicada com sucesso!")

            $('.actions[pos=1]').click();
            //:::
            $.ajax({
                url: "/AVA/Barras/Home/ListaAtividadesGrupo",
                data: {
                    strLinkGrupo: idUsuarioPublico
                },
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (a) {

                },
                error: function () {
                    $("#lista_agendamento").html("erro ao listar atividades do professor.")
                }
            })
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao inserir agendamento!")
        }
    });
}

function concluirAgendamentoTarefaRapidaMural() {
    console.log(" entrou no concluirAgendamentoTarefaRapidaMural tarefatimeline.js ");
    var a = $("#dataInicio").val(),
        o = $("#dataFim").val(),
        e = $("#horaInicio").val(),
        i = $("#horaFim").val(),
        t = $("#idCaminho").val();
    $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");
    var r = $("#txtDisponivel").text(),
        n = $("#txtTitulo").text(),
        s = $("#strComplementoRapido").val();
    if ("" == s) var l = n + r;
    else var l = s + "<br>" + n + r;
    $("#txtInput").val(l);
    var c = ($("#idAvaliacao").val(), $("#idGrupo").val()),
        d = "";
    //console.log(" disciplinaSelecionada == " + disciplinaSelecionada);
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
        data: {
            idRotaAgendamento: 0,
            idCaminho: t,
            idGrupo: c,
            dataInicio: a,
            horaInicio: e,
            dataFim: o,
            horaFim: i,
            strComplemento: s,
            strTitulo: n,
            strDescricao: s
            , idMateria: 0
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (a) {
            var o = a.split("|");
            console.log("====== o[1] " + o[1]);
            console.log("====== o[0] " + o[0]);
            return d = o[0], isNumeric(o[0]) ? (salvarMensagemRapida(o[1], c, 17, o[0], $("#idEtapa").val(), l), $(".actions[pos=1]").click(), $("#txtInput").val(""), $("#lista_agendamento").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
                url: "/AVA/Barras/Home/ListaAtividadesGrupo",
                data: {
                    strLinkGrupo: idUsuarioPublico
                },
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (a) {
                    $("#lista_agendamento").html(a), $(".content").mCustomScrollbar(), $("#sVisualizarAgendamento").find("li .tooltip_title").tooltip({
                        offset: [0, 0],
                        opacity: .9
                    })
                },
                error: function () {
                    $("#lista_agendamento").html("erro ao listar atividades do professor.")
                }
            }), void $.fancybox.close()) : (alert(d), $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoTarefaRapidaMural()"><span></span>Enviar Agendamento</a>'), !1)
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao inserir agendamento!")
        }
    })
}

function salvarMensagemRapida(a, o, e, i, t, r,idCaminho,lArquivos) {
    console.log("salvarMensagemRapida entrou tarefatimeline ");
    //
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
        data: {
            strUsuarios: a,
            idGrupo: o,
            idFerramentaTipo: e,
            idFerramenta: i,
            idEtapa: t,
            strMensagem: r,
            idMateria: disciplinaSelecionada,
            idAssunto: $("#hAssuntoPost").val(),
            arquivos: JSON.stringify(lArquivos),
            idRota: idCaminho

        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        // success: function(d){
        //     console.log(d);
        // },
        success: function () {
            carregaTimeLineGrupo(0)
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao salvar mensagem r&aacute;pida!")
        }
    })
}

function isNumeric(a) {
    var o = /^[0-9]+$/;
    return o.test(a)
}

function abreListaRecurso() {
    var a = {
        scrolling: "no",
        autoSize: !1,
        width: 730,
        height: 530,
        autoResize: !1,
        fitToView: !1,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        autoResize: !1,
        href: "/AVA/Caminhos/Home/ListaRecursos",
        afterShow: function () {
            EscondeOsObjects(), $(".cover").mosaic({
                animation: "slide",
                speed: 500,
                hover_x: "400px"
            })
        },
        beforeClose: function () {
            $("html").css({
                overflow: "scroll"
            }), MostraOsObjects()
        },
        beforeShow: function () {
            $("html").css({
                overflow: "hidden"
            })
        }
    };
    return $.fancybox(a), !1
}

function voltaListaRecursos() {
    strPesquisaGlobal = "", tipoGlobal = 1, strEstadosGlobal = "2, 3, 5, 6, 8, 10", dtmInicioGlobal = "", dtmFimGlobal = "", idEstadoGlobal = -1, $(".fancybox-inner").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaRecursos/",
        success: function (a) {
            $(".fancybox-inner").html(a), $(".cover").mosaic({
                animation: "slide",
                speed: 500,
                hover_x: "400px"
            })
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao retornar recurso escolhido")
        }
    })
}

function salvarRecurso(a, o, e, i, t, r, n) {
    var s = $("#idCaminho").val();
    "" != s && void 0 != s || (s = 0);
    var l = $("#idEtapa").val();
    "" != l && void 0 != l || (l = 0);
    var c = 2;
    $("input:radio[name=rTipo]").each(function () {
        $(this).is(":checked") && (c = parseInt($(this).val()))
    }), $.ajax({
        type: "POST",
        //url: "/AVA/Caminhos/Home/SalvarCaminho/",
        url: "/AVA/Caminhos/Home/SalvarCaminhoRecurso/",
        data: {
            idRota: parseInt(s),
            idUsuario: 0,
            strTitulo: a,
            strDescricao: o,
            intStatus: c,
            strTags: "",
            intTipo: e
        },
        success: function (e) {
            $("#idCaminho").val(e), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                data: {
                    idCaminho: e,
                    idEtapa: l,
                    idRecurso: 1,
                    idPublicacao: 0,
                    idAvaliacao: n,
                    strTitulo: a,
                    strDescricao: o,
                    intValor: i
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (a) {
                    var o = a.split("_"),
                        e = o[0];
                    $("#idEtapa").val(o[1]), $("#recursoRapido").remove(), $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>'), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                        data: {
                            idRecursoEtapa: e,
                            idAvaliacao: n
                        },
                        success: function (a) {
                            idAvaliacao = n;
                            idRecurso: 1;
                            $("#container_empilhaextras #recursoRapido").html(a), $.fancybox.close(), $("#abreListaRecursoTarefa").attr({
                                href: "javascript:void(0);",
                                title: "Substituir recurso"
                            }), $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso"), $(".tooltip").each(function () {
                                "Inserir recurso" === $(this).text() && $(this).html("Substituir recurso")
                            })
                        },
                        error: function (a) {
                            0 != a.status && console.debug("erro ao retornar recurso escolhido")
                        }
                    })
                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao salvar recurso")
                }
            })
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao salvar tarefa r&aacute;pida")
        }
    })
}

function excluirRecursoRapido() {
    var a = $("#idCaminho").val(),
        o = $("#idEtapa").val(),
        e = $("#strTituloTarefa").val(),
        i = $("#txtDescricaoTarefa").val(),
        t = 0;
    $("#valeNota").attr("checked") && (t = $("#intValorTarefa").val()), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
        data: {
            idCaminho: a,
            idEtapa: o,
            idRecurso: 11,
            idPublicacao: 0,
            idAvaliacao: 0,
            strTitulo: e,
            strDescricao: i,
            intValor: t
        },
        success: function () {
            $("#recursoRapido").find("img").attr("src").toLowerCase().indexOf("avaliacoes") > 0 && ($("#strTituloTarefa").val(""), $("#txtDescricaoTarefa").val(""), $("#intValorTarefa").val(""), $("#valeNota").removeAttr("checked")), $("#recursoRapido").slideUp("slow", function () {
                $("#recursoRapido").remove(), $("#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa, #entrega_tarefa").removeAttr("disabled")
            }), $("#abreListaRecursoTarefa").attr({
                href: "javascript:void(0);",
                title: "Inserir recurso"
            }), $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Inserir recurso"), $(".tooltip").first().text("Inserir recurso"), $(".tooltip_title").each(function () {
                $(this).tooltip({
                    offset: [-10, 0]
                })
            })
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao remover recurso")
        }
    })
}

function paginacaoRecursoItemRapido(a, o) {
    $("#mostraPaginas").hide(), idCategoriaGlobal = a, idRecursoGlobal = o, rodarGlobal = 1;
    var e = 0;
    1 == o ? ($("#container_recAval").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAvaliacoesTotal/",
        async: !1,
        data: {
            tipo: tipoGlobal,
            strEstados: strEstadosGlobal,
            dtmInicio: dtmInicioGlobal,
            dtmFim: dtmFimGlobal,
            strPesquisa: strPesquisaGlobal,
            strPesquisaEncode1: strPesquisaGlobal,
            strPesquisaEncode2: strPesquisaGlobal,
            idEstado: idEstadoGlobal
        },
        success: function (a) {
            e = a
        },
        error: function (a) {
            0 != a.status && console.debug("N&atilde;o foi poss&iacute;vel obter o numero de resultados")
        }
    })) : $.ajax({
        url: "/AVA/Caminhos/home/SelecionarRecursoItemTotal/",
        data: {
            idCategoria: idCategoriaGlobal,
            idRecurso: idRecursoGlobal
        },
        async: !1,
        success: function (a) {
            e = a
        },
        error: function (a) {
            0 != a.status && console.debug("Nao foi possivel obter o numero de resultados.")
        }
    }), e = parseInt(e), $("#Pagination").pagination(e, {
        items_per_page: quantidadePorPaginaGlobal,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "javascript:void(0);",
        callback: retornaPaginaRecursoItemRapido
    }), quantidadePorPaginaGlobal >= e ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
}

function retornaPaginaRecursoItemRapido(a) {
    rodarGlobal > 0 && (listaRecursoItemRapidoPaginando(a, idRecursoGlobal, idCategoriaGlobal), $(".ava_container_masonry").masonry({
        itemSelector: ".ava_box_masonry"
    })), rodarGlobal += 1
}

function listaRecursoItemRapidoPaginando(a, o, e) {
    a += 1;
    var i = quantidadePorPaginaGlobal * a,
        t = i - quantidadePorPaginaGlobal + 1;
    $("#container_recurso").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $("#container_recurso").removeClass("tablefix_aval"), $("#container_recurso").removeClass("trhover"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaRecursoItensRapido/",
        data: {
            idCategoria: e,
            idRecurso: o,
            intInicio: t,
            intFim: i
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (a) {
            $("#container_recurso").html(a).css("display", ""), $(".ava_container_masonry").masonry({
                itemSelector: ".ava_box_masonry"
            })
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao listar recursos!")
        }
    })
}

function inserirRecursoRapido_OLD(a, o, e) {
    void 0 != $("#recursoRapido").find("img").attr("src") && $("#recursoRapido").find("img").attr("src").toLowerCase().indexOf("avaliacoes") > 0 && ($("#strTituloTarefa").val(""), $("#txtDescricaoTarefa").val(""), $("#intValorTarefa").val(""), $("#valeNota").removeAttr("checked")), $(".time_loading").css("display", "block");
    var i = $("#strTituloTarefa").val(),
        t = $("#txtDescricaoTarefa").val(),
        r = 0;
    $("#valeNota").attr("checked") && (r = $("#intValorTarefa").val());
    var n = $("#idCaminho").val();
    "" != n && void 0 != n || (n = 0);
    var s = $("#idEtapa").val();
    "" != s && void 0 != s || (s = 0);
    var l = 2;
    $("input:radio[name=rTipo]").each(function () {
        $(this).is(":checked") && (l = parseInt($(this).val()))
    }), $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: n,
            idUsuario: 0,
            strTitulo: i,
            strDescricao: t,
            intStatus: l,
            strTags: "",
            intTipo: 2,
            json: null,
            userturma: 1
        },
        success: function (n) {
            $("#idCaminho").val(n), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                data: {
                    idCaminho: n,
                    idEtapa: s,
                    idRecurso: a,
                    idPublicacao: o,
                    idAvaliacao: e,
                    strTitulo: i,
                    strDescricao: t,
                    intValor: r
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (a) {

                    idPublicacao = e;
                    //idAvaliacao = h;
                    intValorRecurso = r;
                    var o = a.split("_"),
                        i = o[0];
                    $("#idEtapa").val(o[1]), $("#recursoRapido").remove(), $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>'), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                        data: {
                            idRecursoEtapa: i,
                            idAvaliacao: e
                        },
                        success: function (a) {
                            $("#container_empilhaextras #recursoRapido").html(a), $.fancybox.close(), $("#abreListaRecursoTarefa").attr({
                                href: "javascript:void(0);",
                                title: "Substituir recurso"
                            }), $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso"), $(".tooltip").each(function () {
                                "Inserir recurso" === $(this).text() && $(this).html("Substituir recurso")
                            }), $("#recursoRapido").css("margin", "0px 0px 0px 0"), $("#recursoRapido").find("h5").parent().css("margin", "0px 0px 0px 0")
                        },
                        error: function (a) {
                            0 != a.status && console.debug("erro ao retornar recurso escolhido")
                        }
                    })
                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao salvar recurso")
                }
            })
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao salvar tarefa r&aacute;pida")
        }
    })
}

function procurarItemRapido(a, o) {
    if (1 != passouAgendar) {
        var e = $("#strPesquisaRecurso").val();
        if ("" == e) return $("#strPesquisaRecurso").addClass("ava_field_alert"), !1;
        if (159 == a) {
            var i = $("#IdPapelEnsino").val(),
                t = $("#idDisciplina").val();
            intEnsinoGlobal = i, intDisciplinaGlobal = t
        } else intEnsinoGlobal = 0, intDisciplinaGlobal = 0;
        idRecursoGlobal = o, idCategoriaGlobal = a, strPesquisaGlobal = e, rodarGlobal = 1, passouAgendar = 1, paginacaoProcurarRecursoItemRapido(idCategoriaGlobal, strPesquisaGlobal)
    }
}

function paginacaoProcurarRecursoItemRapido(a, o) {
    $("#mostraPaginas").hide(), $("#container_recursoItem").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    var e, i = 0;
    e = 0 != intEnsinoGlobal ? {
        idCategoria: a,
        strPesquisa: o,
        intEnsino: intEnsinoGlobal,
        intDisciplina: intDisciplinaGlobal
    } : {
            idCategoria: a,
            strPesquisa: o
        }, $.ajax({
            url: "/AVA/Caminhos/home/ProcurarRecursoItemTotal/",
            data: e,
            async: !1,
            success: function (a) {
                i = a
            },
            error: function (a) {
                0 != a.status && console.debug("Nao foi possivel obter o numero de resultados.")
            }
        }), i = parseInt(i), $("#Pagination").pagination(i, {
            items_per_page: quantidadePorPaginaGlobal,
            num_display_entries: 5,
            current_page: 0,
            num_edge_entries: 1,
            link_to: "javascript:void(0);",
            callback: retornaPaginaProcurarRecursoItemRapido
        }), quantidadePorPaginaGlobal >= i ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
}

function retornaPaginaProcurarRecursoItemRapido(a) {
    rodarGlobal > 0 && listaProcuraRecursoItemRapido(a, idCategoriaGlobal, idRecursoGlobal, strPesquisaGlobal), rodarGlobal += 1
}

function listaProcuraRecursoItemRapido(a, o, e, i) {
    a += 1;
    var t, r = quantidadePorPaginaGlobal * a,
        n = r - quantidadePorPaginaGlobal + 1;
    t = 159 == o ? {
        idCategoria: o,
        idRecurso: e,
        strPesquisa: i,
        intInicio: n,
        intFim: r,
        intEnsino: intEnsinoGlobal,
        intDisciplina: intDisciplinaGlobal
    } : {
            idCategoria: o,
            idRecurso: e,
            strPesquisa: i,
            intInicio: n,
            intFim: r
        }, $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ProcurarRecursoItemRapido/",
            data: t,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (a) {
                $("#container_recursoItem").html(a).css("display", ""), $(".ava_container_masonry").masonry({
                    itemSelector: ".ava_box_masonry"
                }), passouAgendar = 0
            },
            error: function (a) {
                0 != a.status && console.debug("erro ao procurar recursos!")
            }
        })
}

function visualizarCM() {
    var a = $("#paginacaoCM").find("option:selected").attr("iVersao"),
        o = $("#paginacaoCM").find("option:selected");
    visualizarPaginaCM(o, a)
}

function visualizarPaginaCM(a, o) {
    var e = a.attr("idPublicacao");
    if (6 == o) {
        var i, t, r, n, s, l;
        i = 730, t = 500, r = screen.width, n = screen.height, s = (r - i) / 2, l = (n - t) / 2 - 20, window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("url")) + "&idPublicacao=" + e + "&iVersao=" + o, e, "left=" + s + ",top=" + l + ",width=" + i + ",height=" + t + ",resizable=yes")
    } else 3 > o ? window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("urlPai")) + "?bProcura=1&idPublicacao=" + e + "&idcapitulo=" + a.attr("pOrdem") + "&idSubcapitulo=" + a.attr("sOrdem") + "&iVersao=" + o, a.attr("idPublicacao"), "width=800,height=600,scrollbars=no,left=0,top=0,resizable=yes") : 7 == o ? window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("urlPai")) + "?bProcura=1&idPublicacao=" + e + "&idcapitulo=" + a.attr("pOrdem") + "&idSubcapitulo=" + a.attr("sOrdem") + "&iVersao=" + o, a.attr("idPublicacao"), "width=790,height=560,scrollbars=no,left=0,top=0,resizable=yes") : window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("urlPai")) + "?bProcura=1&idPublicacao=" + e + "&idcapitulo=" + a.attr("pOrdem") + "&idSubcapitulo=" + a.attr("sOrdem") + "&iVersao=" + o, a.attr("idPublicacao"), "width=780,height=580,scrollbars=no,left=0,top=0,resizable=yes")
}

function salvarPaginasCM() {
    var a = $("#paginacaoCM").find("option:selected"),
        o = $("#idEtapa");
    $.ajax({
        url: "/ava/caminhos/home/salvarPaginacaoCMRapido",
        data: {
            idEtapa: o.val(),
            pOrdem: a.attr("pOrdem"),
            sOrdem: a.attr("sOrdem")
        },
        type: "POST",
        async: !1,
        success: function (a) {
            var o = parseInt(a);
            2 == o && console.debug("Desconhecido")
        },
        error: function (a) {
            console.debug(a.responseText)
        }
    })
}

function listaAvaliacoesNovaRapido(a, o, e) {
    $("#container_recurso").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        type: "POST",
        url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
        async: !1,
        data: {
            pagina: 1,
            tamanho: quantidadePorPaginaGlobal,
            limite: 5,
            ordem: "nome,0",
            nome: a,
            datainicio: o,
            datafim: e,
            origem: 0
        },
        success: function (i) {
            try {
                -1 == i.erro.id ? totalAvaliacoes = 0 : totalAvaliacoes = i.Paginacao.Total
            } catch (t) {
                totalAvaliacoes = i.Paginacao.Total
            }
            strPesquisaGlobal = a, dtmInicioGlobal = o, dtmFimGlobal = e, $("#Pagination").pagination(totalAvaliacoes, {
                items_per_page: quantidadePorPaginaGlobal,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: listaAvaliacoesNovaRapidoPaginado
            }), totalAvaliacoes <= quantidadePorPaginaGlobal ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
        },
        error: function (a) {
            0 != a.status && console.debug("N&atilde;o foi poss&iacute;vel obter o numero de resultados da avalia&ccedil;&atilde;o")
        }
    })
}

function listaAvaliacoesNovaRapidoPaginado(a) {
    strTitulo = strPesquisaGlobal, dtmInicio = dtmInicioGlobal, dtmFim = dtmFimGlobal, a += 1, $.ajax({
        type: "POST",
        url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
        async: !1,
        data: {
            pagina: a,
            tamanho: quantidadePorPaginaGlobal,
            limite: 5,
            ordem: "nome,0",
            nome: strTitulo,
            datainicio: dtmInicio,
            datafim: dtmFim,
            origem: 0
        },
        success: function (a) {
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/RetornaAvaliacoesRapido/",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (o) {
                    $("#container_recurso").html(o), $("#strPesquisa").val(strTitulo), $("#dtmInicioAval").val(dtmInicio), $("#dtmFimAval").val(dtmFim), montaLajotinhaFiltro(strTitulo, dtmInicio, dtmFim), $("#filtro_aval").hide(), $("#escorregaFiltro").toggle(function () {
                        $(this).html("Adicionar filtros &#9650;"), montaCampoData("#dtmInicioAval", "#dtmFimAval"), $("#filtro_aval").slideDown()
                    }, function () {
                        $(this).html("Adicionar filtros &#9660;"), $("#filtro_aval").slideUp()
                    }), $("#container_recAval").html("<tr><td colspan='2'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></td></tr>");
                    try {
                        -1 == a.erro.id ? $("#container_recAval").html('<tr><td colspan="2">Nenhuma avalia&ccedil;&atilde;o encontrada.</td></tr>') : $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/RetornaListaAvaliacoesRapido",
                            data: {
                                jsonListaAvaliacao: jQuery.toJSON(a)
                            },
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (a) {
                                $("#container_recAval").html(a), Modernizr.touch && $(".aval_aux").addClass("mobile")
                            },
                            error: function (a) {
                                0 != a.status && console.debug("erro ao listar avaliacao")
                            }
                        })
                    } catch (e) {
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/RetornaListaAvaliacoesRapido",
                            data: {
                                jsonListaAvaliacao: jQuery.toJSON(a)
                            },
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (a) {
                                $("#container_recAval").html(a), Modernizr.touch && $(".aval_aux").addClass("mobile")
                            },
                            error: function (a) {
                                0 != a.status && console.debug("erro ao listar avaliacao")
                            }
                        })
                    }
                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao listar avaliacao")
                }
            })
        },
        error: function (a) {
            0 != a.status && console.debug("N&atilde;o foi poss&iacute;vel obter o numero de resultados da avalia&ccedil;&atilde;o")
        }
    })
}

function inserirAvaliacaoRapido_OLD(a) {
    var o = $("#strTituloTarefa").val(),
        e = $("#txtDescricaoTarefa").val();
    $("#idAvaliacao").val(a);
    var i = "",
        t = !0;
    o.length > 0 && e.length > 0 ? i = "T&iacute;tulo e Descri&ccedil;&atilde;o ser&atilde;o sobreescritos" : o.length > 0 && e.length <= 0 ? i = "T&iacute;tulo ser&aacute; sobreescrito" : o.length <= 0 && e.length > 0 ? i = "Descri&ccedil;&atilde;o ser&aacute; sobreescrita" : t = !1, $("#entrega_tarefa").attr("checked") && t ? (i += " e a solicita&ccedil;&atilde;o de entrega ser&aacute; perdida.\nDeseja continuar?", t = !0) : $("#entrega_tarefa").attr("checked") && !t && (i += "Sua solicita&ccedil;&atilde;o de entrega ser&aacute; perdida.\nDeseja continuar?", t = !0), t && !$("#entrega_tarefa").attr("checked") && (i += ".\nDeseja continuar?");
    var r = 0;
    $("#valeNota").attr("checked") && (r = $("#intValorTarefa").val()), t ? jConfirm(i, "", function (i) {
        i && ($(".time_loading").css("display", "block"), $.ajax({
            type: "POST",
            url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + a,
            success: function (i) {
                o = i.Nome, e = i.TextoIntrodutorio, r = i.ValorTotal, $("#strTituloTarefa").val(o), $("#txtDescricaoTarefa").val(e), $("#intValorTarefa").val(r), $("#valeNota").attr("checked", "true"), $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled"), $("#solicita_entrega").removeAttr("onclick"), $("#solicita_entrega").removeAttr("href"), $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked"), $("#solicita_entrega").find("i").addClass("entrega_icon_vazio"), $("#bolSolicitaEntrega").val("0"), salvarRecurso(o, e, 2, r, 1, 0, a)
            },
            error: function (a) {
                0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
            }
        }))
    }) : ($(".time_loading").css("display", "block"), $.ajax({
        type: "POST",
        url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + a,
        success: function (i) {
            o = i.Nome, e = i.TextoIntrodutorio, r = i.ValorTotal, $("#strTituloTarefa").val(o), $("#txtDescricaoTarefa").val(e), $("#intValorTarefa").val(r), $("#valeNota").attr("checked", "true"), $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled"), $("#solicita_entrega").removeAttr("onclick"), $("#solicita_entrega").removeAttr("href"), $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked"), $("#solicita_entrega").find("i").addClass("entrega_icon_vazio"), $("#bolSolicitaEntrega").val("0");
            salvarRecurso(o, e, 2, r, 1, 0, a);
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
        }
    }))
}

function simularAvaliacao(a) {
    window.open("/ava/avaliacoes/Agendamento/VisualizacaoProva/" + a, "wnvsimularavaliacao", "width=799,height=480, scrollbars=1, resizable=yes")
}

function mudarDisciplinas(a) {
    var o;
    1010101 == a ? (o = '<option value="0" selected="selected">Todas as disciplinas</option><option value="6">Ci&ecirc;ncias</option><option value="8">Educa&ccedil;&atilde;o F&iacute;sica</option><option value="11">Geografia</option><option value="12">Hist�ria</option><option value="73">L�ngua Inglesa</option><option value="15">Matem�tica</option><option value="16">L�ngua Portuguesa</option>', $("#idDisciplina").empty().html(o).removeAttr("disabled")) : 1010201 == a ? (o = '<option value="0" selected="selected">Todas as disciplinas</option> <option value="6">Ci�ncias</option><option value="8">Educa��o F�sica</option><option value="10">F�sica</option><option value="11">Geografia</option><option value="12">Hist�ria</option><option value="73">L�ngua Inglesa</option><option value="15">Matem�tica</option><option value="16">L�ngua Portuguesa</option><option value="19">Qu�mica</option>', $("#idDisciplina").empty().html(o).removeAttr("disabled")) : 1020001 == a ? (o = '<option value="0" selected="selected">Todas as disciplinas</option>  <option value="7">Biologia</option> <option value="8">Educa��o F�sica</option><option value="10">F�sica</option> <option value="11">Geografia</option> <option value="12">Hist�ria</option> <option value="73">L�ngua Inglesa</option> <option value="15">Matem�tica</option> <option value="16">L�ngua Portuguesa</option> <option value="19">Qu�mica</option>', $("#idDisciplina").empty().html(o).removeAttr("disabled")) : 1040001 == a || (o = '<option value="0" selected="selected">Todas as disciplinas</option>', $("#idDisciplina").empty().html(o).attr("disabled", "disabled"))
}

function limparfiltro() {
    $("#strPesquisa").val(""), $("#dtmInicioAval, #dtmFimAval").val("")
}

function filtrarAvaliacoes() {
    return $tituloAval = $("#strPesquisa").val(), $dataInicio = $("#dtmInicioAval").val(), $dataFim = $("#dtmFimAval").val(), $dataInicio.length <= 0 && $dataFim.length > 0 ? (alert("Favor preencher a data inicial!"), !1) : $dataInicio.length > 0 && $dataFim.length <= 0 ? (alert("Favor preencher a data final!"), !1) : ($("#filtro_aval").hide(), $("#escorregaFiltro").html("Adicionar filtros &#9660;"), void listaAvaliacoesNovaRapido($tituloAval, $dataInicio, $dataFim))
}

function montaLajotinhaFiltro(a, o, e) {
    if ($(".lajotinhas ul").html(""), "" != a) {
        var i = 0;
        $(".lajotinhas li").each(function () {
            i++
        }), i++ , $(".lajotinhas ul").append('<li id="' + i + '"><span class="lajotinha">' + a + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltro(' + i + ', 4)"></a></span></span></li>')
    }
    if ("" != o && "" != e) {
        var i = 0;
        $(".lajotinhas li").each(function () {
            i++
        }), i++ , $(".lajotinhas ul").append('<li id="' + i + '"><span class="lajotinha">' + o + " a " + e + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltro(' + i + ', 5)"></a></span></span></li>')
    }
    $(".lajotinhas a.bt_normal").remove()
}

function excluirFiltro(a, o) {
    1 == o ? $("#minhas_aval").attr("checked", !0) : 2 == o ? $("#cbCompartilhada").removeAttr("checked") : 3 == o ? $("#cbPrivado").removeAttr("checked") : 4 == o ? $("#strPesquisa").val("") : 5 == o && $("#dtmInicioAval, #dtmFimAval").val(""), $("#" + a).remove(), $(".lajotinhas a.bt_normal").remove(), $(".lajotinhas").append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarAvaliacoes();"><span class="ava_refresh"></span>atualizar filtro</a>')
}

function abreCodigo() {
    var a = {
        autoSize: !1,
        width: 680,
        height: 450,
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        autoResize: !1,
        type: "ajax",
        href: "/AVA/Caminhos/Home/SelecaoCodigosLivro",
        beforeClose: function () {
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaCodigosDidatico",
                data: {
                    idRecursoEtapa: $("#idRecursoEtapa").val()
                },
                success: function (a) {
                    $("#codigos_didatico").html(""), $("#container_empilhaextras").prepend(a)
                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao buscar codigos da tarefa!")
                }
            }), MostraOsObjects()
        },
        afterShow: function () {
            EscondeOsObjects()
        }
    };
    return $.fancybox(a), !1
}

function defineOptionsMD(a) {
    a = a.value, document.getElementById("intBimestre").disabled = !1, document.getElementById("selAreas").disabled = !1, strNivel = a, strSelSerie = "", strSelArea = "", strSelArea += '<option value="0" selected>selecione uma �rea</option>', "EI_alu" == a ? (document.getElementById("intBimestre").disabled = !0, document.getElementById("selAreas").disabled = !0, document.getElementById("selSerie").disabled = !1, strSelSerie = "", strSelSerie += '<option value="0" selected>selecione um grupo</option>', strSelSerie += '<option value="3" >Grupo 3</option>', strSelSerie += '<option value="4" >Grupo 4</option>', strSelSerie += '<option value="5" >Grupo 5</option>', strSelSerie += '<option value="1" >1� ano / n�vel III</option>') : "EF_I" == a ? (document.getElementById("selSerie").disabled = !1, strSelSerie += '<option value="2" >2� ano / 1� s�rie</option>', strSelSerie += '<option value="3" >3� ano / 2� s�rie</option>', strSelSerie += '<option value="4" >4� ano / 3� s�rie</option>', strSelSerie += '<option value="5" >5� ano / 4� s�rie</option>', strSelArea += '<option value="art" >Artes</option>', strSelArea += '<option value="cie" >Ci�ncias</option>', strSelArea += '<option value="fil" >Filosofia</option>', strSelArea += '<option value="geo" >Geografia</option>', strSelArea += '<option value="his" >Hist�ria</option>', strSelArea += '<option value="ing" >L�ngua Inglesa</option>', strSelArea += '<option value="por" >L�ngua Portuguesa</option>', strSelArea += '<option value="mat" >Matem�tica</option>') : "EF_II" == a ? (document.getElementById("selSerie").disabled = !1, strSelSerie += '<option value="6" >6� ano / 5� s�rie</option>', strSelSerie += '<option value="7" >7� ano / 6� s�rie</option>', strSelSerie += '<option value="8" >8� ano / 7� s�rie</option>', strSelSerie += '<option value="9" >9� ano / 8� s�rie</option>', strSelArea += '<option value="art" >Artes</option>', strSelArea += '<option value="cie" >Ci�ncias</option>', strSelArea += '<option value="fis" >F�sica</option>', strSelArea += '<option value="geo" >Geografia</option>', strSelArea += '<option value="his" >Hist�ria</option>', strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>', strSelArea += '<option value="ing" >L�ngua Inglesa</option>', strSelArea += '<option value="por" >L�ngua Portuguesa</option>', strSelArea += '<option value="mat" >Matem�tica</option>', strSelArea += '<option value="qui" >Qu�mica</option>') : "EM" == a ? (document.getElementById("selSerie").disabled = !1, strSelSerie += '<option value="1" >1� s�rie</option>', strSelSerie += '<option value="2" >2� s�rie</option>', strSelSerie += '<option value="3" >3� s�rie</option>', strSelArea += '<option value="art" >Artes</option>', strSelArea += '<option value="bio" >Biologia</option>', strSelArea += '<option value="fil" >Filosofia</option>', strSelArea += '<option value="fis" >F�sica</option>', strSelArea += '<option value="geo" >Geografia</option>', strSelArea += '<option value="his" >Hist�ria</option>', strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>', strSelArea += '<option value="ing" >L�ngua Inglesa</option>', strSelArea += '<option value="por" >L�ngua Portuguesa</option>', strSelArea += '<option value="lit" >Literatura</option>', strSelArea += '<option value="mat" >Matem�tica</option>', strSelArea += '<option value="qui" >Qu�mica</option>', strSelArea += '<option value="soc" >Sociologia</option>') : "MOD" == a ? (document.getElementById("selSerie").disabled = !0, strSelSerie = "", strSelSerie += '<option value="0" selected>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>', strSelArea += '<option value="art" >Artes</option>', strSelArea += '<option value="bio" >Biologia</option>', strSelArea += '<option value="fil" >Filosofia</option>', strSelArea += '<option value="fis" >F�sica</option>', strSelArea += '<option value="geo" >Geografia</option>', strSelArea += '<option value="his" >Hist�ria</option>', strSelArea += '<option value="ing" >L�ngua Inglesa</option>', strSelArea += '<option value="por" >L�ngua Portuguesa</option>', strSelArea += '<option value="esp" >L�ngua Espanhola</option>', strSelArea += '<option value="lit" >Literatura</option>', strSelArea += '<option value="mat" >Matem�tica</option>', strSelArea += '<option value="qui" >Qu�mica</option>', strSelArea += '<option value="soc" >Sociologia</option>', document.getElementById("intBimestre").disabled = !0) : "EXT" == a && (document.getElementById("selSerie").disabled = !0, strSelArea += '<option value="bio" >Biologia</option>', strSelArea += '<option value="fis" >F�sica</option>', strSelArea += '<option value="geo" >Geografia</option>', strSelArea += '<option value="his" >Hist�ria</option>', strSelArea += '<option value="ing" >L�ngua Inglesa</option>', strSelArea += '<option value="por" >L�ngua Portuguesa</option>', strSelArea += '<option value="esp" >L�ngua Espanhola</option>', strSelArea += '<option value="lit" >Literatura</option>',
        strSelArea += '<option value="mat" >Matem�tica</option>', strSelArea += '<option value="qui" >Qu�mica</option>', document.getElementById("intBimestre").disabled = !0), $("#selSerie").html(strSelSerie), $("#selAreas").html(strSelArea)
}

function fncPesquisa() {
    var a = $("#selNivel").val(),
        o = $("#selSerie").val(),
        e = $("#selAreas").val();
    return "0" == a ? void alert("Voc� precisa selecionar um n�vel.") : "0" == o && "MOD" != $("#selNivel").value ? void alert("Voc� precisa selecionar uma s�rie.") : "0" == e && "EI_alu" != $("#selNivel").value ? void alert("Voc� precisa selecionar uma �rea.") : ($("#container_codigos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), void $.ajax({
        type: "POST",
        url: "/pesquisa/listaLinks_MD_AVA.asp",
        data: {
            selNivel: a,
            selSerie: o,
            selAreas: e
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (a) {
            $("#container_codigos").html(a)
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao procurar codigo!")
        }
    }))
}

function inserirCodigo(a, o) {
    $(".time_loading").css("display", "block");
    var e = $("#strTituloTarefa").val(),
        i = $("#txtDescricaoTarefa").val(),
        t = 0;
    $("#valeNota").attr("checked") && (t = $("#intValorTarefa").val());
    var r = $("#idCaminho").val();
    "" != r && void 0 != r || (r = 0);
    var n = $("#idEtapa").val();
    "" != n && void 0 != n || (n = 0), $("#boxBTNInsCodigo_" + a).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Inserindo...");
    var s = 2;
    $("input:radio[name=rTipo]").each(function () {
        $(this).is(":checked") && (s = parseInt($(this).val()))
    }), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: r,
            idUsuario: 0,
            strTitulo: e,
            strDescricao: i,
            intStatus: s,
            strTags: "",
            intTipo: 2
        },
        success: function (r) {
            $("#idCaminho").val(r), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                data: {
                    idCaminho: r,
                    idEtapa: n,
                    idRecurso: 11,
                    idPublicacao: 0,
                    idAvaliacao: 0,
                    strTitulo: e,
                    strDescricao: i,
                    intValor: t,
                    buscaRecursoExistente: 1
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (e) {
                    var i = e.split("_"),
                        t = i[0];
                    $("#idEtapa").val(i[1]), $("#idRecursoEtapa").val(t), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/InserirCodigoDidatico/",
                        data: {
                            idRecursoEtapa: t,
                            idCodigo: a,
                            idApostilaEdicao: o
                        },
                        success: function () {
                            $("div#" + o).html("<span>C�digo inserido com sucesso!</span>")
                        },
                        error: function (o) {
                            0 != o.status && console.debug("erro ao inserir codigo didatico: " + a)
                        }
                    })
                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao salvar recurso")
                }
            })
        },
        error: function (a) {
            0 != a.status && console.debug("erro ao salvar tarefa r�pida")
        }
    })
}

function excluirCodigo(a, o, e) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirCodigoEtapa",
        data: {
            idRecursoEtapa: o,
            idCodigo: a,
            idApostilaEdicao: e
        },
        success: function () {
            $("#codigos_didatico #" + a).slideUp("slow", function () {
                $(this).remove(), 0 == $("#codigos_didatico .atividades_insert").length && $("#codigos_didatico h5").hide()
            })
        },
        error: function (o) {
            0 != o.status && $("#codigos_didatico #" + a).prepend("erro ao excluir c�digo da tarefa!")
        }
    })
}

function pesquisaPorCodigo() {
    var a = $("#strCodigoDidatico").val();
    "" == a ? alert("Digite um c�digo.") : $.ajax({
        type: "POST",
        url: "/pesquisa/resultadoPesquisaMD_AVA.asp",
        data: {
            strCodigo: a
        },
        success: function (a) {
            $("#container_codigos").html(a)
        },
        error: function (a) {
            0 != a.status && $("#container_codigos").prepend("erro ao buscar codigo!")
        }
    })
}

function montaCampoData(a, o) {
    $(a).setMask("date"), $(o).setMask("date"), $(a).datepicker({
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
        monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function (a) {
            $(o).datepicker("option", "minDate", a)
        }
    }), $(o).datepicker({
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
        monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function (o) {
            $(a).datepicker("option", "maxDate", o)
        }
    })
}

function EscondeOsObjects() {
    var a = document.getElementsByTagName("object");
    for (i = 0; i < a.length; i++) a[i].style.display = "none"
}

function MostraOsObjects() {
    var a = document.getElementsByTagName("object");
    for (i = 0; i < a.length; i++) a[i].style.display = "block"
}

function abrirMidiaTarefa() {
    $("#boxLinkTarefa,#boxMidiaTarefa").remove();
    var a = '<div id="boxMidiaTarefa" class="atividades_insert inserir_midia bgcolor1" style="display:none" >  <input type="text" name="dialogo" placeholder="Insira o endere&ccedil;o URL" class="ipt_midia ph">  <a href="javascript:void(0);" onclick="inserirMidiaTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a>  <span class="discreto">Digite ou cole uma URL de v&iacute;deo YouTube ou Vimeo</span></div>';
    $("#container_empilhaextras").prepend(a), $("#boxMidiaTarefa").slideDown("slow"), $("#boxMidiaTarefa").find("input").focus(function () {
        $(this).removeClass("ava_field_alert")
    }), $("#boxMidiaTarefa").css("margin", "0px 0px 0px 0")
}

function inserirMidiaTarefa_OLD() {
    var a = $("#boxMidiaTarefa").find("input").val(),
        o = 0,
        e = "";
    a.indexOf("http") < 0 && a.indexOf("https") < 0 && (a = "http://" + a);
    var i = retornaMatchVideo(a);
    i ? i.always(function () {
        if (bolVideoProibido && "" == strTipoVideo) return mostraAlertaTarefa("Este v�deo tem sua incorpora��o proibida pelo seu propriet�rio e n�o pode ser inserido."), bolVideoProibido = !1, strTipoVideo = "", $("#boxMidiaTarefa").find("input").addClass("ava_field_alert"), !1;
        var i = validarURLVideo(a);
        if ("youtubeEncurtado" == i) o = 1, e = a.substring(a.indexOf("be/") + 3, a.length);
        else if ("youtube" == i) o = 1, e = a.indexOf("&") > 0 ? a.substring(a.indexOf("v=") + 2, a.indexOf("&")) : a.indexOf("/v/") > 0 ? a.substring(a.indexOf("/v/") + 3, a.length) : a.substring(a.indexOf("v=") + 2, a.length);
        else if ("vimeo" == i) o = 2, e = a.substring(a.indexOf("vimeo.com/") + 10, a.length);
        else {
            if ("globo" != i) return $("#boxMidiaTarefa").find("input").addClass("ava_field_alert"), !1;
            o = 3;
            var t = a.split("/");
            e = t[t.length - 2]
        }
        var r = $("#idCaminho").val();
        "" != r && void 0 != r || (r = 0);
        var n = $("#idEtapa").val();
        "" != n && void 0 != n || (n = 0);
        var s = $("#strTituloTarefa").val(),
            l = $("#txtDescricaoTarefa").val(),
            c = 0;
        $("#valeNota").attr("checked") && (c = $("#intValorTarefa").val()), $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarMidiaTarefaRapida/",
            data: {
                idCaminho: r,
                idEtapa: n,
                strTarefa: s,
                strDescricao: l,
                intNota: c,
                idMidia: e,
                idTipoMidia: o,
                strLinkVideo: a
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (a) {
                var i = a.split("_");
                $("#idCaminho").val(i[0]), $("#idEtapa").val(i[1]), $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/RetornaPreviewMidia/",
                    data: {
                        tipoVideo: o,
                        idMidia: e
                    },
                    success: function (a) {
                        $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_midia clearfix" id="boxPreviewMidiaTarefa" style="display:none"><a href="javascript:void(0);" onclick="excluirMidiaTarefa()"><span class="fecha_X"></span></a>' + a + "</div>"), $("#boxPreviewMidiaTarefa").slideDown("slow", function () {
                            $("#inserirMidiaTarefa").addClass("disable"), $("#inserirMidiaTarefa").removeAttr("onclick"), $("#boxMidiaTarefa").remove()
                        })
                    },
                    error: function (a) {
                        0 != a.status && $("#container_empilhaextras").prepend("erro ao salvar m�dia na tarefa!")
                    }
                })
            },
            error: function (a) {
                0 != a.status && $("#container_empilhaextras").prepend("erro ao mostrar preview da m�dia!")
            }
        })
    }) : (mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida."), bolVideoProibido = !1, strTipoVideo = "", $("#boxMidiaTarefa").find("input").addClass("ava_field_alert"))
}

function excluirMidiaTarefa() {
    var a = $("#idEtapa").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirMidiaEtapa/" + a,
        success: function () {
            $("#boxPreviewMidiaTarefa").slideUp("slow", function () {
                $("#boxPreviewMidiaTarefa").hide(), $("#inserirMidiaTarefa").removeClass("disable"), $("#inserirMidiaTarefa").attr("onclick", "abrirMidiaTarefa()")
            })
        },
        error: function (a) {
            0 != a.status && $("#boxPreviewMidiaTarefa").prepend("erro ao excluir m�dia da tarefa!")
        }
    })
}

function validarURLVideo(a) {
    var o = "",
        e = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        i = e.exec(a);
    if ("" == a) return $("#boxMidiaTarefa").find("input").addClass("ava_field_alert"), !1;
    if (!i || "" == strTipoVideo) return mostraAlertaTarefa("URL inserida n�o � v�lida."), $("#boxMidiaTarefa").find("input").addClass("ava_field_alert"), !1;
    if (a.indexOf("//youtu") > 0) o = "youtubeEncurtado";
    else if (a.indexOf("youtube.com/watch?v=") > 0) o = "youtube";
    else if (a.indexOf("youtube.com/v/") > 0) o = "youtube";
    else if (a.indexOf("vimeo.com/") > 0) o = "vimeo";
    else if (a.indexOf("video.globo.com/") > 0) {
        if (!(a.indexOf("GIM") > 0)) return mostraAlertaTarefa("URL da globo falta o par�metro ID."), !1;
        o = "globo"
    } else {
        if (!(a.indexOf("globotv.globo.com/") > 0)) return mostraAlertaTarefa("URL inserida n�o � v�lida."), !1;
        var t, r = a.split("/");
        if (t = "/" == a.substring(a.length - 1, a.length) ? 2 : 1, isNaN(r[r.length - t])) return mostraAlertaTarefa("URL da globo falta o par�metro ID."), !1;
        o = "globo"
    }
    return o
}

function mostraAlertaTarefa(a) {
    $("#btEscondidoTarefa").attr("href", "/ava/caminhos/home/Alert/?strMensagem=" + escape(a)), $("#btEscondidoTarefa").click()
}

function abrirLinkTarefa() {
    $("#boxLinkTarefa,#boxMidiaTarefa").remove();
    var a = '<div id="boxLinkTarefa" class="atividades_insert inserir_link bgcolor1" style="display:none">    <input type="text" id="strTituloLink" name="dialogo" placeholder="T&#237;tulo do Link" class="ipt_link ph">    <input type="text" id="strLinkApoio" name="dialogo" placeholder="Insira a URL" class="ipt_link ph">    <a style="cursor: pointer" onclick="inserirLinkTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a></div>';
    $("#container_empilhaextras").prepend(a), $("#strTituloLink").addPlaceholder(), $("#strLinkApoio").addPlaceholder(), $("#boxLinkTarefa").slideDown("slow", function () {
        $("#strTituloLink,#strLinkApoio").focus(function () {
            $(this).removeClass("ava_field_alert"), $("#strTituloLink").limit("100", "")
        })
    }), $(".inserir_link .ipt_link").css("width", "200px"), $("#boxLinkTarefa").css("margin", "0px 0px 0px 0")
}

function inserirLinkTarefa_OLD() {
    var a = $("#strTituloLink").val(),
        o = $("#strLinkApoio").val();
    if ("" == a || "T�tulo do Link" == a) return $("#strTituloLink").addClass("ava_field_alert"), !1;
    if ("" == o || "Insira a URL" == o) return $("#strLinkApoio").addClass("ava_field_alert"), !1;
    o.indexOf("http") < 0 && (o = "http://" + o);
    var e = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi,
        i = e.test(o);
    if (!i) return mostraAlertaTarefa("URL inserida n�o � v�lida."), !1;
    if (o.indexOf(".exe") > 0) return mostraAlertaTarefa("URL inserida n�o � v�lida."), !1;
    var t = $("#idCaminho").val();
    "" != t && void 0 != t || (t = 0);
    var r = $("#idEtapa").val();
    "" != r && void 0 != r || (r = 0);
    var n = $("#strTituloTarefa").val(),
        s = $("#txtDescricaoTarefa").val(),
        l = 0;
    $("#valeNota").attr("checked") && (l = $("#intValorTarefa").val()), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarLinkApoioTarefaRapida/",
        data: {
            idCaminho: t,
            idEtapa: r,
            // strTarefa: n,
            // strDescricao: s,
            strTarefa: n != "" ? n : "Temp",
            strDescricao: s != "" ? s : "Temp",
            intNota: l,
            strTituloApoio: a,
            strLinkApoio: o
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (a) {
            var o = a.split("_");
            $("#idCaminho").val(o[0]), $("#idEtapa").val(o[1]), $("#idRecursoEtapa").val(o[2]), retornaLinksApoio(o[2])
        },
        error: function (a) {
            0 != a.status && $("#container_empilhaextras").prepend("erro ao salvar link da tarefa!")
        }
    })
}

function removerLinkApoio(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirLinkApoio/",
        data: {
            idLink: a
        },
        success: function () {
            retornaLinksApoio($("#idRecursoEtapa").val())
        },
        error: function (a) {
            0 == a.status ? $(".container_inlinks").empty() : $(".container_inlinks").html("erro ao excluir link.")
        }
    })
}

function retornaLinksApoio(a) {
    $("#container_empilhaextras").find("#boxPreviewLinksTarefa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SelecionarLinksEtapa/",
        data: {
            idRecursoEtapa: a
        },
        success: function (a) {
            $("#container_empilhaextras").find("#boxPreviewLinksTarefa").remove(), "object" != typeof a && $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxPreviewLinksTarefa" style="display:none">' + a + "</div>"), $("#boxPreviewLinksTarefa").slideDown("slow", function () {
                $("#boxLinkTarefa").remove()
            })
        },
        error: function (a) {
            0 != a.status && $("#container_empilhaextras").prepend("erro ao retornar link da tarefa!")
        }
    })
}

function abreUploadTarefa() {

    $("#previewImagemTumaTarefa").dialog({
        autoOpen: false,
        height: 680,
        width: 900,
        modal: true,
        resizable: false,
        draggable: false,
        open: function (event, ui) {
            $(this).parent().find(".ui-dialog-titlebar").hide();
            $(this).parent().find(".ui-dialog-buttonpane").hide();
        },
    });

    var o = $("#idCaminho").val(),
        e = $("#idEtapa").val(),
        i = $("#strTituloTarefa").val(),
        t = $("#txtDescricaoTarefa").val(),
        r = 0;
    $("#valeNota").attr("checked") && (r = $("#intValorTarefa").val()), "" != o && void 0 != o || (o = 0), "" != e && void 0 != e || (e = 0), $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        //url: "/AVA/Caminhos/Home/AbreUploadTarefa/?idCaminho=" + o + "&idEtapa=" + e + "&strTarefa=" + i + "&strDescricao=" + t + "&intNota=" + r,
        url: "/AVA/Caminhos/Home/AbreUploadCriarTarefa/?idCaminho=" + o + "&idEtapa=" + e + "&strTarefa=" + i + "&strDescricao=" + t + "&intNota=" + r,
        dataType: "json",
        async: !1,
        success: function (o) {
            var e = (o[0], o[1]),
                i = o[2],
                t = o[3];
            $("#idEtapa").val(e), $("#idCaminho").val(i);
            var r = [];
            if (null != arrayArquivosUpload && void 0 != arrayArquivosUpload && null != arrayArquivosUpload.arrayArquivo && void 0 != arrayArquivosUpload.arrayArquivo && arrayArquivosUpload.arrayArquivo.length > 0)
                for (var n in arrayArquivosUpload.arrayArquivo) r.push(arrayArquivosUpload.arrayArquivo[n].id);
            var s, l = {
                idFerramenta: e,
                idFerramentaTipo: t,
                idsArquivosSelecionados: r.join(",")
            };
            try {
                s = document.createElement("<form name='upload'>")
            } catch (c) {
                s = document.createElement("form"), s.name = "upload"
            }
            for (var d in l)
                if (l.hasOwnProperty(d)) {
                    var u = document.createElement("input");
                    u.type = "hidden", u.name = d, u.value = l[d], s.appendChild(u)
                }
            s.target = "Upload_frame", s.method = "POST", s.action = "/AVA/Upload", document.body.appendChild(s);
            //var p = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            //Modernizr.touch && (p = null), a = window.open("", "Upload", p), a && s.submit()

            //

            var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }
            $("#previewImagemTumaTarefa iframe").append(s);
            s.submit();
            $("#previewImagemTumaTarefa").dialog("open");
            $.fancybox.hideLoading();
        },
        error: function (a, o, e) {
            alert("Erro: " + e + "Status: " + o)
        }
    })
}

var arrayUsuariosAux = new Array,
    arrayGrupoAux = new Array,
    strRetornoHtmlUpload = "",
    arrayArquivosUpload, passouAgendar = 0;
$(function () {
    $("#agendar").live("click", function () {
        console.log("clicou no botao agenda criar tarefa turma");
        bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "btnAgendarTarefa", CustomConfirmConfiguracoes("btnAgendarTarefa", objetoIdMensagemRapida, 0)) : FazAgendar()
    });
});
var quantidadePorPaginaGlobal = 10,
    rodarGlobal = 0,
    idRecursoGlobal = 0,
    idCategoriaGlobal = 0,
    strPesquisaGlobal = "",
    tipoGlobal = 1,
    strEstadosGlobal = "2, 3, 5, 6, 8, 10",
    dtmInicioGlobal = "",
    dtmFimGlobal = "",
    idEstadoGlobal = -1,
    intEnsinoGlobal = 0,
    intDisciplinaGlobal = 0,
    jsonAvaliacaoGlobal = "";
lightBoxAVA($("#btEscondidoTarefa"), {
    autoSize: !1,
    width: 400,
    height: 100,
    type: "ajax",
    helpers: {
        overlay: {
            closeClick: !1,
            locked: !1
        }
    },
    afterShow: function () {
        EscondeOsObjects(), $("#fecharLightBox").click(function () {
            $.fancybox.close()
        })
    },
    beforeClose: function () {
        MostraOsObjects()
    }
});

//codigo universal para todas as pagina de criar tarefa
function inserirAvaliacaoRapido(idAvaliacao) {
    
    console.log("file -> tarefa | func -> inserirAvaliacaoRapido");

    var titulo = $("#strTituloTarefa").val(),
        descricao = $("#txtDescricaoTarefa").val(),
        msg = "",
        flag = true;
    
    if (titulo.length > 0 && descricao.length > 0) {
        msg = "T&#237;tulo e Descri&#231;&#227;o ser&#227;o sobreescritos";
    }
    else if(titulo.length > 0 && descricao.length <= 0){
        msg = "T&#237;tulo ser&#225; sobreescrito";
    }
    else if(titulo.length <= 0 && descricao.length > 0){
        msg = "Descri&#231;&#227;o ser&#225; sobreescrita";
    }
    else{
        flag = false;
    }

    if ($("#entrega_tarefa").attr("checked") && flag == true ) {
        msg += " e a solicita&#231;&#227;o de entrega ser&#225; perdida.\nDeseja continuar?";
        flag = true;
    }
    else if ($("#entrega_tarefa").attr("checked") && flag == false) {
        i += "Sua solicita&#231;&#227;o de entrega ser&#225; perdida.\nDeseja continuar?";
        flag = true;
    }

    if (flag == true && !$("#entrega_tarefa").attr("checked")) {
        msg += ".\nDeseja continuar?"
    }
    
    var intNota = 0;

    if ($("#valeNota").attr("checked")) {
        intNota = $("#intValorTarefa").val();
    }

    if (flag) {
        jConfirm(msg, "", function(i) {
            i && ($(".time_loading").css("display", "block"), $.ajax({
                type: "POST",
                url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + idAvaliacao,
                success: function(i) {
                    titulo = i.Nome;
                    descricao = i.TextoIntrodutorio;
                    intNota = i.ValorTotal;
                    $("#strTituloTarefa").val(titulo);
                    $("#txtDescricaoTarefa").val(descricao);
                    $("#intValorTarefa").val(intNota);
                    $("#valeNota").attr("checked", "true");
                    $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled");
                    $("#solicita_entrega").removeAttr("onclick");
                    $("#solicita_entrega").removeAttr("href");
                    $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked");
                    $("#solicita_entrega").find("i").addClass("entrega_icon_vazio"), $("#bolSolicitaEntrega").val("0");
                    salvarRecursoAvaliacaoHtml(i);
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
                }
            }))
        });
    }
    else{
        ($(".time_loading").css("display", "block"), $.ajax({
            type: "POST",
            url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + idAvaliacao,
            success: function(i) {
                titulo = i.Nome;
                descricao = i.TextoIntrodutorio;
                intNota = i.ValorTotal;
                $("#strTituloTarefa").val(titulo);
                $("#txtDescricaoTarefa").val(descricao);
                $("#intValorTarefa").val(intNota);
                $("#valeNota").attr("checked", "true");
                $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled");
                $("#solicita_entrega").removeAttr("onclick");
                $("#solicita_entrega").removeAttr("href");
                
                $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked");
                $("#solicita_entrega").find("i").addClass("entrega_icon_vazio");
                $("#bolSolicitaEntrega").val("0");
                salvarRecursoAvaliacaoHtml(i);
            },
            error: function(a) {
                0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
            }
        }));
    }
}

function inserirRecursoRapido(idRecurso, idPublicacao, idAvaliacao) {
    console.log("file -> tarefa | func -> inserirRecursoRapido");

    if ($("#recursoRapido").find("img").attr("src") != undefined) {
        if ($("#recursoRapido").attr("data-value") == "1") {
            $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");
            $("#strTituloTarefa").val("");
            $("#txtDescricaoTarefa").val("");
            $("#intValorTarefa").val("");
            $("#valeNota").removeAttr("checked")
        }
    }

    $("#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");

    $(".time_loading").css("display", "block");

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoJSON/",
        data: {
            idPublicacao: idPublicacao,
            idAvaliacao: idAvaliacao,
            idRecurso : idRecurso
        },
        success: function (data) {
            salvarRecursoPublicacaoHtml(data);
        },
        error: function (q) {
            if (q.status != 0) {
                console.debug("erro ao retornar recurso escolhido")
            }
        }
    });         
}

function salvarRecursoAvaliacaoHtml(recursoJSON) {

    dadosTarefa.recurso = {
        idPublicacao : 0,
        idAvaliacao : recursoJSON.Id,
        idRecurso : 1,
        nome : recursoJSON.Nome,
        descricao: recursoJSON.TextoIntrodutorio,
        pOrdem : 0,
        sOrdem : 0,
        intValor : recursoJSON.ValorTotal
    }

    $("#recursoRapido").remove();
    $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>');
    $.fancybox.close();
    $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Substituir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Substituir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso");
    $(".tooltip").each(function() {
        "Inserir recurso" === $(this).text() && $(this).html("Substituir recurso")
    })

    var strHtml = '<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido" data-value="1">'+
                    '<h5>Recurso escolhido</h5>'+
                    '<a href="javascript:void(0);" onclick="excluirRecursoRapidoHtml()"><span class="fecha_X"></span></a>'+
                    '<img width="55" height="55" alt="Avaliações" src="/ava/StaticContent/Common/img/recursos/Avaliacoes_55x55.jpg">'+
                    '<div class="txt_recurso">'+
                        '<strong>'+recursoJSON.Nome+'</strong>'+
                        '<p></p>'+
                    '</div>'+
                '</div>'

    $("#container_empilhaextras #recursoRapido").html(strHtml);
}

function salvarRecursoPublicacaoHtml(recursoJSON) {
    
    dadosTarefa.recurso = {
        idPublicacao : recursoJSON.ri.idPublicacao,
        idAvaliacao : 0,
        idRecurso : recursoJSON.ri.idRecurso,
        nome : recursoJSON.ri.strTitulo,
        descricao: recursoJSON.ri.strDescricao,
        pOrdem : 0,
        sOrdem : 0,
        intValor : 0
    }

    $("#recursoRapido").remove();
    $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>');
    $.fancybox.close();
    $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Substituir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Substituir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso");
    $(".tooltip").each(function() {
        "Inserir recurso" === $(this).text() && $(this).html("Substituir recurso")
    });

    var strHtml = ''+
    '<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido" data-value="'+recursoJSON.ri.idRecurso+'">'+
        '<h5>Recurso escolhido</h5>'+
        '<a href="javascript:void(0);" onclick="excluirRecursoRapidoHtml()"><span class="fecha_X"></span></a>'+
        '<img width="55" height="55" alt="'+recursoJSON.ri.strRecurso+'" src="'+recursoJSON.ri.strThumbRecurso+'">'+
        '<div class="txt_recurso">'+
            '<strong>'+recursoJSON.ri.strTitulo+'</strong>'+
            '<p>'+recursoJSON.ri.strDescricao+'</p>';

        if (recursoJSON.ri.idCategoria == 159) {
            strHtml += '<span>'+
                        'Iniciar em: <select name="paginacaoCM" id="paginacaoCM" onchange="salvarPaginasCMHTML();">';
            $.each(recursoJSON.ri.paginasCM, function (index, value) {
                if (index == 0) {
                    strHtml += '<option selected="selected" value="'+value.iVersaoCM+';'+value.intOrdem+';'+value.intOrdem2+'" url="'+value.url+'" urlPai="'+value.urlPai+'" pOrdem="'+value.intOrdem+'" sOrdem="'+value.intOrdem2+'" iVersao="'+value.iVersaoCM+'" idPublicacao="'+value.idPublicacao+'">'+value.strTitulo+'</option>';
                }
                else{
                    strHtml += '<option value="'+value.iVersaoCM+';'+value.intOrdem+';'+value.intOrdem2+'" url="'+value.url+'" urlPai="'+value.urlPai+'" pOrdem="'+value.intOrdem+'" sOrdem="'+value.intOrdem2+'" iVersao="'+value.iVersaoCM+'" idPublicacao="'+value.idPublicacao+'">'+value.strTitulo+'</option>';
                }
                
            });
            strHtml += '</select>'+
                        ' <a href="#VisualizarCM" class="bt_normal" onclick="visualizarCM(); return false;">Visualizar</a>'+
                    '</span>';    
        }

    strHtml += '</div>'+
    '</div>';

    $("#container_empilhaextras #recursoRapido").html(strHtml);
}

function excluirRecursoRapidoHtml() {
    if ($("#recursoRapido").attr("data-value") == "1") {
        $("#strTituloTarefa").val("");
        $("#txtDescricaoTarefa").val("");
        $("#intValorTarefa").val("");
        $("#valeNota").removeAttr("checked")
    }
    
    $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Inserir recurso");
    $(".tooltip").first().text("Inserir recurso");
    $("#recursoRapido").slideUp("slow", function () {
        $("#recursoRapido").remove();
        $("#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa, #entrega_tarefa").removeAttr("disabled");
        $("#solicita_entrega").attr("onclick", "trocaStatusSolicitacaoEntrega()");
        $("#solicita_entrega").attr("href", "javascript: void(0);")
    })

    // limpa objeto
    dadosTarefa.recurso = {
        idPublicacao : 0,
        idAvaliacao : 0,
        idRecurso : 0,
        nome : "",
        descricao: "",
        pOrdem : 0,
        sOrdem : 0,
        intValor : 0
    }

    $("#container_empilhaextras #recursoRapido").html("");
    $("#recursoRapido").remove();
}

function salvarPaginasCMHTML(){
    var a = $("#paginacaoCM").find("option:selected"),
        o = $("#idEtapa");
    dadosTarefa.recurso.pOrdem = a.attr("pOrdem");
    dadosTarefa.recurso.sOrdem = a.attr("sOrdem");
}

function inserirLinkTarefa() {

    var b = $("#strTituloLink").val();
    var f = $("#strLinkApoio").val();

    if (b == "" || b == "Título do Link") {
        $("#strTituloLink").addClass("ava_field_alert");
        return false;
    } 
    else 
    {
        if (f == "" || f == "Insira a URL") {
            $("#strLinkApoio").addClass("ava_field_alert");
            return false;
        }
    }

    if (f.indexOf("http") < 0) {
        f = "http://" + f
    }
    var d = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?((\/|([\w#!:.?+=&%@!\-]))(\.))+([\w#!:.?+=&%@!\-]){2,}(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var h = d.exec(f);
    if (!h) {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        return false
    }
    if (f.indexOf(".exe") > 0) {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        return false
    }
    var g = $("#idCaminho").val();
    if (g == "" || g == undefined) {
        g = 0
    }
    var e = $("#idEtapa").val();
    if (e == "" || e == undefined) {
        e = 0
    }
    var k = $("#strTituloTarefa").val();
    var j = $("#txtDescricaoTarefa").val();
    k = $("<div />").text(k).html();
    j = $("<div />").text(j).html();
    var c = 0;
    if ($("#valeNota").attr("checked")) {
        c = $("#intValorTarefa").val()
    }

    var ix = dadosTarefa.links.push(
        {
            strTituloApoio: b,
            strLinkApoio: f,
            bolExcluido: 0,
            bolNew:1,
            index : 0
        }
    );

    console.log(ix);

    dadosTarefa.links[ix-1].index = ix-1;

    ExibiLinksApoio();

    $("#boxPreviewLinksTarefa").slideDown("slow", function () {
        $("#boxLinkTarefa").remove();
    });
}

function ExibiLinksApoio() {

    $("#container_empilhaextras").find("#boxPreviewLinksTarefa").remove();
    
    var strHtml = ' <h5>Links de apoio</h5>';
    var countAtivo = 0;
    $.each(dadosTarefa.links, function (index, value) {

        if (value.bolExcluido == 0) {
            countAtivo++;
            strHtml += '<div class="the_insertedLink">'+
                            '<a target="_blank" href="'+value.strLinkApoio+'" class="umlink"><span></span>'+value.strTituloApoio+' </a>'+
                            '<a href="javascript:void(0);" class="bt_normal " onclick="removerLinkApoioHtml('+index+')"><strong>x</strong></a>'+
                        '</div>';
        }

    });

    $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxPreviewLinksTarefa" style="display:">' + strHtml + "</div>");

    if (countAtivo == 0) {
        $("#boxPreviewLinksTarefa").remove();
    }
}

function removerLinkApoioHtml(index) {
    dadosTarefa.links[index].bolExcluido = 1;
    ExibiLinksApoio();
}

function inserirMidiaTarefa() {

    var f = $("#boxMidiaTarefa").find("input").val();
    var c = 0;
    var b = "";
    var e = "";

    if (f.indexOf("http://") == -1 && f.indexOf("https://") == -1) {
        f = "http://" + f;
        $("#boxMidiaTarefa").find("input").val(f)
    }

    if (f.indexOf("#t=") > 1 || f.indexOf("&t=") > 1 || f.indexOf("&amp;t=") > 1) {
        e = f.split("t=");
        if (e.length > 0) {
            f = e[0].substring(0, (e[0].length - 1));
            e = e[1]
        } else {
            e = ""
        }
    }

    var d = retornaMatchVideo(f);
    if (d) {
        d.always(function () {
            if (bolVideoProibido && strTipoVideo == "") {
                mostraAlertaTarefa("Este vídeo tem sua incorporação proibida pelo seu proprietário e não pode ser inserido.");
                bolVideoProibido = false;
                strTipoVideo = "";
                $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
                return false
            } else {
                var k = validarURLVideo(f);
                if (e != "") {
                    f += "#t=" + e
                }
                if (k == "youtubeEncurtado") {
                    c = 1;
                    b = f.substring(f.indexOf("be/") + 3, f.length)
                } else {
                    if (k == "youtube") {
                        c = 1;
                        if (f.indexOf("&") > 0) {
                            b = f.substring(f.indexOf("v=") + 2, f.indexOf("&"))
                        } else {
                            if (f.indexOf("/v/") > 0) {
                                b = f.substring(f.indexOf("/v/") + 3, f.length)
                            } else {
                                b = f.substring(f.indexOf("v=") + 2, f.length)
                            }
                        }
                    } else {
                        if (k == "vimeo") {
                            c = 2;
                            b = f.substring(f.indexOf("vimeo.com/") + 10, f.length)
                        } else {
                            if (k == "globo") {
                                c = 3;
                                var n = f.split("/");
                                b = n[n.length - 2]
                            } else {
                                $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
                                return false
                            }
                        }
                    }
                }
                var h = $("#idCaminho").val();
                if (h == "" || h == undefined) {
                    h = 0
                }
                var j = $("#idEtapa").val();
                if (j == "" || j == undefined) {
                    j = 0
                }
                var m = $("#strTituloTarefa").val();
                var g = $("#txtDescricaoTarefa").val();
                m = $("<div />").text(m).html();
                g = $("<div />").text(g).html();
                var l = 0;
                if ($("#valeNota").attr("checked")) {
                    l = $("#intValorTarefa").val()
                }

                data = {
                    idCaminho: h,
                    idEtapa: j,
                    strTarefa: m,
                    strDescricao: g,
                    intNota: l,
                    idMidia: b,
                    idTipoMidia: c,
                    strLinkVideo: f
                }

                dadosTarefa.midia.idMidia = b;
                dadosTarefa.midia.strLinkVideo = f;
                dadosTarefa.midia.idTipoMidia = c;
                var larguraVideo = "210";
                var alturaVideo = "158";
                var embed = "";
                var tempo = "";
                var idMidia = b;
                switch (c)
                {
                    case 1:
                        {//Youtube 
                            embed = "<iframe id=\"iframeTarefaId\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" src=\"http://www.youtube.com/embed/" + idMidia + "?autoplay=0&wmode=transparent" + tempo + "\" frameborder=\"0\" allowfullscreen></iframe>";
                        } break;
                    case 2:
                        { //Vimeo
                            embed = "<iframe id=\"iframeTarefaId\" class=\"iframeVideoVimeo\" src=\"http://player.vimeo.com/video/" + idMidia + tempo + "\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
                        } break;
                    case 3:
                        { //Globo
                            embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" data=\"http://s.videos.globo.com/p2/player.swf\" type=\"application/x-shockwave-flash\"><param value=\"true\" name=\"allowFullScreen\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /></object>";
                        } break;
                }

                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_midia clearfix" id="boxPreviewMidiaTarefa" style="display:none"><h5>V&iacute;deo</h5><a href="javascript:void(0);" onclick="excluirMidiaTarefaHtml()"><span class="fecha_X"></span></a>' + embed + "</div>");
                $(".iframeVideoVimeo", "#container_empilhaextras").on("load", function () {
                    var s = $f(this);
                    var r = false;
                    s.api("pause");
                    s.addEvent("ready", function () {
                        s.addEvent("play", function () {
                            if (!r) {
                                r = true;
                                s.api("pause")
                            }
                        })
                    })
                });

                $("#boxPreviewMidiaTarefa").slideDown("slow", function () {
                    $("#inserirMidiaTarefa").addClass("disable");
                    $("#inserirMidiaTarefa").removeAttr("onclick");
                    $("#boxMidiaTarefa").remove()
                });
            }
        });
    } else {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        bolVideoProibido = false;
        strTipoVideo = "";
        $("#boxMidiaTarefa").find("input").addClass("ava_field_alert")
    }
}

function excluirMidiaTarefaHtml() {

    dadosTarefa.midia.idMidia = "";
    dadosTarefa.midia.strLinkVideo = "";
    dadosTarefa.midia.idTipoMidia = 0;

    $("#boxPreviewMidiaTarefa").slideUp("slow", function () {
        $("#boxPreviewMidiaTarefa").hide();
        $("#inserirMidiaTarefa").removeClass("disable");
        $("#inserirMidiaTarefa").attr("onclick", "abrirMidiaTarefa()")
    });
}

function SalvarCaminhoCriarTarefaGlobal() {
    
    var enviadoParaTurma = true;

    $("#strTituloTarefa").val($("#strTituloTarefa").val().trim());
    $("#txtDescricaoTarefa").val($("#txtDescricaoTarefa").val().trim());

    var strTitulo = $("#strTituloTarefa").val();
    var strDescricao = $("#txtDescricaoTarefa").val();

    strTitulo = $("<div />").text(strTitulo).html();
    strDescricao = $("<div />").text(strDescricao).html();

    if (strTitulo == "" || strTitulo == "Título da Tarefa") {
        ShowBtnAgendar(true);
        $("#strTituloTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();

        $("html, body").animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);

        $("#atividades_box .strTituloTarefa").addClass("ava_field_alert");
        $("#strTituloTarefa").addClass('ava_field_alert');
        
        return false;
    } 
    else if (strDescricao == "") {
        ShowBtnAgendar(true);
        $("#txtDescricaoTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();

        $("html, body").animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);

        $("#txtDescricaoTarefa").addClass('ava_field_alert');
        return false;
    } 
    else {
        $("#strTituloTarefa").removeClass("alerta");
        $("#txtDescricaoTarefa").removeClass("alerta");
        $("#feedErroTituloTarefa").hide();
    }

    var intNota = 0;

    if (!$("#intValorTarefa").attr("disabled")) {
        intNota = $("#intValorTarefa").val().replace(".", ",");

        if (intNota == "" || intNota == "Valor") {

            $("html, body").animate({
                scrollTop: $("#intValorTarefa").offset().top - 200
            }, 800);

            $("#intValorTarefa").addClass("alerta");
            ShowBtnAgendar(true);
            return false;
        } 
        else {
            $("#intValorTarefa").removeClass("alerta")
        }
    }


    var privadoCompartilhado = 2;
    $("input:radio[name=rTipo_1]").each(function () {
        if ($(this).is(":checked")) {
            privadoCompartilhado = parseInt($(this).val())
        }
    });

    var arrayFiles = new Array();
    var f = arrayArquivosUpload;
    var arrayArquivos = null;

    if (arrayArquivosUpload == undefined || arrayArquivosUpload == "" || arrayArquivosUpload == null) {
        arrayArquivos = null;
    } 
    else {

        for (var e = 0; e < arrayArquivosUpload.arrayArquivo.length; e++) {
            arrayFiles.push(arrayArquivosUpload.arrayArquivo[e].id)
        }

        arrayArquivos = {
            idFerramentaTipo: f.idFerramentaTipo !=  undefined ? parseInt(f.idFerramentaTipo) : 0,
            idFerramenta: f.idFerramenta != undefined ? parseInt(f.idFerramenta) : 0,
            arquivos: arrayFiles
        }
    }

    var idTurmas = [];
    var listaGrupo = [];

    if (arrayGrupoAux.length > 0) {
        for (var i = 0; i < arrayGrupoAux[0].usuarios.length; i++) {
            var objeto = {};
            objeto.idTurma = arrayGrupoAux[0].usuarios[i].idTurma;
            objeto.idGrupo = arrayGrupoAux[0].usuarios[i].idGrupo;
            listaGrupo.push(objeto);
            var idTurma = arrayGrupoAux[0].usuarios[i].idTurma;
            idTurmas.push(idTurma);
        }
    }

    
    var idGrupo = 0;
    var idAgendamentoUsuario = 0;
    var dataInicio = $("#dataInicio").val();
    var dataFim = $("#dataFim").val();

    $horasemTratamento = $("#horaInicio").val();
    $minutosServ = $("#minutosServidor").val();

    var array = $horasemTratamento.split(":");
    var horas = array[0];
    var minutos = array[1];
    var intMinServidor = parseInt($minutosServ);
    var minutosInt = parseInt(array[1]) + 1;
    var MinutoString = minutosInt.toString();

    if(minutos == intMinServidor){
        if(minutosInt<10){
            var horaInicio = horas + ":"+ "0"+MinutoString;
        }
        else {
            var horaInicio =  horas + ":"+MinutoString;
        }
    }
    else {
        var horaInicio = horas + ":" + minutos;
    }

    var horaFim = $("#horaFim").val();

    var possueAluno = false;
    var grupos = [];
    var gruposNome = [];
    var turmas = [];
    var txtDisponivel = ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;
    var txtInput = strTitulo + txtDisponivel;
    arrayUsuariosAux.forEach(element => {
        if (element.idGrupo) {
            turmas.push(element);
        }
    });

    for (var i = 0; i < arrayUsuariosAux.length; i++) {

        if (arrayUsuariosAux[i].idUsuario == 0) {
            grupos.push(arrayUsuariosAux[i].idGrupo);
            gruposNome.push(arrayUsuariosAux[i].strNome);
        }
        else {
            if (turmas.filter(a => a.idTurma == arrayUsuariosAux[i].idTurma).length == 0) {
                possueAluno = true;    
            }
        }
    }

    for (var i = 0; i < arrayGrupoAux.length; i++) {
        for (var x = 0; x < arrayGrupoAux[i].usuarios.length; x++) {
            if (arrayGrupoAux[i].usuarios[x].isTurma) {
                grupos.push(arrayGrupoAux[i].usuarios[x].idGrupo);
                gruposNome.push(arrayGrupoAux[i].usuarios[x].strNome);
            }
            else {
                // arrayUsuariosAux.push(arrayGrupoAux[i].usuarios[x]);
                // possueAluno = true;
                if (turmas.filter(a => a.idTurma == arrayUsuariosAux[i].idTurma).length == 0) {
                    arrayUsuariosAux.push(arrayGrupoAux[i].usuarios[x]);
                    possueAluno = true;    
                }
            }
        }
    }

    var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;

    if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
        solicitacaoArquivo = true;
    }

    if ($("#trf_devolutiva").hasClass("ativo")) {
        solicitacaoArquivo = true;
    }
    var arrayUsuariosAuxTemp = [];
    var listaUsuario = [];

    var tags = "";
    $(".ava_tags li").each(function () {
        tags += $(this).text().substring(0, $(this).text().length) + ";"
    });

    for (let index = 0; index < turmas.length; index++) {
        const element = turmas[index];
        arrayUsuariosAux.filter(a => a.idTurma == element.idTurma && a.idGrupo == undefined).forEach(element => {
            listaUsuario.push(element);
        });
    }

    arrayUsuariosAux.filter(a => a.idGrupo == undefined).forEach(e => {
        if (listaUsuario.filter(f => f.idUsuario == e.idUsuario).length == 0) {
            arrayUsuariosAuxTemp.push({
                idGrupo: 0,
                idTurma: e.idTurma,
                idUsuario: e.idUsuario,
                strApelido: e.strApelido,
                strFoto: e.strFoto,
                strNome: e.strNome
            });
        }
    });

    dadosTarefa.tags = tags;
    dadosTarefa.titulo = $("#strTituloTarefa").val();
    dadosTarefa.descricao = $("#txtDescricaoTarefa").val();
    dadosTarefa.intNota = intNota;
    dadosTarefa.solicitarEntrega = solicitacaoArquivo;
    dadosTarefa.privadoCompartilhado = privadoCompartilhado;
    dadosTarefa.turmasGrupos = turmas;
    dadosTarefa.alunos = arrayUsuariosAuxTemp;
    dadosTarefa.possuiAluno = possueAluno;
    dadosTarefa.possuiTurmas = turmas.length > 0 ? true : false;
    dadosTarefa.dataInicial = dataInicio
    dadosTarefa.dataFinal = dataFim;
    dadosTarefa.horaInicio = horaInicio
    dadosTarefa.horaFim = horaFim;
    dadosTarefa.idUsuario = $("#agendarTarefa").data("idusuario");
    if (arrayArquivos == null) {
        dadosTarefa.material = {
            idFerramentaTipo: 0,
            idFerramenta: 0,
            arquivos: []
        }
    }
    else{
        dadosTarefa.material = arrayArquivos;
    }
    
    dadosTarefa.complemento = txtInput;

    dadosTarefa.idCaminho = $("#idCaminho").val() == "" ? 0 : $("#idCaminho").val();
    dadosTarefa.idEtapa = $("#idEtapa").val() == "" ? 0 : $("#idEtapa").val();
    dadosTarefa.strDescricao = $("#txtDescricaoTarefa").val();

    dadosTarefa.disciplinaSelecionada = 0;
    var idGrupo = $("#idGrupo").val(); 
    dadosTarefa.idGrupo = parseInt(idGrupo);

    var valor = $("#idMateria").val();

    if (valor == "0" || valor == undefined) {
        dadosTarefa.disciplinaSelecionada = 0;
    }
    else {
        dadosTarefa.disciplinaSelecionada = valor;
    }

    var retorno = validaDataAgendamento(dataInicio, dataFim, horaInicio, horaFim);
    if (retorno == "ok") {
        console.log(dadosTarefa);

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminhoCriarTarefaGlobal",
            data: JSON.stringify(dadosTarefa),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $.fancybox.close();

                // ShowBtnAgendar(true);
                // return;

                if (data.msg == "") {
                    ShowToast({
                        type: "success", 
                        title : "Seus alunos j&aacute; podem visualizar esta tarefa.", 
                        desc : "Tarefa publicada com sucesso na(s) turma(s)!", 
                        callback: function(){
                            carregaTimeLineGrupo(0);
                            $('.actions[pos=1]').click();
                            $.ajax({
                                url: "/AVA/Barras/Home/ListaAtividadesGrupo",
                                data: {
                                    strLinkGrupo: idUsuarioPublico
                                },
                                async: !0,
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (a) {
                
                                },
                                error: function () {
                                    $("#lista_agendamento").html("erro ao listar atividades do professor.")
                                }
                            });
                            ShowBtnAgendar(true);
                        }
                    });

                    dadosTarefa = {
                        recurso : {
                            idPublicacao : 0,
                            idAvaliacao : 0,
                            idRecurso : 0,
                            nome : "",
                            descricao: "",
                            pOrdem : 0,
                            sOrdem : 0,
                            intValor : 0
                        },
                        midia : {
                            idMidia : "",
                            strLinkVideo: "",
                            idTipoMidia : 0
                        },
                        links : [],
                        tags : [],
                        titulo : "",
                        descricao : "",
                        complemento : "",
                        intNota : 0,
                        idGrupo : 0,
                        solicitarEntrega: 0,
                        privadoCompartilhado : 2,
                        turmasGrupos : [],
                        alunos : [],
                        dataInicial : "",
                        dataFinal : "",
                        horaInicio : "",
                        horaFim : "",
                        idUsuario : 0,
                        material : {
                            idFerramentaTipo: 0,
                            idFerramenta: 0,
                            arquivos: []
                        }
                    };

                }
                else{
                    ShowToast({
                        type: "success", 
                        title : "Algum processo deu errado, tente novamente mais tarde.", 
                        desc : "Erro ao publicar tarefa", 
                        callback: function(){
    
                            location.href = "/ava/caminhos/home/index/1";
                        }
                    });
                }
            },
            error: function (i) {
                if (i.status != 0) {
                    console.debug("erro ao retornar feed user!")
                }
            }
        });

    } 
    else {
        ShowBtnAgendar(true);
        if (retorno == "erro") {
            return false
        } 
        else {
            mostraAlertaTarefa(retorno)
        }
    }
}