<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.Etapa>>" %>

<a href="javascript: void(0);" class="ne-excluir large awesome awesome-red" id="btExcluirEtapa" onclick="excluirEtapa()">excluir</a>

<div class="ctn-numeros">
    <%
    int idCaminho = 0;        
    foreach (var etapa in Model)
    {
        string strClassAtivo = "";
        if (etapa.intEtapa == 1)
        {
            strClassAtivo = "ativo";
        }     
        %>
        <a href="javascript: void(0);" onclick="editarEtapa(<%=etapa.id%>, <%=etapa.intEtapa%>)" id="<%=etapa.intEtapa%>" class="ne-numeros <%=strClassAtivo%>"><%=etapa.intEtapa%></a>    
        <%
        idCaminho = etapa.idCaminho;
    }
    %>
</div>
          
<a href="javascript: void(0);" class="ne-adiciona b_tooltip_center" onclick="adicionarEtapa(<%=idCaminho%>)"></a>
<span class="black_tip_center black_tip_P tooltip">
    Adicionar etapa
    <span class="black_tip_seta">&#9660;</span>      
</span>  

<span id="btSalvarEtapaSpan">
    <a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarEtapa" onclick="salvarEtapa(false,true)">Salvar</a>
</span>

<a href="javascript: void(0);" id="btEscondidoEtapa"></a>


    
