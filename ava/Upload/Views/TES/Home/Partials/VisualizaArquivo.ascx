<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Upload.Models.Arquivo>>" %>

        <%



        string strImg = (string)ViewData["srcImagemCompleta"]; 
    
        
        %>



<%
foreach(var item in Model)
{
%>



<div class="visualizar_detalhe_arquivo">
    <%
        if(item.idBiblioteca == 3)
        {


            

    %>

        <script type="text/javascript" src="/AVA/StaticContent/Common/jCrop/js/jquery.min.js" ></script>
        <script type="text/javascript" src="/AVA/StaticContent/Common/jCrop/js/jquery.Jcrop.min.js" ></script>

                     

        <!-- <div id="img_padrao" class="imageBox" style="background-image: url(<%=strImg%>) ;background-size:100%; background-position:0 "> -->
            <!-- <div class="thumbBox" id="thumbBox" data-img="<%=strImg%>" > -->
                
                <img src="<%=ViewData["srcImagemCompleta"] %>"  id="target" data-img="<%=strImg%>" alt="<%=item.strNome %>"/>

                <%-- Imagens distorcidas --%>
                <%-- <img src="<%=ViewData["srcImagemCompleta"] %>" width="400" height="400" id="target" data-img="<%=strImg%>" alt="<%=item.strNome %>"/> --%>

                
            <!-- </div> -->
            <div class="spinner"></div>

            
        <!-- </div> -->
    <%
        } 
        else if (item.idBiblioteca == 2)
        {
    %>
            <div class="item_arquivo audio">
                <div class="tipo_arquivo">
                    <p></p>
                </div>
            </div>
    <%
        }
        else
        {
    %>
            <div class="item_arquivo doc">
                <div class="tipo_arquivo">
                    <p><%=item.strExtensao %></p>
                </div>
            </div>
    <%
        }
    %>
    


    
    <input type="hidden" id="idArquivo" value="<%=item.id %>" />

    <div class="info_arquivo_desc">
        <div>
            <a href="javascript:void(0);" style="display:none" class="select_corte cortar_imagem"><span></span>Recortar imagem</a>
            <div class="combo_recortar" style="display:none">
                <span class="seta_recorte"></span>
                <div class="cortar_cancelar" id="cortar_cancelar" >
                    <a href="javascript:void(0);" id="cancelar_voltar" class="btn_cinza left cancela_recorte">Cancelar</a>                    
                    <a href="javascript:void(0);" id="recortar"  class="btn_cinza left recortar_imagem">Salvar</a>
                </div>
                <div  class="action" style="display:none">

                        <!-- <input type="button" id="btnCrop" value="Cortar" ></input> -->
            
            
                        <!-- <input type="button" id="btnZoomOut" value="-" ></input>
                        <input type="button" id="btnZoomIn" value="+" ></input> -->
                                                
                        
            
                </div>  
            </div>
            <!-- <a href="/AVA/Upload/Home/ForceDownload?strSrcArquivo=<%=item.strDiretorio %>/<%=item.strArquivo %><%=item.strExtensao %>" class="download"><span class="FontAwesome"></span>Download</a> -->
        </div>
        
      

     
       
    </div>
</div>
<input type="hidden" id="x1" />
<input type="hidden" id="y1" />
<input type="hidden" id="x2" />
<input type="hidden" id="y2" />
<input type="hidden" id="w" />
<input type="hidden" id="h" />

<input type="hidden" id="strNomeArquivo" value="<%=item.strArquivo %>" />
<input type="hidden" id="strDirArquivoCrop" />
<input type="hidden" id="strDirAqruivo" value="<%=item.strDiretorio %>" />
<input type="hidden" id="strDirCompleto" value="<%=item.strDiretorio %>/<%=item.strArquivo %><%=item.strExtensao %>" />

<%
}
%>


<script language="Javascript">

  function showCoords(c)
  {
      // variables can be accessed here as
      // c.x, c.y, c.x2, c.y2, c.w, c.h
      
      $('#x1').val(c.x);
      $('#y1').val(c.y);
      $('#x2').val(c.x2);
      $('#y2').val(c.y2);
      $('#w').val(c.w);
      $('#h').val(c.h);



  };

</script>


<!-- 
<script>

