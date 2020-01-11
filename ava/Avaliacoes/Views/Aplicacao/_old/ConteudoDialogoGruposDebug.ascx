<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>

<table id="tblPortais" class="tabela scroll" cellpadding="0" cellspacing="0" border="0">
    <thead>
        <tr>
            <td class="selecionar" style="width:35px;"></td>
            <td style="width:820px;">Dialogo de debug</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="11" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorGrupo, 11) %>/></td>
            <td>11</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="20" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorGrupo, 20) %>/></td>
            <td>20</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="21" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorGrupo, 21) %>/></td>
            <td>21</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="22" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorGrupo, 22) %>/></td>
            <td>22</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="chkRealizador" value="23" <%=Model.CheckRealizador( EnumTipoRealizadores.RealizadorGrupo, 23) %>/></td>
            <td>23</td>
        </tr>
    </tbody>
</table>

