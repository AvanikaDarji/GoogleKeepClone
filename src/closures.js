/*function outer(){
    const outerVar = "hey I am outer variable";
    function inner(){
        const inner ="Hey I am inner ";

        console.log(inner);
        console.log(outerVar);
        
    }

    inner();
}
outer();*/

function createGreetings(greetingMsg = "") {
    let greetingMessage = greetingMsg.toUpperCase();
    return function name(name) {
        return `${greetingMessage} ${name}`
    }
}

let sayHI = createGreetings("Hi")
console.log(sayHI("whatspp"));
console.log(sayHI("how are you"));

function createGame(name) {
    let score = 0;
    return function createScore() {
        score++;
        return `score for  ${name} is ${score}`;
    }
}
let gameHockey = createGame("hockey");
let gameSoccer = createGame("soccer");
console.log(gameHockey());
console.log(gameHockey());
console.log(gameSoccer());