<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="ava_lightheader" >
    <h2 class="blokletters">Busca de Pessoas</h2>
               
    <form target="_top" name="fPesquisaGeral">
        <input type="text" class="campo" value="Procurar por nome" id="txtPesquisaGeralAva" name="strpc_topo">        
        <input type="button" class="btn_cor" value="Buscar" id="buscarpessoas" name="go_button">           
        <div id="exibe_resultado_combo"></div>
    </form>
</div>

<div class="ava_lightcontent" id="ava_contentbuscapessoas">
    <div align="center" id='msgInicio'>Digite nome ou apelido da pessoa que você procura.</div>
    <div align="center" id='ava_loader'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>
    
    <script id="myContentTemplate" type="text/x-jquery-tmpl">
       
            {{each Result}}
        
                <div class="carteirinha" id="cart_${id}">
                    <div class="in_cT">                       

                        {{if bolEducador }} <div class="souProf"><span>Professor</span></div> {{/if}}    
                
                        <a href="/AVA/Perfil/Home/Index/${strLogin}" >
                            {{if strApelido.length > 0}}
                                <img src="${strMiniFoto}" width="55" height="55" alt="${strApelido}">
							    <span>${strApelido}</span>
                            {{else}}
                                <img src="${strMiniFoto}" width="55" height="55" alt="${strNome}">
							    <span>${strNome}</span>
                            {{/if}}
                        </a> 
                                                                                                
                        {{if bolSigoAuto && idSeguidor != id }}
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

                        {{if bolPossoSeguir && !bolSigoAuto && bolEstouSeguindo && idSeguidor != id }}
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

           


    