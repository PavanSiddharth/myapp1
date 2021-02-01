import React,{Component} from 'react'

class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: '',
      type: 'Text only',
      image: '',
      videodisabled: true,
      imagedisabled: true,
      fileselected: false,
      imageselected: false,
      showmessage: false,
      displayusermessage: false,
      usermessage: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.validate = this.validate.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }


  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleTypeChange(event) {
    if(event.target.value=="Video+Text")
    {
      this.setState({videodisabled: false})
      this.setState({imagedisabled: true})
    }
    if(event.target.value=="Image+Text")
    {
      this.setState({imagedisabled: false})
      this.setState({videodisabled: true})
    }
    if(event.target.value=="Text only")
    {
      this.setState({imagedisabled: true})
      this.setState({videodisabled: true})
    }
    if(event.target.value=="Audio only")
    {
      this.setState({imagedisabled: true})
      this.setState({videodisabled: false})
    }
    if(event.target.value=="Audio+Text")
    {
      this.setState({imagedisabled: true})
      this.setState({videodisabled: false})
    }
    if(event.target.value=="Image+Audio")
    {
      this.setState({imagedisabled: false})
      this.setState({videodisabled: false})
    }
    this.setState({ type: event.target.value });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  /*handleSubmit(event) {
    var data = new FormData();
    data.append( "json", JSON.stringify( {
      name: this.state.name,
      type: this.state.type,
      url: this.state.url
  } ) );

    event.preventDefault();
    fetch('/submit', {
      method: 'POST',
      body: data,
    }).then((response) => {
        console.log(response.json());
      });
  }*/

  validate()
  {
    if(!this.state.fileselected || this.state.name=="")
    {
      return false;
    }
    else if(!this.state.videodisabled && this.state.url=="")
    {
      return false;
    }
    else if(!this.state.imagedisabled && !this.state.imageselected)
    {
      return false;
    }
    else
      return true;
  }

  async handleFileUpload(event){
    event.preventDefault();
    if(!this.validate())
    {
      this.setState({showmessage: true})
    }
    else
    {
    this.setState({showmessage: false})
    console.log(event)
    const data = new FormData();
    if(!this.state.imagedisabled)
    {
      data.append('image', this.uploadInput1.files[0]);
    }
    data.append('file', this.uploadInput.files[0]);

    data.append( "json", JSON.stringify( {
      name: this.state.name,
      type: this.state.type,
      url: this.state.url
    } ) );
    const response = await fetch('/submit', {
      method: 'POST',
      body: data,
    })
    const { message } = await response.json();
    this.setState({usermessage: message});
    this.setState({displayusermessage: true})
    }
    
  }


   render() {
    return (
      <div>
        <form onSubmit={this.handleFileUpload}>
          <input type="file" id="myfile" name="myfile" ref={(ref) => { this.uploadInput = ref; }} onChange={(e)=>{
            if(e.target.value.length)
            {
              this.setState({fileselected: true})
            }
          }}/>
            <label htmlFor="name">Enter lesson name: </label>
            <input
              id="name"
              type="text"
              onChange={this.handleNameChange}
            />
            <label htmlFor="name">Choose lesson type: </label>
            <select onChange={this.handleTypeChange}>
              <option value="Text only">Text only</option>
              <option value="Image+Text">Image+Text</option>
              <option value="Video+Text">Video+Text</option>
              <option value="Audio+Text">Audio+Text</option>
              <option value="Image+Audio">Image+Audio</option>
              <option value="Audio only">Audio only</option>
            </select>

            <label htmlFor="name">Enter lesson url: </label>
            <input
              id="url"
              type="text"
              disabled = {(this.state.videodisabled)? "disabled" : ""}
              onChange={this.handleUrlChange}
            />
             <label htmlFor="name">Upload Image</label>
            <input type="file" id="myfile1" name="myfile1" ref={(ref) => { this.uploadInput1 = ref; }} disabled = {(this.state.imagedisabled)? "disabled" : ""} onChange={(e)=>{
            if(e.target.value.length)
            {
              this.setState({imageselected: true})
            }
          }}/>
            <button type="submit">Submit</button>
          </form>
          {this.state.showmessage? (<h2>Some of the required fields are missing</h2>) : null}
          {this.state.displayusermessage? (<h2>{this.state.usermessage}</h2>) : null}
      </div>
      
    );
  }
}

export default MyApp;