<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RecursoItem>>" %>

<div class="ava_container_masonry">
    <%
        foreach (var recursoItem in Model)
        {            
            %>
            <div class="ava_box_masonry r-l-desc" id="rItem_<%=recursoItem.id %>">
                <a href="javascript: inserirRecurso(<%=recursoItem.idRecurso%>, <%=recursoItem.idPublicacao%>)">
                    <img src="<%=recursoItem.strThumbItem%>" width="55" height="55" alt="nome do recurso">
                               
                    <span>
                        <h5><%=recursoItem.strTitulo%></h5>
                        <%=recursoItem.strDescricao%>
                    </span>
                </a>
            </div>            
            <%
        }    
    %>             
</div>
        
