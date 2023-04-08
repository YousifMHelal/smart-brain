import React, { Component } from 'react';
import NavBar from './components/NavBar'
import Logo from './components/Logo';
import ImageForm from './components/ImageForm';
import Rank from './components/Rank';
import FaceRecognition from './components/FaceRecognition';
import Signin from './components/Signin';
import Register from './components/Register';
import ParticlesBg from 'particles-bg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  faceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }

  }

  displayBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onSubmit = () => {

    if (this.state.input.length > 10) {
      this.setState({ imageUrl: this.state.input })

      // Fetshing the api model to the website
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = '15167513ef1b479cbf04e3c229d3251f';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'wwxprt3f9l2n';
      const APP_ID = 'my-first-application';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
      const IMAGE_URL = this.state.input;

      ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////

      const raw = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": IMAGE_URL
              }
            }
          }
        ]
      });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
        },
        body: raw
      };

      // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
      // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
      // this will default to the latest version_id

      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://smartbrainapi-8jke.onrender.com/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            }).then(response => response.json())
              .then(count => {

                this.setState(Object.assign(this.state.user, { entries: count }))

              })
          }
          this.displayBox(this.faceLocation(response))
        })
        .catch(err => console.log(err))
    }
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({ isSignedIn: false })
      this.setState({imageUrl: ''})
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div>
        <ParticlesBg num={150} color="#FFFFFF" type="cobweb" bg={true} />
        <NavBar onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          route === 'home'
            ? <>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition imageUrl={imageUrl} box={box} isSignedIn={isSignedIn} />
            </>
            : (
              route === 'signin'
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )

        }
      </div>
    );
  }
}

export default App