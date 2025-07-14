document.addEventListener('DOMContentLoaded', function() {
    // Obsługa logo firmy
    document.getElementById('companyLogo').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('companyLogoPreview').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Zapisz informacje członka
    document.getElementById('memberForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const companyName = document.getElementById('company-name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const companyInfo = document.getElementById('company-info').value;

        const memberData = {
            companyName: companyName,
            address: address,
            phone: phone,
            email: email,
            companyInfo: companyInfo
        };

        localStorage.setItem('memberData', JSON.stringify(memberData));
        displayMemberSummary(memberData);
        alert('Informacje zostały zapisane!');
    });

    // Wyślij wiadomość
    document.getElementById('messageForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const subject = document.getElementById('message-subject').value;
        const message = document.getElementById('message').value;

        const messageData = {
            subject: subject,
            message: message,
            date: new Date().toLocaleString()
        };

        localStorage.setItem('messageData', JSON.stringify(messageData));
        alert('Wiadomość została wysłana!');
        document.getElementById('messageForm').reset();
    });

    // Wyświetl podsumowanie informacji członka
    function displayMemberSummary(data) {
        const summaryDiv = document.getElementById('memberSummary');
        summaryDiv.innerHTML = `
            <h3>Podsumowanie Informacji</h3>
            <p><strong>Nazwa Firmy:</strong> ${data.companyName}</p>
            <p><strong>Adres:</strong> ${data.address}</p>
            <p><strong>Telefon:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Informacje o Firmie:</strong> ${data.companyInfo}</p>
        `;
    }

    // Wczytaj zapisane dane
    const savedMemberData = localStorage.getItem('memberData');
    if (savedMemberData) {
        displayMemberSummary(JSON.parse(savedMemberData));
    }

    // Dodaj post na forum
    document.getElementById('forumForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const topic = document.getElementById('new-topic').value;
        const post = document.getElementById('new-post').value;

        const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        forumPosts.push({ topic: topic, post: post });
        localStorage.setItem('forumPosts', JSON.stringify(forumPosts));

        displayForumPosts();
        document.getElementById('forumForm').reset();
    });

    // Wyświetl posty na forum
    function displayForumPosts() {
        const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        const forumPostsDiv = document.getElementById('forumPosts');
        forumPostsDiv.innerHTML = '';

        forumPosts.forEach(function(forumPost) {
            const postDiv = document.createElement('div');
            postDiv.className = 'forum-post';
            postDiv.innerHTML = `<h3>${forumPost.topic}</h3><p>${forumPost.post}</p>`;
            forumPostsDiv.appendChild(postDiv);
        });
    }

    displayForumPosts();
});
