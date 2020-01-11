<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<form id="frmMensagemRapida" class="form_tarefa">
    <%
        var bolCoordenador =  ViewData["bolCoordenador"];
    %>

    <input type="hidden" id="idCaminho" value="" />
    <input type="hidden" id="idEtapa" value="" />
    <input type="hidden" id="idRecursoEtapa" value="" />
    <input type="hidden" id="dtmAtualServidor" value="<%=DateTime.Now.ToString("dd/MM/yyyy HH:mm")%>" />
    <input type="hidden" id="bolCoordenador" value="<%=bolCoordenador%>"/>
   

	<input id="strTituloTarefa" type="text" title="T&iacute;tulo da Tarefa" name="dialogo" placeholder="T&iacute;tulo da Tarefa" class="tarefa_titulo" maxlength="100">
    <textarea id="txtDescricaoTarefa" title="Oriente seus alunos em como resolver esta tarefa" name="dialogo" placeholder="Oriente seus alunos em como resolver esta tarefa" rows="3" cols="40" autocomplete="off" class="tarefa_detalhes"></textarea>
	
    <div class="tarefa_opcoes">

		<div class="tarefa_midias">
			<a href="javascript:void(0);" id="clickListaRecurso" onclick="abreListaRecurso()" class="trf_midia trf_recurso tooltip_title" title="Inserir recurso"></a>
			<a href="javascript:void(0);" id="clickMidiaTarefa" onclick="abrirMidiaTarefa()" class="trf_midia trf_video tooltip_title" title="Inserir v&iacute;deo"></a> 
			<a href="javascript:void(0);" id="clickUploadTarefa" onclick="abreUploadTarefa()" class="trf_midia trf_material tooltip_title" title="Inserir material de apoio"></a>
			<a href="javascript:void(0);" id="clickLinkTarefa" onclick="abrirLinkTarefa()" class="trf_midia trf_links tooltip_title" title="Inserir links"></a>
			
            <%
                if ((Convert.ToInt32(ViewData["intTipoPortal"]) == 4 || Convert.ToInt32(ViewData["intTipoPortal"]) == 8 || Convert.ToInt32(ViewData["intTipoPortal"]) == 16) && !((bool) ViewData["bolAVAPuro"]))
                {
                %>
                    <!-- <a href="javascript:void(0);" id="clickInserirCodigo" onclick="abreCodigo()" class="trf_midia trf_livro tooltip_title" title="Inserir c&oacute;digo"></a> -->
                <%
                }
            %>

            <div id="previewImagemMural" class="preview_img_post preview_anx_post" 
                style="display:none; width: 400px; height: 550px; overflow: hidden;">
                <iframe name="upload" id="upload_mural" style="width: 100%; height: 100%; border:0;">
                </iframe>
            </div>
          
		</div>

		<span class="tarefa_peso">
			<span class="seletor_valor">
				<label class="custom check " id="valeNota"></label>
			</span>
			<input type="text" title="Valor" placeholder="Valor" class="tarefa_valor" maxlength="5" id="intValorTarefa" disabled>
		</span>

		<span class="tarefa_entrega">
			<label class="custom check" id="trf_devolutiva">
				<div class="trf_devolutiva">Solicitar entrega de trabalho?</div>
			</label>
		</span>

	</div>

</form>

<!-- Anexos da tarefa -->
<div class="tarefa_anexos" id="anexosTarefa">

	<!-- Inserir v�deo -->
	<div id="tarefaInserirVideo" class="inserir_midia inserir_video" style="display: none;">
		<input id="tarefaLinkVideo" type="text" name="dialogo" placeholder="Insira o endere&ccedil;o URL" class="tarefa_video">
		<a href="javascript:void(0);" onclick="inserirMidiaTarefa()" class="btn_acao inserir">Inserir</a>
		<span class="observacao">Digite ou cole uma URL de v&iacute;deo YouTube, Vimeo ou Globo.</span>
	</div>

	<!-- Inserir link -->
	<div id="tarefaInserirLink" class="inserir_midia inserir_link" style="display: none;">
		<input type="text" id="strTituloLink" name="dialogo" placeholder="T&iacute;tulo do Link" class="tarefa_link">
		<input type="text" id="strLinkApoio" name="dialogo" placeholder="Insira a URL" class="tarefa_link">
		<a href="javascript:void(0);" onclick="inserirLinkTarefa()" class="btn_acao inserir">Inserir</a>
	</div>

