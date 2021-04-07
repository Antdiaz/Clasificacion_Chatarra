USE [Karma]
GO

IF OBJECT_ID(N'[KrmSch].[KrmProductoSel]', N'P') IS NULL
    EXEC('CREATE PROCEDURE [KrmSch].[KrmProductoSel] AS SET NOCOUNT ON;')
GO
---=================================
--- Descripción: Proceso para obtener la información de un producto.
---=================================

--- EXEC [KrmSch].[KrmProductoSel] @pnClaProducto = 6
--- EXEC [KrmSch].[KrmProductoSel] @pnClaProducto = 0

ALTER PROCEDURE [KrmSch].[KrmProductoSel] 
	@pnClaProducto	INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		a.ClaProducto, a.NomProducto,     a.Descripcion,    a.Precio,        a.ClaUnidad,  c.NomUnidad,	
		a.BajaLogica,  a.FechaBajaLogica, a.FechaUltimaMod,	a.ClaUsuarioMod, a.NombrePcMod
	FROM [KrmSch].[KrmCatProducto] a
	INNER JOIN [krmsch].[krmCatUnidad] c ON a.ClaUnidad = c.ClaUnidad
	WHERE (@pnClaProducto > 0 and ClaProducto = @pnClaProducto) or @pnClaProducto <= 0;

	SET NOCOUNT OFF;
END
GO