<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBkUiDAj77rb_f8DK-0h3avlNuihWcaf_g",
    authDomain: "portfolio-4c97c.firebaseapp.com",
    projectId: "portfolio-4c97c",
    storageBucket: "portfolio-4c97c.firebasestorage.app",
    messagingSenderId: "971073373419",
    appId: "1:971073373419:web:4c0b95858472f9659a6aae",
    measurementId: "G-505R5JKZRL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>