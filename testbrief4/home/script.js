
let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    window.location.href = '/shop/cart.html';
};

// slider:
var swiper = new Swiper(".product-slider", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,

    },
    1020: {
      slidesPerView: 3,

    },
  },
});

//login and signup btn:
let signupButtonNav = document.getElementById('sigupp');
signupButtonNav.addEventListener('click', function () {

  window.location.href = '/login_sigup/signup.html';

});
let loginButtonNav = document.getElementById('loginn');
loginButtonNav.addEventListener('click', function () {
  window.location.href = '/login_sigup/login.html';
})
let buttonshop = document.getElementById('buttonshop');
buttonshop.addEventListener('click', function () {
  window.location.href = '/shop/shop.html';
});

//session:
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


/// View last 3 comments:
async function reviewUsers() {
  const response = await fetch('http://localhost/api/showLast3Reviews.php', {
      method: 'GET',
  });
  const data = await response.json();
  console.log(data);

  const reviewsList = document.getElementById('reviews-list');
  reviewsList.innerHTML = "";

  data.forEach(reviewData => {
      let reviewCard = document.createElement('div');
      reviewCard.className = "card";
      reviewCard.innerHTML = `
      <p>" ${reviewData.review} "</p>
      <img class="image" src="${reviewData.image}">
      <h3>${reviewData.username}</h3>
      <div class="rating">
        <input type="radio" id="star1" name="rating${reviewData.rate}" value="${reviewData.rate}"><label for="star1">&#9733;</label>
        <input type="radio" id="star2" name="rating${reviewData.rate}" value="${reviewData.rate}"><label for="star2">&#9733;</label>
        <input type="radio" id="star3" name="rating${reviewData.rate}" value="${reviewData.rate}"><label for="star3">&#9733;</label>
        <input type="radio" id="star4" name="rating${reviewData.rate}" value="${reviewData.rate}"><label for="star4">&#9733;</label>
        <input type="radio" id="star5" name="rating${reviewData.rate}" value="${reviewData.rate}"><label for="star5">&#9733;</label>
      </div>
      `;
      
    
      reviewsList.appendChild(reviewCard);
  });

  return data;
}

reviewUsers();







