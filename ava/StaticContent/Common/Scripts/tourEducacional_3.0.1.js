var idUsuarioCript = 0;
var strLogin = "";
var bolPrimeiroLogin = "False";
var bolAlunoSemTurma = "False";
var bolEntendi = "False";
var strTextoAlunoTurma = "Acesse aqui o grupo da sua turma<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>";
var strMsgMenu = "Encontre seções, ferramentas e recursos no menu.<br>Aqui você também pode acessar seu <b>perfil</b> e <b>grupos</b>, procurar <b>pessoas</b> da rede da sua escola e tirar suas dúvidas na <b>Central de Ajuda</b>.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>";
if (idUsuarioCript == 0) {
    var assincrono = false;
    if ($.browser.webkit) {
        assincrono = true
    }
    $.ajax({
        type: "POST",
        url: "/AVA/Login/Home/UsuarioCript",
        async: assincrono,
        success: function(a) {
        	console.log(a);
            idUsuarioCript = a
        },
        error: function(a) {
            if (a.status != 0) {
                idUsuarioCript = 0
            }
        }
    })
}
if (strLogin == 0) {
    $.ajax({
        url: "/AVA/Login/Home/GetLogin/",
        cache: false,
        success: function(a) {
            strLogin = a
        }
    })
}

function elementoVisivel(a) {
    var b;
    $(a).each(function() {
        if ($(this).is(":visible")) {
            if ($(this)[0].id == undefined || $(this)[0].id.length < 1) {
                b = a
            } else {
                b = "#" + $(this)[0].id
            }
        }
    });
    return b
}
var strLocationAtual = location.pathname.toLowerCase();
var bolEstaNoMural = strLocationAtual.endsWith("mural") || strLocationAtual.endsWith("mural/") || strLocationAtual.endsWith("mural/home") || strLocationAtual.endsWith("mural/home/") || strLocationAtual.endsWith("mural/home/index") || strLocationAtual.endsWith("mural/home/index/");
var executado = false;
$(window).load(function() {
    if (executado || !bolEstaNoMural) {
        return
    }
    executado = true;
    setTimeout(function() {
        startTourMural()
    }, 1000)
});
var introducao = "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/inicio2.svg' alt='Bem-vindo!'></header><h1>O Educacional está de cara nova!</h1><h3>Que tal conhecer as novidades?</h3> Clique em \"próximo\" para começar<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>";
var boxEmbreve;
var boxTurmas;
var boxProfessores;
var atividadesAgendadas;
var postagemModulo;
var agenda;
var boxAprimora;
var destaqueEducacional;
var livroDigital;
var intro;
var exibindoTutorial = false;
var tipoTour = 0;
// var menuAcessoRapido;
// var menuAtividades;
// var menuBiblioteca;
// var menuProjetos;
// var menuSPE;
// var menuPense;
// var menuCENTRAL;
// var menuSMART;
// var boxPERFIL;
// var notificacoes;
// var boxDigaLa;
// var boxCriarTarefa;
// var timeline;
// var boxNoticiasEscola;
// var secretaria;
// var atividades;

