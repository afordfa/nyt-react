// Displays API search results from another possible Query component and Results component. 
// Gives the user the ability to save an article to their Saved Articles.

// Include React
var React = require("react");

// Requiring our helper for making API calls
var helpers = require("../utils/helpers.js");

// Create the Search Component
var Results = React.createClass({

  handleSave: function(event){
    console.log("saved");
    console.log(event.target);
    console.log(this.props.apiResults[event.target.value]);
    console.log(this.props.apiResults[event.target.value].web_url);
    console.log(this.props.apiResults[event.target.value].headline.main);

    helpers.postHistory(this.props.apiResults[event.target.value].headline.main, this.props.apiResults[event.target.value].web_url).then(function(){
      console.log("updated");
    }.bind(this));
  },


  // Here we render the Search Results Panel
  render: function() {

    
    var that = this;

    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Results</b></i></h3>
        </div>

        <div className="panel-body">
          <ul className="list-group col-md-8 col-md-offset-2">
            {this.props.apiResults.map(function(search, i) {              
              return (
                <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={search.web_url} target="_new" style={ {color: "black"} }>{search.headline.main}</a></b>
                      <i> {search.pub_date.substring(0, 10)}</i>
                    </div>       
                    <span className="input-group-btn">
                      <button className="btn btn-success" type="button" onClick={that.handleSave} value={i}>Save</button>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

    );
  }
});


// Export the component back for use in Main file
module.exports = Results;
