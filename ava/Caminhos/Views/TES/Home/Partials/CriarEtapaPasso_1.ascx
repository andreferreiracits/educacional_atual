<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<script type="text/javascript">
    $(function () {
        $("#filtro_aval").hide();

        $('#escorregaFiltro').toggle(
		    function () {
		        $(this).html("Adicionar filtros &#9650;");
		        montaCampoData('#dtmInicioAval', '#dtmFimAval');

                /*
		        montaCampoData('#dtmInicioAval');
		        montaCampoData('#dtmFimAval');
                */
		        $('#dtmInicioAval').setMask('date'); // data
		        $('#dtmFimAval').setMask('date'); // data

		        $('#filtro_aval').slideDown();
		    }, function () {
		        $(this).html("Adicionar filtros &#9660;");
		        $('#filtro_aval').slideUp();
		    }
	    );
    })
</script>

<section id="ava_box" class="as1 ava_caminhos ava_forms ">
    <input type="hidden" id="idCaminho" value="<%=Model.id%>" />
    <input type="hidden" id="intEtapa" value="<%=ViewData["intEtapa"] %>" />

    <h1>Edição da tarefa <%=ViewData["intEtapa"] %> </h1>
    <!---<span class="lb_info"><a href="#" class="">&#9660; ajuda</a></span>--->

    <div class="as1 ava_ativtable recurso_aval_caminho">
         <table width="100%" border="0" cellspacing="0" cellpadding="0" class="">
            <THEAD>
                <tr class="table_selected">
                    <td id="recurso_ava" colspan="2"></td>
                </tr>
                <tr id="linha_filtro" class="subheader" style="display: none">
                    <td colspan="2">
                        <a href="javascript: void(0);" id="escorregaFiltro" class="bt_normal transp">Adicionar filtros &#9660; </a>
                        <div class="lajotinhas">
                            <ul class="lajotinha_filtro">
                                
                            </ul>
                        </div>
                        
                        <div id="filtro_aval" class="clearfix">
                            <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />

                            <div class="f_aval">                           
                                <strong>Nome da avaliação:</strong>
                                <input type="text" value="" id="strPesquisa" size="30" />                               
                            
                                <p>
                                    <strong>Data de criação:</strong>
                                    de<input type="text" size="8" id="dtmInicioAval" value="" readonly="true" class="ph" placeHolder="     /     /"/>

                                    até<input type="text" size="8" id="dtmFimAval" value="" readonly="true" class="ph" placeHolder="     /     /"/>                            
                                </p>
                            </div>                            

               
                            <div class="f_aval_bts">
                                <a href="javascript: void(0);" onclick="limparfiltro();" class="bt_normal">Limpar</a>   
                                <a href="javascript: void(0);" onclick="filtrarAvaliacoesCaminhos();" class="bt_normal color">Filtrar</a>                          
                            </div>
                        </div>

                    </td>
                </tr>
                <tr id="linha_header_tbl" class="tableheader" style="display: none">
                    <td width="63%">&#9660; Avaliações</td>
                    <td width="20%">&#9660; Data de criação</td>
                </tr>
            </THEAD>

            <TBODY>
                <tr class="table_aberta">
                    <td id="recursoitem_ava" class="r_item_ava">
                        <ul id="lista_recurso_ava">
                            <%                     
                                bool bolMostraBox = true; 
                                foreach (var recurso in Model.lRecurso)
                                {
                                    if (recurso.id > 0)
                                    {
                                        //Verifica se é uma escola Ava Puro.
                                        if (Convert.ToBoolean(ViewData["bolAvaPuro"]))
                                        {
                                            //Se tiver setado para não mostrar avaliações como recurso, e o idrecurso = 1 então não mostra o box.
                                            if (!Convert.ToBoolean(ViewData["bolAvaliacoes"]) && recurso.id == 1) 
                                            {
                                                bolMostraBox = false;
                                            }else {
                                                //Mostra o box.
                                                bolMostraBox = true;
                                            }
                                        }
                                        if (bolMostraBox && (recurso.id == 2 || recurso.id == 11 || recurso.id == 1 || recurso.id == 8))
                                        {
                                        %>
                                        <li class="r-box" id="li_<%=recurso.id%>">
                                            <div class="mosaic-block cover">
                                                <div class="mosaic-overlay">
                                                    <img height="55" width="55" alt="<%=recurso.strRecurso%>" src="<%=recurso.strPathThumb%>">
                                                    <%
                                                        Response.Write(recurso.strRecurso.ToUpper());                                                                                                
                                                    %>                                                
                                                </div>
                                	            <div class="details">
                                                    <%
                                                    if (recurso.idCategoriaPublicacao == -1) //etapa do meu jeito
                                                    {
                                                    %>
                                                        <a href="javascript: void(0);" onclick="inserirDoMeuJeito(<%=recurso.id%>)"><%=recurso.strTextoBreve%></a>
                                                    <%
                                                        }
                                                        else
                                                        {
                                                            if (recurso.id == 1)
                                                            {
                                                            %>
                                                            <a href="javascript: void(0);" onclick="listaAvaliacoesCaminhos('','','')"><%=recurso.strTextoBreve%></a>
                                                            <% 
                                                            }
                                                            else
                                                            {
                                                            %>
                                                            <a href="javascript: void(0);" onclick="abrirRecurso(<%=recurso.idCategoriaPublicacao%>,<%=recurso.id%>)"><%=recurso.strTextoBreve%></a>
                                                            <%        
                                                            }

                                                        }                                                    
                                                    %>                                                
                                                </div>
                                            </div>                                                                               
                                        </li>                                   
                                        <% 
                                       }
                                    } 
                                }    
                            %>                       
                        </ul>
                    </td>
                </tr>
                
            </TBODY>
            <TFOOT>
            <tr>
                <td id="mostraPaginas" colspan="3">
                    <div id="Pagination" class="pagination">
                    </div>
                </td>
            </tr> 
            </TFOOT>            
        </table>

    </div>

    <div class="r-selecionado" id="recursoescolhido" style="display: none">
        
    </div>

    <div class="caminhos_form" id="camposEtapa" style="display: none">
        
    </div><!--caminhos_form-->
    
</section>

<aside id="ava_barralateral-direita"></aside>

<section id="ava_steps_footer">
    <a class="large awesome c-cancelar" id="btnCancelarCaminho" href="javascript: void(0);" onclick="location.href='/ava/caminhos/home/index/2'"><span class="awe_icons"></span>Cancelar</a>
            
    <a class="large awesome c-avancar" id="btnAvancarCaminho" href="javascript: void(0);" onclick="avancarConclusao(<%=Model.id%>)">Avançar para conclusão<span class="awe_icons"></span></a>
</section>

