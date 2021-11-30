$(document).ready(function(){
    var studentList;
    function getall(){
        $(".studentList").html(" ");
        $.ajax({
            url: "http://localhost/api/read.php",
            method: "GET",
            success: function(data){
                console.log(data);
                studentList = data.body
                for (const item of studentList) {
                    $(".studentList").append('<tr>' + '<td>' + item["nom"] + '</td>' + '<td>' + item["prenom"] + '</td>' + '<td>' + item["email"] + "</td><td><input class='btn btn-warning btn-sm btn-edit stdID' type='button' value='Edit' + data-sid="+ item["id"] + " /><input class='btn btn-danger btn-sm btn-del stdID' type='button' value='Delete' + data-sid="+ item["id"] + " />" + '</td>' + '</tr>');
                }
            }
        })
    }
    getall();

    $('#tbody').on("click", ".btn-edit", function(){

        $('#editModal').show();
        var index = $(this).parents("tr").index();

        $(".edit-form #fname").val(studentList[index]["nom"]);
        $(".edit-form #lname").val(studentList[index]["prenom"]);
        $(".edit-form #course").val(studentList[index]["email"]);
        $(".edit-form #sid").val(studentList[index]["id"]);
    });


    $(".save-student").click(function(){
        var fname = $(".edit-form #fname").val();
        var lname = $(".edit-form #lname").val();
        var email = $(".edit-form #course").val();
        var siD = $(".edit-form #sid").val();
        $.ajax({
            url: "http://localhost/api/update.php",
            method: "POST",
            data : {id:siD, nom:fname, prenom:lname, email:email},
            dataType: "text",
            success:function(data){
                getall();
                $('#editModal').hide();
            },
            error:function(request,status,error){
                console.log(request.responseText);
                console.log('Failed To Update')
            }
        })
    });



// Close edit Modal
    $("#emodalbutton").click(function(){
        $('#editModal').hide();
    });


// Delete Button
    $("#tbody").on("click", ".btn-del", function(){
        console.log('Delete Button Clicked');
        let studentID = $(this).attr("data-sid");
        console.log('Student ID is',studentID);

        $.ajax({
            url: "http://localhost/api/delete.php",
            method: "POST",
            data: {id: studentID},
            dataType: "text",
            success:function(data){
                $(this).closest("tr").fadeOut();
                getall();
            }

        })

    });

// Add student
    $('#btnsave').click(function(){
        let fn = $('#fname').val();
        let ln = $('#lname').val();
        let co = $('#course').val();
        if(fn === ""){
            $('#fnameModal').show();
            $("#fmodalbutton").click(function(){
                $('#fnameModal').hide();
            });
        }else if(ln === ""){
            $('#lnameModal').show();
            $("#lmodalbutton").click(function(){
                $('#lnameModal').hide();
            });
        }else if(co === ""){
            $('#cnameModal').show();
            $("#cmodalbutton").click(function(){
                $('#cnameModal').hide();
            });
        }else {
            mydata = {nom:fn, prenom:ln, email:co};
            $.ajax({
                url: "http://localhost/api/create.php",
                method: "POST",
                data: mydata,
                dataType: "text",
                success:function(data){
                    $('form')[0].reset();
                    getall();

                }

            });
        }


    });




});