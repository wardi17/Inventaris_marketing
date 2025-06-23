<?php 
$page = isset($data['page']) ? $data['page'] : '';
$pages = isset($data['pages']) ? $data['pages'] : '';
$level = isset($_SESSION['level']) ? $_SESSION['level'] : '';

// Load menu data from JSON file
$menuData = json_decode(file_get_contents('menu.json'), true);
die(var_dump($menuData));
$menuItems = isset($menuData[$level]) ? $menuData[$level] : [];
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
                    <?php foreach ($menuItems as $item): ?>
                        <li class="sidebar-item <?= ($pages == strtolower(str_replace(' ', '_', $item['title']))) ? 'active' : '' ?>">
                            <a href="<?= base_url . $item['link'] ?>" class='sidebar-link'>
                                <i class="<?= $item['icon'] ?>"></i>
                                <span><?= $item['title'] ?></span>
                            </a>
                        </li>
                    <?php endforeach; ?>
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
