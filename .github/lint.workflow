workflow "Lint on push" {
  on = "push"
  resolves = ["Lint"]
}

action "Install Dependencies" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Lint" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Install Dependencies"]
  args = "lint"
}
