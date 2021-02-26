const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');
const email = urlParams.get('email');
const fname = urlParams.get('fname');
const instrument = urlParams.get('instrument');
const base_url = 'https://musicsol-server.herokuapp.com/';

function confirmStudent(e){
  e.preventDefault();
  fetch(`${base_url}/assign/${uid}/${email}`)
  .then(data=>data.text())
  .then(data=>{
    if(data==='Assigned!'){
      $("#ty-modal").modal();
    }
  });
}

function startupcheck(){
  
  // fetch confirmation that user is pending
  fetch(`${base_url}/check/${uid}`)
  .then(data=>data.text())
  .then(data=>{
    if(data==='ok'){
      $("#main-card-body .card-title").text(fname);
      $(".card-img-top").attr("src", './assets/img/awaitingteacher.png');
      // $("#main-card-body")
      $("#main-card-body").attr("hidden", false);

      $("#confirm-student").on('click', confirmStudent);
    }else{
      $("#alreadyassigned").attr("hidden", false);
      $(".card-img-top").attr("src", './assets/img/alreadyassigned.png');
    }
  })
}







$(function(){


  $("#menu-btn").on('click', function(){
    // the reason why this is reversed is because it checks the value really fast, before it changes.
    if($(this).attr('aria-expanded')==="false"){
        $("#mainNav").addClass('expanded');
    }else{
        $("#mainNav").removeClass('expanded');
    }
  });


});








startupcheck();