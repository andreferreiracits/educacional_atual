<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVABarraAvisos>>" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderDadosMeio" runat="server">
    <section id="ava_container">
        <p><b>Avisos</b></p>  
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Mensagem</th>
                    <th>DataInicio</th>
                    <th>DataFinal</th>
                    <th>Excluir</th>
                </tr>
            <%            
                if (Model.Count > 0)
                {                    

                    foreach (var item in Model)
                    {
                        %>
                    
                        <tr>
                            <td><a href="/AVA/AdminAVA/Avisos/Editar/<%=item.id %>"><%=item.id%></a></td>
                            <td><%=item.idUsuario%></td>
                            <td><%=item.strMensagem%></td>
                            <td><%=item.dtmInicio%></td>
                            <td><%=item.dtmFim%></td>
                            <td><a href="/AVA/AdminAVA/Avisos/Excluir/<%=item.id %>">Excluir</a></td>
                        </tr>                                         
                        <%
                }
                }
                else
                {                    
            %>
                    <tr>
                        <td colspan="6">Nenhum aviso encontrado.</td>
                    </tr>
            <%
                }
            %>
            </thead>
        </table>      
    </section>
    
</asp:Content>
