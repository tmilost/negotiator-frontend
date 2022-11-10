import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

/**
 * Config for the oidc client.
 */
const settings = {
    // Where the tokens will be stored
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    // URL to the authentication server (including realm)
    authority: 'http://mobydick.crs4.it:8087/auth/realms/bbmri-dev',
    // The name of the client in Keycloak setup for this service
    client_id: 'negotiator-authentication-pkce',
    // Where to redirect the user to after successful authentication
    redirect_uri: 'http://localhost:5173/redirect',
    // Where to redirect the user to after logging the user out
    post_logout_redirect_uri: 'http://localhost:5173',
    // Indicate the the authorization code flow should be used
    response_type: 'code',
    // "openid" tells the server that this client uses oidc for authentication
    scope: 'openid',
    // Enable automatic (silent) renewal of the access token
    automaticSilentRenew: true
  }

let userManager = new UserManager(settings)

/**
* Class to encapsulate all authentication related logic.
*/
class AuthService {
    /**
     * Initate the login process.
     */
    login() {
        console.log('CALLING LOGIN')
        userManager.signinRedirect()
            .catch(error => console.log(error))
    }

    logout() {
        userManager.signoutRedirect()
            .then(() => console.log('User logged out'))
            .catch(error => console.log(error))
    }

    /**
     * Handles the redirect from the OAuth server after a user logged in.
     */
    handleLoginRedirect() {
        // Returns a promise
        // userManager.signinRedirect({ state: { bar: 15 } });
        // return userManager.signinRedirect({ state: { bar: 15 } })
        console.log('completing login')
        return userManager.signinRedirectCallback()
    }

    /**
     * Handles the redirect from the OAuth server after a user logged out.
     */
    handleLogoutRedirect() {
        return userManager.signoutRedirectCallback()
    }

    /**
     * Checks whether or not a user is currently logged in.
     *
     * Returns a promise which will be resolved to true/false or be rejected with an error.
     */
    isUserLoggedIn() {
        return new Promise((resolve, reject) => {
            userManager.getUser()
                .then(user => {
                    if (user === null) {
                        resolve(false)
                    }
                    resolve(true)
                })
                .catch(error => reject(error))
        })
    }

    /**
     * Get the profile data for the currently authenticated user.
     *
     * Returns an empty object if no user is logged in.
     */
    getProfile() {
        return new Promise((resolve, reject) => {
            userManager.getUser()
                .then(user => {
                    if (user === null) {
                        resolve(null)
                    }
                    resolve(user.profile)
                })
                .catch(error => reject(error))
        })
    }

    /**
     * Get the access token.
     *
     * Can be used to make requests to the backend.
     */
    getAccessToken() {
        return new Promise((resolve, reject) => {
            console.log('Get access token from user')
            console.log(userManager.getUser())
            userManager.getUser()
                .then(user => {
                    console.log('Got access token from user')
                    resolve(user.access_token)
                })
                .catch(error => reject(error))
        })
    }

    async obtainToken() {
        const a = await this.getAccessToken()
        console.log('TOKEN')
        console.log(a)
        return a
    }

    async checkLogged() {
        return await (await (this.isUserLoggedIn()))
    }


}


/**
* Create and expose an instance of the auth service.
*/
export const authService = new AuthService()

// /**
//  * Default export to register the authentication service in the global Vue instance.
//  *
//  * This allows us to reference it using "this.$auth" whenever we are inside of a Vue context.
//  */
// export default {
//   install: function (Vue) {
//     Vue.prototype.$auth = authService
//   }
// }