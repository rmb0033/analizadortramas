

function pruebasRX() {

    var source = Rx.Observable.range(0, 3)
        .doOnCompleted(
            function () { console.log('Do Completed'); }
        );

    var subscription = source.subscribe(
        function (x) {
            console.log('Next: %s', x);
        },
        function (err) {
            console.log('Error: %s', err);
        },
        function () {
            console.log('Completed');
        });

// => Next: 0
// => Next: 1
// => Next: 2
// => Do Completed
// => Completed

    /* Using a thisArg */

    var source = Rx.Observable.range(0, 3)
        .doOnCompleted(
            function () { this.log('Do Completed'); },
            console
        );

    var subscription = source.subscribe(
        function (x) {
            console.log('Next: %s', x);
        },
        function (err) {
            console.log('Error: %s', err);
        },
        function () {
            console.log('Completed');
        });

// => Next: 0
// => Next: 1
// => Next: 2
// => Do Completed
// => Completed
}


function pruebaFuncionalRX_1() {

    var obs = Rx.Observable.of('tarea 1', "tarea 2", "tarea 3", "tarea 4", "tarea 5", "tarea 6")
        .doOnCompleted(function() {
            console.log("hemos terminado");
        });

        obs
        .map(function(x) {
            return x + "!!!";
        })
        .map(function(x) {
            return x.toUpperCase();
        })
        .filter(function(x) {
            return !x.includes("paquitochocolatero");
        })
        .subscribe(function(x) {
            // console.log("subscribe " + x);
            var randomTime = Math.floor(Math.random() * 5000);
            sleep(randomTime);
            // setTimeout(function() {
            //     console.log(x + " y hemos tardado " + randomTime);
            // }, randomTime);
            console.log(x + " con numero random " + randomTime);
        });
    // TODO cuando todas las tareas asincronas terminen -> que ejecute un codigo que diga terminado

}

/**
 * Sleep real http://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing
 * @param milliseconds
 */
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}