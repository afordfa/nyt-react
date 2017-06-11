// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },

    // These functions allow children to update the parent.
  setSearchFields: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },


  // Allow child to update Mongo data array
  resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },


  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState) {

    // Only hit the API once; i.e. if the prev state does not equal the current
    if(this.state.searchTerms != prevState.searchTerms){
      console.log("made it to component did update");
      console.log(this.state.searchTerms);
      // Run the query for the address
      helpers.runQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        //console.log(data);
        this.setState({ apiResults: data });
        console.log("apiresults");

        console.log(this.state.apiResults);
      }.bind(this));
    }

  },

  // Here we render the function

  render: function() {
    return (

      <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>

        <div className="page-header">
          <h1 className="text-center">The New York Times</h1>
          <h2 className="text-center">Search The New York Times and save results.</h2>
        </div>

        <Form setSearchFields={this.setSearchFields} />
        <Results apiResults={this.state.apiResults} resetMongoResults={this.resetMongoResults} />
        <History mongoResults={this.state.mongoResults} resetMongoResults={this.resetMongoResults} />

      </div>

    );
  }
});

// Export the component back for use in other files
module.exports = Main;
