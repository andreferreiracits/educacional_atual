<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<%
    
    if (Request.Browser.Browser.ToLower().Contains("ie") && Convert.ToInt32(Request.Browser.Version.Substring(0, 1)) < 9)
        Response.Write("<div>");

    //Response.Write(Convert.ToBoolean(Request.Browser.Browser.ToLower().Contains("ie")) + " && " + Convert.ToInt32(Request.Browser.Version.Substring(0, 1)));
%>
<div class="ava_lightheader">
    <h2 class="blokletters">Agendamento da tarefa "<%=Model.titulo%>"</h2>
</div><!--ava_lightheader-->

<div class="ava_lightcontainer">

    <section class="dialogo clearfix">
        <div class="ava_agendamento">          
            
            <p></p><h5>Agendando para :</h5> 
           
            <div class="compartilhamento_cenario">
                <ul>      
                    <%=ViewData["htmlPersona"]%>                     
                </ul>
            </div>        
            
            <p></p>

            <% 
            string dia = DateTime.Now.Day.ToString().PadLeft(2,'0');
            string mes = DateTime.Now.Month.ToString().PadLeft(2,'0');
            int ano = DateTime.Now.Year;
            

            DateTime diaFimAux = DateTime.Now.AddDays(7);

            string diaFim = diaFimAux.Day.ToString().PadLeft(2, '0');
            string mesFim = diaFimAux.Month.ToString().PadLeft(2, '0');
            string anoFim = diaFimAux.Year.ToString().PadLeft(2, '0');
            
            string horaInicio = (DateTime.Now.Hour + 1).ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0');
            string horaFim = DateTime.Now.Hour.ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0');
            
            %>
            
            <h5>Período</h5>
            <input type="text" size="8" id="dataInicio" value="<%=dia + "/" + mes + "/" + ano%>" readonly="true" class="ph input_data" placeHolder="<%=dia%>/<%=mes%>/<%=ano%>"/>
            <input type="text" size="3" id="horaInicio" value="<%=horaInicio%>" class="ph" placeHolder="<%=horaInicio%>"/>
            até
            <input type="text" size="8" id="dataFim" value="<%=diaFim + "/" + mesFim + "/" + anoFim%>" readonly="true" class="ph input_data" placeHolder="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>"/>
            <input type="text" size="3" id="horaFim" value="<%=horaFim%>" class="ph" placeHolder="<%=horaFim%>"/>
            <input id="currentDay" value="<%=DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />

            <div class="simula_mural clearfix">
                <p>Pré-visualização da mensagem que será enviada para seus alunos: </p>
                
                <img height="55" width="55" src="<%=ViewData["strFoto"]%>">
                
                <div class="embrulho">
                    <p><span><strong><a class="invert"><%=ViewData["nomeUsuario"]%></a></strong></span></p>
               		
                    <img src="/ava/staticContent/Common/img/perfil/tarefa_padrao_33_33.jpg">
                    <div class="embrulho">
                        <strong>Tarefa</strong>
                        <p><textarea class="ph" id="strComplementoRapido" placeholder="" cols="50" name=""></textarea></p>
                        <p><span id="txtTitulo" class="nome_tarefa"><%=Model.titulo%>.</span> <span id="txtDisponivel"> Disponí­vel de <span id="dInicio"><%=dia%>/<%=mes%>/<%=ano%> <%=horaInicio%></span> até <span id="dFim"><%=diaFim%>/<%=mesFim%>/<%=anoFim%> <%=horaFim%></span></p>
					    <input id="txtInput" value="" type="hidden" />
                    </div>
                </div>
            </div>
            
            
            
            <div id="container_btnConcluirAgendamentoRapido" style="float: right">            
                <a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoRapidoAvancado()"><span></span>Agendar</a>
            </div>
            <div class="fl">
                <a class="large awesome awesome-red" style="cursor: pointer;" id="btnCancelarAgendamentoRapido"><span></span>Cancelar</a>
            </div>  
            
        </div>
            
    </section>

</div><!--ava_lightcontainer-->