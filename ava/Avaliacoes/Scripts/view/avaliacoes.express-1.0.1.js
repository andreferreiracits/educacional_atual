(function ($) {
    var FUNCAO_VAZIA = 'javascript:;';
    var loadExpress = new Carregando("SEC025-11-carregandoGeral")
    __carregar = function (mostrar, externo) {
        if (externo) {
            externo(mostrar);
            return;
        }

        if (mostrar) {
            loadExpress.mostrar();
        } else {
            loadExpress.esconder();
        }
    }


    var methods = {

        init: function (options) {
            var settings = {
                'fLoadExterno': undefined
            };
            return this.each(function () {
                var $this = $(this);
                if (options) {
                    $this.data('settings', $.extend(settings, options));
                } else {
                    $this.data('settings', settings);
                }
                $this.avaliacoesExpress("iniciar");
            });
        },

        iniciar: function () {
            var $this = $(this);

            var rInicio = $.ajax({
                url: '/Express/Inicio',
                type: 'POST',
                success: function () { __carregar(false, $this.data('settings').fLoadExterno); },
                beforeSend: function () { __carregar(true, $this.data('settings').fLoadExterno); }
            });

            rInicio.always(function (data) {
                if (!$this.avaliacoesExpress("_retornos", data, true)) {
                    return;
                }
                $this.find("#etapa1").attr("href", FUNCAO_VAZIA).unbind("click").bind("click", function () {
                    $this.avaliacoesExpress("_aplicarEtapa1");
                });
                $this.find("#etapa2").attr("href", FUNCAO_VAZIA).unbind("click").bind("click", function () {
                    $this.avaliacoesExpress("_aplicarEtapa2");
                });
                $this.find("#etapa3").attr("href", FUNCAO_VAZIA).unbind("click").bind("click", function () {
                    $this.avaliacoesExpress("_aplicarEtapa3");
                });

                $this.find("#etapa1").click();
            });
        },

        _aplicarEtapa1: function () {
            var $this = $(this);
            $this.find(".etapas").hide();
            $this.find("#coluna1").show().text("Etapa 1 ");
        },
        _aplicarEtapa2: function () {
            var $this = $(this);
            $this.find(".etapas").hide();
            $this.find("#coluna2").show().text("Etapa 2 ");
        },
        _aplicarEtapa3: function () {
            var $this = $(this);
            $this.find(".etapas").hide();
            $this.find("#coluna3").show().text("Etapa 3 ");
        },

        ///retorno: True(continuar) se não tiver erros, False(Não continuar) se conter erro
        _retornos: function (dados, showDados) {
            var $this = $(this);


            if (showDados) {
                $this.html(dados);
            }



            return true;
        }

    };


    $.fn.avaliacoesExpress = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.avaliacoesExpress');
        }

    };
})(jQuery);