var url;
url = location.href.toLowerCase();
var seletorAvaAgenda = 0;
var dataReal = new Date();
// var dataRealAux = dataReal.split("/")[2] + "/" + dataReal.split("/")[1] + "/" + dataReal.split("/")[0];
// var dataRealAux2 = dataReal.split("/")[0] + "-" + dataReal.split("/")[1] + "-" + dataReal.split("/")[2];
var tpClickAgenda = "click";
var g_Filhos = [];
var g_PessoaSelecionada = 0;

var g_Date = new Date().getMonth() ;

var intOne = undefined;
var intTwo = undefined;
var intThree = undefined;


//Agenda do Agenda.EDU
jQuery(function(d) {
    
    if (Modernizr.touch) {
        tpClickAgenda = "touchstart"
    }
    var c = new Array();
    
   
    carregaAgendaEdu();
    var g = new Array();
    var e = null;
    

    
    
    
   
   
  
    
   
    // d("body").on("click", ".proximo_dia_agenda", function(k) {
    //     console.log('Direita');
    //     k.preventDefault();
    //     var l = d("<li>");
    //     l.addClass("carregando_center");
    //     l.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
    //     d(".visualizar_evento").find("ul").not(".filtro_agenda_home").empty().append(l);
    //     var h = d(".ui-state-active");
    //     if (h.parent().next().size() > 0) {
    //         h.parent().next().children("a:first").trigger("click")
    //     } else {
    //         h.parent().parent().next().children("td:first").children("a:first").trigger("click")
    //     }
    //     //dev
    // });
    // d("body").on("click", ".anterior_dia_agenda", function(k) {
    //     console.log('Esquerda');
        
    //     k.preventDefault();
    //     var l = d("<li>");
    //     l.addClass("carregando_center");
    //     l.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
    //     d(".visualizar_evento").find("ul").not(".filtro_agenda_home").empty().append(l);
    //     var h = d(".ui-state-active");
    //     if (h.parent().prev().size() > 0) {
    //         h.parent().prev().children("a:first").trigger("click")
    //     } else {
    //         h.parent().parent().prev().children("td:last").children("a:first").trigger("click")
    //     }
    // });
   
   
    
    

    
        
});



function carregaAgendaEdu() {
    
    var c = parseInt($("body").data("bolclube"));
    
    var b = "MINHA AGENDA";
    
    if (location.href.toLowerCase().indexOf("/ava/pagina/") > 0) {
        b = "AGENDA DE PROJETOS";
        if ($("#idPagina").val() > 2) {
            b = "AGENDA DA ESCOLA"
        }
    }
    
    $("#agenda_reduzida").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
    $("#ava_barralateral-direita  .bcs1 header h1").text(b);
    $("#dadosAgenda").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
        


        $.ajax({
            type: "POST",
            url: "/AVA/Agenda/Home/AgendaEdu",
            async: true,
            data: {
                strURL: location.href
            },
            success: function(d) {
                                
                $("#syncAgendaEdu").html(d);
                $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                $("#calendar1").wijcalendar({
                    culture: "pt-BR",
                    displayDate: new Date(dataReal)
                });

                $('ui-datepicker-calendar wijmo-wijcalendar-table').hide();
                        
                // $(".boxAgendaReduzida").show();
                        //adequaAgendaNovaHome();
                        //mostraFilhos(0);
            },
            error: function(d) {
                if (d.status != 0) {
                    console.debug("Ocorreu um erro na busca da agenda")
                }
            }
        });

        // $.ajax({
        //     type: "POST",
        //     // contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        //     url: "/AVA/Agenda/AgendaEdu",
        //     data: {
        //         strURL: location.href
        //     },
        //     success: function(d) {
                                
        //         $("#syncAgendaEdu").html(d);
        //         $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        //         $("#calendar1").wijcalendar({
        //             culture: "pt-BR",
        //             displayDate: new Date(dataReal)
        //         });
                
        //         $(".boxAgendaReduzida").show();
        //         //adequaAgendaNovaHome();
        //         //mostraFilhos(0);
            
        //     },
        //     error: function(d) {
        //         if (d.status != 0) {
        //             console.debug("Ocorreu um erro na busca da agenda")
        //         }
        //     }
        // })
}   
        //     else {
                
        //         $(".bcs1, .boxAgendaReduzida").hide()
            
            
        // }
  