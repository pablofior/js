exports.hasNext = toValidate => {
  return Boolean(toValidate.arr[toValidate.index++])
}

exports.hasPrevious = toValidate => {
  return Boolean(toValidate.arr[toValidate.index--])
}

exports.isEqualToPrevious = toValidate => {
  const previousIndex = toValidate.index--
  return (
    toValidate.arr[previousIndex] &&
    toValidate.curr === toValidate.arr[previousIndex]
  )
}

exports.isEqualToNext = toValidate => {
  const nextIndex = toValidate.index++
  return (
    toValidate.arr[nextIndex] && toValidate.curr === toValidate.arr[nextIndex]
  )
}

exports.not = code => !code

exports.equals = async (...args) => {
  if (args.length === 0)
    throw new Error('"args" Array must be Array.length > 0')

  if (!args || !Array.isArray(args)) throw new Error('"args" must be an Array')

  if (args.length === 1 && Array.isArray(args[0])) {
    args = args[0]
  }

  for ([index, item] of args.entries()) {
    
    const toValidate = { index, arr, curr }

    const hasNext = await this.hasNext(toValidate)

    const isNextOk = hasNext && await this.isEqualToNext(toValidate)

    const hasPrev = await this.hasPrevious(toValidate)

    const isPrevOk = hasPrev && await this.isEqualToPrevious(toValidate)

    console.log('-------------------------------------')
    console.log(`acc: ${await acc}`)
    console.log(`index: ${index}`)
    console.log(`curr: ${curr}`)
    console.log(`hasPrev: ${hasPrev}`)
    console.log(`prev: ${arr[index--]}`)
    console.log(`hasNext: ${hasNext}`)
    console.log(`next: ${arr[index++]}`)
    console.log('-------------------------------------')
    
    if (!hasNext) {
      console.log(`nao tem next, isPrevOk? : ${isPrevOk}`)
      return await isPrevOk ? (acc = curr) : false
    }

    if (!hasPrev) {
      console.log(`nao tem prev, isNextOk? : ${isNextOk}`)
      return await isNextOk ? (acc = curr) : false
    }

    if (await isNextOk && await isPrevOk) {
      console.log(`tem prev e next, is ambos Ok? : ${isNextOk && isPrevOk}`)
      return (acc = curr)
    }

    arr.splice(1)
  }, true)
}

exports.different = (...args) => this.not(this.equal(args))
