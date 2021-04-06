USE [Karma]
GO

IF OBJECT_ID(N'[KrmSch].[KrmPedidoIU]', N'P') IS NULL
    EXEC('CREATE PROCEDURE [KrmSch].[KrmPedidoIU] AS SET NOCOUNT ON;')
GO
---=================================
--- Descripción: Inserta o actualiza un producto en la tabla KrmCatPedido.
---=================================

---EXEC [KrmSch].[KrmPedidoIU] @pnClaPedido = 0, @pnClaProducto = 0, @pnClaUsuario = 0, @pnClaUnidad = 0, @pnCantidad = 0, @psComentarios = '', @psFechaEntrega , @pnClaEstatus = 0, @pnPrecioTotal, @pnBajaLogica = 0, @pnClaUsuarioMod = 0, @psNombrePcMod = 'TEST'


ALTER PROCEDURE [KrmSch].[KrmPedidoIU]
	 @pnClaPedido		INT = 0
	,@pnClaProducto		INT = 0
	,@pnClaUsuario		INT = 0
	,@pnClaUnidad		INT = 0
	,@pnCantidad		INT= 0
	,@psComentarios		VARCHAR(300) = ''
	,@psFechaEntrega	DATETIME
	,@pnClaEstatus		INT = 0
	,@pnPrecioTotal		NUMERIC(18,4)
	,@pnBajaLogica		INT = 0
	,@pnClaUsuarioMod	INT = 0
	,@psNombrePcMod		VARCHAR(64)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE	@dFechaActual	DATETIME;
	
	SELECT	@dFechaActual	= GETDATE();

	IF @pnClaPedido = 0
	BEGIN
		-- INSERT
		SELECT @pnClaPedido = MAX(ClaPedido) FROM [KrmSch].[KrmTraPedido];
		SELECT @pnClaPedido = COALESCE(@pnClaPedido, 0) +1;

		IF @pnClaPedido IS NOT NULL AND LEN(@pnClaPedido) > 0
		BEGIN
			INSERT INTO [krmsch].[krmTraPedido](
			ClaPedido, ClaProducto, ClaUsuario, ClaUnidad, Cantidad , Comentarios, FechaEntrega, 
			ClaEstatus, PrecioTotal, BajaLogica, FechaBajaLogica, FechaUltimaMod, ClaUsuarioMod, NombrePcMod)
			SELECT 
			@pnClaPedido, @pnClaProducto, @pnClaUsuario, @pnClaUnidad, @pnCantidad, @psComentarios, @psFechaEntrega, 
			@pnClaEstatus, @pnPrecioTotal, 0, NULL, @dFechaActual, @pnClaUsuarioMod, @psNombrePcMod;
		END
	END
	ELSE BEGIN
		-- UPDATE
		UPDATE [krmsch].[krmTraPedido]
		SET 
			  ClaPedido			= ISNULL(@pnClaPedido,ClaPedido)
			, ClaProducto		= ISNULL(@pnClaProducto,ClaProducto)
			, ClaUsuario		= @pnClaUsuario
			, ClaUnidad			= @pnClaUnidad
			, Cantidad          = @pnCantidad
			, Comentarios       = @psComentarios
			, FechaEntrega		= @psFechaEntrega
			, ClaEstatus           = @pnClaEstatus
			, PrecioTotal       = @pnPrecioTotal
			, BajaLogica		= @pnBajaLogica
			, FechaBajaLogica	= CASE @pnBajaLogica WHEN 0 THEN NULL ELSE @dFechaActual END
			, FechaUltimaMod	= @dFechaActual
			, ClaUsuarioMod		= @pnClaUsuarioMod
			, NombrePcMod		= @psNombrePcMod
		where ClaProducto		= @pnClaProducto;
	END

	SELECT ClaPedido, ClaProducto, ClaUsuario, ClaUnidad, Cantidad, Comentarios, FechaEntrega, ClaEstatus, PrecioTotal,
	       BajaLogica, FechaBajaLogica, FechaUltimaMod, ClaUsuarioMod, NombrePcMod 
	FROM [krmsch].[krmTraPedido]
	WHERE ClaPedido = @pnClaPedido;

	SET NOCOUNT OFF;
END
GO