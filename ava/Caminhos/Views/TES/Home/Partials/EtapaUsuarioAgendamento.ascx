<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.CaminhoUsuarioAgendamento>" %>

<%
int idCaminho = Model.caminho.id;
string strCaminho = Model.caminho.titulo;
string strNomeAluno = Model.strNome;
string strFotoAluno = Model.strFoto;
string strTurma = Model.strTurmaAtual;
int totalEtapasUsuario = Model.lEtapaUsuario.Count;
double intSomaEtapaFinal = 0.0;
double dblPorcentagemEtapa = 0.0;
double dblPorcentagemEtapaFinal = 0.0;
double intValorTotal = 0.0;
double totalFeito = (Model.intTotalEtapasConcluida*100) / totalEtapasUsuario;
int totalUsuarios = Model.lUsuarioAgendamento.Count;
int idRotaAgendamento = Convert.ToInt32(ViewData["idRotaAgendamento"]);


int idAluno = Convert.ToInt32(ViewData["idAluno"]);

%>
      
     

      
<tr class="table_aberta">
    <td>
     <script>
        arrayNotas = [];
        porMax = 0 ;
      </script>

        <div class="ta_desc_corr">
            <%
            if (totalUsuarios > 1)
            {
                %>
                <a href="javascript: void(0);" id="btPrevAluno" class="bt_normal" onclick="prev(<%=idRotaAgendamento%>);">« Anterior</a> -----
                <a href="javascript: void(0);" id="btNextAluno" class="bt_normal" onclick="next(<%=idRotaAgendamento%>);">Próximo »</a>    
                <%     
            }
            %>
            <hr></hr>
            <img src="<%=strFotoAluno%>" width="170" height="170">
            <h4 class="blokletters"><%=strNomeAluno%></h4>
            <p class="blokletters"><%=strTurma%></p>
                        
            <p><%=totalFeito%>% concluído</p>
            
            <div id="progressbar_aluno" class="prog_holder">
                <script type="text/javascript">
                    montaProgessBar(<%=totalFeito%>, 'aluno')
                </script>
            </div>      
            <hr/>
            <input type="hidden" id="idRotaAgendamento" value="<%=idRotaAgendamento%>" />
            <input type="hidden" id="idRotaAgendamentoSalvar" value="<%=idRotaAgendamento%>" />

            <input type="hidden" id="idAluno" value="<%=idAluno%>" />
        </div>
