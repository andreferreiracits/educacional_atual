<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVAEventoTipoCor>>" %>


<h3>Cadastre um tipo de evento novo</h3>
	<p>Nome do tipo de evento:</p>
	<input type="text" id="strTipo" maxlength="40">
									
	<p>Selecione uma cor para o tipo de evento.</p>


    <%
        if (Model.Count > 0)
        {
  
    %>
	<ul>
        <% foreach (var item in Model)
           { 
        %>
		<li style="background:#<%=item.strRGB %>;">
			<input type="radio" name="opcao_cor" value="<%=item.idCor %>">
		</li>
        <%} %>
        <input type="hidden" id="idTipo" />
	</ul>
    <%} %>
	<input type="reset" class="btn_cinza cancelar" value="Cancelar" id="btn_cancelar">
	<input type="submit" class="btn_laranja salvar" value="Salvar" id="btn_gravar">