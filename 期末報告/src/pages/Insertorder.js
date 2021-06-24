import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
import { useContext , /*useState*/ } from 'react';
import { AppContext } from "../Context";
const Insertorder = () => {
  const navigate = useNavigate();
  const { useravatar , salesorder , insertorder , /*product,inserProduct*/ } =
  useContext(AppContext);

  console.log()
  const doinert=(value)=>{

  const inorderid=parseInt(salesorder[salesorder.length-1].orderid)+1
  const a=new Date()
    const pro=
      {empid : useravatar.id,
        orderid:inorderid,
      custid : value.custid,
      orderdate:a.toISOString().substring(0, 10),
      descript : value.descript,}
    
      //inserProduct(pro)
      insertorder(pro)
    
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

             
              custid:"",
              descript:"",
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                custid: Yup.string().required('custid is required'),
               // firstName: Yup.string().required('First name is required'),
               // email: Yup.number().required('Email is required'),
                
              //  lastName: Yup.number().required('Last name is required'),
               
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
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
                    新增訂單
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    新增訂單
                  </Typography>
                </Box>
                
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="顧客代號"
                  margin="normal"
                  name="custid"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.custid}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="備註"
                  margin="normal"
                  name="descript"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.descript}
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
                    新增訂單
                  </Button>
                </Box>
                
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Insertorder;
