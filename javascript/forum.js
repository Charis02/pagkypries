import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getFirestore,collection, addDoc,getDoc,doc,getDocs,query,orderBy } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";


const firebaseConfig = {
apiKey: "AIzaSyDVCPmNRgwARnbmvbBJcyCzzT5o_qqKb_o",
authDomain: "pagkypries-forum.firebaseapp.com",
projectId: "pagkypries-forum",
storageBucket: "pagkypries-forum.appspot.com",
messagingSenderId: "960261449242",
appId: "1:960261449242:web:e2e417db6e1f50863c93a3",
measurementId: "G-S38B9HK551"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);


function createPostElement(post,id)
{
    let title = post.title;
    let date = post.date;

    let row = document.createElement("div");
    row.classList.add("post-card");
    row.id = id;
    row.onclick = getPost;

    let col = document.createElement("div");
    col.classList.add("post-card-title");
    col.innerHTML = title;

    let col2 = document.createElement("div");
    col2.classList.add("post-card-date");
    col2.innerHTML = date;

    row.appendChild(col);
    row.appendChild(col2);

    return row;
}

async function refreshPosts(){
    $('#forum-posts-overflow').empty();

    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let post = doc.data();
        let row = createPostElement(post,doc.id);
        $("#forum-posts-overflow").append(row);
    });
}

async function getPost(){
    let id = $(this).attr('id');

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    let post = docSnap.data();
    let title = post.title;
    let body = post.body;

    $('#chosen-post-title').html('<h3>'+title+'</h3>');
    $('#chosen-post-body').html(body);
}

$(document).ready(function(){
    refreshPosts();
});

$("#forum-post-submit").click(function(){
    let title = $('#forum-post-title').val();
    let body = $('#forum-post-body').val();

    if (title == "" || body == ""){
        alert("Please fill in all fields!");
        return;
    }

   let data = {
       title: title,
       body: body,
       date: new Date().toLocaleString(),
   }

   addDoc(collection(db, "posts"), data);

    $('#forum-post-title').val("");
    $('#forum-post-body').val("");

    refreshPosts();
});