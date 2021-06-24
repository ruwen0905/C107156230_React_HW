import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppContext } from "../../Context";
import { useContext } from 'react';
const CustomerListToolbar = (props) =>{
  const {ordersearch,setOrdersearch}=useContext(AppContext);
  const navigate = useNavigate();
  const insertorder=()=>{
    navigate('/insertorder', { replace: true })
  }
  const handlesearch=(e)=>{
    setOrdersearch(e.target.value);
  }
  return(
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      
      <Button
        color="primary"
        variant="contained"
        onClick={insertorder}
      >
        新增訂單
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              onChange={handlesearch}
              placeholder="Search customerID"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
)};

export default CustomerListToolbar;
