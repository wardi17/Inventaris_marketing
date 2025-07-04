<?php 
$page = isset($data['page']) ? $data['page'] : '';
$pages = isset($data['pages']) ? $data['pages'] : '';
$level = isset($_SESSION['level']) ? $_SESSION['level'] : '';
?>

<div id="app">
    <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
            <div class="sidebar-header position-relative">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="logo">
                        <h5><a href="<?= base_url ?>/home"><?= $data['username'] ?></a></h5>
                    </div>
                    <div class="theme-toggle d-flex gap-2 align-items-center mt-2">
                        <div class="form-check form-switch fs-6">
                            <input class="me-0" type="hidden" id="toggle-dark">
                        </div>
                    </div>
                    <div class="sidebar-toggler x">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
            <div class="sidebar-menu">
                <ul class="menu">
                    <li class="sidebar-title">Menu</li>
                    
                    <!-- ADMIN DASHBOARD -->
                    <li class="sidebar-item <?= ($pages == 'admin_dashboard') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/admin_dashboard" class='sidebar-link'>
                            <i class="bi bi-grid-fill"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'msinv') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/ms_inventaris" class='sidebar-link'>
                            <i class="fa-solid fa-box"></i>
                            <span>Manage Inventaris</span>
                        </a>
                    </li>
                  
                    <!-- USER DASHBOARD -->
             
                    <li class="sidebar-item <?= ($pages == 'ajukan') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/ajukaninventaris" class='sidebar-link'>
                            <i class="fa-solid fa-paper-plane"></i>
                            <span>Ajukan Permohonan Inventaris</span>
                        </a>
                    </li>
                 

               
                </ul>               
                <ul class="menu">
                    <li class="sidebar-item">
                        <a href="<?= base_url; ?>/logout" class='sidebar-link'>
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <span>Sign Out</span>
                        </a>      
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
