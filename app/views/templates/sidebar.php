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
                            <span>Admin Dashboard</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'msinv') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/ms_inventaris" class='sidebar-link'>
                            <i class="fa-solid fa-box"></i>
                            <span>Manage Inventaris</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'manage_sop') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/manage_sop" class='sidebar-link'>
                            <i class="fa-solid fa-file-alt"></i>
                            <span>Manage SOP per Item</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'set_stok') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/set_stok" class='sidebar-link'>
                            <i class="fa-solid fa-cogs"></i>
                            <span>Set Stok Minimum dan Maksimum</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'monitor_stock') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/monitor_stock" class='sidebar-link'>
                            <i class="fa-solid fa-chart-line"></i>
                            <span>Monitor Stock Levels</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'view_reports') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/view_reports" class='sidebar-link'>
                            <i class="fa-solid fa-file-invoice"></i>
                            <span>View Reports</span>
                        </a>
                    </li>

                    <!-- USER DASHBOARD -->
             <!--      <li class="sidebar-item <?= ($pages == 'user_dashboard') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/user_dashboard" class='sidebar-link'>
                            <i class="bi bi-person-circle"></i>
                            <span>User Dashboard</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'view_inventaris') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/view_inventaris" class='sidebar-link'>
                            <i class="fa-solid fa-box-open"></i>
                            <span>View Available Inventaris</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'ajukan_permohonan') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/ajukan_permohonan" class='sidebar-link'>
                            <i class="fa-solid fa-paper-plane"></i>
                            <span>Ajukan Permohonan Barang</span>
                        </a>
                    </li>
                    <li class="sidebar-item <?= ($pages == 'laporan_penggunaan') ? 'active' : '' ?>">
                        <a href="<?= base_url; ?>/laporan_penggunaan" class='sidebar-link'>
                            <i class="fa-solid fa-file-alt"></i>
                            <span>Laporan Penggunaan per User</span>
                        </a>
                    </li>

               
                </ul> --->
                
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
