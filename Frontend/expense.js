

// function Timetracker() {
//   console.log("🔥 Button clicked");

//   const amount = document.getElementById("expense-amount").value;
//   const description = document.getElementById("expense-description").value;
//   const category = document.getElementById("expense-category").value;

//   if (!amount || !description) {
//     alert("Please enter both amount and description!");
//     return;
//   }

//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("You must be logged in to add an expense!");
//     return;
//   }

//   axios.post(
//     "http://localhost:3000/api/addExpense",
//     { amount, description, category },
//     { headers: { Authorization: `Bearer ${token}` } }
//   )
//   .then(response => {
//     console.log("Saved to DB:", response.data);

//     const expense = response.data;  // contains id

//     addExpenseToUI(expense);

//     document.getElementById("expense-amount").value = "";
//     document.getElementById("expense-description").value = "";
//     document.getElementById("expense-category").value = "Fuel";
//   })
//   .catch(err => {
//     console.log("Error:", err.response?.data || err);
//     if (err.response?.status === 401) {
//       alert("Unauthorized! Please login again.");
//       window.location.href = "signin.html";
//     }
//   });
// }


// // ✅ Render One Expense in UI
// function addExpenseToUI(expense) {
//   const li = document.createElement("li");
//   li.textContent = `${expense.description} - ${expense.amount} - ${expense.category}`;

//   const token = localStorage.getItem("token");

//   // DELETE BUTTON
//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Delete";
//   deleteBtn.style.width = '150px';

//   deleteBtn.onclick = () => {
//     axios.delete(`http://localhost:3000/api/expense/${expense.id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(() => li.remove())
//     .catch(err => console.error("Delete Error:", err.response?.data || err));
//   };

//   // EDIT BUTTON
//   const editBtn = document.createElement("button");
//   editBtn.textContent = "Edit";
//   editBtn.style.width = '150px';
//   editBtn.style.marginRight = '10px';

//   editBtn.onclick = () => {
//     document.getElementById("expense-amount").value = expense.amount;
//     document.getElementById("expense-description").value = expense.description;
//     document.getElementById("expense-category").value = expense.category;

//     li.remove();
//   };

//   li.appendChild(editBtn);
//   li.appendChild(deleteBtn);

//   document.getElementById("expense-list").appendChild(li);
// }


// // ✅ Load all expenses on refresh
// function getAllexpenses() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login first!");
//     return;
//   }

//   axios.get("http://localhost:3000/api/expenses", {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   .then(response => {
//     console.log("All expenses:", response.data);

//     document.getElementById("expense-list").innerHTML = ""; // clear old list

//     response.data.forEach(exp => addExpenseToUI(exp));
//   })
//   .catch(err => {
//     console.log("Fetch Error:", err.response?.data || err);
//   });
// }



// // ✅ Leaderboard UI
// function LeaderBoard() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login to view leaderboard!");
//     return;
//   }

//   axios.get("http://localhost:3000/api/leaderboard", {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => {
//       console.log("Leaderboard API:", response.data);

//       const leaderboard = response.data; 
//       const boardDiv = document.querySelector(".leadr-board");
//       boardDiv.innerHTML = `<h1>Leader Board</h1>`;

//       leaderboard.forEach((user, index) => {
//         boardDiv.innerHTML += `
//           <div class="card p-3 mt-2">
//             <h4>${index + 1}. ${user.name}</h4>
//             <p><strong>Total Expense:</strong> ₹${user.totalExpense}</p>
//           </div>
//         `;
//       });
//     })
//     .catch(err => {
//       console.error("Leaderboard Error:", err.response?.data || err);
//       alert("Failed to load leaderboard!");
//     });
// }


// window.addEventListener("DOMContentLoaded", async () => {
//   // 1️⃣ Premium Check
//   const isPremiumUser = localStorage.getItem("isPremiumUser") === "true";
//   const downloadBtn = document.getElementById("downloadBtn");

//   if (downloadBtn) {
//     if (isPremiumUser) {
//       downloadBtn.disabled = false;
//       downloadBtn.textContent = "Download Expenses";
//     } else {
//       downloadBtn.disabled = true;
//       downloadBtn.textContent = "Upgrade to Download";
//     }

//     downloadBtn.addEventListener("click", () => {
//       if (!isPremiumUser) return;

//       const expenses = window.expensesList || []; // fetched earlier

//       if (expenses.length === 0) {
//         alert("No expenses to download!");
//         return;
//       }

//       // Prepare CSV
//       let csv = "Amount,Description,Category,Created At\n";
//       expenses.forEach(exp => {
//         csv += `${exp.amount},${exp.description},${exp.category},${exp.createdAt}\n`;
//       });

//       const blob = new Blob([csv], { type: "text/csv" });
//       const url = URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "expenses.csv";
//       a.click();

//       URL.revokeObjectURL(url);
//     });
//   }

//   // 2️⃣ Fetch Expenses
//   await getAllexpenses(); // Make sure this stores data in window.expensesList
// });






