<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.MensagemRapida>>" %>
<%
    if (Model != null)
    {
        bool bolPossuiVerMais = ViewData["bolPossuiVerMais"] == null ? false : (bool)ViewData["bolPossuiVerMais"];
        var objPagina = (Pagina.Models.PaginaEducacional)ViewData["objPagina"];
        var bolAvinha = ViewData["bolAvinha"] != null ? true : false;

        if (bolAvinha)
        { 
            %>
                <div class="evento_dia">
                    <div class="engloba_destaque">
            <%
        }
        
        foreach (var d in Model)
            Html.RenderPartial("Partials/BoxMensagemDestaque", d, ViewData);
            
        if (bolAvinha)
        { 
            %>
                    </div>
                    <div class="evento_bottom"></div>
            <%
        }

        //if (bolPossuiVerMais)
        {
            %>
            <footer><a title="Veja todos" class="" href="/AVA/Pagina/<%=objPagina.strLink %>#Destacados">Veja todos</a></footer>
            <%
        }  
        
        if (bolAvinha)
        { 
            %>
                </div>
            <%
        }      
    }
    else
    { 
        %>0<%
    }
%>

