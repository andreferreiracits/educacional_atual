<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RelatorioNotasTurma>>" %>

<% 
if (Model.Count > 0)
{
    foreach (var relatorio in Model)
    {
        string strNomeAluno = relatorio.strNomeAluno;
        string strCodAluno = relatorio.strCodAluno;
        double dbNota = relatorio.nota;
        int intNumChamada = relatorio.intNumero;
        
      
        
        %>
        <tr>
            <td class="td_titulo" width="47%"><img width="33" height="33" src="<%=relatorio.strFoto%>"><%=strNomeAluno%></td>
            <td class="center" width="14%" ><%=strCodAluno%></td>
            <td class="center" width="13%"><%=intNumChamada%></td>
           

            <td class="center td_prog" width="16%">
            
                <%
                    int total = 0;
                    
                    if (relatorio.etapasConcluidas > 0)
                    {
                        //int calcA = 1;
                        int calcA = relatorio.qtdEtapas;

                        int calcB = relatorio.etapasConcluidas * 100;

                        total = calcB / calcA;    

                    }
                   
                    
                    Response.Write(total + "%");
                %>
                <div id="progressbar_<%=relatorio.idUsuario%>" class="prog_holder">
                    <script type="text/javascript">
                        var tot = 0 ;
                        tot = <%=total%>;
                        montaProgessBar(tot, <%=relatorio.idUsuario%>);
                    </script>
                </div>
            
            </td>
            <td width="10%" class="center td_nota"><%=dbNota%></td>                                 
        </tr>       
        <%    
    }    
}
else
{
   %>
    <tr>
        <td colspan="5">Nenhum registro encontrado.</td>
    </tr>  
   <% 
}  
    
%>
