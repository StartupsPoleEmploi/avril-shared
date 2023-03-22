<template>
  <input
    type="date"
    v-bind="$attrs"
    @input="onInput"
    :value="dateString"
    @click="openCalendar"
  />
</template>

<script type="text/javascript">
  import { parseISODate, formatISODate } from '../utils/time';
  import {isString, isDate} from '../utils/boolean';
  export default {
    computed: {
      dateString() {
        try {
          return isDate(this.value) ? formatISODate(this.value) : `${this.value}` ;
        } catch(err) {
          console.error(err);
          return '';
        }
      },
    },
    methods: {
      onInput(e) {
        const newDate = parseISODate(e.target.value);
        if (newDate) {
          this.$emit('input', newDate)
        }
      },
      openCalendar() {
        if (this.$el.showPicker) {
          this.$el.showPicker();
        }
      },
    },
    // TODO: forward refs
    // TODO: Add disabled Dates? :disabled-date="maxDate"
    // TODO: Add default-panel="year"
    // TODO: Show placeholder?
    props: {
      value: {
        type: [Date, String],
      },
      disabledDate: {
        type: Function,
      },
      defaultPanel: {
        type: String,
      },
    }
  }
</script>