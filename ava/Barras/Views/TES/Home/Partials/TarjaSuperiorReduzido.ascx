<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Usuario>" %>
<% 
    
    var idEscola = Model.idEscola;

    string strLogoEscola = ViewData["strLogoEscola"].ToString();
    int bolAVAPuro = Convert.ToInt32(ViewData["bolAVAPuro"]);
    bool bolPesquisa = Convert.ToBoolean(ViewData["bolPesquisa"]);
    //bool bolMural = (bool)ViewData["bolMural"];
    bool bolMural = false;
    bool bolLegado = (bool)ViewData["bolLegado"];
    //bool bolLoadNavegg = (bool)ViewData["bolLoadNavegg"];

    //Inserção do script que integra a plataforma Navegg
    /*if (bolLoadNavegg)
    {
        Response.Write("<script id=\"navegg\" type=\"text/javascript\" src=\"//tag.navdmp.com/tm42852.js\"></script>");      
    }*/

    if (bolMural)
    {
%>
<hgroup>
    <h1><a href="/AVA/Mural" title="In&iacute;cio"><img class="tooltip_title" alt="Logo" src="<%=strLogoEscola%>" /></a></h1>
    <% if (bolAVAPuro == 0 && bolPesquisa)
       { %> 
    <div class="pesquisa_escolar topo_completo">
        <header>
            <form name="fBusca" id="fBusca" accept-charset="UTF-8" action="/AVA/pesquisa/pesquisa.asp" method="post" onsubmit="return validaPesqEscolar(this)" target="_top">  
                <input type="text" id="strpc_topo" name="strpc_topo" placeholder="Pesquise por conteúdos ou @códigos" class="campo ph" autocomplete="off" />
                <a class="fontello lupa_pesquisa"></a>
                <div id='boxSecoes' class='campo_drop' style='display:none' ></div>
            </form>
        </header>
    </div>
    <% }
       else
       { %> <div class="pesquisa_escolar topo_completo"></div> <% } %>    
</hgroup>
<%     }
    //else if (bolLegado) { Response.Write("<hgroup></hgroup>"); }
    else
    {
        Response.Write("0"); 
    } %>