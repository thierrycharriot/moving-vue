<template>
  <div :class="this.class">
    <label class="field__label label-custom">{{ label }}</label>
    <input
      v-if="this.type !== 'textarea'"
      class="field__input custom-input-search"
      :class="this.inputClass"
      :type="type"
      :placeholder="placeholder"
      v-model="val"
      @keyup="handleChange"
    />

    <textarea
      v-if="this.type === 'textarea'"
      class="field__input custom-input-search"
      :class="this.inputClass"
      :type="type"
      :placeholder="placeholder"
      v-model="val"
      @keyup="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: String,
    name: String,
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    class: {
      type: String,
      default: "field",
    },
    inputClass: {
        type: String,
    },
    defaultValue: {
      type: String,
      default: ''
    },
    updated: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      val: ""
    };
  },
  methods: {
    handleChange: function () {
      this.$emit("onValueChange", { name: this.name, value: this.val });
    },
  },
  mounted () {
    if (this.defaultValue) {
      this.val = this.defaultValue
      this.$emit("onValueChange", { name: this.name, value: this.val });
    }
  },
  updated () {
    if (this.updated.length > 0) {
      this.val = this.updated
      this.$emit("onValueChange", { name: this.name, value: this.val });
    }
  }
};
</script>

<style>
</style>