USE [Karma]
GO

IF OBJECT_ID(N'[KrmSch].[KrmPedidoDashSrv]', N'P') IS NULL
    EXEC('CREATE PROCEDURE [KrmSch].[KrmPedidoDashSrv] AS SET NOCOUNT ON;')
GO
---=================================
--- Descripción: Selecciona los pedidos en base a un usuario.
---=================================

---EXEC [KrmSch].[KrmPedidoDashSrv] @pnClaUsuario = 0;

ALTER PROCEDURE [KrmSch].[KrmPedidoDashSrv]
	@pnClaUsuario			INT = 0
AS
BEGIN
	SET NOCOUNT ON;

	SELECT COUNT(a.ClaPedido) AS Cantidad, b.NomEstatus, a.ClaUsuario
	FROM [KrmSch].[KrmTraPedido] a
	INNER JOIN [KrmSch].[KrmCatEstatus] b ON a.ClaEstatus = b.ClaEstatus
	WHERE a.ClaUsuario = @pnClaUsuario
	GROUP BY b.NomEstatus, a.ClaUsuario;

	SET NOCOUNT OFF;
END
GO