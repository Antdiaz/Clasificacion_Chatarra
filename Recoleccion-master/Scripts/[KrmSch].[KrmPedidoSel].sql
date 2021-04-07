USE [Karma]
GO

IF OBJECT_ID(N'[KrmSch].[KrmPedidoSel]', N'P') IS NULL
    EXEC('CREATE PROCEDURE [KrmSch].[KrmPedidoSel] AS SET NOCOUNT ON;')
GO
---=================================
--- Descripción: Lista los pedidos de la tabla.
---=================================

---EXEC [KrmSch].[KrmPedidoSel] 

ALTER PROCEDURE [KrmSch].[KrmPedidoSel]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT a.ClaPedido, a.ClaProducto, a.ClaUsuario, a.ClaUnidad, a.Cantidad, a.Comentarios, a.FechaEntrega, a.ClaEstatus, a.PrecioTotal, b.NomEstatus, c.NomUnidad,
		   a.BajaLogica, a.FechaBajaLogica, a.FechaUltimaMod, a.ClaUsuarioMod, a.NombrePcMod
	FROM [krmsch].[krmTraPedido] a
	INNER JOIN [krmsch].[krmCatEstatus] b ON a.ClaEstatus = b.ClaEstatus
	INNER JOIN [krmsch].[krmCatUnidad] c ON a.ClaUnidad = c.ClaUnidad;
	SET NOCOUNT OFF;
END
GO