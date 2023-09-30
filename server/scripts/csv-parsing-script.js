const fs = require('fs');
const csv = require('csv-parser');

const typeMapping = {
  'Speed & Agility': 1,
  'Creativity & Improvisation': 2,
  'Style & Vocabulary': 3,
  'Precision & Timekeeping': 4,
};

const focusMapping = {
  'Hand Speed': 1,
  'Foot Speed': 2,
  Rudiments: 3,
  Improvisation: 4,
  Constraints: 5,
  'Sound Exploration': 6,
  Transcriptions: 7,
  Fills: 8,
  Grooves: 9,
  'Metronome Games': 10,
  'Play Along Tracks': 11,
  Subdivisions: 11,
  'Vocaliziig Rhythmms': 12,
  'Odd Time Signatures': 12,
};

function escapeString(str) {
  let escaped = '';
  for (let char of str) {
    if (char === `'` || char === `‘` || char === `’`) {
      escaped += "''";
    } else {
      escaped += char;
    }
  }
  return `'${escaped}'`;
}

function escapeArrayItem(str) {
  return `"${str.replace(/"/g, '""').replace(/[‘’']/g, "''")}"`;
}

function preprocessRow(row) {
  row.Name = escapeString(row.Name);
  row.Genre = escapeString(row.Genre);
  row.Instrument = escapeString(row.Instrument);
  row.Teacher = escapeString(row.Teacher);
  row.Description = escapeString(row.Description);
  row['Video Link'] = escapeString(row['Video Link']);

  if (row.Directions) {
    row.Directions = row.Directions.split('\n').map(escapeArrayItem);
  } else {
    row.Directions = [];
  }

  if (row.Remember) {
    row.Remember = row.Remember.split('\n').map(escapeArrayItem);
  } else {
    row.Remember = [];
  }

  return row;
}

function processRow(row) {
  let bpmRange;
  if (row['BPM Range'] === 'N/A') {
    bpmRange = [60, 200];
  } else {
    bpmRange = row['BPM Range'].split('-').map((num) => parseInt(num.trim()));
  }

  const values = [
    row.Name,
    typeMapping[row.Type],
    focusMapping[row.Focus],
    row['Warmup?'] === 'Y' ? 'TRUE' : 'FALSE',
    row['Cooldown?'] === 'Y' ? 'TRUE' : 'FALSE',
    row.Genre,
    row.Instrument,
    row.Teacher,
    row.Description,
    `'{${row.Directions.join(', ')}}'`,
    `'{${row.Remember.join(', ')}}'`,
    parseInt(row['Minimum Time']),
    ...bpmRange,
    row['Video Link'],
  ];

  return `INSERT INTO EXERCISES (NAME, TYPE_ID, FOCUS_ID, WARMUP, COOLDOWN, GENRE, INSTRUMENT, TEACHER, DESCRIPTION, DIRECTIONS, REMEMBER, MINIMUM_TIME_MINUTES, BPM_MIN, BPM_MAX, VIDEO_LINK) VALUES (${values.join(
    ', '
  )});\n`;
}

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const processedRow = preprocessRow(row);
    fs.appendFileSync('output.sql', processRow(processedRow));
  })
  .on('end', () => {
    console.log('SQL conversion done!');
  });
