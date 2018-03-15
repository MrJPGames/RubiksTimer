(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    window.scrambleLength = 25;

    function onDeviceReady() {

        document.getElementById("backButton").onclick = function () {
            window.location.href="index.html";
        }

        document.getElementById("resetButton").onclick = function () {
            generateShuffle(scrambleLength);
        }

        var inp = document.getElementById('lengthInput');
        inp.addEventListener("input", function () {
            window.scrambleLength = this.value;
            document.getElementById('rangeDisplay').innerText = this.value;
        });


        document.getElementById('rangeDisplay').innerText = window.scrambleLength;

        //Disable the sensor (for iOS) as it is not needed in this part of the app
        navigator.proximity.disableSensor();

        generateShuffle(scrambleLength);
    };

    var randint = function (a, b) {
        var lower = Math.min(a, b);
        var upper = Math.max(a, b);
        var diff = upper - lower;
        return Math.floor((Math.random() * (diff + 1)) + lower);
    }

    function generateShuffle(moveCount){
        // 12 possible movements
        var move_types = ['F', 'Fp', 'B', 'Bp', 'L', 'Lp',
                         'R', 'Rp', 'U', 'Up', 'D', 'Dp'];
   
       // To prevent unnecessary moves, e.g. sequential F and Fp,
       // each move has only some possible successors. The easy way
       // is to use only movements that will permute the previous.
       var successors = {
          'F':  ['L', 'Lp', 'R', 'Rp', 'U', 'Up', 'D', 'Dp'],
          'Fp': ['L', 'Lp', 'R', 'Rp', 'U', 'Up', 'D', 'Dp'],
          'B':  ['L', 'Lp', 'R', 'Rp', 'U', 'Up', 'D', 'Dp'],
          'Bp': ['L', 'Lp', 'R', 'Rp', 'U', 'Up', 'D', 'Dp'],
          'L':  ['F', 'Fp', 'B', 'Bp', 'U', 'Up', 'D', 'Dp'],
          'Lp': ['F', 'Fp', 'B', 'Bp', 'U', 'Up', 'D', 'Dp'],
          'R':  ['F', 'Fp', 'B', 'Bp', 'U', 'Up', 'D', 'Dp'],
          'Rp': ['F', 'Fp', 'B', 'Bp', 'U', 'Up', 'D', 'Dp'],
          'U':  ['F', 'Fp', 'B', 'Bp', 'L', 'Lp', 'R', 'Rp'],
          'Up': ['F', 'Fp', 'B', 'Bp', 'L', 'Lp', 'R', 'Rp'],
          'D':  ['F', 'Fp', 'B', 'Bp', 'L', 'Lp', 'R', 'Rp'],
          'Dp': ['F', 'Fp', 'B', 'Bp', 'L', 'Lp', 'R', 'Rp']
       }

        var shuffleDisplay = document.getElementById("shuffleDisplay");
        shuffleDisplay.innerHTML = "";
        
        var move = document.createElement("li");
        var moveType = move_types[randint(0,11)];
        var prevMove = moveType;
        move.id = "move" + moveType;
        shuffleDisplay.appendChild(move);

        for (var i=1; i < moveCount; i++){
            move = document.createElement("li");
            moveType = successors[prevMove][randint(0,7)];
            prevMove = moveType;
            move.id = "move" + moveType;
            shuffleDisplay.appendChild(move);
        }
    }
} )();