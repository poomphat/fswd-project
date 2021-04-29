
import './sidebar.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ME_QUERY } from '../graphql/meQuery'
import { useSession } from '../context/Sessioncontext'
function Adminnav() {
  
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light container NavStepie">
        <Link to="/dashboard">
          <a class="navbar-brand Navmain text-dark">STEPIE</a>
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
            <Link to="/addproduct">
              <a class="nav-link Navchild">Add product</a>
            </Link>
            </li>

          </ul>
          <Link to="/">
          <button class="text-dark btn btn-light ">Go to Customer site</button>
         </Link>
        </div>
      </nav>
    </>
  );  
}

export default Adminnav;