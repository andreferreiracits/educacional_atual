<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<Perfil.Models.MensagemRapidaComentario>" %>

<%
    /* Curtidas */
    int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
    int totalCurtidas = Model.intCurtidas;

    foreach (var curtiu in Model.curticoes)
    {
        if (idUsuarioLogado == curtiu.idUsuario)
        {
            totalCurtidas = totalCurtidas - 1;
        }
    }
    
    
    // Monta lista com todos que curtiram o comentário
    if (totalCurtidas > 0)
    {   
        %>
        <a class="tip_comentario" href="javascript:void(o);">
		    <strong>+<%=totalCurtidas %></strong>
	    </a>

        <div class="tip_acoes quem_curtiu">
            <%
            int contCurticoes = 0;
            foreach (var curtiu in Model.curticoes)
            {
                if (idUsuarioLogado != curtiu.idUsuario)
                {
                    %>
                    <a href="/AVA/Perfil/Home/Index/<%=curtiu.strLogin%>"><%=curtiu.strNome%></a>
                    <%
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
                <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6&id=<%:Model.IdComentario%>" class="vertodoscurtiramcomentario" id="<%=Model.IdComentario%>">Ver todos</a>    
                <%         
            }
            %>
            <span class="seta_p"></span> 
        </div>
    <% 
    }

%>
