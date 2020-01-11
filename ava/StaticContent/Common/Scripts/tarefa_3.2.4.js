var quantidadePorPaginaGlobal = 10;
var rodarGlobal = 0;
var idRecursoGlobal = 0;
var idCategoriaGlobal = 0;
var strPesquisaGlobal = "";
var tipoGlobal = 1;
var strEstadosGlobal = "2, 3, 5, 6, 8, 10";
var dtmInicioGlobal = "";
var dtmFimGlobal = "";
var idEstadoGlobal = -1;
var intEnsinoGlobal = 0;
var intDisciplinaGlobal = 0;
var idUsuarioTarefa = 0;
var passouAgendar = 0;
var arrayUsuariosAux = new Array();
var arrayGrupoAux = new Array();
var ID_FERRAMENTA_TIPO_TAREFA = 17;
var idRecurso = 0;
var idPublicacao = 0;
var idAvaliacao = 0;
var idEtapa = 0;
var strTituloRecurso = "";
var strDescricaoRecurso = "";
var intValorRecurso = 0;
var Materias = null;
var onclickAgendou = false;
var dadosTarefaEditar = {};
var qtdAgendamentos = 0;
var actionAgendar = "criar";
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

var avaSeletor = null;

$(function () {
    // $("#seletorTarefa").AvaSelector({
        //     bolAluno: true,
        //     bolProfessor: false,
        //     bolLajota: true,
        //     bolSeguidores: false,
        //     bolEscondeTituloExterno: true,
        //     bolSeletorFinalizar: false,
        //     bolCoordenador: false,
        //     botaoConclusao: $("#agendarTarefa"),
        //     btnTextoBotaoConclusaoSeletor: "Adicionar",
        //     strTitulo: "Agendar para:",
        //     insertLajota: function (b, c) {
        //         arrayUsuarioAux = b;
        //         arrayEntidadeAux = c
        //     },
        //     usuarioGrupoAdicionado: function (b, e, d) {
        //         arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
        //         arrayGrupoAux.splice(0, arrayGrupoAux.length);
        //         for (var c = 0; c < b.length; c++) {
        //             arrayUsuariosAux.push(b[c])
        //         }
        //         for (var c = 0; c < e.length; c++) {
        //             arrayGrupoAux.push(e[c])
        //         }
        //         if (arrayUsuariosAux.length > 0 || arrayGrupoAux.length > 0) { }
        //     }
        // });

    //ListarDisciplinas("id_materia_turma");

    actionAgendar = $(this).attr('data-action');

    $("#agendarTarefa").click(function () {
        $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");
        $("#agendarTarefa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");
        
        var b = $("#agendarTarefa").data("idusuario");
        qtdAgendamentos = parseInt($("#qtdAgendamentos").val());
        actionAgendar = $(this).attr('data-action');

        if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
            $("#seletorTarefa").AvaSelector("focus");
            BindAgendar();
            mostraAlertaTarefa("Adicione pessoas para agendar");
            return false;
        }
        if (!onclickAgendou) {
            setTimeout(() => {
                //salvarTarefaAvancada(b);
                if (actionAgendar == "criar") {
                    console.log('criar tarefa');
                    SalvarCaminhoCriarTarefaGlobal();   
                }
                else if (actionAgendar == "duplicar") {
                    $("#idCaminho").val('0');
                    $("#idEtapa").val('0');

                    console.log('duplicar tarefa');
                    SalvarCaminhoCriarTarefaGlobal();
                }
                else if(qtdAgendamentos > 0 && actionAgendar == "editar"){
                    console.log('edita tudo, inclusive agendamento');
                    SalvarCaminhoCriarTarefaGlobal();
                }
                else if (actionAgendar == "editar") {
                    console.log('somente editar, se enquadra na biblioteca infantil/fundamental e medio');
                    SalvarCaminhoCriarTarefaGlobal();
                }
            }, 200);    
        }
        
    });

    $("#dataInicio").setMask("date");
    $("#dataFim").setMask("date");
    $("#horaInicio").setMask("29:59").timepicker({
        myPosition: "right top",
        atPosition: "right bottom"
    });
    $("#horaFim").setMask("29:59").timepicker({
        myPosition: "right top",
        atPosition: "right bottom"
    });
    montaCampoData("#dataInicio", "#dataFim");

    $("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function () {
        $(this).removeClass("ava_field_alert")
    });
});

function getDataHoraCorrente() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano4 = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    var str_data = dia + '/' + (mes + 1) + '/' + ano4 + ' ' + hora + ':' + min;
    console.log(str_data);

    return str_data;
}

function mudarDisciplinas(b) {
    var c;
    if (b == 1010101) {
        c = '<option value="0" selected="selected">Todas as disciplinas</option><option value="6">Ciências</option><option value="8">Educação Física</option><option value="11">Geografia</option><option value="12">História</option><option value="73">Língua Inglesa</option><option value="15">Matemática</option><option value="16">Língua Portuguesa</option>';
        $("#idDisciplina").empty().html(c).removeAttr("disabled")
    } else {
        if (b == 1010201) {
            c = '<option value="0" selected="selected">Todas as disciplinas</option> <option value="6">Ciências</option><option value="8">Educação Física</option><option value="10">Física</option><option value="11">Geografia</option><option value="12">História</option><option value="73">Língua Inglesa</option><option value="15">Matemática</option><option value="16">Língua Portuguesa</option><option value="19">Química</option>';
            $("#idDisciplina").empty().html(c).removeAttr("disabled")
        } else {
            if (b == 1020001) {
                c = '<option value="0" selected="selected">Todas as disciplinas</option>  <option value="7">Biologia</option> <option value="8">Educação Física</option><option value="10">Física</option> <option value="11">Geografia</option> <option value="12">História</option> <option value="73">Língua Inglesa</option> <option value="15">Matemática</option> <option value="16">Língua Portuguesa</option> <option value="19">Química</option>';
                $("#idDisciplina").empty().html(c).removeAttr("disabled")
            } else {
                c = '<option value="0" selected="selected">Todas as disciplinas</option>';
                $("#idDisciplina").empty().html(c).attr("disabled", "disabled")
            }
        }
    }
}

// :::OLD
    // function salvarTarefaAvancadaOld(k) { // claudemir
    //     var c = k;
    //     var e = $("#strTituloTarefa").val();
    //     var j = $("#txtDescricaoTarefa").val();
    //     e = $("<div />").text(e).html();
    //     j = $("<div />").text(j).html();
    //     if (e == "" || e == "Escreva aqui um título para o seu caminho de aprendizagem") {
    //         $("#strTituloTarefa").addClass("ava_field_alert");
    //         $("html, body").animate({
    //             scrollTop: $(".atividades_box").offset().top - 60
    //         }, 1000);
    //         return false
    //     }
    //     if (j.length > 800) {
    //         $("#txtDescricaoTarefa").addClass("ava_field_alert");
    //         $("html, body").animate({
    //             scrollTop: $(".atividades_box").offset().top - 60
    //         }, 1000);
    //         return false
    //     }
    //     var b = 2;
    //     $("input:radio[name=rTipo_1]").each(function () {
    //         if ($(this).is(":checked")) {
    //             b = parseInt($(this).val())
    //         }
    //     });
    //     var m = "";
    //     $(".ava_tags li").each(function () {
    //         m += $(this).text().substring(0, $(this).text().length) + ";"
    //     });
    //     $("#boxBtnSalvarTarefaRapida").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando...").attr("style", "float: right;padding:38px");
    //     var d = $("#idCaminho").val();
    //     var f = new Array();
    //     var h = arrayArquivosUpload;
    //     if (h == undefined || h == "" || h == null) {
    //         h = "";
    //         var l = null
    //     } else {
    //         for (var g = 0; g < h.arrayArquivo.length; g++) {
    //             f.push(h.arrayArquivo[g].id)
    //         }
    //         var l = {
    //             idFerramentaTipo: h.idFerramentaTipo,
    //             idFerramenta: h.idFerramenta,
    //             arquivos: f
    //         }
    //     }

    //     console.log("#agendarTarefa agenda.js");
    //     var b = $("#agendarTarefa").data("idusuario");
    //     console.log("idusuario = " + b);
    //     if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
    //         $("#seletorTarefa").AvaSelector("focus");
    //         mostraAlertaTarefa("Adicione pessoas para agendar");
    //         return false
    //     }

    //     $.ajax({
    //         type: "POST",
    //         async: false,
    //         url: "/AVA/Caminhos/Home/SalvarCaminho/",
    //         data: {
    //             idRota: d,
    //             idUsuario: k,
    //             strTitulo: e,
    //             strDescricao: j,
    //             intStatus: b,
    //             strTags: m,
    //             intTipo: 2,
    //             json: JSON.stringify(l),
    //             userturma: 1
    //         },
    //         contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    //         success: function (n) {
    //             $("#idCaminho").val(n);
    //             var o = false;
    //             if ($("#bolSolicitaEntrega").val() == 1) {
    //                 o = true
    //             }
    //             salvaSolicitacaoEntrega(o);

    //         },
    //         error: function (n) {
    //             if (n.status != 0) {
    //                 console.debug("erro ao salvar tarefa!")
    //             }
    //         }
    //     });
    //     $("#boxBtnSalvarTarefaRapida").html('<a href="javascript:void(0);" class="large awesome awesome-color frmr30" onclick="salvarTarefaAvancada(' + c + ')">Salvar <span class="awe_icons"></span></a>').removeAttr("style");
    //     return true
    // }

