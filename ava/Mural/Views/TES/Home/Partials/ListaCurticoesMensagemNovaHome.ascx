<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaUsuario>" %>

<%
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
bool bolCurtiu = false;
if (Model.intCurtidas > 0)
    bolCurtiu = ((List<Mural.Models.MensagemRapidaCurtiu>)Model.curticoes).Exists(m => m.idUsuario == idUsuarioLogado);

Mural.Models.MensagemRapidaCurtiu mrg = null;
List<Mural.Models.MensagemRapidaCurtiu> mrc = (List<Mural.Models.MensagemRapidaCurtiu>)Model.curticoes;
if (mrc.Exists(m => m.idUsuario == idUsuarioLogado))
{
    mrg = mrc.Find(m => m.idUsuario == idUsuarioLogado);
    Model.curticoes.Remove(mrg);
    Model.intCurtidas--;
}

int qtdCurtidas = Model.curticoes.Count;
if (qtdCurtidas > 0)
{
    List<Mural.Models.MensagemRapidaCurtiu> gAux = new List<Mural.Models.MensagemRapidaCurtiu>();
    for (int i = 0; i < qtdCurtidas && i < 2; i++)
    {
        %>
            <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5&id=<%=Model.IdMensagemrapida%>" onclick="mostraCurtidoresPostagem(this); return false;" idMensagem="<%=Model.IdMensagemrapida%>">
                <img src="<%=Model.curticoes[i].strMiniFoto%>">
            </a>
        <%
        gAux.Add(Model.curticoes[i]);
    }

    if (gAux != null && gAux.Count > 0)
    {
        foreach (Mural.Models.MensagemRapidaCurtiu mgc in gAux)
        {
            Model.curticoes.Remove(mgc);
        }
    }

    if ((Model.intCurtidas - 2) > 0)
    {
        %><a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5&id=<%=Model.IdMensagemrapida%>" onclick="mostraCurtidoresPostagem(this); return false;" idMensagem="<%=Model.IdMensagemrapida%>"> <%
            Response.Write("+" + (Model.intCurtidas - 2));
        %></a><%
    }

    if (Model.curticoes.Count > 0)
    {   
    %>
        <div class="tooltip curtidas" id="tooltipCurtir_<%=Model.IdMensagemrapida%>">
        <%
        int contCurticao = 1;
        foreach (var curticao in Model.curticoes)
        {
            string strNome = curticao.strNome;

            if (curticao.idPagina > 0)
            {
            %>
                <a href="/AVA/Pagina/<%=curticao.strLogin%>"><%=strNome%></a>
            <%}else{ %>
                <a href="/AVA/Perfil/Home/Index/<%=curticao.strLogin%>"><%=strNome%></a>
            <%
            }
            
            if (contCurticao.Equals(10))
            {
                break;
            }
            contCurticao += 1;
        }
        %>
        <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5&id=<%=Model.IdMensagemrapida%>" onclick="mostraCurtidoresPostagem(this); return false;" class="vertodoscurtirammensagem ver_todos_tool" idMensagem="<%=Model.IdMensagemrapida%>">Ver todos</a>  
        <span class="seta_p"></span>
        </div> 
    <%  
    }
}
if (bolCurtiu)
{ 
%>
    <a class="botao_curtir active" idMensagemRapida="<%:Model.IdMensagemrapida%>" href="javascript:void(0);">
		<span></span>
	</a>
<%
}
else 
{ 
%>
    <a class="botao_curtir" idMensagemRapida="<%:Model.IdMensagemrapida%>" href="javascript:void(0);">
		<span></span>
	</a>
<%
}   
%>