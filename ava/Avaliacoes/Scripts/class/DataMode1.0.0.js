function DataMode(mensagem) {
    var dm = this;
    this.mensagem = mensagem;

    this.yearMax = baseAnoMax;
    this.yearMin = baseAnoMin;
    this.dateMax = new Date();
    this.dateMax.setFullYear(this.yearMax, 11, 31)
    this.dateMax = this.dateMax.setHours(0, 0, 0, 0);

    this.dateMin = new Date();
    this.dateMin.setFullYear(this.yearMin, 0, 1)
    this.dateMin = this.dateMin.setHours(0, 0, 0, 0);

    

    this.init = function () {
        //verificase for null setar
        //dm.mensagem = new Mensagem("alerta");       
    }

    this.data = function (campo) {
        $(campo).setMask({ mask: "39/19/2999" });
        $(campo).change(function () {
            dm.validarData($(this));           
        });
    }
    this.hora = function (campo) {
        $(campo).setMask({ mask: "29:59" });
        $(campo).change(function () {
            dm.validarHora($(this));
        });
    }


    this.ano = function (campo) {
        $(campo).keydown(function (e) {
            
            if (e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
                return false;
            }

        }).focusout(function () {
 
            if ($(this).val() < parseInt(dm.yearMin, 10) || $(this).val() > (parseInt(dm.yearMax, 10) + 5) || isNaN($(this).val())) {
                $(this).val("");
            }
        });
    }
    this.numero = function (campo) {
        $(campo).keydown(function (e) {
            if (e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
                return false;
            }
        });
    }


    this.validarData = function (obj) {
        try {
            var teste = $.datepicker.parseDate('dd/mm/yy', obj.val());

            var atual = new Date();
            atual.setFullYear(obj.val().substring(6, 10), parseInt(obj.val().substring(3, 5)) - 1, obj.val().substring(0, 2));
            atual = atual.setHours(0, 0, 0, 0);

            if ((atual > dm.dateMax || atual <= dm.dateMin) && atual != "") {

                throw "e";
            }
        } catch (e) {
            dm.erro(RecursosJS["msg006"][0] + obj.val() + RecursosJS["msg006"][1]);
            obj.val("");
        }
    }
    this.validarHora = function (obj) {
        if (parseInt(obj.val().substring(0, 2)) > 24 || parseInt(obj.val().substring(0, 2)) < 0) {
            dm.erro(RecursosJS["msg007"][0] + obj.val() + RecursosJS["msg007"][1]);
            obj.val("");
        }
    }

    this.decimal = function (obj, qtdCasasDecimais, oldValue, iniValue) {
        var esplit, antigo;

        if (oldValue && $.trim(oldValue) != "") {
            oldValue = "oldValue";
        }
        if (iniValue && $.trim(iniValue) != "") {
            iniValue = "focusvalue";
        }

        $(obj).setMask({
            type: 'reverse', autoTab: 'false'
        }).keyup(function () {
            esplit = this.value.split(",");
            if (esplit.length > 2) {
                antigo = $(this).attr(oldValue).split(',');
                this.value = $(this).attr(oldValue).split(',')[0] + "," + $(this).attr(oldValue).split(',')[1];
            } else if (esplit[1] && esplit[1].length > qtdCasasDecimais) {
                this.value = $(this).attr(oldValue).split(',')[0] + "," + $(this).attr(oldValue).split(',')[1].substring(0, qtdCasasDecimais);
            }
        }).keydown(function (e) {

            if (e.which == 9&&this.value == "") {
                this.value = $(this).attr(iniValue);
            }
            if (e.which != 110 && e.which != 188 && e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
                return false;
            }
            $(this).attr(oldValue, this.value);
        }).focusin(function () {
            $(this).attr(iniValue, this.value);
            $(this).attr(oldValue, $(this).attr(iniValue));
            this.value = "";
        }).blur(function () {
            esplit = this.value.split(",");
            if (esplit[1] && esplit[1].length == 0) {
                this.value = $(this).attr(oldValue).split(',')[0];
            }
            if (this.value == "") {
                this.value = $(this).attr(iniValue);
            }
        });
    }


    this.erro = function (aviso) {
        //var test = new Mensagem("alerta");
        var dados = dm.mensagem.htmlTemplate("Avaliações",true, aviso, 'alerta');
        dm.mensagem.exibir($(dados));  
    } 


    this.init();
}

