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
      batchArray.splice(indexPosition, 1)
      $(this).closest('li').remove()
      var rack = $('td:contains("[empty]")').first()
      rack.html(cookie.batch_type + " " + cookie.status).css
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
});
