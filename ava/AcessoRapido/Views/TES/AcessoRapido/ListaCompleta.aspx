<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderDadosMeio" ID="ContentPlaceHolderDadosMeio" runat="server">
    <script>

        var ordemGlobal = "";

        $(document).ready(function () {

            ordernarPor('alfa');
            

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
            var parametroBusca = "<%=ViewData["parametro"] %>";
            if(parametroBusca != ""){
                $("#ava_listacompleta").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                $.ajax({
                    url: "/AVA/AcessoRapido/AcessoRapido/PesquisaAcessoRapido/" + parametroBusca,
                    success: function (data) {
                        $("#ava_listacompleta").empty().html(data);
                        $(".ava_container_masonry").masonry('reload');
                    },
                    error: function () {
                        console.debug("Erro");
                    }

                });
            }
            $("#go_button").live('click', function () {

                $("#ava_listacompleta").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                $.ajax({
                    url: "/AVA/AcessoRapido/AcessoRapido/PesquisaAcessoRapido/" + $("#strpc_acessorapido").val(),
                    success: function (data) {
                        $("#ava_listacompleta").empty().html(data);
                    },
                    error: function () {
                        console.debug("Erro");
                    }

                });

            });
            $(".ava_container_masonry").masonry({
                itemSelector: '.ava_box_masonry',
                isAnimated: !Modernizr.csstransitions
            });

            $("#strpc_acessorapidoAVA").live('keyup', function (event) {
                if ($(this).val().length >= 0) {
                    
                    var strPesquisa = $(this).val();

                    $("#ava_listacompleta").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

 
                    $.ajax({
                        url: "/ava/acessorapido/acessorapido/ListarOrdenado/",
                        data: {
                            ordem: ordemGlobal,
                            pesquisa: strPesquisa
                        },
                        success: function (data) {

                            if (ordemGlobal == "categoria") {
                                $("#ava_listacompleta").empty().html(data);
                                $(".ava_container_masonry").masonry('reload');
                                $(".ava_container_masonry").masonry({
                                    itemSelector: '.ava_box_masonry',
                                    isAnimated: !Modernizr.csstransitions
                                });
                            } else {
                                $("#ava_listacompleta").empty().html(data);
                            }
                        },
                        error: function (data) {
                            console.debug(data);
                        }
                    });

                } else {
                    $(".ava_resultados").empty().hide();
                }
            });
        });

        function ordernarPor(nome) {

            var strPesquisa = "";
            $('#strpc_acessorapidoAVA').val("");

            if (nome == ordemGlobal) {
                return;
            }
            else {

                $("#ava_listacompleta").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

                ordemGlobal = nome;
                $.ajax({
                    url: "/ava/acessorapido/acessorapido/ListarOrdenado/",
                    data: {
                        ordem: ordemGlobal,
                        pesquisa: strPesquisa
                    },
                    success: function (data) {

                        if (ordemGlobal == "categoria") {
                            $(".ava_container_masonry").masonry('destroy');
                            $("#ava_listacompleta").empty().html(data);
                            $(".ava_container_masonry").masonry({
                                itemSelector: '.ava_box_masonry',
                                isAnimated: !Modernizr.csstransitions
                            });
                        } else {
                            $(".ava_container_masonry").masonry('destroy');
                            $("#ava_listacompleta").empty().html(data);
                        }
                    },
                    error: function (data) {
                        console.debug(data);
                    }
                });
            }
        }
    </script>
    <form target="_top" method="post" action="" name="fBusca">  
        <input type="text" class="campo" value="" placeHolder="BUSCA RÁPIDA POR SEÇÕES" id="strpc_acessorapidoAVA" name="strpc_acessorapido" autocomplete="off">        
    </form>
    <div style="letter-spacing: 0; height: 35px; vertical-align: middle; padding-top: 15px; font-weight: bold;">Ordenar por: <a href="javascript:void(0);" onclick="ordernarPor('alfa');">Seções de A a Z</a> | <a href="javascript:void(0);" onclick="ordernarPor('categoria');">Categoria</a></div>
    <div id="ava_listacompleta" class="ava_container_masonry" style="width:100%;">
    <%
    string catAtual = "";
    string catAntiga = "";
    bool abriu = false;
    foreach (var menus in Model)
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
            <ul class="ava_box_masonry">
            <li><%= menus.StrCategoria%></li><%
            abriu = true;
        }
        if (menus.StrLink.IndexOf("http://blog") != -1)
        {
            %>
            <li><a href="<%= menus.StrLink %>" target="_blank"><%= menus.StrTitulo %></a></li>
            <%
        }
        else
        {
            %>
            <li><a href="<%= menus.StrLink %>"><%= menus.StrTitulo %></a></li>
            <%
        }
                            
            
                            
        catAntiga = catAtual;
                            
    }

     %>
     </ul>
 
    </div>
</asp:Content>