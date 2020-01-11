<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>
<script type="text/javascript">
    $(function () {
        $('.dialogo').seletorAVA();
        $('#horaInicio,#horaFim').setMask('99:99')
    })
</script>

<form id="frmAgendamento" method="post">
    <input type="hidden" id="dtmAtualServidor" value="<%=DateTime.Now.ToString("dd/MM/yyyy hh:mm")%>" />
    <input type="hidden" id="idAgendamento" value="<%=Model.id %>" />
    <h2>Agendamento <%=Model.totalAgendamento%> para o Caminho "<%=Model.titulo%>"</h2>
    
    <section class="dialogo clearfix">
        
        <div class="compartilhamento">
            <ul>
                <li>Agendar para : <!--&#9660;--> </li>
                <li><div id="seletorTarefa"></div></li>
                <!--<li style="display:none;" class="campo-busca"><input type="text" class="busca_especifico" style="font-family:arial;border:solid 1px #E19000;height:12px;margin:0 5px 0 1px;color:#E19000;font-size:11px;display:none;" /></li>
                
                <li class="todos">
                    <a href="#" class="small awesome awesome-color">Todos </a><a href="#" class="small-x awesome-x awesome-x-color">x</a>
                </li>
                <li><a href="#" class="troca_persona invert">Alterar </a></li>-->
            </ul>
        </div>
          
        <!--<div style="display: none;" class="selecao_personas">
             <ul>
                <li class="p_bg p_dica discreto">Selecione grupos e pessoas</li>
                <li style="text-align:center;margin:10px 0" class=""><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></li>
            </ul>        
        </div>-->
    </section>

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
    <input type="text" size="8" id="dataInicio" value="<%=dia%>/<%=mes%>/<%=ano%>" class="ph input_data" placeHolder="<%=dia%>/<%=mes%>/<%=ano%>"/>
    <input type="text" size="3" id="horaInicio" value="<%=horaInicio%>" class="ph" placeHolder="<%=horaInicio%>"/>
    até
    <input type="text" size="8" id="dataFim" value="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" class="ph input_data" placeHolder="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>"/>
    <input type="text" size="3" id="horaFim" value="<%=horaFim%>" class="ph" placeHolder="<%=horaFim%>"/>
        
    <div class="simula_mural clearfix">
        Pré-visualização da mensagem que será enviada para seus alunos:
        
        <p></p>
        
        <img src="/ava/staticcontent/common/img/perfil/caminhos_padrao.jpg" width="80" height="80">

        <strong>Caminhos de aprendizagem</strong>
        <p id="txtTitulo"><%=Model.titulo%>. Disponível de <span id="dInicio"><%=dia%>/<%=mes%>/<%=ano%> <%=horaInicio%></span> até <span id="dFim"><%=diaFim%>/<%=mesFim%>/<%=anoFim%> <%=horaFim%></span></p>
        <p>
            <textarea class="sombra_form" onkeypress="limiteCaracter(this, 'strComplementoAgendamento')" id="strComplementoAgendamento"></textarea>            
        </p>

        <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />
        <input id="txtInput" value="" type="hidden" />
    </div>

    <div id="btnsAreaAgendamento">
        <div id="btCancelarAgendamentoSpan">
            <a class="large awesome c-cancelar " onclick="cancelarAgendamento();" href="javascript: void(0)"><span class="awe_icons"></span>Cancelar</a>
        </div>
        <div id="btConcluirAgendamentoSpan" style="float: right">
            <a class="large awesome awesome-color " href="javascript:void(0);" onclick="concluirAgendamento(0,<%=Model.id %>);" id="btnConcluirAgendamento"><span></span>Agendar</a> 
        </div>   
    </div>

</form>

