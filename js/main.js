// Check if There's Local Storage Color Option
let mainColor = localStorage.getItem("color_option");

if(mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);

    // Remove Active Class from All Children
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        // Add Active Class on Element with Data-Color === Local Storage Item
        if (element.dataset.color === mainColor) {
            // Add Active Class on Self
            element.classList.add("active");       
        }

    });


}


// Toggle Sping Class
document.querySelector(".toggle-settings .fa-cog").onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
}


// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {

    li.addEventListener("click", (e) => {
        // Set Color on Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color En Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    })
})


// Switctch Random Background Option
const randomBgElement = document.querySelectorAll(".random-backgrounds span");

//Loop on All Spans
randomBgElement.forEach(span => {

    // Click on All Spans
    span.addEventListener("click", (e) => {

        handleActive(e);

        if(e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }

    })
})


// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Imgs
let imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

// Random Background Option
let backgroundOption = true;

// Variable to Control The Interval
let backgroundInterval;

// Check If There's Storage Random Bakcgroungd Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if Random Background Local Storage in Not Empty
if(backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

    } else {

        // Remove Active Class from All Spans
        backgroundOption = false;
        document.querySelectorAll(".random-backgrounds span").forEach(element => {
            element.classList.remove("active");
        });

        if (backgroundLocalItem === 'true') {
            document.querySelector(".random-backgrounds .yes").classList.add("active");
        } else {
            document.querySelector(".random-backgrounds .no").classList.add("active");
        }

    }

    // Remove Active Class from All Spans


}

// Function To Randomize Images
function randomizeImgs() {
    // Change Background Image Url
    if( backgroundOption === true) {

        let index = 0;
        backgroundInterval = setInterval(()=>{
            index = (index < 4)? index +1 : 0;
            landingPage.style.backgroundImage = `url("./imgs/${imgArray[index]}")`;
        }, 2000);

    }

}

randomizeImgs();


// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });

    }

}

// Create Popup with The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{

    img.addEventListener("click", (e) => {
        
        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class to Overlay
        overlay.className = "popup-overlay";

        // Append Overlay to the Body
        document.body.appendChild(overlay);

        // Create the Popup
        let popupBox = document.createElement("div");

        // Add Class to the Popup Box
        popupBox.className = "popup-box";

        if (img.alt !== null) {

            // Create Heading
            let imgHeading = document.createElement("h3");

            //Create text for Heading
            let imagText = document.createTextNode(img.alt);

            // Append the Text to the Heading
            imgHeading.appendChild(imagText);

            // Append the Heading to the Popup Box
            popupBox.appendChild(imgHeading);

        }

        // Create the Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = img.src;

        // Add Image to Popup Box
        popupBox.appendChild(popupImage);

        // Append the Popup Box to Body
        document.body.appendChild(popupBox);

        // Create the Close Span
        let closeButton = document.createElement("span");

        // Create the Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text to Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class to Close Button
        closeButton.className = "close-button";

        // Add Close Button to the Popup Box
        popupBox.appendChild(closeButton);

    })

});

// Close Popup
document.addEventListener("click", (e) => {
    if(e.target.className === "close-button") {

        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();

    }
});

// Select All Nav Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Nav Menu Links
const allNavLinks = document.querySelectorAll(".menu a");

function scrollingItems(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e)=> {
    
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
    
        });
    });
}

scrollingItems(allBullets);
scrollingItems(allNavLinks);


// Handle Active State
function handleActive(e) {

    // Remove Active Class from All Sibling
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // Add Active Class on Self
    e.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalStorageItem = localStorage.getItem("bullets_option");

if(bulletLocalStorageItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if(bulletLocalStorageItem === "block") {

        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", "block");

        } else {

            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", "none");

        }

        handleActive(e);
    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function(){
    localStorage.clear();
    window.location.reload();
}

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".menu");

toggleBtn.onclick = function (e) {

  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {

    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {

      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");

    }

  }

});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
  e.stopPropagation();
}