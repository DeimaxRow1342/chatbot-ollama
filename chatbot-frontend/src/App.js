import { useState } from "react";
import axios from "axios";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input) return;

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);

        try {
            const res = await axios.post("http://localhost:3000/chat", { prompt: input });
            const botMessage = { text: res.data.response, sender: "bot" };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };
/*Comentario*/ 
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Chatbot IA</h2>
            <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "300px" }}>
                {messages.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                        <strong>{msg.sender === "user" ? "Tú: " : "Bot: "}</strong>{msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escribe un mensaje..."
                style={{ width: "80%", padding: "10px", marginTop: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>Enviar</button>
        </div>
    );
}

export default App;
