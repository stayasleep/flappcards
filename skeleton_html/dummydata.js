/**
 * Created by Bri on 4/20/2017.
 */
//login screen
let credentials = {
    username: 'user1',
    password: 'pass123'
};
//will take object and send to node --> db, respond success: true

//landing page, it is an aggregate of community content to explore  and your most recent stacks
let userRecent = {
    item1: {
        subject: 'Math',
        subSubHeader: 'Calc 1'
    },
    item2:{
        subject: 'Biology',
        subSubHeader:'Human Biology'
    }
};
let getAllSample={
    item1:{
        subject: 'Math',
        subSubHeader: 'Calc 2',
        user: 'Brian',
        rating: '4/5'
    },
    item2:{
        subject: 'Math',
        subSubHeader: 'Calc 3',
        user: 'Chalmers',
        rating: '4/5'
    },
    item3:{
        subject: 'Math',
        subSubHeader: 'Geometry',
        user: 'Andres',
        rating: '4/5'
    },
    item4:{
        subject: 'Physics',
        subSubHeader: 'Physics For Future Presidents',
        user: 'Jinwoo',
        rating: '4/5'
    }
};
let userSeatch={
    search: 'Physics'
};


//registration page
let userReg={
    username: 'user1',
    password: 'pass123',
    email: 'test@aol.com',
    location: 'Irvine, Ca'
};


//Profile Settings
let userProfile={
    username: 'user1',
    location: 'Irvine, Ca'
};


//the returned results on SEARCH PAGE
//Search query is 'physics'

let userSearch= {
    item1: {
        subject: 'Physics',
        subSubHeader: 'Physics For Future Presidents',
        user: 'Jinwoo',
        rating: '4/5'
    },
    item2: {
        subject: 'Physics',
        subSubHeader: 'Physics 7A',
        user: 'Chalmers',
        rating: '4/5'
    }
};

