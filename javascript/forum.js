import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getFirestore,collection, addDoc,getDoc,doc,getDocs,query,orderBy,Timestamp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";


class Post{
    constructor (title,body,user,date=null)
    {
        this.title = title;
        this.body = body;
        this.user = user;

        if (date == null)
            this.dateCreated = Timestamp.now().toDate();
        else
            this.dateCreated = date;
    }

    toString()
    {
        return 'Post with title ' + this.title + ' created by ' + this.user;
    }
}

const postConverter = {
    toFirestore: (post) => {
        return {
            title: post.title,
            body: post.body,
            user: post.user,
            dateCreated: Timestamp.fromDate(post.dateCreated)
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Post(data.title, data.body, data.user, data.dateCreated.toDate());
    }
};

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
    console.log("Here!");
    let row = document.createElement("div");
    row.classList.add("post-card");
    row.id = id;
    row.onclick = getPost;

    let col = document.createElement("div");
    col.classList.add("post-card-title");
    col.innerHTML = post.title;

    let col2 = document.createElement("div");
    col2.classList.add("post-card-date");
    col2.innerHTML = post.dateCreated;

    row.appendChild(col);
    row.appendChild(col2);

    return row;
}

async function refreshPosts(){
    $('#forum-posts-overflow').empty();

    const q = query(collection(db, "posts"), orderBy("dateCreated", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let post = postConverter.fromFirestore(doc);
        $("#forum-posts-overflow").append(createPostElement(post,doc.id));
    });
}

async function getPost(){
    let id = $(this).attr('id');

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    let post = postConverter.fromFirestore(docSnap);
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
    let user = $('#forum-post-user').val();
    user = 0;

    if (title == "" || body == ""){
        alert("Please fill in all fields!");
        return;
    }

    let doc = postConverter.toFirestore(new Post(title,body,user));

    addDoc(collection(db, "posts"), doc);

    $('#forum-post-title').val("");
    $('#forum-post-body').val("");

    refreshPosts();
});