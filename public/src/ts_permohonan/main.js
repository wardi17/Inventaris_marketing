

import TransaksiList from './componets/TransaksiList.js';

$(document).ready(function () {
   
const url = new URL(window.location.href);
const pathSegments = url.pathname.split("/");
const lastSegment = pathSegments.filter(Boolean).pop(); // filter untuk hilangkan elemen kosong
// Kondisi berdasarkan segmen terakhir URL
   new TransaksiList();

   //and 
});


