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
  const {deleteProduct,editProduct,cancelProduct,updateProduct,productsearch,salesorder} =
    useContext(AppContext);
    const deleteConfirm = (proid) => {
      if (window.confirm("Are you sure?")) {
        deleteProduct(proid);
      }
    };
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [newData, setNewData] = useState({});

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

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

  const saveBtn=()=>{
    updateProduct(newData);
  }
/*const dosearch=(context)=>{
let a=0  
for(let i=0;i<=context.length-productsearch.length;i++){
a=0
  for (let j=0;j<=productsearch.length;i++){
    a=a+1
    if(context[j+i]!==productsearch[j]){
      break;
    } 
  }
}
if(a!==0 && a===productsearch.length){
  return 555
}
else{
  return 444
}
}*/
const enableEdit=(customer)=>{
setNewData(customer)
editProduct(customer.proid)
}
///customers.map((customer)=>{customer.isEditing=false})
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
                  產品名稱
                </TableCell>
                <TableCell>
                  產品代號
                </TableCell>
                <TableCell>
                  單價
                </TableCell>
                <TableCell>
                  成本
                </TableCell>
                <TableCell>
                  動作
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => {
                if (productsearch!==""){
                  console.log(customer.proname)
                  if(customer.proname.search(productsearch)===-1){
                    return 
                  }
                }
                 return  customer.isEditing? (
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
                  
                      
                      <input
                  type="text"
                  defaultValue={customer.proname}
                  onChange={(e) => updateNewData(e, "proname")}
                />
                </TableCell>
                <TableCell>
                  {customer.proid}
                </TableCell>
                <TableCell>
                <input
                  type="text"
                  defaultValue={customer.price}
                  onChange={(e) => updateNewData(e, "price")}
                />
                </TableCell>
                <TableCell>
                <input
                  type="text"
                  defaultValue={customer.cost}
                  onChange={(e) => updateNewData(e, "cost")}
                />
                </TableCell>
                <TableCell>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  儲存
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelProduct(customer.proid)}
                >
                  取消
                </button>
                </TableCell>
              </TableRow>
              ):(
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
                    
                        {customer.proname}
                      
                  </TableCell>
                  <TableCell>
                    {customer.proid}
                  </TableCell>
                  <TableCell>
                  {customer.price}
                  </TableCell>
                  <TableCell>
                  {customer.cost}
                  </TableCell>
                  <TableCell>
                  <button
                  className="btn default-btn"
                  onClick={() => enableEdit(customer)}
                >
                  編輯
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(customer.proid)}
                >
                  刪除
                </button>
                  </TableCell>
                </TableRow>
              )
            }
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
        rowsPerPageOptions={[5, 10, 25,"all"]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
