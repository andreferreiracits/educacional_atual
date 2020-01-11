<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<AdminAVA.Models.ObjGrupoTurmaAdmin>>" %>
<% foreach(var g in Model) {
       var bolTodosModeradores = !g.Professores.Any(x => !x.BolModerador);              
%>
<tbody>
    <tr>
        <td width="60" class="align_center">
            <label class="styleCheckbox labelCheckAcaoMassa" for="checkGrupoDeTurmaAcaoMassa_<%=g.IdGrupo %>">
                <input type="checkbox" name="checkGrupoDeTurmaAcaoMassa_<%=g.IdGrupo %>" id="checkGrupoDeTurmaAcaoMassa_<%=g.IdGrupo %>" idgrp="<%=g.IdGrupo %>" class="ckacao_massa" />
            </label>
        </td>
        <td width="450">
            <a href="/AVA/Turma/<%=g.StrLinkPermanente%>" target="_blank"><img src="<%=g.StrFoto%>" height="30" width="30" /></a>
            <h3><a href="/AVA/Turma/<%=g.StrLinkPermanente%>" target="_blank"><%=g.StrTurma%></a></h3>
        </td>
        <td width="230">
            <div class="bootstrap drop_moderadores <%=g.BolAtivo && (g.Professores.Count() > 0) ? "" : " desativado_combo" %><%=(g.Professores.Count() == 0) ? " semprofessor" : "" %>" id="drop_moderadores_<%=g.IdGrupo %>" idgrp="<%=g.IdGrupo %>">
                <div class="btn-group">
                    <button data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton">
                        <span class="FontAwesome"></span>Selecione os moderadores<span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <% foreach(var p in g.Professores) { %>
                        <li>
                            <input type="checkbox" id="checkbox_moderadores_<%=g.IdGrupo %>_<%=p.IdUsuario %>" name="checkbox_moderadores_<%=g.IdGrupo %>_<%=p.IdUsuario %>" value="<%=p.IdUsuario %>" <%=p.BolModerador ? " checked=\"checked\"" : "" %> />
                            <label for="checkbox_moderadores_<%=g.IdGrupo %>_<%=p.IdUsuario %>">
                                <span class="FontAwesome"></span>                                
                                <img src="<%=p.StrFoto %>" height="30" width="30" alt="" />
                                <%=p.StrNome %>
                            </label>
                        </li>
                        <% } %>
                    </ul>
                </div>
            </div>
        </td>
        <td width="100">
            <div class="bootstrap drop_bolAtivo" id="drop_bolAtivo_<%=g.IdGrupo %>" idgrp="<%=g.IdGrupo %>">
                <div class="btn-group">
                    <button data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton <%=g.BolAtivo ? "" : " desativado_grupo" %>">
                        <span class="FontAwesome"></span><%=g.BolAtivo ? "Ativado" : "Desativado" %> <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <input type="radio" id="checkbox_ativado_<%=g.IdGrupo %>" name="checkbox_ativadoDesativo_<%=g.IdGrupo %>" value="1" <%=g.BolAtivo ? "checked=\"checked\"" : "" %> />
                            <label for="checkbox_ativado_<%=g.IdGrupo %>">
                                <span class="FontAwesome"></span>Ativado
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="checkbox_desativado_<%=g.IdGrupo %>" name="checkbox_ativadoDesativo_<%=g.IdGrupo %>" value="0" <%=g.BolAtivo ? "" : "checked=\"checked\"" %> />
                            <label for="checkbox_desativado_<%=g.IdGrupo %>">
                                <span class="FontAwesome"></span>Desativado
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </td>
    </tr>
    <tr class="info_selecao info_selecao_<%=g.IdGrupo %>">
        <td colspan="4" width="640">
            <% if(g.Professores.Count() == 0) { %>
            <p>Não há professores vinculados à esta turma. Por isso, não é possível configurar os moderadores do grupo.</p>
            <% } else if(bolTodosModeradores) { %>
            <p>Todos os professores estão definidos como moderadores.</p>
            <% } else { %>
            <div class="seletorGlobal moderadoresGrupoDeTurma" idgrp="<%=g.IdGrupo %>">
                <% foreach(var p in g.Professores) { if(p.BolModerador) { %>
                <div class="lajotinha <%=g.BolAtivo ? "" : " desativado"%>" idgrp="<%=g.IdGrupo %>" idprof="<%=p.IdUsuario %>">
                    <img src="<%=p.StrFoto %>" height="24" width="24" />
                    <span><%=p.StrNome %></span>
                    <a href="javascript:void(0);" class="excluir_lajotinha FontAwesome" alt="Excluir da lista"></a>
                </div>
                <% } } %>
            </div>
            <% } %>
        </td>
    </tr>
</tbody>
<% } if(Model.Count == 0) { %>
<tbody>
    <tr>
        <td colspan="4">
            <div class="feed_fitro">
                <p>
                    &nbsp;&nbsp;Não há resultados para o filtro aplicado.
                </p>
            </div>
        </td>
    </tr>
</tbody>
<% } %>
