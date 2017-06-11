// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { 
      subject: "",
      start: "",
      end: "" 
    };
  },

  // This function will respond to the user input
  handleChange: function(event) {


    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);

  },


  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    console.log("submitted");
    console.log("subject: " + this.state.subject);
    console.log("start: " + this.state.start);
    console.log("end: " + this.state.end);
    this.props.setSearchFields(this.state.subject, this.state.start, this.state.end);
    
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="subject" className="text-center">Subject</label>
              <input
                type="text"
                className="form-control text-center"
                id="subject"
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="start" className="text-center">Start Year</label>
              <input
                type="text"
                className="form-control text-center"
                id="start"
                onChange={this.handleChange}
              />
            </div>
            <br />     
            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="end" className="text-center">End Year</label>
              <input
                type="text"
                className="form-control text-center"
                id="end"
                onChange={this.handleChange}
              />
            </div>
            <br />                        
 
               <button
                className="btn btn-primary"
                type="submit"
                id="submitBtn"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
