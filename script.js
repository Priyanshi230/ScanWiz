const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');


const GenerateSubmit =(e) =>{
  // prevent the default nature of the form from submitting.
    e.preventDefault();
    clearprev();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
      
    if(url === ""){
        alert("Please enter a URL")
    }
    else{
      showSpinner();
       // settimeOut used to show the spinner for a limited time
       // time here is given in milisecond 1500 == 1.5 second.
       // hence after 1.5 second the spinner will be hidden.
        // setTimeout tales two argument 
        // 1. function   2. no of milliseconds.
       setTimeout(()=>{
         hideSpinner();
         generateQrCode(url,size,color);

         setTimeout(() =>{
            const saveUrl = qr.querySelector('img').src;
            createSaveButton(saveUrl);
         },50)
      },100);
    }
    
   //console.log(url,size,color);
}  


const generateQrCode =(url,size,color) =>{
    const qrcode = new QRCode('qrcode', {
        text:url,
        width: size,
        height: size,
        colorDark :color,       
    });
}
   // function to show the spinner
 const showSpinner = () =>{
    document.getElementById('spinner').style.display ='block';
 }

// function to hide the spinner
 const hideSpinner = () =>{
    document.getElementById('spinner').style.display ='none'; 
 }

const clearprev = () =>{
    qr.innerHTML = '';
    const savelink = document.getElementById('save-link');
     if(savelink) savelink.remove();
 }

 // button created theough js
 const createSaveButton = (saveUrl) =>{
  const link = document.createElement('a');
  link.id ='save-link';
  link.classList ='bg-cyan-600 rounded hover:bg-black text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
 }

 hideSpinner();
 
form.addEventListener('submit',GenerateSubmit);