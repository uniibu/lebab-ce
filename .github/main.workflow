workflow "Deploy to Github Pages" {
  on = "push"
  resolves = ["Deploy to docs"]
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy to docs" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "master"
    BUILD_SCRIPT = "yarn && yarn build"
    FOLDER = "docs"
    BASE_BRANCH = "master"
    COMMIT_NAME = "uni sayo"
    COMMIT_EMAIL = "unibtc@gmail.com"
  }
  secrets = ["ACCESS_TOKEN"]
  needs = ["master branch only"]
}
