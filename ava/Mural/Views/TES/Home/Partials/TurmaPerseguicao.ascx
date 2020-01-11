<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<UsuarioAVA.Models.Turma>>" %>

<header>
    <h1 class="thumbs_lists">
        <a>
            <%:ViewData["texto"] %>
            <span><%:ViewData["tot_reg"] %></span>
        </a>
       
        <a class="thumbs_lists thumbs" href="javascript: void(0);"></a>
    </h1> 
</header>
 
<ul class="clearfix thumbs" id="<%:ViewData["idUl"] %>">
    <ul>
    <%
        if (Model.Count == 0)
        {
            %>
            <!--<li>-->
                <span class="avisonulo">Nenhuma turma encontrada.</span>
            <!--</li>-->
            <%
        }
        else
        {
            foreach (var turma in Model)
            {
                
                if (turma.strFoto.Length <= 0)
                {
                    %>
                    <li>
                        <a href="javascript: void(0);" class="vertodos<%=ViewData["idUl"]%>">
                            <img width="33" height="33" idTurma="<%=turma.id %>" title="<%=turma.strNome%>" alt="<%=turma.strNome%>" src="<%=Url.CDNLink("/Common/img/perfil/avatar_turma_menor.jpg")%>" border="0" />
                            <span><%=turma.strNome%></span>
                        </a>
                    </li>
                    <%
                }
                else
                {
                    %>
                    <li>
                        <a href="javascript: void(0);" class="vertodos<%=ViewData["idUl"]%>">
                            <img width="33" height="33" alt="<%=turma.strNome%>" src="http://www.educacional.com.br<%=turma.strFoto%>" border="0" />
                            <span><%=turma.strNome%></span>
                        </a>
                    </li>
                    <%
                }

            }

        }
        %>
    </ul>
</ul>