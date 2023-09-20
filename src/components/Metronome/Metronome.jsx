import { useState } from 'react';
import { ReactComponent as PlayIcon } from '../../images/play.svg';
import './Metronome.css';
import MetronomeOptions from './MetronomeOptions';
import CustomSelect from '../CustomSelect/CustomSelect';
import { MenuItem } from '@mui/material';

export default function Metronome({ tempo }) {
  const [tempoState, setTempoState] = useState(tempo);
  const [sound, setSound] = useState(MetronomeOptions.sounds[0]);
  const [meter, setMeter] = useState(MetronomeOptions.meter[2]);
  const [setting, setSetting] = useState(MetronomeOptions.setting[0]);

  return (
    <div style={{ fontFamily: 'sans-serif' }} className="flex gap-16 metronome">
      {/* Left Side */}
      <div className="flex flex-1 gap-16 flex-col">
        <div className="flex flex-col gap-8">
          <div>Tempo</div>
          {/* Tempo Input */}
          <div className="tempo-select">
            <span style={{ background: '#F8F8F8', fontSize: '1rem' }}>♩</span>
            <input
              value={tempoState}
              onChange={(e) => setTempoState(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="play-button">
          <button>
            <PlayIcon className="play-icon" />
          </button>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex gap-8 flex-1 flex-col">
        <div className="flex flex-col gap-8">
          <label>Sound</label>
          <CustomSelect
            value={sound}
            onChange={(e) => setSound(e.target.value)}
          >
            {MetronomeOptions.sounds.map((sound) => {
              return <MenuItem value={sound}>{sound}</MenuItem>;
            })}
          </CustomSelect>
        </div>
        <div className="flex flex-col gap-8">
          <label>Meter</label>
          <CustomSelect
            value={meter}
            onChange={(e) => setMeter(e.target.value)}
          >
            {MetronomeOptions.meter.map((meter) => (
              <MenuItem value={meter}>{meter}</MenuItem>
            ))}
          </CustomSelect>
        </div>
        <div className="flex flex-col gap-8">
          <label>Setting</label>
          <CustomSelect
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            name=""
            id=""
          >
            {MetronomeOptions.setting.map((setting) => {
              return <MenuItem value={setting}>{setting}</MenuItem>;
            })}
          </CustomSelect>
        </div>
      </div>
    </div>
  );
}
