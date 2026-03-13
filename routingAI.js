function routeDepartment(text){

text = text.toLowerCase();

if(text.includes("road") || text.includes("pothole"))
return "Municipal Corporation";

if(text.includes("water") || text.includes("drain"))
return "Water Department";

if(text.includes("electricity") || text.includes("power"))
return "Electricity Board";

if(text.includes("garbage") || text.includes("waste"))
return "Sanitation Department";

return "General Administration";

}

module.exports = routeDepartment;