function validaDataAgendamento(a, o, e, i) {
    var t = "ok";
    var dataAux = 0;
    if ("" == a) 
        $("#dataInicio").addClass("ava_field_alert"), t = "erro";
    else if 
        ("" == o) $("#dataFim").addClass("ava_field_alert"), t = "erro";
    else if 
        ("" == e) $("#horaInicio").addClass("ava_field_alert"), t = "erro";
    else if 
        ("" == i) $("#horaFim").addClass("ava_field_alert"), t = "erro";
    else {
        var r = a.split("/"),
            dataInicio = r[2] + r[1] + r[0],
            s = o.split("/"),
            dataFim = s[2] + s[1] + s[0],
            e = e.split(":"),
            dataAux =  parseInt(e[1]),
            horaInicio = e[0] +  dataAux,
            i = i.split(":"),
            horaFinal = i[0] + i[1],
            u = $("#dtmAtualServidor").val().split(" "),
            p = u[0].split("/"),
            m = u[1].split(":"),
            dataAtual  = p[2] + p[1] + p[0],
            horaServidor = m[0] +  (parseInt( m[1] ) + 1),
            Aux2 = (parseInt( m[1] ) -1),
            horaServidor = m[0] + Aux2;
    
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

    return t;
}

function salvarTarefaAvancada(k) {
    var enviadoParaTurma = true;

    $("#strTituloTarefa").val($("#strTituloTarefa").val().trim());
    $("#txtDescricaoTarefa").val($("#txtDescricaoTarefa").val().trim());

    var strTitulo = $("#strTituloTarefa").val();
    var strDescricao = $("#txtDescricaoTarefa").val();

    strTitulo = $("<div />").text(strTitulo).html();
    strDescricao = $("<div />").text(strDescricao).html();

    if (strTitulo == "" || strTitulo == "Título da Tarefa") {
        BindAgendar();
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
        $("#txtDescricaoTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();

        $("html, body").animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);

        $("#txtDescricaoTarefa").addClass('ava_field_alert');
        BindAgendar();
        return false;
    } 
    else {
        $("#strTituloTarefa").removeClass("alerta");
        $("#txtDescricaoTarefa").removeClass("alerta");
        $("#feedErroTituloTarefa").hide()
    }

    if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
        
        $("#feed_erro_tarefa").show();
        $("#seletorMuralTarefa .seletor_lista").addClass("alerta");
        $("#seletorMuralTarefa").AvaSelector("focus");
        BindAgendar();
        return false;
    } 
    else {
        $("#seletorMuralTarefa .seletor_lista").removeClass("alerta");
    }

    var c = 0;
    if ($("#valeNota").hasClass("ativo")) {
        c = $("#intValorTarefa").val().replace(".", ",");

        if (c == "" || c == "Valor") {

            $("html, body").animate({
                scrollTop: $("#intValorTarefa").offset().top - 200
            }, 800);
            $("#intValorTarefa").addClass("alerta");
            BindAgendar();
            return false;
        } 
        else {
            $("#intValorTarefa").removeClass("alerta")
        }
    }

    var g = $("#idCaminho").val();
    if (g == "" || g == undefined) {
        g = 0
    }

    var b = 2;
    $("input:radio[name=rTipo]").each(function () {
        if ($(this).is(":checked")) {
            b = parseInt($(this).val())
        }
    });

    var d = new Array();
    var f = arrayArquivosUpload;

    if (f == undefined || f == "" || f == null) {
        f = "";
        var k = null
    } 
    else {

        for (var e = 0; e < f.arrayArquivo.length; e++) {
            d.push(f.arrayArquivo[e].id)
        }

        var k = {
            idFerramentaTipo: f.idFerramentaTipo,
            idFerramenta: f.idFerramenta,
            arquivos: d
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

    var txtDisponivel = ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

    var txtInput = strTitulo + txtDisponivel;
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

    //Criado por turma
    //Valida turma Agendada
    var retorno = validaDataAgendamento(dataInicio, dataFim, horaInicio, horaFim);
    if (retorno == "ok") {
        if (possueAluno) { //Quando se vai criar a tarefa pelo ALUNO            

            for (let index = 0; index < turmas.length; index++) {
                const element = turmas[index];
                var listaUsuario = [];
                
                arrayUsuariosAux.filter(a => a.idTurma == element.idTurma && a.idGrupo == undefined).forEach(element => {
                    listaUsuario.push(element);
                });
                
                listaUsuario.forEach(element => {
                    var removed = arrayUsuariosAux.splice(element, 1); // remove alunos que ja tem turmas na lista para priorizar sempre as turmas
                });
            }

            SalvarCaminhoCriarTarefa({
                idCaminho : $("#idCaminho").val(),
                idEtapa : $("#idEtapa").val(),
                strTarefa : $("#strTituloTarefa").val(),
                strDescricao : $("#txtDescricaoTarefa").val(),
                intNota : c
            }, function(data){
                var idCaminho = data.idCaminho;
                    
                if (g > 0) {
                    idCaminho = g;
                }

                var i = data.idEtapa;//$("#idEtapa").val();

                if (i == "" || i == undefined) {
                    i = 0;
                }
                
                var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;
                
                $.ajax({
                    url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                    data: {
                        idCaminho: idCaminho,
                        idEtapa: i,
                        intValor: c,
                        solicitaEntrega: solicitacaoArquivo
                    },
                    type: "POST",
                    success: function (u) {

                        $("#idEtapa").val(u);

                        var idEtapa = u;
                        var t = validaAgendamentoTask(dataInicio, dataFim, horaInicio, horaFim);

                        if (t == "ok") {

                            etapas = [];
                            idCaminhos = [];
                            incluirAgendamentoMural(dataInicio, dataFim, horaInicio, horaFim, idCaminho, strDescricao, strTitulo, idEtapa);

                            for (var i = 0; i < grupos.length; i++) {
                                var grupoId = grupos[i];
                                var grupoNome = gruposNome[i];
                                SalvarCaminhoAlunos(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, grupoId);
                            }

                            ShowToast({type: "success", title : "Seus alunos j&aacute; podem visualizar esta tarefa.", desc : "Tarefa publicada com sucesso!", callback: function(){
                                $("#strTituloTarefa").val("");
                                $("#txtDescricaoTarefa").val("");
                                enviadoParaTurma = false;
                                EscondeOsObjects();
                                $("#loader").hide();
                                location.href = "/ava/caminhos/home/index/1";
                            }});
                        }
                        else {
                            BindAgendar();

                            if (t == "erro") {
                                return false;
                            } 
                            else {
                                mostraAlertaTarefa(t);
                            }
                        }
                    },
                    error: function (n) {

                        BindAgendar();

                        if (n.status != 0) {
                            console.debug("erro ao salvar tarefa rápida!");
                        }
                    }
                });
            });

            /*
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/SalvarCaminho/",
                data: {
                    idRota: g,
                    idUsuario: 0,
                    strTitulo: strTitulo,
                    strDescricao: strDescricao,
                    intStatus: b,
                    strTags: "",
                    intTipo: 2,
                    json: JSON.stringify(k),
                    userturma:0
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (caminho) {

                    var idCaminho = caminho;
                    
                    if (g > 0) {
                        idCaminho = g;
                    }

                    var i = $("#idEtapa").val();

                    if (i == "" || i == undefined) {
                        i = 0;
                    }
                    
                    var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;
                    
                    $.ajax({
                        url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                        data: {
                            idCaminho: idCaminho,
                            idEtapa: i,
                            intValor: c,
                            solicitaEntrega: m
                        },
                        type: "POST",
                        success: function (u) {

                            $("#idEtapa").val(u);

                            var idEtapa = u;
                            var t = validaAgendamentoTask(dataInicio, dataFim, horaInicio, horaFim);

                            if (t == "ok") {

                                etapas = [];
                                idCaminhos = [];
                                incluirAgendamentoMural(dataInicio, dataFim, horaInicio, horaFim, idCaminho, strDescricao, strTitulo, idEtapa);

                                for (var i = 0; i < grupos.length; i++) {
                                    var grupoId = grupos[i];
                                    var grupoNome = gruposNome[i];
                                    SalvarCaminho(idCaminho, strTitulo + " - Turma " + grupoNome, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, grupoId);

                                }

                                ShowToast({type: "success", title : "Seus alunos j&aacute; podem visualizar esta tarefa.", desc : "Tarefa publicada com sucesso!", callback: function(){
                                    location.href = "/ava/caminhos/home/index/1";
                                }});
                                
                                $("#strTituloTarefa").val("");
                                $("#txtDescricaoTarefa").val("");
                                enviadoParaTurma = false;
                                EscondeOsObjects();
                                $("#loader").hide();
                            }
                            else {
                                BindAgendar();

                                if (t == "erro") {
                                    return false;
                                } 
                                else {
                                    mostraAlertaTarefa(t);
                                }
                            }
                        },
                        error: function (n) {

                            BindAgendar();

                            if (n.status != 0) {
                                console.debug("erro ao salvar tarefa rápida!");
                            }
                        }
                    });
                },
                error: function (i) {
                    BindAgendar();

                    if (i.status != 0) {
                        console.debug("erro ao salvar caminho rápido!")
                    }
                }
            });*/
        }
        else { //Quando se vai criar a tarefa para turma
            SalvarCaminhoCriarTarefa({
                idCaminho : $("#idCaminho").val(),
                idEtapa : $("#idEtapa").val(),
                strTarefa : $("#strTituloTarefa").val(),
                strDescricao : $("#txtDescricaoTarefa").val(),
                intNota : c
            }, function(data){
                for (var i = 0; i < grupos.length; i++) {
                    var grupoId = grupos[i];
                    var grupoNome = gruposNome[i];
                    // SalvarCaminhoTurma( data.idCaminho, strTitulo + " - Turma " + grupoNome, strDescricao, data.idUsuario, dataInicio, dataFim, horaInicio, horaFim, grupoId);
                    SalvarCaminhoTurma( data.idCaminho, strTitulo, strDescricao, data.idUsuario, dataInicio, dataFim, horaInicio, horaFim, grupoId, i);
                }

                ShowToast({
                    type: "success", 
                    title : "Seus alunos j&aacute; podem visualizar esta tarefa.", 
                    desc : "Tarefa publicada com sucesso na(s) turma(s)!", 
                    callback: function(){

                        disciplinaSelecionada = 0;
                        $('#idMateria button.btnDisciplina_turmas').html("Selecione a disciplina");
                        $('#idMateria button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');

                        $("#strTituloTarefa").val("");
                        $("#txtDescricaoTarefa").val("");

                        enviadoParaTurma = false;
                        EscondeOsObjects();
                        $("#loader").hide();
                        zeraValoresRecurso();

                        location.href = "/ava/caminhos/home/index/1";
                    }
                });

            });
        }

    } 
    else {
        BindAgendar();
        if (retorno == "erro") {
            return false
        } 
        else {
            mostraAlertaTarefa(retorno)
        }
    }
}

function pegarDadosArquivos(){
    var f = arrayArquivosUpload;
    if (f == undefined || f == "" || f == null) {
        f = "";
        var k = null
    }
    var temp = [];
    if(typeof f.arrayArquivo != "undefined"){
        for (var i = 0; i < f.arrayArquivo.length; i++ ){
            var objeto = {
                "idArquivo": f.arrayArquivo[i].id,
                "strArquivo": f.arrayArquivo[i].strArquivo,
                "nome": f.arrayArquivo[i].strNome,
                "descricao":"",
                "diretorio": f.arrayArquivo[i].strDiretorio,
                "extensao": f.arrayArquivo[i].strExtensao
            }
            temp.push(objeto);
        }        
    }
    return temp;
}

function zeraValoresRecurso() {
    idRecurso = 0;
    idPublicacao = 0;
    idAvaliacao = 0;
}

function SalvarCaminho(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, idGrupo) {
    

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminho/",
            data: {
                idRota: idCaminho,
                idUsuario: 0,
                strTitulo: strTitulo,
                strDescricao: strDescricao,
                intStatus: 2,
                strTags: "",
                intTipo: 2,
                json: JSON.stringify(k),
                userturma:0
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (idCaminho) {
                var idCaminhoTurma = idCaminho;
                var idEtapaTurma = 0;
    
                if (idRecurso > 0) {
                    inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValorRecurso)
                }
    
                var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;
    
                var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;
                console.log('O valor de solicitacaoArquivo '+solicitacaoArquivo);    

                $.ajax({
                    url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                    data: {
                        idCaminho: idCaminhoTurma,
                        idEtapa: idEtapaTurma,
                        intValor: 0,
                        solicitaEntrega: solicitacaoArquivo
                    },
                    type: "POST",
                    success: function (idEtapaTurma) {
                        console.log("Entrou no inserir arquivo na turma");
                        if (typeof disciplinaSelecionada === 'undefined') {
                            disciplinaSelecionada = 0;
                        }
                        var idEtapaTurma = idEtapaTurma;
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
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
                                console.log("SalvarMensagemTarefaTurma criarTarefa.js claudemir =========");
                                
                                var arquivos = pegarDadosArquivos();
                                $.ajax({
    
                                    type: "POST",
                                    url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
                                    data: {
                                        strUsuarios: retorno[1],
                                        idGrupo: idGrupo,
                                        idFerramentaTipo: ID_FERRAMENTA_TIPO_TAREFA,
                                        idFerramenta: retorno[0],
                                        idEtapa: idEtapaTurma,
                                        strMensagem: strComplemento,
                                        idMateria: disciplinaSelecionada, 
                                        arquivos: JSON.stringify(arquivos)
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    success: function () {
                                        disciplinaSelecionada = 0;
                                        $('#idMateria button.btnDisciplina_turmas').html("Selecione a disciplina");
                                        $('#idMateria button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');
    
                                        console.log("tarefa criada com sucesso na turma =======================");

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
                                        Command: toastr["success"]("Seus alunos j&aacute; podem visualizar esta tarefa.", "Tarefa publicada com sucesso na(s) turma(s)!")

                                        console.log("tarefa criada com sucesso na turma");
                                    setTimeout(() => {
                                            
                                        location.href = "/ava/caminhos/home/index/1";
                                        
                                    }, 3000);

                                    },
                                    error: function (a) {
                                        0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
                                    }
                                })
    
                            },
                            error: function (a) {
                                0 != a.status && console.debug("erro ao inserir agendamento!")
                            }
                        })
    
                    },
                    error: function (n) {
                        if (n.status != 0) {
                            console.debug("erro ao salvar tarefa rápida!")
                        }
                    }
                })
    
    
            },
            error: function (i) {
                if (i.status != 0) {
                    console.debug("erro ao salvar caminho rápido!")
                }
            }
        })
       
}

function SalvarCaminhoTurma(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, idGrupo, index) {

    var intNota = 0;
    var inserirRescuroFlag = true;
    var idCaminhoTurma = idCaminho;
    var idEtapaTurma = 0;

    intNota = parseFloat($("#intValorTarefa").val().replace(".", ","));

    if (index == 0 && ($("#idEtapa").val() != "" || $("#idEtapa").val() != "0")) {
        idEtapaTurma = $("#idEtapa").val();
        inserirRescuroFlag = false;
    }

    var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

    var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;

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
            if (typeof disciplinaSelecionada === 'undefined') {
                disciplinaSelecionada = 0;
            }
            var idEtapaTurma = idEtapaTurma;
            console.log(idRecurso, idPublicacao, idAvaliacao, $("#idEtapa").val());
            if (idRecurso > 0 && inserirRescuroFlag==true) {
                console.log("Entrou no ifa ou era pra entrar");
                inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValorRecurso);
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
                    
                    var arquivos = pegarDadosArquivos();
                    $.ajax({

                        type: "POST",
                        url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
                        //async: false,
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
                            
                        },
                        error: function (a) {
                            0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
                        }
                    });

                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao inserir agendamento!")
                }
            })

        },
        error: function (n) {
            if (n.status != 0) {
                console.debug("erro ao salvar tarefa rápida!")
            }
        }
    });    
}

function SalvarCaminhoAlunos(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, idGrupo) {
    var idCaminhoTurma = idCaminho;
    var idEtapaTurma = 0;

    var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

    var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;
    var intNota = parseFloat($("#intValorTarefa").val().replace(".", ","));
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
            
            if (typeof disciplinaSelecionada === 'undefined') {
                disciplinaSelecionada = 0;
            }
            var idEtapaTurma = idEtapaTurma;

            if (idRecurso > 0) {
                inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValorRecurso);
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
                    var arquivos = pegarDadosArquivos();
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
                        },
                        error: function (a) {
                            0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
                        }
                    });
                    

                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao inserir agendamento!")
                }
            })

        },
        error: function (n) {
            if (n.status != 0) {
                console.debug("erro ao salvar tarefa rápida!")
            }
        }
    });
}

function ShowToast(params) {

    var time = 5000;
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
        // setTimeout(params.callback, time);
        
        toastr.options.onHidden = params.callback;
        toastr.options.onclick = params.callback;
    }

    Command: toastr[params.type](params.title, params.desc);
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

function BindAgendar(){
    onclickAgendou = false;
    $("#agendarTarefa").html('<span class=" awe_icons"></span>Agendar ');
}

function abreListaRecurso() {
    var b = {
        scrolling: "no",
        autoSize: false,
        width: 730,
        height: 530,
        autoResize: false,
        fitToView: false,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: false
            }
        },
        href: "/AVA/Caminhos/Home/ListaRecursos",
        afterShow: function () {
            EscondeOsObjects();
            $(".cover").mosaic({
                animation: "slide",
                speed: 500,
                hover_x: "400px"
            })
        },
        beforeClose: function () {
            MostraOsObjects();
            strPesquisaGlobal = "";
            tipoGlobal = 1;
            strEstadosGlobal = "2, 3, 5, 6, 8, 10";
            dtmInicioGlobal = "";
            dtmFimGlobal = "";
            idEstadoGlobal = -1;
            $("html").css({
                overflow: "scroll"
            })
        },
        beforeShow: function () {
            $("html").css({
                overflow: "hidden"
            })
        }
    };
    $.fancybox(b);
    return false
}

function voltaListaRecursos() {
    strPesquisaGlobal = "";
    tipoGlobal = 1;
    strEstadosGlobal = "2, 3, 5, 6, 8, 10";
    dtmInicioGlobal = "";
    dtmFimGlobal = "";
    idEstadoGlobal = -1;
    $(".fancybox-inner").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaRecursos/",
        success: function (b) {
            $(".fancybox-inner").html(b);
            $(".cover").mosaic({
                animation: "slide",
                speed: 500,
                hover_x: "400px"
            })
        },
        error: function (b) {
            if (b.status != 0) {
                console.debug("erro ao retornar recurso escolhido")
            }
        }
    })
}

