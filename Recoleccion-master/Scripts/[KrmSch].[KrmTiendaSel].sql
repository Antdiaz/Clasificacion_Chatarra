USE [Karma]
GO

IF OBJECT_ID(N'[KrmSch].[KrmTiendaSel]', N'P') IS NULL
    EXEC('CREATE PROCEDURE [KrmSch].[KrmTiendaSel] AS SET NOCOUNT ON;')
GO
---=================================
--- Descripción: Selecciona una tienda
---=================================

---EXEC [KrmSch].[KrmTiendaSel] @pnClaTienda = 0;

ALTER PROCEDURE [KrmSch].[KrmTiendaSel]
	  @pnClaTienda	INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ClaTienda, NomTienda, Descripcion, 
		   BajaLogica, FechaBajaLogica, FechaUltimaMod, ClaUsuarioMod, NombrePcMod
	FROM [krmsch].[krmCatTienda]
	WHERE (@pnClaTienda > 0 and  ClaTienda = @pnClaTienda) OR @pnClaTienda <= 0;
	SET NOCOUNT OFF;
END
GO


