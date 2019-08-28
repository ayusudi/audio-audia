function sumInvoice (objInvoice){
    let result = 0
    for (let k in objInvoice){
        result += objInvoice[k].TotalPrice
    }
    return result
}

module.exports = sumInvoice