function procurarItemRapido(b, f) {
    if (passouAgendar != 1) {
        var e = $("#strPesquisaRecurso").val();
        if (e == "") { }
        if (b == 159) {
            var c = $("#IdPapelEnsino").val();
            var d = $("#idDisciplina").val();
            intEnsinoGlobal = c;
            intDisciplinaGlobal = d
        } else {
            intEnsinoGlobal = 0;
            intDisciplinaGlobal = 0
        }
        idRecursoGlobal = f;
        idCategoriaGlobal = b;
        strPesquisaGlobal = e;
        rodarGlobal = 1;
        passouAgendar = 1;
        paginacaoProcurarRecursoItemRapido(idCategoriaGlobal, strPesquisaGlobal)
    }
}

function paginacaoProcurarRecursoItemRapido(c, e) {
    $("#mostraPaginas").hide();
    $("#container_recursoItem").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    var b;
    var d = 0;
    if (intEnsinoGlobal != 0) {
        b = {
            idCategoria: c,
            strPesquisa: e,
            intEnsino: intEnsinoGlobal,
            intDisciplina: intDisciplinaGlobal
        }
    } else {
        b = {
            idCategoria: c,
            strPesquisa: e
        }
    }
    $.ajax({
        url: "/AVA/Caminhos/home/ProcurarRecursoItemTotal/",
        data: b,
        async: false,
        success: function (f) {
            d = f
        },
        error: function (f) {
            if (f.status != 0) {
                console.debug("Nao foi possivel obter o numero de resultados.")
            }
        }
    });
    d = parseInt(d);
    $("#Pagination").pagination(d, {
        items_per_page: quantidadePorPaginaGlobal,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "javascript:void(0);",
        callback: retornaPaginaProcurarRecursoItemRapido
    });
    if (d <= quantidadePorPaginaGlobal) {
        $("#mostraPaginas").hide()
    } else {
        if ($("#mostraPaginas").is(":hidden")) {
            $("#mostraPaginas").show()
        }
    }
}

function retornaPaginaProcurarRecursoItemRapido(b, c) {
    if (rodarGlobal > 0) {
        listaProcuraRecursoItemRapido(b, idCategoriaGlobal, idRecursoGlobal, strPesquisaGlobal)
    }
    rodarGlobal += 1
}

function listaProcuraRecursoItemRapido(e, d, f, g) {
    e += 1;
    var c = quantidadePorPaginaGlobal * e;
    var h = (c - quantidadePorPaginaGlobal) + 1;
    var b;
    if (d == 159) {
        b = {
            idCategoria: d,
            idRecurso: f,
            strPesquisa: g,
            intInicio: h,
            intFim: c,
            intEnsino: intEnsinoGlobal,
            intDisciplina: intDisciplinaGlobal
        }
    } else {
        b = {
            idCategoria: d,
            idRecurso: f,
            strPesquisa: g,
            intInicio: h,
            intFim: c
        }
    }
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ProcurarRecursoItemRapido/",
        data: b,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (j) {
            $("#container_recursoItem").html(j);
            passouAgendar = 0
        },
        error: function (j) {
            if (j.status != 0) {
                console.debug("erro ao procurar recursos!")
            }
        }
    })
}

function listaAvaliacoesNovaRapido(b, d, c) {
    $("#container_recurso").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
        async: false,
        data: {
            pagina: 1,
            tamanho: quantidadePorPaginaGlobal,
            limite: 5,
            ordem: "nome,0",
            nome: b,
            datainicio: d,
            datafim: c,
            origem: 0
        },
        success: function (g) {
            var f = 0;
            try {
                if (g.erro.id == -1) {
                    f = 0
                } else {
                    f = g.Paginacao.Total
                }
            } catch (h) {
                f = g.Paginacao.Total
            }
            strPesquisaGlobal = b;
            dtmInicioGlobal = d;
            dtmFimGlobal = c;
            $("#Pagination").pagination(f, {
                items_per_page: quantidadePorPaginaGlobal,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: listaAvaliacoesNovaRapidoPaginado
            });
            if (f <= quantidadePorPaginaGlobal) {
                $("#mostraPaginas").hide()
            } else {
                if ($("#mostraPaginas").is(":hidden")) {
                    $("#mostraPaginas").show()
                }
            }
        },
        error: function (e) {
            if (e.status != 0) {
                console.debug("Não foi possível obter o numero de resultados da avaliação")
            }
        }
    })
}

function listaAvaliacoesNovaRapidoPaginado(b, c) {
    strTitulo = strPesquisaGlobal;
    dtmInicio = dtmInicioGlobal;
    dtmFim = dtmFimGlobal;
    b += 1;
    $.ajax({
        type: "POST",
        url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
        async: false,
        data: {
            pagina: b,
            tamanho: quantidadePorPaginaGlobal,
            limite: 5,
            ordem: "nome,0",
            nome: strTitulo,
            datainicio: dtmInicio,
            datafim: dtmFim,
            origem: 0
        },
        success: function (d) {
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/RetornaAvaliacoesRapido/",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (f) {
                    $("#container_recurso").html(f);
                    $("#strPesquisa").val(strTitulo);
                    $("#dtmInicioAval").val(dtmInicio);
                    $("#dtmFimAval").val(dtmFim);
                    montaLajotinhaFiltro(strTitulo, dtmInicio, dtmFim);
                    $("#filtro_aval").hide();
                    $("#escorregaFiltro").toggle(function () {
                        $(this).html("Adicionar filtros &#9650;");
                        montaCampoData("#dtmInicioAval", "#dtmFimAval");
                        $("#filtro_aval").slideDown()
                    }, function () {
                        $(this).html("Adicionar filtros &#9660;");
                        $("#filtro_aval").slideUp()
                    });
                    $("#container_recAval").html("<tr><td colspan='2'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></td></tr>");
                    try {
                        if (d.erro.id == -1) {
                            $("#container_recAval").html('<tr><td colspan="2">Nenhuma avaliação encontrada.</td></tr>')
                        } else {
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/RetornaListaAvaliacoesRapido",
                                data: {
                                    jsonListaAvaliacao: jQuery.toJSON(d)
                                },
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (e) {
                                    $("#container_recAval").html(e);
                                    if (Modernizr.touch) {
                                        $(".aval_aux").addClass("mobile")
                                    }
                                },
                                error: function (e) {
                                    if (e.status != 0) {
                                        console.debug("erro ao listar avaliacao")
                                    }
                                }
                            })
                        }
                    } catch (g) {
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/RetornaListaAvaliacoesRapido",
                            data: {
                                jsonListaAvaliacao: jQuery.toJSON(d)
                            },
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (e) {
                                $("#container_recAval").html(e);
                                if (Modernizr.touch) {
                                    $(".aval_aux").addClass("mobile")
                                }
                            },
                            error: function (e) {
                                if (e.status != 0) {
                                    console.debug("erro ao listar avaliacao")
                                }
                            }
                        })
                    }
                },
                error: function (e) {
                    if (e.status != 0) {
                        console.debug("erro ao listar avaliacao")
                    }
                }
            })
        },
        error: function (d) {
            if (d.status != 0) {
                console.debug("Não foi possível obter o numero de resultados da avaliação")
            }
        }
    })
}

function paginacaoRecursoItemRapido(b, c) {
    $("#mostraPaginas").hide();
    idCategoriaGlobal = b;
    idRecursoGlobal = c;
    rodarGlobal = 1;
    var d = 0;
    $.ajax({
        url: "/AVA/Caminhos/home/SelecionarRecursoItemTotal/",
        data: {
            idCategoria: idCategoriaGlobal,
            idRecurso: idRecursoGlobal
        },
        async: false,
        success: function (e) {
            d = e
        },
        error: function (e) {
            if (e.status != 0) {
                console.debug("Nao foi possivel obter o numero de resultados.")
            }
        }
    });
    d = parseInt(d);
    $("#Pagination").pagination(d, {
        items_per_page: quantidadePorPaginaGlobal,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "javascript:void(0);",
        callback: retornaPaginaRecursoItemRapido
    });
    if (d <= quantidadePorPaginaGlobal) {
        $("#mostraPaginas").hide()
    } else {
        if ($("#mostraPaginas").is(":hidden")) {
            $("#mostraPaginas").show()
        }
    }
}

function retornaPaginaRecursoItemRapido(b, c) {
    if (rodarGlobal > 0) {
        listaRecursoItemRapidoPaginando(b, idRecursoGlobal, idCategoriaGlobal)
    }
    rodarGlobal += 1
}

function listaRecursoItemRapidoPaginando(d, e, c) {
    d += 1;
    var b = quantidadePorPaginaGlobal * d;
    var f = (b - quantidadePorPaginaGlobal) + 1;
    $("#container_recurso").removeClass("tablefix_aval");
    $("#container_recurso").removeClass("trhover");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaRecursoItensRapido/",
        data: {
            idCategoria: c,
            idRecurso: e,
            intInicio: f,
            intFim: b
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (g) {
            $("#container_recurso").html(g);
            $(".ava_container_masonry").masonry({
                itemSelector: ".ava_box_masonry"
            })
        },
        error: function (g) {
            if (g.status != 0) {
                console.debug("erro ao listar recursos!")
            }
        }
    })
}

function inserirRecursoRapido_OLD(j, e, h) {
    console.log("file -> tarefa | func -> inserirRecursoRapido");
    console.log("j == " + j);
    console.log("e == " + e);
    console.log("h == " + h);

    $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");
    
    if ($("#recursoRapido").find("img").attr("src") != undefined) {
        if ($("#recursoRapido").find("img").attr("src").toLowerCase().indexOf("avaliacoes") > 0) {
            $("#strTituloTarefa").val("");
            $("#txtDescricaoTarefa").val("");
            $("#intValorTarefa").val("");
            $("#valeNota").removeAttr("checked")
        }
    }
    $(".time_loading").css("display", "block");
    var k = $("#strTituloTarefa").val();
    var g = $("#txtDescricaoTarefa").val();
    k = $("<div />").text(k).html();
    g = $("<div />").text(g).html();
    var c = 0;
    if ($("#valeNota").attr("checked")) {
        c = $("#intValorTarefa").val()
    }
    var f = $("#idCaminho").val();
    if (f == "" || f == undefined) {
        f = 0
    }
    var d = $("#idEtapa").val();
    if (d == "" || d == undefined) {
        d = 0
    }
    var l = "";
    $(".ava_tags li").each(function () {
        l += $(this).text().substring(0, $(this).text().length) + ";"
    });
    var b = 2;
    $("input:radio[class=ops]").each(function () {
        if ($(this).is(":checked")) {
            b = parseInt($(this).val())
        }
    });
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: f,
            idUsuario: 0,
            strTitulo: k,
            strDescricao: g,
            intStatus: b,
            strTags: l,
            intTipo: 2,
            json:null,
            userturma:0
        },
        success: function (m) {
            $("#idCaminho").val(m);
            // pega os dados do recurso para posteriormente
            // adicionar o recurso nas turmas / alunos
            idEtapa = d;
            idRecurso = j;
            idPublicacao = e;
            idAvaliacao = h;
            strTituloRecurso = k;
            strDescricaoRecurso = g;
            intValorRecurso = c;

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                data: {
                    idCaminho: m,
                    idEtapa: d,
                    idRecurso: j,
                    idPublicacao: e,
                    idAvaliacao: h,
                    strTitulo: k,
                    strDescricao: g,
                    intValor: c
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (o) {
                    var p = o.split("_");
                    var n = p[0];
                    $("#idRecursoEtapa").val(n);
                    $("#idEtapa").val(p[1]);
                    $("#recursoRapido").remove();
                    $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>');
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                        data: {
                            idRecursoEtapa: n,
                            idAvaliacao: h
                        },
                        success: function (q) {

                            $("#container_empilhaextras #recursoRapido").remove();
                            $("#container_empilhaextras").prepend(q);
                            $.fancybox.close();
                            $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Substituir recurso");
                            $(".tooltip").each(function () {
                                if ($(this).text() === "Inserir recurso") {
                                    $(this).html("Substituir recurso")
                                }
                            })
                        },
                        error: function (q) {
                            if (q.status != 0) {
                                console.debug("erro ao retornar recurso escolhido")
                            }
                        }
                    })
                },
                error: function (n) {
                    if (n.status != 0) {
                        console.debug("erro ao salvar recurso")
                    }
                }
            })
        },
        error: function (m) {
            if (m.status != 0) {
                console.debug("erro ao salvar tarefa rápida")
            }
        }
    })
}

