import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import './App.css';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [mirror, setMirror] = useState<boolean>(false);
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');

  return (
    <div className='app'>
      <div className='settings-container'>
        <input
          type='text'
          placeholder='Image URL'
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div>
          <span>Rotation: </span>
          <span>{rotation} <sup>o</sup></span>
        </div>
        <input
          type='range'
          min='0'
          max='360'
          value={rotation}
          onChange={(e) => setRotation(parseInt(e.target.value))}
        />
        <div>
          <span>Scale: </span>
          <span>{scale} %</span>
        </div>
        <input
          type='range'
          min='0.1'
          max='2'
          step='0.1'
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
        <div style={{display:"flex", alignItems:"center"}}>
          <span>Mirror Image</span>
          <input
            type='checkbox'
            checked={mirror}
            onChange={(e) => setMirror(e.target.checked)}
          />
        </div>
        <input
          type='text'
          placeholder='Top Text'
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type='text'
          placeholder='Bottom Text'
          onChange={(e) => setBottomText(e.target.value)}
        />
        <SketchPicker
          color={color}
          onChangeComplete={(color: ColorResult) => setColor(color.hex)}
        />
      </div>
      <div className='img-container'>
        {imageUrl && (
          <img
            src={imageUrl}
            style={{
              transform: `rotate(${rotation}deg) scaleX(${
                mirror ? -1 : 1
              }) scale(${scale})`,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}

        <div
          className='img-text'
          style={{ position: 'absolute', top: 0, color: color }}
        >
          {topText}
        </div>
        <div
          className='img-text'
          style={{ position: 'absolute', bottom: 0, color: color }}
        >
          {bottomText}
        </div>
      </div>
    </div>
  );
};

export default App;
