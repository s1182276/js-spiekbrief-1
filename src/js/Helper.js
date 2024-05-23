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