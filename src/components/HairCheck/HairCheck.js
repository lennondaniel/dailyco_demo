import {
  useDaily,
  useDailyEvent,
  useDevices,
  useLocalParticipant,
  useVideoTrack,
} from '@daily-co/daily-react-hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserMediaError from '../UserMediaError/UserMediaError';

import './HairCheck.css';

export default function HairCheck({ joinCall, cancelCall }) {
  const localParticipant = useLocalParticipant();
  const videoTrack = useVideoTrack(localParticipant?.session_id);
  const { microphones, speakers, cameras, setMicrophone, setCamera, setSpeaker } = useDevices();
  const callObject = useDaily();
  const videoElement = useRef();

  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const localState = {
    blur: false,
  };

  function toggleBlur() {
    let type;
    let config;
    if (!localState.blur) {
      type = 'background-blur';
      config = { strength: 0.5 };
    } else {
      type = 'none';
    }

    callObject.updateInputSettings({
      video: {
        processor: {
          type,
          config,
        },
      },
    });
  }

  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const onChange = (e) => {
    callObject.setUserName(e.target.value);
  };

  const join = (e) => {
    e.preventDefault();
    joinCall();
  };

  useEffect(() => {
    if (!videoTrack.persistentTrack) return;
    if (videoElement?.current) {
      videoElement.current.srcObject =
        videoTrack.persistentTrack && new MediaStream([videoTrack?.persistentTrack]);
    }
  }, [videoTrack.persistentTrack]);

  const updateMicrophone = (e) => {
    setMicrophone(e.target.value);
  };

  const updateSpeakers = (e) => {
    setSpeaker(e.target.value);
  };

  const updateCamera = (e) => {
    setCamera(e.target.value);
  };

  return getUserMediaError ? (
    <UserMediaError />
  ) : (
    <form className="hair-check" onSubmit={join}>
      <h1>configuração da Chamada</h1>
      {/* Video preview */}
      {videoTrack?.persistentTrack && <video autoPlay muted playsInline ref={videoElement} />}

      {/* Username */}
      <div>
        <label htmlFor="username">Your name:</label>
        <input
          name="username"
          type="text"
          placeholder="Enter username"
          onChange={(e) => onChange(e)}
          value={localParticipant?.user_name || ' '}
        />
      </div>

      {/* Microphone select */}
      <div>
        <label htmlFor="micOptions">Microphone:</label>
        <select name="micOptions" id="micSelect" onChange={updateMicrophone}>
          {microphones?.map((mic) => (
            <option key={`mic-${mic.device.deviceId}`} value={mic.device.deviceId}>
              {mic.device.label}
            </option>
          ))}
        </select>
      </div>

      {/* Speakers select */}
      <div>
        <label htmlFor="speakersOptions">Speakers:</label>
        <select name="speakersOptions" id="speakersSelect" onChange={updateSpeakers}>
          {speakers?.map((speaker) => (
            <option key={`speaker-${speaker.device.deviceId}`} value={speaker.device.deviceId}>
              {speaker.device.label}
            </option>
          ))}
        </select>
      </div>

      {/* Camera select */}
      <div>
        <label htmlFor="cameraOptions">Camera:</label>
        <select name="cameraOptions" id="cameraSelect" onChange={updateCamera}>
          {cameras?.map((camera) => (
            <option key={`cam-${camera.device.deviceId}`} value={camera.device.deviceId}>
              {camera.device.label}
            </option>
          ))}
        </select>
      </div>
      <button onClick={toggleBlur} type="button" className="blur-off">
        Embaçar fundo da tela
      </button>
      <button onClick={join} type="submit" className="enter-call">
        Entrar na chamada
      </button>
      <button onClick={cancelCall} className="cancel-call" type="button">
        Voltar para início
      </button>
    </form>
  );
}
