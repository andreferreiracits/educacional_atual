var convCatToClas = function (nomeCategoria) {
    nomeCategoria = nomeCategoria.toLowerCase();
    nomeCategoria = nomeCategoria.replace(/ç/g, 'c');
    nomeCategoria = nomeCategoria.replace(/ã|á|à|â/g, 'a');
    nomeCategoria = nomeCategoria.replace(/é|ê/g, 'e')
    nomeCategoria = nomeCategoria.replace(/í/g, 'i');
    nomeCategoria = nomeCategoria.replace(/ô|ô|ó/g, 'o');
    nomeCategoria = nomeCategoria.replace(/û|ú/g, 'u');
    nomeCategoria = nomeCategoria.replace(/[^\w\s]/gi, '')
    nomeCategoria = nomeCategoria.replace(/\s+/g, "-");
	
    return nomeCategoria;
};

var getCaracteresRestantes = function (id, min, max) {
    if (jQuery(id).size() > 0) {
        if ((max - jQuery(id).val().length) < 0 && jQuery(id).val().toString().length > 0) {
            jQuery(id).removeClass('ng-invalid')
        }
        return max - jQuery(id).val().length;
    }
    return undefined;
};

var debugOnTitle = function (char) {
    var chr = (char || '.');
    if (window.document.title.indexOf("Esp") != -1)
        window.document.title = chr;
    else
        window.document.title += chr;
};

var Coalesce = function (value1, value2) {
    return (value1 || value2);
};

var filtrarEventos = function (arrDados, objFiltros, bolLike, tipo) {
    var objRetorno = [];
    for (var item in arrDados) {
        var notfound = false;
        if ((tipo > 0) && (arrDados[item].IdTipo != tipo)) {
            notfound = true;
        }
        else {
            if (objFiltros) for (var chave in objFiltros) {
                if (!bolLike && (arrDados[item][chave] != objFiltros[chave])) {
                    notfound = true;
                }
                if (bolLike) if (arrDados[item][chave]) if (arrDados[item][chave].indexOf(objFiltros[chave]) == -1) {
                    notfound = true;
                }
            }
        }
        if (!notfound)
            objRetorno.push(angular.copy(arrDados[item]));
    }
    return objRetorno;
};

var getDia = function () {
    return new Date().getDate();
};

var getMes = function () {
    return new Date().getMonth() + 1;
};

var getAno = function () {
    return new Date().getFullYear()
};

