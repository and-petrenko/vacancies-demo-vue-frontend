<template>
  <section>
    <div class="main">
      <div class="main-container">
        <div class="menu-container">
          <a class="header-link" href="https://www.drushim.co.il/" title="NAME">
            <img src="https://www.drushim.co.il/images/logo.png" alt="localhost"/>
          </a>
        </div>
        <md-menu class="menu">
          <md-button class="menu-button">
            <router-link class="link-content" to="/vacancies">
              Vacancies
            </router-link>
          </md-button>

          <md-button class="menu-button">
            <router-link class="link-content" to="/employers">
              Employers
            </router-link>
          </md-button>
        </md-menu>

        <slot></slot>
      </div>
    </div>
  </section>
</template>

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

  .link-content {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
</style>
