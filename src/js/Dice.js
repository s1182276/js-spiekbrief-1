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