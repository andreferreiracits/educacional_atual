<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.DiscursivaManualOpiniaoRealizadao>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<table>
    <tr>
    <td class="questaoEnunciado" colspan="2"><%=UtilView.ResolvePathImgPrint(Model.Questao.Questao.Enunciado.TextoView)%></td>
    </tr>
    <tr colspan="2"><td> </td></tr>
    <tr>
        <td class="alternativaMargin"   style="vertical-align: top;"> 
        </td>

        <td class="alternativaConteudo tblDiscursivaBrancaResposta" <% if(String.IsNullOrWhiteSpace(Model.Texto)) { %> style="height:100px" <% } %> ><%=Model.Texto%></td>
    </tr>

</table>
