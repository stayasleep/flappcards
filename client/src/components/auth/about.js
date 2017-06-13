import React from 'react';
import Paper from 'material-ui/Paper';
import about from '../imgs/about.JPG';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';

const style={
    div:{
        width:'80vw',
        textAlign: 'center',
        display:'block',
        margin:'auto',
    },
    container:{
        width:'100%',
    },
    paperR:{
        flex: 1,
    },
    paperL:{
        flex: 1,
        backgroundImage:`url(${about})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover'
    },
    container2:{
        display:'flex',
        flexDirection:'row wrap',
        // padding:20,
        width: '100%',
    },
    header: {
        backgroundColor: "teal",
        color: "white",
        fontFamily: "Roboto, sans-serif"
    },
    h1: {
        padding: "12px"
    },
    pText: {
        padding: "12px"
    }
};

export default ()=>(
  <div>
      <FlashCardsAppBar/>

      <Paper  style={style.div} zDepth={1}>
          <div style={style.container}>
              <h1 style={style.h1}>Welcome to FlappCards</h1>
              <h2>Our Mission</h2>
              <p style={style.pText}>We believe learning can be made easier for everyone, anywhere.
                From students to teachers, and the curious alike, FlappCards provides
              an engaging platform to make learning new things an easy task.  Create
              customizable stacks of digital-flashcards or search through the community
               page and check out the contributions from people everywhere.  Get started
               today!</p>
          </div>
      </Paper>
      <Paper style={style.div} zDepth={1}>
          <div style={style.container2}>
              <div style={style.paperR}>
                  <h1>Our Story</h1>
                  <p style={style.pText}>FlappCards was founded in 2017 by LearningFuze students Brian Bernstein, Kevin Chalmers, and Andres Gasper
                   as a tool that started out as a way to help us study each other's class notes while also being able to customize them
                  individually.</p>
                  <p style={style.pText}>Since then, we've gone on to create a platform that welcomes anyone interested in expanding their horizon.  Create your
                   own stacks, share them with friends, or search through other member's contributions and pick up a new topic.  There's no
                   limit to your learning with FlappCard's innovative approach to making learning fun and easy.</p>
              </div>
              <div style={style.paperL}>
              </div>
          </div>
      </Paper>
  </div>
);