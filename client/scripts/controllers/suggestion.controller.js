import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class SuggestionCtrl extends Controller {
  constructor() {
    super(...arguments);

  }
}

SuggestionCtrl.$inject = ['$state', '$ionicPopup', '$log'];