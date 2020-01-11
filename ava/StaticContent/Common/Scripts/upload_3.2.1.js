var globalStrNome;
var globalStrDescricao;
var globalAuxCancelar = false;
var globalAuxSlide = false;
var arraySelecionados = new Array();
var arraySelecionadosHtml = new Array();
var jcrop_api;
var bolCrop = false;
var bolTamanhoImg = false;
var globalSelecionados = false;
var idArquivoGlobalAux = 0;
var strNomeArquivoGlobalAux = "";
var bolAuxDeletarimg = false;
var imgPerfilAtualAux = "";
var bolAtualizouContador = false;
var bolListouArquivosBiblioteca = false;
var bolCarregouPreSelecionados = false;

var globalVisitado = 0 ;

window.onbeforeunload = function (a) {
    deletarImagemProcessoIncompleto(
        idArquivoGlobalAux,
        strNomeArquivoGlobalAux,
        false
    )
};
function windowBeforeUnload() {
    deletarImagemProcessoIncompleto(
        idArquivoGlobalAux,
        strNomeArquivoGlobalAux,
        false
    )
}
function offBeforeUnload(a) {
    $(window).off("beforeunload")
}
jQuery(function (b) {

    console.log('Open Upload');
   
    $(".alert").hide();
    var a = b("#idFerramentaTipo").val();

    var idVisitado = b("#idVisitado").val();

    // console.log('Valor de b   '+b);
    // console.log('Valor de a   '+a);
    // console.log('Atualiza o contador');
    console.log('O valor de A é na verdade '+a);

    
    if(a == 35  ){

       
        AtualizaContador();

    }

    else if ( idVisitado > 0  ){

        AtualizaContadorCorteAluno();

    }
    else if(a == 46){

        AtualizaContadorArquivos();

    }

    else if(a == 37){

        AtualizaContadorArquivos();

    }
    else if( a == 15 ){

        AtualizaContadorTodosArquivos();

    }
    else if ( a == 31  ){

        AtualizaContador();

    }

    //43 é para Banner
    else if ( a == 43  ){

       
        AtualizaContador();

    }

    else if ( a == 44  ){

       
        AtualizaContadorCp();

    }
    else if ( a == 32  ){

       
        AtualizaContador();

    }
    else if ( a == 36  ){

       
        AtualizaContador();

    }

    else if ( a == 48  ){

       
        AtualizaContador();

    }
    
    else if ( a == 41  ){

       
        AtualizaContador();

    }

    else if ( a == 42  ){

       
        AtualizaContadorArquivos();

    }



    imgPerfilAtualAux = b("#imgPerfilAtualAux").val();
    
    //Verificar se é 0 
    // ListaArquivosBiblioteca(a, 0);


    b(".tabs a").click(function () {
        b(".tabs li").removeClass("active");
        b(this)
            .parent()
            .addClass("active")
    });
    b("#btn_cancelar").click(function () {
        console.log("upload.js entro no btn_cancelar");
        window.close();
        window.parent.$('#previewFileDigaLaNovo').dialog('close');
        window.parent.$('#previewUpload').dialog('close');
        
        window.parent.$('#previewImagemDigaLaNovo').dialog('close');
        window.parent.$('#previewImagemDigaLaNovoTurma').dialog('close');
        window.parent.$('#previewImagemDigaLaGrupo').dialog('close');
        window.parent.$('#previewFileDigaLaGrupo').dialog('close');
        window.parent.$('#previewImagemDigaLaPerfil').dialog('close');
        window.parent.$('#previewImagemMural').dialog('close');
        window.parent.$('#previewImagemTumaTarefa').dialog('close');
        window.parent.$('#previewArquivosCriarTarefa').dialog('close');
        
        window.parent.$('#previewImagemDigaLaPagina').dialog('close');
        window.parent.$('#previewFileDigaLaPagina').dialog('close');

        
        
        console.log("entro no btn_cancelar");



    });
    b("#btn_salvarGeral").click(function () {

        console.log('LU');

        if (!b("#btn_salvarGeral").hasClass("disable")) {
            console.log('TESTE');           

            bolAuxDeletarimg = false;
            var c = b("#idFerramentaTipo").val();
            var e = b("#idFerramenta").val();
            var d = 0;
            if (!validaBolCrop()) {
                if (arraySelecionados.length > 0) {
                    b("#btn_salvarGeral").addClass("disable");
                    b.ajax({
                        async   : false,
                        data    : {
                            idFerramentaTipo: c,
                            idsArquivos     : arraySelecionados.join(";")
                        },
                        dataType: "json",
                        error   : function (h, f, g) {
                            console.log("Erro: " + g + "Status: " + f);
                            b("#btn_salvarGeral").removeClass("disable")
                        },
                        success : function (i, g) {

                            console.log('ADICIONOU');

                            var f = jQuery.parseJSON(JSON.stringify(i));
                            if (f.erro.length > 0) {                                
                                console.log('LU');

                                jAlert(f.erro, "")
                               
                                
                            } else {
                                var h = {
                                    arrayArquivo    : f.jsonArray,
                                    idFerramenta    : e,
                                    idFerramentaTipo: c
                                };

                                try{
                                if (window.opener) {
                                    if (window.opener.CallbackUpload) {
                                        if (typeof(window.opener.CallbackUpload) == "function") {
                                            window
                                                .opener
                                                .CallbackUpload(h);
                                            window.close();
                                            window.parent.$('#previewImagemDigaLaNovo').dialog('close');
                                        }
                                    }
                                } else if (window.parent) {
                                    if (window.parent.opener) {
                                        if (window.parent.opener.CallbackUpload) {
                                            if (typeof(window.parent.opener.CallbackUpload) == "function") {
                                                window
                                                    .parent
                                                    .opener
                                                    .CallbackUpload(h)
                                            }
                                        }
                                    }
                                    if (window.parent.CallbackUpload) {
                                        if (typeof(window.parent.CallbackUpload) == "function") {
                                            window
                                                .parent
                                                .CallbackUpload(h)
                                        }
                                    }
                                }
                                }
                                catch(err){

                                }


                                //DEV

                                if (window.opener) {
                                    if (window.opener.CallbackCancelarUpload) {
                                        if (typeof(window.opener.CallbackCancelarUpload) == "function") {
                                            window
                                                .opener
                                                .CallbackCancelarUpload();
                                            window.close()
                                        }
                                    }
                                }
                                if (window.parent) {
                                    if (window.parent.opener) {
                                        if (window.parent.opener.CallbackCancelarUpload) {
                                            if (typeof(window.parent.opener.CallbackCancelarUpload) == "function") {
                                                window
                                                    .parent
                                                    .opener
                                                    .CallbackCancelarUpload()
                                            }
                                        }
                                    }
                                    if (window.parent.CallbackCancelarUpload) {
                                        if (typeof(window.parent.CallbackCancelarUpload) == "function") {
                                            window
                                                .parent
                                                .CallbackCancelarUpload()
                                        }
                                    }
                                }

                                //DEV 
                                
                                // window.parent.$('#previewUpload').dialog('close');
                                
                                window.parent.$('#previewFileDigaLaNovo').dialog('close');


                                window.parent.$('#UploadFoto').dialog('close');
                                window.parent.$('#UploadFoto').dialog('close');
                                
                                window.parent.$('#previewImagemDigaLaNovo').dialog('close');
                                window.parent.$('#previewImagemDigaLaNovoTurma').dialog('close');
                                window.parent.$('#previewImagemDigaLaGrupo').dialog('close');
                                window.parent.$('#previewFileDigaLaGrupo').dialog('close');

                                window.parent.$('#previewImagemDigaLaPerfil').dialog('close');
                                window.parent.$('#previewImagemMural').dialog('close');
                                window.parent.$('#previewImagemTumaTarefa').dialog('close');
                                window.parent.$('#previewArquivosCriarTarefa').dialog('close');
                                
                                window.parent.$('#previewImagemDigaLaPagina').dialog('close');

                                window.parent.$('#previewFileDigaLaPagina').dialog('close');



                                console.log(' Diga lá ');

                                // $('#seletorMuralDigaLa').show();

                                // $('.seletor_compartilhamento').show();

                                // $('#btnCancelarFerramentaMural').show();

                                b("#compartilhar").show();
                                b("#btnCancelarFerramentaMural").show();
                                b("#seletorMuralDigaLa").show();
                                b("#dialogo_acoes").show();


                                console.log(' Ferramenta  ');
                                
                                // $("#previewImagemDigaLa").hide();
                                

                            }
                            try{
                                b("#btn_salvarGeral").removeClass("disable")
                            }
                            catch(err){

                            }
                        },
                        type    : "POST",
                        url     : "/AVA/Upload/Home/RetornaJsonArquivos"
                    })
                } else {
                    alert("Favor selecionar um arquivo!")
                }
            } else {
                alert("Selecione uma imagem para recortar")
            }
        }

        
    });

    $("#cancelar_voltar").click(function(){

        console.log('Voltar');        

    });

    b("#btn_cancelarGeral").click(function () {        
        if (window.opener) {
            if (window.opener.CallbackCancelarUpload) {
                if (typeof(window.opener.CallbackCancelarUpload) == "function") {
                    window
                        .opener
                        .CallbackCancelarUpload();
                    window.close()
                }
            }
        }
        if (window.parent) {
            if (window.parent.opener) {
                if (window.parent.opener.CallbackCancelarUpload) {
                    if (typeof(window.parent.opener.CallbackCancelarUpload) == "function") {
                        window
                            .parent
                            .opener
                            .CallbackCancelarUpload()
                    }
                }
            }
            if (window.parent.CallbackCancelarUpload) {
                if (typeof(window.parent.CallbackCancelarUpload) == "function") {
                    window
                        .parent
                        .CallbackCancelarUpload()
                }
            }
        }
        //::: o modal de upload não fecha
        //::: o modal de upload é chamado de paginas diferentes com ids diferente,
        // logo é necessário chamar os dois close, 
        //window.parent.$('#previewImagemDigaLaNovo').dialog('close');
        //window.parent.$('#previewImagemDigaLaNovoTurma').dialog('close');
        
        window.close();
        window.parent.$('#previewFileDigaLaNovo').dialog('close');
        window.parent.$('#previewUpload').dialog('close');

        
        window.parent.$('#previewImagemDigaLaNovo').dialog('close');
        window.parent.$('#previewImagemDigaLaNovoTurma').dialog('close');
        window.parent.$('#previewImagemDigaLaGrupo').dialog('close');
        window.parent.$('#previewFileDigaLaGrupo').dialog('close');
        window.parent.$('#previewImagemDigaLaPerfil').dialog('close');
        window.parent.$('#previewImagemMural').dialog('close');
        window.parent.$('#previewImagemTumaTarefa').dialog('close');
        window.parent.$('#previewArquivosCriarTarefa').dialog('close');

        window.parent.$('#previewImagemDigaLaPagina').dialog('close');

        window.parent.$('#previewFileDigaLaPagina').dialog('close');

        window.parent.$('#previewTrocaFotoGrupos').dialog('close');
        window.parent.$('#previewTrocaFotoTurma').dialog('close');

        console.log("entro no btn_cancelar");
    })
});


