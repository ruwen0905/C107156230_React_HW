import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Actions } from "./Actions";
//import { Actions2 } from "./Actions2";
import { Provider } from "./Context";
import { useState /*, useContext , useEffect*/} from "react";
const App = () => {
  const data = Actions();
  const routing = useRoutes(routes);
  const [useravatar,setUseravatar]=useState({id:'',name:'',job:'',dept:''});
  const [productsearch,setProductsearch]=useState("")
  const [reportsearch,setReportsearch]=useState(new Date(1000, 11, 17))
  const [reportsearch2,setReportsearch2]=useState(new Date(3000, 11, 17))
  const [ordersearch,setOrdersearch]=useState("")
const avatar={...data,useravatar,setUseravatar,productsearch,setProductsearch, /*...data2,*/reportsearch,setReportsearch,reportsearch2,setReportsearch2,ordersearch,setOrdersearch} 

  return (
    <Provider value={avatar}>
    <ThemeProvider theme={theme} >
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </Provider>
  );
};

export default App;
