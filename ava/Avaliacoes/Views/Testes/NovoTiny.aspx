﻿<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>TesteProvaJson</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.7.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/3.5.8_tiny_mce/tiny_mce.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/tiny_mce/jquery.tinymce.js") %>"></script>


    <script type="text/javascript">
    	$(document).ready(function() {
    	    $('textarea.tinymce').tinymce({
    	        // General options
    	        theme: "advanced",
    	        plugins: "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

                skin: "o2k7",
                skin_variant: "silver",

    	        // Theme options
    	        theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
    	        theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
    	        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
    	        theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
    	        theme_advanced_toolbar_location: "top",
    	        theme_advanced_toolbar_align: "left",
    	        theme_advanced_statusbar_location: "bottom",
    	        theme_advanced_resizing: true,

    	        // Example content CSS (should be your site CSS)
    	        //content_css: "css/content.css",

    	        // Drop lists for link/image/media/template dialogs
    	        template_external_list_url: "lists/template_list.js",
    	        external_link_list_url: "lists/link_list.js",
    	        external_image_list_url: "lists/image_list.js",
    	        media_external_list_url: "lists/media_list.js",

    	        // Replace values for the template plugin
//    	        template_replace_values: {
//    	            username: "Some User",
//    	            staffid: "991234"
//    	        }
    	    });
        });
    </script>



</head>
<body>
   <textarea class="tinymce"></textarea>
</body>
</html>
