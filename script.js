// User data storage (simulating a database with localStorage)
const users = JSON.parse(localStorage.getItem("users")) || [];

// Handle Signup
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const firstName = document.getElementById("signupFirstName").value;
  const lastName = document.getElementById("signupLastName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  // Check if user already exists
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    alert("User already exists. Please login.");
    return;
  }

  // Add new user to the "database"
   users.push({ firstName, lastName, email, password });
   localStorage.setItem("users", JSON.stringify(users));
   alert("Signup successful! Please login.");
   window.location.href = "login.html";
 });

// Handle Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Check if user exists and password matches
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  // Redirect to dashboard
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
});

// Protect Dashboard
if (window.location.pathname.includes("dashboard.html")) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("You must log in first.");
    window.location.href = "login.html";
  }
}

// Logout Functionality
document.getElementById("logoutButton")?.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully.");
  window.location.href = "login.html";
});


