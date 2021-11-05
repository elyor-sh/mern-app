import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import classes from './AppTable.module.css'
import AuthProvider from '../../Api/Auth/AuthProvider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useHistory } from 'react-router';

function AppTable({
    addBtnText,
    basePath,
    targetList,
    tableHeadings,
    rowCells
}) {

    const [items, setItems] = useState([])
    const history = useHistory()

    const getItems = () => {
        targetList.get()
            .then(res => {
                setItems(res.data.items)
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }

    const EditIcons = ({id}) => {
        return (
            <Button onClick={e => history.push(`${basePath}/${id}`)}>
                <EditIcon />
            </Button>
        )
    }

    const DeleteIcons = ({id}) => {
        return (
            <Button>
                <DeleteIcon />
            </Button>
        )
    }

    const drawCell = (row, cell) => {
        console.log(row, cell)
        switch (cell.type) {
            case 'text':
                let cellText = row[cell.key]
                return cellText
            case 'date':
                let timeStamp = new Date(row[cell.key]);
                const addZero = (datePart) => datePart.toString().padStart(2, '0');
                let dateValue = `${addZero(timeStamp.getDate())}.${addZero(timeStamp.getMonth() + 1)}.${timeStamp.getFullYear()}`;
                let timeValue = `${addZero(timeStamp.getHours())}:${addZero(timeStamp.getMinutes())}`;

                return dateValue + ' ' + timeValue;
            case 'link':
                let cellLink = row[cell.key]
                return <a href={cellLink}>{cellLink}</a>
            case 'actions':
                return (
                    <>
                        <EditIcons id={row._id} />
                        <DeleteIcons id={row._id} />
                    </>
                )
            default:
                return <></>
        }
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div className={classes.pageContainer}>
            <div className={classes.btnWrapper}>
                <Button
                    variant="contained"
                    href={`${basePath}/create`}
                >
                    {addBtnText}
                </Button>
            </div>
            <div className={classes.tablewrapper}>
                {items.length < 1 ? <div>No data</div> :
                    <TableContainer component={Paper}>
                        <Table aria-label="">
                            <TableHead>
                                <TableRow>
                                    {tableHeadings.map(headCell => {
                                        return (
                                            <TableCell
                                                align={headCell.align}
                                                style={{ color: headCell.color, width: headCell.width }}
                                                key={headCell.name + Math.random() * 100}
                                            >
                                                {headCell.name}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(row => {
                                    return (
                                        <TableRow
                                            key={row._id}
                                        >
                                            {rowCells.map(cell => {
                                                return (
                                                    <TableCell
                                                        style={{ color: cell.color}}
                                                        align={cell.align}
                                                        key={row._id.toString() + Math.random() * 1000}
                                                    >
                                                        {drawCell(row, cell)}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        </div>
    )
}

export default AppTable
