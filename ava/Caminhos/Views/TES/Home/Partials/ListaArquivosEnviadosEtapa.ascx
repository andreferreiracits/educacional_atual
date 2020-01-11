<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.ArquivoEtapa>>" %>

<%
if (Model.Count > 0)
{
   %>
   <div class="infos_lebox">
       <div class="container_inlinks">
            <h5>Arquivos enviados</h5>
            <%
            foreach (var arquivo in Model)
            {
                string strArquivo = arquivo.strArquivo;
                string strLink = arquivo.strDiretorio + "/" + arquivo.strArquivo + arquivo.strExtensao;
                %>
                <div class="the_insertedLink">
                    <a href="<%=strLink%>" class="umlink" target="_blank"><span class="umarquivo"></span><%=strArquivo%></a>                
                </div>    
                <%            
            }    
            %>

        </div>
   </div> 
   <%     
}    
%>


