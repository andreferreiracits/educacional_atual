<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%
    bool bolEscondeVoltar = Convert.ToBoolean(ViewData["bolEscondeVoltar"]);   
%>
<div class="lightbox_carteirinhas" id="turma_detalhada">
    <div class="ava_lightheader">
        <%if (!bolEscondeVoltar)
          { %>
        <a href="javascript: listaTurmas();" class="FontAwesome voltar_modal"><span></span></a>
        <%} %>
        <h2 class="komika"><%=ViewData["titulo"]%></h2>
    </div>	
    <div class="ava_lightcontent ava_lightcontainer" >
        <div class="filtro">
	        <form>
		        <label>
			        <input type="text" placeholder="Pesquisar por Pessoas" id="txtFiltroAva" name="strpc_topo"/>
			        <span class="icone_pesquisa FontAwesome"></span>
		        </label>
	        </form>	
        </div>
           
        <div class="cont_carteirinhas" id="ava_contentlista">
            <img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />
            <script id="myContentTemplate" type="text/x-jquery-tmpl">
                {{each Result}}

                    <div class="carteirinha" id="cart_${id}">   
                            
						    <div class="in_cT">                                                               

                                {{if bolEducador }}
                                    <div class="souProf">
								        <span>Professor</span>
							        </div> 
                                {{/if}}   
                                  
							    <a href="/AVA/Perfil/Home/Index/${strLogin}">								    
                                    {{if strApelido.length > 0}}
                                        <img src="${strMiniFoto}" width="55" height="55" alt="${strApelido}">
								        <span>${strApelido}</span>
                                    {{else}}
                                        <img src="${strMiniFoto}" width="55" height="55" alt="${strNome}">
								        <span>${strNome}</span>
                                    {{/if}}
							    </a>                                                                

                                {{if bolSigoAuto && idSeguidor != id && !bolEstouSeguindo }}
                                    <a class=" bt_seguir s_IdoForever  txtSeguindoBloqueadoModal" href="#">
                                        Seguindo
                                        <span class="fontello icoSeguindoBloqueado"></span>
                                    </a>
                                {{/if}}
                                
                                {{if !bolSigoAuto && bolPossoSeguir && !bolEstouSeguindo && idSeguidor != id}}           
                                    <a id="btseg_${id}" class="bt_seguir s_Indo" href="javascript: seguir(${idSeguidor},${id})">
                                        seguir
                                        <span class="fontello icoSeguir"></span>
                                    </a>
                                {{/if}}

                                {{if bolEstouSeguindo && idSeguidor != id}}
                                    <a id="btseg_${id}" href="javascript: parardeseguir(${idSeguidor},${id})" class="bt_seguir">
                                        <span class="ava_seguindo"></span>
                                        <span class="ava_parardeseguir">parar de seguir</span> 
                                        <span class="fontello icoPararSeguir"></span>
                                    </a>
                                {{/if}}
               
						    </div>  
					    </div>         
               
                {{/each}}
            </script>
        </div>
    </div>
    <a class="btn_cinza right" href="javascript: $.fancybox.close();">Cancelar</a>	
</div>
