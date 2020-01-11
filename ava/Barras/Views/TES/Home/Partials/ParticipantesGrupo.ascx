<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.List<Grupo.Models.ParticipanteGrupo>>" %>

<header>
    <h1 class="thumbs_lists "> 
    
        <% 
        if (ViewData["idUl"].ToString().Equals("mediador"))
        {
            %>
                <%:ViewData["texto"] %>
            <% 
        }
        else
        {
            int totalParticipantes = Convert.ToInt32(ViewData["tot_reg"]);
            string txtParticipante = totalParticipantes.ToString();
            if (totalParticipantes > 99)
	        {
		        txtParticipante = "99+";
	        }
            %>   
            <a href="javascript: void(0);" id="vertodosparticipantesgrupo">          
                <%:ViewData["texto"] %>
                <span><%=txtParticipante%></span>
            </a>
            <a class="thumbs_lists thumbs" href="javascript: void(0);"></a>
            <%
        }
        %>        
    </h1>
    <% 
    if (ViewData["idUl"].ToString().Equals("mediador"))
    {
        %>
        <a href="javascript:void(0);" class="sobre_mediador" id="interroga_mediador">(?)</a>
        <%
    }      
    %> 
</header>

<div class="boxSobre mediador" id="sobre_mediador" style="display: none;">
	<span class="setaBoxSobre"></span>
	<p>Mediadores são os responsáveis pelo grupo. Podem editar dados do grupo, criar assuntos e eventos de agenda, inscrever, convidar, promover e excluir participantes.</p>
</div>

<% 
if (ViewData["idUl"].ToString().Equals("mediador"))
{
    %>
    <ul class="mediadores_grupos">
        <%
        if (Model.Count == 0)
        {
            %>            
                <span class="avisonulo">Nenhum usuário encontrado.</span>           
            <%
        }
        else 
        {     
   
            foreach (var users in Model)
            {
                string link = "/AVA/Perfil/Home/Index/" + users.strLogin;

                string strNomeAparecer = users.strApelido;
                if (users.strApelido.Length <= 0)
                {
                    strNomeAparecer = users.strNome;
                }                
                
                %>
                <li>
			        <a href="<%=link%>"><img src="<%=users.strMiniFoto%>" width="42" height="42"></a>
			        <div class="infoMediador">
				        <a href="<%=link%>"><%=strNomeAparecer%></a>
				        <span class="prof"><%=users.strPapel%></span>
			        </div>	
		        </li>
                <%
            }
        }
        %>				
	</ul>
    <%
}
else
{
    %>
    <ul class="clearfix thumbs" id="<%:ViewData["idUl"] %>">
        <ul>
        <%
            if (Model.Count == 0)
            {
                %>            
                    <span class="avisonulo">Nenhum usuário encontrado.</span>           
                <%
            }
            else 
            {     
   
                foreach (var users in Model)
                {
                    string link = "/AVA/Perfil/Home/Index/" + users.strLogin;

                    string strNomeAparecer = users.strApelido;
                    if (users.strApelido.Length <= 0)
                    {
                        strNomeAparecer = users.strNome;
                    }                
                
                    %>
                    <li>
                        <a href="<%=link%>">
                            <img width="33" height="33" title="<%=strNomeAparecer%>" alt="<%=strNomeAparecer%>" src="<%=users.strMiniFoto%>" border="0" />
                            <span><%=strNomeAparecer%></span>
                        </a>
                    </li>
                    <%
                }
            }
            %>
        </ul>
    </ul>
    <%        
} 
%> 

