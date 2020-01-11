<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<% 
    /*
   * usuarios temporarios com acesso
   * paulocezardeoliveira - 3909395
   * tarsis_prado - 7767579
   * FLIPPED_2013 - 10210372
   * */
    int[] usuarios = new int[]{3909395,7767579,10210372};
    //int[] usuarios = new int[] { 30154567 };

  if (usuarios.Contains(((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.Id))
  { %>

<div class="clear"></div>
<div>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Dúvidas</div>
        <div class="textoDivisao">Permitir o envio de dúvidas e comentários?</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft"></div>
            <div class="txtMenor"> 
                <label><input type="radio" name="rdoDuvidaFlippedTeste" value="0" <%=Model.NaoDuvidaSelecionada %>/> Não</label>
                <label><input type="radio" name="rdoDuvidaFlippedTeste" value="1" <%=Model.SimDuvidaSelecionada %>/> Sim</label>
            </div>
        </div>
    </div>
</div>
<% }%>