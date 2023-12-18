(function(){

    function updateNumber() {
        numberOfGoods.textContent = number.textContent;
        if(numberOfGoods.textContent == 0) {
        numberOfGoods.style.display = 'none';
        } else {
            numberOfGoods.style.display = 'block';
        }
    }

    function displayPurchases(n) {
        let purchases;
        if(localStorage.getItem('purchase') === null) {
            purchases = [];
        } else {
            purchases = JSON.parse(localStorage.getItem('purchase'));
        }

        number.textContent = n;
        numberOfGoods.textContent = n;
        updateNumber();
        fillCart();
    }

    function createNewPurchase() {

        if(ulEl.children.length == 0) {
            let x = number.innerHTML * price.innerHTML.slice(1);
            let calculatedPrice = Number(x).toFixed(2);

            const liEl = document.createElement('li');
            liEl.classList.add('purchase-info');

            liEl.innerHTML = `
                <img src="./images/image-product-1-thumbnail.jpg" alt="">
                <div>
                    <p>Fall Limited Edition Sneakers</p>
                    <span class="purchase-number">${price.innerHTML} x ${number.innerHTML}</span>
                    <span class="calc">$${calculatedPrice}</span>
                </div>
            `;

            let deleteEl = document.createElement('div');
            deleteEl.classList.add('delete');
            deleteEl.innerHTML = `<img src="./images/icon-delete.svg" alt="delete">`;
            deleteEl.addEventListener('click', () => {
                deleteEl.parentElement.remove();
                number.textContent = 0;
                numberOfGoods.textContent = 0;
                updateNumber();
                fillCart();
                cartState.style.display = 'block';
                localStorage.removeItem('purchase');
                localStorage.removeItem('number');
            });

            liEl.appendChild(deleteEl);
            ulEl.appendChild(liEl);
            addToLocal(liEl);
            // save number of purchases in local storage
            localStorage.setItem('number', number.innerHTML);

        } else if(ulEl.children.length > 0) {
            updateNumber();
            x = number.innerHTML * price.innerHTML.slice(1);
            calculatedPrice = Number(x).toFixed(2);
            document.querySelector('.purchase-number').innerHTML = `${price.innerHTML} x ${number.innerHTML}`;
            document.querySelector('.calc').innerHTML = `$${calculatedPrice}`;

            // update number of purchases in local storage
            localStorage.setItem('number', number.innerHTML);
            localStorage.removeItem('purchase');
            addToLocal(ulEl.lastChild);
        }
        
    }

    function addToLocal(x) {
        let purchases;
        if(localStorage.getItem('purchase') === null) {
            purchases = [];
        } else {
            purchases = JSON.parse(localStorage.getItem('purchase'));
        }

        if(purchases.length > 0) {
            purchases = [];
            localStorage.removeItem('purchase');
        }
        purchases.push(x.innerHTML);
        localStorage.setItem('purchase' , JSON.stringify(purchases));
    }

    function fillCart() {

        if(number.textContent == 0) {
            cartFull.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            emptyCart.style.display = 'none';
            cartFull.style.display = 'block';
            createNewPurchase();
        }
    }

    function showSlide(n, collection) {
        collection.forEach(img => {
            img.style.display = 'none';
        });

        if(n > collection.length - 1) {
            slideIndex = 0;
        }

        if(n < 0) {
            slideIndex = collection.length - 1;
        }

        collection[slideIndex].style.display = 'block';
        if(window.innerWidth >= 730) {
            pics2[slideIndex].click();
        } else {
            pics[slideIndex].click();
        }
    }

    function showProduct() {
        lightBg.style.display = 'block';
        selectedProduct.style.display = 'flex';
    }

    let buttonClicked = false;
    let oldY = 0;
    let overCart = false;
    const ulEl = document.querySelector('.cart-full ul');
    const price = document.querySelector('.new-price');
    const cart = document.querySelector('.cart');
    const increase = document.getElementById('increase');
    const decrease = document.getElementById('decrease');
    const cartState = document.querySelector('.cart-container');
    const number = document.getElementById('number');
    const numberOfGoods = document.querySelector('.cart span');
    const addBtn = document.querySelector('.addToCart button');
    const emptyCart = document.querySelector('.cart-empty');
    const cartFull = document.querySelector('.cart-full');
    const checkoutBtn = document.querySelector('.checkout')
    const selectedImage = document.querySelectorAll('.selected img');
    const selectedImage2 = document.querySelectorAll('.selected-view .large-pic img');
    const picsDiv = document.querySelectorAll('.thumbnail');
    const picsDiv2 = document.querySelectorAll('#thumbnail');
    const pics = document.querySelectorAll('.thumbnail img');
    const pics2 = document.querySelectorAll('#thumbnail img');
    const selectedProduct = document.querySelector('.product-select');
    const lightBg = document.querySelector('.light-bg');
    const close = document.querySelector('.close');
    const next = document.querySelector('.next');
    const smNext = document.querySelector('.sm-next');
    const prev = document.querySelector('.previous');
    const smPrev = document.querySelector('.sm-previous');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const closeMenu = document.getElementById('close-menu');
    const pages = document.querySelector('.pages');

    let touchSupport = 'ontouchstart' in window;
    if(touchSupport == false) {
        document.documentElement.className += 'non-touch';
        console.log('non touch')
    } else {
        console.log('touchable')
    }


    if(numberOfGoods.textContent == 0) {
        updateNumber();
    }

    // DOM load event
    document.addEventListener('DOMContentLoaded', () => {
        let num;
        if(localStorage.getItem('number') === null) {
            num = 0
        } else {
            num = localStorage.getItem('number');
        }
        displayPurchases(num);
    });

    // event for displaying state of cart
    cart.addEventListener('mouseover', (e) => {
        oldY = e.pageY;
        cartState.style.display = 'block';
    });

    cart.addEventListener('mouseleave', (e) => {
        if(buttonClicked == false) {

            if(e.pageY > oldY) {
                cartState.addEventListener('mouseover', () => {
                    overCart = true;
                });
                cartState.addEventListener('mouseleave', () => {
                    overCart = false;
                });

                setTimeout(() => {
                    if(overCart) {
                        cartState.style.display = 'block';
                    } else {
                        cartState.style.display = 'none';
                    }

                }, 1000)
                
            } else {
                cartState.style.display = 'none';
            }

        } else {
            cartState.style.display = 'block';
        }
        
    });

    cart.addEventListener('click', () => {

        if(buttonClicked == true) {
            buttonClicked = false;
            cartState.style.display = 'none';
            cart.classList.remove('cart-clicked');
        } else {
            buttonClicked = true;
            cartState.style.display = 'block';
            cart.classList.add('cart-clicked');
        }
    });

    cartState.addEventListener('mouseleave', () => {
        if(buttonClicked == false) {
            cartState.style.display = 'none';
        } else {
            cartState.style.display = 'block';
        }
    });

    window.onclick = (evt) => {
        
        if(evt.target != checkoutBtn && evt.target != cart && !(evt.target.parentElement.classList.contains('delete'))) {
            buttonClicked = false;
            cartState.style.display = 'none';
            cart.classList.remove('cart-clicked');
        }

    }; 

    // event for increasing number
    increase.onclick = () => {
        number.textContent++;
    } 

    // event for decreasing number
    decrease.onclick = () => {
        if(number.textContent != 0) {
            number.textContent--;
        }
    }

    // event for add-to-cart button
    addBtn.addEventListener('click', () => {

        // displaying number of goods above cart icon
        updateNumber();
        fillCart();

    });
    
    // showing product event listener
    for(let i = 0; i < pics.length; i++) {
        pics[i].addEventListener('click', () => {

            for(let i = 0; i < pics.length; i++) {
                selectedImage[i].style.display = 'none';
                selectedImage2[i].style.display = 'none';
                picsDiv[i].classList.remove('active');
                picsDiv2[i].classList.remove('active');
                pics[i].classList.remove('image-active');
                pics2[i].classList.remove('image-active');
            };
            picsDiv[i].classList.add('active');
            picsDiv2[i].classList.add('active');
            pics[i].classList.add('image-active');
            pics2[i].classList.add('image-active');
            selectedImage[i].style.display = 'block';  

            if(pics2[i].classList.contains('image-active')) {
                selectedImage2[i].style.display = 'block';
            }
        })
    };
    pics[0].click();

    for(let i = 0; i < pics2.length; i++) {
        pics2[i].addEventListener('click', () => {
            
            for(let i = 0; i < pics2.length; i++) {
                selectedImage2[i].style.display = 'none';
                picsDiv2[i].classList.remove('active');
                pics2[i].classList.remove('image-active');
            }
            picsDiv2[i].classList.add('active');
            pics2[i].classList.add('image-active');
            selectedImage2[i].style.display = 'block';
        })
      
    }

    // next and previous functionality
    let slideIndex = 0;
    showSlide(slideIndex, selectedImage2);

    next.onclick = () => {
        slideIndex ++;
        showSlide(slideIndex, selectedImage2);
    }

    prev.onclick = () => {
        slideIndex--;
        showSlide(slideIndex, selectedImage2);
    }  

    // responsive view slider
    window.onresize = () => {
        if(window.innerWidth <= 730) {
            smNext.onclick = () => {
                slideIndex ++;
                showSlide(slideIndex, selectedImage);
            }

            smPrev.onclick = () => {
                slideIndex --;
                showSlide(slideIndex, selectedImage);
            }
        } 

        // in desktop view
        if(window.innerWidth > 730) {
            selectedImage.forEach(image => {
                image.addEventListener('click', showProduct)
            });

            close.onclick = () => {
                selectedProduct.style.display = 'none';
                lightBg.style.display = 'none';
            };
        } else {
            lightBg.style.display = 'none';
            selectedProduct.style.display = 'none';
            selectedImage.forEach(image => {
                image.removeEventListener('click', showProduct)
            });
        }

        if(pages.classList.contains('openSidebar')) {
            lightBg.style.display = 'block';
        }
        
    }

    window.onload = () => {
        if(window.innerWidth <= 730) {
            smNext.onclick = () => {
                slideIndex ++;
                showSlide(slideIndex, selectedImage);
            }

            smPrev.onclick = () => {
                slideIndex --;
                showSlide(slideIndex, selectedImage);
            }
        } 
        
        // in desktop view
        if(window.innerWidth >= 730) {
            selectedImage.forEach(image => {
                image.addEventListener('click', showProduct)
            });

            close.onclick = () => {
                selectedProduct.style.display = 'none';
                lightBg.style.display = 'none';
            };
        } else {
            lightBg.style.display = 'none';
            selectedProduct.style.display = 'none';
            selectedImage.forEach(image => {
                image.removeEventListener('click', showProduct)
            });
        } 
    }

    // hamburger menu event listener
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.style.display = 'none';
        closeMenu.style.display = 'block';
        lightBg.style.display = 'block';
        pages.classList.add('openSidebar');
    })

    closeMenu.addEventListener('click', () => {
        closeMenu.style.display = 'none';
        hamburgerMenu.style.display = 'block';
        lightBg.style.display = 'none';
        pages.classList.remove('openSidebar');
    })

    

}) ()