jQuery(function (a) {
    
    
    


console.log('Dentro do crop');

var options =
        {
            thumbBox: '.thumbBox',
            spinner: '.spinner',
            imgSrc: $('#imagem_crop')[0].currentSrc
        }
  var  cropper = $('#imagem_crop').cropbox(options);

console.log( JSON.stringify(cropper)  );

console.log('teste');




"use strict";
(function (factory) {
if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
} else {
    factory(jQuery);
}
} (function ($) {
var cropbox = function (options, el) {
    var el = el || $(options.imageBox),
        obj =
        {
            state: {},
            ratio: 1,
            options: options,
            imageBox: el,
            thumbBox: el.find(options.thumbBox),
            spinner: el.find(options.spinner),
            image: new Image(),
            getDataURL: function () {
                var width = this.thumbBox.width(),
                    height = this.thumbBox.height(),
                    canvas = document.createElement("canvas"),
                    dim = el.css('background-position').split(' '),
                    size = el.css('background-size').split(' '),
                    dx = parseInt(dim[0]) - el.width() / 2 + width / 2,
                    dy = parseInt(dim[1]) - el.height() / 2 + height / 2,
                    dw = parseInt(size[0]),
                    dh = parseInt(size[1]),
                    sh = parseInt(this.image.height),
                    sw = parseInt(this.image.width);

                canvas.width = width;
                canvas.height = height;
                var context = canvas.getContext("2d");
                context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
                var imageData = canvas.toDataURL('image/png');
                return imageData;
            },
            getBlob: function () {
                var imageData = this.getDataURL();
                var b64 = imageData.replace('data:image/png;base64,', '');
                var binary = atob(b64);
                var array = [];
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], { type: 'image/png' });
            },
            zoomIn: function () {
                this.ratio *= 1.1;
                setBackground();
            },
            zoomOut: function () {
                this.ratio *= 0.9;
                setBackground();
            },
            zoom0: function () {
                setBackground();
                this.ratio = 1;
                setBackground();
            }
        },
        setBackground = function () {
            //console.debug("setBackground:" + obj.state.dragable );
            obj.state.dragable = false;
            var w = parseInt(obj.image.width) * obj.ratio;
            var h = parseInt(obj.image.height) * obj.ratio;

            var pw = (el.width() - w) / 2;
            var ph = (el.height() - h) / 2;

            el.css({
                'background-image': 'url(' + obj.image.src + ')',
                'background-size': w + 'px ' + h + 'px',
                'background-position': pw + 'px ' + ph + 'px',
                'background-repeat': 'no-repeat'
            });
        },
        imgMouseDown = function (e) {
            e.stopImmediatePropagation();
            //console.debug("mouseDown" );
            obj.state.dragable = true;
            //console.debug("mouseDown:" + obj.state.dragable );
            obj.state.mouseX = e.clientX;
            obj.state.mouseY = e.clientY;

            var bg = el.css('background-position').split(' ');
            obj.state.bgX = parseInt(bg[0]);
            obj.state.bgY = parseInt(bg[1]);


        },
        imgMouseMove = function (e) {
            //e.stopImmediatePropagation();
            //console.debug("imgMouseMove:" + obj.state.dragable );
            if (obj.state.dragable) {

                var x = e.clientX - obj.state.mouseX;
                var y = e.clientY - obj.state.mouseY;

                // var bg = el.css('background-position').split(' ');

                //  var bgX = x + parseInt(bg[0]);
                //var bgY = y + parseInt(bg[1]);

                el.css('background-position', (obj.state.bgX + x) + 'px ' + (obj.state.bgY + y) + 'px');
                // obj.state.mouseX = e.clientX;
                // obj.state.mouseY = e.clientY;
            }
        },
        imgMouseUp = function (e) {

            //console.debug("imgMouseUp:"+obj.state.dragable );
            e.stopImmediatePropagation();
            obj.state.dragable = false;
            //console.debug("imgMouseUp:"+obj.state.dragable );

        },
        zoomImage = function (e) {

            obj.state.dragable = false;
            e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? obj.ratio *= 1.1 : obj.ratio *= 0.9;
            setBackground();
        }

    obj.spinner.show();
    obj.image.onload = function () {
        obj.spinner.hide();
        //setBackground();
        //setBackground();

        obj.state.dragable = false;

        //console.debug("image.onload:" + obj.state.dragable );
        el.unbind('mousedown');
        el.unbind('mousemove');
        $(window).unbind('mouseup');
        el.bind('mousedown', imgMouseDown);
        el.bind('mousemove', imgMouseMove);
        $(window).bind('mouseup', imgMouseUp);
        //el.bind('mousewheel DOMMouseScroll', zoomImage);
        obj.state.dragable = false;
    };
    obj.image.src = options.imgSrc;
    el.on('remove', function () { $(window).unbind('mouseup') });

    obj.state.dragable = false;
    //console.debug("init:" + obj.state.dragable );
    return obj;
};

jQuery.fn.cropbox = function (options) {
    return new cropbox(options, this);

};
}));
    



});
    

            // setTimeout(function () { cropper.zoom0(); }, 1000);
            // $('#file').on('change', function () {
            //     var reader = new FileReader();
            //     reader.onload = function (e) {
            //         options.imgSrc = e.target.result;
            //         cropper = $('.imageBox').cropbox(options);
            //         setTimeout(function () { cropper.zoom0(); }, 1000);
            //     }
            //     reader.readAsDataURL(this.files[0]);
            //     this.files = [];
            // })
            // $('#btnCrop').on('click', function () {
            //     var img = cropper.getDataURL();
            //     criaThumb(img, function (imgThumb) {
            //         objEnvio = { "strBase64": img, "strBase64Thumb": imgThumb }
            //         ajaxPost('/Dinamica.svc/enviaImagemPerfil', objEnvio, function (retorno) {
            //             g_home.Usuario.strFoto = retorno.valor;
            //             $(".ps-perfil .ps-avatar").css("background-image", "url('" + g_home.Usuario.strFoto + "')");
            //             window.sessionStorage.setItem("home", JSON.stringify(g_home));
            //             $(".modal .btn-fechar").click();
            //         });
            //     });
            // })
            // $('#btnZoomIn').on('click', function () {
            //     cropper.zoomIn();
            // })
            // $('#btnZoomOut').on('click', function () {
            //     cropper.zoomOut();
            // })



    
/**
* Cropbox Created by ezgoing on 14/9/2014.
*/


</script> -->