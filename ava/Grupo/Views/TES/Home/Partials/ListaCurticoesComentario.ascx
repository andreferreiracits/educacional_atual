<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.MensagemRapidaGrupoComentario>" %>

<%
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
int totalCurtidas = Model.intCurtidas;

foreach (var curtiu in Model.curticoes)
{
    if (idUsuarioLogado == curtiu.idUsuario)
    {
        totalCurtidas = totalCurtidas - 1;
    }
}

if (totalCurtidas > 0)
{   
    %>
    <a class="tooltipGostaram b_tooltip" href="javascript:void(0);"><strong>+<%=totalCurtidas%></strong></a>
    <div class="black_tip_center tooltip tooltipCurtir" style="display: none">
        <a class="" href="javascript:void(0);"></a>
        <%
        int contCurticoes = 1;
        foreach (var curtiu in Model.curticoes)
        {
            if (idUsuarioLogado != curtiu.idUsuario)
            {
                %>
                <a href="/AVA/Perfil/Home/Index/<%=curtiu.strLogin%>"><%=curtiu.strNome%></a>
                <%
                
                if (contCurticoes == 10)
                {
                    break;
                }
                contCurticoes += 1;
            }
        }
    
        if (Model.intCurtidas > contCurticoes)
        {
            %>
            <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6" class="vertodoscurtiramcomentario ver_todos_tool" id="<%=Model.idComentario%>">Ver todos</a>    
            <%         
        }
        %>
    </div>
<% 
}
%>
