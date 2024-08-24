import {Routes,Route} from 'react-router-dom';
import LobbyScreen from './pages/LobbyScreen';
import Room from './pages/Room';


function App() {

  return (
   
    <Routes>
      <Route path='/' element={<LobbyScreen />}/>
      <Route path='/room/:roomId' element={<Room />}/>
    </Routes>

  
  )
}

export default App