var hostPath = function () {
    return "http://" + location.host + location.pathname.replace(/(home)/i, "").replace(/\#/, "").replace(/\/+/g, "/");
};

var mediaQueriesSupported = function () {
    var retorno = false;
    if (angular.element(".mediaqueriestest").size() == 0) {
        var d = document.createElement('div');
        d.className = "mediaqueriestest";
        document.body.appendChild(d);
    }
    if (window.getComputedStyle && window.getComputedStyle(angular.element(".mediaqueriestest").get(0)).position == "absolute") {
        // supports media queries!
        retorno = true;
    }
    return retorno;
};

var html5VideoSupported = function () {
    return (typeof (document.createElement('video').canPlayType) != 'undefined') ? true : false;
};

var html5AudioSupported = function () {
    return (typeof (document.createElement('audio').canPlayType) != 'undefined') ? true : false;
};

var cssCalcSupported = function () {
    var retorno = true;
    if (angular.element("#css3_calc").size() == 0) {
        var d = document.createElement('div');
        d.id = "css3_calc";
        document.body.appendChild(d);
    }
    if (document.getElementById('css3_calc'))
        if (angular.element('#css3_calc').width() == 10) {
            retorno = false;
        }
    return retorno;
};

var getSemanaAnual = function (p_mes, p_dia) {
    var thisDT = new Date();
    var p_month = thisDT.getMonth();
    var p_day = thisDT.getDate();
    if (p_dia) if (!isNaN(p_dia)) if (parseInt(p_dia) > 0) if (parseInt(p_dia) <= 31)
        p_day = parseInt(p_dia);
    if (p_mes) if (!isNaN(p_mes)) if (parseInt(p_mes) > 0) if (parseInt(p_mes) <= 12)
        p_month = parseInt(p_mes) - 1;
    var dti = new Date(thisDT.getFullYear(), 0, 1, 0, 0, 0);
    var dts = new Date(thisDT.getFullYear(), p_month, p_day, 0, 0, 0);
    var correcao = 0;
    var semana = Math.floor((dts.getTime() - (dti.getTime() + (1000 * 60 * 60 * 24 * (7 - dti.getDay())))) / (1000 * 60 * 60 * 24 * 7)) + 2;
    return semana + correcao;
};

var getIntDiaDaSemana = function (p_mes, p_dia) {
    var thisDT = new Date();
    var p_month = thisDT.getMonth();
    var p_day = thisDT.getDate();
    if (p_dia) if (!isNaN(p_dia)) if (parseInt(p_dia) > 0) if (parseInt(p_dia) <= 31)
        p_day = parseInt(p_dia);
    if (p_mes) if (!isNaN(p_mes)) if (parseInt(p_mes) > 0) if (parseInt(p_mes) <= 12)
        p_month = parseInt(p_mes) - 1;
    var dts = new Date(thisDT.getFullYear(), p_month, p_day, 0, 0, 0);
    return dts.getDay();
};

var getStrDiasDaSemana = function () {
    return ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
};

var getStrDiasDaSemanaSimples = function () {
    return ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
};

var getStrDiaDaSemana = function (dia_da_semana) {
    var diasSemana = getStrDiasDaSemana();
    if (dia_da_semana)
        return diasSemana[dia_da_semana];
    else
        return diasSemana[new Date().getDay()];
};

var getStrDiaDaSemanaSimples = function (dia_da_semana) {
    var diasSemana = getStrDiasDaSemanaSimples();
    if (dia_da_semana)
        return diasSemana[dia_da_semana];
    else
        return diasSemana[new Date().getDay()];
};

var getObjDiasDaSemana = function (semana_do_ano) {
    var dias = [];
    var cur = new Date().getDay();
    var timeHoje = new Date().getTime();
    var diaSemHoje = getIntDiaDaSemana();
    var intSemAno = getSemanaAnual();
    if (semana_do_ano) {
        var relat = semana_do_ano - intSemAno;
        timeHoje += (1000 * 60 * 60 * 24 * 7 * relat);
    }
    for (var ii in [1, 2, 3, 4, 5, 6, 7]) {
        var relativo = (ii - diaSemHoje);
        var tmp = new Date(timeHoje + (1000 * 60 * 60 * 24 * relativo)).getDate();
        dias.push({
            intDiaSem: ii,
            intDia: tmp,
            strDia: getStrDiaDaSemana(ii),
            intMes: ((new Date(timeHoje + (1000 * 60 * 60 * 24 * relativo)).getMonth()) + 1),
            intAno: new Date(timeHoje + (1000 * 60 * 60 * 24 * relativo)).getFullYear()
        });
    }
    return dias;
};

var allMonths = function (intMonth) {
    var arrMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    if (intMonth)
        return arrMonths[intMonth - 1];
    else
        return arrMonths;
};

var allWeeks = function (intWeek) {
    var arrWeeks = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    if (intWeek)
        return arrWeeks[intWeek - 1];
    else
        return arrWeeks;
};

var DataCompleta = function () {
    var curTime = new Date()
    var month = curTime.getMonth() + 1
    var day = curTime.getDate()
    var year = curTime.getFullYear()
    var hours = curTime.getHours()
    var minutes = curTime.getMinutes()
    var seconds = curTime.getSeconds()
    return year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
};

var DataCompletaZeros = function () {
    var d = new Date();
    var ret = d.getFullYear().toString();
    ret += Right("0" + (d.getMonth() + 1).toString(), 2);
    ret += Right("0" + d.getDate().toString(), 2);
    ret += "_" + Right("0" + d.getHours().toString(), 2);
    ret += Right("0" + d.getMinutes().toString(), 2);
    ret += Right("0" + d.getSeconds().toString(), 2);
    return ret;
};

var DataSomenteZeros = function (p_data) {
    var d = new Date();
    if (p_data) {
        if (p_data instanceof Date) {
            d = p_data;
        }
        if (typeof (p_data) == "string") {
            d = new Date(p_data);
        }
    }
    var ret = d.getFullYear().toString();
    ret += Right("0" + (d.getMonth() + 1).toString(), 2);
    ret += Right("0" + d.getDate().toString(), 2);
    ret += "_" + Right("0" + d.getHours().toString(), 2);
    ret += Right("0" + d.getMinutes().toString(), 2);
    ret += Right("0" + d.getSeconds().toString(), 2);
    return ret;
};

var DataCompletaZerosFormatada = function (data) {
    var d = new Date();
    if (data)
        d = new Date(data);
    var ret = d.getFullYear().toString();
    ret += "/" + Right("0" + (d.getMonth() + 1).toString(), 2);
    ret += "/" + Right("0" + d.getDate().toString(), 2);
    ret += " " + Right("0" + d.getHours().toString(), 2);
    ret += ":" + Right("0" + d.getMinutes().toString(), 2);
    ret += ":" + Right("0" + d.getSeconds().toString(), 2);
    return ret;
};

var DiaMesComZeros = function (data) {
    var d = new Date();
    if (data)
        d = new Date(data);
    var ret = Right("0" + d.getDate().toString(), 2);
    ret += "/" + Right("0" + (d.getMonth() + 1).toString(), 2);
    return ret;
};

var removeLastSlash = function (string) {
    if (string.substr(string.length - 1) == "/") {
        string = string.substr(0, (string.length - 1));
    }
    return string;
};

var cb = function ($scope, callback_cb, params_cb) {
    if (callback_cb) {
        if (typeof (callback_cb) == "function") {
            try {
                if (params_cb)
                    callback_cb(params_cb);
                else
                    callback_cb();
            }
            catch (e) {
                if (params_cb)
                    $scope.$eval(callback_cb(params_cb));
                else
                    $scope.$eval(callback_cb());
            }
        }
        else {
            if (params_cb)
                $scope.$eval(callback_cb(params_cb));
            else
                $scope.$eval(callback_cb());
        }
    }

};

var waitWhile = function (test, interval, callback, params) {
    if (test) {
        cb(callback, params);
    }
    else {
        setTimeout(function () {
            waitWhile(test, interval, callback, params);
        }, interval);
    }
};

var toSource = function (obj) {
    var output = '';
    for (var property in obj) {
        output += property + ': ' + Response[property] + '; ';
    }
};

var getPrepByUf = function (strUF) {
    var arrNomes = ['do', 'do', 'do', 'do', 'da', 'do', 'do', 'do', 'de', 'do', 'do', 'do', 'de', 'do', 'da', 'do', 'de', 'do', 'do', 'do', 'do', 'de', 'de', 'de', 'de', 'de', 'de'];
    var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
    return arrNomes[arrSiglas.indexOf(strUF)];
};

var getEstadoByUf = function (strUF) {
    var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
    var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
    return arrNomes[arrSiglas.indexOf(strUF)];
};

var getBool = function (obj) {
    try {
        if (obj) {
            if (typeof (obj) == "string") {
                if (!isNaN(obj)) if (parseInt(obj) == 1) {
                    return true;
                }
                else if (obj == "true")
                    return true;
            }
            else {
                if (!isNaN(obj)) if (parseInt(obj) == 1) {
                    return true;
                }
                else if (obj === true)
                    return true;
            }
        }
        return false;
    }
    catch (ex) {
        return false;
    }
};


var getStr = function (obj) {
    try {
        return (obj || '');
    }
    catch (ex) {
        return '';
    }
};

var getInt = function (obj, defaultValue) {
    try {
        if (obj) if (!isNaN(obj)) if (parseInt(obj)) {
            return obj;
        }
    }
    catch (ex) {
        if (defaultValue)
            return defaultValue;
        else
            return 0;
    }
    if (defaultValue)
        return defaultValue;
    else
        return 0;
};

var getObject = function (content) {
    if (content) {
        if (typeof (content) == "string") {
            return angular.fromJson(content);
        }
        else {
            return angular.copy(content);
        }
    }
};

var clone_obj = function (obj) {
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }
    var c = obj instanceof Array ? [] : {};
    for (var i in obj) {
        var prop = obj[i];
        if (typeof prop == 'object') {
            if (prop instanceof Array) {
                c[i] = [];
                for (var j = 0; j < prop.length; j++) {
                    if (typeof prop[j] != 'object') {
                        c[i].push(prop[j]);
                    } else {
                        c[i].push(clone_obj(prop[j]));
                    }
                }
            } else {
                c[i] = clone_obj(prop);
            }
        } else {
            c[i] = prop;
        }
    }
    return c;
};

