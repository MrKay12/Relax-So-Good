document.getElementById("yesBtn").addEventListener("click", function() {
    localStorage.setItem("ageVerified", "true");
    window.location.href = "Homepage.html"; // Redirect to your main page
});

document.getElementById("noBtn").addEventListener("click", function() {
    alert("You can only access this website if you are at least 18 years old.");
});
