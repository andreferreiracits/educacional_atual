<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IDictionary<string, IList<ProvaColegiada.Models.Relatorios.ItemFlippedLearning>>>" %>
<%@ Import namespace="ProvaColegiada.Models.Relatorios" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%

    int totalQuestoes = 0;
    if (Model.Count > 0)
    {
        totalQuestoes = Model.Max(t => t.Value.Max(i => i.Ordem));

%>
<input type="hidden" id="TotalDuvidasTurma" value="<%=ViewData["TotalDuvidas"] %>" />
<table id="tblAlunoQuestao" cellpadding="0" cellspacing="0" border="0">
    <tbody>
        <tr>
            <td class="AlunoHead">
                <span>Aluno</span><a id="scrolleft" href="javascript:void(0);"> <img src="<%=UtilView.Url("/Content/imgcss/flipped/btn_left.png")%>"  /> </a><a id="scrollright" href="javascript:void(0);"> <img src="<%=UtilView.Url("/Content/imgcss/flipped/btn_right.png")%>"  /> </a>
            </td>
            <td rowspan="<%=Model.Count + 1%>" class="TabelaConteudo">
            <div class="externo">
            <div class="interno">
            <table  cellpadding="0" cellspacing="0" border="0" id="TabelaConteudo">
                <thead>
                    <tr>
                    <% for (int i = 0; i < totalQuestoes; i++)
                   {
                       int posQuestao = i + 1;
                       int maxTentativas = Model.Sum(t => t.Value.Where(l => l.Ordem == (posQuestao)).Select(l => l.Tentativas).First());
                       
                   %>
                    <th colspan="2" class="Questao">
                        <p class="sup"><%=maxTentativas%></p>
                        <p class="num"><%=posQuestao%></p>
                        
                    </th>
                   <%
                   }%>
                    </tr>
                </thead>
                <tbody>
        <% foreach (KeyValuePair<string, IList<ItemFlippedLearning>> valor in Model)
       {
           %>
           <tr class="Aluno">
                <% for (int i = 0; i < totalQuestoes; i++)
              { 
              %>
              <td onclick="viewQuestao(<%=valor.Value[i].ProvaRealizada %>,<%=valor.Value[i].OrdemRealizada-1 %>)" class="Acerto"> 
              <% 
                  if (valor.Value[i].Respondida)
                  {
                      if (valor.Value[i].Acertou)
                      { %>
                <img src="<%=UtilView.Url("/Content/imgcss/ico_correta.png")%>"  />
              <% }
                      else
                      { %>
                 <img src="<%=UtilView.Url("/Content/imgcss/ico_incorreta.png")%>"  />
                 <%}
                  } %>
              </td>
              <td onclick="viewQuestao(<%=valor.Value[i].ProvaRealizada %>,<%=valor.Value[i].OrdemRealizada-1 %>)"  class="Tentativa"><%=valor.Value[i].Tentativas > 0 ? valor.Value[i].Tentativas.ToString() : ""%></td>
              <%
              }%>
            <%
              }%>
              </tr>
                </tbody>
            </table>
            </div>
            </div>
            </td>
        </tr>

    
    <% foreach (KeyValuePair<string, IList<ItemFlippedLearning>> valor in Model)
       {
           
           %>
           <tr class="Aluno">
           <td class="Aluno"><div title="<%=valor.Key%>" onclick="viewRealizada(<%=valor.Value[0].ProvaRealizada %>)" ><%=valor.Key%></div></td>
           </tr>
           <%
       } %>
       </tbody>
       <tfoot>
        <tr>
        <td colspan="<%=(totalQuestoes*2)+1 %>">
        <div><b>Legenda:</b></div> <div><img src="<%=UtilView.Url("/Content/imgcss/ico_correta.png")%>"  /> aluno acertou a questão </div><div><img src="<%=UtilView.Url("/Content/imgcss/ico_incorreta.png")%>"  /> aluno errou a questão</div><div><span class="sup">n</span>número total de tentativas*</div>
        <p>*Ao clicar no botão conferir, uma tentativa é contada.</p>
        </td>
        </tr>
       </tfoot>
</table>

<% }
    else
    {%>
    Nenhuma realização
<% } %>