import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchUsers, loginUser, logoutUser, registerUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        users: state.users,
        favorites: state.favorites,
        auth: state.auth
    };
};

const mapDispatchToProps = {
    postComment: (campsiteId, rating, text) => (postComment(campsiteId, rating, text)),
    registerUser: (firstName, lastName, username, password) => (registerUser(firstName, lastName, username, password)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchUsers: () => (fetchUsers()),
    loginUser: creds => (loginUser(creds)),
    logoutUser: () => (logoutUser()),
    fetchFavorites: () => (fetchFavorites()),
    postFavorite: (campsiteId) => (postFavorite(campsiteId)),
    deleteFavorite: (campsiteId) => (deleteFavorite(campsiteId))
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchUsers();
        this.props.fetchFavorites();
    }

    render() {

        const HomePage = () => {

            const trendingShows = this.props.campsites.campsites.filter(campsite => campsite.trending)
            const newShows = this.props.campsites.campsites.filter(campsite => campsite.new)
            const exclusiveShows = this.props.campsites.campsites.filter(campsite => campsite.exclusive)
            
            return (
                <Home
                    trending={trendingShows[Math.floor(Math.random() * trendingShows.length)]}
                    new={newShows[Math.floor(Math.random() * newShows.length)]}
                    exclusive={exclusiveShows[Math.floor(Math.random() * exclusiveShows.length)]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                this.props.auth.isAuthenticated
                ?
                <CampsiteInfo
                    campsite={this.props.campsites.campsites.filter(campsite => campsite._id === match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsite === match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    favorite={this.props.favorites.favorites && this.props.favorites.favorites.exists 
                                ? this.props.favorites.favorites.campsites.some(campsite => campsite._id === match.params.campsiteId) : false}
                    postFavorite={this.props.postFavorite}
                />
                :
                <CampsiteInfo
                    campsite={this.props.campsites.campsites.filter(campsite => campsite._id === match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsite === match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    favorite={false}
                    postFavorite={this.props.postFavorite}
                />
            );
        };

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                            pathname: '/home',
                            state: { from: props.location }
                        }} 
                    />
                )} 
            />
        );

        return (
            <div>
                <Header auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser}
                    registerUser={this.props.registerUser} 
                />   
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                            <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                            <PrivateRoute exact path='/favorites' component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));