<?php

class Ms_Inventaris extends Controller{


    private $userid;
    private $username;
      
    public function __construct()
	{	
	
     
		$this->userid ="123";
		$this->username ="wardi";
		// if($_SESSION['session_login'] != 'sudah_login') {
		// 	Flasher::setMessage('Login','Tidak ditemukan.','danger');
		// 	header('location: '. base_url . '/login');
		// 	exit;
		// }else{
		// 	$this->userid = isset($_SESSION['id_user']) ? $_SESSION['id_user'] : "";
		// 	$this->username =isset($_SESSION['username']) ? $_SESSION['username'] : "";
		// 	if (empty($this->userid) || empty($this->username)) {
		// 		header('location: '. base_url . '/login');
		// 		exit(); // Pastikan script berhenti setelah redirect
		// 	}
		// }
		

	} 

    	public function index()
    {
    
    
        $data["userid"]= $this->userid;
        $data["username"]= $this->username;
        $data["pages"]="msinv";
        $this->view('templates/header');
        $this->view('templates/sidebar', $data);
        $this->view('ms_inventaris/index',$data);
        $this->view('templates/footer');
    }


 //batas kode

    
}