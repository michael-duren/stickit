export const getType = (typeId) => {
  switch (typeId) {
    case 1:
      return 'Speed & Agility';
    case 2:
      return 'Creativity & Improvisation';
    case 3:
      return 'Style & Vocabulary';
    case 4:
      return 'Precision & Timekeeping';
  }
};
