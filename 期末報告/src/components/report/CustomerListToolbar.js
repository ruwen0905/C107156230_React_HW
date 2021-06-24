import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { AppContext } from "../../Context";
import { useContext } from 'react';
const CustomerListToolbar = (props) => {
  
  const {reportsearch,setReportsearch,reportsearch2,setReportsearch2}=useContext(AppContext);
  const handlesearch=(e)=>{
    setReportsearch(e.target.value);
  }
  const handlesearch2=(e)=>{
    setReportsearch2(e.target.value);
  }
  return(
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
          <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    時間區間
                  </Typography>
            
            <TextField
    id="date"
    label="開始"
    type="date"
    defaultValue="2017-05-24"
    className='{classes.textField}'
    onChange={handlesearch}
    InputLabelProps={{
      shrink: true,
    }}
  />
  <TextField
    id="date"
    label="結束"
    type="date"
    defaultValue="2017-05-24"
    className='{classes.textField}'
    onChange={handlesearch2}
    InputLabelProps={{
      shrink: true,
    }}
  />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);}

export default CustomerListToolbar;
