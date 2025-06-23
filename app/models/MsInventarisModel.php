
<?php

 class MsInventarisModel  extends Models{
        private $table_ms ="[um_db].[dbo].ms_Inventaris";


    public function SaveData(){
        $rawData = file_get_contents("php://input");
        $post = json_decode($rawData, true);
            


        $InventarisID = $this->test_input($post["InventarisID"]);
        $NamaBarang   = $this->test_input($post["NamaBarang"]);
        $JenisBarang  = $this->test_input($post["JenisBarang"]);
        $Stok         = $this->test_input($post["Stok"]);
        $StokMinimum  = $this->test_input($post["StokMinimum"]);
        $StokMaksimum = $this->test_input($post["StokMaksimum"]);
        $HargaPokok   = $this->test_input($post["HargaPokok"]);
        $userid       = "System";

        $query = "INSERT INTO $this->table_ms(InventarisID,NamaBarang,JenisBarang,Stok,StokMinimum,StokMaksimum,HargaPokok,userInput)
                  VALUES('{$InventarisID}','{$NamaBarang}','{$JenisBarang}','{$Stok}','{$StokMinimum}','{$StokMaksimum}','{$HargaPokok}','{$userid}')
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
        $query = "SELECT 
                    InventarisID,
                    NamaBarang,
                    JenisBarang,
                    Stok,
                    StokMinimum,
                    StokMaksimum,
                    HargaPokok,
                    userInput 
                  FROM $this->table_ms"; // Ensure $this->table_ms is properly defined

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


    
 }