<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.CodigoDidatico>>" %>

<% 
    if (Model.Count > 0)
    {
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
            <div id="<%=idCodigo%>" class="anexo_preview anx_livro">
                <a href="<%=strURL%>" class="anx_dado" target="_blank"><%=strTitulo%></a>
                <a href="javascript:void(0);" class="btn_acao opcao_excluir" onclick="excluirCodigoTarefa(<%=idCodigo%>, <%=idRecursoEtapa%>, <%=idApostilaEdicao %>)"></a> 
            </div>
            <%            
        }
    }    
%>