function inserirRecursoRapidoTurma(idCaminho, idEtapa, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValor) {
    console.log("file -> tarefa | func -> inserirRecursoRapidoTurma");
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

function inserirAvaliacaoRapido_OLD(a) {
    
    console.log("file -> tarefa | func -> inserirAvaliacaoRapido");

    var o = $("#strTituloTarefa").val(),
        e = $("#txtDescricaoTarefa").val(),
        i = "",
        t = !0;
    o.length > 0 && e.length > 0 ? i = "Título e Descrição serão sobreescritos" : o.length > 0 && e.length <= 0 ? i = "Título será sobreescrito" : o.length <= 0 && e.length > 0 ? i = "Descrição será sobreescrita" : t = !1, $("#entrega_tarefa").attr("checked") && t ? (i += " e a solicitação de entrega será perdida.\nDeseja continuar?", t = !0) : $("#entrega_tarefa").attr("checked") && !t && (i += "Sua solicitação de entrega será perdida.\nDeseja continuar?", t = !0), t && !$("#entrega_tarefa").attr("checked") && (i += ".\nDeseja continuar?");
    var r = 0;
    $("#valeNota").attr("checked") && (r = $("#intValorTarefa").val()), t ? jConfirm(i, "", function(i) {
        i && ($(".time_loading").css("display", "block"), $.ajax({
            type: "POST",
            url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + a,
            success: function(i) {
                o = i.Nome;
                e = i.TextoIntrodutorio;
                r = i.ValorTotal;
                $("#strTituloTarefa").val(o);
                $("#txtDescricaoTarefa").val(e);
                $("#intValorTarefa").val(r);
                $("#valeNota").attr("checked", "true");
                $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled");
                $("#solicita_entrega").removeAttr("onclick");
                $("#solicita_entrega").removeAttr("href");
                $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked");
                $("#solicita_entrega").find("i").addClass("entrega_icon_vazio"), $("#bolSolicitaEntrega").val("0");
                salvarRecurso(o, e, 2, r, 1, 0, a);
            },
            error: function(a) {
                0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
            }
        }))
    }) : ($(".time_loading").css("display", "block"), $.ajax({
        type: "POST",
        url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + a,
        success: function(i) {
            o = i.Nome;
            e = i.TextoIntrodutorio;
            r = i.ValorTotal;
            $("#strTituloTarefa").val(o);
            $("#txtDescricaoTarefa").val(e);
            $("#intValorTarefa").val(r);
            $("#valeNota").attr("checked", "true");
            $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled");
            $("#solicita_entrega").removeAttr("onclick");
            $("#solicita_entrega").removeAttr("href");
            $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked");
            $("#solicita_entrega").find("i").addClass("entrega_icon_vazio");
            $("#bolSolicitaEntrega").val("0");
            salvarRecurso(o, e, 2, r, 1, 0, a);
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
        }
    }))
}

function salvarRecurso(a, o, e, i, t, r, n) {

    console.log("file -> tarefa | func -> salvarRecurso");

    console.log(a, o, e, i, t, r, n);

    a = $("<div />").text(a).html(), o = $("<div />").text(o).html();
    var s = $("#idCaminho").val();
    ("" == s || void 0 == s) && (s = 0);
    var l = $("#idEtapa").val();
    ("" == l || void 0 == l) && (l = 0);
    var c = 2;

    $("input:radio[name=rTipo]").each(function() {
        $(this).is(":checked") && (c = parseInt($(this).val()))
    });

    $.ajax({
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
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(e) {
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
                success: function(a) {
                    var o = a.split("_"),
                        e = o[0];

                    $("#idEtapa").val(o[1]), $("#recursoRapido").remove();
                    $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>');

                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                        data: {
                            idRecursoEtapa: e,
                            idAvaliacao: n
                        },
                        success: function(a) {
                            idRecurso = 1;
                            idAvaliacao = n;
                            $("#container_empilhaextras #recursoRapido").html(a);
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
                        },
                        error: function(a) {
                            0 != a.status && console.debug("erro ao retornar recurso escolhido")
                        }
                    });
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao salvar recurso")
                }
            })
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao salvar tarefa rápida")
        }
    })
}

function excluirRecursoRapido() {
    console.log("file -> tarefa | func -> excluirRecursoRapido");
    var c = $("#idCaminho").val();
    var d = $("#idEtapa").val();
    var f = $("#strTituloTarefa").val();
    var b = $("#txtDescricaoTarefa").val();
    f = $("<div />").text(f).html();
    b = $("<div />").text(b).html();
    var e = 0;
    if ($("#valeNota").attr("checked")) {
        e = $("#intValorTarefa").val()
    }
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
        data: {
            idCaminho: c,
            idEtapa: d,
            idRecurso: 11,
            idPublicacao: 0,
            idAvaliacao: 0,
            strTitulo: f,
            strDescricao: b,
            intValor: e
        },
        success: function (g) {
            if ($("#recursoRapido").find("img").attr("src").toLowerCase().indexOf("avaliacoes") > 0) {
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
        },
        error: function (g) {
            if (g.status != 0) {
                console.debug("erro ao remover recurso")
            }
        }
    })
}

function abrirMidiaTarefa() {
    $("#boxLinkTarefa,#boxMidiaTarefa").remove();
    var b = '<div id="boxMidiaTarefa" class="atividades_insert inserir_midia bgcolor1" style="display:none">  <input type="text" name="dialogo" placeholder="Insira o endere&ccedil;o URL" class="ipt_midia ph">  <a href="javascript:void(0);" onclick="inserirMidiaTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a>  <span class="discreto">Digite ou cole uma URL de v&iacute;deo YouTube ou Vimeo .</span></div>';
    $("#container_empilhaextras").prepend(b);
    $(".ph").addPlaceholder();
    $("#boxMidiaTarefa").slideDown("slow");
    $("#boxMidiaTarefa").find("input").focus(function () {
        $(this).removeClass("ava_field_alert")
    })
}

function inserirMidiaTarefa_OLD() {
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
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/SalvarMidiaTarefaRapida/",
                    data: {
                        idCaminho: h,
                        idEtapa: j,
                        strTarefa: m,
                        strDescricao: g,
                        intNota: l,
                        idMidia: b,
                        idTipoMidia: c,
                        strLinkVideo: f
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (p) {
                        var o = p.split("_");
                        $("#idCaminho").val(o[0]);
                        $("#idEtapa").val(o[1]);
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/RetornaPreviewMidia/",
                            data: {
                                tipoVideo: c,
                                idMidia: b
                            },
                            success: function (q) {
                                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_midia clearfix" id="boxPreviewMidiaTarefa" style="display:none"><h5>V&iacute;deo</h5><a href="javascript:void(0);" onclick="excluirMidiaTarefa()"><span class="fecha_X"></span></a>' + q + "</div>");
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
                                })
                            },
                            error: function (q) {
                                if (q.status != 0) {
                                    $("#container_empilhaextras").prepend("erro ao salvar vídeo na tarefa!")
                                }
                            }
                        })
                    },
                    error: function (o) {
                        if (o.status != 0) {
                            $("#container_empilhaextras").prepend("erro ao mostrar preview da vídeo!")
                        }
                    }
                })
            }
        })
    } else {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        bolVideoProibido = false;
        strTipoVideo = "";
        $("#boxMidiaTarefa").find("input").addClass("ava_field_alert")
    }
}

function excluirMidiaTarefa() {
    var b = $("#idEtapa").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirMidiaEtapa/" + b,
        success: function (c) {
            $("#boxPreviewMidiaTarefa").slideUp("slow", function () {
                $("#boxPreviewMidiaTarefa").hide();
                $("#inserirMidiaTarefa").removeClass("disable");
                $("#inserirMidiaTarefa").attr("onclick", "abrirMidiaTarefa()")
            });
        },
        error: function (c) {
            if (c.status != 0) {
                $("#boxPreviewMidiaTarefa").prepend("erro ao excluir mídia da tarefa!")
            }
        }
    })
}

