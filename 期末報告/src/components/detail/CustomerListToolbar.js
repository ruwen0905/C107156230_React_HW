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
const CustomerListToolbar = (props) =>{
  const navigate = useNavigate();
  const toback=()=>{
    navigate('/app/order', { replace: true })
  }
  const insert=()=>{
    navigate('/insertdetail', { replace: true })
  }
  return(
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      
      <Button sx={{ mx: 1 }}
      onClick={insert}
      >
        新增
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={toback}
      >
       返回
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
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
)};

export default CustomerListToolbar;
