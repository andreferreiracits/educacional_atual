<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>

<table id="tblPortais" class="tabela scroll" cellpadding="0" cellspacing="0" border="0">
    <thead>
        <tr>
            <td class="selecionar" style="width:35px;"></td>
            <td style="width:820px;">Nome</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="1" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorPortal, 1) %>/></td>
            <td>Educacional</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="2" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorPortal, 2) %>/></td>
            <td>Aprende Brasil</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="4" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorPortal, 4) %>/></td>
            <td>Positivo</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="8" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorPortal, 8) %>/></td>
            <td>Educacional / Positivo</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="16" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorPortal, 16) %>/></td>
            <td>PP Parcial</td>
        </tr>
    </tbody>
</table>

