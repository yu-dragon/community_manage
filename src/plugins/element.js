import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Main,
  Aside,
  Footer,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  RadioGroup,
  RadioButton,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  Row,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog
} from 'element-ui'

// 导入弹框提示组件
import {
  Message,
  MessageBox
} from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
