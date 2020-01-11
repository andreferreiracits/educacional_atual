<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<UsuarioAVA.Models.Usuario>>" %>

<header>
    <h1 class="thumbs_lists">
        <%
            if (ViewData["idUl"] == "filhos")
            {
            %>      
                <a><%:ViewData["texto"] %></a>
            <%
            }
            else
            {
            %>
                <a href="javascript: void(0);" id="vertodos<%=ViewData["idUl"]%>" class="vertodos<%=ViewData["idUl"]%>">          
                    <%:ViewData["texto"] %>
                    <span><%:ViewData["tot_reg"] %></span>
                </a>
            <%
            }    
        %>  
       
        <a class="thumbs_lists thumbs" href="javascript: void(0);"></a>
    </h1> 
</header>
 
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
                    %>
                    <li>
                        <a href="<%=link%>">
                            <img width="33" height="33" title="<%=users.strNome%>" alt="<%=users.strApelido%>" src="<%=users.strFoto%>" border="0" />
                            <span><%=users.strApelido%></span>
                        </a>
                    </li>
                    <%
                      
   
            }
        }
        %>
    </ul>
</ul>
