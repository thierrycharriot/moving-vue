import { errorToast } from "../toasts"

/**
 * A validation class that evaluates if a data is
 * passing through some conditions.
 * 
 * @author Anthony Perrier <perrier_anthony@live.fr>
 * @see https://github.com/A-Perrier/reactsimplesurvey/blob/master/src/Validation/Assert.js
 */
export default class Assert 
{
  /**
   * @param {string} str 
   * @param {Array} arrayMinMax 
   * @param {boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static between (str, arrayMinMax, toast = true) {
    if (arrayMinMax.length !== 2 || !(arrayMinMax instanceof Array) || !this.int(arrayMinMax, false).isValid) {
      throw new Error("arrayMinMax parameter must be an array with two int values.")
    }
    
    let min = arrayMinMax[0]
    let max = arrayMinMax[1]
    // Make sure the highest value to always be max
    if (min > max) {
      let c = min
      min = max
      max = c
    }

    const isInvalid = str.length < min || str.length > max
    if (isInvalid && toast) {
      errorToast(errMsg)
    }

    let errMsg = isInvalid ? `Le champ doit contenir entre ${min} et ${max} caractères` : ''

    return {isValid: !isInvalid, message: errMsg}
  }



  
  /**
   * @param {string} str 
   * @param {number} min 
   * @param {boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static min (str, min, toast = true) {
    const isInvalid = str.length < min
    let errMsg = isInvalid ? `Le champ doit contenir au moins ${min} caractères` : ''

    if (isInvalid && toast) {
      errorToast(errMsg)
    }
    return {isValid: !isInvalid, message: errMsg}
  }




  /**
   * @param {string} str 
   * @param {number} max 
   * @param {boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static max (str, max, toast = true) {
    const isInvalid = str.length > max
    let errMsg = isInvalid ? `Le champ doit contenir au moins ${max} caractères` : ''

    if (isInvalid && toast) {
      errorToast(errMsg)
    }
    return {isValid: !isInvalid, message: errMsg}
  }




  /**
   * @param {string} str 
   * @param {boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static email (str, toast = true) {
    const regex = new RegExp(/^[^\W][a-zA-Z0-9\-._]+[^\W]@[^\W][a-zA-Z0-9\-._]+[^\W]\.[a-zA-Z]{2,6}$/gm)
    const isInvalid = !regex.test(str)
    let errMsg = isInvalid ? "L'email n'est pas valide" : ''

    if (isInvalid && toast) {
      errorToast(errMsg)
    }
    return {isValid: !isInvalid, message: errMsg}
  }


  /**
   * Based on French/Belgian phone number
   * @param {string} str 
   * @param {boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static phone (str, toast = true) {
    const regex = new RegExp(/^(?:(?:\+|00)(32|33)[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm)
    const isInvalid = !regex.test(str)
    let errMsg = isInvalid ? "Le numéro n'est pas valide" : ''

    if (isInvalid && toast) {
      errorToast(errMsg)
    }
    return {isValid: !isInvalid, message: errMsg}
  }



  /**
   * Based on French/Belgian phone number
   * @param {string} str 
   * @param {boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static emailOrPhone(str, toast = true) {
    let isInvalid = false
    
    if (!this.email(str, false).isValid && !this.phone(str, false).isValid) {
      isInvalid = true
    }

    let errMsg = isInvalid ? "L'email ou le numéro n'est pas valide" : ''

    if (isInvalid && toast) {
      errorToast(errMsg)
    }
    return {isValid: !isInvalid, message: errMsg}
  }



  /**
   * @param {string} str 
   * @param {boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static required (str, toast = true) {
    let isInvalid = false
    if (str === null || str === undefined || str.length === 0) {
      isInvalid = true
    }

    let errMsg = isInvalid ? "Un champ obligatoire n'a pas été rempli" : ''

    if (isInvalid && toast) {
      errorToast(errMsg)
    }
    return {isValid: !isInvalid, message: errMsg}
  }


  /**
   * @param {number|Array} el 
   * @param {Boolean} toast 
   * @returns {{isValid: boolean, message: string}}
   */
  static int(el, toast = true) {
    let isInvalid = false
    let errMsg;
    if (el instanceof Array) {
      if (el.length === 0) {
        isInvalid = true
        errMsg = "Le tableau passé en paramètre est vide"
        toast && errorToast(errMsg);
      }

      el.map(val => {
        !Number.isInteger(val) ? isInvalid = true : false
        if (isInvalid) {
          errMsg = "Une des valeurs du tableau n'est pas un entier"
          toast && errorToast(errMsg);
          return
        }
      })
    } else {
      !Number.isInteger(el) ? isInvalid = true : false
      errMsg = isInvalid ?? "Un nombre entier doit être passé en paramètre";
      if (isInvalid && toast) {
        errorToast(errMsg)
        }
    }
    return {isValid: !isInvalid, message: errMsg}
  }

}