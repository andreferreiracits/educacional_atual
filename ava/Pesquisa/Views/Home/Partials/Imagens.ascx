<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>
<div class="cabe_p">
        <%
            string tit = Convert.ToString(ViewData["sec"]);
            if (Convert.ToInt32(ViewData["total"]) <= 1)
            {
                if (tit == "imagens")
                {
                    tit = "imagem";
                }else{
                    tit = "mapa";
                }
            }
        
        %>
      <div class="cabe_p_stats"><%=ViewData["total"]%> <%:tit%>  para <b><%:ViewData["palavra"]%></b></div>
      <input type="hidden" name="tot_figs" id="tot_figs" value="<%=ViewData["total"]%>">
</div>

<div class="am-container" id="am-container">
                                        <%
                                            int i  = 0;
                                            string link;
                                            string orig;
                                            string barra;
                                            foreach (var item in Model)
                                            {
                                                i++;
                                                if (i == Model.Count)
                                                {
                                                    //link = item.strLink;
                                                }
                                                else
                                                {
                                                    //link = item.path_img;
                                                }
                                                string autor = "";
                                                if (Convert.ToString(ViewData["sec"]) == "imagens")
                                                {
                                                    autor = "Autor: " + item.strAutor;
                                                }
                                                link = item.path_img;
                                                orig = item.strLink;
                                                string prop = "";
                                                if (item.idCategoria == 139)
                                                {
                                                    orig = link;
                                                }
                                                else
                                                {
                                                    prop = "Proprietário: " + item.strProprietario;
                                                }
                                                %>
                                        
                                                    
                                        	            <div class="div-wrapper">
                                                        <%
                                                            if (item.idCategoria != 139)
                                                            {
                                                                barra = "/";
                                                                foreach (var itemArq in item.arquivosImagem)
                                                                {
                                                                    %>
                                                                        <input type="hidden" name="arquivos_info" value="<%:itemArq.strPath%>" intResolucaoV="<%:itemArq.intResolucaoV%>" intResolucaoH="<%:itemArq.intResolucaoH%>" intTamanhoArq="<%:itemArq.intTamanhoArq%>" strFormato="<%:itemArq.strFormato%>">
                                                                    <%
                                                            }
                                                            }
                                                            else
                                                            {
                                                                barra = "";
                                                            }
                                                         %>
                                        	            <a href="<%:barra%><%=orig%>" id="item-<%:item.idPublicacao%>" name="item-<%:item.idPublicacao%>" title="<%:item.strTitulo%>" pos="<%:item.ROW%>" texto="<%:item.strTexto%>" autor="<%:autor%>" cat="<%:item.idCategoria%>" prop="<%:prop%>">
                                        	            <img src="<%=link%>" />
                                        	            </a>
                                                        <div class="imgseta"></div>
                                                        </div>
                                                   
                                                
                                             <%
                                            }     
                                        %>     
                                        
                                    </div>
          
            
  <input type="hidden" value="<%=ViewData["total"]%>" id="totImg" name="totImg">
  <input type="hidden" value="<%:ViewData["sec"]%>" id="secao" name="secao">
  <%=ViewData["pags"].ToString()%>
             <div class="rodape_resultados">
                    
            </div>