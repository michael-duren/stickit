import { Select } from '@mui/material';

export default function CustomSelect({ children, ...props }) {
  return (
    <Select
      {...props}
      sx={{
        display: 'flex',
        // padding: 'var(--spacing-base-02, 0.5rem) var(--spacing-base-04, 1rem)',
        height: 'var(--spacing-base-08, 3rem)',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRadius: 'var(--spacing-base-02, 0.5rem)',
        border: '1px solid var(--brand-border, #005E83)',
        background: 'var(--neutral-000, #FFF)',
      }}
    >
      {children}
    </Select>
  );
}
