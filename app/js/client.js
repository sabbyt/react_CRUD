const React = require('react');
const ReactDOM = require('react-dom');

var NewBear = React.createClass({
  createBear: function(event) {
    event.preventDefault();
    var bearData = {
      name: event.target.children['bear-name'].value,
      flavor: event.target.children['bear-flavor'].value,
      fishPreference: event.target.children['bear-fish-preference'].value
    }
    $.ajax({
      url: 'http://localhost:3000/api/bears',
      type: 'POST',
      data: bearData
    }).then(
      function(data) {
        console.log(data);
      }
    );
  },
  render: function() {
    return (
      <form onSubmit={this.createBear}>
        <input type="text" name="bear-name" placeholder="Bear Name" />
        <input type="text" name="bear-flavor" placeholder="Bear Flavor" />
        <input type="text" name="bear-fish-preference" placeholder="Bear Fish Preference" />
        <button type="submit">Create Bear</button>
      </form>
    )
  }
});

ReactDOM.render(<NewBear />, document.getElementById('bear-app'));
