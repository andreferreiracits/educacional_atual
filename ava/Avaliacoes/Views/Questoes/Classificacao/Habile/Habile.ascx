<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div style='margin-left: 80px; margin-top: 40px;'>
    <div style='height: 30px;'>
        <div style='float: left; width:20%;'>Matriz:</div>
        <div style='float: left; width:80%;'>
            <select id="matrizes" class="habilematrizfiltro" style='width: 580px; border: 1px solid black;' onchange="classHabile.selecionarMatrizFiltro();">
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width:20%;'>Competência:</div>
        <div style='float: left; width:80%;'>
            <select id="competencias" class="habilecompetenciafiltro" style='width: 580px; border: 1px solid black;' disabled="disabled" onchange="classHabile.selecionarCompetenciaFiltro();">        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width:20%;'>Habilidade:</div>
        <div style='float: left; width:80%;'>
            <select id="habilidades" class="habilehabilidadefiltro" style='width: 580px; border: 1px solid black;' disabled="disabled" onchange="classHabile.selecionarHabilidadeFiltro();">        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width:20%;'>Eixo:</div>
        <div style='float: left; width:80%;'>
            <select id="eixos" class="habileeixofiltro" style='width: 580px; border: 1px solid black;' disabled="disabled">        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width:20%;'>Processo Cognitivo:</div>
        <div style='float: left; width:80%;'>
            <select id="processos" class="habileprocecognitivofiltro" style='width: 580px; border: 1px solid black;' disabled="disabled">        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width:20%;'>Situação de Uso:</div>
        <div style='float: left; width:80%;'>
            <select id="situacoesuso" class="habilesituacaousofiltro" style='width: 580px; border: 1px solid black;' disabled="disabled">        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
        <div style='height: 30px;'>
        <div style='float: left; width:20%;'>Série:</div>
        <div style='float: left; width:80%;'>
            <select id="series" class="habileseriefiltro" style='width: 580px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
</div>
