import { Button, Image } from 'components/common'
import React from 'react'
import { Router } from 'src/routes'
import css from './JobTypesContent.scss'

export default class JobTypesContent extends React.Component {
  handlePostJob () {
    Router.pushRoute('/create-job')
  }

  handleHireWorker () {
    Router.pushRoute('/hire-worker')
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleBar}>
            <Image
              icon='arrow_back'
              color={Image.COLORS.WHITE}
            />
          </div>
        </div>
        <div className={css.content}>
          <h2 className={css.header}>Post a new job</h2>
          <div className={css.contentCards}>
            <div className={css.card}>
              <h3>Post a competitive job</h3>
              <p>If your job is complex or you would like to select worker from many applicants use an option below.</p>
              <Button
                className={css.button}
                label='terms.postJob'
                color={Button.COLORS.PRIMARY}
                onClick={this.handlePostJob}
              />
              <Image
                className={css.helpIcon}
                icon='help_outline'
                color={Image.COLORS.BLUE}
              />
            </div>
            <div className={css.card}>
              <h3>Hire a worker</h3>
              <p>Use the option if you have an emergency task or want to send an offer to selected worker straight away.</p>
              <Button
                className={css.button}
                label='terms.hireWorker'
                color={Button.COLORS.PRIMARY}
                onClick={this.handleHireWorker}
              />
              <Image
                className={css.helpIcon}
                icon='help_outline'
                color={Image.COLORS.BLUE}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
