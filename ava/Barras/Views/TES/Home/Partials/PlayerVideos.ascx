<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<% 
    string strVideo = ViewData["video"].ToString();   
%>
<link href="/AVA/StaticContent/Common/videoJS/video-js.css<%=Url.TimeStampLink() %>" rel="stylesheet">
<script src="/AVA/StaticContent/Common/videoJS/video.js<%=Url.TimeStampLink() %>"></script>
<video id="my_video_1" class="video-js vjs-default-skin" controls
  preload="auto" width="640" height="498" poster="/AVA/StaticContent/Common/Videos/<%=strVideo%>.png"
  data-setup="{}">
  <source src="http://www.educacional.com.br/AVA/StaticContent/Common/Videos/<%=strVideo%>.mp4" type='video/mp4'>
  
</video>

