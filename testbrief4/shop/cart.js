let signupButtonNav = document.getElementById('sigupp');
let loginButtonNav = document.getElementById('loginn');

// const isloggedin = sessionStorage.getItem("isLoggedIn");
// if (isloggedin == 'true') {
//     signupButtonNav.style.display = 'none';
//     loginButtonNav.textContent = 'LOG OUT';
//     loginButtonNav.addEventListener('click', (e) => {
//         window.location.href = '/home/index.html';
//         sessionStorage.clear();
//     });
// }
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

document.getElementById("check").onclick = () => {
    window.location.href = 'checkout.html';
};

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve user ID from sessionStorage
    const userId = sessionStorage.getItem("id");

    // Fetch data from server
    fetch('http://localhost/api/view_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Include user ID in the request body
        body: JSON.stringify({ id: userId }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);

            // Handle the data and populate the table
            const tableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
            const totalPriceCell = document.getElementById('totalPrice');

            // Clear existing rows
            tableBody.innerHTML = '';

            // Initialize total price after discount
            let totalDiscountedPrice = 0;

            // Check if data is an array or object
            if (Array.isArray(data)) {
                // Data is an array, proceed with array processing
                data.forEach(item => {
                    const newRow = tableBody.insertRow(tableBody.rows.length);
                    newRow.innerHTML = `
                            <td><img src="${item.image}" alt=""></td>
                            <td>${item.name}</td>
                            <td>${item.product_id}</td>
                            <td>${item.price}</td>
                            <td>${item.price_after_discount}</td>
                            <td>${item.quantity}</td>
                            <td><button onclick="removeItem(${item.product_id},${sessionStorage.getItem("id")})"><i class="fa-solid fa-trash"></i></button></td>
                        `;

                    // Accumulate the price after discount for each row
                    totalDiscountedPrice += parseFloat(item.price_after_discount);
                });

                // Update total price after discount
                totalPriceCell.textContent = `${totalDiscountedPrice} JD`;
            } else if (typeof data === 'object') {
                // Data is an object, handle it accordingly
                // For example, you can create a single row for this object
                const newRow = tableBody.insertRow(tableBody.rows.length);
                newRow.innerHTML = `
                        <td><img src="${data.image}" alt=""></td>
                        <td>${data.name}</td>
                        <td>${data.product_id}</td>
                        <td>${data.price}</td>
                        <td>${data.price_after_discount}</td>
                        <td>${data.quantity}</td>
                        <td><button onclick="removeItem(${data.product_id},${sessionStorage.getItem("id")})"><i class="fa-solid fa-trash"></i></button></td>
                    `;

                // Accumulate the price after discount for the single row
                totalDiscountedPrice += parseFloat(data.price_after_discount);

                // Update total price after discount
                totalPriceCell.textContent = `${totalDiscountedPrice} JD`;
            } else {
                console.error('Data has an unexpected format:', data);
            }
        })
        .catch(error => console.error('Error:', error));

    // Checkout button click event
    document.getElementById("check").onclick = () => {
        window.location.href = 'checkout.html';
    };


});
////////////////////////////////////////////////////////////////////////
/// view in databased
////////////////////////////////////////////////////////////////////////


function removeItem(productId, userid) {
    // Retrieve user ID from sessionStorage

    // Fetch request to remove the item from the cart
    fetch('http://localhost/api/delet_cart.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userid,  // Include the user ID
            product_id: productId,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data, if needed
            console.log('Item removed successfully:', data);

            // Remove the row directly from the table if found
            const removedRow = document.querySelector(`[data-product-id="${productId}"]`);
            if (removedRow) {
                removedRow.remove();
                console.log('Row removed successfully.');
            } else {
                console.error('Row not found for product ID:', productId);
            }

            // Update the total price after discount, if needed
            // ...

        })
        .catch(error => console.error('Error removing item:', error));

    location.reload();
}

////////////////////////////////////////////////////////////////////////
/// delet cart  in databased
////////////////////////////////////////////////////////////////////////


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