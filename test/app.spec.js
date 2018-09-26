const assert = require('assert');
const nock = require('nock');
const supertest = require('supertest');
const express = require('express');
const app = require('../app')

describe('unit testing /getAPIResponse route', function() {
  describe('testing with a dummy json', function(){
  	before(function(){
  		/*
  			Mock API using nock for the REST API
  			Endpoint. Any calls to URL https://jsonplaceholder.typicode.com
  			will be intercepted by the fake_api nock  
  		*/
  		let fake_api = nock('https://jsonplaceholder.typicode.com')
                .get('/todos/1')
                .reply(200, {_id: '123ABC',_rev: '946B7D1C' });
  	})
  	it('should return the expected json response', async function(){
  		let response = await supertest(app)
  					.get('/getAPIResponse')
  		/* Checking if the response has OK status code*/
  		assert(response.statusCode, 200)
  		/* Checking for the _id returned from the fake_api */
  		assert(response.body._id, '123ABC')
  	})
  	after(function(){
  		/* Once the uni test case has executed, clean up the nock.
			Now calls to the URL https://jsonplaceholder.typicode.com
			won't be intercepted. 
  		*/
  		nock.cleanAll();
  	})
  })
});