function executaTour(a) {
    if (!exibindoTutorial) {
        return
    }
    // menuAcessoRapido = elementoVisivel(".ava_li_acessorapido");
    // if (a && menuAcessoRapido == undefined) {
    //     return
    // }
    // menuAtividades = elementoVisivel(".ava_ativ");
    // menuBiblioteca = elementoVisivel(".ava_cont");
    // menuProjetos = elementoVisivel(".ava_cp");

    // menuSPE = elementoVisivel(".ava_lip.menu_spe");
    // menuPENSE = elementoVisivel(".menu_pense");
    // menuCENTRAL = elementoVisivel(".menu_central");
    // menuSMART = elementoVisivel(".menu_smart");

    boxPERFIL = elementoVisivel("#dadosPerfil");
    // notificacoes = elementoVisivel(".noti_li");
    // boxDigaLa = elementoVisivel("#digala_criar_tarefa");
    boxEmbreve = elementoVisivel("#atividadesDia");
    postagemModulo = elementoVisivel(".mural_header");
    // boxCriarTarefa = elementoVisivel("#menu_criar_tarefa");
    // timeline = elementoVisivel(".mural.ajx");
    boxTurmas = elementoVisivel("#minhas_turmas");
    boxProfessores = elementoVisivel("#sEducadores");
    // boxNoticiasEscola = elementoVisivel("#lista_noticias");
    atividadesAgendadas = elementoVisivel(".bloco_destaque.escola");
    agenda = elementoVisivel("#agenda_secretaria_atividade");
    if (agenda == undefined) {
        agenda = elementoVisivel(".bloco_agenda")
    }
    boxAprimora = elementoVisivel("#cardAprimora");
    // secretaria = elementoVisivel(".a_secretaria");
    // if (secretaria == undefined) {
    //     secretaria = elementoVisivel(".bloco_secretaria")
    // }
    // atividades = elementoVisivel(".a_atividades");
    // if (atividades == undefined) {
    //     atividades = elementoVisivel(".bloco_atividades")
    // }
    destaqueEducacional = elementoVisivel("#icon_destaque");
    livroDigital = elementoVisivel(".ava_lip.menu_livro");
    if (!a) {
        intro = introJs()
    }
    switch (tipoTour) {
        case 1:
            setupTourEducador();
            break;
        case 2:
            setupTourAluno();
            break;
        case 3:
            setupTourResponsavel();
            break;
        default:
            return;
            break
    }
    intro.setOptions({
        doneLabel: "Fechar",
        skipLabel: "Fechar",
        nextLabel: "Próximo",
        prevLabel: "Anterior"
    });
    intro.oncomplete(function() {
        intro.exit()
    });
    intro.onexit(function() {
        exibindoTutorial = false;
        $("body").removeClass("tour-on")
    });
    if (!a) {
        $(".introjs-helperLayer").each(function() {
            $(this).remove()
        });
        $(".introjs-tooltipReferenceLayer").each(function() {
            $(this).remove()
        });
        $(".introjs-overlay").each(function() {
            $(this).remove()
        });
        $("body").addClass("tour-on");
        intro.start()
    }
}

function startTourMural() {
    $.ajax({
        url: "/AVA/Barras/Home/GetPrimeiroLogin/",
        async: false,
        cache: false,
        success: function(g) {
            bolPrimeiroLogin = g
        }
    });
    $.ajax({
        url: "/AVA/Barras/Home/getVisualizaTourMural/",
        async: false,
        cache: false,
        success: function(g) {
            bolEntendi = g
        }
    });
    if (bolPrimeiroLogin.toLowerCase() == "true" || bolEntendi.toLowerCase() == "false") {
        var c = false;
        var f = false;
        var e = false;
        var d = false;
        $.ajax({
            url: "/AVA/Barras/Home/GetAlunoSemTurma/",
            cache: false,
            success: function(g) {
                bolAlunoSemTurma = g
            }
        });
        var a = $.jStorage.get("VerificaSeEResponsavel" + idUsuarioCript);
        if (a) {
            var b = a.split("_");
            if (b[0] == "True" && b[1] == "True") {
                f = true
            } else {
                if (b[0] == "False" && b[1] == "True") {
                    f = true
                } else {
                    if (b[0] == "True" && b[1] == "False") {
                        e = true
                    } else {
                        if (b[0] == "False" && b[1] == "False") {
                            c = true
                        } else {
                            console.log("Papel não identificado")
                        }
                    }
                }
            }
            iniciaTour(f, e, c)
        } else {
            $.ajax({
                url: "/AVA/Login/Home/GetLogin/",
                cache: false,
                success: function(g) {
                    idUsuarioPublico = g;
                    $.ajax({
                        url: "/AVA/Barras/Home/VerificaSeEResponsavel/",
                        cache: false,
                        data: {
                            strLogin: idUsuarioPublico
                        },
                        success: function(h) {
                            var i = h.split("_");
                            if (i[0] == "True" && i[1] == "True") {
                                f = true
                            } else {
                                if (i[0] == "False" && i[1] == "True") {
                                    f = true
                                } else {
                                    if (i[0] == "True" && i[1] == "False") {
                                        e = true
                                    } else {
                                        if (i[0] == "False" && i[1] == "False") {
                                            c = true
                                        } else {
                                            console.log("Papel não identificado")
                                        }
                                    }
                                }
                            }
                            iniciaTour(f, e, c)
                        }
                    })
                }
            })
        }
    }
}

// AQUI INICIA O TOUR

