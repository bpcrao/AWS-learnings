/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const request = require('request');

var url = 'https://www.eenadu.net/ap/latestnews';

var speechOutput=""
request(url, function(err, resp, body) {
    if (err)
        throw err;

    speechOutput += body;
    // $('ul.article-box-list li p a').each(function(aa,bb)
    // {
    //   speechOutput+= bb.innerText + "                    .";
    // });
  });

const ShoutAtPersonHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log(request)
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
      console.log ( handlerInput.requestEnvelope.request)
    speechOutput = "hello welcome";

    if(handlerInput.requestEnvelope.request.intent){
    speechOutput = handlerInput.requestEnvelope.request.intent.slots.person.value;
        return handlerInput.responseBuilder
      .speak("polo "+speechOutput).reprompt("polo "+speechOutput)
      .getResponse();
    }
  },
};

const ShoutAtsPersonHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log(request)
    return (request.type === 'IntentRequest'
        && request.intent.name === 'ShoutAtPerson');
  },
  handle(handlerInput) {
      console.log ( handlerInput.requestEnvelope.request)
    let speechOutput = "hello welcome";
    
    if(handlerInput.requestEnvelope.request.intent){
    speechOutput = handlerInput.requestEnvelope.request.intent.slots.person.value;
    }

    return handlerInput.responseBuilder
      .speak("polo "+speechOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const SKILL_NAME = 'yello yello';


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    ShoutAtPersonHandler,
    ShoutAtsPersonHandler,
    SessionEndedRequestHandler
  )
  .lambda();
