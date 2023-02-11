alert("Enter hit");

var div=document.createElement("div");

div.style.zIndex="15";

div.style.top="30%";
div.style.left="30%";
div.style.width="40%";
div.style.margin="auto";
div.style.position="absolute";

document.body.appendChild(div);

var innerDiv=document.createElement("input");

innerDiv.type = "text";
innerDiv.placeholder = "Searching"

div.appendChild(innerDiv);
