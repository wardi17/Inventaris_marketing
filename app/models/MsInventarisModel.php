
<?php
date_default_timezone_set('Asia/Jakarta'); 
 class MsInventarisModel  extends Models{
        private $table_ms ="[um_db].[dbo].ms_Inventaris";
        private $table_kt ="[um_db].[dbo].ms_KategoriInvenaris";


   public function GetKatgori() {
    try {
        // Siapkan query SQL
        $query = "
            SELECT 
                KategoriID,
                NamaKategori
            FROM $this->table_kt 
            ORDER BY KategoriID ASC
        ";

       // $this->consol_war($query);
        // Eksekusi query
        $result = $this->db->baca_sql($query);

        // Validasi hasil eksekusi query
        if (!$result) {
            throw new Exception("Query execution failed: " . odbc_errormsg($this->db));
        }

        // Ambil data hasil query
        $datas = [];
        while (odbc_fetch_row($result)) {
            $kategoriID = rtrim(odbc_result($result, 'KategoriID'));
            $namaKategori = rtrim(odbc_result($result, 'NamaKategori'));

            $datas[] = [
                "id"   => $kategoriID,
                "name" => $kategoriID . " | " . $namaKategori,
            ];
        }
        return $datas;

    } catch (Exception $e) {
        // Catat error log untuk debug
        error_log("Error in GetKatgori: " . $e->getMessage());

        // Kembalikan array kosong jika gagal
        return [];
    }
}
  


    public function SaveData(){
        $rawData = file_get_contents("php://input");
        $post = json_decode($rawData, true);
            


        $InventarisID = $this->test_input($post["InventarisID"]);
        $NamaBarang   = $this->test_input($post["NamaBarang"]);
        $Kategori  = $this->test_input($post["Kategori"]);
        $Stok         = $this->test_input($post["Stok"]);
        $StokMinimum  = $this->test_input($post["StokMinimum"]);
        $StokMaksimum = $this->test_input($post["StokMaksimum"]);
        $HargaPokok   = $this->test_input($post["HargaPokok"]);
        $userid       = "System";

        $query = "INSERT INTO $this->table_ms(InventarisID,NamaBarang,KategoriID,Stok,StokMinimum,StokMaksimum,HargaPokok,userInput)
                  VALUES('{$InventarisID}','{$NamaBarang}','{$Kategori}','{$Stok}','{$StokMinimum}','{$StokMaksimum}','{$HargaPokok}','{$userid}')
                ";
        
       
        $result = $this->db->baca_sql($query);
        // Buat response
        if ($result) {
            $pesan = [
                'nilai' => 1,
                'error' => 'Berhasil Simpan data'
            ];
        } else {
            $pesan = [
                'nilai' => 0,
                'error' => 'Data Gagal Ditambahkan'
            ];
        }

        return $pesan;
    }



    public function getAllInventaris() {
    // Assuming you have a database connection set up
    try {
        // Prepare the SQL query
                $query = "
                SELECT 
                    a.InventarisID     AS InventarisID,
                    a.NamaBarang       AS NamaBarang,
                    b.KategoriID       AS KategoriID,
                    b.NamaKategori     AS NamaKategori,
                    a.Stok             AS Stok,
                    a.StokMinimum      AS StokMinimum,
                    a.StokMaksimum     AS StokMaksimum,
                    a.HargaPokok       AS HargaPokok,
                    a.userInput        AS userInput
                FROM $this->table_ms AS a
                LEFT JOIN $this->table_kt AS b
                    ON b.KategoriID = a.KategoriID
            ";
            // Ensure $this->table_ms is properly defined

        // Execute the query
        $result = $this->db->baca_sql($query);
        
        // Check if the query execution was successful
        if (!$result) {
            throw new Exception("Query execution failed: " . odbc_errormsg($this->db));
        }

        // Fetch all results as an associative array
        $data = [];
        while ($row = odbc_fetch_array($result)) {
            $data[] = $row;
        }

        // Optional: Log or handle the data as needed
        //$this->consol_war($data); // Ensure this method is defined and does what you expect

        return $data;

    } catch (Exception $e) {
        
        // Log the error message for debugging
        error_log("Error in getAllInventaris: " . $e->getMessage());
        
        // Return an empty array or handle the error as needed
        return [];
    }
}



      public function UpdateData(){
         $rawData = file_get_contents("php://input");
        $post = json_decode($rawData, true);
     
       

        $InventarisID = $this->test_input($post["InventarisID"]);
        $NamaBarang   = $this->test_input($post["NamaBarang"]);
        $Kategori     = $this->test_input($post["Kategori"]);
        $Stok         = $this->test_input($post["Stok"]);
        $StokMinimum  = $this->test_input($post["StokMinimum"]);
        $StokMaksimum = $this->test_input($post["StokMaksimum"]);
        $HargaPokok   = $this->test_input($post["HargaPokok"]);
        $userid       = "System";
        $UpdatedAt    = date("Y-m-d H:i:s");

        $query ="UPDATE $this->table_ms SET NamaBarang='{$NamaBarang}', KategoriID='{$Kategori}',Stok='{$Stok}',
        StokMinimum='{$StokMinimum}',StokMaksimum='{$StokMaksimum}', HargaPokok='{$HargaPokok}' ,userEdit='{$userid}',UpdatedAt='{$UpdatedAt}'
        WHERE InventarisID ='{$InventarisID}'
        ";

        $result = $this->db->baca_sql($query);
        // Buat response
        if ($result) {
            $pesan = [
                'nilai' => 1,
                'error' => 'Berhasil Update data'
            ];
        } else {
            $pesan = [
                'nilai' => 0,
                'error' => 'Data Gagal DiUpate'
            ];
        }

        return $pesan;
      }


    
      public function DeleteData(){
          $rawData = file_get_contents("php://input");
        $post = json_decode($rawData, true);
     
       

        $InventarisID = $this->test_input($post["InventarisID"]);

        $query ="DELETE FROM $this->table_ms   WHERE InventarisID ='{$InventarisID}'";
            $result = $this->db->baca_sql($query);
        // Buat response
        if ($result) {
            $pesan = [
                'nilai' => 1,
                'error' => 'Berhasil Delete data'
            ];
        } else {
            $pesan = [
                'nilai' => 0,
                'error' => 'Data Gagal Delete'
            ];
        }

        return $pesan;
      }
 }