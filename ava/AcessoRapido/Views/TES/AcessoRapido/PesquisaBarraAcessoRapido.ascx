<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<script>
    $(document).ready(function () {
        //alert(1);
        $("#strpc_acessorapido").live('focus', function () {
            if ($(this).val() == "Pesquisar") {
                $(this).val("");
            }
        });
        $("#strpc_acessorapido").live('blur', function () {
            if ($(this).val() == "") {
                $(this).val("Pesquisar");
            }
        });
        $("#go_button").live('click', function () {

            $("#ava_listacompleta").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $.ajax({
                url: "/AVA/AcessoRapido/AcessoRapido/PesquisaAcessoRapido/" + $("#strpc_acessorapido").val(),
                success: function (data) {
                    $("#ava_listacompleta").empty().html(data);
                },
                error: function () {
                    alert("Erro");
                }

            });

        });
    });
</script>
<form target="_top" method="post" action="" name="fBusca">  
    <input type="text" class="campo" value="Pesquisar" id="strpc_acessorapido" name="strpc_acessorapido" autocomplete="off">
     <div class="bt_geral"><input type="button" class="okP" value="Buscar" id="go_button" name="go_button"></div>
</form>
<div id="ava_listacompleta" style="width:100%;">

</div>
<script type="text/javascript">
    jQuery(function () {
        $.ajax({
            url: "/AVA/AcessoRapido/AcessoRapido/PesquisaAcessoRapido/" + $(".fim_resultados a").attr("href"),
            success: function (data) {
                $("#ava_listacompleta").empty().show().html(data);
                $("#ava_dropdown").empty().hide();
                // $("#fim_resultados a").attr("href", $(this).val());
            },
            error: function (data) {
                alert("Erro: " + data);
            }

        });
    });
</script>