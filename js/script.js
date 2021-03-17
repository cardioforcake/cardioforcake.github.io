let city

const dayList = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
}

const dayList2 = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
}

const monthList = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
}

const dateList = {
    1: '1st',
    2: '2nd',
    3: '3rd',
    4: '4th',
    5: '5th',
    6: '6th',
    7: '7th',
    8: '8th',
    9: '9th',
    10: '10th',
    11: '11th',
    12: '12th',
    13: '13th',
    14: '14th',
    15: '15th',
    16: '16th',
    17: '17th',
    18: '18th',
    19: '19th',
    20: '20th',
    21: '21st',
    22: '22nd',
    23: '23rd',
    24: '24th',
    25: '25th',
    26: '26th',
    27: '27th',
    28: '28th',
    29: '29th',
    30: '30th',
    31: '31st',
}

initial()

function initial(){
    if(window.localStorage.getItem('current')===null){
        city = 'Vancouver'
    }else{
        city = window.localStorage.getItem('current')
    }

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=4caf66b04eb9193e2dbc363404091bf5'
    }).then(
        function(data){
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+data.coord.lat+'&lon='+data.coord.lon+'&exclude=hourly&appid=4caf66b04eb9193e2dbc363404091bf5'
            }).then(
                function(data){
                    updateCurrent(data)
                    updateDay()
                    console.log(data)
                    data.daily.forEach((day, idx)=>{
                        if(idx>0){
                            updateSky(day, idx)
                            updateTemp(day,idx)
                            updateFeel(day, idx)
                            updateWind(day, idx)
                            updateHumidity(day, idx)
                            updateRain(day,idx)
                        }
                    })
                }
            )
        },
        function(){
            console.log('fail')
        }
    )
};

$('form').on('submit', getData)
$('img').click(function(){
    $('.menu').toggleClass('hide')
})

$('.current, .invisible, .forecast, header, form').click(function(){
    $('.menu').addClass('hide')
})

$('.forecastSeven').click(function(){
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').removeClass('descFive')
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').removeClass('descThree')
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').addClass('descSeven')
    $('.invisible').addClass('hide')
    $('.forecast').removeClass('hide')
    $('.forecast').removeClass('five')
    $('.forecast').removeClass('three')
    $('.forecast').addClass('seven')
    $('.daysSelected').text('Next 7 Days')
    $('.menu').addClass('hide')
    $('.w1, .w2, .w3, .w4, .w5, .w6, .w7').removeClass('hide')
})

$('.forecastFive').click(function(){
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').removeClass('descThree')
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').removeClass('descSeven')
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').addClass('descFive')
    $('.invisible').addClass('hide')
    $('.forecast').removeClass('hide')
    $('.forecast').removeClass('seven')
    $('.forecast').removeClass('three')
    $('.forecast').addClass('five')
    $('.daysSelected').text('Next 5 Days')
    $('.menu').addClass('hide')
    $('.w1, .w2, .w3, .w4, .w5').removeClass('hide')
    $('.w6, .w7').addClass('hide')
})

$('.forecastThree').click(function(){
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').removeClass('descFive')
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').removeClass('descSeven')
    $('.descSky, .descTemp, .descFeel, .descWind, .descHumid, .descRain, .descPop').addClass('descThree')
    $('.invisible').addClass('hide')
    $('.forecast').removeClass('hide')
    $('.forecast').removeClass('five')
    $('.forecast').removeClass('seven')
    $('.forecast').addClass('three')
    $('.daysSelected').text('Next 3 Days')
    $('.menu').addClass('hide')
    $('.w1, .w2, .w3').removeClass('hide')
    $('.w4, .w5, .w6, .w7').addClass('hide')
})

$('.clear').click(function(){
    $('.invisible').removeClass('hide')
    $('.forecast').addClass('hide')
    $('.menu').addClass('hide')
})

