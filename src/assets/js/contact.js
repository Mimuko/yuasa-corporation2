$(document).ready(function() {
    $('.reservationX').hide();
    $('.numberOfPeople').hide();
    $('.contentX').hide();
    $('.breakdown').hide();

    $('input[name="typeOfInquiry"]').change(function() {
        if ($('#typeOfInquiry1').is(':checked')) {
            $('.reservationX').show().find('input, select').prop('disabled', false);
            $('.numberOfPeople').show().find('input').prop('disabled', false);
            $('.contentX').show().find('input').prop('disabled', false);
            $('.breakdown').show().find('input').prop('disabled', false);

            const today = new Date();
            const nextDay = new Date();
            nextDay.setDate(today.getDate() + 1);

            $('#year').val(nextDay.getFullYear());

            $('#month option').each(function() {
                if (parseInt($(this).val()) < today.getMonth() + 1) {
                    $(this).remove();
                }
            });

            updateDayOptions(nextDay.getFullYear(), nextDay.getMonth() + 1, today, nextDay);

            $('#month').change(function() {
                const selectedMonth = parseInt($(this).val());
                updateDayOptions(nextDay.getFullYear(), selectedMonth, today, nextDay);
            });

        } else {
            $('.reservationX').hide().find('input, select').prop('disabled', true);
            $('.numberOfPeople').hide().find('input').prop('disabled', true);
            $('.contentX').hide().find('input').prop('disabled', true);
            $('.breakdown').hide().find('input').prop('disabled', true);
        }
    });
});

function updateDayOptions(year, month, today, nextDay) {
    $('#day').empty().append($('<option>', {
        value: '',
        text: '- -- -'
    }));
    const daysInMonth = new Date(year, month, 0).getDate();
    let startDay = 1;
    if (month === today.getMonth() + 1) {
        startDay = nextDay.getDate();
    }
    for (let day = startDay; day <= daysInMonth; day++) {
        $('#day').append($('<option>', {
            value: day,
            text: day
        }));
    }
}