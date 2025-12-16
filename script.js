// Validasi Sisi Client
function clientValidate() {
    // 1. Ambil nilai dan elemen
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const major = document.getElementById('major').value;
    // PENTING: Query selector yang sudah diperbaiki
    const gender = document.querySelector('input[name="Jenis Kelamin"]:checked'); 
    const terms = document.getElementById('terms').checked;
    
    const errorMessageElement = document.getElementById('error-message');
    const successMessageElement = document.getElementById('success-message');

    // Reset pesan
    errorMessageElement.textContent = ''; 
    successMessageElement.style.display = 'none';
    
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
        document.getElementById('confirm-password').value = ''; 
        return displayError("Password dan Konfirmasi Password tidak cocok.", 'confirm-password');
    }
    
    // 5. Validasi Dropdown (Jurusan)
    if (major === "") return displayError("Jurusan wajib dipilih.", 'major');

    // 6. Validasi Radio Button (Jenis Kelamin)
    if (!gender) return displayError("Jenis Kelamin wajib dipilih.");
    
    // 7. Validasi Checkbox (Syarat & Ketentuan)
    if (!terms) return displayError("Anda harus menyetujui Syarat dan Ketentuan.");

    // Jika semua validasi berhasil
    return true; 
}


// Fungsi Utama untuk Validasi dan Submit AJAX
async function validateAndSubmit(event) {
    // Mencegah form submit default (reload halaman)
    event.preventDefault(); 
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-btn');
    const errorMessageElement = document.getElementById('error-message');
    const successMessageElement = document.getElementById('success-message');
    
    // 1. Lakukan Validasi
    if (!clientValidate()) {
        return; // Hentikan jika validasi client gagal
    }

    // Tampilkan loading dan nonaktifkan tombol
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    errorMessageElement.textContent = '';
    successMessageElement.style.display = 'none';

    // 2. Persiapan Data Form
    const formData = new FormData(form);
    const url = form.action;

    try {
        // 3. Kirim data menggunakan Fetch API (AJAX)
        const response = await fetch(url, {
            method: form.method,
            body: formData,
            // Hapus header Content-Type agar Formspree otomatis mendeteksinya
            headers: {
                'Accept': 'application/json' 
            }
        });

        if (response.ok) {
            // 4. Sukses
            form.reset(); // Kosongkan form
            successMessageElement.textContent = '✅ Pendaftaran berhasil dikirim! Silakan cek email Anda.';
            successMessageElement.style.display = 'block';
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Daftar Sekarang';
            submitButton.disabled = false;
        } else {
            // 5. Gagal dari Server (Formspree)
            const data = await response.json();
            if (data.error) {
                errorMessageElement.textContent = `❌ Error pengiriman: ${data.error}`;
            } else {
                errorMessageElement.textContent = '❌ Terjadi kesalahan saat mengirim data. Coba lagi.';
            }
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Daftar Sekarang';
            submitButton.disabled = false;
        }

    } catch (error) {
        // 6. Gagal Jaringan
        errorMessageElement.textContent = '❌ Gagal terhubung ke server. Periksa koneksi internet Anda.';
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Daftar Sekarang';
        submitButton.disabled = false;
    }

    // Selalu kembalikan false karena kita sudah menangani submit secara manual
    return false;
}
