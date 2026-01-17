import { TableProps } from "antd";

export const eventTableColumns: TableProps['columns'] = [
    { title:'Name',dataIndex:'name'},
    { title: 'Slug', dataIndex: 'slug' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Status', dataIndex: 'status' },
    { title:"Start Date",dataIndex:'startDate'},
    { title: 'End Date', dataIndex: 'endDate' },
    { title: 'Price Type', dataIndex: 'priceType' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Venue Name', dataIndex: 'venueName' },
    { title: 'Timezone', dataIndex: 'timezone' },
    { title: 'Tax', dataIndex: 'tax' },
    {title:'Venue Type',dataIndex:'venueType'}
    
];