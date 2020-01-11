<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.PerfilUsuario>" %>
<%  
    //Por padrão os usuarios podem trocar de foto 
    bool bolUsuarioPodeAlterarFoto = ViewData["bolUsuarioPodeAlterarFoto"] == null ? true : (bool)ViewData["bolUsuarioPodeAlterarFoto"];
%>
<script type="text/javascript">

    $('#frmPerfil')[0].reset();
    localStorage.setItem("fotoAlterada", "false");

    var apelidoAntigo = "";
    var sobreAntigo = "";

    $("#cancelar").click(function () {
        closeModal();
    });

    $('#inputApelido').val($('#strApelidoPerfil').val());
    $('#inputSobreMin').val($('#strTextPerfil').val());

    apelidoAntigo = $('#inputApelido').val();
    sobreAntigo = $('#inputSobreMin').val();


    $("#lk_alterar_dados").prop("href", "/AVA/Dados")

    $("#butSalvar").click(function () {

        var fotoAlterada = localStorage.getItem("fotoAlterada");

        if ($('#inputApelido').val() === apelidoAntigo && $('#inputSobreMin').val() === sobreAntigo) {
            if (fotoAlterada === "false") {
                alert("Você precisa modificar pelo menos um dado para salvar as alterações.");
                return;
            }
        }

        $("#butSalvar").prop("disabled", true);

        salvarPerfilPublicoEditarPerfil($("#idPerfil").val(), $("#inputApelido").val(), $("#strFoto").val(), $("#strEmail").val(), $("#inputSobreMin").val(), $("#charSexo").val(), $("#strSeries").val(), $("#idArquivoAux").val());

        $("#butSalvar").prop("disabled", false);
    });

    function closeModal() {
        $.fancybox.close();
        $('#frmPerfil')[0].reset();
        if (modalEditarImagem) {
            modalEditarImagem.close();
        }
    };

    $('.fancybox-overlay').on("click", function () {
        if (modalEditarImagem) {
            modalEditarImagem.close();
        }
    });

</script>
<form id="frmPerfil" name="frmPerfil">

