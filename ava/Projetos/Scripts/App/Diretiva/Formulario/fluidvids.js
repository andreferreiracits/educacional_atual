angular.module('fluidvids').directive('fluidvids', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            video: '@',
            height: '@',
            width: '@'
        },
        template: '<div class="fluidvids">' +
                    '<iframe border="0" height="{{ getHeight(height) }}" width="100%" ng-src="{{ getUrlVideo(video) }}" rel="0" wmode="transparent" style="{{ getStyleHeight(height) }}"></iframe>' +
                  '</div>',
        link: function (scope, element, attrs) {
            scope.isYoutube = function (url) {
                return (url.toLowerCase().indexOf("youtu") != -1) ? true : false;
            };

            scope.isVimeo = function (url) {
                return (url.toLowerCase().indexOf("vimeo.com") != -1) ? true : false;
            };

            scope.getTokenYoutube = function (url) {
                retorno = "";
                if (url.indexOf("?") != -1) {
                    url = url.split("?")[0].toLowerCase() + "?" + url.split("?")[1];
                }
                else {
                    url = url.substr(0, url.lastIndexOf("/")).toLowerCase() + "/" + url.substr(url.lastIndexOf("/") + 1);
                }
                url = url.replace("//", "").replace("http:", "").replace("https:", "").replace("www.", "");
                if (url.indexOf("youtu.be/") != -1 && url.length > 19) {
                    retorno = url.split("youtu.be/")[1].split("?")[0].split("&")[0];
                }
                if (url.indexOf("youtube.com/watch?v=") != -1 && url.length > 30) {
                    retorno = url.split("youtube.com/watch?v=")[1].split("&")[0];
                }
                if (url.indexOf("youtube.com/embed/") != -1 && url.length > 28) {
                    retorno = url.split("youtube.com/embed/")[1].split("?")[0].split("&")[0];
                }
                if (url.indexOf("youtube.com/v/") != -1 && url.length > 24) {
                    retorno = url.split("youtube.com/v/")[1].split("?")[0].split("&")[0];
                }
                return retorno;
            };

            scope.getTokenVimeo = function (url) {
                retorno = "";
                if (url.indexOf("?") != -1) {
                    url = url.split("?")[0].toLowerCase() + "?" + url.split("?")[1];
                }
                else {
                    url = url.substr(0, url.lastIndexOf("/")).toLowerCase() + "/" + url.substr(url.lastIndexOf("/") + 1);
                }
                url = url.replace("//", "").replace("http:", "").replace("https:", "").replace("www.", "");
                if (url.indexOf("vimeo.com/") != -1 && url.length > 12) {
                    retorno = url.split("vimeo.com/")[1].split("?")[0].split("&")[0];
                }
                return retorno;
            };

            scope.getUrlVideo = function (url) {
                var video = url;
                if (scope.isYoutube(url)) {
                    video = "//www.youtube.com/embed/" + scope.getTokenYoutube(url) + "/?rel=0&wmode=transparent"
                }
                if (scope.isVimeo(url)) {
                    video = "//player.vimeo.com/video/" + scope.getTokenVimeo(url) + "/"
                }
                return video;
            };
            scope.getHeight = function (p_height) {
                if (p_height) if (!isNaN(p_height)) if (p_height > 0) {
                    return p_height + "px";
                }
                return "";
            };
            scope.getStyleHeight = function (p_height) {
                if (p_height) if (!isNaN(p_height)) if (p_height > 0) {
                    return p_height + "px;";
                }
                return "";
            };



            /*
            if (attrs.stylize) if (attrs.stylize == 'true') {
            var ratio = (attrs.height / attrs.width) * 100;
            element[0].style.paddingTop = ratio + '%';
            }
            */
        }
    };
});