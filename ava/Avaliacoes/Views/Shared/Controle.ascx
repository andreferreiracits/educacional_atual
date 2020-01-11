<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ControleView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Control" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div class="destaqueAzul">
    <label>Curso:</label>
    <span class="nome"><%= Model.Curso.Curso.Nome %></span>
    <span class="codigo"> - <%= Model.Curso.Curso.Codigo %></span>
</div>
            
<table width="100%" cellpadding="0" cellspacing="0" class="borda">
    <tr class="barraResumoPrincipal" valign="middle">
        <td width="86%"><h4>Habilidade e competências</h4></td>
        <td width="14%" align="center"><h4>Porcentagem</h4></td>
    </tr>
<%
    string linha = "linhaImpar";
    foreach (KeyValuePair<HabilidadeCompetencia, double> habilidade in Model.Curso.Habilidades)
    { %>
        <tr class="<%= linha %>">
            <td><span class="esp"><%= habilidade.Key.Nome %></span></td>
            <td align="center"><%= String.Format("{0:0}", habilidade.Value) %>%</td>
        </tr>
<%
        linha = (linha == "linhaImpar") ? "linhaPar" : "linhaImpar";
    }
%>
</table>
<%
    foreach (DisciplinaControle disciplina in Model.Disciplinas)
    {
%>
        <div class="destaqueAzul">
            <label><img src="<%= UtilView.Url("/Content/imgcss/indDisciplina.gif") %>" alt="Disciplina" />Disciplina:</label>
            <span class="nome"><%= disciplina.Disciplina.Nome %></span>
            <span class="codigo"> - <%= disciplina.Disciplina.Codigo %></span>
        </div>
            
        <table width="100%" cellpadding="0" cellspacing="0" class="borda">
            <tr class="barraResumoPrincipal" valign="middle">
                <td width="86%"><h4>Habilidade e competências</h4></td>
                <td width="14%" align="center"><h4>Porcentagem</h4></td>
            </tr>
<%
            linha = "linhaImpar";
            foreach (KeyValuePair<HabilidadeCompetencia, double> habilidade in disciplina.Habilidades)
            { %>
                <tr class="<%= linha %>">
                    <td><span class="esp"><%= habilidade.Key.Nome %></span></td>
                    <td align="center"><%= String.Format("{0:0}", habilidade.Value) %>%</td>
                </tr>
<%
                linha = (linha == "linhaImpar") ? "linhaPar" : "linhaImpar";
            }
%>
        </table>
            
        <table width="100%" cellpadding="0" cellspacing="0" class="borda">
            <tr class="barraResumoPrincipal" valign="middle">
                <td width="86%"><h4>Conteúdos</h4></td>
                <td width="14%" align="center"><h4>Porcentagem</h4></td>
            </tr>
<%
            linha = "linhaImpar";
            foreach (KeyValuePair<Conteudo, double> conteudo in disciplina.Conteudos)
            { %>
                <tr class="<%= linha %>">
                    <td><span class="esp"><%= conteudo.Key.Nome%></span></td>
                    <td align="center"><%= String.Format("{0:0}", conteudo.Value)%>%</td>
                </tr>
<%
                linha = (linha == "linhaImpar") ? "linhaPar" : "linhaImpar";
            }
%>
        </table>
<%  } %>