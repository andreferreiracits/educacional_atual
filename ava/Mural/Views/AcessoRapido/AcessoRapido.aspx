<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/AcessoRapido.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Mural.Models.AcessoRapidoList>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   
    
    <script type="text/javascript" defer="defer" >
        jQuery(function () {
            $('.item_acessoRapido').click(function () {
                var id = $(this).attr('id');                
                $.ajax({
                    url: "/AVA/Mural/AcessoRapido/GravaContAcesso/?idAcessoRapido=" + id            
                }).css('cursor','pointer');
            });
        });
    </script>
</asp:Content>



<asp:Content ContentPlaceHolderID="itensAcesoRapido" ID="ContentArea" runat="server">
    <div id="dropdown_header" class="clearfix">
        <a href="#" class="bt_normal"  title="veja tudo" alt="veja mais">veja tudo</a>
                    
        <form target="_top" onsubmit="return pesquisa_valida(this)" method="post" action="http://www.educacional.com.br/pesquisa/respostapalavra.asp?pg=1&amp;tp=nova" name="fBusca">  
            <input type="text" onblur="blurPesquisa()" onfocus="focoPesquisa()" class="campo" value="Pesquisar" id="strpc_topo" name="strpc_topo">
            <div class="bt_geral"><input type="submit" class="okP" value="Buscar" id="go_button" name="go_button"></div>           
               
                
                    <input type="hidden" value="1" name="IdAssunto">
                    <input type="hidden" value="" name="IdPapel">
                    <input type="hidden" value="" name="IdSerie">
                    <input type="hidden" value="1" name="intRadTipo">
                    <input type="hidden" value="30" name="sintTop">
                    <input type="hidden" value="x" name="bEncEnciclopedia">
                    <input type="hidden" value="x" name="bArtigo">
                    <input type="hidden" value="x" name="bEntrevista">
                    <input type="hidden" value="x" name="bReportagem">
                    <input type="hidden" value="x" name="bForum">
                    <input type="hidden" value="x" name="bClassico">
                    <input type="hidden" value="x" name="bClassicoAutor">
                    <input type="hidden" value="x" name="bClassicoGeral">
                    <input type="hidden" value="x" name="bEducacionalRecomenda">
                    <input type="hidden" value="x" name="bAtlas">
                    <input type="hidden" value="x" name="bConteudoMultimidia">		
                    <input type="hidden" value="x" name="bBancoImagem">
                    <input type="hidden" value="x" name="bEncBancoImagens">
                    <input type="hidden" value="x" name="bEncaminhamento">
                    <input type="hidden" value="x" name="bEncVerbos">
                    <input type="hidden" value="x" name="bEncMunicipios">
                    <input type="hidden" value="x" name="bEncBancoVoz">
                    <input type="hidden" value="x" name="bLegislacao">
                    <input type="hidden" value="x" name="bSaibaMais">
                    <input type="hidden" value="x" name="bSite">
                    <input type="hidden" value="x" name="bSiteGeral">
                    <input type="hidden" value="x" name="bPEServicos">
                    <input type="hidden" value="x" name="bEnciclopedia">
                    <input type="hidden" value="x" name="bMundoDaCrianca">
                    <input type="hidden" value="x" name="bLinhaDoTempo">
                    <input type="hidden" value="x" name="bDicAurelio">
                    <input type="hidden" value="x" name="bMuseuVirtual">
                    <input type="hidden" value="x" name="bLinguaEstrangeira">
                    <input type="hidden" value="x" name="bBlog">
                    <input type="hidden" value="x" name="bInterpretando">

           		</form>                    
            </div>
             
            <div id="dropdown_filtrado" class="clearfix">                    
            <%
                if (Model.menus.Count > 0)
                {
                    foreach (var menu in Model.menus)
                    {

                        foreach (var categoria in menu.categorias)
                        {
                            if (categoria.idCategoria == 6)
                            {
                                
                            %>
                                </div>
                                <div id="dropdown_dinamico" class="clearfix">
                            <%
                            }
                            %>

                
                             <ul>
                                <lh><%=categoria.strCategoria%></lh>
                                    <%
                                    foreach (var item in categoria.itensCategoria)
                                    {                
                                    %>
                                        <li class="item_acessoRapido" id="<%=item.IdAcessoRapido %>"><%=item.StrTitulo%></li>
                                    <%   
                                    }%>
                            </ul>                      
                        <%
                            
                        }
                    }
                }
                        %>           

            </div>
                   
    <div>       
</asp:Content>

 