function like(data) {
    if (data.classList == "good") {
        data.src = "./src/good-fill.svg"
        data.classList = "good-fill"
    } else {
        data.src = "./src/good.svg"
        data.classList = "good"
    }
}
