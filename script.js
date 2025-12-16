function validateForm() {
    // 1. Ambil nilai dari setiap field, menggunakan .trim() untuk menghilangkan spasi di awal/akhir
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Ambil elemen untuk menampilkan pesan error
    const errorMessage = document.getElementById('error-message');
    
    // Reset pesan error sebelumnya
    errorMessage.textContent = ''; 

    // 2. Lakukan validasi sederhana (input tidak boleh kosong)
    if (name === "") {
        // 3. Tampilkan pesan peringatan jika kosong
        errorMessage.textContent = "Nama Lengkap harus diisi.";
        document.getElementById('name').focus(); // Fokus ke field yang kosong
        return false; // Mencegah form dikirim
    }

    if (email === "") {
        errorMessage.textContent = "Email harus diisi.";
        document.getElementById('email').focus();
        return false;
    }
    
    // Tambahan: Validasi format email dasar (opsional tapi baik)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Format Email tidak valid.";
        document.getElementById('email').focus();
        return false;
    }

    if (password === "") {
        errorMessage.textContent = "Password harus diisi.";
        document.getElementById('password').focus();
        return false;
    }

    // Jika semua validasi berhasil
    alert("Data pendaftaran berhasil divalidasi!");
    
    // Dalam praktik nyata, Anda akan mengembalikan `true` di sini untuk mengirim form ke server.
    // Untuk tujuan demonstrasi dan agar pesan alert tetap terlihat (form tidak reload), kita kembalikan `false`.
    return false; 
}
