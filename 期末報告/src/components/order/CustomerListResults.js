import { useState,useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Grid,
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const CustomerListResults = ({ customers, ...rest }) => {
  const {salesorder,deleteOrder,updateOrder,editOrder,cancelProduct,orderdetail,setTodetail,todetail,allcust,product,checkdetail,setDetailid,ordersearch} =
    useContext(AppContext);  
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [newData, setNewData] = useState({});
  const navigate = useNavigate();

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit=(order)=>{
    setNewData(order)
    editOrder(order.seq)
  }
  const deleteConfirm=(id)=>{
    if (window.confirm("Are you sure?")) {
      
      deleteOrder(id);
    }
  }
  const saveBtn=()=>{
    updateOrder(newData)
  }
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    
    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };
const docheck=(id)=>{
  /*let todetail=[]
  orderdetail.map((detail)=>{
    
    if(detail.orderid===id){
      let proname=product.map((pro)=>{
        if(pro.proid===detail.proid){return(pro.proname)}
      })
      detail={...detail,proname:proname}
      todetail=[...todetail,detail]
    }
  })
  setTodetail(todetail)*/
  console.log(id)
  checkdetail(id,product)
  setDetailid(id)
  navigate('/detail', { replace: true })
}
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
                序號
                </TableCell>
                <TableCell>
                訂單編號
                </TableCell>
                <TableCell>
                員工代號
                </TableCell>
                <TableCell>
                客戶代號
                </TableCell>
                <TableCell>
                客戶名稱
                </TableCell>
                <TableCell>
                訂貨日期
                </TableCell>
                <TableCell>
                備註
                </TableCell>
                <TableCell>
                動作
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => 
              {
                if(customer.orderid.search(ordersearch)===-1){
                  return
                }
                return customer.isEditing ===true?(
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
                    
                  {customer.seq}
              </TableCell>
              <TableCell>
              {customer.orderid}
              </TableCell>
              <TableCell>
              {customer.empid}
              </TableCell>
              <TableCell>
              {customer.custid}
              </TableCell>
              <TableCell>
              {allcust.map((cust)=>{
                if(cust.custid===customer.custid){return(cust.custname)}
              })}
              </TableCell>
              
              <TableCell>
              {customer.orderdate}
              </TableCell>
              <TableCell>
              <input
                  type="text"
                  defaultValue={customer.descript}
                  onChange={(e) => updateNewData(e, "descript")}
                />
              </TableCell>
              <TableCell>
              <button className="btn green-btn" onClick={() => saveBtn()}>
                  儲存
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelProduct(customer.seq)}
                >
                  取消
                </button>
                  </TableCell>
                </TableRow>
              ):(<TableRow
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
                  
                  {customer.seq}
                
            </TableCell>
            <TableCell>
            {customer.orderid}
            </TableCell>
            <TableCell>
            {customer.empid}
            </TableCell>
            
            <TableCell>
            {customer.custid}
            </TableCell>
            <TableCell>
              {allcust.map((cust)=>{
                if(cust.custid===customer.custid){return(cust.custname)}
              })}
              </TableCell>
            <TableCell>
            {customer.orderdate}
            </TableCell>
            <TableCell>
            {customer.descript}
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
                onClick={() => deleteConfirm(customer.seq)}
              >
                刪除
              </button>

              <button
                className="btn green-btn"
                onClick={() => docheck(customer.orderid)}
              >
                明細
              </button>
                </TableCell>
              </TableRow>)
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
        rowsPerPageOptions={[5, 10, 25,'all']}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
