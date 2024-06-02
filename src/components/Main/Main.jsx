import React, { useContext } from 'react';
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

    const handleSendClick = () => {
        if (input.trim() !== "") {
            onSent();
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
                    </div>
                ) : (
                    <center>
                    <>
                        <div className="greet">
                            <p><span>Hello I Am Nexi</span></p>
                            <p>How can I help you?</p>
                        </div>
                        
                    </>
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
                            <img onClick={()=>onSent()} src={assets.send_icon} alt="Send Icon" />
                        </div>
                    </div>
                    <p className="bottom-info">
                    provides most accurate information.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
