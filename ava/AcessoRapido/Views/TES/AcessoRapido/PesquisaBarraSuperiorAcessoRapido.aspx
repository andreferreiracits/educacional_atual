<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderDadosMeio" ID="ContentPlaceHolderDadosMeio" runat="server">

    <form target="_top" method="post" action="" name="fBusca">  
        <input type="text" class="campo" value="Pesquisar" id="strpc_acessorapido" name="strpc_acessorapido" autocomplete="off">
         <div class="bt_geral"><input type="button" class="okP" value="Buscar" id="go_button" name="go_button"></div>
    </form>
    <div id="ava_listacompleta" style="width:100%;">

    </div>
    <script type="text/javascript">
        jQuery(function () {
            var idUsuarioPublico = '<%= Page.RouteData.Values["id"]%>';
            $('#ava_listacompleta').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $.ajax({
                url: "/AVA/AcessoRapido/AcessoRapido/PesquisaAcessoRapido/" + idUsuarioPublico,
                success: function (data) {
                    $("#ava_listacompleta").empty().show().html(data);
                   // $("#ava_dropdown").empty().hide();
                    // $("#fim_resultados a").attr("href", $(this).val());
                },
                error: function (data) {
                    alert("Erro: " + data);
                }

            });
        });
    </script>
</asp:Content>