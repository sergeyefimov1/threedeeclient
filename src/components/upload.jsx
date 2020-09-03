import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {STLViewer} from 'react-stl-obj-viewer';

const dropzoneRef = createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point 
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }


    render() {
        return <div className="content">
            <h1>Upload .STL file</h1>
            <Dropzone ref={dropzoneRef} noClick noKeyboard onDrop={acceptedFiles => {
                this.setState({file:acceptedFiles[0]})
            }}> 
            {({getRootProps, getInputProps, acceptedFiles}) => {
                return (
                <div className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop .STL here</p>
                    <p>or</p>
                    <button
                        type="button"
                        onClick={openDialog}
                    >
                        Open File Dialog
                    </button>
                    </div>

                </div>
                );
            }}
            </Dropzone>
            {
                this.state.file ?
                <STLViewer
                onSceneRendered={(element) => {
                    console.log(element)
                }}
                sceneClassName="test-scene"
                file={this.state.file}
                className="obj"
                modelColor="#FF0000"/> : null
            }
           
            <h3>It's that easy!</h3>
            <h4>upload some files and we will print them!</h4>
        </div>
    }
}