function ListaArquivosBiblioteca(a, b) {
    
    console.log('ListaArquivosBiblioteca');

    var idVisitado = $('#idVisitado').val() ;

    if( a == 46 && b == 0 ){

        a = 35 ;
        b = 3 ;

        console.log(a);
    }


    if(idVisitado <= 0 ){

    

            globalSelecionados = false;
            $(".lista_biblioteca").html(
                "<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"
            );
            var c = $("#strPesquisa").val();
            if (c == undefined) {
                c = "";
                $("#strPesquisa").val("")
            }
            $("#idBiblioteca").val(b);
        
            console.log('O valor de b '+b);

            console.log('O valor de a '+a);

            console.log('O valor de strPesquisa '+ c);

            if( c == ""  ){

                c = "0";

            }
            
            console.log('O valor de c '+c);
            
            if( b == undefined || b == ""   ){
                b = 0;
            }

        
            $.ajax({

                type   : "POST",
                url    : "/AVA/Upload/Home/ListaArquivosBiblioteca",
                data   : {
                    // idBiblioteca    : b,
                    // idFerramentaTipo: a,
                    // strPesquisa     : c
                    idFerramentaTipo: a,
                    idBiblioteca    : b,
                    strPesquisa     : c
                },
                error  : function (d) {
                    // console.debug(d.status)
                },
                success: function (d) {
                    // console.log('ddd');

                    // console.log(d);

                    $(".lista_biblioteca").html(d);
                    $(".up_tooltip").each(function () {
                        $(this).tooltip({
                            effect  : "slide",
                            offset  : [
                                10, 40
                            ],
                            opacity : 1,
                            position: "top center",
                            relative: true
                        })
                    });
                    $(".item_arquivo").addClass("select");
                    $(".item_arquivo").prepend('<span class="ava_clips_off"></span>');
                    bolListouArquivosBiblioteca = true;
                    
                    console.log('Reseta os Selecionados');
                    
                    Selecionados()

                    ResetaSelecionados()
                }
            })


    }
    else{
        AtualizaContadorCorteAluno();
        ListaArquivosBibliotecaVisitado(a,b);

    }
}




function ListaArquivosBibliotecaVisitado(a, b) {
    
    console.log('ListaArquivosBiblioteca');

    var idVisitado = $('#idVisitado').val();

    globalSelecionados = false;
    $(".lista_biblioteca").html(
        "<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"
    );
    var c = $("#strPesquisa").val();
    if (c == undefined) {
        c = "";
        $("#strPesquisa").val("")
    }
    $("#idBiblioteca").val(b);
   
    console.log('O valor de b '+b);

    console.log('O valor de a '+a);

    console.log('O valor de strPesquisa '+ c);

    if( c == ""  ){

        c = "0";

    }
    
    console.log('O valor de c '+c);
    
    if( b == undefined || b == ""   ){
        b = 0;
    }

   
    $.ajax({

        type   : "POST",
        url    : "/AVA/Upload/Home/ListaArquivosBibliotecaVisitado",
        data   : {
            // idBiblioteca    : b,
            // idFerramentaTipo: a,
            // strPesquisa     : c
            idFerramentaTipo: a,
            idBiblioteca    : b,
            strPesquisa     : c,
            idVisitado: idVisitado
        },
        error  : function (d) {
            // console.debug(d.status)
        },
        success: function (d) {
            // console.log('ddd');

            // console.log(d);

            $(".lista_biblioteca").html(d);
            $(".up_tooltip").each(function () {
                $(this).tooltip({
                    effect  : "slide",
                    offset  : [
                        10, 40
                    ],
                    opacity : 1,
                    position: "top center",
                    relative: true
                })
            });
            
            //Visitado aqui não pode deixar o cara selecionar
            
            // $(".item_arquivo").addClass("select");
            // $(".item_arquivo").prepend('<span class="ava_clips_off"></span>');
            bolListouArquivosBiblioteca = true;
            
            console.log('Reseta os Selecionados');
            
            //Selecionados()

            //ResetaSelecionados()
        }
    })
}


function PesquisaArquivos(a) {

    // globalSelecionados = false;
    // $(".lista_biblioteca").html(
    //     "<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"
    // );
    // var c = $("#strPesquisa").val();
    // if (c == undefined) {
    //     c = "";
    //     $("#strPesquisa").val("")
    // }
    // var b = $("#idBiblioteca").val();
    // $.ajax({
    //     data   : {
    //         idBiblioteca    : b,
    //         idFerramentaTipo: a,
    //         strPesquisa     : c
    //     },
    //     error  : function (d) {
    //         console.debug(d.status)
    //     },
    //     success: function (d) {
    //         $(".lista_biblioteca").html(d);
    //         $(".up_tooltip").each(function () {
    //             $(this).tooltip({
    //                 effect  : "slide",
    //                 offset  : [
    //                     10, 40
    //                 ],
    //                 opacity : 1,
    //                 position: "top center",
    //                 relative: true
    //             })
    //         });
    //         ResetaSelecionados()
    //     },
    //     type   : "POST",
    //     url    : "/AVA/Upload/Home/ListaArquivosBiblioteca"
    // })
}

function ResetaSelecionados() {
    var a = false;
    if (!bolCarregouPreSelecionados) {
        if (bolListouArquivosBiblioteca && bolAtualizouContador) {
            bolCarregouPreSelecionados = true;
            a                          = true;
            if ($("#hidden_idsArquivosSelecionados").length) {
                var c = $("#hidden_idsArquivosSelecionados").val();
                if (c.length > 0 && arraySelecionados.length == 0) {
                    arraySelecionados = c.split(",")
                }
            }
        }
    }
    for (var b = 0; b < arraySelecionados.length; b++) {
        var d = ".idArq_" + arraySelecionados[b];
        $(this).removeClass("select");
        $(this).children("span").remove();
        
        $(d).addClass("select");
        $(d).prepend('<span class="ava_clips_seletor"></span>');
        if (a) {
            arraySelecionadosHtml.push($(d)[0].outerHTML)
        }
    }
    if (arraySelecionados.length > 0) {
        $(".arquivoSelecionado").slideDown()
    }
    if (arraySelecionados.length == 0) {
        $(".arquivoSelecionado").slideUp()
    }
    if (arraySelecionados.length == 0) {} else {
        if (arraySelecionados.length == 1) {
            $(".arquivoSelecionado a").html("<strong>1</strong> arquivo selecionado")
        } else {
            $(".arquivoSelecionado a").html(
                "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
            )
        }
    }
}

