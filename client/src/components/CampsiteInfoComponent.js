/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardImgOverlay, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderCampsite({campsite, favorite, postFavorite}) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card style={{backgroundColor: '#000', color: 'white'}}>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardImgOverlay>
                        <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(campsite._id)}>
                            {
                                favorite ?
                                    <i className="fa fa-heart" />
                                    : 
                                    <i className="fa fa-heart-o" />
                            }
                        </Button>
                    </CardImgOverlay>
                    <CardBody>
                        <CardText style={{ fontSize: '10pt', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '180px'}}>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

function RenderComments({comments, postComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1" style={{color:'#fff'}}>
                <h4 >Comments</h4>
                <Stagger in>
                    {
                        comments.map(comment => {
                            return (
                                <Fade in key={comment._id}>
                                    <div style={{backgroundColor:'#000', color: 'white'}}>
                                        <p>{comment.text} - {comment.rating} stars</p>
                                        <p>-- {comment.author.firstname} {comment.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.updatedAt)))}</p>
                                    </div>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div />;
}

class CommentForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.text);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal} style={{backgroundColor: '#e60023', color: 'white'}}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal} style={{backgroundColor: '#e60023', color: 'white'}}>Submit Comment</ModalHeader>
                    <ModalBody style={{backgroundColor: '#e60023', color: 'white'}}>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control" defaultValue="5">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea model=".text" id="text" name="text"
                                    rows="6"
                                    className="form-control"
                                />
                            </div>
                            <Button type="submit" style={{backgroundColor: '#000', color: 'white'}}>
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container" style={{marginBottom: '177px'}}>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem style={{fontWeight: 'bold', color: '#000'}}><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active style={{fontWeight: 'bold', color: '#e60023'}}>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} favorite={props.favorite} postFavorite={props.postFavorite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite._id}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;