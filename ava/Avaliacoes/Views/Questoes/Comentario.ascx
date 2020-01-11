<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ComentarioView>" %>

<input type="hidden" id="idComent_<%=Model.Id %>" name="idComent" value="<%=Model.Id %>" />



<div class="comentProf areaBoxComentProf">
    <div class="indBoxProfessor indSup"></div>
    <div class="boxSugestaoProfessor boxMaior">
        <label class="ComentProf">Sugestão para professores (Opcional. Mostrada para outros professores em questões compartilhadas.)</label>
        
        <input type="hidden" id="hidTemHtml_comentProf_<%=Model.Id %>" name="hidTemHtml_comentProf" value="<%=Model.Professor.TemHtml ? "1" : "0" %>" />

        <%= Html.TextArea("txtComentProf", Model.Professor.Texto, new { @id = "txtComentProf_" + Model.Id, @cols = "74", @rows = "18", @class = "txtareaComentario txtareaMaior plano ", @maxchar = Model.LimiteProfessor, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.LimiteProfessor) })%>

        <ul class="opcoesAdicionais opcoesAdicionaisComent">
            <li class="comentEditorTxt"><a>Editor texto</a></li>
            <li class="comentEditorHtml"><a>Editor HTML</a></li>
        </ul>
    </div>
</div>

<div class="comentAluno areaBoxComentAluno">
    <div class="indBoxAluno indSup"></div>
    <div class="boxSugestaoAluno boxMaior">
        <label class="ComentAluno">Comentário (Opcional. Mostrado para o aluno após o encerramento da prova.)</label>
        
        <input type="hidden" id="hidTemHtml_comentAluno_<%=Model.Id %>" name="hidTemHtml_comentAluno" value="<%=Model.Aluno.TemHtml ? "1" : "0" %>" />

        <%= Html.TextArea("txtComentAluno", Model.Aluno.Texto, new { @id = "txtComentAluno_" + Model.Id, @cols = "74", @rows = "18", @class = "txtareaComentario txtareaMaior plano ", @maxchar = Model.LimiteAluno, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.LimiteAluno) })%>

        <ul class="opcoesAdicionais opcoesAdicionaisComent">
            <li class="comentEditorTxt"><a>Editor texto</a></li>
            <li class="comentEditorHtml"><a>Editor HTML</a></li>
        </ul>
    </div>
</div>

<div class="comentDica areaBoxComentDica">
    <div class="indBoxDica indSup"></div>
    <div class="boxSugestaoDica boxMaior">
        <label class="ComentDica">Dica (Opcional. Mostrada para o aluno durante a prova.)</label>
        
        <input type="hidden" id="hidTemHtml_comentDica_<%=Model.Id %>" name="hidTemHtml_comentDica" value="<%=Model.Dica.TemHtml ? "1" : "0" %>" />

        <%= Html.TextArea("txtComentDica", Model.Dica.Texto, new { @id = "txtComentDica_" + Model.Id, @cols = "74", @rows = "18", @class = "txtareaComentario txtareaMaior plano ", @maxchar = Model.LimiteDica, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.LimiteDica) })%>

        <ul class="opcoesAdicionais opcoesAdicionaisComent">
            <li class="comentEditorTxt"><a>Editor texto</a></li>
            <li class="comentEditorHtml"><a>Editor HTML</a></li>
        </ul>
    </div>
</div>
