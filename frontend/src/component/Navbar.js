import './Navbar.css';

function Navbar() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light container">
        <a class="navbar-brand Navmain" href="#">STEPIE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link Navchild" href="#">sport</a>
            </li>
            <li class="nav-item">
              <a class="nav-link Navchild" href="#">women</a>
            </li>
            <li class="nav-item">
              <a class="nav-link Navchild" href="#">men</a>
            </li>
            <li class="nav-item">
              <a class="nav-link Navchild" href="#">raffle</a>
            </li>
          </ul>
          <form class="form-inline mt-3">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div class="input-group-append">
              <button class="btn btn-dark" type="button" id="button-addon2">Search</button>
            </div>
            </div>
          </form>
          <button class="btn btn-light ml-2" type="button" id="button-addon2"><a className="loginbutton">Login</a></button>
        </div>
      </nav>
  
    </>
  );  
}

export default Navbar;