// Leaderboard



// let allExpenses = [];
// let currentPage = 1;
// const limit = 10;

// // -------------------- ADD EXPENSE ------------------------
// function Timetracker() {
//   console.log("🔥 Button clicked");

//   const amount = document.getElementById("expense-amount").value;
//   const description = document.getElementById("expense-description").value;
//   const category = document.getElementById("expense-category").value;

//   if (!amount || !description) {
//     alert("Please enter both amount and description!");
//     return;
//   }

//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("You must be logged in to add an expense!");
//     return;
//   }

//   axios
//     .post(
//       "http://localhost:3000/api/addExpense",
//       { amount, description, category },
//       { headers: { Authorization: `Bearer ${token}` } }
//     )
//     .then((response) => {
//       console.log("Saved to DB:", response.data);

//       const expense = response.data; // contains id

//       allExpenses.push(expense); // add to array
//       renderPage(currentPage);   // refresh current page

//       // Reset input
//       document.getElementById("expense-amount").value = "";
//       document.getElementById("expense-description").value = "";
//       document.getElementById("expense-category").value = "Fuel";
//     })
//     .catch((err) => {
//       console.log("Error:", err.response?.data || err);
//       if (err.response?.status === 401) {
//         alert("Unauthorized! Please login again.");
//         window.location.href = "signin.html";
//       }
//     });
// }

// // ----------------------- RENDER EXPENSE -----------------------
// function addExpenseToUI(expense) {
//   const li = document.createElement("li");
//   li.className = "list-group-item d-flex justify-content-between align-items-center";

//   li.textContent = `${expense.description} - ₹${expense.amount} - ${expense.category}`;

//   const token = localStorage.getItem("token");

//   // DELETE BUTTON
//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Delete";
//   deleteBtn.className = "btn btn-danger btn-sm ms-2";

//   deleteBtn.onclick = () => {
//     axios
//       .delete(`http://localhost:3000/api/expense/${expense.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         allExpenses = allExpenses.filter((e) => e.id !== expense.id);
//         renderPage(currentPage);
//       })
//       .catch((err) =>
//         console.error("Delete Error:", err.response?.data || err)
//       );
//   };

//   // EDIT BUTTON
//   const editBtn = document.createElement("button");
//   editBtn.textContent = "Edit";
//   editBtn.className = "btn btn-warning btn-sm";

//   editBtn.onclick = () => {
//     document.getElementById("expense-amount").value = expense.amount;
//     document.getElementById("expense-description").value = expense.description;
//     document.getElementById("expense-category").value = expense.category;

//     li.remove();
//   };

//   li.appendChild(editBtn);
//   li.appendChild(deleteBtn);

//   document.getElementById("expense-list").appendChild(li);
// }

// // --------------------- FETCH ALL EXPENSES ---------------------
// function getAllexpenses() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login first!");
//     return;
//   }

//   axios
//     .get("http://localhost:3000/api/expenses", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       console.log("All expenses:", response.data);

//       allExpenses = response.data; // store all
//       renderPage(1); // show first page
//     })
//     .catch((err) => {
//       console.log("Fetch Error:", err.response?.data || err);
//     });
// }

// // ---------------------- LEADERBOARD -----------------------
// function LeaderBoard() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login to view leaderboard!");
//     return;
//   }

//   axios
//     .get("http://localhost:3000/api/leaderboard", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       console.log("Leaderboard API:", response.data);

//       const leaderboard = response.data;
//       const boardDiv = document.querySelector(".leadr-board");
//       boardDiv.innerHTML = `<h1>Leader Board</h1>`;

//       leaderboard.forEach((user, index) => {
//         boardDiv.innerHTML += `
//           <div class="card p-3 mt-2">
//             <h4>${index + 1}. ${user.name}</h4>
//             <p><strong>Total Expense:</strong> ₹${user.totalExpense}</p>
//           </div>
//         `;
//       });
//     })
//     .catch((err) => {
//       console.error("Leaderboard Error:", err.response?.data || err);
//       alert("Failed to load leaderboard!");
//     });
// }

// // ---------------------- PAGINATION LOGIC -------------------
// function renderPage(page) {
//   currentPage = page;

//   const start = (page - 1) * limit;
//   const end = start + limit;

//   const list = document.getElementById("expense-list");
//   list.innerHTML = "";

//   const pageItems = allExpenses.slice(start, end);
//   pageItems.forEach((exp) => addExpenseToUI(exp));

//   document.getElementById("page-info").innerText =
//     `Page ${page} of ${Math.ceil(allExpenses.length / limit)}`;
// }

// function firstPage() {
//   renderPage(1);
// }

// function prevPage() {
//   if (currentPage > 1) {
//     renderPage(currentPage - 1);
//   }
// }

// function nextPage() {
//   const totalPages = Math.ceil(allExpenses.length / limit);
//   if (currentPage < totalPages) {
//     renderPage(currentPage + 1);
//   }
// }

