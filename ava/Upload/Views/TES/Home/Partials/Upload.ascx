<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Upload.Models.Arquivo>>" %>

<link rel="stylesheet" href="/ava/StaticContent/Common/jquery-ui-1.8.2.custom/css/cinza-theme/jquery-ui-1.8.16.custom.css<%=Url.TimeStampLink() %>">
<link rel="stylesheet" href="/ava/StaticContent/Content/TES/css/uploader_2.0.0.css<%=Url.TimeStampLink() %>">

<script type="text/javascript">
    $(function () {
        $(".b_tooltip_center").each(function () {
            $(this).tooltip({
                offset: [0, 0],
                opacity: 1,
                position: 'top center',
                effect: 'slide',
                relative: true,
                events: {
                    def: 'click, mouseout'
                }
            });
        });
        $(".b_tooltip_left").each(function () {
            $(this).tooltip({
                offset: [0, 40],
                opacity: 1,
                position: 'top left',
                effect: 'slide',
                relative: true,
                events: {
                    def: 'click, mouseout'
                }
            });
        });
        $(".b_tooltip_right").each(function () {
            $(this).tooltip({
                offset: [0, -40],
                opacity: 1,
                position: 'top right',
                effect: 'slide',
                relative: true,
                events: {
                    def: 'click, mouseout'
                }

            });
        });
        $(".tooltip_title").each(function () {
            $(this).tooltip({
                offset: [-10, 0]
            });
        });
        
    })
</script>

<input type="hidden" id="idUsuarioRecebe_<%=ViewData["contador"]%>" value="<%=ViewData["idUsuarioRecebe"]%>" />
<input type="hidden" id="idFerramenta_<%=ViewData["contador"]%>" value="<%=ViewData["idFerramenta"]%>" />
<input type="hidden" id="idFerramentaTipo_<%=ViewData["contador"]%>" value="<%=ViewData["idFerramentaTipo"]%>" />

<input type="hidden" id="idVisitado" value="<%=ViewData["idVisitado"]%>" />


<div id="tabs_<%=ViewData["contador"]%>">
    <ul style="display:none;">
        <li><a href="#tabs-1">Do computador</a></li>
        <!---<li><a href="#tabs-2">Banco de arquivos</a></li>--->
    </ul>
    <div id="tabs_<%=ViewData["contador"]%>-1">
        <form id="upload_<%=ViewData["contador"]%>" name="upload_<%=ViewData["contador"]%>" action="/ava/Upload/Home/IniciaUpload/" method="POST" enctype="multipart/form-data">

            <div class="drag-drop-area" id="filedrag_<%=ViewData["contador"] %>">
                <div class="drag-drop-inside">
                    <p class="drag-drop-info">Solte os arquivos aqui</p>
                    <p>ou</p>
                    <p class="drag-drop-buttons">
                        <input type="file" id="fileselect_<%=ViewData["contador"] %>" name="fileselect[]" multiple="multiple" style="position: relative; z-index: 0;"/>                   
                    </p>
                </div>
            </div>

            <div class="arquivos_validos">
                <div class="arquivos_validos_upload">
                    <p>O arquivo enviado deve ter no máximo 10MB. </p>
                    <p id="permissoes_arquivos"></p>
                </div>
            </div>

            <div class="drag-drop-status" id="messages_<%=ViewData["contador"] %>">
                
            </div>

        </form>
    </div>
    <!--tabs-1-->
    
    <!--<div id="tabs-2">
        <p>
            lista de arquivos já enviados pelo usuário...
        </p>
    </div>-->
</div>


