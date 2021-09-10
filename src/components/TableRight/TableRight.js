import React from "react"
import { connect } from "react-redux"
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import '../../styles/virtualized.css'
// import "react-virtualized/styles.css";

const mapStateToProps = (state) => ({
    tableRight: state.tableRight
})

const mapDispatchToProps = ({

})

const TableRight$ = (props) => {
    if (props.tableRight) {
        return(
            <div className="w-50 BORDER_LEFT">

                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            width={width}
                            height={height}
                            headerHeight={30}
                            headerClassName="tableHeaderRow"
                            rowHeight={30}
                            // rowStyle={ ({index}) => index === props.scrollingIndex ? {background: '#3698ff'} : null }
                            // scrollToIndex={props.scrollingIndex}
                            rowCount={ props.tableRight.length }
                            rowGetter={({ index }) => props.tableRight[index] }
                            rowClassName="tableRow"
                            data={props.tableRight}
                            // onRowDoubleClick={ ({index}) => {
                            //   let item = !props.isDrugsListFiltered ? props.drugRemains[index] : props.drugRemainsFiltered[index]
                            //   props.pushToOrder(item)
                            // }}
                            onRowClick={ ({ index }) => { console.log(props.tableRight[index]) } }
                            // onHeaderClick={ (event) => headerHandler(event.dataKey) }
                        >
                            <Column headerClassName="rtHeader rtCode"
                                    label={'Наименование'}
                                    dataKey="nameSKUPartner"
                                    className="rtCell rtCode rtCodeCell"
                                    width={9999} />
                        </Table>
                    )}
                </AutoSizer>

            </div>
        )
    } else {
        return(
            <p>loading</p>
        )
    }
}

const TableRight = connect(mapStateToProps, mapDispatchToProps)(TableRight$)

export default TableRight