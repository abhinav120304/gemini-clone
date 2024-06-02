import React, { createContext, useState } from "react";
import run from "../config/gemini";  // Ensure this path is correct

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (promptToSend) => {
        setLoading(true);
        setShowResult(false);
        setResultData(""); 

        const prompt = promptToSend ? promptToSend : input.trim();
        let response;

        if (prompt) {
            try {
                response = await run(prompt);
                setRecentPrompt(prompt);
                setPrevPrompts((prev) => [...prev, prompt]);
            } catch (error) {
                console.error("Error running prompt:", error);
                setResultData("An error occurred while processing your request.");
                setShowResult(true);
                setLoading(false);
                return;
            }
        } else {
            setLoading(false);
            return;
        }

        try {
            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("<br/>");
            let newResponseArray = newResponse2.split(" ");
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }
            setShowResult(true);
        } catch (error) {
            console.error("Error processing response:", error);
            setResultData("An error occurred while processing the response.");
            setShowResult(true);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const handlePromptClick = (prompt) => {
        setInput(prompt);
        onSent(prompt);
    };

    const contextValue = {
        input,
        setInput,
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        resultData,
        setResultData,
        handlePromptClick,  // Added handlePromptClick to context
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
