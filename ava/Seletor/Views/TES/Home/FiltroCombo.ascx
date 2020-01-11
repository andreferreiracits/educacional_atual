<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Seletor.Model.SeletorModelo>" %>

<%
Seletor.Model.SeletorModelo seletor = Model;
bool bolAlunoLogado = Convert.ToBoolean(ViewData["bolAlunoLogado"]);

string disabled = "";
if (bolAlunoLogado || Model.intTipoSelecionado == 5 || Model.intTipoSelecionado == 4)
{
    disabled = "disabled='disabled'";
}

if (seletor.bolRede)
{
    %>
    <select id="escolaRedeSeletor" <%=disabled%>>
    <% 
        if (!(bolAlunoLogado && seletor.intTipoSelecionado == 2))
        {
            %>
            <option value="0">Todas as escolas</option>    
            <%
        } 
            
        if (seletor.listaEscolas != null && seletor.listaEscolas.Count > 0)
        {
            for (int i = 0; i < seletor.listaEscolas.Count; i++)
            {
                %>
                <option value="<%=seletor.listaEscolas[i].id %>"><%=seletor.listaEscolas[i].strNome%></option>
                <%
            }
        }
       
    %>						        
	</select>
    <%
}

if (seletor.bolUnidade)
{
    %>
    <select id="unidadesSeletor" <%=seletor.bolRede ? "disabled=\"disabled\"" : "" %> <%=disabled%>>
        <%
            if (!(bolAlunoLogado && seletor.intTipoSelecionado == 2))
            {
                %>
                <option value="0">Todas as unidades</option>    
                <%
            }
            
            if (seletor.listaUnidades != null && seletor.listaUnidades.Count > 0)
            {
                for (int i = 0; i < seletor.listaUnidades.Count; i++)
                {   
                    %>
                    <option value="<%=seletor.listaUnidades[i].id%>"><%=seletor.listaUnidades[i].strUnidade %></option>
                    <%
                }
            }
        %>
	</select>
    <%
}

if (seletor.listaEnsino == null || seletor.listaEnsino.Count == 0)
{
    %>
    <select id="nivelEnsinoSeletor" disabled="disabled">    
    <%
}
else
{
    %>
    <select id="nivelEnsinoSeletor" <%=!seletor.bolRede && !seletor.bolUnidade ? "" : "disabled=\"disabled\"" %> <%=disabled%>>
    <%
}
        if (bolAlunoLogado && seletor.intTipoSelecionado == 2)
        {
            var ensinoAluno = seletor.listaEnsino.Find(x => x.idEnsino == seletor.intidEnsino);
            
            %>
            <option value="<%=ensinoAluno.idEnsino %>"><%=ensinoAluno.strEnsino%></option>
            <%
        }
        else
        {
        %>
            <option value="-1">Todos os níveis</option>
        <%
            if (!seletor.bolRede && !seletor.bolUnidade)
            {
                if (seletor.listaEnsino != null && seletor.listaEnsino.Count > 0)
                {
                    foreach (Seletor.Model.Ensino e in seletor.listaEnsino)
                    {                                        
                    %>
                    <option value="<%=e.idEnsino %>"><%=e.strEnsino%></option>
                    <%
                    }
                }
            }
        }
    %>				
</select>

<select id="intAnoSerieSeletor" disabled="disabled">
    <%
        if (seletor.intIdSerie > 0 && seletor.intTipoSelecionado == 2)
        { 
        %>
            <option value="<%=seletor.intIdSerie %>"><%=seletor.strIdSerie %></option>

        <% } else { %>
    	    <option value="0">Todas as séries/anos</option>
        <% }
        
        %>

</select>

<select id="turmasSeletor" disabled="disabled">

    <%
        if (seletor.intIdTurma > 0  && seletor.intTipoSelecionado == 2)
        { 
        %>
            <option selected="selected" value="<%=seletor.intIdTurma %>"><%=seletor.strIdTurma %></option>

        <% } else { %>
        	<option value="0">Todas as turmas</option>
        <% }
        %>
</select>
