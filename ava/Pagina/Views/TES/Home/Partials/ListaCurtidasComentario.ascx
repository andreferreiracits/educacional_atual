<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.MensagemRapidaComentarioCurtiu>>" %>
<%
    
int intCurtidas = (int)ViewData["intCurtidas"];
int IdMensagemRapida = (int)ViewData["IdMensagemRapida"];
int IdComentario = (int)ViewData["IdComentario"];
bool bolCurtiu = (bool)ViewData["bolCurtiu"];
int idUsuarioLogado = (int)ViewData["idUsuarioLogado"];
bool bolClickUsuario = ViewData["bolClickUsuario"] == null ? false : (bool)ViewData["bolClickUsuario"];

int totalCurtidas = intCurtidas;
if (bolCurtiu && totalCurtidas > 0)
    totalCurtidas--;
    
if (totalCurtidas > 0)
{   
    %>

    <a class="tip_comentario" href="javascript:void(0);">
		<strong>+<%=totalCurtidas %></strong>
	</a>

    <div class="tip_acoes quem_curtiu">          
        <%            
        int contCurticoes = 0;
        foreach (var curtiu in Model)
        {            
            if (idUsuarioLogado != curtiu.idUsuario || (idUsuarioLogado == curtiu.idUsuario && curtiu.idPagina == 0))
            {
                if (curtiu.idPagina > 0)
                {
                %>
                    <a href="/AVA/Pagina/<%=curtiu.strLogin%>"><%=curtiu.strNome%></a>
                <%}
                else
                { %>
                    <a href="/AVA/Perfil/Home/Index/<%=curtiu.strLogin%>"><%=curtiu.strNome%></a>
                <%}      
                contCurticoes += 1;
                if (contCurticoes == 10)
                {
                    break;
                }
            }
        }

    if (totalCurtidas > contCurticoes)
        {                
            %>
            <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6" class="vertodoscurtiramcomentario ver_todos_tool" id="<%=IdComentario%>">Ver todos</a>    
            <%         
        }
        %>
        <span class="seta_p"></span> 
    </div>
<% 
} else if(bolClickUsuario) { %>0<% } %>


