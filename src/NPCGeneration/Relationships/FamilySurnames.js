// TODO test matrilineal marriages
setup.marriageIsMatrilineal = marriage => {
  return false
}

// Given a marriage with at least one child, determine parent surnames
setup.getParentSurnames = marriage => {
  let familyName, fatherSurname, motherSurname
  if (marriage.children.length) {
    familyName = State.variables.npcs[marriage.children[0]].lastName
    fatherSurname = familyName
    motherSurname = undefined
    if (setup.marriageIsMatrilineal(marriage)) {
      [fatherSurname, motherSurname] = [motherSurname, fatherSurname]
    }
  }
  return { fatherSurname, motherSurname }
}

// Given a marriage with at least one parent or child, determine child surnames
setup.getChildSurname = marriage => {
  if (marriage.children.length !== 0) { return State.variables.npcs[marriage.children[0]].lastName }

  if (marriage.parents.length === 0) return undefined

  const familyGender = setup.marriageIsMatrilineal(marriage) ? 'woman' : 'man'
  const maidenGender = lib.genderData[familyGender].oppositeGender

  let head = marriage.parents.find((key) => State.variables.npcs[key].gender === familyGender)
  console.log(head)
  if (head) return State.variables.npcs[head].lastName

  head = marriage.parents.find((key) => State.variables.npcs[key].gender === maidenGender)
  console.log(head)
  if (head) return State.variables.npcs[head].lastName

  return undefined
}
