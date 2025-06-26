<?php

class InventarisController extends Controller
{
    private $msInventarisModel;

    public function __construct()
    {
        $this->msInventarisModel = $this->model('MsInventarisModel');
    }

    public function saveData()
    {
        try {
            // Validasi request (harus POST dan JSON)
            $this->validateRequest();

            // Simpan data via model
            $response = $this->msInventarisModel->saveData();

            // Kirim response sukses
            $this->sendJsonResponse(!empty($response) ? $response : null);
        } catch (InvalidArgumentException $e) {
            // Error validasi input

            $this->sendErrorResponse($e->getMessage(), 400);
        } catch (Throwable $e) {
            // Error umum atau sistem
            error_log('Error in InventarisController::saveData: ' . $e->getMessage());
            $this->sendErrorResponse('Internal server error', 500);
        }
    }

    private function validateRequest()
    {
        // Pastikan metode adalah POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            throw new InvalidArgumentException('Invalid request method');
        }

        // Pastikan Content-Type adalah application/json
        // $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
        // if (strpos($contentType, 'application/json') === false) {
        //     throw new InvalidArgumentException('Content-Type must be application/json');
        // }
    }

        private function sendJsonResponse($data, $statusCode = 200)
        {
            // PHP 5.6 tidak punya http_response_code(), kita atur manual jika perlu
            if (!function_exists('http_response_code')) {
                header('X-PHP-Response-Code: ' . $statusCode, true, $statusCode);
            } else {
                http_response_code($statusCode);
            }

            header('Content-Type: application/json');

            // Siapkan variabel error jika ada
            $error = null;
            if ($statusCode >= 400) {
                $error = isset($data['error']) ? $data['error'] : 'Unknown error';
                $data = null; // Kosongkan data jika gagal
            }

            echo json_encode(array(
                'success'   => $statusCode < 400,
                'data'      => $data,
                'error'     => $error,
                'code'      => $statusCode,
                'timestamp' => time()
            ));
        }


    private function sendErrorResponse($message, $statusCode)
    {
        $this->sendJsonResponse([
            'error' => $message
        ], $statusCode);
    }



   public function listdata() {
    try {
        // Retrieve data from the model
        $data = $this->msInventarisModel->getAllInventaris(); // Assuming this method exists in your model
        // Check if data is empty
        if (empty($data)) {
            $this->sendJsonResponse([], 200); // Return an empty array if no data found
            return;
        }

        // Send the data as a JSON response
        $this->sendJsonResponse($data, 200);
    } catch (Throwable $e) {
        error_log('Error in InventarisController::listdata: ' . $e->getMessage());
        $this->sendErrorResponse('Internal server error', 500);
    }
    }




    public function UpdateData(){
          try {
            // Validasi request (harus POST dan JSON)
            $this->validateRequest();

            // Simpan data via model
            $response = $this->msInventarisModel->UpdateData();

            // Kirim response sukses
            $this->sendJsonResponse(!empty($response) ? $response : null);
        } catch (InvalidArgumentException $e) {
            // Error validasi input

            $this->sendErrorResponse($e->getMessage(), 400);
        } catch (Throwable $e) {
            // Error umum atau sistem
            error_log('Error in InventarisController::updateData: ' . $e->getMessage());
            $this->sendErrorResponse('Internal server error', 500);
        }
    }



    
   public function DeleteData() {
    try {
        // Retrieve data from the model
        $data = $this->msInventarisModel->DeleteData(); // Assuming this method exists in your model
        // Check if data is empty
        if (empty($data)) {
            $this->sendJsonResponse([], 200); // Return an empty array if no data found
            return;
        }

        // Send the data as a JSON response
        $this->sendJsonResponse($data, 200);
    } catch (Throwable $e) {
        error_log('Error in InventarisController::listdata: ' . $e->getMessage());
        $this->sendErrorResponse('Internal server error', 500);
    }
    }
}
