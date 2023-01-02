import {
  Button,
  Link,
  Paper,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const tableContainerSx: SxProps = {
  border: '2px solid rgba(55,65,81)',
  // width: "max-content",
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 4,
  borderRadius: 2,
  maxHeight: 500,
};

const tableCellSx: SxProps = {
  ellipsis: {
    maxWidth: 50, // percentage also works
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default function TutorialTable({ headers, items }) {
  return (
    <>
      <TableContainer component={Paper} sx={tableContainerSx}>
        <Table stickyHeader={true}>
          <TableHead
            sx={{
              '& .MuiTableCell-stickyHeader': { backgroundColor: '#323743' },
              color: 'white',
            }}
          >
            <TableRow>
              <TableCell scope="header">{headers.sender}</TableCell>
              <TableCell scope="header">{headers.hash}</TableCell>
              <TableCell scope="header">{headers.url}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& tr:nth-of-type(2n+1)': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            {items.map((file) => (
              <TableRow key={file.ipfs_hash}>
                <TableCell
                  scope="row"
                  sx={{
                    fontSize: {
                      lg: 12,
                      md: 11,
                      sm: 10,
                      xs: 10,
                    },
                    wordWrap: 'break-word',
                    width: '11rem',
                  }}
                >
                  {file.sender_address}
                </TableCell>
                <TableCell scope="row">{file.ipfs_hash}</TableCell>
                <TableCell scope="row">
                  <Button
                    sx={{ width: 200 }}
                    variant="outlined"
                    color="secondary"
                    href={`https://ipfs.io/ipfs/${file.ipfs_hash}`}
                    target="_blank"
                  >
                    OPEN
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
