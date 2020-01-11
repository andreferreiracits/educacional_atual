function getDestaquesElementById(d, c) {
    for (var b = 0, a = c.length; b < a; b++) {
        if (c[b].id == d) {
            return c[b]
        }
    }
}

function rotate_destD_simples() {
    $("#prev_destD_simples").click()
}

function carroselDestaqueEscola(a, d, g, h, e) {
    var b = 5000;
    var c = setInterval(e, b);
    var i = $("#" + a + "li").outerWidth();
    var j = i * (-1);
    $("#nav_footer_destaqueD_simples ul li a").click(function() {
        f(this.id)
    });

    function f(p) {
        var m = $("#nav_footer_destaqueD_simples ul").find("li").removeClass("ativo");
        var o = $("#lista_destaqueD_simples .lista_destaques").find("li");
        $("#lista_destaqueD_simples .lista_destaques").empty();
        var l = parseInt(p, 10);
        $("#nav_footer_destaqueD_simples ul").find("li#" + p).addClass("ativo");
        var n = parseInt($("#" + h).attr("max"), 10);
        var k = l;
        for (index = 0; index < o.length; index++) {
            $("#lista_destaqueD_simples .lista_destaques").append(getDestaquesElementById(k, o));
            if (k == n) {
                k = 1
            } else {
                k++
            }
        }
    }
    $("#" + d).click(function() {
        var k = parseInt($("#" + a + " ul").css("left")) + i;
        $("#" + a + " ul").animate({
            left: k
        }, 200, function() {
            $("#" + a + " li:first").before($("#" + a + " li:last"));
            $("#" + a + " ul").css({
                left: j
            });
            $max = $("#" + h).attr("max");
            $idAtivo = $("#" + h).find("li.ativo").attr("order");
            $idProximo = Number($idAtivo) - 1;
            if ($idProximo < 1) {
                $idProximo = $max
            }
            $("#" + h).find('li[order="' + $idAtivo + '"]').removeClass("ativo");
            $("#" + h).find('li[order="' + $idProximo + '"]').addClass("ativo")
        });
        return false
    });
    $("#" + g).click(function() {
        var k = parseInt($("#" + a + " ul").css("left")) - i;
        $("#" + a + " ul").animate({
            left: k
        }, 200, function() {
            $("#" + a + " li:last").after($("#" + a + " li:first"));
            $("#" + a + " ul").css({
                left: j
            });
            $max = $("#" + h).attr("max");
            $idAtivo = $("#" + h).find("li.ativo").attr("order");
            $idProximo = Number($idAtivo) + 1;
            if ($idProximo > $max) {
                $idProximo = 1
            }
            $("#" + h).find('li[order="' + $idAtivo + '"]').removeClass("ativo");
            $("#" + h).find('li[order="' + $idProximo + '"]').addClass("ativo")
        });
        return false
    });
    $("#" + a).hover(function() {
        clearInterval(c)
    }, function() {
        c = setInterval(e, b)
    })
}

function rotate_destEduColFixa() {
    $("#next_dest_simples").click()
}

