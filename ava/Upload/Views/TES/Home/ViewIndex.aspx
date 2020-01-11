<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Upload.Master" %>
<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">  

</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">

    <% 
        var idsArquivosSelecionados = (List<int>)ViewData["idsArquivosSelecionados"];
        if (idsArquivosSelecionados.Count > 0)
        {
            %> 
                <input type="hidden" id="hidden_idsArquivosSelecionados" value="<%=String.Join(",", idsArquivosSelecionados.Select(x => x.ToString()).ToArray())%>" />
            <%
        }  
	%>

	<div class="container">
		<div class="cont-arquivos col-xs-6 col-sm-3 col-md-3">
			<a href="javascript:void(0)" class="total_arquivos" onClick="AlternaAbas(1)" selected="selected">Meus arquivos</a>
		</div>
		<div class="search-area cont-arquivos col-xs-6 col-sm-9 col-md-9">
		<input type="text" class="pesquisa_arquivos" style="float: right;" id="strPesquisa" name="" onkeyup="PesquisaArquivos(<%=ViewData["idFerramentaTipo"] %>)" placeholder="Pesquisar arquivos">
		<i class="FontAwesome visualizar_lupa"></i>
		</input>
		</div>
	</div>

    <div id="meusArquivos" class="meus_arquivos">
        <div class="conteudo_arquivos col-xs-12 col-sm-12 col-md-12">		    
		    <div class="itens_arquivos_conteudo" class="col-sm-12">
				<input type="hidden" id="idBiblioteca" value="0" />
				<div class="lista_biblioteca">				
				</div>
		    </div>
	    </div>
			
		<div id="footerModal" class="col-xs-12 col-sm-12 col-md-12" >		    
				<input type="hidden" id="idFerramentaTipo" value="<%=ViewData["idFerramentaTipo"] %>" />
				<input type="hidden" id="idFerramenta" value="<%=ViewData["idFerramenta"] %>" />

				<input type="hidden" id="bolSomenteImgCrop" value="<%=ViewData["bolCropImagem"] %>" />

				<input type="hidden" id="imgPerfilAtualAux" value="<%=ViewData["imgPerfilAtualAux"].ToString() %>" />

				<input type="hidden" id="bolAudio" value="<%=ViewData["bolAudio"].ToString() %>" />
				<input type="hidden" id="bolDocumento" value="<%=ViewData["bolDocumento"].ToString() %>" />
				<input type="hidden" id="bolImagem" value="<%=ViewData["bolImagem"].ToString() %>" />

				<input type="hidden" id="idVisitado" value="<%=ViewData["idVisitado"] %>" />


				<div class="qtdeSelecionado col-md-9 col-sm-8 col-xs-4">
					<ul class="menu_arquivos">
					</ul>
				</div>
				<div class="btns_acao col-md-3 col-sm-4 col-xs-8"> 
					<a href="javascript:void(0);" class="btn_cinza left" id="btn_cancelarGeral">Cancelar</a>
					<%
						bool bolCropImagem = Convert.ToBoolean(ViewData["bolCropImagem"]);
	
						if (!bolCropImagem)
						{
					%>
							<a href="javascript:void(0);" class="btn_laranja right" id="btn_salvarGeral">Inserir</a>
					<%
						}
					%>					
				</div>
				<div style="clear:both;" ></div>
					    
	    </div>
    </div>

    <div class="add_arquivos" style="display:none;">
        <div class="ava_lightcontainer">
            <div id="countt_1">
                <%
                    int idUsuario = Convert.ToInt32(ViewData["idUsuario"]);
                    int idFerramenta = Convert.ToInt32(ViewData["idFerramenta"]);
                    int idFerramentaTipo = Convert.ToInt32(ViewData["idFerramentaTipo"]);
                    int idVisitado = Convert.ToInt32(ViewData["idVisitado"]);

                %>
                <script type="text/javascript">
                    abrirUploadArquivo(<%=idUsuario %>, <%=idFerramenta %>, <%=idFerramentaTipo %>, true, 1, "<%=Request.Browser.Browser.ToString()%>", false,<%=idVisitado %>)
                </script>
    
            </div>

        </div>
    </div>

    <div class="visu_arquivos"> 
    </div>

</asp:Content>

