<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div class="linhaImpar">
    <div class="opcoes">
        <div class="conteudoLeft">Configurações paralelas:</div>
        <div class="txtMenor">
            <label><input type="radio" name="rdoParalelas"  id="rdoParalelasNao" value="0" <%=Model.NaoPermitirParalelas %>/> Não</label>
            <label><input type="radio" name="rdoParalelas" id="rdoParalelasSim" value="1" <%=Model.PermitirParalelas %>/> Sim</label>
        </div>
    </div>
</div>