// define variables that reference elements on our page
const santaForm = document.forms[0];

// listen for the form to be submitted
santaForm.onsubmit = function (event) {
  event.preventDefault();
  // check if any fields are empty
  if (!event.target[0].value || !event.target[1].value) {
    alert("Please fill in all fields before submitting.");
  } else {
    // check the text isn't more than 100chars before submitting
    if (event.target[1].value.toString().length > 100) {
      alert(
        "Your letter was too long! Try keep your letter 100 characters or less."
      );
    } else {
      // post form data
      fetch("/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target[0].value,
          request: event.target[1].value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // redirect to success message page
            window.location.assign("/success");
          }
          if (data.error) {
            // redirect to error message page
            window.location.assign(`/error?error=${data.error}`);
          }
        });
    }
  }
};
