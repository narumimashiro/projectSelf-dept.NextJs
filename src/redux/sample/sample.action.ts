// Not using this file.
import * as SampleType from './sample.types'

export const dispMessage = (text: string) => {
  return ({
    type: SampleType.SampleActionTypes.SAMPLE_MESSAGE,
    payload: {
      text,
    },
  })
}