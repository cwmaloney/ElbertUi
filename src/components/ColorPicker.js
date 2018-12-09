"use strict";

const ColorPicker = {
  name: 'color-picker',

  props: {
    value: {
      type: String,
      required: true
    },
    cssClass: {
      type: String,
      default: "form-control"
    }
  },
  data() {
    return {
      colorNames: colorNames
    };
  },

  computed: {
   },

  methods: {
    onChange: function(newValue) {
      // console.log('ColorPicker onChange() value=' + newValue);
      this.$emit('input', newValue);
    }
  },

  template: `
    <select class="hl-colorPicker" :class="cssClass"
            v-bind:value="value"
            v-on:change="onChange($event.target.value)">

      <option v-for="colorName in colorNames">{{colorName}}</option>

      {{value}}

    </select>
  `
}
