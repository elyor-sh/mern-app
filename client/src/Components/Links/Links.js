import React from 'react'
import AppBar from '../AppBar/AppBar'
import AppTable from '../Organizms/AppTable/AppTable'
import { httpLinksGet } from '../Api/utils/utils'

function Links() {
    

    return (
        <>
            <AppBar />
                <AppTable
                    basePath = '/links/create'
                    addBtnText = 'Add Link'
                    targetList = {{
                        get: httpLinksGet,
                        delete: ''
                    }}
                    tableHeadings = {[
                        {name: 'Link', color: '#000', align: 'left', width: '50%'},
                        {name: 'Data', color: '#000', align: 'left', width: '30%'},
                        {name: 'Actions', color: '#000', align: 'center', width: '20%'}
                    ]}
                    rowCells = {[
                        {type: 'link', color: '#000', key: 'link', align: 'left'},
                        {type: 'date', color: '#000', key: 'date', align: 'left'},
                        {type: 'actions', color: '#000', key: 'date', align: 'center'},
                    ]} 
                    filters = {[]}
                />
        </>
    )
}

export default Links
