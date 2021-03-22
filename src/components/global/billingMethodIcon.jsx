import React from 'react'

import iconVisa from '../../assets/images/billingMethod/visa-icon.svg'
import iconMasterCard from '../../assets/images/billingMethod/mastercard-icon.svg'
import iconAmex from '../../assets/images/billingMethod/american-express-icon.svg'

class BillingMethodIcon extends React.Component {
  render() {
    return (
      <div className="flex h-8">
        <img src={iconVisa} />
        <img src={iconMasterCard} />
        <img src={iconAmex} />
      </div>
    )
  }
}

export default BillingMethodIcon
