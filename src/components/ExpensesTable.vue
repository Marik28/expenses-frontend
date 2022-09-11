<template>
  <div>
    <table class="table table-hover table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Дата</th>
          <th>Сумма</th>
          <th>Категория</th>
          <th>Комментарий</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="expense of expenses" :key="expense.id">
          <tr :title="expense.comment || 'Нет комментария'">
            <td>{{ expense.date }}</td>
            <td>{{ -expense.amount }}</td>
            <td>{{ expense.category.name }}</td>
            <td>{{ expense.comment }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ExpensesTable",
  props: {
    expenses: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>
