import React from 'react';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-6 col-sm-3 text-center">
                        <h5>Social</h5>
                        <a className="btn btn-social-icon btn-instagram" href="http://instagram.com/"><i className="fa fa-instagram" /></a>{' '}
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/"><i className="fa fa-facebook" /></a>{' '}
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter" /></a>{' '}
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube" /></a> 
                    </div>
                    <div className="col-6 col-sm-4 text-center">
                        <a role="button" className="btn btn-link" href="mailto:notreal@notreal.co"><i className="fa fa-envelope-o" /> Netflix-Watchlist@hotmail.com</a>
                        <p class="text-sm mb-md-0">
                                &copy; 2022, Robert Dalmacio. All rights reserved.
                            </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;