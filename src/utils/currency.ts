
//   const formatearCantidad = (cantidad) => {
//     return cantidad.toLocaleString("es-CL", {
//       style: "currency",
//       currency: "CLP",
//     });
//   };

export const format = ( value: number ) => {

    // Crear formateador
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
       // minimumFractionDigits: 2,
      //  maximumFractionDigits: 2,
    })

    return formatter.format( value ); //$2,500.00
}