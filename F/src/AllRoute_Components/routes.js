import Home from '../Pages/home/Home'
import Comments from '../Pages/comments/Comments.jsx'
import Users from '../Pages/users/Users.jsx'
import Orders from '../Pages/orders/Orders.jsx'
import Offs from '../Pages/offs/Offs.jsx'

let routes = [
  { path: '/', element: <Home /> },
  { path: '/comments', element: <Comments /> },
  { path: '/users', element: <Users /> },
  { path: '/orders', element: <Orders /> },
  { path: '/offs', element: <Offs /> },
];

export default routes;