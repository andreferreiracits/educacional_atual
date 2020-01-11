<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.Recurso>>" %>

<div class="ava_lightheader">           
    <h2 class="blokletters"> Conteúdos do Livro Integrado</h2>
    <p></p>
    <h3>Acesse os conteúdos indicados nos volumes do seu material didático.</h3>
    <p></p>
    <p><strong>Veja como é fácil:</strong> Digite o código apresentado no Livro Integrado e identifique na lista os conteúdos estudados em sala de aula</p>
</div>
<!--ava_lightheader-->

<div class="ava_lightcontainer">

    <div class="hold_cods hold_field clearfix">
        <h4>Digite o código apresentado no Livro Integrado</h4>
        
        <div class="hc_field">
            <img src="/pesquisa/imagens/novas/ico_computador.gif">
            <input type="text" value="" style="height: 19px;" size="20" id="strCodigoDidatico" name="strCodigoDidatico">    	
            <a class="btnOk" href="javascript:pesquisaPorCodigo();"><img border="0" src="/pesquisa/imagens/novas/btn_ok.gif"></a>
        </div>
    </div>

    <!--<h3 class="hc_txt ">ou</h3>-->
    <!--
    <div class="hold_cods hold_combos clearfix">                    
        <h4>Selecione os filtros e identifique na lista os conteúdos estudados em sala de aula</h4>
        <div class="hc_combo">Nível 
            <select onchange="defineOptionsMD(this)" class="select_topo" name="selNivel" id="selNivel">
                <option value="0">Selecione um nível
                </option><option value="EI_alu">Educação Infantil </option>
                <option value="EF_I">Fundamental I </option>
                <option value="EF_II">Fundamental II </option>
                <option value="EM">Médio </option>
                <option value="MOD">Modular </option>
                <option value="EXT">Extensivo modular</option>
            </select>
        </div>
        <div class="hc_combo">Série
            <select style="width:147px;" class="select_topo" id="selSerie" name="selSerie">
                <option selected="" value="0">todas as séries</option>
            </select>
        </div>
        <div class="hc_combo">Área
            <select style="width:140px;" class="select_topo" id="selAreas" name="selAreas">
                <option selected="" value="0">todas as áreas</option>
            </select>   
        </div>	  
        
        <%
        int mesAtual = DateTime.Now.Month;
        %>
        <div class="hc_combo">Volume
            <select id="intBimestre" name="intBimestre" class="select_topo">
                <option value="1" <%if(mesAtual == 1 || mesAtual == 2 || mesAtual == 3){ %>selected<%}%>>v. 1&nbsp</option>
                <option value="2" <%if(mesAtual == 4 || mesAtual == 5 || mesAtual == 6){ %>selected<%}%>>v. 2&nbsp;</option>
                <option value="3" <%if(mesAtual == 7 || mesAtual == 8 || mesAtual == 9){ %>selected<%}%>>v. 3&nbsp;</option>
                <option value="4" <%if(mesAtual == 10 || mesAtual == 11 || mesAtual == 12){ %>selected<%}%>>v. 4&nbsp;</option>																																
            </select> 
        </div>       		
                                                    
		<div>
            <a class="btnOk" href="javascript:fncPesquisa();"><img border="0" src="/pesquisa/imagens/novas/btn_ok.gif"></a>
        </div>
    </div>-->
    <div id="container_codigos">
        
    </div>
</div><!--ava_ativtable-->
