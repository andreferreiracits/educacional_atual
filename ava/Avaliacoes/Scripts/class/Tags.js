function Tags(container, txtPalavras, txtFormulario, qtdCaracteres) {
    var tgs = this;
    this.container = "#" + container;
    this.txtPalavras = "#" + txtPalavras;
    this.txtFormulario = "#" + txtFormulario;
    this.qtdCaracteres = qtdCaracteres;


    this.contaChar = function () {
        var textarea = $(tgs.txtPalavras);
        var optionsT = {
            'maxCharacterSize': qtdCaracteres,
            'originalStyle': 'countNormalStyle',
            'warningStyle': '',
            'displayFormat': '#left caracteres restantes'
        };

        textarea.textareaCount(optionsT);

    }

    this.init = function () {
        tgs.contaChar();
        $(tgs.txtPalavras).keydown(function (e) {
            if (e.which == 188 || e.which == 110 || e.which == 9 || e.which == 13) {
                if ($.trim(this.value).length == 0) {
                    return false;
                }

                montaTag(this.value);

                tgs.ajustar();
                this.value = "";

                if (e.which == 188) {
                    return false;
                }
            }
        });

        montaTag = function (texto) {
            var pos = texto.indexOf(',');
            if (pos > -1) {
                texto = texto.substring(0, texto.length - 1);
            }

            var span = $("<span>").attr("class", "btnTag");
            $("<span>").text(texto).appendTo(span);
            $("<a>").text("x").attr({ "href": "javascript:void(0)", "class": "botaoFechar" }).bind("click", function () {
                $(this).parents("span").remove();
                tgs.ajustar();
            }).appendTo(span);

            span.insertBefore(tgs.container + " div.tagInptBox");
        }


        txtTagstoTag = function () {

            if ($(tgs.txtFormulario).val()) {
                $.each($(tgs.txtFormulario).val().split(","), function (pos, valor) {
                    if ($.trim(valor).length > 0)
                        montaTag(valor);
                });
            }
        }

        txtTagstoTag();
    }

    this.ajustar = function () {
        var strg = "";
        $(tgs.container + " span").each(function () {
            if ($.trim($(this).find("span").text()).length > 0) {
                strg += $(this).find("span").text() + ",";
            }
        });

        $(tgs.txtFormulario).val(strg);
    }


    this.init();
}







