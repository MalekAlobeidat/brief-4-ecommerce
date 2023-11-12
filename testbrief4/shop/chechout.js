let signupButtonNav = document.getElementById('sigupp');
let loginButtonNav = document.getElementById('loginn');
const isloggedin = sessionStorage.getItem("isLoggedIn");
if (isloggedin == 'true') {
  signupButtonNav.textContent = 'profile';
  signupButtonNav.addEventListener('click', (e) => {
    window.location.href = '/userprofile/profile.html';
  });
  loginButtonNav.textContent = 'LOG OUT';
  loginButtonNav.addEventListener('click', (e) => {
    window.location.href = '/home/index.html';
    sessionStorage.clear();
  });
};
document.getElementById("check").onclick = (e) => {
    e.preventDefault();

    // Validation for Cardholder Name
    const cardholderName = document.querySelector('input[name="name"]').value.trim();
    if (cardholderName === "") {
        alert("Please enter Cardholder Name");
        return;
    }

    // Validation for Card Number
    const cardNumber = document.getElementById("number").value.trim();
    if (cardNumber === "" || isNaN(cardNumber) || cardNumber.length !== 14) {
        alert("Please enter a valid Card Number");
        return;
    }

    // Validation for Card Type
    const cardType = document.getElementById("card_type").value;
    if (cardType === "") {
        alert("Please select a Card Type");
        return;
    }

    // Validation for Expiry Date
    const expiryDate = document.getElementById("exp_date").value.trim();
    if (expiryDate === "") {
        alert("Please enter Expiry Date");
        return;
    }

    // Validation for CVV
    const cvv = document.getElementById("cvv").value.trim();
    if (cvv === "" || isNaN(cvv) || cvv.length !== 3) {
        alert("Please enter a valid CVV");
        return;
    }

    // If all validations pass, you can proceed with the fetch and redirect logic
    const id = sessionStorage.getItem("id");

    fetch('http://localhost/api/checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data if needed
        })
        .catch(error => {
            console.error('Error:', error);
        });

    window.location.href = 'cart.html';
};
// send comment to database :
function getUserId() {
    return sessionStorage.getItem('id');
  }
  
  function submitComment() {
    const review = document.querySelector('.comment-input').value;
    const rateInput = document.querySelector('input[type="radio"]:checked').value;
    const userId = sessionStorage.getItem('id');
  
    if (userId && review && rateInput) {
      console.log(rateInput)
      console.log(userId);
      console.log(review);
       
      const data = {
        id: userId,
        review: review,
        rate: rateInput
      };
  
      fetch('http://localhost/api/addReview.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (response.ok) {
          alert('Comment submitted successfully');
        } else {
          console.error('Failed to submit comment');
        }
      })
      .catch(error => console.error('Error during fetch:', error));
    } else {
  
      alert('Please fill the comment section');
    }
  }