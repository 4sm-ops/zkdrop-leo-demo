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
  // border: '2px solid rgba(55,65,81)',
  // width: 1,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 4,
  marginBottom: 3,
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
              '& .MuiTableCell-stickyHeader': {
                backgroundColor: '#323743',
                color: '#fff',
              },
            }}
          >
            <TableRow>
              <TableCell
                scope="header"
                style={{
                  maxWidth: '40%',
                }}
              >
                {headers.sender}
              </TableCell>
              <TableCell
                scope="header"
                style={{
                  maxWidth: '40%',
                }}
              >
                {headers.hash}
              </TableCell>
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
                  style={{
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    maxWidth: '30%',
                  }}
                >
                  {/* <Typography style={{
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: '90%',
    display: "block",
    overflow: "hidden"
  }}>
                          
    </Typography> */}
                  {file.sender_address}
                </TableCell>
                <TableCell
                  style={{
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                  }}
                >
                  {file.ipfs_hash}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ width: 200 }}
                    variant="outlined"
                    color="primary"
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
