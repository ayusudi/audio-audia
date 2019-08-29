function sumItemById(data) {
    let Items = {}
    let label = []
    let values = []
    for (let k in data) {
        Items[data[k].name] = 0
        label.push(data[k].name)
        console.log(data[k].name);
    }
    for (let k in Items) {
        for (let j in data) {
            if (data[j].name === k) {
                if (data[j].Transactions.length < 1) {
                    Items[k] = 0
                }
                else {
                    data[j].Transactions.forEach(el => {
                        Items[k] += el.TotalItems
                    });
                }
            };
        }
    }
    for (let key in Items) {
        values.push(Items[key])
    }
    let result = {
        label : label,
        values : values
    }
    return result
}

module.exports = sumItemById