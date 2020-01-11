<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.MensagemRapidaGrupo>" %>

<%
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
Grupo.Models.MensagemRapidaGrupoCurtiu mrg = null;
%>
<a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5" class="feedCurtirIcone blokletters vertodoscurtirammensagem <%=Model.intCurtidas > 2 ? "b_tooltip_left" : "" %>" idmensagem="<%=Model.idMensagemRapida%>">
<%
if (Model.intCurtidas > 0)
{    

    int qtdCurtidasInicial = 0;
    List<Grupo.Models.MensagemRapidaGrupoCurtiu> mrc = (List<Grupo.Models.MensagemRapidaGrupoCurtiu>)Model.curticoes;
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
    
    List<Grupo.Models.MensagemRapidaGrupoCurtiu> gAux = null;
    if (qtdCurtidasInicial > 0)
    {
        gAux = new List<Grupo.Models.MensagemRapidaGrupoCurtiu>();
    }
    
    for (int i = 0; i < qtdCurtidasInicial; i++)
    {
        string strNome = Model.curticoes[i].strNome;       
        %>
        <img src="<%=Model.curticoes[i].strMiniFoto%>" height="25" width="25">
        <%
        gAux.Add(Model.curticoes[i]);
    }
    if ( gAux != null && gAux.Count > 0)
    {

        foreach (Grupo.Models.MensagemRapidaGrupoCurtiu mgc in gAux)
        {
            Model.curticoes.Remove(mgc);
        }
    }
                          
    if ((Model.intCurtidas -2) > 0)
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
    <div class="black_tip_left tooltip" id="tooltipCurtir_<%=Model.idMensagemRapida%>" style="display: none">
        <%
        int contCurticao = 1;

        foreach (var curticao in Model.curticoes)
        {            
            string strNome = curticao.strNome;
           
            %>
            <a href="/AVA/Perfil/Home/Index/<%=curticao.strLogin%>"><%=strNome%></a>
            <% 
            
            if (contCurticao.Equals(10))
            {
                break;
            }
            contCurticao += 1;                
        }
           
        %>
        <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5" class="vertodoscurtirammensagem ver_todos_tool" id="<%=Model.idMensagemRapida%>" idmensagem="<%=Model.idMensagemRapida%>">Ver todos</a>    
        <%              
       
    %>				                    
    </div> 
<%
}
%>