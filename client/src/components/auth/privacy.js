import React,{Component} from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Login from './log_in';
import {userLogin} from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';

//Get that Year
let d = new Date();
d = d.getFullYear();

class PrivacyPolicy extends Component{

    componentWillMount(){
        //set title
        document.title="FlappCards - Privacy Policy";
    }
    componentWillUnmount(){
        //ask if this part is even necessary
        document.title="FlappCards";
    }

    render(){
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<a  className="navTitleBar" href="https://flappcards.com">FlappCards</a>} />
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/home"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper className="paperBody" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Privacy Policy</h1>

                        <h3>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h3>

                        <p className="pNotice">When you sign-up with our site, as part of the registration
                            process, we collect the personal information you give us such as your name, address
                            and email address.

                            When you browse our site, we also automatically receive your computer’s internet
                            protocol (IP) address in order to provide us with information that helps us learn
                            about your browser and operating system.

                            Email marketing (if applicable): With your permission, we may send you emails about
                            our site, new products and other updates.</p>

                        <h3>SECTION 2 - CONSENT</h3>

                        <p className="pNotice">How do you get my consent?

                            By using the Site, or any other website, online service or mobile application
                            where this Privacy Policy is posted, you agree to our collection, use, disclosure,
                            and storage of information as described in this Privacy Policy.

                            If we ask for your personal information for a secondary reason, like marketing,
                            we will either ask you directly for your expressed consent, or provide you with
                            an opportunity to say no.

                            How do I withdraw my consent?

                            If after you opt-in, you change your mind, you may withdraw your consent for us
                            to contact you, for the continued collection, use or disclosure of your information,
                            at anytime, by contacting us at flapp@flappcards.com or mailing us at: FlappCards,
                            9200 Irvine Center Dr., Irvine, CA, 92618, United States</p>

                        <h3>SECTION 3 - DISCLOSURE</h3>

                        <p className="pNotice">We may disclose your personal information if we are required by law to do so or if
                            you violate our Terms of Service.</p>

                        <h3>SECTION 4 - THIRD-PARTY SERVICES</h3>

                        <p className="pNotice">In general, the third-party providers used by us will only collect, use and disclose
                            your information to the extent necessary to allow them to perform the services they
                            provide to us.

                            However, certain third-party service providers, such as payment gateways and other
                            payment transaction processors, have their own privacy policies in respect to the
                            information we are required to provide to them for your purchase-related transactions.

                            For these providers, we recommend that you read their privacy policies so you can understand
                            the manner in which your personal information will be handled by these providers.

                            In particular, remember that certain providers may be located in or have facilities that
                            are located in a different jurisdiction than either you or us. So if you elect to proceed
                            with a transaction that involves the services of a third-party service provider, then your
                            information may become subject to the laws of the jurisdiction(s) in which that service
                            provider or its facilities are located.

                            Once you leave our website or are redirected to a third-party website or application,
                            you are no longer governed by this Privacy Policy or our website’s Terms of Service.

                            Links

                            When you click on links on our site, they may direct you away from our site. We are
                            not responsible for the privacy practices of other sites and encourage you to read their
                            privacy statements.</p>


                        <h3>SECTION 5 - SECURITY</h3>

                        <p className="pNotice">To protect your personal information, we take reasonable precautions and follow industry
                            best practices to make sure it is not inappropriately lost, misused, accessed, disclosed,
                            altered or destroyed.

                            The information is encrypted using
                            secure socket layer technology (SSL) and stored with a AES-256 encryption.  Although no
                            method of transmission over the Internet or electronic storage is 100% secure, we follow
                            and implement additional generally accepted industry standards.

                            COOKIES

                            Cookies are files that websites send to your computer or other Internet-connected device to
                            uniquely identify your browser or to store information or settings on your device. Our Site
                            may use HTTP cookies, HTML5 cookies, Flash cookies and other types of local storage (such as
                            browser-based or plugin-based local storage). Your browser may tell you how to be notified
                            when you receive certain types of cookies and how to restrict or disable certain cookies. You
                            also may be able to delete your Flash cookies or adjust your Flash cookie settings by visiting
                            the Adobe Flash Website Storage Settings Manager. Please note, however, that without cookies
                            you may not be able to use all of the features of our Site.

                            Our cookies, tokens and similar technologies (collectively, "Tracking Technologies") also are
                            used for administering the Site, including without limitation, for authentication, to remember
                            Users’ settings, to customize the content and layout of the Site for Users, to contact you
                            about the Site, and to improve our internal operations, the content of our Site and
                            our services. Users may be able to control the use of, or reject or disable, some
                            Tracking Technologies at the individual browser level. If you reject or disable
                            Tracking Technologies, you may still use our Site, but your ability to use some
                            features or areas of our Site may be limited. We use Tracking Technologies to identify
                            your device and keep track of your Internet session with our Site. Using these Tracking
                            Technologies, we may automatically end your session on our Site after a period of
                            inactivity (as determined by us in our sole discretion). We also use Tracking
                            Technologies that allow us to recognize your device when you return to the Site within
                            a certain period of time (as determined by us in our sole discretion) and automatically
                            log you back into your account with us. UNLESS YOU AFFIRMATIVELY LOG OUT of your
                            account PRIOR TO YOUR SESSION ENDING (whether by you or by us), YOU WILL BE
                            AUTOMATICALLY LOGGED BACK IN THE NEXT TIME YOU OR ANY USER OF YOUR DEVICE VISITS
                            OUR SITE within the period of time determined by us. If you do not wish to be
                            automatically logged back in when you (or someone using your device) next initiate
                            a session with our Site (using the same device that is being used for your current
                            session), you should log out of your account (i) prior to ending your session, or
                            (ii) if you will be inactive on our Site for more than a few minutes.</p>

                        <h3>SECTION 6 - AGE OF CONSENT</h3>

                        <p className="pNotice">By using this site, you represent that you are at least the age of majority in
                            your state or province of residence, or that you are the age of majority in your
                            state or province of residence and you have given us your consent to allow any of
                            your minor dependents to use this site.</p>

                        <h3>SECTION 7 - CHANGES TO THIS PRIVACY POLICY</h3>

                        <p className="pNotice">We reserve the right to modify this privacy policy at any time, so please review
                            it frequently. Changes and clarifications will take effect immediately upon their
                            posting on the website. If we make material changes to this policy, we will notify
                            you here that it has been updated, so that you are aware of what information we collect,
                            how we use it, and under what circumstances, if any, we use and/or disclose it.

                            If our store is acquired or merged with another company, your information may be
                            transferred to the new owners so that we may continue to sell products to you.


                            QUESTIONS AND CONTACT INFORMATION

                            If you would like to: access, correct, amend or delete any personal
                            information we have about you, register a complaint, or simply want
                            more information contact our Privacy Compliance Officer at flapp@flappcards.com
                            or by mail at FlappCards

                            [Re: Privacy Compliance Officer]

                            [9200 Irvine Center Dr., Irvine, CA, 92618, United States]</p>
                        <h5>Privacy Policy © {d} FlappCards.com</h5>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default PrivacyPolicy;