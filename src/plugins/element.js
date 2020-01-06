import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Main,
  Footer,
  Aside,
  Input,
  Avatar,
  Collapse,
  CollapseItem,
  Row,
  Col,
  Slider,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem,
  Message,
  Image,
  Card,
  Divider,
  Pagination
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Slider)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Pagination)

//  把 Message 弹窗消息挂在到全局
Vue.prototype.$message = Message
