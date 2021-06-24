import { useState,useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { AppContext } from "../../Context";
const CustomerListResults = ({ customers, ...rest }) => {
  const {reportsearch,reportsearch2,salesorder,orderdetail,product} =
  useContext(AppContext);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
console.log(reportsearch)
//orderdate:a.toISOString().substring(0, 10),
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    if (event.target.value=="all"){
      setLimit(customers.length);
    }
    else{setLimit(event.target.value);}
    
  };


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  客戶名稱
                </TableCell>
                <TableCell>
                  客戶ID
                </TableCell>
                <TableCell>
                銷售金額
                </TableCell>
                <TableCell>
                總利潤
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => {
                
              let sumsales=0
              let cost=0
             salesorder.map((order)=>{
                if(reportsearch===""){
                  if(order.custid===customer.custid ){
                    orderdetail.map((detail)=>{
                      if(detail.orderid===order.orderid){
                        product.map((pro)=>{if(pro.proid===detail.proid){
                          sumsales+=parseInt(detail.qty)*parseInt(detail.discount)*parseInt(pro.price)
                          cost+=parseInt(detail.qty)*parseInt(detail.discount)*(parseInt(pro.price)-parseInt(pro.cost))
                        }
                      })
                        }
                    })
                  }
                }
                else{
                  if(order.custid===customer.custid && Date.parse(order.orderdate)>=Date.parse(reportsearch) && Date.parse(order.orderdate)<=Date.parse(reportsearch2)){
                    orderdetail.map((detail)=>{
                      if(detail.orderid===order.orderid){
                        product.map((pro)=>{if(pro.proid===detail.proid){
                          sumsales+=parseInt(detail.qty)*parseInt(detail.discount)*parseInt(pro.price)
                          cost+=parseInt(detail.qty)*parseInt(detail.discount)*(parseInt(pro.price)-parseInt(pro.cost))
                        }
                      })
                        }
                    })
                  }
                }
                })
                
                
                return(
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {customer.custname}
                  </TableCell>
                  <TableCell>
                    {customer.custid}
                  </TableCell>
                  <TableCell>
                    {sumsales}
                  </TableCell>
                  <TableCell>
                    {cost}
                  </TableCell>
                </TableRow>
              )}
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25,'all']}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
