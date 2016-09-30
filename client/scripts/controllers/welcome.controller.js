import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class HomeCtrl extends Controller {
  	constructor() {
	    super(...arguments);

  	}
  	loginWithFacebook(form, data) {
  		_this = this;
	    Meteor.loginWithFacebook({
		  	requestPermissions: ['user_friends', 'public_profile', 'email']
		}, (err) => {
		  	if (err) {
		    	if (err) return _this.handleError(err);
		  	}else {
		    	_this.$state.go('login');
		  	}
		});
	}

	handleError(err) {
	    //this.$log.error('Login error ', err);

	    this.$ionicPopup.alert({
	      title: err.reason || 'Facebook login failed!',
	      okType: 'button-positive button-clear'
	    });
	}
}

HomeCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];