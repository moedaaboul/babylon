import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function CheckOutTotal() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography align="left" variant="subtitle2" component="div">
                Subtotal
              </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography align="right" variant="subtitle1" component="div">
                64513.23
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography align="left" variant="caption" display="block" gutterBottom>
                You have saved
              </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography align="right" variant="caption" display="block" gutterBottom>
                99.99
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