function validarURLVideo(c) {
    var g = "";
    var e = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?((\/|([\w#!:.?+=&%@!\-\/]))(\.))+(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var b = e.exec(c);
    if (c == "") {
        $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
        return false
    } else {
        if (!b || strTipoVideo == "") {
            mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
            return false
        } else {
            if (c.indexOf("//youtu.be") > 0) {
                g = "youtubeEncurtado"
            } else {
                if (c.indexOf("youtube.com/watch?v=") > 0) {
                    g = "youtube"
                } else {
                    if (c.indexOf("youtube.com/v/") > 0) {
                        g = "youtube"
                    } else {
                        if (c.indexOf("vimeo.com/") > 0) {
                            g = "vimeo"
                        } else {
                            if (c.indexOf("video.globo.com/") > 0) {
                                if (c.indexOf("GIM") > 0) {
                                    g = "globo"
                                } else {
                                    mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                                    return false
                                }
                            } else {
                                if (c.indexOf("globotv.globo.com/") > 0) {
                                    var f = c.split("/");
                                    var d;
                                    if (c.substring(c.length - 1, c.length) == "/") {
                                        d = 2
                                    } else {
                                        d = 1
                                    }
                                    if (!isNaN(f[f.length - d])) {
                                        g = "globo"
                                    } else {
                                        mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                                        return false
                                    }
                                } else {
                                    mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
                                    return false
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return g
}

function mostraAlertaTarefa(b) {
    $.fancybox({
        href: "/ava/caminhos/home/Alert/?strMensagem=" + escape(b),
        autoSize: false,
        width: 400,
        height: 100,
        autoResize: false,
        fitToView: false,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: false
            }
        },
        afterShow: function () {
            $("#fecharLightBox").click(function () {
                $.fancybox.close()
            })
        }
    })
}

function abreUploadTarefa() {
    console.log("entrou abreUploadTarefa");

    $('div.ui-dialog').remove();

    $("#previewArquivosCriarTarefa").dialog({
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

    var b = $("#idCaminho").val();
    var c = $("#idEtapa").val();
    var d = $("#strTituloTarefa").val();
    var g = $("#txtDescricaoTarefa").val();
    d = $("<div />").text(d).html();
    g = $("<div />").text(g).html();
    var e = "tarefa";
    var f = 0;
    var h = 0;
    if ($("#valeNota").attr("checked")) {
        h = $("#intValorTarefa").val()
    }
    if (b == "" || b == undefined) {
        b = 0
    }
    if (c == "" || c == undefined) {
        c = 0
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        //url: "/AVA/Caminhos/Home/AbreUploadTarefa/?idCaminho=" + b + "&idEtapa=" + c + "&strTarefa=" + d + "&strDescricao=" + g + "&intNota=" + h,
        url: "/AVA/Caminhos/Home/AbreUploadCriarTarefa/?idCaminho=" + b + "&idEtapa=" + c + "&strTarefa=" + d + "&strDescricao=" + g + "&intNota=" + h,
        dataType: "json",
        async: false,
        success: function (o, m) {
            var p = o[0];
            var t = o[1];
            var l = o[2];
            var v = o[3];
            $("#idEtapa").val(t);
            $("#idCaminho").val(l);
            var j = [];
            if (arrayArquivosUpload != null && arrayArquivosUpload != undefined) {
                if (arrayArquivosUpload.arrayArquivo != null && arrayArquivosUpload.arrayArquivo != undefined) {
                    if (arrayArquivosUpload.arrayArquivo.length > 0) {
                        for (var u in arrayArquivosUpload.arrayArquivo) {
                            j.push(arrayArquivosUpload.arrayArquivo[u].id)
                        }
                    }
                }
            }
            var k = {
                idFerramenta: t,
                idFerramentaTipo: v,
                idsArquivosSelecionados: j.join(",")
            };
            var w;
            try {
                w = document.createElement("<form name='upload'>")
            } catch (q) {
                w = document.createElement("form");
                w.name = "upload"
            }
            for (var n in k) {
                if (k.hasOwnProperty(n)) {
                    var s = document.createElement("input");
                    s.type = "hidden";
                    s.name = n;
                    s.value = k[n];
                    w.appendChild(s)
                }
            }
            w.target = "Upload";
            w.method = "POST";
            w.action = "/AVA/Upload";
            document.body.appendChild(w);

            //
            var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }

            $("#previewArquivosCriarTarefa iframe").remove();

            $("#previewArquivosCriarTarefa").append('<iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;"></iframe>');

            $("#previewArquivosCriarTarefa iframe").append(w);
            w.submit();
            $("#previewArquivosCriarTarefa").dialog("open");
            $.fancybox.hideLoading();
        },
        error: function (l, j, k) {
            mostraAlertaTarefa("Erro: " + k + "Status: " + j);
        }
    })
}

function abrirLinkTarefa() {
    $("#boxLinkTarefa,#boxMidiaTarefa").remove();
    var b = '<div id="boxLinkTarefa" class="atividades_insert inserir_link bgcolor1" style="display:none">    <input type="text" id="strTituloLink" name="dialogo" placeholder="T&iacute;tulo do Link" class="ipt_link ph">    <input type="text" id="strLinkApoio" name="dialogo" placeholder="Insira a URL" class="ipt_link ph">    <a style="cursor: pointer" onclick="inserirLinkTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a></div>';
    $("#container_empilhaextras").prepend(b);
    $(".ph").addPlaceholder();
    $("#boxLinkTarefa").slideDown("slow", function () {
        $("#strTituloLink,#strLinkApoio").focus(function () {
            $(this).removeClass("ava_field_alert");
            $("#strTituloLink").limit("100", "")
        })
    })
}

function inserirLinkTarefa_OLD() {
    var b = $("#strTituloLink").val();
    var f = $("#strLinkApoio").val();
    if (b == "" || b == "Título do Link") {
        $("#strTituloLink").addClass("ava_field_alert");
        return false
    } else {
        if (f == "" || f == "Insira a URL") {
            $("#strLinkApoio").addClass("ava_field_alert");
            return false
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
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarLinkApoioTarefaRapida/",
        data: {
            idCaminho: g,
            idEtapa: e,
            // strTarefa: k,
            // strDescricao: j,
            strTarefa: k != "" ? k : "Temp",
            strDescricao: j != "" ? j : "Temp",
            intNota: c,
            strTituloApoio: b,
            strLinkApoio: f
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (l) {
            var m = l.split("_");
            $("#idCaminho").val(m[0]);
            $("#idEtapa").val(m[1]);
            $("#idRecursoEtapa").val(m[2]);
            retornaLinksApoioTarefa(m[2])
        },
        error: function (l) {
            if (l.status != 0) {
                $("#container_empilhaextras").prepend("erro ao salvar link da tarefa!")
            }
        }
    })
}

function retornaLinksApoioTarefa(b) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SelecionarLinksEtapa/",
        data: {
            idRecursoEtapa: b
        },
        success: function (c) {
            $("#container_empilhaextras").find("#boxPreviewLinksTarefa").remove();
            if (typeof (c) != "object" && c != "") {
                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxPreviewLinksTarefa" style="display:none">' + c + "</div>")
            }
            $("#boxPreviewLinksTarefa").slideDown("slow", function () {
                $("#boxLinkTarefa").remove()
            });
        },
        error: function (c) {
            if (c.status != 0) {
                $("#container_empilhaextras").prepend("erro ao retornar link da tarefa!")
            }
        }
    })
}

function abreCodigo() {
    var b = {
        autoSize: false,
        width: 680,
        height: 450,
        autoResize: false,
        fitToView: false,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: false
            }
        },
        autoResize: false,
        href: "/AVA/Caminhos/Home/SelecaoCodigosLivro",
        beforeClose: function () {
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaCodigosDidatico",
                data: {
                    idRecursoEtapa: $("#idRecursoEtapa").val()
                },
                success: function (c) {
                    $("#codigos_didatico").html("");
                    $("#container_empilhaextras").prepend(c)
                },
                error: function (c) {
                    if (c.status != 0) {
                        console.debug("erro ao buscar codigos da tarefa!")
                    }
                }
            });
            MostraOsObjects()
        },
        afterShow: function () {
            EscondeOsObjects()
        }
    };
    $.fancybox(b);
    return false
}

function defineOptionsMD(b) {
    b = b.value;
    document.getElementById("intBimestre").disabled = false;
    document.getElementById("selAreas").disabled = false;
    strNivel = b;
    strSelSerie = "";
    strSelArea = "";
    strSelArea += '<option value="0" selected>selecione uma área</option>';
    if (b == "EI_alu") {
        document.getElementById("intBimestre").disabled = true;
        document.getElementById("selAreas").disabled = true;
        document.getElementById("selSerie").disabled = false;
        strSelSerie = "";
        strSelSerie += '<option value="0" selected>selecione um grupo</option>';
        strSelSerie += '<option value="3" >Grupo 3</option>';
        strSelSerie += '<option value="4" >Grupo 4</option>';
        strSelSerie += '<option value="5" >Grupo 5</option>';
        strSelSerie += '<option value="1" >1º ano / nível III</option>'
    } else {
        if (b == "EF_I") {
            document.getElementById("selSerie").disabled = false;
            strSelSerie += '<option value="2" >2º ano / 1ª série</option>';
            strSelSerie += '<option value="3" >3º ano / 2ª série</option>';
            strSelSerie += '<option value="4" >4º ano / 3ª série</option>';
            strSelSerie += '<option value="5" >5º ano / 4ª série</option>';
            strSelArea += '<option value="art" >Artes</option>';
            strSelArea += '<option value="cie" >Ciências</option>';
            strSelArea += '<option value="fil" >Filosofia</option>';
            strSelArea += '<option value="geo" >Geografia</option>';
            strSelArea += '<option value="his" >História</option>';
            strSelArea += '<option value="ing" >Língua Inglesa</option>';
            strSelArea += '<option value="por" >Língua Portuguesa</option>';
            strSelArea += '<option value="mat" >Matemática</option>'
        } else {
            if (b == "EF_II") {
                document.getElementById("selSerie").disabled = false;
                strSelSerie += '<option value="6" >6º ano / 5ª série</option>';
                strSelSerie += '<option value="7" >7º ano / 6ª série</option>';
                strSelSerie += '<option value="8" >8º ano / 7ª série</option>';
                strSelSerie += '<option value="9" >9º ano / 8ª série</option>';
                strSelArea += '<option value="art" >Artes</option>';
                strSelArea += '<option value="cie" >Ciências</option>';
                strSelArea += '<option value="fis" >Física</option>';
                strSelArea += '<option value="geo" >Geografia</option>';
                strSelArea += '<option value="his" >História</option>';
                strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>';
                strSelArea += '<option value="ing" >Língua Inglesa</option>';
                strSelArea += '<option value="por" >Língua Portuguesa</option>';
                strSelArea += '<option value="mat" >Matemática</option>';
                strSelArea += '<option value="qui" >Química</option>'
            } else {
                if (b == "EM") {
                    document.getElementById("selSerie").disabled = false;
                    strSelSerie += '<option value="1" >1ª série</option>';
                    strSelSerie += '<option value="2" >2ª série</option>';
                    strSelSerie += '<option value="3" >3ª série</option>';
                    strSelArea += '<option value="art" >Artes</option>';
                    strSelArea += '<option value="bio" >Biologia</option>';
                    strSelArea += '<option value="fil" >Filosofia</option>';
                    strSelArea += '<option value="fis" >Física</option>';
                    strSelArea += '<option value="geo" >Geografia</option>';
                    strSelArea += '<option value="his" >História</option>';
                    strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>';
                    strSelArea += '<option value="ing" >Língua Inglesa</option>';
                    strSelArea += '<option value="por" >Língua Portuguesa</option>';
                    strSelArea += '<option value="lit" >Literatura</option>';
                    strSelArea += '<option value="mat" >Matemática</option>';
                    strSelArea += '<option value="qui" >Química</option>';
                    strSelArea += '<option value="soc" >Sociologia</option>'
                } else {
                    if (b == "MOD") {
                        document.getElementById("selSerie").disabled = true;
                        strSelSerie = "";
                        strSelSerie += '<option value="0" selected>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>';
                        strSelArea += '<option value="art" >Artes</option>';
                        strSelArea += '<option value="bio" >Biologia</option>';
                        strSelArea += '<option value="fil" >Filosofia</option>';
                        strSelArea += '<option value="fis" >Física</option>';
                        strSelArea += '<option value="geo" >Geografia</option>';
                        strSelArea += '<option value="his" >História</option>';
                        strSelArea += '<option value="ing" >Língua Inglesa</option>';
                        strSelArea += '<option value="por" >Língua Portuguesa</option>';
                        strSelArea += '<option value="esp" >Língua Espanhola</option>';
                        strSelArea += '<option value="lit" >Literatura</option>';
                        strSelArea += '<option value="mat" >Matemática</option>';
                        strSelArea += '<option value="qui" >Química</option>';
                        strSelArea += '<option value="soc" >Sociologia</option>';
                        document.getElementById("intBimestre").disabled = true
                    } else {
                        if (b == "EXT") {
                            document.getElementById("selSerie").disabled = true;
                            strSelArea += '<option value="bio" >Biologia</option>';
                            strSelArea += '<option value="fis" >Física</option>';
                            strSelArea += '<option value="geo" >Geografia</option>';
                            strSelArea += '<option value="his" >História</option>';
                            strSelArea += '<option value="ing" >Língua Inglesa</option>';
                            strSelArea += '<option value="por" >Língua Portuguesa</option>';
                            strSelArea += '<option value="esp" >Língua Espanhola</option>';
                            strSelArea += '<option value="lit" >Literatura</option>';
                            strSelArea += '<option value="mat" >Matemática</option>';
                            strSelArea += '<option value="qui" >Química</option>';
                            document.getElementById("intBimestre").disabled = true
                        }
                    }
                }
            }
        }
    }
    $("#selSerie").html(strSelSerie);
    $("#selAreas").html(strSelArea)
}

function fncPesquisa() {
    var d = $("#selNivel").val();
    var c = $("#selSerie").val();
    var b = $("#selAreas").val();
    if (d == "0") {
        mostraAlertaTarefa("Você precisa selecionar um nível.");
        return
    }
    if (c == "0" && $("#selNivel").value != "MOD") {
        mostraAlertaTarefa("Você precisa selecionar uma série.");
        return
    }
    if (b == "0" && $("#selNivel").value != "EI_alu") {
        mostraAlertaTarefa("Você precisa selecionar uma área.");
        return
    }
    $("#container_codigos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/pesquisa/listaLinks_MD_AVA.asp",
        data: {
            selNivel: d,
            selSerie: c,
            selAreas: b
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (e) {
            $("#container_codigos").html(e)
        },
        error: function (e) {
            if (e.status != 0) {
                console.debug("erro ao procurar codigo!")
            }
        }
    })
}

function inserirCodigo(j, h) {

    console.log("file -> tarefa | func -> inserirCodigo");

    $(".time_loading").css("display", "block");
    tinyMCE.triggerSave();
    var g = $("#strTituloTarefa").val();
    var c = $("#txtDescricaoTarefa").val();
    if (g === undefined || c === undefined) {
        var g = $("#tituloetapa").val();
        var c = $(".txtDescricaoEtapa.descricaoetapa").val()
    }
    g = $("<div />").text(g).html();
    c = $("<div />").text(c).html();
    var f = 0;
    if ($("#valeNota").attr("checked")) {
        f = $("#intValorTarefa").val()
    }
    var b = $("#idCaminho").val();
    if (b == "" || b == undefined) {
        b = 0
    }
    var d = $("#idEtapa").val();
    if (d == "" || d == undefined) {
        d = 0
    }
    var e = 2;
    $("input:radio[class=ops]").each(function () {
        if ($(this).is(":checked")) {
            e = parseInt($(this).val())
        }
    });
    $("#boxBTNInsCodigo_" + j).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Inserindo...");
    if (location.href.toLowerCase().indexOf("tarefa") > -1) {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminho/",
            data: {
                idRota: b,
                idUsuario: 0,
                strTitulo: g,
                strDescricao: c,
                intStatus: e,
                strTags: "",
                intTipo: 2
            },
            success: function (k) {
                $("#idCaminho").val(k);
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                    data: {
                        idCaminho: k,
                        idEtapa: d,
                        idRecurso: 11,
                        idPublicacao: 0,
                        idAvaliacao: 0,
                        strTitulo: g,
                        strDescricao: c,
                        intValor: f,
                        buscaRecursoExistente: 1
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (m) {
                        var n = m.split("_");
                        var l = n[0];
                        $("#idEtapa").val(n[1]);
                        $("#idRecursoEtapa").val(l);
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/InserirCodigoDidatico/",
                            data: {
                                idRecursoEtapa: l,
                                idCodigo: j,
                                idApostilaEdicao: h
                            },
                            success: function (o) {
                                $("div#" + h).html("<span>Código inserido com sucesso!</span>")
                            },
                            error: function (o) {
                                if (o.status != 0) {
                                    console.debug("erro ao inserir codigo didatico: " + j)
                                }
                            }
                        })
                    },
                    error: function (l) {
                        if (l.status != 0) {
                            console.debug("erro ao salvar recurso")
                        }
                    }
                })
            },
            error: function (k) {
                if (k.status != 0) {
                    console.debug("erro ao salvar tarefa rápida")
                }
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/InserirCodigoDidatico/",
            data: {
                idRecursoEtapa: $("#idRecursoEtapa").val(),
                idCodigo: j,
                idApostilaEdicao: h
            },
            success: function (k) {
                $("div#" + h).html("<span>Código inserido com sucesso!</span>")
            },
            error: function (k) {
                if (k.status != 0) {
                    console.debug("erro ao inserir codigo didatico: " + j)
                }
            }
        })
    }
}

function excluirCodigo(d, b, c) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirCodigoEtapa",
        data: {
            idRecursoEtapa: b,
            idCodigo: d,
            idApostilaEdicao: c
        },
        success: function (e) {
            $("#codigos_didatico #" + d).slideUp("slow", function () {
                $(this).remove()
            })
        },
        error: function (e) {
            if (e.status != 0) {
                $("#codigos_didatico #" + d).prepend("erro ao excluir código da tarefa!")
            }
        }
    })
}

function pesquisaPorCodigo() {
    var b = $("#strCodigoDidatico").val();
    if (b == "") {
        mostraAlertaTarefa("Digite um código.");
    } else {
        $("#container_codigos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/pesquisa/resultadoPesquisaMD_AVA.asp",
            data: {
                strCodigo: b
            },
            success: function (c) {
                $("#container_codigos").html(c)
            },
            error: function (c) {
                if (c.status != 0) {
                    $("#container_codigos").prepend("erro ao buscar codigo!")
                }
            }
        })
    }
}

function trocaStatusSolicitacaoEntrega() {


    if ($("#solicita_entrega").find("i").hasClass("entrega_icon_vazio")) {
        $("#solicita_entrega").find("i").removeClass("entrega_icon_vazio");
        $("#bolSolicitaEntrega").val("1")
    } else {
        $("#solicita_entrega").find("i").addClass("entrega_icon_vazio");
        $("#bolSolicitaEntrega").val("0")
    }
}

function salvaSolicitacaoEntrega(e) {//
    var d = 0;

    var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;
                console.log('O valor de solicitacaoArquivo '+solicitacaoArquivo);

    if ($("#valeNota").attr("checked")) {
        if ($("#intValorTarefa").val() == "" || $("#intValorTarefa").val() == "Valor") {
            $("#intValorTarefa").addClass("ava_field_alert");
            $("html, body").animate({
                scrollTop: $(".atividades_box").offset().top - 60
            }, 1000);
            return false
        } else {
            d = $("#intValorTarefa").val().replace(".", ",")
        }
    }
    var b = $("#idCaminho").val();
    if (b == "" || b == undefined) {
        b = 0
    }
    var c = $("#idEtapa").val();
    if (c == "" || c == undefined) {
        c = 0
    }



    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarTarefaRapida",
        data: {
            idCaminho: b,
            idEtapa: c,
            intValor: d,
            solicitaEntrega: solicitacaoArquivo
        },
        success: function (f) {
            $("#idEtapa").val(f);
            if ($("#ava_steps_footer .atividade_salva").length == 0) {
                $("#ava_steps_footer").append('<div class="atividade_salva">Sua atividade foi salva com sucesso!</div>');
                $(".atividade_salva").delay(2000).fadeOut("slow")
            } else {
                $(".atividade_salva").show();
                $("#ava_steps_footer .atividade_salva").html("Sua atividade foi salva com sucesso!");
                $(".atividade_salva").delay(2000).fadeOut("slow")
            }
            //claudemirr
            concluirAgendamentoRapidoAvancado();
        },
        error: function (f) {
            if (f.status != 0) {
                console.debug("erro ao buscar codigos da tarefa!")
            }
        }
    })
}

function criarAgendamento(e) {
    idUsuarioTarefa = e;
    if (salvarTarefaAvancada(e)) {
        var d = $(".compartilhamento ul").clone();
        d.find("li").eq(0).remove();
        d.find("li").eq(0).remove();
        d.find("input").remove();
        d.find("a.small-x").remove();
        d.find("li:last").remove();
        d.find("a").removeAttr("href");
        d.find("a,li").removeAttr("style");
        d.find("a").removeAttr("class");
        if (d.html().trim() == "") {
            mostraAlertaTarefa("Adicione pessoas para agendar");
            return false
        }
        var c = $("#idCaminho").val();
        var b = $("#idEtapa").val();
        var f = {
            autoSize: false,
            width: 760,
            height: 510,
            padding: 0,
            autoResize: false,
            fitToView: false,
            type: "ajax",
            helpers: {
                overlay: {
                    closeClick: false
                }
            },
            autoResize: false,
            href: "/AVA/Caminhos/Home/CriarAgendamentoTarefaAvancada",
            ajax: {
                type: "POST",
                data: {
                    idTarefa: c,
                    htmlPersona: d.html()
                }
            },
            beforeClose: function () {
                MostraOsObjects()
            },
            afterShow: function (g) {
                EscondeOsObjects();
                $(".compartilhamento_cenario").find("li").after("&nbsp;");
                $("#dataInicio").setMask("date");
                $("#dataFim").setMask("date");
                $("#horaInicio").setMask("time").timepicker({
                    myPosition: "right top",
                    atPosition: "right bottom",
                    onSelect: atualizaHoraInicio
                });
                $("#horaFim").setMask("time").timepicker({
                    myPosition: "right top",
                    atPosition: "right bottom",
                    onSelect: atualizaHoraFim
                });
                montaCampoData("#dataInicio", "#dataFim");
                $("#horaInicio").keyup(function () {
                    $("#dInicio").text($("#dataInicio").val() + " " + $(this).val())
                });
                $("#horaFim").keyup(function () {
                    $("#dFim").text($("#dataFim").val() + " " + $(this).val())
                });
                $("#btnCancelarAgendamentoRapido").live("click", function () {
                    $.fancybox.close()
                });
                $("#strComplementoRapido").limit("200", "")
            }
        };
        $.fancybox(f);
        return false
    }
}

