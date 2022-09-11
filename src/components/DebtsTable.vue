<template>
  <p v-for="debt of debts" :key="debt.id">
    {{ debt }}
  </p>
</template>

<script>
export default {
  props: {
    debts: {
      type: Array,
      required: false,
      default: null,
    },
  },
};
</script>
