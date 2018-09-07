<template>
  <main-layout>
    <div class="centered">
      <h1 class="md-display-1" >{{ employerName }}</h1>
    </div>

    <form v-model="form" v-on:submit.prevent="() => {}">
      <md-card>
        <md-card-header class="md-title">
          Creating a new vacancy
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('title')">
            <label for="title">Vacancy title</label>
            <md-input id="title" v-model="form.title"/>
            <span class="md-error" v-if="!$v.form.title.required">
                  The title is required
                </span>
          </md-field>

          <md-field :class="getValidationClass('description')">
            <label for="description">Vacancy description</label>
            <md-textarea id="description" v-model="form.description"
                         md-autogrow></md-textarea>
            <span class="md-error" v-if="!$v.form.description.required">
                  The description is required
                </span>
          </md-field>

          <md-field :class="getValidationClass('requirements')">
            <label for="requirements">Requirements</label>
            <md-textarea id="requirements" v-model="form.requirements"
                         md-autogrow></md-textarea>
            <span class="md-error" v-if="!$v.form.requirements.required">
                  The requirements are required
                </span>
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('experience')">
                <label for="experience">Working experience</label>
                <md-select id="experience" v-model="form.experience">
                  <md-option value="0">No experience</md-option>
                  <md-option value="1-2">1-2 years</md-option>
                  <md-option value="3-4">3-4 years</md-option>
                  <md-option value="5-6">5-6 years</md-option>
                  <md-option value="7+">7 years and more</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.experience.required">
                      The experience is required
                    </span>
              </md-field>
            </div>

            <div class="md-layout-item">
              <md-field :class="getValidationClass('place')">
                <label for="place">Regions</label>
                <md-input id="place" v-model="form.place"/>
                <span class="md-error" v-if="!$v.form.place.required">
                      The region is required
                    </span>
              </md-field>
            </div>
          </div>

          <md-chips v-model="form.tags" md-placeholder="Subcategories"/>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="isSaving"/>

        <md-card-actions>
          <md-button class="md-primary" @click="validate">
            Create vacancy
          </md-button>
        </md-card-actions>

      </md-card>

      <md-snackbar :md-active.sync="isError">
        Some internal error happened and vacancy was not saved :(
      </md-snackbar>
    </form>
  </main-layout>
</template>

<script>
  import MainLayout from '../Main.vue'
  import {
    required
  } from 'vuelidate/lib/validators'
  import {validationMixin} from 'vuelidate'
  import {mapState} from 'vuex'

  export default {
    components: {
      MainLayout
    },
    mixins: [validationMixin],
    computed: mapState({
      employerName: state => (state.employerNewVacancy || {}).name,
      isSaving: state => state.isVacancySavingProcess,
      isError: state => state.isVacancySavingError
    }),
    data: () => ({
      form: {
        title: null,
        description: null,
        requirements: null,
        experience: null,
        place: null,
        tags: []
      }
    }),
    validations: {
      form: {
        title: {
          required
        },
        description: {
          required
        },
        requirements: {
          required
        },
        experience: {
          required
        },
        place: {
          required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      saveVacancy () {
        this.$store.dispatch('saveVacancy', {vacancy: this.form})
      },
      validate: function () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveVacancy()
        }
      }
    }
  }
</script>

<style>
  .centered {
    align-self: center;
    margin: 20px 0;
  }

  .md-primary {
    background-color: #F47321;
    color: #fff !important;
  }
</style>

