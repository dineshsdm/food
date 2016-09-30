import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Config, Runner } from 'angular-ecmascript/module-helpers';

class RoutesConfig extends Config {
  constructor() {
    super(...arguments);

    this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
  }

  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/tabs.html',
        resolve: {
          user: this.isAuthorized,
          chats() {
            return Meteor.subscribe('chats');
          }
        }
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chats.html',
            controller: 'ChatsCtrl as chats'
          }
        }
      })
      .state('tab.chat', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chat.html',
            controller: 'ChatCtrl as chat'
          }
        }
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'client/templates/welcome.html',
        controller: 'HomeCtrl as home',
        resolve: {
          currentUser($q) {
            if (Meteor.userId()) {
              return $q.reject('CANT_ACCESS');
            } else {
              return $q.resolve();
            }
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'client/templates/login.html',
        controller: 'LoginCtrl as login',
        resolve: {
          currentUser($q) {
            if (Meteor.userId()) {
              return $q.reject('CANT_ACCESS');
            } else {
              return $q.resolve();
            }
          }
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'client/templates/register.html',
        controller: 'SignupCtrl as signup',
        resolve: {
          currentUser($q) {
            if (Meteor.userId()) {
              return $q.reject('CANT_ACCESS');
            } else {
              return $q.resolve();
            }
          }
        }
      })
      .state('suggestion', {
        url: '/suggestion',
        templateUrl: 'client/templates/suggestion.html',
        controller: 'SuggestionCtrl as suggestion',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'client/templates/profile.html',
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'client/templates/settings.html',
            controller: 'SettingsCtrl as settings',
          }
        }
      });

    this.$locationProvider.html5Mode({enabled: true,requireBase: false});
    this.$urlRouterProvider.otherwise('suggestion');
  }

  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);

      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }else if(err === 'CANT_ACCESS'){
        this.$state.go('suggestion');
      }
    });
  }
}

RoutesRunner.$inject = ['$rootScope', '$state'];

export default [RoutesConfig, RoutesRunner];