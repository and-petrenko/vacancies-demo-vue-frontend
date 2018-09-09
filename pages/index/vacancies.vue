<template>
  <div>
    <div class="table">
      <div>
        <form class="filter-form" v-model="filterForm">
          <md-card>
            <md-card-content>
              <md-field>
                <label for="title">Vacancy title</label>
                <md-input id="title" v-model="filterForm.title"/>
              </md-field>

              <md-field>
                <label for="description">Vacancy description</label>
                <md-input id="description" v-model="filterForm.description"/>
              </md-field>

              <md-field>
                <label for="requirements">Requirements</label>
                <md-input id="requirements" v-model="filterForm.requirements"/>
              </md-field>

              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field>
                    <label for="experience">Working experience</label>
                    <md-select id="experience" v-model="filterForm.experience">
                      <md-option value="0">No experience</md-option>
                      <md-option value="1-2">1-2 years</md-option>
                      <md-option value="3-4">3-4 years</md-option>
                      <md-option value="5-6">5-6 years</md-option>
                      <md-option value="7+">7 years and more</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item">
                  <md-field>
                    <label for="place">Region</label>
                    <md-input id="place" v-model="filterForm.place"/>
                  </md-field>
                </div>
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-default" @click="clearFilter">
                Clear
              </md-button>
              <md-button class="md-primary" @click="applyFilter">
                Apply
              </md-button>
            </md-card-actions>

          </md-card>
        </form>
      </div>
      <div v-if="isFailed">
        <Error/>
      </div>
      <div v-else class="jobs">
        <md-list class="job-list" :md-expand-single="true">
          <md-list-item class="job-item" v-for="vacancy in vacancies" :key="vacancy.id" md-expand>
            <div class="job-header">
              <b>{{ vacancy.title }}</b>
            </div>
            <div slot="md-expand">
              <div class="job-section" v-if="vacancy.employerName">
                <b>{{ vacancy.employerName }}</b>
                <p>{{ vacancy.description }}</p>
              </div>
              <div class="job-section" v-if="vacancy.requirements">
                <b>Job Requirements:</b>
                <p>{{ vacancy.requirements }}</p>
              </div>
              <div class="job-section" v-if="vacancy.experience">
                <b>Required Experience:</b>&nbsp;{{ vacancy.experience }}&nbsp;years
              </div>
              <div class="job-section" v-if="vacancy.place">
                <b>Location:</b>&nbsp;{{ vacancy.place }}
              </div>
              <div class="job-section" v-if="vacancy.tags">
                <b>Sub Categories:</b>&nbsp;{{ vacancy.tags.join(', ') }}
              </div>
            </div>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <md-snackbar :md-active.sync="isNewVacancySaved">
      The vacancy was saved successfully!
    </md-snackbar>
  </div>
</template>

<script>
  import Error from '../Error'
  import {mapState} from 'vuex'

  const initFilterValue = {
    title: null,
    description: null,
    requirements: null,
    experience: null,
    place: null,
    tags: []
  }

  export default {
    components: {
      Error
    },
    data: () => ({
      filterForm: initFilterValue
    }),
    computed: mapState({
      vacancies: state => state.vacancies,
      isFailed: state => state.isVacanciesFailed,
      isNewVacancySaved: state => state.isVacancySavingSuccess
    }),
    methods: {
      clearFilter () {
        this.filterForm.title = null
        this.filterForm.description = null
        this.filterForm.requirements = null
        this.filterForm.experience = null
        this.filterForm.place = null
        this.filterForm.tags = []
      },
      applyFilter () {
        this.$store.dispatch('filterVacancies', this.filterForm)
      }
    }
  }
</script>

<style>
  .table {
    padding-top: 10px;
    display: flex;
  }

  .filter-form {
    width: 300px;
    margin-top: 10px;
    margin-right: 10px;
  }

  .jobs {
    width: 100%;
    margin-left: 10px;
  }

  .job-list {
    background-color: inherit !important;
  }

  .job-item {
    background-color: #FFFDE6;
    padding: 6px 12px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 0.5px 0 rgba(0,0,0,0.31);
    -moz-box-shadow: 1px 1px .5px 0 rgba(0,0,0,0.31);
    box-shadow: 1px 1px 1px 0.5px rgba(0,0,0,0.31);
  }

  .job-header {
    width: 100%;
    text-align: right;
  }

  .job-section {
    padding: 10px;
    width: 100%;
    white-space: normal;
  }
</style>