function Selecionados() {
    $(".item_arquivo")
        .unbind("click")
        .click(function (g) {
            if (!$(g.target).hasClass("download") && !$(g.target).hasClass("excluir") && !$(this).find(".singleProgress").length) {
                var f = $(this).attr("idArquivo");
                var b = false;
                var d = $("#idFerramenta").val();
                var a = $("#idFerramentaTipo").val();
                if (arraySelecionados.length > 0) {
                    for (var c = 0; c < arraySelecionados.length; c++) {
                        if (f == arraySelecionados[c]) {
                            $(this).removeClass("select");
                            $(this)
                                .children("span")
                                .remove();
                            removeItem(arraySelecionados, f);
                            arraySelecionadosHtml.splice(c, 1);
                            b = true
                        }
                    }
                    if (!b) {
                        arraySelecionados.push(f);
                        $(this).removeClass("select");
                        $(this).children("span").remove();

                        $(this).addClass("select");
                        $(this).prepend('<span class="ava_clips_seletor"></span>');
                        arraySelecionadosHtml.push($(this)[0].outerHTML)
                    }
                    else {
                        $(this).addClass("select");
                        $(this).prepend('<span class="ava_clips_off"></span>');
                    }
                    
                } else {
                    arraySelecionados.push(f);
                    $(this).removeClass("select");
                    $(this).children("span").remove();

                    $(this).addClass("select");
                    $(this).prepend('<span class="ava_clips_seletor"></span>');
                    arraySelecionadosHtml.push($(this)[0].outerHTML)
                }
                if (arraySelecionados.length > 0) {
                    $(".arquivoSelecionado").slideDown()
                }
                if (arraySelecionados.length > 0 && globalSelecionados) {
                    VisualizaSelecionados()
                }
                if (arraySelecionados.length == 0) {
                    $(".arquivoSelecionado").slideUp();
                    if (globalSelecionados) {
                        console.log('sera aqui ?');
                        console.log('A ? '+a);
                        console.log('B ? '+b);
                        
                        // ListaArquivosBiblioteca(a, b);
                    }
                    $(".menu_arquivos").removeClass("active");
                    $(".count_total").addClass("active")
                } else {
                    if (arraySelecionados.length == 1) {
                        $(".arquivoSelecionado a").html("<strong>1</strong> arquivo selecionado");
                    } else {
                        $(".arquivoSelecionado a").html(
                            "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
                        );
                    }
                }
            }
        })
}

function VisualizaSelecionados() { 
    if (arraySelecionadosHtml.length > 0) {
        globalSelecionados = true;
        $(".lista_biblioteca").html(
            "<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"
        );
        $(".lista_biblioteca").html("");
        for (var a = 0; a < arraySelecionadosHtml.length; a++) {
            $(".lista_biblioteca").prepend(arraySelecionadosHtml[a])
        }
        $(".up_tooltip").each(function () {
            $(this).tooltip({
                effect  : "slide",
                offset  : [
                    10, 40
                ],
                opacity : 1,
                position: "top center",
                relative: true
            })
        });
        if (validaBolCrop()) {
            Selecionados()
        }
        ResetaSelecionados()
    } else {
        globalSelecionados = false
    }
}

function removeItem(b, c) {
    var a = 0;
    while (a < b.length) {
        if (b[a] == c) {
            b.splice(a, 1)
        } else {
            a++
        }
    }
    return b
}


function AtualizaContador() {

    console.log('AtualizaContador');

    

    var a = $("#idFerramentaTipo").val();
    $.ajax({
        type    : "POST",
        url     : "/AVA/Upload/Home/CountArquivosBiblioteca",
        data    : {
            idFerramentaTipo: a
        },
        dataType: "json",
        error   : function (d, b, c) {
            console.log("Erro: " + c + "Status: " + b)
        },
        success : function (f, b) {

            console.log('Valor de a   '+a);
            console.log('Valor de F   '+  JSON.stringify(f));
            console.log('Valor de b   '+b);

            var d = 0;
            
            if (f.length > 0) {
                var e;
                $(".menu_arquivos").empty();
                $(".menu_arquivos").append(
                    '<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="java' +
                    'script:void(0);"><strong>0</strong> arquivo selecionado</a></li>'
                );

                if (f.length > 1) {
                    $(".menu_arquivos").append(
                        '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer;" cla' +
                        'ss="active count_total"><a href="javascript:void(0);">Todos(' + d +
                        ")</a></li>"
                    )
                }

                for (var c = 0; c < f.length; c++) {
                    e = c;
                    e = e + 1;
                    
                    $(".total_arquivos").empty();
                    // $(".total_arquivos").append(
                    //     '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                    //     'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                    //     "total de arquivos ( " + f[c].intTotal + ")</a></p>"
                    // );
                    
                    d = d + f[c].intTotal
                    
                    $(".total_arquivos").append(
                        '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                        'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                        "total de arquivos ( " + d + ")</a></p>"
                    );    

                    ListaArquivosBiblioteca(a,f[c].idBilbioteca);
                    
                }
                
                $(".count_total").html(
                    '<a href="javascript:void(0);">Todos(' + d + ")</a>"
                );
                
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                )
            } 
            else {
                
                console.log('Else appenda Menu');

                $(".menu_arquivos").append(
                    '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer" clas' +
                    's="active"><a href="javascript:void(0);">Todos(' + d + ")</a></li>"
                );
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                );
                $(".arquivoSelecionado a").html(
                    "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
                );
            }

            $(".menu_arquivos li").click(function () {
                $(".menu_arquivos li").removeClass("active");
                $(this).addClass("active")
            });

            $(".arquivoSelecionado").hide();

            bolAtualizouContador = true;

            ResetaSelecionados();
            
            // console.log('AA '+a);

            // if( f.length > 0 ){

            //     console.log('Dentro do IF');

            //     ListaArquivosBiblioteca(a,0);
            // }
            // else{

            //     console.log('No elese');   

                // ListaArquivosBiblioteca(a,0);
                
            // }

        }
    })
    //dev
}


function AtualizaContadorCorteAluno() {

    var a = $("#idFerramentaTipo").val();

    var idVisitado = $("#idVisitado").val();

    $.ajax({
        type    : "POST",
        url     : "/AVA/Upload/Home/CountArquivosBibliotecaVisitado",
        data    : {
            idFerramentaTipo: a,
            idVisitado: idVisitado
        },
        dataType: "json",
        error   : function (d, b, c) {
            console.log("Erro: " + c + "Status: " + b)
        },
        success : function (f, b) {

            console.log('Valor de a   '+a);
            console.log('Valor de F   '+  JSON.stringify(f));
            console.log('Valor de b   '+b);

            var d = 0;
            
            if (f.length > 0) {
                var e;
                $(".menu_arquivos").empty();
                $(".menu_arquivos").append(
                    '<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="java' +
                    'script:void(0);"><strong>0</strong> arquivo selecionado</a></li>'
                );

                if (f.length > 1) {
                    $(".menu_arquivos").append(
                        '<li onCLick="ListaArquivosBibliotecaVisitado(' + a + ',0)" style="cursor:pointer;" cla' +
                        'ss="active count_total"><a href="javascript:void(0);">Todos(' + d +
                        ")</a></li>"
                    )
                }

                for (var c = 0; c < f.length; c++) {
                    e = c;
                    e = e + 1;
                    
                    $(".total_arquivos").empty();
                    // $(".total_arquivos").append(
                    //     '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                    //     'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                    //     "total de arquivos ( " + f[c].intTotal + ")</a></p>"
                    // );
                    
                    d = d + f[c].intTotal
                    
                    $(".total_arquivos").append(
                        '<p onclick="ListaArquivosBibliotecaVisitado(' + a + "," + f[c].idBilbioteca + ')" sty' +
                        'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                        "total de arquivos ( " + d + ")</a></p>"
                    );    

                    ListaArquivosBibliotecaVisitado(a,f[c].idBilbioteca);
                    
                }
                
                $(".count_total").html(
                    '<a href="javascript:void(0);">Todos(' + d + ")</a>"
                );
                
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                )
            } 
            else {
                
                console.log('Else appenda Menu');

                $(".menu_arquivos").append(
                    '<li onCLick="ListaArquivosBibliotecaVisitado(' + a + ',0)" style="cursor:pointer" clas' +
                    's="active"><a href="javascript:void(0);">Todos(' + d + ")</a></li>"
                );
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                );
                $(".arquivoSelecionado a").html(
                    "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
                );
            }

            $(".menu_arquivos li").click(function () {
                $(".menu_arquivos li").removeClass("active");
                $(this).addClass("active")
            });

            $(".arquivoSelecionado").hide();

            bolAtualizouContador = true;

            ResetaSelecionados();
            
            // console.log('AA '+a);

            // if( f.length > 0 ){

            //     console.log('Dentro do IF');

            //     ListaArquivosBiblioteca(a,0);
            // }
            // else{

            //     console.log('No elese');   

                // ListaArquivosBiblioteca(a,0);
                
            // }

        }
    })
    //dev
}


