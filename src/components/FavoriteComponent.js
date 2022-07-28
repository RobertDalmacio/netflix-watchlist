import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderFavoriteItem({ campsite, deleteFavorite }) {
    return (
        <Media tag='li' style={{backgroundColor: '#fff'}}>
            <Media left middle>
                <Media object src={baseUrl + campsite.image} alt={campsite.name} style={{width: '512px'}}/>
            </Media>
            <Media body className='ml-5 pt-2'>
                <Button outline color='danger' onClick={() => deleteFavorite(campsite._id)} style={{position: 'absolute', right: '45px'}}>
                    <i className='fa fa-times'/>
                </Button>
                <Media heading className='pt-4' style={{fontWeight: 'bold'}}>{campsite.name}</Media>
                <p>{campsite.description}</p>
            </Media>
            <Link to={`/directory/${campsite._id}`}>
                    <Button style={{backgroundColor: '#e60023', color: '#000', fontWeight: 'bold', fontSize: '10pt', position: 'absolute', right: '45px', bottom: '20px'}}>
                        View Comments
                    </Button>
            </Link>
        </Media>
    );
}

const Favorites = props => {

    if (props.favorites.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.favorites.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    if (props.favorites.favorites.campsites) {
        const favorites = props.favorites.favorites.campsites.map(campsite => 
            <div key={campsite._id} className='col-12 mt-5'>
                <RenderFavoriteItem campsite={campsite} deleteFavorite={props.deleteFavorite} />
            </div>
        );

        return (
            <div className='container' style={{marginBottom: '230px'}}>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem style={{fontWeight: 'bold', color: '#000'}}><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active style={{fontWeight: 'bold', color: '#e60023'}}>My Favorites</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className='row'>
                    <Media list>
                        {favorites}
                    </Media>
                </div>
            </div>
        );
    } else {
        return (
            <div className='container align-items-center' style={{marginBottom: '645px'}}>
                <div className='row '>
                    <h4 style={{color: 'white'}}>You have no favorites selected.</h4>
                </div>
            </div>
        )
    }
}

export default Favorites;