const firebaseConfig = {
    apiKey: "AIzaSyCQ6trJpOFGEdb9OJZSOfZ_kRkcyoeKOMM",
    authDomain: "mlfacero.firebaseapp.com",
    databaseURL: "https://mlfacero-default-rtdb.firebaseio.com",
    projectId: "mlfacero",
    storageBucket: "mlfacero.appspot.com",
    messagingSenderId: "755136746035",
    appId: "1:755136746035:web:2c63b4a2c5b31661d74946",
    measurementId: "G-4Z3T33DMCD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

//firebase
let contactInfo = firebase.database().ref("info");

document.querySelector(".contact-form").addEventListener("submit", 
submitForm);

function submitForm(e){
    e.preventDefault();
    
let name = document.querySelector(".name").value;
let email = document.querySelector(".email").value;
let message = document.querySelector(".message").value;
console.log(name, email, message);

saveContactInfo(name, email, message);

document.querySelector(".contact-form").reset();

sendEmail(name,email,message);

}

//save info t Firebase
function saveContactInfo(name, email, message){
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        Username: name,
        email: email,
        message: message,
    });
    retriveInfo();
}

function retriveInfo(){
    let ref = firebase.database().ref("info");
    ref.on("value", goData);
}
function goData(data){
    let info = data.val();
    let key = Object.keys(info);

    for(let i = 0; i<keys.length; i++){
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let message = info[infoData].message;
        console.log(name, email, message);

        let infoResults = document.querySelector(".infoResults");

        infoResults.innerHTML +=`<div>
        <p><strong>Name: <strong/>${name}<br/>
        <a><strong>Email: <strong/>${email}</a> <br/>
        <a><strong>Message: <strong/>${message}<a/><br/>
        </p>
        </div>`;
    }
}

retriveInfo();

function sendEmail(name, email, message){
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'joypurhat53@gmail.com',
        Password: "vzjtjaxzfcmyaadh",
        To: "joypurhat53@gmail",
        From: "joypurhat53@gmail.com",
        Subject: `${name} sent you a message`,
        Body: `Name: ${name} <br/> Email: ${email} <br/> Message : ${message}`,

    }).then((message) =>alert("Mail sent Successfully"))
}


