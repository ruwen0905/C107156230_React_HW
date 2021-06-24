import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';

import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useState,useContext } from 'react';
import { AppContext } from "../Context";
const Insertdetail = () => {
  const navigate = useNavigate();
  const { product , insertdetail , detailid , /*inserProduct , todetail , orderdetail*/ } =
  useContext(AppContext);
  const [selectid, setSelectid] = useState([]);
  const [inselectid, insetSelectid] = useState('');
  
  const doinert=(value)=>{

  console.log( selectid.proid)

    const pro=
      {orderid : detailid,
        proid : selectid.proid,
        qty : value.qty,
        discount : value.discount}
       
        insertdetail(pro)
    
    
  }
  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
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

              qty: 100,
              discount: 0.8,
              
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                 //password: Yup.string().required('password is required'),
               // firstName: Yup.string().required('First name is required'),
               // email: Yup.number().required('Email is required'),
                
               // lastName: Yup.number().required('Last name is required'),
               
                policy: Yup.boolean().oneOf([true], 'This field must be checked'),
                //proid: Yup.string().required('proid name is required'),
                qty: Yup.number().required('qty name is required'),
                discount: Yup.number().required('discount name is required'),
              })
            }
            onSubmit={(value) => {
              doinert(value)
              navigate('/app/order', { replace: true });
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
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <Autocomplete
          value={selectid}
          inputValue={inselectid}
          onChange={(event, selectid) => {
            setSelectid(selectid);
          }}
          onInputChange={(event, inselectid) => {
            insetSelectid(inselectid);
          }}
          fullWidth
  id="combo-box-demo"
  options={product}
  getOptionLabel={(option) => option.proid}
  //style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
/>
                
<TextField
                  error={Boolean(touched.qty && errors.qty)}
                  fullWidth
                  helperText={touched.qty && errors.qty}
                  label="產品數量"
                  margin="normal"
                  name="qty"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.qty}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.discount && errors.discount)}
                  fullWidth
                  helperText={touched.discount && errors.discount}
                  label="產品折扣"
                  margin="normal"
                  name="discount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discount}
                  variant="outlined"
                />
                
                
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Insertdetail;
