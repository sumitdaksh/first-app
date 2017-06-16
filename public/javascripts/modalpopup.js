var title = '';
var header = '';


var OpenModalPopUp = (val, url) => {
  var Url = url+''+val;
  var button = "<a  href="+Url+" class='btn btn-primary pull-left'>Delete</a>";
  $("#myModal.modal .modal-title").html('Delete user record');
  $("#myModal.modal .modal-body").html("Content loading please wait...");
  setTimeout(()=>{
    $("#myModal.modal .modal-body").html('Do you want to delete user <b>'+ val+'</b>');
  },1000);
  $('#Modal-Successbtn.col-sm-6').html(button);
  $('.modal-footer').show();
  $('#myModal').modal({backdrop: 'static', keyboard: false});
  $('#myModal').modal('show');
}

var OpenEditModalPopUp = (val, url) => {
  // console.log(val);
  var button = "<button type='submit' class='btn btn-default'>Update</button>";
  htmlData(val, function (err, data) {
    $("#myModal.modal .modal-title").html('Update user record');
    $("#myModal.modal .modal-body").html("Content loading please wait...");
    setTimeout(()=>{
      $("#myModal.modal .modal-body").html(data);
      if (val.gender_type === 'Female') {
        document.getElementById("female").checked = true;
      } else {
        document.getElementById("male").checked = true;
      }
      document.getElementById("comment").value = val.Address;
    },1000);
    $('#Modal-Successbtn.col-sm-6').html(button);
    $('.modal-footer').hide();
    $('#myModal').modal({backdrop: 'static', keyboard: false});
    $('#myModal').modal('show');
  });
}

function htmlData(val , cb) {
  var EditHtml ="<form method='POST' action='/dashboard/update-user'>"+
    "<div class='form-group'>"+
      "<label for='first name'>First Name:</label>"+
      "<input id='name' type='text' value="+val.first_name+" placeholder='first name' name='first_name' class='form-control'>"+
    "</div>"+
    "<div class='form-group'>"+
      "<label for='last name'>Last Name:</label>"+
      "<input id='name' type='text' value="+val.last_name+" placeholder='last name' name='last_name' class='form-control'>"+
    "</div>"+
    "<div class='form-group'>"+
      "<label for='email'>Email:</label>"+
      "<input id='email' type='email' value="+val.email+" placeholder='name@email.com' name='email' class='form-control'>"+
    "</div>"+
    "<div class='form-group'>"+
      "<label for='Contact'>Contact :</label>"+
      "<input id='contact' type='text' value="+val.contact+" placeholder='Contact' name='Contact' maxlength='10' class='form-control'>"+
    "</div>"+
    "<div class='form-group'>"+
      "<label for='radio'>Gender:<label class='radio-inline'>"+
      "<input type='radio' id='male' name='gender_type' value='Male'>Male</label>"+
      "<label class='radio-inline'>"+
      "<input type='radio' id='female' name='gender_type' value='Female'>Female</label></label>"+
    "</div>"+
    "<div class='form-group'>"+
      "<label for='pw2'>Address:</label>"+
      "<textarea id='comment' rows='3' value="+val.Address+" name='Address' class='form-control'></textarea>"+
    "</div>"+
    "<hr />"+
    "<div class='clearfix'></div>"+
    "<div class='row'>"+
      "<div class='col-sm-6'>"+
        "<button type='submit' class='btn btn-primary pull-left'>Update</button>"+
      "</div>"+
      "<div class='col-sm-6'>"+
        "<button type='button' data-dismiss='modal' class='btn btn-default pull-right'>Close</button>"+
      "</div>"+
    "</div>"+
    "</form>";
  cb('', EditHtml);
}
