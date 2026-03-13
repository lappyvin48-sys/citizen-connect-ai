import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SubmitComplaint() {

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [location,setLocation] = useState("");

const [category,setCategory] = useState("");
const [department,setDepartment] = useState("");
const [urgency,setUrgency] = useState("Medium");

const [image,setImage] = useState<File | null>(null);
const [loading,setLoading] = useState(false);


/* LOCATION DETECTION */

function detectLocation(){

if(!navigator.geolocation){
alert("Geolocation not supported");
return;
}

navigator.geolocation.getCurrentPosition(

async(position)=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

try{

const response = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
);

const data = await response.json();

const place =
data.address.city ||
data.address.town ||
data.address.village ||
data.address.state ||
"Unknown location";

setLocation(place);

}catch(err){
console.log(err);
setLocation(`${lat}, ${lon}`);
}

},

()=>{
alert("Unable to detect location");
}

);

}


/* AI TEXT ANALYSIS */

function analyzeComplaint(){

const text = (title + " " + description).toLowerCase();

if(text.includes("water") || text.includes("pipe")){
setCategory("Water");
setDepartment("Water Department");
}

else if(text.includes("road") || text.includes("pothole")){
setCategory("Roads");
setDepartment("Roads Department");
}

else if(text.includes("garbage") || text.includes("trash")){
setCategory("Sanitation");
setDepartment("Sanitation Department");
}

else if(text.includes("electric") || text.includes("power")){
setCategory("Electricity");
setDepartment("Electricity Department");
}

else{
setCategory("General");
setDepartment("Municipal Office");
}


if(text.includes("urgent") || text.includes("danger")){
setUrgency("High");
}

else if(text.includes("soon")){
setUrgency("Medium");
}

else{
setUrgency("Low");
}

alert("AI analysis completed");

}


/* IMAGE ANALYSIS */

function analyzeImage(){

if(!image){
alert("Upload an image first");
return;
}

const name = image.name.toLowerCase();

if(name.includes("pothole") || name.includes("road")){
setCategory("Roads");
setDepartment("Roads Department");
}

else if(name.includes("garbage")){
setCategory("Sanitation");
setDepartment("Sanitation Department");
}

else if(name.includes("water")){
setCategory("Water");
setDepartment("Water Department");
}

else{
alert("AI could not detect issue from image");
}

}


/* SUBMIT COMPLAINT */

async function submitComplaint(e:any){

e.preventDefault();

if(!title || !description || !location){
alert("Please fill all required fields");
return;
}

setLoading(true);

let imageUrl = "";


/* IMAGE UPLOAD */

if(image){

try{

const fileName = Date.now() + "-" + image.name;

const { error:uploadError } = await supabase
.storage
.from("complaint-images")
.upload(fileName,image);

if(uploadError){
console.log("Upload error:",uploadError);
}
else{

const { data } = supabase
.storage
.from("complaint-images")
.getPublicUrl(fileName);

imageUrl = data.publicUrl;

}

}catch(err){
console.log("Upload failed",err);
}

}


/* INSERT INTO DATABASE */

const { error } = await supabase
.from("complaints")
.insert([
{
title,
description,
location,
category,
department,
urgency,
image_url:imageUrl,
status:"Pending"
}
]);

setLoading(false);

if(error){

console.log("Supabase error:",error);
alert(error.message);

}
else{

alert("Complaint submitted successfully");

setTitle("");
setDescription("");
setLocation("");
setCategory("");
setDepartment("");
setUrgency("Medium");
setImage(null);

}

}


/* UI */

return(

<div className="p-10 max-w-xl mx-auto">

<h1 className="text-2xl font-bold mb-6">
File a Complaint
</h1>

<form onSubmit={submitComplaint} className="space-y-4">


<input
type="text"
placeholder="Complaint Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-2 w-full"
required
/>


<textarea
placeholder="Describe the issue"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="border p-2 w-full"
required
/>


<input
type="text"
placeholder="Enter location or detect"
value={location}
onChange={(e)=>setLocation(e.target.value)}
className="border p-2 w-full"
required
/>


<div className="flex items-center gap-3">

<button
type="button"
onClick={detectLocation}
className="bg-gray-700 text-white px-4 py-2 rounded"
>
Detect Location
</button>

<input
type="file"
onChange={(e)=>setImage(e.target.files?.[0] || null)}
className="border p-2 rounded"
/>

</div>


<button
type="button"
onClick={analyzeImage}
className="bg-purple-600 text-white px-4 py-2 rounded"
>
AI Detect from Image
</button>


<button
type="button"
onClick={analyzeComplaint}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
AI Analyze Complaint
</button>


<input
type="text"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border p-2 w-full"
/>


<input
type="text"
placeholder="Department"
value={department}
onChange={(e)=>setDepartment(e.target.value)}
className="border p-2 w-full"
/>


<select
value={urgency}
onChange={(e)=>setUrgency(e.target.value)}
className="border p-2 w-full"
>
<option>Low</option>
<option>Medium</option>
<option>High</option>
</select>


<button
type="submit"
disabled={loading}
className="bg-green-600 text-white px-6 py-2 rounded w-full"
>
{loading ? "Submitting..." : "Submit Complaint"}
</button>

</form>

</div>

);

}