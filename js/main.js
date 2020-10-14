$(document).ready(function() {
    $("#convert").attr("disabled", true);
    $('input[id=stt-file]').change(function(ev) {
        ev.preventDefault();
        var infile = $('input[type=file]')[0].files[0];
        var outTxt = `File name : ${infile.name}, File size : ${Math.round(infile.size/1024)}kB, File type : ${infile.type}`;
        $('span[class="inputFile-custom_text"]')[0].innerText = outTxt;
        console.log(infile);
        $("#convert").attr("disabled", false);
    });
    $("#btn-record-mic").click(function() {
        jQuery.ajax({
            url: 'https://api-speech-recognition.herokuapp.com/recognize',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            success: function(data) {
                alert(data);
            }
        });
    });
    //  
    function titleCaseString(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    $("#trans").click(function() {
        $("#convert").attr("disabled", true);
        $("#loading").removeClass("hiden");
        var form = $('form')[0];
        var formData = new FormData(form);
        formData.append('sound', $('input[type=file]')[0].files[0]);
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "https://api-speech-recognition.herokuapp.com/recognize",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function(data) {
                $("#convert").attr("disabled", false);

                $("#loading").addClass("hiden");
                if (data.code == 1) {
                    $("#transcripted-text")[0].innerText = data.text;
                } else if (data.code == -2) {
                    alert('Không thể xử lý dữ liệu âm thanh');
                } else {
                    alert('Trống');
                }
            },
            error: function(e) {

                $("#loading").addClass("hiden");
                $("#convert").attr("disabled", false);
                alert("Erro : " + e)
            }
        });
    });

    // 
});