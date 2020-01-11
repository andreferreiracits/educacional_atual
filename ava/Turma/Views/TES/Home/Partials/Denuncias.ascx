<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Turma.Models.Denuncias>>" %>
<% 
    if (Model.Count > 0)
    {
        foreach (var d in Model)
        {
%>
            <tr id="tr_denuncia_<%=d.idDenuncia %>">
                <td>
                    <div style="width: 265px; word-wrap: break-word;"><%=d.strMotivo %></div>
                    <p>
                        <a href="<%=d.strURL %>" target="_blank" class="bt_normal "><i class="ui-img-nots ui-img-quote"></i>ver post</a>
                    </p>
                </td>
                <td class="adm_users">
                    <%=d.strNomeUsuarioDenuncia %>
                </td>
                <td class="adm_users">
                    <%=d.strNomeUsuarioDenunciado %>
                </td>
                <td>
                    <%=d.dtmDenuncia.ToString("dd/MM/yyyy HH:mm:ss") %>
                </td>
                <td>
                    <% if(d.bolVisualizada) { %>
                    <a class="bt_normal green" style="cursor: pointer;" title="Clique aqui para alterar o status." onclick="alteraStatusDenuncia(<%=d.idDenuncia %>, 0)">Resolvido</a>
                    <% } else { %>
                    <a class="bt_normal red" style="cursor: pointer;" title="Clique aqui para alterar o status." onclick="alteraStatusDenuncia(<%=d.idDenuncia %>, 1)">Pendente</a>
                    <% } %>
                </td>
            </tr>
<%      }
    }
    else
    {
        var bolBuscaPorNome = ViewData["bolBuscaPorNome"] == null ? false : (bool)ViewData["bolBuscaPorNome"];
%>
        <tr>
            <td colspan="5">
                <div class="feed_fitro">
                    <p><%=bolBuscaPorNome ? "Nenhuma mensagem do usuário denunciado por enquanto." : "Nenhuma denúncia encontrada."%></p>
                </div>
            </td>
        </tr>
    <%
    }  
%>
