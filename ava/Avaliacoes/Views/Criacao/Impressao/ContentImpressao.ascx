<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<input type="hidden" value="<%=Model.Id %>" id="idProvaSalvar" name="idProvaSalvar" />

<div id="infoCriacao">
    <div class="areaConfiguracoesProva">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Configurações</div>
            <div class="textoDivisao">Edite as informações complementares a avaliação.</div>
        </div>

        <div class="linhaImpar">
            <label class="SEC02511_texto">Título da avaliação: <span class="obrigatorio">*</span></label>
            <span class="SEC02511_texto">
                <input type="text" id="txtNome" name="txtNome" class="txt" value="<%= Model.Nome %>" />
            </span>
        </div>
        <div class="linhaPar">
            <label class="SEC02511_texto">Número de modelos:</label>
            <label><input type="radio" name="rdoModelo" value="1" checked="checked" /> 1</label>
            <label><input type="radio" name="rdoModelo" value="2" /> 2</label>
            <label><input type="radio" name="rdoModelo" value="3" /> 3</label>
            <label><input type="radio" name="rdoModelo" value="4" /> 4</label>
        </div>
        <%Html.RenderPartial(Model.BoxGabaritoImpressao); %>
<%--        <div class="clear"></div>
        <div class="configTitle"><span>Configurações Avançadas</span> <a class="direita btn" id="btnConfigAvancada" ><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a></div>  
        <div class="clear"></div>--%>
        <div class="configAvancadas">
            <div class="linhaPar">
                <label class="SEC02511_texto">Incluir espaço em questões discursivas:</label>
                <label><input type="radio" name="rdoEspacoDisc" value="5" checked="checked" /> 5</label>
                <label><input type="radio" name="rdoEspacoDisc" value="10" /> 10</label>
                <label><input type="radio" name="rdoEspacoDisc" value="15" /> 15</label>
                <label><input type="radio" name="rdoEspacoDisc" value="0" /> Nenhum</label>
            </div>
            <div class="linhaImpar"  id="localDiscursiva">
                <label class="SEC02511_texto">&nbsp;</label>
                <label><input type="checkbox" name="chkLocalEspaco" value="1" /> no final da prova</label>
                <label><input type="checkbox" name="chkLocalEspaco" value="2" /> abaixo de cada questão</label>
            </div>
            <div class="linhaPar" id="estiloLinha">
                <label class="SEC02511_texto">Estilo das linhas:</label>
                <label><input type="radio" name="rdoTipoEspaco" value="0" checked="checked" />branco</label>
                <label><input type="radio" name="rdoTipoEspaco" value="1" /> pautado</label>
                <label><input type="radio" name="rdoTipoEspaco" value="2" /> quadriculado</label>
            </div>
            <div class="clear"></div>
            <div class="divisaoQuestao">
                <div class="tituloDivisao">Questões</div>
                <div class="textoDivisao">Seleção de questões da avaliação/atividade.</div>
                <a class="direita btn" id="btnShowQuestoes" ><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
            </div>
        </div>
        <div id="boxShowQuestoesRO" class="hide">
            <table id="tblQuestoes" class="tabela" cellpadding="0" cellspacing="0" border="0" width="860">
                <thead>
                    <tr>
                        <td style="width: 5px; " class="bordaGrupo"></td>
                        <td style="width:855px; padding-left:7px" colspan="3">Enunciado</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="vazio"><td colspan="4"></td></tr>
                </tbody>
            </table>
        </div>

    </div>
</div>