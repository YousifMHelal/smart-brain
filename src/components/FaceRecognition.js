import React from 'react'

const FaceRecognition = ({ imageUrl, box, isSignedIn }) => {

    if (isSignedIn) {
        return (
            <div className='d-flex justify-content-center my-3' >
                <div style={{ position: 'relative' }}>
                    <img id='inputImage' width={'500px'} src={imageUrl} alt='' />
                    <div className='box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
                </div>
            </div>
        )
    }

}

export default FaceRecognition