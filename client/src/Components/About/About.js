import React from 'react'
import AppBar from '../AppBar/AppBar'
import classes from './About.module.css'

function About() {
  return (
    <>
      <AppBar />
      <div className={classes.container}>
        <div className={classes.warning}>
          This site is for practice only, so when registering do not enter the password that you often use !!!
        </div>
        <div className={classes.warning}>
          Этот сайт только для практики поэтому при регистрации не вводите пароль который вы часто пользуете!!!
        </div>
        <div className={classes.success}>
          My github repository <a href="https://github.com/prElyor?tab=repositories" target="_blank">Github</a>
        </div>
      </div>
    </>
  )
}

export default About
