<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pesquisa.Business.Models.Publicacao>" %>


<div class="box_imgbio" style="background-image:url(/ava/staticContent/common/img/perfil/white_fade.png), url(<%:Model.path_img%>);">
                <a class="box_absolute" target="_new" href="/enciclopedia/res_busca.asp?rdo_tipo=1&pesquisa=1&edt_texto=<%:ViewData["palavra"]%>">Mais imagens</a>
                
                <img alt="" src="<%:Model.path_img%>"/>
                
                </div>
            
                <h4><%=Model.strTitulo%></h4>
                <div class="verbete">
               		<p><%=Model.strTexto%> </p> <a target="_new" class="linkrefpeq" href="/enciclopedia/renciclopedia.asp?idpag=1&id=<%:Model.idPublicacao%>&strtitulo=<%:Model.strTitulo%>">Enciclopédia</a>
                    <input type="hidden" name="idBiografia" id="idBiografia" value="<%=Model.idPublicacao%>" />
				</div>
               <hr/> 