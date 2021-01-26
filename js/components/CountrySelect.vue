<template>
  <div class="select is-large">
    <select :name="name" @change="inputWrapper">
      <option value="" disabled>{{placeholder}}</option>
      <option v-for="country in countries" :value="country.code" :selected="isSelected(country)">{{country.name}}</option>
    </select>
  </div>
</template>

<script>
  import sortBy from 'lodash.sortby';
  import countries from '../constants/countries.js'

  export default {
    data: function() {
      return {
        countries: sortBy(countries, c => c.name),
      }
    },
    methods: {
      isSelected: function(country) {
        console.log(this.value, country, this.value && this.value.code === country.code);
        return this.value && this.value.countryCode === country.code;
      },
      inputWrapper: function(e) {
        const country = countries.find(c => e.target && (e.target.value === c.code));
        console.log(country)
        if (country) {
          this.input({
            country: country.name,
            countryCode: country.code,
          })
        }
      },
    },
    props: {
      name: String,
      placeholder: String,
      input: {
        type: Function,
        required: true,
      },
      value: {
        type: Object,
        required: true,
      }
    }
  }
</script>
