workflow "Deploy to Github Pages" {
  on = "push"
  resolves = ["Deploy to gh-pages"]
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy to gh-pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "master"
    BUILD_SCRIPT = "yarn && yarn build"
    FOLDER = "docs"
  }
  secrets = ["ACCESS_TOKEN"]
  needs = ["master branch only"]
}
