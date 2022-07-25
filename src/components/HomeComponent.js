import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>;
    }
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
            <Card style={{backgroundColor: '#000', color: 'white'}}>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle style={{fontSize: '18pt', color: '#e60023'}}>{item.name}</CardTitle>
                    <CardText style={{ fontSize: '10pt', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '180px'}}>{item.description}</CardText>
                    <Link to={`/directory/${item._id}`}>
                        <Button style={{backgroundColor: '#e60023', color: '#000', fontWeight: 'bold', fontSize: '10pt' }}>
                            Read More
                        </Button>
                    </Link>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function Home(props) {
    console.log('campsite', props.campsite)
    return (
        <div className='container' style={{marginBottom: '71px'}}>
            <div className='row'>
                <div className='col-md m-1 text-center'>
                    <h1 style={{color: 'white'}}>Trending Now</h1>
                    <RenderCard
                        item={props.campsite}
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>
                <div className='col-md m-1 text-center'>
                    <h1 style={{color: 'white'}}>New Release</h1>
                    <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className='col-md m-1 text-center'>
                    <h1 style={{color: 'white'}}>Netflix Exclusive</h1>
                    <RenderCard 
                        item={props.partner}
                        isLoading={props.partnerLoading}
                        errMess={props.partnerErrMess}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;