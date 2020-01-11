<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVADenuncias>>" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderDadosMeio" runat="server">
    <section id="ava_container">
        <p><b>denuncias</b></p>  
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Usuario</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Excluir</th>
                </tr>
            <%            
                if (Model.Count > 0)
                {
                    string strStatus = "";

                    foreach (var item in Model)
                    {
                        if (item.bolVisualizada == false)
                        {
                            strStatus = "Pendente";
                        }
                        else
                        {
                            strStatus = "Visualizada";
                        }
                        %>
                    
                        <tr>
                            <td><a href="/AVA/AdminAVA/Denuncias/Ver/<%=item.idDenuncia %>"><%=item.idDenuncia%></a></td>
                            <td><%=item.strNomeUsuarioDenuncia%></td>
                            <td><%=item.strNomeUsuarioDenunciado%></td>
                            <td><%=item.dtmDenuncia%></td>
                            <td><%=strStatus%></td>
                            <td><a href="/AVA/AdminAVA/Denuncias/Excluir/<%=item.idDenuncia %>">Excluir</a></td>
                        </tr>                                         
                        <%
                }
                }
                else
                {                    
            %>
                    <tr>
                        <td colspan="6">Nenhuma denúncia encontrada.</td>
                    </tr>
            <%
                }
            %>
            </thead>
        </table>      
    </section>
    
</asp:Content>
