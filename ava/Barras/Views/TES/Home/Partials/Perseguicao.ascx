<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<UsuarioAVA.Models.Usuario>>" %>
<% 
bool bolUsuarioSemTurma = Convert.ToBoolean(Session["bolUsuarioSemTurma"]);
int tot_reg = ViewData["tot_reg"] != null ? (int)ViewData["tot_reg"] : 0;

bool eResponsavel = ViewData["bolResponsavel"] == null ? false : (bool)ViewData["bolResponsavel"];


string strTot_Reg = ViewData["tot_reg"] == null ? "" : (tot_reg > 99 ? "+99" : tot_reg.ToString());
%>
<header>
    
    
    <h1 class="thumbs_lists">



    <%
        if (ViewData["idUl"] == "filhos")
        {
        %>      
            <a><%:ViewData["texto"] %></a>
            <% 
            if (!bolUsuarioSemTurma)
            {
                %>
                <a class="thumbs_lists lists" href="javascript: void(0);"></a>
                <%    
            }
        }
        else
        {
            if (!bolUsuarioSemTurma)
            {
                if (ViewData["UrlGrupo"] != null)
                {
                    %>
                    <a idTurma="<%:ViewData["idTurma"]%>" href="<%=ViewData["UrlGrupo"] %>" class="vertodos<%=ViewData["idUl"]%> fancybox.ajax">
                    <%
                }
                else 
                { 
                    %>
                    <a idTurma="<%:ViewData["idTurma"]%>" href="javascript: void(0);" id="vertodos<%=ViewData["idUl"]%>" class="vertodos<%=ViewData["idUl"]%> fancybox.ajax">
                    <%
                }
                
                %>                          
                    <%:ViewData["texto"] %>                    
                    <span><%=strTot_Reg%></span>
                </a> 
                <a class="thumbs_lists thumbs" href="javascript: void(0);"></a>
                <%
            }   
            else
            {
                Response.Write(ViewData["texto"]);
            }
        }    
    %> 
    <%--<a class="thumbs_lists thumbs" href="javascript: void(0);"></a>--%>
    </h1> 
</header>

<ul class="clearfix <%=(ViewData["idUl"] == "filhos") ? "lists" : "thumbs" %>" id="<%:ViewData["idUl"] %>">
    <ul>
    <%
        if (Model.Count == 0)
        {
            if (ViewData["idUl"].Equals("educadores"))
            {
                if (Convert.ToBoolean(ViewData["bolEVisitante"]) || Convert.ToBoolean(ViewData["bolPapelSuperior"]) )
                { 
                    %>            
                    <span class="avisonulo">Nenhum usuário encontrado.</span>           
                    <%    
                }
                else
                {
                    %>            
                    <span class="avisonulo">Em breve, você poderá ver aqui os seus professores!</span>           
                    <%
                }
            }
            else if (ViewData["idUl"].Equals("turma"))
            {
                if (Convert.ToBoolean(ViewData["bolEVisitante"]) || Convert.ToBoolean(ViewData["bolPapelSuperior"]) )
                { 
                    %>            
                    <span class="avisonulo">Nenhuma turma encontrada.</span>           
                    <%    
                }
                else
                { 
                    %>            
                    <span class="avisonulo">Aqui, você verá seus colegas de turma!</span>           
                    <%
                }
                %>            
                <%    
            }
            
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
                    <%=(ViewData["idUl"] == "filhos") ? "<div class=\"white_shadow\"></div>" : ""%>
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
