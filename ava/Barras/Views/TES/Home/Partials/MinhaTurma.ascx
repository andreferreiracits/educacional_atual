<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<UsuarioAVA.Models.Usuario>>" %>
<% 
bool bolUsuarioSemTurma = Convert.ToBoolean(ViewData["bolUsuarioSemTurma"]);

var turmaID = ViewData["idTurma"];

//int tot_reg = ViewData["tot_reg"] != null ? (int)ViewData["tot_reg"] : 0;
//string strTot_Reg = ViewData["tot_reg"] == null ? "" : (tot_reg > 99 ? "+99" : tot_reg.ToString());
%>


<%
if (!bolUsuarioSemTurma)
{
  
if (ViewData["UrlGrupo"] != null)
    {
        %>
        <header>
        
            <a idTurma="<%:ViewData["idTurma"]%>" href="<%=ViewData["UrlGrupo"] %>" class="vertodos<%=ViewData["idUl"]%> fancybox.ajax"><h4>Minha turma: <%=ViewData["nomeTurma"]%> </h4>
                
        </header>
        <%
    }
    else 
    { 
        %>
        <a idTurma="<%:ViewData["idTurma"]%>" href="javascript: void(0);" id="vertodos<%=ViewData["idUl"]%>" class="vertodos<%=ViewData["idUl"]%> fancybox.ajax">
        <%
    }
               
    %>     


<!-- 

<h1><%=ViewData["bolUsuarioSemTurma"] %> </h1> -->

<div class="bloco_conteudo aluno">
  
        


		<div class="lista-aluno-img_perfil">
      


        </div>
        
    </a>   
   
    <%
}   
else
{
%>
    <a>
		<h5 class="nome_turma">Em breve, acesse o grupo da sua turma!</h5>
		<div class="img_perfil" style="background-image: url(/AVA/StaticContent/Common/img/geral/icone_grupo_turma.png);"></div>
	</a>
<% 
}
%>
</div>

<script type="text/javascript">
    
    var axu = "";

    $(document).ready(function() {


            

            var idPub =  localStorage.getItem("idUser");


            var idTurma = "<%=turmaID%>";

            if (idTurma == null) {

                idTurma = localStorage.getItem("idTurma");
            }

        
            $.ajax({
                url: "/AVA/Barras/Home/ListaAlunosPorTurma/?id="+idPub+"&idTurma="+idTurma,
                async: true,
                cache: false, dataType: "json", type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function (retorno) {
               
                var srtHtml = '';
                  
                if(retorno.Result.length > 0){

                    $.each(retorno.Result, function (ix, item) {

                        
                        // alert(item.strFoto);
                        
                         srtHtml += ' <div  id="lista-aluno-img_perfil" class="lista-aluno-img_perfil"> '+  
                            


                                        '<div id="img_perfil" class="img_perfil ">' +

                                            

                                            '<div class="tooltipsAluno"  >'+


                                            '<a href="/AVA/Perfil/Home/Index/'+item.strLogin+'" > <img src="'+item.strFoto+'" ></a>'+


                                                    '<a href="/AVA/Perfil/Home/Index/'+item.strLogin+'">  '+

                                            
                                                '  <span>'+



                                                    '<div class="fotoAlunoTip"><img class="aluno_foto" src="'+removeThumb(item.strFoto)+'" /></div>'+
                                                    '<h2  class="aluno_nome" >'+item.strNome+'</h2><br/>'+
                                                    '<p <strong>Turma:</strong> '+item.strTurma+'</p><br/>'+
                                                    '<p class="aluno_serie"><strong>'+item.strSerie+'</strong></p>'+
                                                    

                                                '</span>'+

                                                    '</a>'+
                                                 

                                            '</div>'+

                                            
                                    
                                        '</div>'+

                                        '<label class="tooltip" id="alun">'+item.strNome+'</label>'+

                                
                                    '</div>';

                   
                    });

                     $('.lista-aluno-img_perfil').html(srtHtml);
                }

            },
            error: function (data) {
                alert(JSON.stringify(data));
            }


            });


    });


    function removeThumb( strFoto  ){

        var res = strFoto.replace("/minithumb", "");
        return res ; 

    }
                                                    // '<a href="http://dev.educacional.net/AVA/Perfil/Home/Index/'+item.strLogin+'" > Ver Perfil >> </a>'+

</script>
