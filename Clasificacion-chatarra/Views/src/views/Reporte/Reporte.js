import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Reporte({setmodalreport}) {
    return (
      <div className="reporte">
        <div className="reporte-box">
          <span className="close-icon" onClick={() =>{setmodalreport(false)}}>
            x
          </span>
          <Table className="reporte-tabla" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="reporte-header" style={{ paddingRight: '0px' }}>
                  Fabricación
                </TableCell>
                <TableCell className="reporte-header">Material</TableCell>
                <TableCell
                  className="reporte-header"
                  style={{ paddingLeft: '0px', paddingRight: '0px' }}
                >
                  Porcentaje
                </TableCell>
                <TableCell className="reporte-header">Cantidad</TableCell>
                <TableCell className="reporte-header">Kilos</TableCell>
                <TableCell className="reporte-header">Atril/Tarima</TableCell>
                <TableCell className="reporte-header">Inventario</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </div>
            
      </div>
    )
}

export default Reporte
