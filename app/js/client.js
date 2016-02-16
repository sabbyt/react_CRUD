const React = require('react');
const ReactDOM = require('react-dom');

var GetBears = React.createClass({
  getInitialState: function() {
    this.displayBears();
    return { bears: [] };
  },
  editBear: function(id) {
    return () => {
      var holder = this.state.bears.map(function(bear, i) {
        if (id === bear._id) {
          bear.editing = true;
        }
        return bear;
      });
      this.setState({ bears: holder });
    }
  },
  saveBear: function(event) {
    event.preventDefault();
    var bearData = {
      name: event.target.children['bear-name'].value,
      flavor: event.target.children['bear-flavor'].value,
      fishPreference: event.target.children['bear-fish-preference'].value
    };
    $.ajax({
      url: 'http://localhost:3000/api/bears/' + event.target.id,
      type: 'PUT',
      data: bearData
    }).then(function(data) {
      console.log(data);
    }, function(err) {
      console.log(err);
    });
    var holder = this.state.bears.map(function(bear, i) {
      if (bear._id === event.target.id) {
        bear.name = bearData.name;
        bear.flavor = bearData.flavor;
        bear.fishPreference = bearData.fishPreference;
        bear.editing = false;
      }
      return bear;
    });
    this.setState({ bears: holder });
  },
  displayBears: function() {
    $.ajax({
      url: 'http://localhost:3000/api/bears',
      type: 'GET'
    }).then((res) => {
      res.forEach(function(bear, i) {
        bear.editing = false;
      });
      this.setState({ bears: res });
    });
  },
  render: function() {
    return (
      <ul>
        {this.state.bears.map((bear) => {
          return <li key={bear._id}>{bear.name}, {bear.flavor}, {bear.fishPreference}
          <button onClick={this.editBear(bear._id)}>EDIT</button>
          <button>DELETE</button>
          <form id={bear._id} className={bear.editing ? null : "hidden"} onSubmit={this.saveBear}>
            <input type="text" name="bear-name" placeholder="Bear Name" defaultValue={bear.name}/>
            <input type="text" name="bear-flavor" placeholder="Bear Flavor" defaultValue={bear.flavor}/>
            <input type="text" name="bear-fish-preference" placeholder="Bear Fish Preference" defaultValue={bear.fishPreference}/>
            <button type="submit">SAVE BEAR</button>
          </form>
          </li>
        })}
      </ul>
    )
  }
});

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
        <button type="submit">CREATE BEAR</button>
      </form>
    )
  }
});

ReactDOM.render(<NewBear />, document.getElementById('newbear'));
ReactDOM.render(<GetBears />, document.getElementById('bear-container'));
