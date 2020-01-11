<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div>
conteúdo dos grupos
    <div>
        <p>Grupos</p>
        <input type="hidden" value="1" name="tipoRealizadorGrupo" />
        <div><label><input type="checkbox" value="297" name="chkRealizadorGrupo" />297</label></div>
        <div><label><input type="checkbox" value="298" name="chkRealizadorGrupo" />298</label></div>
        <div><label><input type="checkbox" value="299" name="chkRealizadorGrupo" />299</label></div>
        <div><label><input type="checkbox" value="300" name="chkRealizadorGrupo" />300</label></div>
        <p>Portais</p>
        <input type="hidden" value="2" name="tipoRealizadorPortal" />
        <div><label><input type="checkbox" value="1" name="chkRealizadorPortal" />Educacional</label></div>
        <div><label><input type="checkbox" value="2" name="chkRealizadorPortal" />Aprende Brasil</label></div>
        <div><label><input type="checkbox" value="4" name="chkRealizadorPortal" />Positivo</label></div>
        <div><label><input type="checkbox" value="8" name="chkRealizadorPortal" />Educacional / Positivo</label></div>
        <div><label><input type="checkbox" value="16" name="chkRealizadorPortal" />PP Parcial</label></div>

        <a href="#" id="btnCancelarGrupos">Cancelar</a>
        <a href="#" id="btnAvancarGrupos">Avancar</a>
    </div>
</div>
