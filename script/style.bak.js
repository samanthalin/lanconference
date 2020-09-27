<br />
<b>Notice</b>:  Undefined index: js in <b>/data/wwwroot/mooo.work/bookingcalendar/filemanager.php</b> on line <b>2894</b><br />
$(document).ready(function () {
  const username = 'TR4D-83VV-J0EL-BELI'
//   console.log = function() {}
  const url= "https://lanconference.de/wp-json/frm/v2/entries"
  // Image Gallery
  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
  })
  //menu
  $('.hamburger').click(function () {
    $(this).toggleClass('open')
    //$('#mobile-menu-content').toggleClass('show');
  })
  $('#mobile-menu-content a[href="#mobile-submenu-product"]').click(
    function () {
      $(this).find('.fa-angle-down').toggleClass('up')
    }
  )

  let homeInquery = $('#inqueryHomeSubmit')
  console.log(homeInquery)
  if (homeInquery !== undefined) {
    let inqueryData = {
      '8': '',
      '9': '',
      '10': '',
      '11': '',
      '12': '',
      '13': '',
      '14': '',
      '15': '',
      '17': '',
      form_id: '1',
    }
    let inqueryType = $('#inqueryType')
    let inqueryPerson = $('#inqueryPerson')
    let inquerydateTime = $('#inquerydateTime')
    let inqueryOther = $('#inqueryOther')
    let inqueryFirstName = $('#inqueryFirstName')
    let inqueryLastName = $('#inqueryLastName')
    let inqueryEmail = $('#inqueryEmail')
    let inqueryTel = $('#inqueryTel')
    let inqueryMessage = $('#inqueryMessage')
    let btnInquerySubmit = $('#inqueryHomeSubmit')

    btnInquerySubmit.click((event) => {
      event.preventDefault()

      inqueryData['8'] = inqueryType.val()
      inqueryData['9'] = inqueryPerson.val()
      inqueryData['10'] = inquerydateTime.val()
      inqueryData['11'] = inqueryOther.val()

      inqueryData['12'] = inqueryFirstName.val()

      inqueryData['13'] = inqueryLastName.val()

      inqueryData['14'] = inqueryEmail.val()

      inqueryData['15'] = inqueryTel.val()
      inqueryData['17'] = inqueryMessage.val()

      if (inqueryData['10'] === '') alert('Date Time cannot be blank')
      else if (inqueryData['11'] == '') alert('Other cannot be blank')
      else if (inqueryData['12'] === '') alert('FirstName cannot be blank')
      else if (inqueryData['13'] === '') alert('LastName cannot be blank')
      else if (inqueryData['14'] === '') alert('Email cannot be blank')
      else if (inqueryData['15'] === '') alert('Telephone cannot be blank')
      else if (inqueryData['17'] === '') alert('Message cannot be blank')
      else {
        $('#inqueryHomeSubmit')[0].innerHTML = 'Please wait..'
        $('#inqueryHomeSubmit').attr('disabled', true)
        $('#inqueryHomeSubmit').attr(
          'style',
          'background-color: grey !important'
        )
        let password = ':x'
        let authString = `${username}:${password}`
        fetch("https://lanconference.de/wp-json/frm/v2/entries", {
          method: 'POST', // or 'PUT'
          mode: 'cors',
          headers: new Headers({
            Authorization: 'Basic ' + btoa(authString),
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(inqueryData),
        })
          .then((response) => {
            console.log(authString, JSON.stringify(inqueryData))
            console.log(response)
            if (response.status == 200) {
              return response.json()
            } else {
              $('#inqueryHomeSubmit')[0].innerHTML =
                'Something wrong, please refresh'
              alert('Something wrong, please refresh')
              throw new Error(response.status)
            }
          })
          .then((data) => {
            $('#index form').hide()
            $('#index .message').show()
            $('html, body').scrollTop($('#index .inquery').offset().top)
            console.log('Success:', data)
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }
    })
  }

  //// END Homepage Inquery Area

  //// Inquery Page Area
  // inquery
  let inqueryData = {
    '8': '',
    '9': '',
    '10': '',
    '11': '',
    '12': '',
    '13': '',
    '14': '',
    '15': '',
    '17': '',
    form_id: '1',
  }
  let inqueryType = $('#inqueryType')
  let inqueryPerson = $('#inqueryPerson')
  let inquerydateTime = $('#inquerydateTime')
  let inqueryOther = $('#inqueryOther')
  let inqueryFirstName = $('#inqueryFirstName')
  let inqueryLastName = $('#inqueryLastName')
  let inqueryEmail = $('#inqueryEmail')
  let inqueryTel = $('#inqueryTel')
  let inqueryMessage = $('#inqueryMessage')
  let btnInquerySubmit = $('#inquerySubmit')

  btnInquerySubmit.click((event) => {
    event.preventDefault()

    inqueryData['8'] = inqueryType.val()
    inqueryData['9'] = inqueryPerson.val()
    inqueryData['10'] = inquerydateTime.val()
    inqueryData['11'] = inqueryOther.val()

    inqueryData['12'] = inqueryFirstName.val()

    inqueryData['13'] = inqueryLastName.val()

    inqueryData['14'] = inqueryEmail.val()

    inqueryData['15'] = inqueryTel.val()
    inqueryData['17'] = inqueryMessage.val()

    if (inqueryData['10'] === '') alert('Date Time cannot be blank')
    else if (inqueryData['11'] == '') alert('Other cannot be blank')
    else if (inqueryData['12'] === '') alert('FirstName cannot be blank')
    else if (inqueryData['13'] === '') alert('LastName cannot be blank')
    else if (inqueryData['14'] === '') alert('Email cannot be blank')
    else if (inqueryData['15'] === '') alert('Telephone cannot be blank')
    else if (inqueryData['17'] === '') alert('Message cannot be blank')
    else {
      $('#inquerySubmit')[0].innerHTML = 'Please wait..'
      $('#inquerySubmit').attr('disabled', true)
      $('#inquerySubmit').attr('style', 'background-color: grey !important')
      // console.log(JSON.stringify(inqueryData));
      let password = ':x'
      let authString = `${username}:${password}`
      // console.log(authString)
      $('#inquerySubmit').attr('disabled', true)
      fetch("https://lanconference.de/wp-json/frm/v2/entries", {
        method: 'POST', // or 'PUT'
        mode: 'cors',
        headers: new Headers({
          Authorization: 'Basic ' + btoa(authString),
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(inqueryData),
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json()
          } else {
            $('#inquerySubmit')[0].innerHTML = 'Something wrong, please refresh'
            alert('Something wrong, please refresh')
            throw new Error(response.status)
          }
        })
        // .then(response => res.json())
        .then((data) => {
          $('#inquery form').hide()
          $('#inquery .message').show()
          window.scrollTo(0, 0)
          console.log('Success:', data)
        })
        .catch((error) => {
          // $('#inquerySubmit').attr('disabled', false);
          console.error('Error:', error)
        })
    }
  })
  ////END  Inquery Page Area

  // Disable product Extras price label
  $('span.wcpa_priceouter').hide()

  //shopping cart
  //--q1
  $('#shoppingCart .q1 .option').click(function () {
    $(this).siblings().removeClass('selected')
    $(this).toggleClass('selected')
  })
  //--q3
  $('#shoppingCart .q3 .option').click(function () {
    $(this).toggleClass('selected')
  })
  //--submit
  $('#shoppingCart .information .button').click(function () {
    $('#shoppingCart .main').hide()
    $('#shoppingCart .message').show()
    window.scrollTo(0, 0)
    return false
  })

  // Gallery Page
  let imgs = document.querySelectorAll('.grid-item img')
  // console.log(imgs[0].id = "AAA")
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].id = `img${i}`
  }
  let grid = $('.grid').masonry()
  grid.imagesLoaded().progress(function () {
    grid.masonry('layout')
  })

  var modalImg = document.querySelector('.modal-content')
  var modal = document.getElementById('myModal')
  // console.log(modalImg)
  grid.on('click', (e) => {
    //console.log(e.target.src)
    modalImg.id = e.target.id
    // console.log("modalImg id:",modalImg.id)
    // var img = document.getElementById(e.target.id);

    modal.style.display = 'block'

    modalImg.src = e.target.src

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0]

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = 'none'
    }
  })

  //footer
  var currentYear = new Date().getFullYear()
  $('.current-year').text(new Date().getFullYear())

  // Product extra plugin
  // let a = document.querySelector('.wcpa_price_summary')
  // a.style.display = "block";
  var amountAPrice
  let summaryDiv = document.querySelector('.summary')
  let bookingInfoWrapper = document.querySelector('.booking-info-wraper')

  var extraPrice = document.querySelector('#price_value1')

  // let extraPriceData = extraPrice.firstChild.data

  summaryDiv.innerHTML = ''
  summaryDiv.innerHTML = `
<div class="wcpa_price_summary " style="display: block;">
            <p >Order summary  - included VAT 16% </p>
            <ul>
            <li class="wcpa_options_total"> <span> Booking cost: </span> 
            <span class="wcpa_price_outer">
                    <span class="wcpa_price">
                    <span class="woocommerce-Price-currencySymbol">€</span>
                        <span class="booking_price_value">0.00</span>
                    </span>
                </span>
            </li>
            <li class="wcpa_options_total">
                <span>Extras: </span> 
                <span class="wcpa_price_outer">
                    <span class="wcpa_price">
                    <span class="woocommerce-Price-currencySymbol">€</span>
                        <span class="price_value price_value11" id="price_value1" >0.00</span>
                    </span>
                </span>
            </li>
            <li class="wcpa_options_total">
                <span>Total: </span> 
                <span class="wcpa_price_outer">
                    <span class="wcpa_price">
                    <span class="woocommerce-Price-currencySymbol">€</span>
                        <span class="total_price_value">0.00</span>
                    </span>
                </span>
            </li> 
            </ul>
</div>
`

  bookingInfoWrapper.onchange = function () {
    let amountA = document.getElementsByTagName('bdi')
    let b = amountA[0].textContent
    let bookingPrice = document.querySelector('.booking_price_value')
    amountAPrice = Number(b.slice(1, b.length, -1))
    bookingPrice.innerHTML = amountAPrice.toFixed(2)

    let exPrice = getExtraPrice()

    let totalPrice = document.querySelector('.total_price_value')
    totalPrice.innerHTML = (amountAPrice + exPrice).toFixed(2)
    // console.log(amountAPrice, exPrice)
  }

  // https://stackoverflow.com/questions/39221775/trigger-for-span-text-html-on-changed
  $('.price_value11').on('DOMSubtreeModified', function () {
    let amountA = document.getElementsByTagName('bdi')
    let b = amountA[0].textContent
    let bookingPrice = document.querySelector('.booking_price_value')
    amountAPrice = Number(b.slice(1, b.length, -1))
    bookingPrice.innerHTML = amountAPrice.toFixed(2)
    let totalPrice = document.querySelector('.total_price_value')
    totalPrice.innerHTML = (amountAPrice + getExtraPrice()).toFixed(2)
  })

  function getExtraPrice() {
    // console.log(document.querySelector('#price