var isElementVisible = function (elem) {
    var pos = jQuery(elem).offset(),
		    wX = jQuery(window).scrollLeft(), wY = $(window).scrollTop(),
		    wH = jQuery(window).height(), wW = $(window).width(),
		    oH = jQuery(elem).outerHeight(), oW = $(elem).outerWidth();
    if (pos.left >= wX && pos.top >= wY && oW + pos.left <= wX + wW && oH + pos.top <= wY + wH) {
        return 2;
    }
    else {
        if (((pos.left <= wX && pos.left + oW > wX) || (pos.left >= wX && pos.left <= wX + wW)) && ((pos.top <= wY && pos.top + oH > wY) || (pos.top >= wY && pos.top <= wY + wH))) {
            return 1;
        }
        else {
            return 0;
        }
    }
};


var QueryString = function (variavel) {
    var variaveis = location.search.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&")
    var nvar;
    if (variaveis != "") {
        var qs = []
        for (var i = 0; i < variaveis.length; i++) {
            nvar = variaveis[i].split("=")
            qs[nvar[0]] = unescape(nvar[1])
        }
        if (qs[variavel])
            return qs[variavel];
    }
    return null
};

var QueryParams = function (variavel) {
    var variaveis = [];
    var qs = []
    var nvar;
    var query = "";
    if (location.hash.indexOf("?") != -1) {
        query = location.hash.split("?")[1];
        if (query.indexOf("&") != -1) {
            variaveis = query.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&")
        }
        else {
            variaveis.push(query)
        }
    }
    if (variaveis instanceof Array) if (variaveis.length > 0) {
        for (var i = 0; i < variaveis.length; i++) {
            nvar = variaveis[i].split("=")
            qs[nvar[0]] = unescape(nvar[1])
        }
        if (variavel) if (qs[variavel])
            return qs[variavel];
        return qs;
    }
    return null
};

var indexOfId = function (array, i) {
    for (var posicao in array) {
        if (array[posicao].Id == i) {
            return posicao;
        }
    }
    return -1;
};

var arrIndexOfId = function (array, i) {
    var retorno = [];
    for (var posicao in array) {
        if (array[posicao].Id == i) {
            retorno.push(posicao);
        }
    }
    return retorno;
};

var indexOfName = function (array, termo) {
    for (var posicao in array) {
        if (array[posicao].Nome == termo) {
            return posicao;
        }
    }
    return -1;
};

var isYpy = function () {
    return ('ontouchstart' in document.documentElement) ? true : false;
};

var isAndroid = function () {
    return navigator.platform.toUpperCase().indexOf("ARM") > -1 || navigator.userAgent.toUpperCase().indexOf("ANDROID") > -1;
};

var isNativeAndroidBrowser = function () {
    return (navigator.userAgent.indexOf('Mozilla/5.0') > -1 && navigator.userAgent.indexOf('Android') > -1 && navigator.userAgent.indexOf('AppleWebKit') > -1 && navigator.userAgent.indexOf('Edge') == -1 && navigator.userAgent.indexOf('Windows') == -1);
}

var isIpad = function () {
    return (navigator.userAgent.match(/iPad/i) != null);
};

var isIphone = function () {
    return ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null));
};

