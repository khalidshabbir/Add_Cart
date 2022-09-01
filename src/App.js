
import './App.css';
import Header from './components/Header';
import Cards from './components/Cards';
import CardsDetails from './components/CardDetails';
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
   <>
   <Header/>
   <Routes>
    <Route exact path='/' element={<Cards/>}/>
    <Route  path='/cart/:id' element={<CardsDetails/>}/>
   </Routes>
   </>
  );
}

export default App;