function atualizaHoraInicio() {
    $("#dInicio").text($("#dataInicio").val() + " " + $("#horaInicio").val())
}

function atualizaHoraFim() {
    $("#dFim").text($("#dataFim").val() + " " + $("#horaFim").val())
}

function isNumeric(b) {
    var c = /^[0-9]+$/;
    return (c.test(b))
}

function concluirAgendamentoRapidoAvancado() {
    var b = $("#idCaminho").val();
    var d = $("#idEtapa").val();
    $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");
    var j = $("#txtDisponivel").text();
    var n = $("#txtTitulo").text();
    var l = "Testeeeeeeee";//$("#txtDisponivel").text();// $("#strComplementoRapido").val();
    n = $("<div />").text(n).html();
    l = $("<div />").text(l).html();
    if (l == "") {
        var g = n + j
    } else {
        var g = l + "<br>" + n + j
    }
    $("#txtInput").val(g);
    var f = $("#dataInicio").val();
    var h = $("#dataFim").val();
    var e = horaInicio;
    var c = $("#horaFim").val();
    $dataInicioTarefa = $("#dataInicio").val();
    $dataFimTarefa = $("#dataFim").val();
    $horaInicioTarefa = horaInicio;
    $horaFimTarefa = $("#horaFim").val();
    var k = validaAgendamentoTarefa($dataInicioTarefa, $dataFimTarefa, $horaInicioTarefa, $horaFimTarefa);
    var m = $("#idAvaliacao").val();
    if (k == "ok") {
        $.ajax({
            type: "POST",
            async: false,
            url: "/AVA/Caminhos/Home/MontaDestinoAgendamento",
            data: {
                usuario: JSON.stringify(arrayUsuariosAux),
                grupo: JSON.stringify(arrayGrupoAux)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (p) {
                var q = p.split("|");
                var o = "";
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/AVA/Caminhos/Home/InserirAgendamento",
                    data: {
                        idRotaAgendamento: 0,
                        idCaminho: b,
                        dataInicio: f,
                        horaInicio: e,
                        dataFim: h,
                        horaFim: c,
                        strComplemento: l,
                        usuario: JSON.stringify(arrayUsuariosAux),
                        grupo: JSON.stringify(arrayGrupoAux),
                        strUsuariosDestino: q[0],
                        strTurmasDestino: q[1],
                        idAgendamentoUsuario: 0
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (r) {
                        o = r;
                        if (isNumeric(r)) {
                            salvarMensagemRapidaAvancada(arrayUsuariosAux, arrayGrupoAux, 17, r, d, g);
                            $.fancybox.close();
                            arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                            arrayGrupoAux.splice(0, arrayGrupoAux.length);
                            $("#seletorTarefa").AvaSelector("limparUsuarios");
                            $("#msg_aviso").slideDown(function () {
                                var t = retornaQtdeAgendamentosTarefa(b);
                                $("#msg_qtdAgendadas").html('Esta tarefa possui <a href="/ava/caminhos">' + t + " agendamento(s)</a>");
                                window.setTimeout(function () {
                                    $("#msg_aviso").slideUp()
                                }, 5000)
                            });
                            var s = location.pathname.split("/");
                            if (isNaN(s[s.length - 1])) {
                                //TODO :::
                                //location.href = "/ava/caminhos/home/index/1"
                            }
                        } else {
                            mostraAlertaTarefa(o)
                            $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoRapidoAvancado()"><span></span>Agendar</a>');
                            return false
                        }
                    },
                    error: function (r) {
                        if (r.status != 0) {
                            console.debug("erro ao inserir agendamento!")
                        }
                    }
                })
            },
            error: function (o) {
                if (o.status != 0) {
                    console.debug("erro ao montar destino de agendamento!")
                }
            }
        })
    } else {
        if (k == "erro") {
            $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoRapidoAvancado()"><span></span>Agendar</a>');
            return false
        } else {
            mostraAlertaTarefa(k);
            $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoRapidoAvancado()"><span></span>Agendar</a>')
        }
    }
}

function concluirAgendamentoRapidoAvancadoOld() {
    var b = $("#idCaminho").val();
    var d = $("#idEtapa").val();
    $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");
    var j = $("#txtDisponivel").text();
    var n = $("#txtTitulo").text();
    var l = $("#strComplementoRapido").val();
    n = $("<div />").text(n).html();
    l = $("<div />").text(l).html();
    if (l == "") {
        var g = n + j
    } else {
        var g = l + "<br>" + n + j
    }
    $("#txtInput").val(g);
    var f = $("#dataInicio").val();
    var h = $("#dataFim").val();
    var e = horaInicio;
    var c = $("#horaFim").val();
    $dataInicioTarefa = $("#dataInicio").val();
    $dataFimTarefa = $("#dataFim").val();
    $horaInicioTarefa = horaInicio;
    $horaFimTarefa = $("#horaFim").val();
    var k = validaAgendamentoTarefa($dataInicioTarefa, $dataFimTarefa, $horaInicioTarefa, $horaFimTarefa);
    var m = $("#idAvaliacao").val();
    if (k == "ok") {
        $.ajax({
            type: "POST",
            async: false,
            url: "/AVA/Caminhos/Home/MontaDestinoAgendamento",
            data: {
                usuario: JSON.stringify(arrayUsuariosAux),
                grupo: JSON.stringify(arrayGrupoAux)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (p) {
                var q = p.split("|");
                var o = "";
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/AVA/Caminhos/Home/InserirAgendamento",
                    data: {
                        idRotaAgendamento: 0,
                        idCaminho: b,
                        dataInicio: f,
                        horaInicio: e,
                        dataFim: h,
                        horaFim: c,
                        strComplemento: l,
                        usuario: JSON.stringify(arrayUsuariosAux),
                        grupo: JSON.stringify(arrayGrupoAux),
                        strUsuariosDestino: q[0],
                        strTurmasDestino: q[1]
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (r) {
                        o = r;
                        if (isNumeric(r)) {
                            salvarMensagemRapidaAvancada(arrayUsuariosAux, arrayGrupoAux, 17, r, d, g);
                            $.fancybox.close();
                            arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                            arrayGrupoAux.splice(0, arrayGrupoAux.length);
                            $("#seletorTarefa").AvaSelector("limparUsuarios");
                            $("#msg_aviso").slideDown(function () {
                                var t = retornaQtdeAgendamentosTarefa(b);
                                $("#msg_qtdAgendadas").html('Esta tarefa possui <a href="/ava/caminhos">' + t + " agendamento(s)</a>");
                                window.setTimeout(function () {
                                    $("#msg_aviso").slideUp()
                                }, 5000)
                            });
                            var s = location.pathname.split("/");
                            if (isNaN(s[s.length - 1])) {
                                location.href = "/ava/caminhos/home/index/1"
                            }
                        } else {
                            mostraAlertaTarefa(o);
                            $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoRapidoAvancado()"><span></span>Agendar</a>');
                            return false
                        }
                    },
                    error: function (r) {
                        if (r.status != 0) {
                            console.debug("erro ao inserir agendamento!")
                        }
                    }
                })
            },
            error: function (o) {
                if (o.status != 0) {
                    console.debug("erro ao montar destino de agendamento!")
                }
            }
        })
    } else {
        if (k == "erro") {
            $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoRapidoAvancado()"><span></span>Agendar</a>');
            return false
        } else {
            mostraAlertaTarefa(k);
            $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoRapidoAvancado()"><span></span>Agendar</a>')
        }
    }
}

function validaAgendamentoTask(dataInicio, dataFim, horaInicio, horaFim) {
    //validaAgendamentoTask(a, o, e, i) {
    //validaAgendamentoTask(dataInicio, dataFim, horaInicio, horaFim);
    var t = "ok";
    if ("" == dataInicio) $("#dataInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == dataFim) $("#dataFim").addClass("ava_field_alert"), t = "erro";
    else if ("" == horaInicio) $("#horaInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == horaFim) $("#horaFim").addClass("ava_field_alert"), t = "erro";
    else {
        0 == validaData(dataInicio) ? t = "Data inicial inválida." : 0 == validaData(dataFim) ? t = "Data final inválida." : 0 == validaHora(horaInicio) ? t = "Hora inicial inválida." : 0 == validaHora(horaFim) && (t = "Hora final inválida.");
        var a = dataInicio.split("/"),
            r = a[2] + a[1] + a[0],
            o = dataFim.split("/"),
            n = o[2] + o[1] + o[0],
            e = horaInicio.split(":"),
            s = e[0] + e[1],
            i = horaFim.split(":"),
            l = i[0] + i[1],
            c = new Date;
        c.setFullYear(a[2], a[1] - 1, a[0]), c.setHours(e[0], e[1], 0, 0);
        var d = new Date;
        if (d.setFullYear(o[2], o[1] - 1, o[0]), d.setHours(i[0], i[1], 0, 0), d.getTime() < c.getTime()) t = "Data/Hora final deve ser maior que a inicial";
        else {
            var u = $("#dtmAtualServidor").val().split(" "),
                m = u[0].split("/"),
                p = u[1].split(":"),
                v = m[2] + m[1] + m[0],
                h = p[0] + p[1];
            r > n ? t = "Data inicial tem que ser menor que Data final." : r == v ? (h >= s && (t = "Hora inicial tem que ser maior que a hora atual."), r == n && s >= l && (t = "Hora inicial tem que ser menor que Hora final.")) : v > r ? t = "Data inicial tem que ser maior que a Data atual." : r == n && s >= l && (t = "Hora inicial tem que ser menor que Hora final.")
        }
    }
    return t
}

function incluirAgendamentoMural(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtDisponivel, txtTitulo, idEtapa) {

    var txtDisponivel = ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

    var txtInput = txtTitulo + txtDisponivel;
    var idGrupo = 0;
    var idAgendamentoUsuario = 0;

    for (var i = 0; i < arrayUsuariosAux.length; i++) {
        if (arrayUsuariosAux[i].isTurma) {
            idGrupo = arrayUsuariosAux[i].idGrupo;
            break;
        }
    }

    if (arrayUsuariosAux.length == 0) {
        for (var i = 0; i < arrayGrupoAux.length; i++) {
            idAgendamentoUsuario = arrayGrupoAux[i].usuarios[0].listaAlunos[0].idUsuario
            break;
        }
    }

    if (idGrupo != 0) {
        $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/GetAlunoIdByTurmaId/",
            data: {
                idGrupo: idGrupo
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                console.log(" sucesso idUsuario == " + data.result);
                var idAgendamentoUsuario = data.result;
                incluirAgendamento(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtInput, idEtapa, idAgendamentoUsuario);
            },
            error: function (data) {
                console.log("erro == " + data.result);
            }
        });
    }
    else {
        incluirAgendamento(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtInput, idEtapa, idAgendamentoUsuario);
    }
}

function incluirAgendamento(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtInput, idEtapa, idAgendamentoUsuario) {
    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/MontaDestinoAgendamento",
        data: {
            "usuario": JSON.stringify(arrayUsuariosAux),
            "grupo": JSON.stringify(arrayGrupoAux)
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (usuarios_turmas) {
            var vetDestino = usuarios_turmas.split('|');

            var strMensagemErroAgendamento = "";

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirAgendamento",
                data: {
                    idRotaAgendamento: 0,
                    idCaminho: idCaminho,
                    dataInicio: dataInicio,
                    horaInicio: horaInicio,
                    dataFim: dataFim,
                    horaFim: horaFim,
                    strComplemento: txtInput,
                    usuario: JSON.stringify(arrayUsuariosAux),
                    grupo: JSON.stringify(arrayGrupoAux),
                    strUsuariosDestino: vetDestino[0],
                    strTurmasDestino: vetDestino[1],
                    idAgendamentoUsuario: idAgendamentoUsuario
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (idRotaAgendamentoAux) {

                    strMensagemErroAgendamento = idRotaAgendamentoAux;

                    if (isNumeric(idRotaAgendamentoAux)) 
                    {   //verifica se não deu erro no agendamento
                        salvarMensagemRapida(idCaminho, arrayUsuariosAux, arrayGrupoAux, 17, idRotaAgendamentoAux, idEtapa, txtInput);

                        $("#seletorMuralTarefa").AvaSelector("limparUsuarios");
                        arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                        arrayGrupoAux.splice(0, arrayGrupoAux.length);

                    } 
                    else 
                    {
                        $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoTarefaRapidaMural()"><span></span>Enviar Agendamento</a>');
                        return false;
                    }

                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao inserir agendamento!");
                    }
                }
            });

        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao montar destino de agendamento!");
            }
        }
    });

}

function salvarMensagemRapida(idCaminho, usuario, grupo, idFerramentaTipo, idFerramenta, idEtapa, strMensagem) {
   
    var arquivos = pegarDadosArquivos();

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
        data: {
            usuario: JSON.stringify(usuario),
            grupo: JSON.stringify(grupo),
            idFerramentaTipo: idFerramentaTipo,
            idFerramenta: idFerramenta,
            idEtapa: idEtapa,
            strMensagem: strMensagem,
            arquivos: JSON.stringify(arquivos),
            idRota: idCaminho
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idMensagemRapida) {

        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao salvar mensagem rápida!");
            }
        }
    });


}