<style>
    
    @font-face {
    font-family: 'komika_text_kapsbold_italic';
    src: url('../../../StaticContent/Common/fonts/komtxkbi.eot');
    src: url('../../../StaticContent/Common/fonts/komtxkbi.eot?#iefix') format('embedded-opentype'),
         url('../../../StaticContent/Common/fonts/komtxkbi.woff2') format('woff2'),
         url('../../../StaticContent/Common/fonts/komtxkbi.woff') format('woff'),
         url('../../../StaticContent/Common/fonts/komtxkbi.ttf') format('truetype'),
         url('../../../StaticContent/Common/fonts/komtxkbi.svg#komika_text_kapsbold_italic') format('svg');
    font-weight: normal;
    font-style: normal;

    }

    @font-face {
        font-family: 'komika_textregular';
        src: url('../../../StaticContent/Common/fonts/komtxt__.eot');
        src: url('../../../StaticContent/Common/fonts/komtxt__.eot?#iefix') format('embedded-opentype'),
             url('../../../StaticContent/Common/fonts/komtxt__.woff2') format('woff2'),
             url('../../../StaticContent/Common/fonts/komtxt__.woff') format('woff'),
             url('../../../StaticContent/Common/fonts/komtxt__.ttf') format('truetype'),
             url('../../../StaticContent/Common/fonts/komtxt__.svg#komika_textregular') format('svg');
        font-weight: normal;
        font-style: normal;

    }

    @font-face {
        font-family: 'komika_textbold';
        src: url('../../../StaticContent/Common/fonts/komtxtb_.eot');
        src: url('../../../StaticContent/Common/fonts/komtxtb_.eot?#iefix') format('embedded-opentype'),
             url('../../../StaticContent/Common/fonts/komtxtb_.woff2') format('woff2'),
             url('../../../StaticContent/Common/fonts/komtxtb_.woff') format('woff'),
             url('../../../StaticContent/Common/fonts/komtxtb_.ttf') format('truetype'),
             url('../../../StaticContent/Common/fonts/komtxtb_.svg#komika_textbold') format('svg');
        font-weight: normal;
        font-style: normal;

    }

    @font-face {
        font-family: 'komika_textbold_italic';
        src: url('../../../StaticContent/Common/fonts/komtxtbi.eot');
        src: url('../../../StaticContent/Common/fonts/komtxtbi.eot?#iefix') format('embedded-opentype'),
             url('../../../StaticContent/Common/fonts/komtxtbi.woff2') format('woff2'),
             url('../../../StaticContent/Common/fonts/komtxtbi.woff') format('woff'),
             url('../../../StaticContent/Common/fonts/komtxtbi.ttf') format('truetype'),
             url('../../../StaticContent/Common/fonts/komtxtbi.svg#komika_textbold_italic') format('svg');
        font-weight: normal;
        font-style: normal;

    }

    @media only screen and (max-width: 620px){
        .modal-body .container .box2 {
            width: 59%!important;
        }
    }

    body{
        background-repeat: no-repeat;
        color: #747474;
    }

    .main-title {
        color: #191919;
        font-family: 'komika_textregular';
        font-size: 40px;
    }

    .icon-title { vertical-align: baseline; padding-right: 20px; font-size: 25px;}

    .span-form { color: #818181; font-size: 12px;}

    .show-grid-title{margin-bottom: 25px;}

    .right { float: right; }
    .right-text { text-align: right;}


    .card {
        background-color: #FEFEFE;
        padding: 1em;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow: 5px 4px 16px -2px rgba(0,0,0,0.64);
        -moz-box-shadow: 5px 4px 16px -2px rgba(0,0,0,0.64);
        box-shadow: 5px 4px 16px -2px rgba(0,0,0,0.64);
    }

    .card-title {
        font-size: 20px;
        margin-bottom: 2em;
        color: #535353;
    }
    .card-sub-title { font-size: 18px; color: #515151;}

    table#vertical-2 {width: 100%;}

    table#vertical-2 th {
        text-align: right;
        padding: 0.5em 0.8em;
        color: #747474;
        font-weight: 500;
    }
    table#vertical-2 td {font-weight: bold;}

    ul.list-check { list-style: none; }

    ul.list-check li { padding-bottom: 1em;}

    .show-grid { margin-bottom: 15px;}

    .caption-info { padding: 10px; font-size: 12px;}


    a.href-educ {color: #da9823; text-decoration: none; text-align: left;}


    .btn-salvar {
	    background: #de8000;
	    border: 1px solid #de8000;
	    border-radius: 3px;
	    color: #fff!important;
	    font-size: 14px;
	    font-weight: bold;
		    height: 32px;
	    line-height: 28px;
	    padding: 0 15px;
	    margin-left: 15px;
    }

    .btn-salvar:hover {
         background: #CF8520;
    }

    .btn-cancelar {
	    color: #232323;
	    background-color: #f2f2f2;
	    border: 1px solid #CBCBCB;
	    border-radius: 3px;
	    color: #484242!important;
	    font-size: 14px;
	    height: 29px;
	    line-height: 28px;
	    padding: 0 15px;
    }

    .btn-cancelar:hover {
        background: #EEEEEE;
    }


    .has-error .checkbox, .has-error .checkbox-inline,
    .has-error .control-label, .has-error .help-block,
    .has-error .radio, .has-error .radio-inline,
    .has-error.checkbox label, .has-error.checkbox-inline label,
    .has-error.radio label, .has-error.radio-inline label {
        color: #FF0500;
    }

    .has-form .checkbox, .has-success .checkbox-inline,
    .has-form .control-label, .has-success .help-block,
    .has-form .radio, .has-success .radio-inline,
    .has-form.checkbox label,
    .has-form.checkbox-inline label,
    .has-form.radio label,
    .has-form.radio-inline label {color: #747474;font-size: 15px;}

    .has-educ label~.form-control-feedback {top: 25px; left: 10px;}

    .has-educ label~.form-control {padding-left: 1em;}


    .has-error .form-control {
        border-color: #FF0500;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    }

    .has-error .form-control-feedback {color: #FF0500;}
    .modal-header {
        border-bottom: #6E7B8D solid 1px;
        margin-bottom: 5px;
    }
    .modal-title {
        /*color: #494949; font-size: 2em;padding: 0;margin: 17px 0 5px 0;font-weight: 500;*/
        color: #6E7B8D;
    font-size: 2em;
    padding: 0;
    margin: 10px 0 10px 15px;
    font-weight: 500;
    }

    #passo-dois{display: none;}
    #passo-tres{display: none;}

    .btn:hover {
	    color: none;
	    /* text-decoration: none; */
	    background-position: none;
	    /* -webkit-transition: background-position .1s linear; */
	    -moz-transition: none;
	    -o-transition: none;
	    /* transition: background-position .1s linear; */
    }

    .margin-reset {
	    margin: 0;
	    padding: 0px;
	    padding-left: 0;
	    background-color: #fff;
	    border: 0;
    }
	
    /* Modal Perfil */	
    .painel {
	    border-radius: 5px;
    }

    .box-login {
        position: relative;
    }

    .box-login img {
	    width: 170px;
	    height: 142px;
    }

    .editar-foto a {
	    text-decoration: none;
	    color: #fff;
    }

    .editar-foto {
	    position: absolute;
	    bottom: 0;
	    width: 100%;
	    height: 40px;
	    color: #fff;
	    background-color: rgba(0, 0, 0, 0.39);
	    text-align: center;
	    line-height: 40px;
    }

    .alterar {
	    float: left;
    color: #DE8000;
    font-size: 14px;
    padding: 10px;
    margin-left: 5px;
    }

    .alterar a {
	    color: #DE8000;
	    text-decoration: none;
    }

    span.legenda {
            font-size: 12px;
    }

    input.form-control {
        width: 99%;
        height: 24px;
        border-radius: 3px;
        border: #6E7B8D solid 1px;
    }

    .form-group.has-form.has-educ {
        padding-bottom: 20px;
    }

    .container {
        width: 600px;
        padding: 0;
        margin: 0 auto;
        margin-top: 10px;
        height: 242px;
    }

    .box1 {
        width: 170px;
        height: auto;
        float: left;
    }

    .box2 {
        width: 95%;
        height: auto;
        float: left;
        margin-left: 15px;
        margin-bottom: 20px;
    }

    .modal-body {
        padding: 0;
        margin: 0;
        overflow: hidden;
    }

    .btn {
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
    }

    .btn-default {
            color: #333;
            background-color: #fff;
            border-color: #ccc;
    }

    textarea.form-control:focus {
        border: #DE8000 1px solid;
        outline: none;
    }

    input:focus {
       border: #DE8000 1px solid;
    }
    
    a.fancybox-close
    {
        display: none;
    }
    
    .box-login img
    {
        width: 170px;
        height: 170px;
    }
    
    #inputApelido
    {
        padding-left: 1em;
    }
    
    .editar-foto
    {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.39);
        text-align: center;
        line-height: 40px;
    }
    
    textarea.form-control {
        height: 100% !important;
        width: 99%;
        border-radius: 4px;
        padding-left: 1em;
        padding-top: 1em;
        -moz-border-radius: 0;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border: #B0B0B0 solid 1px;
    }
    
    .container {
        width: 600px;
        padding: 0px;
        margin: 5px auto 0px;
        height: 269px;
    }
    
    div.fancybox-inner
    {
        height: 383px !important;
    }
    
    .control-label
    {
        color: #6E7B8D;
        font-size: 15px;
        cursor: default;
    }
    
    #inputSobreMin
    {
        font-family: Arial, Helvetica, sans-serif!important;
    }
    
    #myModal
    {
        outline: 0 !important;    
    }
    
    #divAtencao
    {
    margin-bottom: 5px;
    background: #f6f6f6;
    padding: 10px;
    margin-left: 0 !important;
    cursor: default !important;
    }
    
    #divAtencao label
    {
        cursor: default;
    }
    
</style>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="H1">
                    Editar meu perfil</h4>
            </div>
            <div class="modal-body" id="Div1">
                <div class="container">
                    <!-- <div class="box1">
                        <div class="box-login">
                            <img src="<%=Model.strFoto%>" alt="Foto Perfil">
                            <% if (bolUsuarioPodeAlterarFoto)
                               { %>
                            <div class="editar-foto" style="cursor: pointer">
                                <div style="cursor: pointer" class="altera_foto" onclick="AlteraFotoPerfil()">
                                    Alterar foto</div>
                            </div>
                            <% } %>
                        </div>
                        <div id="divAtencao">
                            <label><strong>Atenção:</strong> As informações do perfil são visíveis para toda comunidade do Educacional Rede Social.</label>
                        </div>
                    </div> -->
                    <div class="box2">
                          <div id="divAtencao">
                            <label><strong>Atenção:</strong> As informações do perfil são visíveis para toda comunidade do Educacional Rede Social.</label>
                        </div> 
                        <div class="form-group has-form has-educ">
                            <label class="control-label" for="inputSuccess2">
                                Apelido</label>
                            <input type="text" class="form-control" id="inputApelido" id="inputSuccess2" maxlength="30" aria-describedby="inputSuccess2Status">
                        </div>
                        <label class="control-label" for="inputSuccess2">
                            Sobre mim</label>
                        <div class="painel">
                            <textarea type="text" rows="7" cols="50" class="form-control" id="inputSobreMin"
                                aria-describedby="inputSuccess2Status" maxlength="299"></textarea>
                        </div>
                    </div>

                      

                </div>
                <div class="modal-footer">
                    <div class="left alterar">
                        <a id="lk_alterar_dados" href="#">Opções avançadas</a></div> <!-- Alterar meus dados -->
                    <button type="button" class="btn btn-salvar right" id="butSalvar">
                        Salvar</button>
                    <button type="button" class="btn btn-default right cancelar" style="font-weight: bold;"
                        id="cancelar" aria-label="Close">
                        Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="strTextPerfil" name="strTextPerfil" value="<%=Model.strTexto%>" />
<input type="hidden" id="strApelidoPerfil" name="strApelidoPerfil" value="<%=Model.strApelido%>" />

<input type="hidden" id="strNomeFoto" name="strNomeFoto" value="<%:ViewData["strNomeFoto"]%>" />
<input type="hidden" id="strPastaDestino" name="strPastaDestino" value="<%:"/upload/CentralProjetos/Arquivos/Perfil/"+Model.idUsuario%>" />
<input type="hidden" id="strFoto" name="strFoto" value="<%=Model.strFoto%>" />
<input type="hidden" id="strFotoAtual" name="strFotoAtual" value="<%=Model.strFoto %>" />
<input type="hidden" id="idUsuarioRequest" name="idUsuarioRequest" value="<%//=Model.idUsuarioRequest%>" />
<input type="hidden" id="idArquivoAux" name="idArquivoAux" value="0" />
<input type="hidden" id="idPerfil" name="idPerfil" value="<%=Model.idPerfil%>" />
<input type="hidden" id="charSexo" name="charSexo" value="<%=Model.charSexo%>" />
<input type="hidden" id="strSeries" name="strSeries" value="<%=Model.strSeries%>" />
<input type="hidden" id="strEmail" name="strEmail" value="<%=Model.strEmail%>" />
<input type="hidden" id="onde" name="onde" value="<%=Model.idUsuario%>" />
</form>