</td><td>
        <div class="ta_etapas_corr">
            <div class="leg_notas leg_top"> 
                <span class="first">Nota máx.</span>
                <span class="">notas</span>
                <span class="actionn">Ações</span>
            </div>       
            <% 
            if (totalEtapasUsuario > 0)
            {
            %>
                <div id="container_etapas" class="container_etapas_G">
                    <%
                    foreach (var etapa in Model.lEtapaUsuario)
                    {                        
                        intValorTotal += etapa.intValor;                           
                    }
                                    
                    int cont = 0; 
                    foreach (var etapa in Model.lEtapaUsuario)
                    {
                        int idAgendamentoAvaliacao = etapa.idAgendamentoAvaliacao;
                        
                        cont++;
                        string strEtapa = "Etapa sem título";
                        if (etapa.strEtapa.Length > 0)
                        {
                            strEtapa = etapa.strEtapa;
                        }
                        string strRecurso = etapa.strRecurso;

                        string strTituloRecurso = "";
                        if (!etapa.strRecurso.ToLower().Equals("avaliações"))
                        {
                            strTituloRecurso = etapa.strTituloRecurso;
                        }
                        
                        double intValor = etapa.intValor;
                        double intNotaFinal = etapa.intNotaFinal;

                        intSomaEtapaFinal += intNotaFinal;

                        

                        /*double intPorcentagemEtapa = 0.0;
                        double intPorcentagemAtingida = 0.0;

                        if (intValor > 0)
                        {
                            intPorcentagemEtapa = (double)(intValor * 100) / intValorTotal;
                            intPorcentagemAtingida = (double)(intNotaFinal * 100) / intValorTotal;
                        }
                        
                        dblPorcentagemEtapa += intPorcentagemEtapa;
                        dblPorcentagemEtapaFinal += intPorcentagemAtingida;*/
                        %>


                         <script>
                            arrayNotas.push(<%=etapa.idEtapa%>);
                            console.log(<%= intNotaFinal %>);
                        </script>

                        <div class="container_ep_corr_prof">
                            <div class="fixnumeros">
                                <ul class="etapa_numeros">                                
                                    <li><h3><%=cont%></h3></li>
                                </ul>
                            </div>
                        
                            <ul class="arrastaveis clearfix">
                                <li class="e-a-box" intOrdem="<%=cont%>">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_etapas">
                                        <tr>
                                            <td width="47%" class="e-titulo"><h6><%=strEtapa.ToUpper()%></h6></td>
                                            <td width="30%" class="e-recurso">
                                                <span><%=strRecurso%></span>
                                                <p><%=strTituloRecurso%></p>
                                            </td>
                                            <td width="12%" class="e-notas">
                                                <%
                                                if (intValor > 0)
                                                {  
                                                %>
                                                    <span class="grade" id="notamaxima_<%=etapa.idEtapa%>"><%=intValor%></span>
                                                    <p class="discreto">&nbsp;</p>     
                                                    
                                                <%   
                                                }
                                                else
                                                {
                                                    %>
                                                    <span class="grade"><p id="idNotaMaxima">--</p></span>
                                                    <p class="discreto">&nbsp;</p>
                                                    

                                                    <%
                                                }
                                                %>
                                            </td>
                                            <td width="11%" class="e-notas" id="tdnotas_<%=etapa.idEtapa%>">
                                                <% 
                                                

                                                if (intValor > 0)
                                                {
                                                    
                                                    
                                                    if (etapa.bolFez && !Model.caminho.intStatus.Equals(1))
                                                    {

                                                       
                                                        if (etapa.bolEnvioArquivo)
                                                        {

                                                       
                                                            string strNota = etapa.intNotaFinal.ToString();
                                                            /*if (strNota == "0")
                                                            {
                                                                strNota = "";
                                                            }*/
                                                            %>
                                                                <span class="grade"><input type="text" id="nota_<%=etapa.idEtapa%>" value="<%=strNota%>" class="menor_form notaEtapaAluno" maxlength="6" /></span>
                                                            <%
                                                        }
                                                        else if(etapa.bolAvaliacaoDiscursiva)
                                                        {
                                                            
                                                            //se avaliação já foi corrigida, mostra nota, senão mostra botão para corrigir
                                                            if (etapa.bolAvaliacaoCorrigida)
                                                            {
                                                                %>
                                                                <span class="grade"><%=intNotaFinal%></span>
                                                                <span class="grade" id="containerbotaocorrigir_<%=etapa.idEtapa%>"><a href="javascript: void(0)" onclick="abreAvaliacao(<%=idAgendamentoAvaliacao%>, <%=idAluno%>, <%=etapa.idEtapa%>, <%=idRotaAgendamento%>)" class="bt_normal">alterar</a></span>     
                                                                <%
                                                            }
                                                            else
                                                            {
                                                                %>
                                                                <span class="grade" id="containerbotaocorrigir_<%=etapa.idEtapa%>"><a href="javascript: void(0)" onclick="abreAvaliacao(<%=idAgendamentoAvaliacao%>, <%=idAluno%>, <%=etapa.idEtapa%>, <%=idRotaAgendamento%>)" class="bt_normal">corrigir</a></span>
                                                                <%  
                                                            }
                                                            
                                                        }
                                                        else if (strRecurso.ToLower() == "avaliações")
                                                        {
                                                            %>
                                                            <span class="grade"><%=intNotaFinal%></span>
                                                            <p class="discreto">&nbsp;</p>     
                                                    

                                                            <%
                                                        }
                                                        else
                                                        {
                                                            %>
                                                            <%-- <span class="grade"><img height="20" width="18" src="/ava/staticContent/Common/img/perfil/etapa_seta.png"></span> --%>
                                                             <span id="nota_btn" class="grade"><%=intNotaFinal%></span>
                                                            <%    
                                                        }
                                                    }
                                                    else
                                                    {
                                                        %>
                                                        <span id="nota_btn" class="grade"><%=intNotaFinal%></span>
                                                        <p class="discreto">&nbsp;</p>
                                                   

                                                        <%
                                                    }
                                                }
                                                else
                                                {
                                                %>
                                                <!-- html que aparece na grade padrão -->
                                                <span id="nota_btn" class="grade"><%=intNotaFinal%></span>
                                                    <p class="discreto">&nbsp;</p>
                                                     
                                                <%
                                                }
                                                %>
                                            </td>


                                            <td style="text-align:center">
                                                    <span>
                                                               
                                                            <div id="btn_editar_div_<%=etapa.idEtapa%>">
                                                                <button class="btn_editar" id="btn_editar_<%=etapa.idEtapa%>" onclick="editNote(<%=etapa.idEtapa%>)"  >Editar</>
                                                                
                                                            </div>
                                                        </span>
                                            </td>

                                        </tr>                                          
                                    </table>
                                    <%
                                        if (etapa.dtmFimEtapaUsuario != DateTime.MinValue && etapa.bolFez)
                                        {
                                            %>
                                            <span style="float: right; margin-top: 10px; margin-right: 10px;">Concluida em: <%=etapa.dtmFimEtapaUsuario.ToString("dd/MM/yyyy HH:mm") %></span>
                                            <%
                                        }
                                    %>
                                    
                                </li>
                             </ul>
                             
                             <div class="ep_corr_prof">
                                <p><strong>Comentário:</strong></p>
                                <textarea  disabled="disabled"  name="" cols="" rows="" class="sombra_form comentarioEtapaAluno" id="coment_<%=etapa.idEtapa%>"><%=etapa.txtComentario %></textarea>
                                <%
                                    if (etapa.lLinkEntrega.Count > 0)
                                    {
                                        %>
                                        <hr />
                                        <p><strong>Arquivos enviados pelo aluno:</strong></p>
                                        <div class="container_inlinks">
                                            <% 
                                            foreach (var link in etapa.lLinkEntrega)
                                            {
                                                %>
                                                <div class="the_insertedLink">
                                                    <a class="umlink" href="<%=link.strLink%>" target="_blank"><span></span><%=link.strNomeLink%></a>                                                
                                                </div>
                                                <%
                                            }
                                            %>                                    
                                        </div>
                                    <% 
                                    }
                                %>
                             </div><!--ep_corr_prof-->              
                             
                        </div> <!---container_ep_corr_prof-->
                    <%}%>

                </div> <!--container_etapas-->

                <div class="leg_notas leg_bottom"> 
                    <span class="">Total:</span>
                    <span class=""><p id="notaFinalValorTotal"><%=intValorTotal%></p><div class="percent"><p id="notaFinalPorcEtapa">100%</p></div></span>

                    <span id="last_idNotaFinal" class="last"><p id="notaFinal"><%=intSomaEtapaFinal%></p><div class="percent"><p id="notaFinalPorc"></p></div></span>                         
                </div>
                <div class="save_corr" id="btSalvarAlteracao">
                    <a href="javascript:void(0);" onclick="salvarAlteracoesEtapaAluno();" class="ne-salvar large awesome awesome-green">Salvar alterações</a>
                </div>
            <%       
            } //totalEtapasUsuario >0
            %>                    
        </div><!--ta_etapas_corr-->  
                
    </td>
