$(document).ready(function(){
  var countryOptions = '';
  var stateOptions = '';
  var cityOptions = '';

  $.getJSON('countries.json', function(data){
    countryOptions += '<option value="">Select country</option>';
    $.each(data, function(key, country){
      countryOptions += '<option value="'+country.id+'">'+country.name+'</option>';
    });
    $('#country').html(countryOptions);
  });

  $(document).on('change', '#country', function(){

    var country_id = $(this).val();
    if(country_id != '')
    {
      $.getJSON('states.json', function(data){
        stateOptions = '<option value="">Select state</option>';
        $.each(data, function(key, state){
          if(country_id == state.country_id)
          {
            stateOptions = '<option value="'+state.id+'">'+state.name+'</option>';
          }
        });
        $('#state').html(stateOptions);
      });
    }
    else
    {
       $('#state').html('<option value="">Select state</option>');
       $('#city').html('<option value="">Select city</option>');
    }
  });

  $(document).on('change', '#state', function(){
    var state_id = $(this).val();
    if(state_id != '')
    {
      $.getJSON('cities.json', function(data){
        cityOptions = '<option value="">Select city</option>';
        $.each(data, function(key, city){
          if(state_id == city.state_id)
          {
            cityOptions = '<option value="'+city.id+'">'+city.name+'</option>';
          }
        });
        $('#city').html(cityOptions);
      });
    }
    else
    {
       $('#city').html('<option value="">Select city</option>');
    }
  });
});
