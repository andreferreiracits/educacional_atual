"use strict"
angular.module('Participantes').directive('highlightMap', function () {
    return {
        restrict: 'E',
        scope: {
            width: "@width",
            height: "@height",
            Cidade: "@cidade",
            Estado: "@estado"
        },
        template: function (elem, attrs) {
            var estado = "", cidade = "", height = "", width = "";
            if (attrs) {
                if (attrs.cidade) if (attrs.cidade != "") {
                    cidade = attrs.cidade;
                }
                if (attrs.estado) if (attrs.estado != "") {
                    estado = attrs.estado;
                }
                if (attrs.height) if (attrs.height != "") {
                    height = attrs.height.toString();
                    if (height.indexOf("%") == -1 && height.indexOf("px") == -1)
                        height += "px";
                }
                if (attrs.width) if (attrs.width != "") {
                    width = attrs.width.toString();
                    if (width.indexOf("%") == -1 && width.indexOf("px") == -1)
                        width += "px";
                }
            }
            return '<iframe width="' + width + '" height="' + height + '" src="https://maps.google.com/maps?q=' + cidade + ',' + estado + ',Brasil&ie=UTF8&hq=&hnear=' + cidade + '&t=m&z=9&iwloc=A&output=embed"></iframe>';
        }
    };
});