import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getFirestore,collection, addDoc,getDoc,orderBy,startAt,limit,query,where,getDocs } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";


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
 });

async function nextHandler(pageIndex)
{
    const posts = collection(db, "posts");
    
    const q = query(posts, where("date", "!=", 'a'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        let frag = document.createDocumentFragment();

        let row = document.createElement("tr");
        row.classList.add("row");

        let col = document.createElement("td");
        col.classList.add("col0");
        col.innerHTML = doc.data().title;

        let col2 = document.createElement("td");
        col2.classList.add("col1");
        col2.innerHTML = doc.data().body;

        let col3 = document.createElement("td");
        col3.classList.add("col2");
        col3.innerHTML = doc.data().date;

        row.appendChild(col);
        row.appendChild(col2);
        row.appendChild(col3);

        frag.appendChild(row);

        return this.append(Array.from(frag.childNodes))
          // indicate that there is a next page to load
          .then(() => false);
    });

    return false;
}

window.ias = new InfiniteAjaxScroll('#table-body', {
item: '.row',
next: nextHandler,
pagination: false,
negativeMargin: 400,
prefill: true,
});