var isMobile = function () {
    return (
        (navigator.userAgent.match(/iPad/i) != null)
        ||
        (navigator.userAgent.match(/iPhone/i) != null)
        ||
        (navigator.userAgent.match(/iPod/i) != null)
        ||
        (Math.max(getInt(navigator.maxTouchPoints), getInt(navigator.msMaxTouchPoints)) > 0)
        ||
        ("onorientationchange" in window)
        ||
        (navigator.platform.toUpperCase().indexOf("ARM") > -1)
        ||
        (navigator.userAgent.toUpperCase().indexOf("ANDROID") > -1)
        ||
        (navigator.userAgent.toUpperCase().indexOf("WINDOWS PHONE") > -1)
        ||
        (navigator.userAgent.toUpperCase().indexOf("MOBILE") > -1)
    );
};

var isDesktop = function () {
    return (
            (
                ('onclick' in document)
                ||
                ('onclick' in window)
                ||
                ('onclick' in document.documentElement)
            )
            &&
            (navigator.userAgent.match(/iPad/i) == null)
            &&
            (navigator.userAgent.match(/iPhone/i) == null)
            &&
            (navigator.userAgent.match(/iPod/i) == null)
            &&
            (!("onorientationchange" in window))
            &&
            (navigator.userAgent.toUpperCase().indexOf("WINDOWS PHONE") == -1)
            &&
            (navigator.userAgent.toUpperCase().indexOf("ANDROID") == -1)
            &&
            (
                (Math.max(getInt(navigator.maxTouchPoints), getInt(navigator.msMaxTouchPoints)) == 0)
                ||
                (!('ontouchstart' in document.documentElement))
                ||
                (navigator.userAgent.toUpperCase().indexOf("WINDOWS") > -1)
                ||
                (navigator.userAgent.toUpperCase().indexOf("LINUX") > -1)
                ||
                (navigator.userAgent.toUpperCase().indexOf("MACINTOSH") > -1)
                ||
                (navigator.userAgent.toUpperCase().indexOf("CROS") > -1)
            )
        );
};

var isHibrid = function () {
    return (isMobile() && isDesktop());
};

var isTouchCompatible = function () {
    return isMobile();
};

var isClickCompatible = function () {
    return isDesktop();
};

var isIE = function () {
    return ((navigator.userAgent.match(/Edge/i) != null) || (navigator.userAgent.match(/MSIE/i) != null));
};

var IniciaisMaiusculas = function (texto) {
    var strResumo = "";
    if (texto.length > 0) {
        if (texto.indexOf(" ") != -1) {
            var aux = texto.trim().split(" ");
            var separador = "";
            for (var ii = 0; ii < aux.length; ii++) {
                var palavra = aux[ii];
                if (palavra.length > 2) {
                    palavra = Left(palavra, 1).toUpperCase() + Right(palavra, (palavra.length - 1)).toLowerCase();
                }
                else {
                    palavra = palavra.toLowerCase();
                }
                strResumo = strResumo + separador + palavra;
                separador = " ";
            }
        }
        else {
            palavra = texto.trim();
            if (palavra.length > 2) {
                strResumo = Left(palavra, 1).toUpperCase() + Right(palavra, (palavra.length - 1)).toLowerCase();
            }
            else {
                strResumo = palavra.toLowerCase();
            }
        }
    }
    return strResumo
};

var retira_acentos = function (palavra) {
    var nova = palavra;
    if (palavra) if (palavra != "") {
        nova = "";
        //var com_acento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇñÑ";
        //var sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUCnN";
        var com_acento = "àáâãäåāăąạảấầẩẫậắằẳẵặǟǡǻȁȃǎȧḁẚḃḅḇçćĉċčḉďđḋḍḏḑḓèéêëēĕėęěȅȇȩḕḗḙḛḝẹẻẽếềểễệḟḡĝğġģǧǵḣḥḧḩḫĥħȟẖìíîïḭḯĩīĭįǐȉȋỉịĵḱḳḵķĸǩḷḹḻḽĺļľŀłḿṁṃñṅṇṉṋńņňŉŋǹòóôõöōŏőǒǫǭȍȏȫȭȯȱṍṏṑṓọỏốồổỗộờởỡợṕṗŕŗřȑȓṙṛṝṟśŝşššșṡṣṥṧṩţťŧțṫṭṯṱẗùúûüũūŭůűưǔǖǘǚǜȕȗụủứừửữựṳṵṷṹṻµṽṿŵẁẃẅẇẉẘẋẍŷȳẏẙỳỵỷỹýÿźżžžȥẑẓẕÀÁÂÃÄÅĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶǞǠǺȀȂǍȦḀḂḄḆÇĆĈĊČḈĎĐḊḌḎḐḒÈÉÊËĒĔĖĘĚȄȆȨḔḖḘḚḜẸẺẼẾỀỂỄỆḞḠĜĞĠĢǦǴḢḤḦḨḪĤĦȞẖÌÍÎÏḬḮĨĪĬĮǏȈȊẛỈỊĴḰḲḴĶǨḶḸḺḼĹĻĽĿŁḾṀṂÑṄṆṈṊŃŅŇŊǸÒÓÔÕÖŌŎŐǑǪǬȌȎȪȬȮȰṌṎṐṒỌỎỐỒỔỖỘỚỞỠỢṔṖŔŖŘȐȒṘṚṜṞŚŜŞŠŠȘṠṢṤṦṨŢŤŦȚṪṬṮṰÙÚÛÜŨŪŬŮŰƯǓǕǗǙǛȔȖỤỦỨỪỬỮỰṲṴṶṸṺṼṾŴẀẂẄẆẈẊẌŶȲẎỲỴỶỸÝŸŹŻŽŽȤẐẒẔ";
        var sem_acento = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbccccccdddddddeeeeeeeeeeeeeeeeeeeeeeeeefggggggghhhhhhhhhiiiiiiiiiiiiiiijkkkkkklllllllllmmmnnnnnnnnnnnoooooooooooooooooooooooooooooooopprrrrrrrrrssssssssssstttttttttuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuvvwwwwwwwxxyyyyyyyyyyzzzzzzzzAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBCCCCCCDDDDDDDEEEEEEEEEEEEEEEEEEEEEEEEEFGGGGGGGHHHHHHHHHIIIIIIIIIIIIIIIJKKKKKKLLLLLLLLLMMMNNNNNNNNNNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPRRRRRRRRRSSSSSSSSSSSTTTTTTTTUUUUUUUUUUUUUUUUUUUUUUUUUUUUUVVWWWWWWXXYYYYYYYYYZZZZZZZZ";
        for (var i = 0; i < palavra.length; i++) {
            if (com_acento.indexOf(palavra.substr(i, 1)) >= 0) {
                nova += sem_acento.substr(com_acento.indexOf(palavra.substr(i, 1)), 1);
            } else {
                nova += palavra.substr(i, 1);
            }
        }
    }
    return nova;
};

