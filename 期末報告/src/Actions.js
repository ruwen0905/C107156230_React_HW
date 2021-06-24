import { useEffect, useState } from "react";

export const Actions = () => {
let [users , setUsers] = useState([]);
let [product , setProduct]=useState([]);
    //userLength is for showing the Data Loading message.
let [userLength , setUserLength] = useState(null);
let [setProductLength , /*productLength*/] = useState(null);
let [salesorder , setSalesorder]=useState([]);
let [orderlenght , setOrderlenght]=useState(null);
let [orderdetail , setOrderdetail]=useState([]);
let [detaillenght , setdDtaillenght]=useState(null);
let [allcust , setAllcust]=useState([]);
let [setdCustenght , /*custenght*/]=useState(null);
let [todetail , setTodetail]=useState([]);
let [detailid , setDetailid]=useState([]);

const all_user=()=>{
  fetch("http://localhost/php-react/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

const all_product=()=>{
   fetch("http://localhost/php-react/all-product.php")
       .then((res) => {
         return res.json();
       })
       .then((data) => {
         if (data.success) {
           setProduct(data.product);
           setProductLength(true);
         } else {
           setProductLength(0);
         }
       })
       .catch((err) => {
         console.log(err);
       });
   }

useEffect(() => {
  all_user()
  all_product()
}, []);

  // Inserting a new user into the database.
const insertUser = (newUser) => {
   fetch("http://localhost/php-react/add-user.php", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newUser),
   })
     .then((res) => {
       return res.json();
     })
     .then((data) => {
       if (data.id) {
         setUsers([
           {
             id: data.id,
             ...newUser,
           },
           ...users,
         ]);
         setUserLength(true);
       } else {
         alert(data.msg);
       }
     })
     .catch((err) => {
       console.log(err);
     });
 };

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_email = userData.user_email;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (theID) => {
      // filter outing the user.
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    fetch("http://localhost/php-react/delete-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (theID) => {
    // filter outing the user.
  let productDeleted = product.filter((pro) => {
    return pro.proid !== theID;
  });
  fetch("http://localhost/php-react/delete-product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ proid: theID }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setProduct(productDeleted);
        if (users.length === 1) {
          setUserLength(0);
        }
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const editProduct = (proid) => {
  product = product.map((pro) => {
    if (pro.proid === proid) {
      pro.isEditing = true;
      return pro;
    }
    pro.isEditing = false;
    return pro;
  });
  setProduct(product);
};

const cancelProduct = (proid) => {
  product = product.map((pro) => {
    if (pro.proid === proid) {
      pro.isEditing = false;
      return pro;
    }
    return pro;
  });
  setProduct(product);
};

const updateProduct = (newproduct) => {
  fetch("http://localhost/php-react/update-product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newproduct),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        product = product.map((pro) => {
          if (pro.proid === newproduct.proid) {
            pro.isEditing = false;
            pro.proname = newproduct.proname;
            pro.price = newproduct.price;
            pro.cost=newproduct.cost;
            
            return pro;
          }
          return pro;
        });
        setProduct(product);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const inserProduct = (value) => {
  fetch("http://localhost/php-react/add-product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
    //mode: 'no-cors',
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      
      if (data.success)  {
        setProduct([
          {...value} ,
          ...product,
        ]);
        setUserLength(true);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const all_salesorder=()=>{
  fetch("http://localhost/php-react/all-order.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSalesorder(data.order);
          setOrderlenght(true);
        } else {
          setOrderlenght(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

const all_orderdetail=()=>{
     fetch("http://localhost/php-react/all-detail.php")
      .then((res) => {
         return res.json();
       })
       .then((data) => {
         if (data.success) {
           setOrderdetail(data.detail);
           setdDtaillenght(true);
         } else {
           setdDtaillenght(0);
         }
       })
       .catch((err) => {
         console.log(err);
       });
  }
const all_cust=()=>{
   fetch("http://localhost/php-react/all-customer.php")
       .then((res) => {
         return res.json();
       })
       .then((data) => {
         if (data.success) {
           setAllcust(data.allcust);
           setdCustenght(true);
         } else {
           setdCustenght(0);
         }
       })
       .catch((err) => {
         console.log(err);
       });
   }

useEffect(() => {
  all_salesorder()
  all_orderdetail()
  all_cust()
  }, []);

const deleteOrder = (theID) => {
  // filter outing the user.
 let salesorderDeleted = salesorder.filter((user) => {
   return user.seq !== theID;
 });
 fetch("http://localhost/php-react/delete-order.php", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({ id: theID }),
 })
   .then((res) => {
     return res.json();
   })
   .then((data) => {
     if (data.success) {
       setSalesorder(salesorderDeleted);
       if (orderlenght.length === 1) {
         setOrderlenght(0);
       }
     } else {
       alert(data.msg);
     }
   })
   .catch((err) => {
     console.log(err);
   });
};

const updateOrder = (neworder) => {
  fetch("http://localhost/php-react/update-order.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(neworder),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        salesorder = salesorder.map((order) => {
          if (order.seq === neworder.seq) {
            order.isEditing = false;
            order.descript = neworder.descript;
            
            return order;
          }
          return order;
        });
        setSalesorder(salesorder);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const editOrder = (seq) => {
  salesorder = salesorder.map((order) => {
    if (order.seq === seq) {
      order.isEditing = true;
      return order;
    }
    order.isEditing = false;
    return order;
  });
  setSalesorder(salesorder);
};

const cancelProduct2 = (seq) => {
  salesorder = salesorder.map((order) => {
    if (order.seq === seq) {
      order.isEditing = false;
      return order;
    }
    return order;
  });
  setSalesorder(salesorder);
};

const deletedetail = (theID) => {
  // filter outing the user.
let orderdetailDeleted = orderdetail.filter((user) => {
  return user.seq !== theID;
});
fetch("http://localhost/php-react/delete-detail.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: theID }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.success) {
      setOrderdetail(orderdetailDeleted);
      if (detaillenght.length === 1) {
        setdDtaillenght(0);
      }
    } else {
      alert(data.msg);
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

const editDetail = (seq) => {
  orderdetail = orderdetail.map((detail) => {
    if (detail.seq === seq) {
      detail.isEditing = true;
      return detail;
    }
    detail.isEditing = false;
    return detail;
  });
  setOrderdetail(orderdetail);
};

const updateDetail = (newdetail) => {
  fetch("http://localhost/php-react/update-detail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newdetail),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        orderdetail = orderdetail.map((detail) => {
          if (detail.seq === newdetail.seq) {
            detail.isEditing = false;
            detail.qty = newdetail.qty;
            detail.discount = newdetail.discount;
            return detail;
          }
          return detail;
        });
        setOrderdetail(orderdetail);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const sadetail=(newData)=>{
  todetail =todetail.map((detail) => {
    if (detail.seq === newData.seq) {
      detail.isEditing = false;
      detail.qty = newData.qty;
      detail.discount = newData.discount;
      return detail;
    }
    return detail;
  })
  setTodetail(todetail)
};

const cancelDetail = (seq) => {
  orderdetail = orderdetail.map((detail) => {
    if (detail.seq === seq) {
      detail.isEditing = false;
      return detail;
    }
    return detail;
  });
  setOrderdetail(orderdetail);
};

const checkdetail=(id,product)=>{
  let chdetail=[]
  orderdetail.map((detail) => {
    
    if(detail.orderid===id){
      let proname=product.map((pro) => {
        if(pro.proid===detail.proid){return(pro.proname)}
      })
      detail={...detail,proname:proname}
      chdetail=[...chdetail,detail]
    }
  })
  setTodetail(chdetail)
}

const insertdetail=(newdetail) => {
  console.log(newdetail.orderid)
  fetch("http://localhost/php-react/add-detail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newdetail),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.id) {
        setOrderdetail([
          {
            seq: data.id,
            ...newdetail,
          },
          ...orderdetail,
        ]);
        setTodetail([...todetail,newdetail])
        setdDtaillenght(true);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const insertorder=(neworder)=>{
  fetch("http://localhost/php-react/add-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(neworder),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setSalesorder([
            {
              seq: data.id,
              ...neworder,
            },
            ...salesorder,
          ]);
          setOrderlenght(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    users,
    product,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
    deleteProduct,
    editProduct,
    cancelProduct,
    updateProduct,
    inserProduct,
    todetail,
    setTodetail,
    sadetail,
    checkdetail,
    setDetailid,
    detailid,
    salesorder,
    setSalesorder,
    deleteOrder,
    updateOrder,
    editOrder,
    cancelProduct2,
    orderdetail,
    allcust,
    deletedetail,
    editDetail,
    updateDetail,
    cancelDetail,
    setOrderdetail,
    insertdetail,
    insertorder,
  };
};