</div>

<!-- Preview dos anexos -->
<div class="tarefa_anexos_preview" id="previewAnexosTarefa">
	
	
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

<div class="tarefa_agendamento">
    <div class="tarefa_extras">
        <span class="periodo_t">Per&iacute;odo:</span>            
    
        <input type="text" placeholder="<%=dia%>/<%=mes%>/<%=ano%>" value="<%=dia%>/<%=mes%>/<%=ano%>" size="10" id="dataInicio" class="trf_agenda_data" readonly="readonly">
        <input type="text" placeholder="<%=horaInicio%>" value="<%=horaInicio%>" size="9" id="horaInicio" class="trf_agenda_hora">
        at&eacute;
        <input type="text" placeholder="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" value="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" size="10" id="dataFim" class=" trf_agenda_data" readonly="readonly">
        <input type="text" placeholder="<%=horaFim%>" value="<%=horaFim%>" size="9" id="horaFim" class=" trf_agenda_hora">
    
        <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />
        <input type="hidden" id="idAvaliacao" value="0" />
    </div>

    <a href="javascript: void(0);" id="btAbreLightBoxTarefa"></a>
    <a href="javascript: void(0);" id="btEscondidoTarefa"></a>
	
	<div id="seletorMuralTarefa" class="seletor_compartilhamento" style="display: none;"></div>
	
	<div class="tarefa_acoes" style="display:;">

        <div class="left" id="filtros_categoria">
			<span class="postar_assunto fontello"></span>
			<span class="bootstrap">
				
                
                <div class="btn-group">                
                    <div class="bootstrap" id="id_materia_turma"></div>                       
                </div>
                
			</span>
		</div> 


		<div class="btn_acoes right">
			<input href="#PreVisualizacao" type="button" id="PreVisualizarPublicacao" value="Pre-visualizar" class="cancelar" style="display:;">
			<!--input type="button" name="agendar" id="agendar" value="Agendar" class="agendar" style="display:;" onClick="agendarTarefa();"-->			
			<input type="button" id="btn-agendar" value="Agendar" class="agendar" style="display:;" onClick="agendarTarefaMuralTurma();">
            <button id="btn-agendando" style="display:none;" class="btn-default agendar" ><img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...</button>
		</div>
	</div>
	
	<!-- Feedback -->
    <p id="feed_erro_tarefa" style="display:none;" class="feed_erro">Selecione alunos para o agendamento.</p>
    <p id="feedErroTituloTarefa" style="display:none;" class="feed_erro">Insira um t&iacute;tulo em sua tarefa.</p>

	

<div id="PreVisualizacao" style="display:none;width:100%;">
	<div class="ava_lightheader">
    <h2 class="blokletters" >Pré-visualiza&ccedil;&atilde;o da mensagem que ser&aacute; enviada</h2>
</div>

<div class="ava_lightcontainer">

    <section class="dialogo clearfix">
        <div class="ava_agendamento">
            
            <p></p>
			
            <div class="simula_mural clearfix">    
                <div class="embrulho">
					<img height="55" width="55" id="#visFoto" src="/userData/ava/repositorio/1006/1006840/Imagens/minithumb/fluffycats22_201522714232720163120476_170.jpg">
                    <p><span><strong><a class="invert" id="visNome" ></a></strong></span></p>
               		
                    <img src="/AVA/StaticContent/Common/img/geral/tarefa_55.jpg">
                    <div class="embrulho">
                        <strong>Tarefa</strong>
                        <p><p class="ph" id="visDescricaoTarefa" ></p></p>
                        <p><strong><span id="visTitulo" class="nome_tarefa"></span></strong></p>
						<p><span id="visDisponivel"></span></p>
					   
                    </div>
                </div>
            </div>
            
        </div>
            
    </section>
    
</div>


</div>

</div>