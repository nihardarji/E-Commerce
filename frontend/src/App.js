import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from '@material-ui/core'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          {/* id is optional (?) */}
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