function salvarMensagemRapidaTarefaRapida(e, f, b, d, c, g) {

    if (typeof disciplinaSelecionada === 'undefined') {
        disciplinaSelecionada = 0;
    }

    console.log("entrou oooooo salvarMensagemRapidaTarefaRapida");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
        data: {
            usuario: JSON.stringify(e),
            grupo: JSON.stringify(f),
            idFerramentaTipo: b,
            idFerramenta: d,
            idEtapa: c,
            strMensagem: g,
            idMateria: disciplinaSelecionada
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (h) {
            $.ajax({
                type: "POST",
                url: "/AVA/Mural/Home/RetornaFeedUserNovaHome",
                data: {
                    idMensagemRapida: h
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (k) {
                    var j = $("#hTipoDePostMural").val();
                    $.fancybox.close();
                    $("#txtInput").val("");
                    $("#txtInput").css("height", "48px");
                    $("#txtInput").siblings(":last").html("");
                    $(".actions[pos=1]").click();
                    if (j == 0 || j == 1 || j == 2) {
                        $("#ava_fluxoarticles").prepend(k).find("article:first").addClass("highlight").slideDown(1000);
                        $("#ava_fluxoarticles article:first .compartilhado").booleTip({
                            urlAjax: "/AVA/Seletor/Home/destinoPost",
                            style: {
                                classes: "tooltip_compartilhamento"
                            },
                            position: {
                                my: "bottom left",
                                at: "top center",
                                adjust: {
                                    y: 0
                                }
                            }
                        })
                    } else {
                        $("#hTipoDePostMural").val(0);
                        $("#ava_fluxoarticles").html("");
                        $("#cbTipoDePostMural input[type=checkbox]").removeAttr("checked");
                        $("#cbTipoDePostMural li[filtrotipo=0] input[type=checkbox]").attr("checked", "checked");
                        var i = 'Todos os posts <span class="caret">';
                        $("#txtTipoDePostMural").html(i);
                        $("#loader_timeline").fadeIn("fast", function () {
                            carregaTimeLine(1)
                        })
                    }
                },
                error: function (i) {
                    if (i.status != 0) {
                        console.debug("erro ao retornar feed user!")
                    }
                }
            })
        },
        error: function (h) {
            if (h.status != 0) {
                console.debug("erro ao salvar mensagem rápida!")
            }
        }
    })
};

function validaAgendamentoTarefa(e, b, j, c) {
    var p = "ok";
    if ($dataInicioTarefa == "") {
        ("#dataInicio").addClass("ava_field_alert");
        p = "erro"
    } 
    else 
    {
        if ($dataFimTarefa == "") {
            ("#dataFim").addClass("ava_field_alert");
            p = "erro"
        } else {
            if ($horaInicioTarefa == "") {
                ("#horaInicio").addClass("ava_field_alert");
                p = "erro"
            } else {
                if ($horaFimTarefa == "") {
                    ("#horaFim").addClass("ava_field_alert");
                    p = "erro"
                } else {
                    if (validaDataTarefa($dataInicioTarefa) == false) {
                        p = "Data inicial inválida."
                    } else {
                        if (validaDataTarefa($dataFimTarefa) == false) {
                            p = "Data final inválida."
                        } else {
                            if (validaHoraTarefa($horaInicioTarefa) == false) {
                                p = "Hora inicial inválida."
                            } else {
                                if (validaHoraTarefa($horaFimTarefa) == false) {
                                    p = "Hora final inválida."
                                }
                            }
                        }
                    }
                    var e = $dataInicioTarefa.split("/");
                    var d = e[2] + e[1] + e[0];
                    var b = $dataFimTarefa.split("/");
                    var q = b[2] + b[1] + b[0];
                    var j = $horaInicioTarefa.split(":");
                    var m = j[0] + j[1];
                    var c = $horaFimTarefa.split(":");
                    var r = c[0] + c[1];
                    var f = new Date();
                    f.setFullYear(e[2], e[1] - 1, e[0]);
                    f.setHours(j[0], j[1], 0, 0);
                    var h = new Date();
                    h.setFullYear(b[2], b[1] - 1, b[0]);
                    h.setHours(c[0], c[1], 0, 0);
                    if (h.getTime() < f.getTime()) {
                        p = "Data/Hora final deve ser maior que a inicial"
                    } else {
                        var k = new Date();
                        var l = preencheZeros(k.getDate(), 2) + "/" + preencheZeros((k.getMonth() + 1), 2) + "/" + k.getFullYear();
                        var o = preencheZeros(k.getHours(), 2) + ":" + preencheZeros(k.getMinutes(), 2);
                        var l = l.split("/");
                        var o = o.split(":");
                        var g = l[2] + l[1] + l[0];
                        var n = o[0] + o[1];
                        if (d > q) {
                            p = "Data inicial tem que ser menor que Data final."
                        } else {
                            if (d == g) {
                                if (m <= n) {
                                    p = "Hora inicial tem que ser maior que a hora atual."
                                }
                                if (d == q) {
                                    if (m >= r) {
                                        p = "Hora inicial tem que ser menor que Hora final."
                                    }
                                }
                            } else {
                                if (d < g) {
                                    p = "Data inicial tem que ser maior que a Data atual."
                                } else {
                                    if (d == q) {
                                        if (m >= r) {
                                            p = "Hora inicial tem que ser menor que Hora final."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return p
}

function preencheZeros(b, e) {
    b = b + "";
    var d = b.length;
    if (d < e) {
        var c = e - d;
        for (i = 0; i < c; i++) {
            b = "0" + b
        }
    }
    return b
}

function validaHoraTarefa(b) {
    var c = new Array;
    c = b.split(":");
    if ((c[0] < 0) || (c[0] > 23) || (c[1] < 0) || (c[1] > 59)) {
        return false
    }
    return true
}

function validaDataTarefa(c) {
    var b = c;
    var d = new Array;
    var e = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    d = b.split("/");
    erro = false;
    if (b.search(e) == -1) {
        erro = true
    } else {
        if (((d[1] == 4) || (d[1] == 6) || (d[1] == 9) || (d[1] == 11)) && (d[0] > 30)) {
            erro = true
        } else {
            if (d[1] == 2) {
                if ((d[0] > 28) && ((d[2] % 4) != 0)) {
                    erro = true
                }
                if ((d[0] > 29) && ((d[2] % 4) == 0)) {
                    erro = true
                }
            }
        }
    }
    if (erro) {
        return false
    }
    return true
}

function retornaQtdeAgendamentosTarefa(b) {
    var c = 0;
    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/SelecionaAgendadasTotal",
        data: {
            idCaminho: b,
            intAberto: 1,
            intEmBreve: 1,
            intEncerrado: 1,
            strPesquisa: "",
            dtmInicio: "",
            dtmFim: ""
        },
        success: function (d) {
            c = d
        },
        error: function (d) {
            if (d.status != 0) {
                console.debug("erro ao buscar qtd de agendamentos!")
            }
        }
    });
    return c
}

function salvarMensagemRapidaAvancada(e, f, b, d, c, g) {
    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
        data: {
            usuario: JSON.stringify(arrayUsuariosAux),
            grupo: JSON.stringify(arrayGrupoAux),
            idFerramentaTipo: b,
            idFerramenta: d,
            idEtapa: c,
            strMensagem: g
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (h) { },
        error: function (h) {
            if (h.status != 0) {
                console.debug("erro ao salvar mensagem rápida!")
            }
        }
    })
}

function montaCampoData(b, c) {
    $(b).setMask("date");
    $(c).setMask("date");
    $(b).datepicker({
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function (d) {
            $(c).datepicker("option", "minDate", d)
        },
        onClose: function (d) {
            $("#dInicio").html(d + " " + $("#horaInicio").val())
        }
    });
    $(c).datepicker({
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function (d) {
            $(b).datepicker("option", "maxDate", d)
        },
        onClose: function (d) {
            $("#dFim").html(d + " " + $("#horaFim").val())
        }
    })
}

function excluirRotaTarefa(c, b) {
    if (b) {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirRota/" + c,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function () {
                window.location.href = "/ava/caminhos/home/index/1"
            },
            error: function (d) {
                if (d.status != 0) {
                    console.debug("erro ao excluir caminho!")
                }
            }
        })
    } else {
        $("#tooltipExc_" + c).css("display", "none")
    }
}

function carregaArquivosTarefa(b) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaArquivosTarefa/",
        data: {
            idEtapa: b
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (c) {
            $("#boxMaterialApoioTarefa").remove();
            if (typeof (c) != "object" && c != "") {
                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa">' + c + "</div>")
            }
        },
        error: function (c) {
            if (c.status != 0) {
                console.debug("erro ao listar material de apoio!")
            }
        }
    })
};

function carregaArquivosTarefaEditar(b) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaArquivosTarefaEditar/",
        data: {
            idEtapa: b
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (c) {
            $("#boxMaterialApoioTarefa").remove();
            if (typeof (c) != "object" && c != "") {
                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa">' + c + "</div>")
            }
        },
        error: function (c) {
            if (c.status != 0) {
                console.debug("erro ao listar material de apoio!")
            }
        }
    })
};


function substituirRecurso(a, o) {
    $idCaminho = $("#idCaminho").val(), $idEtapa = $("#idEtapa").val(), $intEtapa = $("#intEtapa").val(), $idRecurso = $("#idRecurso").val(), $idCategoria = $("#idCategoriaPublicacao").val(), void 0 == $idRecurso && ($idRecurso = 1), void 0 == $idCategoria && ($idCategoria = 0), o ? (abrirRecursoEdicao($idCategoria, $idRecurso, $idEtapa, $intEtapa), $("#btnAvancarCaminho").attr("disabled", "disabled"), $("#camposEtapa").css("display", "none")) : $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + $idEtapa,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            criarEtapa($idCaminho)
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir etapa!")
        }
    })
}

