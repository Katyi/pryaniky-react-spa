import { useNavigate } from 'react-router-dom';
import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
});

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6">Сотрудники</Typography>
        <Button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          sx={{
            display: 'flex',
            gap: 1,
            color: '#fff',
            fontSize: '14px',
            fontWeight: '700',
            p: 0,
          }}
        >
          <ExitToAppIcon />
        </Button>

        {/* <Link
          to="/login"
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: '500',
            textDecoration: 'none',
          }}
        > */}
        {/* Login */}
        {/* </Link> */}
      </StyledToolbar>
    </AppBar>
  );
};
