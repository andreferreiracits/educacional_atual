<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RecursoItem>>" %>

<div>
    <%
        if (Model.Count > 0)
        {
            string strBarra = "";
            int tamanhoIMG = 55;
            if (Model[0].idCategoria == 16 || Model[0].idCategoria == 26)
            {
                tamanhoIMG = 100;
                strBarra = "/";                               
            }
                           
            foreach (var recursoItem in Model)
            {
                %>
                <div class="ava_box_masonry r-l-desc" id="rItem_<%=recursoItem.id %>">
                    <a href="javascript: inserirRecursoRapido(<%=recursoItem.idRecurso%>, <%=recursoItem.idPublicacao%>,0)">
                        <img src="<%=strBarra%><%=recursoItem.strThumbItem%>" width="<%=tamanhoIMG%>" height="<%=tamanhoIMG%>">
                                    
                        <span>
                            <h5><%=recursoItem.strTitulo%></h5>
                            <%=recursoItem.strDescricao%>
                        </span>
                    </a>
                    <%
                        if (recursoItem.idCategoria.Equals(159))
                        {
                    %>
                    <a href="<%=recursoItem.strLink %>" target="_blank" class="bt_normal ava_visualizar">Visualizar</a>
                    <%
                        }
                    %>
                </div>  
                <%
            }
                            
        }else{
            Response.Write("Nenhum recurso encontrado.");
        }
        %>       
</div>
                            

