window.addEventListener("load", function()
{
	console.log(1);
	let frag = document.createDocumentFragment();
	for(let i=0;i<5;i++){
	  var input = document.createElement('input');
	  input.type='date';
	  input.value = 0;
	  frag.appendChild(input)
	}
	document.body.appendChild(frag);
})
	
