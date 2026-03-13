import { useState } from "react";

export default function AIAssistant() {

const [messages,setMessages] = useState<any[]>([]);
const [input,setInput] = useState("");

function sendMessage(){

if(!input) return;

const userMessage = {role:"user",text:input};

let botReply = "I can help you file complaints, track issues, or answer civic service questions.";

if(input.toLowerCase().includes("water")){
botReply = "It sounds like a water supply issue. You can file this under the Water Department.";
}

if(input.toLowerCase().includes("electric")){
botReply = "This complaint belongs to the Electricity Department.";
}

if(input.toLowerCase().includes("track")){
botReply = "Please enter your complaint ID on the Track Complaint page.";
}

setMessages([...messages,userMessage,{role:"bot",text:botReply}]);
setInput("");

}

return(

<div className="max-w-3xl mx-auto p-6">

<h1 className="text-2xl font-bold mb-4">
AI Government Assistant
</h1>

<div className="border p-4 h-80 overflow-y-scroll mb-4">

{messages.map((m,index)=>(
<div key={index} className={m.role==="user" ? "text-right":"text-left"}>
<p className="p-2">{m.text}</p>
</div>
))}

</div>

<div className="flex gap-2">

<input
className="border p-2 w-full"
placeholder="Ask about government services..."
value={input}
onChange={(e)=>setInput(e.target.value)}
/>

<button
onClick={sendMessage}
className="bg-blue-600 text-white px-4 py-2"
>
Send
</button>

</div>

</div>

)

}