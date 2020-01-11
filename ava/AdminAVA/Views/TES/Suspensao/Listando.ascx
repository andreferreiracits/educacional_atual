<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVASuspensao>>" %>

<table width="100%" border="0" cellpadding="0" cellspacing="0" class="tb_avisos">
            <thead>
                <tr>
                    <td width="32%">motivo</td>
                    <td width="15%">usuário</td>
                    <td width="15%">inicio suspensão</td>
                    <td width="15%">fim suspensão</td>
                    <td width="8%">status</td>
                </tr>
            </thead>
            <%            
                if (Model.Count > 0)
                {
                    string strClass = "";
                    string strStatus = "";


                    foreach (var item in Model)
                    {
                        if (item.bolSuspensao)
                        {
                            strClass = "red";
                            strStatus = "Suspenso";
                        }
                        else
                        {
                            strClass = "green";
                            strStatus = "Liberado";
                        }
                        
                        %>
                    
                        <tr>
                            <td><div style="width: 395px; word-wrap:break-word;"><%=item.strJustificativa%></div>
                                <p><a href="/AVA/Perfil/Home/Index/<%=item.strLoginUsuarioSuspenso %>" target="_blank" class="bt_normal "><i class="ui-img-nots ui-img-mural"></i> ver perfil</a></p>
                            </td>
                            <td class="adm_users"><%=item.strLoginUsuarioSuspenso%></td>
                            <td class="adm_users"><%=item.dtmInicioSuspensao%></td>
                            <td class="adm_users"><%=item.dtmFimSuspensao%></td>
                            <td><a class="bt_normal <%=strClass %>" title="<%=strStatus %>"><%=strStatus%></a></td>
                        </tr>                                         
                        <%
                }
                }
                else
                {                    
            %>
                    <tr>
                        <td colspan="6">Nenhuma suspensão encontrada.</td>
                    </tr>
            <%
                }
            %>
        </table>