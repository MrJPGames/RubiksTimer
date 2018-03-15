// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.getElementById("resetButton").onclick = function () {
            window.msec = 0;
            updateTimerDisplay();
            navigator.proximity.enableSensor();
        }

        document.getElementById("shuffleButton").onclick = function () {
            window.location.href = "shuffle.html";
        }

        //Enable the sensor (for iOS)
        navigator.proximity.enableSensor();

        window.previousState = false;
        window.state = false;
        window.timerRunning = false;
        window.msec = 0;

        sensorLoop();
    };

    function sensorLoop() {
        navigator.proximity.getProximityState(setState);
        if (window.timerRunning) {
            window.msec = Date.now() - window.startTime;
        }
        if (window.state == false && window.previousState == true && msec == 0) {
            startTimer();
        } else if (window.state == true && window.timerRunning) {
            stopTimer();
        }
        updateTimerDisplay();
    }

    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    function updateTimerDisplay() {
        var min = Math.floor(msec / (60 * 1000));
        var sec = Math.floor(msec / 1000 - min * 60);
        var dmsec = msec - sec * 1000 - min * 60 * 1000; //Display msec
        document.getElementById("timer").innerText = pad(min, 2) + ":" + pad(sec, 2) + "." + pad(dmsec, 3);
    }

    function startTimer() {
        window.plugins.insomnia.keepAwake();
        window.startTime = Date.now();
        window.timerRunning = true;
    }

    function stopTimer() {
        window.stopTime = Date.now();
        window.msec = window.stopTime - window.startTime;
        window.timerRunning = false;
        navigator.proximity.disableSensor();
        window.plugins.insomnia.allowSleepAgain();
    }

    function setState(state) {
        window.previousState = window.state;
        window.state = state;
        setTimeout(sensorLoop, 16);
    }

    function onPause() {
        navigator.proximity.disableSensor();
    };

    function onResume() {
        navigator.proximity.enableSensor();
    };
} )();