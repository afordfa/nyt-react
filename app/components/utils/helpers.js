// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NYT API
  var authKey = "5dd8e97f3a674cca9ec9825981c0e780";

// Helper functions for making API Calls
var helper = {


// NY Times API Request Function
runQuery: function(topic, beginYear, endYear){
  console.log ("made it here");

  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" +
                  topic + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";


  // Create a JavaScript *Promise*
  return new Promise(function (fulfill, reject){
    // NY Times API get request
    axios.get(queryURL).then(function(response) {
      console.log(response);
      var result = [];

      // If get get a result, return only the first 5 articles
      if (response.data.response.docs[0]) {

        for(var i=0; i<response.data.response.docs.length; i++){
          // Break out of the loop if there are more than 5 entries
          
          if(i==5){
            break;
          }
          else {
            // Otherwise, push to results array
            result.push(response.data.response.docs[i]);
          }
        }

        // Return the array of articles via *Promise*
        fulfill(result);
        
      }
      else{
        // If we don't get any results, return an empty string via *Promise*
        reject("");
      }
      
    });
  });

},


  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;