window.lastPlayerTry = undefined;
window.lastPlayed = undefined;
var playAudio = function (idxAudio, pausable, force) {
    if (idxAudio) if (idxAudio != "") if (angular.element("#audio_" + idxAudio).size() > 0) {

        var ended = angular.element("#audio_" + idxAudio).get(0).ended;
        var paused = angular.element("#audio_" + idxAudio).get(0).paused;
        var state = angular.element("#audio_" + idxAudio).get(0).readyState;
        if (
                pausable &&
                window.lastPlayed == idxAudio &&
                !ended &&
                !paused &&
                state == 4
            ) {
            //pause audio se nao terminado/pausado
            try {
                angular.element("#audio_" + idxAudio)[0].pause();
            }
            catch (ex) {
                //window.document.title = "Não foi possível rebobinar o audio:" + ex;
            }
            try {
                angular.element("#audio_" + idxAudio)[0].currentTime = 0;
            }
            catch (ex) {
                //window.document.title = "Não foi possível rebobinar o audio:" + ex;
            }
        }
        else {
            window.lastPlayed = idxAudio;
            //window.document.title = "play: " + idxAudio;
            try {
                if (!isNativeAndroidBrowser()) if (force || (angular.element("#audio_" + idxAudio).get(0).readyState != 4))
                    angular.element("#audio_" + idxAudio).get(0).load();
                var volume = 0.7;
                try {
                    angular.element("#audio_" + idxAudio)[0].currentTime = 0;
                }
                catch (ex) {
                    //window.document.title = "Não foi possível rebobinar o audio:" + ex;
                }
                var els = angular.element('.audioPlayer');
                angular.forEach(els, function (el) {
                    try {
                        angular.element(el).get(0).currentTime = 0;
                    }
                    catch (exe) {
                        //window.document.title = "Não foi possível rebobinar um dos audios:" + exe;
                    }
                    angular.element(el).get(0).pause();
                });
                angular.element("#audio_" + idxAudio)[0].play();
            } catch (e) {
                //window.document.title = "Não foi possível tocar o audio:" + e;
            }
        }
    }

};

var safeApply = function (fn) {
    try {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    }
    catch (ex) { }
};

var publish = function (refer, name, fn) {
    angular.extend(refer, {
        name: fn
    });
};

var currentTime = function () {
    return new Date().getTime();
};

var Left = function (str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
};

var Right = function (str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
};

var IniciaisMaiusculas = function (texto) {
    var strResumo = "";
    if (texto.length > 0) {
        if (texto.indexOf(" ") != -1) {
            var aux = texto.trim().split(" ");
            var separador = "";
            for (var ii = 0; ii < aux.length; ii++) {
                var palavra = aux[ii];
                if (palavra.length > 1) {
                    palavra = Left(palavra, 1).toUpperCase() + Right(palavra, (palavra.length - 1)).toLowerCase();
                }
                else {
                    palavra = palavra.toLowerCase();
                }
                strResumo = strResumo + separador + palavra;
                separador = " ";
            }
        }
        else {
            palavra = texto.trim();
            if (palavra.length > 1) {
                strResumo = Left(palavra, 1).toUpperCase() + Right(palavra, (palavra.length - 1)).toLowerCase();
            }
            else {
                strResumo = palavra.toLowerCase();
            }
        }
    }
    return strResumo
};

var checkAll = function (object, filter) {
    var temp1 = $filter('filter')(object, filter, false);
    var temp2 = $filter('filter')(object, filter, true);
    if (temp1.length == object.length || temp2.length == object.length)
        return true;
    return false;
};

var ArrayIntersect = function (baseArray, findArray) {
    if (baseArray instanceof Array) if (findArray instanceof Array) {
        return baseArray.filter(function (n) {
            return findArray.indexOf(n) != -1
        });
    }
    return new Array();
};

var hasObjectArrayIntersectById = function (baseArray, findArray) {
    if (baseArray instanceof Array) if (findArray instanceof Array) {
        for (var bArr in baseArray) {
            for (var fArr in findArray) {
                if (baseArray[bArr].Id == findArray[fArr].Id) {
                    return true;
                }
            }
        }
    }
    return false;
};

