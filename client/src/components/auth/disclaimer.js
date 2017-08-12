import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {initiateGuestBrowsing} from '../../actions/index';

//set the year dynamically for the bottom of page
let d = new Date();
d = d.getFullYear();

class Disclaimer extends Component{

    componentWillMount(){
        //set the title
        document.title="FlappCards - Terms of Service"
    }
    componentDidMount() {
        // if they do not have a token, initiate the non-member browsing procedures
        if(!(localStorage.getItem('token'))){
            this.props.initiateGuestBrowsing('/disclaimer');
        }
    }

    render(){
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<a  className="navTitleBar" href="/">FlappCards</a>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper className="paperBody" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">FlappCards: General Disclaimer</h1>
                        <h4>1. Acceptance of our Terms</h4>

                        <p className="pNotice">By visiting the website FlappCards.com, hereon referred to as "FlappCards", viewing, accessing or
                            otherwise using any of the services
                            or information created, collected, compiled or submitted to FlappCards, you agree
                            to be bound by the following Terms and Conditions of Service. If you do not want to be bound
                            by our Terms your only option is not to visit, view or otherwise use the services of
                            FlappCards. You understand, agree and acknowledge that these Terms constitute a legally
                            binding agreement between you and FlappCards and that your use of FlappCards
                            shall indicate your conclusive acceptance of this agreement.</p>

                        <h4>2. Provision of Services</h4>

                        <p className="pNotice">You agree and acknowledge that FlappCards is entitled to modify, improve or discontinue
                            any of its services at its sole discretion and without notice to you even if it may result
                            in you being prevented from accessing any information contained in it. Furthermore, you agree
                            and acknowledge that FlappCards is entitled to provide services to you through
                            subsidiaries or affiliated entities.</p>

                        <h4>3. Proprietary Rights</h4>

                        <p className="pNotice">You acknowledge and agree that FlappCards may contain proprietary and confidential information
                            including trademarks, service marks and patents protected by intellectual property laws and
                            international intellectual property treaties. FlappCards authorizes you to view and
                            make a single copy of portions of its content for offline, personal, non-commercial use. Our
                            content may not be sold, reproduced, or distributed without our written permission. Any
                            third-party trademarks, service marks and logos are the property of their respective owners.
                            Any further rights not specifically granted herein are reserved.</p>

                        <h4>4. Submitted Content</h4>

                        <p className="pNotice">When you submit content to FlappCards you simultaneously grant FlappCards an irrevocable,
                            worldwide, royalty free license to publish, display, modify, distribute and syndicate
                            your content worldwide. You confirm and warrant that you have the required authority to
                            grant the above license to FlappCards.</p>

                        <h4>5. Termination of Agreement</h4>

                        <p className="pNotice">The Terms of this agreement will continue to apply in perpetuity until terminated by either
                            party without notice at any time for any reason. Terms that are to continue in perpetuity
                            shall be unaffected by the termination of this agreement.</p>

                        <h4>6. Disclaimer of Warranties</h4>

                        <p className="pNotice">You understand and agree that your use of FlappCards is entirely at your own risk
                            and that our services are provided "As Is" and "As Available". FlappCards does not
                            make any express or implied warranties, endorsements or representations whatsoever
                            as to the operation of the FlappCards website, information, content, materials, or
                            products. This shall include, but not be limited to, implied warranties of merchantability
                            and fitness for a particular purpose and non-infringement, and warranties that access to
                            or use of the service will be uninterrupted or error-free or that defects in the service
                            will be corrected.  Please be advised that nothing found here has necessarily been
                            reviewed by people with the expertise required to provide you with complete, accurate
                            or reliable information.  FlappCards cannot guarantee the validity of the information found here.</p>

                        <h4>7. Limitation of Liability</h4>

                        <p className="pNotice">You understand and agree that FlappCards and any of its subsidiaries or affiliates shall in
                            no event be liable for any direct, indirect, incidental, consequential, or exemplary
                            damages. This shall include, but not be limited to damages for loss of profits, business
                            interruption, business reputation or goodwill, loss of programs or information or other
                            intangible loss arising out of the use of or the inability to use the service, or
                            information, or any permanent or temporary cessation of such service or access to
                            information, or the deletion or corruption of any content or information, or the failure
                            to store any content or information. The above limitation shall apply whether or not
                            FlappCards has been advised of or should have been aware of the possibility of such
                            damages. In jurisdictions where the exclusion or limitation of liability for
                            consequential or incidental damages is not allowed the liability of FlappCards is limited
                            to the greatest extent permitted by law.</p>

                        <h4>8. External Content</h4>

                        <p className="pNotice">FlappCards may include hyperlinks to third-party content, advertising or websites.
                            You acknowledge and agree that FlappCards is not responsible for and does not
                            endorse any advertising, products or resource available from such resources or websites.</p>

                        <h4>9. Jurisdiction</h4>

                        <p className="pNotice">You expressly understand and agree to submit to the personal and exclusive jurisdiction
                            of the courts of the country, state, province or territory determined solely by
                            FlappCards to resolve any legal matter arising from this agreement or related to
                            your use of FlappCards. If the court of law having jurisdiction, rules that any
                            provision of the agreement is invalid, then that provision will be removed from
                            the Terms and the remaining Terms will continue to be valid.</p>

                        <h4>10. Entire Agreement</h4>

                        <p className="pNotice">You understand and agree that the above Terms constitute the entire general agreement
                            between you and FlappCards. You may be subject to additional Terms and conditions
                            when you use, purchase or access other services, affiliate services or third-party
                            content or material.</p>

                        <h4>11. Changes to the Terms</h4>

                        <p className="pNotice">FlappCards reserves the right to modify these Terms from time to time at our sole
                            discretion and without any notice. Changes to our Terms become effective on the
                            date they are posted and your continued use of FlappCards after any changes to
                            Terms will signify your agreement to be bound by them.</p>

                        <h6>Disclaimer © {d} FlappCards.com</h6>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default connect(null,{initiateGuestBrowsing})(Disclaimer);