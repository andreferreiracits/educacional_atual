<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="ava_lightheader" >
    <h2 class="blokletters">Busca de Pessoas</h2>
               
    <form target="_top" name="fPesquisaGeral">
        <input type="text" class="campo" value="Procurar por nome" id="txtPesquisaGeralAva" name="strpc_topo">
        <div class="bt_geral"><input type="button" class="okP" value="Buscar" id="buscarpessoas" name="go_button"></div>             
    </form>
</div>

<div class="ava_lightcontent" id="ava_contentbuscapessoas">
    <img id='ava_loader' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />   
    <script id="myContentTemplate" type="text/x-jquery-tmpl">
       
            {{each Result}}
        
                <div class="carteirinha" id="cart_${id}">
                    <div class="in_cT">
                        {{if bolEducador }} <div class="souProf"><span>Professor</span></div> {{/if}}              
                
                        <a href="/AVA/Perfil/Home/Index/${strLogin}" ><img src="${strMiniFoto}" width="55" height="55" title="${strNome}">${strNome}</a>                   
                
                        {{if bolSigoAuto }}
                            <a class=" bt_seguir s_IdoForever" href="#">
                                seguindo
                                <span class="bt_seguir"></span>
                            </a>
                        {{/if}}

                        {{if bolPossoSeguir && !bolEstouSeguindo}}           
                            <a id="btseg_${id}" class="bt_seguir s_Indo" href="javascript: seguir(${idSeguidor},${id})">
                                seguir
                                <span class="bt_seguir"></span>
                            </a>
                        {{/if}}

                        {{if bolEstouSeguindo}}
                            <a id="btseg_${id}" href="javascript: parardeseguir(${idSeguidor},${id})" class="bt_seguir">
                                <span class="ava_seguindo">seguindo</span>
                                <span class="ava_parardeseguir">parar de seguir</span> 
                                <span class="bt_seguir"></span>
                            </a>
                        {{/if}}


                    </div>
                </div>

            {{/each}}
       
    </script>
</div>

           


    