$(document).ready(function(){
    var Anos = null;
    var anoSelecionado = 0;

    BuscarListaAnoArquivos("id_ano");
    
    $("body").on("click", ".aviso_barrass_ava a", function() {
        f(this).closest(".aviso_barrass_ava").fadeOut(function() {
            setTimeout(function() {
                f(".aviso_barrass_ava").remove()
            }, 100)
        })
    });

    $("body").on(tpClick, "section.galeria_da_turma .menu_tipo_filtro li", function () {
        cancelarFiltrosGaleria();
        var o = $(this).attr("midiatipo");
        $(this).siblings("li").removeClass("ativo"); 
        $(this).addClass("ativo"), 
        $("#hGaleriaMidiaTipo").val(o), o > 0 ? $("section.galeria_da_turma .filtro_galeria .link_botao").fadeIn() : $("section.galeria_da_turma .filtro_galeria .link_botao").fadeOut();
        carregarGaleriaTurma(1)
    });

    $("body").on(tpClick, "#txtMesGaleriaTurma", function () {   

        $('#cbMesGaleriaTurma ul.dropdown-menu').on('mouseleave', function () {
            this.style.display = 'none'; 
            $("#cbMesGaleriaTurma").hide();
            $(this).slideUp();
        });        
    });

    $("body").on(tpClick, "#cbMesGaleriaTurma li label", function () { 
        $("#hMesGaleriaTurma").val(o); 
        $("#cbMesGaleriaTurma input[type=checkbox]").removeAttr("checked");
        $("#ckMesGaleriaTurma" + o).attr("checked", "checked");
        var e = $(this).text() + '<span class="caret"></span>';
        
        $('#cbMesGaleriaTurma ul.dropdown-menu').on('mouseleave', function () {
            this.style.display = 'none'; 
            $(this).slideUp();
        });
        return $("#txtMesGaleriaTurma").html(e), $("#cbMesGaleriaTurma").parent().removeClass("open"), !1
    });

    $("body").on(tpClick, "section.galeria_da_turma .filtro_galeria .btn_branco", function () {
        "0" != $("#hMesGaleriaTurma").val() || "0" != $("#hAssuntoGaleriaTurma").val() ? $("section.galeria_da_turma .filtro_galeria .link_botao").fadeIn() : $("section.galeria_da_turma .filtro_galeria .link_botao").fadeOut(); 
        $("#hMesGaleriaTurmaFiltrado").val($("#hMesGaleriaTurma").val()); 
        $("#hAssuntoGaleriaTurmaFiltrado").val($("#hAssuntoGaleriaTurma").val()); 
        carregarGaleriaTurma(1)
    });

    $("body").on(tpClick, "#cbMesGaleriaTurma li label", function () {
        var o = $(this).parent().attr("mes");
        $("#hMesGaleriaTurma").val(o); 
        $("#cbMesGaleriaTurma input[type=checkbox]").removeAttr("checked"); 
        $("#ckMesGaleriaTurma" + o).attr("checked", "checked");
        var e = $(this).text() + '<span class="caret"></span>';
        return $("#txtMesGaleriaTurma").html(e), $("#cbMesGaleriaTurma").parent().removeClass("open"), !1
    });

    $("body").on(tpClick, "section.galeria_da_turma .filtro_galeria .link_botao", function () {
        $("section.galeria_da_turma .filtro_galeria .link_botao").fadeOut(); 
        cancelarFiltrosGaleria();
        carregarGaleriaTurma(1);
    });
    
    function cancelarFiltrosGaleria() {
        $("#hAnoFiltrado").val(0); 
        $("#hMesGaleriaTurmaFiltrado").val(0); 
        $("#hAssuntoGaleriaTurmaFiltrado").val(0); 
        $("section.galeria_da_turma li").removeClass("ativo"); 
        $("section.galeria_da_turma li[midiaTipo=0]").addClass("ativo");
        $("#hGaleriaMidiaTipo").val(0);
        $("#hAssuntoGaleriaTurma").val(0);
        $("#cbAssuntoGaleriaTurma input[type=checkbox]").removeAttr("checked"); 
        $("#ckAssuntoGaleriaTurma0").attr("checked", "checked");
        var a = $("#cbAssuntoGaleriaTurma li[assu=0] label").text() + '<span class="caret"></span>';
        $("#txtAssuntoGaleriaTurma").html(a); 
        $("#cbAssuntoGaleriaTurma").parent().removeClass("open"); 
        $("#hMesGaleriaTurma").val(0); 
        $("#cbMesGaleriaTurma input[type=checkbox]").removeAttr("checked");
        $("#ckMesGaleriaTurma0").attr("checked", "checked"); 
        a = $("#cbMesGaleriaTurma li[mes=0] label").text() + '<span class="caret"></span>'; 
        $("#txtMesGaleriaTurma").html(a); 
        $("#cbMesGaleriaTurma").parent().removeClass("open");

         $("#cbMesGaleriaTurma input[type=checkbox]").removeAttr("checked");
        $("#ckMesGaleriaTurma0").attr("checked", "checked"); 
        a = $("#cbMesGaleriaTurma li[mes=0] label").text() + '<span class="caret"></span>'; 
        $("#txtMesGaleriaTurma").html(a); 
        $("#cbMesGaleriaTurma").parent().removeClass("open");

        $('#id_ano button.btnAno').html("Todos os anos");
        $('#id_ano button.btnAno').append('&nbsp;<span class="caret"></span>');
        anoSelecionado = 0;
        $("#hAnoFiltrado").val(0);
    }
    
    function carregarGaleriaTurma(a) {
        a = parseInt(a), null != ajaxGaleriaTurma && ajaxGaleriaTurma.abort();
        var o = $("#hGaleriaMidiaTipo").val(),
            e = $("#hMesGaleriaTurmaFiltrado").val(),
            //i = $("#hAssuntoGaleriaTurmaFiltrado").val(),
            r = '<div id="loader_galeria" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>';
        a > 1 ? $("#lista_item_galeria").append(r) : (a = 1, $("#lista_item_galeria").html(r)), ajaxGaleriaTurma = $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/GaleriaProfessor",
            data: {
                idGrupo: 0,
                idAssunto: 0,
                intPaginacao: a,
                intMes: e,
                intTipoMidia: o,
                idMateria: disciplinaSelecionada,
                intAno: anoSelecionado
            },
            async: !0,
            success: function (o) {
                
                if ("0" != o && "-1" != o && 0 != o && -1 != o) {
                    var e = $(o);
                    $("#hPaginacaoGaleriaTurma").val(a), 1 == a ? $("#lista_item_galeria").html(e) : ($("#loader_galeria").remove(), $("#lista_item_galeria").append(e));
                    try {
                        $(".imagens_mural").addClass("select");
                        $(".imagens_mural").prepend('<span class="ava_clips_galeria_off"></span>');                        
                        $(".imagens_mural").append('<span class="FontAwesome visualizar_lupa up_tooltip"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(1110014, 3)"></a></span>');
                        
                        globalSelecionados = false;
                        
                    } catch (i) {
                        console.log("erro ao chamara galeria ava")
                    }
                    $(".iframeVideoVimeo", e).on("load", paginaEducacional_TratamentoVimeo), $(".item_galeria_arquivos", e).mCustomScrollbar()
                } else 1 == a && $("#lista_item_galeria").html("-1" == o || -1 == o ? '<div class="feed_fitro"><p>N�o h� resultados para o filtro aplicado.</p></div>' : '<div class="feed_fitro"><p>Nenhuma mensagem encontrada.</p></div>');
                $("#loader_galeria").remove();
                $("#galeria_rodape").hide();

                $(".imagens_mural").click(function(){
                    var idPost = $(this).attr('data-idPost');
                    var f = $(this).attr("idArquivo");
                    var b = false;
                    var arrayIdsArquivos = [];
                    var arrayArquivosDownload = [];
                    $(this).find("a").each(function(index, value){
                        arrayIdsArquivos.push($(this).attr("data-idarquivo"));
                        arrayArquivosDownload.push($(this).attr("data-path"));
                    });

                    if (arraySelecionados.length > 0) {
                        for (var c = 0; c < arraySelecionados.length; c++) {
                            if (idPost == arraySelecionados[c].IdPost) {
                                $(this).removeClass("select");
                                $(this).children("span").remove();
                                removeItem(arraySelecionados, idPost);
                                arraySelecionadosHtml.splice(c, 1);
                                b = true
                            }
                        }
                        if (!b) {
                            arraySelecionados.push({
                                "IdPost" : idPost,
                                "IdArquivos" : arrayIdsArquivos,
                                "pathArquivos" : arrayArquivosDownload
                            });

                            $(this).removeClass("select");
                            $(this).children("span").remove();
                            //--
                            $(this).find("span").remove();
    
                            $(this).addClass("select");
                            $(this).prepend('<span class="ava_clips_galeria"></span>');
                            $('#SelecionarTodos').show();
                            arraySelecionadosHtml.push($(this)[0].outerHTML)
                        }
                        else {
                            $(this).removeClass("select");
                            $(this).children("span").remove();
                            //--
                            $(this).find("span").remove();
                            $(this).addClass("select");
                            $(this).prepend('<span class="ava_clips_galeria_off"></span>');

                            if(  arraySelecionados.length == 0 ){
                                $('#SelecionarTodos').hide();
                            }
                        }
                        
                    } else {
                        arraySelecionados.push({
                            "IdPost" : idPost,
                            "IdArquivos" : arrayIdsArquivos,
                            "pathArquivos" : arrayArquivosDownload
                        });
                        $(this).removeClass("select");
                        $(this).children("span").remove();
                        $(this).find("span").remove();
    
                        $(this).addClass("select");
                        $(this).prepend('<span class="ava_clips_galeria"></span>');

                        $('#SelecionarTodos').show();

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
                        $("#galeria_rodape").hide();
                        if (globalSelecionados) {
                            ListaArquivosBiblioteca(a, 0)
                        }
                        $(".menu_arquivos").removeClass("active");
                        $(".count_total").addClass("active")
                    } else {
                        $(".arquivoSelecionado p").html(
                            "<strong>" + arraySelecionados.length + "</strong> arquivo(s) selecionado(s)"
                        );
                        $("#galeria_rodape").show();
                    }
                });
            },
            error: function () {
                console.log("Ocorreu um erro ao galeria"), $("#loader_galeria").remove()
            }
        })
    }

    function paginaEducacional_TratamentoVimeo() {
        var a = $f(this),
            o = !1;
        a.api("pause"), a.addEvent("ready", function () {
            a.addEvent("play", function () {
                o || (o = !0, a.api("pause"))
            })
        })
    }

    
    function BuscarListaAnoArquivos() {
       
        if (Anos != null && Anos.readyState < 4) {
            Anos.abort()
        }
        var strHtml = '<div class="btn-group" id="idAno">'+
                        '<button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton btnAno">Todos os anos&nbsp;<span class="caret"></span></button>'+
                        '<ul class="dropdown-menu ulAno"></ul>'+
                    '</div>';

        $("#id_ano").html(strHtml);
        
        var varHtmlStr = '<li dic="0" >' +
        '<input type="checkbox" id="ckAno0">' +
        '<label for="ckAno0">Todos os anos</label>' +
        '</li>';

        Anos = $.ajax({
            url: "/AVA/Turma/Home/BuscarListaAnoArquivos",
            type: "POST",
            dataType: "json",                                
            data: { 
                    "idGrupo" : 0,
                    "idAssunto" : 0,
                    "intPaginacao" : 1,
                    "intMes" : 0,
                    "intTipoMidia" : 0,
                    "idMateria" : 0             
                  },
            success: function(anos) {                                    
                if(anos.length > 0){
                    $.each( anos , function(ix, item){
                        varHtmlStr += '<li dic="' + item + '">' +
                        '<input type="checkbox" id="ckAno' + item + '">' +
                        '<label for="ckAno' + item + '">' + item + '</label>' +
                        '</li>';                       
                    });
                    $('#id_ano ul.ulAno').html(varHtmlStr);

                    $('#id_ano button.btnAno').click(function () {      
                        $('#id_ano ul.ulAno').show();
                    });

                    $('#id_ano ul.ulAno').on('mouseleave', function () {
                        this.style.display = 'none'; 
                        $(this).slideUp();
                    });

                    $('#id_ano ul.ulAno li').click(function () {
                        var valor = $(this).attr('dic');                        
                        $('#id_ano ul.ulAno li input[type="checkbox"]:checked').each(function (i, item) {
                            item.checked = false;
                        }); 

                        document.getElementById("ckAno" + valor).checked = true;
                        if (valor == 0) {
                            $('#id_ano button.btnAno').html("Selecione o ano");
                            $('#id_ano button.btnAno').append('&nbsp;<span class="caret"></span>');
                            anoSelecionado = 0;
                            $("#hAnoFiltrado").val(0);
                        }
                        else {
                            anoSelecionado = valor; 
                            $("#hAno").val(valor);
                            $("#hAnoFiltrado").val(valor);
                            $('#id_ano button.btnAno').html($(this).find('label').html());
                            $('#id_ano button.btnAno').append('&nbsp;<span class="caret"></span>');
                        }
                        $('#id_ano ul.ulAno').hide();       
                    });
                }
            },
            error: function(ap) {               
                if (ap.statusText != "abort") {
                    console.log(anos.responseText)
                }
            }
        })
    }

 });