import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './drawtoimg.css';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  // eslint-disable-next-line
  const [imageData, setImageData] = useState(null);
  const [currentColor, setCurrentColor] = useState('#000000'); // Default color is black

  const handleMouseDown = (event) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.strokeStyle = currentColor; 
  };

  const handleMouseMove = (event) => {
    if (!event.buttons) return;

    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setImageData(null);
  };

  const handleColorChange = (event) => {
    setCurrentColor(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="card">
      <div className="card-header text-white" style={{ background: 'linear-gradient(90deg, #00c4cc, #7d2ae8)' }}>
          <h2 className="text-center mb-0">Artistry Canvas Studio</h2>
        </div>
        <div className="card-body">
          <div className="row">
          <div className="col-12 col-md-8">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="border border-dark"
              style={{ width: '100%' }} // Ensure the canvas takes up 100% width initially
            />
          </div>


            <div className="col-md-4 d-flex flex-column align-items-center">
              <div className="mb-3">
                <h5 className="form-label attractive-label">Choose Color</h5>
                <div className="d-flex align-items-center">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={handleColorChange}
                    className="form-control mr-2"
                    style={{ height: '38px', width: '50px' }}
                  />
                  <input
                    type="text"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="form-control"
                    placeholder="Hex Code"
                    style={{ width: '70px' }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <button onClick={handleDownload} className="btn btn-success btn-block">
                  Download Image
                </button>
              </div>
              <div className="mb-3">
                <button onClick={handleClearCanvas} className="btn btn-danger btn-block">
                  Clear Canvas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
