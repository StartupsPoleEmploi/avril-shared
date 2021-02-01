<template>
  <div>
    <div v-if="isAutocompleteDisabled">
      <div class="columns" v-if="type === 'address'">
        <div class="column is-12">
          <input :class="inputclass" type="text" name="street" placeholder="Adresse" :value="(value || {}).street" @input="manualEdit" />
        </div>
      </div>
      <div class="columns">
        <div class="column is-4" v-if="type === 'address'">
          <input :class="inputclass" type="text" name="postalCode" placeholder="Code postal" :value="(value || {}).postalCode" @input="manualEdit" />
        </div>
        <div class="column" :class="type === 'address' ? 'is-4' : 'is-6'">
          <input :class="inputclass" type="text" name="city" placeholder="Ville" :value="(value || {}).city" @input="manualEdit" />
        </div>
        <div class="column" :class="type === 'address' ? 'is-4' : 'is-6'">
          <CountrySelect placeholder="Pays" name="country" :value="value" :input="manualEdit" />
        </div>
      </div>
    </div>
    <div v-else>
      <Autocomplete
        auto-select
        :placeholder="placeholder"
        :aria-label="placeholder"
        :get-result-value="getResultValue"
        :search="search"
        @submit="submit"
        :default-value="addressLabelify(value)"
        :debounceTime="300"
      >
        <template v-slot:result="{ result, props }">
          <li v-bind="props" class="autocomplete-result">
            <span v-html="getHtmlResultValue(result)"></span>
          </li>
        </template>
      </Autocomplete>
    </div>
    <p v-if="!disableManualInput" class="toggler has-text-right">
      <small>
        <span v-if="isAutocompleteDisabled">
          <a @click="e => setIsAutocompleteDisabled(false)">Réactiver l'aide à la saisie</a>
        </span>
        <span v-else>
          <span v-if="type === 'city'">
            La ville n'est pas en France ?
          </span>
          <span v-else>
            L'adresse n'est pas en France ou n'est pas proposée ?
          </span>
          <a @click="e => setIsAutocompleteDisabled(true)">La saisir manuellement</a>
        </span>
      </small>
    </p>
  </div>
</template>

<script type="text/javascript">
  import {include} from '../utils/array';
  import {
    addressLabelify,
    banToAddress,
    geoTypeToBanType
  } from '../utils/geo';
  import Autocomplete from '@trevoreyre/autocomplete-vue';
  import CountrySelect from './CountrySelect';

  export default {
    components: {
      Autocomplete,
      CountrySelect,
    },
    data: function() {
      return {
        isAutocompleteDisabled: false,
      }
    },
    methods: {
      manualEdit: function(e) {
        if (e.target) {
          this.input({
            ...this.value,
            [e.target.name]: e.target.value,
            lat: null,
            lng: null,
            county: null,
          });
        } else {
          this.input({
            ...this.value,
            ...e,
            lat: null,
            lng: null,
            county: null,
          });
        }
      },
      setIsAutocompleteDisabled: function(value) {
        this.isAutocompleteDisabled = value;
      },
      search: async function(input) {
        if (input && input.replace(/[/s]/g, '').length >= 3) {
          const banFilter = geoTypeToBanType(this.type);
          const results = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${input}&${banFilter ? ('type='+banFilter) : ''}`)
          const data = await results.json();
          return data.features
            .map(result => banToAddress(this.type, result))
            .filter(r => r);
        } else {
          return [];
        }
      },
      addressLabelify,
      getResultValue: function(result) {
        return addressLabelify(result);
      },
      getHtmlResultValue: function(result) {
        return (this.getResultValue(result) || '').replace('\n', '<br />');
      },
      submit: function(result) {
        this.input(result);
      },
    },
    props: {
      input: {
        type: Function,
        required: true,
      },
      value: {
        type: Object,
      },
      placeholder: {
        type: String,
        default: 'Entrez une adresse',
      },
      type: {
        type: String,
        default: 'address',
        validator: value => include(['address', 'city'], value),
      },
      countries: {
        type: String,
        default: '',
      },
      inputclass: {
        type: String,
      },
      disableManualInput: {
        type: Boolean,
        default: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  div ::v-deep {
    .autocomplete {
      .autocomplete-result-list {
        margin: 0;
        border: 1px solid rgba(0, 0, 0, 0.12);
        padding: 0;
        box-sizing: border-box;
        max-height: 296px;
        overflow-y: auto;
        background: #fff;
        list-style: none;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
        .autocomplete-result {
          cursor: pointer;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+');
          background-repeat: no-repeat;
          background-position: 1rem center;
          padding: 1rem;
          padding-left: 3rem !important;
          &:hover, &[aria-selected="true"] {
            background-color: rgba(0, 0, 0, 0.06);
          }
        }
      }
      &[data-position="below"] .autocomplete-result-list {
        margin-top: -1px;
        border-top-color: transparent;
        border-radius: 0 0 8px 8px;
        padding-bottom: 8px;
      }

      &[data-position="above"] .autocomplete-result-list {
        margin-bottom: -1px;
        border-bottom-color: transparent;
        border-radius: 8px 8px 0 0;
        padding-top: 8px;
      }
    }
  }

  .toggler {
    margin-top: 0.5rem;
  }
</style>