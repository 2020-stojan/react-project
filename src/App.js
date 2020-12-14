
import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import ShopPage from './pages/homepage/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/menu-iteam/header/header.component';
import SingInAndSignUp from './pages/homepage/sign-in-an-and-sign-up/sign-in-an-and-sign-up.component';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {
 

  unsubscirbeFromAuth = null;

  componentDidMount () {
    this.unsubscirbeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef = await createUserProfileDocument (userAuth);

        userRef.onSnapshot(snapShot => {
          console.log(snapShot);
          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({currentUser: userAuth});
    });
  }


  componentWillUnmount() {
    this.unsubscirbeFromAuth();
  }


  render() {
    return (
  
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signIn' component={SingInAndSignUp}/>
  
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);