// function lastPage() {
//   const totalPages = Math.ceil(allExpenses.length / limit);
//   renderPage(totalPages);
// }

// // ------------------- ON PAGE LOAD -------------------------
// window.addEventListener("DOMContentLoaded", async () => {
//   // Premium Code
//   const isPremiumUser = localStorage.getItem("isPremiumUser") === "true";
//   const downloadBtn = document.getElementById("downloadBtn");

//   if (downloadBtn) {
//     if (isPremiumUser) {
//       downloadBtn.disabled = false;
//       downloadBtn.textContent = "Download Expenses";
//     } else {
//       downloadBtn.disabled = true;
//       downloadBtn.textContent = "Upgrade to Download";
//     }
//   }

//   await getAllexpenses();
// });


let allExpenses = [];
let currentPage = 1;
const limit = 10;

// -------------------- ADD EXPENSE ------------------------
function Timetracker() {
  console.log("🔥 Button clicked");

  const amount = document.getElementById("expense-amount").value;
  const description = document.getElementById("expense-description").value;
  const category = document.getElementById("expense-category").value;

  if (!amount || !description) {
    alert("Please enter both amount and description!");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to add an expense!");
    return;
  }

  axios
    .post(
      "http://localhost:3000/api/addExpense",
      { amount, description, category },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      const expense = response.data;

      allExpenses.push(expense);

      // ✅ go to last page automatically
      currentPage = Math.ceil(allExpenses.length / limit);
      renderPage(currentPage);

      document.getElementById("expense-amount").value = "";
      document.getElementById("expense-description").value = "";
      document.getElementById("expense-category").value = "Fuel";
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        window.location.href = "signin.html";
      }
    });
}

// ----------------------- RENDER EXPENSE -----------------------
function addExpenseToUI(expense) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";

  li.textContent = `${expense.description} - ₹${expense.amount} - ${expense.category}`;

  const token = localStorage.getItem("token");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-danger btn-sm ms-2";

  deleteBtn.onclick = () => {
    axios
      .delete(`http://localhost:3000/api/expense/${expense.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        allExpenses = allExpenses.filter((e) => e.id !== expense.id);

        // ✅ fix empty page after delete
        const totalPages = Math.ceil(allExpenses.length / limit);
        if (currentPage > totalPages) {
          currentPage = totalPages || 1;
        }

        renderPage(currentPage);
      });
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "btn btn-warning btn-sm";

  editBtn.onclick = () => {
    document.getElementById("expense-amount").value = expense.amount;
    document.getElementById("expense-description").value = expense.description;
    document.getElementById("expense-category").value = expense.category;

    // ✅ remove from array + re-render
    allExpenses = allExpenses.filter((e) => e.id !== expense.id);
    renderPage(currentPage);
  };

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  document.getElementById("expense-list").appendChild(li);
}

// --------------------- FETCH ALL EXPENSES ---------------------
function getAllexpenses() {
  const token = localStorage.getItem("token");
  if (!token) return;

  axios
    .get("http://localhost:3000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      allExpenses = response.data;
      renderPage(1);
    });
}

// ---------------------- LEADERBOARD -----------------------
function LeaderBoard() {
  const token = localStorage.getItem("token");
  if (!token) return;

  axios
    .get("http://localhost:3000/api/leaderboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const boardDiv = document.querySelector(".leadr-board");
      boardDiv.innerHTML = `<h1>Leader Board</h1>`;

      response.data.forEach((user, index) => {
        boardDiv.innerHTML += `
          <div class="card p-3 mt-2">
            <h4>${index + 1}. ${user.name}</h4>
            <p><strong>Total Expense:</strong> ₹${user.totalExpense}</p>
          </div>
        `;
      });
    });
}

// ---------------------- PAGINATION LOGIC -------------------
function renderPage(page) {
  currentPage = page;

  const start = (page - 1) * limit;
  const end = start + limit;

  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  const pageItems = allExpenses.slice(start, end);
  pageItems.forEach((exp) => addExpenseToUI(exp));

  const totalPages = Math.ceil(allExpenses.length / limit) || 1;
  document.getElementById("page-info").innerText =
    `Page ${page} of ${totalPages}`;
}

function firstPage() {
  renderPage(1);
}

function prevPage() {
  if (currentPage > 1) renderPage(currentPage - 1);
}

function nextPage() {
  const totalPages = Math.ceil(allExpenses.length / limit);
  if (currentPage < totalPages) renderPage(currentPage + 1);
}

function lastPage() {
  const totalPages = Math.ceil(allExpenses.length / limit);
  renderPage(totalPages);
}

// ------------------- ON PAGE LOAD -------------------------
window.addEventListener("DOMContentLoaded", async () => {
  const isPremiumUser = localStorage.getItem("isPremiumUser") === "true";
  const downloadBtn = document.getElementById("downloadBtn");

  if (downloadBtn) {
    downloadBtn.disabled = !isPremiumUser;
  }

  await getAllexpenses();
});
