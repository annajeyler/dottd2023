import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone'
import moth from '../images/moth.gif';
import { classes } from './classes';
import { generateSentence } from '././textGeneration';

var wait = ms => new Promise((r, j) => setTimeout(r, ms));

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
    }
  }

  componentDidMount() {
    this.loadModel();
  }

  loadModel = () => {
    const savedModel = localStorage.getItem('mobilenet');
    if (savedModel) {
      // eslint-disable-next-line no-undef
      window.tf.loadLayersModel('indexeddb://mobilenet').then((model) => {
        console.log('Indexed DB model being loaded ::');
        this.setState({
          model,
        })
      })
    } else {
      // eslint-disable-next-line no-undef
      window.tf.loadLayersModel('model/model.json').then((model) => {
        console.log('TF model being loaded for the first time ::');
        localStorage.setItem('mobilenet', true);
        model.save('indexeddb://mobilenet')
        this.setState({
          model,
        })
      })
    }
  }

  onDropImage = async (files) => {
    if (!this.state.model) {
      return;
    }
    const [file] = files;

    const image = await this.generateImageFromFile(file);
    const isHotDog = await this.predictImage(image);

    if (isHotDog) {
      const { fortune, fortuneId } = generateSentence();
      this.props.openProcessingPanel(true, fortune);
      const url = await this.generateUploadUrl(file)
      const uploadedUrl = await this.uploadFile(file, url);
      console.log(uploadedUrl);
      await this.completeSubmission(uploadedUrl, fortune, fortuneId);
      this.props.fetchArchiveItems();
    } else {
      this.props.openProcessingPanel(false);
    }
  }

  predictImage = async (image) => {
    const model = this.state.model;
    // eslint-disable-next-line no-undef
    let offset = window.tf.scalar(127.5);
    // eslint-disable-next-line no-undef
    let tensor = window.tf.browser.fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .sub(offset)
      .div(offset)
      .expandDims();

    const predictions = await model.predict(tensor).data()
    let top5 = Array.from(predictions)
      .map((p, i) => {
        return {
          probability: p,
          className: classes[i]
        }
      }).sort((a, b) => {
        return b.probability - a.probability;
      }).slice(0, 5);

    return top5[0].probability > 0.5 && top5[0].className === 'hotdog, hot dog, red hot';
  }

  generateImageFromFile = async (file) => {
    return new Promise((resolve, reject) => {
      var f = file;
      var fr = new FileReader();

      var returnImageOnComplete = async (img) => {
        // We need to ensure that the image is actually loaded before we proceed.
        while (!img.complete) {
          await wait(100);
        }

        resolve(img);
      }

      var fileReadComplete = (ev2) => {
        var img = new Image();
        const imageElement = document.createElement('img');
        imageElement.style.display = 'none'; // If you don't want it showing
        imageElement.src = fr.result;
        document.body.appendChild(imageElement);
        img.src = fr.result;
        returnImageOnComplete(img);
      };

      fr.onload = fileReadComplete;

      fr.readAsDataURL(f);
    })
  }

  generateUploadUrl = (file) => {
    return fetch('http://localhost:8080/signed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: file.name,
      }),
    }).then((res) => {
      return res.json();
    }).then((json) => {
      return json.url;
    });
  }

  uploadFile = (file, url) => {
    return fetch(url, {
      method: 'PUT',
      body: file,
    }).then((res) => {
      const { url } = res;
      const parts = url.split('?');
      return parts[0];
    });
  }

  completeSubmission = (url, text, fortuneId) => {
    return fetch('http://localhost:8080/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        text,
        fortuneId,
      }),
    }).then((res) => {
      return res.json();
    }).then((json) => {
      // return json.url;
      console.log(json);
    });
  }

  renderButtonText = () => {
    return this.state.model ? 'Awaiting hotdog image...' : 'Loading assets...';
  }

  render() {
    return (
      <div className="home">
        <div className="title-text">
          D . o . t . T . D
        </div>
        <div className="upload-panel">
          <div className="moth">
            <img src={moth} alt="moth" />
          </div>
          <div className="upload-box-container">
            <Dropzone onDrop={acceptedFiles => this.onDropImage(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div
                  className="upload-box"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  +
                </div>
              )}
            </Dropzone>
            <div className="upload-button">
              {this.renderButtonText()}
            </div>
          </div>
          <div className="moth">
            <img src={moth} alt="moth" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
