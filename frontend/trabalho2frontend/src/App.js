/* eslint no-use-before-define: 0 */
import './App.css';
import Footer from './footer';
import Title from './header/index'
import Main from './main/index'






function App() {
  return (
    <div className="App">   
      <Title/>
      
      <Main/>

      <Footer/>
    </div>
  );
}

export default App;
