import { Box, Link, Typography } from '@mui/material';


export default function ErrorNotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt:30,
        backgroundColor: 'transparent',
      }}
    >
      <Typography variant="h1" style={{ color: 'black' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'black' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link href='/'>Back Home</Link>
    </Box>
  );
}
