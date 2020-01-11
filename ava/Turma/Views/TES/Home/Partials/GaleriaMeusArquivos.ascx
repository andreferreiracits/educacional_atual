

<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Upload.Models.Arquivo>" %>


<%
  bool bolSomenteImgCrop = false;
      
        if(Model.idBiblioteca == 3 )
        {
    %>      <div class = "item_galeria" data-idPost="itemGaleriea_<%=Model.id%>">
        			<div data-idPost="<%=Model.id %>" class="idArq_<%=Model.id%> item_imagem_galeria imagens_mural galeriaava" 
        			 style="background-image:url('<%=Model.strDiretorio %>/<%=Model.strArquivo %><%=Model.strExtensao %>');">
                            
                            <a  id="abrir_fancybox"
                                data-idarquivo="<%=Model.id %>" class="galeria_mural galeriaava fancybox-thumb fake_galeria" 
                                data-nomearquivo="<%=Model.strArquivo%>"
                                data-strExtensao="JPEG"
                                data-strExtensaoReal = "<%=Model.strArquivo %><%=Model.strExtensao %>"
                                title="<%=Model.strArquivo %>"
                                data-path="<%=Model.strDiretorio %>/<%=Model.strArquivo %><%=Model.strExtensao %>">
                                <img alt="auxiliar" style="display:none;" src="<%=Model.strDiretorio %>/<%=Model.strArquivo %><%=Model.strExtensao %>">
                            </a>  
                   
                    </div>
                   <div class="info_aluno">
    		                <h1> 
    		                <a class="nome" title="<%=Model.strArquivo%><%=Model.strExtensao %>"><%=Model.strArquivo%><%=Model.strExtensao%></a>
    		                </h1>   
                        
                    </div>

                    <div class="acoes_mural" ide="<%=Model.id%>">
                    
                            <div class="arq_menu_links">
                                
                                <a href="javascript:void(0)" class="FontAwesome editar up_tooltip"></a>
                                <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Editar</div>
                                
                                <a class="FontAwesome download up_tooltip" href="/AVA/Upload/Home/ForceDownload?strSrcArquivo=<%=Model.strDiretorio%>/<%=Model.strArquivo %><%=Model.strExtensao %>"></a>
                                <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Download</div>
                                
                                <a href="javascript:void(0);" class="FontAwesome excluir up_tooltip"   idArquivo="<%=Model.id%>" onclick="ExcluirArquivoInvidual(<%=Model.id%>)"></a>
                                <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Excluir</div>
                            </div>    
                </div>
    </div>
     <%
        }
        else if(Model.idBiblioteca == 1)
        {
        %>
        <div class = "item_galeria" data-idPost="itemGaleriea_<%=Model.id%>">
          <div data-idPost="<%=Model.id%>" class="item_imagem_galeria item_galeria_arquivos imagens_mural">

                   <div class=" tipo_arquivo">
                            <a class="fake_galeria" style="display:none;"                                
                                data-strExtensao="PDF"
                                data-nomearquivo="<%=Model.strArquivo%>" 
                                data-idarquivo="<%=Model.id %>" 
                                data-path="<%=Model.strDiretorio %>/<%=Model.strArquivo %><%=Model.strExtensao %>">

                                </a>
                                <i><%=Model.strExtensao%></i>

                    </div>
           </div>

               <div class="info_aluno">
		                <h1> 
		                <a class="nome" title="<%=Model.strArquivo%><%=Model.strExtensao %>"><%=Model.strArquivo%><%=Model.strExtensao%></a>
		                </h1>   
                    
            </div>

        <div class="acoes_mural" ide="<%=Model.id%>">
            
                    <div class="arq_menu_links">
                        
                        <a class="FontAwesome download up_tooltip" href="/AVA/Upload/Home/ForceDownload?strSrcArquivo=<%=Model.strDiretorio %>/<%=Model.strArquivo %><%=Model.strExtensao %>"></a>
	                    <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Download</div>

	                    <a href="javascript:void(0);" class="FontAwesome excluir up_tooltip"  idArquivo="<%=Model.id%>" onclick="ExcluirArquivoInvidual(<%=Model.id%>)"></a>
                        <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Excluir</div>

                    </div>    
        </div>

     </div>



        <%
        }%>

    
