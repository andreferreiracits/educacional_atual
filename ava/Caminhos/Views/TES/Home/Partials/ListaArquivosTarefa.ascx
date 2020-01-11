<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.ArquivoEtapa>>" %>

<% 
if (Model.Count > 0)
{
   %>
   <div class="container_inlinks">
        <h5>Material de apoio</h5>  
        <% 
        foreach (var arquivo in Model)
        {
            string strArquivo = arquivo.strArquivo;
            string strLink = arquivo.strDiretorio + "/" + arquivo.strArquivo + arquivo.strExtensao;
            %>
            <div class="the_insertedLink">
                <a href="<%=strLink%>" class="umlink" target="_blank"><span class="umarquivo"></span><%=strArquivo%></a>
                <a href="javascript:void(0);" onclick="excluirArquivoFerramenta(<%=arquivo.idArquivo%>, <%=arquivo.idFerramenta %>)" class="bt_normal" idArquivo="<%=arquivo.idArquivo%>"><strong>x</strong></a> 
            </div>    
            <%            
        }    
        %>

    </div>   
   <%     
}    
%>


