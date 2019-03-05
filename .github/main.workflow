workflow "Deploy to GH Docs" {
  on = "push"
  resolves = ["Deploy to Docs"]
}

action "Deploy to Docs" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BUILD_SCRIPT = "yarn && yarn build"
    FOLDER = "docs"
    BASE_BRANCH = "master"
    COMMIT_NAME = "uni sayo"
    COMMIT_EMAIL = "unibtc@gmail.com"
    BRANCH = "gh-pages"
  }
  secrets = ["ACCESS_TOKEN"]
}
