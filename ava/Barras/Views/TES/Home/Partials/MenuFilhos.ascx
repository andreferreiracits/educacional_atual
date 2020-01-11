<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<UsuarioAVA.Models.Usuario>>" %>
<% 
    string paiFilhosTurma = ViewData["paiFilhosTurma"].ToString();
    bool bolCPPuro = (bool)Session["bolCPPuro"];

    string[] vetTodos = null;
    string[] vetTodosSep = null;
    string strURL = ViewData["URL"].ToString();
    
    foreach (var users in Model)
    {
        string link = strURL +"/AVA/Perfil/Home/Index/" + users.strLogin;

        string strNomeAparecer = users.strApelido;
        if (users.strApelido.Length <= 0)
        {
            strNomeAparecer = users.strNome;
        }
                
%>

        <li>
	        <div class="filho_item">
                <% if (users.strMiniFoto.Length != null)
                   { %>
                    <img width="30" height="30" title="<%=strNomeAparecer%>" alt="<%=strNomeAparecer%>" src="<%=users.strMiniFoto%>" border="0" />
                <%} else { %>
		            <img src="/AVA/StaticContent/Common/img/geral/avatar.jpg">
                <%}  %>
		        <h5><%=strNomeAparecer%></h5>
		        <a href="<%=link%>">Perfil</a> 
                
                <%
                if (paiFilhosTurma.IndexOf(":") > -1)
                {
                    vetTodos = paiFilhosTurma.Split(':');
                    foreach (var valor in vetTodos)
                    {
                        vetTodosSep = valor.Split(',');
                        if (users.id == Convert.ToInt32(vetTodosSep[0]))
                        {
                            %>  |  <%
                        }
                    }
                }
                else
                {
                    if (paiFilhosTurma.IndexOf(",") > -1)
                    {
                        vetTodosSep = paiFilhosTurma.Split(',');
                        if (users.id == Convert.ToInt32(vetTodosSep[0]))
                        {
                            %>  |  <%
                        }
                    }
                    /*else
                    {
                        if (paiFilhosTurma.Length > 0)
                        {
                           %><!--   | --> <%
                        }
                    }*/
                }
                %>
                              
                <%     
                if (paiFilhosTurma.IndexOf(":") > -1)
                {
                    vetTodos = paiFilhosTurma.Split(':');
                    foreach (var valor in vetTodos)
                    {
                        vetTodosSep = valor.Split(',');
                        if (users.id == Convert.ToInt32(vetTodosSep[0]))
                        {
                        %>
                            <a idTurma="<%=vetTodosSep[1]%>" href="<%=strURL%><%=vetTodosSep[2]%>">Turma</a><% if (!bolCPPuro) { %> |<% } %>
                        <%
                        }
                    }

                }
                else
                {
                    if (paiFilhosTurma.IndexOf(",") > -1)
                    {
                        vetTodosSep = paiFilhosTurma.Split(',');
                    %>
                        <a idTurma="<%=vetTodosSep[1]%>" href="<%=strURL%><%=vetTodosSep[2]%>">Turma</a><% if (!bolCPPuro) { %> |<% } %>
                    <%
                    }
                }
                %>
		        
                <%
                if (!bolCPPuro)
                {
                    if (paiFilhosTurma.Length > 0)
                    {
                        if (paiFilhosTurma.IndexOf(":") > -1)
                        {
                            vetTodos = paiFilhosTurma.Split(':');
                            foreach (var valor in vetTodos)
                            {
                                vetTodosSep = valor.Split(',');
                                if (users.id == Convert.ToInt32(vetTodosSep[0]))
                                {
                                %>
                                    <a id="A1" href="<%=strURL%>/AVA/Caminhos/Home/CaminhosAluno?strLogin=<%:users.strLogin%>">Atividades</a>
                                <%
                                }
                            }
                        }
                        else
                        {
                            if (paiFilhosTurma.IndexOf(",") > -1)
                            {
                                vetTodosSep = paiFilhosTurma.Split(',');
                            %>
                                <a id="linkListaAtividades" href="<%=strURL%>/AVA/Caminhos/Home/CaminhosAluno?strLogin=<%:users.strLogin%>">Atividades</a>
                            <%
                            }
                        }
                    }
                } 
                %>
	        </div>
        </li>
   <%
    }%>


<!--
<li>
	<div class="filho_item">
		<img src="/AVA/StaticContent/Common/img/geral/avatar.jpg">
		<h5>Nome do filho do usuário</h5>
		<a href="">Perfil</a> |
		<a href="">Turma</a> |
		<a href="">Atividades</a>
	</div>
</li>
-->