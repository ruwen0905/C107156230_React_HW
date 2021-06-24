import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
//import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box , Button , Container , Grid , Link , TextField , Typography } from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';

import { useContext , /*useState , useEffect*/ } from "react";
import { AppContext } from "../Context";

const Login = () => {
  const { users , setUseravatar , /*useravatar*/ } =
    useContext(AppContext);
  const navigate = useNavigate();
    
const handlelogin=(value)=>{
  var account=true;
  for ( let i=0;i<users.length;i++ ){
  if (users[i].id === value.email){
    console.log("ok");
    account=false
    if(users[i].user_phone === value.password){
      console.log("yes");
      setUseravatar({id:users[i].id,name:users[i].user_name,job:users[i].user_email,dept:users[i].user_deptname})//111
      navigate('/app/dashboard', { replace: true });
    }
    else{
      window.alert("密碼錯誤");
      window.location.reload(false);
    }
  }
}
if (account){
  window.alert("帳號錯誤");
window.location.reload(false);
}

}
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            
            onSubmit={(value) => {
              console.log(123)
              handlelogin(value)
              
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="員工代號"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="電話"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
