<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" MasterPageFile="~/Views/Shared/Site.Master" %>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div>
    <br/>
    <b>Migrador de Agendamentos</b>
<%
    using (Html.BeginForm("MigraAgendamentos", "Migrador", FormMethod.Post, new { @id = "frmMigrador" }))
{
	%>
    Insira o id da escola:
	<input type="text" id="idEscola" name="idEscola" value="" />
    <br />
    Ano a ser migrado<input type="text" name="ano" value="<%=DateTime.Now.Year.ToString() %>" />
    <br />
    <input type="submit" value="Executar" />
    <br/><br/>
    <b>Ação:</b>
    <br/>
    <label><input type="radio" value="1" name="acao" id="acao1" checked="checked" /> Apenas Relatório</label>
    <br/>
    <label><input type="radio" value="2" name="acao" id="acao12" /> Migrar Todos os Agendamentos</label>
    
	<%
}
%>
    </div>
</asp:Content>
