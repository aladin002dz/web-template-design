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

        // Remove Active Class from All Children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        // Add Active Class on Self
        e.target.classList.add("active");

    })
})


// Switctch Random Background Option
const randomBgElement = document.querySelectorAll(".random-backgrounds span");

//Loop on All Spans
randomBgElement.forEach(span => {

    // Click on All Spans
    span.addEventListener("click", (e) => {

        // Remove Active Class from All Children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        // Add Active Class on Self
        e.target.classList.add("active");

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

