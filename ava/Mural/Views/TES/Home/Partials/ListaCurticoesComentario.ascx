<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaComentario>" %>

<%
    /* Curtidas */
    int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
    var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
    int totalCurtidas = Model.intCurtidas;

    foreach (var curtiu in Model.curticoes)
    {
        int idPagina = curtiu.idPagina;
        
        if (idUsuarioLogado == curtiu.idUsuario && idPagina == 0)
        {
            totalCurtidas = totalCurtidas - 1;
        }
    }
    
    
    // Monta lista com todos que curtiram o comentário
    if (totalCurtidas > 0)
    {   
        %>

        <a class="tip_comentario" href="javascript:void(0);">
		    <strong>+<%=totalCurtidas %></strong>
	    </a>

        <div class="tip_acoes quem_curtiu">
            <%
            int contCurticoes = 0;
            foreach (var curtiu in Model.curticoes)
            {
                int idPagina = curtiu.idPagina;
                
                if (idUsuarioLogado != curtiu.idUsuario || (idUsuarioLogado == curtiu.idUsuario && idPagina > 0))                
                {
                    if (idPagina > 0)
                    {
                    %>
                        <a href="/AVA/Pagina/<%=curtiu.strLogin%>"><%=curtiu.strNome%></a>
                    <%
                    }
                    else
                    {
                    %>
                        <a href="/AVA/Perfil/Home/Index/<%=curtiu.strLogin%>"><%=curtiu.strNome%></a>
                    <%
                    }
                    contCurticoes += 1;
                    if (contCurticoes == 10)
                    {
                        break;
                    }
                }
            }

            if (Model.intCurtidas > contCurticoes)
            {
                
                %>
                <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6&id=<%=Model.IdComentario%>" class="vertodoscurtiramcomentario ver_todos_tool" id="<%=Model.IdComentario%>">Ver todos</a>    
                <%         
            }
            %>
            <span class="seta_p"></span> 
        </div>
    <% 
    }

%>
