<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<div class="ava_lightheader">
    <h2 class="blokletters">Agendamento da tarefa "<%=Model.titulo%>"</h2>
</div><!--ava_lightheader-->

<div class="ava_lightcontainer">

    <section class="dialogo clearfix">
        <div class="ava_agendamento">          
            
            <p></p><h5>Agendado para :</h5> 
           
            <div class="compartilhamento_cenario">
                <ul id="htmlPersonaRapido">      
                    <% 
                    if (Model.bolTarefaGrupo)
                    {
                        %>
                        <li>Todos os alunos da turma</li>    
                        <%
                    }
                    %>
                </ul>
            </div>        
            
            <p></p>
            
            <!-- <h5>Período</h5>
            <input type="text" placeholder="<%=ViewData["dataInicio"]%>" size="10" disabled="" class="ph" value="<%=ViewData["dataInicio"]%>">
            <input type="text" placeholder="<%=ViewData["horaInicio"]%>" size="10" disabled="" class="ph" value="<%=ViewData["horaInicio"]%>">
            até
            <input type="text" placeholder="<%=ViewData["dataFim"]%>" size="10" disabled="" class="ph" value="<%=ViewData["dataFim"]%>">
            <input type="text" placeholder="<%=ViewData["horaFim"]%>" size="10" disabled="" class="ph" value="<%=ViewData["horaFim"]%>"> -->
            
            <div class="simula_mural clearfix">
                <% 
                if (Model.bolTarefaGrupo)
                {
                    %>
                    <p>Pré-visualização da mensagem que será enviada para a turma: </p>
                    <% 
                }
                else
                {
                    %>
                    <p>Pré-visualização da mensagem que será enviada para seus alunos: </p>
                    <% 
                }
                %>
                
                <img height="55" width="55" src="<%=ViewData["strFoto"]%>">
                
                <div class="embrulho">
                    <p><span><strong><a class="invert"><%=ViewData["nomeUsuario"]%></a></strong></span></p>
               		
                    <img src="/AVA/StaticContent/Common/img/geral/tarefa_55.jpg">
                    <div class="embrulho">
                        <strong>Tarefa</strong>
                        <p>
                            <br/>
                            <textarea class="ph" id="strComplementoRapido" placeholder="Digite uma descrição para sua publicação..." cols="150" name=""></textarea>
                        </p>
                        <p><b><span id="txtTitulo" class="nome_tarefa"><%=Model.titulo%>. </span></b>
                            <br>
                            <span id="txtDisponivel">Disponí­vel de <%=ViewData["dataInicio"]%> <%=ViewData["horaInicio"]%> até <%=ViewData["dataFim"]%> <%=ViewData["horaFim"]%></span></p>
					   <input id="txtInput" value="" type="hidden" />
                    </div>
                </div>
            </div>
            <div id="container_btnConcluirAgendamentoRapido" style="float: right">            
                <a class="large awesome awesome-color " style="cursor: pointer;" id="A1" onclick="concluirAgendamentoTarefaRapidaMural()"><span></span>Enviar Agendamento</a>
            </div>
            <div class="fl">
                <a class="large awesome awesome-red" style="cursor: pointer;" id="btnCancelarAgendamentoRapido"><span></span>Cancelar</a>
            </div>  
            
        </div>
            
    </section>
    
</div><!--ava_lightcontainer-->

