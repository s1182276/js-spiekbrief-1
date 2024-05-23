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