import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getFirestore,collection, addDoc,getDoc,doc,getDocs,query,orderBy,Timestamp,setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

class Comment{
    constructor(comment,user,date=Timestamp.now().toDate()){
        this.comment = comment;
        this.user = user;
        this.dateCreated = date;
    }
}

class Post{
    constructor (title,body,user,date=Timestamp.now().toDate())
    {
        this.title = title;
        this.body = body;
        this.user = user;
        this.dateCreated = date;
        this.latestChange = date;
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
            dateCreated: Timestamp.fromDate(post.dateCreated),
            latestChange: Timestamp.fromDate(post.latestChange)
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Post(data.title, data.body, data.user, data.dateCreated.toDate(), data.latestChange.toDate());
    }
};

const commentConverter = {
    toFirestore: (comment) => {
        return {
            comment: comment.comment,
            user: comment.user,
            dateCreated: Timestamp.fromDate(comment.dateCreated)
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Comment(data.comment, data.user, data.dateCreated.toDate());
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
    $('#forum-post-form').hide();

    const q = query(collection(db, "posts"), orderBy("latestChange", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((cur_doc) => {
        let post = postConverter.fromFirestore(cur_doc);
        $("#forum-posts-overflow").append(createPostElement(post,cur_doc.id));
    });

    $('.post-card')[0].click(getPost);
    $('#forum-comment-form').hide();
}

function showPost(title,body,user,dateCreated)
{
    $('#chosen-post-title').html('<h3>'+title+'</h3>');
    $('#chosen-post-body').html(body);
    $('#forum-post-view').show();
    $('#forum-post-form').hide();
}

function createCommentElement(comment)
{
    let row = document.createElement("div");
    row.classList.add("comment-card");

    let col = document.createElement("div");
    col.classList.add("comment-card-comment");
    col.innerHTML = comment.comment;

    let col2 = document.createElement("div");
    col2.classList.add("comment-card-date");
    col2.innerHTML = comment.dateCreated;

    row.appendChild(col);
    row.appendChild(col2);

    return row;
}

async function getComments(comments){
    $('#forum-comments-overflow').empty();

    if (comments == null)
    {
        $('#forum-comments-overflow').append('<p>No comments yet</p>');
        return;
    }

    const q = query(comments, orderBy("dateCreated", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((cur_doc) => {
        let comment = commentConverter.fromFirestore(cur_doc);
        $("#forum-comments-overflow").append(createCommentElement(comment));
    });
}

async function getPost(){
    let id = $(this).attr('id');
    localStorage.setItem('postId', id);

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    let post = postConverter.fromFirestore(docSnap);
    let title = post.title;
    let body = post.body;
    let user = post.user;
    let dateCreated = post.dateCreated;

    showPost(title,body,user,dateCreated);
    getComments(collection(db, "posts/"+id+"/comments"));
}

$('#forum-post-button').click(() => {
    $('#forum-post-form').show();
    $('#forum-post-view').hide();
});

$(document).ready(function(){
    refreshPosts();
});

$("#forum-post-submit").click(function(){
    let title = $('#forum-post-title').val();
    let body = $('#forum-post-body').val();
    let user = $('#forum-post-user').val();

    if (title == "" || body == "" || user == ""){
        alert("Please fill in all fields!");
        return;
    }

    let cur_doc = postConverter.toFirestore(new Post(title,body,user));

    addDoc(collection(db, "posts"), cur_doc);

    $('#forum-post-title').val("");
    $('#forum-post-body').val("");
    $('#forum-post-user').val("");

    refreshPosts();
});

$('#forum-comment-submit').click(function(){
    let comment = $('#forum-comment-comment').val();
    let user = $('#forum-comment-user').val();

    if (comment == "" || user == ""){
        alert("Please fill in all fields!");
        return;
    }

    let cur_doc = commentConverter.toFirestore(new Comment(comment,user));
    let id = localStorage.getItem('postId');
    console.log(id);

    addDoc(collection(db, "posts/"+id+"/comments"), cur_doc);

    const postRef = doc(db, "posts", id);
    setDoc(postRef, {latestChange: cur_doc.dateCreated}, {merge: true});

    refreshPosts();
});

$('#comment-button').click(function(){
    if ($('#forum-comment-form').is(':visible'))
        $('#forum-comment-form').hide(600);
    else
        $('#forum-comment-form').show(600);
});

$('#forum-comment-cancel').click(function(){
    $('#forum-comment-form').hide(600);
});