module.exports = (doc, userInfos) => {
    doc
        .fontSize(18)
        .text('Detalii utlizator:', 50, 180)
        .fontSize(12)
        .text(`Nume: ${userInfos.lastName}`, 50, 200)
        .text(`Prenume: ${userInfos.firstName}`, 50, 215)

        .text(`Email: ${userInfos.email}`, 300, 200)
        .text(`Rol: ${userInfos.role}`, 300, 215)
        .moveDown();
}