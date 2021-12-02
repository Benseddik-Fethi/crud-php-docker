$(document).ready(function () {
    $('#editModal').hide();
    let studentList;

    function getall() {
        $(".studentList").html(" ");
        $.ajax({
            url: "http://localhost/api/read.php",
            method: "GET",
            success: function (data) {
                studentList = data.body
                for (const item of studentList) {
                    $(".studentList")
                        .append('<tr>' + '<td>' + item["nom"] + '</td>' + '<td>' + item["prenom"] + '</td>' + '<td>' + item["email"] + "</td><td id='td-input'>" +
                            "<input class='btn btn-warning btn-sm btn-edit stdID' type='button' value='Edit'  data-sid=" + item["id"] + " />" +
                            "<input class='btn btn-danger btn-sm btn-del stdID' type='button' value='Delete'  data-sid=" + item["id"] + " />"
                            + '</td>' + '</tr>');
                }
            }
        })
    }
    getall();
    $('#tbody').on("click", ".btn-edit", function () {
        $('#editModal').show();
        $('#btnsave').hide();
        let index = $(this).parents("tr").index();
        $(" #fname").val(studentList[index]["nom"]);
        $(" #lname").val(studentList[index]["prenom"]);
        $(" #email").val(studentList[index]["email"]);
        $(" #sid").val(studentList[index]["id"]);
    });


    $(".save-student").click(function () {
        const fname = $(" #fname").val();
        const lname = $(" #lname").val();
        const email = $(" #email").val();
        const siD = $(" #sid").val();
        $.ajax({
            url: "http://localhost/api/update.php",
            method: "POST",
            data: {id: siD, nom: fname, prenom: lname, email: email},
            dataType: "text",
            success: function () {
                $('form')[0].reset();
                getall();
                $('#editModal').hide();
                $('#btnsave').show();
            }
        })
    });
    
// Close edit Modal
    $("#emodalbutton").click(function () {
        $('#editModal').hide();
        $('#btnsave').show();
    });

// Delete Button
    $("#tbody").on("click", ".btn-del", function () {
        let studentID = $(this).attr("data-sid");
        $.ajax({
            url: "http://localhost/api/delete.php",
            method: "POST",
            data: {id: studentID},
            dataType: "text",
            success: function () {
                $(this).closest("tr").fadeOut();
                getall();
            }

        })

    });

// Add student
    $('#btnsave').click(function () {
        let fn = $('#fname').val();
        let ln = $('#lname').val();
        let co = $('#email').val();
        if (fn === "") {
            $('#fnameModal').show();
            $("#fmodalbutton").click(function () {
                $('#fnameModal').hide();
            });
        } else if (ln === "") {
            $('#lnameModal').show();
            $("#lmodalbutton").click(function () {
                $('#lnameModal').hide();
            });
        } else if (co === "") {
            $('#cnameModal').show();
            $("#cmodalbutton").click(function () {
                $('#cnameModal').hide();
            });
        } else {
            let data = {nom: fn, prenom: ln, email: co};
            $.ajax({
                url: "http://localhost/api/create.php",
                method: "POST",
                data: data,
                dataType: "text",
                success: function () {
                    $('form')[0].reset();
                    getall();
                }
            });
        }
    });
});