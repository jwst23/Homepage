// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const writeForm = document.getElementById('write-form');
const postList = document.getElementById('post-list');

// Load Posts
async function loadPosts() {
    try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        postList.innerHTML = '';
        
        if (querySnapshot.empty) {
            postList.innerHTML = '<li class="post-item">등록된 게시글이 없습니다.</li>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const li = document.createElement('li');
            li.className = 'post-item';
            
            const dateStr = data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : '최근';

            li.innerHTML = `
                <div class="post-title">${data.title}</div>
                <div class="post-author">${data.author} <span style="margin-left: 10px; font-size: 0.8rem; opacity: 0.5;">${dateStr}</span></div>
            `;
            postList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading posts: ", error);
        postList.innerHTML = '<li class="post-item">게시글을 불러오는데 실패했습니다. (Firebase 설정을 확인해주세요)</li>';
    }
}

// Submit Post
if (writeForm) {
    writeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const author = document.getElementById('post-author').value;
        const content = document.getElementById('post-content').value;
        const submitBtn = writeForm.querySelector('button');

        try {
            submitBtn.textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;

            await addDoc(collection(db, "posts"), {
                title: title,
                author: author,
                content: content,
                createdAt: serverTimestamp()
            });

            // Reset form and reload list
            writeForm.reset();
            await loadPosts();
            alert('DATA TRANSMISSION COMPLETE.');
            
        } catch (error) {
            console.error("Error adding post: ", error);
            alert('TRANSMISSION FAILED. CHECK NEURAL LINK.');
        } finally {
            submitBtn.textContent = 'TRANSMIT DATA';
            submitBtn.disabled = false;
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Only load if config is set (basic check)
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        loadPosts();
    } else {
        postList.innerHTML = '<li class="post-item" style="color:#00f2ff">NEURAL LINK NOT ESTABLISHED. PLEASE CONFIGURE SYSTEM.</li>';
    }
});
