import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  employers: [],
  vacancies: [],
  isEmployersFailed: false,
  isVacanciesFailed: false,
  employerNewVacancy: null,
  isVacancySavingProcess: false,
  isVacancySavingSuccess: false,
  isVacancySavingError: false
}

const actions = {
  fetchEmployers ({commit}) {
    axios
      .get('http://localhost:4321/employers')
      .then(result => commit('setEmployers', result.data))
      .catch(() => commit('setEmployersError', true))
  },
  fetchVacancies ({commit}) {
    axios
      .get('http://localhost:4321/vacancies')
      .then(result => commit('setVacancies', result.data))
      .catch(() => commit('setVacanciesError', true))
  },
  createVacancyFor ({commit}, {item}) {
    commit('createVacancyFor', item)
  },
  saveVacancy ({commit}, {vacancy}) {
    commit('isVacancySaving', true)
    axios
      .post('http://localhost:4321/vacancies', {body: {...vacancy, employerId: this.state.employerNewVacancy.id}})
      .then(() => this.$router.push('/vacancies'))
      .then(() => commit('isVacancySavedSuccessfully', true))
      .then(() => window.setTimeout(() => commit('isVacancySavedSuccessfully', false), 2000))
      .catch(() => commit('isVacancySavingError'))
  }
}

const mutations = {
  setEmployers (state, employers) {
    state.employers = employers
    state.isEmployersFailed = false
  },
  setEmployersError (state, value) {
    state.isEmployersFailed = value
  },
  setVacancies (state, vacancies) {
    state.vacancies = vacancies
    state.isVacanciesFailed = false
  },
  setVacanciesError (state, value) {
    state.isVacanciesFailed = value
  },
  createVacancyFor (state, employer) {
    state.employerNewVacancy = employer
  },
  isVacancySaving (state, value) {
    state.isVacancySavingProcess = value
  },
  isVacancySavedSuccessfully (state, value) {
    state.isVacancySavingProcess = false
    state.isVacancySavingSuccess = value
    state.isVacancySavingError = false
  },
  isVacancySavingError (state) {
    state.isVacancySavingProcess = false
    state.isVacancySavingError = true
    state.isVacancySavingSuccess = false
  }
}

export default () => new Vuex.Store({
  state,
  mutations,
  actions
})
