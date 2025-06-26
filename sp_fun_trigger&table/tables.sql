/*marketing_inventory_flowchart_and_db.sql`
```sql
-- FLOWCHART DESCRIPTION (TEXT-BASED FLOW)

-- 1. USER LOGIN
--    -> Admin? Yes -> Admin Dashboard
--    -> User? Yes -> User Dashboard

-- 2. ADMIN DASHBOARD
--    a. Manage Inventaris (Add/Edit/Delete)
--    b. Manage SOP per item
--    c. Set stok minimum dan maksimum
--    d. Monitor stock levels / stock taking
--    e. View reports (stok, biaya marketing, penggunaan)

-- 3. USER DASHBOARD
--    a. View available inventaris (stok ready)
--    b. Ajukan permohonan barang
--    c. Sistem validasi stok cukup?
--         -> Yes: Potong stok & catat transaksi pengambilan
--         -> No: Tampilkan pesan stok tidak cukup
--    d. Laporan penggunaan per user (jika perlu)

-- 4. SISTEM PROSES
--    a. Stok berkurang saat pengambilan
--    b. Jika stok kurang dari minimum, notifikasi admin
--    c. Biaya marketing tercatat berdasarkan HPP produk yang dipakai
--    d. SOP penggunaan dapat diakses oleh user/admin

*/
-- DATABASE SCHEMA FOR SQL SERVER

-- Table: ms_User
CREATE TABLE ms_User (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(256) NOT NULL,
    FullName NVARCHAR(250) NOT NULL,
    Role NVARCHAR(50) NOT NULL CHECK (Role IN ('admin','user')),
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);

-- Table: ms_Inventaris
CREATE TABLE ms_Inventaris (
    InventarisID VARCHAR(100) PRIMARY KEY,
    NamaBarang NVARCHAR(250) NOT NULL,
    JenisBarang NVARCHAR(100) NOT NULL, -- e.g. Spanduk, Brosur, Sample, Bingkisan
    Stok INT NOT NULL DEFAULT 0,
    StokMinimum INT NOT NULL DEFAULT 0,
    StokMaksimum INT NOT NULL DEFAULT 0,
    HargaPokok DECIMAL(18,2) NOT NULL, -- HPP per unit
    Status BIT DEFAULT 1, -- 1=active, 0=inactive
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    userInput VARCHAR(100),
    userEdit VARCHAR(100)
);


ALTER TABLE ms_Inventaris
ADD userInput VARCHAR(100),
userEdit VARCHAR(100)


-- Table: ms_InventarisDetail
CREATE TABLE ms_InventarisDetail (
    DetailID INT IDENTITY(1,1) PRIMARY KEY,
    InventarisID INT NOT NULL,
    NomorItem NVARCHAR(100) NOT NULL, -- Unique nomor item katalog/brosur no, dll
    Deskripsi NVARCHAR(500) NULL,
    TanggalBerlaku DATE NOT NULL,
    Status BIT DEFAULT 1, -- aktif/nonaktif
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (InventarisID) REFERENCES ms_Inventaris(InventarisID)
);

-- Table: ms_SOP
CREATE TABLE ms_SOP (
    SOPID INT IDENTITY(1,1) PRIMARY KEY,
    InventarisID INT NOT NULL,
    SOPText NVARCHAR(MAX) NOT NULL, -- SOP detail text or URL/file reference
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (InventarisID) REFERENCES ms_Inventaris(InventarisID)
);

-- Table: ts_Pengambilan_Inventaris
CREATE TABLE ts_Pengambilan_Inventaris (
    TransaksiID INT IDENTITY(1,1) PRIMARY KEY,
    InventarisID INT NOT NULL,
    UserID INT NOT NULL,
    Jumlah INT NOT NULL CHECK (Jumlah > 0),
    TanggalPengambilan DATETIME DEFAULT GETDATE(),
    Keterangan NVARCHAR(500) NULL,
    FOREIGN KEY (InventarisID) REFERENCES ms_Inventaris(InventarisID),
    FOREIGN KEY (UserID) REFERENCES ms_User(UserID)
);

-- Table: ts_Biaya_Marketing
CREATE TABLE ts_Biaya_Marketing (
    BiayaID INT IDENTITY(1,1) PRIMARY KEY,
    TransaksiID INT NOT NULL,
    Biaya DECIMAL(18,2) NOT NULL, -- = HargaPokok * Jumlah
    TanggalTransaksi DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TransaksiID) REFERENCES ts_Pengambilan_Inventaris(TransaksiID)
);


