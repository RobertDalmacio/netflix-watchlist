import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDirectoryItem({campsite}) {
    return (
        <Card>
            <Link to={`/directory/${campsite._id}`}>
                <CardImg width='100%' src={baseUrl + campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle style={{fontWeight: 'bold'}}>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory(props) {

    const directory = props.campsites.campsites.map(campsite => {
        return (
            <div key={campsite._id} className='col-md-5 m-1'>
                <RenderDirectoryItem campsite={campsite} />
            </div>
        );
    });

    if (props.campsites.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsites.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='container' style={{marginBottom: '20px'}}>
            <div className='row'>
                <div className='col'>
                    <Breadcrumb style={{ backgroundColor: '#000'}}>
                        <BreadcrumbItem style={{fontWeight: 'bold'}}><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active style={{fontWeight: 'bold', color: '#e60023'}}>Directory</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            <div className='row' marginBottom='200px'>
                {directory}
            </div>
        </div>
    );
}

export default Directory;