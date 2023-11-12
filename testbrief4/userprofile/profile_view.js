let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    window.location.href = '/shop/cart.html';
};

let signupButtonNav = document.getElementById('sigupp');
let loginButtonNav = document.getElementById('loginn');

const isloggedin = sessionStorage.getItem("isLoggedIn");
if (isloggedin == 'true') {
    signupButtonNav.style.display = 'none';
    loginButtonNav.textContent = 'LOG OUT';
    loginButtonNav.addEventListener('click', (e) => {
        window.location.href = '/home/index.html';
        sessionStorage.clear();
    });
}
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the id from sessionStorage
    var userId = sessionStorage.getItem('id');

    // Check if the id is present
    if (userId) {
        // Function to fetch user data using a POST request
        function fetchUserData() {
            fetch('http://localhost/api/user_read_profile.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId })
            })
                .then(response => response.json())
                .then(data => {
                    // Display user data on the page
                    document.getElementById("image").src = data.image;
                    document.getElementById('name').innerText = data.username;
                    document.getElementById('email').innerText = data.email;
                    document.getElementById('password').innerText = data.password;
                })
                .catch(error => console.error('Error fetching user data:', error));
        }

        // Function to update user data using a PUT request
        function updateUserData(updatedUserData) {
            fetch('http://localhost/api/user_update_profile.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            })
                .then(response => response.json())
                .then(data => {
                    // If the update is successful, fetch and display the updated user data
                    fetchUserData();
                    alert('Profile updated successfully!');
                })
                .catch(error => console.error('Error updating user data:', error));
        }

        // Fetch and display initial user data
        fetchUserData();

        // Add event listener to the "Edit Profile" button
        document.querySelector('button[type="button"]').addEventListener('click', function () {
            // Assuming you have input fields for updating user data, get their values
            var updatedName = prompt('Enter updated name:', document.getElementById('name').innerText);
            var updatedEmail = prompt('Enter updated email:', document.getElementById('email').innerText);
            var updatedPassword = prompt('Enter updated password:', document.getElementById('password').innerText);

            // Prepare the data to be sent in the request body
            var updatedUserData = {
                id: userId,
                username: updatedName,
                email: updatedEmail,
                password: updatedPassword
            };

            // Call the function to update user data
            updateUserData(updatedUserData);
        });
    } else {
        console.error('User id not found in sessionStorage');
    }
});
