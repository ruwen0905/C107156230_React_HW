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
  const {deletedetail,orderdetail,setTodetail,todetail,editDetail,updateDetail,sadetail,cancelDetail} =
  useContext(AppContext);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [newData, setNewData] = useState([]);
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
  const updateNewData = (e, field) => {
    
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
    console.log( e.target.value)
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const deleteConfirm = (seq) => {
    if (window.confirm("Are you sure?")) {
      console.log(orderdetail)
      let newseq = todetail.filter((detail) => {
        return detail.seq !== seq;
      })
      setTodetail(newseq)
      deletedetail(seq);
    }
  };
  
  const enableEdit=(customer)=>{
    setNewData(customer)
    editDetail(customer.seq)
   let endetail = todetail.map((detail) => {
      if (detail.seq === customer.seq) {
        detail.isEditing = true;
        return detail;
      }
      detail.isEditing = false;
      return detail;
    })
    setTodetail(endetail)
  }
  const saveBtn=()=>{
    sadetail(newData)
    updateDetail(newData)
  }
const canceledit=(seq)=>{

  cancelDetail(seq)
  let endetail = todetail.map((detail) => {
    if (detail.seq === seq) {
      detail.isEditing = false;
      return detail;
    }
    return detail;
  });
  setTodetail(endetail)
}
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
                  訂單編號
                </TableCell>
                <TableCell>
                  產品編號
                </TableCell>
                <TableCell>
                  產品名稱
                </TableCell>
                <TableCell>
                  數量
                </TableCell>
                <TableCell>
                  折扣
                </TableCell>
                <TableCell>
                  按鈕
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => 
              {
                return customer.isEditing?(
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
                    {customer.orderid}
                  </TableCell>
                  <TableCell>
                    {customer.proid}
                  </TableCell>
                  <TableCell>
                  {customer.proname}
                  </TableCell>
                  <TableCell>
                    
                    <input
                  type="text"
                  defaultValue={customer.qty}
                  onChange={(e) => updateNewData(e, "qty")}
                />
                  </TableCell>
                  <TableCell>
                  <input
                  type="text"
                  defaultValue={customer.discount}
                  onChange={(e) => updateNewData(e, "discount")}
                />
                    
                  </TableCell>
                  <TableCell>
                  <button className="btn green-btn" onClick={() => saveBtn()}>
                  儲存
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => canceledit(customer.seq)}
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
                    {customer.orderid}
                  </TableCell>
                  <TableCell>
                    {customer.proid}
                  </TableCell>
                  <TableCell>
                  {customer.proname}
                  </TableCell>
                  <TableCell>
                    {customer.qty}
                  </TableCell>
                  <TableCell>
                  {customer.discount}
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
