<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<UsuarioAVA.Models.Turma>>" %>

<%
    string bolAdm = ViewData["admRede"].ToString();
    string strClass = "";
    bool bolCoordenador = Convert.ToBoolean(ViewData["bolcoordenador"]);
    bool bolVisitanteOuPapelSuperior = Convert.ToBoolean(ViewData["bolEVisitante"]) || Convert.ToBoolean(ViewData["bolPapelSuperior"]);
    int totalReg = Convert.ToInt32(ViewData["tot_reg"]);
    string textoAlunoSemTurma = "Você não tem turmas associadas. Entre em contato com a secretaria da sua escola.";
    string textoEducadorSemTurma = "Nenhuma turma encontrada.";

    //if (bolAdm == "True" || bolCoordenador) {
        strClass = "class='vertodosEscola' href='/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7'";
    //}
%>
<header>    
	<h1 class="thumbs_lists">
        <a idTurma="<%:ViewData["idTurma"] %>" <%=strClass%>>
            <%:ViewData["texto"] %>            
            <span><%=totalReg%></span>
        </a>
        <a class="thumbs_lists thumbs" href="javascript: void(0);"></a>
    </h1>    
     
</header>

<%if (ViewData["texto"] == "Minhas Turmas")
  { //é professor
    var strClassDiv = "bloco_conteudo professor";
      
    if(bolAdm == "True"){
        strClassDiv += " admin";
    }
%>

<%
  }
%>
       <ul class="clearfix thumbs" id="turma">
        <%
            if (Model.Count == 0)
            {
                %>
                <div class="feedback">
					<p><%=(bolVisitanteOuPapelSuperior ? textoEducadorSemTurma : textoAlunoSemTurma)%></p>
				</div>
                <%
            }        
            else
            {
            %>
            <ul>
            <%
                foreach (var turma in Model.Take(24))
                {
                    if (turma.strFoto.Length <= 0)
                    {
                    %>
                    <li>
		                <a href="<%=turma.UrlGrupo %>" class="vertodosturma" title="<%=turma.strNome%>">
			                <img style="width: 33px; height: 33px; border: 0px;" src="/AVA/StaticContent/Common/img/geral/icone_grupo_turma.png" />
			                <span><%=turma.strNome%></span>                          
		                </a>
	                </li>                    
                    <%
                    }
                    else
                    {
                    %>
                    <li>
		                <a href="<%=turma.UrlGrupo %>" class="vertodosturma" title="<%=turma.strNome%>">
			                <img style="width: 33px; height: 33px; border: 0px;" src="<%=turma.strFoto%>" />
			                <span><%=turma.strNome%></span>
		                </a>
	                </li>                     
                    <%
                    }
                } 
             %>
            </ul>
             <%
            }         
        %>       
</ul>