function AtualizaContadorCp() {

    console.log('AtualizaContador');

    var a = $("#idFerramentaTipo").val();
    $.ajax({
        type    : "POST",
        url     : "/AVA/Upload/Home/CountArquivosBiblioteca",
        data    : {
            idFerramentaTipo: a
        },
        dataType: "json",
        error   : function (d, b, c) {
            console.log("Erro: " + c + "Status: " + b)
        },
        success : function (f, b) {

            console.log('Valor de a   '+a);
            console.log('Valor de F   '+  JSON.stringify(f));
            console.log('Valor de b   '+b);

            var d = 0;
            
            if (f.length > 0) {
                var e;
                $(".menu_arquivos").empty();
                $(".menu_arquivos").append(
                    '<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="java' +
                    'script:void(0);"><strong>0</strong> arquivo selecionado</a></li>'
                );

                if (f.length > 1) {
                    $(".menu_arquivos").append(
                        '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer;" cla' +
                        'ss="active count_total"><a href="javascript:void(0);">Todos(' + d +
                        ")</a></li>"
                    )
                }

                for (var c = 0; c < f.length; c++) {
                    e = c;
                    e = e + 1;
                    
                    $(".total_arquivos").empty();
                    // $(".total_arquivos").append(
                    //     '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                    //     'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                    //     "total de arquivos ( " + f[c].intTotal + ")</a></p>"
                    // );
                    
                    d = d + f[c].intTotal
                    
                    $(".total_arquivos").append(
                        '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                        'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                        "total de arquivos ( " + d + ")</a></p>"
                    );    

                    ListaArquivosBiblioteca(a,f[c].idBilbioteca);
                    
                }
                
                $(".count_total").html(
                    '<a href="javascript:void(0);">Todos(' + d + ")</a>"
                );
                
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                )
            } 
            else {
                
                console.log('Else appenda Menu');

                $(".menu_arquivos").append(
                    '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer" clas' +
                    's="active"><a href="javascript:void(0);">Todos(' + d + ")</a></li>"
                );
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                );
                $(".arquivoSelecionado a").html(
                    "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
                );
            }

            $(".menu_arquivos li").click(function () {
                $(".menu_arquivos li").removeClass("active");
                $(this).addClass("active")
            });

            $(".arquivoSelecionado").hide();

            bolAtualizouContador = true;

            ResetaSelecionados();
            
            // console.log('AA '+a);

            // if( f.length > 0 ){

            //     console.log('Dentro do IF');

            //     ListaArquivosBiblioteca(a,0);
            // }
            // else{

            //     console.log('No elese');   

                // ListaArquivosBiblioteca(a,0);
                
            // }

        }
    })
    //dev
}

function AtualizaContadorArquivos() {

    console.log('AtualizaContadorArquivos');
    
    var a = $("#idFerramentaTipo").val();

    console.log('Valor de A : '+a);

    $.ajax({
        type    : "POST",
        url     : "/AVA/Upload/Home/CountArquivosBiblioteca",
        data    : {
            idFerramentaTipo: a
        },
        dataType: "json",
        error   : function (d, b, c) {
            console.log("Erro: " + c + "Status: " + b)
        },
        success : function (f, b) {

            console.log('Valor de a   '+a);
            console.log('Valor de F   '+  JSON.stringify(f));
            console.log('Valor de b   '+b);

            var d = 0;
            
            if (f.length > 0) {
                var e;
                $(".menu_arquivos").empty();
                $(".menu_arquivos").append(
                    '<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="java' +
                    'script:void(0);"><strong>0</strong> arquivo selecionado</a></li>'
                );

                if (f.length > 1) {
                    $(".menu_arquivos").append(
                        '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer;" cla' +
                        'ss="active count_total"><a href="javascript:void(0);">Todos(' + d +
                        ")</a></li>"
                    )
                }

                for (var c = 0; c < f.length; c++) {
                    e = c;
                    e = e + 1;
                    
                    $(".total_arquivos").empty();
                    // $(".total_arquivos").append(
                    //     '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                    //     'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                    //     "total de arquivos ( " + f[c].intTotal + ")</a></p>"
                    // );
                    
                    d = d + f[c].intTotal
                    
                    $(".total_arquivos").append(
                        '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                        'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                        "total de arquivos ( " + d + ")</a></p>"
                    );    

                    ListaArquivosBiblioteca(a,f[c].idBilbioteca);
                    
                }
                
                $(".count_total").html(
                    '<a href="javascript:void(0);">Todos(' + d + ")</a>"
                );
                
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                )
            } 
            else {
                
                console.log('Else appenda Menu');

                $(".menu_arquivos").append(
                    '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer" clas' +
                    's="active"><a href="javascript:void(0);">Todos(' + d + ")</a></li>"
                );
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                );
                $(".arquivoSelecionado a").html(
                    "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
                );
            }

            $(".menu_arquivos li").click(function () {
                $(".menu_arquivos li").removeClass("active");
                $(this).addClass("active")
            });

            $(".arquivoSelecionado").hide();

            bolAtualizouContador = true;

            ResetaSelecionados();
            

        }
    })
    //dev
}


function AtualizaContadorTodosArquivos() {
    
    console.log('AtualizaContadorTodosArquivos');

    var a = 37;

    var ff , bb  ; 

    $.ajax({
        type    : "POST",
        url     : "/AVA/Upload/Home/CountArquivosBiblioteca",
        data    : {
            idFerramentaTipo: a
        },
        dataType: "json",
        error   : function (d, b, c) {
            console.log("Erro: " + c + "Status: " + b)
        },
        success : function (f, b) {

            ff = f ;
            bb = b

            var d = 0;
            
            if (f.length > 0) {
                var e;
                $(".menu_arquivos").empty();
                $(".menu_arquivos").append(
                    '<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="java' +
                    'script:void(0);"><strong>0</strong> arquivo selecionado</a></li>'
                );

                if (f.length > 1) {
                    $(".menu_arquivos").append(
                        '<li onCLick="ListaArquivosBiblioteca(' + a + ',3)" style="cursor:pointer;" cla' +
                        'ss="active count_total"><a href="javascript:void(0);">Todos(' + d +
                        ")</a></li>"
                    )
                }

                for (var c = 0; c < f.length; c++) {
                    e = c;
                    e = e + 1;
                    
                    $(".total_arquivos").empty();
                    // $(".total_arquivos").append(
                    //     '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                    //     'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                    //     "total de arquivos ( " + f[c].intTotal + ")</a></p>"
                    // );
                    
                    d = d + f[c].intTotal
                    
                    $(".total_arquivos").append(
                        '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
                        'le="cursor:pointer;"><a href="javascript:void(0)">' + 
                        "total de arquivos ( " + d + ")</a></p>"
                    );    

                    console.log(' Vendo o ID  :'+f[c].idBilbioteca);

                    ListaArquivosBiblioteca(a,f[c].idBilbioteca);
                    
                }
                
                $(".count_total").html(
                    '<a href="javascript:void(0);">Todos(' + d + ")</a>"
                );
                
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                )
            } 
            else {
                
                console.log('Else appenda Menu');

                $(".menu_arquivos").append(
                    '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer" clas' +
                    's="active"><a href="javascript:void(0);">Todos(' + d + ")</a></li>"
                );
                $(".menu_arquivos").append(
                    '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
                    'andamento(0)</a></li>'
                );
                $(".arquivoSelecionado a").html(
                    "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
                );
            }

            $(".menu_arquivos li").click(function () {
                $(".menu_arquivos li").removeClass("active");
                $(this).addClass("active")
            });

            $(".arquivoSelecionado").hide();

            bolAtualizouContador = true;

            // ResetaSelecionados();
            
            

        }
    })

    //dev

    // a = 37;

    // $.ajax({
    //     type    : "POST",
    //     url     : "/AVA/Upload/Home/CountArquivosBiblioteca",
    //     data    : {
    //         idFerramentaTipo: a
    //     },
    //     dataType: "json",
    //     error   : function (d, b, c) {
    //         alert("Erro: " + c + "Status: " + b)
    //     },
    //     success : function (f, b) {

    //         console.log('Valor de a   '+a);
    //         console.log('Valor de F   '+  JSON.stringify(f));
    //         console.log('Valor de b   '+b);

    //         var d = 0;
            
    //         if (f.length > 0) {
    //             var e;
    //             $(".menu_arquivos").empty();
    //             $(".menu_arquivos").append(
    //                 '<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="java' +
    //                 'script:void(0);"><strong>0</strong> arquivo selecionado</a></li>'
    //             );

    //             if (f.length > 1) {
    //                 $(".menu_arquivos").append(
    //                     '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer;" cla' +
    //                     'ss="active count_total"><a href="javascript:void(0);">Todos(' + d +
    //                     ")</a></li>"
    //                 )
    //             }

    //             for (var c = 0; c < f.length; c++) {
    //                 e = c;
    //                 e = e + 1;
                    
    //                 $(".total_arquivos").empty();
    //                 // $(".total_arquivos").append(
    //                 //     '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
    //                 //     'le="cursor:pointer;"><a href="javascript:void(0)">' + 
    //                 //     "total de arquivos ( " + f[c].intTotal + ")</a></p>"
    //                 // );
                    
    //                 d = d + f[c].intTotal
                    
    //                 $(".total_arquivos").append(
    //                     '<p onclick="ListaArquivosBiblioteca(' + a + "," + f[c].idBilbioteca + ')" sty' +
    //                     'le="cursor:pointer;"><a href="javascript:void(0)">' + 
    //                     "total de arquivos ( " + d + ")</a></p>"
    //                 );    

    //                 ListaArquivosBiblioteca(a,f[c].idBilbioteca);
                    
    //             }
                
    //             $(".count_total").html(
    //                 '<a href="javascript:void(0);">Todos(' + d + ")</a>"
    //             );
                
    //             $(".menu_arquivos").append(
    //                 '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
    //                 'andamento(0)</a></li>'
    //             )
    //         } 
    //         else {
                
    //             console.log('Else appenda Menu');

    //             $(".menu_arquivos").append(
    //                 '<li onCLick="ListaArquivosBiblioteca(' + a + ',0)" style="cursor:pointer" clas' +
    //                 's="active"><a href="javascript:void(0);">Todos(' + d + ")</a></li>"
    //             );
    //             $(".menu_arquivos").append(
    //                 '<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em ' +
    //                 'andamento(0)</a></li>'
    //             );
    //             $(".arquivoSelecionado a").html(
    //                 "<strong>" + arraySelecionados.length + "</strong> arquivos selecionados"
    //             );
    //         }

    //         $(".menu_arquivos li").click(function () {
    //             $(".menu_arquivos li").removeClass("active");
    //             $(this).addClass("active")
    //         });

    //         $(".arquivoSelecionado").hide();

    //         bolAtualizouContador = true;

    //         ResetaSelecionados();
            
            

    //     }
    // })

}

