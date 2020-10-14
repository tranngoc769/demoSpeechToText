$(document).ready(function() {
    $("#btn-record-mic").click(function() {
        jQuery.ajax({
            url: 'https://api-speech-recognition.herokuapp.com/recognize',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
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
                if (data.code == 1) {
                    alert(data.text);
                } else if (data.code == -2) {
                    alert('Không thể xử lý dữ liệu âm thanh');
                } else {
                    alert('Trống');
                }
            },
            error: function(e) {
                alert("Erro : " + e)
            }
        });
    });

    // 
});