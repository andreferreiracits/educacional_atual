<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Palavra>>" %>
<%if (Model.Count > 0){
      
      
       %>
<h2 class="din">Pesquisas relacionadas ao termo <b><%:ViewData["palavra"]%></b></h2>
<span>
<%
    foreach (var item in Model)
    {
        %>
            
                    
                    <a href="" class=""><%:item.strPalavra%></a>   
        <%
    }     
%>
</span>
<%
  }
%>