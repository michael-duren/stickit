import { Transport } from 'tone';
import * as Tone from 'tone';
import { useEffect, useState, Fragment } from 'react';
import { ReactComponent as PlayIcon } from '../../images/play.svg';
import { ReactComponent as PauseIcon } from '../../images/pause.svg';
import './Metronome.css';
import MetronomeOptions from './MetronomeOptions';
import CustomSelect from '../CustomSelect/CustomSelect';
import { Grid, MenuItem } from '@mui/material';
import players from './players';

export default function Metronome({ tempoState, setTempoState }) {
  const [sound, setSound] = useState(MetronomeOptions.sounds[0].value);
  const [meter, setMeter] = useState(MetronomeOptions.meter[2]);
  const [setting, setSetting] = useState(MetronomeOptions.setting[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatId, setRepeatId] = useState(null);

  useEffect(() => {
    Transport.bpm.value = tempoState;

    return () => {
      Transport.stop();
    };
  }, []);

  useEffect(() => {
    Transport.bpm.value = tempoState;
  }, [tempoState]);

  const handlePlayToggle = async () => {
    if (isPlaying) {
      Transport.clear(repeatId);
      Transport.stop();
    } else {
      let repeatIdHeld;
      await Tone.start();
      if (!repeatId) {
        repeatIdHeld = Transport.scheduleRepeat((time) => {
          players[sound].start(time);
        }, '4n');
      }
      Transport.start();
      setRepeatId(repeatIdHeld);
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
                onChange={(e) => setSound(e.target.value)}
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
