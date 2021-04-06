USE [Karma]
GO

IF OBJECT_ID(N'[KrmSch].[KrmTiendaIU]', N'P') IS NULL
    EXEC('CREATE PROCEDURE [KrmSch].[KrmTiendaIU] AS SET NOCOUNT ON;')
GO
---=================================
--- Descripción: Inserta o actualiza un producto en la tabla [KrmCatTienda]
---=================================

---EXEC [KrmSch].[KrmTiendaIU] @pnClaTienda = 0, @psNomTienda = 'test tienda', @psDescripcion = 'tienda', @pnBajaLogica = 0, @pnClaUsuarioMod = 0, @psNombrePcMod	= 'test'

ALTER PROCEDURE [KrmSch].[KrmTiendaIU]
	  @pnClaTienda			INT = 0
	, @psNomTienda			VARCHAR(300) = ''
	, @psDescripcion		VARCHAR(300) = ''
	, @pnBajaLogica			INT = 0
	, @pnClaUsuarioMod		INT = 0
	, @psNombrePcMod		VARCHAR(64)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE	@dFechaActual	DATETIME;
	
	SELECT	@dFechaActual	= GETDATE();
	

	IF @pnClaTienda = 0
	BEGIN
		-- INSERT
		SELECT @pnClaTienda = MAX(ClaTienda) FROM [KrmSch].[KrmCatTienda];
		SELECT @pnClaTienda = COALESCE(@pnClaTienda, 0) +1;

		
		IF @psNomTienda IS NOT NULL AND LEN(@psNomTienda) > 0
		BEGIN
			INSERT INTO [krmsch].[krmCatTienda](ClaTienda, NomTienda, Descripcion, BajaLogica, FechaBajaLogica, FechaUltimaMod, ClaUsuarioMod, NombrePcMod)
			SELECT @pnClaTienda, @psNomTienda,@psDescripcion, 0, NULL, @dFechaActual, @pnClaUsuarioMod, @psNombrePcMod;
		END
	END
	ELSE 
	BEGIN
		-- UPDATE
		UPDATE [krmsch].[krmCatTienda]
		SET	 NomTienda		 = ISNULL(@psNomTienda,NomTienda)
			,Descripcion	 = ISNULL(@psDescripcion,Descripcion)
			,BajaLogica		 = @pnBajaLogica
			,FechaBajaLogica = CASE @pnBajaLogica WHEN 0 THEN NULL ELSE @dFechaActual END
			,FechaUltimaMod	 = @dFechaActual
			,ClaUsuarioMod	 = @pnClaUsuarioMod
			,NombrePcMod	 = @psNombrePcMod
		where ClaTienda		 = @pnClaTienda;
	END

	SELECT ClaTienda, NomTienda, Descripcion, 
		   BajaLogica, FechaBajaLogica, FechaUltimaMod, ClaUsuarioMod, NombrePcMod 
	FROM [krmsch].[krmCatTienda]
	WHERE ClaTienda = @pnClaTienda;

	SET NOCOUNT OFF;
END
GO                      