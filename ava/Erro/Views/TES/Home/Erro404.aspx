<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Erro.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolder5" ID="ContentPlaceHolder2" runat="server" >
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
    </script>
</asp:Content>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">
    
    <section class="as1 centralizaclass" id="ava_container">
            <div class="container_error clearfix">
        	<h1 class="blokletters">Não achamos o que você procura :(</h1>
            <h3>Desculpe, mas a página que você esta tentando acessar não existe.</h3>
            
            <ul>
            <h4>O erro pode ser o resultado das seguintes situações:</h4>

                <li>Um erro de digitação do endereço</li>
                <li>Um link desatualizado</li>
			</ul>
            <p><a title="Volte para a página inicial e tente novamente!" class="large awesome awesome-color " href="#">Volte para a página inicial e tente novamente!</a></p>
            </div>
        
</section>
</asp:Content>