</tr>

<tr class="table_aberta">
    <td>                        
        <div class="ta_alunos ta_expande">
            <div class="ta_alunos_cb">
                <select class="sTurmas">
                    <%                        
                    foreach (var turma in Model.lTurmasAgendadas)
                    {
                        string strSelect = "";                            
                        if (turma.idTurma == Convert.ToInt32(ViewData["idTurma"]))
                        {
                            strSelect = "selected";                   
                        }
                        
                        if (turma.strTipoAgendamento == "turma")
                        {
                        %>                    
                            <option id="<%=turma.idTurma%>" <%=strSelect%>><%=turma.strTurma%></option>
                        <%
                        }
                        else
                        {
                        %>
                            <option id="<%=turma.idTurma%>" <%=strSelect%>><%=turma.strTurma%>(<%=turma.totalAlunoTurma%>)</option>
                        <%
                        }
                    }            
                %>
                </select>
            </div>
                
                           
            <div class="ta_alunos_container">  
                <div class="ta_alunos_legenda">
                    <p><span class="leg_green"></span>x% Completou</p>
                    <p><span class="leg_orange"></span>x% Iniciou</p>
                    <p><span class="leg_red"></span>x% Não iniciou</p>
                </div>
            </div>
        </div>                        
    </td>                   
</tr>  
    
    
<input type="hidden" id="idNota_last" />
<script>


     function somenteNumeros (evt) {
         /*console.log(num);
		var er = /[^0-9]/;
		er.lastIndex = 0;
		var campo = num;
		if (er.test(campo.value)) {
		campo.value = "";
		}*/

        var charCode = (evt.which) ? evt.which : event.keyCode
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;

	}


    function editNote(id){

        $('#coment_'+id).removeAttr("disabled");

        $('#btn_editar_div_'+id).html('');

        var value = $('#tdnotas_'+id).find('span').text();

        

        $('#tdnotas_'+id+' span').html('');
        $('#tdnotas_'+id+' span').html('<input type="text" id="nota_'+id+'" value="'+value+'" class="menor_form notaEtapaAluno" onkeypress="return somenteNumeros(event);" maxlength="6">');


        $('#btn_editar_div_'+id).html('<button class="btn_salvar" id="btn_salvar_'+id+'" onclick="Salvar('+id+','+value+')">Salvar<button/>');



    }

    
   
    function Salvar(idEtapa,value){

        var strComentario = '';

        var nFinalComparacao = $('#notaFinalValorTotal').text();

        var nFinal = 0;

        var notinha = 0;

        $.each( arrayNotas , function(ix, item){
                        
            notinha =  $('#nota_'+item).val() ;

            if( notinha == undefined  ){

                notinha = $('#tdnotas_'+item).find('span').text();
            
            }

            if( notinha == undefined  ){

                notinha = 0;
            }

            nFinal = nFinal + parseFloat( notinha );
                                            
        });

        //Compara se essa nota parcial é maior do que a máxima parcial.

        notinha =  $('#nota_'+idEtapa).val() ;
            if( notinha == undefined  ){
                notinha = $('#tdnotas_'+idEtapa).find('span').text();
            }

        var notinhaParcial = $('#notamaxima_'+idEtapa).text() ;


        console.log( "notinhaParcial " + notinhaParcial);


        if( notinhaParcial == undefined || notinhaParcial == "" ){
            notinhaParcial = 100 ;
            nFinalComparacao = 100;
        }

         
        console.log( "nFinal " + nFinal);



        console.log( "nFinalComparacao " + nFinalComparacao);



       // if(  notinha <= notinhaParcial  ){
            if( nFinal >= 0  ){
                nFinalComparacao = nFinalComparacao.replace(",",".");
                if( parseFloat(nFinal) <=  parseFloat(nFinalComparacao)  ){

                    var  nota = $('#nota_'+idEtapa).attr('value');

                    var  idRotaAgendamento = $('#idRotaAgendamentoSalvar').attr('value');
                    var  idAluno = $('#idAluno').attr('value');

                    strComentario =  $('#coment_'+idEtapa).val() ;

                    if( strComentario == '' || strComentario == undefined ){
                        strComentario = '';

                    }

                    $.ajax({
                            type    : "POST",
                            url     : "/AVA/Caminhos/Home/SalvarComentarioEtapaAluno",
                            data    : {
                                idAluno: idAluno,
                                idRotaAgendamento: idRotaAgendamento,
                                idEtapa: idEtapa,
                                nota: nota,
                                txtComentario:strComentario
                            },
                            dataType: "json",
                            error   : function (d) {
                                console.log("Erro: " +d);
                            },
                            success : function (f) {

                                var notaFinal = $('#notaFinal').text();

                                notaFinal = 0;

                                $.each( arrayNotas , function(ix, item){
                                
                                    var notinha =  $('#nota_'+item).val() ;

                                    if( notinha == undefined  ){

                                        notinha = $('#tdnotas_'+item).find('span').text();
                                    }

                                    
                                    
                                    $('#tdnotas_'+item).html('');
                                    $('#tdnotas_'+item).html('<span id="nota_btn" class="grade">'+notinha+'</span><p class="discreto">&nbsp;</p>');
                                    $('#btn_editar_div_'+item).html('<button class="btn_editar" id="btn_editar_'+item+'" onclick="editNote('+item+')">Editar</button> ');

                                    calcPorcentagem(notinha);

                                    /*notaFinal = notaFinal + parseFloat( notinha );

                                    $('#notaFinal').text('');

                                    $('#notaFinal').text(notaFinal);

                                    var porc =  $('#notaFinalPorc').text().split('%')[0]

                                    notaMax = $('#notaFinalValorTotal').text() ;

                                    if(notaMax == undefined || notaMax == '' || notaMax == 0){
                                        notaMax = 1;
                                    }

                                    if(notaFinal == undefined || notaFinal == ""){
                                        notaFinal = 0;
                                    }

                                    var multi = ( 100 * parseFloat(notaFinal.replace(',','.')));

                                    porc = multi / notaMax.replace(',','.');

                                    console.log(porc);

                                    $('#notaFinalPorc').text(porc.toFixed(2)+'%');
                                    
                                    if( notaMax == 0){
                                        notaMax = 1;
                                    }

                                    porc = ( 100 * notaFinal ) / notaMax;

                                    $('#notaFinalPorc').text(porc+'%');

                                    console.log(f);*/

                                    $('#coment_'+idEtapa).attr("disabled",'disabled');
                                                   
                                });

                            }
                    });
            
                }
                else{
                    alert('O somatório das notas não pode ultrapassar a nota máxima');
                }
            }else{
                alert('O valor não pode ser negativo');
            }
        //}
        //else{

          //  alert('O valor da nota não pode ser maior do que a nota parcial');

        //}
    }

    function calcPorcentagem(notinha) {

        var notaFinal = 0;

        if(notinha == undefined || notinha == '' || notinha == 0){

            notaFinal = $('#notaFinal').text();
            notaFinal = notaFinal.replace(',','.');

        } else {
            
            console.log('salvar');
            notaFinal = notaFinal + parseFloat(notinha);
            
        }
        
        var porc = 0;

        notaMax = $('#notaFinalValorTotal').text() ;
        console.log('NotaFinal: '+notaFinal);

        if(notaMax == undefined || notaMax == '' || notaMax == 0){
            notaMax = 1;
        }

          if(notaFinal == undefined || notaFinal == ""){
            notaFinal = 0;
        }

        var multi = ( 100 * parseFloat(notaFinal));

        porc = multi / notaMax.replace(',','.');

        console.log(porc);

        $('#notaFinal').text('');
        $('#notaFinal').text(notaFinal);
        $('#notaFinalPorc').text(porc.toFixed(2)+'%');
        

    }

    $( document ).ready(function() {
        
        var notinha = 0;
        calcPorcentagem(notinha);

    });


</script>