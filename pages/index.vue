<template>
  <section>
    <div class="main">
      <div class="main-container">
        <div class="menu-container">
          <a class="header-link" href="https://www.drushim.co.il/" title="NAME">
            <img src="https://www.drushim.co.il/images/logo.png"
                 alt="localhost"/>
          </a>
        </div>
        <md-menu class="menu">
          <md-button class="menu-button" v-on:click="vacancyShow">Вакансии</md-button>
          <md-button class="menu-button" v-on:click="employerShow">Работодатели</md-button>
        </md-menu>
        <div v-show="isVacancyEnable">
          <div class="centered">
            <h1 class="md-display-1">
              Company name here
            </h1>
          </div>
        </div>
        <div class="table" v-show="isEmployerEnable">
          <md-table v-model="employers" md-card>
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
              <md-table-cell md-label="№" md-numeric>{{ item.id }}</md-table-cell>
              <md-table-cell md-label="Логотип"><img :src="item.logo" :alt="item.alt"
                                                     style="width: 200px; height: 41px;"/></md-table-cell>
              <md-table-cell md-label="Название" style="height: 80px;">{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Действия">
                <md-button class="md-raised" v-on:click="addVacancy(item)">Добавить вакансию</md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import Form from 'vue-material'

  export default {
    components: {
      Logo,
      Form
    },
    data: () => ({
      selected: {},
      menuVisible: false,
      form: {
        vacancyName: null,
        vacancyDescription: null
      },
      employers: [
        {
          id: 1,
          logo: 'https://www.drushim.co.il/images/logo.png',
          alt: 'localhost',
          name: 'Drushim'
        },
        {
          id: 2,
          logo: 'http://profitsoft.ua/static/app/img/logo.png',
          alt: 'localhost',
          name: 'ProfITsoft'
        }
      ],
      isEmployerEnable: false,
      isVacancyEnable: true
    }),
    methods: {
      vacancyShow: function () {
        this.isVacancyEnable = true
        this.isEmployerEnable = false
      },
      employerShow: function () {
        this.isVacancyEnable = false
        this.isEmployerEnable = true
      },
      getClass: ({id}) => ({
        'md-primary': id === 2,
        'md-accent': id === 1
      }),
      addVacancy: function (item) {
        alert('id: ' + item.id + ', name: ' + item.name)
      }
    }
  }
</script>

<style>
  .main {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #f2f2f2;
    justify-content: center;
  }

  .main-container {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .menu-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 15px;
  }

  .menu {
    background-color: #ffffff;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu-button {
    height: 100%;
    width: 50%;
  }

  .centered {
    align-self: center;
    margin: 20px 0;
  }

  .table {
    padding-top: 10px;
  }
</style>
