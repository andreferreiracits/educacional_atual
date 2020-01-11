<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#Include Virtual = "/Recursos/spConn/spConn.asp"-->
<%

'set objC = server.CreateObject("ADODB.Command")
'objC.activeConnection = Application("educacional_otimizado.udl")
'objC.commandtext = "SELECT * FROM tblSimulador" 
'set rsC = server.createObject("ADODB.recordSET")
'rsC.cursorlocation = 3
'rsC.open objC

	Response.CacheControl = "no-cache"
	Response.AddHeader "Pragma", "no-cache"
	Response.Expires = -1
	Response.Clear
	Response.Charset = "ISO-8859-1"	

%>
<html>
<head>
<title>Caixa de texto</title>
<script type="text/javascript" src="../../tiny_mce_popup.js"></script>
<script src="js/jquery.js"></script>
<script>

ed = tinyMCEPopup.editor;

function carregaValsInput() {
		var the_id = tinyMCEPopup.getWindowArg('editor_id');
		var the_arr = tinymce.explode(ed.dom.getAttrib(the_id,'the_vals'),'|')
		tinymce.each(the_arr,function(o,k){
			if(k==0){}
			else if(k==1)
				document.getElementById('principal_input').value = o;
			else if(k==2)
				document.getElementById('secundario_input_'+Number(k-1)).value = o;
			else if(k>2)
				$('#the_botoes').before('<div class="the_caixa"><input id="secundario_input_'+Number(k-1)+'" type="text" maxlength=60 class="secundario" value="'+o+'"><IMG src="images/x.jpg" title="remover resposta" onClick="remove(this)" class="menos"></div>');
					
		});
		document.getElementById('principal_input').focus();
	}

function insereValsInput() {

	_c_i = false;
	els = document.getElementsByTagName("input")
	strs = ''
	tinymce.each(els,function(o){
		
		if (o.value.indexOf('|') > -1 || o.value.indexOf(',') > -1){
			alert('Existem caracteres inválidos na resposta');
			o.focus();
			_c_i = true;
			return false;
		} 
		
		if(o.type == 'text'){
			if (o.value != '' && o.value){
				if (strs == '')
					strs = 'combo|'+tinymce.trim(o.value);
				else
					strs+='|'+tinymce.trim(o.value);
			}		
		}
	});
	
	if(_c_i)return false;
	
	if(strs == '')
		strs = 'null';
		
	ed.dom.setAttrib(tinyMCEPopup.getWindowArg("editor_id"),"the_vals",strs);
	
	tinyMCEPopup.close();
}

function cancelar(){
	tinyMCEPopup.close();
}

function adiciona(){
	$('#the_botoes').before('<div class="the_caixa"><input type="text" maxlength=60 class="secundario"><IMG src="images/x.jpg" title="remover resposta" onClick="remove(this)" class="menos"></div>');
	$('.secundario').each(function(i){
		$(this).attr('id','secundario_input_'+(i+1));
	});
	//<div style="float:left; width:50px; height:20px; border:red solid 1px;"></div>
}

function remove(t){
	$(t).parent().remove();
	$('.secundario').each(function(i){
		$(this).attr('id','secundario_input_'+(i+1));
	});
}
</script>
<style>
BODY{
	background-color:#FFF;
}
#mce_educ_geral{
	border-bottom:solid 1px #000;border-left:solid 1px #000;border-right:solid 1px #000;height:260px;width:458px;
}
#mce_educ_geral .the_tit{
	font-weight:bold;font-size:11px;padding:20px 0 5px 20px;position:relative;
}
#mce_educ_geral .the_caixa{
	text-align:center;font-size:11px;padding:5px;position:relative;
}
#mce_educ_geral .the_caixa input{
	
}
#mce_educ_geral #the_botoes{
	text-align:center;font-size:12px;padding:5px;font-weight:bold;
}
#mce_educ_geral #the_botoes input{
	width:80px;border:solid 2px #FFCC66;cursor:pointer;
} 
#mce_educ_geral #the_botoes #ok_cancelar{
	margin-left:40px;
}
.secundario, #principal_input{
	width:180px;
}
.menos{
	position:absolute;right:110px;top:7px;font-weight:bold;
}
#mce_educ_geral img{
	cursor:pointer;
}
#voador{
		width:21px; height:17px;position:absolute;right:10px;top:10px;background-color:#FBC05A;
}
	
</style>
</head>
<body onLoad="carregaValsInput();">
<img src="images/topo_combo.jpg?a=1">
<div id="mce_educ_geral">
	
	<div class="the_tit">Resposta correta:</div>
    <div class="the_caixa"><input type="text" maxlength=60 id="principal_input"></div>
    <div class="the_tit">Respostas incorretas: <img src="images/inserir.jpg" id="adicionar" title="adicionar mais respostas" onClick="adiciona()" style="position:absolute;right:45%;"></div>
    <div class="the_caixa"><input type="text" maxlength=60 id="secundario_input_1" class="secundario"><IMG src="images/x.jpg" title="remover resposta" onClick="remove(this)" class="menos"></div>
    <div id="the_botoes"><img src="images/confirmar.jpg" id="ok_input" value="Confirmar" onClick="insereValsInput();"><img src="images/cancelar.jpg"  id="ok_cancelar" value="Cancelar" onClick="cancelar();"></div>

</div>
</body>
</html>