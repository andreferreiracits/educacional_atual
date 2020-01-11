﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.MensagemRapidaCurtiu>>" %>
<% 
    int IdMensagemRapida = (int)ViewData["IdMensagemRapida"];
    int IntCurtidas = (int)ViewData["IntCurtidas"];
    int idUsuarioLogado = Convert.ToInt32(System.Web.HttpContext.Current.GetIdentity().IdUsuario);
    var BolComunicador = (ViewData["BolComunicador"] == null) ? false : (bool)ViewData["BolComunicador"];
    var BolTutorProjetos = (ViewData["BolTutorProjetos"] == null) ? false : (bool)ViewData["BolTutorProjetos"];
    bool bolCurtiu = (bool)ViewData["bolCurtiu"];
    Pagina.Models.MensagemRapidaCurtiu mrg = null;        
%>
<% if(Model.Count > 0) { %>
<a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5" class="feedCurtirIcone blokletters b_tooltip vertodoscurtirammensagem" idMensagem="<%=IdMensagemRapida%>">
<%
    int qtdCurtidasInicial = 0;

    List<Pagina.Models.MensagemRapidaCurtiu> mrc = (List<Pagina.Models.MensagemRapidaCurtiu>)Model;
    if (mrc.Exists(m => m.idUsuario == idUsuarioLogado))
    {
        if (bolCurtiu)
        {
            mrg = mrc.Find(m => m.idUsuario == idUsuarioLogado);
            Model.Remove(mrg);
            IntCurtidas--;
        }
    }


    if (Model.Count > 1)
    {
        qtdCurtidasInicial = 2;
    }
    else
    {
        qtdCurtidasInicial = Model.Count;
    }

    List<Pagina.Models.MensagemRapidaCurtiu> gAux = null;
    if (qtdCurtidasInicial > 0)
    {
        gAux = new List<Pagina.Models.MensagemRapidaCurtiu>();
    }

    for (int i = 0; i < qtdCurtidasInicial; i++)
    {
        string strNome = Model[i].strNome;       
        %>
        <img src="<%=Model[i].strMiniFoto%>" height="25" width="25" alt="<%=Model[i].strNome%>" />
        <%      
        gAux.Add(Model[i]);
    }

    if (gAux != null && gAux.Count > 0)
    {
        foreach (var mgc in gAux)
        {
            Model.Remove(mgc);
        }
    }

    if ((IntCurtidas - 2) > 0)  
    {
        Response.Write("+" + (IntCurtidas - 2));
    }
    
%>
</a>
<% } if (Model.Count > 0) { %>
    <div class="tip_acoes quem_curtiu" id="tooltipCurtir_<%=IdMensagemRapida%>">
        <%
        int contCurticao = 1;
        foreach (var curticao in Model)
        {
            string strNome = curticao.strNome;            
            if (curticao.idPagina > 0)
            {
            %>
                <a href="/AVA/Pagina/<%=curticao.strLogin%>"><%=strNome%></a>
            <% 
            }
            else
            {
            %>
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
        <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5" class="vertodoscurtirammensagem ver_todos_tool" idMensagem="<%=IdMensagemRapida%>">Ver todos</a>  
        <span class="seta_p"></span>
    </div> 
<% } %>

