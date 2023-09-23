import SideNav from '../components/SideNav/SideNav';
import Grid from '@mui/material/Grid';
import './MainLayout.css';

export default function MainLayout({ children, showExitButton, showNav }) {
  return (
    <div className="background-primary-grey h-full flex-1">
      <Grid className="h-full main-page-padding">
        <Grid className="h-full" container>
          {showNav && (
            <Grid item md={2} lg={2} sx={{ display: {xs : 'none', sm: 'none', md:'flex'}}}>
              <SideNav />
            </Grid>
          )}
          <Grid item justifyContent={'center'} xs={12} sm={12} md={10} lg={10}>
            <div className="main-page-content-container flex flex-col h-full text-center">
            {showExitButton && <div className="exit-btn-width p-2 text-left empty-button primary-blue text-bold"><p>Exit</p></div>}
              {children}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
