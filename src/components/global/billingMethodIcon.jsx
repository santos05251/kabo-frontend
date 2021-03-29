import React from 'react'

import iconVisa from '../../assets/images/billingMethod/visa-icon.svg'
import iconMasterCard from '../../assets/images/billingMethod/mastercard-icon.svg'
import iconAmex from '../../assets/images/billingMethod/american-express-icon.svg'

class BillingMethodIcon extends React.Component {
  render() {
    return (
      <div className="flex h-8">
        <img className="w-12" src={iconVisa} />
        <img className="w-12 ml-1" src={iconMasterCard} />
        <img className="w-12 ml-1" src={iconAmex} />
      </div>
    )
  }
}

export default BillingMethodIcon
