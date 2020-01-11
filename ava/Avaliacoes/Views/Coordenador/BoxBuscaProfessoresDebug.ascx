<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<form id="buscarPorId">
<label>
    Digite o ID do professor:
    <input type="text" class="txtC" name="idProfessorDebug" id="idProfessorDebug" value="30154567"/>
    <button type="submit">Ok</button>
</label>
</form>
<script language="javascript">

    $("#buscarPorId").submit(function (evt) {
        retornoSelecionadoProfessor($("#idProfessorDebug").val(), $("#idProfessorDebug").val())
        evt.preventDefault();
    });


</script>
