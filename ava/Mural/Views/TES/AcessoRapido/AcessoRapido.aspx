<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/AcessoRapido.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Barras.Models.AcessoRapidoList>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   
    
    <script type="text/javascript" defer="defer" >
        
        /*
        jQuery(function () {
        
            $('.item_acessoRapido').click(function () {
                var id = $(this).attr('id');
                $.ajax({
                    url: "/AVA/Barras/AcessoRapido/GravaContAcesso/?idAcessoRapido=" + id
                }).css('cursor', 'pointer');
            });
        });
        /*

       /* jQuery(function () {

            $("#strpc_topo").focus(function () {
                if ($(this).val() == "Pesquisar") {
                    $(this).val("");
                }
            });
            $("#strpc_topo").blur(function () {
                if ($(this).val() == "") {
                    $(this).val("Pesquisar");
                }
            });
            $(".fim_resultados a").live('click', function () {
                
                $("#ava_wrap").load("/AVA/AcessoRapido/AcessoRapido/PesquisaBarraAcessoRapido");
                
                    
            });
            $("#strpc_topo").keyup(function (event) {
                if ($(this).val().length > 0) {
                    $.ajax({
                        url: "/AVA/Barras/AcessoRapido/PesquisaAcessoRapido/" + $(this).val(),
                        success: function (data) {
                            $(".ava_resultados").empty().show().html(data);
                            $(".fim_resultados a").attr("href", $("#strpc_topo").val());
                        },
                        error: function (data) {
                            alert("Erro: " + data);
                        }

                    });
                } else {
                    $(".ava_resultados").empty().hide();
                }

            });
        });*/
    </script>
</asp:Content>



<asp:Content ContentPlaceHolderID="itensAcesoRapido" ID="ContentArea" runat="server">

    

    <!--<div id="dropdown_header" class="clearfix">
        <a href="#" class="bt_normal"  title="veja tudo" alt="veja mais" id="ava_bt_vejatudo">mapa do site</a>
                    
        <form target="_top" method="post" action="" name="fBusca">  
            <input type="text" class="campo ph" value="" id="strpc_acessorapido" name="strpc_acessorapido" placeholder="PESQUISAR" autocomplete="off">            
        </form>
                <div class="ava_resultados" style="display: none;">
                    
                </div>                    
            </div>-->
             
                <div class="cenario_menu">&#9660; MENU</div>
                <div class="spacer_ninja"></div>
                <!--<div style=" float: left; height: 10px;position: absolute;  left: 50px;  top: -29px;  font-size: 11px;  background: transparent;  padding: 9px 10px;"></div>-->
                <div id="dropdown_filtrado" class="ava_container_masonry masonry">
                <%
                
                foreach (var item in Model.menus)
                {

                    if (item.intPosicao == 1)
                    {
                        string catAtual = "";
                        string catAntiga = "";
                        bool abriu = false;
                        foreach (var menus in item.itensCategoria)
	                    {
                            catAtual = menus.StrCategoria;
                            
                            if (catAtual != catAntiga)
                            {
                                if (abriu)
                                {
                                    %>
                                    </ul>
                                    <%                                    
                                }
                                %>
                                <ul class="ava_box_masonry dd-box">
                                <li><%= menus.StrCategoria%></li><%
                                abriu = true;
                            }
                            
                                %>
                                <li><a href="<%= menus.StrLink %>"><%= menus.StrTitulo %></a></li>
                                <%
                            
                            catAntiga = catAtual;
                            
                        }

                    }
                }
                %>
                </ul>
                </div>                    
                <div id="dropdown_dinamico" class="">
                <a href="#" class="bt_normal " title="mapa do site" alt="mapa do site" id="ava_bt_vejatudo">MAPA DO SITE</a>
                <form target="_top" method="post" action="" name="fBusca">  
                    <input type="text" class="campo ph" value="" id="strpc_acessorapido" name="strpc_acessorapido" placeholder="PESQUISAR" autocomplete="off">            
                </form>
                <div class="ava_resultados" style="display: none;">
                </div>
                <%
                foreach (var item in Model.menus)
                {
                    
                    if (item.intPosicao == 2)
                    {
                       %>
                       <ul class="dd_emalta"><li>em alta</li>
                       <%
                        foreach (var menus in item.itensCategoria)
	                    {                                                                                                                                                 
                            %>
                            <li><a href="<%= menus.StrLink %>"><%= menus.StrTitulo %></a></li>
                            <%                          
                            
                        }
                        %>
                        </ul>
                        <%
                    }
                }
                %>
                </div>
                       

                  
</asp:Content>

 