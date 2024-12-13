// force open fan
input.onButtonPressed(Button.A, function () {
    pins.digitalWritePin(DigitalPin.P0, 1)
})
// Force silence warning sound
input.onButtonPressed(Button.AB, function () {
    music.stopAllSounds()
})
// force close fan
input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P0, 0)
})
function fan_ctrl () {
    if (input.temperature() >= 25) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}
function Water_immersion_detection () {
    if (pins.analogReadPin(AnalogReadWritePin.P1) >= 30) {
        pins.servoWritePin(AnalogPin.P4, 180)
        basic.pause(500)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(200)
        radio.setGroup(100)
        while (pins.analogReadPin(AnalogReadWritePin.P1) >= 30) {
            radio.sendValue("light", 1)
            basic.pause(1000)
            radio.sendValue("light", 0)
        }
    } else {
        pins.servoWritePin(AnalogPin.P4, 90)
        music.stopAllSounds()
    }
}
basic.forever(function () {
    Water_immersion_detection()
    fan_ctrl()
    basic.showNumber(pins.analogReadPin(AnalogReadWritePin.P1))
})