function ExcluirArquivo(d) {
    var b = ".idArq_" + d;
    var a = confirm("Tem certeza que deseja excluir esse arquivo?");
    if (a == true) {
        if (arraySelecionados.length > 0) {
            for (var c = 0; c < arraySelecionados.length; c++) {
                if (d == arraySelecionados[c]) {
                    $(this).removeClass("select");
                    $(this)
                        .children("span")
                        .remove();
                    removeItem(arraySelecionados, d);
                    arraySelecionadosHtml.splice(c, 1);
                    auxArq = true
                }
            }
        }
        $.ajax({
            data   : {
                id: d
            },
            error  : function (e) {
                console.debug(e.status)
            },
            success: function (g) {
                $(b).hide(500, function () {
                    $(b).remove();
                    AtualizaContador()
                });
                var e = $("#idFerramentaTipo").val();
                var f = {
                    idArquivo       : d,
                    idFerramentaTipo: e
                };


                try{
                    if (window.opener.CallbackUploadExcluidos) {
                        window
                            .opener
                            .CallbackUploadExcluidos(f)
                    }
                }
                catch(err){
                    console.log(err);
                }
            },
            type   : "POST",
            url    : "/AVA/Upload/Home/Excluir"
        })
    }
}

function AlternaAbas(c) {
    console.log("AlternaAbas "+c)
    deletarImagemProcessoIncompleto(
        idArquivoGlobalAux,
        strNomeArquivoGlobalAux,
        true
    );
    $(".visu_arquivos").hide();
    var b = $("#idBiblioteca").val();
    var a = $("#idFerramentaTipo").val();
    if (c == 1) {
        
        $(".add_arquivos").hide();

        
        var idVisitado = $('#idVisitado').val();

        if( idVisitado > 0 ){
            
            ListaArquivosBibliotecaVisitado(a, b);

        }
        else{

            ListaArquivosBiblioteca(a, b);

        }
        
        
        $(".titulo_voltar").html("<h1>Arquivos</h1>");
        $(".meus_arquivos").show()
        $(".btns a:first").addClass("active");
        $(".btns a:last").removeClass("active");
    } else {
        if (c == 2) {
            $(".meus_arquivos").hide();
            $(".add_arquivos").show();
            $(".btns a:first").removeClass("active");
            $(".btns a:last").addClass("active");
            $("#permissoes_arquivos").html(
                "<strong>Os formatos aceitos são:</strong> " + strExtensoes + "."
            )
        } else {
            $(".add_arquivos").hide();
            $(".meus_arquivos").show();
            $(".btns a:first").removeClass("active");
            $(".btns a:last").addClass("active");
        }
    }
}


// function AlternaAbas(c) {
//     console.log("AlternaAbas "+c)
//     deletarImagemProcessoIncompleto(
//         idArquivoGlobalAux,
//         strNomeArquivoGlobalAux,
//         true
//     );
//     $(".visu_arquivos").hide();
//     var b = $("#idBiblioteca").val();
//     var a = $("#idFerramentaTipo").val();
//     if (c == 1) {
        
//         $(".add_arquivos").hide();
//         ListaArquivosBibliotecaVisitado(a, b);
//         $(".titulo_voltar").html("<h1>Arquivos</h1>");
//         $(".meus_arquivos").show()
//     } else {
//         if (c == 2) {
//             $(".meus_arquivos").hide();
//             $(".add_arquivos").show();
//             $("#permissoes_arquivos").html(
//                 "<strong>Os formatos aceitos são:</strong> " + strExtensoes + "."
//             )
//         } else {
//             $(".add_arquivos").hide();
//             $(".meus_arquivos").show()
//         }
//     }
// }


function VisualizaArquivo(d, b) {
    console.log('VisualizaArquivo');
    idArquivoGlobalAux = d;
    $(".meus_arquivos").hide();
    $(".titulo_voltar").html(
        '<div class="arquivos_topo_voltar"><a href="javascript:void(0);" class="FontAwe' +
        'some voltar_modal" id="btn_voltar"><span></span></a><h1>Arquivos</h1></div>'
    );
    $(".lista_biblioteca").html(
        "<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"
    );
    var a = $("#idFerramentaTipo").val();
    var c = $("#idFerramenta").val();
    $.ajax({
        data   : {
            idArquivo: d
        },
        error  : function (e) {
            console.debug(e.status)
        },
        success: function (g) {

            

            bolAuxDeletarimg = true;
            $(".visu_arquivos").html(g);
            $(".visu_arquivos").show();
            $(".visu_arquivos").data("idarquivo", d);
            $(".visu_arquivos").append('<a href="javascript:void(0);" class="btn_cinza right" onclick="AlternaAbas(1)" id="btn_cancelarGeral">Voltar</a>');
            $(".visu_arquivos").append('<a href="javascript:void(0);" class="btn_laranja right" id="btn_concluir" onclick="AlterarArquivo()">Salvar</a>');
            $("#btn_cancelarGeral").click(function () {
                $(".titulo_voltar").html("<h1>Arquivos</h1>");
                // ListaArquivosBiblioteca(a, b);
                AlternaAbas(1);
                console.log('dsadsa');
                $("#strPesquisa").val("")
            });
            globalStrNome      = $("#campo_nome p").text();
            globalStrDescricao = $("#campo_descricao p").text();
            $(".tooltip").css("display", "none");
            $("#edita_nome").addClass("editar");
            $("#edita_nome").click(function () {
                var h = $("#strNome").val();
                $("#campo_nome").html(
                    '<input id="strNome" type="text" value="' + h + '" maxlength="60"/>'
                )
            });
            $("#edita_desc").click(function () {
                var h = $("#strDescricao").val();
                $("#campo_descricao").html(
                    '<textarea id="strDescricao">' + h + "</textarea>"
                )
            });


            $('#crop_nome').hide();
            $('#crop_descrip').hide();
            $('#crop_warn').hide();
            $('.download').hide();
            $('#voltar2').hide();
            

            if (validaBolCrop() && b == 3) {
                var e = d;
                var f = getDadosImagem(e);

                if (f[2]) {
                    bolTamanhoImg = true;
                    $(".select_corte").show();
                    $("#imagem_crop").Jcrop({
                        aspectRatio: 1,
                        bgColor    : "black",
                        bgOpacity  : 0.4,
                        onSelect   : showCoords,
                        height : 200,

                    }, function () {
                        jcrop_api = this;
                        jcrop_api.setSelect(getRandom());
                        $(".combo_recortar").show()
                    });
                    $(".cancela_recorte").click(function (h) {
                        
                        console.log('CAncelar 12345678910');

                        jcrop_api.release();
                        $("#x1").val("");
                        $("#x2").val("");
                        $("#y1").val("");
                        $("#y2").val("");
                        $(".combo_recortar").hide();
                        return false
                    });
                    $(".select_corte").click(function (h) {
                        jcrop_api.setSelect(getRandom());
                        $(".combo_recortar").show()
                    });
                    $(".recortar_imagem").click(function () {
                        var m = $("#imagem_crop").attr("src");
                        var i = $("#x1").val();
                        var h = $("#x2").val();
                        var k = $("#y1").val();
                        var j = $("#y2").val();
                        var l = $("#strNomeArquivo").val();
                        var n = $("#strDirAqruivo").val();
                        if (h == "" || h < 1 || j == "" || j < 1) {
                            alert("Selecione uma Área da imagem para recorte.")
                        } else {
                            if (h < 170 || j < 170) {
                                alert("Crop não tem o tamanho mínimo de 170 x 170 pixels.")
                            } else {
                                $.ajax({
                                    data    : {
                                        idArquivo     : d,
                                        srcImagem     : m,
                                        strDirArquivo : n,
                                        strNomeArquivo: l,
                                        x1            : i,
                                        x2            : h,
                                        y1            : k,
                                        y2            : j
                                    },
                                    dataType: "json",
                                    error   : function (q, o, p) {
                                        console.log("Erro: " + p + "Status: " + o)
                                    },
                                    success : function (p, o) {
                                        strNomeArquivoGlobalAux = p.nomefinal;
                                        $("#img_padrao").html('<img style="width:200px " src="' + p.imagem_recortada + '"/>');
                                        $(".recortar_imagem").hide();
                                        $(".combo_recortar").hide();
                                        $("#strDirArquivoCrop").val(p.imagem_recortada);
                                        $(".download").attr(
                                            "href",
                                            "/AVA/Upload/Home/ForceDownload?strSrcArquivo=" + p.imagem_recortada
                                        );
                                        bolCrop = true;
                                        $(".select_corte").hide()
                                    },
                                    type    : "POST",
                                    url     : "/AVA/Upload/Home/Crop"
                                })
                            }
                        }
                    })
                } else {
                    alert("Esta imagem não tem o tamanho mínimo de 170 x 170 pixels.");
                    $(".recortar_imagem").hide()
                }
            } else {
                $(".recortar_imagem").hide()
            }
            
          

        },
        type   : "POST",
        url    : "/AVA/Upload/Home/SelecionaArquivo"
    })
}


