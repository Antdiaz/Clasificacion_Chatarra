USE [Karma]
GO

IF OBJECT_ID(N'[KrmSch].[KrmProductoIU]', N'P') IS NULL
    EXEC('CREATE PROCEDURE [KrmSch].[KrmProductoIU] AS SET NOCOUNT ON;')
GO
---=================================
--- Descripción: Inserta o actualiza un producto en la tabla KrmCatProducto
---=================================

--- EXEC [KrmSch].[KrmProductoIU] @pnClaProducto = 0, @psNomProducto = 'pRODUCTO test', @psDescripcion = 'TEST', @pnPrecio = 6.00, @pnClaUnidad = 1, @pnBajaLogica = 0, @pnClaUsuarioMod = 903022, @psNombrePcMod = 'test'

ALTER PROCEDURE [KrmSch].[KrmProductoIU]
	@pnClaProducto		INT = 0
	,@psNomProducto		VARCHAR(300) = ''
	,@psDescripcion		VARCHAR(300) = ''
	,@pnPrecio			NUMERIC(18,4)
	,@pnClaUnidad		INT = 0
	,@pnBajaLogica		INT = 0
	,@pnClaUsuarioMod	INT = 0
	,@psNombrePcMod		VARCHAR(64)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE	@dFechaActual	DATETIME;
	
	SELECT	@dFechaActual	= GETDATE();
	
	IF @pnClaProducto = 0
	BEGIN
		-- INSERT
		SELECT @pnClaProducto = MAX(ClaProducto) FROM [krmSch].[krmCatProducto];
		SELECT @pnClaProducto = COALESCE(@pnClaProducto, 0) +1;

		IF @psNomProducto IS NOT NULL AND LEN(@psNomProducto) > 0
		BEGIN
			INSERT INTO [krmsch].[krmCatProducto]
			(		ClaProducto,	NomProducto,	Descripcion,	Precio,		ClaUnidad,		BajaLogica,	FechaBajaLogica,	FechaUltimaMod,	  ClaUsuarioMod,	NombrePcMod)
			SELECT	@pnClaProducto,	@psNomProducto,	@psDescripcion, @pnPrecio,	@pnClaUnidad,	0,			NULL,				@dFechaActual, @pnClaUsuarioMod, @psNombrePcMod;
		END
	END
	ELSE 
	BEGIN
		-- UPDATE
		UPDATE [krmsch].[krmCatProducto]
		SET 
			  NomProducto		= ISNULL(@psNomProducto,NomProducto)
			, Descripcion		= ISNULL(@psDescripcion,Descripcion)
			, Precio            = @pnPrecio
			, ClaUnidad         = @pnClaUnidad   
			, BajaLogica		= @pnBajaLogica
			, FechaBajaLogica	= CASE @pnBajaLogica WHEN 0 THEN NULL ELSE @dFechaActual END
			, FechaUltimaMod	= @dFechaActual
			, ClaUsuarioMod		= @pnClaUsuarioMod
			, NombrePcMod		= @psNombrePcMod
		where ClaProducto		= @pnClaProducto;
	END

	SELECT ClaProducto, NomProducto, Descripcion, Precio, ClaUnidad, 
		   BajaLogica, FechaBajaLogica, FechaUltimaMod, ClaUsuarioMod, NombrePcMod
	FROM [krmSch].[krmCatProducto]
	WHERE ClaProducto = @pnClaProducto;

	SET NOCOUNT OFF;
END
GO