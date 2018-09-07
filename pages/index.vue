<template>
  <div>
    <Vacancies/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vacancies from './Vacancies'
  export default {
    components: {
      Vacancies
    },
    beforeCreate () {
      this.$store.dispatch('fetchEmployers')
      this.$store.dispatch('fetchVacancies')
    }
  }
</script>

