<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<section class="dialogo clearfix" id="convidar_pgrupo" style="width:150px; border:1px solid red;">                    
    <div class="compartilhamento">
        <ul>
            <li>Convidar: </li>
            <li style="display:none;" class="campo-busca"><input type="text" class="busca_especifico" style="font-family:arial;border:solid 1px #E19000;height:12px;margin:0 5px 0 1px;color:#E19000;font-size:11px;display:none;" /></li>
            
            <li><a href="#" class="troca_persona invert">Concluir </a></li> 
        </ul>
    </div>

    <div style="display: none;" class="selecao_personas">
            <ul>
            <li class="p_bg p_dica discreto">Digite ou selecione pessoas</li>
            <li style="text-align:center;margin:10px 0" class=""><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></li>
        </ul>        
    </div>
</section>