function VisualizaArquivoPerfil(d, b) {
    console.log('VisualizaArquivoPerfil');
    idArquivoGlobalAux = d;
    $(".meus_arquivos").hide();
    $(".titulo_voltar").html(
        '<div class="arquivos_topo_voltar"><a href="javascript:void(0);" class="FontAwe' +
        'some voltar_modal" id="btn_voltar"><span></span></a><h1>Arquivos</h1></div>'
    );
    $(".lista_biblioteca").html(
        "<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"
    );
    var a = $("#idFerramentaTipo").val();
    var c = $("#idFerramenta").val();
    $.ajax({
        data   : {
            idArquivo: d
        },
        error  : function (e) {
            console.debug(e.status)
        },
        success: function (g) {

            

            bolAuxDeletarimg = true;
            $(".visu_arquivos").html(g);
            $(".visu_arquivos").show();
            $(".visu_arquivos").data("idarquivo", d);
            
            // globalStrNome      = $("#campo_nome p").text();
            // globalStrDescricao = $("#campo_descricao p").text();
            // $(".tooltip").css("display", "none");
            
            $("a#cancelar_voltar").click(function(){
                
                AlternaAbas(1);
                
            })  ; 

            

            
            if (validaBolCrop() && b == 3) {
                var e = d;
                var f = getDadosImagem(e);
                console.log(f);
                console.log('Teste crop image');                       
            }

           

            var init = undefined;
            var modal = 0 ;

            // initCrop(init, modal);      
            
            if(modal > 0 ){
                closeModal();
            }


            $('.action').show();
            $('#strPesquisa').hide();
            $('.data_nome').hide();
            $('.data_desc').hide();
            $('.data_em').hide();
            $('.download').hide();
            $('.total_arquivos').hide();
            

            $("#btn_cancelarGeral").click(function () {
                $(".titulo_voltar").html("<h1>Arquivos</h1>");
                ListaArquivosBiblioteca(a, b);
            });

           
            jQuery(function($) {
               $('#target').Jcrop({
                  aspectRatio: 1,                  
                  onSelect: updateCoords
                });
            });

            $("#recortar").click(function () {
              
                try{                  
                    cropImage();    
                }
                catch(err){
                    console.log(err);
                }              

            });
        }
        ,
        type   : "POST",
        url    : "/AVA/Upload/Home/SelecionaArquivo"
    })
}

function updateCoords(c) {
    $('#x1').val(c.x);
    $('#x2').val(c.x2);
    $('#y1').val(c.y);
    $('#y2').val(c.y2);
    $('#w').val(c.w);
    $('#h').val(c.h);
};


