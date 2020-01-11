<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="ava_lightheader">
    <h2 class="blokletters" id="titListaUsuariosAva"><%=ViewData["titulo"]%></h2>
               
    <form target="_top" name="fFiltro" onsubmit="return false;">
        <input type="text" class="campo" value="Filtrar por nome" id="txlFiltroParticipantes">                         
    </form>
</div>

<div class="ava_lightcontent ava_lightcontainer" id="carteirinhaParticipante">
    <img id="ava_loader" src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />
    <script id="myContentTemplate" type="text/x-jquery-tmpl">
        {{each Result}}
    
            <div class="carteirinha" id="cart_${id}">
		        <div class="Feed_full" style="display:none" id="boxExcluirPart_${id}">
			        <p>Deseja remover esse usuário do grupo?</p>
			        <div class="acoesFeed">
				        <a href="javascript: void(0);" class="bt_normal green exc_usuario_grupo">Sim</a>
				        <a href="javascript: void(0);" class="bt_normal red naoexc_usuario_grupo">Não</a>
			        </div>
		        </div>
		        <div class="in_cT">
			        <span class="ava_clips"></span>
                    {{if papelUsuario.bolEducador }} <div class="souProf"><span>Professor</span></div> {{/if}}
			        
                    <%
                    if((bool) ViewData["bolMediador"]){
                    %>
                        {{if bolParticipante || bolMediador}}
			                <a href="javascript:void(0);" class="excluir_usuario_grupo FontAwesome" ide="${id}" idGrupo="${idGrupo}"></a>
                        {{/if}}
                    <%
                    }
                    %>
			        <a href="/AVA/Perfil/Home/Index/${strLogin}" class="cart_nome tooltip_title">
				        <img src="${strMiniFoto}" width="55" height="55" alt="${strNome}">
				        <div class="cart_so_nome">${strNome}</div>
			        </a>
                    <%
                    if((bool) ViewData["bolMediador"]){
                    %>
                        {{if bolMediador}}
                            <a id="btprom_${id}" href="javascript: despromoverParticipanteGrupo(${id}, ${idGrupo})" class="mediador">mediador</a>
                        {{/if}}

                        {{if bolParticipante }}
                            <a id="btprom_${id}" href="javascript: promoverParticipanteGrupo(${id}, ${idGrupo})" class="tornar_mediador">Promover a mediador</a>
                        {{/if}}
                    <%
                     }
                     %>
                     			        
                    
		        </div>
	        </div>

        {{/each}}
    </script>
</div>
    