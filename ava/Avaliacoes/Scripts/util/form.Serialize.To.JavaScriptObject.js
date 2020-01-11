/***
http://jsfiddle.net/Jowqm/CETUq/2/

Serializa um form para um objeto JavaScript, exmplo;

<form>
<input type="text" name="Titulo" value="Titulo do objeto!"/
<input type="hidden" name="Realizador.Id" value="10"/>
<input type="hidden" name="Realizador.Tipo" value="11"/>
<input type="hidden" name="Realizador.Id" value="20"/>
<input type="hidden" name="Realizador.Tipo" value="21"/>

<input type="text" name="ATT" value=""/
<input type="text" name="ATT" value="11"/
<input type="text" name="ATT" value="12"/

</form>

retorna
{
"Titulo":"Titulo do objeto!",
"ATT" : [11,12],
"Realizador":[
{"Id":"10","Tipo":"11"},
{"Id":"20","Tipo":"21"}
]
}
***/
$(document).ready(function () {
    //http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
    $.fn.serializeObject = function () {
        var o = {};
        //    var a = this.serializeArray();
        $(this).find('input[type="hidden"], input[type="text"], input[type="password"], input[type="checkbox"]:checked, input[type="radio"]:checked, select').each(function () {
            if ($(this).attr('type') == 'hidden') { //if checkbox is checked do not take the hidden field
                var $parent = $(this).parent();
                var $chb = $parent.find('input[type="checkbox"][name="' + this.name.replace(/\[/g, '\[').replace(/\]/g, '\]') + '"]');
                if ($chb != null) {
                    if ($chb.prop('checked')) return;
                }
            }

            if (this.name === null || this.name === undefined || this.name === '')
                return;

            var elemValue = null;

            if ($(this).is('select'))
                elemValue = $(this).find('option:selected').val();
            else
                elemValue = this.value;

            if ($.trim(elemValue).length > 0 && $.isNumeric(Number(elemValue))) {
                elemValue = Number(elemValue);
            }


            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                //o[this.name].push(elemValue || '');

                if ( $.trim(elemValue).length > 0 )
                    o[this.name].push(elemValue);
            } else {
                //o[this.name] = elemValue || '';
                o[this.name] = elemValue;
            }
        });

        //Ajusta "Realizador.Tipo" para Realizador [ { Tipo: } ]
        for (var name in o) {
            if (name.indexOf('.') != -1) {
                var nome = name.substring(0, name.indexOf('.'));
                var attr = name.substring(name.indexOf('.') + 1, name.length);

                if (o[nome] == undefined) {
                    o[nome] = [];
                }
                $.each(o[name], function (i, v) {
                    if (o[nome][i] == undefined)
                        o[nome][i] = {};

                    o[nome][i][attr] = v;
                });

                delete o[name];
            }
        }


        return o;
    }
});