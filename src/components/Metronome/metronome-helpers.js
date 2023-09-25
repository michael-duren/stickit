import * as Tone from 'tone';

export const createMetronomeKit = () => {
  return {
    C3: new Tone.Sampler({
      urls: {
        C3: '/audio/cowbell.mp3',
        D3: '/audio/cowbell-emphasis.mp3',
      },
    }).toDestination(),
    C4: new Tone.Sampler({
      urls: {
        C3: '/audio/blip.mp3',
        D3: '/audio/blip-emphasis.mp3',
      },
    }).toDestination(),
    C5: new Tone.Sampler({
      urls: {
        C3: '/audio/click.mp3',
        D3: '/audio/click-emphasis.mp3',
      },
    }).toDestination(),
    C6: new Tone.Sampler({
      urls: {
        C3: '/audio/hi-hat.mp3',
        D3: '/audio/hi-hat-emphasis.mp3',
      },
    }).toDestination(),
    C7: new Tone.Sampler({
      urls: {
        C3: '/audio/woodblock.mp3',
        D3: '/audio/woodblock-emphasis.mp3',
      },
    }).toDestination(),
  };
};

export const createNewSequencer = (meter, soundRef, trackRef) => {
  const speed = meter.split('/')[1];
  const steps = new Array(parseInt(meter.split('/')[0]))
    .fill(0)
    .map((_, i) => i);

  return new Tone.Sequence(
    (time, step) => {
      const sampler = trackRef.current[soundRef.current];
      if (step === 0) {
        sampler.triggerAttackRelease('D3', '8n', time);
      } else {
        sampler.triggerAttackRelease('C3', '8n', time);
      }
    },
    steps,
    `${speed}n`
  ).start(0);
};
