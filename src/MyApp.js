import React,{Component} from 'react'

class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: '',
      type: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    var data = new FormData();
    data.append( "json", JSON.stringify( {
      name: this.state.name,
      type: this.state.type,
      url: this.state.url
  } ) );

    event.preventDefault();
    fetch('http://ec2-13-232-211-21.ap-south-1.compute.amazonaws.com:3001/submit', {
      method: 'POST',
      body: data,
    }).then((response) => {
        console.log(response.json());
      });
  }

  handleFileUpload(event){
    event.preventDefault();
    console.log(event)
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://ec2-13-232-211-21.ap-south-1.compute.amazonaws.com:3001/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
        console.log(response.json());
      });
  }


   render() {
    return (
      <div>
        <form onSubmit={this.handleFileUpload}>
          <input type="file" id="myfile" name="myfile" ref={(ref) => { this.uploadInput = ref; }}/>
          <button type="submit">Submit</button>
        </form>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter lesson name: </label>
            <input
              id="name"
              type="text"
              onChange={this.handleNameChange}
            />
            <label htmlFor="name">Enter lesson type: </label>
            <input
              id="type"
              type="text"
              onChange={this.handleTypeChange}
            />
            <label htmlFor="name">Enter lesson url: </label>
            <input
              id="url"
              type="text"
              onChange={this.handleUrlChange}
            />
            <button type="submit">Submit</button>
          </form>
      </div>
    );
  }
}

export default MyApp;