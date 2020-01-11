<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.ArquivoEtapa>>" %>

<% 
if (Model.Count > 0)
{
   %>
   <div class="container_inlinks">
        <!--<h5>Material de apoio</h5> -->
        <% 
        foreach (var arquivo in Model)
        {
            string strArquivo = arquivo.strArquivo;
            string strLink = arquivo.strDiretorio + "/" + arquivo.strArquivo + arquivo.strExtensao;
            %>
            <div class="the_insertedMedia">
				<a class="umlink" href="<%=strLink%>"><span class="mapoio_icon"></span><%=strArquivo%></a>
				<a class="bt_normal" href="javascript:void(0);" onclick="excluirArquivoFerramenta(<%=arquivo.idArquivo%>, <%=arquivo.idFerramenta %>)"><strong>x</strong></a>
			</div>
            <%            
        }    
        %>

    </div>   
   <%     
}    
%>


