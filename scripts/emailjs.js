$("#contact-submit").click(() => {
  var name = $("#name").val();
  var email = $("#email").val();
  var message = $("textarea#message").val();
  const d = new Date();
  var templateParams = {
    name:name,
    email:email,
    message:message,
    title:$("#title").val(),
    time:d.toString()
  };

  if(name==="" || email==="" || $("#title").val()==="" || message==="") {
    alert("Please input all fields");
    return;
  }

  emailjs.send('service_4dum1ko','template_omoxh0o',templateParams).then(
    (response)=>{
        console.log("SUCCESS",response.status,response.text);
        $("#name").val("");
        $("#email").val("");
        $("#title").val("");
        $("textarea#message").val("");
    },
    (error)=>{
        console.log("FAILED...",error);
    }
  )
});