function cropImage(){


            var idVisitado = $('#idVisitado').val();

            var idFerramentaTipo = $("#idFerramentaTipo").val();

            var srcImg = $("#target").attr("data-img");
            var strNomeArquivo = $("#strNomeArquivo").val();
            var n = $("#strDirAqruivo").val();
            var idArquivo = $("#idArquivo").val();

            var img = [];
            
            img[0] = $('#x1').val() ;
            img[1] = $('#y1').val() ;
            img[2] = $('#x2').val() ;
            img[3] = $('#y2').val() ;
            img[4] = $('#w').val() ;
            img[5] = $('#h').val() ;
            

            if(img[4] == null && img[5] == null || img[4] == '' && img[5] == '')
            {
                img[0] = 0;
                img[1] = 0;
                img[2] = 170 ;
                img[3] = 170 ;
                img[4] = 170 ;
                img[5] = 170 ;            
            }

            console.log('src' + srcImg);
            console.log('dir arquivo' + n);
            console.log('nome arquivo' + strNomeArquivo);
            console.log('id arquivo' + idArquivo);            
    
            //Corta o Arquivo
            $.ajax({
                type    : "POST",
                url     : "/AVA/Upload/Home/Crop",
                data : {
                    idArquivo     : idArquivo,
                    srcImagem     : srcImg,
                    strDirArquivo : n,
                    strNomeArquivo: strNomeArquivo,
                    x1:img[0],
                    y1:img[1],
                    x2:img[2],
                    y2:img[3],
                    w:img[4],
                    h:img[5],
                    idVisitado:idVisitado
                    // strBase64: img,
                    // strBase64Thumb : imgThumb
                },
                dataType: "json",
                error   : function (q, o, p) {
                    alert("Erro: " + p + "Status: " + o)
                    console.log(p);
                },
                success : function (p, o) {
                    // strNomeArquivoGlobalAux = p.nomefinal;
                    // $("#img_padrao").html('<img style="width:200px " src="' + p.imagem_recortada + '"/>');
                    // $(".recortar_imagem").hide();
                    // $(".combo_recortar").hide();
                    // $("#strDirArquivoCrop").val(p.imagem_recortada);
                    // $(".download").attr( "href","/AVA/Upload/Home/ForceDownload?strSrcArquivo=" + p.imagem_recortada);
                    // bolCrop = true;
                    // $(".select_corte").hide()
                    
                    console.log(p.novoNome);
                    console.log(JSON.stringify(p));

                    if(idFerramentaTipo == 31 || idFerramentaTipo == 48){
                        localStorage.setItem('novaImgCompleta',getRelativePath(p.novaImgCompleta));
                    }

                    //Salva Arquivo Perfil
                    $.ajax({
                        type    : "POST",
                        url     : "/AVA/Upload/Home/SalvaArquivoPerfil",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        async   : false,
                        data    : {
                            idArquivo        : idArquivo,
                            idFerramentaTipo : idFerramentaTipo, //31, isso aqui estava chumbado e não pode, precisa colocar o idFerramentaTipo certo
                            imgPerfilAtualAux: p.novoNome,
                            nomeImgTemp      : p.novoNome,
                            idVisitado : idVisitado
                        },
                        
                        success : function (oi) {
                            var k = parseInt(oi.error);
                            if (k == 0) {
                                b = oi.strArquivo
                            } else {
                                fotoAlterada = true;
                                // alert(oi.strArquivo)
                            }

                            //Inicializa o arquivo
                            var fileInitial = {
                                id          : idArquivo,
                                strDescricao: "",
                                strNome     : p.novoNome
                            };

                            //Método para Altera Arquivo
                            $.ajax({
                                type    : "POST",
                                url     : "/AVA/Upload/Home/AlteraArquivo",
                                dataType: "json",
                                async      : false,
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                data       : {
                                    json: JSON.stringify(fileInitial)
                                },
                                success    : function (retornaArquivos) {

                                    if (idFerramentaTipo == 32) 
                                    {
                                        SalvarFotoGrupo(idFerramentaTipo, oi, retornaArquivos);
                                    }
                                    else {
                                        //RetornaJsonArquivos
                                        var mfiles = new Array();
                                        $.ajax({
                                            type    : "POST",
                                            url     : "/AVA/Upload/Home/RetornaJsonArquivos",
                                            async   : false,
                                            data    : {
                                                idFerramentaTipo: idFerramentaTipo,
                                                idsArquivos     : idArquivo.toString()
                                            },
                                            dataType: "json",
                                            error   : function (p, n, o) {
                                                alert("Erro: " + o + "Status: " + n)
                                            },
                                            success : function (returnJsonFiles, o) {

                                                var nn = jQuery.parseJSON(JSON.stringify(returnJsonFiles));
                                                if (nn.erro.length > 0) {
                                                    console.log(nn.erro)
                                                } else {
                                                    mfiles = nn.jsonArray
                                                }

                                               
                                                idVisitado = $('#idVisitado').val();

                                                console.log(idVisitado);

                                                //Método para carregar o modal perfil
                                                $.ajax({

                                                    url: "/AVA/Mural/Home/BuscarPerfilPublicoJson/",
                                                    type:"POST",
                                                    data:{
                                                        idVisitado : idVisitado
                                                    },
                                                    success: function(f){

                                                        newFOTO = f.strFotoPerfil;

                                                        var perfil = f;

                                                        if(  idFerramentaTipo != 48 ){

                                                            $.ajax({
                                                                url: "/AVA/Mural/Home/SalvarPerfilPublico/",
                                                                type: "POST",
                                                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                                                data: {

                                                                    ts: new Date().getTime(),
                                                                    idUsuarioRequest: perfil.p.idUsuario + "",
                                                                    idPerfil: perfil.p.idPerfil + "",
                                                                    strApelido: perfil.p.strApelido + "",
                                                                    strEmail: perfil.p.strEmail + "",
                                                                    strTexto: perfil.p.strTexto + " ",
                                                                    strFoto: oi.path + "",
                                                                    charSexo: perfil.p.charSexo + "",
                                                                    strSeries: perfil.p.strSeries + "",
                                                                    idArquivoAux: idArquivo
                                                                },
                                                                success: function(C) {

                                                                    console.log( JSON.stringify(C)  );
                                                                    
                                                                    modal = 1 ;
                                                                    //Fecha o modal
                                                                
                                                                    console.log(perfil.p.idUsuario);
                                                                    
                                                                    //Alterar a foto de perfil sem precisar clicar no salvar e a foto do minithumb
                                                                    var j =  perfil.p.idUsuario;
                                                                    var B = j;
                                                                    var s = perfil.p.strTexto + " ";
                                                                    var q = oi.path ;
                                                                    var e = perfil.p.strApelido + "";

                                                                    if (C.indexOf("[:|:]") > 0) {
                                                                        B = C.split("[:|:]")[1];
                                                                        C = C.split("[:|:]")[0]
                                                                    }
                                                                    if ($("#nova_foto").val() != "") {
                                                                        $("#frmPerfil img").attr("src", $("#nova_foto").val());
                                                                        $("#strFoto").val($("#nova_foto").val())
                                                                    }
                                                                    if (s != "") {
                                                                        $("#texto_sobre_mim").hide().html("<strong>Sobre mim</strong><br>" + s).fadeIn()
                                                                    } else {
                                                                        $("#texto_sobre_mim").hide().html("").fadeIn()
                                                                    }
                                                                    if ($("#strApelido").val() != "") {
                                                                        $("#meu_nome_rs").text(e);
                                                                        if (j == B) {
                                                                            $("#nameUser").text(e)
                                                                        }
                                                                        $("#dadosPerfil").find("h1").text(e)
                                                                    } else {
                                                                        $("#meu_nome_rs").text($("#strNomeInicial").val());
                                                                        if (j == B) {
                                                                            $("#nameUser").text($("#strNomeInicial").val())
                                                                        }
                                                                        $("#dadosPerfil").find("h1").text($("#strNomeInicial").val())
                                                                    }
                                                                    // $.fancybox.close();
                                                                    if (j == B) {
                                                                        $("#ava_user img").attr("src", q.substring(0, q.lastIndexOf("/")) + "/minithumb" + q.substring(q.lastIndexOf("/"))).hide().fadeIn()
                                                                    }
                                                                    $("a[href*='Perfil/Home/Index/" + j + "'] img").attr("src", q.substring(0, q.lastIndexOf("/")) + "/minithumb" + q.substring(q.lastIndexOf("/"))).hide().fadeIn();
                                                                    $("#dadosPerfil").find("img").attr("src", q).hide().fadeIn();
                                                                    $("#textoMinhaInfo").text(s);
                                                                    

                                                                    // localStorage.jStorage.flush();


                                                                    $.ajax({
                                                                        type: "POST",
                                                                        url: "/AVA/Barras/Home/RemoveCacheDadosUsuario",
                                                                        data: "idUsuario=" + j,
                                                                        async: true,
                                                                        success: function(D) {},
                                                                        error: function(D) {}
                                                                    });
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        url: "/AVA/Barras/Home/LimparCacheBarras",
                                                                        data: "idUsuarioPerfil=" + j,
                                                                        async: true,
                                                                        success: function(D) {},
                                                                        error: function(D) {}
                                                                    });
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        url: "/AVA/Perfil/Home/RemoveCacheDadosUsuario",
                                                                        data: "idUsuario=" + j,
                                                                        async: true,
                                                                        success: function(D) {

                                                                            localStorage.setItem('jStorage','');
                                                                            localStorage.setItem("fotoAlterada", "true");

                                                                            // toastr.options = {
                                                                            //     "closeButton": true,
                                                                            //     "debug": false,
                                                                            //     "newestOnTop": false,
                                                                            //     "progressBar": true,
                                                                            //     "positionClass": "toast-top-center",
                                                                            //     "preventDuplicates": false,
                                                                            //     "onclick": null,
                                                                            //     "showDuration": "900",
                                                                            //     "hideDuration": "1000",
                                                                            //     "timeOut": "9000",
                                                                            //     "extendedTimeOut": "9000",
                                                                            //     "showEasing": "swing",
                                                                            //     "hideEasing": "linear",
                                                                            //     "showMethod": "fadeIn",
                                                                            //     "hideMethod": "fadeOut"
                                                                            // }
                                                                            // Command: toastr["success"]("Foto alterada com sucesso", "");
                                                                            
                                                                            // setTimeout(() => {
                                                                            //     window.parent.$('#previewUpload').dialog('close');

                                                                            //     location.reload();
                                                                                
                                                                            // }, 3000);                                                                   
                                                                            

                                                                            // alert($("#altfoto").html());


                                                                            // $("#altfoto").attr('src',newFOTO);
                                                                            // $( "#" ).parent().css( "background-color", "red" );

                                                                            // // $("#thumbBox").attr('src',newFOTO)
                                                                            // $("#altfoto").attr('data-img',newFOTO)

                                                                            // parent.document.getElementById("thumbBox").setAttribute('src',newFOTO);

                                                                            // parent.document.getElementById("thumbBox").setAttribute('data-img',newFOTO);


                                                                            // parent.document.getElementById("usuarioAlterarThumb").setAttribute('src',newFOTO);

                                                                            // parent.document.getElementById("usuarioAlterarThumb").setAttribute('data-img',newFOTO);
                                                                            
                                                                            try{
                                                                                window.parent.$('#previewUpload').dialog('close');
                                                                            }
                                                                            catch(err){

                                                                            }
                                                                            try{
                                                                                window.parent.$('#upload_iframe').dialog('close');
                                                                            }
                                                                            catch(err){

                                                                            }

                                                                            try{
                                                                                window.close();
                                                                            }
                                                                            catch(err){

                                                                            }

                                                                            try{
                                                                                closeModalBiblioteca();
                                                                            }
                                                                            catch(err){
                                                                                console.log(err);
                                                                            }



                                                                        },
                                                                        error: function(D) {}
                                                                    });
                                                                    var A = q.split("/");
                                                                    A = A[A.length - 1];
                                                                    A = A.split(".");
                                                                    A = A[0]
                                                                    


                                                                    // window.close();
                                                                    

                                                                },
                                                                error: function(error){
                                                                }
                                                            });
                                                        }

                                                    },
                                                    error: function(error){

                                                    }


                                                });
                                            }
                                        });
                                    }
                                }
                                ,
                                error      : function (k) {
                                    if (k.status != 0) {
                                        console.debug("Erro ao salvar arquivo.")
                                    }
                                },


                            });

                           

                        },
                        error   : function (k) {
                            console.debug(k.status)
                        }
                    });
                       
                }
            });
}

function closeModalBiblioteca(){


    if (window.opener) {
        if (window.opener.CallbackCancelarUpload) {
            if (typeof(window.opener.CallbackCancelarUpload) == "function") {
                window
                    .opener
                    .CallbackCancelarUpload();
                window.close()
            }
        }
    }
    if (window.parent) {
        if (window.parent.opener) {
            if (window.parent.opener.CallbackCancelarUpload) {
                if (typeof(window.parent.opener.CallbackCancelarUpload) == "function") {
                    window
                        .parent
                        .opener
                        .CallbackCancelarUpload()
                }
            }
        }
        if (window.parent.CallbackCancelarUpload) {
            if (typeof(window.parent.CallbackCancelarUpload) == "function") {
                window
                    .parent
                    .CallbackCancelarUpload()
            }
        }
    }
    //::: o modal de upload nÃ£o fecha
    //::: o modal de upload Ã© chamado de paginas diferentes com ids diferente,
    // logo Ã© necessÃ¡rio chamar os dois close, 
    //window.parent.$('#previewImagemDigaLaNovo').dialog('close');
    //window.parent.$('#previewImagemDigaLaNovoTurma').dialog('close');
    
    window.close();
    window.parent.$('#previewFileDigaLaNovo').dialog('close');
    window.parent.$('#previewUpload').dialog('close');

    
    window.parent.$('#previewImagemDigaLaNovo').dialog('close');
    window.parent.$('#previewImagemDigaLaNovoTurma').dialog('close');
    window.parent.$('#previewImagemDigaLaGrupo').dialog('close');
    window.parent.$('#previewFileDigaLaGrupo').dialog('close');
    window.parent.$('#previewImagemDigaLaPerfil').dialog('close');
    window.parent.$('#previewImagemMural').dialog('close');
    window.parent.$('#previewImagemTumaTarefa').dialog('close');
    window.parent.$('#previewArquivosCriarTarefa').dialog('close');

    window.parent.$('#previewImagemDigaLaPagina').dialog('close');

    window.parent.$('#previewFileDigaLaPagina').dialog('close');

    window.parent.$('#previewTrocaFotoGrupos').dialog('close');
    window.parent.$('#previewTrocaFotoTurma').dialog('close');



}

