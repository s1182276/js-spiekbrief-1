/* TODO door student, opgave 3a, 3b */
class Dice {
    name;
    values;

    constructor(name, values) {
        this.name = name;
        if(values.length >= 6){
            this.values = values;
        } else {
            return Error("Te weinig waarden")
        }
    }

    getRandomValue(){
        return this.values[Math.floor(Math.random()*this.values.length)];
    }
}
/* TODO door student, opgave 4a,b,d */

var SPA = (function () {
    var container;
    var startingLetterDice;
    var endingLetterDice;
    var wordLengthDice;

    function showNewChallenge(startLetter, endLetter, wordLength){
            document.getElementById("green-dice").innerText = startLetter;
            document.getElementById("red-dice").innerText = endLetter;
            document.getElementById("yellow-dice").innerText = wordLength;
    }

    async function init(containerSelector) {
        var json = await loadLetters('./letters.json');

        var starting = json.data.alphabet.filter(letter => {
            return letter.stats.some(stat => stat.wordfrequency > 0.05)
        })

        startLetters = []

        for(var i = 0; i < starting.length; i++){
            startLetters.push(starting[i].letter);
        }

        var ending = json.data.alphabet.filter(letter => {
            return letter.stats.some(stat => stat.endfrequency > 0.06)
        })

        endLetters = []

        for(var i = 0; i < ending.length; i++){
            endLetters.push(ending[i].letter);
        }


        container = document.querySelector(containerSelector);
        startingLetterDice = new Dice('Startletter', startLetters)
        endingLetterDice = new Dice('Endletter', endLetters)
        wordLengthDice = new Dice('Woordlengte', [4, 5, 6, 7, 8, 9])

        Promise.resolve().then(() => Helper.delaySeconds(1)).then(() => {
            showNewChallenge(
                startingLetterDice.getRandomValue(),
                endingLetterDice.getRandomValue(),
                wordLengthDice.getRandomValue()
            )
        }).then(() => Helper.delaySeconds(60)).then(() => {
            location.reload(true);
        })


    }

    async function loadLetters(jsonUrl) {
        return fetch(jsonUrl).then(response => {
            return response.json();
        });
    }

    return{
        showNewChallenge : showNewChallenge,
        init: init
    };
})();
class Helper {
    /**
     * Statische helper functie het aantal seconden om te zetten in een HH:mm notatie
     * 
     * Voorbeeldgebruik
        Helper.secondsToTimestring(60)
     * 
     * @param {*} seconds 
     * @returns 
     */
    static secondsToTimestring = (seconds) => {
        //als de waarde negatief is, maar er 0 seconden van
        seconds = seconds < 0 ? 0 : seconds

        if (seconds < 3600) {
            return new Date(seconds * 1000).toISOString().substring(11, 16)
        } else {
            //als de waarde groter dan 3600s dan wordt standaard string teruggegeven
            return '> 60:00'
        }
    }

    /**
     * Statische helper functie om in JavaScript een gechainde versie te krijgen van de setTimeout
     * 
     * Voorbeeldgebruik
        Promise.resolve().then(() => Helper.delaySeconds(1)).then(() => {
            //voeg hier de code toe    
        }).then(() => Helper.delaySeconds(1)).then(() => {
            //voeg hier de code toe
        })
     *   
     * @param {*} seconds 
     * @returns Promise
     */
    static delaySeconds = (seconds) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), seconds * 1000)
        })
    }

    /**
     * Statische helper functie om in JavaScript een asynchrone versie te krijgen van de setTimeout
     * 
     *   
     * @param {*} seconds 
     * @returns async function
     */
    static delaySecondsAwait = async (seconds) => {
        return Helper.delaySeconds(seconds)
    }
}