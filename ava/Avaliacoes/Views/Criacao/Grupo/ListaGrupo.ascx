<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.ProvaGrupoView>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<table atual="0" cellspacing="0" border="0" cellpadding="0">
    <tbody>
    <% 
        int countLinha = 0;
        foreach (ProvaGrupoView grupo in Model){
           
           %>
      <tr id="grupo_<%=countLinha%>">
            
            <td style="width:325px;">
                <a class="lnk">
                    <%= Html.Encode(grupo.Nome) %>
                </a>
                <div class="botoes">
                    <!--%= Html.ActionLink("Aplicar", "AplicarGrupo", new { @id = grupo.Id.ToString() }, new { @class = "btn normal" })%-->
                    <a href="aplicarAgrupamento(<%=grupo.Id.ToString() %>)" class="btn funcao">Aplicar</a>
                    <a href="abrirAgrupamento(<%=grupo.Id.ToString() %>)" class="btn funcao">Editar</a>
                    <a href="excluirAgrupamento(<%=grupo.Id.ToString() %>)" class="btnExcluir funcao">Excluir</a>
                    <% if (grupo.Capa)
                       {  %>
                    <a href="visualizarAgrupamento(<%=grupo.Id.ToString() %>)" class="btn funcao">Ver capa</a>
                    <%} %>
                </div>
            </td>
            <td style="width:60px;"><div class="labelSigla agrupamentoCor-<%=grupo.Cor %>"><%= Html.Encode(grupo.Sigla)%></div></td>
            <td style="width:15px;" class="nopaddingL">
                <input type="hidden" name="idProvaGrupo" value="<%=grupo.Id%>" />
                <a class="reordenar "></a>
            </td>
        </tr>     
     <%
         countLinha++;
       }%>
    </tbody>
</table>