function carroselDestaqueEducacionalColFixa(a, d, f, g, e) {
    var b = 5000;
    var c = setInterval(e, b);
    var h = $("#" + a + "li").outerWidth();
    var i = h * (-1);
    $("#nav_footer_destaque_simples ul li a").click(function() {
        j(this.id)
    });

    function j(p) {
        var m = $("#nav_footer_destaque_simples ul").find("li").removeClass("ativo");
        var o = $("#lista_destaque_simples .lista_destaques").find("li");
        $("#lista_destaque_simples .lista_destaques").empty();
        var l = parseInt(p, 10);
        $("#nav_footer_destaque_simples ul").find("li#" + p).addClass("ativo");
        var n = parseInt($("#" + g).attr("max"), 10);
        var k = l;
        for (index = 0; index < o.length; index++) {
            $("#lista_destaque_simples .lista_destaques").append(getDestaquesElementById(k, o));
            if (k == n) {
                k = 1
            } else {
                k++
            }
        }
    }
    $("#" + d).click(function() {
        var k = parseInt($("#" + a + " ul").css("left")) + h;
        $("#" + a + " ul").animate({
            left: k
        }, 200, function() {
            $("#" + a + " li:first").before($("#" + a + " li:last"));
            $("#" + a + " ul").css({
                left: i
            });
            $max = $("#" + g).attr("max");
            $idAtivo = $("#" + g).find("li.ativo").attr("order");
            $idProximo = Number($idAtivo) - 1;
            if ($idProximo < 1) {
                $idProximo = $max
            }
            $("#" + g).find('li[order="' + $idAtivo + '"]').removeClass("ativo");
            $("#" + g).find('li[order="' + $idProximo + '"]').addClass("ativo")
        });
        return false
    });
    $("#" + f).click(function() {
        var k = parseInt($("#" + a + " ul").css("left")) - h;
        $("#" + a + " ul").animate({
            left: k
        }, 200, function() {
            $("#" + a + " li:last").after($("#" + a + " li:first"));
            $("#" + a + " ul").css({
                left: i
            });
            $max = $("#" + g).attr("max");
            $idAtivo = $("#" + g).find("li.ativo").attr("order");
            $idProximo = Number($idAtivo) + 1;
            if ($idProximo > $max) {
                $idProximo = 1
            }
            $("#" + g).find('li[order="' + $idAtivo + '"]').removeClass("ativo");
            $("#" + g).find('li[order="' + $idProximo + '"]').addClass("ativo")
        });
        return false
    });
    $("#" + a).hover(function() {
        clearInterval(c)
    }, function() {
        c = setInterval(e, b)
    })
}

function rotate_destEducacional() {
    $("#next_dest_duplo").click()
}

function carroselDestaqueEducacional(a, d, f, g, e) {
    var b = 5000;
    if ($("#nav_footer_destaque_duplo ul li").html()) {
        var c = setInterval(e, b)
    }
    var h = $("#" + a).width();
    var i = h * (-1);
    $("#nav_footer_destaque_duplo ul li a").click(function() {
        j(this.id)
    });

    function j(p) {
        var m = $("#nav_footer_destaque_duplo ul").find("li").removeClass("ativo");
        var o = $("#lista_destaque_duplo .lista_destaques").find("li");
        $("#lista_destaque_duplo .lista_destaques").empty();
        var l = parseInt(p, 10);
        $("#nav_footer_destaque_duplo ul").find("li#" + p).addClass("ativo");
        var n = parseInt($("#" + g).attr("max"), 10);
        var k = l;
        for (index = 0; index < o.length; index++) {
            $("#lista_destaque_duplo .lista_destaques").append(getDestaquesElementById(k, o));
            if (k == n) {
                k = 1
            } else {
                k++
            }
        }
    }
    $("#" + d).click(function() {
        $("#" + a + " ul").animate({
            left: h
        }, 200, function() {
            $("#" + a + " li:first").before($("#" + a + " li:last"));
            if ($("#destaqueEducacional").width() > 200) {
                $("#" + a + " li:first").before($("#" + a + " li:last"))
            }
            $("#" + a + " ul").css({
                left: i
            });
            $max = $("#" + g).attr("max");
            $idAtivo = $("#" + g).find("li.ativo").attr("order");
            $idProximo = Number($idAtivo) - 1;
            if ($idProximo < 1) {
                $idProximo = $max
            }
            $("#" + g).find('li[order="' + $idAtivo + '"]').removeClass("ativo");
            $("#" + g).find('li[order="' + $idProximo + '"]').addClass("ativo")
        });
        return false
    });
    $("#" + f).click(function() {
        $("#" + a + " ul").animate({
            left: h
        }, 200, function() {
            $("#" + a + " li:last").after($("#" + a + " li:first"));
            if ($("#destaqueEducacional").width() > 200) {
                $("#" + a + " li:last").after($("#" + a + " li:first"))
            }
            $("#" + a + " ul").css({
                left: i
            });
            $max = $("#" + g).attr("max");
            $idAtivo = $("#" + g).find("li.ativo").attr("order");
            $idProximo = Number($idAtivo) + 1;
            if ($idProximo > $max) {
                $idProximo = 1
            }
            $("#" + g).find('li[order="' + $idAtivo + '"]').removeClass("ativo");
            $("#" + g).find('li[order="' + $idProximo + '"]').addClass("ativo")
        });
        return false
    });
    $("#" + a).hover(function() {
        clearInterval(c)
    }, function() {
        if ($("#nav_footer_destaque_duplo ul li").html()) {
            c = setInterval(e, b)
        }
    })
};