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


let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    window.location.href = '/shop/cart.html';
};


// Get Data From Api
// async method:
async function get() {
    const response = await fetch('http://localhost/api/read_product.php', {
        method: 'GET',
    });
    const data = await response.json();
    console.log(data);


    let product = document.getElementById('card');
    product.innerHTML = '';
    data.forEach(productData => {
        let productCard = document.createElement('div');
        productCard.className = "card";
        productCard.innerHTML = `
                <img class="image" src="${productData.image}">${productData.image}   
                <h1>${productData.name}</h1>
                <span>${productData.description}</span>
                <h3>${productData.price} JD</h3>
                <h2 class="testPrice" attruibute="${productData.price_after_discount}">${productData.price_after_discount}</h2>
                <h4> Category : ${productData.category_id}</h4>
                <input type="hidden" class="" value=${productData.product_id}>
                <button class="add" data-product-id="${productData.product_id}" onclick="addProduct(${productData.product_id})">Add to cart</button>`;

        product.appendChild(productCard);
    });
    return data;
}
get();


// filter product on name/category and price:
const displayProducts = async () => {
    const input = document.querySelector("input");
    const query = input.value.toLowerCase();
    const priceRange = document.querySelector("#price-range").value;
    const data = await get();

    const filteredData = data.filter((productData) => {
        const nameMatches = query === "" || productData.name.toLowerCase().includes(query);
        const categoryMatches = query === "" || productData.category_id.toString() === query;
        const priceMatches = productData.price <= priceRange;

        return (nameMatches || categoryMatches) && priceMatches;
    });

    let productContainer = document.getElementById('card');
    productContainer.innerHTML = '';

    filteredData.forEach(productData => {
        let productCard = document.createElement('div');
        productCard.className = "card";
        productCard.innerHTML = ` 
            <img class="image" src="${productData.image}">   
            <h1>${productData.name}</h1>
            <span>${productData.description}</span>
            <h3><del>${productData.price}</del> JD</h3>
            <h2 class="testPrice">${productData.price_after_discount}</h2>
            <h4> Category: ${productData.category_id}</h4>
            <input type="hidden" class="" value=${productData.product_id}>
            <input type="hidden" name="price" class="hidden" value="${productData.price_after_discount}">
            <button class="add" data-product-id="${productData.product_id}" onclick="addProduct(${productData.product_id})">Add to cart</button>`;

        productContainer.appendChild(productCard); // used fro dynamic update depend on database
    });
};


document.querySelector("input").addEventListener("input", displayProducts);
document.querySelector("#price-range").addEventListener("input", displayProducts);

get().then(displayProducts);



// send data (user_id and product_id) to database:
function getUserId() {
    return sessionStorage.getItem('id');
}

function addProduct(product_id) {
    const userId = sessionStorage.getItem('id');

    const data = {
        id: userId,
        product_id: product_id
    };

    fetch('http://localhost/api/AddCart.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.text())
        .then(text => console.log(text))
        .catch(error => console.log(error));
}


// const isloggedin = sessionStorage.getItem("isLoggedIn");
// if (isloggedin == 'true') {
//     signupButtonNav.style.display = 'none';
//     loginButtonNav.textContent = 'LOG OUT';
//     loginButtonNav.addEventListener('click', (e) => {
//         window.location.href = '/home/index.html';
//         sessionStorage.clear();
//     });
// }

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
  