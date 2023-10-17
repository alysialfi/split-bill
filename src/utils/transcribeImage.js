const patterns = {
    priceList: /([\w|\d+]+x|x|X)\s+(.*)\s+(\d+\.\d+|\d+)/,
    additionalCost: /(\w+\s+fee)+(\s|\d|\d+\.\d+)+(\s|\d+\.\d+)/,
    disc: /(.+)\s+(-\d+\.\d+)/,
    total: /(Total)\s+Rp+(\d+\.\d+)/,
    subTotal: /(Subtotal)\s+Rp+(\d+\.\d+)/
}

export const states = {
    priceList: [],
    additionals: [],
    disc: [],
    subTotal: 0,
    total: 0,
    additionalTotal: 0
}

export function transcribeImage(text) {
    console.log(text);
    const rawPriceList = text.split(/\r?\n/)
    rawPriceList.forEach((pl) => {
        const priceListMatches = pl.match(patterns.priceList);
        if (priceListMatches) {
            const obj = {
                quantity: parseInt(priceListMatches[1].replace(/x/g, '')),
                item: priceListMatches[2],
                price: parseInt(priceListMatches[3].replace(/\./g, '')),
                pricePerItem: 0,
                finalPrice: 0,
            }
            obj.quantity = isNaN(obj.quantity) ? 1 : obj.quantity
            obj.pricePerItem = obj.price / obj.quantity
            states.priceList.push(obj)
        }

        const discMatches = pl.match(patterns.disc);
        if (discMatches) {
            const obj = {
                plan: discMatches[1],
                disc: parseInt(discMatches[2].replace(/[-.]/g, ''))
            }
            states.disc.push(obj)
        }

        const additionalCostMatches = pl.match(patterns.additionalCost);
        if (additionalCostMatches) {
            const obj = {
                tag: additionalCostMatches[1],
                price: parseInt(additionalCostMatches[3].replace(/\./g, ''))
            }
            // const getOngkirDisc = states.disc.find((disc) => disc.plan.indexOf('Ongkir'))
            // obj.price = 
            states.additionals.push(obj)
        }

        const totalMatches = pl.match(patterns.total);
        if (totalMatches) {
            states.total = parseInt(totalMatches[2].replace(/[.]/g, ''))
        }

        const subTotalMatches = pl.match(patterns.subTotal);
        if (subTotalMatches) {
            states.subTotal = parseInt(subTotalMatches[2].replace(/[.]/g, ''))
        }
    });
}