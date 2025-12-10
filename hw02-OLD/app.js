const form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please complete all fields in the form.");
    return;
  }

  const displayDiv = document.getElementById("display");
  displayDiv.style.display = "block";
  displayDiv.innerHTML = `
  <h2>Submitted Information</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>`;

    form.reset();
});
