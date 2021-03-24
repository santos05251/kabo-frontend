import React from 'react'
import { connect } from 'react-redux'

import { authenticationActions } from '../../actions'
import Loader from "../../assets/images/buttonLoader.svg";
import Button from '../../components/global/button';
import Layout from "../../components/layout";

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      submitted: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { email, password } = this.state
    if (email && password) {
      this.props.login(email, password)
    }
  }

  render() {
    const { loggingIn, error, authLoading } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <Layout>
        <div className="login md:mt-28 sm:mt-23 w-full mb-5 md:mb-12">
          <div className="w-full md:w-3/5 mx-auto">
            <div className="bg-white px-8 md:py-10 sm:py-1 sm:px-12 sm:py-8 ">
              <form name="form" data-cy="login-form" onSubmit={this.handleSubmit}>
                <div className="">
                  <div className="w-full">
                    <label htmlFor="email" className="leading-snug text-sm font-semibold text-black">Email</label>
                    <input data-cy="login-email" type="email" name="email" id="email" value={email} autoComplete="email" onChange={this.handleChange} required className="block w-full h-12 px-3 py-2 border border-solid border-gray-400 rounded-lg" />
                  </div>

                  <div className="w-full mt-6">
                    <label htmlFor="password" className="leading-snug text-sm font-semibold text-black">Password</label>
                    <input data-cy="login-password" type="password" name="password" id="password" value={password} autoComplete="current-password" onChange={this.handleChange} required className="block w-full h-12 px-3 py-2 border border-solid border-gray-400 rounded-lg" />
                  </div>
                </div>
                {error && (
                  <div data-cy="login-failure" className="text-red-500 text-xs mt-1">
                    Invalid login credentials
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="font-semibold">
                    Need help? Email us at <a className="text-primary" href="mailto: help@kabo.co">help@kabo.co</a>
                  </div>
                  <a
                    className="block text-primary mt-1 mb-5 sm:mb-3 leading-snug text-sm"
                    href="/forgot-password"
                  >
                    Forgot your password?
                  </a>
                </div>
                <button
                  data-cy="login-submit"
                  type="submit"
                  className={`w-full h-12 bg-primary text-white rounded-xl mt-4 leading-8 text-base ${authLoading ? 'flex justify-center items-center' : ''}`}
                >
                  {authLoading ? <img src={Loader} className="w-9" /> : "Log In"}
                </button>
              </form>
              <div className="w-full border-gray-300 border-b mt-6" />
              <div className="font-messina text-xl font-semibold mt-4 font-copyPrimary text-center">New to Kabo?</div>
              <a href="/a/signup">
                <Button styles="w-full mt-4" text="Tell us about your dog" />
              </a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggingIn, error, authLoading } = state.authentication;

  return {
    loggingIn,
    error,
    authLoading,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    login: (email, password) => dispatch(authenticationActions.login({ email, password }))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage)
