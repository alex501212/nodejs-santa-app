requests = [];

exports.submitForm = async (req, res, next) => {
  // get user data
  const user = await fetch(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      //check if user exists
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === req.body.username) {
          return data[i];
        }
      }
    });

  // get user profile data
  const userProfile = await fetch(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // find data that matches the user's userid
      for (let i = 0; i < data.length; i++) {
        if (data[i].userUid === user?.uid) {
          return data[i];
        }
      }
    });

  // check if user/user profile exists
  if (!user || !userProfile) {
    res.status(400).send({ error: "user not found" });
  } else {
    //calulate user age
    let today = new Date();
    let birthDate = new Date(userProfile?.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();

    // check if user is 10 or older
    if (age >= 10) {
      res.status(400).send({ error: "age invalid" });
    } else {
      // check if date of birth is invalid
      if (isNaN(age)) {
        res.status(400).send({ error: "dob invalid" });
      } else {
        // successful request, add request to requests array to be used by the mail scheduler mailer.js
        requests.push({
          username: user?.username,
          address: userProfile?.address,
          request: req.body.request,
        });
        res.status(201).send({ success: true });
      }
    }
  }
};
