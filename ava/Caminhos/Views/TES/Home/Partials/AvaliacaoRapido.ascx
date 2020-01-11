<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

	<THEAD>                  		
        <tr class="table_selected">
            <td colspan="3">               
                <img width="55" height="55" src="/ava/staticcontent/common/img/recursos/Avaliacoes_55x55.jpg" alt="Avaliações">
                <span>AVALIAÇÕES</span>
                <p><a style="cursor: pointer;" onclick="voltaListaRecursos();" class="bt_normal">voltar</a></p>
            </td>
        </tr>
        <tr id="linha_filtro" class="subheader">
            <td colspan="3">
                <a href="javascript: void(0);" id="escorregaFiltro" class="bt_normal transp">Adicionar filtros &#9660; </a>
                <div class="lajotinhas">
                    <ul class="lajotinha_filtro">
                        
                    </ul>
                </div>
                        
                <div id="filtro_aval" class="clearfix">
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
                        <a href="javascript: void(0);" onclick="filtrarAvaliacoes();" class="bt_normal color">Filtrar</a>                          
                    </div>
                </div>

            </td>
        </tr>
    </THEAD>

    <TBODY class="tablebody" id="container_recAval">
              
    </TBODY> 
   

    


