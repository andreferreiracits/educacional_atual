<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<UsuarioAVA.Models.Turma>>" %>

<%
    bool bolAdm = ViewData["admRede"].ToString() == "True" ? true : false;
    bool bolCoordenador = Convert.ToBoolean(ViewData["bolcoordenador"]);
    int totalReg = Convert.ToInt32(ViewData["tot_reg"]);

    var strClassDiv = "bloco_conteudo professor";
    if (totalReg > 4) {
        strClassDiv += " maisturmas";
    }
%>
<header>    
	<h4><%:ViewData["texto"]%>
    <% if (totalReg > 1) { %>
        <span><%=totalReg%></span>
    <% } %>
    </h4>    
</header>

<div class="<%=strClassDiv %>">
    <%
        if (Model.Count == 0)
        {
            %>
            <div class="feedback">
				<p>Voc&ecirc; n&otilde;o t&ecirc;m turmas associadas. Entre em contato com a secretaria da sua escola.</p>
			</div>
            <%
        }        
        else
        {
            %>
            <ul>
            <%
                int take = totalReg > 4 ? 3 : 4;
                foreach (var turma in Model.Take(take))
                {
                    string imgStyle = (turma.strFoto.Length > 0) ? turma.strFoto : "/AVA/StaticContent/Common/img/geral/icone_grupo_turma.png" ;
                    %>
                    <li>
                        <a href="<%=turma.UrlGrupo %>">
    	                    <div class="img_perfil" style="background-image: url(<%=imgStyle%>);"></div>
    	                    <h5 class="nome_turma"><%=turma.strNome%></h5>
                        </a>
                    </li>                    
                    <%
                }
            %>
            </ul>
            <%
            if (totalReg > 4)
            {    
                 %>
                <nav class="nav_footer">
    				<a class="opcao_vertodos vertodosEscola" href="http://dev.educacional.net/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7">Veja todas</a>
    			</nav>
                <%
            }
        }         
    %>
</div>