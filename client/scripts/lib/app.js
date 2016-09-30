// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import 'angular-validation/dist/angular-validation';
import 'angular-validation/dist/angular-validation-rule';
import './angular-validation-schema.min';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

// Modules
import ChatsCtrl from '../controllers/chats.controller';
import ChatCtrl from '../controllers/chat.controller';
import ConfirmationCtrl from '../controllers/suggestion.controller';
import HomeCtrl from '../controllers/welcome.controller';
import SignupCtrl from '../controllers/signup.controller';
import LoginCtrl from '../controllers/login.controller';
import NewChatCtrl from '../controllers/new-chat.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';
import InputDirective from '../directives/input.directive';
import CalendarFilter from '../filters/calendar.filter';
import ChatNameFilter from '../filters/chat-name.filter';
import ChatPictureFilter from '../filters/chat-picture.filter';
import NewChatService from '../services/new-chat.service';
import Routes from '../routes';

const App = 'The Dish';

// App
app = Angular.module(App, [
  'angular-meteor',
  'angular-meteor.auth',
  'angularMoment',
  'ionic',
  'validation', 
  'validation.rule',
  'validation.schema'
]);

new Loader(App)
  .load(ChatsCtrl)
  .load(ChatCtrl)
  .load(ConfirmationCtrl)
  .load(HomeCtrl)
  .load(LoginCtrl)
  .load(SignupCtrl)
  .load(NewChatCtrl)
  .load(ProfileCtrl)
  .load(SettingsCtrl)
  .load(InputDirective)
  .load(CalendarFilter)
  .load(ChatNameFilter)
  .load(ChatPictureFilter)
  .load(NewChatService)
  .load(Routes);

  // Using config phase to add Schema's to schemaProvider
  app.config(function(validationSchemaProvider){
    //Registeration form and login form validation rules.
    var Register = {
      firstname:{
        'validations': 'required',
        'validate-on': 'keyup',
        'messages':{
          'required': {
            'error':'This field is required!'
          }
        }
      },
      lastname:{
        'validations': 'required',
        'validate-on': 'keyup',
        'messages':{
          'required': {
            'error':'This field is required!'
          }
        }
      },
      email:{
        'validations': 'required,email',
        'validate-on': 'keyup',
        'messages':{
          'required': {
            'error':'This field is required!'
          }
        }
      },
      password: {
        'validations': 'required',
        'validate-on': 'keyup',
        'messages':{
          'required': {
            'error':'This field is required!'
          }
        }
      }
    };
    validationSchemaProvider.set("Register", Register);
  });

// Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}

function onReady() {
  Angular.bootstrap(document, [App]);
}
