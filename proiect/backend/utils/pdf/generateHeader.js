module.exports = (doc) => {
    doc
        .fontSize(30)
        .fillColor("#444444")
        .text("Colr", 50, 57)
        .fontSize(12)
        .text("Proiect Tw", 50, 90)
        .fontSize(10)
        .text("Facultatea de Informatica Iasi", 200, 65, { align: "right" })
        .text("Univeristatea Alexandru Ioan Cuza", 200, 80, { align: "right" })
        .moveDown();
}