var hasArrayElems = function (array) {
    if (array instanceof Array) if (array.length > 0)
        return true;
    return false;
};

var hasUniqueOwnerArrayElems = function (array) {
    var count = 0;
    if (array instanceof Array) if (array.length > 0) {
        var registrados = ",";
        for (var arr in array) {
            if (array[arr].bolEducadorDaTurma) if (registrados.indexOf("," + array[arr].Id + ",") == -1) {
                count++;
                registrados += array[arr].Id + ",";
            }
        }
    }
    return count;
};

var hasClass = function (id, classe) {
    var elms = angular.element(id);
    angular.forEach(elms, function (el) {
        if (angular.element(el).eq(0).hasClass(classe)) {
            return true;
        }
    });
    return false;
};

var hasFlash = function () {
    var hasFlash = false;
    try {
        hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
    } catch (exception) {
        hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
    }
    return hasFlash;
};

var hasAudioApi = function () {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

var isChrome = function () {
    return ((navigator.vendor.toLowerCase().indexOf("google") != -1) && (navigator.userAgent.toLowerCase().indexOf("chrome") != -1));
};

var newRand = function (interval) {
    if (interval) if (!isNaN(interval)) if (interval > 0)
        return Math.round(Math.random() * interval);
    return Math.round(Math.random() * 100000000);
};

var getAudioRecordFeatures = function (dontCheckProtocol) {
    var retorno = 0;
    var hasFlash = false;
    try {
        hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
    } catch (exception) {
        hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
    }
    var hasHtmlAudioApi = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (hasFlash)
        retorno += 1;
    if (hasHtmlAudioApi && ((dontCheckProtocol == true || (location.protocol.indexOf("https") != -1 && isChrome())) || !isChrome()))
        retorno += 2;
    return retorno;
};

var utf8encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
};

var removeTags = function (str) {
    return str.replace(/(<([^>]+)>)/ig, "").replace(/((%3C)([^(%3E)]+)(%3E))/ig, "");
};

var encodeTags = function (str) {
    var tmp = str.replace(/</gi, "&#60;")
    tmp = tmp.replace(/>/gi, "&#62;")
    return tmp
};

