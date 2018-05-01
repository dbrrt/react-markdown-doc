import React from 'react'
import { GenericView } from '~/src/GenericView'
const passProps = injectedProps => Wrapped => props => <Wrapped {...injectedProps} {...props} />
const composeMD = md => passProps({ md })(GenericView)
export { composeMD }