var getRelativePath = function (url) {
    var final_url = url;
    if (final_url.indexOf('\\') != -1) {
        final_url = final_url.replace(/(\\)/g, "/");
    }
    if (final_url.indexOf('imagens/sem-foto') != -1) {
        final_url = "";
    }
    if (final_url.indexOf('http') != -1) {
        final_url = final_url.replace("http://", "").replace("https://", "");
        final_url = final_url.substr(final_url.indexOf("/"));
    }
    if (final_url.toLowerCase().indexOf('/userdata') != -1) {
        final_url = final_url.substr(final_url.toLowerCase().indexOf("/userdata"));
    }
    if (final_url.toLowerCase().indexOf('/upload') != -1) {
        final_url = final_url.substr(final_url.toLowerCase().indexOf("/upload"));
    }
    return final_url;
};

function SalvarFotoGrupo(idFerramentaTipo, oi, retornaArquivos){

    var jsonRetorno = {
        idFerramentaTipo: idFerramentaTipo,
        arquivo : {
            path : oi.path,
            strArquivo: oi.strArquivo,
            idArquivo : retornaArquivos.idArquivo
        }
    }

    if (window.parent.CallbackUploadFotoGrupo) {
        window.parent.CallbackUploadFotoGrupo(jsonRetorno)
    }
    else{
        alert('error');
    }
}

function habilitaRecorte() {
    alert("==habilitaRecorte==");
    jcrop_api.setSelect(getRandom());
    $(".combo_recortar").show()
}

function getRandom() {
    var c = $("#idArquivo").val();
    var b = null;
    var a = null;
    $.ajax({
        async      : false,
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        error      : function (f, d, e) {
            console.log("Erro: " + e + "Status: " + d)
        },
        success    : function (e, d) {
            b = e.width;
            a = e.height
        },
        type       : "POST",
        url        : "/AVA/Upload/Home/GetDadosImagem?idImagem=" + c
    });
    posicao   = new Object();
    posicao.w = b;
    posicao.h = a;
    posicao.x = 0;
    posicao.y = 0;
    if (a <= b) {
        posicao.x2 = a;
        posicao.y2 = a
    } else {
        posicao.x2 = b;
        posicao.y2 = b
    }
    showCoords(posicao);
    return [posicao.x, posicao.y, posicao.x2, posicao.y2]
}
function getDadosImagem(d) {
    var c = null;
    var b = null;
    var a;
    $.ajax({
        async      : false,
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        error      : function (g, e, f) {
            console.log("Erro: " + f + "Status: " + e)
        },
        success    : function (f, e) {
            c = f.width;
            b = f.height;
            a = f.boolTamanho
        },
        type       : "POST",
        url        : "/AVA/Upload/Home/GetDadosImagem?idImagem=" + d
    });
    return [c, b, a]
}
function showCoords(a) {
    $("#x1").val(a.x);
    $("#x2").val(a.x2);
    $("#y1").val(a.y);
    $("#y2").val(a.y2);
    $(".combo_recortar").show()
}
function AlterarArquivo() {

    console.log('AlterarArquivo');

    var f = $("#idArquivo").val();
    var g = $("#strNome").val();
    var d = $("#strDescricao").val();
    var j = $("#idFerramenta").val();
    var i = $("#idFerramentaTipo").val();
    var h = $("#strNomeArquivo").val();
    var c = $("#strDirArquivoCrop").val();
    var e = c.split("/");
    e = e[e.length - 1];
    e = e.split(".");
    e = e[0];
    if (g == "") {
        alert("Nome do arquivo em branco.")
    } else {
        if (!bolTamanhoImg && validaBolCrop()) {
            alert("Esta imagem não tem o tamanho mínimo de 170 x 170 pixels.")
        } else {
            if (!bolCrop && validaBolCrop()) {
                alert("Imagem deve ser recortada.")
            } else {
                if (bolCrop && validaBolCrop()) {
                    var b = null;
                    var c = $("#strDirArquivoCrop").val();
                    $.ajax({
                        async   : false,
                        data    : {
                            idArquivo        : f,
                            idFerramentaTipo : i,
                            imgPerfilAtualAux: imgPerfilAtualAux,
                            nomeImgTemp      : e,
                            idVisitado: $('#idVisitado').val()
                        },
                        dataType: "json",
                        error   : function (k) {
                            console.debug(k.status)
                        },
                        success : function (l) {
                            var k = parseInt(l.error);
                            if (k == 0) {
                                b = l.strArquivo
                            } else {
                                fotoAlterada = true;
                                alert(l.strArquivo)
                            }
                        },
                        type    : "POST",
                        url     : "/AVA/Upload/Home/SalvaArquivoPerfil"
                    })
                }
                var a = {
                    id          : f,
                    strDescricao: d,
                    strNome     : g
                };
                $.ajax({
                    async      : false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    data       : {
                        json: JSON.stringify(a)
                    },
                    error      : function (k) {
                        if (k.status != 0) {
                            console.debug("Erro ao salvar arquivo.")
                        }
                    },
                    success    : function (l) {
                        var m = new Array();
                        $.ajax({
                            async   : false,
                            data    : {
                                idFerramentaTipo: i,
                                idsArquivos     : f.toString()
                            },
                            dataType: "json",
                            error   : function (p, n, o) {
                                console.log("Erro: " + o + "Status: " + n)
                            },
                            success : function (p, o) {
                                var n = jQuery.parseJSON(JSON.stringify(p));
                                if (n.erro.length > 0) {
                                    console.log(n.erro)
                                } else {
                                    m = n.jsonArray
                                }
                            },
                            type    : "POST",
                            url     : "/AVA/Upload/Home/RetornaJsonArquivos"
                        });
                        if (validaBolCrop()) {
                            m[0].strArquivo = b
                        }
                        bolAuxDeletarimg = false;
                        //alert("Arquivo alterado com sucesso!");                         

                        localStorage.setItem("fotoAlterada", "true");
                        var k = {
                            arrayArquivo    : m,
                            idFerramenta    : j,
                            idFerramentaTipo: i
                        };
                        if (bolCrop && validaBolCrop()) {
                            if (window.opener) {
                                if (window.opener.CallbackUpload) {
                                    if (typeof(window.opener.CallbackUpload) == "function") {
                                        window
                                            .opener
                                            .CallbackUpload(k);
                                        window.close()
                                    }
                                }
                            }
                            if (window.parent) {
                                if (window.parent.opener) {
                                    if (window.parent.opener.CallbackUpload) {
                                        if (typeof(window.parent.opener.CallbackUpload) == "function") {
                                            window
                                                .parent
                                                .opener
                                                .CallbackUpload(k)
                                        }
                                    }
                                }
                                if (window.parent.CallbackUpload) {
                                    if (typeof(window.parent.CallbackUpload) == "function") {
                                        window
                                            .parent
                                            .CallbackUpload(k)
                                    }
                                }
                            }
                        }
                    },
                    type       : "POST",
                    url        : "/AVA/Upload/Home/AlteraArquivo"
                })
            }
        }
    }
}
function SalvaArquivoCropPerfil() {
    var a = $("#strDirArquivoCrop").val();
    $.ajax({
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data       : {
            strDirArquivoCrop: a
        },
        error      : function (b) {
            console.debug(b.status)
        },
        success    : function (b) {},
        type       : "POST",
        url        : "/AVA/Upload/Home/SalvaArquivoPerfil"
    })
}
function ListaAndamento() {
    $(".add_arquivos").hide();
    $(".meus_arquivos").show()
}

function DownloadArquivo(a) {
    var b = null;
    $.ajax({
        data   : {
            caminhoArquivo: a,
            contentType   : b
        },
        error  : function (c) {
            console.debug(c.status)
        },
        success: function (c) {},
        type   : "POST",
        url    : "/AVA/Upload/Home/ForceDownload"
    })
}

function deletarImagemProcessoIncompleto(b, c, a) {
    if (a === undefined || a == "" || a == null) {
        a = false
    }
    if (b !== undefined && b != "" && b != 0 && bolAuxDeletarimg) {
        $.ajax({
            async   : a,
            data    : {
                idarquivo  : b,
                nomeArquivo: c
            },
            dataType: "json",
            error   : function (d) {},
            success : function (e) {
                strNomeArquivoGlobalAux = "";
                idArquivoGlobalAux      = 0;
                var d = parseInt(e.error);
                bolAuxDeletarimg = false;
                if (d == 0) {
                    console.log(e.msg)
                } else {
                    console.log(e.msg)
                }
            },
            type    : "POST",
            url     : "/ava/upload/home/removerImagemTrocarAbaOuFecharJanela"
        })
    }
}
function ExcluirArquivoFerramenta(b, a) {
    $.ajax({
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data       : {
            idArquivo   : b,
            idFerramenta: a
        },
        error      : function (c) {
            console.debug(c.status)
        },
        success    : function (c) {},
        type       : "POST",
        url        : "/AVA/Upload/Home/ExcluiArquivoFerramenta"
    })
}
function validaBolCrop() {
    var a = $("#bolSomenteImgCrop").val();
    if (a == "False") {
        a = false
    } else {
        a = true
    }
    return a
};


function closeModal() {

    $.fancybox.close();
    $('#frmPerfil')[0].reset();
    if (modalEditarImagem) {
        modalEditarImagem.close();
        location.reload();
    }
    location.reload();
    
};