function iniciaTour(c, b, a) {
    if (a) {
        $.ajax({
            url: "/AVA/Barras/Home/GetAlunoSemTurma/",
            cache: false,
            success: function(d) {
                if (d.toLowerCase() == "true") {
                    strTextoAlunoTurma = "Aqui, você verá seus colegas de turma!<br><br><input type='button' class='introjs-button introjs-naoquerover'value='Não me mostrar mais isso' onclick='javascript:setTourMuralCompleto();'"
                }
            }
        })
    }
    if (_projeto.indexOf("mural") > -1) {
        if (bolEntendi.toLowerCase() == "false") {
            if (c) {
                exibindoTutorial = true;
                tipoTour = 1;
                executaTour(false)
            } else {
                if (a) {
                    exibindoTutorial = true;
                    tipoTour = 2;
                    executaTour(false)
                } else {
                    if (b) {
                        exibindoTutorial = true;
                        tipoTour = 3;
                        executaTour(false)
                    }
                }
            }
        }
    }
}

// AQUI INICIA O TOUR PERFIL EDUCADOR

function setupTourEducador() {
    var a = [{
        intro: introducao
    }];
    // if (menuAcessoRapido != undefined && menuAcessoRapido.length > 0) {
    //     a.push({
    //         element: menuAcessoRapido,
    //         intro: strMsgMenu
    //     })
    // }
    // if (menuAtividades != undefined && menuAtividades.length > 0) {
    //     a.push({
    //         element: menuAtividades,
    //         intro: "Crie e agende atividades para suas turmas.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente.</a>"
    //     })
    // }
    // if (menuBiblioteca != undefined && menuBiblioteca.length > 0) {
    //     a.push({
    //         element: menuBiblioteca,
    //         intro: "Veja conteúdos exclusivos para cada nível de ensino.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente.</a>"
    //     })
    // }
    // if (menuProjetos != undefined && menuProjetos.length > 0) {
    //     a.push({
    //         element: menuProjetos,
    //         intro: "Nesta área se encontram os projetos do Educacional.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente.</a>"
    //     })
    // }
    // if (notificacoes != undefined && notificacoes.length > 0) {
    //     a.push({
    //         element: notificacoes,
    //         intro: "Aqui são indicadas as notificações da rede social da sua escola.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente.</a>",
    //         position: "left"
    //     })
    // }
     // if (boxCriarTarefa != undefined && boxCriarTarefa.length > 0) {
    //     a.push({
    //         element: boxCriarTarefa,
    //         intro: "Aproveite para criar e agendar tarefas para seus alunos de forma rápida e fácil pelo mural.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (timeline != undefined && timeline.length > 0) {
    //     a.push({
    //         element: timeline,
    //         intro: "<h3>Agora a área de comunicação está mais próxima de você.</h3><p>Facilitando a troca de ideias.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
     // if (secretaria != undefined && secretaria.length > 0) {
    //     a.push({
    //         element: secretaria,
    //         intro: "Tenha acesso às suas ferramentas administrativas.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (boxNoticiasEscola != undefined && boxNoticiasEscola.length > 0) {
    //     a.push({
    //         element: boxNoticiasEscola,
    //         intro: "Notícias e eventos da sua escola.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }

    // if (menuSPE != undefined && menuSPE.length > 0) {
    //     a.push({
    //         element: menuSPE,
    //         intro: "<h3>Positivo ON</h3><p>Clicando aqui, você acessa sua conta no Sistema Positivo ON.</p> <br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuPENSE != undefined && menuPENSE.length > 0) {
    //     a.push({
    //         element: menuPENSE,
    //         intro: "<h3>Pense Matemática</h3><p>Clicando aqui, você acessa sua conta no Pense Matemática.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuCENTRAL != undefined && menuCENTRAL.length > 0) {
    //     a.push({
    //         element: menuCENTRAL,
    //         intro: "<h3>Central Aprimora</h3><p>Clicando aqui, você acessa sua conta na Central Aprimora.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }

    // if (boxDigaLa != undefined && boxDigaLa.length > 0) {
    //     a.push({
    //         element: boxDigaLa,
    //         intro: "<h3>Compartilhe textos, imagens, vídeos e arquivos.</h3><p>Agora seus colegas de classe e professores podem visualizar suas publicações.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }

     // if (agenda != undefined && agenda.length > 0) {
    //     a.push({
    //         element: agenda,
    //         intro: "<h3>Lembre-se de compromissos.</h3><p>Crie e visualize eventos na sua agenda.<p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }
    // if (boxTurmas != undefined && boxTurmas.length > 0) {
    //     a.push({
    //         element: boxTurmas,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/destaques.svg' alt='Destaques'></header><h3>Encontre suas turmas.</h3><p>Acesse seus grupos aqui.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "right"
    //     })
    // }
    // if (boxProfessores != undefined && boxProfessores.length > 0) {
    //     a.push({
    //         element: boxProfessores,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/destaques.svg' alt='Destaques'></header><h3>Encontre outros professores nesta área.</h3><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "right"
    //     })
    // }
   if (postagemModulo != undefined && postagemModulo.length > 0) {
        a.push({
            element: postagemModulo,
            intro: "<header id='introImg'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/conclusaoApr.png' alt='Conclusão de Módulo no Aprimora'></header><h3>Agora seus alunos podem visualizar publicações especiais ao concluir um módulo no Aprimora Smart.</h3><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position:"floating"
        })
    }
     if (atividadesAgendadas != undefined && atividadesAgendadas.length > 0) {
        a.push({
            element: atividadesAgendadas,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/agendadas.svg' alt='Destaques'></header><h3>As tarefas criadas e agendadas por você ficarão visíveis aqui.</h3><p>Alunos, coordenadores e professores cadastrados nas turmas poderão visualizar todas as tarefas nesta lista.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "left"
        })
    }
   
   
   if (boxPERFIL != undefined && boxPERFIL.length > 0) {
        a.push({
            element: boxPERFIL,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/perfil.svg' alt='Destaques'></header><h3>Visualize o resumo dos seus dados e links rápidos.</h3><p>Reunimos aqui seus principais dados e links mais acessados.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "right"
        })
    }
    
    if (destaqueEducacional != undefined && destaqueEducacional.length > 0) {
        a.push({
            element: destaqueEducacional,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/destaques.svg' alt='Destaques'></header><h3>Agora a área de destaques está flexível.</h3> <p>Isso evitará distrações e deixará você com mais espaço para navegar.</p> <br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "left"
        })
    }
    
    intro.setOptions({
        steps: a
    })
}

