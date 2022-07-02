import { errorToast } from '../toasts'

/**
 * The goal of this class is to inform the user of an error,
 * while converting the API error he/she gets into a
 * comprehensive message we'll display to him/her
 * 
 * @author Anthony Perrier <perrier_anthony@live.fr>
 * @since 0.1.0
 */
 class ErrorFeedback {
    statusCode
    statusText
    shouldBeDisplayed

    /**
     * @param {String|Number} statusCode The current status code
     * @param {String} statusText The current status text 
     * @param {boolean} shouldBeDisplayed Should the error be displayed into a toast ?
     */
    constructor(restResponse, shouldBeDisplayed = false) 
    {
        if (restResponse.data?.data[0]?.message) {
            /**
             * The first case is to handle a custom API endpoint response, as described below
             * @see https://github.com/O-clock-Yuna/projet-18-moving-forward-back/blob/main/web/app/plugins/moving-forward/public/class/Registration.php
             */
            this.statusText = restResponse.data.data[0].message
            this.statusCode = restResponse.data.data[0].code
        } else {
            /**
             * This case is to handle native WP api responses
             */
            this.statusText = restResponse.data.code
            this.statusCode = restResponse.status
        }
        this.shouldBeDisplayed = shouldBeDisplayed
        this.#getMessage()
    }

    /**
     * The main functionnality of the class.
     * From the data catched in the constructor, returns a
     * displayable information to display to the user
     * 
     * @returns {String}
     */
    #getMessage ()
    {
        let message = ''
        /**
         * If the WordPress API sends you back an unknown statusText,
         * please register it there 
         */
        switch (this.statusText) {
            // Password related :
            case 'empty_password': message = 'Le mot de passe est absent.'; break;
            case 'incorrect_password': message = "Le nom d'utilisateur ou le mot de passe est incorrect"; break;
            
            // Username related :
            case 'empty_username': message = "Le nom d'utilisateur est absent."; break;
            case 'username_exists': message = "Ce nom d'utilisateur est déjà utilisé"; break;
            case 'invalid_username': message = "Le nom d'utilisateur ou le mot de passe est incorrect"; break;

            // Email related :
            case 'empty_email': message = "L'email est absent."; break;
            case 'email_exists': message = "Cet email est déjà utilisé."; break;

            // Default :
            default: message = "Le messsage d'erreur doit être défini dans la classe ErrorFeedback@#getMessage()"; this.shouldBeDisplayed = true;
        }

        if (this.shouldBeDisplayed) {
            errorToast(message)
        }

        return message
    }
}


export default ErrorFeedback