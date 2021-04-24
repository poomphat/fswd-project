import logo from './logo.svg';
import './App.css';
import Header from './Pages/Header';
import Mainpage from './Pages/MainPage'
import Yeeter from './component/Router'
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  AOS.init();
  return (
    <div className="">

        <Yeeter></Yeeter>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
    </div>

    
  );
}

export default App;
