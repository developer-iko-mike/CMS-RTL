import Home from '../Pages/home/Home'
import Comments from '../Pages/comments/Comments'
import Users from '../Pages/users/Users'
import Orders from '../Pages/orders/Orders'
import Offs from '../Pages/offs/Offs'

let routes = [
  { path: '/', element: <Home /> },
  { path: '/comments', element: <Comments /> },
  { path: '/users', element: <Users /> },
  { path: '/orders', element: <Orders /> },
  { path: '/offs', element: <Offs /> },
];

export default routes