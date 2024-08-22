import './App.css';
import HeaderComponent from './components/Header/Header';
import BodyComponent from './components/Body/Body';
import Footer from './components/Footer/Footer';
import LoginComponent from './components/Auth';
import RegisterComponent from './components/Auth/RegisterComponent';
function App() {
  return (
    <div className="App">
      <HeaderComponent/>
      <BodyComponent/>
      <Footer/>
      <LoginComponent/>
      <RegisterComponent/>
    </div>
  );
}

export default App;
