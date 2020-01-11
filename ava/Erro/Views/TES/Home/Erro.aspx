<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Erro.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>" %>
<asp:Content ContentPlaceHolderID="ContentPlaceHolder5" ID="ContentPlaceHolder2" runat="server" >
    <script type="text/javascript" src="/AVA/StaticContent/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jStorage.js"></script>
    <script type="text/javascript">
        var $buoop = { vs: { i: 7, f: 8, o: 20, s: 4, n: 9} }
        $buoop.ol = window.onload;
        window.onload = function () {
            try {
                if ($buoop.ol)
                    $buoop.ol();
            } catch (e) {

            }
            var e = document.createElement("script");
            e.setAttribute("type", "text/javascript");
            e.setAttribute("src", "/AVA/StaticContent/Common/Scripts/navegadorUpdate.js");
            document.body.appendChild(e);
        }

        function voltar() {            
            $.jStorage.flush();            
            document.location.href = "/ava/mural";            
        }
    </script>
</asp:Content>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">
    
    <section id="ava_container" class="as1 centralizaclass">
        <div class="container_error clearfix">
            <h1 class="blokletters">Ops!</h1>
            <h3>Aconteceu um erro inesperado. Vamos verificar.</h3>
            <a href="javascript: voltar();" class="large awesome awesome-color " title="Volte para a página inicial e tente novamente!">Volte para a página inicial e tente novamente!</a>
            
            <div class="box_error_infos">
                <span class="discreto"><%=System.DateTime.Now%></span> - 
                <span class="discreto"><%=ViewData["pagina"].ToString()%></span>            
            </div>
            
        </div>
    </section>
</asp:Content>
