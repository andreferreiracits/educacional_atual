<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%
    if ((bool)ViewData["bolResponsavel"]){
        Response.Write("True");    
    }else{
        Response.Write("False");    
    }

 %>
