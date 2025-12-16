function validateForm() {
    // 1. Ambil nilai dan elemen
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const major = document.getElementById('major').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const terms = document.getElementById('terms').checked;
    
    const errorMessageElement = document.getElementById('error-message');
    
    // Reset pesan error
    errorMessageElement.textContent = ''; 

    // Helper function untuk menampilkan error
    const displayError = (message) => {
        errorMessageElement.textContent = `⚠️ ${message}`;
        return false;
    };

    // 2. Validasi Field Kosong (Teks, Email, Password)
    if (name === "") return displayError("Nama Lengkap wajib diisi.");
    if (email === "") return displayError("Email wajib diisi.");
    if (password === "") return displayError("Password wajib diisi.");
    if (confirmPassword === "") return displayError("Konfirmasi Password wajib diisi.");

    // 3. Validasi Panjang Password
    if (password.length < 8) return displayError("Password minimal harus 8 karakter.");

    // 4. Validasi Kecocokan Password
    if (password !== confirmPassword) {
        // Hapus nilai konfirmasi password agar pengguna mengetik ulang
        document.getElementById('confirm-password').value = ''; 
        return displayError("Password dan Konfirmasi Password tidak cocok.");
    }
    
    // 5. Validasi Dropdown (Jurusan)
    if (major === "") return displayError("Jurusan wajib dipilih.");

    // 6. Validasi Radio Button (Jenis Kelamin)
    if (!gender) return displayError("Jenis Kelamin wajib dipilih.");
    
    // 7. Validasi Checkbox (Syarat & Ketentuan)
    if (!terms) return displayError("Anda harus menyetujui Syarat dan Ketentuan.");


    // Jika semua validasi berhasil
    alert("✅ Pendaftaran berhasil divalidasi dan siap dikirim!");
    
    // Dalam aplikasi nyata, kembalikan 'true' agar form dikirim ke server.
    // Untuk demo, kita kembalikan 'false' agar halaman tidak reload setelah alert.
    return false; 
}
