import * as Tone from 'tone';

const cowbell = new Tone.Player('/audio/cowbell.mp3').toDestination();
const blip = new Tone.Player('/audio/blip.mp3').toDestination();
const click = new Tone.Player('/audio/click.mp3').toDestination();
const hiHat = new Tone.Player('/audio/hi-hat.mp3').toDestination();
const woodBlock = new Tone.Player('/audio/woodblock.mp3').toDestination();

const players = {
  cowbell,
  blip,
  click,
  hiHat,
  woodBlock,
};

export default players;
