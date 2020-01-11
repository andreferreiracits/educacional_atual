<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id='spe_dialogo_miolo_combos' style='margin-left: 80px; margin-top: 40px;'>
    <input type='hidden' id='spe_idClassificacao' value='0' />
    <div id='spe_class_loading_div' style='width: 600px; height: 250px; position: absolute; background-color: #D3D3D3; opacity: 0.6; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=6)"; filter: alpha(opacity=6);'>
        <center><span id='spe_class_loading_message' style='line-height: 252px; color: #000000; font-size: 26px;'>Carregando...</span></center>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Coleção:</div>
        <div style='float: left; width:80%;'>
            <select class="specolecaocombo" style='width: 200px; border: 1px solid black;'>
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Edição:</div>
        <div style='float: left; width:80%;'>
            <select class="speedicaocombo" style='width: 200px; border: 1px solid black;'>
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Disciplina:</div>
        <div style='float: left; width:80%;'>
            <select class="spedisciplinacombo" style='width: 200px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Ano / Módulo:</div>
        <div style='float: left; width:80%;'>
            <select class="speanocombo" style='width: 200px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Volume:</div>
        <div style='float: left; width:80%;'>
            <select class="spevolumecombo" style='width: 200px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Unidade:</div>
        <div style='float: left; width:80%;'>
            <select class="speunidadecombo" style='width: 200px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Tipo:</div>
        <div style='float: left; width:80%;'>
            <select class="spetipocombo" style='width: 200px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Ordem:</div>
        <div style='float: left; width:80%;'>
            <select class="speordemcombo" style='width: 200px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 28px;'>
        <div style='float: left; width:20%;'>Grupo:</div>
        <div style='float: left; width:80%;'>
            <select class="spegrupocombo" style='width: 200px; border: 1px solid black;'>        
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
</div>