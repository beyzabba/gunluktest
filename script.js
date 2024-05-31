document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('loginPage');
    const signupPage = document.getElementById('signupPage');
    const diaryPage = document.getElementById('diaryPage');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const newUsernameInput = document.getElementById('newUsername');
    const newPasswordInput = document.getElementById('newPassword');
    const addEntryBtn = document.getElementById('addEntryBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const entryModal = document.getElementById('entryModal');
    const closeModalBtn = document.querySelector('.close');
    const saveEntryBtn = document.getElementById('saveEntryBtn');
    const entryContent = document.getElementById('entryContent');
    const entriesContainer = document.getElementById('entries');

    let users = [];
    let currentUser = null;
    let editingEntry = null;

    // Kaydolma bağlantısını tıklayınca kayıt sayfasını göster
    document.getElementById('signupLink').addEventListener('click', function() {
        loginPage.style.display = 'none';
        signupPage.style.display = 'block';
    });

    // Giriş bağlantısını tıklayınca giriş sayfasını göster
    document.getElementById('loginLink').addEventListener('click', function() {
        signupPage.style.display = 'none';
        loginPage.style.display = 'block';
    });

    // Kaydol düğmesine tıklama olayını dinle
    signupBtn.addEventListener('click', function() {
        const newUsername = newUsernameInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        if (newUsername && newPassword) {
            // Kullanıcı adı ve şifre boş değilse
            users.push({ username: newUsername, password: newPassword });
            alert('Kayıt başarıyla tamamlandı. Giriş yapabilirsiniz.');
            signupPage.style.display = 'none';
            loginPage.style.display = 'block';
        } else {
            alert('Kullanıcı adı ve şifre girin.');
        }
    });

    // Giriş işlemini kontrol et
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        // Kullanıcı adı ve şifre doğrulaması
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            currentUser = user;
            loginPage.style.display = 'none';
            diaryPage.style.display = 'block';
        } else {
            alert('Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.');
        }
    });

    // Çıkış işlemini gerçekleştir
    logoutBtn.addEventListener('click', function() {
        diaryPage.style.display = 'none';
        loginPage.style.display = 'block';
        currentUser = null;
        usernameInput.value = '';
        passwordInput.value = '';
    });

    // Yeni giriş ekleme düğmesine tıklama olayını dinle
    addEntryBtn.addEventListener('click', function() {
        entryModal.style.display = 'block';
        entryContent.value = ''; // Önceki giriş içeriğini temizleme
        document.getElementById('modalTitle').innerText = 'Yeni Giriş';
        editingEntry = null; // Yeni giriş eklemek için editingEntry'yi null yap
    });

    // Kapatma düğmesine tıklama olayını dinle
    closeModalBtn.addEventListener('click', function() {
        entryModal.style.display = 'none';
    });

    // Kaydetme düğmesine tıklama olayını dinle
    saveEntryBtn.addEventListener('click', function() {
        const content = entryContent.value.trim();
        if (content !== '') {
            const currentDate = new Date().toLocaleDateString();
            if (editingEntry !== null) {
                // Eğer bir giriş düzenleniyorsa
                editingEntry.querySelector('.entry-content').innerText = content;
                editingEntry.querySelector('.entry-date').innerText = `Tarih: ${currentDate}`;
                entryModal.style.display = 'none';
                editingEntry = null; // editingEntry'yi sıfırla
            } else {
                // Yeni bir giriş ekleniyorsa
                const entry = document.createElement('div');
                entry.classList.add('entry');
                entry.innerHTML = `
                    <p class="entry-content">${content}</p>
                    <p class="entry-date">Tarih: ${currentDate}</p>
                    <button class="editEntryBtn">Düzenle</button>
                    <button class="deleteEntryBtn">Sil</button>
                `;
                entriesContainer.appendChild(entry);
                entryModal.style.display = 'none';
            }
        } else {
            alert('Lütfen bir giriş içeriği girin.');
        }
    });

    // Düzenleme butonlarını dinle
    entriesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('editEntryBtn')) {
            entryModal.style.display = 'block';
            entryContent.value = event.target.parentNode.querySelector('.entry-content').innerText;
            document.getElementById('modalTitle').innerText = 'Girişi Düzenle';
            editingEntry = event.target.parentNode;
        }
    });

    // Silme butonlarını dinle
    entriesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteEntryBtn')) {
            entriesContainer.removeChild(event.target.parentNode);
        }
    });
});
