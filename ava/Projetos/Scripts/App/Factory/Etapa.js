//Factory para add evento aba selecionada
angular.module('Etapa').factory('EtapaFactory', ['$http', '$timeout', function ($http, $timeout) {
    function abaEtapaForm() {
        $(".abaEtapaFormulario").removeClass("ativo");
        $timeout(function () {
            $(".abaEtapaFormulario").click(function () {
                $(".abaEtapaFormulario").removeClass("ativo");
                $(this).addClass("ativo");
            });
        }, 10);
    }

    function selectFirstMaterial() {
        $timeout(function () {
            $(".abaEtapaFormulario a:first").trigger('click');
        }, 100);
    }

    function abrirMaterialAtivo() {
        $timeout(function () {
            jQuery("li:[name='e_aba'].ativo a").trigger("click");
        }, 100);
    };

    //anterior
    function abrirPrevPasso() {
        $timeout(function () {
            if (jQuery("li:[name='e_aba'].ativo").length > 0) {
                var elmAtivo = jQuery("li:[name='e_aba'].ativo");

                if (jQuery(elmAtivo).prev().length > 0) {
                    jQuery(elmAtivo).prev().find("a:last").trigger("click");
                } else {
                    if (jQuery(elmAtivo).parent().closest("li").prev("li").length > 0) {

                        if (jQuery(elmAtivo).parent().closest("li").prev("li").find("ol").find("li:last").hasClass("addpasso")) {
                            jQuery(elmAtivo).parent().closest("li").prev("li").find("ol").find("li:last").prev().find("a").trigger("click")
                        } else {
                            if (jQuery(elmAtivo).parent().closest("li").prev("li").find("ol").find("li a:last").length > 0) {
                                jQuery(elmAtivo).parent().closest("li").prev("li").find("ol").find("li a:last").trigger("click");
                            }
                        }

                    }
                }
            }
        }, 100);
    };

    //próximo
    function abrirNextPasso() {
        $timeout(function () {
            if (jQuery("li:[name='e_aba'].ativo").length > 0) {
                var elmAtivo = jQuery("li:[name='e_aba'].ativo");
                if (jQuery(elmAtivo).next().length > 0) {
                    if (jQuery(elmAtivo).next().hasClass("addpasso")) { //O próximo elemento é um botão de Add Passo
                        /* Se for passo, tenta pular para o próximo grupo */
                        if (jQuery(elmAtivo).parent().closest("li").next("li").length > 0) {
                            if (jQuery(elmAtivo).parent().closest("li").next("li").find("ol").find("li a:first").length > 0) {
                                jQuery(elmAtivo).parent().closest("li").next("li").find("ol").find("li a:first").trigger("click");
                            }
                        }
                        /* Fim código, pular para próximo grupo */

                        /** Código abaixo faz a ação de adicionar um novo passo e abrir ele **/
                        //var totalPasso = jQuery(elmAtivo).parent().find("li").length;
                        //jQuery(elmAtivo).next().find("a:first").trigger("click");
                        //var totalPassoAtual = jQuery(elmAtivo).parent().find("li").length;
                        //
                        //if (totalPasso != totalPassoAtual) {
                        //
                        //    $timeout(function () {
                        //        jQuery(elmAtivo).next().find("a:first").trigger("click");
                        //    }, 10);
                        //}
                        /* fim código, que o Próximo adiciona um novo Passo caso seja + */
                    } else {
                        jQuery(elmAtivo).next().find("a:first").trigger("click");
                    }
                } else {
                    if (jQuery(elmAtivo).parent().closest("li").next("li").length > 0) {
                        if (jQuery(elmAtivo).parent().closest("li").next("li").find("ol").find("li a:first").length > 0) {
                            jQuery(elmAtivo).parent().closest("li").next("li").find("ol").find("li a:first").trigger("click");
                        }
                    }
                }
            }
        }, 100);
    };

    return {
        abrirPrevPasso: abrirPrevPasso,
        abrirNextPasso: abrirNextPasso,
        selectFirstMaterial: selectFirstMaterial,
        abrirMaterialAtivo: abrirMaterialAtivo,
        abaEtapaForm: abaEtapaForm
    };
} ]);

//Armazena o objeto Turma que está selecionado
//angular.module('TurmaSelecionada').factory('TurmaSelecionadaFactory', ['$http', '$timeout', function ($http, $timeout) {
//    return function TurmaSelecionada() {
//        var objTurma = {};
//
//        this.addTurma = function (obj) {
//            objTurma = obj;
//        };
//
//        this.getTurma = function () {
//            return objTurma;
//        };
//    };
//} ]);

