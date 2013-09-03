var batchArray = []

var Batch = function(batch_type, bake_time){
  this.batch_type = batch_type
  this.bake_time = bake_time
  this.doneness = function(doneness){
    this.status = doneness || "raw"
  }
}

var prepTable = {
  append: function(batch) {
    batchArray.push(batch)
    $('#prep_batches').append("<li>"+batch.batch_type+ "<button type='button',\
      id='add_to_oven'> Add to Oven</button></li>")
  }
}

var addToOven = {
  init: function() {
    $('#prep_batches').on("click", "#add_to_oven", function(){
      alert('Cookie time motherfucker!')
      var indexPosition = $(this).index()
      var cookie = batchArray[indexPosition]
      oven.rackArray.push(cookie)
      batchArray.splice(indexPosition, 1)
      $(this).closest('li').remove()
      var rack = $('td:contains("[empty]")').first()
      // rack.html(cookie.batch_type + " " + cookie.status)
      // rack.css({"background-color": "red", "color": "white"})
      cookieStatus.update(rack, cookie)
    }) 
  }
}

var cookieStatus = {
  update: function(rack, cookie){
    rack.html(cookie.batch_type + " " + cookie.status)
    rack.css({"background-color": "red", "color": "white"})}
}

var oven = {
  rackArray: [],
  timeBaked: 0,
  bake: function(){
    $("#bake").on('click', function(){
      oven.timeBaked += 1
      for (var i = 0; i < oven.rackArray.length; i++){
        cookie = oven.rackArray[i]
        rack = $('#oven').find("tr:nth-child(i + 1)")
        if ( oven.timeBaked > cookie.bake_time){
          cookie.doneness("crispy")
        }
        else if (oven.timeBaked == cookie.bake_time){
          cookie.doneness("just_right")
        }
        else {
          cookie.doneness("still_gooey")
        }
      }
    })
  }
}

var bakeryForm = {
  get: function() {
    $("#new_batch").on("submit", function(e){
      e.preventDefault();
      var type = $(this).find("input[name=batch_type]").val()
      var time = $(this).find("input[name=bake_time]").val()
      batch = new Batch(type, time)
      batch.doneness()
      prepTable.append(batch)
    })
  }
}

$(document).ready(function() {
  bakeryForm.get()
  addToOven.init()
  oven.bake()
});
