import React from 'react'
import AppTable from '../Organizms/AppTable/AppTable'
import { httpLinkDelete, httpLinksGet } from '../Api/utils/utils'

function Links() {
    

    return (
        <>
                <AppTable
                    basePath = '/links'
                    addBtnText = 'Add Link'
                    targetList = {{
                        get: httpLinksGet,
                        delete: httpLinkDelete
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
