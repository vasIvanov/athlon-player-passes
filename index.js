const passes = [
  {
    result: 'incomplete',
    receiver: 'Demaryius Thomas',
    distance: 0.7
  },
  {
    result: 'complete',
    receiver: 'Tim Patrick',
    distance: 0.9
  },
  {
    result: 'complete',
    receiver: 'Demaryius Thomas',
    distance: 0.3
  },
  {
    result: 'incomplete',
    receiver: 'Tim Patrick',
    distance: 0.9
  },
  {
    result: 'incomplete',
    receiver: 'Tim Patrick',
    distance: 0.8
  },
  {
    result: 'complete',
    receiver: 'Demaryius Thomas',
    distance: 0.1
  },
  {
    result: 'interception',
    receiver: 'Demaryius Thomas',
    distance: 0.4
  }
]

const determineLongerPass = (passes) => {
  let longDistancePass = {}
  passes.forEach((pass) => {
    if (pass.result === 'complete') {
      if (Object.keys(longDistancePass).length === 0) {
        longDistancePass.player = pass.receiver
        longDistancePass.value = pass.distance
      } else if (longDistancePass.value < pass.distance) {
        longDistancePass.player = pass.receiver
        longDistancePass.value = pass.distance
      }
    }
  })
  return longDistancePass
}

const determineMostCompletePercentage = (passes) => {
  let playerPasses = passes.reduce((obj, pass) => {
    if (obj[pass.receiver] && obj[pass.receiver][pass.result]) {
      obj[pass.receiver][pass.result] += 1
    }

    if (!obj[pass.receiver]) {
      obj[pass.receiver] = {
        ...obj[pass.receiver],
        [pass.result]: 1
      }
    }

    if (!obj[pass.receiver][pass.result]) {
      obj[pass.receiver] = {
        ...obj[pass.receiver],
        [pass.result]: 1
      }
    }

    return obj
  }, {})

  let mostCompletePercentage = {
    player: '',
    value: 0
  }
  for (const key in playerPasses) {
    let complete = 0
    let notComplete = 0
    for (const passesKey in playerPasses[key]) {
      if (passesKey === 'complete') {
        ++complete
      } else {
        ++notComplete
      }
    }
    const percentage = (complete / (complete + notComplete)) * 100
    if (mostCompletePercentage.value < percentage) {
      mostCompletePercentage.player = key
      mostCompletePercentage.value = percentage
    }
  }
  mostCompletePercentage.value = `${mostCompletePercentage.value}%`
  return mostCompletePercentage
}

const mostCompletePercentage = determineMostCompletePercentage(passes)
const longDistancePass = determineLongerPass(passes)

console.log(mostCompletePercentage)
console.log(longDistancePass)