function getData(ev){
    ev.preventDefault();
    $('.menu').addClass('hide')
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q='+$('input[type="text"]').val()+'&APPID=4caf66b04eb9193e2dbc363404091bf5'
    }).then(
        function(data){
            city = $('input[type="text"]').val()
            window.localStorage.setItem('current',$('input[type="text"]').val())
            $('input[type="text"]').val('')
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+data.coord.lat+'&lon='+data.coord.lon+'&exclude=hourly&appid=4caf66b04eb9193e2dbc363404091bf5'
            }).then(
                function(data){
                    $('.forecast').addClass('hide')
                    $('.invisible').removeClass('hide')
                    updateCurrent(data)
                    updateDay()
                    console.log(data)
                    data.daily.forEach((day, idx)=>{
                        if(idx>0){
                            updateSky(day, idx)
                            updateTemp(day,idx)
                            updateFeel(day, idx)
                            updateWind(day, idx)
                            updateHumidity(day, idx)
                            updateRain(day,idx)
                        }
                    })
                }
            )
        },
        function(){
            alert('Location not found')
            $('input[type="text"]').val('')
        }
    )
}

function updateCurrent(data){
    let newDate = new Date();
    $('.city').html(`${city[0].toUpperCase() + city.substring(1).toLowerCase()}     <span class='regularFont'>${dayList2[newDate.getDay()]}, ${monthList[newDate.getMonth()]} ${dateList[newDate.getDate()]}</span>`)
    $('.temp').text(`${(Number(data.current.temp)-273.15).toFixed(2)}°C`)
    $('.sky').text(data.current.weather[0].description)
    $('.feel').html('<span class="descCurrent">Feels Like:</span><br>'+(Number(data.current.feels_like)-273.15).toFixed(2)+'<span class="desc2">°C</span>')
    $('.wind').html('<span class="descCurrent">Wind:</span><br>'+(data.current.wind_speed*3.6).toFixed(2) + '<span class="descCurrent"> km/h</span>')
    $('.humid').html('<span class="descCurrent">Humidity:</span><br>'+data.current.humidity+'<span class="descCurrent">%</span>')
    if(!!data.current.rain){
        $('.rain').html('<span class="descCurrent">Rain:</span><br>'+data.current.rain['1h']+'<span class="descCurrent">mm</span>')
    }else{
        $('.rain').html('')
    }

}

function updateDay(){
    let newDate = new Date();
    for(let i = 1; i<8; i++){
        newDate.setDate(newDate.getDate()+1)
        $(`.w${i} > #day`).html(
            `${dayList[newDate.getDay()]}<br><span class="descCurrent">${newDate.getMonth()+1}/${newDate.getDate()}</span>`
        )
    }
}

function updateSky(day, idx){
    $(`.w${idx}> .descSky`).text(day.weather[0].description)
}

function updateTemp(day, idx){
    $(`.w${idx} > .descTemp`).html(`${(Number(day.temp.day)-273.15).toFixed(2)}<span class="desc2">°C</span>`)
}

function updateFeel(day, idx){
    $(`.w${idx}> .descFeel`).html('<span class="desc">Feels Like:</span><br>'+(Number(day.feels_like.day)-273.15).toFixed(2)+'<span class="desc2">°C</span>')
}

function updateWind(day, idx){
    $(`.w${idx}> .descWind`).html('<span class="desc">Wind:</span><br>'+(day.wind_speed*3.6).toFixed(2) + '<span class="desc">km/h</span>')
}

function updateHumidity(day, idx){
    $(`.w${idx}> .descHumid`).html('<span class="desc">Humidity:</span><br>'+day.humidity+'<span class="desc">%</span>')
}

function updateRain(day, idx){
    if(!!day.rain){
        $(`.w${idx}> .descRain`).removeClass('hide')
        $(`.w${idx}> .descPop`).removeClass('hide')
        $(`.w${idx}> .descRain`).html('<span class="desc">Rain:</span><br>'+day.rain+'<span class="desc">mm</span>')
        $(`.w${idx}> .descPop`).html('<span class="desc">P.o.P.:</span><br>'+(day.pop*100).toFixed(0)+'<span class="desc">%</span>')
    }else{
        $(`.w${idx}> .descRain`).addClass('hide')
        $(`.w${idx}> .descPop`).addClass('hide')
    }
}
