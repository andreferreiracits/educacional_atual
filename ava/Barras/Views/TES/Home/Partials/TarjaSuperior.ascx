<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Usuario>" %>
<% 
    string strLogo = "";
    var idEscola = Model.idEscola;
    
    if (idEscola > 0 )
    {
        strLogo = "/esc_include/AVA/" + idEscola + "/logo.png";       
    }
    else
    {
        strLogo = "/AVA/StaticContent/Content/TES/cssimg/logo_colegioPositivo.png";   
    }
    
    int bolAVAPuro = Convert.ToInt32(ViewData["bolAVAPuro"]);
    bool bolPesquisa = Convert.ToBoolean(ViewData["bolPesquisa"]);
%>
<hgroup>
    <h1><a href="/ava/mural"><img src="<%=strLogo %>" border="0"></a></h1>
    <div class="versao "> <span class=""></span></div>   
   
    <% 
    if (bolAVAPuro == 0 && bolPesquisa)
    { 
        %>
        <div class="pesquisa_escolar">
            <header>
            <form target="_top" method="post" action="/AVA/pesquisa/pesquisa.asp" name="fBusca" id="fBusca" accept-charset="UTF-8" onsubmit="return validaPesqEscolar()">
               	<input type="text" class="campo ph" placeholder="Pesquise por conteúdos ou @código." id="strpc_topo" name="strpc_topo" autocomplete="off">
                <div class="bt_geral"><input type="submit" class="okP" value="Buscar" id="Submit1" name="go_button"></div>
                <div id='boxSecoes' class='campo_drop' style='display:none' ></div>             
                <!--p><a href="/pesquisa/">+ opções</a></p-->
            </form>
            </header>
        </div>
        <%
    } 
    %>
</hgroup>