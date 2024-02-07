window.onload = function(){
    const cars = ["./assetst/images/secondCar.svg", "./assetst/images/car.svg", "./assetst/images/thirdCard.svg", "./assetst/images/fourth.svg"]

    var randomCar = Math.floor(Math.random() * 4);
    
    const beep = new Audio("./assetst/sounds/beep.wav");

    var car = {
        url: cars[randomCar],
        top: 200,
        left: 200,
        fuel: 70,
        fuelCost: 25,
        carModel: "",
        carReleaseDate: "",
        carFuelCharge: 0,

    
        model: function(){
            this.carModel =  prompt("Which model of your car?")
            return this.carModel;
        },
        releaseDate: function(){
            this.carReleaseDate = +prompt("Which date it was made (Year)")
            return this.carReleaseDate
        },
        fuelCharge: function(){
            this.carFuelCharge = Number(prompt("How much fuel it takes for 100km?"))
            return this.carFuelCharge
        },
    
    }
    
    var wholeWay = 0;
    var array = [
        {
            src: "./assetst/images/home.svg",
            alt: 'home',
            top: 120,
            left: 340
        },
        {
            src: "./assetst/images/hospital.svg",
            alt: 'hospital',
            top: 130,
            left: 225
        },
        {
            src: "./assetst/images/school.svg",
            alt: 'school',
            top: 140,
            left: 300
        },
        {
            src: "./assetst/images/barber.svg",
            alt: 'barber',
            top: 127,
            left: 298
        },
        {
            src: "./assetst/images/shop.svg",
            alt: 'shop',
            top: 153,
            left: 220
        },
        {
            src: "./assetst/images/fuel.svg",
            alt: 'fuel station',
            top: 260,
            left: 190
        }
    ]
    
    const mainUpper = document.querySelector('#main_upper')
    const mainMiddle = document.querySelector('#main_middle')
    const mainBottom = document.querySelector('#main_bottom')
    const towns = document.querySelector('.towns')
    const destination = document.querySelector('#destination')
    const statistics = document.querySelector('.statistics');
    const wholeDistance = document.querySelector('#wholeDistance');
    const buyOil = document.querySelector('#buyOil');


    mainUpper.innerHTML = `
        <div class="addedCar" style = "background-image: url(${car.url})"></div>
        <div class = "">
            <p>
                Car's model: ${car.model()}
            </p>

            <p>
                Car's release Date: ${car.releaseDate()}
            </p>
            
            <p>
                Car's fuel charge: ${car.fuelCharge()}
            </p>
        </div>
    `

    function showFuelLevel(){
        if(car.fuel > 100){
            car.fuel = 100;
        }
        return `
        <div style = "width: ${car.fuel}%" id = "fuelLevelPrimary"></div>
        `
    }

    function showFuelStatistics(){
        mainUpper.innerHTML += `

        <div id="fuelLevel">
            <p>Fuel level</p>

            <div id = "fuelLevelSecondary">
                ${showFuelLevel()}
            </div>
        </div>
    `
    wholeDistance.innerHTML = `The whole distance from begining is: ${wholeWay}`;

    }


    function addDestinations(){
        var message = '';
        for(let i in array){
            message += `<img class="img" title="${array[i].alt}" src=${array[i].src}>`
        }
        document.querySelector('article').innerHTML = message;
    }

    addDestinations(); // iconlari gosterir



    function reachDestination(cavab){
        wholeWay += cavab; 

        var futureFuelLevel = car.fuel - ((cavab * car.carFuelCharge) / 100 );

        if(futureFuelLevel > 0){
            car.fuel = car.fuel - ((cavab * car.carFuelCharge)/100);
        }else{
            alert('No fuel dude, go to oil station')
        }


        statistics.innerHTML = `Your road is : ${cavab}km`
                    
        mainUpper.innerHTML = `
            <div class="addedCar" style = "background-image: url(${car.url})"></div>
            <div class = "">
                <p>
                    Car's model: ${car.carModel}
                </p>

                <p>
                    Car's release Date: ${car.carReleaseDate}
                </p>
                
                <p>
                    Car's fuel charge: ${car.carFuelCharge}
                </p>
            </div>
        `


        showFuelStatistics();
    }


    document.querySelectorAll('.img').forEach(function(image){
        image.onclick = function(){
            for(let i in array){
                if(array[i].alt == image.title){ //sadece olaraq hara gedeceyini tutmaga calisiram


                    beep.play();

                    if(image.title == "fuel station"){
                            if((car.top + car.left) > (array[i].top + array[i].left)){ // burda her zaman benzin cixsin deye yoxluyuram cunki koordinatlar ferqli ola biler
                                var cavab = ((car.top + car.left)-(array[i].top + array[i].left));
                            }else{
                                var cavab = ((array[i].top + array[i].left) - (car.top + car.left));
                            }


                            if((car.fuel - ((cavab * car.carFuelCharge) / 100)) >= 0){
                                car.fuel += 30;   //benzin stansiasina gelende hemise 30 litr elave elesin
                                car.top = array[i].top;
                                car.left = array[i].left;
                                reachDestination(cavab);
                            }else{
                                reachDestination(cavab);
                            }   
                    }else{
                            
                        if((car.top + car.left) > (array[i].top + array[i].left)){ // burda her zaman benzin cixsin deye yoxluyuram cunki koordinatlar ferqli ola biler
                            var cavab = ((car.top + car.left)-(array[i].top + array[i].left));
                        }else{
                            var cavab = ((array[i].top + array[i].left) - (car.top + car.left));
                        }

                        if(car.fuel > 0){
                            car.top = array[i].top;
                            car.left = array[i].left;
                        
                            reachDestination(cavab);
                        }
                        
                    }
                }
            }
        }
    })

    setInterval(function(){
        if(destination.value){
            destination.onkeyup =  function(e){
                if(e.key == "Enter"){
                    for(let i in array){
                        if(array[i].alt == destination.value){
                            alert('Mevcut')

                            if((car.top + car.left) > (array[i].top + array[i].left)){ // burda her zaman benzin cixsin deye yoxluyuram cunki koordinatlar ferqli ola biler
                                var cavab = ((car.top + car.left)-(array[i].top + array[i].left));
                            }else{
                                var cavab = ((array[i].top + array[i].left) - (car.top + car.left));
                            }


                            statistics.innerHTML = `Your road is : ${cavab}`
                            return false;
                        }else{
                            destination.readOnly = true;
                            statistics.innerHTML = `
                            <input type="number" id="howManyKm" placeholder="How many kilometres to there?">
                            `
                            const howManyKm = document.querySelector('#howManyKm');

                            
                            
                            howManyKm.addEventListener('keyup', function(e){
                                if(e.key == "Enter" && howManyKm.value){
                                    car.top += howManyKm.value / 2
                                    car.left += howManyKm.value / 2
                                    reachDestination(Number(howManyKm.value));
                                    destination.value = "";
                                    destination.readOnly = false;
                                    beep.play()
                                }

                                
                            })
                        }
                    }
                }
            }
        }
    },1000) // for getting info from propt



    buyOil.addEventListener('click', function(){
        document.querySelector('#confirmBuy').style.display = "flex";
    })

    document.querySelector('#confirmYes').addEventListener('click', function(){
        car.fuel += 50;
        document.querySelector('#confirmBuy').style.display = "none";
        mainUpper.innerHTML = `
            <div class="addedCar" style = "background-image: url(${car.url})"></div>
            <div class = "">
                <p>
                    Car's model: ${car.carModel}
                </p>

                <p>
                    Car's release Date: ${car.carReleaseDate}
                </p>
                
                <p>
                    Car's fuel charge: ${car.carFuelCharge}
                </p>
            </div>
        `
        showFuelStatistics();
    })
    document.querySelector('#confirmNo').addEventListener('click', function(){
        document.querySelector('#confirmBuy').style.display = "none";
    })


    showFuelStatistics();


    document.querySelector("#donate").addEventListener('click', function(){
        document.querySelector('#creditCard').style.display = "flex";
        document.querySelector('#creditCard').addEventListener('click', function(){
            this.style.display = "none"
        })
    })

}