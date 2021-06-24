import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
//import customers from 'src/__mocks__/customers';
import { useContext , /*useState*/ } from "react";
import { AppContext } from "../Context";
const CustomerList = () => {
  const {product} =
    useContext(AppContext);
  return(
  <div>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={product} />
        </Box>
      </Container>
    </Box>
  </div>
  )};

export default CustomerList;
