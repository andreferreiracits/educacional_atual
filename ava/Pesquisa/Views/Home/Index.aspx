<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pesquisa Escolar
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

   <div class="mural centralizaclass" id="ava_wrap">
		
        <nav role="navigation" id="categorias_p">
        	<ul class="lista_c_p din">
            	<li class="l_c_p  selecionado primeiro "><a href="#">TODOS</a></li>
                <% if (((Pesquisa.Business.Models.Contador)ViewData["Contador"]).textual > 0)
                   {%>    
                <li class="l_c_p textual"><a href="#">CONTEÚDOS TEXTUAIS</a></li>
                <%}
                else
                   {%>
                <li class="l_c_p noresults textual"><a href="#">CONTEÚDOS TEXTUAIS</a></li>
                <%} %>
                <% if (((Pesquisa.Business.Models.Contador)ViewData["Contador"]).interativo > 0){%> 
                <li class="l_c_p interativo"><a href="#">CONTEÚDOS INTERATIVOS</a> </li>
                <%}
                else
                   {%>
                <li class="l_c_p noresults interativo"><a href="#">CONTEÚDOS INTERATIVOS</a> </li>
                <%} %>
                <% if (((Pesquisa.Business.Models.Contador)ViewData["Contador"]).imagem > 0){%>
                <li class="l_c_p imagens"><a href="#">IMAGENS</a></li>
                <%}
                else
                   {%>
                <li class="l_c_p imagens noresults"><a href="#">IMAGENS</a></li>
                <%} %>
                <% if (((Pesquisa.Business.Models.Contador)ViewData["Contador"]).atlas > 0){%>
                <li class="l_c_p atlas"><a href="#">MAPAS</a></li>
                <%}
                else
                   {%>
                <li class="l_c_p atlas noresults"><a href="#">MAPAS</a></li>
                <%} %>
                <% if (((Pesquisa.Business.Models.Contador)ViewData["Contador"]).videos > 0){%>
                <li class="l_c_p videos"><a href="#">VÍDEOS</a></li>
                <%}
                else
                   {%>
                <li class="l_c_p videos noresults"><a href="#">VÍDEOS</a></li>
                <%} %>
                <% if (((Pesquisa.Business.Models.Contador)ViewData["Contador"]).escola > 0){%>
                <li class="l_c_p ultimo escola"><a href="#">MINHA ESCOLA </a></li>
                <%}
                else
                   {%>
                <li class="l_c_p ultimo noresults escola"><a href="#">MINHA ESCOLA </a></li>
                <%} %>
            </ul>
        </nav>
        <div role="application" id="filtros_p">
        	Filtrado por:
            
              <span class="bootstrap">
              
                     <div class="btn-group" id="divdp1">
                        <%Html.RenderPartial("Partials/ComboCategorias");%>
                    </div>
            		<input type="hidden" value="<%:((Pesquisa.Business.Models.Contador)ViewData["Contador"]).categorias%>" name="categorias_filt" id="categorias_filt" cats_orig="<%:((Pesquisa.Business.Models.Contador)ViewData["Contador"]).categorias%>">
                    <input type="hidden" value="<%:ViewData["intPapelPesquisa"]%>" name="intPapelPesquisa" id="intPapelPesquisa">
                    
                    <div class="btn-group"  id="divdp2">
                        <button class="btn btn-small dropdown-toggle" data-toggle="dropdown"> Todos os níveis de ensino 
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu" id="dp2">
                        	<li class="todos"><input type="radio" value="0" name="ne2" id="ne2_"><label for="ne2_">Todos os níveis de ensino</label></li>
                            <li class="divider"></li>
                       		<li><input type="radio" value="1040001" name="ne2" id="ne2_0"><label for="ne2_0">Educação Infantil</label></li>
                            <!--li><input type="radio" value="1010001" name="ne2" id="ne2_1"><label for="ne2_1">Fundamental</label></li-->
                            <li><input type="radio" value="1010101" name="ne2" id="ne2_2_1"><label for="ne2_2_1">Fundamental I</label></li>
                            <li><input type="radio" value="1010201" name="ne2" id="ne2_2_2"><label for="ne2_2_2">Fundamental II</label></li>
                            <li><input type="radio" value="1020001" name="ne2" id="ne2_2"><label for="ne2_2">Médio</label></li>
                            <li><input type="radio" value="1030001" name="ne2" id="ne2_3"><label for="ne2_3">Educador</label></li>
                        </ul>
                    </div>
                    
                    
                    <div class="btn-group"  id="divdp3" style="display:none;">
                        <button class="btn btn-small dropdown-toggle" data-toggle="dropdown"> Todos os anos
                            <span class="caret"></span></button>
                        
                    </div>
                    
                    <div class="btn-group"  id="divdp4" style="display:none;">
                        <button class="btn btn-small dropdown-toggle" data-toggle="dropdown"> Todas as áreas do conhecimento
                            <span class="caret"></span></button>
                        
                    </div>
                  
                    
                    
              </span>

             
				<button class="btn_cinza avaML5" id="filtreme">Filtrar</button>
                
                <a href="#" class="avaML5 limpar_p">Mostrar tudo</a>
              
                <a name="filtros_p"></a>

            
       </div>
                                                                 
        
		<section role="main" id="resultados_col">
       	
        </section>
		
        <!--aside role="complementary" id="bd_pesquisa" style="width:250px;overflow:hidden;float:right;"-->
         <aside role="complementary" id="bd_pesquisa">
              <div class="aparte video" id="destacarVideo">

              </div> 
              <div class="aparte biogra">
     
              </div>  
           
            <%if (Convert.ToInt32(ViewData["totalLogradouros"]) > 0)
              { %>
        	<div class="aparte googlem">
            
               <iframe width="280" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="conteudoGMapsAVA.asp?palavra=<%:ViewData["palavraLogradouro"]%>"></iframe><br /><small><a target="_blank"  href="https://maps.google.com.br/maps?f=q&source=embed&hl=pt-BR&geocode=&q=<%:ViewData["palavraLogradouro"]%>" style="color:#0000FF;text-align:left">Ver mapa maior</a></small>
	        	
               <input type="hidden" value="<%:ViewData["idPublicacaoEnc"]%>" name="idPublicacaoEnc" id="idPublicacaoEnc" />
               <input type="hidden" value="<%:ViewData["palavraLogradouro"]%>" name="palavraLogradouro" id="palavraLogradouro" />
               <input type="hidden" value="<%:ViewData["strTextoEnc"]%>" name="strTextoEnc" id="strTextoEnc" />
            </div>
            <div class="verbete">
               	<h5> <a target="_new" href="/enciclopedia/renciclopedia.asp?idpag=1&id=<%:ViewData["idPublicacaoEnc"]%>&strtitulo=<%:ViewData["palavraLogradouro"]%>"><%:ViewData["palavraLogradouro"]%></a></h5>
                <p><%=ViewData["strTextoEnc"]%></p>	
			</div>
            <hr>
            <%} %>

         	
         
            <div class="aparte enciclo">
            
                
                
            </div>
            
            
        
            <div class="aparte dicio">
            
                
                
            </div>
        	
            
            <div class="aparte conheci" id="_area_con">
            
                <img width="223" height="45" src="Imagens/areas_conhecimento.png">

                    <a fake="respostadisci1AVA.asp?id=28&pg=1&img=28">Antropologia</a> 
                    <a fake="respostadisci1AVA.asp?id=5&pg=1&img=5">Arte </a>
                    <a fake="respostadisci1AVA.asp?id=7&pg=1&img=7">Biologia </a>
                    <a fake="respostadisci1AVA.asp?id=6&pg=1&img=6">Ciências </a>
                    <a fake="respostadisci1AVA.asp?id=589&pg=1&img=589">Direito </a>
                    <a fake="respostadisci1AVA.asp?id=590&pg=1&img=590">Economia </a>
                    <a fake="respostadisci1AVA.asp?id=8&pg=1&img=8">Educação física </a>
                    <a fake="respostadisci1AVA.asp?id=9&pg=1&img=9">Filosofia </a>
                    <a fake="respostadisci1AVA.asp?id=10&pg=1&img=10">Física </a>
                    <a fake="respostadisci1AVA.asp?id=11&pg=1&img=11">Geografia </a>
                    <a fake="respostadisci1AVA.asp?id=12&pg=1&img=12">História </a>
                    <a fake="respostadisci1AVA.asp?id=13&pg=1&img=13">Línguas </a>
                    <a fake="respostadisci1AVA.asp?id=14&pg=1&img=14">Literatura </a>
                    <a fake="respostadisci1AVA.asp?id=15&pg=1&img=15">Matemática </a>
                    <a fake="respostadisci1AVA.asp?id=17&pg=1&img=17">Pedagogia </a>
                    <a fake="respostadisci1AVA.asp?id=16&pg=1&img=16">Português </a>
                    <a fake="respostadisci1AVA.asp?id=18&pg=1&img=18">Psicologia </a>
                    <a fake="respostadisci1AVA.asp?id=19&pg=1&img=19">Química </a>
                    <a fake="respostadisci1AVA.asp?id=333&pg=1&img=333">Religiões </a>
                    <a fake="respostadisci1AVA.asp?id=591&pg=1&img=591">Sociologia </a>
                    <a fake="respostadisci1AVA.asp?id=21&pg=1&img=21">Temas transversais</a>

                
            </div>
            
        
        </aside>
        
        <div class="pesquisa_fim">Conteúdos da Internet podem ser modificados a qualquer momento. Temos vários mecanismos para acompanhar essas alterações, mas caso você esteja vendo algo inadequado, pedimos que nos <a class="invert" href="/contato">avise</a> imediatamente.</div>

	</div>

    <div id="videofancy" style="display:none;">
    
    	<div class="embed_videoboxava">
        
      
     	<!--object width="640" height="420">
        <param name="movie" value="//www.youtube.com/v/7C-fkJ8ZfZA"></param>
        <param name="allowFullScreen" value="true"></param>
        <embed src="//www.youtube.com/v/7C-fkJ8ZfZA" type="application/x-shockwave-flash" width="640" height="420" allowfullscreen="true"></embed></object!-->
        <iframe width="640" height="420" src="" frameborder="0" allowfullscreen></iframe>
        </div>
       
     
     	
    	 <div id="caixa_desc" class="desc_videoboxava" >
         	<h3>Descrição:</h3>
            <div class="dv_desc"></div>
         
         </div>
     
    
    </div>    
</asp:Content>
