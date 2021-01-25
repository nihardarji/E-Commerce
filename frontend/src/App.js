import { BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import { Container } from '@material-ui/core'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
