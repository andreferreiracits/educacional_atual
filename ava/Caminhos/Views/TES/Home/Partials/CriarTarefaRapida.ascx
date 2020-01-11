<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<div class="atividades_box">
    <input type="hidden" id="idCaminho" value="" />
    <input type="hidden" id="idEtapa" value="" />
    <input type="hidden" id="idRecursoEtapa" value="" />
    <input type="hidden" id="dtmAtualServidor" value="<%=DateTime.Now.ToString("dd/MM/yyyy hh:mm")%>" />

    <input id="strTituloTarefa" type="text" title="Título da Tarefa" name="dialogo" placeholder="Título da Tarefa" class="atividades_field ph" maxlength="200">
    <textarea id="txtDescricaoTarefa" title="Oriente seus alunos em como resolver esta tarefa" name="dialogo" placeholder="Oriente seus alunos em como resolver esta tarefa" rows="6" cols="6" autocomplete="off" class="atividades_field ph" maxlength="2000"></textarea>
    
    <div class="ab_bts">
         <% 
             
            
            bool mostraRecurso = true;
            //Se for AvaPuro e Não puder ver avaliações....
            if (Convert.ToBoolean(ViewData["bolAVAPuro"]) ) {
                    mostraRecurso = false;
            }
            if (mostraRecurso)
            {
                %>
                <a href="javascript:void(0);" id="abreListaRecursoTarefa" onclick="abreListaRecurso()" class="bt_normal tooltip_title" title="Inserir recurso"><i class="recurso_icon"></i>Inserir recurso</a>
                <%
            }
        %>
        <a href="javascript:void(0);" id="inserirMidiaTarefa" class="bt_normal tooltip_title" title="Inserir vídeo" onclick="abrirMidiaTarefa()"><i class="midia_icon"></i></a>
        
        <a id="abreUploadTarefa" href="javascript:void(0);" onclick="abreUploadTarefa()" class="bt_normal tooltip_title teste" title="Inserir material de apoio"><i class="mapoio_icon"></i></a>

        <div id="previewImagemTumaTarefa" class="preview_upload_post preview_anx_post"  style="display:none;">
            <iframe name="Upload_frame" id="Upload_frame" style="width: 100%; height: 100%; border:0;">
            </iframe>
        </div>
                
        <a href="javascript:void(0);" class="bt_normal tooltip_title" title="Inserir links" onclick="abrirLinkTarefa()"><i class="links_icon"></i></a>
        
        <%
            if ((Convert.ToInt32(ViewData["intTipoPortal"]) == 4 || Convert.ToInt32(ViewData["intTipoPortal"]) == 8 || Convert.ToInt32(ViewData["intTipoPortal"]) == 16) && !((bool) ViewData["bolAVAPuro"]))
        {
            %>
            <!-- <a href="javascript:void(0);" class="bt_normal tooltip_title" title="Inserir código do livro" onclick="abreCodigo()"><i class="codlip_icon"></i></a>     -->
            <%
        }
        %>
        
        <span class="seraavaliada">
            <input type="checkbox" value="" id="valeNota"><label for="valeNota"> Será Avaliada?</label> <input type="text" title="Valor" placeholder="Valor" class="ipt_valor ph" id="intValorTarefa" disabled="disabled">
        </span>
    </div>
</div>

<div id="container_empilhaextras">
    
</div>

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

<div class="atividades_extra">
    <span class="periodo_t">Período:</span>            
    
    <input type="text" placeholder="<%=dia%>/<%=mes%>/<%=ano%>" value="<%=dia%>/<%=mes%>/<%=ano%>" size="10" id="dataInicio" class="inputs_tarefas lebig" readonly="readonly">
    <input type="text" placeholder="<%=horaInicio%>" value="<%=horaInicio%>" size="9" id="horaInicio" class="inputs_tarefas lesmall">
    até
    <input type="text" placeholder="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" value="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" size="10" id="dataFim" class="inputs_tarefas lebig" readonly="readonly">
    <input type="text" placeholder="<%=horaFim%>" value="<%=horaFim%>" size="9" id="horaFim" class="inputs_tarefas lesmall">
    
    <span class="entrega_check">
        <input type="checkbox" id="entrega_tarefa"><label for="entrega_tarefa">
        <i class="ep_status arq_enviado_on"></i> Solicitar entrega de trabalho? </label>
    </span>

    <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />
    <input type="hidden" id="idAvaliacao" value="0" />
</div>

<a href="javascript: void(0);" id="btAbreLightBoxTarefa"></a>
<a href="javascript: void(0);" id="btEscondidoTarefa"></a>

<script type="text/javascript">
$(document).ready(function(){
    $("#dataInicio").setMask("date");
    $("#dataFim").setMask("date");
    $("#horaInicio").setMask("29:59").timepicker({
        myPosition: "right top",
        atPosition: "right bottom"
    });
    $("#horaFim").setMask("29:59").timepicker({
        myPosition: "right top",
        atPosition: "right bottom"
    });
    montaCampoData("#dataInicio", "#dataFim");

    $("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function () {
        $(this).removeClass("ava_field_alert")
    });
});
</script>

