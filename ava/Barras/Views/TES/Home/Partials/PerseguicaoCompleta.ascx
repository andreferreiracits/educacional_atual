<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="ava_lightheader">
    <h2 class="blokletters" id="titListaUsuariosAva">
        <%=ViewData["titulo"]%>

    </h2>
    
    <%if (ViewData["tipo"] != "5" && ViewData["tipo"] != "6")
      { %>               
    <form target="_top" name="fFiltro" onsubmit="return false;">
        <input type="text" class="campo" value="Pesquisar por nome" id="txtFiltroAva" name="strpc_topo">
        <input type="hidden" value="<%=ViewData["id"]%>" id="idAux">
        <input type="hidden" value="<%=ViewData["tipo"]%>" id="tipo">
        <input type="button" class="btn_cor" name="filtrarPessoas" value="Buscar" id="filtrarPessoas" />    
        <div id="exibe_resultado_combo" class="limpa_pesquisa"><a href="#" id="voltarListaPesquisa" idItem="<%=ViewData["id"]%>" idTipo="<%=ViewData["tipo"]%>"> Limpar busca</a></div>               
    </form>
    <%} %>
</div>

<div class="ava_lightcontent" id="ava_contentlista">
    <img id="ava_loader" src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />       
        
    <script id="myContentTemplate" type="text/x-jquery-tmpl">
        {{each Result}}

            <div class="carteirinha" id="cart_${id}">
                               
                <div class="in_cT">
                        {{if idPagina > 0}}
                            <div class="souProf"><span>Página</span></div>
                        {{else}}
                            {{if bolEducador }} <div class="souProf"><span>Professor</span></div> {{/if}}
                        {{/if}}

                        {{if idPagina > 0}}
                            <a href="/AVA/Pagina/${strLogin}" >
                        {{else}}
                            <a href="/AVA/Perfil/Home/Index/${strLogin}" >
                        {{/if}}

                    
                        {{if strApelido.length > 0}}
                            <img src="${strMiniFoto}" width="55" height="55" alt="${strApelido}">
							<span>${strApelido}</span>
                        {{else}}
                            <img src="${strMiniFoto}" width="55" height="55" alt="${strNome}">
							<span>${strNome}</span>
                        {{/if}}
                    </a>                   
                
                    
                    {{if idPagina > 0}}
                         <a class=" bt_seguir s_IdoForever txtSeguindoBloqueadoModal" href="#">
                                Seguindo
                                <span class="fontello icoSeguindoBloqueado"></span>
                            </a>
                    {{else}}
                        {{if bolSigoAuto && idSeguidor != id && !bolEstouSeguindo }}
                            <a class=" bt_seguir s_IdoForever txtSeguindoBloqueadoModal" href="#">
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

                        {{if bolPossoSeguir && bolEstouSeguindo && idSeguidor != id }}
                            <a id="btseg_${id}" href="javascript: parardeseguir(${idSeguidor},${id})" class="bt_seguir">
                                <span class="ava_seguindo"></span>
                                <span class="ava_parardeseguir">parar de seguir</span> 
                                <span class="fontello icoPararSeguir"></span>
                            </a>
                        {{/if}}
                    {{/if}}


                </div>
            </div>

        {{/each}}
    </script>
</div>

           


    