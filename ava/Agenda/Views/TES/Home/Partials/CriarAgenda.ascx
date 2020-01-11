<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%
    var tipo = (int) ViewData["tipo"];
    bool bolEducador = (bool)ViewData["bolEducador"];
   // Response.Write(tipo + " papel: " + ViewData["papel"]);
 %>
 <script>
     jQuery(function ($) {
         $(".dialogo.agendaPersonalizada").seletorAVA({ 'turma': true });
     });
     
 </script>
<form id="frmAgenda" name="frmAgenda" method="post" onsubmit="validarEdicaoAgenda(); return false;">
    <div class="botoes_criarEventoAgenda">
        <div class="titulo">Criar evento</div>
        
    </div>      
    <div class="form_input"><input type="text" id="txtDescricao" maxlength="100" name="txtDescricao" size="30" placeHolder="Sem Título"/></div>
    <div class="form_input" style="display:none;" id="idStrUrlEvento"><input type="text" id="strUrlEvento" name="strUrlEvento" size="30" placeHolder="Url do Evento" /></div>
    <div class="form_input">
        <label for="dtmInicio" generated="true" class="error" style="display: none; font-size:9px;">Preencha a data inicial</label>
        <label for="horaInicio" generated="true" class="error" style="display: none; font-size:9px;">Preencha a hora inicial</label>
        De: <input type="text" class="input_data" size="8" id="dtmInicio" name="dtmInicio" placeholder="  /  /" />
        <input type="text" class="input_hora" size="6" id="horaInicio" name="horaInicio" placeholder="   :" />        
        <br /><br />
        <label for="dtmFim" generated="true" class="error" style="display: none; font-size:9px;">Preencha a data final</label>
        <label for="horaFim" generated="true" class="error" style="display: none; font-size:9px;">Preencha a data final</label>
        até: <input type="text" class="input_data" size="8" id="dtmFim" name="dtmFim" placeholder="  /  /" />  
        <input type="text" class="input_hora" size="6" id="horaFim" name="horaFim" placeholder="   :" />                        
        <input type="hidden" id="idEvento" value="0"/>
        <input type="hidden" id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy") %>" /><br />
        <%
            if (tipo == 1)
            {
                %>
                <input type="radio" name="radioAgenda" value="2" id="agendaEscola" class="checkAgenda" /><label for="agendaEscola">Escola</label><br />
                <input type="radio" name="radioAgenda" value="1" id="agendaUsuario" class="checkAgenda" checked="checked" /><label for="agendaUsuario">Você</label>
                <%
            }
            else if (tipo == 2)
            {
                %>
                <input type="radio" name="radioAgenda" value="3" id="agendaPortal" class="checkAgenda" /><label for="agendaPortal">Educacional</label><br />
                <input type="radio" name="radioAgenda" value="1" id="agendaUsuario" class="checkAgenda" checked="checked"/><label for="agendaUsuario">Você</label>
                <%
            }
            else if (tipo == 3)
            {
                %>
                <input type="radio" name="radioAgenda" value="3" id="agendaPortal" class="checkAgenda" /><label for="agendaPortal">Educacional</label><br />
                <input type="radio" name="radioAgenda" value="2" id="agendaEscola" class="checkAgenda" /><label for="agendaEscola">Escola</label><br />
                <input type="radio" name="radioAgenda" value="1" id="agendaUsuario" class="checkAgenda" checked="checked"/><label for="agendaUsuario">Você</label>
                <%
            }
            %><p>Para:
            <%
            if (bolEducador)
            {
                if (tipo == 0)
                {
                    %>
                    <input type="radio" name="radioAgenda" value="1" id="agendaUsuario" class="checkAgenda" checked="checked"/><label for="agendaUsuario">Você</label>
                    <%
                }
                %>
                <input type="radio" name="radioAgenda" value="4" id="agendaTurma" class="checkAgenda" /><label for="agendaTurma">Turmas</label></p>
                <section class="dialogo clearfix agendaPersonalizada" style="display: none;">
            
                    <div class="compartilhamento" style="">
                        <ul>
                        <li></li>
                        <li class="campo-busca" style="display:none;"><input type="text" style="font-family:arial;border:solid 1px #E19000;height:12px;margin:0 5px 0 1px;color:#E19000;font-size:11px;display:none;" id="busca_especifico"></li>
                    
                        <li class="todos">
                            <a class="small awesome awesome-color" href="#" style="cursor: default; ">Todos </a><a class="small-x awesome-x awesome-x-color" href="#">x</a>
                        </li>
                        <li><a class="troca_persona invert" href="#">Selecionar </a></li> 
                        </ul>

                    </div>
             
                    <div class="selecao_personas" style="display:none;">
                        <ul>
                            <li class="p_bg p_dica discreto">Digite ou selecione grupos e pessoas</li>
                            <li class="" style="text-align:center;margin:10px 0"><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></li>
                        </ul>
                    </div>
             
             
                 </section>
                <%
            }
             %>
             
                <!-- <div class="gostei_compartilhando" style="">
                    <section class="dialogoAgenda clearfix"> 
                        <div class="compartilhamento">
                            <input type="hidden" name="txtInput" id="txtInput" value="">
                            
                            <ul>
                                <li>Compartilhe com: </li>
                                <li style="display: none;" class="campo-busca">
	                                <input type="text" id="busca_especifico" style="font-family: arial; border: 1px solid rgb(225, 144, 0); height: 12px; margin: 0pt 5px 0pt 1px; color: rgb(225, 144, 0); font-size: 11px;">
                                </li>
                                <li class="todos">
	                                <a href="#" class="small awesome awesome-color">Todos </a><a href="#" class="small-x awesome-x awesome-x-color">x</a>
                                </li>
                                <li><a href="#" class="troca_persona invert">Alterar </a></li>
                            </ul>
                        </div>
                        <div class="bt_geral">
                            <input type="submit" class="" value="compartilhar" id="compartilhar" name="compartilhar">
                        </div>
                        <div class="selecao_personas"> 
                            <ul>
                                <li class="p_bg p_dica discreto">Digite ou selecione grupos e pessoas</li>
                            </ul>
                        </div>
                    </section>
                </div>-->
             <div class="bts_agenda agd_salvar bt_geral">
                 <input type="button" value="cancelar" class="red_input" onclick="cancelarEditAgenda();"> 
                 <!--<a href="javascript:void(0);" onclick="cancelarEditAgenda();" class="bt_geral red">Cancelar</a> -->
                 <input type="submit" value="salvar" />
             </div>
        <!--<div class="agd_salvar bt_geral" id="salvar_eventoAgenda">
        <input type="button" value="Cancelar" onclick="cancelarEditAgenda();" /><input type="submit" value="salvar" /></div>-->
    </div>   
</form>


