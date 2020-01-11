function initCrop(init,modal){

    var firstTime = 0 ;

    var options =
            {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: $('#thumbBox').attr('data-img')
            }
    var  cropper = $('.imageBox').cropbox(options);

    console.log('teste');

    setTimeout(function () { cropper.zoom0(); }, 1000);

    // $('#imagem_crop').on('change', function () {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         options.imgSrc = e.target.result;
    //         cropper = $('#imagem_crop').cropbox(options);
    //         setTimeout(function () { cropper.zoom0(); }, 1000);
    //     }
    //     // reader.readAsDataURL(this.files[0]);
    //     // this.files = [];
    // })

    $('#btnZoomIn').on('click', function () {

        firstTime = 1;

        cropper.zoomIn();
    })
    $('#btnZoomOut').on('click', function () {

        firstTime = 1;

        cropper.zoomOut();
    })

    $('#recortar').on('click', function () {

        if( firstTime == 0  ){
            cropper.zoomOut();
        }


        var img = cropper.getDataURL();
        criaThumb(img, function (imgThumb) {
            var srcImg = $("#thumbBox").attr("data-img");
            var strNomeArquivo = $("#strNomeArquivo").val();
            var n = $("#strDirAqruivo").val();
            var idArquivo = $("#idArquivo").val();

            console.log(srcImg);
            console.log(n);
            console.log(strNomeArquivo);
            console.log(idArquivo);            
    
            //Corta o Arquivo
            $.ajax({
                type    : "POST",
                url     : "/AVA/Upload/Home/Crop",
                data : {
                    idArquivo     : idArquivo,
                    srcImagem     : srcImg,
                    strDirArquivo : n,
                    strNomeArquivo: strNomeArquivo,
                    strBase64: img,
                    strBase64Thumb : imgThumb
                },
                dataType: "json",
                error   : function (q, o, p) {
                    alert("Erro: " + p + "Status: " + o)
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

                    //Salva Arquivo Perfil
                    $.ajax({
                        type    : "POST",
                        url     : "/AVA/Upload/Home/SalvaArquivoPerfil",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        async   : false,
                        data    : {
                            idArquivo        : idArquivo,
                            idFerramentaTipo : 31,
                            imgPerfilAtualAux: p.novoNome,
                            nomeImgTemp      : p.novoNome
                        },
                        
                        success : function (oi) {
                            var k = parseInt(oi.error);
                            if (k == 0) {
                                b = oi.strArquivo
                            } else {
                                fotoAlterada = true;
                                alert(oi.strArquivo)
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

                                    //RetornaJsonArquivos
                                    var mfiles = new Array();
                                    $.ajax({
                                        type    : "POST",
                                        url     : "/AVA/Upload/Home/RetornaJsonArquivos",
                                        async   : false,
                                        data    : {
                                            idFerramentaTipo: 31,
                                            idsArquivos     : idArquivo.toString()
                                        },
                                        dataType: "json",
                                        error   : function (p, n, o) {
                                            alert("Erro: " + o + "Status: " + n)
                                        },
                                        success : function (returnJsonFiles, o) {

                                            console.log('Ate aqui foi');
                                            var nn = jQuery.parseJSON(JSON.stringify(returnJsonFiles));
                                            if (nn.erro.length > 0) {
                                                alert(nn.erro)
                                            } else {
                                                mfiles = nn.jsonArray
                                            }

                                             //Método para carregar o modal perfil
                                            $.ajax({

                                                url: "/AVA/Mural/Home/BuscarPerfilPublicoJson",
                                                type:"GET",
                                                success: function(f){

                                                    console.log( JSON.stringify(f)  );

                                                    var perfil = f;

                                                    $.ajax({
                                                        url: "/AVA/Mural/Home/SalvarPerfilPublico",
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
                                                            $.fancybox.close();
                                                            if (j == B) {
                                                                $("#ava_user img").attr("src", q.substring(0, q.lastIndexOf("/")) + "/minithumb" + q.substring(q.lastIndexOf("/"))).hide().fadeIn()
                                                            }
                                                            $("a[href*='Perfil/Home/Index/" + j + "'] img").attr("src", q.substring(0, q.lastIndexOf("/")) + "/minithumb" + q.substring(q.lastIndexOf("/"))).hide().fadeIn();
                                                            $("#dadosPerfil").find("img").attr("src", q).hide().fadeIn();
                                                            $("#textoMinhaInfo").text(s);
                                                            $.jStorage.flush();
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
                                                                    Command: toastr["success"]("Foto alterada com sucesso", "")

                                                                    



                                                                    setTimeout(() => {
                                                                        window.parent.$('#previewUpload').dialog('close');

                                                                        location.reload();
                                                                        
                                                                    }, 3000);

                                                                    // Faz o redirecionamento

                                                                   

                                                                   

                                                                    
                                                                },
                                                                error: function(D) {}
                                                            });
                                                            var A = q.split("/");
                                                            A = A[A.length - 1];
                                                            A = A.split(".");
                                                            A = A[0]
                                                            
                                                            localStorage.setItem("fotoAlterada", "true");


                                                            // window.close();
                                                            

                                                        },
                                                        error: function(error){
                                                        }
                                                    });

                                                },
                                                error: function(error){

                                                }


                                            });


                                        }
                                    });
                                    // if (validaBolCrop()) {
                                    //     m[0].strArquivo = b
                                    // }
                                    // bolAuxDeletarimg = false;
                                    // //alert("Arquivo alterado com sucesso!");                         
            
                                    // localStorage.setItem("fotoAlterada", "true");
                                    // var k = {
                                    //     arrayArquivo    : m,
                                    //     idFerramenta    : j,
                                    //     idFerramentaTipo: i
                                    // };
                                    // if (bolCrop && validaBolCrop()) {
                                    //     if (window.opener) {
                                    //         if (window.opener.CallbackUpload) {
                                    //             if (typeof(window.opener.CallbackUpload) == "function") {
                                    //                 window
                                    //                     .opener
                                    //                     .CallbackUpload(k);
                                    //                 window.close()
                                    //             }
                                    //         }
                                    //     }
                                    //     if (window.parent) {
                                    //         if (window.parent.opener) {
                                    //             if (window.parent.opener.CallbackUpload) {
                                    //                 if (typeof(window.parent.opener.CallbackUpload) == "function") {
                                    //                     window
                                    //                         .parent
                                    //                         .opener
                                    //                         .CallbackUpload(k)
                                    //                 }
                                    //             }
                                    //         }
                                    //         if (window.parent.CallbackUpload) {
                                    //             if (typeof(window.parent.CallbackUpload) == "function") {
                                    //                 window
                                    //                     .parent
                                    //                     .CallbackUpload(k)
                                    //             }
                                    //         }
                                    //     }
                                    // }
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
    
            // objEnvio = { "strBase64": img, "strBase64Thumb": imgThumb }
            // ajaxPost('/Dinamica.svc/enviaImagemPerfil', objEnvio, function (retorno) {
            //     g_home.Usuario.strFoto = retorno.valor;
            //     $(".ps-perfil .ps-avatar").css("background-image", "url('" + g_home.Usuario.strFoto + "')");
            //     window.sessionStorage.setItem("home", JSON.stringify(g_home));
            //     $(".modal .btn-fechar").click();
            // });
        });
    })

}




"use strict";
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
} (function ($) {
    var cropbox = function (options, el) {
        var el = el || $(options.imageBox),
            obj =
            {
                state: {},
                ratio: 1,
                options: options,
                imageBox: el,
                thumbBox: el.find(options.thumbBox),
                spinner: el.find(options.spinner),
                image: new Image(),
                getDataURL: function () {
                    var width = this.thumbBox.width(),
                        height = this.thumbBox.height(),
                        canvas = document.createElement("canvas"),
                        dim = el.css('background-position').split(' '),
                        size = el.css('background-size').split(' '),
                        dx = parseInt(dim[0]) - el.width() / 2 + width / 2,
                        dy = parseInt(dim[1]) - el.height() / 2 + height / 2,
                        dw = parseInt(size[0]),
                        dh = parseInt(size[1]),
                        sh = parseInt(this.image.height),
                        sw = parseInt(this.image.width);

                    if(height == 0){
                        height = 400;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    var context = canvas.getContext("2d");
                    context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
                    var imageData = canvas.toDataURL();
                    return imageData;
                },
                getBlob: function () {
                    var imageData = this.getDataURL();
                    var b64 = imageData.replace('data:image/png;base64,', '');
                    var binary = atob(b64);
                    var array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], { type: 'image/png' });
                },
                zoomIn: function () {
                    this.ratio *= 1.1;
                    setBackground();
                },
                zoomOut: function () {
                    this.ratio *= 0.9;
                    setBackground();
                },
                zoom0: function () {
                    setBackground();
                    this.ratio = 1;
                    setBackground();
                }
            },
            setBackground = function () {
                //console.debug("setBackground:" + obj.state.dragable );
                obj.state.dragable = false;
                var w = parseInt(obj.image.width) * obj.ratio;
                var h = parseInt(obj.image.height) * obj.ratio;

                var pw = (el.width() - w) / 2;
                var ph = (el.height() - h) / 2;

                try{
                    if(init == 1 ){
                        el.css({
                            'background-image': 'url(' + obj.image.src + ')',
                            'background-size': '100%',
                            'background-position': '0',
                            'background-repeat': 'no-repeat'
                        });
                        init = 2 ;                        
                    } 
                    else if(init == 2){
                        el.css({
                            'background-image': 'url(' + obj.image.src + ')',
                            'background-size': w + 'px ' + h + 'px',
                            'background-position': pw + 'px ' + ph + 'px',
                            'background-repeat': 'no-repeat'
                        });

                        init = 2 ;
                        
                    }
    
                }
                catch(err){
                    el.css({
                        'background-image': 'url(' + obj.image.src + ')',
                        'background-size': '100%',
                        'background-position': '0',
                        'background-repeat': 'no-repeat'
                    });
                    init = 1;
                }

               

                
            },
            imgMouseDown = function (e) {
                e.stopImmediatePropagation();
                //console.debug("mouseDown" );
                obj.state.dragable = true;
                //console.debug("mouseDown:" + obj.state.dragable );
                obj.state.mouseX = e.clientX;
                obj.state.mouseY = e.clientY;

                var bg = el.css('background-position').split(' ');
                obj.state.bgX = parseInt(bg[0]);
                obj.state.bgY = parseInt(bg[1]);


            },
            imgMouseMove = function (e) {
                //e.stopImmediatePropagation();
                //console.debug("imgMouseMove:" + obj.state.dragable );
                if (obj.state.dragable) {

                    var x = e.clientX - obj.state.mouseX;
                    var y = e.clientY - obj.state.mouseY;

                    // var bg = el.css('background-position').split(' ');

                    //  var bgX = x + parseInt(bg[0]);
                    //var bgY = y + parseInt(bg[1]);

                    el.css('background-position', (obj.state.bgX + x) + 'px ' + (obj.state.bgY + y) + 'px');
                    // obj.state.mouseX = e.clientX;
                    // obj.state.mouseY = e.clientY;
                }
            },
            imgMouseUp = function (e) {

                //console.debug("imgMouseUp:"+obj.state.dragable );
                e.stopImmediatePropagation();
                obj.state.dragable = false;
                //console.debug("imgMouseUp:"+obj.state.dragable );

            },
            zoomImage = function (e) {

                obj.state.dragable = false;
                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? obj.ratio *= 1.1 : obj.ratio *= 0.9;
                setBackground();
            }

        obj.spinner.show();
        obj.image.onload = function () {
            obj.spinner.hide();
            //setBackground();
            //setBackground();

            obj.state.dragable = false;

            //console.debug("image.onload:" + obj.state.dragable );
            el.unbind('mousedown');
            el.unbind('mousemove');
            $(window).unbind('mouseup');
            el.bind('mousedown', imgMouseDown);
            el.bind('mousemove', imgMouseMove);
            $(window).bind('mouseup', imgMouseUp);
            //el.bind('mousewheel DOMMouseScroll', zoomImage);
            obj.state.dragable = false;
        };
        obj.image.src = options.imgSrc;
        el.on('remove', function () { $(window).unbind('mouseup') });

        obj.state.dragable = false;
        //console.debug("init:" + obj.state.dragable );
        return obj;
    };

    $(window).resize(function () {
        //var winW = $(window).width();
        var winH = $(window).height();
        // var divResize = $(".lista-notif ol");
        // if (winH < 610)
        //     divResize.css('max-height', winH - 110);
        // else divResize.css('max-height', 500);

        var dropH = $(window).height();
        var comboResize = $(".combo");
        if (dropH < 610)
            comboResize.css('max-height', dropH - 70);
        else comboResize.css('max-height', 500);
    });

    jQuery.fn.cropbox = function (options) {
        return new cropbox(options, this);

    };
}));



function criaThumb(imgBase64, callback){
    var img = new Image();
    img.src = imgBase64;

    img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(img, 0, 0, 50, 50);
        retBase64 = canvas.toDataURL();
        callback(retBase64);
    }
}


