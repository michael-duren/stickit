import { useRef } from 'react';
import { Transport } from 'tone';
import * as Tone from 'tone';
import { useEffect, useState } from 'react';
import { ReactComponent as PlayIcon } from '../../images/play.svg';
import { ReactComponent as PauseIcon } from '../../images/pause.svg';
import './Metronome.css';
import MetronomeOptions from './MetronomeOptions';
import CustomSelect from '../CustomSelect/CustomSelect';
import { Grid, MenuItem } from '@mui/material';
import { createMetronomeKit, createNewSequencer } from './metronome-helpers';

export default function Metronome({ tempoState, setTempoState }) {
  const [sound, setSound] = useState(MetronomeOptions.sounds[0].value);
  const [meter, setMeter] = useState(MetronomeOptions.meter[2]);
  const [setting, setSetting] = useState(MetronomeOptions.setting[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const seqRef = useRef(null);
  const trackRef = useRef(null);
  const soundRef = useRef(null);
  soundRef.current = sound;

  const createStepsForTimeSignature = (timeSignature) => {
    const [beats, type] = timeSignature.split('/');
    switch (type) {
      case '4':
        return new Array(beats).fill(0).map((_, i) => i);
      case '8':
        return new Array(beats).fill(0).map((_, i) => i);
      default:
        return [0, 1, 2, 3];
    }
  };

  useEffect(() => {
    soundRef.current = sound;
  }, [sound]);

  useEffect(() => {
    if (seqRef.current) {
      seqRef.current.dispose();

      seqRef.current = createNewSequencer(meter, soundRef, trackRef);
    }
  }, [meter]);

  useEffect(() => {
    Transport.bpm.value = tempoState;

    trackRef.current = createMetronomeKit();

    if (seqRef.current) {
      seqRef.current.dispose();
    }

    seqRef.current = createNewSequencer(meter, soundRef, trackRef);

    return () => {
      Transport.stop();
      Object.values(trackRef.current).forEach((track) => track.dispose());
      seqRef.current.dispose();
      soundRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (setting === 'Swing') {
      Transport.swing = 0.5;
    } else {
      Transport.swing = 0;
    }
  }, [setting]);

  useEffect(() => {
    Transport.bpm.value = tempoState;
  }, [tempoState]);

  const handlePlayToggle = async () => {
    if (isPlaying) {
      Transport.stop();
    } else {
      await Tone.start();
      Tone.Transport.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Grid sx={{ fontFamily: 'sans-serif' }}>
      <Grid container>
        <Grid
          className="metronome metronome-sticky"
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          {/* Left Side */}
          <div className="xs-display-flex">
            <div className="m-b-l">
              <div className="xs-hide">Tempo</div>
              {/* Tempo Input */}
              <div className="tempo-select">
                <span style={{ background: '#F8F8F8', fontSize: '1rem' }}>
                  ♩
                </span>
                <input
                  value={tempoState}
                  onChange={(e) => setTempoState(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="play-button">
              <button onClick={handlePlayToggle}>
                {isPlaying ? (
                  <PauseIcon className="play-icon" />
                ) : (
                  <PlayIcon className="play-icon" />
                )}
              </button>
            </div>
          </div>
        </Grid>
        <Grid
          className="metronome"
          item
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: { xs: 'none', sm: 'block', md: 'block', lg: 'block' },
          }}
        >
          {/* Right Side */}
          <div className="">
            <div className="m-b-l">
              <label>Sound</label>
              <CustomSelect
                value={sound}
                onChange={(e) => {
                  setSound(e.target.value);
                }}
              >
                {MetronomeOptions.sounds.map((sound) => {
                  return (
                    <MenuItem key={sound.name} value={sound.value}>
                      {sound.name}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            </div>
            <div className="m-b-l">
              <label>Meter</label>
              <CustomSelect
                value={meter}
                onChange={(e) => setMeter(e.target.value)}
              >
                {MetronomeOptions.meter.map((meter) => (
                  <MenuItem key={meter} value={meter}>
                    {meter}
                  </MenuItem>
                ))}
              </CustomSelect>
            </div>
            <div className="">
              <label>Setting</label>
              <CustomSelect
                value={setting}
                disabled={meter.split('/')[1] === '4'}
                onChange={(e) => setSetting(e.target.value)}
                name=""
                id=""
              >
                {MetronomeOptions.setting.map((setting) => {
                  return (
                    <MenuItem key={setting} value={setting}>
                      {setting}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
