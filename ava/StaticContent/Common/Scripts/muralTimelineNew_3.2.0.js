$(function () {
        var tpClick = "click"; // web
        if (Modernizr.touch) {
            tpClick = "touchstart"; //mobile
        }

        $("article .ctn_msg").expander({
            slicePoint: 500,
            window: 2,
            expandText: ' leia mais',
            expandPrefix: '...',
            userCollapseText: 'menos',
            preserveWords: true,
            expandEffect: 'fadeIn',
            collapseEffect: 'fadeOut'
        });

        $("article .iframeVideoVimeo").on('load', function () {
            var playerVimeo = $f(this);
            var playerVimeoStarted = false;
            playerVimeo.api('pause');
            playerVimeo.addEvent('ready', function () {
                playerVimeo.addEvent('play', function () {
                    if (!playerVimeoStarted) {
                        playerVimeoStarted = true;
                        playerVimeo.api('pause');
                    }
                });
            });
        });
    });

    $('body').on('click', '.todos_comentarios', function (event) {
        if (!$(this).hasClass('carregando')) {
            $(this).addClass('carregando');

            var _this = $(this);
            var _id = _this.closest('article').attr('ide');

            var comentarios50 = $(this).hasClass('pagina') ? true : false;
            var postData = { 'id': _id }

            if (comentarios50) {
                postData = {
                    'id': _id,
                    'maximo': 50,
                    'dataPrimeiroLoad': $('#dtmPriUpd_' + _id).val(),
                    'idsCarregados': $('#idsPriUpd_' + _id).val()
                };
            }
            var postUrl = comentarios50 ? ('/ava/Mural/Home/TodosComentariosAvinha/') : ('/ava/Mural/Home/TodosComentariosAvinha/');

            var divLoading = '<div style="text-align: center;" class="divLoading_' + _id + '"><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" style="float:none;"></div>';
            $(this).before(divLoading);
            $.post(postUrl, postData, function (data) {
                $('.divLoading_' + _id).remove();

                if (comentarios50) {

                    $(_this).before(data);

                    ///$('#idsPriUpd_' + _id).val($('#idsUltUpd_' + _id).val());

                    var idsAtuais = '';
                    if ($.trim($('#idsPriUpd_' + _id).val()) != '') {
                        idsAtuais += (atob($('#idsPriUpd_' + _id).val()).split(','));
                    }
                    if ($.trim($('#idsUltUpd_' + _id).val()) != '') {
                        if (idsAtuais != '')
                            idsAtuais += ',';
                        idsAtuais += (atob($('#idsUltUpd_' + _id).val()).split(','));
                    }

                    $('#idsPriUpd_' + _id).val(btoa(idsAtuais));

                    var totalComentarios = parseInt(atob($('#totCom_' + _id).val()));
                    var totalCarregados = atob($('#idsPriUpd_' + _id).val()).split(',').length;
                    var possuiVerMais = $('#bolVerMais50_' + _id).val() == '1';

                    if (possuiVerMais) {
                        $(_this).removeClass('carregando');
                        $('.todos_comentarios[ide=' + _id + '] .quantidade_coment').text(totalCarregados + ' de ' + totalComentarios);
                    } else {
                        $('.todos_comentarios[ide=' + _id + ']').slideUp().remove(); //.html('<span class="quantidade_coment">' + totalCarregados + ' de ' + totalComentarios + '</span>');
                    }

                    $('#idsUltUpd_' + _id).remove();
                    $('#bolVerMais50_' + _id).remove();
                    $('#totComUpd_' + _id).remove();

                } else {
                    $('#listaComentarios_' + _id).html(data);
                    $(this).removeClass('carregando');
                }

                $('.ctn_msg', '#listaComentarios_' + _id).expander({
                    slicePoint: 500,
                    window: 2,
                    expandText: ' leia mais',
                    expandPrefix: '...',
                    userCollapseText: 'menos',
                    preserveWords: true,
                    expandEffect: 'fadeIn',
                    collapseEffect: 'fadeOut'
                });

                $(".iframeVideoVimeo", '#listaComentarios_' + _id).on('load', function () {
                    var playerVimeo = $f(this);
                    var playerVimeoStarted = false;
                    playerVimeo.api('pause');
                    playerVimeo.addEvent('ready', function () {
                        playerVimeo.addEvent('play', function () {
                            if (!playerVimeoStarted) {
                                playerVimeoStarted = true;
                                playerVimeo.api('pause');
                            }
                        });
                    });
                });
            });
        }
    });


function editarPostagem(a) {

    
    var b = $(a).attr("ident");
    
    var c = this;

//    $.fancybox({
//        type: "ajax",
//        href: "/ava/mural/Home/excluirMensagem/" + b,
//        closeBtn: false,
//        padding: 0,
//        helpers: {
//            overlay: {
//                closeClick: false,
//                locked: false
//            }
//        },
//        afterShow: function() {
//            $(".fancybox-wrap .fancybox-inner").addClass("excluirPostMural");
//            $("#btnExcluidMensagem").click(function(d) {
//                var f = $(this).data("idmensagem");
//                excluirMensagem(f, true, a)
//            });
//            $("#btnCancelarExclusaoMensagem").click(function(d) {
//                $.fancybox.close()
//            })
//        }
//    })
}