function ListarDisciplinas(component) {

    var idProfessor = localStorage.getItem('idUser');
    if (Materias != null && Materias.readyState < 4) {
        Materias.abort()
    }
    var strHtml = '<select class="btn-group" id="idMateria" style="width: 100%;"></select>';
    $("#" + component).html(strHtml);
    var varHtmlStr = '<option value="0">Selecione a disciplina</option>';

    Materias = $.ajax({
        url: "/ava/seletor/home/getMateriaPorProfessor",
        type: "POST",
        dataType: "json",
        data: { "idProfessor": idProfessor },
        success: function (aq) {
            if (aq.materias.length > 0) {
                
                $.each(aq.materias, function (ix, item) {

                    varHtmlStr += '<option value="'+item.IdMateria+'">' + item.strMateria + '</option>';
                    // varHtmlStr += '<li dic="' + item.IdMateria + '">' +
                    //                 '<input type="checkbox" id="ckDisciplina' + item.IdMateria + '">' +
                    //                 '<label for="ckDisciplina' + item.IdMateria + '">' + item.strMateria + '</label>' +
                    //                 '</li>';
                });


                $('#' + component + ' select#idMateria').html(varHtmlStr);
            }
        },
        error: function (ap) {
            alert("ap.responseText - " + ap.materias);
            if (ap.statusText != "abort") {
                console.log(ap.responseText)
            }
        }
    })
}

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

    var strHtml = '<div class="atividades_insert inserir_recurso clearfix recursoRapidoData" id="recursoRapido" data-value="1">'+
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
        idRecurso : recursoJSON.ri.idRecurso,
        nome : recursoJSON.ri.strTitulo,
        descricao: recursoJSON.ri.strDescricao,
        idAvaliacao : 0,
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
    '<div class="atividades_insert inserir_recurso clearfix recursoRapidoData" id="recursoRapidoData" data-value="'+recursoJSON.ri.idRecurso+'">'+
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

    $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Inserir recurso");
    $(".tooltip").first().text("Inserir recurso");

    $("#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa, #entrega_tarefa").removeAttr("disabled");
    
    if ($(".recursoRapidoData").attr("data-value") == "1") {
        $("#strTituloTarefa").val("");
        $("#txtDescricaoTarefa").val("");
        $("#intValorTarefa").val("");
        $("#valeNota").removeAttr("checked");
    }
    else if($(".recursoRapidoData").attr("data-value") == "2"){
        if ($("#intValorTarefa").val() == "" || $("#intValorTarefa").val() == "0") {
            $("#intValorTarefa").attr("disabled","disabled");    
        }
    }
    
    $("#recursoRapido").slideUp("slow", function () {
        $("#recursoRapido").remove();
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

function exibirMidiaTarefa() {

    var f = dadosTarefa.midia.strLinkVideo;
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
        $("#strTituloTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();

        $("html, body").animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);

        $("#atividades_box .strTituloTarefa").addClass("ava_field_alert");
        $("#strTituloTarefa").addClass('ava_field_alert');
        BindAgendar();
        return false;
    } 
    else if (strDescricao == "") {
        $("#txtDescricaoTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();

        $("html, body").animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);

        $("#txtDescricaoTarefa").addClass('ava_field_alert');
        BindAgendar();
        return false;
    } 
    else {
        $("#strTituloTarefa").removeClass("alerta");
        $("#txtDescricaoTarefa").removeClass("alerta");
        $("#feedErroTituloTarefa").hide();
    }

    if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
        $("#feed_erro_tarefa").show();
        $("#seletorMuralTarefa .seletor_lista").addClass("alerta");
        $("#seletorMuralTarefa").AvaSelector("focus");
        BindAgendar();
        return false;
    } 
    else {
        $("#seletorMuralTarefa .seletor_lista").removeClass("alerta");
    }

    var intNota = 0;

    if (!$("#intValorTarefa").attr("disabled")) {
        intNota = $("#intValorTarefa").val().replace(".", ",");

        if (intNota == "" || intNota == "Valor") {

            $("html, body").animate({
                scrollTop: $("#intValorTarefa").offset().top - 200
            }, 800);

            $("#intValorTarefa").addClass("alerta");
            mostraAlertaTarefa("Informe a nota da tarefa que ser� avaliada!");
            BindAgendar();
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
        if (element.idGrupo != undefined && element.idGrupo != 0) {
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
    var arrayUsuariosAuxTemp = [];
    var listaUsuario = [];

    var tags = "";
    $(".ava_tags li").each(function () {
        tags += $(this).text().substring(0, $(this).text().length) + ";"
    });

    for (let index = 0; index < turmas.length; index++) {
        const element = turmas[index];
        arrayUsuariosAux.filter(a => a.idTurma == element.idTurma && (a.idGrupo == undefined || a.idGrupo == 0)).forEach(element => {
            listaUsuario.push(element);
        });
    }

    arrayUsuariosAux.filter(a => a.idGrupo == undefined || a.idGrupo == 0).forEach(e => {
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

    var valor = $("#idMateria").val();

    if (valor == "0" || valor == undefined) {
        dadosTarefa.disciplinaSelecionada = 0;
    }
    else {
        dadosTarefa.disciplinaSelecionada = valor;
    }

    var retorno = validaDataAgendamento(dataInicio, dataFim, horaInicio, horaFim);
    if (retorno == "ok" || (actionAgendar == "editar")) {
        // onclickAgendou = false;
        // return;

        onclickAgendou = true;

        if(qtdAgendamentos > 0 && actionAgendar == "editar"){


            var materialExcluir = [];
            var materialInserir = [];

            var usuarioExcluir = [];
            var usuarioInserir = [];

            var turmaGrupoExcluir = [];
            var turmaGrupoInserir = [];

            var usuarioNewAux = [];
            var turmaGrupoNewAux = [];

            var usuarioOldAux = [];
            var turmaGrupoOldAux = [];

            var linksExcluir = [];
            var linksInserir = [];
            var midiaExcluir = {};
            var recursoExcluir = {};

            var dadosEnviarEditar = {
                recurso : {
                    idPublicacao : dadosTarefa.recurso.idPublicacao,
                    idAvaliacao : dadosTarefa.recurso.idAvaliacao,
                    idRecurso : dadosTarefa.recurso.idRecurso,
                    nome : dadosTarefa.recurso.nome,
                    descricao: dadosTarefa.recurso.descricao,
                    pOrdem : dadosTarefa.recurso.pOrdem,
                    sOrdem : dadosTarefa.recurso.sOrdem,
                    intValor : dadosTarefa.recurso.intValor
                },
                midia : {
                    idMidia : dadosTarefa.midia.idMidia,
                    strLinkVideo: dadosTarefa.midia.strLinkVideo,
                    idTipoMidia : dadosTarefa.midia.idTipoMidia
                },
                links : dadosTarefa.links,
                tags : dadosTarefa.tags,
                titulo : dadosTarefa.titulo,
                descricao : dadosTarefa.descricao,
                complemento : dadosTarefa.complemento,
                intNota : dadosTarefa.intNota,
                idGrupo : dadosTarefa.idGrupo,
                solicitarEntrega: dadosTarefa.solicitarEntrega,
                privadoCompartilhado : dadosTarefa.privadoCompartilhado,
                turmasGrupos : dadosTarefa.turmasGrupos,
                alunos : dadosTarefa.alunos,
                dataInicial : dadosTarefa.dataInicial,
                dataFinal : dadosTarefa.dataFinal,
                horaInicio : dadosTarefa.horaInicio,
                horaFim : dadosTarefa.horaFim,
                idUsuario : dadosTarefa.idUsuario,
                material : {
                    idFerramentaTipo: dadosTarefa.material.idFerramentaTipo,
                    idFerramenta: dadosTarefa.material.idFerramenta,
                    arquivos: dadosTarefa.material.arquivos
                },
                possuiAluno : dadosTarefa.possuiAluno,
                possuiTurmas : dadosTarefa.possuiTurmas,
                disciplinaSelecionada : dadosTarefa.disciplinaSelecionada,
                idCaminho : dadosTarefa.idCaminho,
                idEtapa : dadosTarefa.idEtapa
            };

            $.each(dadosTarefa.alunos, function(index, value){
                usuarioNewAux.push(value.idUsuario);
            });

            $.each(dadosTarefaEditar.alunos, function(index, value){
                usuarioOldAux.push(value.idUsuario);
            });
            
            $.each(dadosTarefa.turmasGrupos, function(index, value){
                turmaGrupoNewAux.push(value.idTurma);
            });

            $.each(dadosTarefaEditar.turmasGrupos, function(index, value){
                turmaGrupoOldAux.push(value.idTurma);
            });

            var materialDiferenca = arr_diff(dadosTarefaEditar.material.arquivos, dadosTarefa.material.arquivos);

            var usuarioDiferenca = arr_diff(usuarioNewAux, usuarioOldAux);
            var turmaGrupoDiferenca = arr_diff(turmaGrupoNewAux, turmaGrupoOldAux);

            $.each(usuarioDiferenca, function(index, value){
                if (usuarioOldAux.filter(a => a == value).length == 0) {
                    usuarioInserir.push(value);
                }
                else{
                    usuarioExcluir.push(value);
                }
            });

            $.each(turmaGrupoDiferenca, function(index, value){
                if (turmaGrupoOldAux.filter(a => a == value).length == 0) {
                    turmaGrupoInserir.push(value);
                }
                else{
                    turmaGrupoExcluir.push(value);
                }
            });

            $.each(dadosTarefa.links, function(index, value){
                if(value.bolNew == 0 && value.bolExcluido == 1){
                    linksExcluir.push(value);
                }
                else if(value.bolNew == 1 && value.bolExcluido == 0){
                    linksInserir.push(value);
                }
            });

            $.each(materialDiferenca, function(index, value){
                if (dadosTarefaEditar.material.arquivos.filter(a => a == value).length == 0) {
                    materialInserir.push(value);
                }
                else{
                    materialExcluir.push(value);
                }
            });

            dadosEnviarEditar.material.arquivos = materialInserir;
            dadosEnviarEditar.links = linksInserir;

            if (dadosTarefa.midia != null) {
                if (dadosTarefa.midia.idMidia != dadosTarefaEditar.midia.idMidia) {
                    midiaExcluir = dadosTarefaEditar.midia;
                }
                else{
                    dadosEnviarEditar.midia = null;
                }
            }
            else{
                if (dadosTarefaEditar.midia != null) {
                    midiaExcluir = dadosTarefaEditar.midia;
                }
                else{
                    dadosEnviarEditar.midia = null;
                }
            }

            if (dadosTarefa.recurso != null) {

                if (dadosTarefa.recurso.idAvaliacao != 0 || dadosTarefa.recurso.idPublicacao != 0) {

                    if (dadosTarefa.recurso.idAvaliacao != dadosTarefaEditar.recurso.idAvaliacao && 
                        dadosTarefa.recurso.idPublicacao != dadosTarefaEditar.recurso.idPublicacao &&
                        dadosTarefa.recurso.idRecurso != dadosTarefaEditar.recurso.idRecurso
                    ) {
                        recursoExcluir = dadosTarefaEditar.recurso;
                    }
                    else{
                        dadosEnviarEditar.recurso = null;
                    }
                }
                else{
                    if (dadosTarefaEditar.recurso != null) {
                        recursoExcluir = dadosTarefaEditar.recurso;
                    }else{
                        dadosEnviarEditar.recurso = null;
                    }
                }
            }
            else{
                if (dadosTarefaEditar.recurso != null) {
                    recursoExcluir = dadosTarefaEditar.recurso;
                }
                else{
                    dadosEnviarEditar.recurso = null;
                }
            }

            dadosEnviarEditar.alunos = [];
            dadosEnviarEditar.turmasGrupos = [];

            $.each(dadosTarefa.alunos, function(index, value){
                if (usuarioInserir.filter(a => a == value.idUsuario).length > 0) {
                    dadosEnviarEditar.alunos.push(value);
                }
            });

            $.each(dadosTarefa.turmasGrupos, function(index, value){
                if (turmaGrupoInserir.filter(a => a == value.idTurma).length > 0) {
                    dadosEnviarEditar.turmasGrupos.push(value);
                }
            });

            dadosEnviarEditar.possuiAluno = usuarioInserir.length > 0 ? true : false;
            dadosEnviarEditar.possuiTurmas = turmaGrupoInserir.length > 0 ? true : false;

            var objetoTurmaGrupoExcluir = [];
            var objetoUsuarioExcluir = [];

            $.each(dadosTarefaEditar.turmasGrupos, function(index, value){
                if (turmaGrupoExcluir.filter(a => a == value.idTurma).length > 0) {
                    objetoTurmaGrupoExcluir.push(value);
                }
            });

            $.each(dadosTarefaEditar.alunos, function(index, value){
                if (usuarioExcluir.filter(a => a == value.idUsuario).length > 0) {
                    objetoUsuarioExcluir.push(value);
                }
            });

            // N�o deixar editar quando tiver avalia��o na tarefa e ja estiver sido iniciada.
            // if (dadosTarefaEditar.recurso.idAvaliacao) {
            //     if (dadosTarefaEditar.recurso.idAvaliacao != 0 && $("#bolEditDataInicio").val() == "0"){
            //         $.fancybox.close();
            //         mostraAlertaTarefa("N�o � poss�vel editar uma tarefa que contenha o recurso do tipo avalia��o ap�s a mesma ter sido aberta para as turmas/alunos.");
            //         BindAgendar();           
            //         return;
            //     }
            // }

            if ($("#bolEditDataInicio").val() == "0") {

                var strMensagem = "O agendamento j� foi iniciado, � prov�vel que alguns alunos tenham realizado a tarefa.";
                
                if (turmaGrupoInserir.length > 0) {
                    strMensagem = strMensagem + " <br>Ao inserir uma turma ser� apagado os dados dos agendamentos j� finalizados pelos alunos e recriado um novo agendamento para as turmas adicionadas.";
                }

                if(turmaGrupoExcluir.length > 0 ) {
                    strMensagem = strMensagem + " <br>Ao excluir uma turma ser� apagado os dados dos agendamentos j� finalizados.";
                }

                if(usuarioExcluir.length > 0 ){
                    strMensagem = strMensagem + " <br>Ao excluir um ou mais alunos ser� apagado os dados dos agendamentos j� finalizados.";
                }

                strMensagem = strMensagem + "<br>Deseja continuar mesmo assim ?";

                var dataJson = {
                    dataNew : dadosEnviarEditar,
                    dataOld : dadosTarefaEditar,
                    materialExcluir : materialExcluir.length > 0 ? {
                        idFerramentaTipo: dadosTarefaEditar.material.idFerramentaTipo,
                        idFerramenta: dadosTarefaEditar.material.idFerramenta,
                        arquivos: materialExcluir
                    } : [],
                    linksExcluir : linksExcluir.length > 0 ? dadosTarefa.links.filter(a => a.bolNew == 0 && a.bolExcluido == 1) : [],
                    midiaExcluir : midiaExcluir,
                    recursoExcluir : recursoExcluir,
                    usuarioExcluir : objetoUsuarioExcluir,
                    turmaGrupoExcluir : objetoTurmaGrupoExcluir
                };

                console.log(dataJson);

                jConfirm(strMensagem, "", function(i) {                
                    if (i) {
                        EditarCaminhoCriarTarefaGlobal(dataJson);
                    }
                    else{
                        $.fancybox.close();
                        BindAgendar();   
                    }
                });
            }
            else{

                var dataJson = {
                    dataNew : dadosEnviarEditar,
                    dataOld : dadosTarefaEditar,
                    materialExcluir : materialExcluir.length > 0 ? {
                        idFerramentaTipo: dadosTarefaEditar.material.idFerramentaTipo,
                        idFerramenta: dadosTarefaEditar.material.idFerramenta,
                        arquivos: materialExcluir
                    } : [],
                    linksExcluir : linksExcluir.length > 0 ? dadosTarefa.links.filter(a => a.bolNew == 0 && a.bolExcluido == 1) : [],
                    midiaExcluir : midiaExcluir,
                    recursoExcluir : recursoExcluir,
                    usuarioExcluir : objetoUsuarioExcluir,
                    turmaGrupoExcluir : objetoTurmaGrupoExcluir
                };

                console.log(dataJson);

                EditarCaminhoCriarTarefaGlobal(dataJson);
            }
        }
        else{

            console.log(dadosTarefa);
            // BindAgendar();
            // return;
            
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/SalvarCaminhoCriarTarefaGlobal",
                data: JSON.stringify(dadosTarefa),
                contentType: "application/json",
                success: function (data) {
                    console.log(data);
                    $.fancybox.close();
    
                    // BindAgendar();   
                    // return;
    
                    if (data.msg == "") {
                        ShowToast({
                            type: "success", 
                            title : "Seus alunos j&aacute; podem visualizar esta tarefa.", 
                            desc : "Tarefa publicada com sucesso na(s) turma(s)!", 
                            callback: function(){
        
                                disciplinaSelecionada = 0;
                                $('#idMateria').val('0');
                                $("#strTituloTarefa").val("");
                                $("#txtDescricaoTarefa").val("");
        
                                enviadoParaTurma = false;
                                EscondeOsObjects();
                                $("#loader").hide();
                                zeraValoresRecurso();
                                BindAgendar();
                                location.href = "/ava/caminhos/home/index/1";
                            }
                        });
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

    } 
    else {
        BindAgendar();
        if (retorno == "erro") {
            return false
        } 
        else {
            mostraAlertaTarefa(retorno)
        }
    }
}

function EditarCaminhoCriarTarefaGlobal(data){
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/EditarCaminhoCriarTarefaGlobal",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            $.fancybox.close();

            // BindAgendar();   
            // return;

            if (data.msg == "") {
                ShowToast({
                    type: "success", 
                    title : "Seus alunos j&aacute; podem visualizar esta tarefa.", 
                    desc : "Tarefa publicada com sucesso na(s) turma(s)!", 
                    callback: function(){

                        disciplinaSelecionada = 0;
                        $('#idMateria').val('0');
                        $("#strTituloTarefa").val("");
                        $("#txtDescricaoTarefa").val("");

                        enviadoParaTurma = false;
                        EscondeOsObjects();
                        $("#loader").hide();
                        zeraValoresRecurso();
                        BindAgendar();
                        location.href = "/ava/caminhos/home/index/1";
                    }
                });
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

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}