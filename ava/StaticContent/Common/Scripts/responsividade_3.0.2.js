﻿function exibeTela(){$("#imageLoadContent").remove(),$("#colunaDireita").show(),$("#colunaEsquerda").show(),controlaMenuBlocoInteracao(),destaques()}function processaResolucao(){var e=identificaResolucaoTela();e!=resolucaoGlobal&&(resolucaoGlobal=e,responsividade())}function identificaResolucaoTela(){var e=window.innerWidth;return 1024>e?768:e>1319?1320:1024}function responsividade(){blocoAgendaSecretariaAtividades(resolucaoGlobal),blocoDestaqueEscola(resolucaoGlobal),blocoDestaqueEducacional(resolucaoGlobal),blocoListaNoticias(resolucaoGlobal),processaAVAPuro(),setTimeout(function(){controlaMenuBlocoInteracao()},20),setTimeout(function(){executaTour(!0)},100)}function removeAtividadesSeNaoAluno(){(!eAluno||bolCPPuro)&&($("#menu_atividade").remove(),$("#sLista_atividade").remove())}function removeMinhasTurmasSeApenasResponsavel(){!eResponsavel||eAluno||eEducador||eCoordenador||eAdmRedeSocial||$("#minhas_turmas").remove()}function blocoListaNoticias(e){var a=$("#lista_noticias");a.html()&&(e>1024?$("#minhas_turmas").html()&&a.removeClass("bl_1").addClass("bl_2"):a.removeClass("bl_2").addClass("bl_1"))}function blocoDestaqueEducacionalMural(){blocoDestaqueEducacional(resolucaoGlobal),blocoAgendaSecretariaAtividades(resolucaoGlobal)}function blocoDestaqueEducacional(e){var a=$("#destaqueEducacional");if(a.html()){var o=!$("#minhas_turmas").html()&&!$("#destaqueEscola").html()||$("#minhas_turmas").html()&&$("#destaqueEscola").html();if(o?a.removeClass("bl_2").addClass("bl_1"):(a.removeClass("bl_1").addClass("bl_2"),a.find(".bloco_conteudo.destaque .lista_destaques li a p").expander({slicePoint:45,expandText:"",expandPrefix:"...",userCollapseText:"",preserveWords:!1,expandEffect:"none",collapseEffect:"none",moreClass:"leia_mais"})),e>1024)a.hide();else{var s=a.find(".nav_footer ul li"),i=s.length,l=parseInt(a.find(".nav_footer").attr("max"),10);1024==e&&a.hasClass("bl_1")?i>2?s.each(function(){$(this).attr("order")>(i+1)/2&&($(this).hide(),l--)}):(a.find(".nav_carrosel").hide(),s.hide()):(i>1&&a.find(".nav_carrosel").show(),s.show(),l=i),a.find(".nav_footer").attr("max",l),a.show()}}}function blocoDestaqueEscola(e){var a=$("#destaqueEscola");if(a.html()){{var o=$("#destaqueEscolaColFixa");$("#conteudoFixoColunaDireita")}1320>e?e>768||eAluno?(1024>=e||eAluno)&&a.show():(a.hide(),o.removeClass("bl_1").addClass("bl_2").insertAfter($("#agenda_secretaria_atividades"))):(a.hide(),$("#conteudoFixoColunaDireita").prepend(o.removeClass("bl_2").addClass("bl_1")))}}function blocoAgendaSecretariaAtividades(e){var a=$("#agenda_secretaria_atividades"),o=$("#sLista_atividade");if(768<e)if($("#colunaDireita").prepend(a),eAluno&&!bolCPPuro)$("#menu_atividade").show(),o.insertBefore("#agenda").removeClass("bl_2").addClass("bl_1"),clickBloco("#menu_atividade","#sLista_atividade");else{var s=$("#cont_secre"),i=$("#agenda").removeClass("bl_2").addClass("bl_1");a.append(i).show(),s.removeClass("ajx bl_2").addClass("bl_1").insertAfter(i),clickBloco("#menu_agenda","#agenda")}else!bolAVAPuro||$("#destaqueEduColFixa").html()||eAluno||$("#cont_secre").html()?$("#colunaEsquerda").prepend(a):$("#colunaDireita").prepend(a.addClass("ava_puro")),clickBloco("#menu_agenda","#agenda"),eAluno&&!bolCPPuro&&($("#menu_atividade").hide(),o.removeClass("bl_1").addClass("bl_2").insertBefore(a).show());separaSecretariaAgenda(e),location.search.endsWith("?menuSecretaria=True")&&(clickBloco("#menu_secretaria",".bloco_secretaria"),768!=e||$("#agenda_secretaria_atividades").find("#cont_secre").html()||($("#agenda").show(),$("#tabs").children().removeClass("ativo")))}function headerAgenda(){768==resolucaoGlobal&&$("#tabs").hasClass("ntab_1")?($("#agenda .bloco_tit").show(),$("#tabs").hide()):($("#agenda .bloco_tit").hide(),$("#tabs").show())}function separaSecretariaAgenda(e){if(!eAluno&&!$("#destaqueEscolaColFixa").html()&&$("#cont_secre").html()){var a=$("#agenda_secretaria_atividades"),o=$("#cont_secre"),s=$("#agenda"),i=$("#menu_secretaria");e>768?(i.show(),o.removeClass("ajx bl_2").addClass("bl_1").insertAfter(s),clickBloco("#menu_agenda","#agenda")):(i.hide(),i.removeClass("ativo"),o.removeClass("bl_1").addClass("ajx bl_2").insertAfter(a),carregaSecretaria(void 0,o),o.show(),s.show())}}function separaSecretariaAgendaMural(){separaSecretariaAgenda(resolucaoGlobal)}function clickBloco(e,a){var o=$(e);if(!o.hasClass("ativo")){$("#tabs").children().removeClass("ativo");{$("#menu_atividade"),$("#menu_agenda"),$("#menu_secretaria")}"768"!=resolucaoGlobal&&$(".bloco_atividades").hide(),$("#cont_secre").hide(),$("#agenda").hide();var s=$(a);s.hasClass("bloco_secretaria")&&carregaSecretaria(o,s),o.addClass("ativo"),s.show()}}function destaques(){$("#colunaDireitaFixa").html()&&($("#conteudoFixoColunaDireita").html().trim()||$("#colunaDireitaFixa").remove())}function processaAVAPuro(){bolAVAPuro&&$("#cont_secre").html()&&(bolCPPuro||($("body").addClass("modular"),$("#destaqueEduColFixa").remove(),$("#destaqueEducacional").remove()),$("#lista_noticias").remove(),eCoordenador||eAdmRedeSocial?($("#menu_secretaria").text("Administração"),$("#cont_secre .bloco_tit").text("Administração")):($("#menu_secretaria").remove(),$("#cont_secre").remove()))}function controlaMenuBlocoInteracao(){var e=0;$("#tabs").show(),$("#menu_secretaria").is(":visible")&&(e+=1),$("#menu_atividade").is(":visible")&&(e+=1),$("#menu_agenda").is(":visible")&&(e+=1),$("#tabs").removeClass().addClass("ntab ntab_"+e),e>1?$("#tabs > li.ativo").removeAttr("style"):$("#tabs > li.ativo").css("border","0px"),headerAgenda()}var resolucaoGlobal="";jQuery(window).ready(function(){$('<img id="imageLoadContent" src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif" style="display:block; position: relative; padding-left: 47%; padding-top: 30%;" />').insertBefore("#colunaEsquerda"),carregaAgenda(),removeAtividadesSeNaoAluno(),removeMinhasTurmasSeApenasResponsavel(),processaResolucao()}),jQuery(window).resize(function(){processaResolucao()}),jQuery(window).load(function(){exibeTela()});