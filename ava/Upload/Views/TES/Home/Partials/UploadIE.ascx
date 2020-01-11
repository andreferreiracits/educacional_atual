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

<div id="tabs_<%=ViewData["contador"]%>">
    
    <div id="tabs_<%=ViewData["contador"]%>">
        <form action="" method="POST" enctype="multipart/form-data">
            <input type="hidden" id="idUsuarioRecebe_<%=ViewData["contador"]%>" name="idUsuarioRecebe" value="<%=ViewData["idUsuarioRecebe"]%>" />
            <input type="hidden" id="idFerramenta_<%=ViewData["contador"]%>" name="idFerramenta" value="<%=ViewData["idFerramenta"]%>" />
            <input type="hidden" id="idFerramentaTipo_<%=ViewData["contador"]%>" name="idFerramentaTipo" value="<%=ViewData["idFerramentaTipo"]%>" />
            
            <div class="drag-drop-area" id="filedrag_<%=ViewData["contador"] %>">
                <div class="drag-drop-inside">
                    <p class="drag-drop-buttons">
                        <input type="file" class="solto" name="fileToUpload_<%=ViewData["contador"] %>" id="fileToUpload_<%=ViewData["contador"] %>" style="position: relative; z-index: 0;"/>                   
                    </p>
                    <p>
                        <button class="button" id="buttonUpload" onclick="return ajaxFileUpload(<%=ViewData["contador"] %>, '<%=ViewData["bolAluno"].ToString().ToLower()%>');">Enviar</button>
                        <img id="loading_<%=ViewData["contador"]%>" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" style="display:none;">                    
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
    
</div>


