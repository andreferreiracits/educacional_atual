<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaUsuario>" %>

<%
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
bool bolCurtiu = false;
if (Model.intCurtidas > 0)
    bolCurtiu = ((List<Mural.Models.MensagemRapidaCurtiu>)Model.curticoes).Exists(m => m.idUsuario == idUsuarioLogado);

%>
<a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5&id=<%=Model.IdMensagemrapida%>" class="feedCurtirIcone blokletters b_tooltip vertodoscurtirammensagem" idMensagem="<%=Model.IdMensagemrapida%>">
    <%    
    Mural.Models.MensagemRapidaCurtiu mrg = null;        
    if (Model.intCurtidas > 0)
    {
        int qtdCurtidasInicial = 0;
        List<Mural.Models.MensagemRapidaCurtiu> mrc = (List<Mural.Models.MensagemRapidaCurtiu>)Model.curticoes;
        if (mrc.Exists(m => m.idUsuario == idUsuarioLogado))
        {
            mrg = mrc.Find(m => m.idUsuario == idUsuarioLogado);
            Model.curticoes.Remove(mrg);
            Model.intCurtidas--;
        }
        
        if (Model.curticoes.Count > 1)
        {
            qtdCurtidasInicial = 2;
        }
        else
        {
            qtdCurtidasInicial = Model.curticoes.Count;
        }

        List<Mural.Models.MensagemRapidaCurtiu> gAux = null;
        if (qtdCurtidasInicial > 0)
        {
            gAux = new List<Mural.Models.MensagemRapidaCurtiu>();
        }

        for (int i = 0; i < qtdCurtidasInicial; i++)
        {
            string strNome = Model.curticoes[i].strNome;
            %>
            <img src="<%=Model.curticoes[i].strMiniFoto%>" height="25" width="25">
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
            Response.Write("+" + (Model.intCurtidas - 2));
        }
    }
    %>
</a>
<%
    if (Model.curticoes.Count > 0)
    {   
    %>
    <div class="tip_acoes quem_curtiu" id="tooltipCurtir_<%=Model.IdMensagemrapida%>">
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
        <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5&id=<%=Model.IdMensagemrapida%>" class="vertodoscurtirammensagem ver_todos_tool" idMensagem="<%=Model.IdMensagemrapida%>">Ver todos</a>  
        <span class="seta_p"></span>
    </div> 
<%  }
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
    
    
   