<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Upload.Models.Arquivo>>" %>

<%

    bool bolSomenteImgCrop = Convert.ToBoolean(ViewData["bolSomenteImgCrop"]);

if(Model.Count > 0)
{
    foreach(var item in Model)
    {
        if(item.idBiblioteca == 3 )
        {
    %>
            <div class="item_arquivo img select idArq_<%=item.id %>" idArquivo="<%=item.id %>">
	            <div class="tipo_arquivo" <%if(bolSomenteImgCrop) {%> onclick="VisualizaArquivoPerfil(<%=item.id %>, <%=item.idBiblioteca %>)"<%} %>>
		            <img src="<%=item.strDiretorio %>/<%=item.strArquivoAux %><%=item.strExtensao %>" width="192" height="170" alt="<%=item.strArquivo %>"/>
	            </div>	
	            <div class="detalhe_arquivo" style="display:block; height:15px;">
                    <%
                        if (item.strNome == "" || item.strNome == null)
                        {
                        %>
                            <p class="nome_arquivo"><%=item.strArquivo %></p>
                        <%
                        }
                        else
                        {
                        %>
                            <p class="nome_arquivo"><%=item.strNome %></p>
                        <%
                        }
                    %>
		            <div class="arq_menu_links">
                        <a href="javascript:void(0);" class="FontAwesome excluir up_tooltip" onclick="ExcluirArquivo(<%=item.id %>)"></a>
                        <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Excluir</div>

                        <a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(<%=item.id %>, <%=item.idBiblioteca %>)"></a>
                        <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div>

                        <a class="FontAwesome download up_tooltip" href="/AVA/Upload/Home/ForceDownload?strSrcArquivo=<%=item.strDiretorio %>/<%=item.strArquivo %><%=item.strExtensao %>"></a>
	                    <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Download</div>
                    </div>
                </div>
            </div>

    <%
        }
        else if(item.idBiblioteca == 2)
        {
    %>

            <div class="item_arquivo audio idArq_<%=item.id %>" idArquivo="<%=item.id %>">
	            <div class="tipo_arquivo">
		            <p></p>
	            </div>
	            <div class="detalhe_arquivo" style="display:block; height:15px;">
		            <%
                        if (item.strNome == "" || item.strNome == null)
                        {
                        %>
                            <p class="nome_arquivo"><%=item.strArquivo %></p>
                        <%
                        }
                        else
                        {
                        %>
                            <p class="nome_arquivo"><%=item.strNome %></p>
                        <%
                        }
                    %>
                    <div class="arq_menu_links">
		                <a href="javascript:void(0);" class="FontAwesome excluir up_tooltip" onclick="ExcluirArquivo(<%=item.id %>, <%=item.idBiblioteca %>)"></a>
                        <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Excluir</div>

                        <a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(<%=item.id %>, <%=item.idBiblioteca %>)"></a>
                        <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div>

                        <a class="FontAwesome download up_tooltip" href="/AVA/Upload/Home/ForceDownload?strSrcArquivo=<%=item.strDiretorio %>/<%=item.strArquivo %><%=item.strExtensao %>"></a>
	                    <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Download</div>

                     </div>
                </div>
            </div>

        
    <%
        }
        else if(item.idBiblioteca == 1)
        {
        %>
            <div class="item_arquivo doc idArq_<%=item.id %>" idArquivo="<%=item.id %>">
	            <div class="tipo_arquivo">
		            <p><%=item.strExtensao %></p>
	            </div>
	            <div class="detalhe_arquivo" style="display:block; height:15px;">
		            <%
                        if (item.strNome == "" || item.strNome == null)
                        {
                        %>
                            <p class="nome_arquivo"><%=item.strArquivo %></p>
                        <%
                        }
                        else
                        {
                        %>
                            <p class="nome_arquivo"><%=item.strNome %></p>
                        <%
                        }
                    %>
                    <div class="arq_menu_links">
		                
                        <a href="javascript:void(0);" class="FontAwesome excluir up_tooltip" onclick="ExcluirArquivo(<%=item.id %>)"></a>
                        <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Excluir</div>

                        <a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(<%=item.id %>, <%=item.idBiblioteca %>)"></a>
                        <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div>
                        
                        <a class="FontAwesome download up_tooltip" href="/AVA/Upload/Home/ForceDownload?strSrcArquivo=<%=item.strDiretorio %>/<%=item.strArquivo %><%=item.strExtensao %>"></a>
	                    <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Download</div>
                    </div>
                </div>
            </div>
        <%
        }
    }
}
else
{
%>
    Nenhum arquivo encontrado.
<%}%>

<!--
<div class="item_arquivo img select">
	<div class="tipo_arquivo">
		<img src="/AVA/StaticContent/Common/img/perfil/teste.png" width="140" height="107" alt="Nome da imagem"/>
	</div>	
	<div class="detalhe_arquivo">
		<p>Nome do arquivo</p>
		<div class="tool_onde">
			<p>Este arquivo é usado nos seguintes lugares: <strong>Atividade - Nome da atividade</strong>, <strong>Caminho de tarefas - Nome do caminho</strong> e no <strong>Perfil</strong></p>
			<div class="setaBaixo"></div>
		</div>
		<a href="javascript:void(0);" class="uso">Em uso</a>
		<a href="javascript:void(0);" class="visualizar_lupa"></a>
	</div>
</div>
<div class="item_arquivo img">
	<div class="carregando">
	</div>
	<div class="tipo_arquivo">
		<img src="/AVA/StaticContent/Common/img/perfil/teste.png" width="140" height="107" alt="Nome da imagem"/>
	</div>	
	<div class="detalhe_arquivo">
		<p>Nome do arquivo</p>
	</div>
</div>
-->