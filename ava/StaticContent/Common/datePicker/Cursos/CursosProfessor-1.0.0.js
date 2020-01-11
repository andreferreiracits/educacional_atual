function abreListaAnotacoes(idCurso, idMateria, idTurma, strCursoEscola, strMateria, strTurma) {
    document.frmListaAnotacoes.idCursoEscolaAnotacao.value = idCurso;
    document.frmListaAnotacoes.target = "_self";
    document.frmListaAnotacoes.strCursoAnotacao.value = strCursoEscola;
    document.frmListaAnotacoes.strMateriaAnotacao.value = strMateria;
    document.frmListaAnotacoes.strTurmaAnotacao.value = strTurma;
    document.frmListaAnotacoes.idMateriaAnotacao.value = idMateria;
    document.frmListaAnotacoes.idTurmaAnotacao.value = idTurma;
    document.frmListaAnotacoes.submit();
}

function abreFaq(idCurso, idMateria, idTurma, intTipo, strCursoEscola, strMateria, strTurma) {
    document.frmFaq.idCursoEscola.value = idCurso;
    document.frmFaq.target = "_self";
    document.frmFaq.strCurso.value = strCursoEscola;
    document.frmFaq.strMateria.value = strMateria;
    document.frmFaq.strTurma.value = strTurma;
    document.frmFaq.idMateria.value = idMateria;
    document.frmFaq.idTurma.value = idTurma;
    document.frmFaq.intTipo.value = intTipo;

    document.frmFaq.submit();
}

function abreFAQCoordenador(url) {
    window.open("/academico/servicos/unvwiki/administrador/redirect.asp?wiki=/" + url);
}

function abreLista(idCurso, idMateria, idTurma, intTipo, strCursoEscola, strMateria, strTurma, opcao, op) {
    document.frmListas.IdCursoEscola.value = idCurso;
    document.frmListas.strCurso.value = strCursoEscola;
    document.frmListas.strMateria.value = strMateria;
    document.frmListas.strTurma.value = strTurma;
    document.frmListas.IdMateria.value = idMateria;
    document.frmListas.IdTurma.value = idTurma;
    document.frmListas.intTipo.value = intTipo;
    document.frmListas.op.value = op;
    document.frmListas.action = "/academico/servicos/planodeensino/pea_list.asp?strRetorno=mp&StrOpQtd=" + opcao;
    document.frmListas.submit();
}

function exibirMaterialApoioCDT(idCursoEscola, idMateria, idTurma, strCursoEscola, strMateria, strTurma, op) {
    document.formMaterialApoioCDT.idCursoEscola.value = idCursoEscola;
    document.formMaterialApoioCDT.idMateria.value = idMateria;
    document.formMaterialApoioCDT.idTurma.value = idTurma;
    document.formMaterialApoioCDT.strCursoEscola.value = strCursoEscola;
    document.formMaterialApoioCDT.strMateria.value = strMateria;
    document.formMaterialApoioCDT.strTurma.value = strTurma;
    document.formMaterialApoioCDT.op.value = 0;
    document.formMaterialApoioCDT.submit()
}


$(document).ready(function () {
    tblLista = new Tabela('frmTabelaCursos', 'tblCursoProfessor', true, new Ordenacao("modificado", true), retornarTabela);

    $("input[type=radio][name=Ordem]").click(function () {
        tblLista.executarOrdem();
    });

    var targetBt = "#bt-correntes";
   
    $("#Ano").hide();

    $(targetBt).addClass('selected');
    $(targetBt).append($('<span class=\'abadown\'><img src=\'' + imgRootUrl + '/seta.png\' /></span>'));
});

function retornarTabela(acao, dados) {
    tblLista.recarregarTabela();
}

function MudaPeriodo(p) {

    if (!$("#" + p).hasClass("selected")) {

        $("#bt-correntes").removeClass('selected');
        $("#bt-futuros").removeClass('selected');
        $("#bt-anteriores").removeClass('selected');

        $("#bt-correntes").html("Correntes");
        $("#bt-futuros").html("Futuros");
        $("#bt-anteriores").html("Anteriores");

        $("#Ano").hide();
        var targetBt = "#" + p;

        $(targetBt).addClass('selected');
        $(targetBt).append($('<span class=\'abadown\'><img src=\'' + imgRootUrl + '/seta.png\' /></span>'));

        if (p == "bt-futuros") {
            $("#periodo").val("Futuro");
        }
        else if (p == "bt-anteriores") {
            $("#periodo").val("Anterior");
            $("#slcAno").get(0).selectedIndex = 1;
            var d = new Date();
            if (d.getMonth() + 1 >= 6) {
                $("#slcAno").get(0).selectedIndex = 0;
            }
            $("#Ano").show();
        }
        else {
            $("#periodo").val("Corrente");
        }
        tblLista.TrocaPeriodo();
    }
    return false;
}



