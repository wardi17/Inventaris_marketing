-- INDEXES & TRIGGERS

-- Trigger to update ms_Inventaris.Stok when ada transaksi pengambilan
CREATE TRIGGER trg_Update_Stok
ON ts_Pengambilan_Inventaris
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @InventarisID INT, @Jumlah INT;

    SELECT @InventarisID = InventarisID, @Jumlah = Jumlah FROM inserted;

    UPDATE ms_Inventaris
    SET Stok = Stok - @Jumlah,
        UpdatedAt = GETDATE()
    WHERE InventarisID = @InventarisID;
END;
