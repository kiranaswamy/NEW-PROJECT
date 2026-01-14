// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("form");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = form.name.value.trim();
//     const email = form.email.value.trim();
//     const password = form.password.value.trim();

//     try {
//       const res = await axios.post("http://localhost:3000/user/add", {
//         name,
//         email,
//         password,
//       });

//       alert(res.data.message); 
//       form.reset();
      
//     } catch (err) {
//       const msg = err.response?.data?.message || "Something went wrong";
//       alert(msg);
//     }
//   });
// });








document.addEventListener("DOMContentLoaded", () => {

  // -----------------SIGNUP--------------------------
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        const res = await axios.post("http://localhost:3000/user/signup", {
          name, email, password
        });
        alert(res.data.message);
        signupForm.reset();
        window.location.href = "signin.html";
      } catch (err) {
        const msg = err.response?.data?.message || "Something went wrong";
        alert(msg);
      }
    });

    // Link to signin page
    const goToSignin = document.getElementById("goToSignin");
    if (goToSignin) {
      goToSignin.addEventListener("click", () => {
        window.location.href = "signin.html";
      });
    }
  }


 //------------------------- SIGNIN-----------------------------------
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await axios.post("http://localhost:3000/user/signin", {
        email, password
      });

      alert(res.data.message);

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isPremiumUser", res.data.isPremiumUser);
      
      window.location.href = "expense.html";

      signinForm.reset();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      alert(msg);
    }
  });

  // Link to signup page
  const goToSignup = document.getElementById("goToSignup");
  if (goToSignup) {
    goToSignup.addEventListener("click", () => {
      window.location.href = "signup.html";
    });
  }
}
//------------------------- forgot password----------------------
 const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("forgotEmail").value.trim();

      try {
        const res = await axios.post("http://localhost:3000/password/forgot", {
          email
        });

        alert("Password reset link sent to your email!");

      } catch (error) {
        console.error(error);
        alert("Failed to send reset link");
      }
    });
  }

});
