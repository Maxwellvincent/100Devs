//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// add click event onto button 
document.querySelector('button').addEventListener('click', getFetch)
// added a keypress event
document.querySelector('button').addEventListener('keypress', getFetch)
// wanted to be able to handle two events, created an array of the events,and added forEach



function getFetch(){
     // grab the input value
    let choice = document.querySelector('input').value;
    
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`;
    // `www.thecocktaildb.com/api/json/v1/1/search.php?s=`+choice;
    //  Check the keypress
    // if(e.keyCode === 13) {
    //     let userInput = document.querySelector('input').value;
    //     console.log(userInput);
    // }
   
    
    
    // now we need to get to the drink api
    

    fetch(url)
        .then( res => res.json())
        .then(data => {
            let imagesArr = [];
            // console.log(data.drinks) // returns an array of drink objects 
            // select the first 6 0 - 5
            let filter = Object.fromEntries(Object.entries(data.drinks).slice(0,6));
            // console.log(filter);
            // now we want to loop through the object (map), and grab the images
            Object.keys(filter).forEach((drink) => {
                imagesArr.push(filter[drink].strDrinkThumb)
            })
            // we now have an Array of images, we can map through and put into carousel?
            // first grab carousel inner, and then append child element
            let carousel = document.getElementById('holder');
            console.log(carousel.nextElementSibling)
            // carousel.querySelector('img')

            // need to put this into the map function 
            
            imagesArr.map((item, i) => {
                if(item === imagesArr[0]) {
                    carousel.querySelector('img').setAttribute('src',item)
                }

                let div = document.createElement('div');
                div.setAttribute('class', 'carousel-item');
                div.innerHTML = `<img class="d-block w-100" src="${item}" alt="${i} slide">`

                // I can grab the parent in this case I need to get carousel, then I need to 
                document.querySelector('.carousel-inner').append(div);
            })

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

