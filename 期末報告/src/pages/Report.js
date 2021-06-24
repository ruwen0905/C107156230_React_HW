import { Helmet } from 'react-helmet';
import { Box , Container } from '@material-ui/core';
import CustomerListResults from 'src/components/report/CustomerListResults';
import CustomerListToolbar from 'src/components/report/CustomerListToolbar';
//import customers from 'src/__mocks__/customers';
import { useContext , /*useState*/ } from "react";
import { AppContext } from "../Context";

const Report = () => {
  
  const { allcust , /*product*/} =
    useContext(AppContext);
  return(
  <>
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
          <CustomerListResults customers={allcust} />
        </Box>
      </Container>
    </Box>
  </>
);}

export default Report;
