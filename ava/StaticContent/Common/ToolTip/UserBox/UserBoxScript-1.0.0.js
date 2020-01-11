(function ($) {
    $.fn.UserBox = function (options) {
        this.opts = jQuery.extend($.trocaPapelDefaultOptions, options || {});
        getTemplate($(this), this.opts);
    }

    function getTemplate(target, opts) {
        $.ajax({
            url: opts.templateUrl,
            cache: false,
            dataType: "text/html",
            success: function (res, textStatus, XMLHttpRequest) {
                target.html(res);
                target.find("#userbox-content-rolechange").css("display", "");
                getDataSource(target, opts);
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                PosiLog.logDebug("TrocaPapel-->" + textStatus);
            }
        });
    }


    function getDataSource(target, opts) {
        $.ajax({
            url: opts.dataSourceUrl,
            cache: false,
            type: 'post',
            dataType: "json",
            success: function (jSonDS, textStatus, XMLHttpRequest) {
                $("#userbox-papel-corrente").html(jSonDS.strPapelCorrente);
                $("#userbox-last-access").html("&nbsp;" + jSonDS.strUltimoAcesso);
                $("#userbox-photo").attr("src", jSonDS.strNomePhoto);




                if (jSonDS.papeis.length > 1) {
                    $("#userbox-opt-papel").css("display", "");
                    $("#userbox-text-papel").css("display", "none");

                    $("#userbox-opt-papel").html("");
                    $(jSonDS.papeis).each(function () {
                        var strSelecionado = (this.IdPapel == jSonDS.intPapelCorrente) ? "selected" : "";
                        $("#userbox-opt-papel").append("<option value='" + this.IdPapel + "' " + strSelecionado + ">" + this.strNome + "</option>");
                    });
                } else {
                    $("#userbox-opt-papel").css("display", "none");
                    $("#userbox-text-papel").css("display", "");

                    $("#userbox-text-papel").html("");
                    $("#userbox-text-papel").html(jSonDS.strPapelCorrente);
                }


                /* Unidade nao esta sendo usada ainda.
                $("#userbox-opt-unidade").html("");
                $(jSonDS.unidades).each(function () {
                var strSelecionado = (this.IdUnidade == jSonDS.intUnidadeCorrente) ? "selected" : "";
                $("#userbox-opt-unidade").append("<option value='" + this.IdUnidade + "' " + strSelecionado + ">" + this.strNome + "</option>");
                });
                */

                bindEvents(target, opts);
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                PosiLog.logDebug("TrocaPapel-->" + textStatus);
            }
        });
    }



    function bindEvents(target, opts) {

        $("#userbox-opt-papel").change(function () {
            var _this = this;
            $.ajax({
                url: opts.setPapelUrl,
                cache: false,
                dataType: "text",
                type: 'post',
                data: {
                    IdPapel: _this.value,
                    IdUnidade: 0//$("#opt-unidade").val() <<--Nao utiliza unidade ainda
                },
                success: function (jSonDS, textStatus, XMLHttpRequest) {
                    if (String.valueOf(jSonDS) == String.valueOf(this.value)) {
                        $("#userbox-papel-corrente").html("Carregando...");
                        window.location.href = "/LMS/MeuEspaco";
                    } else {
                        _this.value = String.valueOf(jSonDS);
                    };

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    PosiLog.logDebug("TrocaPapel-->" + textStatus);
                }
            });

        });
        $("#userbox-opt-unidade").click = $("#userbox-opt-papel").click;








        $("#userbox-bt-edit-profile").click(function (e) {
            window.location.href = opts.editProfileUrl;
            e.preventDefault();

        });


        var animationSpeed = 100;
        $("#userbox-content-rolechange").position({
            my: "top",
            at: "bottom",
            collision: "flip",
            offset: "0 100 0",
            of: $("#userbox-bt-rolechange")
        });


        $("#userbox-close-window").click(
            function (e) {
                $("#userbox-bt-rolechange").click();
                e.preventDefault();
            }
        );
        $("#userbox-bt-rolechange").toggle(
            function (e) {
                $("#userbox-content-rolechange").show(animationSpeed);

                $("#userbox-bt-rolechange").removeClass("userbox-bt-rolechange");
                $("#userbox-bt-rolechange").addClass("userbox-bt-rolechange-content-displaying");


                $("#userbox-content-rolechange").position({
                    my: "top",
                    at: "bottom",
                    collision: "flip",
                    offset: "-30 0 0 0",
                    of: $("#userbox-bt-rolechange") // or $("#otherdiv)
                });

                // Alinha na horizontal
                $("#userbox-content-rolechange").position({
                    my: "left",
                    at: "left",
                    collision: "flip",
                    offset: "0 13 0 0",
                    of: $("#wellcome")
                });

                $("#userbox-bt-rolechange").html("&#9650;");
                e.preventDefault();
            },
            function (e) {
                $("#userbox-content-rolechange").hide(animationSpeed);
                $("#userbox-bt-rolechange").addClass("userbox-bt-rolechange");
                $("#userbox-bt-rolechange").removeClass("userbox-bt-rolechange-content-displaying");

                $("#userbox-bt-rolechange").html("&#9660;");
                e.preventDefault();
            }
        );




    }





    $.trocaPapelDefaultOptions =
    {
        dataSourceUrl: '/Home/GetDadosSelecaoPapel',
        setPapelUrl: '/Home/SetPapel',
        editProfileUrl: '/',
        templateUrl: '/Common/UserBox/UserBoxTemplate.html',
        rootDirUrl: '/Common/UserBox'
    }
})(jQuery);