// AQUI INICIA O TOUR PERFIL ALUNO

function setupTourAluno() {
    var a = [{
        intro: introducao
    }];
    
    if (boxEmbreve != undefined && boxEmbreve.length > 0) {
        a.push({
            element: boxEmbreve,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/embreve.svg' alt='Atividades que encerram em breve'></header><h3>Visualize todas as atividade que encerram em breve.</h3><p>As atividades listadas nesta área aparecem com o prazo de 24 horas antes do encerramento.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position:"bottom"
        })
    }
if (postagemModulo != undefined && postagemModulo.length > 0) {
        a.push({
            element: postagemModulo,
            intro: "<header id='introImg'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/conclusaoApr.png' alt='Conclusão de Módulo no Aprimora'></header><h3>Agora você visualizará publicações especiais sempre que concluir um módulo no Aprimora Smart.</h3><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position:"floating"
        })
    }
    if (atividadesAgendadas != undefined && atividadesAgendadas.length > 0) {
        a.push({
            element: atividadesAgendadas,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/agendadas.svg' alt='Atividades agendadas'></header><h3>Visualize todas as atividades agendadas para sua turma.</h3><p>Você visualizará todas as atividades pela data de encerramento mais próxima.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position:"left"
        })
    }
    
  
    if (boxAprimora != undefined && boxAprimora.length > 0) {
        a.push({
            element: boxAprimora,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/indicacoes.svg' alt='Indicações'></header><h3>Aqui ficam localizadas as indicações do Aprimora.</h3><p>Agora ficou bem mais fácil visualizar as dicas dos professores.<p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position:"top"
        })
    }

    if (boxPERFIL != undefined && boxPERFIL.length > 0) {
        a.push({
            element: boxPERFIL,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/perfil.svg' alt='Meu perfil'></header><h3>Visualize o resumo dos seus dados e links rápidos.</h3><p>Reunimos aqui seus principais dados e links mais acessados.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "right"
        })
    }
    if (destaqueEducacional != undefined && destaqueEducacional.length > 0) {
        a.push({
            element: destaqueEducacional,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/destaques.svg' alt='Destaques'></header><h3>Agora a área de destaques está flexível.</h3> <p>Isso evitará distrações e deixará você com mais espaço para navegar.</p> <br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "left"
        })
    }
      // if (agenda != undefined && agenda.length > 0) {
    //     a.push({
    //         element: agenda,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/agenda.svg' alt='Agenda'></header><h3>Lembre-se dos eventos e atividades da escola.</h3><p>Visualize todos os eventos e atividades na sua agenda.<p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position:"left"
    //     })
    // }
    // if (menuSPE != undefined && menuSPE.length > 0) {
    //     a.push({
    //         element: menuSPE,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/links.svg' alt='Positivo ON'></header><h3>Positivo ON</h3><p>Clicando aqui, você acessa sua conta no Sistema Positivo ON.</p> <br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuPENSE != undefined && menuPENSE.length > 0) {
    //     a.push({
    //         element: menuPENSE,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/links.svg' alt='Pensa Matemática'></header><h3>Pense Matemática</h3><p>Clicando aqui, você acessa sua conta no Pense Matemática.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuSMART != undefined && menuSMART.length > 0) {
    //     a.push({
    //         element: menuSMART,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/links.svg' alt='Aprimora Smart'></header><h3>Aprimora Smart</h3><p>Clicando aqui, você acessa sua conta no Aprimora Smart.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuAcessoRapido != undefined && menuAcessoRapido.length > 0) {
    //     a.push({
    //         element: menuAcessoRapido,
    //         intro: strMsgMenu
    //     })
    // }
    // if (menuAtividades != undefined && menuAtividades.length > 0) {
    //     a.push({
    //         element: menuAtividades,
    //         intro: "Acesse as atividades agendadas para você realizar e consulte seu desempenho.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuBiblioteca != undefined && menuBiblioteca.length > 0) {
    //     a.push({
    //         element: menuBiblioteca,
    //         intro: "Conteúdos exclusivos para ajudar você nos estudos.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuProjetos != undefined && menuProjetos.length > 0) {
    //     a.push({
    //         element: menuProjetos,
    //         intro: "Nesta área se encontram os projetos do Educacional.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (livroDigital != undefined && livroDigital.length > 0) {
    //     a.push({
    //         element: livroDigital,
    //         intro: "Acesse os materiais exclusivos do Sistema Positivo de Ensino.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (notificacoes != undefined && notificacoes.length > 0) {
    //     a.push({
    //         element: notificacoes,
    //         intro: "Aqui são indicadas as notificações da rede social da sua escola.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }
     // if (timeline != undefined && timeline.length > 0) {
    //     a.push({
    //         element: timeline,
    //         intro: "Agora a área de comunicação está mais próxima de você, facilitando o compartilhamento de mensagens.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
      // if (secretaria != undefined && secretaria.length > 0) {
    //     a.push({
    //         element: secretaria,
    //         intro: "Aqui, acesse seus materiais e ferramentas administrativas.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (destaquesEscola != undefined && destaquesEscola.length > 0) {
    //     a.push({
    //         element: destaquesEscola,
    //         intro: "Novidades, avisos e notícias destacadas na Página da Escola.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }
     // if (boxAlunos != undefined && boxAlunos.length > 0) {
    //     a.push({
    //         element: boxAlunos,
    //         intro: "<h3>Encontre outros professores nesta área.</h3><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "right"
    //     })
    // }
    // if (boxNoticiasEscola != undefined && boxNoticiasEscola.length > 0) {
    //     a.push({
    //         element: boxNoticiasEscola,
    //         intro: "Notícias e eventos da sua escola.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }

    // if (boxDigaLa != undefined && boxDigaLa.length > 0) {
    //     a.push({
    //         element: boxDigaLa,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/digala.svg' alt='Mural'></header><h3>Compartilhe textos, imagens, vídeos e arquivos.</h3><p>Agora seus colegas de classe e professores podem visualizar suas publicações.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position:"bottom"
    //     })
    // }
    // if (boxTurmas != undefined && boxTurmas.length > 0) {
    //     a.push({
    //         element: boxTurmas,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/turma.svg' alt='Minha turma'></header><h3>Encontre seus colegas de classe.</h3><p>Clique na foto para ver o perfil do aluno.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "right"
    //     })
    // }
   
    // if (boxProfessores != undefined && boxProfessores.length > 0) {
    //     a.push({
    //         element: boxProfessores,
    //         intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/professores.svg' alt='Professores'></header><h3>Encontre seus professores nesta área.</h3><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "right"
    //     })
    // }
    

    intro.setOptions({
        steps: a
    });
    intro.onafterchange(function(b) {
        lastClass = $(b).attr("class");
        lastIdElem = $(b).attr("id")
    })
}

