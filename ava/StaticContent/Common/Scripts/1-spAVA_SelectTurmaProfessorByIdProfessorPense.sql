USE [educacionalotimizado]
GO
/****** Object:  StoredProcedure [dbo].[spAVA_SelectTurmaProfessorByIdProfessorTOPSemAcesso]    Script Date: 18/07/2019 19:12:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
 
 
                                                                                                                                                                                                                                                               
CREATE PROC [dbo].[spAVA_SelectTurmaProfessorByIdProfessorPense]                                                                                                                                                                                                 
(                                                                                                                                                                                                                                                              
 @idProfessor int ,                                                                                                                                                                                                                                             
 @intAno int ,                                                                                                                                                                                                                                                  
 @strSemestres varchar(max) ,                                                                                                                                                                                                                                   
 @strUnidade varchar(max) = NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                            )                                                                                                                                                                                                
AS                                                                                                                                                                                                                                                             
BEGIN                                                                                                                                                                                                                                                          
 
 
select distinct 


--t.IdTurma, t.strTurma, s.strSerie, s.IdSerie, s.idCurso, s.intOrdem

mp.IdProfessor ,strNome, t.IdTurma ,t.strTurma , t.intAno , 0 as intSemestre , s.intOrdem , s.IdCurso , g.idGrupo  as idGrupo , g.strLinkPermanente as strLinkPermanente , 1 as idMinhaTurma, ep.IdEscola
 
               from educacionalotimizado..tblUsuario u 
                        inner join educacionalotimizado..tblEscolaParametros ep on u.IdEscola = ep.IdEscola 
                        inner join educacionalotimizado..tblMateriaProfessor mp on u.IdUsuario = mp.IdProfessor 
                        inner join educacionalotimizado..tblTurma t on mp.IdTurma = t.IdTurma and t.intAno = ep.intAnoVigente 
                        inner join educacionalotimizado..tblSerie s on s.IdSerie = t.IdSerie 
                        inner join RedeSocial..tblGrupo g on g.idTurma = t.IdTurma
                        -- where  u.IdUsuario = 10956324
                        where  u.IdUsuario = @idProfessor
                         order by s.idCurso, s.intOrdem, t.strTurma;

--where u.strLogin like 'sionmirian'   --10956324

--where u.strLogin like 'tany191180'      --11356889

--where u.strLogin like 'gl.isabelchristine'  --11663541
 
  
END                                                                                                                                                                                                                                                            
         

GO


GRANT EXECUTE ON spAVA_SelectTurmaProfessorByIdProfessorPense TO EDUCACIONAL
GO