var decodeTags = function (str) {
    var tmp = str.replace(/&#60;/gi, "<")
    tmp = tmp.replace(/&#62;/gi, ">")
    return tmp
};

var getRelativePath = function (url) {
    var final_url = url;
    if (final_url.indexOf('\\') != -1) {
        final_url = final_url.replace(/(\\)/g, "/");
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

var getRegex = function (expressao) {
    var reg = new RegExp(eval(expressao));
    return reg;
};

var bindMobileClick = function (evento, seletor, funcao, argumentos) {
    var els = angular.element(seletor);
    angular.forEach(els, function (el) {
        angular.element(el).unbind(evento);
        angular.element(el).bind(evento, function (evt) {
            var elt = evt.target;
            var elm = angular.element(elt);
            if (typeof (funcao) == "function") {
                funcao();
            }
        });
    });
};

var loadDiretivaDinamica = function(){
	var deferred = $q.defer();

	try {
		var script = document.createElement('script');
		script.src = "/AVA/Resultados/Scripts/Diretiva/2015/teste/teste.js";
		document.getElementsByTagName('head')[0].appendChild(script);
		script.onload = function() 
		{
			alert("Script loaded and ready");
			deferred.resolve();
		};
	} catch (err) {
		deferred.reject();
	};

	return deferred.promise;
};

var situacaoEtapa = function (etapa) {
    // Pegar essa data do Servidor erro apra computadores com datas erradas.
    if (etapa) if (etapa instanceof Object) {
        var dataAtual = new Date();
        var DataInicio = etapa.DataInicio;
        var DataFim = etapa.DataFim;
        var DataResultado = etapa.DataResultado;
        if (typeof (DataInicio) == "string") if (!(DataInicio instanceof Date)) if (DataInicio.indexOf("/") != -1) {
            DataInicio = eval("new " + DataInicio.replace(/\//ig, ""));
        }
        if (typeof (DataFim) == "string") if (!(DataFim instanceof Date)) if (DataFim.indexOf("/") != -1) {
            DataFim = eval("new " + DataFim.replace(/\//ig, ""));
        }
        if (typeof (DataResultado) == "string") if (!(DataResultado instanceof Date)) if (DataResultado.indexOf("/") != -1) {
            DataResultado = eval("new " + DataResultado.replace(/\//ig, ""));
        }
        if (etapa.BolBreve != null && etapa.BolBreve) {
            return 0;   //etapa bloqueada / teoricamente ainda não iniciada
        } else if (dataAtual.getTime() > DataResultado.getTime()) { //projeto chegou ao fim: resultados
            return 4;
        }
        else if (dataAtual.getTime() > DataFim.getTime()) { //etapa encerrada
            return 3;
        }
        else if (dataAtual.getTime() > DataInicio.getTime()) { //etapa em andamento
            return 2;
        }
        else { //Aguarde - etapa ainda não iniciada
            return 1;
        }
    }
    return false;
};

var getEtapaCorrente = function (objEtapas, bolIncluirEtapasNaoEmAndamento) {
    var found = false;
    var retorno = undefined;
    var lastSituacao = 0;
    if (objEtapas != undefined) {
        if (objEtapas) if (objEtapas instanceof Array) if (objEtapas.length > 0) {
            for (var etapa in objEtapas) {
                var situacao = situacaoEtapa(objEtapas[etapa]);
                if (situacao == 2) {
                    found = true;
                    retorno = angular.copy(objEtapas[etapa]);
                    break;
                }
                if (bolIncluirEtapasNaoEmAndamento) {
                    if (situacao > 2) if (situacao >= lastSituacao) {
                        retorno = angular.copy(objEtapas[etapa]);
                    }
                }
                lastSituacao = situacao;
            }
        }
    }
    return retorno;
};

var getEtapaFinal = function (objEtapas) {
    var found = false;
    var retorno = undefined;
    var lastSituacao = 0;
    var lastData = new Date(0);
    if (objEtapas != undefined) {
        if (objEtapas) if (objEtapas instanceof Array) if (objEtapas.length > 0) {
            var dataAtual = new Date();
            for (var idxEtapa in objEtapas) {
                var etapa = angular.copy(objEtapas[idxEtapa]);
                var DataInicio = etapa.DataInicio;
                var DataFim = etapa.DataFim;
                var DataResultado = etapa.DataResultado;
                if (typeof (DataInicio) == "string") if (!(DataInicio instanceof Date)) if (DataInicio.indexOf("/") != -1) {
                    DataInicio = eval("new " + DataInicio.replace(/\//ig, ""));
                }
                if (typeof (DataFim) == "string") if (!(DataFim instanceof Date)) if (DataFim.indexOf("/") != -1) {
                    DataFim = eval("new " + DataFim.replace(/\//ig, ""));
                }
                if (typeof (DataResultado) == "string") if (!(DataResultado instanceof Date)) if (DataResultado.indexOf("/") != -1) {
                    DataResultado = eval("new " + DataResultado.replace(/\//ig, ""));
                }
                if (DataInicio.getTime() > lastData.getTime() && !etapa.BolOpcional) {
                    lastData = DataInicio;
                    retorno = etapa;
                }
                //Ordem??
            }
        }
    }
    return retorno;
};

window.lastPlayerTry = undefined;
window.lastPlayed = undefined;
var isPlayingAudio = function(idxAudio){
	if (idxAudio) if (idxAudio != "") if (angular.element("#" + idxAudio).size() > 0) {
		var elm = angular.element("#" + idxAudio).get(0);
		var ended = elm.ended;
		var paused = elm.paused;
		var state = elm.readyState;
		if (
			window.lastPlayed == idxAudio &&
			!ended &&
			!paused &&
			state == 4
		) {
			return true;
		}
	}
	return false;
};

var stopAudio = function (idxAudio) {
    if (idxAudio) {
        if (angular.element("#audio_" + idxAudio).size() > 0) {
            try {
                angular.element("#audio_" + idxAudio).get(0).currentTime = 0;
                angular.element("#audio_" + idxAudio).get(0).pause();
            } catch (e) { }
        }
    }
    else {
        var els = angular.element('.audioPlayer');
        angular.forEach(els, function (el) {
            try {
                angular.element(el).get(0).currentTime = 0;
                angular.element(el).get(0).pause();
            } catch (e) { }
        });
    }
};

var playAudio = function (idxAudio, pausable, force, classPlay, classStop, observer) {
    if (idxAudio) if (idxAudio != "") if (angular.element("#" + idxAudio).size() > 0) {
        var elm = angular.element("#" + idxAudio).get(0);
        var ended = elm.ended;
        var paused = elm.paused;
        var state = elm.readyState;
        if (
			pausable &&
			window.lastPlayed == idxAudio &&
			!ended &&
			!paused &&
			state == 4
		) {
            //pause audio se nao terminado(pausado)
            try {
                elm.pause();
            }
            catch (ex) {

            }
            try {
                elm.currentTime = 0;
            }
            catch (ex) {

            }
            if (classStop) if (classPlay) if (angular.element("[rel='" + idxAudio + "']").size() > 0) {
                angular.element("[rel='" + idxAudio + "']").removeClass(classStop).addClass(classPlay);
            }
            if (typeof (observer) == "function")
                observer(false, idxAudio, classPlay, classStop);
        }
        else {
            window.lastPlayed = idxAudio;
            try {
                if (!isNativeAndroidBrowser()) if (force || (elm.readyState != 4))
                    elm.load();
                var volume = 0.7;
                try {
                    elm.currentTime = 0;
                }
                catch (ex) {

                }
                var els = angular.element('.audioPlayer');
                angular.forEach(els, function (el) {
                    try {
                        angular.element(el).get(0).currentTime = 0;
                    }
                    catch (exe) {

                    }
                    angular.element(el).get(0).pause();
                    if (classStop) if (classPlay) {
                        var id = angular.element(el).attr("id");
                        if (id) if (id != "") if (angular.element("[rel='" + id + "']").size() > 0) {
                            angular.element("[rel='" + id + "']").removeClass(classStop).addClass(classPlay);
                        }
                    }
                });
                if (classStop) if (classPlay) if (angular.element("[rel='" + idxAudio + "']").size() > 0) {
                    angular.element("[rel='" + idxAudio + "']").removeClass(classPlay).addClass(classStop);
                }
                if (typeof(observer)=="function")
                    observer(true,idxAudio, classPlay, classStop);
                elm.play();
            } catch (e) {

            }
        }
    }

};

var getAudioType = function(AudioFile){
	var tipo = "";
	if (AudioFile) if (AudioFile.indexOf(".") != -1) {
		switch (AudioFile.substr(AudioFile.lastIndexOf(".")+1).toLowerCase()) {
			case 'mp3':
				tipo = "mpeg";
				break;
			case 'wma':
				tipo = "wma";
				break;
			case 'wav':
				tipo = "wav";
				break;
			case 'ogg':
			case 'oga':
				tipo = "ogg";
				break;
			default:
				tipo = "mpeg";
				break;
		}
	}
	return tipo;
};

var extendNativeFunctions = function(refer){
    if (angular) if (angular.extend) angular.extend(refer, {
        'isArray':angular.isArray,
        'isDate':angular.isDate,
        'isDefined':angular.isDefined,
        'isElement':angular.isElement,
        'isElementVisible':angular.isElementVisible,
        'isFunction':angular.isFunction,
        'isNumber':angular.isNumber,
        'isObject':angular.isObject,
        'isString':angular.isString,
        'isUndefined':angular.isUndefined
    });
};

var extendFunctions = function(refer){
    if (angular) if (angular.extend) angular.extend(refer, {
        'ArrayIntersect': ArrayIntersect,
        'Coalesce':Coalesce,
        'DataCompleta':DataCompleta,
        'DataCompletaZeros':DataCompletaZeros,
        'DataCompletaZerosFormatada':DataCompletaZerosFormatada,
        'DataSomenteZeros': DataSomenteZeros,
        'DiaMesComZeros':DiaMesComZeros,
        'IniciaisMaiusculas':IniciaisMaiusculas,
        'IniciaisMaiusculas':IniciaisMaiusculas,
        'Left':Left,
        'QueryParams':QueryParams,
        'QueryString':QueryString,
        'Right':Right,
        'allMonths':allMonths,
        'allWeeks':allWeeks,
        'arrIndexOfId':arrIndexOfId,
        'bindMobileClick':bindMobileClick,
        'cb':cb,
        'checkAll':checkAll,
        'clone_obj':clone_obj,
        'cssCalcSupported':cssCalcSupported,
        'currentTime':currentTime,
        'debugOnTitle':debugOnTitle,
        'decodeTags':decodeTags,
        'encodeTags': encodeTags,
        'extendNativeFunctions': extendNativeFunctions,
        'filtrarEventos':filtrarEventos,
        'getAno':getAno,
        'getAudioRecordFeatures':getAudioRecordFeatures,
        'getAudioType':getAudioType,
        'getBool': getBool,
        'getCaracteresRestantes': getCaracteresRestantes,
        'getDia':getDia,
        'getEstadoByUf': getEstadoByUf,
        'getEtapaCorrente': getEtapaCorrente,
        'getEtapaFinal': getEtapaFinal,
        'getInt':getInt,
        'getIntDiaDaSemana':getIntDiaDaSemana,
        'getMes': getMes,
        'getObject' : getObject,
        'getObjDiasDaSemana':getObjDiasDaSemana,
        'getPrepByUf':getPrepByUf,
        'getRegex':getRegex,
        'getRelativePath':getRelativePath,
        'getSemanaAnual':getSemanaAnual,
        'getStr':getStr,
        'getStrDiaDaSemana':getStrDiaDaSemana,
        'getStrDiaDaSemanaSimples':getStrDiaDaSemanaSimples,
        'getStrDiasDaSemana':getStrDiasDaSemana,
        'getStrDiasDaSemanaSimples':getStrDiasDaSemanaSimples,
        'hasArrayElems':hasArrayElems,
        'hasAudioApi':hasAudioApi,
        'hasClass':hasClass,
        'hasFlash': hasFlash,
        'hasObjectArrayIntersectById': hasObjectArrayIntersectById,
        'hasUniqueOwnerArrayElems':hasUniqueOwnerArrayElems,
        'hostPath':hostPath,
        'html5AudioSupported':html5AudioSupported,
        'html5VideoSupported':html5VideoSupported,
        'indexOfId':indexOfId,
        'indexOfName':indexOfName,
        'isAndroid':isAndroid,
        'isChrome':isChrome,
        'isClickCompatible':isClickCompatible,
        'isDesktop':isDesktop,
        'isElementVisible':isElementVisible,
        'isHibrid':isHibrid,
        'isIE':isIE,
        'isIpad':isIpad,
        'isIphone':isIphone,
        'isMobile':isMobile,
        'isNativeAndroidBrowser':isNativeAndroidBrowser,
        'isPlayingAudio':isPlayingAudio,
        'isTouchCompatible':isTouchCompatible,
        'isYpy':isYpy,
        'loadDiretivaDinamica':loadDiretivaDinamica,
        'mediaQueriesSupported':mediaQueriesSupported,
        'newRand':newRand,
        'playAudio':playAudio,
        'publish':publish,
        'removeLastSlash':removeLastSlash,
        'removeTags':removeTags,
        'retira_acentos':retira_acentos,
        'safeApply':safeApply,
        'situacaoEtapa':situacaoEtapa,
        'stopAudio':stopAudio,
        'toSource':toSource,
        'utf8encode':utf8encode,
        'waitWhile':waitWhile
    });
};

extendFunctions(window);
if (angular) {
    extendFunctions(angular);

    angular.extend(angular, {
        'extendFunctions': extendFunctions
    });
}
