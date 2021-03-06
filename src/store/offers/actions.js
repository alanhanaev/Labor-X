import { signerSelector } from 'src/store'
import { daoByType } from '../daos/selectors'
import { JOB_STATE_CREATED } from "./../../models/app/JobStateModel"

export const OFFERS_CLEAR = 'offers/clear'
export const OFFERS_SAVE = 'offers/save'

// Should be called only once
export const initJobOffers = () => async ( dispatch) => {
  await dispatch(reloadJobsOffers())
}

export const reloadJobsOffers = () => async (dispatch, getState) => {
  const state = getState()
  const jobDataProviderDAO = daoByType('JobsDataProvider')(state)
  const signer = signerSelector()(state)
  if (state.jobs && state.jobs.list) {
    for (let job of state.jobs.list) {
      if (job.state===JOB_STATE_CREATED) 
      {setTimeout(async () => {
        const allOffers = await jobDataProviderDAO.getJobOffers(job.id)
        //Filtering only my offers
        const offers=allOffers.filter((item) => item.worker===signer.address )
        if (offers.length>0)
        {dispatch({ type: OFFERS_SAVE, jobId: job.id, offers  })}
      }, 0)}      
    }
  }

}