// AQUI INICIA O TOUR PERFIL RESPONSAVEL

function setupTourResponsavel() {
    var a = [{
        intro: introducao
    }];
    
    if (postagemModulo != undefined && postagemModulo.length > 0) {
        a.push({
            element: postagemModulo,
            intro: "<header id='introImg'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/conclusaoApr.png' alt='Conclusão de Módulo no Aprimora'></header><h3>Você visualizará publicações especiais sempre que seus filhos concluírem um módulo no Aprimora Smart.</h3><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position:"floating"
        })
    }

    if (atividadesAgendadas != undefined && atividadesAgendadas.length > 0) {
        a.push({
            element: atividadesAgendadas,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/agendadas.svg' alt='Meu perfil'></header><h3>Agora você pode visualizar as atividades agendadas para seus filhos.</h3><p>Você visualizará todas as atividades pela data de encerramento mais próxima.</p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "left"
        })
    }
    
    
    if (boxPERFIL != undefined && boxPERFIL.length > 0) {
        a.push({
            element: boxPERFIL,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/perfil.svg' alt='Meu perfil'></header><h3>Visualize o resumo dos seus dados e links rápidos.</h3><p>Reunimos aqui seus principais dados e links mais acessados.</p>.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "right"
        })
    }
    if (destaqueEducacional != undefined && destaqueEducacional.length > 0) {
        a.push({
            element: destaqueEducacional,
            intro: "<header id='introIcon'><img class='animated bounceIn' src='/Ava/StaticContent/Common/img/tourAVA/destaques.svg' alt='Meu perfil'></header><h3>Agora a área de destaques está flexível.</h3> <p>Isso evitará distrações e deixará você com mais espaço para navegar.</p> <br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
            position: "left"
        })
    }
// if (menuAcessoRapido != undefined && menuAcessoRapido.length > 0) {
    //     a.push({
    //         element: menuAcessoRapido,
    //         intro: strMsgMenu
    //     })
    // }
    // if (menuAtividades != undefined && menuAtividades.length > 0) {
    //     a.push({
    //         element: menuAtividades,
    //         intro: "Consulte as atividades agendadas para seu filho aqui.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuBiblioteca != undefined && menuBiblioteca.length > 0) {
    //     a.push({
    //         element: menuBiblioteca,
    //         intro: "Veja conteúdos exclusivos para cada nível de ensino.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (menuProjetos != undefined && menuProjetos.length > 0) {
    //     a.push({
    //         element: menuProjetos,
    //         intro: "Acesse aqui os projetos do Educacional.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (notificacoes != undefined && notificacoes.length > 0) {
    //     a.push({
    //         element: notificacoes,
    //         intro: "Aqui são indicadas as notificações da rede social da sua escola.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }
    // if (timeline != undefined && timeline.length > 0) {
    //     a.push({
    //         element: timeline,
    //         intro: "Visualize, nesta área, as publicações enviadas para seu filho e você.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
    // if (secretaria != undefined && secretaria.length > 0) {
    //     a.push({
    //         element: secretaria,
    //         intro: "Acesse as ferramentas administrativas dos seus filhos.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>"
    //     })
    // }
     // if (destaqueEducacional != undefined && destaqueEducacional.length > 0) {
    //     a.push({
    //         element: destaqueEducacional,
    //         intro: "Área com as principais novidades e publicações em destaque do Educacional.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }
    // if (boxNoticiasEscola != undefined && boxNoticiasEscola.length > 0) {
    //     a.push({
    //         element: boxNoticiasEscola,
    //         intro: "Notícias e eventos da sua escola.<br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position: "left"
    //     })
    // }
    // if (agenda != undefined && agenda.length > 0) {
    //     a.push({
    //         element: agenda,
    //         intro: "<h3>Lembre-se de compromissos.</h3><p>Crie e visualize eventos na sua agenda.<p><br><br><a href='javascript:setTourMuralCompleto();' class='exit-tour'>Não mostrar novamente</a>",
    //         position:"left"
    //     })
    // }
   
    intro.setOptions({
        steps: a
    })
}

// TOUR COMPLETO

function setTourMuralCompleto() {
    $.ajax({
        url: "/AVA/Barras/Home/saveVisualizaTourMural/",
        async: false,
        cache: false,
        success: function(a) {
            if (a == "OK") {
                console.log("Removido do tour do Mural")
            }
        }
    });
    intro.exit()
};