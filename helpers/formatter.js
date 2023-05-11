function getCurrency(money) {
    return money.toLocaleString("id-ID", {style: "currency", currency:"IDR"}).replace("Rp", "Rp.")

}

module.exports = getCurrency