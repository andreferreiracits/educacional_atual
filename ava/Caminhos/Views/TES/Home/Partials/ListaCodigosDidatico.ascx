<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.CodigoDidatico>>" %>

<% 
if (Model.Count > 0)
{
%>        
    <div id="codigos_didatico">
        <h5>Códigos do material didático</h5>
        <% 
        foreach (var codigo in Model)
        {
            string strTitulo = codigo.strTituloCodigo;
            string strCodigo = codigo.strCodigo;
            string strURL = codigo.strURL;
            int idCodigo = codigo.idCodigo;
            int idRecursoEtapa = codigo.idRecursoEtapa;
            //string intPagina = codigo.intPagina;
            int idApostilaEdicao = codigo.idApostilaEdicao;
            //int intAno = codigo.intAno;
            %>
            <div class="atividades_insert bgcolor1" id="<%=idCodigo%>">
                <span class="fecha_X" onclick="excluirCodigo(<%=idCodigo%>, <%=idRecursoEtapa%>, <%=idApostilaEdicao %>)"></span>
                <a href="<%=strURL%>" class="bt_normal" target="_blank"><%=strTitulo %> <span class="c-novapagina"></span> </a>
            </div>    
            <%            
        }    
        %>
    </div>
<%
}    
%>


