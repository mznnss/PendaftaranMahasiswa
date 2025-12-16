function validateForm() {
    // 1. Ambil nilai dan elemen
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const major = document.getElementById('major').value;
    const gender = document.querySelector('input[name="Jenis Kelamin"]:checked');
    const terms = document.getElementById('terms').checked;
    
    const errorMessageElement = document.getElementById('error-message');
    
    // Reset pesan error
    errorMessageElement.textContent = ''; 

    // Helper function untuk menampilkan error
    const displayError = (message, fieldId) => {
        errorMessageElement.textContent = `⚠️ ${message}`;
        if (fieldId) {
            document.getElementById(fieldId).focus();
        }
        return false;
    };

    // 2. Validasi Field Kosong (Teks, Email, Password)
    if (name === "") return displayError("Nama Lengkap wajib diisi.", 'name');
    if (email === "") return displayError("Email wajib diisi.", 'email');
    if (password === "") return displayError("Password wajib diisi.", 'password');
    if (confirmPassword === "") return displayError("Konfirmasi Password wajib diisi.", 'confirm-password');

    // 3. Validasi Panjang Password
    if (password.length < 8) return displayError("Password minimal harus 8 karakter.", 'password');

    // 4. Validasi Kecocokan Password
    if (password !== confirmPassword) {
        // Hapus nilai konfirmasi password agar pengguna mengetik ulang
        document.getElementById('confirm-password').value = ''; 
        return displayError("Password dan Konfirmasi Password tidak cocok.", 'confirm-password');
    }
    
    // 5. Validasi Dropdown (Jurusan)
    if (major === "") return displayError("Jurusan wajib dipilih.", 'major');

    // 6. Validasi Radio Button (Jenis Kelamin)
    if (!gender) return displayError("Jenis Kelamin wajib dipilih.");
    
    // 7. Validasi Checkbox (Syarat & Ketentuan)
    if (!terms) return displayError("Anda harus menyetujui Syarat dan Ketentuan.");


    // Jika semua validasi berhasil, tampilkan pesan sukses singkat
    alert("✅ Data berhasil divalidasi! Form akan dikirimkan.");
    
    // PENTING: Mengembalikan TRUE agar form DITERUSKAN ke Formspree
    return true; 
}