function mostraCalendario(disciplina) {
    var preferencias, isWeekly, isDaily;

    $.fancybox.showActivity();

    $(function () {
        $.ajax({
            async: false,
            dataType: 'json',
            type: 'post',
            url: urlCalendar,
            data: {
                what: 'preferencias'
            },
            success: function (data, status, xhr) {
                preferencias = data;
            }
        });

        isWeekly = preferencias.tipoVisualizacao == "W";
        isDaily = preferencias.tipoVisualizacao == "D";
    });

    $("<a />")
            .attr("href", "#modalCalendar")
            .fancybox({
                'type': 'inline',
                'autoDimensions': false,
                'width': 595,
                'height': 480,
                'onComplete': function() {
                    $.fancybox.changeSize(595, 480); //Garante o tamanho no IE8
                },
                'scrolling': 'no',
                'transitionIn': 'none'
            })
            .click(function (e) {
                // extrai os IDs da turma (cursoescola, materia, turma) a partir do link
                //XXX disciplina = $(this).parent().find("a").attr("href").substr(1);

                $("#modalCalendar")
                .html('<div class="box_cabe"><h2><a href="#">Calendário <span class="itslink">&raquo;</span></a></h2></div><div class="calendario"></div>')
                .find(".calendario")
                .append(
                    $("<div/>")
                    .attr("id", "scrollingDiv")
                    .append(
                        $("<div/>")
                        .attr("id", "fullCalLeft")
                        .append(
                            $("<div/>")
                            .attr("id", "calendarioDiv")
                        )
                        .append(
                            $("<br/>")
                        )
                        .append(
                            $("<div/>")
                            .attr("id", "disciplinaDiv")
                        )
                        .append(
                            $("<br/>")
                        )
                    )
                    .append(
                        $("<div/>")
                        .attr("id", "fullCalRight")
                        .append(
                            $("<div/>")
                            .attr("id", "selectionNav")
                        )
                        .append(
                            $("<div/>")
                            .attr("id", "ganttDiv")
                        )
                    )
                )
                .append(
                    $("<div/>")
                    .attr("id", "atividadeDiv")
                );

                $("#calendarioDiv").posiCalendario({
                    isDaily: isDaily,
                    isWeekly: isWeekly,
                    cursor: new Date(preferencias.intCalAno, preferencias.intCalMes, preferencias.intCalDia),
                    datasource: urlCalendar,
                    selectionNav: "#selectionNav",
                    imageBaseUrl: imageBaseUrl,
                    onSelection: function (date) {
                        $("#ganttDiv").posiGantt(
                            'gotoDate',
                            date.getFullYear(), date.getMonth(), date.getDate()
                        );
                    },
                    onMonth: function (date) {
                        $("#ganttDiv").posiGantt(
                            'changeView',
                            'month'
                        );
                    },
                    onWeek: function (date) {
                        $("#ganttDiv").posiGantt(
                            'changeView',
                            'basicWeek'
                        );
                    },
                    onDay: function (date) {
                        $("#ganttDiv").posiGantt(
                            'changeView',
                            'basicDay'
                        );
                    },
                    onPrev: function (date) {
                        $("#ganttDiv").posiGantt(
                            'prev'
                        );
                    },
                    onNext: function (date) {
                        $("#ganttDiv").posiGantt(
                            'next'
                        );
                    },
                    onToday: function (date) {
                        $("#ganttDiv").posiGantt('today')
                        .hide()
                        .fadeIn('slow');
                    }
                });

                $("#ganttDiv").posiGantt({
                    disciplinaSelector: "#disciplinaDiv",
                    atividadeSelector: "#atividadeDiv",
                    atividadeTogglerSelector: ".t-selection-nav .ftr",
                    datasource: urlCalendar,
                    disciplina: disciplina
                });
            })
            .click();
}
