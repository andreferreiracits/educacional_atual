<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/AcessoRapido.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Barras.Models.AcessoRapidoList>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">
</asp:Content>
<asp:Content ContentPlaceHolderID="itensAcesoRapido" ID="ContentArea" runat="server">    
    <div id="menu_equerda" class="menu_cascata">

    </div>
    <div id="menu_direita" class="menu_adc">
        <form target="_top" method="post" action="" name="fBusca">
            <input type="text" class="busca_secoes" value="" id="strpc_acessorapido" name="strpc_acessorapido" placeholder="BUSCA RÁPIDA POR SEÇÕES" autocomplete="off" />
        </form>
        <a href="javascript: void(0);" class="link_secoes" title="Seções de A a Z" id="ava_bt_vejatudo">Seções de A a Z</a>
        <div class="ava_resultados" style="display: none;"></div>

        <%
        foreach (var item in Model.menus)
        {
            if (item.intPosicao == 2)
            {
                var total = 0;
        %>
            <ul class="lista_destaques">
                <h4>Destaques</h4>
                <% foreach (var menus in item.itensCategoria)
                   {
                       total++;
                       if (total <7)
                       { %>
                        <li><a href="<%= menus.StrLink %>"><%= menus.StrTitulo%></a></li>
                <%     }
                   } %>
            </ul>
        <%
            }
        }
        %>
    </div>
</asp:Content>