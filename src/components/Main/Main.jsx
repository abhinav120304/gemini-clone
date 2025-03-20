import React, { useContext, useState, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context);

    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // 🗣️ Start TTS Function
    const handleTextToSpeech = () => {
        if (resultData && !isSpeaking) {
            const synth = synthRef.current;
            const utterance = new SpeechSynthesisUtterance(resultData);
            
            utteranceRef.current = utterance;

            synth.speak(utterance);
            setIsSpeaking(true);

            // When speech ends
            utterance.onend = () => {
                setIsSpeaking(false);
            };
        }
    };

    // ⏹️ Pause/Stop TTS Function
    const handleStopSpeech = () => {
        const synth = synthRef.current;

        if (isSpeaking && synth.speaking) {
            synth.cancel();  // Stop the speech immediately
            setIsSpeaking(false);
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Nexi</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">
                {loading ? (
                    <p>Loading...</p>
                ) : showResult ? (
                    <div className='result'>
                        <div className="result-title">
                            <p className="gradient-text">Nexi</p>
                            <p><b>{recentPrompt}</b></p>
                        </div>
                        <div className="result-data">
                            <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                        </div>
                        {/* TTS Buttons */}
                        <div className="tts-buttons">
                            <button className="tts-btn" onClick={handleTextToSpeech}>
                                🔊 Listen
                            </button>
                            {isSpeaking && (
                                <button className="stop-btn" onClick={handleStopSpeech}>
                                    ⏹️ Stop
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <center>
                        <div className="greet">
                            <p><span>Hello I Am Nexi</span></p>
                            <p>How can I help you?</p>
                        </div>
                    </center>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type='text'
                            placeholder='Enter your prompt here'
                        />
                        <div>
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Provides the most accurate information.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
