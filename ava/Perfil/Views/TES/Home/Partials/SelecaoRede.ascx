<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="ava_lightheader">
    <h2 class="blokletters" id="titListaUsuariosAva"><%=ViewData["titulo"]%></h2>
               
    <form target="_top" name="fFiltro">
        <input type="text" class="campo" value="Filtrar por nome" id="txtFiltroAva" name="strpc_topo" idusuario="<%:ViewData["idUsuario"]%>" />                         
    </form>
</div>

<div class="ava_lightcontent" id="ava_contentlista">
    <img id="ava_loader" src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />
    <script id="myContentTemplate" type="text/x-jquery-tmpl">
        {{each Result}}
         {{if id != <%=ViewData["idUsuario"]%>}}
            <div class="carteirinha" id="cart_${id}" ident="${id}" style="cursor:pointer;">
                <div class="in_cT">
                    <span class="ava_clips"></span>    
                    {{if bolEducador }} <div class="souProf"><span>Professor</span></div> {{/if}}              
                
                    <a><img src="${strMiniFoto}" width="55" height="55" alt="${strNome}">${strNome.substring(0,9)}</a>                   
                
                    {{if bolSigoAuto }}
                        <!--a class=" bt_seguir s_IdoForever txtSeguindoBloqueadoModal" href="#">
                            Seguindo
                            <span class="fontello icoSeguindoBloqueado"></span>
                        </a-->
                    {{/if}}

                    {{if bolPossoSeguir && !bolEstouSeguindo}}           
                        <!--a id="btseg_${id}" class="bt_seguir s_Indo" href="javascript: seguir(${idSeguidor},${id})">
                            seguir
                            <span class="fontello icoSeguir"></span>
                        </a-->
                    {{/if}}

                    {{if bolEstouSeguindo}}
                        <!--a id="btseg_${id}" href="javascript: parardeseguir(${idSeguidor},${id})" class="bt_seguir">
                            <span class="ava_seguindo">seguindo</span>
                            <span class="ava_parardeseguir">parar de seguir</span> 
                            <span class="fontello icoPararSeguir"></span>
                        </a-->
                    {{/if}}


                </div>
            </div>
         {{/if}}
        {{/each}}
    </script>
</div>