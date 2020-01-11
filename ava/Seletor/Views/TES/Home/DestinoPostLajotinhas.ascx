<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<int>" %>
<% 
    int idFerramentaTipo = (int)ViewData["idFerramentaTipo"];
    var strTituloModal = "";
    switch (idFerramentaTipo)
    {
        case 2:
        case 4:
        case 14:
        case 15:
        case 17:
        case 18:
        case 19:
        case 25:
            strTituloModal = "Agendado para:";
            break;
        default:
            strTituloModal = "Compartilhado com:";
            break;
    }
   
%>
<div class="ava_lightheader">
    <a href="javascript:void(0);" id="ava_contentdestinopost_voltar" class="voltar_modal" style="display:none;"><span class="fontello"></span></a>
    <h2 class="titulo_modal"><%=strTituloModal%></h2> 
    <div id="ava_contentdestinopost_total" style="display:none;"><p></p></div>   
</div>
<div class="ava_lightcontent" id="ava_contentdestinopost">
    <script id="myContentTemplateDestinoPost" type="text/x-jquery-tmpl">
        {{each Result}}
        
            {{if bolGrupo }}
                {{if tipo != 4}}
                    <div class="carteirinha carteirinha_selected compartilhado_grupo" idMensagem="<%=Model%>" bolSeguidores="0" idUnidade="${idUnidade}" idEscola="${idEscola}" idCurso="${idCurso}" idSerie="${idSerie}" idTurma="${idTurma}" idPapel="${tipo}">
                        <strong>${titulo}</strong>                            
                {{else}}
                    <div class="carteirinha carteirinha_selected compartilhado_grupo" idMensagem="<%=Model%>" bolSeguidores="1">
                        <strong>Seguidores</strong>                           
                {{/if}}

                        {{if idUnidade > 0 || idEscola > 0}}
                            <br />${subtitulo}
                        {{/if}}

                        <span>
                            ${total}
                            {{if tipo == 3000001}}
                                Professores
                            {{else tipo == 1000001 || tipo == 0}}
                                Alunos
                            {{else tipo == 2000001}}
                                Pais e Responsáveis
                            {{else tipo == 4}}
                                Seguidores
                            {{else tipo == 6000001}}
                                Administradores, Coordenadores e Diretores
                            {{/if}}
                        </span>
                    
                    </div>
            {{else}}
                <div class="carteirinha" id="cart_${id}">
                    <div class="in_cT">

                        {{if tipo == 3000001 }} <div class="souProf"><span>Professor</span></div> {{/if}}    
                
                        <a href="/AVA/Perfil/Home/Index/${subtitulo}" >                                
                            <img height="55" width="55" alt="${subtitulo}" src="${imagem}">    
							<span>${titulo}</span>                                
                        </a>

                    </div>
                </div>
            {{/if}}

        {{/each}}
    </script>
</div>